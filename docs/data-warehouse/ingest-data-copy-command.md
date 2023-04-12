---
title: Ingest data into your Synapse Data Warehouse using the COPY command
description: Follow steps to ingest data into a Synapse Data Warehouse using the COPY command in Microsoft Fabric.
author: periclesrocha
ms.author: procha
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: how-to
ms.search.form: Ingesting data
---

# Ingest data into your Synapse Data Warehouse using the COPY command

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article explains how to use the COPY statement in [!INCLUDE [product-name](../includes/product-name.md)] warehouse for data ingestion from external storage accounts. The COPY statement is the only mechanism available in T-SQL to ingest external data into Microsoft Fabric Warehouse tables.

## Syntax

This is the currently supported syntax for [!INCLUDE [product-name](../includes/product-name.md)] warehouse:

```sql
COPY INTO [warehouse.][schema.]table_name
[(Column_list)] 
FROM '<external_location>' [,...n]
WITH ( 
    [FILE_TYPE = {'CSV' | 'PARQUET'} ]
    [,CREDENTIAL = (AZURE CREDENTIAL) ]
    [,MAXERRORS = max_errors ]
    [,ERRORFILE = '[http(s)://storageaccount/container]/errorfile_directory[/]'] 
    [,ERRORFILE_CREDENTIAL = (AZURE CREDENTIAL) ]
    [,COMPRESSION = {'Gzip' | 'Snappy'}] 
    [,FIELDQUOTE = 'string_delimiter'] 
    [,FIELDTERMINATOR = 'field_terminator']
    [,ROWTERMINATOR = 'row_terminator']
    [,FIRSTROW = first_row]
    [,ENCODING = {'UTF8'|'UTF16'}] 
    )
```

> [!NOTE]
> For a detailed explanation of the arguments listed above, refer to [COPY (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=azure-sqldw-latest&preserve-view=true). The Known limitations section of this article lists limitations of the COPY statement on Microsoft Fabric warehouse.

## Examples

### A. Ingesting a CSV with header file from a public container:

```sql
CREATE TABLE dbo.Region (
    [Country] varchar(4000),
    [Region] varchar(4000)
)

COPY INTO dbo.Region
FROM 'https://mystorageaccountxxx.blob.core.windows.net/public/Region.csv'
WITH (
    FILE_TYPE = 'CSV',
    FIRSTROW = 2
)
```

### B. Ingesting a PARQUET file from a private container using a Shared Access Signature (SAS):

```sql
COPY INTO dbo.Region
FROM 'https://mystorageaccountxxx.blob.core.windows.net/private/Region.csv'
WITH (
    FILE_TYPE = 'PARQUET',
    CREDENTIAL = (IDENTITY = 'Shared Access Signature', SECRET = 'xxx')
)
```

To ingest multiple files in a directory, specify only the container name. For example:

```sql
FROM 'https://mystorageaccountxxx.blob.core.windows.net/private/mydirectorywithfiles'
```

## C. Load with a column list with default values authenticating via Storage Account Key

```sql
--Note when specifying the column list, input field numbers start from 1
COPY INTO dbo.test_1 (Column_one default 'myStringDefault' 1, Column_two default 1 3)
FROM 'https://myaccount.blob.core.windows.net/myblobcontainer/folder1/'
WITH (
    FILE_TYPE = 'CSV',
    CREDENTIAL=(IDENTITY= 'Storage Access Signature', SECRET='xxx'),
    --CREDENTIAL should look something like this:
    --CREDENTIAL=(IDENTITY= 'Storage Account Key', SECRET='x6RWv4It5F2msnjelv3H4DA80n0PQW0daPdw43jM0nyetx4c6CpDkdj3986DX5AHFMIf/YN4y6kkCnU8lb+Wx0Pj+6MDw=='),
    FIELDQUOTE = '"',
    FIELDTERMINATOR=',',
    ROWTERMINATOR='0x0A',
    ENCODING = 'UTF8',
    FIRSTROW = 2
)
```

## D. Specifying a maximum number of rows to reject before the operation is canceled: 

```sql
--Note when specifying the column list, input field numbers start from 1
COPY INTO dbo.Region (Column_one default 'myStringDefault' 1, Column_two default 1 3)
FROM 'https://mystorageaccountxxx.blob.core.windows.net/private/Region.csv'
WITH (
    FILE_TYPE = 'CSV',
    CREDENTIAL=(IDENTITY= 'Storage Access Signature', SECRET='xxx'),
    MAXERRORS = 2,
    ERRORFILE = '[http(s)://storageaccount/container]/errorfile_directory[/]]',
    ERRORFILE_CREDENTIAL = (IDENTITY= 'Storage Access Signature', SECRET='xxx'),
    FIELDTERMINATOR=',',
    ROWTERMINATOR='0x0A'
)
```

## Known limitations

- The following arguments are not currently available for the COPY statement on[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)]:

```sql
[,DATEFORMAT = 'date_format']
[,IDENTITY_INSERT = {'ON' | 'OFF'}]
[,AUTO_CREATE_TABLE   = {'ON' | 'OFF'}]
```

- When working with parquet files, column names must match exactly in the source and destination. If the name of the column in target table is different than that of the column name in the parquet file, the target table column is filled with NULL.
- At the moment, the only supported authentication type is Shared Access Signature (SAS) for both the source storage account, as well as the destination used for the ERRORFILE argument. Loading data from public storage accounts that allow anonymous access is supported.


## Next steps

- [Ingest data into your warehouse using Data pipelines](ingest-data-pipelines.md)
- [Tables in Fabric data warehousing](tables.md)
- [Ingesting data into the Synapse Data Warehouse](ingest-data.md)