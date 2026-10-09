---
title: Customize the PowerTable Kanban Board Layout
description: Kanban layout customization in PowerTable lets you stack, group, collapse, and hide columns. Discover how to organize tasks and spot priorities faster.
ms.date: 10/08/2026
ms.topic: how-to
---

# Customize Kanban layout

PowerTable provides various options to customize the Kanban layout.

## Stack by different column

After you create the Kanban layout, use the **Stack By** dropdown to instantly change the column by which tasks are grouped.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/stack-by-different-field.png" alt-text="Screenshot of PowerTable Kanban board with the Stack By dropdown, labeled Status, open and listing Title, Stage, Priority, Assignee, Sprint, Category, and Description." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/stack-by-different-field.png":::

The following image shows the layout stacked by the **Priority** field.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/stack-priority-field.png" alt-text="Screenshot of PowerTable Kanban board stacked by Priority, showing Critical, High, Low, and Medium columns of task cards." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/stack-priority-field.png":::

## Group tasks

Select **Group By**, and then select the column by which you want to group similar tasks within the stack. This feature groups the tasks into sections, making related tasks easier to identify and manage.

The following image shows the tasks grouped by priority within the existing stacks.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/group-tasks.png" alt-text="Screenshot of Kanban board stacked by Status and grouped by Priority, showing expanded Critical tasks and collapsed High, Low, and Medium groups." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/group-tasks.png":::

Select **None** in **Group By** to ungroup and go back to the previous view.

## Expanded and compact view

Select the **Expanded View** in the top right corner to expand all the task cards and view complete task details. You can then toggle back to the default **Compact View**.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/expanded-view.png" alt-text="Screenshot of Kanban board in Expanded View with Expanded View button highlighted, showing full task card details across Backlog, To Do, In Progress, Review, and Done stacks." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/expanded-view.png":::

## Collapse a stack

To collapse or minimize a stack, select the vertical ellipsis for the stack, and then select **Collapse**.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/collapse-stack.png" alt-text="Screenshot of Kanban board with the To Do stack's vertical ellipsis menu open and the Collapse option highlighted, alongside Hide, Move right, and Move left." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/collapse-stack.png":::

Use this option when you have many stacks and want to view them in a more compact layout and fit all of them on a screen.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/result-collapsed-stack.png" alt-text="Screenshot of Kanban board with the To Do stack collapsed into a narrow vertical column highlighted, showing the >> expand arrow." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/result-collapsed-stack.png":::

Select the arrow **>>** to expand it.

## Hide or unhide a stack

To hide a stack, select the vertical ellipsis on the stack header, and then select **Hide**.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/hide-stack.png" alt-text="Screenshot of a Kanban board with the Backlog stack's vertical ellipsis menu open and the Hide option highlighted." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/hide-stack.png":::

