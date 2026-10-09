---
title: Query external files by using Fabric Data Warehouse or SQL analytics endpoint
description: Learn how to query external files in data lake storage using the Fabric Data Warehouse or SQL analytics endpoint.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jovanpop, procha, salilkanade
ms.date: 02/11/2026
ms.topic: how-to
ms.search.form: Query external files
---

# Query external data lake files

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Fabric Data Warehouse and the SQL analytics endpoint allow you to query data stored in files within a data lake using Transact-SQL (T-SQL) code.

They provide a familiar T-SQL query surface area that supports querying structured, semi-structured, and unstructured data. In Fabric Data Warehouse and the SQL analytics endpoint, you can query various file formats such as Parquet, CSV, and JSONL.

## OPENROWSET

The simplified syntax of the `OPENROWSET` function is:

```sql
OPENROWSET( BULK '{file path}', [ options...] )
   [ WITH ( {result set column schema} ) ]
```

`OPENROWSET` supports three ways to specify the file location:

- **Absolute path** containing the full URL to the file you want to read. This is the simplest approach when you know the exact file location.
- **Relative path with a data source** - the relative path is appended to the root location defined in the data source to form the full path. The data source can point to an external storage URL (for example, Azure Blob, ADLS Gen2) or the root URL of a Lakehouse in Fabric.
- **Relative path starting with `/Files`** - this option works only when querying a Lakehouse through its SQL analytics endpoint. The `/Files` folder represents the Lakehouse files area, and you can use relative paths without defining a data source.

The files can be placed in one of the following storage options:

- **Azure Data Lake Storage (ADLS)** - a scalable, hierarchical cloud storage service optimized for big data analytics workloads.
- **Azure Blob Storage** - a general-purpose object storage service for storing large amounts of unstructured data such as files, images, and logs.
- **Fabric OneLake** - the native lake storage for Microsoft Fabric that provides a unified, logical data lake for all Fabric workloads. OneLake also enables indirect access to data stored in external locations, including:
  - **Amazon S3** - Object storage service provided by Amazon Web Services.
  - **Google Cloud Storage (GCS)** - Object storage service for Google Cloud Platform.
  - **SharePoint** - Collaborative document and file storage service in Microsoft 365.
  - **OneDrive** - Personal cloud storage service for files in Microsoft 365.

These capabilities enable flexible, T-SQL-based querying across data stored in a wide range of cloud and SaaS storage systems, 
eliminating the need for prior data ingestion or transformation before analysis.

### Relevant OPENROWSET options

Use options in `OPENROWSET` to describe the underlying file format and control how the data is parsed. These settings are especially important for delimited text files, where you need to define how rows and columns are separated. 

Common options include:

- `FIELDTERMINATOR`, `ROWTERMINATOR`, and `FIELDQUOTE` - Specify the characters that separate fields and rows. These options ensure accurate parsing of columns and records. They also handle quoted values in delimited files to preserve text that contains delimiters.
- `HEADER_ROW` and `FIRSTROW` - Indicate whether the file contains a header row and define which row should be treated as the first data row.
- `CODEPAGE` - Set the character encoding to correctly interpret special characters and non-ASCII text.

These options provide flexibility for working with various file formats and ensure that data is read correctly regardless of differences in structure or encoding.

