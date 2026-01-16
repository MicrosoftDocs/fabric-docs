---
title: Create Reports
description: Learn about creating Power BI reports on Power BI semantic models in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade, pvenkat
ms.date: 07/15/2025
ms.topic: concept-article
ms.search.form: Reporting # This article's title should not change. If so, contact engineering.
---
# Create reports on semantic models in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] lets you create reusable Power BI semantic models to create reports in various ways in Power BI. This article describes the various ways you can use your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)], and Power BI semantic models, to create reports.

Reports that use a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)] can be created in [Power BI Desktop](/power-bi/fundamentals/desktop-getting-started). You can also use the **New report** feature of a [Power BI semantic model](semantic-models.md) to create a report within Microsoft Fabric.

For example, you can establish a live connection to a shared semantic model in the Power BI service and create many different reports from the same semantic model. You can create a data model in Power BI Desktop and publish to the Power BI service. Then, you and others can create multiple reports in separate .pbix files from that common data model and save them to different workspaces.

Advanced users can build reports from a warehouse using a composite model or using the SQL connection string.

> [!NOTE]
> [!INCLUDE [default-semantic-model-retirement](../includes/default-semantic-model-retirement.md)]

Microsoft has renamed the Power BI *dataset* content type to *Power BI semantic model* or just *semantic model*. This applies to Microsoft Fabric as well. For more information, see [New name for Power BI datasets](/power-bi/connect-data/service-datasets-rename). 

## Create reports using Power BI Desktop

You can build reports from semantic models with **Power BI Desktop** using a Live connection to a semantic model. For information on how to make the connection, see [connect to semantic models from Power BI Desktop](/power-bi/connect-data/desktop-report-lifecycle-datasets).  

For a tutorial with Power BI Desktop, see [Get started with Power BI Desktop](/power-bi/fundamentals/desktop-getting-started). For advanced situations where you want to add more data or change the storage mode, see [use composite models in Power BI Desktop](/power-bi/transform-model/desktop-composite-models).

If you're browsing for a specific [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#fabric-data-warehouse) in OneLake, you can use the **OneLake** in Power BI Desktop to make a connection and build reports:

1. Open Power BI Desktop and select **Warehouse** under the **OneLake** dropdown list in the ribbon.
1. Select the desired warehouse.
    - If you would like to create a live connection to the automatically defined data model, select **Connect**.
    - If you would like to connect directly to the data source and define your own data model, select the dropdown list arrow for the **Connect** button and select **Connect to SQL endpoint**.
1. For authentication, select **Organizational account**.
1. Authenticate using Microsoft Entra ID (formerly Azure Active Directory) multifactor authentication (MFA).
1. If you selected **Connect to SQL endpoint**, select the data items you want to include or not include in your semantic model.

Alternatively, if you have the SQL connection string of your [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](data-warehousing.md#fabric-data-warehouse) and would like more advanced options, such as writing a SQL statement to filter out specific data, connect to a warehouse in Power BI Desktop:

1. In the Fabric portal, right-click on the Warehouse or SQL analytics endpoint in your workspace and select **Copy SQL connection string**. Or, navigate to the Warehouse **Settings** in your workspace. Copy the SQL connection string.
1. Open Power BI Desktop and select **SQL Server** in the ribbon.
1. Paste the SQL connection string under **Server**.
1. In the **Navigator** dialog, select the databases and tables you would like to load.
1. If prompted for authentication, select **Organizational account**.
1. Authenticate using Microsoft Entra ID (formerly Azure Active Directory) multifactor authentication (MFA). For more information, see [Microsoft Entra authentication as an alternative to SQL authentication in Microsoft Fabric](entra-id-authentication.md).

## Related content

- [Model data in the semantic model in Microsoft Fabric](semantic-models.md)
- [Create reports in the Power BI service in Microsoft Fabric and Power BI Desktop](reports-power-bi-service.md)
