---
title: Query Parquet Files Using Fabric Data Warehouse or SQL analytics endpoint
description: Learn how to query parquet files in data lake storage using the Fabric Data Warehouse or SQL analytics endpoint.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jovanpop
ms.date: 02/13/2026
ms.topic: how-to
ms.search.form: Query external parquet files
---

# Query Parquet files

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this article, you learn how to query read data from Parquet files by using Fabric Data Warehouse or the SQL analytics endpoint.

By using the `OPENROWSET` function in Fabric Data Warehouse or the SQL analytics endpoint, you can query the contents of a Parquet file by providing the URL to the file. The syntax of the `OPENROWSET` function is:

```syntaxsql
  OPENROWSET(BULK {{parquet-file-url}})
  [ WITH ( {{result set column schema}} ) ]
```

## How OPENROWSET handles schema

By default, the `OPENROWSET` function uses automatic schema inference to identify column names and data types directly from the referenced Parquet files.

The `OPENROWSET` function reads the column metadata from the file itself, so you can query the data without explicitly defining a schema.

When you reference multiple Parquet files, the `OPENROWSET` function infers the schema from the first file it accesses. As a result, the inferred schema might omit columns that aren't present in that file, even if those columns exist in other files. This behavior can lead to missing columns or unexpected data types in the query result.

To ensure a predictable and deterministic schema, define the column names and data types explicitly by using the `WITH` clause in the `OPENROWSET` function. Use explicit schema definition when you query multiple files or when consistent column structure is required across all files.

## Read parquet file with OPENROWSET

The simplest way to view the contents of a Parquet file is to provide the file URL directly to the `OPENROWSET` function.

The datasets used in these examples are:
- [Bing Covid 19](/azure/open-datasets/dataset-bing-covid-19)
- [NYC Yellow Taxi](/azure/open-datasets/dataset-taxi-yellow)

The following example shows how to read a Parquet file by specifying its full URL in the `OPENROWSET` statement:

```sql
SELECT TOP 10 *
FROM OPENROWSET(
    BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/ecdc_cases/latest/ecdc_cases.parquet'
);
```

In this query:

- The `BULK` argument specifies the full URI of the Parquet file in storage.
- `OPENROWSET` reads the file content and returns it as a tabular result set.
- The column names and data types are automatically inferred from the Parquet file metadata.
- The `TOP 10` clause limits the result set for easier inspection of the data.

This approach is useful for quickly exploring individual Parquet files or validating file contents before applying more advanced querying techniques, such as explicit schema definition, wildcard-based file access, or external data source configuration.

## Data source usage

The previous examples specified the full URL to the file directly in the `OPENROWSET` statement. As an alternative, you can define an external data source that points to the root location of your storage, and then reference files by using relative paths.  

Using an external data source simplifies queries, improves readability, and lets you centrally manage the storage location. If the storage endpoint changes, you only need to update the data source definition, not every query that references it.

The following example creates an external data source that points to a folder containing COVID-19 data:

```sql
CREATE EXTERNAL DATA SOURCE covid
WITH ( LOCATION = 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/ecdc_cases' );
```

After you create the external data source, reference it in the `OPENROWSET` function and specify a path relative to the data source location:

```sql
SELECT TOP 10 *
FROM OPENROWSET(
        BULK 'latest/ecdc_cases.parquet',
        DATA_SOURCE = 'covid'
    ) as rows;
```

In this example, the `DATA_SOURCE` parameter instructs `OPENROWSET` to resolve the file path relative to the external data source.

Use external data sources when you frequently query files from the same storage account or container. This approach promotes reuse, improves maintainability, and keeps query definitions concise.

## Explicitly specify schema

By default, `OPENROWSET` uses automatic schema inference to determine column names and data types from the source file. However, in many scenarios, you might want to explicitly define the schema, for example when querying multiple files, ensuring a stable schema, or selecting only a subset of columns.

Use the `WITH` clause in `OPENROWSET` to specify exactly which columns to read and their data type in the result set.

The following example demonstrates how to explicitly define a schema when reading data from a Parquet file:

```sql
SELECT TOP 10 *
FROM OPENROWSET(
        BULK 'latest/ecdc_cases.parquet',
        DATA_SOURCE = 'covid'
    ) WITH ( date_rep date, cases int, geo_id varchar(6) );
```

