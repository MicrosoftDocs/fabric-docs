---
title: "Create reports on your SQL database in Power BI"
description: Learn how to create simple reports on your SQL database in Power BI.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy, sukkaur
ms.date: 04/24/2025
ms.topic: how-to
ms.search.form: Create Power BI reports using SQL database
---
# Create simple reports on your SQL database in Power BI

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

It's easy to quickly create reports with SQL database in Fabric. In this walkthrough, we walk through the steps to define a semantic model and build a report with Power BI in the browser or Power BI Desktop.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Make sure that you [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database with the AdventureWorks sample data](load-adventureworks-sample-data.md).

## Build a new report in Power BI

Once the sample data is loaded, switch over to the SQL analytics endpoint via the dropdown menu in the Query editor.

1. Select the **Reporting** menu from the ribbon, then **New Report**.
1. Choose **Continue** to create a new report with all available data.

Once Power BI opens, your report is ready to develop. Drag and drop columns from the **Data** pane into the report. Or, there's also the option to use Copilot:
    
1. Select the **Copilot** button in the toolbar.
1. Copilot presents some reporting suggestions. Select **Suggest content for a new report page**.
1. Review the selections by expanding their cards. Select **Create** on any and all suggestions that look interesting. A new tab is created at the bottom for each.
1. You now have a Power BI report of your SQL database data. Review the reports for accuracy and make any desired modifications.
    
## Build a new report in Power BI Desktop (preview)

You can also connect to your SQL database in Microsoft Fabric directly from [Power BI Desktop](/power-bi/create-reports/service-the-report-editor-take-a-tour). This is currently a preview feature.

First, in Power BI Desktop, verify the preview feature is enabled.

1. Select **File** -> **Options and Settings** -> **Options**. Under **GLOBAL**, select **Preview features**.
1. Verify that **Connect to Fabric SQL Databases** option is checked.

There are 2 ways to connect to your SQL database from Power BI Desktop. 

- Connect from the **OneLake Catalog**:

    1. In the **Home** tab, select the **OneLake catalog** drop-down. Select **SQL database**.
    1. Select your SQL database. Select **Connect**. You'll authenticate to your Fabric workspace.
    1. In **Navigator** page, select the desired tables in your SQL database. Select **Load**. 
    1. Choose **Import** or **DirectQuery**. For more information on this option, see [Use DirectQuery](/power-bi/connect-data/desktop-use-directquery).
    
- Connect from **Get data**:

    1. In the **Home** tab, select **Get data**. Select **More...**. 
    1. In the **Get Data** window, select **Microsoft Fabric**. 
    1. Select **SQL database**. Select **Connect**.
    1. Select your SQL database. Select **Connect**. You'll authenticate to your Fabric workspace.
    1. In **Navigator** page, select the desired tables in your SQL database. Select **Load**. 
    1. Choose **Import** or **DirectQuery**. For more information on this option, see [Use DirectQuery](/power-bi/connect-data/desktop-use-directquery).
    
Your report is now ready to develop. Drag and drop columns from the **Data** pane into the report. Or, there's also the option to use Copilot. 

1. Select the **Copilot** button in the toolbar.
1. Copilot presents some reporting suggestions. Select **Suggest content for a new report page**.
1. Review the selections by expanding their cards. Select **Create** on any and all suggestions that look interesting. A new tab is created at the bottom for each.
1. You now have a Power BI report of your SQL database data. Review the reports for accuracy and make any desired modifications.

## Next step

> [!div class="nextstepaction"]
> [Share data and manage access to your SQL database in Microsoft Fabric](share-data.md)

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
