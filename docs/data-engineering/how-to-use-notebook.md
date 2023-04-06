---
title: How to use notebooks
description: Learn how to use notebooks.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.date: 02/24/2023
---

# How to use [!INCLUDE [product-name](../includes/product-name.md)] notebooks

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] notebook is a primary code item for developing Apache Spark jobs and machine learning experiments, it's a web-based interactive surface used by data scientists and data engineers to write code benefiting from rich visualizations and Markdown text. Data engineers write code for data ingestion, data preparation, and data transformation. Data scientists also use notebooks to build machine learning solutions, including creating experiments and models, model tracking, and deployment.

With a [!INCLUDE [product-name](../includes/product-name.md)] notebook, you can:

- Get started with zero setup effort.
- Easily explore and process data with intuitive low-code experience.
- Keep data secure with built-in enterprise security features.
- Analyze data across raw formats (CSV, txt, JSON, etc.), processed file formats (parquet, Delta Lake, etc.), leveraging powerful Spark capabilities.
- Be productive with enhanced authoring capabilities and built-in data visualization.

This article describes how to use notebooks in data science and data engineering workloads.

## Create notebooks

You can either create a new notebook or import an existing notebook.

### Create a new notebook

Similar with other standard [!INCLUDE [product-name](../includes/product-name.md)] item creation, you can easily create a new notebook from the [!INCLUDE [product-name](../includes/product-name.md)] **Data Engineering** homepage, the workspace **New** button, or the **Create Hub**.

### Import existing notebooks

You can import one or more existing notebooks from your local computer to a [!INCLUDE [product-name](../includes/product-name.md)] workspace from the **Data Engineering or the Data Science** homepage. [!INCLUDE [product-name](../includes/product-name.md)] notebooks can recognize the standard Jupyter Notebook .ipynb files, and source files like .py, .scala, and .sql, and create new notebook items accordingly.

:::image type="content" source="media\how-to-use-notebook\new-menu-notebook-options.png" alt-text="Screenshot showing where to find notebook options on the New menu." lightbox="media\how-to-use-notebook\new-menu-notebook-options.png":::

## Save a notebook

In [!INCLUDE [product-name](../includes/product-name.md)], a notebook will save automatically after you open and edit it; you don't need to worry about losing code changes. You can also use **Save a copy** to clone another copy in the current workspace.

## Connect Lakehouses and notebooks

[!INCLUDE [product-name](../includes/product-name.md)] notebook now supports interacting with Lakehouse closely; you can easily add a new or existing Lakehouse from the Lakehouse explorer.

You can navigate to different Lakehouses in the Lakehouse explorer and set one Lakehouse as the default by pinning it. It will then be mounted to the runtime working directory and you can read or write to the default Lakehouse using a local path.

:::image type="content" source="media\how-to-use-notebook\pin-default-lakehouse.png" alt-text="Screenshot showing where to pin a default Lakehouse." lightbox="media\how-to-use-notebook\pin-default-lakehouse.png":::

> [!NOTE]
> You need to restart the session after pinning a new Lakehouse.

### Add or remove a Lakehouse

Selecting the **X** icon beside a Lakehouse name removes it from the notebook tab, but the Lakehouse item still exists in the workspace.

Select **Add lakehouse** to add more Lakehouses to the notebook, either by adding an existing one or creating a new Lakehouse

### Explore a Lakehouse file

The subfolder and files under the **Tables** and **Files** section of the **Lake** view appear in a content area between the Lakehouse list and the notebook content. Select different folders in the **Tables** and **Files** section to refresh the content area.

## Generate a code cell via the context menu

If you select a file(.csv, .parquet) with a right mouse click, both Spark and Pandas API are supported to load the data. A new code cell is generated and inserted into the end of the notebook.

## Collaborate in a notebook

The [!INCLUDE [product-name](../includes/product-name.md)] notebook is a collaborative item that supports multiple users editing the same notebook.  

When you open a notebook, you enter the co-editing mode by default. If your colleagues open the same notebook at the same time, you see their profile, run output, cursor indicator, selection indicator and editing trace. By leveraging the collaborating features, you can easily accomplish pair programming, remote debugging, and tutoring scenarios.

:::image type="content" source="media\how-to-use-notebook\collaborate-code-cell.png" alt-text="Screenshot showing a code cell with another user editing." lightbox="media\how-to-use-notebook\collaborate-code-cell.png":::

### Comment a code cell

Commenting is another useful feature during collaborative scenarios. Currently, we support adding cell-level comments.

1. Select the **Comments** button on the notebook toolbar to open the **Comments** pane.

   :::image type="content" source="media\how-to-use-notebook\comment-code-cell.png" alt-text="Screenshot showing where to select Comment." lightbox="media\how-to-use-notebook\comment-code-cell.png":::

1. Select code in the code cell, select **New** in the **Comments** pane, add comments, and then select the post comment button to save.

   :::image type="content" source="media\how-to-use-notebook\new-comment.png" alt-text="Screenshot showing where to select New." lightbox="media\how-to-use-notebook\new-comment.png":::

1. You could perform **Edit comment**, **Resolve thread**, or **Delete thread** by selecting the More button besides your comment.

   :::image type="content" source="media\how-to-use-notebook\comment-options.png" alt-text="Screenshot showing the comment options menu." lightbox="media\how-to-use-notebook\comment-options.png":::

## Next steps

- [Author and execute the notebook](author-execute-notebook.md)