The optional `WITH` clause in `OPENROWSET` allows you to define an [explicit schema](#schema-on-read) for the data. Providing a schema is useful when you don't want `OPENROWSET` to automatically infer the schema from the underlying files. Use the `WITH` clause to override automatic schema inference and define exactly how the data should be projected into tabular form.

## Use cases for OPENROWSET

To provide a seamless in-place querying experience for data stored in a data lake, Fabric Data Warehouse and the SQL analytics endpoint use the [OPENROWSET](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric&preserve-view=true) function to reference files and read their contents.

The `OPENROWSET` function offers rich capabilities for querying files, including:
- [Query PARQUET files](#query-parquet-files-with-openrowset) optimized for analytical workloads.
- [Query CSV files](#query-delimited-files-with-openrowset) to access row-based delimited files with configurable parsing options.
- [Query JSONL files](#query-jsonl-files-with-openrowset) commonly used for streaming and append-only data.
- [Schema on read](#schema-on-read) enables you to apply or infer schemas at query time when reading data from files.
- [Query multiple files or folders](#query-multiple-files-or-folders-with-openrowset) by leveraging patterns and wildcards.
- [Use metadata functions](#file-metadata-functions) to retrieve file-level metadata, such as file name and file path, and use it to filter files during queries.

## Query PARQUET files with OPENROWSET

Parquet is a columnar file format optimized for analytics workloads. It stores data by columns rather than by rows, which enables efficient compression, reduced I/O, and faster query performance, especially when querying a subset of columns.

The `OPENROWSET` function enables easy and intuitive access to Parquet files directly from T-SQL code. 

To query a Parquet file, provide the URL to the Parquet file by using the `OPENROWSET` function:

```sql
SELECT * FROM
OPENROWSET( BULK 'https://myaccount.dfs.core.windows.net/mycontainer/mysubfolder/data.parquet');
```

The `OPENROWSET` function returns every row from the Parquet file as a row in the result set. The columns in the result set match the schema of Parquet file.

For usage examples, see [Query Parquet files](query-parquet-files.md).

## Query delimited files with OPENROWSET

Delimited textual format is a text-based, row-oriented file format that's commonly used for data exchange and lightweight data storage. 

- Data is organized in rows separated by a **row terminator**. 
- Multiple cells within each row are separated by a **field separator**. 
- Values in the cells are separated by delimiters such as commas or tabs. 

Delimited files are widely supported and simple to produce across many systems and tools.

The most commonly used delimited format is comma-separated values format (CSV). In a CSV, the rows are separated by a new line, and values by comma optionally enclosed by double quotes. However, many variations exist, such as tab-separated values (TSV) and other custom delimited formats.

By using `OPENROWSET`, you can access delimited files directly from T-SQL in a straightforward and flexible way. This approach enables in-place querying without requiring data to be loaded into database tables first.

To query a delimited file, provide the file URL and define the appropriate parsing options when using the `OPENROWSET` function:

```sql
SELECT * FROM
OPENROWSET( BULK '/Files/mysubfolder/data.csv');
```

The `OPENROWSET` function returns every row from the delimited file as a row in the result set. The columns in the result set follow the structure of the delimited file.

You can customize how delimited text files (such as CSV, TSV, or other variants) are parsed by specifying options like field terminators, row terminators, escape characters, and other format-related settings to match your file structure.

For usage examples, see [Query delimited text files](query-delimited-files.md).

## Query JSONL files with OPENROWSET

JSON Lines (JSONL) is a line-delimited, semi-structured file format where each line contains a valid JSON object. This structure makes JSONL particularly well suited for streaming, event data, and append-only workloads, as new records can be written efficiently without rewriting the entire file.

By using the `OPENROWSET` function, you can query JSONL files directly from T-SQL. You can analyze streaming and continuously generated data in place, without requiring prior ingestion into database tables.

To query a JSONL file, provide the file URL when using the `OPENROWSET` function:

```sql
SELECT * FROM
OPENROWSET( BULK '/mysubfolder/data.jsonl', DATA_SOURCE='MyStorage');
```

When querying JSON Lines (JSONL) files, each JSON object in the file is treated as a separate row in the result set.  

Each property within the JSON object is returned as an individual column, enabling a natural relational view of line-delimited JSON data.

For usage examples, see [Query JSONL files](query-json-files.md).

## Schema-on-read

Fabric Data Warehouse enables SQL developers to apply a schema at query time when reading data directly from files stored in a data lake.

This schema-on-read approach allows data to remain in its original format while its structure is defined dynamically during querying.
You can choose between two schema-on-read models:

- **Automatic schema inference**, where Fabric analyzes the file contents and automatically determines column names and data types.
- **Explicit schema definition**, where the schema is fully defined in the query to control column names and data types.

### Automatic schema inference

Automatic schema inference enables you to query files without providing an explicit schema definition. 

Fabric Data Warehouse and the SQL analytics endpoint automatically examine the source files to identify column names and data types. They use file-level metadata, such as Parquet file headers, or analyze representative data samples for formats like CSV and JSONL.

When you omit the `WITH` clause from the `OPENROWSET` statement, Fabric Data Warehouse automatically analyzes the underlying files and derives the column names and data types at query time.

```sql
SELECT * FROM
OPENROWSET( BULK 'https://myaccount.dfs.core.windows.net/mycontainer/mysubfolder/data.parquet');
```

This approach is particularly useful for rapid exploration, evolving schemas, or scenarios where the file structure is managed outside the data warehouse. By inferring the schema dynamically, you can focus on querying the data without first defining or maintaining a fixed schema.

### Explicit schema definition

With an explicit schema definition, SQL developers control how file data is mapped to relational columns by specifying column names, data types, and, when applicable, column positions within the source files.

This approach provides precise and predictable mapping when querying files by using `OPENROWSET`.

To define the schema, add an optional `WITH` clause to your `OPENROWSET` statement.

```sql
SELECT * FROM
OPENROWSET( BULK '/Files/mysubfolder/data.parquet') 
WITH (
      Column1 int, 
      Column2 varchar(20),
      Column3 varchar(max)
);
```

Use explicit schema definition when you need strict control over column mapping and data types, or when you're working with evolving or loosely structured source files.

## Query multiple files or folders with OPENROWSET

To query data across multiple files or folders, specify a file path that includes one or more wildcard (`*`) characters.

By using wildcards, a single T-SQL query can operate over a dynamic set of files that match a naming or directory pattern.

The following rules apply when using wildcards in file paths:

- The `*` wildcard represents one or many characters and you can use it in directory paths as well as in file names.
- You can specify multiple `*` wildcards within the same path or file name to match complex patterns.
- When the path ends with recursive wildcards (for example, `/**`), the query result set includes all files located under the specified root folder and its subfolders.

The following example demonstrates how to use wildcard patterns in the file path to query multiple Parquet files across folders in a single query:

```sql
SELECT * FROM
OPENROWSET( BULK '/myroot/*/mysubfolder/*.parquet', DATA_SOURCE='MyStorage');
```

## File metadata functions

`OPENROWSET` includes metadata functions that you can use to access information about the files you're querying:

- The `filename()` function returns the name of the file from which each row originates. Use this function to filter or query specific files. For better performance, cast the result to an appropriate data type and length.
- The `filepath()` function returns the file path from which each row originates.  
  - Without parameters, returns the full file path/URI.
  - With a parameter, returns the path segment that matches the specified wildcard position.

The following example demonstrates a query that retrieves file content together with the full URI and file name for each file, returning only files from the `/year=2025/month=10` folder.

```sql
SELECT 
 rows.filepath(),
 rows.filename(),
 rows.filepath(2) AS [month],
 rows.*
FROM 
OPENROWSET(
  BULK 'https://myaccount.dfs.core.windows.net/myroot/year=2025/month=*/*.parquet'
  ) AS rows
WHERE rows.filepath(1) = '2025'
```

For more information on `filepath()` and `filename()`, see [File metadata functions](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric&preserve-view=true#file-metadata-functions).

## Related content

- [Query the warehouse or SQL analytics endpoint](query-warehouse.md)
- [Query JSON files](query-json-files.md)
- [Query Parquet files](query-parquet-files.md)
- [Query delimited files](query-delimited-files.md)
