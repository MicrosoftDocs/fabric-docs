---
title: How to use notebooks
description: Learn how to create a new notebook, import an existing notebook, connect notebooks to lakehouses, collaborate in notebooks, and comment code cells.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.search.form: Create and use notebooks
ms.date: 07/25/2024
---

# How to use Microsoft Fabric notebooks

The Microsoft Fabric notebook is a primary code item for developing Apache Spark jobs and machine learning experiments. It's a web-based interactive surface used by data scientists and data engineers to write code benefiting from rich visualizations and Markdown text. Data engineers write code for data ingestion, data preparation, and data transformation. Data scientists also use notebooks to build machine learning solutions, including creating experiments and models, model tracking, and deployment.

With a Fabric notebook, you can:

- Get started with zero set-up effort.
- Easily explore and process data with intuitive low-code experience.
- Keep data secure with built-in enterprise security features.
- Analyze data across raw formats (CSV, txt, JSON, etc.), processed file formats (parquet, Delta Lake, etc.), using powerful Spark capabilities.
- Be productive with enhanced authoring capabilities and built-in data visualization.

This article describes how to use notebooks in data science and data engineering experiences.

## Security context of running notebook

The execution of a notebook can be triggered by three different manners in Fabric with full flexibility to meet different scenarios:

- **Interactive run**: User manually triggers the execution via the different UX entries or calling the REST API. The execution would be running under the current user's security context.
- **Run as pipeline activity**: The execution is triggered from Fabric Data Factory pipeline. You can find the detail steps in the [Notebook Activity](../data-factory/notebook-activity.md). The execution would be running under the pipeline owner's security context.
- **Scheduler**: The execution is triggered from a scheduler plan. The execution would be running under the security context of the user who setup/update the scheduler plan.

The flexibility of these execution options with different security context allows you to meet different scenarios and requirements, but also requires you to be aware of the security context when you design and develop your notebook, otherwise it may cause unexpected behavior and even some security issues.

The first time when a notebook is created, a warning message is shown to remind you the risk of running the code without reviewing it.

:::image type="content" source="media\how-to-use-notebook\notebook-security-warning.png" alt-text="Screenshot showing warning of running notebook.":::

Here are some best practices to help you avoid security issues:

- Before you manually run the notebook, Open the Notebook setting and check the Detail section under the About panel for the modification update, make sure you are OK with the latest change.
- Before you add a notebook activity to a pipeline, Open the Notebook setting and check the Detail section under the About panel for the modification update, make sure you are OK with the latest change. If you are not sure about the latest change, better open the Notebook to review the change before you add it into the pipeline.
- Before you update the scheduler plan, Open the Notebook setting and check the Detail section under the About panel for the modification update, make sure you are OK with the latest change. If you are not sure about the latest change, better open the Notebook to review the change before you update the scheduler plan.
- Separate the workspace into different stage (dev, test, prod) and control the access of different stage to avoid the security issue. Only add the user who you trust to the prod stage.


## Create notebooks

You can either create a new notebook or import an existing notebook.

### Create a new notebook

Like other standard Fabric item creation processes, you can easily create a new notebook from the Fabric **Data Engineering** homepage, the workspace **New** option, or the **Create Hub**.

### Import existing notebooks

You can import one or more existing notebooks from your local computer using the entry in the workspace toolbar. Fabric notebooks recognize the standard Jupyter Notebook *.ipynb* files, and source files like *.py*, *.scala*, and *.sql*, and create new notebook items accordingly.

:::image type="content" source="media\how-to-use-notebook\new-menu-notebook-options.png" alt-text="Screenshot showing where to find notebook options on the New menu.":::

## Export a notebook

You can export your notebook to other standard formats. Synapse notebook can be exported into:

- The standard notebook file (.ipynb) that is used for Jupyter notebooks.
- An HTML file (.html) that can be opened from a browser directly.  
- A Python file (.py).  
- A Latex file (.tex).

:::image type="content" source="media\how-to-use-notebook\export-notebook.png" alt-text="Screenshot showing where to export notebook.":::

## Save a notebook

