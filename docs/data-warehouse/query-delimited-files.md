---
title: "Query Delimited (CSV/TSV) Files By Using Fabric Data Warehouse or SQL Analytics Endpoint"
description: Learn how to query delimited text files in data lake storage using the Fabric Data Warehouse or SQL analytics endpoint.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jovanpop
ms.date: 02/11/2026
ms.topic: how-to
ms.search.form: Query external delimited files
---

# Query delimited files

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this article, learn how to query CSV files by using Fabric SQL, including Fabric Data Warehouse and the SQL analytics endpoint. CSV is a commonly used and flexible data format, but files can vary significantly in structure, which affects how you query them.

The examples in this article demonstrate how to query CSV files that differ in common characteristics, including:

- Files with or without a header row
- Comma-delimited and tab-delimited values
- Windows (CRLF) and Unix (LF) line endings
- Quoted and non-quoted values, including escaped characters

Each variation is covered in the sections that follow, with practical examples that show how to configure your queries to correctly interpret the file format and return accurate results when working with CSV data in Fabric.

## Read a CSV file with OPENROWSET

The simplest way to inspect the contents of a CSV file is to provide the file URL directly to the `OPENROWSET` function.

If the file is publicly accessible, or if your Microsoft Entra ID has permission to access the storage location, you can query the file by using a statement similar to the following example:

```sql
SELECT TOP 10 *
FROM OPENROWSET(
    BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/ecdc_cases/latest/ecdc_cases.csv',
    HEADER_ROW = TRUE
);
```

## Read a TSV file with OPENROWSET

You can use `OPENROWSET` to read tab-separated values (TSV) files by providing the file URL directly. 

Make sure the URL points to the correct file and ends with the .tsv extension to clearly indicate the format:

```sql
SELECT TOP 10 *
FROM OPENROWSET(
    BULK '/Files/curated/covid-19/ecdc_cases/latest/ecdc_cases.tsv'
);
```

> [!NOTE]
> This example uses a **relative path without a data source**, which works when querying files in your **Lakehouse** via its SQL analytics endpoint. In **Fabric Data Warehouse**, you must either:
> - Use an **absolute path** to the file, or  
> - Specify a **root URL** in an external data source and reference it in the `OPENROWSET` statement. 

If the file extension isn't .tsv, you can still read it as a tab-separated file by overriding the default delimiter.

Use the `FIELDTERMINATOR = '\t'` option in the `OPENROWSET` statement to specify the tab character as the column separator.

## Read a delimited file with OPENROWSET

`OPENROWSET` enables reading generic delimited files such as CSV, TSV, or other text-based formats by specifying the appropriate delimiters and options. 

```sql
SELECT TOP 10 *
FROM OPENROWSET(
    BULK '/Files/covid-19/ecdc_cases/latest/ecdc_cases.txt',
    FORMAT = 'CSV',                -- Use CSV for delimited files
    FIELDTERMINATOR = ';',         -- Column delimiter
    ROWTERMINATOR = '\n',          -- Row delimiter
    FIELDQUOTE = '0x0A',           -- Optional: quote character
    FIRSTROW = 2,                  -- Skip header row
    CODEPAGE = '855'               -- Character encoding
);
```

1. Use `FIELDTERMINATOR` and `ROWTERMINATOR` to define the column and row delimiters for your file. These options ensure that the query correctly interprets the structure of the data.
1. If your file contains a header row that you don't want to include in the results, use the `FIRSTROW` option to skip it. This option is especially useful for files where the first line contains column names rather than data.
1. Finally, specify the `CODEPAGE` to ensure proper character encoding. This option is important when working with files that include special characters or use nonstandard encodings, as it guarantees accurate interpretation of the data.

> [!NOTE]  
> This example uses a **relative path without a data source**, which works when querying files in your **Lakehouse** via its SQL analytics endpoint. In **Fabric Data Warehouse**, you must either:
> - Use an **absolute path** to the file, or  
> - Specify a **root URL** in an external data source and reference it in the `OPENROWSET` statement. 

## Related content

- [Query external data lake files](query-external-data-lake-files.md)
- [Query JSON files](query-json-files.md)
- [Query Parquet files](query-parquet-files.md)