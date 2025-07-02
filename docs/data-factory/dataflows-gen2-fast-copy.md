---
title: Fast copy in Dataflow Gen2
description: Learn about the fast copy feature in Dataflow Gen2 in Data Factory for Microsoft Fabric.
author: dearandyxu
ms.topic: article
ms.date: 4/21/2025
ms.author: yexu
ms.custom: dataflows, sfi-image-nochange
---

# Fast copy in Dataflow Gen2

This article describes the fast copy feature in Dataflow Gen2 for Data Factory in Microsoft Fabric. Dataflows help with ingesting and transforming data. With the introduction of dataflow scale out with SQL DW compute, you can transform your data at scale. However, your data needs to be ingested first. With the introduction of fast copy, you can ingest terabytes of data with the easy experience of dataflows, but with the scalable back-end of the pipeline Copy Activity.

After you enable this capability, dataflows automatically switch the back-end when data size exceeds a particular threshold, without needing to change anything during authoring of the dataflows. After the refresh of a dataflow, you can check in the refresh history to see if fast copy was used during the run by looking at the **Engine** type that appears there.

With the _Require fast copy_ option enabled, the dataflow refresh is canceled if for some reason fast copy can't be used. This cancellation helps you avoid waiting for a refresh time out to continue. This behavior can also be helpful in a debugging session to test the dataflow behavior with your data while reducing wait time. Using the fast copy indicators in the query steps pane, you can easily check if your query can run with fast copy.

:::image type="content" source="media/dataflows-gen2-fast-copy/fast-copy-indicators.png" alt-text="Screenshot showing where the fast copy indicator appears in the query steps pane.":::

## Prerequisites

- You must have a Fabric capacity.
- For file data, files are in CSV or Parquet format of at least 100 MB, and stored in an Azure Data Lake Storage (ADLS) Gen2 or a blob storage account.
- For a database, including Azure SQL DB and PostgreSQL, 5 million rows or more of data in the data source.

> [!NOTE]
> You can bypass the threshold to force Fast Copy by selecting the **Require fast copy** setting.

## Connector support

Fast copy is currently supported for the following Dataflow Gen2 connectors:

- ADLS Gen2
- Blob storage
- Azure SQL DB
- Lakehouse
- PostgreSQL
- On premise SQL Server
- Warehouse
- Oracle
- Snowflake

The copy activity only supports a few transformations when connecting to a file source:

- Combine files
- Select columns
- Change data types
- Rename a column
- Remove a column

You can still apply other transformations by splitting the ingestion and transformation steps into separate queries. The first query actually retrieves the data and the second query references its results so that DW compute can be used. For SQL sources, any transformation that's part of the native query is supported.

Currently, fast copy only supports directly loading to a Lakehouse destination. If you want to use another output destination, you can stage the query first and reference it in a later query with a different destination.

## How to use fast copy

1. In Fabric, navigate to a premium workspace and create a Dataflow Gen2.
1. On the **Home** tab of the new dataflow, select **Options**:

   :::image type="content" source="media/dataflows-gen2-fast-copy/options.png" alt-text="Screenshot showing where to select the Options for Dataflow Gen2 on the Home tab." lightbox="media/dataflows-gen2-fast-copy/options.png":::

1. Select the **Scale** tab in the **Options** dialog, and then select **Allow use of fast copy connectors** to turn on fast copy. Then close the **Options** dialog.

   :::image type="content" source="media/dataflows-gen2-fast-copy/enable-fast-copy.png" alt-text="Screenshot showing where to enable fast copy on the Scale tab of the Options dialog.":::

1. Select **Get data**, choose the ADLS Gen2 source, and fill in the details for your container.
1. Select the **Combine**  button.

   :::image type="content" source="media/dataflows-gen2-fast-copy/preview-folder-data.png" lightbox="media/dataflows-gen2-fast-copy/preview-folder-data.png" alt-text="Screenshot showing the Preview folder data window with the Combine option highlighted.":::

