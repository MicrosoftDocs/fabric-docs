---
title: Create a Synapse Data Warehouse
description: Learn how to create a Synapse Data Warehouse in Microsoft Fabric.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: how-to
ms.search.form: Create a warehouse # This article's title should not change. If so, contact engineering.
---

# Create a Synapse Data Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article describes how to get started with [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric using the [!INCLUDE [product-name](../includes/product-name.md)] portal, including discovering creation and consumption of the warehouse. You learn how to create your warehouse from scratch, how to load data, how to rename or delete a warehouse, and other helpful information to get you acquainted and proficient with warehouse capabilities offered through the [!INCLUDE [product-name](../includes/product-name.md)] portal.

> [!NOTE]
> It is important to note that much of the functionality described in this section is also available to users via a TDS end-point connection and tools such as [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) or [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio) (for users who prefer to use T-SQL for the majority of their data processing needs). For more information, see [Connectivity](../placeholder.md) or [Query a warehouse](query-warehouse.md).

## How to create a warehouse

In this section, we walk you through three distinct experiences available for creating a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] from scratch in the [!INCLUDE [product-name](../includes/product-name.md)] portal.

### Create a warehouse using the Home hub

The first hub in the left navigation menus is the **Home** hub. You can start creating your warehouse from the **Home** hub by selecting the **Warehouse** card under the **New** section. An empty warehouse is created for you to start creating objects in the warehouse. You can use either a [sample data set](/azure/open-datasets/dataset-catalog) to get a jump start or load your own test data if you prefer.

:::image type="content" source="media\create-warehouse\warehouse-home-hub.png" alt-text="Screenshot showing the Warehouse card in the Home hub." lightbox="media\create-warehouse\warehouse-home-hub.png":::

### Create a warehouse using the Create hub

Another option available to create your warehouse is through the Create hub, which is the second hub in the left navigation menu.

You can create your warehouse from the Create hub by selecting the **Warehouse** card under the **Data Warehousing** section. When you select the card, an empty warehouse is created for you to start creating objects in the warehouse or use a sample to get started as previously mentioned.

:::image type="content" source="media\create-warehouse\warehouse-create-hub.png" alt-text="Screenshot showing where to select the Warehouse card in the Create hub." lightbox="media\create-warehouse\warehouse-create-hub.png":::

### Create a warehouse from the workspace list view

To create a warehouse, navigate to your workspace, select **+ New** and then select **Warehouse** to create a warehouse.

:::image type="content" source="media\create-warehouse\warehouse-workspace-list.png" alt-text="Screenshot showing where to select New and Warehouse in the workspace list view." lightbox="media\create-warehouse\warehouse-workspace-list.png":::

It usually takes approximately 10 seconds to provision a new warehouse. Once initialized, you can load data into your warehouse. For more information about getting data into a warehouse, see [Ingesting data](ingest-data.md).

:::image type="content" source="media\create-warehouse\warehouse-home.png" alt-text="Screenshot of an automatically created warehouse." lightbox="media\create-warehouse\warehouse-home.png":::

## Next steps

- [Warehouse settings and context menus](settings-context-menus.md)
- [Create tables in Synapse Data Warehouse](create-table.md)
- [Tables in Microsoft Fabric](tables.md)