---
title: How to use notebooks
description: Learn how to create a new notebook, import an existing notebook, connect notebooks to lakehouses. collaborate in notebooks, and comment code cells.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.custom: build-2023
ms.search.form: Create and use notebooks
ms.date: 05/30/2023
---

# How to use Microsoft Fabric notebooks

[!INCLUDE [product-name](../includes/product-name.md)] notebook is a primary code item for developing Apache Spark jobs and machine learning experiments, it's a web-based interactive surface used by data scientists and data engineers to write code benefiting from rich visualizations and Markdown text. Data engineers write code for data ingestion, data preparation, and data transformation. Data scientists also use notebooks to build machine learning solutions, including creating experiments and models, model tracking, and deployment.

[!INCLUDE [preview-note](../includes/preview-note.md)]

With a [!INCLUDE [product-name](../includes/product-name.md)] notebook, you can:

- Get started with zero setup effort.
- Easily explore and process data with intuitive low-code experience.
- Keep data secure with built-in enterprise security features.
- Analyze data across raw formats (CSV, txt, JSON, etc.), processed file formats (parquet, Delta Lake, etc.), leveraging powerful Spark capabilities.
- Be productive with enhanced authoring capabilities and built-in data visualization.

This article describes how to use notebooks in data science and data engineering experiences.

## Create notebooks

You can either create a new notebook or import an existing notebook.

### Create a new notebook

Similar with other standard [!INCLUDE [product-name](../includes/product-name.md)] item creation, you can easily create a new notebook from the [!INCLUDE [product-name](../includes/product-name.md)] **Data Engineering** homepage, the workspace **New** button, or the **Create Hub**.

### Import existing notebooks

You can import one or more existing notebooks from your local computer to a [!INCLUDE [product-name](../includes/product-name.md)] workspace from the **Data Engineering or the Data Science** homepage. [!INCLUDE [product-name](../includes/product-name.md)] notebooks can recognize the standard Jupyter Notebook .ipynb files, and source files like .py, .scala, and .sql, and create new notebook items accordingly.

:::image type="content" source="media\how-to-use-notebook\new-menu-notebook-options.png" alt-text="Screenshot showing where to find notebook options on the New menu.":::

## Export a notebook

You can Export your notebook to other standard formats. Synapse notebook supports to be exported into:

- Standard Notebook file(.ipynb) that is usually used for Jupyter notebooks.
- HTML file(.html) that can be opened from browser directly.  
- Python file(.py).  
- Latex file(.tex).

:::image type="content" source="media\how-to-use-notebook\export-notebook.png" alt-text="Screenshot showing where to export notebook.":::

## Save a notebook

In [!INCLUDE [product-name](../includes/product-name.md)], a notebook will by default save automatically after you open and edit it; you don't need to worry about losing code changes. You can also use **Save a copy** to clone another copy in the current workspace or to another workspace.

:::image type="content" source="media\how-to-use-notebook\save-copy.png" alt-text="Screenshot showing where to save a copy.":::

If you prefer to save a notebook manually, you can also switch to "Manual save" mode to have a "local branch" of your notebook item, and use **Save** or **CTRL+s** to save your changes.

:::image type="content" source="media\how-to-use-notebook\manual-save.png" alt-text="Screenshot showing where to switch manual save.":::

You can also switch to manual save mode from **Edit**->**Save options**->**Manual**. To turn on a local branch of your notebook then save it manually by clicking **Save** button or through "Ctrl" + "s" keybinding.

## Connect lakehouses and notebooks

[!INCLUDE [product-name](../includes/product-name.md)] notebook now supports interacting with lakehouses closely; you can easily add a new or existing lakehouse from the lakehouse explorer.

You can navigate to different lakehouses in the lakehouse explorer and set one lakehouse as the default by pinning it. It will then be mounted to the runtime working directory and you can read or write to the default lakehouse using a local path.

:::image type="content" source="media\how-to-use-notebook\pin-default-lakehouse.png" alt-text="Screenshot showing where to pin a default lakehouse.":::

> [!NOTE]
> You need to restart the session after pinning a new lakehouse or renaming the default lakehouse.

### Add or remove a lakehouse

Selecting the **X** icon beside a lakehouse name removes it from the notebook tab, but the lakehouse item still exists in the workspace.

Select **Add lakehouse** to add more lakehouses to the notebook, either by adding an existing one or creating a new lakehouse.

### Explore a lakehouse file

The subfolder and files under the **Tables** and **Files** section of the **Lake** view appear in a content area between the lakehouse list and the notebook content. Select different folders in the **Tables** and **Files** section to refresh the content area.

### Folder and File operations

If you select a file(.csv, .parquet, .txt, .jpg, .png, etc) with a right mouse click, both Spark and Pandas API are supported to load the data. A new code cell is generated and inserted to below of the focus cell.

You can easily copy path with different format of the select file or folder and use the corresponding path in your code.

