---
title: Known issue - Snowflake Implementation="2.0" connector doesn't display views
description: A known issue is posted where Snowflake Implementation="2.0" connector doesn't display views
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/08/2025
ms.custom: known-issue-1100
---

# Known issue - Snowflake Implementation="2.0" connector doesn't display views

In the March 2025 update of Power BI Desktop, the Snowflake connector `Implementation="2.0"` flag is added by default. When this flag is enabled, views aren't visible in both Power BI Desktop and Power BI service.

**Status:** Fixed: May 8, 2025

**Product Experience:** Power BI

## Symptoms

The new Snowflake connector doesn't show views when using the `Implementation="2.0"` flag.

## Solutions and workarounds

One workaround you can use is using the new connector. Open your M query in the Advanced editor and remove the key `Kind="View"`. The source string looks similar to: `let Source =Snowflake.Databases(server, warehouse,[Implementation = "2.0"]), Database = Source{[Name="DEMO_DB",Kind="Database"]}[Data], Schema = Database{[Name="PUBLIC",Kind="Schema"]}[Data], Table = Schema{[Name="ALLTYPES_VIEW",Kind="View"]}[Data],`.

Another workaround is for you to use the old connector version. Disable the preview setting for the new snowflake driver in Power BI Desktop. For the Power BI Service, you can remove the `[Implementation="2.0"]` tag in the [Advanced editor](/power-query/connectors/snowflake#new-snowflake-connector-implementation-preview).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
