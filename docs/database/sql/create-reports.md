---
title: "Create Reports on Your SQL Database in Power BI"
description: Learn how to create reports on your SQL database in Power BI.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sukkaur, zoedouglas
ms.date: 08/01/2025
ms.topic: how-to
ms.search.form: Create Power BI reports using SQL database
---
# Create simple reports on your SQL database in Power BI

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

It's easy to quickly create reports with SQL database in Fabric. In this walkthrough, we walk through the steps to define a semantic model and build a report with Power BI in the browser or Power BI Desktop.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database with the AdventureWorks sample data](load-adventureworks-sample-data.md).

## Build a new report in Power BI

Once the sample data is loaded, switch to the SQL analytics endpoint via the dropdown list in the toolbar.

1. Select the **Reporting** menu from the ribbon, then **New semantic model**.
1. Pick the tables you want to include. You can change the tables picked later.
1. Select **Confirm** once you name your Power BI semantic model. 

> [!NOTE]
> This semantic model adds tables in Direct Lake on SQL storage mode. Learn more about Direct Lake at [aka.ms/DirectLake](https://aka.ms/DirectLake). Consider using Power BI Desktop instead to use Direct Lake on OneLake storage mode.

Once Power BI opens, your semantic model is ready to develop. Rename tables and columns to report friendly names, add calculations, and create relationships between the tables. To learn more about Power BI semantic modeling, see [Transform, shape, and model data in Power BI](/power-bi/transform-model/).

When ready, create a report to visualize this data. 

1. Select the **File** menu from the ribbon, then **Create a blank report**.
1. A new window opens with a blank report, and you can get started!
1. You can navigate back to the semantic model to make changes if needed while you develop the report.

## Build a new report in Power BI Desktop (preview)

You can also connect to your SQL database in Microsoft Fabric directly from [Power BI Desktop](/power-bi/create-reports/service-the-report-editor-take-a-tour). This feature is in preview.

First, in Power BI Desktop, verify the preview feature is enabled.

1. Select **File** -> **Options and Settings** -> **Options**. Under **GLOBAL**, select **Preview features**.
1. Verify that **Connect to Fabric SQL Databases** option is checked.
1. To use Direct Lake storage mode, also verify that **Create semantic models in Direct Lake storage mode from one or more Fabric artifacts** option is checked. To learn more about this preview feature, see [Direct Lake in Power BI Desktop (preview)](../../fundamentals/direct-lake-power-bi-desktop.md).

You can use your SQL database data in [Direct Lake, Import, or DirectQuery storage mode](/power-bi/transform-model/desktop-storage-mode#use-the-storage-mode-property) depending on how you connect to your SQL database from Power BI Desktop.

- Connect from the **OneLake Catalog**:

    1. In the **Home** tab, select the **OneLake catalog** drop-down. Select **SQL database**.
    1. Select your SQL database. Select **Connect**.
    1. Choose the tables and give your Power BI semantic model a name and workspace to be created in, then select **OK**.
    1. You're now live editing the Power BI semantic model with the tables in Direct Lake on OneLake storage mode. For more information on live editing and Direct Lake, see [Direct Lake in Power BI Desktop (preview)](../../fundamentals/direct-lake-power-bi-desktop.md).
    1. Optionally, you can return to the OneLake catalog and include tables from other Fabric items, such as lakehouses, warehouses, and other SQL databases.

- Connect from **Get data**:

    1. In the **Home** tab, select **Get data**. Select **More...**. 
    1. In the **Get Data** window, select **Microsoft Fabric**. 
    1. Select **SQL database**. Select **Connect**.
    1. Select your SQL database. Select **Connect**. Authenticate to your Fabric workspace.
    1. In **Navigator** page, select the desired tables in your SQL database. Select **Load**. 
    1. Choose **Import** or **DirectQuery**. For more information on this option, see [Use DirectQuery](/power-bi/connect-data/desktop-use-directquery).

Once Power BI opens, your semantic model is ready to develop. Rename tables and columns to report friendly names, add calculations, and create relationships between the tables. Learn more about Power BI data modeling, see [Transform, shape, and model data in Power BI](/power-bi/transform-model/).

When ready, you can create a report to visualize this data. 

For the semantic model with Direct Lake tables, follow these steps:

1. Select **File**, then **Blank report**.
1. In the **Home** tab, select the **OneLake catalog** dropdown list. Select **Power BI semantic models**.
1. Select your Power BI semantic model. Select **Connect**. 
1. Navigate to the **Report view**.
1. Create your report.
1. When ready, select **Publish** to see it online and share it with others.

To learn more about creating reports and setting them up for report consumers with Direct Lake tables, see [Building reports](../../fundamentals/building-reports.md). 

These steps to live connect to a Power BI semantic model can also be used for semantic models with import or DirectQuery tables, after the semantic model is published.

For the semantic model with import or DirectQuery tables, follow these steps:

1. Navigate to the **Report view**.
1. Create your report.
1. When ready, select **Publish** to see the report in the Fabric portal and share it with others.

<a id="developing-the-power-bi-report"></a>

## Develop the Power BI report

Developing the report is easy. Drag and drop columns from the Data pane into the report. Or, there's also the option to use [Copilot to create report pages](/power-bi/create-reports/copilot-create-report-service) for you. To learn more about the rich features available Power BI reports, see creating [Power BI reports](/power-bi/create-reports/).

You now have a Power BI report of your SQL database data. Review the reports for accuracy and make any desired modifications.


## Next step

> [!div class="nextstepaction"]
> [Share data and manage access to your SQL database in Microsoft Fabric](share-data.md)

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
