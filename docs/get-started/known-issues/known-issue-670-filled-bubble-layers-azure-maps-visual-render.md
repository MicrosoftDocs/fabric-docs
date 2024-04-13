---
title: Known issue - Filled or bubble layers on Azure Maps visual doesn't render
description: A known issue is posted where the filled or bubble layers on Azure Maps visual doesn't render.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/11/2024
ms.custom: known-issue-670
---

# Known issue - Filled or bubble layers on Azure Maps visual doesn't render

The Azure Maps APIs used by Azure maps visual had a bug where place geocoding results, such as geocoding for a place **Washington**, **Seattle**, **King County**, as opposed to an address, returned empty results. You see filled or bubble layers in the Azure maps visual not rendering. The geocoding bug was mitigated, but Power BI cached some of the empty result sets, which could cause you to continue to see blank geocoding results. The cached results last up to three months, so if affected, you can clear your geocoding cache using the workarounds provided.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

Blank geocoding results for Azure Maps causing filled or bubble layers of Azure Maps visual to not render.
You don't see points in the Azure map visual rendering, especially when geocoding is used (latitude and longitude aren't provided). Filled or bubble layers in the Azure maps visual also don't render.

## Solutions and workarounds

To fix the issue in the Power BI service:

1. Go to powerbi.com
1. Open your browser’s dev tools (in Microsoft Edge or Chrome, using the F12 key)
1. Go to the **Application** tab
1. Look for **IndexedDB** on the left hand side
1. Select the arrow to expand
1. Look for **GeocoderCache**
1. Select the arrow to expand
1. Look for **objects**
1. Right-click and press **Clear**
1. Refresh the page

To fix the issue in Power BI Desktop:

1. Open Power BI Desktop
1. Go to Options and Settings
1. Select **Options**
1. Find the **Diagnostics** Tab
1. Select **Bypass Geocoding Cache**
1. Select **Ok** to close the dialog

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
