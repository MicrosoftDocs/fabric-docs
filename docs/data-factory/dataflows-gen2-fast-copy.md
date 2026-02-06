---
title: Fast copy in Dataflow Gen2
description: Learn about the fast copy feature in Dataflow Gen2 in Data Factory for Microsoft Fabric.
ms.topic: how-to
ms.date: 09/15/2025
ms.reviewer: yexu
ms.custom: dataflows, sfi-image-nochange
ai-usage: ai-assisted
---

# Fast copy in Dataflow Gen2

Fast copy helps you move large amounts of data faster in Dataflow Gen2. Think of it as switching to a more powerful engine when you need to handle terabytes of data.

When you're working with dataflows, you need to ingest data first, then transform it. With dataflow scale-out using SQL DW compute, you can transform data at scale. Fast copy takes care of the ingestion part by giving you the easy dataflow experience with the powerful backend of pipeline Copy Activity.

Here's how it works: After you enable fast copy, dataflows automatically switch to the faster backend when your data size passes a certain threshold. You don't need to change anything while building your dataflows. After your dataflow refreshes, you can check the refresh history to see if fast copy was used by looking at the **Engine** type listed there.

If you enable the _Require fast copy_ option, the dataflow refresh stops if fast copy can't be used for some reason. This helps you avoid waiting for a timeout and can be helpful when debugging. You can use the fast copy indicators in the query steps pane to check if your query can run with fast copy.

:::image type="content" source="media/dataflows-gen2-fast-copy/fast-copy-indicators.png" alt-text="Screenshot showing where the fast copy indicator appears in the query steps pane.":::

## Prerequisites

Before you can use fast copy, you'll need:

- A Fabric capacity
- For file data: CSV or Parquet files that are at least 100 MB and stored in Azure Data Lake Storage (ADLS) Gen2 or blob storage
- For databases (including Azure SQL DB and PostgreSQL): 5 million rows or more of data in the data source

> [!NOTE]
> You can bypass the threshold to force fast copy by selecting the **Require fast copy** setting.

## Connector support

Fast copy works with these Dataflow Gen2 connectors:

- ADLS Gen2
- Blob storage
- Azure SQL DB
- Lakehouse
- PostgreSQL
- On-premises SQL Server
- Warehouse
- Oracle
- Snowflake
- SQL database in Fabric

### Transformation limitations

When connecting to file sources, copy activity only supports these transformations:

- Combine files
- Select columns
- Change data types
- Rename a column
- Remove a column

If you need other transformations, you can split your work into separate queries. Create one query to get the data and another query that references the first one. This way, you can use DW compute for the transformations.

For SQL sources, any transformation that's part of the native query works fine.

### Output destinations

Right now, fast copy only supports loading directly to a Lakehouse destination. If you want to use a different output destination, you can stage the query first and reference it in a later query with your preferred destination.

## How to use fast copy

Here's how to set up and use fast copy:

1. In Fabric, go to a premium workspace and create a Dataflow Gen2.

1. On the **Home** tab of your new dataflow, select **Options**:

   :::image type="content" source="media/dataflows-gen2-fast-copy/options.png" alt-text="Screenshot showing where to select the Options for Dataflow Gen2 on the Home tab." lightbox="media/dataflows-gen2-fast-copy/options.png":::

1. In the **Options** dialog, select the **Scale** tab, then turn on **Allow use of fast copy connectors**. Close the **Options** dialog when you're done.

   :::image type="content" source="media/dataflows-gen2-fast-copy/enable-fast-copy.png" alt-text="Screenshot showing where to enable fast copy on the Scale tab of the Options dialog.":::

1. Select **Get data**, choose the ADLS Gen2 source, and fill in the details for your container.

1. Select the **Combine** button.

   :::image type="content" source="media/dataflows-gen2-fast-copy/preview-folder-data.png" lightbox="media/dataflows-gen2-fast-copy/preview-folder-data.png" alt-text="Screenshot showing the Preview folder data window with the Combine option highlighted.":::

