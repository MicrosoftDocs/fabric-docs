---
title: Create Reports in Power BI
description: Follow steps to create reports in the Power BI Desktop and Power BI service in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanadey
ms.date: 07/15/2025
ms.topic: how-to
ms.search.form: Reporting
---
# Create reports in the Power BI service in Microsoft Fabric and Power BI Desktop

**Applies to:** [!INCLUDE [fabric-se-dw-mirroreddb](includes/applies-to-version/fabric-se-dw-mirroreddb.md)]

This article describes different scenarios you can follow to create reports in Power BI on your Fabric warehouse.

<a id="use-data-hub"></a>

## Use the OneLake catalog

In the workspace list, select the semantic model's name to get to the **Semantic model** details page, where you can find details about the semantic model and see related reports. You can also create a report directly from this page. To learn more about creating a report in this fashion, see [Dataset details](/power-bi/connect-data/service-dataset-details-page).

In the **OneLake catalog**, you see warehouse and their associated semantic models. [!INCLUDE [default-semantic-model-retirement](../includes/default-semantic-model-retirement.md)]

Select the warehouse to navigate to the warehouse details page. You can see the warehouse metadata, supported actions, lineage and impact analysis, along with related reports created from that warehouse.

To find the warehouse, you begin with the **OneLake catalog**. The following image shows the **OneLake catalog** in the Power BI service:

1. Select a warehouse to view its warehouse details page.

1. Select the **More** menu (**...**) to display the options menu.

1. Select **Open** to open the warehouse.

## Create reports in the Power BI Desktop

The OneLake catalog integration in Power BI Desktop lets you connect to the Warehouse or SQL analytics endpoint of Lakehouse in easy steps.

1. Use **Data hub** menu in the ribbon to get list of all items.
1. Select the warehouse that you would like to connect
1. On the **Connect** button, select the dropdown list, and select **Connect to SQL endpoint**.

   :::image type="content" source="media/reports-power-bi-service/data-hub-pbi-desktop.png" alt-text="Screenshot of the Data hub in Power BI Desktop." lightbox="media/reports-power-bi-service/data-hub-pbi-desktop.png":::

## Related content

- [Warehouse connectivity in Microsoft Fabric](connectivity.md)
- [Create reports on data warehousing in Microsoft Fabric](create-reports.md)
- [Tutorial: Get started creating in the Power BI service](/power-bi/fundamentals/service-get-started)
