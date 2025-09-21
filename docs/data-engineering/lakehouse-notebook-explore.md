---
title: Explore the lakehouse data with a notebook
description: Learn how to use a notebook to explore lakehouse data, connect a lakehouse and a notebook, and generate code cells in a notebook.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 05/23/2023
---

# Explore the data in your lakehouse with a notebook

In this tutorial, learn how to explore the data in your lakehouse with a notebook.

## Prerequisites

To get started, you need the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
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

In the lakehouse list, the pin icon next to the name of a lakehouse indicates that it's the default lakehouse in your current notebook. In the notebook code, if only a relative path is provided to access the data from the [!INCLUDE [product-name](../includes/product-name.md)] OneLake, then the default lakehouse is served as the root folder at run time.

To switch to a different default lakehouse, move the pin icon.

:::image type="content" source="media\lakehouse-notebook-explore\set-default-lakehouse.png" alt-text="Screenshot of Lake vie Tables and Files folders." lightbox="media\lakehouse-notebook-explore\set-default-lakehouse.png":::

> [!NOTE]
> The default lakehouse decide which Hive metastore to use when running the notebook with Spark SQL.if multiple lakehouse are added into the notebook, make sure when Spark SQL is used, the target lakehouse and the current default lakehouse are from the same workspace.

## Add or remove a lakehouse

Selecting the **X** icon next to a lakehouse name removes it from the notebook, but the lakehouse item still exists in the workspace.

To remove all the lakehouses from the notebook, click "Remove all Lakehouses" in the lakehouse list.

:::image type="content" source="media\lakehouse-notebook-explore\remove-lakehouse.png" alt-text="Screenshot showing where to remove a lakehouse." lightbox="media\lakehouse-notebook-explore\remove-lakehouse.png":::

Select **Add lakehouse** to add more lakehouses to the notebook. You can either add an existing one or create a new one.

:::image type="content" source="media\lakehouse-notebook-explore\add-lakehouse-in-menu.png" alt-text="Screenshot showing where to find the Add lakehouse option." lightbox="media\lakehouse-notebook-explore\add-lakehouse-in-menu.png":::

## Explore the lakehouse data

The structure of the Lakehouse shown in the Notebook is the same as the one in the Lakehouse view. For the detail please check [Lakehouse overview](lakehouse-overview.md). When you select a file or folder, the content area shows the details of the selected item.

:::image type="content" source="media\lakehouse-notebook-explore\content-area.png" alt-text="Screenshot showing the location of the content area." lightbox="media\lakehouse-notebook-explore\content-area.png":::

> [!NOTE]
> The notebook will be created under your current workspace.

## Related content

- [How to use a notebook to load data into your lakehouse](lakehouse-notebook-load-data.md)