1. To make sure fast copy works, only apply transformations listed in the [Connector support](#connector-support) section. If you need other transformations, stage the data first and reference the staged query in a later query. Apply your other transformations to the referenced query.

1. **(Optional)** You can require fast copy for the query by right-clicking the query and selecting **Require fast copy**.

   :::image type="content" source="media/dataflows-gen2-fast-copy/require-fast-copy.png" alt-text="Screenshot showing where to select the Require fast copy option on the right-click menu for a query.":::

1. **(Optional)** Right now, you can only set up a Lakehouse as the output destination. For any other destination, stage the query and reference it later in another query where you can output to any source.

1. Check the fast copy indicators to make sure your query can run with fast copy. If it can, the **Engine** type shows **CopyActivity**.

   :::image type="content" source="media/dataflows-gen2-fast-copy/refresh-details.png" alt-text="Screenshot showing the refresh details indicating the pipeline CopyActivity engine was used." lightbox="media/dataflows-gen2-fast-copy/refresh-details.png":::

1. Publish the dataflow.

1. After the refresh completes, check to confirm that fast copy was used.

## How to split your query to use fast copy

When you're working with large amounts of data, you can get the best performance by using fast copy to ingest data into staging first, then transform it at scale with SQL DW compute.

Fast copy indicators help you figure out how to split your query into two parts: data ingestion to staging and large-scale transformation with SQL DW compute. Try to push as much of your query evaluation to fast copy as possible for data ingestion. When the fast copy indicators show that the remaining steps can't run with fast copy, you can split the rest of the query with staging enabled.

### Step diagnostics indicators

|Indicator|Icon|Description|
|---------|----|-------|
|**This step will be evaluated with fast copy**|:::image type="icon" source="media/dataflows-gen2-fast-copy/green-indicator.png":::|The fast copy indicator shows that the query up to this step supports fast copy.|
|**This step isn't supported by fast copy**|:::image type="icon" source="media/dataflows-gen2-fast-copy/red-indicator.png":::|The fast copy indicator shows that this step doesn't support fast copy.|
|**One or more steps in your query aren't supported by fast copy**|:::image type="icon" source="media/dataflows-gen2-fast-copy/yellow-indicator.png":::|The fast copy indicator shows that some steps in this query support fast copy, while others don't. To optimize, split the query: yellow steps (potentially supported by fast copy) and red steps (not supported).|

### Step-by-step guidance

After you complete your data transformation logic in Dataflow Gen2, the fast copy indicator evaluates each step to figure out how many steps can use fast copy for better performance.

In this example, the last step shows a red icon, which means the **Group By** step isn't supported by fast copy. However, all the previous steps with yellow icons can potentially be supported by fast copy.

   :::image type="content" source="media/dataflows-gen2-fast-copy/query-step-one.png" alt-text="Screenshot showing the contents of the first query with the last step in red." lightbox="media/dataflows-gen2-fast-copy/query-step-one.png":::

If you publish and run your Dataflow Gen2 at this point, it won't use the fast copy engine to load your data.

   :::image type="content" source="media/dataflows-gen2-fast-copy/none-fast-copy-result.png" alt-text="Screenshot showing the result of the query without fast copy enabled." lightbox="media/dataflows-gen2-fast-copy/none-fast-copy-result.png":::

To use the fast copy engine and improve your Dataflow Gen2 performance, you can split your query into two parts: data ingestion to staging and large-scale transformation with SQL DW compute. Here's how:

1. Delete any transformations showing red icons (which means they aren't supported by fast copy) along with the destination (if you defined one).

   :::image type="content" source="media/dataflows-gen2-fast-copy/query-step-two.png" alt-text="Screenshot showing the first query, where you deleted any steps that don't support fast copy." lightbox="media/dataflows-gen2-fast-copy/query-step-two.png":::

1. The fast copy indicator now shows green for the remaining steps, which means your first query can use fast copy for better performance.

   Right-click on your first query, select **Enable staging**, then right-click on your first query again and select **Reference**.

   :::image type="content" source="media/dataflows-gen2-fast-copy/query-step-three.png" alt-text="Screenshot showing the selections required to reference your fast copy query with a second query.":::

1. In your new referenced query, add back the "Group By" transformation and the destination (if applicable).

1. Publish and refresh your Dataflow Gen2. You now have two queries in your Dataflow Gen2, and the overall duration is shorter.

   - The first query ingests data into staging using fast copy.
   - The second query does large-scale transformations using SQL DW compute.

      :::image type="content" source="media/dataflows-gen2-fast-copy/fast-copy-result-overall.png" alt-text="Screenshot of the details of the run state showing the results of the query." lightbox="media/dataflows-gen2-fast-copy/fast-copy-result-overall.png":::

    The first query details:

      :::image type="content" source="media/dataflows-gen2-fast-copy/fast-copy-result-ingestion.png" alt-text="Screenshot showing the results of the data ingestion." lightbox="media/dataflows-gen2-fast-copy/fast-copy-result-ingestion.png":::

    The second query details:

      :::image type="content" source="media/dataflows-gen2-fast-copy/fast-copy-result-transform.png" alt-text="Screenshot showing the results of the transform steps." lightbox="media/dataflows-gen2-fast-copy/fast-copy-result-transform.png":::

## Known limitations

Here are the current limitations for fast copy:

- You need an on-premises data gateway version 3000.214.2 or newer to support fast copy.
- Fixed schema isn't supported.
- Schema-based destination isn't supported 

## Related content

- [Dataflow Gen2 Overview](dataflows-gen2-overview.md)
- [Monitor Dataflow Gen2](dataflows-gen2-monitor.md)
