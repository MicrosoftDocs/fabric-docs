---
title: Spark connector for Fabric Data Warehouse
description: Learn how to use the Spark connector for Fabric Data Warehouse access and work with data from the warehouse and SQL analytics endpoint of the lakehouse.
author: ms-arali
ms.author: arali
ms.topic: how-to
ms.date: 05/10/2024
---

# Spark connector for Fabric Data Warehouse
The Spark Connector for Fabric Data Warehouse (DW) enables Spark developers and data scientists to access and work with data from Fabric DW and SQL analytics endpoint of the lakehouse. The connector offers the following capabilities:
   * You can work with data from both the data warehouse and SQL analytics endpoint either from the same workspace or across multiple workspaces.
   * SQL engine’s end point is auto discovered based on workspace context.
   * It offers a simplified Spark API, abstracts the underlying complexity, and operates with just one line of code. 
   * Further, it upholds security models such as Object Level Security (OLS), Row Level Security (RLS), Column Level Security (CLS)) defined at the SQL engine level while accessing a table or view. 
   * The connector comes preinstalled within Fabric Runtime, eliminating the need for separate installation.
> [!NOTE]
> The Spark connector for Fabric Data Warehouse is currently in public preview. For more information, see the [current limitations](spark-data-warehouse-connector.md#current-limitations).  
## Authentication 
Microsoft Entra ID based authentication is an integrated authentication approach. Users sign in to the Microsoft Fabric workspace, and their credentials are automatically passed to the SQL engine for authentication and authorization. The credentials are auto mapped, and the user isn't required to provide specific configuration options.
### Permissions
To connect to the SQL engine, users need at least Read permission (similar to CONNECT permissions in SQL Server) on the data warehouse or SQL analytics endpoint (item level). They also require granular object-level permissions to read data from specific tables or views. To learn more, see [security for data warehouse.](../data-warehouse/security.md) 
## Code templates and example.
### Method signature
The following command shows *synapsesql* method signature for the read request. The three-part table name argument is required for accessing tables or views from Fabric DW and the SQL analytics endpoint of the lakehouse, which you need to update based on your scenario. 
* Part 1: Name of the warehouse or lakehouse. 
* Part 2: Name of the schema. 
* Part 3: Name of table or view.
```scala
synapsesql(tableName:String="<Part 1.Part 2. Part 3>") => org.apache.spark.sql.DataFrame
```
### Read data within the same workspace
> [!NOTE]
> To use the connector, run these import statements at the beginning of your notebook or before you start using the connector. \
> `import com.microsoft.spark.fabric.tds.implicits.read.FabricSparkTDSImplicits._`\
`import org.apache.spark.sql.functions._`\
The following code is an example to read data from a table or view in a Spark dataframe:
```scala
val df = spark.read.synapsesql("<warehouse/lakeshouse name>.<schema name>.<table or view name>")
```
The following code is an example to read data from a table or view in a Spark dataframe with a row count limit of 10: 
```scala
val df = spark.read.synapsesql("<warehouse/lakeshouse name>.<schema name>.<table or view name>").limit(10)
```
The following code is an example to read data from a table or view in a Spark dataframe after applying a filter:
```scala
val df = spark.read.synapsesql("<warehouse/lakeshouse name>.<schema name>.<table or view name>").filter("column name == 'value’")
```
The following code is an example to read data from a table or view in a Spark dataframe for selected columns only: 
```scala
val df = spark.read.synapsesql("<warehouse/lakeshouse name>.<schema name>.<table or view name>").select("column A", "Column B")
```
### Read data across workspaces
To access and read data from a warehouse or lakehouse across workspaces, you can specify the workspace ID where your warehouse or lakehouse exists as demonstrated in the code block. This line provides an example of reading data from a table or view in a Spark dataframe from the warehouse or lakehouse from the specified workspace ID: 
```scala
import com.microsoft.spark.fabric.Constants
val df = spark.read.option(Constants.WorkspaceId, "<workspace id>").synapsesql("<warehouse/lakeshouse name>.<schema name>.<table or view name>")
```
> [!NOTE]
> When executing the notebook, by default the connector looks for the specified warehouse or lakehouse in the workspace of the attached lakehouse to the notebook. To reference a warehouse or lakehouse from another workspace, specify the workspace ID.
### Use materialized data across cells and languages
Spark DataFrame's createOrReplaceTempView API can be used to access data fetched in one cell or in Scala, after registering it as a temporary view, by another cell in Spark SQL or PySpark. These lines of code provide an example to read data from a table or view in a Spark dataframe in Scala and use this data across Spark SQL and PySpark: 
```scala
%%spark
spark.read.synapsesql("<warehouse/lakehouse name>.<schema name>.<table or view name>").createOrReplaceTempView("<Temporary View Name>")
```
Now, change the language preference on the notebook or at the cell level to Spark SQL and fetch the data from the registered temporary view as shown in the code block:
```scala
%%sql
SELECT * FROM < Temporary View Name > LIMIT 100
```
Next, change the language preference on the notebook or at the cell level to PySpark (Python) and fetch data from the registered temporary view as shown in the code block:
```scala
%%pyspark
df = spark.read.table("<Temporary View Name >")
```
### Create a lakehouse table based on data from data warehouse.
These lines of code provide an example to read data from a table or view in a Spark dataframe in Scala and use that to create a lakehouse table: 
```scala
val df = spark.read.synapsesql("<warehouse/lakehouse name>.<schema name>.<table or view name>")
df.write.format("delta").saveAsTable("<Lakehouse table name>")
```
## Troubleshoot
Upon completion, the read response snippet is displayed in the cell's output. Failure in the current cell will also cancel subsequent cell executions of the notebook. Detailed error information is available in the Spark Application Logs.
## Current limitations
* Currently this connector supports data retrieval from Fabric DW and SQL endpoints of lakehouse items.
* Supports Scala only. 
* Custom query or query pass-through is currently not supported.
* Pushed down optimization is currently not implemented.
* This connector retains the usage signature like the one shipped with Synapse Spark for consistency. However, it is not backward compatible to connect and work with Synapse Dedicated SQL pool. 
## Related content
* [Apache Spark runtime in Fabric](runtime.md)
* [Apache Spark monitoring overview](spark-monitoring-overview.md) 
* [Security for data warehousing](../data-warehouse/security.md)
* [SQL granular permissions](../data-warehouse/sql-granular-permissions.md)
