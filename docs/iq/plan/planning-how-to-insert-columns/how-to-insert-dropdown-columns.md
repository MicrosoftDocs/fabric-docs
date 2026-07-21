---
title: Insert Dropdown List Columns in a Planning Sheet
description: Learn how to insert and configure data input dropdown columns in a planning sheet.
ms.date: 06/29/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure data input dropdown columns in a planning sheet.
---

# Insert dropdown list columns in planning sheet

You can create single select or multiselect dropdown columns by using a predefined list of values.

* **Single Select** - Select one value for a row from a list of options.
* **Multi-select** - Select multiple values for a row from a list of options.

For the single select type, you can define the list of options manually or select one from the available presets. For the multiselect type, you can configure the list of options.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Create a dropdown column

To insert a dropdown column:

1. Go to **Planning** > **Insert Column** > **List**.
1. Select **Single Select** or **Multi-select**.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/insert-column-list.png" alt-text="Screenshot of selecting the List option." :::

## Configure list of values

After selecting **Single Select** or **Multi-select**, a side panel opens where you can define the list of values (LOVs) by using **List** or **Presets**.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/side-panel-list.png" alt-text="Screenshot of configuration options in the side panel." :::

### List

1. Select **List** to display three default options with colors.
1. Rename, add a new option, or modify the existing options. To learn more about adding or modifying the options, see [Modify column properties and list of values](#modify-column-properties-and-list-of-values).

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/options-list.png" alt-text="Screenshot of dropdown options." :::

### Presets

1. Select **Presets** to open a list of predefined value sets.
1. Hover to preview the values.
1. Select a preset and choose **Apply**.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/options-preset.png" alt-text="Screenshot of presets dropdown options." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/options-preset.png":::

You configured the list of values. The following section explains how to configure other column properties.

## Configure dropdown column properties

You can configure other properties such as **Insert as**, **Allow Input**, **Default Value**, and **Description**. For more information, see [configure data input column properties](./how-to-insert-data-input-columns.md#configure-data-input-column-properties).

In addition, you can configure these specific properties for dropdown columns:

* **Options Style**: Choose how dropdown values are displayed - **Chip**, **Arrow**, or **Plain text**. All three styles are illustrated in the following image.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/options-style.png" alt-text="Screenshot of various styles available for displaying options." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/options-style.png":::

* **Icon Position**: Choose the desired icons and control where the icon appears in the option:
  * You can choose to display the icon on the left or right.
  * This option isn't applicable for **Chip** style.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/icon-position.png" alt-text="Screenshot of icon position." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/icon-position.png":::

* **Allow user to add new option**: When enabled, users can create new options directly from the dropdown, without opening the configuration panel. Select **Create** from the dropdown in the planning sheet to add a new option.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/allow-user-add-new-option.jpg" alt-text="Screenshot of allowing user to add new option." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/allow-user-add-new-option.jpg":::

* **Allow entry on Total/Subtotals**: This option is enabled by default. Disable it to restrict input in total and subtotal rows.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/entry-total-subtotal-rows.png" alt-text="Screenshot of disabling entry in total & subtotal rows." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/entry-total-subtotal-rows.png":::

* **Default Value**: You can define a default selection to avoid empty cells in the column. The default value can be one of the following types:

  * **Static**: Select a predefined value from the dropdown values.

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/default-value-static.png" alt-text="Screenshot of defining a static default value." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/default-value-static.png":::

  * **Dimension**: Select one of the available row dimensions to populate the default values.

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/default-value-dimension.png" alt-text="Screenshot of defining default values using dimension." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/default-value-dimension.png":::

  * **Measure** - Select a measure to populate the default values.

    > [!TIP]
    > When you use **Dimension** or **Measure** as the **Default Value**, enable **Allow user to add new option**. This setting allows you to create a new option if no existing dimension or measure values match.

After configuring the column and list of values, select **Create**. A dropdown column is added to the planning sheet with the configured properties.

## Modify column properties and list of values

You can modify an existing dropdown column by using the same steps as other data input columns. For more information, see [modify column properties](./how-to-insert-number-columns.md#modify-column-properties).

1. Go to **Insert Column** > **Manage measures** and select the **Edit** (pencil) icon.
1. A side panel opens where you can update the required properties and also modify the list of values.

    * **Edit options and colors**: Modify option names by typing over existing values or change colors by using the color picker.

        :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/edit-options.png" alt-text="Screenshot of editing options.":::

    * **Add new options**: To add a new option, select **Add option**, enter a value, and press **Enter**.

    * **Delete or reorder**: Use the reorder handle and the delete (bin) icon to reorder or delete options.

        :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/delete-reorder-options.png" alt-text="Screenshot of add new option, delete, and reorder options." :::

1. After making the changes, select **Update**.

## Localization of options list

You can display dropdown values in different languages based on user preferences.

To configure localization:

1. Go to **Format** > **Translations**.
1. Add translation entries for the required keys and languages by selecting **Add New** or the **+** icon that appears when you hover over a row.
1. To add translation entries in bulk, select **Export** to download the Excel template, add the required translation entries, and then select **Import** to import the updated file.
1. Select **Save** to apply the changes.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/format-translations.png" alt-text="Screenshot of adding translation keys for localization." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/format-translations.png":::

1. Then, in the **Single Select** data input column, use the ***GETLOCALELABEL*** function in the **Options** field and pass the key defined in the localization settings.

Now the dropdown values automatically display in the corresponding language based on the user's locale. The following example demonstrates this feature.

### Example

In the example below, the dropdown options are displayed in French based on the current language settings.

:::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/example-translations.png" alt-text="Screenshot of the dropdown options based on the local language." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/example-translations.png":::

## Using the dropdown column

The following steps demonstrate how to use a dropdown column.

1. Select a cell in the column to open the dropdown.
1. Choose the required value.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/use-dropdown.png" alt-text="Screenshot of choosing a dropdown option in a cell." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/use-dropdown.png":::

1. For multiselect columns, you can select multiple values in a single cell.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/use-dropdown-multiselect.png" alt-text="Screenshot of choosing more than one dropdown options in a cell." lightbox="../media/planning-how-to-insert-columns/how-to-insert-dropdown-columns/use-dropdown-multiselect.png":::

The selected options are added based on your configuration.
