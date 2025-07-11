---
title: Create Power BI Reports From Cosmos DB Data
titleSuffix: Microsoft Fabric
description: Learn to create Power BI reports from Cosmos DB data in Microsoft Fabric.
author: jilmal
ms.author: jmaldonado
ms.topic: how-to
ms.date: 07/11/2025
ai-usage: ai-generated
---

# Create Power BI reports from your Cosmos DB data

With Cosmos DB in Microsoft Fabric, you can easily build interactive Power BI reports on top of your NoSQL data. This guide shows you how to configure your semantic model and build a report directly in Power BI either from the browser or Power BI Desktop.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

## Open the SQL analytics endpoint for the database

Start by accessing the SQL analytics endpoint for the Cosmos DB in Fabric database to ensure that mirroring ran successfully at least once.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

    > [!IMPORTANT]
    > For this guide, the existing Cosmos DB database has the [sample data set](sample-data.md) already loaded. The remaining query examples in this guide assume that you're using the same data set for this database.

1. In the menu bar, select the **Cosmos DB** list and then select **SQL Endpoint**.

    :::image source="media/how-to-access-data-lakehouse/endpoint-selection.png" lightbox="media/how-to-access-data-lakehouse/endpoint-selection.png" alt-text="Screenshot of the endpoint selection option in the menu bar for a database in Cosmos DB in Fabric.":::

1. Once you're able to successfully navigate to the SQL analytics endpoint, this navigation step confirms that mirroring ran successfully at least once.

## Configure your semantic model

Before you can build a report, you must configure the default semantic model for your Cosmos DB artifact.

1. Once, you have landed in the SQL analytics endpoint, go to the **Reporting** tab in the ribbon and select **Manage default semantic model**.

2. Select the desired tables you want to expose in your report, then save your selection.

> [!NOTE]
> By default, semantic models are empty. If you skip this step, attempts to create a report will result in an error.

## Build a report

Once your semantic model is configured, you can create a Power BI report in a few ways:

**Option 1: From the SQL analytics endpoint**

1. In the SQL analytics endpoint, select the **Reporting** tab and choose **New Report**.
2. Click **Continue** to open Power BI with your selected tables.

**Option 2: From the Create tab in Fabric**

1. Navigate to the **Create** tab in Microsoft Fabric.
2. Select **Pick a published semantic model** and choose your Cosmos DB semantic model as the data source.

**Option 3: From Power BI desktop**

1. Select **OneLake catalog**.
2. Find and select the Cosmos DB semantic model you configured.

## Design your report

Once Power BI opens, you can:
 - Drag and drop fields from the **Data** pane to build visuals.
 - Use Copilot to generate visuals automatically:
   - Click the **Copilot** button in the toolbar.
   - Choose **Suggest content** for a new report page.
   - Review the suggestions and click **Create** to add them to your report. 

You now have a Power BI report connected to your Cosmos DB data in Fabric. Customize the visuals, apply filters, and explore your data to gain insights all within the Fabric ecosystem.

## Related content

* [Access data from Lakehouse](how-to-access-data-lakehouse.md)
