---
title: Known issue - Azure Analysis Services Pricing Tier scaling table doesn't show data
description: A known issue is posted where the Azure Analysis Services Pricing Tier scaling table doesn't show data.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/01/2024
ms.custom: known-issue-711
---

# Known issue - Azure Analysis Services Pricing Tier scaling table doesn't show data

You can normally view Azure Analysis Services available capacity SKU and pricing data in the Azure portal. During creation of a new Azure Analysis Services resource, you can see the data by selecting the **View full pricing details** link from the **Pricing Tier** selection header. When attempting to modify the SKU of an existing Azure Analysis Services resource, you can see the data by selecting the **Pricing Tier (Scale QPUs)** option under the **Scale** menu. Normally, you see a table of SKU and pricing data; however, you now see a blank table.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

The normal pricing tier table displays the message **No results** under the **SKU** column, with no further data. No data appears regardless of selecting **Recommended** or **View all** table options.

## Solutions and workarounds

You can use this [alternate URL for the Azure portal](https://portal.azure.com/?feature.removePolyfills=false) to view the SKU and pricing data.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
