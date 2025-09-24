---
title: Spark connector for SQL databases
description: Learn how to use Spark Connector to connect to Azure SQL databases from Microsoft Fabric Spark Runtime
author: eric-urban
ms.author: eur
ms.reviewer: arali
ms.topic: how-to
ms.date: 10/01/2025
---

# Spark connector for SQL databases

The Spark connector for SQL databases is a high-performance library that lets you read from and write to SQL Server, Azure SQL databases, and Fabric SQL databases. The connector offers the following capabilities:

* Use Spark to run large write and read operations on Azure SQL Database, Azure SQL Managed Instance, SQL Server on Azure VM, and Fabric SQL databases.
* The connector is preinstalled in the Fabric runtime, so you don't need to install it separately.
* When you use a table or a view, the connector supports security models set at the SQL engine level. These models include object-level security (OLS), row-level security (RLS), and column-level security (CLS).

## Authentication

Microsoft Entra authentication is an integrated authentication approach. Users sign in to the Microsoft Fabric workspace, and their credentials are automatically generated and passed to the SQL engine for authentication and authorization. This assumes that Microsoft Entra ID is set up and enabled on their SQL database engines. The credentials are automatically mapped, so users don't need to provide specific configuration options when using Microsoft Entra ID for authentication. You can also use the SQL authentication method or a service principal.

### Permissions

> [!IMPORTANT]
> A service principal app can run as an app (no user) or as the user if user impersonation is enabled. The underlying identity needs the required database permissions.

For Azure SQL Database, Azure SQL Managed Instance, and SQL Server on Azure VM:
- The user or app running the operation needs the relevant **database permissions**, usually `db_datawriter` and `db_datareader`, and optionally `db_owner`.

For Fabric SQL databases:
- The user or app running the operation needs the relevant **database permissions**, usually `db_datawriter` and `db_datareader`, and optionally `db_owner`.
- The user or app needs at least read permission on the Fabric SQL database at the item level.

## Usage and code examples

### Supported Options

The minimal required option is `url` as `"jdbc:sqlserver://<server>:<port>;database=<database>;"` or set `spark.mssql.connector.default.url`.

1. When `url` is provided:
   - Always use `url` as first preference.
   - If `spark.mssql.connector.default.url` is **not set**, the connector will set it and reuse it for future usage.

2. When `url` is **not provided**:
   - If `spark.mssql.connector.default.url` is set, the connector uses the value from the spark config.
   - If `spark.mssql.connector.default.url` is **not set**, an error is thrown because the required details are not available.

