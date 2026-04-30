---
title: "Data Quality in Materialized Lake Views in a Lakehouse in Microsoft Fabric"
description: Learn about data quality in materialized lake views in a lakehouse in Microsoft Fabric
ms.reviewer: abhishjain
ms.topic: concept-article
ms.date: 03/18/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to implement data quality in materialized lake views in a lakehouse so that I can ensure the integrity and reliability of my data.
---

# Data quality in materialized lake views

In medallion architectures, you must enforce data quality at every stage. Poor data quality can lead to incorrect insights and operational inefficiencies.

This article explains how to implement data quality checks in materialized lake views (MLVs) in Microsoft Fabric.

## Implement data quality

In materialized lake views (MLVs) in Microsoft Fabric, you maintain data quality by defining constraints on your views. Without explicit checks, minor data issues can increase processing time or fail the pipeline.

When a row violates a constraint, you can use one of these actions:

- **FAIL**: Stops MLV refresh at the first constraint violation. This is the default behavior, even when you don't specify `FAIL`.

- **DROP**: Continues processing and removes records that violate the constraint. The lineage view shows the count of dropped records.

> [!NOTE]
> If you define both DROP and FAIL actions in an MLV, the FAIL action takes precedence.

### Define data quality checks in a materialized lake view

When you create a materialized lake view, you can define constraints — data quality rules that validate each row during a refresh. A constraint is a Boolean expression that every row must satisfy. Rows that pass are written to the output table. Rows that fail are handled according to the on-violation setting: they are either dropped silently or cause the entire refresh to fail.

The following example defines the constraint `cust_blank`, which checks if the `customerName` field isn't null. The constraint excludes rows with a null `customerName` from processing.
```sql
CREATE OR REPLACE MATERIALIZED LAKE VIEW IF NOT EXISTS silver.customers_enriched  
(CONSTRAINT cust_blank CHECK (customerName is not null) on MISMATCH DROP)
AS
SELECT
    c.customerID,
    c.customerName,
    c.contact, 
    CASE  
       WHEN COUNT(o.orderID) OVER (PARTITION BY c.customerID) > 0 THEN TRUE  
       ELSE FALSE  
    END AS has_orders 
FROM bronze.customers c LEFT JOIN bronze.orders o 
ON c.customerID = o.customerID;
```

### System Built in Functions 

Built-in Spark/SQL functions such as UPPER(), LOWER(), TRIM(), COALESCE(), INITCAP(), and DATE_FORMAT() are fully supported in all MLV contexts for both CREATE and LINEAGE refresh. 


```sql
CREATE MATERIALIZED LAKE VIEW sample_lakehouse.silver.names (
CONSTRAINT substring_check
CHECK (SUBSTRING(name, 1, 2) = 'Al') ON MISMATCH drop
) AS
SELECT id, name
FROM (VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Ann')) AS t(id, name)
```

> [!NOTE]
>System functions are the simplest and most reliable option. They require no registration, work in all contexts and are fully supported during LINEAGE refresh.

### UDFs – Defined & Registered in Same Notebook 

UDFs registered with spark.udf.register() in the same notebook are supported for CREATE in all contexts. For LINEAGE refresh, only PySpark contexts are supported because the UDF definition runs as part of the scheduled notebook execution. 

```python
from pyspark.sql import SparkSession
from pyspark.sql.types import StringType
from pyspark.sql.functions import expr

spark = SparkSession.builder.getOrCreate()

# UDF: Extract domain from email
def extract_email_domain(email):
    if email is None or '@' not in email:
        return None
    return email.split('@')[1]

# Registration
spark.udf.register(
    "udf_email_domain",
    extract_email_domain,
    StringType()
)

@fmlv.materialized_lake_view(
    name="udf_testing_silver.mlv_high_value_customers",
    comment="High-value customers identified by UDF criteria",
    table_properties={"delta.enableChangeDataFeed": "true"}
)
def mlv_high_value_customers():
    return spark.sql("""
        SELECT 
            c.customer_id,
            c.name,
            c.email,
            udf_email_domain(c.email) as email_domain,
            c.segment,
            c.lifetime_value,
            total_transactions.total_amount,
            total_transactions.txn_count
        FROM udf_testing_bronze.customers c
        INNER JOIN (
            SELECT 
                customer_id,
                SUM(amount) as total_amount,
                COUNT(*) as txn_count
            FROM udf_testing_bronze.transactions
            WHERE udf_is_positive(amount)
            GROUP BY customer_id
            HAVING SUM(amount) > 1000
        ) total_transactions ON c.customer_id = total_transactions.customer_id
        WHERE udf_validate_customer(c.email, c.age)
            AND c.segment IN ('premium', 'vip')
    """)

print("✓ Created mlv_high_value_customers")

```
### Third party libraries- Pandas UDFs
Third party libraries like Pandas UDFs allow data quality rules to be implemented with vectorized processing. They enable advanced validations such as custom business logic, statistical checks, or pattern detection that are not possible with built-in functions. This helps build scalable and reusable data quality constraints during MLV creation and refresh.

