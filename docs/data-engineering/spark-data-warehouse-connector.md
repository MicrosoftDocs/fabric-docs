---
title: Spark connector for Microsoft Fabric Data Warehouse
description: Learn how to use a Spark connector to access and work with data from a Microsoft Fabric warehouse and the SQL analytics endpoint of a lakehouse.
author: eric-urban
ms.author: eur
ms.reviewer: arali
ms.topic: how-to
ms.custom:
  - ignite-2024
ms.date: 04/11/2025
---

# Spark connector for Microsoft Fabric Data Warehouse

The Spark connector for Fabric Data Warehouse enables Spark developers and data scientists to access and work with data from [a warehouse and the SQL analytics endpoint of a lakehouse](../data-warehouse/data-warehousing.md#data-warehousing-items). The connector offers the following capabilities:

* You can work with data from a warehouse or SQL analytics endpoint in the same workspace or across multiple workspaces.
* The SQL analytics endpoint of a Lakehouse is automatically discovered based on workspace context.
* The connector has a simplified Spark API, abstracts the underlying complexity, and operates with just one line of code.
* While you're accessing a table or a view, the connector upholds security models defined at the SQL engine level. These models include object-level security (OLS), row-level security (RLS), and column-level security (CLS).
* The connector comes preinstalled within the Fabric runtime, which eliminates the need for separate installation.

## Authentication

Microsoft Entra authentication is an integrated authentication approach. Users sign in to the Microsoft Fabric workspace, and their credentials are automatically passed to the SQL engine for authentication and authorization. The credentials are automatically mapped, and users aren't required to provide specific configuration options.

> [!NOTE]
> The Spark connector for Fabric Data Warehouse only supports interactive Microsoft Entra user authentication. Service principal authentication isn't supported. 

### Permissions

To connect to the SQL engine, users need at least Read permission (similar to CONNECT permission in SQL Server) on the warehouse or SQL analytics endpoint (item level). Users also need granular object-level permissions to read data from specific tables or views. To learn more, see [Security for data warehousing in Microsoft Fabric](../data-warehouse/security.md).

## Code templates and examples

### Use a method signature

The following command shows the `synapsesql` method signature for the Read request. The three-part `tableName` argument is required for accessing tables or views from a warehouse and the SQL analytics endpoint of a lakehouse. Update the argument with the following names, based on your scenario:

* Part 1: Name of the warehouse or lakehouse.
* Part 2: Name of the schema.
* Part 3: Name of the table or view.

```scala
synapsesql(tableName:String="<Part 1.Part 2.Part 3>") => org.apache.spark.sql.DataFrame
```
In addition to reading from a table or view directly, this connector also allows you to specify a custom or passthrough query, which gets passed to SQL engine and result is returned back to Spark.
```scala
spark.read.option(Constants.DatabaseName, "<warehouse/lakeshouse name>").synapsesql("<T-SQL Query>") => org.apache.spark.sql.DataFrame
```

While this connector auto discovers the endpoint for the specified warehouse / lakehouse, if you want to specify it explicitly, you can do it.
```
//For warehouse
spark.conf.set("spark.datawarehouse.<warehouse name>.sqlendpoint", "<sql endpoint,port>")
//For lakehouse
spark.conf.set("spark.lakehouse.<lakeshouse name>.sqlendpoint", "<sql endpoint,port>")
//Read from table
spark.read.synapsesql("<warehouse/lakeshouse name>.<schema name>.<table or view name>") 
```

### Read data within the same workspace

> [!IMPORTANT]
> Run these import statements at the beginning of your notebook or before you start using the connector:

# [PySpark](#tab/pyspark)

```python
import com.microsoft.spark.fabric
from com.microsoft.spark.fabric.Constants import Constants  
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
import com.microsoft.spark.fabric.tds.implicits.read.FabricSparkTDSImplicits._
import com.microsoft.spark.fabric.tds.implicits.write.FabricSparkTDSImplicits._
import com.microsoft.spark.fabric.Constants
import org.apache.spark.sql.SaveMode 
```
---

The following code is an example to read data from a table or view in a Spark DataFrame:

```python
df = spark.read.synapsesql("<warehouse/lakehouse name>.<schema name>.<table or view name>")
```

The following code is an example to read data from a table or view in a Spark DataFrame with a row count limit of 10:

```python
df = spark.read.synapsesql("<warehouse/lakehouse name>.<schema name>.<table or view name>").limit(10)
```

The following code is an example to read data from a table or view in a Spark DataFrame after you apply a filter:

```python
df = spark.read.synapsesql("<warehouse/lakehouse name>.<schema name>.<table or view name>").filter("column name == 'value'")
```

The following code is an example to read data from a table or view in a Spark DataFrame for selected columns only:

```python
df = spark.read.synapsesql("<warehouse/lakehouse name>.<schema name>.<table or view name>").select("column A", "Column B")
```

### Read data across workspaces

To access and read data from a warehouse or lakehouse across workspaces, you can specify the workspace ID where your warehouse or lakehouse exists, and then lakehouse or warehouse item ID. The following line provides an example of reading data from a table or view in a Spark DataFrame from the warehouse or lakehouse with the specified workspace ID and lakehouse/warehouse ID:

```python
# For lakehouse
df = spark.read.option(Constants.WorkspaceId, "<workspace id>").synapsesql("<lakehouse name>.<schema name>.<table or view name>")
df = spark.read.option(Constants.WorkspaceId, "<workspace id>").option(Constants.LakehouseId, "<lakehouse item id>").synapsesql("<lakehouse name>.<schema name>.<table or view name>")

# For warehouse
df = spark.read.option(Constants.WorkspaceId, "<workspace id>").synapsesql("<warehouse name>.<schema name>.<table or view name>")
df = spark.read.option(Constants.WorkspaceId, "<workspace id>").option(Constants.DatawarehouseId, "<warehouse item id>").synapsesql("<warehouse name>.<schema name>.<table or view name>")
```

> [!NOTE]
> When you're running the notebook, by default the connector looks for the specified warehouse or lakehouse in the workspace of the lakehouse that's attached to the notebook. To reference a warehouse or lakehouse from another workspace, specify the workspace ID and lakehouse or warehouse item ID as above.

### Create a lakehouse table based on data from a warehouse

These lines of code provide an example to read data from a table or view in a Spark DataFrame and use it to create a lakehouse table:

```python
df = spark.read.synapsesql("<warehouse/lakehouse name>.<schema name>.<table or view name>")
df.write.format("delta").saveAsTable("<Lakehouse table name>")
```

### Write a Spark dataframe data to warehouse table
This connector employs a two-phase write process to a Fabric DW table. Initially, it stages the Spark dataframe data into an intermediate storage, followed by using the `COPY INTO` command to ingest the data into the Fabric DW table. This approach ensures scalability with increasing data volume.

#### Supported DataFrame save modes
Following save modes are supported when writing source data of a dataframe to a destination table in warehouse:

* ErrorIfExists (default save mode): If destination table exists, then the write is aborted with an exception returned to the callee. Else, a new table is created with data.
* Ignore: If the destination table exists, then the write ignores the write request without returning an error. Else, a new table is created with data.
* Overwrite: If the destination table exists, then existing data in the destination is replaced with data. Else, a new table is created with data.
* Append: If the destination table exists, then the new data is appended to it. Else, a new table is created with data.

The following code shows examples of writing Spark dataframe's data to a Fabric DW table: 

```python
df.write.synapsesql("<warehouse/lakehouse name>.<schema name>.<table name>") # this uses default mode - errorifexists

df.write.mode("errorifexists").synapsesql("<warehouse/lakehouse name>.<schema name>.<table name>")
df.write.mode("ignore").synapsesql("<warehouse/lakehouse name>.<schema name>.<table name>")
df.write.mode("append").synapsesql("<warehouse/lakehouse name>.<schema name>.<table name>")
df.write.mode("overwrite").synapsesql("<warehouse/lakehouse name>.<schema name>.<table name>")
```
> [!NOTE]
> The connector supports writing to a Fabric DW table only as the SQL analytics endpoint of a Lakehouse is read-only.

### Parallelizing Reads for Improved Performance
This connector supports parallelized reads to improve query performance when loading large tables. Similar to [spark.read.jdbc](https://spark.apache.org/docs/latest/sql-data-sources-jdbc.html), you can enable parallelism by specifying a partition column and its value range. Spark will then split the read operation into multiple partitions that are processed concurrently.

The following code shows how to enable parallel reads using a Spark notebook:

```python
import com.microsoft.spark.fabric.tds.implicits.read.FabricSparkTDSImplicits._
import com.microsoft.spark.fabric.tds.implicits.write.FabricSparkTDSImplicits._
import com.microsoft.spark.fabric.Constants
import org.apache.spark.sql.SaveMode 

val df = spark.read.option("partitionColumn", <SomeColumn>)

        .option("lowerBound",  <ColumnValuesLowerLimit>)

        .option("upperBound", <ColumnValuesUpperLimit>)

        .option("numPartitions", <NumberOfPartitionsDesired>).synapsesql(<Table>)
```



## Troubleshoot

Upon completion, the read response snippet appears in the cell's output. Failure in the current cell also cancels subsequent cell executions of the notebook. Detailed error information is available in the Spark application logs.

## Considerations for using this connector

Currently, the connector:

* Supports data retrieval or read from Fabric warehouses and SQL analytics endpoints of lakehouse items.
* Supports writing data to a warehouse table using different save modes - this is only available with the latest GA runtime, i.e., [Runtime 1.3](runtime-1-3.md). 
* With `Private Link` enabled at tenant level write operation is not supported and with `Private Link` enabled at workspace level, both read and write operations are not supported. 
* Fabric DW now supports `Time Travel` however this connector doesn't work for a query with time travel syntax. 
* Retains the usage signature like the one shipped with Apache Spark for Azure Synapse Analytics for consistency. However, it's not backward compatible to connect and work with a dedicated SQL pool in Azure Synapse Analytics.
* Column names with special characters will be handled by adding escape character before the query, based on 3 part table/view name, is submitted. In a custom or passthrough-query based read, users are required to escape column names that would contain special characters.

## Related content

* [Apache Spark runtimes in Fabric](runtime.md)
* [Apache Spark monitoring overview](spark-monitoring-overview.md)
* [Security for data warehousing in Fabric](../data-warehouse/security.md)
* [SQL granular permissions in Fabric](../data-warehouse/sql-granular-permissions.md)
