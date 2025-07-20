---
title: Known issue - Multiple dataflow staging items created in workspace
description: A known issue is posted where multiple dataflow staging items are created in workspace.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/09/2025
ms.custom: known-issue-1134
---

# Known issue - Multiple dataflow staging items created in workspace

After creating some Dataflow Gen2 CI/CD items in a workspace, you might experience an issue in which multiple staging items with name similar to "StagingWarehouseForDataflows_YYYYMMDDHHH..." are generated in the workspace. These items aren't visible in the user interface. You can access and see these items using the workspace SQL analytics endpoint in SQL Server Management Studio, or using the lakehouse connector and data warehouse connector.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You have multiple staging items with name similar to "StagingWarehouseForDataflows_YYYYMMDDHHH..." in your workspace. You can't see them in the user interface, but can see them using other tools.

## Solutions and workarounds

You can safely ignore these staging items. To prevent any consequential problems with dataflow refreshes, don't delete or tamper with any of these staging items to prevent any consequential problems with dataflow refreshes.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
