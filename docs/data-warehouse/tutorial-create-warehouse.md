---
title: Data warehouse tutorial - create a new Synapse Data Warehouse in Microsoft Fabric
description: In this second tutorial step, after you've created your workspace, learn how to create your first Synapse Data Warehouse in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.date: 5/23/2023
---

# Tutorial: Create a Synapse Data Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Now that you have a workspace, you can create your first [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Create your first Synapse Data Warehouse

1. In the [Power BI service](https://powerbi.com/), select **Workspaces** in the left-hand menu.

1. Search for the workspace you created in [Tutorial: Create a Microsoft Fabric workspace](tutorial-create-workspace.md) by typing in the search textbox at the top and selecting your workspace to open it.

   :::image type="content" source="media\tutorial-create-warehouse\search-workspaces.png" alt-text="Screenshot of the Workspaces panel, showing where to search for and select a workspace.":::

1. Select the **+ New** button to display a full list of available items. From the list of objects to create, choose **Warehouse (Preview)** to create a new [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

   :::image type="content" source="media\tutorial-create-warehouse\new-show-all.png" alt-text="Screenshot of the workspace screen, showing where to select Warehouse (Preview) in the New drop-down menu.":::

1. On the **New warehouse** dialog, enter `WideWorldImporters` as the name.

1. Set the **Sensitivity** to **Public**.

1. Select **Create**.

   :::image type="content" source="media\tutorial-create-warehouse\new-warehouse-create.png" alt-text="Screenshot of the New warehouse dialog box, showing where to enter a warehouse name, set the Sensitivity, and select Create.":::

When provisioning is complete, the **Build a warehouse** landing page appears.

:::image type="content" source="media\tutorial-create-warehouse\build-a-warehouse.png" alt-text="Screenshot of the Build a warehouse landing page." lightbox="media\tutorial-create-warehouse\build-a-warehouse.png":::

## Next steps

> [!div class="nextstepaction"]
> [Tutorial: Ingest data into a Microsoft Fabric data warehouse](tutorial-ingest-data.md)
