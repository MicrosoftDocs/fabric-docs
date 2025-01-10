---
title: Known issue - Create report doesn't work on Eventhouse monitoring KQL database
description: A known issue is posted where creating a report doesn't work on the Eventhouse monitoring KQL database.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/06/2025
ms.custom: known-issue-975
---

# Known issue - Create report doesn't work on Eventhouse monitoring KQL database

You can set up Eventhouse monitoring, which includes a KQL database. In the KQL database, you can select **Create Power BI report** to create a report. You receive an error, and no report is created. The issue occurs because the report creation requires an active query in the query pane.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

When you select **Create Power BI report**, you receive an error. The error message is similar to: `Something went wrong. Try opening the report again. If the problem continues, contact support and provide the details below.`

## Solutions and workarounds

To work around the issue, create a query in the query pane. Then retry the report creation using the **Create Power BI report** button.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
