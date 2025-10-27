---
title: Create Power BI Reports Using Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Create reports and a semantic model within Power BI using data from your Cosmos DB database in Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/22/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Create Power BI reports using Cosmos DB in Microsoft Fabric (preview)

With Cosmos DB in Microsoft Fabric, you can build interactive Power BI reports using your NoSQL data. In this guide, you build a report directly in Power BI using a semantic model you configured in Power BI.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

## Open the SQL analytics endpoint for the database

Start by accessing the SQL analytics endpoint for the Cosmos DB in Fabric database to ensure that mirroring ran successfully at least once.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

    > [!IMPORTANT]
    > For this guide, the existing Cosmos DB database has the [sample data set](sample-data.md) already loaded. The remaining query examples in this guide assume that you're using the same data set for this database.

1. In the menu bar, select the **Cosmos DB** list and then select **SQL Endpoint** to switch to the SQL analytics endpoint.

    :::image type="content" source="media/how-to-create-reports/endpoint-selection.png" lightbox="media/how-to-create-reports/endpoint-selection.png" alt-text="Screenshot of the endpoint selection option in the menu bar for a database in Cosmos DB in Fabric.":::

1. Once you're able to successfully navigate to the SQL analytics endpoint, this navigation step confirms that mirroring ran successfully at least once.

## Configure your semantic model

Before you can build a report, you must configure a new semantic model for your Cosmos DB item.

1. In the menu bar, select the **Cosmos DB** list and then select **SQL analytics endpoint** to switch to the SQL analytics endpoint.
1. Select the **Reporting** tab. 
1. In the ribbon, select **New semantic model**.
1. Select the desired tables you want to expose in your report.
1. **Save** your selection.

> [!NOTE]
> By default, semantic models are empty. If you skip this step, any attempt to create a Power BI report results in an error due to an empty semantic model.

## Build a report

Once your semantic model is configured, you can create a Power BI report in a few ways:

**Option 1: From the SQL analytics endpoint**

1. In the SQL analytics endpoint, select the **Reporting** tab.

1. Select **New Report**.

1. Select **Continue** to open Power BI with the tables previously configured in your semantic model.

> [!TIP]
> Alternatively, you can create the Power BI report using one of two techniques:
>
> 1. Create tab in the Fabric portal:
> 
>     1. Navigate to the **Create** tab in Microsoft Fabric.
> 
>     1. Select **Pick a published semantic model**.
> 
>     1. Find and select the Cosmos DB semantic model you previously configured.
> 
> 1. Power BI desktop:
> 
>     1. Select **OneLake catalog**.
> 
>     1. Find and select the Cosmos DB semantic model you previously configured.
>

## Design your report

Using the Power BI editor, you can design a report to your specifications.

1. In the Power BI editor, drag fields from the **Data** pane to the report surface.

1. Select the **Copilot** option in the menu.

1. Select **Suggest content** for a new report page.

1. Review and observe the Copilot-generated suggestions.

1. Select **Create** to add them to your report.

> [!TIP]
> With this new Power BI report connected to Cosmos DB data in Fabric, you can try these following actions to gain insights within the Fabric ecosystem:
>
> - Customize the visuals
> - Apply filters
> - Explore your data using new visualizations
>

## Related content

* [Access data from Lakehouse](how-to-access-data-lakehouse.md)