1. To ensure fast copy, only apply transformations listed in the [Connector support](#connector-support) section of this article. If you need to apply more transformations, stage the data first, and reference the staged data query in a later query. Make other transformations on the referenced query.
1. **(Optional)** You can set the require fast copy option for the query by right-clicking the query, then selecting the **Require fast copy** option.

   :::image type="content" source="media/dataflows-gen2-fast-copy/require-fast-copy.png" alt-text="Screenshot showing where to select the Require fast copy option on the right-click menu for a query.":::

1. **(Optional)** Currently, you can only configure a Lakehouse as the output destination. For any other destination, stage the query and reference it later in another query where you can output to any source.
1. Check the fast copy indicators to ensure your query can run with fast copy. If so, the **Engine** type shows **CopyActivity**.

   :::image type="content" source="media/dataflows-gen2-fast-copy/refresh-details.png" alt-text="Screenshot showing the refresh details indicating the pipeline CopyActivity engine was used." lightbox="media/dataflows-gen2-fast-copy/refresh-details.png":::

1. Publish the dataflow.
1. Check after refresh completes to confirm fast copy was used.

## How to split your query to use fast copy

For optimal performance when processing large volumes of data with Dataflow Gen2, use the fast copy feature to first ingest data into staging, then transform it at scale with SQL DW compute. This approach significantly enhances end-to-end performance.

To implement this approach, fast copy indicators can guide you to split the query into two parts: data ingestion to staging and large-scale transformation with SQL DW compute. You're encouraged to push as much of the evaluation of a query to fast copy that can be used to ingest your data. When fast copy indicators show that the rest of the steps can't be executed by fast copy, you can split the rest of the query with staging enabled.

### Step diagnostics indicators

|Indicator|Icon|Description|
|---------|----|-------|
|**This step is going to be evaluated with fast copy**|:::image type="icon" source="media/dataflows-gen2-fast-copy/green-indicator.png":::|The fast copy indicator tells you that the query up to this step supports fast copy.|
|**This step is not supported by fast copy**|:::image type="icon" source="media/dataflows-gen2-fast-copy/red-indicator.png":::|The fast copy indicator shows that this step doesn't support fast copy.|
|**One or more steps in your query are not supported by fast query**|:::image type="icon" source="media/dataflows-gen2-fast-copy/yellow-indicator.png":::|The fast copy indicator shows that some steps in this query support fast copy, while others don't. To optimize, split the query: yellow steps (potentially supported by fast copy) and red steps (not supported).|

### Step-by-step guidance

After you complete your data transformation logic in Dataflow Gen2, the fast copy indicator evaluates each step to determine how many steps can use fast copy for better performance.

In the following example, the last step shows a red icon, indicating that the **Group By** step isn't supported by fast copy. However, all previous steps showing the yellow icon can be potentially supported by fast copy.

   :::image type="content" source="media/dataflows-gen2-fast-copy/query-step-one.png" alt-text="Screenshot showing the contents of the first query with the last step in red." lightbox="media/dataflows-gen2-fast-copy/query-step-one.png":::

At this point if you directly publish and run your Dataflow Gen2, it doesn't use the fast copy engine to load your data.

   :::image type="content" source="media/dataflows-gen2-fast-copy/none-fast-copy-result.png" alt-text="Screenshot showing the result of the query without fast copy enabled." lightbox="media/dataflows-gen2-fast-copy/none-fast-copy-result.png":::

To still use the fast copy engine and improve the performance of your Dataflow Gen2, you can split your query into two parts: data ingestion to staging and large-scale transformation with SQL DW compute. The following steps describe this process:

1. Delete any transformations showing red, indicating that they aren't supported by fast copy, along with the destination (if defined).

   :::image type="content" source="media/dataflows-gen2-fast-copy/query-step-two.png" alt-text="Screenshot showing the first query, where you deleted any steps that don't support fast copy." lightbox="media/dataflows-gen2-fast-copy/query-step-two.png":::

2. The fast copy indicator now shows green for the remaining steps, meaning your first query can use fast copy for better performance.

   Right-click on your first query, select **Enable staging**, right-click on you first query again, and select **Reference**.

   :::image type="content" source="media/dataflows-gen2-fast-copy/query-step-three.png" alt-text="Screenshot showing the selections required to reference your fast copy query with a second query.":::

3. In a new referenced query, add back the "Group By" transformation and the destination (if applicable).

4. Publish and refresh your Dataflow Gen2. There are now two queries in your Dataflow Gen2, and the overall duration is largely reduced.

   - The first query ingests data into staging using fast copy.
   - The second query performs large-scale transformations using SQL DW compute.

      :::image type="content" source="media/dataflows-gen2-fast-copy/fast-copy-result-overall.png" alt-text="Screenshot of the details of the run state showing the results of the query." lightbox="media/dataflows-gen2-fast-copy/fast-copy-result-overall.png":::

    The first query details:

      :::image type="content" source="media/dataflows-gen2-fast-copy/fast-copy-result-ingestion.png" alt-text="Screenshot showing the results of the data ingestion." lightbox="media/dataflows-gen2-fast-copy/fast-copy-result-ingestion.png":::

    The second query details:

      :::image type="content" source="media/dataflows-gen2-fast-copy/fast-copy-result-transform.png" alt-text="Screenshot showing the results of the transform steps." lightbox="media/dataflows-gen2-fast-copy/fast-copy-result-transform.png":::

## Known limitations

The following list contains the known limitations for fast copy:

- An on-premises data gateway version 3000.214.2 or newer is needed to support Fast Copy.
- Fixed schema isn't supported.

## Related content

- [Dataflow Gen2 Overview](dataflows-gen2-overview.md)
- [Monitor Dataflow Gen2](dataflows-gen2-monitor.md)
