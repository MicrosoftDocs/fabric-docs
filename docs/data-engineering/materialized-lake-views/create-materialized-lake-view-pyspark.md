---
title: PySpark Reference for Materialized Lake Views
description: Learn about the PySpark semantics for activities related to materialized lake views in Microsoft Fabric.
ms.topic: concept-article
author: eric-urban
ms.author: eur
ms.reviewer: abhishjain
ms.date: 02/06/2026
#customer intent: As a data engineer, I want to create materialized lake views in a lakehouse so that I can optimize query performance and manage data quality.
---

# PySpark reference for materialized lake views

This article is for data engineers who need to create materialized lake views using PySpark instead of Spark SQL. Use PySpark when your transformations require complex logic, reusable functions, external Python libraries, or custom UDFs that are difficult to express in SQL.

## Create a materialized lake view

The `fmlv` module contains all the essential functions for creating materialized lake views using PySpark. To define a materialized lake view, be sure to import this module. 

```python
import fmlv 
```

You can define a materialized lake view using a decorator `@fmlv.materialized_lake_view`, making it easy to encapsulate the creation logic and metadata. The following code outlines the syntax for declaring a materialized lake view by using PySpark:

```python
@fmlv.materialized_lake_view(
    name="<[workspace.lakehouse.schema].MLV_Identifier>",
    comment="<Description>",
    table_properties={"key1": "value1"},
    partition_cols=["<col1>", "<col2>"],
    replace=<True|False>
)
@fmlv.check("constraint_name", "condition_expression", "action")
def <function_name>():
    dfObject = <logic and definition>
    return dfObject
```

### Arguments

The following table describes the parameters for the `@fmlv.materialized_lake_view` decorator.
                
| Parameter | Description |
|-----------|-------------|
| **name**         | Name of materialized lake view.<br/><br/>Required        |
| **comment**      | Description of materialized lake view.           |
| **partition_cols** | Parameter for creating partitions based on the specified columns.  |
| **replace** | Parameter to indicate whether to replace the existing view definition. Defaults to False.|
| **table_properties** | A list of key-value pairs for defining the properties of materialized lake view. | 
| **function definition** | A function to define the logic, which returns a Spark dataframe object.<br/><br/>Required         |  
| **check** | Function to define the data quality constraints.<br/><br/>Optional    |  

## Examples

The following examples demonstrate common patterns for creating materialized lake views using PySpark.

### Basic definition

This example creates a simple materialized lake view that reads from a bronze table, filters out null values, and adds a calculated column.

```python
import fmlv 

@fmlv.materialized_lake_view(name="LH1.silver.customer_silver")
def customer_silver():
    df = spark.read.table("bronze.customer_bronze")
    cleaned_df = df.filter(F.col("sales").isNotNull())
    enriched_df = cleaned_df.withColumn("sales_in_usd", F.col("sales") * 1.0)
    return enriched_df
```

### With partitions and table properties

This example creates a materialized lake view with partitioning on `year` and `city` columns, and enables change data feed for downstream consumers.

```python
import fmlv

@fmlv.materialized_lake_view(
    name="LH1.silver.customer_enriched",
    partition_cols=["year", "city"],
    table_properties={"delta.enableChangeDataFeed": "true"}
)
def customer_enriched():
    df = spark.read.table("LH2.bronze.customer_bronze")
    cleaned_df = df.filter(F.col("sales").isNotNull())
    enriched_df = cleaned_df.withColumn("sales_in_usd", F.col("sales") * 1.0)
    return enriched_df
```

> [!IMPORTANT]
> To create the materialized lake view, you need to execute the command once in the notebook and schedule the lineage for subsequent refresh.

> [!NOTE]
> This feature is currently available in UK South, North Central US, Poland Central, UAE North, UK West, Korea Central, Indonesia Central, Japan West, Japan East, France Central, Canada East regions.

## Notebook organization and refresh behavior for PySpark materialized lake views

> [!IMPORTANT]
> PySpark materialized lake view refresh requires a notebook, unlike Spark SQL. During the refresh, Fabric automatically determines the notebook associated with the PySpark MLV and executes the cells in the notebook required to refresh.


### Best practices for defining PySpark-based materialized lake views

Follow these guidelines to organize your notebooks and avoid common errors.

* Include all required cells in the same notebook, with dependency cells positioned above the `@fmlv` decorator cell.
* Define only one `@fmlv` decorator per cell. Use separate cells for multiple materialized lake views.
* Don't delete the notebook where the materialized lake view is defined. Scheduled refresh fails without it.
* You can use multiple notebooks to create separate materialized lake views.
* To update an existing definition, modify the function and run with `replace=True`.
* After changing the `@fmlv` decorator, re-execute the notebook. Otherwise, the next refresh uses the latest code and might fail.
* Don't define materialized lake views in notebooks with unrelated code.
* Don't use variables for `@fmlv` parameter values. All parameters must be hardcoded.


Consider the following example of defining a materialized lake view in a notebook:

**Cell 1: Definition of function**

Define helper functions in cells above the materialized lake view definition.

