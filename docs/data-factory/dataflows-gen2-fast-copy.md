---
title: Fast copy in Dataflows Gen2
description: Learn about the fast copy feature in Dataflows Gen2 in Data Factory for Microsoft Fabric.
author: dearandyxu
ms.topic: concept-article
ms.date: 04/08/2024
ms.author: yexu
---

# Fast copy in Dataflows Gen2

This article describes the fast copy feature in Dataflows Gen2 for Data Factory in Microsoft Fabric. Dataflows help with ingesting and transforming data. With the introduction of dataflow scale out with SQL DW compute, you can transform your data at scale. However, your data needs to be ingested first. With the introduction of fast copy, you can ingest terabytes of data with the easy experience of dataflows, but with the scalable back-end of the pipeline Copy Activity.

After enabling this capability. Dataflows automatically switch the back-end when data size exceeds 100 MB, without needing to change anything during authoring of the dataflows. After the refresh of a dataflow, you can easily check in the refresh history if fast copy was used during the run by looking at the entity status in the refresh history.

With the _Require fast copy_ option enabled, you can start a debugging session to test the dataflow behavior with your data. When require fast copy isn't used on a query, the dataflow refresh is canceled, and you don't have to wait until the refresh times out.

Using the fast copy indicators in the query steps pane, you can easily check if your query can run with fast copy.

## Prerequisites

- Fabric capacity
- For file data, stored in .csv or parquet format of at least 100 MB, stored in an Azure Data Lake Storage (ADLS) Gen2 or Blob account
- For Azure SQL DB, 1 million rows or more of data.

## Connector support

Fast copy is currently only supported for the following Dataflow Gen2 connectors:

- ADLS Gen2
- Blob storage
- Azure SQL DB
- Lakehouse
- PostgreSQL

The copy activity only supports a few transformations when connecting to a file source:

- Combine files
- Select columns
- Change data types
- Rename a column
- Remove a column

Following are the supported column types:


|Supported data types per storage location  |Dataflow Gen2 Staging Lakehouse  |Fabric Lakehouse Output  |
|---------|---------|---------|
|Action     |N         |N         |
|Any     |N         |N         |
|Binary     |N         |N         |
|DateTimeZone     |Y         |N         |
|Duration     |N         |N         |
|Function     |N         |N         |
|None     |N         |N         |
|Null     |N         |N         |
|Time     |Y         |Y         |
|Type     |N         |N         |
|Structured (List, Record, Table)     |N         |N         |

You can still apply other transformations by splitting the ingestion and transformation steps into separate queries. The first query actually retrieves the data and the second query references its results so that DW compute can be used. For SQL sources, any transformation that's part of the native query is supported.

When you directly load the query to an output destination, only Lakehouse destinations are supported currently. If you want to use another output destination, you can stage the query first and reference it later.

## How to use fast copy

1. Navigate to the appropriate Fabric endpoint.
1. Navigate to a premium workspace and create a dataflow Gen2.
1. On the **Home** tab of the new dataflow, select **Options**:

   :::image type="content" source="media/dataflows-gen2-fast-copy/options.png" alt-text="Screenshot showing where to select the Options for Dataflows Gen2 on the Home tab.":::

1. Then choose the **Scale** tab on the Options dialog and select the **Allow use of fast copy connectors** checkbox to turn on fast copy. Then close the Options dialog.

   :::image type="content" source="media/dataflows-gen2-fast-copy/enable-fast-copy.png" alt-text="Screenshot showing where to enable fast copy on the Scale tab of the Options dialog.":::

1. Select **Get data** and then choose the ADLS Gen2 source, and fill in the details for your container.
1. Use the **Combine file**  functionality.

   :::image type="content" source="media/dataflows-gen2-fast-copy/preview-folder-data.png" alt-text="Screenshot showing the Preview folder data window with the Combine option highlighted.":::

1. To ensure fast copy, only apply transformations listed in the [Connector support](#connector-support) section of this article. If you need to apply more transformations, stage the data first, and reference the query later. Make other transformations on the referenced query.
1. **(Optional)** You can set the **Require fast copy** option for the query by right-clicking on it to select and enable that option.

   :::image type="content" source="media/dataflows-gen2-fast-copy/require-fast-copy.png" alt-text="Screenshot showing where to select the Require fast copy option on the right-click menu for a query.":::

1. **(Optional)** Currently, you can only configure a Lakehouse as the output destination. For any other destination, stage the query and reference it later in another query where you can output to any source.
1. Check the fast copy indicators to see if your query can run with fast copy. If so, the **Engine** type shows **CopyActivity**.

   :::image type="content" source="media/dataflows-gen2-fast-copy/refresh-details.png" alt-text="Screenshot showing the refresh details indicating the pipeline CopyActivity engine was used.":::

1. Publish the dataflow.
1. Check after refresh completed to confirm fast copy was used.

## Next steps

- [Dataflows Gen2 Overview](dataflows-gen2-overview.md)
- [Monitor Dataflows Gen2](dataflows-gen2-monitor.md)