:::image type="content" source="media\how-to-use-notebook\lakehouse-file-operation.png" alt-text="Screenshot showing context menu of files in lakehouse.":::

## Notebook resources

The notebook resource explorer provides a Unix-like file system to help you manage your folders and files. It offers a writeable file system space where you can store small-sized files, such as code modules, datasets, and images. You can easily access them with code in the notebook as if you were working with your local file system.

![Animated GIF of notebook resources.](media/how-to-use-notebook/notebook-resources-operations.gif)

The Built-in folder is a system pre-defined folder for each notebook instance, it preserves up to **500MB** storage to store the dependencies of the current notebook, below are the key capabilities of Notebook resources:

- You can use common operations such as create/delete, upload/download, drag/drop, rename, duplicate, and search through the UI. 
- You can use relative paths like `builtin/YourData.txt` for quick exploration. The `mssparkutils.nbResPath` method helps you compose the full path. 
- You can easily move your validated data to a Lakehouse via the **Write to Lakehouse** option. We have embedded rich code snippets for common file types to help you quickly get started. 
- These resources are also available for use in the [Reference Notebook run](author-execute-notebook.md) case via ```mssparkutils.notebook.run()```.

> [!NOTE]
> - Currently we support uploading certain file types through UI which includes, *.py, .txt, .json, .yml, .xml, .csv, .html, .png, .jpg, xlsx* files. You can write to the built-in folder with file types that are not in the list via code, However Fabric notebook doesn’t support generating code snippet when operated on unsupported file types.
> - Each file size needs to be less than 50MB, and the Built-in folder allows up to 100 file/folder instances in total.
> - When using `mssparkutils.notebook.run()`, we recommend using the `mssparkutils.nbResPath` command to access to the target notebook resource. The relative path “builtin/” will always point to the root notebook’s built-in folder.


## Collaborate in a notebook

The [!INCLUDE [product-name](../includes/product-name.md)] notebook is a collaborative item that supports multiple users editing the same notebook.  

When you open a notebook, you enter the co-editing mode by default, and every notebook edit will be auto-saved. If your colleagues open the same notebook at the same time, you see their profile, run output, cursor indicator, selection indicator and editing trace. By leveraging the collaborating features, you can easily accomplish pair programming, remote debugging, and tutoring scenarios.

:::image type="content" source="media\how-to-use-notebook\collaboration.png" alt-text="Screenshot showing a code cell with another user editing.":::

### Share a notebook

Sharing a notebook is a convenient way for you to collaborate with team members. Authorized workspace roles can view or edit/run notebooks by default. You can share a notebook with granting specified permissions granted.

1. Select the **Share** button on the notebook toolbar.

   :::image type="content" source="media\how-to-use-notebook\open-share-notebook-popup.png" alt-text="Screenshot showing where to select Share.":::

1. Select the corresponding category of **people who can view this notebook**. You can check **Share**, **Edit**, or **Run** to grant the permissions to the recipients.

   :::image type="content" source="media\how-to-use-notebook\select-permissions.png" alt-text="Screenshot showing where to select permissions.":::

1. After you "Apply" the selection, you can either send directly or copy the link to others, and then the recipients can open the notebook with the corresponding view granted by the permission.

   :::image type="content" source="media\how-to-use-notebook\create-and-send-link.png" alt-text="Screenshot showing where to create and send link.":::

1. To further manage your notebook permissions, you can find the "Manage permissions" entry in the **Workspace item list** -> **More options** to update the existing notebook access and permission.

   :::image type="content" source="media\how-to-use-notebook\manage-permissions-in-workspace.png" alt-text="Screenshot showing where to manage permissions in workspace.":::
   
### Comment a code cell

Commenting is another useful feature during collaborative scenarios. Currently, we support adding cell-level comments.

1. Select the **Comments** button on the notebook toolbar or cell comment indicator to open the **Comments** pane.

   :::image type="content" source="media\how-to-use-notebook\open-comment-pane.png" alt-text="Screenshot showing where to select Comment.":::

1. Select code in the code cell, select **New** in the **Comments** pane, add comments, and then select the post comment button to save.

   :::image type="content" source="media\how-to-use-notebook\new-comment.png" alt-text="Screenshot showing where to select New.":::

1. You could perform **Edit comment**, **Resolve thread**, or **Delete thread** by selecting the More button besides your comment.

## Switch Notebook mode

Fabric notebook support two modes for different scenarios, you can easily switch between **Editing** mode and **Viewing** mode.

:::image type="content" source="media\how-to-use-notebook\switch-mode.png" alt-text="Screenshot showing where switch modes.":::

- **Editing mode**: You can edit and run the cells and collaborate with others on the notebook.
- **Viewing mode**: You can only view the cell content, output, and comments of the notebook, all the operations that can lead to change the notebook will be disabled.

## Next steps

- [Author and execute notebooks](author-execute-notebook.md)
