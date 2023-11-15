---
title: Data warehouse tutorial - create a workspace
description: As a first tutorial step, learn how to create a workspace, which you'll work in for the rest of the tutorial.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Tutorial: Create a Microsoft Fabric workspace

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Before you can create a warehouse, you need to create a workspace where you'll build out the remainder of the tutorial.

## Create a workspace

The workspace contains all the items needed for data warehousing, including: Data Factory pipelines, the data warehouse, Power BI semantic models, and reports.

1. Sign in to [Power BI](https://powerbi.com).
1. Select **Workspaces** > **New workspace**.

   :::image type="content" source="media\tutorial-create-workspace\create-new-workspace.png" alt-text="Screenshot of workspaces pane showing where to select New workspace.":::

1. Fill out the **Create a workspace** form as follows:
   1. **Name**: Enter `Data Warehouse Tutorial`, and some characters for uniqueness.
   1. **Description**: Optionally, enter a description for the workspace.

   :::image type="content" source="media\tutorial-create-workspace\create-a-workspace-dialog.png" alt-text="Screenshot of the Create a workspace dialog box, showing where to enter the new workspace name.":::

1. Expand the **Advanced** section.
1. Choose **Fabric capacity** or **Trial** in the **License mode** section.
1. Choose a premium capacity you have access to.
1. Select **Apply**. The workspace is created and opened.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a Microsoft Fabric data warehouse](tutorial-create-warehouse.md)