This connector supports the options defined here: [SQL DataSource JDBC Options](https://spark.apache.org/docs/latest/sql-data-sources-jdbc.html)

In addition following options are supported
| Option | Default | Description |
| --------- | ------------------ | ------------------------------------------ |
| reliabilityLevel | "BEST_EFFORT" | "BEST_EFFORT" or "NO_DUPLICATES". "NO_DUPLICATES" implements an reliable insert in executor restart scenarios |
| isolationLevel | "READ_COMMITTED" | Specify the isolation level |
| tableLock | "false" | Implements an insert with TABLOCK option to improve write performance |
| schemaCheckEnabled | "true" | Disables strict dataframe and sql table schema check when set to false |

Other [Bulk API options](/sql/connect/jdbc/using-bulk-copy-with-the-jdbc-driver?view=azuresqldb-current#sqlserverbulkcopyoptions&preserve-view=true) can be set as options on the DataFrame and are passed to bulkcopy APIs on write.

### Write and Read example

The following code shows how to write and read data by using the `mssql("<schema>.<table>")` method with automatic Microsoft Entra ID authentication.

# [PySpark](#tab/pyspark)

```python
import com.microsoft.sqlserver.jdbc.spark
url = "jdbc:sqlserver://<server>:<port>;database=<database>;"
row_data = [("Alice", 1),("Bob", 2),("Charlie", 3)]
column_header = ["Name", "Age"]
df = spark.createDataFrame(row_data, column_header)
df.write.mode("overwrite").option("url", url).mssql("dbo.publicExample")
spark.read.option("url", url).mssql("dbo.publicExample").show()

url = "jdbc:sqlserver://<server>:<port>;database=<database2>;" # different database
df.write.mode("overwrite").option("url", url).mssql("dbo.tableInDatabase2") # default url will be updated
spark.read.mssql("dbo.tableInDatabase2").show() # no url option specified and will use database2
```

# [Scala Spark](#tab/scalaspark)

```scala
import com.microsoft.sqlserver.jdbc.spark.SparkSqlImplicits._
import org.apache.spark.sql.Row
import org.apache.spark.sql.types._
val url = "jdbc:sqlserver://<server>:<port>;database=<database>;"
val row_data = Seq(
  Row("Alice", 2),
  Row("Bob", 2),
  Row("Charlie", 3)
)
val schema = List(
  StructField("Name", StringType, nullable = true),
  StructField("Age", IntegerType, nullable = true)
)
val df = spark.createDataFrame(spark.sparkContext.parallelize(row_data), StructType(schema))
df.write.mode("overwrite").option("url", url).mssql("dbo.publicExample")
spark.read.option("url", url).mssql("dbo.publicExample").show

val url = "jdbc:sqlserver://<server>:<port>;database=<database2>;" // different database
df.write.mode("overwrite").option("url", url).mssql("dbo.tableInDatabase2") // default url will be updated
spark.read.mssql("dbo.tableInDatabase2").show // no url option specified and will use database2
```

You can also select columns, apply filters, and use other options when you read data from the SQL database engine.

### Authentication Examples

# [Service Principal or Access Token](#tab/accesstoken)

```python
import com.microsoft.sqlserver.jdbc.spark
url = "jdbc:sqlserver://<server>:<port>;database=<database>;"
row_data = [("Alice", 1),("Bob", 2),("Charlie", 3)]
column_header = ["Name", "Age"]
df = spark.createDataFrame(row_data, column_header)

from azure.identity import ClientSecretCredential
credential = ClientSecretCredential(tenant_id="", client_id="", client_secret="") # service principal app
scope = "https://database.windows.net/.default"
token = credential.get_token(scope).token

df.write.mode("overwrite").option("url", url).option("accesstoken", token).mssql("dbo.publicExample")
spark.read.option("accesstoken", token).mssql("dbo.publicExample").show()
```

# [User/Password](#tab/userandpassword)

```python
import com.microsoft.sqlserver.jdbc.spark
url = "jdbc:sqlserver://<server>:<port>;database=<database>;"
row_data = [("Alice", 1),("Bob", 2),("Charlie", 3)]
column_header = ["Name", "Age"]
df = spark.createDataFrame(row_data, column_header)
df.write.mode("overwrite").option("url", url).option("user", "").option("password", "").mssql("dbo.publicExample")
spark.read.option("user", "").option("password", "").mssql("dbo.publicExample").show()
```

### Supported DataFrame save modes

> [!IMPORTANT]
> The data types between Spark SQL and MSSQL don't have a one-to-one mapping. When you use the `overwrite` save mode, it drops the existing table and creates a new one, so the original table schema (if you use MSSQL-exclusive data types) is lost and converted to a new type. Use `.option("truncate", true)` to avoid unexpected data loss.

> [!IMPORTANT]
> Table indices are lost when you use `overwrite`. Use `.option("truncate", true)` to keep the existing indexing.

This connector supports the options defined here: [Spark Save functions](https://spark.apache.org/docs/latest/sql-data-sources-load-save-functions.html)

* ErrorIfExists (default save mode): If the destination table exists, the write is aborted and an exception is returned. Otherwise, a new table is created with data.
* Ignore: If the destination table exists, the write ignores the request and doesn't return an error. Otherwise, a new table is created with data.
* Overwrite: If the destination table exists, the table is dropped, recreated, and new data is appended.
* Append: If the destination table exists, new data is appended to it. Otherwise, a new table is created with data.

## Troubleshoot

When the process finishes, the read response snippet shows in the cell's output. Errors from `com.microsoft.sqlserver.jdbc.SQLServerException` come directly from SQL Server. You can find detailed error information in the Spark application logs.

## Related content

* [Azure SQL Database](https://azure.microsoft.com/products/azure-sql/database)
* [Fabric SQL databases](/fabric/database/sql/overview)
* [Azure SQL Database - Authentication and authorization](/azure/azure-sql/database/logins-create-manage)