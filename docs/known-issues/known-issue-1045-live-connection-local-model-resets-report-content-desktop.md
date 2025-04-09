---
title: Known issue - Live connection to local model conversion resets report content in February Desktop
description: A known issue is posted where live connection to local model conversion resets report content in February Desktop.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/09/2025
ms.custom: known-issue-1045
---

# Known issue - Live connection to local model conversion resets report content in February Desktop

You can convert your report from using a *live connection* to a local model. If you use the February 2025 Power BI Desktop version to perform the conversion, your report content might disappear. The content might disappear if you connect to a model in service using **Get Data**. Alternatively, the content might disappear if you open a file that used **Get Data** and then try to add another data source.

**Status:** Fixed: April 9, 2025

**Product Experience:** Power BI

## Symptoms

You can convert a report from *live connection* to a local model. In Power BI Desktop, you see a dialog informing you that `A DirectQuery connection is required`. If you press **Add a local model**, the report is converted. After the flow completes, you see an accurate field list, but the report is empty.

## Solutions and workarounds

Use a [previous version of Power BI Desktop](/power-bi/fundamentals/desktop-latest-update-archive), such as the January or November release, to perform the conversion.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
