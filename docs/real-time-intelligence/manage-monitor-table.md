---
title: Manage and monitor a KQL database table
description: Learn how to manage and monitor a table and gain insights from the system information in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: how-to
ms.date: 06/15/2026
ms.subservice: rti-eventhouse
ms.search.form: Database
#customer intent: As a user, I want to learn how to manage and monitor a table in a KQL  database so that I can effectively utilize Real-Time Intelligence.
---
# Manage and monitor a table

The main page of your KQL database shows an overview of the contents and activity of your database. You can track data activity, preview tables, and gain insights into the database table schemas.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* An [eventhouse](create-eventhouse.md) in your workspace.
* A [KQL database](create-database.md) in your eventhouse.
* A KQL database table in your database. To create a new table, see [Create an empty table](create-empty-table.md).

## Navigate to a table page

1. Browse to your database from your list of **KQL databases**.  

1. In the Explorer pane, expand **Tables**. Tables may be organized in folders. Expand a folder to see the tables inside. If your tables aren't organized in folders, you can see the full list of tables under **Tables**.

1. Select a table from the list. Alternatively, in the main view area, browse to the **Tables** area and in the table card select the table name.

:::image type="content" source="media/create-database/database-table-details.png" alt-text="Screenshot of table main view area." lightbox="media/create-database/database-table-details.png":::

The table page is divided into the following sections:

A. **Table ribbon**: The ribbon provides quick access to essential actions within the table.

B. **Main view area**: The main view area displays the table name, data activity tracker, a preview of the data in the table, and the table schema.

C. **Details area**: The details area provides additional information about the table.

## Manage a table

From the table in the explorer pane, select the  **More menu** [**...**], or select an option from the table ribbon to manage the tables in the database.

:::image type="content" source="media/create-database/manage-tables.png" alt-text="Screenshot of the more menu in the table main view area." lightbox="media/create-database/manage-tables.png":::

You can perform the following actions:

* [Visually explore](user-flow-4.md) the table data.
* Write and run queries on the selected table. To learn more about KQL, see [Kusto Query Language overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context).
* Organize KQL assets into folders per asset type for easier navigation. To learn how to create a folder, see [Organize tables with folders](#organize-tables-with-folders).
* [Create a Power BI report](create-powerbi-report.md), [Dashboard](dashboard-real-time-create.md#create-a-new-dashboard), or [Notebook](notebooks.md#create-a-notebook-from-a-kql-database).
* Rename a table, delete a table, and hide or view the table details.
* [Edit a table schema](edit-table-schema.md).

### Organize tables with folders

To create a subfolder or move to an existing folder:

1. In the explorer pane, either:

    * Select the ellipsis (**...**) next to **Tables** to create a folder.    
        :::image type="content" source="media/manage-monitor-table/create-folder.png" alt-text="Screenshot of creating a folder.":::        
    * Select the ellipsis (**...**) next to the **specific table** you want to move.    
        :::image type="content" source="media/manage-monitor-table/create-table-folder.png" alt-text="Screenshot of create a folder from a specific table.":::     
1. Select **Move to** and then select **+ New folder**, or choose an existing folder.

1. To create a folder, enter a name for your folder and select **Create**. The folder is created and the table is moved to the folder.    
    :::image type="content" source="media/manage-monitor-table/folder-pop-up.png" alt-text="Screenshot of the create folder pop-up box.":::    
1. To move more than one table, either enter another folder name or select the dropdown menu and check the boxes next to the tables you want to move to the same folder.    
    :::image type="content" source="media/manage-monitor-table/tables-list.png" alt-text="Screenshot of the list of tables that can be moved to a folder.":::    
1. You can also move tables to an existing folder. To do so, select **Move to** and then select the folder you want to move the table to, or drag and drop the table into the folder.

> [!Note]
>
> * If you delete a subfolder, the tables within the folder aren't deleted but are moved back to the parent folder.
> * A subfolder is automatically deleted when there are no tables within the folder.
> * Folders can be created per asset type and the name must be unique per asset type. For example, you can have a table folder and a materialized view folder with the same name, but you can't have two table folders with the same name.

## Table details

The right information pane displays the details of the selected table.

**Size**

| Item| Description|
|---|---|
| Compressed | Total size of compressed data.|
| Original size | Total size of uncompressed data.|

**OneLake**

| Item| Description|
|---|---|
| Availability | Set OneLake availability to **Enabled** or **Disabled**. When [OneLake availability](../onelake/onelake-overview.md) is turned on, you can't rename tables. |
| Latency| The maximum time until table data is available in OneLake.|
| Since | The start time from when availability is recorded. |
| OneLake path | OneLake folder path that you can use for creating shortcuts.|

**Overview**

| Item| Description|
|---|---|
| Row count | The number of rows in the table.|
| Rows ingested last 24h | The number of rows ingested in the last 24 hours.|
| Schema last altered by | When the schema was last altered and by whom.|
| Ingestion URI | The date of the last data ingestion and the URI that you can use to get data.|
| Caching Policy | The time period in which data is cached and kept in local SSD storage. For more information, see [Caching policy](/fabric/real-time-intelligence/data-policies#caching-policy).|
| Retention Policy | The time period after which data is automatically removed from tables or materialized views. For more information, see [Data retention policy](/fabric/real-time-intelligence/data-policies#data-retention-policy).|

## Main view area

The center table information pane shows a histogram of the ingestion data, table information, and a way to preview the table data and schema insights.

**Data Activity Tracker**

| Item| Description|
|---|---|
| Ingestion | The number of rows ingested into the database.|
| Last run | The time when the histogram was last generated.|
| Time range | The time range of the histogram display. Set ranges for one hour, six hours, three days, 7 days, or 30 days. |
| Interval |Set the interval to display activity by one hour, six hours, one day, three days, 7 days, or 30 days. The interval is calculated by a full coordinated universal time (UTC) day, but displays according to the local time. |
| Refresh | Refresh your histogram.|
| Histogram | The ingestion histogram displays data by the time range and interval chosen.|

**Data preview**

| Item| Description|
|---|---|
| Quick query | Shows a preview of the table ingestion results. Displays Ingestion time, TableName, and Record. Select **Columns** to select columns and values for a pivot view.|

**Schema insights**

| Item| Description|
|---|---|
| Columns | For each column in a table, shows insights for column values, such as date ranges, minimum and maximum values, or the number of unique values.|
| Top 10 | To display the top 10 values for that column, select a column listed in the *Columns* section.|

## Related content

* [Create a KQL database](create-database.md)
* [Create an empty table](create-empty-table.md)
* [Edit a table schema](edit-table-schema.md)
* [Data management](data-management.md)
* [Manage and monitor a database](manage-monitor-database.md)
