---
title: How to configure OData in copy activity
description: This article explains how to copy data using OData.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/20/2023
ms.custom: template-how-to 
---

# How to configure OData in copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines how to use the copy activity in data pipeline to copy data from and to OData.

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for OData under **Source** tab of a copy activity.

:::image type="content" source="./media/connector-odata/source.png" alt-text="Screenshot showing source tab.":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an OData connection from the connection list. If no connection exists, then create a new OData connection by selecting **New**.
- **Path**: Select the path to the OData resource. Or you can select Edit to enter the path manually.
Under **Advanced**, you can specify the following fields:

- **Use query**: You can choose **Path**, **Query** as your use query. See the configuration of each setting below.
     - **Path**: Read data from the specified path if you select this button.
     - **Query**: OData query options for filtering data. Example: `"$select=Name,Description&$top=5"`.

    >[!Note]
    >The OData connector copies data from the combined URL: [URL specified in the connection]/[path specified]?[query specified in copy activity source]. For more information, see [OData URL components](https://www.odata.org/documentation/odata-version-3-0/url-conventions/).
    
- **Request timeout**: Timeout for the HTTP request to get a response. Format is in timespan. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:05:00.
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
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection\> |Yes|connection|
|**Path** | The path to the OData resource.|\<the path to the OData resource\>|Yes |path|
|**Use query** |You can choose **Path**, **Query** as your use query.|-**Path** <br>-**Query**|No |query|
|**Request timeout** |Timeout for the HTTP request to get a response. Format is in timespan. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:05:00.| timespan |No |requestTimeout|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|- Name<br>- Value|No |additionalColumns:<br>- name<br>- value|

## Next steps

[How to create OData connection](connector-odata.md)