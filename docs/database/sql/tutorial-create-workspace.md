---
title: SQL database in Fabric tutorial - Create a workspace
description: Learn how to create a Fabric workspace, which you'll work in for the rest of the tutorial.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: bwoody
ms.date: 10/24/2024
ms.topic: tutorial
ms.custom:
---

# Create a Microsoft Fabric Workspace

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

The Microsoft Fabric workspace contains all the items needed for data warehousing: Data Factory pipelines, the warehouse, Power BI semantic models, operational databases, and reports.

Before you can create a database and get further in this tutorial, create a new Microsoft Fabric Workspace. This is where you build out the remainder of the tutorial. At the end of this tutorial, you'll [Clean up resources](tutorial-clean-up.md) by removing this [workspace](../../admin/portal-workspaces.md) from Fabric.

## Prerequisites

You need an existing Fabric capacity. If you don't have one, [start a Fabric trial](../../fundamentals/fabric-trial.md).

## Create a workspace

1. Sign in to [Power BI](https://powerbi.com/).
1. Select **Workspaces** > **New workspace**.
1. Fill out the **Create a workspace** form as follows:

    :::image type="content" source="media/tutorial-create-workspace/create-workspace.png" alt-text="Screenshot of the create workspace dialogue in the Fabric portal.":::

   - **Name**: Enter **(*your username or other unique characters*) Supply Chain Analytics Tutorial**.
   - **Description**: Optionally, enter a description for the workspace.
1. Expand the **Advanced** section.
1. Choose **Fabric capacity** or **Trial** in the **License mode** section, or choose a premium capacity you have access to.
1. Select **Apply**. The workspace is created and opened.  

## Next step

> [!div class="nextstepaction"]
> [Create a SQL database in Microsoft Fabric](tutorial-create-database.md)