```python
  import fmlv
  from pyspark.sql.types import StructType, StructField, IntegerType, TimestampType, StringType, DoubleType, BooleanType
  from datetime import datetime

  import pandas as pd
  from pyspark.sql.types import BooleanType
  def pandas_check_impl(val):
    # Reject if value < median of [100, 200, 300]
    return val >= pd.Series([100, 200, 300]).median()
  spark.udf.register("pandas_check", pandas_check_impl, BooleanType())

  @fmlv.materialized_lake_view(
    name="silver.pyspark_from_two_sqlmlv_inner_pandas",
    comment="PySpark MLV INNER JOIN using pandas-based constraint and DROP violations"
  )
  @fmlv.check(
    name="dq_pandas_check",
    condition="pandas_check(l3)",
    action="DROP"
  )
  def pyspark_from_two_sqlmlv_inner_pandas():
    # Define the function

    # Register the function as a Spark UDF

    # Read source tables
    df1 = spark.table("silver.base_sqlmlv")
    df2 = spark.table("silver.base_sqlmlv")

    # Rename columns for unique join
    df_left = df1.select([df1[col].alias(f"l{i+1}") for i, col in enumerate(df1.columns)])
    df_right = df2.select([df2[col].alias(f"r{i+1}") for i, col in enumerate(df2.columns)])

    # Perform INNER JOIN
    df = df_left.join(df_right, df_left.l1 == df_right.r1, "inner")
    return df


  df = spark.table("silver.pyspark_from_two_sqlmlv_inner_pandas")
  # All amounts should be >= median (200)
  assert all(df.select("l3").rdd.map(lambda r: r[0] >= 200).collect()), "Unexpected low-value rows found"
  print("PySpark MLV INNER JOIN with pandas-based DQ DROP passed")
```

### Custom Libraries – Python Wheel (.whl) 

Functions packaged as jar files or wheel files can be installed on the Fabric cluster (via Environment settings) and used in MLV definitions. CREATE and LINEAGE REFRESH is supported for PySpark contexts. See [Manage custom libraries in Fabric environments](../environment-manage-library.md#custom-libraries) for more details.

```python
  %%pyspark
  import fmlv
  from pyspark.sql.types import StructType, StructField, IntegerType, TimestampType, StringType, DoubleType, BooleanType
  from datetime import datetime

  from pyspark.sql.types import BooleanType
  from custom_dq_lib import threshold_check
  def custom_check_impl(val):
    return threshold_check(val, threshold=200)
  spark.udf.register("custom_check", custom_check_impl, BooleanType())

  @fmlv.materialized_lake_view(
    name="silver.pyspark_from_two_sqlmlv_inner_custom_whl",
    comment="PySpark MLV INNER JOIN using custom DQ library and DROP violations",
    replace=True
  )
  @fmlv.check(
    name="dq_custom_check",
    condition="custom_check(l3)",
    action="DROP"
  )
  def pyspark_from_two_sqlmlv_inner_custom():
    # Wrap the custom function as Spark UDF


    # Read source tables
    df1 = spark.table("silver.base_sqlmlv")
    df2 = spark.table("silver.base_sqlmlv")

    # Rename columns for unique join
    df_left = df1.select([df1[col].alias(f"l{i+1}") for i, col in enumerate(df1.columns)])
    df_right = df2.select([df2[col].alias(f"r{i+1}") for i, col in enumerate(df2.columns)])

    # Perform INNER JOIN
    df = df_left.join(df_right, df_left.l1 == df_right.r1, "inner")
    return df


    df = spark.table("silver.pyspark_from_two_sqlmlv_inner_custom_whl")
    # All amounts should be >= threshold (200)
    assert all(df.select("l3").rdd.map(lambda r: r[0] >= 200).collect()), "Unexpected low-value rows found"
    print("PySpark MLV INNER JOIN with custom DQ library passed")

```

## Fabric User Data Functions 

Fabric User Data Functions (UDFs) are centrally defined and managed in the Fabric workspace. They're available to any notebook or pipeline without needing to be re-registered per session, making them ideal for production MLV pipelines. This feature is supported only in PySpark contexts for both CREATE and LINEAGE refresh. Learn more about User Data Functions here. For more information, see [Fabric User Data Functions overview](../user-data-functions/user-data-functions-overview.md).

```python
  %%pyspark
  import fmlv
  from pyspark.sql import functions as F
  from notebookutils import udf

  myFuncs = udf.getFunctions("UserDataFunction_1")

  def add_greeting_column(df):
    pdf = df.toPandas()
    pdf["greeting"] = pdf["name"].apply(lambda n: myFuncs.hello_fabric(n))
    return spark.createDataFrame(pdf)
```

```python
  import fmlv
  from pyspark.sql.types import StructType, StructField, IntegerType, StringType, DoubleType

  # -------------------------------------------------------------
  # Define base PySpark MLV (no SQL)
  # -------------------------------------------------------------
  @fmlv.materialized_lake_view(
    name="silver.base_pysparkmlv",
    comment="Base MLV created using PySpark",
    replace=True
  )
  def base_pysparkmlv():

    schema = StructType([
        StructField("id", IntegerType(), True),
        StructField("name", StringType(), True),
        StructField("amount", DoubleType(), True),
        StructField("country", StringType(), True)
    ])

    data = [
        (1, "Alice", 100.0, "US"),
        (2, "Bob", 200.0, "UK"),
        (3, "Charlie", 300.0, "UK")
    ]

    return spark.createDataFrame(data, schema)

```

```python
  @fmlv.materialized_lake_view(
    name="silver.mlv_udfn_null_test",
    replace=False
  )
  @fmlv.check(
    name="null_check",
    condition="greeting IS NOT NULL",
    action="FAIL"
  )
  def mlv_udfn_null_test():
    df = spark.table("silver.base_pysparkmlv")
    return add_greeting_column(df)
```

## Related content

- [Refresh materialized lake views](./refresh-materialized-lake-view.md)
- [Power BI reports for data quality](./data-quality-reports.md)
