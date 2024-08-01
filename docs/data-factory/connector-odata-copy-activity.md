---
title: Configure OData in a copy activity
description: This article explains how to copy data using OData.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure OData in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from and to OData.

## Supported configuration

For the configuration of each tab under the copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for OData under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-odata/source.png" alt-text="Screenshot showing source tab." lightbox="./media/connector-odata/source.png":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an OData connection from the connection list. If no connection exists, then create a new OData connection by selecting **New**.
- **Path**: Select the path to the OData resource. Or you can select **Edit** to enter the path manually.

Under **Advanced**, you can specify the following fields:

- **Use query**: You can choose **Path** or **Query** as your use query.  The following list describes the configuration of each setting.
  - **Path**: Read data from the specified path if you select this button.
  - **Query**: OData query options for filtering data. Example: `"$select=Name,Description&$top=5"`.

    >[!Note]
    >The OData connector copies data from the combined URL: [URL specified in the connection]/[path specified]?[query specified in copy activity source]. For more information, go to [OData URL components](https://www.odata.org/documentation/odata-version-3-0/url-conventions/).

- **Request timeout**: Timeout for the HTTP request to get a response. Format is in timespan. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:05:00.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

    :::image type="content" source="./media/connector-odata/additionalcolumns.png" alt-text="Screenshot showing additional columns." lightbox="./media/connector-odata/additionalcolumns.png":::

### Mapping

For the **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following table contains more information about the copy activity in OData.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection\> |Yes|connection|
|**Path** | The path to the OData resource.|\<the path to the OData resource\>|Yes |path|
|**Use query** |You can choose **Path** or **Query** as your use query.|• **Path** <br>• **Query**|No |query|
|**Request timeout** |Timeout for the HTTP request to get a response. Format is in timespan. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:05:00.| timespan |No |requestTimeout|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|- Name<br>- Value|No |additionalColumns:<br>- name<br>- value|

## Related content

- [Set up your OData connection](connector-odata.md)
