---
title: Get data in Dataflow Gen2
description: Learn about the get data modules, recent data, connectors, and Copilot options for ingesting and transforming data in Dataflow Gen2.
ms.reviewer: xupzhou
ms.date: 07/27/2026
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.custom:
  - dataflows
ai-usage: ai-assisted
---

# Get data in Dataflow Gen2

Dataflow Gen2 provides several ways to connect to and get your data. You can browse data sources by category, find Fabric items in the OneLake catalog, return to recently used items, upload files, or use Copilot to ingest and transform data with natural language commands.

## Prerequisites

Before you begin, make sure you have the following setup:

- A Microsoft Fabric tenant account with an active subscription. [Create a free account](https://www.microsoft.com/microsoft-fabric).
- A Microsoft Fabric enabled [workspace](../fundamentals/create-workspaces.md).
- A [Dataflow Gen2](create-first-dataflow-gen2.md) item, or permissions to create one.

For Copilot features, you also need:

- A subscription that's at least an F2 or P1 [capacity SKU](../enterprise/licenses.md#capacity): [Fabric Copilot Capacity](../enterprise/fabric-copilot-capacity.md#considerations-and-limitations).


## Get data for Dataflow Gen2

Dataflow Gen2 supports a wide range of connectors for databases, files, online services, and more. For the full list of supported connectors and their capabilities in Dataflow Gen2, pipelines, and Copy job, see the [Connector overview](connector-overview.md).

To get data in a dataflow, select the **Get data** icon from the Home ribbon. Select the dropdown to select a specific source, or select the icon or the **More** option to see all connection options.

For Dataflow Gen2 the connection options include:

- **Home**:

  [!INCLUDE [Home module](~/../powerquery-repo/powerquery-docs/includes/get-data-home-module.md)]

- **Copilot**:

    Copilot in the get data experience for Dataflow Gen2 helps you ingest and transform data with natural language commands. You can get help finding the right data and applying transformations without leaving the get data experience.

    - Easily ingest data from your recently used tables by choosing from the recent tables list.
    - Chat with your data to apply transformations to find the data you want.

    For more information, see [Chat with Copilot in the get data experience](#chat-with-copilot-in-the-get-data-experience).

- **New**:

  [!INCLUDE [New data source module](~/../powerquery-repo/powerquery-docs/includes/get-data-new-source-module.md)]

- **Recent**:

    [!INCLUDE [Recent data sources module](~/../powerquery-repo/powerquery-docs/includes/get-data-recent-sources-module.md)]

    For more information, see [Use recent data in Dataflow Gen2](#use-recent-data-in-dataflow-gen2).

- **OneLake catalog**:

  [!INCLUDE [OneLake catalog module](~/../powerquery-repo/powerquery-docs/includes/get-data-onelake-catalog-module.md)]

- **Azure**:

  [!INCLUDE [Azure data sources module](~/../powerquery-repo/powerquery-docs/includes/get-data-azure-sources-module.md)]

- **Upload**:

  [!INCLUDE [Upload file module](~/../powerquery-repo/powerquery-docs/includes/get-data-upload-file-module.md)]

- **Blank table**:

  [!INCLUDE [Blank table module](~/../powerquery-repo/powerquery-docs/includes/get-data-blank-table-module.md)]

- **Blank query**:

  [!INCLUDE [Blank query module](~/../powerquery-repo/powerquery-docs/includes/get-data-blank-query-module.md)]

The modules that appear can vary based on the product experience and connector. For more information about the shared Power Query interface, see [Get data modules in Power Query Online](/power-query/get-data-experience#get-data-modules-in-power-query-online).

### Connect to a data source

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

After you select a connector, follow the connector-specific instructions to authenticate and choose the tables, files, or other items you want to load into your dataflow.

Instructions and requirements differ for each connector. For instructions for your connector, select your connector from the [Connector overview](connector-overview.md).

### Chat with Copilot in the get data experience

In Fabric Dataflow Gen2, select **Get data** to begin. In the **Get data** wizard, select the **Copilot** tab, and then start with the list of recently used tables. You can either choose the recently used tables in the get started module or choose recent tables from **Choose context** in the chat box.

:::image type="content" source="media/copilot-in-modern-get-data/copilot-recently-used-data-sources.png" alt-text="Screenshot of recently used data sources in Copilot.":::

After loading the recently used table, chat with Copilot to find the data you want. For step-by-step exploration, you want to first group by the data on customers' titles to check the results. Then, depending on the range of the counts, decide which ranges to include.

:::image type="content" source="media/copilot-in-modern-get-data/copilot-group-by-data.png" alt-text="Screenshot of grouping by data using Copilot.":::

When selecting table columns, use **@** to quickly view available columns. Then enter the letter to filter on detail column.

:::image type="content" source="media/copilot-in-modern-get-data/quickly-view-available-columns.png" alt-text="Screenshot of quickly viewing available columns.":::

If you know all the operations you want to do at the beginning, describe them in one sentence. Then Copilot can quickly understand it and provide the filtered results to you.

:::image type="content" source="media/copilot-in-modern-get-data/copilot-all-operations.png" alt-text="Screenshot of all operations using Copilot.":::

To return to the previous step, select the **Restore** button next to it and your data reverts to that point. You can also copy the preview data to confirm with your colleagues before saving it into Dataflow Gen2.

:::image type="content" source="media/copilot-in-modern-get-data/return-to-previous-step.png" alt-text="Screenshot of returning to the previous step.":::

## Use recent data in Dataflow Gen2

> [!IMPORTANT]
> Recent data is currently in preview for Dataflow Gen2.

The **Recent** module provides quick access to data items that you used previously in Dataflow Gen2. You can return to tables, folders, databases, sheets, and other supported items without navigating through connection dialogs and folder structures again.

### Items that support recent data

Recent data tracks the following types of data items:

- **Table**: A table from a database or other data source.
- **Sheet**: A worksheet from an Excel file.
- **Database**: A database instance from a supported data source.
- **Schema**: A database schema that contains related tables.
- **Folder**: A folder that contains files or other data items, including a folder in a Fabric lakehouse.
- **View**: A database view that presents data from one or more tables.
- **Function**: A custom or built-in function from a data source.

When you access a supported item in Dataflow Gen2, the item can appear in your recent data list in future sessions.

### Access recent data from the Power Query ribbon

Use the Power Query ribbon to return directly to a recently used item.

1. In your Fabric workspace, open an existing Dataflow Gen2 item or create one.
1. In the Power Query editor, select **Recent data** from the ribbon.
1. Review the recently used items from your previous dataflow sessions.
1. Select an item to load it into the Power Query editor.

  :::image type="content" source="media/recent-data/recent-data-ribbon.jpg" alt-text="Screenshot of the Recent data option on the Power Query ribbon." lightbox="media/recent-data/recent-data-ribbon.jpg":::

### Access recent data from the get data experience

Use the get data experience when you add a data source to your dataflow.

1. In your Fabric workspace, open an existing Dataflow Gen2 item or create one.
1. In the Power Query editor, select **Get data**.
1. In the **Get data** dialog, select the **Recent** module.
1. Review the recently used items from your previous dataflow sessions.
1. Select an item to load it into the Power Query editor.

  :::image type="content" source="media/recent-data/recent-data-get-data.jpg" alt-text="Screenshot of the Recent module in the get data experience." lightbox="media/recent-data/recent-data-get-data.jpg":::

### Browse related items

Use **Browse location** to explore other items in the same folder or database as a recent item.

1. Select **Browse location** for an item in the recent data list.
1. Review the other tables, files, or items available at the same location.
1. Select the items to include in your dataflow. Each selected item creates a query in the Power Query editor.
1. Apply transformations, merge queries, or configure your dataflow as needed.

## Related content

- [What is Data Factory in Microsoft Fabric?](data-factory-overview.md)
- [Quickstart: Create your first dataflow to get and transform data](create-first-dataflow-gen2.md)
- [What is Copilot in Fabric in the Data Factory workload?](copilot-fabric-data-factory.md)
- [Get started with Copilot in Fabric in the Data Factory workload](copilot-fabric-data-factory-get-started.md)
