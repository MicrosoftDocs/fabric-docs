---
title: "Create simple reports on your SQL database in Power BI"
description: Learn how to create simple reports on your SQL database in Power BI
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 11/01/2024
ms.topic: how-to
ms.custom:
  - ignite-2024
---
# Create simple reports on your SQL database in Power BI

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

It's easy to quickly create reports with SQL database in Fabric. In this walkthrough, we walk through the steps to define a semantic model and build a report.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Make sure that you [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database with the AdventureWorks sample data](load-adventureworks-sample-data.md).

## Build a new report

1. Once the sample data is loaded, switch over to the SQL analytics endpoint via the dropdown menu in the Query editor.
1. Select the **Reporting** menu from the ribbon, then **New Report**.
1. Choose **Continue** to create a new report with all available data.
1. Once Power BI opens:
    - Create a new report by dragging data into the report.
    - There's also the option to use Copilot. That is what we use for this tutorial. Select the **Copilot** button in the toolbar.
1. Copilot presents some reporting suggestions. Select **Suggest content for a new report page**.
1. Review the selections by expanding their cards. Select **Create** on any and all suggestions that look interesting. A new tab is created at the bottom for each.
1. You now have a Power BI report of your SQL database data. Review the reports for accuracy and make any desired modifications.

## Next step

> [!div class="nextstepaction"]
> [Share data and manage access to your SQL database in Microsoft Fabric](share-data.md)

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
