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

The Spark connector for SQL databases is a high-performance library that enables you to read from and write to SQL Server, Azure SQL databases and Fabric SQL databases. The connector offers the following capabilities:

* Use Spark to perform large write and read operations on the following SQL products: Azure SQL Database, Azure SQL Managed Instance, SQL Server on Azure VM, Fabric SQL databases
* The connector comes preinstalled within the Fabric runtime, which eliminates the need for separate installation
* While you're accessing a table or a view, the connector upholds security models defined at the SQL engine level. These models include object-level security (OLS), row-level security (RLS), and column-level security (CLS).

## Authentication

Microsoft Entra authentication is an integrated authentication approach. Users sign in to the Microsoft Fabric workspace, and their credentials are automatically generated and passed to passed to the SQL engine for authentication and authorization. This assumes that Microsoft Entra ID is setup and enabled on their SQL database engines. The credentials are automatically mapped, and users aren't required to provide specific configuration options when using Microsoft Entra ID for authentication. You can also use SQL authentication method as well as can use Service Principal.

### Permissions

> [!IMPORTANT]
> Service principal app can execute as an "app" (no user) or as the user (if "user_impersonation" is enabled). The underlying identity must have the database permissions.

For Azure SQL Database, Azure SQL Managed Instance, SQL Server on Azure VM:
- Executing user or app must have the relevant **database permissions**, usally `db_datawriter` and `db_datareader`. Optionally `db_owner`.

For Fabric SQL databases:
- Executing user or app must have the relevant  **database permissions**, usally `db_datawriter` and `db_datareader`. Optionally `db_owner`.
- User or app must have at least Read permission on the Fabric SQL database (item level).

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

Other [Bulk api options](/sql/connect/jdbc/using-bulk-copy-with-the-jdbc-driver?view=azuresqldb-current#sqlserverbulkcopyoptions&preserve-view=true) can be set as options on the dataframe and will be passed to bulkcopy apis on write.

### Write and Read example

The following code demonstrates writing and reading using the `mssql("<schema>.<table>")` method with automatic Microsoft Entra ID authentication.

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

You can also select required columns, apply filter etc. while reading data from the SQL database engine.

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
> The datatypes between Spark SQL and MSSQL do not have a 1 to 1 mapping. When you use the `overwrite` save mode, it will drop the existing table and create a new one, meaning the original table schema (if you have MSSQL exclusive datatypes) will be "lost" and converted to a new type. Use `.option("truncate", true)` to avoid unexpected data loss!

> [!IMPORTANT]
> Table indices will be lost on `overwrite`. Use `.option("truncate", true)` to maintain the existing indexing.

This connector supports the options defined here: [Spark Save functions](https://spark.apache.org/docs/latest/sql-data-sources-load-save-functions.html)

* ErrorIfExists (default save mode): If destination table exists, then the write is aborted with an exception returned to the callee. Else, a new table is created with data.
* Ignore: If the destination table exists, then the write will ignore the write request without returning an error. Else, a new table is created with data.
* Overwrite: If the destination table exists, **DROP the table**, recreate, and append with new data.
* Append: If the destination table exists, then the new data is appended to it. Else, a new table is created with data.

## Troubleshoot

Upon completion, the read response snippet appears in the cell's output. Errors originating from `com.microsoft.sqlserver.jdbc.SQLServerException` are directly coming from the SQL Server itself. Detailed error information is available in the Spark application logs.

## Related content

* [Azure SQL Database](https://azure.microsoft.com/products/azure-sql/database)
* [Fabric SQL databases](/fabric/database/sql/overview)
* [Azure SQL Database - Authentication and authorization](/azure/azure-sql/database/logins-create-manage)