---
title: How to configure SharePoint Online List in copy activity
description: This article explains how to copy data using SharePoint Online List.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 03/21/2023
ms.custom: template-how-to 
---

# How to configure SharePoint Online List in copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines how to use the copy activity in data pipeline to copy data from and to SharePoint Online List.

## Supported format

SharePoint Online List supports the following file formats. Refer to each article for format-based settings.

- Avro format
- Binary format
- Delimited text format
- Excel format
- JSON format
- ORC format
- Parquet format
- XML format

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to General.

### Source

The following properties are supported for SharePoint Online List under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-sharepoint-online-list/source.png" alt-text="Screenshot showing source tab and the list of properties.":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an SharePoint Online List connection from the connection list. If no connection exists, then create a new HTTP connection by selecting **New**.
- **Use query**: You can choose **List name**, **Query** as your use query. See the configuration of each setting below.

    - **List name**: The name of the SharePoint Online list.
    - **Query**: The OData query to filter the data in SharePoint Online list. For example, "$top=1".

    :::image type="content" source="./media/connector-sharepoint-online-list/query.png" alt-text="Screenshot showing query.":::

- **List name**: The name of the SharePoint Online list.

    :::image type="content" source="./media/connector-sharepoint-online-list/list-name.png" alt-text="Screenshot showing list name.":::

Under **Advanced**, you can specify the following fields:

- **Request timeout**: The wait time to get a response from SharePoint Online. Default value is 5 minutes (00:05:00).
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

    :::image type="content" source="./media/connector-sharepoint-online-list/additional-columns.png" alt-text="Screenshot showing additional columns.":::

### Mapping

For **Mapping** tab configuration, see Settings

### Settings

For **Settings** tab configuration, see Settings

## Table summary

To learn more information about copy activity in SharePoint Online List, see the following table.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Use query** |You can choose **List name**, **Query** as your use query.|-**List name** <br>-**Query**|No |type|
|**List name** |The name of the SharePoint Online list.|\<your connection> |Yes|listName|
|**Request timeout** |The wait time to get a response from SharePoint Online. Default value is 5 minutes (00:05:00).| timespan |No |requestTimeout|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.| •Name<br>•Value|No |additionalColumns:<br>- name<br>- value |

## Next steps

[How to create SharePoint Online List connection](connector-sharepoint-online-list.md)