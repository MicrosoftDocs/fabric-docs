---
title: Configure interactions in Real-Time Dashboards
description: Learn how to configure and use cross-filters and drillthroughs to interact with data in Real-Time Dashboards in Microsoft Fabric.
author: spelluru
ms.author: spelluru
ms.reviewer: gabil
ms.topic: how-to
ms.subservice: rti-dashboard
ms.date: 09/08/2026
ai-usage: ai-assisted
---

# Configure interactions in Real-Time Dashboards

Configure cross-filters and drillthroughs to use selections in one dashboard visual to filter related data in other visuals or on another page.

## Prerequisites

* Completion of [Create and manage Real-Time Dashboard parameters](dashboard-parameters-manage.md).
* Editor permissions on a [Real-Time Dashboard](dashboard-real-time-create.md).
* A dashboard with visuals.

## Configure cross-filters

A cross-filter lets you select a value in one visual and filter the data in other visuals on the same dashboard. Using a cross-filter has the same result as selecting the equivalent value for the parameter in the parameter list at the top of the dashboard.

To create a cross-filter, turn on the option in the visual, and then specify the parameter that filters the data.

1. Go to the query of the tile where you want to add cross-filters.
1. Select **Visual**.
1. In the right pane, select **Interactions**, and then turn on cross-filters.
1. Optionally, specify the **Interaction** type. The default is **Point**, where you select a value in the visual. To select a range of values, such as in a time chart, select **Drag**.
1. Specify both the column that provides the value and a parameter that filters the visuals' query.

    > [!IMPORTANT]
    > The column and parameter must be of the same data type.

## Use cross-filters

After you define the cross-filter, select data points in the visual to filter the current dashboard page. For table visuals, right-click the relevant cell, and then select **Cross-filter**.

## Reset cross-filters

To reset a cross-filter, select **Reset** at the top of the visual where you selected it.

:::image type="content" source="media/dashboard-parameters/cross-filter-reset.png" alt-text="Screenshot of a table visual, showing the reset button.":::

## Configure drillthroughs

Drillthroughs let you select a value in a visual and use it to filter visuals on a target page in the same dashboard. When the target page opens, the value is preselected in the relevant filters. The visuals on the page, such as line or scatter charts, show only related data. This feature is useful when you want to drill through from a summary page to a details page. For information about creating pages, see [Add page](dashboard-real-time-create.md#add-page).

To create a drillthrough, turn on the option in the visual, and then specify one or more drillthrough parameters that filter the data.

1. On your primary page, enter **Editing** mode.
1. Edit the visual where you want to add a drillthrough. Make sure that the **Visual** tab is selected.

    :::image type="content" source="media/dashboard-parameters/drillthrough-visual-edit.png" alt-text="Screenshot of a dashboard visual with the edit option selected.":::

1. In the right pane, select **Interactions**, and then turn on drillthrough.

    :::image type="content" source="media/dashboard-parameters/drillthrough-visual-create.png" alt-text="Screenshot of the Interactions pane with drillthrough turned on.":::

1. Under **Drillthrough**, select **Create new**, and specify the following information. Optionally select **Add another pair** to add multiple parameters for a target page. Repeat this step to add drillthroughs to other pages in the current dashboard by using different parameters.

    | Field | Description |
    | --- | --- |
    | **Destination page** | One or more target pages to drill through to by using the defined parameters. |
    | **Column** | The query result's column to use as the value for a parameter in the target page. |
    | **Parameter** | The parameter used to filter visuals in the target page by using the column value. |
    | **Notes** | Optional short description. |

    > [!IMPORTANT]
    > Column and parameter pairs must be of the same data type.

    :::image type="content" source="media/dashboard-parameters/drillthrough-visual-create-form.png" alt-text="Screenshot of drillthrough form, highlighting the fields to fill out.":::

## Use drillthroughs

After you define drillthroughs, right-click a data point in a configured visual or table, and then select **Drill through to** > *destination page*. The values from the data point filter the visuals on the target page.

:::image type="content" source="media/dashboard-parameters/drillthrough-example.png" alt-text="Screenshot of a dashboard visual, showing the drillthrough interaction.":::

<!-- To return to the source page, in the top-right of the destination page, select **Back**. All filters assigned by the drillthrough are reset. -->

## Related content

* [Create and manage Real-Time Dashboard parameters](dashboard-parameters-manage.md)
* [Use parameters in Real-Time Dashboard queries](dashboard-parameters.md)
* [Add a page to a Real-Time Dashboard](dashboard-real-time-create.md#add-page)
