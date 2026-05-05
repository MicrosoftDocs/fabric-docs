---
title: PySpark Reference for Materialized Lake Views (Preview)
description: Learn about the PySpark semantics for activities related to materialized lake views in Microsoft Fabric.
ms.topic: concept-article
ms.reviewer: abhishjain
ms.date: 03/19/2026
#customer intent: As a data engineer, I want to create materialized lake views in a lakehouse so that I can optimize query performance and manage data quality.
---

# PySpark reference for materialized lake views (Preview)

This article is for data engineers who need to create materialized lake views using PySpark instead of Spark SQL. Use PySpark when your transformations require complex logic, reusable functions, external Python libraries, or custom UDFs that are difficult to express in SQL.

> [!NOTE]
> PySpark-based materialized lake views are currently in preview.

## Create a materialized lake view

The `fmlv` module provides the functions for creating materialized lake views using PySpark. Import it before defining a view.

```python
import fmlv 
```

Use the `@fmlv.materialized_lake_view` decorator to define a materialized lake view. The following code shows the syntax:

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
| **name**         | Name of the materialized lake view.<br/><br/>Required        |
| **comment**      | Description of the materialized lake view.           |
| **partition_cols** | Parameter for creating partitions based on the specified columns.  |
| **replace** | Parameter to indicate whether to replace the existing view definition. Defaults to False.|
| **table_properties** | List of key-value pairs for defining the properties of the materialized lake view. | 
| **function definition** | Function that returns a Spark DataFrame defining the view logic.<br/><br/>Required         |  
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

To create a PySpark-based materialized lake view, run the notebook once to register the definition, and then use lineage scheduling for subsequent refreshes.

## Notebook organization and refresh behavior for PySpark materialized lake views

> [!IMPORTANT]
> PySpark materialized lake view refresh requires a notebook, unlike Spark SQL. During refresh, Fabric identifies the notebook that defines the view and executes the relevant cells.


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

Define more materialized lake views in separate cells within the same notebook.

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

- **Complex transformation logic** that is difficult to express in SQL.
- **Reusable functions** — define common transformation logic once and call it from multiple views.
- **External Python libraries** — use specialized libraries such as pandas or NumPy that are not available in SQL.
- **Custom UDFs** — package custom logic as `.jar` files or Python UDFs when built-in functions are insufficient.

### Trade-offs when using PySpark

- **No incremental refresh** — all refreshes default to full refresh or no refresh. See [Current limitations](#current-limitations) for details.
- **Lineage-schedule refresh only** — you cannot refresh on-demand via notebook as with Spark SQL-based views.

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
            │  Use Spark SQL│            │ Does the transformation   │
            └───────────────┘            │ require UDFs or external  |
                                         | libraries?                │
                                         └────────────┬──────────────┘
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
spark.sql("DROP MATERIALIZED LAKE VIEW IF EXISTS <materialized_lake_view_Identifier>") 
```

Here's an example:

```python
spark.sql("DROP MATERIALIZED LAKE VIEW IF EXISTS silver.customer_enriched") 
```

> [!NOTE]
> Dropping or renaming a materialized lake view affects the lineage view and scheduled refresh. Be sure to update the reference in all dependent materialized lake views.


## Current limitations 

* Incremental refresh strategy in optimal refresh isn't supported for PySpark based materialized lake views; all refreshes either default to a full refresh or no refresh
* You can only refresh PySpark materialized lake views through the lineage schedule.
* Renaming is supported only through lakehouse explorer. To rename via notebook, drop and recreate the view with the new name.
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
