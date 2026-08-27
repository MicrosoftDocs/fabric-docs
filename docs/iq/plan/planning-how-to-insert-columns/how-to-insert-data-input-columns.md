---
title: Insert Data Input Columns in a Planning Sheet Introduction
description: Learn how to insert and configure data input columns in a planning sheet. 
ms.date: 08/26/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to insert and configure data input columns.
---

# Insert data input columns in planning sheet

Planning and what-if analysis often require you to enter values, projections, or other details that don't exist in the underlying dataset. Data input columns let you add and manage these values directly within a report, making it easier to perform planning, forecasting, and scenario analysis.

In Plan, you can insert data input columns and measures directly in your reports without writing Data Analysis Expressions (DAX). You can format these columns and reuse them for subsequent calculations and analysis.

In this article, you learn how to insert and configure data input columns and measures.

## Data input types

Plan supports various data input column types to accommodate different planning and reporting scenarios. Depending on the information you want to capture, you can create columns for numeric values, formulas, text, users, and predefined option selections.

The following table describes the available data input column types.

| Input type | Description |
| ------------ | ------------- |
| [Number](how-to-insert-number-columns.md) | Double-click and start typing numerical values directly into a cell. |
| [Text](how-to-insert-text-columns.md) | Enter text with multi-line support and word wrapping. |
| [Checkbox](how-to-insert-checkbox-columns.md) | Capture binary values such as Yes/No or True/False. |
| [Person](how-to-insert-person-columns.md) | Select users from your organization. |
| [List](how-to-insert-dropdown-columns.md) | Use predefined values or create your own list of values. Supports both single select and multi-select options. |
| [Date](how-to-insert-date-columns.md) | Select a date using the date picker. |
| [Simulate](../planning-how-to-use-simulation-measures.md) | Use this column to simulate the number columns. |

## Create a data input column

To add a data input column to your report:

1. Go to **Planning** > **Insert Column**.
1. Select the data input column type that you want.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/planning-insert-column.png" alt-text="Screenshot of inserting a column using Planning tab." :::

1. Configure the column properties and select **Create**.

> [!NOTE]
> For detailed instructions on configuring each data input column type, see the related articles linked in the [Data input types](#data-input-types) section.

## Configure data input column properties

Configure the following properties while creating a data input column:

* **Insert As**: Choose how to add the column:
  * **Visual measure**: Inserts the input column across each category when a column hierarchy exists.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/insert-as-visual-measure.png" alt-text="Screenshot of inserting a column as visual measure." lightbox="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/insert-as-visual-measure.png":::

  * **Visual column**: Inserts a single column regardless of hierarchy.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/insert-as-visual-column.png" alt-text="Screenshot of inserting a column as visual column." lightbox="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/insert-as-visual-column.png":::

* **Input type**: Change the type of data input column before creating it.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/input-type.png" alt-text="Screenshot of different types of input." :::

   > [!NOTE]
   > You can't change the **Insert as** and **Input type** settings after you create the column or measure.

* **Default value**: Specifies the value to display in empty cells. Depending on the input type, use a **Static** value, **Dimension**, or **Measure**. If the underlying measure or formula changes, the default value updates accordingly.

   > [!NOTE]
   > * For visual columns, set default values only by using **static values**.
   > * The **Default value** option isn't available for **Long Text**, **Multi Select**, or **Person** input types.

* **Entry in total and subtotal rows**: Allows users to enter values in total and subtotal rows. This option is enabled by default. Clear **Allow entry on Total/Subtotals** to prevent entries in these rows.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/entry-total-subtotal-rows.png" alt-text="Screenshot of disabling entry in total & subtotal rows." lightbox="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/entry-total-subtotal-rows.png":::

   > [!NOTE]
   > The **Allow entry on Totals/Subtotals** option is available for all input types except **Number**.

* **On Change Formula**: Defines the action to perform when a value in the column changes. Specify a formula or script that automatically executes whenever the value updates. Use this option to trigger calculations, update related values, or perform other actions based on the change.

   > [!NOTE]
   > The **On Change Formula** option is available for all input types except **Long Text**.

* **Allow input**: Control when users can enter data:

  * **In both read and edit mode**: Users can enter data in both reading and editing modes (default).

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/both-read-and-edit-mode.png" alt-text="Screenshot of allowing inputs in both read and edit mode." lightbox="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/both-read-and-edit-mode.png":::

  * **Only in edit mode**: Users can enter data only in editing mode. In reading mode, the cells are disabled for entries.

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/edit-mode.png" alt-text="Screenshot of allowing inputs only in edit mode." lightbox="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/edit-mode.png":::

  * **Based on formula**: Users can enter input only when a condition is met. Plan evaluates the condition using a user-defined formula.

      :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/based-on-formula.png" alt-text="Screenshot of allowing inputs based on a formula." lightbox="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/based-on-formula.png":::

* **Add Breakdown**: Select this option to enable multi-dimensional value allocation. For more information, see [Plan across multiple dimensions with cubes](../planning-how-to-create-cube.md).

* **Description**: Add a note for reference.

## Modify column properties

To modify the properties of an existing data input column:

1. Go to **Planning** > **Insert Column** > **Manage Measures**.
1. Select the option you want:
   * **Edit** (pencil icon) to modify the column properties.
   * **Delete** to remove the column.
   * **Show/Hide** to control column visibility.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/manage-measures-options.png" alt-text="Screenshot of manage measures options." lightbox="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/manage-measures-options.png":::

    Alternatively, use the column gripper:

1. Hover over the column or measure header to display the column gripper.
1. Select the column gripper and choose the action you want, such as **Edit Measure**, **Delete Measure**, or **Hide Column**.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/column-gripper-modify-options.png" alt-text="Screenshot of modifying options in column gripper." :::

1. If you select **Edit**, a side panel opens where you can update the properties. After you make the changes, select **Update**.

## Access control

With Plan, you can control read and write access for data input columns.

To configure access:

1. Select **Security** to open the access control window.

    :::image type="content" source="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/security.png" alt-text="Screenshot of security options." lightbox="../media/planning-how-to-insert-columns/how-to-insert-data-input-columns/security.png":::

1. Locate the column or measure that you want to configure.

1. Configure the access settings. The options are **Read Access** and **Read + Write Access**.

1. Add users to the appropriate access column by entering their name or email address. Select the user from the search results.

    * **Read Access**: Provides view-only access to the data input column.
    * **Read + Write Access**: Provides permissions to view and edit the column.

## Other considerations

* Multiple users can enter data in the same published report, including in reading view. You can track all changes by using the audit log.
* By default, users can view data entered by others. When row-level security (RLS) is enabled, users can see only the data that they're authorized to access.
* You don't need additional setup to enable data entry. You can use the data input feature to add input fields of various types.
* You can write back data input columns to external destinations such as SQL database in Fabric. You can also export them to formats such as PDF or Excel.
