---
title: Create and manage Fabric notebooks in VS Code
description: Create, edit, sync, and run Fabric notebooks in VS Code using the Fabric Data Engineering extension in local mode.
ms.reviewer: qixwang
ms.topic: how-to
ms.date: 03/23/2026
ms.search.form: VSCodeExtension
ai-usage: ai-assisted
---

# Create and manage Fabric notebooks in VS Code

The Fabric Data Engineering VS Code extension fully supports create, read, update, and delete (CRUD) notebook operations in Fabric. The extension also supports synchronization between local and remote workspaces; when you synchronize changes, you can address any conflicts or differences between your local and remote workspace.

With this extension, you can also run notebooks on the remote Apache Spark compute for Fabric.

## Open a notebook with the Data Engineering extension

Select the **Open in VS Code** button on the notebook authoring page in the Fabric portal to open the notebook with the Fabric Data Engineering VS Code extension. After you activate the extension and open the notebook, your workspace automatically connects.

:::image type="content" source="media\vs-code\open-notebook-in-vs-code.png" alt-text="Screenshot showing how to open a notebook in VS Code." lightbox="media\vs-code\open-notebook-in-vs-code.png":::

> [!TIP]
> Be sure to install the Fabric Data Engineering VS Code extension first. For more information, see [Install the Fabric Data Engineering VS Code extension](setup-vs-code-extension.md#install-the-extension). After the extension is publicly released, the installation is automated.

## View the list of notebooks

The notebook tree node lists all of the notebook items in the current workspace. Based on your changes in VS Code, the list displays different colors and characters to indicate the latest state, as shown in the following image.

- Default: White text and no character to the right of the notebook name indicates the default or initialized state. The notebook exists in the remote workspace and isn't downloaded to your local VS Code.
- Modified: The **M** character to the right of the name and yellow text indicates you downloaded and edited the notebook locally in VS Code, and didn't yet publish those pending changes back to the remote workspace.
- Local: The **L** character and green text indicates the notebook is downloaded and the content is the same as the remote workspace.
- Conflict: The **C** character and red text indicates that conflicts exist between the local version and the remote workspace version.

:::image type="content" source="media\vs-code\list-notebook.png" alt-text="Screenshot of a notebook list showing the different states of individual notebooks." lightbox="media\vs-code\list-notebook.png":::

## Create a notebook

1. In VS Code Explorer, hover over the notebook toolbar. The **Create Notebook** option appears.

   :::image type="content" source="media\vs-code\create-notebook.png" alt-text="Screenshot of the Notebook list in VS Code, showing where to select the create notebook option." lightbox="media\vs-code\create-notebook.png":::

1. Select **Create Notebook** and enter a name and description. A new notebook is created in the remote workspace and appears in your notebook list in the default state.

## Download a notebook

Before you can edit the content of a notebook, you must download the notebook to VS Code.

1. In the notebook list in VS Code, hover over the notebook name. The **Download** option appears beside the notebook name.

   :::image type="content" source="media\vs-code\download-notebook.png" alt-text="Screenshot of the VS Code Explorer notebook list, showing where to select the download notebook option." lightbox="media\vs-code\download-notebook.png":::

1. Select **Download** and save the notebook to your local working directory.

## Open a notebook

1. In VS Code Explorer, hover over the name of a downloaded notebook. Several options appear next to the notebook, including the **Open Notebook Folder** option.

   :::image type="content" source="media\vs-code\open-notebook.png" alt-text="Screenshot of the VS Code Explorer, showing where to select Open Notebook Folder." lightbox="media\vs-code\open-notebook.png":::

1. Select **Open Notebook Folder** and the notebook opens in the VS Code Editor screen.

## Delete a notebook

> [!TIP]
> To avoid failure, close the notebook folder in the Explorer view and close the notebook in the editor view before deleting the notebook.

To delete a notebook:

1. In VS Code Explorer, hover over the name of the notebook you want to delete; options appear to the right of the name, including the **Delete Notebook** option.

   :::image type="content" source="media\vs-code\delete-notebook.png" alt-text="Screenshot of VS Code Explorer, showing where the Delete Notebook option appears." lightbox="media\vs-code\delete-notebook.png":::

1. Select the **Delete Notebook** option. When prompted, choose to delete only the local copy or both the local and the remote workspace copies.

## Publish local changes to the remote workspace

To push your local changes to the remote workspace:

1. In VS Code Explorer, hover over the name of the notebook you want to publish to the remote workspace; options appear to the right of the name, including the **Publish** option.

   :::image type="content" source="media\vs-code\publish-notebook.png" alt-text="Screenshot of VS Code Explorer, showing where the Publish Notebook option appears." lightbox="media\vs-code\publish-notebook.png":::

1. Select **Publish**. The remote workspace version is updated with your local VS Code changes.

   - If your local update creates any merge conflicts, you're prompted to resolve them before the merge goes through.

1. If someone else has the same notebook open in the Fabric portal, they're notified to accept or reject your local VS Code changes, as shown in the following image.

   :::image type="content" source="media\vs-code\publish-notebook-portal.png" alt-text="Screenshot of the dialog box that notifies portal users that an external edit was detected. It includes an Accept and a Reject button." lightbox="media\vs-code\publish-notebook-portal.png":::

   - **Accept**: your change from VS Code is successfully saved in the workspace.
   - **Reject**: your change from VS Code is ignored.

## Pull changes from the remote workspace

To update your local version with the latest workspace version, you pull the remote version:

1. In VS Code Explorer, hover over the name of the notebook you want to update; options appear to the right of the name, including the **Update Notebook** option.

   :::image type="content" source="media\vs-code\update-notebook.png" alt-text="Screenshot of VS Code Explorer, showing where to select the **Update Notebook** option." lightbox="media\vs-code\update-notebook.png":::

1. Select the **Update Notebook** option. VS Code pulls the latest version from the remote workspace, and opens the VS Code diff editor so you can compare the two notebook files. The left-side screen is from the workspace and the right-side screen is from the local version:

   :::image type="content" source="media\vs-code\update-notebook-diff.png" alt-text="Screenshot showing the update notebook diff screen." lightbox="media\vs-code\update-notebook-diff.png":::

1. Update the code/markdown cell on the left side to address the issue.

1. After you address all conflicts, select the **Merge** option at the top-right corner of the diff editor to confirm the merge is complete. (Until you select **Merge**, the notebook stays in **Conflict** mode.)

   :::image type="content" source="media\vs-code\update-notebook-merge.png" alt-text="Screenshot of the top right corner of the VS Code diff editor screen, showing where to select the Merge option." lightbox="media\vs-code\update-notebook-merge.png":::

## Run or debug a notebook on remote Spark compute

Select the kernel **Microsoft Fabric Runtime** to run code cells on the remote Spark compute.

:::image type="content" source="media\vs-code\fabric-runtime-kernel.png" alt-text="Screenshot showing how to select the kernel to run a notebook in VS Code." lightbox="media\vs-code\fabric-runtime-kernel.png":::

Following are the languages supported:
- PySpark
- Spark SQL
- Scala
- Python

## Related content

- [Create and manage Apache Spark job definitions in Visual Studio Code](author-sjd-with-vs-code.md)
- [Explore Microsoft Fabric lakehouses in Visual Studio Code](explore-lakehouse-with-vs-code.md)
