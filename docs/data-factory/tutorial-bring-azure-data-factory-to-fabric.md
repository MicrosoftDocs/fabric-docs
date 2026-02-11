---
title: Bring Azure Data Factory to Fabric
description: Learn steps to bring Azure Data Factory to Fabric
ms.reviewer: lle
ms.topic: tutorial
ms.date: 06/16/2025
ms.search.form: Pipeline tutorials
ms.custom: configuration, sfi-image-nochange
---

# Quickstart: Bring your Azure Data Factory to Fabric

In the quickstart, you learn how to bring your existing Azure Data Factory (ADF) to your Fabric workspace. This experience shows how you can easily bring your ADF in Microsoft Fabric and provides with a risk-free approach to try out your ADF pipelines in Microsoft Fabric before deciding to upgrade to Data Factory in Fabric.

## Prerequisites

To get started, you must complete the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).

- Enable the preview on your Microsoft Fabric tenant from the Fabric admin portal. Enable the Azure Data Factory preview using admin portal or reach out to your Fabric admin.

## Bring your Azure Data Factory to Fabric

1. Navigate to [Power BI](https://app.powerbi.com/).
1. Select the Power BI icon in the bottom left of the screen, then select **Fabric** to open the Fabric home page.
1. Create a new workspace or select an existing workspace where you want to bring your Azure Data Factory.
1. In your workspace, select **New item**, then select **Azure Data Factory** from the menu.

    :::image type="content" source="media/tutorial-bring-azure-data-factory-to-fabric/azure-data-factory-in-fabric.png" alt-text="Screenshot with the Azure data factory in fabric entrance.":::

1. In the popup window, select all data factories that you want to mount to current workspace.

    :::image type="content" source="media/tutorial-bring-azure-data-factory-to-fabric/choose-azure-data-factory-in-fabric.png" alt-text="Screenshot with the Azure data factory in fabric list.":::

1. In the workspace item list page, you can see a new item is created.

    :::image type="content" source="media/tutorial-bring-azure-data-factory-to-fabric/mounted-data-factory-artifact.png" alt-text="Screenshot with the Azure data factory in fabric workspace.":::

1. You can select it and go into the Azure data factory UI.
1. You can edit or run any pipelines here.

    :::image type="content" source="media/tutorial-bring-azure-data-factory-to-fabric/mounted-data-factory-ui.png" alt-text="Screenshot with the Azure data factory in fabric.":::

## Related content

When you're ready to fully migrate your Azure Data Factory to Fabric Data Factory, you can follow the steps in the [Migrate your Azure Data Factory to Fabric Data Factory](migrate-planning-azure-data-factory.md) article.
