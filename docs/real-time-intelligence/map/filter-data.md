---
title: Filter data in a map layer
description: Learn how to filter data in Fabric Maps.
ms.reviewer: smunk
author: deniseatmicrosoft
ms.author: limingchen
ms.topic: article
ms.service: fabric
ms.subservice: rti-core
ms.date: 2/23/2026
ms.search.form: Data filtering
---

# Filter data in a map layer

This article shows how to apply filters to a map layer in Fabric Maps to control which records are displayed. For more information on data filtering, see [Data filtering in Fabric Maps](about-data-filtering.md).

## Prerequisites

- A map with at least one vector data layer.
- Edit permissions on the map (to save filters).
- A layer with filterable fields.

## Open the filter panel

1. Open the map.
1. Select the target layer.
1. Select **More options (...)** next to the layer.
1. Select **Filter**.

    :::image type="content" source="media/data-filters/filter.png" lightbox="media/data-filters/filter.png" alt-text="A screenshot of Fabric Maps showing a map of California displaying historic fire perimeters in blue with the Data layers panel open. The layer menu displays options including Zoom to fit, Rename, Duplicate, Filter, and Delete.":::

    The filter panel opens for the selected layer.

1. Select the **Add filter** button.

    :::image type="content" source="media/data-filters/add-filter.png" alt-text="A screenshot of the Fabric Maps interface showing the Add filter button in the upper left corner of the layer panel above the map.":::

    A **New filter** button appears next to the **Add filter** button.

1. Select the **New filter** button.

    :::image type="content" source="media/data-filters/new-filter.png" alt-text="A screenshot of the Fabric Maps filter panel showing a New filter button with a filter icon positioned next to the Add filter button at the top of the panel.":::

    A **Field name** dialog box appears.

    :::image type="content" source="media/data-filters/field-name.png" alt-text="A dialog box titled Field name with a dropdown menu labeled Select a field, and two buttons at the bottom labeled Apply and Cancel.":::

By selecting the **Select a field** dropdown list, you can now create any of the filters discussed in the following sections.

### Create a categorical filter

Use categorical filters to include or exclude records based on text values.

1. In the filter panel, select a **text-based field**.
1. Use the search box to find values.
1. Select one or more values.
1. Select **Apply**.

*Example:* Filter by State, Category, or Agency.

:::image type="content" source="media/data-filters/categorical-filter.png" alt-text="A screenshot showing a filter dialog box with Field name set to STATE using a dropdown menu. Next, a Filter value section shows a search box, one selected indicator, and a scrollable list of state abbreviations including AZ, CA, NV, and OR with checkboxes. NV is checked. A Lock filter toggle appears at the bottom with Apply and Cancel buttons.":::

------------------------------------------------------------------------

### Create a numeric range filter

Use numeric range filters to limit records within a value range.

1. Select a **numeric field**.
1. Adjust the range slider to define minimum and maximum values.
1. Select **Apply**.

:::image type="content" source="media/data-filters/numeric-range-filter.png" alt-text="A screenshot showing a filter dialog box for configuring a numeric range filter. The Field name dropdown is set to YEAR at the top. Next, the Filter range section displays a horizontal slider with a green track between two circular handles, spanning from 1.9 K on the left to 2 K on the right. A tooltip shows the value 2025 above the right handle demonstrating what happens when you hover over a point on the slider. At the bottom, a Lock filter toggle switch appears in the off position, followed by Apply and Cancel buttons.":::

> [!NOTE]
> As shown in the screenshot, large values are abbreviated on the horizontal slider for readability. Hovering over a point displays the full value.
### Create a Boolean filter

Use Boolean filters for true/false fields.

1. Select a Boolean field.
1. Choose **Yes**, **No**, or both.
1. Select **Apply**.

:::image type="content" source="media/data-filters/boolean-field.png" alt-text="A screenshot showing a filter dialog box with Field name dropdown set to MOTORCYCLEPARKING. The Filter value section shows a search box, one selected indicator, and a list with Select all checkbox partially filled, Yes checkbox checked, and No checkbox unchecked. A Lock filter toggle switch appears in the off position at the bottom, followed by Apply and Cancel buttons.":::

### Create a date/time filter (Kusto and Ontology only)

Date/time filters are available only for Kusto and Ontology layers.

1. Select a date/time field.
1. Choose a start and end time.
1. Select **Apply**.

## Combine multiple filters

To select another filter, select the **Add filter** button.

More about combining filters:

- You can add multiple filters to the same layer.
- All filters are evaluated using **AND** logic.
- Only records that meet all conditions are shown.

## Lock filters

Lock filters to prevent removal in view mode.

1. While creating or editing a filter, select the **Lock filter** toggle to lock or unlock the filter.
1. Select **Apply**.

:::image type="content" source="media/data-filters/lock-filter.png" alt-text="A filter dialog box showing the Lock filter toggle switch turned on showing green with a circular white handle on the right side. Apply and Cancel buttons appear at the bottom of the dialog.":::

Locked filters:

- Apply automatically when the map opens.
- Can't be removed by viewers.

### Verify behavior in view mode

1. Open the map in **view mode**.
1. Try adding or modifying locked and unlocked filters.
1. Confirm that:
    - Locked filters can't be removed.
    - Changes aren't saved when reopening the map.

------------------------------------------------------------------------

## Remove filters (edit mode)

You must be in edit mode to permanently remove a filter.

1. Open the map in **edit mode**.
1. Remove the filter, locked or unlocked, by selecting the '**x**'.

    :::image type="content" source="media/data-filters/remove-filter.png" alt-text="A screenshot of the Fabric Maps toolbar showing the Home tab with a Save button. The Explorer panel displays the layer with two active filters visible. An Add filter button with a plus icon appears to the left of the filters.":::

1. Save the map.

## Remove filters (view mode)

In view mode, you can remove unlocked filters to view unfiltered data, but changes aren't saved.

1. Open the map in **view mode**.
1. Remove the unlocked filter, by selecting the '**x**'. Notice that the locked filter doesn't have an '**x**'. A lock icon indicates that the filter is locked.

    :::image type="content" source="media/data-filters/remove-filter-view-mode.png" alt-text="A screenshot showing a section of the Fabric Maps layer panel showing two active filters. The first filter isn't locked and has an x button for removal. The second filter has a lock icon and no x button indicating a locked filter that can't be removed. A Refresh button appear above the filters, but no save icon indicating the map can't be saved.":::

1. Notice that you can't save the map.

## Limitations and design considerations

- Filters apply only to the selected layer.
- If a layer has no properties, filtering isn't available.
- Abbreviated numeric values improve slider readability.
- Date/time filters aren't supported for GeoJSON or PMTiles.

For more information, see [Data filtering in Fabric Maps](about-data-filtering.md).
