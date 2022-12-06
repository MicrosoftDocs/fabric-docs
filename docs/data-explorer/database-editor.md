---
title: Create a database and get data
description: Learn how to create a database and get data in Kusto for Trident.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.prod: analytics
ms.technology: data-explorer
ms.topic: how-to
ms.date: 12/06/2022

# Customer intent: I want to learn how to create a database and get data into a table.
---

# Create a database and get data

This article shows you how to create a new database in Kusto, or access an existing database and teach you how to get data that you can either query in Kusto or use in other Trident apps.

## Prerequisites

* Power BI Premium subscription. For more information on Power BI Premium subscriptions, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A workspace. For more information on how to create a workspace, see [How to create a workspace in Power BI](/power-bi/collaborate-share/service-create-the-new-workspaces).
* A data source.

## Create a new database

There are multiple ways you can create a new database in Kusto. After you've created your workspace, you can either select **Kusto Database** in the items on Kusto's dashboard, or you can create it within your selected workspace. To create a new database within your workspace:

1. Select **New** on the ribbon then select the entry titled **Kusto Database**.

    :::image type="content" source="media/database-editor/create-database.png" alt-text="Screenshot of Kusto workspace that shows the dropdown menu of the ribbon button titled New. Both the New tab and the entry titled Kusto Database are highlighted":::

1. Enter your database name, then select **Create**. You can use alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

    :::image type="content" source="media/database-editor/new-database.png" alt-text="alt text tbd":::

## Database dashboard

:::image type="content" source="media/database-editor/database-dashboard.png" alt-text="Screenshot of database dashboard. ":::

|Card | Item| Description|
|---|---|---|
|**Database details**|
| | Created by | User name of person who created the database.
| | Created on | Date of database creation.
| | Query endpoint URI | URI that can be used for programmatic ingestion
| | Region | TBD
| | Last ingestion | TBD
| | Ingestion endpoint URI | TBD
| **Size**|
| | Compressed| Shows size of compressed data, uncompressed data, and compression ratio.
| | Uncompressed
| | Compression ratio
|**Top tables**|  
| | Name | Lists the names of tables in your database. You can select a table to see more information.
| | Size | Shows the size of your database. The tables are listed in a descending order according to the data size.
|**Most active users**|
| | Name | User name of most active users in the database.
| | Queries run last month | TBD
|**Recently updated functions**
| | TBD |  content TBD
|**Recently used queries**|
| | TBD | Coming soon
|**Recently created data connections**
| | TBD | Coming soon|

## Access an existing database

To access existing databases:

1. Select the **Workspaces** icon on the left menu of the Trident UI > choose a workspace.

    :::image type="content" source="media/database-editor/access-existing-database-1.png" alt-text="Screenshot of the left menu of Trident UI that shows the dropdown menu of the icon titled workspaces. The workspaces icon is highlighted.":::

1. Select **Filter** on the **New** tab > select the entry titled **Kusto Database** to filter out other types of items and select the desired database.

    :::image type="content" source="media/database-editor/access-existing-database-2.png" alt-text="Screenshot of workspace pane that shows the dropdown menu of the workspace ribbon option titled Filter. The dropdown entry titled Kusto Database is selected. Both the Filter option and Kusto Database are highlighted.":::

## Get data

Once you've created your database, you can get data in four ways:

* Azure blob/ Amazon S3.
* Files.
* Blob container.
* Event Hub. For more information on how to bring data using Event Hub, see [Event Hub- Link TBD]().

The following steps show you how to ingest data from a blob.

1. On the **Home** tab, select **Get Data** > select **Get data from blob**.

    :::image type="content" source="media/database-editor/get-data.png" alt-text="Get data.":::

1. In **Table**, enter a name for your table.

    > [!TIP]
    >  Table names can be up to 1024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.

    :::image type="content" source="media/database-editor/table-name.png" alt-text="table name.":::

1. Select **Next: Source**.

In the following tabs we'll show you two types of blobs:

* Azure blobs/ Amazon S3: [Information].
* Blob containers: [Information].

