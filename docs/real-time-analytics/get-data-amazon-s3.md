---
title: Get data from Amazon S3 in Real-Time Analytics
description: Learn how to get data from Amazon S3 in a KQL database in Real-Time Analytics
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 06/26/2023
ms.search.form: product-kusto
---
# Get data from Amazon S3

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this article, you learn how to get data from Amazon S3. Amazon S3 is an object storage service built to store and retrieve data.

For more information on Amazon S3, see [What is Amazon S3?](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md)
* An Amazon S3 bucket with data.

## Get data

1. On the lower ribbon, select **Get Data** > **Amazon S3**.
1. Enter a name for your table. By default, **New table** is selected.

      > [!NOTE]
      > Table names can be up to 1024 characters including alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. Select **Next: Source**.

### Source tab

1. In the **Link to source** field, paste the connection string of your bucket, or individual object in the following format.

    > Bucket: `https://`*BucketName*`.s3.`*RegionName*`.amazonaws.com`
    >
    > Object: *ObjectName*`;AwsCredentials=`*AwsAccessID*`,`*AwsSecretKey*

     :::image type="content" source="media/get-data-amazon-s3/source-tab.png" alt-text="Screenshot of the source tab in the Ingest data window showing the source type and link. The source link is highlighted.":::
   
1. Select **Next: Schema** to view and edit your table column configuration.

### Schema tab

Your data format and compression are automatically identified in the left-hand pane. If incorrectly identified, use the **Data format** dropdown menu to select the correct format.

* If your data format is JSON, you must also select JSON levels, from 1 to 10. The levels determine the table column data division.
* If your data format is CSV, select the check box **Ignore the first record** to ignore the heading row of the file.

For more information on data formats, see [Data formats supported for ingestion](/azure/data-explorer/ingestion-supported-formats?context=/fabric/context/context&pivots=fabric).

1. The **Mapping name** field is automatically filled. Optionally, you can enter a new name. You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

    :::image type="content" source="media/get-data-amazon-s3/amazon-s3-schema.png" alt-text="Screenshot of Schema window showing the data configuration." lightbox="media/get-data-amazon-s3/amazon-s3-schema.png":::

    >[!NOTE]
    >
    > The tool automatically infers the schema based on your data. If you want to change the schema to add and edit columns, you can do so under [Partial data preview](#partial-data-preview).
    >
    > You can optionally use the [Command viewer](#command-viewer) to view and copy the automatic commands generated from your inputs.

1. Select **Next: Summary**. To skip to the summary pane explanation, select [Complete data ingestion](#complete-data-ingestion).

#### Command viewer

The command viewer shows the commands for creating tables, mapping, and ingesting data in tables.

To open the command viewer, select the **v** button on the right side of the command viewer. In the command viewer, you can view and copy the automatic commands generated from your inputs.

:::image type="content" source="media/get-data-amazon-s3/amazon-s3-command-viewer.png" alt-text="Screenshot of Command viewer pane showing mapping commands." lightbox="media/get-data-amazon-s3/amazon-s3-command-viewer.png":::

#### Partial data preview

The partial data preview is automatically inferred based on your data. You can change the data preview by editing existing columns and adding new columns.

1. To add a new column, select the **+** button on the right-hand column under **Partial data preview**.

    :::image type="content" source="media/get-data-amazon-s3/amazon-s3-partial-preview.png" alt-text="Screenshot of Partial data preview pane." lightbox="media/get-data-amazon-s3/amazon-s3-partial-preview.png":::

    * The column name should start with a letter, and may contain numbers, periods, hyphens, or underscores.
    * The default column type is `string` but can be altered in the drop-down menu of the Column type field.
    * Source: for table formats (CSV, TSV, etc.), each column can be linked to only one source column. For other formats (such as JSON, Parquet, etc.), multiple columns can use the same source.

1. Select **Next: Summary** to create a table and mapping and to begin data ingestion.

### Complete data ingestion

In the **Data ingestion completed** window, all three steps are marked with green check marks when data ingestion finishes successfully.

## Next steps

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
