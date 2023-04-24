---
title: Explore the lakehouse data with a notebook
description: Learn how to use a notebook to explore lakehouse data, connect a lakehouse and a notebook, and generate code cells in a notebook.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.date: 02/24/2023
---

# Explore the data in your lakehouse with a notebook

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, learn how to explore the data in your lakehouse with a notebook.

## Prerequisites

To get started, you need the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create an account for free](../placeholder.md).
- Access to the Data Engineering Workload. [Onboard onto the data engineering workload](../placeholder.md).
- Read the [Lakehouse overview](lakehouse-overview.md).

## Open or create a notebook from a lakehouse

To explore your lakehouse data, you can add the lakehouse to an existing notebook or create a new notebook from the lakehouse.

### Open a lakehouse from an existing notebook

:::image type="content" source="media\lakehouse-notebook-explore\open-existing-notebook.png" alt-text="Screenshot showing where to select Existing notebook." lightbox="media\lakehouse-notebook-explore\open-existing-notebook.png":::

Select the notebook from the notebook list and then select **Add**. The notebook opens with your current lakehouse added to the notebook.

### Open a lakehouse from a new notebook

You can create a new notebook in the same workspace and the current lakehouse appears in that notebook.

:::image type="content" source="media\lakehouse-notebook-explore\select-new-notebook.png" alt-text="Screenshot showing where to select New notebook." lightbox="media\lakehouse-notebook-explore\select-new-notebook.png":::

## Switch lakehouses and set a default

You can add multiple lakehouses to the same notebook. By switching the available lakehouse in the left panel, you can explore the structure and the data from different lakehouses.

:::image type="content" source="media\lakehouse-notebook-explore\select-different-lakehouse.png" alt-text="Screenshot showing a list of available files in the Lake view." lightbox="media\lakehouse-notebook-explore\select-different-lakehouse.png":::

In the lakehouse list, the pin icon next to the name of a lakehouse indicates that it's the default lakehosue in your current notebook. In the notebook code, if only a relative path is provided to access the data from the [!INCLUDE [product-name](../includes/product-name.md)] OneLake, then the default lakehouse is served as the root folder at run time.

To switch to a different default lakehouse, move the pin icon.

:::image type="content" source="media\lakehouse-notebook-explore\set-default-lakehouse.png" alt-text="Screenshot of Lake vie Tables and Files folders." lightbox="media\lakehouse-notebook-explore\lake-view-tables-files.png":::

## Add or remove a lakehouse

Selecting the **X** icon next to a lakehouse name removes it from the notebook, but the lakehouse item still exists in the workspace.

To remove all the lakehouses from the notebook, click "Remove all lakehouses" in the lakehouse list.

:::image type="content" source="media\lakehouse-notebook-explore\remove-lakehouse.png" alt-text="Screenshot showing where to remove a lakehouse." lightbox="media\lakehouse-notebook-explore\remove-lakehouse.png":::

Select **Add lakehouse** to add more lakehouses to the notebook. You can either add an existing one or create a new one.

:::image type="content" source="media\lakehouse-notebook-explore\add-lakehouse-in-menu.png" alt-text="Screenshot showing where to find the Add lakehouse option." lightbox="media\lakehouse-notebook-explore\add-lakehouse-in-menu.png":::

## Explore the lakehouse data 

The structure of the lakehosue shown in the Notebook is the same as the one in the Lakehosue view. For the detail please check [Lakehouse overview](lakehouse-overview.md). When you select a file or folder, the content area shows the details of the selected item.

:::image type="content" source="media\lakehouse-notebook-explore\content-area.png" alt-text="Screenshot showing the location of the content area." lightbox="media\lakehouse-notebook-explore\content-area.png":::

> [!NOTE]
> The notebook will be created under your current workspace.

## Next steps

- [How to use a notebook to load data into your lakehouse](lakehouse-notebook-load-data.md)
