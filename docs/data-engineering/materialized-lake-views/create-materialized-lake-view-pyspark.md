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

In this article, you learn about the PySpark semantics related to materialized lake views in Microsoft Fabric.

## Create a materialized lake view

The `fmlv` module contains all the essential functions for creating materialized lake views using PySpark. To define a materialized lake view, ensure to import this module. 

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
                
| Parameter        | Description                                      |
|------------------|--------------------------------------------------|
| **name**         | Required. Name of materialized lake view.        |
| **comment**      | Description of materialized lake view.           |
| **partition_cols** | Parameter for creating partitions based on the specified column(s).  |
| **replace** | Parameter to indicate whether to replace the existing view definition. Defaults to False.|
| **table_properties** | A list of key-value pairs that for defining the properties of materialized lake view. | 
| **function definition** | Required. A function to define the logic which returns a Spark dataframe object.         |  
| **check** | Optional. Function to define the data quality constraints. For more details, refer to data quality page.     |  

## Examples

### Basic materialized lake view definition

```python
   import fmlv 
   @fmlv.materialized_lake_view(name="LH1.silver.customer_silver")
   def customer_silver():
       df = spark.read.table("bronze.customer_bronze")
       cleaned_df = df.filter(F.col("sales").isNotNull())
       enriched_df = cleaned_df.withColumn("sales_in_usd", F.col("sales") * 1.0)
      return enriched_df
```

### Create a materialized lake view with partitions and table properties

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
> 1. To create the materialized lake view, you need to execute the command once in the notebook and schedule the lineage for subsequent refresh.


## Execution semantics for PySpark materialized lake views

> [!IMPORTANT]
> 1. PySpark materialized lake view refresh requires notebook unlike Spark SQL. During the refresh, Fabric automatically determine the notebook associated with the PySpark MLV and execute the cells in the notebook required to refresh.


### Best practices for defining PySpark based materialized lake views

* All cells required for the materialized lake view definition must be included within the same notebook, and all cells upon which the materialized lake view definition depends must be positioned above the cell containing the `@fmlv` decorator definition.
* Only one instance of the `@fmlv` view decorator and its associated function should be present per notebook cell. Multiple materialized lake views can be created within the same notebook by defining them in separate cells.   
* Do not delete the notebook where the PySpark materialized lake view is defined, as this will cause scheduled refresh failures. Fabric validates all cells related to the materialized lake view and disregards unrelated cells within the notebook. 
* Multiple notebooks may be utilized to create separate materialized lake views. 
* To update the existing materialized lake view definition, you can modify the function definition and execute the command with `replace=True` in the notebook. This will replace the existing view with the new definition while keeping the same name.
* Any changes made to the `@fmlv` decorator definition require the notebook to be re-executed. The changes will be consumed during the next scheduled refresh. If changes are not executed once then the next refresh will pick the latest code in the notebook and may lead to execution errors during refresh expect if the changes are limited to logical changes within the function definition.
* Defining multiple materialized lake views within the same cell can lead to execution errors during refresh. Each materialized lake view should be defined in its own cell to ensure proper execution and refresh behavior.
* Avoid defining materialized lake views in the same notebook as other non-MLV related code, as this can lead to confusion and potential execution errors during refresh. Keeping MLV definitions separate from other code ensures clarity and proper execution.
* Avoid using variables to pass parameter values in the `@fmlv` decorator, as this is not supported. All parameters must be provided explicity in the decorator definition to ensure proper execution and refresh behavior.


Consider the following example of defining materialized lake view in a notebook-

**Cell 1: Definition of function**
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
      # Add uppercase nam 
      enriched_df = enriched_df.withColumn("name_upper", F.upper(F.col("name"))) 
   return enriched_df 
```
**Cell 3: Another materialized lake view creation** 

```python
 
   @fmlv.materialized_lake_view( 
      name="LH1.silver.customer_enriched" 
  ) 
  def customer_enriched(): 
    df = spark.read.table(customer_bronze) 
    enriched_df = df.filter(col("sales").isNotNull()) 
   return enriched_df 

```

## When to use PySpark

PySpark is the better choice when you need:

- **Complex transformation logic** that's difficult to express in SQL
- **Reusable functions** across multiple materialized lake views. Consider a scenario where you have a common data cleaning function that needs to be applied across multiple views or  When you have common transformation logic shared across multiple views, PySpark allows you to define reusable functions.
- **External Python libraries** for data processing. When you need specialized data processing libraries that aren't available in SQL such as pandas, NumPy 
- **Custom UDFs** as packages such .jar. When you need to implement custom logic that isn't supported by built-in functions, PySpark allows you to create User-Defined Functions (UDFs) to encapsulate that logic.

#### What you miss out when using PySpark:

- **Incremental refresh strategy in Optimal refresh**: PySpark-based materialized lake views do not support Incremental refresh strategy in optimal refresh; all refreshes either default to a full refresh or no refresh, depending on the configuration. This means that you may not be able to take advantage of the performance benefits of incremental refresh for PySpark materialized lake views. 
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
            ┌───────────────┐            ┌─────────────────────────┐
            │  Use Spark SQL│            │ Is transformation logic │
            └───────────────┘            │ complex (UDFs, external |
                                         |                libs)    │
                                         └────────────┬────────────┘
                                                      │
                                         ┌────────────┴────────────┐
                                         │                         │
                                        Yes                        No
                                         │                         │
                                         ▼                         ▼
                                 ┌─────────────┐          ┌───────────────┐
                                 │ Use PySpark │          │ Either works; │
                                 └─────────────┘          │ use preferred │
                                                          └───────────────┘

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

* Incremental refresh strategy in optimal refresh is not supported for PySpark based materialized lake views; all refreshes either default to a full refresh or no refresh
* You can only refresh PySpark materialized lake views through the lineage schedule.
* You can rename a pyspark based materialized lake view by using rename option in lakehouse explorer but you cannot rename it through notebook. To rename a pyspark based materialized lake view through notebook, you need to drop and recreate the materialized lake view with the new name.
* Only `%%pyspark` and `%%sql` magic commands are supported, and they must appear at the top of a notebook cell. Magic commands placed elsewhere within the same cell are not supported.
* The name of a materialized lake can include special characters except for periods.
* The `@fmlv` decorator does not support dynamic parameters or variables. All parameters must be hardcoded in the decorator definition. For example, the following code will not work because it uses a variable to pass the name parameter value:

    ```python
    view_name = "LH1.silver.customer_silver"   
    @fmlv.materialized_lake_view(name=view_name)
    def customer_silver():
        df = spark.read.table("bronze.customer_bronze")
        cleaned_df = df.filter(F.col("sales").isNotNull())
        enriched_df = cleaned_df.withColumn("sales_in_usd", F.col("sales") * 1.0)
        return enriched_df


## Related content

* [What are materialized lake views in Microsoft Fabric?](./overview-materialized-lake-view.md)
* [Data quality in materialized lake views](./data-quality.md)
* [Optimal refresh for materialized lake views](./refresh-materialized-lake-view.md)
