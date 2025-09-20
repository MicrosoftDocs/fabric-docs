---
title: Develop, execute, and debug notebook in VS Code
description: Learn about the VS Code extension for Synapse, which supports a pro-developer authoring experience, including running and debugging notebooks.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom:
ms.date: 09/21/2025
ms.search.form: VSCodeExtension
---

# Create and manage Microsoft Fabric notebooks in Visual Studio Code

The Fabric Data Engineering Visual Studio (VS) Code extension fully supports the create, read, update, and delete (CRUD) notebook operations in Fabric. The extension also supports synchronization between local and remote workspaces; when you synchronize changes, you can address any conflicts or differences between your local and remote workspace.

With this extension, you can also run notebooks onto the remote Apache Spark compute for Fabric.

## Open a notebook with the Data Engineering extension

By clicking the **Open in VS Code** button in the notebook authoring page in the Fabric portal, you can directly open the same notebook with the Data Engineering VS Code extension for Fabric. After you activate the extension in VS Code and open the notebook once, your workspace should automatically connect to the notebook.

:::image type="content" source="media\vscode\open-notebook-in-vs-code.png" alt-text="Screenshot showing how to open a notebook in VS Code." lightbox="media\vscode\open-notebook-in-vs-code.png":::

> [!TIP]
> Be sure to install the Fabric Data Engineering VS Code extension first. For more information, see [Install the Fabric Data Engineering VS Code extension](setup-vs-code-extension.md#install-the-extension-and-prepare-your-environment). After the extension is publicly released, the installation is automated.

## View the list of notebooks

The notebook tree node lists all of the notebook items in the current workspace. Based on your changes in VS Code, the list displays different colors and characters to indicate the latest state, as shown in the following image.

- Default: White text and no character to the right of the notebook name indicates the default or initialized state. The notebook exists in the remote workspace and isn't downloaded to your local VS Code.
- Modified: The **M** character to the right of the name and yellow text indicates you downloaded and edited the notebook locally in VS Code, and didn't yet publish those pending changes back to the remote workspace.
- Local: The **L** character and green text indicates the notebook is downloaded and the content is the same as the remote workspace.
- Conflict: The **C** character and red text indicates that conflicts exist between the local version and the remote workspace version.

:::image type="content" source="media\vscode\list-notebook.png" alt-text="Screenshot of a notebook list showing the different states of individual notebooks." lightbox="media\vscode\list-notebook.png":::

## Create a notebook

1. In VS Code Explorer, hover over the notebook toolbar. The **Create Notebook** option appears.

   :::image type="content" source="media\vscode\create-notebook.png" alt-text="Screenshot of the Notebook list in VS Code, showing where to select the create notebook option." lightbox="media\vscode\create-notebook.png":::

1. Select **Create Notebook** and enter a name and description. A new notebook is created in the remote workspace and appears in your notebook list in the default state.

## Download a notebook

Before you can edit the content of a notebook, you must download the notebook to VS Code.

1. In the notebook list in VS Code, hover over the notebook name. The **Download** option appears beside the notebook name.

   :::image type="content" source="media\vscode\download-notebook.png" alt-text="Screenshot of the VS Code Explorer notebook list, showing where to select the download notebook option." lightbox="media\vscode\download-notebook.png":::

1. Select **Download** and save the notebook to your local working directory.

## Open a notebook

1. In VS Code Explorer, hover over the name of a downloaded notebook. Several options appear next to the notebook, including the **Open Notebook Folder** option.

   :::image type="content" source="media\vscode\open-notebook.png" alt-text="Screenshot of the VS Code Explorer, showing where to select Open Notebook Folder." lightbox="media\vscode\open-notebook.png":::

1. Select **Open Notebook Folder** and the notebook opens in the VS Code Editor screen.

## Delete a notebook

> [!TIP]
> To avoid failure, close the notebook folder in the Explorer view and close the notebook in the editor view before deleting the notebook.

To delete a notebook:

1. In VS Code Explorer, hover over the name of the notebook you want to delete; options appear to the right of the name, including the **Delete Notebook** option.

   :::image type="content" source="media\vscode\delete-notebook.png" alt-text="Screenshot of VS Code Explorer, showing where the Delete Notebook option appears." lightbox="media\vscode\delete-notebook.png":::

1. Select the **Delete Notebook** option. When prompted, choose to delete only the local copy or both the local and the remote workspace copies.

## Publish local changes to the remote workspace

To push your local changes to the remote workspace:

1. In VS Code Explorer, hover over the name of the notebook you want to publish to the remote workspace; options appear to the right of the name, including the **Publish** option.

   :::image type="content" source="media\vscode\publish-notebook.png" alt-text="Screenshot of VS Code Explorer, showing where the Publish Notebook option appears." lightbox="media\vscode\publish-notebook.png":::

1. Select **Publish**. The remote workspace version is updated with your local VS Code changes.

   - If your local update creates any merge conflicts, you're prompted to resolve them before the merge goes through.

1. If someone else has the same notebook open in the Fabric portal, they're notified to accept or reject your local VS Code changes, as shown in the following image.

   :::image type="content" source="media\vscode\publish-notebook-portal.png" alt-text="Screenshot of the dialog box that notifies portal users that an external edit was detected. It includes an Accept and a Reject button." lightbox="media\vscode\publish-notebook-portal.png":::

   - **Accept**: your change from VS Code is successfully saved in the workspace.
   - **Reject**: your change from VS Code is ignored.

## Pull changes from the remote workspace

To update your local version with the latest workspace version, you pull the remote version:

1. In VS Code Explorer, hover over the name of the notebook you want to update; options appear to the right of the name, including the **Update Notebook** option.

   :::image type="content" source="media\vscode\update-notebook.png" alt-text="Screenshot of VS Code Explorer, showing where to select the **Update Notebook** option." lightbox="media\vscode\update-notebook.png":::

1. Select the **Update Notebook** option. VS Code pulls the latest version from the remote workspace, and opens the VS Code diff editor so you can compare the two notebook files. The left-side screen is from the workspace and the right-side screen is from the local version:

   :::image type="content" source="media\vscode\update-notebook-diff.png" alt-text="Screenshot showing the update notebook diff screen." lightbox="media\vscode\update-notebook-diff.png":::

1. Update the code/markdown cell on the left side to address the issue.

1. After you address all conflicts, select the **Merge** option at the top-right corner of the diff editor to confirm the merge is complete. (Until you select **Merge**, the notebook stays in **Conflict** mode.)

   :::image type="content" source="media\vscode\update-notebook-merge.png" alt-text="Screenshot of the top right corner of the VS Code diff editor screen, showing where to select the Merge option." lightbox="media\vscode\update-notebook-merge.png":::

## Run or debug a notebook on remote Spark compute

By selecting the kernel **synapse-spark-kernel** shipped with this extension, you can run the code cell on top of the remote Spark compute. Once you select this kernel, the extension intercepts all the PySpark API calls during runtime and translates them to the corresponding http call to the remote Spark compute. Python code is still executed in the local environment.

:::image type="content" source="media\vscode\run-notebook.png" alt-text="Screenshot showing where to run a notebook." lightbox="media\vscode\run-notebook.png":::

## Related content

- [Create and manage Apache Spark job definitions in Visual Studio Code](author-sjd-with-vs-code.md)
- [Explore Microsoft Fabric lakehouses in Visual Studio Code](explore-lakehouse-with-vs-code.md)
