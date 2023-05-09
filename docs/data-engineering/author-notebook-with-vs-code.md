---
title: Develop, execute and debug notebook in VS Code
description: VS Code extension for Synapse supports pro-dev authoring experience of Notebook, including run and debug notebook
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.date: 05/08/2023
ms.search.form: VSCodeExtension
---

# Notebook experience in VS Code

The CURD (create/update/read/delete) experience of notebook is fully supported with this extension, the synchronization between local and the remote workspace is also supported via certain UX gesture. During synchronizing the change, you have the option to address the conflict/difference between the local and remote workspace.

Another key scenario enabled by this extension is to support running notebook onto the remote Fabric Spark compute.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## List notebook

The notebook tree node lists names of the all the notebook artifacts in the current workspace. Based on the change made in VS Code side, there are different colors/character to indicate the latest state

- Default: White color indicates the default/initialized state, the notebook exists at remote workspace and hasn't been downloaded yet
- Modified: The notebook has been downloaded and edited at VS Code side, there are some pending change to be published back to the remote workspace
- Local: The notebook has been downloaded and the content is the same as the remote workspace
- Conflict: There's some conflict between the version of local copy and the version of remote workspace

:::image type="content" source="media\vscode\list-notebook.png" alt-text="Screenshot showing notebook list.":::

## Create notebook

When hovering the mouse over the Notebook toolbar, you'll find the “Create Notebook” button appear. After the button is clicked, with the promoted input box to provide the name and description, a new notebook artifact is created at the remote workspace and the Notebook list is refreshed to show a new entry there

:::image type="content" source="media\vscode\create-notebook.png" alt-text="Screenshot showing create notebook button.":::

## Download notebook

Before editing the notebook content, download the notebook to VS Code. Hover over the notebook name, and a **Download** button appears beside the notebook name. Select it to download and save it to the local working directory.

:::image type="content" source="media\vscode\download-notebook.png" alt-text="Screenshot showing download notebook button.":::

## Open notebook

To open the notebook, you can select the “Open Notebook Folder” button at the toolbar.

:::image type="content" source="media\vscode\open-notebook.png" alt-text="Screenshot showing open notebook button.":::

## Delete notebook

You can delete the notebook artifact by clicking the “Delete Notebook” button at the toolbar of the target notebook. You can choose to delete only the local copy or both the local copy and the remote workspace copy.

:::image type="content" source="media\vscode\delete-notebook.png" alt-text="Screenshot showing delete notebook button.":::

> [!TIP]
> To avoid failure, please close that notebook folder in the Explorer view and close the notebook in the editor view before deleting the notebook.

## Publish local change to remote workspace

By clicking the “Publish” button, you can push the local change to the remote workspace. The workspace version is updated with content submitted from VS Code side. If the workspace version contains any new change, you are prompted to resolve the conflict before publishing the change.

:::image type="content" source="media\vscode\publish-notebook.png" alt-text="Screenshot showing publish notebook button.":::

If the same notebook is  open in the Fabric portal, the user at the portal side is notified to accept/reject the change published from VS Code side.

:::image type="content" source="media\vscode\publish-notebook-portal.png" alt-text="Screenshot showing accept or reject change.":::

**Accept**: the change from VS Code is successfully saved at the workspace
**Reject**: the change from VS Code is ignored

## Pull change from remote workspace

Beside pushing the change to remote workspace, you can also choose to update the local version with the latest workspace version by pulling the remote version. you can trigger the pulling by clicking the “Update” button.

:::image type="content" source="media\vscode\update-notebook.png" alt-text="Screenshot showing update notebook button.":::

The system would pull the latest version from the remote workspace and open the VS Code default diff window to compare the two notebook files. The left side screen is from the workspace, the right side screen is from the local version:

:::image type="content" source="media\vscode\update-notebook-diff.png" alt-text="Screenshot showing update notebook diff.":::

You can update the code/markdown cell on the left side to address the difference. After the conflict/difference are all addressed, you should select the “Merge” button at the top-right corner of the windows to confirm the merging is done. Before clicking “Merge”, the notebook stays in the “Conflict” mode.

:::image type="content" source="media\vscode\update-notebook-merge.png" alt-text="Screenshot showing update notebook merge.":::

> [!IMPORTANT]
> After the diff view is open once, the extension will NOT automatically refresh left side of the diff view to fetch the latest update from the remote workspace.

## Run/Debug notebook on remote Spark compute

By selecting the kernel shipped with this extension, you can run the code cell on top of the remote Fabric Spark compute. Once this kernel is selected, during runtime, all the PySpark API calls are intercepted by the extension and translated to the corresponding http call to the remote Spark compute. For pure python code, it would still be executed in the local environment.

:::image type="content" source="media\vscode\run-notebook.png" alt-text="Screenshot showing run notebook.":::

## Next steps

* [Spark Job Definition experience in VS Code](author-sjd-with-vs-code.md)
* [Explore lakehouse from VS Code](explore-lakehouse-with-vs-code.md)
