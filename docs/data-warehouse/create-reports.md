---
title: Create reports
description: Learn about reports in the warehouse experience.
author: salilkanade
ms.author: salilkanade
ms.reviewer: WilliamDAssafMSFT
ms.date: 05/23/2023
ms.topic: conceptual
---

# Create reports on data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] lets you create reusable and default Power BI datasets to create reports in various ways in Power BI. This article describes the various ways you can use your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], and their default Power BI datasets, to create reports.

For example, you can establish a live connection to a shared dataset in the Power BI service and create many different reports from the same dataset. You can create a data model in Power BI Desktop and publish to the Power BI service. Then, you and others can create multiple reports in separate .pbix files from that common data model and save them to different workspaces.

Advanced users can build reports from a warehouse using a composite model or using the SQL connection string.

Reports that use the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] can be created in either of the following two tools:

- [Power BI service](reports-power-bi-service.md)
- [Power BI Desktop](/power-bi/fundamentals/desktop-getting-started)

## Create reports using the Power BI service

Within the warehouse experience, using the ribbon and the main home tab, navigate to the **New report** button. This option provides a native, quick way to create report built on top of the default Power BI dataset.

:::image type="content" source="media\reports-power-bi-service\new-report-ribbon.png" alt-text="Screenshot of new report in the ribbon." lightbox="media\reports-power-bi-service\new-report-ribbon.png":::

If no tables have been added to the default Power BI dataset, the dialog first automatically adds tables, prompting the user to confirm or manually select the tables included in the canonical default dataset first, ensuring there's always data first.

With a default dataset that has tables, the **New report** opens a browser tab to the report editing canvas to a new report that is built on the dataset. When you save your new report you're prompted to choose a workspace, provided you have write permissions for that workspace. If you don't have write permissions, or if you're a free user and the dataset resides in a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace, the new report is saved in your **My workspace**.

For more information on how to create reports using the Power BI service, see [Create reports in the Power BI service](reports-power-bi-service.md).

## Create reports using Power BI Desktop

You can build reports from datasets with **Power BI Desktop** using a Live connection to the default dataset. For information on how to make the connection, see [connect to datasets from Power BI Desktop](/power-bi/connect-data/desktop-report-lifecycle-datasets).  

For a tutorial with Power BI Desktop, see [Get started with Power BI Desktop](/power-bi/fundamentals/desktop-getting-started). For advanced situations where you want to add more data or change the storage mode, see [use composite models in Power BI Desktop](/power-bi/transform-model/desktop-composite-models).

Complete the following steps to connect to a warehouse in Power BI Desktop:

1. Navigate to the warehouse settings in your workspace and copy the SQL connection string. Or, right-click on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] in your workspace and select **Copy SQL connection string**.
2. Select the **Warehouse (preview) connector** from the **Get data** or connect to the default dataset from **Data hub**. 
3. Paste the SQL connection string into the connector dialog. 
4. For authentication, select *organizational account*.
5. Authenticate using Azure Active Directory - MFA.
6. Select **Connect**.
7. Select the data items you want to include or not include in your dataset.

## Next steps

- [Data modeling in the default Power BI dataset in Microsoft Fabric](model-default-power-bi-dataset.md)
- [Create reports in the Power BI service in Microsoft Fabric](reports-power-bi-service.md)
