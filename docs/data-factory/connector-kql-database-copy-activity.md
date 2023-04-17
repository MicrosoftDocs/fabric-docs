---
title: How to configure KQL Database in copy activity
description: This article explains how to copy data using KQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/12/2023
ms.custom: template-how-to 
---

# How to configure KQL Database in copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article outlines how to use the copy activity in data pipeline to copy data from and to KQL Database.

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

    - **Tables**: The name of the table that the linked service refers to.

    :::image type="content" source="./media/connector-kql-database/table.png" alt-text="Screenshot showing table.":::

    - **Query**: Specify the query to retrieve data.

    :::image type="content" source="./media/connector-kql-database/query.png" alt-text="Screenshot showing query.":::

Under **Advanced**, you can specify the following fields:

- **Query timeout**: Specify the wait time before the query request times out. Default is 10 minutes (00:10:00).
- **No truncation**: Indicates whether to truncate the returned result set. By default result is truncated after 500,000 records or 64 MB. Truncation is strongly recommended for a proper behavior of the activity.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

    :::image type="content" source="./media/connector-kql-database/additional-columns.png" alt-text="Screenshot showing additional columns.":::

## Destination

The following properties are supported for KQL Database under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-kql-database/destination.png" alt-text="Screenshot showing destination tab.":::

The following properties are **required**:

- **Data store type**: Select **Workspace**.
- **Workspace data store type**: Select **KQL Database** from the data store type list.
- **KQL Database**: Select an existing KQL Database from the workspace.
- **Table**: The name of the table that the linked service refers to.

Under **Advanced**, you can specify the following fields:

- **Ingestion mapping name**: The name of a mapping which was pre-created and assigned to Kusto Destination table in advance.
- **Additional properties**: A property bag which can be used for specifying any of the ingestion properties which aren't being set already by the Kusto Destination. Specifically, it can be useful for specifying ingestion tags.

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
|**KQL Database** | Select an existing KQLDatabase from the workspace.|\<your KQL Database>|Yes |/|
|**Use query** |Select **Tables** or **Query**.| •**Tables**<br>  •**Query** |No| tableName<br> query|
|**Query timeout** |Specify the wait time before the query request times out. Default is 10 minutes (00:10:00).|timespan|No|queryTimeout|
|**No truncation**|Indicates whether to truncate the returned result set. By default result is truncated after 500,000 records or 64 MB. Truncation is strongly recommended for a proper behavior of the activity.|select or unselect|No|noTruncation|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|- Name<br>- Value|No|additionalColumns:<br>- name<br>- value |

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**Workspace**|Yes|/|
|**Workspace data store type** |Select **KQL Database** from the data store type list.|**KQL Database**|Yes|/|
|**KQL Database** | Select an existing KQLDatabase from the workspace.|\<your KQL Database>|Yes |/|
|**Table** |The name of the table that the linked service refers to.|\<your table name>|Yes|table|
|**Ingestion mapping name** | The name of a mapping which was pre-created and assigned to Kusto Destination table in advance.|\<your ingestion mapping name>|Yes|ingestionMappingName|
|**Additional properties** | A property bag which can be used for specifying any of the ingestion properties which aren't being set already by the Kusto Destination. Specifically, it can be useful for specifying ingestion tags.|- Name<br> - Type<br> - Value|Yes|additionalProperties:<br> -name<br> -type:<br>Array<br>Object<br>Node<br>  -value|