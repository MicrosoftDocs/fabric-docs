---
title: Configure SharePoint Online List in a copy activity
description: This article explains how to copy data using SharePoint Online List.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 03/19/2026
ms.custom:
- pipelines
- template-how-to
- connectors
- sfi-image-nochange
ai-usage: ai-assisted
---

# Configure SharePoint Online List in a copy activity

This article shows you how to use the copy activity in a pipeline to copy data from SharePoint Online List.

## Configuration options

You can configure each tab under a copy activity. Go to the following sections for details about each tab:

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, see our [General settings overview](activity-overview.md#general-settings).

### Source

The SharePoint Online List source supports the following properties under the **Source** tab of a copy activity.

**Required properties:**

- **Connection**: Select a SharePoint Online List connection from the connection list. If no connection exists, create a new HTTP connection by selecting **Browse all**, then **SharePoint Online List**, and following the [connection guide](connector-sharepoint-online-list.md) to fill out the details.
- **Use query**: Choose either **List name** or **Query** as your use query. Here's how to configure each setting:

  - **List name**: The name of the SharePoint Online list.

    :::image type="content" source="./media/connector-sharepoint-online-list/list-name.png" lightbox="./media/connector-sharepoint-online-list/list-name.png" alt-text="Screenshot that shows list name." :::

  - **Query**: The OData query to filter the data in SharePoint Online list. For example, `"$top=1"`.

    :::image type="content" source="./media/connector-sharepoint-online-list/query.png" lightbox="./media/connector-sharepoint-online-list/query.png" alt-text="Screenshot that shows query.":::

**Advanced options:**

Under **Advanced**, you can specify the following fields:

- **Request timeout**: The wait time to get a response from SharePoint Online. Default value is 5 minutes (00:05:00).
- **Additional columns**: Add other data columns to store source files' relative path or static value. Expression is supported for the latter.

  :::image type="content" source="./media/connector-sharepoint-online-list/additional-columns.png" lightbox="./media/connector-sharepoint-online-list/additional-columns.png" alt-text="Screenshot that shows additional columns.":::

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Properties reference

The following table contains more information about a copy activity in SharePoint Online List.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Use query** |You can choose **List name** or **Query** as your use query.|-**List name** <br>-**Query**|No |type|
|**List name** |The name of the SharePoint Online list.|\<your connection> |Yes|listName|
|**Request timeout** |The wait time to get a response from SharePoint Online. Default value is 5 minutes (00:05:00).| timespan |No |requestTimeout|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.| • Name<br>• Value|No |additionalColumns:<br>• name<br>• value |

## Related content

- [Set up your SharePoint Online List connection](connector-sharepoint-online-list.md)
