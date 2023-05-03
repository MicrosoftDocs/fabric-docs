---
title: How to configure KQL Database in copy activity
description: This article explains how to copy data using KQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# How to configure KQL Database in copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to KQL Database.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for KQL Database under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-kql-database/source.png" alt-text="Screenshot showing source tab and the list of properties.":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **KQL Database** from the data store type list.
- **KQL Database**: Select an existing KQL Database from the workspace.
- **Use query**: Select **Tables** or **Query**.

    - **Tables**: The name of the table that the connection refers to.

        :::image type="content" source="./media/connector-kql-database/table.png" alt-text="Screenshot showing table.":::

    - **Query**: Specify the read-only request given in a [KQL format](/azure/data-explorer/kusto/query/). Use the custom KQL query as a reference.

        :::image type="content" source="./media/connector-kql-database/query.png" alt-text="Screenshot showing query.":::

Under **Advanced**, you can specify the following fields:

- **Query timeout**: Specify the wait time before the query request times out. Default value is 10 minutes (00:10:00). Allowed max value is 1 hour (01:00:00).
- **No truncation**: Indicates whether to truncate the returned result set. By default result is truncated after 500,000 records or 64 MB. Truncation is strongly recommended for a proper behavior of the activity.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. Learn more from this [article](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).

    :::image type="content" source="./media/connector-kql-database/additional-columns.png" alt-text="Screenshot showing additional columns.":::

## Destination

The following properties are supported for KQL Database
 under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-kql-database/destination.png" alt-text="Screenshot showing destination tab.":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **KQL Database** from the data store type list.
- **KQL Database**: Select an existing KQL Database from the workspace.
- **Table**: The name of the table that the connection refers to.

Under **Advanced**, you can specify the following fields:

- **Ingestion mapping name**: The name of a mapping which was pre-created and assigned to KQL Database destination table in advance. Learn more from [Azure Data Explore data ingestion](/azure/data-explorer/ingestion-properties).
- **Additional properties**: A property bag which can be used for specifying any of the ingestion properties which aren't being set already by the KQL Database destination. Specifically, it can be useful for specifying ingestion tags.

    :::image type="content" source="./media/connector-kql-database/additional-properties.png" alt-text="Screenshot showing additional properties.":::

### Mapping

For **Mapping** tab configuration, see Mapping.

### Settings

For **Settings** tab configuration, see Settings.

## Table summary

To learn more information about copy activity in KQL Database, see the following table.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type** |Select **KQL Database** from the data store type list.|**KQL Database**|Yes|/|
|**KQL Database** | Select an existing KQL Database from the workspace.|\<your KQL Database>|Yes |/|
|**Use query** |Select **Tables** or **Query**.| •**Tables**<br>  •**Query** |No| table<br> query|
|**Query timeout** |Specify the wait time before the query request times out. Default value is 10 minutes (00:10:00). Allowed max value is 1 hour (01:00:00).|timespan|No|queryTimeout|
|**No truncation**|Indicates whether to truncate the returned result set. By default result is truncated after 500,000 records or 64 MB. Truncation is strongly recommended for a proper behavior of the activity.|select or unselect|No|noTruncation: true or false|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. Learn more from this [article](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).|- Name<br>- Value|No|additionalColumns:<br>- name<br>- value |

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type** |Select **KQL Database** from the data store type list.|**KQL Database**|Yes|/|
|**KQL Database** | Select an existing KQL Database from the workspace.|\<your KQL Database>|Yes |/|
|**Table** |The name of the table that the connection refers to.|\<your table name>|Yes|table|
|**Ingestion mapping name** | The name of a mapping which was pre-created and assigned to KQL Database destination table in advance. Learn more from [Azure Data Explore data ingestion](/azure/data-explorer/ingestion-properties).|\<your ingestion mapping name>|Yes|ingestionMappingName|
|**Additional properties** | A property bag which can be used for specifying any of the ingestion properties which aren't being set already by the KQL Database destination. Specifically, it can be useful for specifying ingestion tags.|- Name<br> - Type<br> - Value|Yes|additionalProperties|

## Next steps

[KQL Database connector overview](connector-kql-database-overview.md)