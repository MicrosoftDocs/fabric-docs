---
title: Create a database and get data
description:
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.prod: analytics
ms.technology: data-explorer
ms.topic: how-to
ms.date: 12/04/2022

# Customer intent: I want to learn how to create a database and get data into a table.
---

# Create a database and get data

This article shows you how to create a new database in Kusto, or access an existing database and teach you how to get data which you can either query in Kusto or use in other Trident apps.

## Prerequisites

* Power BI Premium subscription. For more information on Power BI Premium subscriptions, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A workspace. For more information on how to create a workspace, see [How to create a workspace in Power BI](/power-bi/collaborate-share/service-create-the-new-workspaces).
* A data source.

## Create a new database

There are multiple ways you can create a new database in Kusto. After you have created your workspace, you can either select **Kusto Database** in the items on Kusto's dashboard, or you can create it within your selected workspace. To create a new database within your workspace:

1. Select **New** on the ribbon then select the entry titled **Kusto Database**.

    :::image type="content" source="media/database-editor/create-database.png" alt-text="Screenshot of Kusto workspace that shows the dropdown menu of the ribbon button titled New. Both the New tab and the entry titled Kusto Databse are highlighted":::

1. Enter your database name, then select **Create**. You can use alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

    :::image type="content" source="media/database-editor/new-database.png" alt-text="alt text tbd":::

## Database dashboard

|Database dashboard| Includes|
|---|---|
|Database details| - Created by: name of user <br/> - Created on: date of creation. <br/> - Query endpoint URI: ??? <br/> - Region: of user or of data??? <br/> - Last ingestion: shows when data was last ingested into this database. <br/> - Ingestion endpoint URI: ???|
|Size After Compression| Shows size of compressed data, uncompressed data, and compression ratio.|
|Top tables|  Lists the tables in your database according to data size. You can select a table to see more information.|
|Most active users| Lists the users querying data within the selected database|
|Recently updated functions|  content ???|
|Recently used queries| Coming soon|
|Recently created data connections| Coming soon|

## Access an existing database

To access existing databases:

1. Select the **Workspaces** icon on the left menu of the Trident UI and then choose a workspace.

    :::image type="content" source="media/database-editor/access-existing-database-1.png" alt-text="Screenshot of the left menu of Trident UI that shows the dropdown menu of the icon titled workspaces. The workspaces icon is highlighted.":::

1. Select **Filter** on the **New** tab then select the entry titled **Kusto Database** to filter out other types of items and select the desired database.

    :::image type="content" source="media/database-editor/access-existing-database-2.png" alt-text="Screenshot of workspace pane that shows the dropdown menu of the workspace ribbon option titled Filter. The dropdown entry titled Kusto Database is selected. Both the Filter option and Kusto Database are highlighted.":::

## Get data

Once you have created your database, you can get data in four ways:

* Azure blob/ Amazon S3.
* Files.
* Blob container.
* Event Hub. For more information on how to bring data using Event Hub, see [Event Hub- Link TBD]().

In the following tabs we will show you two ways of ingesting data:

* Azure blobs/ Amazon S3: [Information].
* Blob containers: [Information].

<!---In **Source type**, select the data source you'll use to create your table mapping.
add link for how to find SAS URI

File format type:

Show on CSV or JSON, mention other formats and things they need to know about it -->

# [Azure blob](#tab/azure-blob/)

1.On the **Home** tab, select **Get Data** then select **Get data from blob**.

    :::image type="content" source="media/database-editor/get-data.png" alt-text="Get data.":::

In the **Link to storage** field, add the [SAS URL](kusto/api/connection-strings/generate-sas-token.md) of the container and optionally enter the sample size.

1. In **Table**, enter a name for your table.

    > [!TIP]
    >  Table names can be up to 1024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.

    :::image type="content" source="media/database-editor/table-name.png" alt-text="table name.":::

1. source. SAS token. The following StormEvents blob for example: `https://kustosamples.blob.core.windows.net/samplefiles/StormEvents.csv`

    :::image type="content" source="media/database-editor/ingest-new-data.png" alt-text="Ingest new data.":::

1. Azure blob schema

    :::image type="content" source="media/database-editor/azure-blob-schema.png" alt-text="Azure blob schema.":::

# [Blob container](#tab/blob-container/)

1.On the **Home** tab, select **Get Data** then select **Get data from blob**.

:::image type="content" source="media/database-editor/get-data.png" alt-text="Get data.":::

To generate a SAS token, see [Generate a SAS token](generate-sas-token.md).

If you're using **From blob container**:

        * Enter the storage url of your blob, and optionally enter the sample size.
        * Filter your files using the **File Filters**.
        * Select a file that will be used in the next step to define the schema.

        :::image type="content" source="media/create-table-wizard/source-blob-container-storage-select.png" alt-text="Screenshot of wizard to create table using blob to create schema mapping.":::
---

1. Select **Next: Schema** to continue to the **Schema** tab.

### Schema tab

Note: we can optionally ingest the data or not.
CSV and JSON.

In the **Schema** tab, your [data format](./ingest-data-wizard.md#file-formats) and compression are automatically identified in the left-hand pane. If incorrectly identified, use the **Data format** dropdown menu to select the correct format.

**Data format:**

* If your data format is JSON, you must also select JSON levels, from 1 to 10. The levels determine the table column data division.
* If your data format is CSV, select the check box **Ignore the first record** to ignore the heading row of the file.

    :::image type="content" source="media/create-table-wizard/schema-tab-plug-in-selected.png" alt-text="Screenshot of table schema in create table wizard of the Azure Data Explorer web UI.":::

* If **Ingest data** is selected, in addition to creating the table, the wizard also ingests the data from the source selected in the **Source** tab.

    :::image type="content" source="media/create-table-wizard/ingest-data-checkbox.png" alt-text="Screenshot of the ingest data checkbox selected to ingest data into table created from the wizard.":::

* In **Mapping**, enter a name for this table's schema mapping.

    > [!TIP]
    > The mapping name should start with a letter. It can contain numbers, underscores, periods, or hyphens.

    :::image type="content" source="media/database-editor/azure-blob-schema.png" alt-text="Azure blob schema.":::

1. To add a new column, select the `+` icon on the column ribbon under **Partial data preview**:

* Enter a column name.
* Name should start with a letter, and may contain numbers, periods, hyphens, or underscores.
* The default column type is `string` but can be altered in the dropdown menu.
* Source: For table formats (CSV, TSV, etc.), each column can be linked to only one source columns. For other formats (such as JSON, Parquet, etc.), multiple columns can use the same source.

    :::image type="content" source="media/database-editor/azure-blob-summary-pane.png" alt-text="Azure blob summary pane.":::

## Quick query

To verify that you have ingested data into your database, select **Quick query** on the right-hand side of the the database dashboard.

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
