---
title: Get data from a blob in Real-time Analytics
description: Learn get blob data in a KQL Database.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 04/18/2023
ms.search.form: product-kusto
---

# Get data from a blob

In this article, you'll learn you how to get data from an Azure blob or blob container into an existing database. 

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md)
* [KQL Database](create-database.md)
* An Azure blob or blob container with data

## Get data from a blob

You can get data from two types of blobs:

* Azure blob: Blob Storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that doesn't adhere to a particular data model or definition, such as text or binary data. For more information on Azure blob storage, see [Introduction to Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction).
* Blob container: A container organizes a set of blobs, similar to a directory in a file system. A storage account can include an unlimited number of containers, and a container can store an unlimited number of blobs. For more information on blob containers, see [Manage blob containers using Azure portal](/azure/storage/blobs/blob-containers-portal).

1. On the lower ribbon, select **Get Data** > **Get data from blob**.

    :::image type="content" source="media/database-editor/get-data.png" alt-text="Get data.":::

1. In **Table**, enter a name for your table.

    :::image type="content" source="media/database-editor/table-name.png" alt-text="table name.":::

    > [!TIP]
    >  Table names can be up to 1024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Select **Next: Source**.

In the next section of this document, choose the tab that corresponds to the type of blob you want to ingest.

### [Azure Blob](#tab/azure-blob/)

1. In **Source type** select Azure blob.
1. In the **Link to source** field, add the Account Key/SAS URI.

    To add a blob URI, you need to generate an Account Key/ SAS token with both List and Read permissions. To generate an Account Key/SAS token, see <!-- [TODO- Generate a SAS token](generate-sas-token.md). -->

    The blob you add will be the basis for the schema tab. You can add up to 10 items of up to 1-GB uncompressed size each. If you upload more than one item, you can change the schema-defining blob by selecting the star icon on the right side of the source link field.

    :::image type="content" source="media/database-editor/ingest-new-data.png" alt-text="Ingest new data.":::

1. Select **Next: Schema** to view and edit your table column configuration.

### [Blob container](#tab/blob-container/)

1. In **Source type**, select Blob container.
1. In **Link to source** field, add the Account Key/SAS URI.

    To add a blob URI, you need to generate an Account Key/ SAS token with both List and Read permissions. To generate an Account Key/SAS token, see <!-- [TODO- Generate a SAS token](generate-sas-token.md). -->

    :::image type="content" source="media/database-editor/ingest-new-data-blob-container.png" alt-text="Screenshot of data ingestion pane for blob containers.":::

1. Optionally, you can filter data to be ingested with **File filters**. You can filter by file extension, folder path, or both.

    **Filter by file extension**: for example, filter for all files with a CSV extension.

    **Filter by folder path**: you can either enter a full or partial folder path, or folder name.

    :::image type="content" source="media/database-editor/file-filters-blob-container.png" alt-text="Screenshot of file filters for blob container.":::

1. Select **Next: Schema** to view and edit your table column configuration.

---

### Schema

Your data format and compression are automatically identified in the left-hand pane. If incorrectly identified, use the **Data format** drop-down menu to select the correct format.

* If your data format is JSON, you must also select JSON levels, from 1 to 10. The levels determine the table column data division.
* If your data format is CSV, select the check box **Ignore the first record** to ignore the heading row of the file.

For more information on data formats, see <!-- [TODO- Data formats supported by Azure Data Explorer for ingestion](ingestion-supported-formats.md).-->

1. In the **Mapping name** field, enter a mapping name. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

    :::image type="content" source="media/database-editor/azure-blob-schema.png" alt-text="Azure blob schema.":::

    >[!NOTE]
    >
    > The tool automatically infers the schema based on your data. If you want to change the schema to add and edit columns, you can do so under [Partial data preview](#partial-data-preview).
    >
    >You can optionally use the [Command viewer](#command-viewer) to view and copy the automatic commands generated from your inputs.

1. Select **Next: Summary**. To skip to the summary pane explanation, select [Complete data ingestion](#complete-data-ingestion).

#### Command viewer

The command viewer shows the commands for creating tables, mapping, and ingesting data in tables.

To open the command viewer, select the **v** button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

:::image type="content" source="media/database-editor/question-command-viewer.png" alt-text="Screenshot of command editor.":::

#### Partial data preview

The partial data preview is automatically inferred based on your data. You can change the data preview by editing and adding new columns.

To add a new column, select the **+** button on the right-hand column under **Partial data preview**.

:::image type="content" source="media/database-editor/partial-data-preview.png" alt-text="Screenshot of Partial data preview pane.":::

* The column name should start with a letter, and may contain numbers, periods, hyphens, or underscores.
* The default column type is `string` but can be altered in the drop-down menu of the Column type field.
* Source: for table formats (CSV, TSV, etc.), each column can be linked to only one source column. For other formats (such as JSON, Parquet, etc.), multiple columns can use the same source.

:::image type="content" source="media/database-editor/azure-blob-new-column.png" alt-text="Screenshot of new column pane in schema window.":::

Select **Next: Summary** to create a table and mapping and to begin data ingestion.

### Complete data ingestion

In the **Data ingestion completed** window, all three steps will be marked with green check marks when data ingestion finishes successfully.

:::image type="content" source="media/database-editor/azure-blob-summary-pane.png" alt-text="Screenshot of ingested complete dialog box with data preview.":::

## Quick query

To verify that you have ingested data into your database, select **Quick query** on the right-hand side of the database landing page. You can then save your query as a KQL Query Set by selecting **Save as Query Set**.

:::image type="content" source="media/database-editor/quick-query.png" alt-text="Screenshot of the Quick query button.":::

For more information on KQL Query Set, see <!-- [TODO- KQL query set]().-->

## Next steps

* To create an empty table, see <!--[TODO- Create table]().-->
* To manage your database, see [Manage](database-management.md).
* To create, store, and export queries, see [Query data in the KQL Queryset](kusto-query-set.md)
