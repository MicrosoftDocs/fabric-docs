---
title: Get data from Amazon S3
description: Learn how to get data from Amazon S3 in a KQL database in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/16/2023
ms.search.form: Get data in a KQL Database
---
# Get data from Amazon S3

In this article, you learn how to get data from Amazon S3 into either a new or existing table. Amazon S3 is an object storage service built to store and retrieve data.

For more information on Amazon S3, see [What is Amazon S3?](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions
* An Amazon S3 bucket with data

## Source

1. On the lower ribbon of your KQL database, select **Get Data**.

    In the **Get data** window, the **Source** tab is selected.

1. Select the data source from the available list. In this example, you're ingesting data from **Amazon S3**.

    :::image type="content" source="media/get-data-amazon-s3/select-data-source.png" alt-text="Screenshot of get data window with source tab selected." lightbox="media/get-data-amazon-s3/select-data-source.png":::

## Configure

1. Select a target table. If you want to ingest data into a new table, select **+New table** and enter a table name.

    > [!NOTE]
    > Table names can be up to 1024 characters including spaces, alphanumeric, hyphens, and underscores. Special characters aren't supported.

1. In the **URI** field, paste the connection string of a single bucket, or an individual object in the following format.

    > Bucket: `https://`*BucketName*`.s3.`*RegionName*`.amazonaws.com;AwsCredentials=`*AwsAccessID*`,`*AwsSecretKey*

    Optionally, you can apply bucket filters to filter data according to a specific file extension.

    :::image type="content" source="media/get-data-amazon-s3/configure-tab.png" alt-text="Screenshot of configure tab with new table entered and an Amazon S3 connection string pasted." lightbox="media/get-data-amazon-s3/configure-tab.png":::

1. Select **Next**.

## Inspect

The **Inspect** tab opens with a preview of the data.

To complete the ingestion process, select **Finish**.

:::image type="content" source="media/get-data-amazon-s3/inspect-data.png" alt-text="Screenshot of the inspect tab." lightbox="media/get-data-amazon-s3/inspect-data.png":::

Optionally:

* Select **Command viewer** to view and copy the automatic commands generated from your inputs.
* Use the **Schema definition file** dropdown to change the file that the schema is inferred from.
* Change the automatically inferred data format by selecting the desired format from the dropdown. For more information, see [Data formats supported by Real-Time Analytics](ingestion-supported-formats.md).
* [Edit columns](#edit-columns).
* Explore [Advanced options based on data type](#advanced-options-based-on-data-type).

[!INCLUDE [get-data-edit-columns](../includes/real-time-analytics/get-data-edit-columns.md)]

:::image type="content" source="media/get-data-amazon-s3/edit-columns.png" alt-text="Screenshot of columns open for editing." lightbox="media/get-data-amazon-s3/edit-columns.png":::

[!INCLUDE [mapping-transformations](../includes/real-time-analytics/mapping-transformations.md)]

### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Advanced** > **Keep table schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.
* To use the first row as column names, select  **Advanced** > **First row is column header**.

    :::image type="content" source="media/get-data-amazon-s3/advanced-csv.png" alt-text="Screenshot of advanced CSV options.":::

**JSON**:

* To determine column division of JSON data, select **Advanced** > **Nested levels**, from 1 to 100.
* If you select **Advanced** > **Skip JSON lines with errors**, the data is ingested in JSON format. If you leave this check box unselected, the data is ingested in multijson format.

    :::image type="content" source="media/get-data-amazon-s3/advanced-json.png" alt-text="Screenshot of advanced JSON options.":::

## Summary

In the **Data preparation** window, all three steps are marked with green check marks when data ingestion finishes successfully. You can select a card to query, drop the ingested data, or see a dashboard of your ingestion summary.

:::image type="content" source="media/get-data-amazon-s3/summary.png" alt-text="Screenshot of summary page with successful ingestion completed." lightbox="media/get-data-amazon-s3/summary.png":::

## Related content

* To manage your database, see [Manage data](data-management.md)
* To create, store, and export queries, see [Query data in a KQL queryset](kusto-query-set.md)
