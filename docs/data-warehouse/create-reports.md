---
title: Create reports
description: Learn about reports in the warehouse experience.
author: salilkanade
ms.author: salilkanade
ms.reviewer: WilliamDAssafMSFT
ms.date: 04/12/2023
ms.topic: conceptual
---

# Create reports from data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] lets you create reusable and default Power BI datasets to create reports in various ways in Power BI. This article describes the various ways you can use your warehouses, and their default Power BI datasets, to create reports.

## Create reports from data sets

For example, you can establish a live connection to a shared dataset in the Power BI service and create many different reports from the same dataset. You can create a data model in Power BI Desktop and publish to the Power BI service. Then, you and others can create multiple reports in separate .pbix files from that common data model and save them to different workspaces.

Advanced users can build reports from a warehouse using a composite model or using the SQL Endpoint.

Reports that use the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] can be created with the Power BI service. For more information, see [Create reports in the Power BI service](reports-power-bi-service.md).

## Create reports from Power BI Desktop

You can use integrated Data hub experience in Power BI Desktop to select your [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) to make a connection and build reports.

   :::image type="content" source="media\create-reports\get-data-powerbi-desktop.png" alt-text="Screenshot of a get data from Power BI Desktop." lightbox="media\create-reports\get-data-powerbi-desktop.png":::

## Next steps

- [Power BI admin center](../admin/admin-power-bi.md)
- [Data modeling in the default Power BI dataset in Microsoft Fabric](model-default-power-bi-dataset.md)
- [Create reports in the Power BI service in Microsoft Fabric](reports-power-bi-service.md)