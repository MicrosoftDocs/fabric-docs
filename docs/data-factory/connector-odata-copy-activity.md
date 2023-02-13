---
title: How to configure OData in copy activity
description: This article explains how to copy data using OData.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 02/09/2023
ms.custom: template-how-to 
---

# How to configure OData in copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to OData.

## Supported format

OData supports the following file formats.

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, see General.

### Source

The following properties are supported for OData under **Source** tab of a copy activity.

:::image type="content" source="./media/connector-odata/source.png" alt-text="Screenshot showing source tab.":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an OData connection from the connection list.
- **Path**: Select path that you want to use.

Under **Advanced**, you can specify the following fields:

- **Use query**: You can choose **Table**, **Query** as your use query. See the configuration of each settings below.
     - **Table**: Read data from the table you specified in **Table** above if you select this button.
     - **Query**: OData query options for filtering data. Example: `"$select=Name,Description&$top=5"`.

- **Request timeout**: Timeout for the HTTP request to get a response. Format is in TimeSpan. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:05:00.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

    :::image type="content" source="./media/connector-odata/additionalcolumns.png" alt-text="Screenshot showing additional columns.":::

### Mapping

For **Mapping** tab configuration, see Mapping.

### Settings

For **Settings** tab configuration, see Settings.

## Table summary

To learn more information about copy activity in OData, see the following table.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|-**Workspace**<br> -**External**<br>  -**Sample dataset**<br>|Yes|type|
|**Connection** |Your connection to the source data store.|< your connection> |Yes|connection|
|**Path** | Select the container that you want to use.|< connection of your source >|Yes |path|
|**Use query** |You can choose **Table**, **Query** as your use query.|-**Table** <br>-**Query**|No |query|
|**Request timeout** |Timeout for the HTTP request to get a response. Format is in TimeSpan. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:05:00.| timeSpan |No |requestTimeout|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|- Name<br>- Value|No |additionalColumns:<br>- name<br>- value|

## Next Steps

[How to create OData connection](connector-odata.md)