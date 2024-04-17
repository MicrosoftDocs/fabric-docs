---
title: Create reports
description: Learn about reports in Synapse Data Warehouse in Microsoft Fabric.
author: salilkanade
ms.author: salilkanade
ms.reviewer: WilliamDAssafMSFT
ms.date: 02/24/2024
ms.topic: conceptual
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.search.form: Reporting # This article's title should not change. If so, contact engineering.
---
# Create reports on data warehousing in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] lets you create reusable and default Power BI semantic models to create reports in various ways in Power BI. This article describes the various ways you can use your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], and their default Power BI semantic models, to create reports.

For example, you can establish a live connection to a shared semantic model in the Power BI service and create many different reports from the same semantic model. You can create a data model in Power BI Desktop and publish to the Power BI service. Then, you and others can create multiple reports in separate .pbix files from that common data model and save them to different workspaces.

Advanced users can build reports from a warehouse using a composite model or using the SQL connection string.

Reports that use the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] can be created in either of the following two tools:

- [Power BI service](reports-power-bi-service.md)
- [Power BI Desktop](/power-bi/fundamentals/desktop-getting-started)

> [!NOTE]
> Microsoft has renamed the Power BI *dataset* content type to *semantic model*. This applies to Microsoft Fabric as well. For more information, see New name for Power BI datasets.

## Create reports using the Power BI service

Within **Data Warehouse**, using the ribbon and the main home tab, navigate to the **New report** button. This option provides a native, quick way to create report built on top of the default Power BI semantic model.

:::image type="content" source="media/create-reports/new-report-ribbon.png" alt-text="Screenshot of new report in the ribbon." lightbox="media/create-reports/new-report-ribbon.png":::

If no tables have been added to the default Power BI semantic model, the dialog first automatically adds tables, prompting the user to confirm or manually select the tables included in the canonical default semantic model first, ensuring there's always data first.

With a default semantic model that has tables, the **New report** opens a browser tab to the report editing canvas to a new report that is built on the semantic model. When you save your new report you're prompted to choose a workspace, provided you have write permissions for that workspace. If you don't have write permissions, or if you're a free user and the semantic model resides in a [Premium capacity](/power-bi/enterprise/service-premium-what-is) workspace, the new report is saved in your **My workspace**.

For more information on how to create reports using the Power BI service, see [Create reports in the Power BI service](reports-power-bi-service.md).

## Create reports using Power BI Desktop

You can build reports from semantic models with **Power BI Desktop** using a Live connection to the default semantic model. For information on how to make the connection, see [connect to semantic models from Power BI Desktop](/power-bi/connect-data/desktop-report-lifecycle-datasets).  

For a tutorial with Power BI Desktop, see [Get started with Power BI Desktop](/power-bi/fundamentals/desktop-getting-started). For advanced situations where you want to add more data or change the storage mode, see [use composite models in Power BI Desktop](/power-bi/transform-model/desktop-composite-models).

If you're browsing for a specific [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#synapse-data-warehouse) in OneLake, you can use the integrated **OneLake data hub** in Power BI Desktop to make a connection and build reports:

1. Open Power BI Desktop and select **Warehouse** under the **OneLake data hub** dropdown list in the ribbon.
1. Select the desired warehouse.
    - If you would like to create a live connection to the automatically defined data model, select **Connect**.
    - If you would like to connect directly to the data source and define your own data model, select the dropdown list arrow for the **Connect** button and select **Connect to SQL endpoint**.
1. For authentication, select **Organizational account**.
1. Authenticate using Microsoft Entra ID (formerly Azure Active Directory) multifactor authentication (MFA).
1. If you selected **Connect to SQL endpoint**, select the data items you want to include or not include in your semantic model.

Alternatively, if you have the SQL connection string of your [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#synapse-data-warehouse) and would like more advanced options, such as writing a SQL statement to filter out specific data, connect to a warehouse in Power BI Desktop:

1. In the Fabric portal, right-click on the Warehouse or SQL analytics endpoint in your workspace and select **Copy SQL connection string**. Or, navigate to the Warehouse **Settings** in your workspace. Copy the SQL connection string.
1. Open Power BI Desktop and select **SQL Server** in the ribbon.
1. Paste the SQL connection string under **Server**.
1. In the **Navigator** dialog, select the databases and tables you would like to load.
1. If prompted for authentication, select **Organizational account**.
1. Authenticate using Microsoft Entra ID (formerly Azure Active Directory) multifactor authentication (MFA).

## Related content

- [Model data in the default Power BI semantic model in Microsoft Fabric](default-power-bi-semantic-model.md)
- [Create reports in the Power BI service in Microsoft Fabric and Power BI Desktop](reports-power-bi-service.md)
