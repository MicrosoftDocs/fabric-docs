---
title: Known issue - Currency format is unavailable in web modeling
description: A known issue is posted where the currency format is unavailable in web modeling.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/30/2024
ms.custom: known-issue-665
---

# Known issue - Currency format is unavailable in web modeling

When working in the Power BI service, you can edit your semantic models. Within the **Edit tables** screen, you can change the **Format** property for a columns and measure. If you change the column's or measure's **Format** value to **Currency**, the value doesn't show in the currency format. You also might not be able to interact with the column or measure anymore. The change was applied on the model even though you can't see it reflected in the **Edit tables** screen.

**Status:** Fixed: April 25, 2024

**Product Experience:** Power BI

## Symptoms

You can't change your column's or measure's **Format** value to **Currency**. The Currency option might not show up under the **Format** property pane or the top ribbon.

## Solutions and workarounds

If you're working within Power BI, you can work around this issue by making the change in Power BI Desktop. You can download the .pbix file, make the change in Power BI Desktop, and then upload the .pbix file back to the service. If you're working in a data warehouse, lakehouse, or datamart, you can work around this issue by using the XMLA endpoint to make the change.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
