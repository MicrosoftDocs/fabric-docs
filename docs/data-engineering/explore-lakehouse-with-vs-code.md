---
title: Explore lakehouses in Visual Studio Code
description: Use the VS Code extension for Synapse to explore your Fabric lakehouses, including tables and raw data.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom:
ms.date: 03/11/2025
ms.search.form: VSCodeExtension
---

# Explore Microsoft Fabric lakehouses in Visual Studio Code

You can use the Fabric Data Engineering VS Code extension to explore the structure of your lakehouse in a workspace.

With the extension installed, Visual Studio (VS) Code displays the lakehouse structure in a tree view that includes the **Files** and **Tables** sections. All the lakehouses from the workspace you select appear under the lakehouse root tree node.

:::image type="content" source="media\vscode\lakehouse-list.png" alt-text="Screenshot showing the lakehouse list, with Tables and Files nodes under each lakehouse." lightbox="media/vscode/lakehouse-list.png":::

## Explore a lakehouse and preview table data

Expand the **Tables** node to find the table entities from the lakehouse. To review the first 100 rows of a specific table, select the **Preview Table** option to the right of the table.

:::image type="content" source="media\vscode\preview-table.png" alt-text="Screenshot showing where to find the Preview Table option." lightbox="media/vscode/preview-table.png":::

Expand the **Files** node to find the folder and files that are saved in the lakehouse. Select the **Download** option to the right of a file name to download that file.

:::image type="content" source="media\vscode\download-file.png" alt-text="Screenshot showing where to find the Download File option." lightbox="media/vscode/download-file.png":::

## Copy the lakehouse path

To make it easier to reference a table, folder, or file in the code, you can copy the relevant path. Right-click on the target node and find the options to **Copy ABFS path**, **Copy Relative Path**, or **Copy URL**.

:::image type="content" source="media\vscode\copy-path.png" alt-text="Screenshot of the right-click menu, showing where to select from the copy options." lightbox="media/vscode/copy-path.png":::

## Related content

- [What is the SQL analytics endpoint for a lakehouse?](lakehouse-sql-analytics-endpoint.md)
- [What is a Lakehouse?](lakehouse-overview.md)
- [Navigate your Lakehouse?](navigate-lakehouse-explorer.md)
- [Get data into the Fabric Lakehouse](load-data-lakehouse.md)
