---
title: Display a Real-Time Dashboard in present or kiosk mode
description: Learn how to use present mode for presentations and kiosk mode for unattended displays in Microsoft Fabric Real-Time Dashboards.
ms.service: fabric
ms.subservice: rti-dashboard
ms.topic: how-to
ms.date: 11/05/2026
ai-usage: ai-assisted
---

# Display a Real-Time Dashboard in present or kiosk mode

Use present or kiosk mode to display a Real-Time Dashboard with fewer controls and more space for your data. Present mode is designed for presentations and shared-screen discussions. Kiosk mode is designed for unattended displays, such as an operations wallboard or an office KPI screen.

This article explains how to choose a mode, prepare your dashboard, and display it.

## Prerequisites

- Access to a Real-Time Dashboard that you can view.
- Access to the data displayed by its visuals. With pass-through identity, you need permission to the underlying data source. With dashboard editor's identity, an editor configures the connection used to access the data.

For more information about these access models, see [Real-Time Dashboard permissions](dashboard-permissions.md).

## Choose a display mode

| Mode | Use it for | Dashboard interactions | Editing |
|---|---|---|---|
| Present | Presenting a dashboard in a meeting, screen share, or shared display. | You can change parameter values, use configured cross-filters and drillthroughs, and explore visuals. | Not available while in present mode. |
| Kiosk | Leaving a dashboard on an unattended screen. | Dashboard interactions and navigation are disabled to prevent accidental changes. | Not available while in kiosk mode. |

Both modes hide the Fabric navigation and dashboard authoring controls. Essential context, such as the dashboard title and last refreshed timestamp, remains available.

## Display a dashboard in present mode

1. Open the Real-Time Dashboard that you want to display.
1. In the dashboard command bar, open the **Present** menu, and then select **Present**.

   :::image type="content" source="media/dashboard-present-kiosk/present-menu.png" alt-text="Screenshot of the Present menu showing Present and Present in Kiosk mode options.":::

   The dashboard expands into a reduced-chrome view. A compact header shows the dashboard title, last refreshed timestamp, and an action to exit present mode.

1. During your presentation, use the dashboard's existing parameters and configured interactions to focus on the data you want to discuss.

   For example, select a parameter value to focus on a service, or use a configured drillthrough to open a details page. For more information, see [Configure interactions in Real-Time Dashboards](dashboard-interactions.md).

To return to the standard dashboard view, select the exit present action in the compact header.

## Prepare a dashboard for an unattended display

Before entering kiosk mode:

1. Open the dashboard page that you want to display.
1. Set the parameter values and time range for the information you want to monitor.
1. Check that the visuals load successfully and that their data is appropriate for everyone who can see the screen.
1. Verify that automatic refresh is enabled and working before leaving the display unattended.

   If the dashboard is configured for manual updates only, ask a dashboard editor to configure **Live refresh** in the dashboard's **Refresh settings**. For configuration instructions, see [Live refresh in Real-Time Dashboard](dashboard-live-refresh.md).

> [!IMPORTANT]
> Present and kiosk modes change the viewing experience. They aren't a substitute for dashboard permissions or data source access controls. Use the appropriate access model for the dashboard and display only data that is suitable for the screen's audience.

## Display a dashboard in kiosk mode

1. Open the prepared dashboard.
1. In the dashboard command bar, open the **Present** menu, and then select **Present in Kiosk mode**.

1. Check the dashboard title, last refreshed timestamp, and refresh status to confirm that the intended dashboard is displayed and updating.

Kiosk mode removes nonessential controls and disables dashboard interactions and navigation. Automatic refresh supports monitoring without interacting with the display.

## Considerations

- You can't edit or author dashboard content while in present or kiosk mode.
- Set up the page and parameter values before entering kiosk mode, because dashboard interactions are disabled in that mode.
- Present and kiosk state is preserved across dashboard refreshes and browser reloads.
- Use the last refreshed timestamp and refresh status to check the display's freshness. Don't assume that an unattended screen is current without checking these indicators.
- This article covers displaying one dashboard. It doesn't describe page rotation, playlists across dashboards, or centralized display management.

## Related content

- [What is Real-Time Dashboard?](real-time-dashboards-overview.md)
- [Live refresh in Real-Time Dashboard](dashboard-live-refresh.md)
- [Real-Time Dashboard permissions](dashboard-permissions.md)
