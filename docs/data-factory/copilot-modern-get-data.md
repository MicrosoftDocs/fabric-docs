---
title: Unblocking Copilot in Get Data for Modern data ingestion and transformation (Preview)
description: This article provides information about Copilot in Get Data for Modern data ingestion and transformation.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 09/15/2025
ms.custom: dataflows
ms.collection: ce-skilling-ai-copilot
---

# Unblocking Copilot in Get Data for Modern data ingestion and transformation (Preview)

Copilot in MGD in Fabric Dataflow Gen2 empowers you to ingest and transform data effortlessly with natural language commands. Discover a faster, smarter way to get the data you need.

- Easily ingest data from your recently used tables by choosing from the recent tables list.
- Chat with your data to apply transformations to find the data you want.

## Prerequisites

The following prerequisites are required before you start:

- A Microsoft Fabric tenant account with a subscription which is at least an F2 or P1 [SKU](../enterprise/licenses.md#capacity): [Fabric Copilot Capacity](../enterprise/fabric-copilot-capacity.md#considerations-and-limitations).
- Make sure you have a Microsoft Fabric enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).
- Create a new Dataflow if you don’t have an existing one and ingest some data by taking reference on [Create your first dataflow and ingest data](create-first-dataflow-gen2.md#create-a-dataflow).

## Chat with Copilot in Modern Get Data

In Fabric Dataflow Gen2, click Get data to begin. In the Get Data wizard, click the Copilot tab, then you can start with the list of recently used tables. You can either choose the recently used tables in the get started module or choose recent tables from the "Choose context" in the chat box.

:::image type="content" source="media/copilot-in-modern-get-data/copilot-recently-used-data-sources.png" alt-text="Screenshot of recently used data sources in Copilot.":::

After loading the recently used table, you can chat with Copilot to find the data you want. For step-by-step exploration, we want to first group by the data on customers' titles to check the results. Then depending on the range of the counts, we can decide to include which ranges.

:::image type="content" source="media/copilot-in-modern-get-data/copilot-group-by-data.png" alt-text="Screenshot of grouping by data using Copilot.":::

When selecting table columns, use **@** to quickly view available columns. Then entering the letter can filter on detail column.

:::image type="content" source="media/copilot-in-modern-get-data/quickly-view-available-columns.png" alt-text="Screenshot of quickly viewing available columns.":::

If you know all the operations you want to do in the beginning, you can describe all in one sentence. Then Copilot can quickly understand it and provide the filtered results to you.

:::image type="content" source="media/copilot-in-modern-get-data/copilot-all-operations.png" alt-text="Screenshot of all operations using Copilot.":::

To return to the previous step, click the **Restore** button next to it and your data will revert to that point. You can also Copy the preview data to confirm with your colleagues before saving it into Dataflow Gen2.

:::image type="content" source="media/copilot-in-modern-get-data/return-to-previous-step.png" alt-text="Screenshot of returning to the previous step.":::

## Related content

- [How to Get Started with Microsoft Copilot in Fabric in the Data Factory Workload](copilot-fabric-data-factory-get-started.md)
- [Microsoft Copilot in Fabric in the Data Factory Workload Overview](copilot-fabric-data-factory.md)