In this example, the `WITH` clause defines the resulting schema by specifying:

- The column names (`date_rep`, `cases`, `geo_id`)
- The data types to apply to each column in the query result

Only the columns listed in the `WITH` clause are returned, even if the Parquet file contains extra columns. This approach reduces the amount of data read and controls the shape of the result set.

Explicit schema definition is particularly important when:

- Querying multiple files that don't have identical column sets
- You require a deterministic and stable schema across query executions
- You want to override inferred data types or enforce specific data types
- The source files might evolve over time with added or optional columns

When you explicitly define a schema, `OPENROWSET` doesn't rely on schema inference. Instead, it applies the column definitions you provide in the `WITH` clause, ensuring consistent and predictable query results.

## Query a set of parquet files with OPENROWSET

The `OPENROWSET` function supports querying multiple files in a single statement by allowing you to specify a file path 
that contains wildcard (`*`) characters. 

Wildcards enable you to define a URI pattern that represents a set of files or folders rather than a single file. When a wildcard is used in the file path, all files that match the specified URI pattern are read and combined into a single result set. 

This approach is commonly used when querying partitioned data, such as files organized by date, region, or other hierarchical folder structures.

For example, you can use wildcards to:

- Query all files within a specific folder
- Query files across multiple subfolders
- Query files that share a common naming pattern

```sql
SELECT *
FROM OPENROWSET(
        BULK '/Files/puYear=*/puMonth=*/*.snappy.parquet',
        DATA_SOURCE = 'YellowTaxi'
     );
```

In this example, the wildcard characters (`*`) instruct the service to read all Parquet files that match the specified folder and file name pattern.

Wildcard-based file patterns provide a flexible and scalable way to query large collections of files directly from storage without the need to know the exact file names.

> [!NOTE]  
> This example uses a **relative path without a data source**, which works when querying files in your **Lakehouse** via its SQL analytics endpoint. In **Fabric Data Warehouse**, you must either:
> - Use an **absolute path** to the file, or  
> - Specify a **root URL** in an external data source and reference it in the `OPENROWSET` statement using the `DATA_SOURCE` option. 

## Query partitioned data with OPENROWSET

Partitioning datasets stored in a data lake into subfolders improves performance and organization.  

A common pattern is Hive or Hadoop-style partitioning, where folder names encode partition values such as year, month, or region.

The sample dataset used in this example is partitioned into separate subfolders by pickup year (`puYear`) and pickup month (`puMonth`). The `OPENROWSET` function can directly read data organized using this partitioning scheme.

The following example demonstrates how to query partitioned Parquet data and extract partition values from the file path. It returns trip data for the first three months of 2017:

```sql
SELECT
        CAST( nyc.filepath(2) AS INT), *
FROM  
    OPENROWSET(
        BULK '/Files/puYear=*/puMonth=*/*.snappy.parquet',
        DATA_SOURCE = 'YellowTaxi'
    ) AS nyc
WHERE
    nyc.filepath(1) = '2017'
    AND nyc.filepath(2) IN (1, 2, 3);
```

## Read complex types with OPENROWSET

Fabric Data Warehouse and the SQL analytics endpoint can read Parquet columns that contain complex types, such as struct or record, and array or repeated fields. When you project these columns through `OPENROWSET`, the query returns values from these complex columns as JSON text and surfaces them as **varchar** columns:

- Structs (records) are returned as JSON objects, for example, `{"a":1,"b":"x"}`.
- Arrays (repeated fields) are returned as JSON arrays, for example, `[1,2,3]`.

The following example shows how to read both a struct and an array from the same Parquet file and return them as JSON text. The JSON object and array columns are projected as **varchar(max)**.

```sql
SELECT
 StructCol,  -- JSON object (for example, {"id":123,"name":"Ada","tags":["ml","sql"]})
 ArrayCol    -- JSON array  (for example, [11,12,13])
FROM    
 OPENROWSET(
  BULK '/Files/parquet/nested/complexExample.parquet',
  DATA_SOURCE = 'MyDataSource')
 WITH ( -- Project complex Parquet columns as VARCHAR to receive JSON text.
       StructCol VARCHAR(MAX),
       ArrayCol  VARCHAR(MAX)    );
```

