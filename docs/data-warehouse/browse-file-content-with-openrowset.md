---
title: "Browse File Content Before Ingestion with the OPENROWSET function"
description: Learn how to browse the contents of files and discover their schema using the OPENROWSET function before ingesting them into a Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jovanpop
ms.date: 09/08/2025
ms.topic: how-to
ms.search.form: Ingesting data
---

# Browse file content using OPENROWSET function

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

The OPENROWSET function allows you to read the contents of Parquet or CSV files and return the data as a set of rows. The files can be stored in Azure Blob Storage, Azure Data Lake Storage, or Fabric OneLake.

> [!IMPORTANT]
> Reading files from Fabric OneLake storage using the OPENROWSET function is currently in [preview](/fabric/fundamentals/preview).

You can use this feature to inspect the file contents before loading them into your data warehouse table. With OPENROWSET, you can easily explore the files you ingest into your Fabric Warehouse, understand the columns you're ingesting, and determine their types. 

For more information and examples on querying external data, see [Query external data lake files by using Fabric Data Warehouse or SQL analytics endpoint](query-external-data-lake-files.md).

Once you understand your data, you can create the tables that will be used to store the ingested file content. 

## Browse Parquet files using the OPENROWSET function

In the first example, we inspect data from a Parquet source.

Use the following code to read sample data from a file using the [OPENROWSET(BULK) function](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric&preserve-view=true) with a Parquet source:

```sql
SELECT TOP 10 * 
FROM OPENROWSET(BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.parquet') AS data
```

Since this data is publicly available and doesn't require authentication, you can easily copy this query into your Fabric warehouse and execute it without any changes.

No authentication details are needed.

You don't need to specify the `FORMAT` option, as the `OPENROWSET` function assumes you're reading the Parquet format based on the `.parquet` file extension in the URI.

## Browse CSV files using the OPENROWSET function

In the second example, we inspect data from a CSV file. 
Use the following code to read sample data from a CSV file using the OPENROWSET(BULK) function:

```sql
SELECT TOP 10 * 
FROM OPENROWSET(BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.csv') AS data
```

Since this data is publicly available and doesn't require authentication, you can easily copy this query into your Fabric warehouse and execute it without any changes. No authentication details are needed.

You don't need to specify the `FORMAT` option, as the `OPENROWSET` function assumes you're reading the `CSV` format based on the `.csv` file extension in the URI.

> [!Note]
> In the results, you might notice that the first row in this file contains the column names instead of data. In this case, you will need to modify the query using the HEADER_ROW option to skip the row and use it only for the column names. This is part of the data exploration process, as you gradually adjust the file until it matches the underlying data.

## Browse JSONL files using the OPENROWSET function

The `OPENROWSET(BULK)` function enables you to browse the JSON files in line-delimited format:

```sql
SELECT TOP 10 * 
FROM OPENROWSET(BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.jsonl') AS data
```

If the file contains line-delimited text where each line represents a valid JSON document, the `OPENROWSET` function can be used to read it directly.

You don't need to specify the `FORMAT` option explicitly. The `OPENROWSET` will automatically infer the JSONL format based on common file extensions such as `.jsonl`, `.ldjson`, or `.ndjson` in the URI. However, if you're using a different file extension for this format, you must specify `FORMAT = 'jsonl'` to ensure correct parsing.

## Read files in Fabric OneLake

The `OPENROWSET(BULK)` function enables you to read the files stored in Fabric OneLake. If your file is stored in the Files section of a lakehouse, you can read this file using the fillowing syntax:

```sql
SELECT TOP 10 * 
FROM OPENROWSET(BULK 'https://onelake.dfs.fabric.microsoft.com/<workspaceId>/<lakehouseId>/Files/latest/bing_covid-19_data.jsonl') AS data
```

Replace `<workspaceId>` and `<lakehouseId>` with the workspace and lakehouse GUIDs that you can find in the Fabric workspace URI. Make sure that you are referencing the files in the `/Files` section of a lakehouse.

> [!IMPORTANT]
> Reading files from Fabric OneLake storage using the OPENROWSET function is currently in [preview](/fabric/fundamentals/preview). See the [limitations](/sql/t-sql/statements/copy-into-transact-sql#limitations-for-onelake-as-source) that are applicable both to `COPY INTO` and `OPENROWSET(BULK)`.

<a id="reading-custom-text-files"></a>

## Read custom text files

The `OPENROWSET(BULK)` function allows you to define various options for reading custom text files. 

For example, you can specify values for `ROWTERMINATOR` and `FIELDTERMINATOR` to indicate the underlying file format.

```sql
select *
from OPENROWSET(BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.csv',
                FORMAT='CSV',
                HEADER_ROW=True,
                ROWTERMINATOR='\n',
                FIELDTERMINATOR=','
) AS data
```

In this example, we explicitly specify that we're reading a file in CSV format where each row is separated by a newline and each field is separated by a comma. The first row contains the header, which will be used for the column names.

## Explore column metadata

With the `OPENROWSET` function, you can easily view the file columns and their types by combining the query that reads sample data with the `sp_describe_first_result_set` procedure:

```sql
EXEC sp_describe_first_result_set 
N'SELECT TOP 0 * 
FROM OPENROWSET(BULK ''https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.parquet'') AS data';
```

In this example, the `sp_describe_first_result_set` procedure executes the query with the `OPENROWSET` function, which doesn't returns any rows. 

It then takes the column schema from this inner query and returns the column schema as the result of the procedure.

You can use this column schema to define the structure of the destination table in the `CREATE TABLE` statement where you ingest your data.
As an alternative, you can use these results to specify more precise types for the results of the `OPENROWSET` function, 
as shown in the following example.

## Specify the schema of OPENROWSET function

The `OPENROWSET(BULK)` function returns estimated column types based on a sample of the data.

If the sample isn't representative, you might get unexpected types or their sizes.

If you know the column types in your files, you can explicitly define the schema of the columns using the WITH clause:

```sql
SELECT TOP 10 * 
FROM OPENROWSET(BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.csv') AS data
WITH (updated date,
      load_time datetime2,
      deaths_change smallint,
      id int,
      confirmed int,
      confirmed_change int,
      deaths int,
      recovered int,
      recovered_change int,
      latitude float,
      longitude float,
      iso2 varchar(8000),
      iso3 varchar(8000),
      country_region varchar(8000),
      admin_region_1 varchar(8000),
      iso_subdivision varchar(8000),
      admin_region_2 varchar(8000)
) AS data;
```

Instead of guessing the column types, the `OPENROWSET(BULK)` function will explicitly assign the types provided in the `WITH` clause.

This way you can define more precise types, which can improve the performance of your queries.

## Next steps

After completing file exploration and creating destination tables, you can proceed with ingestion using one of the following methods:

- [Ingest data using the COPY statement](ingest-data-copy.md)
- [Ingest data using pipelines](ingest-data-pipelines.md)

## Related content

- [OPENROWSET BULK function](/sql/t-sql/functions/openrowset-bulk-transact-sql?view=fabric&preserve-view=true)
- [Query external data lake files by using Fabric Data Warehouse or SQL analytics endpoint](query-external-data-lake-files.md)