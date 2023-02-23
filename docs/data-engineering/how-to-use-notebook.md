---
title: How to use notebooks
description: Learn how to use notebooks.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.date: 02/24/2023
---

# How to use notebooks

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

[!INCLUDE [product-name](../includes/product-name.md)] Notebook is a primary code artifact for developing Apache Spark jobs and machine learning experiments, it is a web-based interactive surface used by data scientist and data engineers to write code benefiting from rich visualizations and markdown. Data engineers write code for data ingestion, data preparation, and data transformation. Data scientists also use notebooks to build machine learning solutions, including creating experiments and models, model tracking, and deployment.

With a [!INCLUDE [product-name](../includes/product-name.md)] notebook, you can:

- Get started with zero setup effort.
- Easily explore and process data with intuitive low-code experience.
- Keep data secure with built-in enterprise security features.
- Analyze data across raw formats (CSV, txt, JSON, etc.), processed file formats (parquet, Delta Lake, etc.), leveraging powerful Spark capabilities.
- Be productive with enhanced authoring capabilities and built-in data visualization.

This article describes how to use notebooks in data science and data engineering workload.

## Create notebooks

You can either create a new notebook or import an existing notebook.

### Create a new notebook

Similar with other standard [!INCLUDE [product-name](../includes/product-name.md)] artifact creation, you can easily create a new notebook from [!INCLUDE [product-name](../includes/product-name.md)] Data Engineering homepage, workspace New button, and the Create hub.

### Import existing notebooks

You can import one or more existing notebooks from your local computer to a [!INCLUDE [product-name](../includes/product-name.md)] workspace from the **Data Engineering/Data Science homepage**. Trident notebooks can recognize standard Jupyter Notebook .ipynb files, as well as source files like .py, .scala. sql, etc, and create new notebook artifacts accordingly.

## Save a notebook

In [!INCLUDE [product-name](../includes/product-name.md)], a notebook will save automatically after you open and edit it, you don't need to worry about losing code changes. Besides, you can use **save a copy** to clone another copy in the current workspace.

## Connect Lakehouse and notebooks

In Trident notebook now supports interacting with Lakehouse closely, you can easily add a **New** or **Existing** Lakehouse from the Lakehouse explorer.

You can navigate to different Lakehouses in the Lakehouse explorer and set one Lakehouse as the default by pinning it, then it will be mounted to the runtime working directory and you can read/write to the default Lakehouse using local path.

> [!NOTE]
> You need to restart the session after moving the pin to a new Lakehouse.

**Add/Remove** **lakehouse**

By clicking the "X" icon beside the lakehouse name, the lakehouse will be removed from the notebook UX, but the lakehouse artifact is still existing in the workspace.

By clicking "Add lakehouse", user could add more lakehouse into the notebook, either by adding existing one or create a new lakehouse

**Explore** **lakehouse file**

The sub-folder and file under the Tables/Files section of the lake view will be listed in a content area between lakehouse list and the notebook content. By selecting different folders within the Tables/Files section, the content area will be refreshed to show the corresponding content.

## **Generate code cell via context menu**

By selecting the file (. csv,. parquet) with Right-Mouse-Click, both Spark and Pandas API are both supported to load the data. A new code cell will be generated and insert into the end of the notebook

## Collaborate in a notebook

Trident Notebook is a collaborative artifact and will support multiple users to co-edit the same Notebook, it is a highly request feature during customer interview.  

When you open a notebook, you will enter the co-editing mode by default. If your colleagues open the same notebook artifact at the same time, you will see their profile, run output, cursor indicator, selection indicator and editing trace. By leveraging the collaborating features, you can easily accomplish pair programming, remote debugging, and tutoring scenarios.

### Comment a code cell

Comment is another useful feature during collaborative scenarios, we are aiming to deliver the word like comment experience in notebook. Currently we support adding the cell level comments, the @mention feature is also on the way.

1. Select **Comments** button on the notebook toolbar to open **Comments** pane.

2. Select code in the code cell, click **New** in the **Comments** pane, add comments then click **Post comment** button to save.

3. You could perform **Edit comment**, **Resolve thread**, or **Delete thread** by clicking the **More** button besides your comment.
