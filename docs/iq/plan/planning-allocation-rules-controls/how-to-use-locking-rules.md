---
title: Use locking rules in planning in Fabric
description: Learn how to configure locking rules to prevent changes to selected measures, rows, and columns in a planning sheet.
ms.topic: how-to
ms.date: 10/15/2026
---

# Use locking rules in planning in Fabric

During budgeting, forecasting, and allocations, you might need cell values to remain unchanged. You can configure locking rules to prevent users from entering or editing values in specific rows or columns.

Locking rules preserve selected values during distribution and forecasting. You can apply a rule to selected measures, visual columns, rows, and periods.

## Create a locking rule

1. In the planning sheet, select **Locking Rule** to open the **Add Rule** pane.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/open-locking-rule-panel.png" alt-text="Screenshot of the planning sheet with the Locking Rule command selected and the Add Rule pane open." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/open-locking-rule-panel.png":::

2. In **Rule Name**, enter a name for the rule.

3. In **Apply to Measures**, select the scope of the rule. The available options are **All Measures**, **Selected Measures**, **All Visual Columns**, and **Selected Visual Columns**.

   ### Choose what the rule applies to

    - **All Measures**: Apply the rule to all visual measures, including measures added later to the planning sheet. The rule covers data input and forecast measures, whether they are visible or hidden, based on the selected rows and columns.
    - **All Visual Columns**: Apply the rule to all visual columns, including columns added later to the planning sheet.
    - **Selected Measures**: Apply the rule only to the measures selected in **Choose Measures**.
    - **Selected Visual Columns**: Apply the rule only to the columns selected in **Choose Columns**.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/select-measure-scope.png" alt-text="Screenshot of the Add Rule pane with the Apply to Measures menu open." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/select-measure-scope.png":::

4. If you select **Selected Measures**, use **Choose Measures** to select the measures to lock.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/choose-measures.png" alt-text="Screenshot of the Choose Measures menu with Forecast and Revenue projection available for selection." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/choose-measures.png":::

5. If you select **Selected Visual Columns**, use **Choose Columns** to select the visual columns to lock.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/choose-visual-columns.png" alt-text="Screenshot of the Add Rule pane with Choose Columns set to Number." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/choose-visual-columns.png":::

6. In **Rule Type**, keep **Locking Rule** selected to prevent edits to the selected cells. If needed, select **Distribution Rule** or **Minmax Rule** to configure a different rule type.

7. To apply the rule to child cells when a parent cell is locked, select **Apply to children**.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/apply-locking-rule-to-children.png" alt-text="Screenshot of the Add Rule pane with Apply to children selected and the affected child rows highlighted in the planning sheet." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/apply-locking-rule-to-children.png":::

## Select rows for the locking rule

In **Rows Selection**, choose which rows the rule applies to.

- **All Rows**: Lock all rows for the selected measures and columns.
- **Custom**: Lock specific rows by using a selection filter or a text filter with advanced grouping.

1. Select **All Rows** or **Custom** in **Rows Selection**.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/select-all-or-custom-rows.png" alt-text="Screenshot of the Rows Selection menu with All Rows and Custom options." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/select-all-or-custom-rows.png":::

2. If you select **Custom**, select the **Custom Rows** filter control to configure the row filter.

3. To select rows directly, choose **Selection** as the filter type. Select the required rows. Double-click a parent row to select or clear the row and all its children, and then select **Submit**.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-row-selection-filter.png" alt-text="Screenshot of the Configure Custom Row Filter pane with Selection chosen and specific rows selected." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-row-selection-filter.png":::

4. To select rows by using conditions, choose **Filter** as the filter type. Select a dimension, an operator, and a value.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-row-text-filter.png" alt-text="Screenshot of the Configure Custom Row Filter pane with the operator menu open for a text condition." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-row-text-filter.png":::

5. Select **Add filter** to add another condition. Use **AND** or **OR** to combine conditions. Select **Add group** to create a group of conditions.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-advanced-row-group-filter.png" alt-text="Screenshot of the Configure Custom Row Filter pane with multiple conditions and a grouped filter." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-advanced-row-group-filter.png":::

## Select columns and periods for the locking rule

In **Columns Selection**, choose the columns or periods to which the rule applies. The available options include **Open Period**, **Period Range**, and **Custom**.

- **Open Period**: Apply the rule to all columns in the open period.
- **Period Range**: Apply the rule to a selected range of periods.
- **Custom**: Select specific columns by using a selection filter or an advanced filter.

1. To lock a period range, select **Period Range** in **Columns Selection**, and then use the period selector to choose the required quarters.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/select-locking-rule-period-range.png" alt-text="Screenshot of the Add Rule pane with Period Range selected and a quarter selector open." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/select-locking-rule-period-range.png":::

2. To select specific columns, choose **Custom** in **Columns Selection**, and then select the **Custom Columns** filter control.

3. To select columns directly, choose **Selection** as the filter type. Select the required columns, and then select **Submit**.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-column-selection-filter.png" alt-text="Screenshot of the Configure Custom Column Filter pane with Selection chosen and specific periods selected." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-column-selection-filter.png":::

4. To select columns by using conditions, choose **Filter** as the filter type. Select the column dimension, operator, and value. Use **Add filter**, **AND**, **OR**, and **Add group** to build the required criteria.

   :::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-advanced-column-filter.png" alt-text="Screenshot of the Configure Custom Column Filter pane with an advanced filter based on year and quarter." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/configure-advanced-column-filter.png":::

## Create or update the locking rule

Review the selected measures, rows, columns, and periods in the **Add Rule** pane. Select **Create** to create the rule. If you are editing an existing rule, select **Update** to save your changes.

The following example applies a locking rule to the **Forecast** measure for selected rows and the Q3 and Q4 periods.

:::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/review-locking-rule-row-and-period-settings.png" alt-text="Screenshot of the Add Rule pane showing selected rows, the Forecast measure, and the Q3 to Q4 period range." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/review-locking-rule-row-and-period-settings.png":::

After the rule is applied, locked cells remain unchanged when a subtotal or grand total is updated. Users can't enter or edit values in those locked cells.

:::image type="content" source="../media/planning-allocation-rules-controls/how-to-use-locking-rules/verify-locked-cells.png" alt-text="Screenshot of the planning sheet after a measure update, showing the locked cells remaining unchanged." lightbox="../media/planning-allocation-rules-controls/how-to-use-locking-rules/verify-locked-cells.png":::