> [!NOTE]
> Hiding a column applies only to the current **Stack By** field. If you [change the **Stack By** field](#stack-by-different-column), the hidden columns become visible again.

To unhide a column, select **Properties** and then toggle on **Unhide Stack**.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/unhide-stack.png" alt-text="Screenshot of a Kanban board with the Properties dropdown open and the Unhide Stack toggle highlighted." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/unhide-stack.png":::

## Header count

To show or hide the number of tasks in each stack header, use the **Header Count** toggle under **Properties**.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/header-count.png" alt-text="Screenshot of a Kanban board with the Properties dropdown open and the Header Count toggle turned on and highlighted." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/header-count.png":::

## Customize Kanban color and styling

Select **Edit Kanban** > **Data Color** to customize the data cards and their borders with your preferred color and style.

* **Card:** This section opens the color options for Kanban cards.
  * **Card Fill:** Set the background color of the task cards.
  * **Progress Bar Fill:** Set the color of the progress bar displayed on the cards.
  * **Text Color:** Set the color of the text displayed on the cards.
* **Border:** This section opens the styling options for the cards' borders.
  * **Border Position:** Select one or more positions to display the card border: **Left**, **Right**, **Top**, or **Bottom**.
  * **Border Fill:** Set the color of the card border.
* **Reset to Default Styling:** Use this option to restore the default Kanban styling.

The following image shows a customized Kanban layout.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/customized-kanban.png" alt-text="Screenshot of a customized Kanban board with the Edit Kanban pane open, showing Card Fill, Progress Bar Fill, Text Color, and Border options." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/customized-kanban.png":::

## Format based on rules

Format the Kanban layout based on specified conditions. In addition to formatting the table by setting the formatting rules in the table layout, you can also highlight task cards, progress bars, borders, text, and header icons based on specified conditions.

Use **Format Rules** to define conditions that automatically format Kanban cards, making tasks that meet the specific criteria easier to identify.

To create a format rule:

1. In the **Format** tab, select **Format Rules** > **Create Rule**.

    :::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/create-rule.png" alt-text="Screenshot of the Format tab with the Format Rules menu open and Create Rule highlighted above a Kanban board." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/create-rule.png":::

1. In the side panel, enter a name in the **Title** field.
1. In **Impacts On**, select one or more visual components to which the formatting should apply. They include:

    * Card Fill
    * Border
    * Progress Bar
    * Text
    * Header Icon

    :::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/configure-rule.png" alt-text="Screenshot of the Create Formatting Rule panel with Critical tasks as the title and the Impacts On dropdown showing Text selected." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/configure-rule.png":::

1. Configure the condition in the **Condition If** section. You can add more rules by selecting **Add Rule**.
1. Under **Rule Highlight**, specify the formatting to apply when the condition is met.
1. Select **Apply**.

### Example 1: Impact on border and text

In the following example, you want to identify critical tasks visually by formatting the border and text.

**Impacts On**: Select **Border** and **Text**.

**Condition**: If **Priority** is *Critical*, the rule displays a **red left border** and changes the **Title** text color to red, making critical tasks easier to identify.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/border-text.png" alt-text="Screenshot of the Create Formatting Rule pane with Border selected, Priority is Critical condition, red left border, and red text color applied to Title." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/border-text.png":::

### Example 2: Impact on progress bars and cards based on multiple conditions

The following example shows how you can use multiple conditions to create more specific formatting rules based on different field values.

This example highlights both the progress bars and task cards based on the task's progress.

1. Select **Format Rules** > **Create Rule** to create another rule.
1. Name the rule in the **Title** field.
1. Select **Card Fill** and **Progress Bar** in **Impacts On**.

    :::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/card-fill-progress-bar.png" alt-text="Screenshot of the Create Formatting Rule pane with Card Fill and Progress Bar selected in the Impacts On dropdown.":::

1. Select a table column from the first dropdown. For example, select *Progress* to check tasks by progress column.
1. Select a comparison operator. Since *Progress* is a number column, you can choose one of the comparison operators, such as *Greater than*, *Less than, Is equal to* and so on.
1. Select **Number** and enter the value to compare.

    :::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/add-combine-rules.png" alt-text="Screenshot of the Create Formatting Rule pane with two conditions, Progress greater than 90 OR Status is Done, and the Add Rule button highlighted.":::

1. Add another condition by selecting **Add Rule**.
1. Combine the rules using **AND** or **OR.**
1. Configure the fill colors for the progress bars and the task cards that meet the set conditions.
1. Select **Apply**.

In the following image, tasks with **Progress** greater than **90%** or a **Completed** status are highlighted in light green, with a dark green progress bar.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/result-after-combine-rules.png" alt-text="Screenshot of a Kanban board where tasks with progress over 90% or Done status show light green cards and dark green progress bars, beside the Create Formatting Rule pane." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/result-after-combine-rules.png":::

### Example 3: Impact on header icon

This example adds a header icon to tasks that are overdue by comparing the **Due Date** with the current date and checking that the task is still **In Progress**.

1. In **Impacts On**, select **Header Icon**.
1. Under **Condition If**, configure the first condition:
   * Select **Due Date**.
   * Select **is in the last** in the next dropdown. You can also use other operators, such as **Greater than** and **Less than**, and other date-based conditions to compare the **Due Date** with a specified date or time period.
   * Enter **2** and select **weeks**. Select one of the time frames, such as days, weeks, months, years, calendar weeks, and more.
1. Select **+ Add Rule** to add another condition.
1. Select **AND** or **OR** to specify how the conditions are evaluated.
1. Configure the second condition by using the appropriate dropdown menus:
   * Select **Status** from the first dropdown menu.
   * Select **is** and **In Progress** in the subsequent menus.
1. Under **Rule Highlight**, configure the icon formatting:
   * **Position:** Select where to display the icon, such as **Left of data**.
   * **Select Icon:** Select the icon to display.
   * **Icon Colour:** Select the color of the icon.

The rule applies the selected icon formatting when the configured conditions are met.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/header-icon-format.png" alt-text="Screenshot of a Kanban board beside the Create Formatting Rule pane, with red exclamation icons shown on matching task cards." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/header-icon-format.png":::

## Manage format rules

Use the **Manage Rules** option to modify, organize, duplicate, or delete existing format rules.  

In the **Format** tab, select **Format Rules** > **Manage Rules**.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/manage-rules.png" alt-text="Screenshot of the Format Rules dropdown showing Create Rule and Manage Rules options, with Manage Rules highlighted in red." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/manage-rules.png":::

In the **Manage Rule** side panel, view all the formatting rules that you configured.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/edit-delete-duplicate-enable-disable-rule.png" alt-text="Screenshot of the Manage Rule panel listing three format rules, with the edit, duplicate, delete, and toggle controls for Progress indicator highlighted in red." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/edit-delete-duplicate-enable-disable-rule.png":::

Each rule has a set of actions that you can use to manage it:

* **Edit rule** - Modify the rule conditions, affected components, or color and highlight settings.
* **Duplicate** - Create a copy of an existing rule to use as a starting point for a new rule.
* **Delete** - Delete a rule that you configured.
* **Show/Hide** - Use this toggle to enable or disable a rule without deleting it.
* **Drag and reorder** - Select the drag handle and drag and drop a rule to the required position to change its order for visibility.
* Select **Create New Rule** to add a new formatting rule from the **Manage Rule** panel.

## Modify layout

To modify the existing Kanban layout and configure a new one, go to **Layout** under the **PowerTable** tab and then select **Manage Layout**. Select the layout, and then reset or reconfigure the properties.

:::image type="content" source="../media/powertable-layouts/how-to-customize-kanban-layout/manage-layout.png" alt-text="Screenshot of the PowerTable Layout menu with Manage Layout highlighted and the Layout Configuration dialog showing Kanban settings." lightbox="../media/powertable-layouts/how-to-customize-kanban-layout/manage-layout.png":::
