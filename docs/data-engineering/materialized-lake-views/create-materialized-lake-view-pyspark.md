---
title: PySpark Reference for Materialized Lake Views
description: Learn about the PySpark semantics for activities related to materialized lake views in Microsoft Fabric.
ms.topic: concept-article
author: eric-urban
ms.author: eur
ms.reviewer: abhishjain
ms.date: 12/04/2025
#customer intent: As a data engineer, I want to create materialized lake views in a lakehouse so that I can optimize query performance and manage data quality.
---

# PySpark reference for materialized lake views

In this article, you learn about the PySpark semantics for activities related to materialized lake views in Microsoft Fabric.

## Create a materialized lake view

The `fmlv` module contains all the essential functions for creating materialized lake views using PySpark. To define a materialized lake view, make sure to import this module. 

```python
   import fmlv 
```

You can define a materialized lake view using a decorator `@fmlv.materialized_lake_view`, making it easy to encapsulate the creation logic and metadata. The following code outlines the syntax for declaring a materialized lake view by using PySpark:

```python
    @fmaterialized lake view.materialized_lake_view(
        name="<materialized lake view Name>",
        comment="<Description>",
        table_properties={"key1": "value1"},
        partition_cols=["<col1>", "<col2>"]
    )
    @fmaterialized lake view.check("constraint_name", "condition_expression", "action")
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
| **table_properties** | A list of key-value pairs that for defining the properties of materialized lake view. | 
| **function definition** | Required. A function to define the logic which returns a Spark dataframe object.         |  
| **check** | Optional. Function to define the data quality constraints. For more details, refer to data quality page<link> .     |  

## Examples

### Basic materialized lake view definition

```python
   @fmaterialized lake view.materialized_lake_view(name="LH1.silver.cust_sil")
   def customer_silver():
       df = spark.read.table("customer_bronze")
       cleaned_df = df.filter(F.col("sales").isNotNull())
       enriched_df = cleaned_df.withColumn("sales_in_usd", F.col("sales") * 1.0)
      return enriched_df
```

### Creating a materialized lake view with partitions and table properties

```python
   @fmaterialized lake view.materialized_lake_view(
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

> [!Note]
> To create the materialized lake view, execute the command once in the notebook and schedule the lineage for subsequent refresh.

## Rename a materialized lake view

To rename the materialized lake view, you can use **Rename** option in the lakehouse object explorer or by running the following command in the notebook:

```python
spark.sql("ALTER MATERIALIZED LAKE VIEW materialized lake view_Identifier RENAME TO materialized lake view_Identifier_New");
```

Here's an example:

```python
spark.sql("ALTER MATERIALIZED LAKE VIEW customers_enriched RENAME TO customers_enriched_new");
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

## Execution semantics 

To create the materialized lake view, execute the definition once in the notebook and schedule the lineage for subsequent refresh. 
PySpark materialized lake view refresh requires notebook unlike Spark SQL. During the refresh, Fabric automatically determine the notebook associated with the PySpark MLV and execute the cells in the notebook required to refresh. 

### Best practices for defining PySpark based materialized lake views

1. Ensure that all cells required for the materialized lake view definition are included within the same notebook.
1. All cells upon which the materialized lake view definition depends must be positioned above the cell containing the @fmlv decorator definition.
1. Only one instance of the @fmaterialized lake view decorator and its associated function should be present per notebook cell.
1. Do not delete the notebook where the PySpark materialized lake view is defined, as this will cause scheduled refresh failures.
1. Fabric validates all cells related to the materialized lake view and disregards unrelated cells within the notebook.
1. Multiple notebooks may be utilized to create separate materialized lake views.
1. Any changes made to the @fmlv decorator definition require the notebook to be re-executed.

Consider the following example of defining materialized lake view in a notebook 
 
```python
#cell1: Definition of function 

  from pyspark.sql import functions as F 
  
  # Simple helper function: concatenate columns as string 
  def concat_name_age(df): 
      return df.withColumn( 
          "name_age", 
          F.concat(F.coalesce(F.col("name"), F.lit("")), 
                   F.lit("-"), 
                   F.coalesce(F.col("age").cast("string"), F.lit(""))) 
      ) 

#cell2: Materialized lake view creation  
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

#cell3: Another materialized lake view creation   
   @fmlv.materialized_lake_view( 
      name="LH1.silver.customer_enriched" 
  ) 
  def customer_enriched(): 
    df = spark.read.table(customer_bronze) 
    enriched_df = df.filter(col("sales").isNotNull()) 
   return enriched_df 

```
## Current limitations 

1. PySpark-based MLV does not support optimal refresh; all refreshes default to a full refresh.
1. You can refresh PySpark MLVs only through the lineage schedule.
1. Only %%pyspark and %%sql magic commands are supported, and they must appear at the top of a notebook cell. Magic commands placed elsewhere within the same cell are not supported.
1. The name of a materialized lake can include special characters except for periods.
1. Using variables to pass parameter values in the @fmlv decorator is not supported. 

## Related content

* [What are materialized lake views in Microsoft Fabric?](./overview-materialized-lake-view.md)
* [Data quality in materialized lake views](./data-quality.md)
* [Refresh materialized lake views in a lakehouse](./refresh-materialized-lake-view.md)
