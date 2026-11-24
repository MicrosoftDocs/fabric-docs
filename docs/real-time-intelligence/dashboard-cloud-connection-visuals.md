---
title: Dashboard Visuals that Require Cloud Connection
description: Learn about dashboard visuals, including Plotly and Custom visuals, that require a cloud connection.
ms.reviewer: mbar
ms.topic: overview
ms.subservice: rti-dashboard
ms.date: 08/26/2026
ai-usage: ai-assisted
---

# Dashboard visuals that require cloud connection

Plotly visuals and [Custom visuals (preview)](dashboard-ai-custom-visual.md) can render author-supplied or AI-generated content that reads query results. To protect data, you can use these visuals only when every dashboard data source uses **dashboard editor identity** through an associated cloud connection.

This article explains the identity requirement for these gated visuals and describes dashboard behavior when the requirement isn't met.

## Identity requirement for gated visuals

Plotly visuals and Custom visuals require dashboard editor identity through an associated cloud connection.

This requirement applies to the entire dashboard. Every data source on the dashboard must use dashboard editor identity through an associated cloud connection. If one data source doesn't meet the requirement, gated tiles can't render on the dashboard.

## Gated visual behavior

### View mode

When any dashboard data source lacks the required connection, gated visuals (Plotly and Custom visual) display an error instead of their visuals. Other visual types are unaffected.

### Edit mode

On the dashboard canvas, a gated visual displays a placeholder instead of rendered content.

When you edit a gated visual, preview behavior depends on whether the tile is new or existing:

* A new gated tile displays a preview automatically during the editing session.

* An existing gated tile displays a security warning and a **Trust and preview** button. Select the button to trust and preview the tile for the current **Edit tile** session.

* After you approve the preview, query and visual-option changes continue to appear in the preview during the current session.

* Preview approval is cleared when you leave the **Edit tile** page. You must approve the preview again when you reopen the tile.

Preview approval doesn't change the dashboard editor identity or cloud connection requirements.

## Save operations

You can't save the dashboard or save a copy when the dashboard contains a gated visual and any data source doesn't meet the identity requirement.

## Connection requirements

The cloud connection must point to the same cluster as the dashboard data source.

Data sources that don't support cloud connections can use pass-through identity only. You can't use these data sources on a dashboard that contains gated visuals.

When another user edits the dashboard, the user can see that connections exist but can't view the connection details. If the user replaces one required connection, the user must replace all required connections.

## Next steps

- [Configure data source access for a Real-Time Dashboard](dashboard-data-source-access.md)
- [Control data access when sharing Real-Time Dashboards](dashboard-real-time-create.md#share-the-dashboard)
- [Create a custom visual in a Real-Time Dashboard](dashboard-ai-custom-visual.md)
- [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md)
