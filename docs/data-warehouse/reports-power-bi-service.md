---
title: Create reports in the Power BI service
description: Follow steps to create reports in the Power BI service.
ms.reviewer: wiassaf
ms.author: salilkanade
author: salilkanade
ms.topic: how-to
ms.date: 03/15/2023
---

# Create reports in the Power BI service

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article describes three different scenarios you can follow to create reports in the Power BI service.

## Scenario one

From within the warehouse experience, using the ribbon and the main home tab, navigate to the **New report** button. This option provides a native, quick way to create report built on top of the default Power BI dataset.

If no tables have been added to the default Power BI dataset, the dialog first automatically adds tables, prompting the user to confirm or manually select the tables included in the canonical default dataset first, ensuring there's always data first.

With a default dataset that has tables, the **New report** opens a browser tab to the report editing canvas to a new report that is built on the dataset. When you save your new report you're prompted to choose a workspace, provided you have write permissions for that workspace. If you don't have write permissions, or if you're a free user and the dataset resides in a Premium-capacity workspace, the new report is saved in your **My workspace**.

## Scenario two

Using the default dataset and action menu in the workspace: In the [!INCLUDE [product-name](../includes/product-name.md)] workspace, navigate to the default Power BI dataset and select the **More** menu (**…**) to create a report in the Power BI service.

Selecting the **More** menu opens the report editing canvas to a new report that is built on the dataset. When you save your new report, it's saved in the workspace that contains the dataset as long as you have write permissions on that workspace. If you don't have write permissions, or if you're a free user and the dataset resides in a Premium-capacity workspace, the new report is saved in your **My workspace**.

## Scenario three

Using the default Power BI dataset and dataset details page. In the Power BI workspace list, select the default dataset's name to get to the Dataset details page, where you can find details about the dataset and see related reports. You can also create a report directly from this page. To learn more about creating a report in this fashion, see [Dataset details](/power-bi/connect-data/service-dataset-details-page).

In the **Data hub**, you see warehouse and their associated default datasets. Select the warehouse to navigate to the warehouse details page, where you can see the warehouse metadata, supported actions, lineage and impact analysis, along with related reports created from that warehouse. Default datasets derived from warehouse behave the same as any dataset.

To find the warehouse, you begin with the **Data hub**. The following image shows the **Data hub** in the Power BI service:

1. Select a warehouse to view its warehouse details page

1. Select the **More** menu (**...**) to display the options menu

1. Select **Open** to open the warehouse.

   :::image type="content" source="media\reports-power-bi-service\data-hub-power-bi-service.png" alt-text="Screenshot of the Power BI Data hub." lightbox="media\reports-power-bi-service\data-hub-power-bi-service.png":::

## Next steps

- [Connectivity](connectivity.md)
- [Create reports](create-reports.md)
- [Power BI admin center](../admin/admin-power-bi.md)