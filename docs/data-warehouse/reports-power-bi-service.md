---
title: Create reports in the Power BI
description: Follow steps to create reports in the Power BI Desktop and Power BI service in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Reporting
---
# Create reports in the Power BI service in Microsoft Fabric and Power BI Desktop

**Applies to:** [!INCLUDE [fabric-se-and-dw-and-mirrored-db](includes/applies-to-version/fabric-se-and-dw-and-mirrored-db.md)]

This article describes three different scenarios you can follow to create reports in the Power BI service.

## Create a report from the warehouse editor

From within Synapse Data Warehouse in Microsoft Fabric, using the ribbon and the main home tab, navigate to the **New report** button. This option provides a native, quick way to create report built on top of the default Power BI semantic model.

:::image type="content" source="media/reports-power-bi-service/new-report-ribbon.png" alt-text="Screenshot of new report in the ribbon.":::

If no tables have been added to the default Power BI semantic model, the dialog first automatically adds tables, prompting the user to confirm or manually select the tables included in the canonical default semantic model first, ensuring there's always data first.

With a default semantic model that has tables, the **New report** opens a browser tab to the report editing canvas to a new report that is built on the semantic model. When you save your new report you're prompted to choose a workspace, provided you have write permissions for that workspace. If you don't have write permissions, or if you're a free user and the semantic model resides in a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace, the new report is saved in your **My workspace**.

## Use default Power BI semantic model within workspace

Using the default semantic model and action menu in the workspace: In the [!INCLUDE [product-name](../includes/product-name.md)] workspace, navigate to the default Power BI semantic model and select the **More** menu (**...**) to create a report in the Power BI service.

:::image type="content" source="media/reports-power-bi-service/create-report-ws.png" alt-text="Screenshot of new report in the workspace.":::

Select **Create report** to open the report editing canvas to a new report on the semantic model. When you save your new report, it's saved in the workspace that contains the semantic model as long as you have write permissions on that workspace. If you don't have write permissions, or if you're a free user and the semantic model resides in a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace, the new report is saved in your **My workspace**.

## Use Data hub

Use the default Power BI semantic model and semantic model details page in the **Data hub**. In the workspace list, select the default semantic model's name to get to the **Semantic model** details page, where you can find details about the semantic model and see related reports. You can also create a report directly from this page. To learn more about creating a report in this fashion, see [Dataset details](/power-bi/connect-data/service-dataset-details-page).

In the **Data hub**, you see warehouse and their associated default semantic models. Select the warehouse to navigate to the warehouse details page. You can see the warehouse metadata, supported actions, lineage and impact analysis, along with related reports created from that warehouse. Default semantic models derived from a warehouse behave the same as any semantic model.

To find the warehouse, you begin with the **Data hub**. The following image shows the **Data hub** in the Power BI service:

1. Select a warehouse to view its warehouse details page.

1. Select the **More** menu (**...**) to display the options menu.

1. Select **Open** to open the warehouse.

   :::image type="content" source="media/reports-power-bi-service/data-hub-power-bi-service.png" alt-text="Screenshot of the Power BI Data hub." lightbox="media/reports-power-bi-service/data-hub-power-bi-service.png":::

## Create reports in the Power BI Desktop

The Data hub integration in Power BI Desktop lets you connect to the Warehouse or SQL analytics endpoint of Lakehouse in easy steps.

1. Use **Data hub** menu in the ribbon to get list of all items.
1. Select the warehouse that you would like to connect
1. On the **Connect** button, select the dropdown, and select **Connect to SQL endpoint**.

   :::image type="content" source="media/reports-power-bi-service/data-hub-pbi-desktop.png" alt-text="Screenshot of the Data hub in Power BI Desktop." lightbox="media/reports-power-bi-service/data-hub-pbi-desktop.png":::

## Related content

- [Connectivity](connectivity.md)
- [Create reports](create-reports.md)
- [Tutorial: Get started creating in the Power BI service](/power-bi/fundamentals/service-get-started)