```python
from pyspark.sql import functions as F 

# Simple helper function: concatenate columns as string 
def concat_name_age(df): 
    return df.withColumn( 
        "name_age", 
        F.concat(F.coalesce(F.col("name"), F.lit("")), 
                 F.lit("-"), 
                 F.coalesce(F.col("age").cast("string"), F.lit(""))) 
    ) 
```

**Cell 2: Materialized lake view creation**

Create the materialized lake view using the `@fmlv.materialized_lake_view` decorator. This view uses the helper function defined in Cell 1.

```python
import fmlv 

@fmlv.materialized_lake_view( 
    name="LH1.silver.customer_silver" 
) 
def customer_silver(): 
    # Read bronze table 
    bronze_df = spark.read.table("customer_bronze") 
    # Apply helper function 
    enriched_df = concat_name_age(bronze_df) 
    # Add uppercase name 
    enriched_df = enriched_df.withColumn("name_upper", F.upper(F.col("name"))) 
    return enriched_df 
```

**Cell 3: Another materialized lake view creation**

Define additional materialized lake views in separate cells within the same notebook.

```python
import fmlv

@fmlv.materialized_lake_view( 
    name="LH1.silver.customer_enriched" 
) 
def customer_enriched(): 
    df = spark.read.table("customer_bronze") 
    enriched_df = df.filter(F.col("sales").isNotNull()) 
    return enriched_df
```

## When to use PySpark

PySpark is the better choice when you need:

- **Complex transformation logic** that's difficult to express in SQL
- **Reusable functions** across multiple materialized lake views. When you have common transformation logic shared across multiple views, PySpark allows you to define reusable functions.
- **External Python libraries** for data processing. When you need specialized data processing libraries that aren't available in SQL, such as pandas or NumPy.
- **Custom UDFs** as packages such as .jar files. When you need to implement custom logic that isn't supported by built-in functions, PySpark allows you to create User-Defined Functions (UDFs) to encapsulate that logic.

### Trade-offs when using PySpark

- **Incremental refresh strategy in Optimal refresh**: PySpark-based materialized lake views don't support Incremental refresh strategy in optimal refresh; all refreshes either default to a full refresh or no refresh, depending on the configuration. This means that you might not be able to take advantage of the performance benefits of incremental refresh for PySpark materialized lake views. 
- **Flexibility in refresh options**: You can only refresh PySpark materialized lake views through the lineage schedule, which may not provide the same level of flexibility as Spark SQL-based views that can be refreshed on-demand via notebook.

## Decision flowchart

Use this flowchart to decide which approach to use:

```
                    ┌─────────────────────────────────┐
                    │  Do you need optimal refresh?   │
                    └───────────────┬─────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                   Yes                              No
                    │                               │
                    ▼                               ▼
            ┌───────────────┐            ┌───────────────────────────┐
            │  Use Spark SQL│            │ Does transformation logic │
            └───────────────┘            │ requires - (UDFs, external|
                                         |                libs)      │
                                         └────────────┬────────────┘
                                                      │
                                         ┌────────────┴────────────┐
                                         │                         │
                                        Yes                        No
                                         │                         │
                                         ▼                         ▼
                                 ┌─────────────┐          ┌───────────────┐
                                 │ Use PySpark │          │ Use Spark SQL │
                                 └─────────────┘          └───────────────┘

```

## Drop a materialized lake view

You can drop a materialized lake view by using the **Delete** option in the lakehouse object explorer or by running the following command in the notebook:

```python
spark.sql("DROP MATERIALIZED LAKE IF EXISTS <materialized lake view_Identifier") 
```

Here's an example:

```python
spark.sql("DROP MATERIALIZED LAKE IF EXISTS silver.customer_enriched") 
```

> [!NOTE]
> Dropping or renaming a materialized lake view affects the lineage view and scheduled refresh. Be sure to update the reference in all dependent materialized lake views.


## Current limitations 

* Incremental refresh strategy in optimal refresh isn't supported for PySpark based materialized lake views; all refreshes either default to a full refresh or no refresh
* You can only refresh PySpark materialized lake views through the lineage schedule.
* You can rename a PySpark-based materialized lake view by using the rename option in lakehouse explorer, but you can't rename it through a notebook. To rename a PySpark-based materialized lake view through a notebook, you need to drop and recreate the materialized lake view with the new name.
* Only `%%pyspark` and `%%sql` magic commands are supported, and they must appear at the top of a notebook cell. Magic commands placed elsewhere within the same cell aren't supported.
* The name of a materialized lake view can include special characters except for periods.
* The `@fmlv` decorator doesn't support dynamic parameters or variables. All parameters must be hardcoded in the decorator definition. For example, the following code doesn't work because it uses a variable to pass the name parameter value:

    ```python
    view_name = "LH1.silver.customer_silver"   
    @fmlv.materialized_lake_view(name=view_name)
    def customer_silver():
        df = spark.read.table("bronze.customer_bronze")
        cleaned_df = df.filter(F.col("sales").isNotNull())
        enriched_df = cleaned_df.withColumn("sales_in_usd", F.col("sales") * 1.0)
        return enriched_df
    ```

## Related content

* [What are materialized lake views in Microsoft Fabric?](./overview-materialized-lake-view.md)
* [Data quality in materialized lake views](./data-quality.md)
* [Optimal refresh for materialized lake views](./refresh-materialized-lake-view.md)
