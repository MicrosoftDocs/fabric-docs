---
title: Bulk edit data
description: Learn how to bulk edit data input values across categories, dimensions, and hierarchy levels in a planning sheet.
ms.date: 05/13/2026
ms.topic: how-to
#customer intent: As a user, I want to update multiple values across selected categories and hierarchy levels in a planning sheet.
---
# Bulk edit data

Use **Bulk Edit** to update multiple values in a planning sheet at the same time. Apply the same value across categories, dimensions, hierarchy levels, or data input types.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

Use bulk edit operations to:

- Allocate costs or revenue across multiple fields.
- Distribute forecast or budget values across categories.
- Assign the same expiry date to multiple products.
- Assign the same manager to multiple locations.

## Open Bulk Edit

1. Go to the **Planning** tab.
1. In the **Tools** section, select **Bulk Edit**.

## Select a measure

In **Measure**, select the data input measure to update.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-select-measure.png" alt-text="Screenshot of selecting a measure in Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-select-measure.png":::

## Select categories and dimensions

1. In **Select Filter**, choose the categories and dimensions to update.
1. Select multiple values for each dimension as required.
1. Add filters for another dimensions.

The planning sheet updates dynamically based on the selected filters.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-select-filter.png" alt-text="Screenshot of filters used to select categories and dimensions in Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-select-filter.png":::

## Select a row hierarchy level

In **Apply to Row Level**, select the hierarchy level to update.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-select-apply-to-row-level.png" alt-text="Screenshot of the Apply to Row Level option in Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-select-apply-to-row-level.png":::

## Select a column hierarchy level

1. In **Apply to Column Level**, select the column hierarchy level to update.
1. If the planning sheet doesn't contain a column hierarchy, apply updates at the grand total or quarter level.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-select-apply-to-column-level.png" alt-text="Screenshot of the Apply to Column Level option in Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-select-apply-to-column-level.png":::

## Configure the update type

1. In **Type**, select the update type.
1. Enter the value to apply.

Supported update types include:

- **Append By**: Adds the entered value to the existing value.
- **Set Value**: Replaces the existing value.
- **Reset Value**: Removes the existing value.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-select-type.png" alt-text="Screenshot of update type options in Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-select-type.png":::

## Distribute values

1. Select a **Distribution** method for child rows. Distribute updated values equally or based on another measure's weights.

    :::image type="content" source="../media/planning-bulk-edit/bulk-edit-select-distribution.png" alt-text="Screenshot of distribution options for child rows in Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-select-distribution.png":::

1. Child rows inherit values based on the selected distribution method.

    :::image type="content" source="../media/planning-bulk-edit/bulk-edit-result.png" alt-text="Screenshot of updated cells highlighted in a planning sheet." lightbox="../media/planning-bulk-edit/bulk-edit-result.png":::

## Supported data input types

**Bulk Edit** supports multiple data input types, including:

- Text
- Date
- Person
- Single-select dropdown
- Multi-select dropdown

Apply values across selected categories, subcategories, and dimensions.

### Bulk edit text inputs

Use **Bulk Edit** to apply text values across selected categories and subcategories.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-text-inputs.png" alt-text="Screenshot of applying text values with Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-text-inputs.png":::

The text column is updated with the selected value.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-text-inputs-result.png" alt-text="Screenshot of text values updated across selected rows." lightbox="../media/planning-bulk-edit/bulk-edit-text-inputs-result.png":::

### Bulk edit date inputs

Use **Bulk Edit** to apply date values across selected categories and subcategories.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-date.png" alt-text="Screenshot of applying date values with Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-date.png":::

The date column is updated with the selected date.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-date-result.png" alt-text="Screenshot of updated date values across selected rows." lightbox="../media/planning-bulk-edit/bulk-edit-date-result.png":::

### Add duration to existing dates

Use **Bulk Edit** to add a duration to existing date values.

Supported duration types:

- Years
- Quarters
- Months
- Weeks
- Days

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-add-duration.png" alt-text="Screenshot of the Add Duration option for date values in Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-add-duration.png":::

Date values are recalculated based on the selected duration.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-add-duration-result.png" alt-text="Screenshot of date values updated after applying a duration." lightbox="../media/planning-bulk-edit/bulk-edit-add-duration-result.png":::

### Bulk edit person inputs

Use **Bulk Edit** to assign person values across selected categories and subcategories.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-person.png" alt-text="Screenshot of assigning person values with Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-person.png":::

The person column is updated with the selected user value.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-person-result.png" alt-text="Screenshot of assigned person values across selected rows." lightbox="../media/planning-bulk-edit/bulk-edit-person-result.png":::

### Bulk edit single-select dropdown inputs

Use **Bulk Edit** to apply a single dropdown value across selected categories and subcategories.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-single-select.png" alt-text="Screenshot of applying a single-select dropdown value with Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-single-select.png":::

The single-select column is updated with the selected dropdown value.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-single-select-result.png" alt-text="Screenshot of updated single-select values across selected rows." lightbox="../media/planning-bulk-edit/bulk-edit-single-select-result.png":::

### Bulk edit multi-select dropdown inputs

Use **Bulk Edit** to apply multiple dropdown values across selected categories and subcategories.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-multi-select.png" alt-text="Screenshot of applying multi-select dropdown values with Bulk Edit." lightbox="../media/planning-bulk-edit/bulk-edit-multi-select.png":::

The multi-select column is updated with the selected dropdown values.

:::image type="content" source="../media/planning-bulk-edit/bulk-edit-multi-select-result.png" alt-text="Screenshot of updated multi-select values across selected rows." lightbox="../media/planning-bulk-edit/bulk-edit-multi-select-result.png":::

> [!NOTE]
> When editing data in bulk:
>
> - Numerical data inputs support append and distribution operations.
> - Date input types support duration-based updates and date selection.
> - Apply changes to specific column hierarchy levels, such as region or date hierarchies.

> [!NOTE]
> Bulk editing is supported for simulation measures and scenarios. Apply simulations to selected categories and dimensions in a single operation.
