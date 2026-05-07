---
title: Configure advanced settings for writeback
description: Learn how to configure advanced writeback settings, including enforcing column validation rules and renaming writeback columns.
ms.date: 05/03/2026
ms.topic: how-to
#customer intent: As a user, I want to configure validation rules and rename columns before data is written back to the destination.
---

# Configure advanced settings

In **Writeback Settings**, the **Advanced** tab lets you configure validation rules and rename writeback columns. These settings control which data is written back and how the destination stores it.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Validate writeback columns

In **Advanced**, enforce validation rules before writeback. Use a null check or a formula-based condition.

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-column-validation.png" alt-text="Screenshot of the writeback column validation" lightbox="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-column-validation.png":::

Validation options include:
* **Cannot be empty**: Use to write back only non-null cells for the selected field.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-column-validation-types.png" alt-text="Screenshot of the writeback column validation type cannot be empty" lightbox="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-column-validation-types.png":::

* **Enter formula**: Use to define a formula that must evaluate to true for cells to be written back. Cells that don't meet the validation rule are excluded during writeback.
    * Apply cross-filters during validation. During writeback, the system shows a preview of excluded cells.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-validation-expression.jpg" alt-text="Screenshot of the writeback column validation type enter formula" lightbox="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-validation-expression.jpg":::

### Prevent writeback when validation fails

Turn on **Prevent writeback when validation fails** to stop writeback when empty fields are detected. When validation fails, the system generates an exception notification with details about the empty measures, columns, or rows that don't meet the validation condition.

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-prevent-writeback-when-validation-fails.png" alt-text="Screenshot of the writeback settings prevent writeback when validation fails" lightbox="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-prevent-writeback-when-validation-fails.png":::

## Rename writeback columns

Specify custom column names for the writeback table.

To rename columns, go to **Writeback settings > Advanced** and select **Writeback column rename**.

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-column-rename.jpg" alt-text="Screenshot of the writeback setting to rename column name" lightbox="../media/planning-writeback/planning-how-to-configure-advanced-settings/writeback-column-rename.jpg":::

> [!TIP]
> Use standard database naming conventions, such as `snake_case` or `PascalCase`, to ensure compatibility with your destination database.