The content of every nested value is returned as JSON text.

| StructCol | ArrayCol |
| --- | --- |
| `{"id":123,"name":"Ada","tags":["ml","sql"]}`   | `[11,12,13]` |
| `{"id":456,"name":"Nik","tags":["dw","ai"]}`    | `[21,22]` |

- Use **varchar(8000)** or a larger type like **varchar(max)** to safely accommodate larger JSON payloads returned from complex Parquet columns.
- You can project additional complex fields, such as nested structs or arrays of structs, by adding more **varchar** columns in the `WITH` clause. Each complex field returns as JSON text.


### Access properties or elements of nested types

In many cases, you don't need the entire complex type as JSON. You need specific properties or elements for filtering, joining, or analytics. 

You can access these properties or elements in three ways:

- Use JSON functions - apply `JSON_VALUE` (scalar) or `JSON_QUERY` (object/array) over the JSON text returned from complex columns.
- Dot-path column names (structs) - specify a `.`-separated column name (for example, `[Struct.prop] TYPE`) in the `WITH` clause to project a nested field of a struct directly to a scalar column.
- JSON path after type - provide a JSON path expression right after the type in the `WITH` clause (for example, `Col INT '$.Struct.prop'`) to extract a nested scalar value.

The following example shows how to access the nested fields in Parquet:

```sql
SELECT
 -- Raw complex values (JSON text)
 UserStruct,                 -- for example, {"id":123,"name":"Ada","scores":[11,12,13]}
 ScoresArray,                -- for example, [11,12,13]

 -- Access struct fields via JSON_VALUE
 JSON_VALUE(UserStruct, '$.id')   AS UserId_json,
 JSON_VALUE(UserStruct, '$.name') AS UserName_json,

 -- Access array elements via JSON_VALUE (0-based)
 JSON_VALUE(ScoresArray, '$[0]')  AS Score1,
 JSON_VALUE(ScoresArray, '$[1]')  AS Score2,
 JSON_VALUE(ScoresArray, '$[2]')  AS Score3

FROM
 OPENROWSET(
    BULK '/Files/parquet/nested/complexExample.parquet',
    DATA_SOURCE = 'MyDataSource',
    FORMAT = 'PARQUET'
 )
 WITH (
    -- Complex columns as JSON text
    UserStruct  VARCHAR(8000) '$.UserStruct',
    ScoresArray VARCHAR(8000) '$.ScoresArray',

    -- Option A: JSON path after type
    UserId      INT           '$.UserStruct.id',
    UserName    VARCHAR(200)  '$.UserStruct.name',

    -- Option B: Dot-path column names
    [UserStruct.id]    INT,
    [UserStruct.name]  VARCHAR(200)
) AS r;
```

The following table shows sample results returned by the query that projects both raw complex columns and extracted properties using different approaches:

| `UserStruct`                                      | `ScoresArray`   | `UserId_fromJsonValue` | `UserName_fromJsonValue` | `UserId` | `UserName` | `UserStruct.id` | `UserStruct.name` |
| ----------------------------------------------- | ------------- | --------------------- | ----------------------- | ------ | -------- | ------------- | --------- |
| `{"id":123,"name":"Ada","scores":[11,12,13]}`    | `[11,12,13]`    | 123                  | `Ada`                    | 123    | `Ada`      | 123            | `Ada` |
| `{"id":456,"name":"Nik","scores":[21,22,23]}`   | `[21,22,23]`    | 456                  | `Nik`                    | 456    | `Nik`      | 456            | `Nik` |

### Expand arrays

A Parquet file might contain an array with a variable number of elements in the array, where accessing values by hardcoded indexes isn't a good solution. An example of this type of Parquet file is shown in the following table:

| Id  | Array |
| --- | --- |
| 1   | `[11,12,13]` |
| 2   | `[21,22]` |

In this case, you can expand the array and join its elements with the parent row by using `OPENJSON`. When a Parquet column contains an array (for example, `[1,2,3]`), you might want to flatten (expand) its elements so each array item appears on a separate row alongside the original parent row data.

You can do this by applying `CROSS APPLY OPENJSON(...)` over the JSON text returned from the array column.

