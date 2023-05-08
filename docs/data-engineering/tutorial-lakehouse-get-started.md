---
title: Lakehouse tutorial - Create a workspace
description: Learn how to create a workspace that you'll use to create other items required by this end-toend-tutorial.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.date: 5/23/2023
---

# Lakehouse tutorial: Create a Fabric workspace

Before you can begin creating the lakehouse, you need to create a workspace where you'll build out the remainder of the tutorial.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Create a workspace

In this step, you create a Fabric workspace. The workspace contains all the items needed for this lakehouse tutorial, which includes lakehouse, dataflows, Data Factory pipelines, the notebooks, Power BI datasets, and reports.

1. Sign in to [Power BI](https://powerbi.com/).

1. Select **Workspaces** and &&New Workspace**.

   :::image type="content" source="media\tutorial-lakehouse-get-started\create-new-workspace.png" alt-text="Screenshot showing where to select Workspaces and create a new workspace.":::

1. Fill out the **Create a workspace** form with the following details:

   * **Name:** Enter *Fabric Lakehouse Tutorial*, and any extra characters to make the name unique.

   * **Description**: Enter an optional description for your workspace.

      :::image type="content" source="media\tutorial-lakehouse-get-started\create-workspace-details.png" alt-text="Screenshot of the Create a workspace dialog box.":::

   * **Advanced**: Under **License mode**, select **Premium capacity** and then choose a premium capacity that you have access to.

      :::image type="content" source="media\tutorial-lakehouse-get-started\select-premium-capacity.png" alt-text="Screenshot of the Advanced options dialog box.":::

1. Select **Apply** to create and open the workspace.

## Next steps

Advance to the next article to learn about
> [!div class="nextstepaction"]
> [Create a lakehouse in Microsoft Fabric](tutorial-build-lakehouse.md)
