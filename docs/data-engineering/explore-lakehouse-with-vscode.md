---
title: Explore lakehouse in VS Code
description: VS Code extension for Synapse supports the experience of lakehouse exploring.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.date: 05/08/2023
ms.search.form: VSCodeExtension
---

# Explore lakehouse in VS Code

Synapse VS Code extension support to explore the structure of the lakehouse in the workspace. The lakehouse structure is organized in a tree view, which includes the **Files** and **Tables** sections

Names of all the lakehouse from the selected workspace will be listed under the lakehouse root tree node.

:::image type="content" source="media\vscode\lakehouse-list.png" alt-text="Screenshot showing the lakehouse list.":::

[!INCLUDE [preview-note](../includes/preview-note.md)]

### Explore lakehouse and preview table data

By expanding the “Tables” node, you can find the table entities from the lakehouse. For each table, users can click the “Preview Table” button to inspect the first 100 row of the selected table

:::image type="content" source="media\vscode\preview-table.png" alt-text="Screenshot showing the preview table button.":::

By expanding the “Files” node, you can find the folder and files which have been saved in the lakehouse. you can download the individual file by clicking the “Download” button at the toolbar on that file row.

:::image type="content" source="media\vscode\download-file.png" alt-text="Screenshot showing the download file button.":::

### Copy lakehouse path

To make it easier to reference the table/folder/file in the code, you can find the options to copy the ABFS path/ Relative Path/ URL by right-click on the target node

:::image type="content" source="media\vscode\copy-path.png" alt-text="Screenshot showing the copy path button.":::

Here is the sample of the different path from the selected csv file. 
