---
title: Bring Azure Data Factory to Fabric
description: Learn steps to bring Azure Data Factory to Fabric
ms.reviewer: jonburchel
ms.author: lle
author: lrtoyou1223
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/25/2024
ms.search.form: Pipeline tutorials
---

# Quickstart: Bring your Azure Data Factory to Fabric

In the quickstart, you learn how to bring your existing Azure Data Factory (ADF) to your Fabric workspace. This experience shows how you can easily bring your ADF in Microsoft Fabric and provides with a risk-free approach to try out your ADF pipelines in Microsoft Fabric before deciding to upgrade to Fabric Data Factory.

## Prerequisites

To get started, you must complete the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create a free account](https://azure.microsoft.com/free/).

- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).

- Enable the preview on your Microsoft Fabric tenant from the Fabric admin portal. Enable the Azure Data Factory preview using admin portal or reach out to your Fabric admin.

## Bring your Azure Data Factory to Fabric

1. Navigate to [Power BI](https://app.powerbi.com/).
2. Select the Power BI icon in the bottom left of the screen, then select **Data factory** to open homepage of Data Factory.
3. Navigate to your Microsoft Fabric workspace. 
4. In the homepage, select **Azure Data Factory**.

   :::image type="content" source="media/tutorial-bring-azure-data-factory-to-fabric/azure-data-factory-in-fabric.png" alt-text="Screenshot with the Azure data factory in fabric entrance.":::

5. In the popup window, select all data factories that you want to mount to current workspace. 

  :::image type="content" source="media/tutorial-bring-azure-data-factory-to-fabric/choose-azure-data-factory-in-fabric.png" alt-text="Screenshot with the Azure data factory in fabric list.":::

6. In the workspace artifact list page, you can see a new artifact is created.

:::image type="content" source="media/tutorial-bring-azure-data-factory-to-fabric/mounted-data-factory-artifact.png" alt-text="Screenshot with the Azure data factory in fabric workspace.":::

7. You can select it and go into the Azure data factory UI. 
8. You can edit or run any pipelines here.

:::image type="content" source="media/tutorial-bring-azure-data-factory-to-fabric/mounted-data-factory-ui.png" alt-text="Screenshot with the Azure data factory in fabric.":::

## Related content

[Azure Data Factory documentation](/azure/data-factory)
