---
title: Get data overview
description: Learn about available options to get data in an Eventhouse in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: concept-article
ms.subservice: rti-eventhouse
ms.date: 08/19/2026
ai-usage: ai-assisted
#customer intent: As a customer, I want to learn about the different sources I can use to get data into an Eventhouse in Real-Time Intelligence.
---
# Get data overview

This article provides an overview of the methods available to ingest data into an Eventhouse by using the Get data experience.

:::image type="content" source="media/get-data-overview/get-data-types.png" alt-text="Screenshot of the available data types in the get data experience in Eventhouses in Real-Time Intelligence.":::

## Data sources

You can ingest data into an Eventhouse from the following sources:

* [Local file](get-data-local-file.md)
* [OneLake](get-data-onelake.md)
* [Real-Time hub](get-data-real-time-hub.md)
* [Eventstream](get-data-eventstream.md)
* [Azure storage](get-data-azure-storage.md)
* [Azure Event Hubs](get-data-event-hub.md)
* [Amazon S3](get-data-amazon-s3.md)
* [Data Factory pipeline copy](../data-factory/connector-kql-database-copy-activity.md)
* [Data Factory dataflows](../data-factory/connector-azure-data-explorer.md)
* [Eventhouse and Real-Time Dashboard business events](../real-time-hub/business-events/business-events-eventhouse.md)

### Additional data sources

If your source isn't listed, select **Connect more data sources** to use the connectors available through Real-Time hub. You can bring data into Eventstream and then into Eventhouse without leaving the Get data workflow. For these cases, select the [Connect more data sources](get-data-other-sources.md) option.

## Large message support (preview)

 [!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

When you get data from an Eventstream or a local file, the data preview includes an **Allow large values** checkbox for `string` and `dynamic` columns. When enabled, it allows individual data cells to contain values from 1 MB up to 32 MB.
This capability lets you keep a large payload together in a single cell when your scenario requires it.

For example, storing and processing a large JSON document in a single eventhouse `string` or `dynamic` column. If your scenario benefits from a more structured data model instead, you can transform the payload into separate columns by using Eventstream's [Event Processing Editor](event-streams/process-events-using-event-processor-editor.md) before ingestion, or an [eventhouse update policy](table-update-policy.md) after ingestion.

For analytics scenarios, breaking large messages into smaller, structured columns is generally more efficient. This approach can reduce memory consumption and I/O (input/output) operations when you store, index, and query the data.

 > [!IMPORTANT]
 > As part of the ingestion wizard, a schema inference mechanism scans the first 1,000 records of the incoming preview data. If it identifies a large value among those records, it automatically selects the checkbox and displays a message that notifies you that large values were detected. If a large value appears later in the data, the schema inference engine doesn't automatically detect it, and you must manually select the checkbox to ingest values larger than 1 MB per cell.
> The AVRO, Parquet, and TXT formats aren't scanned for large messages during this configuration wizard. For these formats, you must select **Allow large values** if you expect `string` or `dynamic` values to exceed 1 MB per cell.
> Large Message Support isn't supported for shortcuts (external tables), tables with Query acceleration over OneLake shortcuts. 
> OneLake data availability for tables with large value columns depends on the target size limits.

You can also turn this option on for an existing table column later. For more information, see [Allow large values for a column](edit-table-schema.md#allow-large-values-for-a-column). This change only applies to new data ingested going forward; previously ingested `string` values are truncated to the limit (`MaxValueSize` property of the default policy is 1 MB), `dynamic` values are replaced with null.

When enabled, the column uses the `BigObjectIndexed32` encoding policy, which indexes large values for query performance but increases memory consumption. To check whether the policy is enabled for a column, see [Encoding policy](manage-monitor-table.md#table-details), or view it in the table details side pane in [Manage and monitor a KQL database table](manage-monitor-table.md#table-details). For more information about the policy, see [Encoding policy types](/kusto/management/alter-encoding-policy?view=microsoft-fabric&preserve-view=true#encoding-policy-types).

## Related content

* [Overview of connectors for data ingestion](event-house-connectors.md)
* [Data formats supported by Real-Time Intelligence](ingestion-supported-formats.md)
* [Sample Gallery](sample-gallery.md)