To add a blob URI, you need to generate an Account Key/ SAS token. To generate an Account Key/SAS token, see [Generate a SAS token](generate-sas-token.md).

# [Azure Blob](#tab/blob/)

1. In **Source type** select Azure blob.
1. In the **Link to source** field, add the Account Key/SAS URI.

   You can add up to 10 items of up to 1GB uncompressed size each. If you upload more than 1 item, you can change the selection by selecting the star icon on the right side of the source link field.

    :::image type="content" source="media/database-editor/ingest-new-data.png" alt-text="Ingest new data.":::

# [Blob container](#tab/blob-container/)

1. In **Source type**, select Blob container.
1. In **Link to source** field, add the Account Key/SAS URI.

    :::image type="content" source="media/database-editor/ingest-new-data-blob-container.png" alt-text="Screenshot of data ingestion pane for blob containers.":::

## Filter data

Optionally, you can filter data to be ingested with **File filters**. You can filter by file extension, folder path, or both.

**Filter by file extension**: for example, filter for all files with a CSV extension.

**Filter by folder path**: you can either enter a full or partial folder path, or folder name.

:::image type="content" source="media/database-editor/file-filters-blob-container.png" alt-text="Screenshot of file filters for blob container.":::

---

### Schema

1. Select **Next: Schema** to view and edit your table column configuration.

    Your data format and compression are automatically identified in the left-hand pane. If incorrectly identified, use the **Data format** drop-down menu to select the correct format.

    * If your data format is JSON, you must also select JSON levels, from 1 to 10. The levels determine the table column data division.
    * If your data format is CSV, select the check box **Ignore the first record** to ignore the heading row of the file.

    For more information on data formats, see [Data formats supported by Azure Data Explorer for ingestion](ingestion-supported-formats.md).

1. In the **Mapping name** field, enter a mapping name. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

    :::image type="content" source="media/database-editor/azure-blob-schema.png" alt-text="Azure blob schema.":::

### Command viewer

To open the command viewer, select the **v** button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

:::image type="content" source="media/database-editor/question-command-viewer.png" alt-text="Screenshot of command editor.":::

### Partial data preview

To add a new column, select the **+** button on the right-hand column under **Partial data preview**.

* The column name should start with a letter, and may contain numbers, periods, hyphens, or underscores.
* The default column type is `string` but can be altered in the drop-down menu of the Column type field.
* Source: for table formats (CSV, TSV, etc.), each column can be linked to only one source column. For other formats (such as JSON, Parquet, etc.), multiple columns can use the same source.

:::image type="content" source="media/database-editor/azure-blob-new-column.png" alt-text="Screenshot of new column pane in schema window.":::

Select **Next: Summary** to create a table and mapping and to begin data ingestion.

### Complete data ingestion

In the **Data ingestion completed** window, all three steps will be marked with green check marks when data ingestion finishes successfully.

:::image type="content" source="media/database-editor/azure-blob-summary-pane.png" alt-text="Screenshot of ingested complete dialog box with data preview.":::

### Quick query

To verify that you have ingested data into your database, select **Quick query** on the right-hand side of the database dashboard.

>[!Note]
>
> `Quick query` is for temporary querying only. You can't store, share, or export your queries. For those actions, create a KQL Query set.

## Manage

To manage your data, select **Manage** on the **home** tab.
You can alter your Data retention policy, Continuous export, and configure Data connections.

### Data Retention policy

:::image type="content" source="media/database-editor/data-retention-policy.png" alt-text="Screenshot of data retention policy pane.":::

### Continuous export

:::image type="content" source="media/database-editor/continuous-export.png" alt-text="Screenshot of Continuous Export dropdown pane.":::

### Data connections

Ingestion can be done as a one-time operation, or as a continuous method using Event Hub. To establish a continuous data connection, see [Event Hub- Link TBD]().

:::image type="content" source="media/database-editor/data-connections.png" alt-text="Screenshot of Data Connections pane.":::

## Next steps

Create empty table [if it's going to be a different doc].