In Fabric, a notebook will by default save automatically after you open and edit it; you don't need to worry about losing code changes. You can also use **Save a copy** to clone another copy in the current workspace or to another workspace.

:::image type="content" source="media\how-to-use-notebook\save-copy.png" alt-text="Screenshot showing where to save a copy.":::

If you prefer to save a notebook manually, you can switch to the **Manual** save option to have a local branch of your notebook item, and then use **Save** or **CTRL+s** to save your changes.

:::image type="content" source="media\how-to-use-notebook\manual-save.png" alt-text="Screenshot showing where to switch manual save.":::

You can also switch to manual save mode by selecting **Edit** -> **Save options** -> **Manual**. To turn on a local branch of your notebook then save it manually, select **Save** or use the **Ctrl+s** keyboard shortcut.

## Connect lakehouses and notebooks

Fabric notebooks now support close interactions with lakehouses; you can easily add a new or existing lakehouse from the Lakehouse explorer.

You can navigate to different lakehouses in the Lakehouse explorer and set one lakehouse as the default by pinning it. Your default is then mounted to the runtime working directory, and you can read or write to the default lakehouse using a local path.

:::image type="content" source="media\how-to-use-notebook\pin-default-lakehouse.png" alt-text="Screenshot showing where to pin a default lakehouse.":::

> [!NOTE]
> You must restart the session after pinning a new lakehouse or renaming the default lakehouse.

### Add or remove a lakehouse

Selecting the **X** icon beside a lakehouse name removes it from the notebook tab, but the lakehouse item still exists in the workspace.

Select **Add lakehouse** to add more lakehouses to the notebook, either by adding an existing one or creating a new lakehouse.

### Explore a lakehouse file

The subfolder and files under the **Tables** and **Files** section of the **Lake** view appear in a content area between the lakehouse list and the notebook content. Select different folders in the **Tables** and **Files** section to refresh the content area.

### Folder and file operations

If you select a file (.csv,.parquet,.txt,.jpg,.png, etc.) with a right mouse click, you can use the Spark or Pandas API to load the data. A new code cell is generated and inserted beneath the focus cell.

You can easily copy a path with a different format from the select file or folder and use the corresponding path in your code.

:::image type="content" source="media\how-to-use-notebook\lakehouse-file-operation.png" alt-text="Screenshot showing context menu of files in lakehouse.":::

## Notebook resources

The notebook resource explorer provides a Unix-like file system to help you manage your folders and files. It offers a writeable file system space where you can store small-sized files, such as code modules, semantic models, and images. You can easily access them with code in the notebook as if you were working with your local file system.

![Animated GIF of notebook resources.](media/how-to-use-notebook/notebook-resources-operations.gif)

> [!NOTE]
> - The maximum Resource storages for both built-in folder and environment folder are **500 MB**, with a single file size up to **100 MB**. They both allow up to **100** file/folder instances in total.
> - When using `notebookutils.notebook.run()`, use the `notebookutils.nbResPath` command to access the target notebook resource. The relative path **builtin/** will always point to the root notebook’s built-in folder.

### Built-in resources folder

The built-in resources folder is a system-defined folder unique to each notebook. It is recommended to use built-in resource folder to storage any data used in the current notebook. Here are the key capabilities for the notebook resources.

- You can use common operations such as create/delete, upload/download, drag/drop, rename, duplicate, and search through the UI.
- You can use relative paths like `builtin/YourData.txt` for quick exploration. The `notebookutils.nbResPath` method helps you compose the full path.
- You can easily move your validated data to a lakehouse via the **Write to lakehouse** option. Fabric embeds rich code snippets for common file types to help you quickly get started.
- These resources are also available for use in the [Reference notebook run](author-execute-notebook.md) case via ```notebookutils.notebook.run()```.

### Environment resources folder

Environment Resources Folder is a shared repository designed to streamline collaboration across multiple notebooks.

- You can find the **Resources** tab inside the environment and have the full operations to manage the resource files here. These files can be shared across multiple notebooks once the notebook is attached to the current environment.

   :::image type="content" source="media\how-to-use-notebook\manage-environment-resources.png" alt-text="Screenshot showing where to manage resources in environment.":::

- In the Notebook page, you can easily find a second root folder under Resources inherited from the attached environment.
   
   :::image type="content" source="media\how-to-use-notebook\environment-resources-folder.png" alt-text="Screenshot showing where to open environment resources folder.":::

- You can also operate on the files/folders same with the Built-in resources folder. 
- The Environment resource path is automatically mounted to the notebook cluster. You can use the relative path **/env** to access the environment resources.


