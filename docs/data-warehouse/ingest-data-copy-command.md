---
title: Ingest data into your warehouse using the COPY command
description: Follow steps to ingest data using the COPY command.
ms.reviewer: WilliamDAssafMSFT
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/15/2023
---

# Ingest data into your warehouse using the COPY command

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

> [!TIP]
> Applies to: Warehouse

The goal of the COPY statement is to allow customers to ingest data into a [!INCLUDE [product-name](../includes/product-name.md)] warehouse from storage accounts of types:

- Azure Blob Store (WASB) and
- Azure ADLS Gen2

And for file types:

- CSV
- Parquet

COPY can load files from public containers or from private containers with authentication using Shared Access Signature (SAS) only.

This is the currently supported syntax for DW [!INCLUDE [product-name](../includes/product-name.md)] COPY:

```
COPY INTO [schema.]table_name
[(Column_list)] 
FROM ‘<external_location>’ [,...n]
WITH
 ( 
 [FILE_TYPE = {'CSV' | 'PARQUET' '} ]
 [,CREDENTIAL = (AZURE CREDENTIAL) ]
 [,COMPRESSION = { 'Gzip' | ’Snappy’}] 
 [,FIELDQUOTE = ‘string_delimiter’] 
 [,FIELDTERMINATOR = ‘field_terminator’]
 [,ROWTERMINATOR = ‘row_terminator’]
 [,FIRSTROW = first_row]
 [,ENCODING = {'UTF8'|'UTF16'}] 
```

> [!NOTE]
> At the moment, the only supported authentication type is Shared Access Signature (SAS). You can also load data from public storage accounts that allow anonymous access.

Find an explanation for each supported option: [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=azure-sqldw-latest).

## Examples

Ingesting a CSV file from a public container:

```
CREATE TABLE dbo.Region
    (
     [Country] nvarchar(4000),
     [Region] nvarchar(4000)
    )

COPY INTO dbo.Region
FROM 'https://mystorageaccountxxx.blob.core.windows.net/public/Region.csv'
WITH
(
    FILE_TYPE = 'CSV'
    ,FIRSTROW = 2
)
GO
```

Ingesting a CSV file from a private container:

```
COPY INTO dbo.Region
FROM 'https://mystorageaccountxxx.blob.core.windows.net/private/Region.csv'
WITH
(
    FILE_TYPE = 'CSV'
,CREDENTIAL = ( IDENTITY = 'Shared Access Signature', SECRET = 'xxx')
    ,FIRSTROW = 2
)
GO
```

To ingest multiple files in a directory, specify only the container name. For example:

```
...
FROM 'https://mystorageaccountxxx.blob.core.windows.net/private/mydirectorywithCSVs’)
```

## Known limitations

The below syntax will be available at Public Preview/GA timeframe but isn't currently available.

```
[,MAXERRORS = max_errors ]
[,ERRORFILE = '[http(s)://storageaccount/container]/errorfile_directory[/]'] 
[,ERRORFILE_CREDENTIAL = (AZURE CREDENTIAL) ]
[,DATEFORMAT = ‘date_format’]
[,IDENTITY_INSERT = {‘ON’ | ‘OFF’}]
[,AUTO_CREATE_TABLE   = {‘ON’ | ‘OFF’}]
```

Other known limitations:

- When you load PARQUET files, column names must match exactly in the source and destination. If the name of the column in target table is different than that of the column name in the parquet file, that column is filled with NULL.
- Identity enforcement isn't currently supported.
- Auto create table isn't currently supported. If using the COPY command, you must create your table in advance.

## Next steps

- [Ingest data into your warehouse using Data pipelines](ingest-data-pipelines.md)