```sql
SELECT
  r.Id,      -- Example parent column (if present in your file)
  r.Array,   -- Raw JSON array text
  a.Element  -- Flattened scalar value from the array
FROM
  OPENROWSET(
        BULK '/Files/parquet/nested/justSimpleArray.parquet',
        DATA_SOURCE = 'MyDataSource'
        ) 
    WITH ( Id INT, Array VARCHAR(MAX) ) 
    AS r
CROSS APPLY OPENJSON(r.Array) 
  WITH (Element INT '$' ) AS a;
```

`OPENROWSET` projects the array column (`Array`) as JSON array and returns one row per array element, so you can join array values with parent columns (for example, `Id`). The result of this query might look like:

| Id  | Array | Element |
| --- | --- | --- |
| 1   | `[11,12,13]`  | 11 |
| 1   | `[11,12,13]`  | 12 |
| 1   | `[11,12,13]`  | 13 |
| 2   | `[21,22,23]`  | 21 |
| 2   | `[21,22,23]`  | 22 |

For arrays of objects, replace the `WITH` clause inside `OPENJSON` to map object properties, for example:

```sql
CROSS APPLY OPENJSON(r.Array)
WITH (
    ItemId   INT,
    ItemName VARCHAR(200) ) AS a
```

## Type mapping

Parquet files contain type descriptions for every column.
The following table describes how Parquet types map to SQL native types that the `OPENROWSET` function returns.

| Parquet type | Parquet logical type (annotation) | SQL data type |
| --- | --- | --- |
| BOOLEAN | | **bit** |
| BINARY / BYTE_ARRAY | | **varbinary** |
| DOUBLE | | **float** |
| FLOAT | | **real** |
| INT32 | | **int** |
| INT64 | | **bigint** |
| INT96 | |**datetime2** |
| FIXED_LEN_BYTE_ARRAY | |**binary** |
| BINARY |UTF8 |**varchar** \* |
| BINARY |STRING |**varchar** \* |
| BINARY |ENUM|**varchar** \* |
| FIXED_LEN_BYTE_ARRAY |UUID |**uniqueidentifier** |
| BINARY |DECIMAL |**decimal** |
| BINARY |JSON |**varchar(MAX)** \* |
| BINARY |BSON | Not supported |
| FIXED_LEN_BYTE_ARRAY |DECIMAL |**decimal** |
| BYTE_ARRAY |INTERVAL | Not supported |
| INT32 |INT(8, true) |**smallint** |
| INT32 |INT(16, true) |**smallint** |
| INT32 |INT(32, true) |**int** |
| INT32 |INT(8, false) |**tinyint** |
| INT32 |INT(16, false) |**int** |
| INT32 |INT(32, false) |**bigint** |
| INT32 |DATE |**date** |
| INT32 |DECIMAL |**decimal** |
| INT32 |TIME (MILLIS)|**time** |
| INT64 |INT(64, true) |**bigint** |
| INT64 |INT(64, false) |**decimal(20,0)** |
| INT64 |DECIMAL |**decimal** |
| INT64 |TIME (MICROS) | **time** |
| INT64 |TIME (NANOS) | Not supported |
| INT64 |TIMESTAMP ([normalized to utc](https://github.com/apache/parquet-format/blob/master/LogicalTypes.md#instant-semantics-timestamps-normalized-to-utc)) (MILLIS / MICROS) | **datetime2** |
| INT64 |TIMESTAMP ([not normalized to utc](https://github.com/apache/parquet-format/blob/master/LogicalTypes.md#local-semantics-timestamps-not-normalized-to-utc)) (MILLIS / MICROS) | **bigint** \*\* |
| INT64 |TIMESTAMP (NANOS) | Not supported |
|[Complex type](https://github.com/apache/parquet-format/blob/master/LogicalTypes.md#lists) |LIST |**varchar(max)**, serialized into JSON |
|[Complex type](https://github.com/apache/parquet-format/blob/master/LogicalTypes.md#maps)|MAP|**varchar(max)**, serialized into JSON |

\* (UTF8 collation)

\*\* You should explicitly adjust the **bigint** value with the timezone offset before converting it to a datetime value.

## Related content

- [Query external data lake files](query-external-data-lake-files.md)
- [Query JSON files](query-json-files.md)
- [Query delimited files](query-delimited-files.md)