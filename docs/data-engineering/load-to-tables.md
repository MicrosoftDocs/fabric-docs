---
title: Lakehouse Load to Delta Lake tables
description: Learn how to use Load to tables in the Fabric portal to load CSV and Parquet files into Delta tables.
ms.reviewer: avinandac
ms.topic: how-to
ms.date: 03/01/2026
ai-usage: ai-assisted
ms.search.form: lakehouse load to delta lake tables
---

# Load to Delta Lake tables

In the Fabric portal, you can use **Load to tables** from the [Lakehouse home page](lakehouse-overview.md) to turn CSV or Parquet files into Delta tables.

> [!NOTE]
> In the current **Load to tables** flow, you can't define a custom column schema (for example, explicit column names and data types) from the Lakehouse home page. Use a notebook when you need explicit column schema control. 

## What you can do in the Fabric portal

In the Fabric portal, the Lakehouse home page supports the following actions when you use **Load to tables**:

- Start from either a single file or a folder.
- Load into either a new table or an existing table.
- Load **CSV** or **Parquet** data and keep output in Delta format with V-Order optimization.

For field-by-field behavior (including when options like **File type**, **Append**/**Overwrite**, **Column header**, and **Separator** appear), see [Fields by load path](#fields-by-load-path).

   :::image type="content" source="media\load-to-tables\load-to-tables-new.png" alt-text="Screenshot of the option to load to a new Delta table" lightbox="media\load-to-tables\load-to-tables-new.png":::

## Fields by load path

When you use **Load to tables**, the dialog title and fields change based on your path:

- **Source**: file or folder.
- **Target**: new table or existing table.
- **Format**: CSV or Parquet.

Dialog titles follow those choices (for example, **Load file to new table**, **Load folder to new table**, **Load file to existing table**, or **Load folder to existing table**).

### Fields by scenario

| Field | When you see it | What to enter or select | Validation and behavior |
|---|---|---|---|
| **Schema** (dropdown) | New table and existing table paths | Destination Lakehouse schema namespace | Select the namespace where the table is created or updated. |
| **New table name** | New table paths only | Name for the destination Delta table | Use alphanumeric characters and underscores (`_`) only, up to 256 characters. Dashes (`-`) and spaces aren't allowed. |
| **Load mode** (**Append** or **Overwrite**) | Existing table paths only | How to load into the selected existing table | Choose **Append** to add rows, or **Overwrite** to replace existing data. |
| **File type** | Folder paths only | Folder load format (**CSV** or **Parquet**) | All files in one folder load action must match the selected file type. |
| **Column header** (checkbox) | CSV paths only | Whether to use the first row as column names | If checked, Fabric uses first-row values as column names. If not checked (or headers don't exist), Fabric assigns defaults such as `_c0`, `_c1`, `_c2`. |
| **Separator** (text box) | CSV paths only | CSV delimiter value | Can't be empty, can't be longer than 8 characters, and can't include `(`, `)`, `[`, `]`, `{`, `}`, `'`, `"`, or whitespace. |
| **Column names** (resulting names) | CSV paths after header handling | Resulting column names from file headers or defaults | Names can include English letters (upper or lower case), underscores (`_`), and UTF characters (for example, Chinese), up to 128 characters. Invalid characters are replaced with underscores. If a valid name can't be produced, the load fails. |

After required fields are set for your path, select **Load**.

## Related content

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [CSV file upload to Delta tables for Power BI reporting](get-started-csv-upload.md)
