---
title: Explore data with a Lakehouse notebook
description: Learn how to use a notebook to explore your Lakehouse data.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.date: 02/24/2023
---

# Explore your data with a Lakehouse notebook

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this tutorial, learn how to explore the data in your Lakehouse with a notebook.

## Prerequisites

To get started, you need the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create an account for free](../placeholder.md).
- Access to the Data Engineering Workload. [Onboard onto the data engineering workload](../placeholder.md).
- Read the [Lakehouse overview](lakehouse-overview.md).

## Open or create a notebook from a Lakehouse

To explore your Lakehouse data, you can add the Lakehouse to an existing notebook or create a new notebook from the Lakehouse.

### Open a Lakehouse with an existing notebook

:::image type="content" source="media\lakehouse-notebook-explore\open-existing-notebook.png" alt-text="Screenshot showing where to select Existing notebook." lightbox="media\lakehouse-notebook-explore\open-existing-notebook.png":::

Select the notebook from the notebook list and then select **Add**. The notebook opens with your current Lakehouse added to the notebook.

:::image type="content" source="media\lakehouse-notebook-explore\add-lakehouse-to-notebook.png" alt-text="Screenshot showing the Select Notebook screen." lightbox="media\lakehouse-notebook-explore\add-lakehouse-to-notebook.png":::

### Open a Lakehouse with a new notebook

You can create a new notebook in the same workspace and the current Lakehouse appears in that notebook.

:::image type="content" source="media\lakehouse-notebook-explore\select-new-notebook.png" alt-text="Screenshot showing where to select New notebook." lightbox="media\lakehouse-notebook-explore\select-new-notebook.png":::

## Switch Lakehouses and set a default

You can add multiple Lakehouses to the same notebook. By switching the visible Lakehouse in the left panel, you can explore the structure and data from different Lakehouses.

:::image type="content" source="media\lakehouse-notebook-explore\select-different-lakehouse.png" alt-text="Screenshot showing a list of available files in the Lake view." lightbox="media\lakehouse-notebook-explore\select-different-lakehouse.png":::

In the Lakehouse list, the pin icon beside the name of a Lakehouse indicates that it's the default in your current notebook. In notebook code, if only a relative path is provided to access the data on the [!INCLUDE [product-name](../includes/product-name.md)] OneLake, then the default Lakehouse is served as the root folder at run time.

To switch to a different default Lakehouse, move the pin icon.

:::image type="content" source="media\lakehouse-notebook-explore\lake-view-tables-files.png" alt-text="Screenshot of Lake vie Tables and Files folders." lightbox="media\lakehouse-notebook-explore\lake-view-tables-files.png":::

## Add or remove a Lakehouse

Selecting the **X** icon next to a Lakehouse name removes it from the notebook, but the Lakehouse artifact still exists in the workspace.

:::image type="content" source="media\lakehouse-notebook-explore\remove-lakehouse.png" alt-text="Screenshot showing where to remove a Lakehouse." lightbox="media\lakehouse-notebook-explore\remove-lakehouse.png":::

Select **Add Lakehouse** to add more Lakehouses into the notebook, either by adding an existing one or creating a new one.

:::image type="content" source="media\lakehouse-notebook-explore\add-lakehouse-in-menu.png" alt-text="Screenshot showing where to find the Add lakehouse option." lightbox="media\lakehouse-notebook-explore\add-lakehouse-in-menu.png":::

## Explore the Lakehouse file

The subfolder and file under the **Tables** and **Files** section of the **Lake** view appear in a content area between Lakehouse list and the notebook content. Select a different folder in the **Tables** and **Files** section to change what appears in the content area.

:::image type="content" source="media\lakehouse-notebook-explore\content-area.png" alt-text="Screenshot showing the location of the content area." lightbox="media\lakehouse-notebook-explore\content-area.png":::

## Insert a code cell into notebook from Lakehouse data

You can generate or insert code cells in two different ways, depending on your data or file type.

### Generate a code cell via the context menu

If you select a file(.csv, .parquet) with a right mouse click, both Spark and Pandas API are supported to load the data. A new code cell is generated and inserted into the end of the notebook

:::image type="content" source="media\lakehouse-notebook-explore\add-code-cell.png" alt-text="Screenshot showing inserted code cell." lightbox="media\lakehouse-notebook-explore\add-code-cell.png":::

### Generate a code cell via drag and drop

You can also drag and drop the supported file (.csv or .parquet) into the notebook to insert a code cell. By default, the Spark API is used to generate the code.

:::image type="content" source="media\lakehouse-notebook-explore\drag-drop-code-cell.png" alt-text="Screenshot showing where to drag and drop a code cell." lightbox="media\lakehouse-notebook-explore\drag-drop-code-cell.png":::

> [!NOTE]
> The notebook will be created under your current workspace.
