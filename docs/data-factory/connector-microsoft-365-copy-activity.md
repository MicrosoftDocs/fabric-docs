---
title: How to configure Microsoft 365 in copy activity
description: This article explains how to copy data using Microsoft 365.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 03/06/2023
ms.custom: template-how-to 
---

# How to configure Microsoft 365 in copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines how to use the copy activity in data pipeline to copy data from and to Microsoft 365.

## Supported format

Microsoft 365 supports the following file formats. Refer to each article for format-based settings.

- Avro format
- Binary format
- Delimited text format
- Excel format
- JSON format
- ORC format
- Parquet format
- XML format

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Settings](#settings)

>[!Note]
>Destination is not supported in Microsoft 365 connector.

### General

For **General** tab configuration, go to General.

### Source

The following properties are supported for Microsoft 365 under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-microsoft-365/source.png" alt-text="Screenshot showing source tab.":::

The following some properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an **Microsoft365** connection from the connection list. If no connection exists, then create a new Amazon S3 connection by selecting **New**.
- **Table**: Name of the dataset to extract from **Microsoft 365**. Refer [here](https://learn.microsoft.com/en-us/graph/data-connect-datasets#datasets) for the list of Microsoft 365 (Office 365) datasets available for extraction.

Under **Advanced**, you can specify the following fields:

- **Scope**: When `allowedGroups` property is not specified, you can use a predicate expression that is applied on the entire tenant to filter the specific rows to extract from Microsoft 365 (Office 365). The predicate format should match the query format of Microsoft Graph APIs, e.g. `https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance'`.

- **Date filter**: Name of the DateTime filter column. Use this property to limit the time range for which Microsoft 365 (Office 365) data is extracted.

:::image type="content" source="./media/connector-microsoft-365/data-filter.png" alt-text="Screenshot showing data filter.":::

- **Output columns**: Array of the columns to copy to sink.

:::image type="content" source="./media/connector-microsoft-365/output-columns.png" alt-text="Screenshot showing output columns.":::

### Settings

For **Settings** tab configuration, see Settings

## Table summary

The following tables contain more information about the copy activity in Microsoft 365.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External**|Yes|type|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Table**|Name of the dataset to extract from Microsoft 365 (Office 365). Refer [here](https://learn.microsoft.com/en-us/graph/data-connect-datasets#datasets) for the list of Microsoft 365 (Office 365) datasets available for extraction.||Yes||
|**Scope**|When `allowedGroups` property is not specified, you can use a predicate expression that is applied on the entire tenant to filter the specific rows to extract from Microsoft 365 (Office 365). The predicate format should match the query format of Microsoft Graph APIs, e.g. `https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance'`.|:---|Yes|:---|
|**Date filter**|Name of the DateTime filter column. Use this property to limit the time range for which Microsoft 365 (Office 365) data is extracted.|:---|Yes|:---|
|**Output columns**|Array of the columns to copy to sink.|:---|Yes|:---|

## Next steps

[How to create Microsoft 365 connection](connector-microsoft-365.md)