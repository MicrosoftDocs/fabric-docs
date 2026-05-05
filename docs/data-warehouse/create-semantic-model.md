---
title: Create a Power BI Semantic Model
description: Learn how to create a Power BI semantic model in Microsoft Fabric.
ms.reviewer: chweb, salilkanade, pvenkat
ms.date: 12/05/2025
ms.topic: how-to
---
# Create a Power BI semantic model

**Applies to:** [!INCLUDE [fabric-se-dw-mirroreddb](includes/applies-to-version/fabric-se-dw-mirroreddb.md)]

You can create new Power BI semantic models based on lakehouse, [!INCLUDE [fabric-se](includes/fabric-se.md)], or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] items in Microsoft Fabric.

> [!NOTE]
> [!INCLUDE [default-semantic-model-retirement](../includes/default-semantic-model-retirement.md)]

## Create a new Power BI semantic model in Direct Lake mode

These **new Power BI semantic models** can be edited in the workspace using [Open data model](/power-bi/transform-model/service-edit-data-models) and can be used with other features such as write DAX queries and semantic model row-level security. For more about semantic models and Direct Lake mode, see [Power BI semantic models in Microsoft Fabric](semantic-models.md#direct-lake-mode).

To create a Power BI semantic model using Direct Lake mode, follow these steps:

1. In the **Fabric portal**, create a new semantic model based on the desired item:
   - Open the lakehouse and select **New Power BI semantic model** from the ribbon.
   - Alternatively, open the relevant item, such as your warehouse or SQL analytics endpoint, select **New semantic model**. 
1. Enter a name for the new semantic model, select a workspace to save it in, and pick the tables to include. Then select **Confirm**.
1. The new Power BI semantic model can be [edited in the workspace](/power-bi/transform-model/service-edit-data-models), where you can add relationships, measures, rename tables and columns, choose how values are displayed in report visuals, and much more. If the model view doesn't show after creation, check the pop-up blocker of your browser.
1. To edit the Power BI semantic model later, select **Open data model** from the semantic model context menu or item details page to edit the semantic model further.

Power BI reports can be created in the workspace by selecting **New report** from web modeling, or in Power BI Desktop by live connecting to this new semantic model. To learn more on how to [connect to semantic models in the Power BI service from Power BI Desktop](/power-bi/connect-data/desktop-report-lifecycle-datasets)

## Create a new Power BI semantic model in import or DirectQuery storage mode

Having your data in Microsoft Fabric means you can create Power BI semantic models in any storage mode: Direct Lake, import, or DirectQuery. You can create more Power BI semantic models in import or DirectQuery mode using [!INCLUDE [fabric-se](includes/fabric-se.md)] or [!INCLUDE [fabric-dw](includes/fabric-dw.md)] data.

To create a Power BI semantic model in import or DirectQuery mode, follow these steps:

1. Open [Power BI Desktop](/power-bi/fundamentals/desktop-getting-started), sign in, and select **OneLake**. 
1. Choose the SQL analytics endpoint of the lakehouse or warehouse.
1. Select the **Connect** button dropdown list and choose **Connect to SQL endpoint**.
1. Select import or DirectQuery storage mode and the tables to add to the semantic model.

From there, you can create the Power BI semantic model and report to publish to the workspace when ready. 

## Create a new, blank Power BI semantic model

The **New Power BI semantic model** button creates a new blank semantic model.

<a id="scripting-the-default-power-bi-semantic-model"></a>
<a id="script-the-default-power-bi-semantic-model"></a>

## Script a Power BI semantic model

You can script out a Power BI semantic model from the XMLA endpoint with [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms). 

View the Tabular Model Scripting Language (TMSL) schema of the semantic model by scripting it out via the Object Explorer in SSMS. To connect, use the semantic model's connection string, which looks like `powerbi://api.powerbi.com/v1.0/myorg/username`. You can find the connection string for your semantic model in the **Settings**, under **Server settings**. From there, you can generate an XMLA script of the semantic model via SSMS's **Script** context menu action. For more information, see [Dataset connectivity with the XMLA endpoint](/power-bi/enterprise/service-premium-connect-tools#connect-with-ssms).

Scripting requires Power BI write permissions on the Power BI semantic model. With read permissions, you can see the data but not the schema of the semantic model.

## Next step

> [!div class="nextstepaction"]
> [Manage a Power BI semantic model](manage-semantic-model.md)

## Related content

- [Semantic models in the Power BI service](/power-bi/connect-data/service-datasets-understand)