> [!NOTE]
> Reading/writing with a relative path is not functioning in a [High concurrency session](../data-engineering/configure-high-concurrency-session-notebooks.md).

### File editor

The file editor allows you to view and edit files directly within the notebook's resource folder and environment resource folder in notebook. Supported file types include **CSV, TXT, HTML, YML, PY, SQL**, and more. With the file editor, you can easily access and modify files within the notebook, it supports Keyword highlighting and provides necessary language service when opening and editing code files like *.py* and *.sql*.

- You can access this feature through **'View and edit'** in the file menu. Double-click on file is a faster way.

   :::image type="content" source="media\how-to-use-notebook\view-edit-file.png" alt-text="Screenshot showing where to view and edit files.":::

- Content change on file editor needs to be saved manually by clicking the **Save** button or keyboard shortcut: **Ctrl+S**, file editor doesn't support autosave.
- [notebook mode](#notebook-mode-switcher) also affects the file editor. You can only view files but cannot edit them if you are in the notebook mode without editing permission.

> [!NOTE]
> Here are some limitations for file editor.
> - File size limit is **1 MB**.
> - These file types are not supported for viewing and editing: *.xlsx* and *.parquet*.

## Collaborate in a notebook

The Fabric notebook is a collaborative item that supports multiple users editing the same notebook.

When you open a notebook, you enter the coediting mode by default, and every notebook edit is automatically saved. If your colleagues open the same notebook at the same time, you see their profile, run output, cursor indicator, selection indicator, and editing trace. By using the collaboration features, you can easily accomplish pair programming, remote debugging, and tutoring scenarios.

:::image type="content" source="media\how-to-use-notebook\collaboration.png" alt-text="Screenshot showing a code cell with another user editing.":::

### Share a notebook

Sharing a notebook is a convenient way for you to collaborate with team members. Authorized workspace roles can view or edit/run notebooks by default. You can share a notebook with specified permissions granted.

1. Select **Share** on the notebook toolbar.

   :::image type="content" source="media\how-to-use-notebook\open-share-notebook-popup.png" alt-text="Screenshot showing where to select Share.":::

1. Select the corresponding category of **people who can view this notebook**. You can choose **Share**, **Edit**, or **Run** permissions for the recipients.

   :::image type="content" source="media\how-to-use-notebook\select-permissions.png" alt-text="Screenshot showing where to select permissions.":::

1. After you select **Apply**, you can either send the notebook directly or copy the link to others. Recipients can then open the notebook with the corresponding view granted by their permission level.

   :::image type="content" source="media\how-to-use-notebook\create-and-send-link.png" alt-text="Screenshot showing where to create and send link.":::

1. To further manage your notebook permissions, select **Workspace item list** > **More options**, and then select **Manage permissions**. From that screen, you can update the existing notebook access and permissions.

   :::image type="content" source="media\how-to-use-notebook\manage-permissions-in-workspace.png" alt-text="Screenshot showing where to manage permissions in workspace.":::

### Comment a code cell

Commenting is another useful feature for collaborative scenarios. Currently, Fabric supports adding cell-level comments.

1. Select the **Comments** button on the notebook toolbar or cell comment indicator to open the **Comments** pane.

   :::image type="content" source="media\how-to-use-notebook\open-comment-pane.png" alt-text="Screenshot showing where to select Comment.":::

1. Select code in the code cell, select **New** in the **Comments** pane, add comments, and then select **Post comment** to save.

   :::image type="content" source="media\how-to-use-notebook\new-comment.png" alt-text="Screenshot showing where to select New.":::

1. If you need them, find the **Edit comment**, **Resolve thread**, and **Delete thread** options by selecting the More option next to your comment.

### Tagging others in a comment
 
"Tagging" refers to mentioning and notifying a user in a comment thread, enhancing collaboration efficiently on the specifics.
 
1. Select a section of code in a cell and new a comment thread.
 
1. Input user name and choose the correct one on the suggestion list if you want to mention someone for discussion about a certain section.
 
1. Share your insights and **Post** them.
 
1. An Email notification is triggered, and user clicks on **Open Comments** link to quickly locate this cell.
 
1. Moreover, authorize and configure the permissions for users when tagging someone who doesn’t have access, ensuring that your code assets are well managed.

![Animated GIF of tagging others in a comment.](media/how-to-use-notebook/tagging-others-in-a-comment.gif)

> [!NOTE]
> For a comment item, the tagged user will not receive an Email notification anymore if you update the comment within one hour. But it sends Email notification to the new tagged user.

## Version history

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Version history allows you to easily version your live notebook changes. It supports history tracking and notebook management with robust built-in version control capabilities, which is especially helpful for collaborative work with multiple contributors on the same notebook.

1. Access version **history** from notebook global toolbar.

   :::image type="content" source="media\how-to-use-notebook\history-access.png" alt-text="Screenshot showing history access.":::

1. Notebook supports two ways of creating checkpoints.

   - Manual checkpoint: You can manually **create new version** to record your development milestones, providing flexibility for managing your notebook versions.

      :::image type="content" source="media\how-to-use-notebook\create-new-version.png" alt-text="Screenshot showing how to create new version.":::

   - System checkpoint: These checkpoints are created automatically every 5 minutes based on editing time interval by Notebook system, ensuring that your work is consistently saved and versioned. You can find the modification records from all the contributors in the system checkpoint timeline list.
      :::image type="content" source="media\how-to-use-notebook\expand-system-checkpoint.png" alt-text="Screenshot showing expand checkpoint list."lightbox="media\how-to-use-notebook\expand-system-checkpoint.png":::

1. You can click on a checkpoint to open the **diff view**, it highlights the content differences between the selected checkpoint and the current live version, including the differences of cell content, cell output, and metadata. The version of this checkpoint can be managed individually in **'more options'** menu.

   :::image type="content" source="media\how-to-use-notebook\checkpoint-diff-view.png" alt-text="Screenshot showing view diff."lightbox="media\how-to-use-notebook\checkpoint-diff-view.png":::

1. You can manage the version from the checkpoint drop-down menu, if you want to keep a pervious version, click **restore** from checkpoint and overwrite the current notebook, or using **save as copy** to clone it to a new notebook.

   :::image type="content" source="media\how-to-use-notebook\more-options-with-the-checkpoint.png" alt-text="Screenshot showing more options with the checkpoint."lightbox="media\how-to-use-notebook\more-options-with-the-checkpoint.png":::

> [!NOTE]
>
> - Known limitation: After clicking on the **Restore** button and navigate **Back to notebook**, the notebook won't be immediately recovered from the checkpoint. A message bar prompts you to view the changes. You need to click the **View changes** button and select keeping the *Saved version* to finish the restore.
    :::image type="content" source="media\how-to-use-notebook\view-changes-messagebar.png" alt-text="Screenshot showing view changes after restore.":::
> - System checkpoints will expire after **1** year.

## Notebook mode switcher

Fabric notebooks support four modes that you can easily switch: **Develop** mode，**Run only** mode, **Edit** mode, and **View** mode. Each mode maps to a specific permission combination. When sharing the notebook to other team members, you can grant proper permissions to the recipients. They can see the best available notebook mode according to their permission, and they are able to switch between the mode they have permission to.

:::image type="content" source="media\how-to-use-notebook\switch-mode.png" alt-text="Screenshot showing where switch modes.":::

- **Develop mode**: Read, execute, write permission needed.
- **Run only mode**: Read, execute permission needed.
- **Edit mode**: Read, write permission needed.
- **View mode**: Read permission needed.

## Related content

- [Author and execute notebooks](author-execute-notebook.md)
