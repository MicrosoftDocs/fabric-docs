---
title: Configure KQL Database in a copy activity
description: This article explains how to copy data using KQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure KQL Database in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from and to KQL Database.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for KQL Database under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-kql-database/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-kql-database/source.png":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **KQL Database** from the data store type list.
- **KQL Database**: Select an existing KQL Database from the workspace.
- **Use query**: Select **Table** or **Query**.

  - **Table**: Select a table from the drop-down list or select **Edit** to manually enter it to read data..

    :::image type="content" source="./media/connector-kql-database/table.png" alt-text="Screenshot showing table." lightbox="./media/connector-kql-database/table.png":::

  - **Query**: Specify the read-only request given in a [KQL format](/azure/data-explorer/kusto/query/). Use the custom KQL query as a reference.

    :::image type="content" source="./media/connector-kql-database/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-kql-database/query.png":::

Under **Advanced**, you can specify the following fields:

- **Query timeout**: Specify the wait time before the query request times out. Default value is 10 minutes (00:10:00). Allowed max value is 1 hour (01:00:00).
- **No truncation**: Indicates whether to truncate the returned result set. By default result is truncated after 500,000 records or 64 MB. Truncation is strongly recommended for a proper behavior of the activity.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. To learn more, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).

  :::image type="content" source="./media/connector-kql-database/additional-columns.png" alt-text="Screenshot showing additional columns." lightbox="./media/connector-kql-database/additional-columns.png":::

## Destination

The following properties are supported for KQL Database under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-kql-database/destination.png" alt-text="Screenshot showing destination tab.":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **KQL Database** from the data store type list.
- **KQL Database**: Select an existing KQL Database from the workspace.
- **Table**: Select a table from the drop-down list or select **Edit** to manually enter it to write data.

Under **Advanced**, you can specify the following fields:

- **Ingestion mapping name**: The name of a mapping that was pre-created and assigned to a KQL Database destination table in advance.
- **Additional properties**: A property bag that can be used for specifying any of the ingestion properties that aren't being set already by the KQL Database destination. Specifically, it can be useful for specifying ingestion tags. To learn more, go to [Azure Data Explorer data ingestion](/azure/data-explorer/ingestion-properties).

  :::image type="content" source="./media/connector-kql-database/additional-properties.png" alt-text="Screenshot showing additional properties." lightbox="./media/connector-kql-database/additional-properties.png":::

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about a copy activity in a KQL Database.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type** |Select **KQL Database** from the data store type list.|**KQL Database**|Yes|/|
|**KQL Database** | Select an existing KQL Database from the workspace.|\<your KQL Database>|Yes |/|
|**Use query** |Select **Table** or **Query**.| • **Table**<br>  • **Query** |No| table<br> query|
|**Query timeout** |Specify the wait time before the query request times out. Default value is 10 minutes (00:10:00). Allowed maximum value is 1 hour (01:00:00).|timespan|No|queryTimeout|
|**No truncation**|Indicates whether to truncate the returned result set. By default, the result is truncated after 500,000 records or 64 MB. Truncation is strongly recommended for a proper behavior of the activity.|select or unselect|No|noTruncation: true or false|
|**Additional columns** |Add additional data columns to the store source files' relative path or static value. Expression is supported for the latter. Learn more from [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).|• Name<br>• Value|No|additionalColumns:<br>• name<br>• value |

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type** |Select **KQL Database** from the data store type list.|**KQL Database**|Yes|/|
|**KQL Database** | Select an existing KQL Database from the workspace.|\<your KQL Database>|Yes |/|
|**Table** |Your destination data table to write data.|\<your table name>|Yes|table|
|**Ingestion mapping name** | The name of a mapping that was pre-created and assigned to KQL Database destination table in advance. |\<your ingestion mapping name>|Yes|ingestionMappingName|
|**Additional properties** | A property bag that can be used for specifying any of the ingestion properties that aren't being set already by the KQL Database destination. Specifically, it can be useful for specifying ingestion tags. Learn more from [Azure Data Explorer data ingestion](/azure/data-explorer/ingestion-properties).|• Name<br> • Type<br> • Value|Yes|additionalProperties|

## Related content

- [KQL Database connector overview](connector-kql-database-overview.md)
