---
title: Dashboard Visuals that Require Cloud Connection
description: Learn about dashboard visuals that require a cloud connection.
ms.reviewer: mbar
ms.topic: overview
ms.subservice: rti-dashboard
ms.date: 08/26/2026
---

# Dashboard visuals that require cloud connection

Plotly visuals can render author-supplied content that reads query results. To protect data, you can use Plotly visuals only when every dashboard data source uses **dashboard editor identity** through an associated cloud connection. 

This article explains the identity requirement for Plotly visuals and describes dashboard behavior when the requirement isn't met. 

## Identity requirement for Plotly visuals

Plotly visuals require dashboard editor identity through an associated cloud connection. 

This requirement applies to the entire dashboard. Every data source on the dashboard must use dashboard editor identity through an associated cloud connection. If one data source doesn't meet the requirement, Plotly tiles can't render on the dashboard. 

## Plotly visuals behavior

### View mode 

When any dashboard data source lacks the required connection, gated Plotly visuals display an error instead of their visuals. Other visual types are unaffected. 

### Edit mode 

On the dashboard canvas, a gated visual displays a placeholder instead of rendered content. 

When you edit a Plotly visual, preview behavior depends on whether the tile is new or existing: 

* A new Plotly tile displays a preview automatically during the editing session. 

* An existing Plotly tile displays a security warning and a Trust and preview Plotly button. Select the button to trust and preview the tile for the current Edit tile session. 

* After you approve the preview, query and visual-option changes continue to appear in the preview during the current session. 

* Preview approval is cleared when you leave the Edit tile page. You must approve the preview again when you reopen the tile. 

Preview approval doesn’t change the dashboard editor identity or cloud connection requirements. 

## Save operations 

You can’t save the dashboard or save a copy when the dashboard contains a gated visual and any data source doesn’t meet the identity requirement. 

## Connection requirements 

The cloud connection must point to the same cluster as the dashboard data source. 

Data sources that don’t support cloud connections can use pass-through identity only. You can’t use these data sources on a dashboard that contains gated visuals. 

When another user edits the dashboard, the user can see that connections exist but can’t view the connection details. If the user replaces one required connection, the user must replace all required connections. 

## Next steps 

- [Configure data source access for a Real-Time Dashboard](dashboard-data-source-access.md)
- [Control data access when sharing Real-Time Dashboards](dashboard-real-time-create.md#share-the-dashboard)
- [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md)
