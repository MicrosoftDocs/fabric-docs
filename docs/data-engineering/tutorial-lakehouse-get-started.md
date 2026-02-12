---
title: Lakehouse tutorial - Create a workspace
description: Learn how to create a workspace that you can use to create other items required by this end-to-end tutorial.
ms.reviewer: arali
ms.author: eur
author: eric-urban
ms.topic: tutorial
ms.custom:
ms.date: 07/19/2024
---

# Lakehouse tutorial: Create a Fabric workspace

Before you can begin creating the lakehouse, you need to create a workspace where you can build out the remainder of the tutorial.

## Prerequisites

Sign up for the free [Microsoft Fabric trial](../fundamentals/fabric-trial.md). The Fabric trial requires a Power BI license. If you don't have one, [sign up for a Fabric free license,](https://app.fabric.microsoft.com/?pbi_source=learn-data-engineering-tutorial-lakehouse-get-started) and then you can start the Fabric trial.

## Create a workspace

In this step, you create a Fabric workspace. The workspace contains all the items needed for this lakehouse tutorial, which includes lakehouse, dataflows, Data Factory pipelines, the notebooks, Power BI semantic models, and reports.

1. Sign in to the [Microsoft Fabric portal](https://app.fabric.microsoft.com).

1. Select **Workspaces** and then select **+ New workspace**.

1. Fill out the **Create a workspace** form with the following details:

   * **Name:** Enter *Fabric Lakehouse Tutorial*, and any extra characters to make the name unique.

   * **Description**: Enter an optional description for your workspace.

      :::image type="content" source="media\tutorial-lakehouse-get-started\create-workspace-details.png" alt-text="Screenshot of the Create a workspace dialog box." lightbox="media/tutorial-lakehouse-get-started/create-workspace-details.png":::

   * **Advanced**: Under **Workspace type**, select **Fabric Trial** capacity. You can also choose **Fabric** capacity with F64 SKU or a **Power BI Premium** capacity with P1 SKU if you have access to them. These SKUs provide you with access to all the Fabric capabilities.

      :::image type="content" source="media\tutorial-lakehouse-get-started\select-trial-capacity.png" alt-text="Screenshot of the Advanced options dialog box." lightbox="media/tutorial-lakehouse-get-started/select-trial-capacity.png":::

1. Select **Apply** to create and open the workspace.

## Next step

> [!div class="nextstepaction"]
> [Create a lakehouse in Microsoft Fabric](tutorial-build-lakehouse.md)
