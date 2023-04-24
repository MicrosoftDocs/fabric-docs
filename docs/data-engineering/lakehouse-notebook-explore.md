---
title: Explore the lakehouse data with a notebook
description: Learn how to use a notebook to explore lakehouse data, connect a lakehouse and a notebook, and generate code cells in a notebook.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: how-to
ms.date: 05/23/2023
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

:::image type="content" source="media\lakehouse-notebook-explore\add-lakehouse-to-notebook.png" alt-text="Screenshot showing the Select Notebook screen." lightbox="media\lakehouse-notebook-explore\add-lakehouse-to-notebook.png":::

### Open a lakehouse from a new notebook

You can create a new notebook in the same workspace and the current lakehouse appears in that notebook.

:::image type="content" source="media\lakehouse-notebook-explore\select-new-notebook.png" alt-text="Screenshot showing where to select New notebook." lightbox="media\lakehouse-notebook-explore\select-new-notebook.png":::

## Switch lakehouses and set a default

You can add multiple lakehouses to the same notebook. By switching the available lakehouse in the left panel, you can explore the structure and the data from different lakehouses.

:::image type="content" source="media\lakehouse-notebook-explore\select-different-lakehouse.png" alt-text="Screenshot showing a list of available files in the Lake view." lightbox="media\lakehouse-notebook-explore\select-different-lakehouse.png":::

In the lakehouse list, the pin icon next to the name of a lakehouse indicates that it's the default in your current notebook. In the notebook code, if only a relative path is provided to access the data from the [!INCLUDE [product-name](../includes/product-name.md)] OneLake, then the default lakehouse is served as the root folder at run time.

To switch to a different default lakehouse, move the pin icon.

:::image type="content" source="media\lakehouse-notebook-explore\lake-view-tables-files.png" alt-text="Screenshot of Lake vie Tables and Files folders." lightbox="media\lakehouse-notebook-explore\lake-view-tables-files.png":::

## Add or remove a lakehouse

Selecting the **X** icon next to a lakehouse name removes it from the notebook, but the lakehouse item still exists in the workspace.

:::image type="content" source="media\lakehouse-notebook-explore\remove-lakehouse.png" alt-text="Screenshot showing where to remove a lakehouse." lightbox="media\lakehouse-notebook-explore\remove-lakehouse.png":::

Select **Add lakehouse** to add more lakehouses to the notebook. You can either add an existing one or create a new one.

:::image type="content" source="media\lakehouse-notebook-explore\add-lakehouse-in-menu.png" alt-text="Screenshot showing where to find the Add lakehouse option." lightbox="media\lakehouse-notebook-explore\add-lakehouse-in-menu.png":::

## Explore the lakehouse file

The subfolder and file under the **Tables** and **Files** section of the **Lake view** appear in a content area between the lakehouse list and the notebook content. Select a different folder in the **Tables** and **Files** sections to change what appears in the content area.

:::image type="content" source="media\lakehouse-notebook-explore\content-area.png" alt-text="Screenshot showing the location of the content area." lightbox="media\lakehouse-notebook-explore\content-area.png":::

## Insert a code cell into notebook

You can generate or insert code cells in two different ways, depending on your data or file type.

### Generate a code cell from the context menu

Right-click on a file and select the CSV or Parquet file. Both Apache Spark and Pandas API are supported to load the data. A new code cell is generated and inserted at the end of the notebook.

:::image type="content" source="media\lakehouse-notebook-explore\add-code-cell.png" alt-text="Screenshot showing inserted code cell." lightbox="media\lakehouse-notebook-explore\add-code-cell.png":::

### Generate a code cell via Drag & Drop

You can also drag and drop the supported CSV or Parquet file into the notebook to insert a code cell. By default, the Spark API is used to generate the code.

:::image type="content" source="media\lakehouse-notebook-explore\drag-drop-code-cell.png" alt-text="Screenshot showing where to drag and drop a code cell." lightbox="media\lakehouse-notebook-explore\drag-drop-code-cell.png":::

> [!NOTE]
> The notebook will be created under your current workspace.

## Next steps

- [How to use a notebook to load data into your lakehouse](lakehouse-notebook-load-data.md)
