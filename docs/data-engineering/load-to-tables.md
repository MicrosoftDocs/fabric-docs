---
title: Lakehouse Load to Delta Lake tables
description: Learn all about the Lakehouse Load to Table feature.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: lakehouse load to delta lake tables
---

# Load to Delta Lake table

The [Lakehouse](lakehouse-overview.md) in Microsoft Fabric provides a feature to efficiently load common file types to an optimized Delta table ready for analytics. The _Load to Table_ feature allows users to load a single file or a folder of files to a table. This feature increases productivity for data engineers by allowing them to quickly use a right-click action to enable table loading on files and folders. Loading to the table is also a **no-code experience**, which lowers the entry bar for all personas.  

## Load to Table capabilities overview

Here's a list of features that we have enabled in the integrated load to table experience to provide our users with flexibility while increasing their productivity:

- **Supported file types:** This feature currently only supports loading PARQUET or CSV file types. File extension case doesn't matter.

- **Single-file load:** Users can load a single file of their choice in one of the supported formats by selecting "Load to Delta Table" in the context menu action of the file.

- **Folder-level load:** You can load all files under a folder and its subfolders at once by selecting "Load to Delta Table" after clicking on a folder. This feature automatically traverses all files and loads them to a Delta Table. It's important to note that only files of the same type can be loaded at the same time to a table.

- **Load to new and existing table:** User can choose to load their files and folders to a new table or an existing table of their choice. If they decide to choose to load to an existing table, they have the option to either append or overwrite their data in the table.

- **CSV Source file option:** For CSV files, we allow user to specify if their source file includes headers they would like to leverage as column names. Users can also specify a separator of their choice to override the default comma separator in place.

- **Loaded as Delta Tables:** Tables are always loaded using the Delta Lake table format with V-Order optimization enabled.

   :::image type="content" source="media\load-to-tables\load-to-tables-overview.gif" alt-text="Gif of overall load folder to table experience." lightbox="media\load-to-tables\load-to-tables-overview.gif":::

## Validation guidelines and rules

The following standard applies to the Load to table experience:

- Table names can only contain alphanumeric characters and underscores. It also allows any English letter, upper or lower case, and underscore (**```_```**), with a max length of **256 characters**. No dashes (**```-```**) or space characters are allowed.

- Text files without column headers are replaced with standard **```col#```** notation as the table column names.

- Column names allow any English letter, upper or lower case, underscore (**```_```**), and characters in other language such as Chinese in UTF, length up to **32 characters**. Column names are validated during the load action. The Load to Delta algorithm replaces forbidden values with underbar (**```_```**). If no proper column name is achieved during validation, the load action fails.

- For CSV files, separator can't be empty, be longer than **8 characters** or use any of the following characters: **```(```**, **```)```**, **```[```**, **```]```**,**```{```**, **```}```**, single quote (**```'```**), double quote (**```"```**), and white space.

## Related content

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [CSV file upload to Delta for Power BI reporting](get-started-csv-upload.md)
