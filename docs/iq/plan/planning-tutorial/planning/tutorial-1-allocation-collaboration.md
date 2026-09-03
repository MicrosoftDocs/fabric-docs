---
title: Build Top-Down and Bottom-Up Revenue Plans in Fabric Planning
description: Top-down and bottom-up planning made simple. Distribute a $30M target, lock quarters, apply an 8% segment uplift, and collaborate in-sheet. 
ms.date: 09/02/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Fabric planning tutorial part 1: Allocation and collaboration

In this tutorial, you build a revenue plan, set a top-down $30M target distributed by prior-year weights, then build a bottom-up sales plan with a subcategory adjustment, a trend distribution, and a segment-wide uplift.

## Prerequisites

Complete [1: Introduction to Fabric Planning](./tutorial-0-introduction.md) before starting this tutorial.

## Set the top-down target

In this section, you set a top-down 2026 revenue target and Planning distributes it across regions, categories, and subcategories using the prior-year mix. You then lock specific quarters to control how additional target increases are distributed.

1. In the **Planning** ribbon, select **Totals** and enable **Column Grand Total** on the left. A grand total column appears showing full-year 2025 actuals. By enabling Column Sub/Grand Total, you make it straightforward to input a single value and distribute it across the row and column hierarchies.
1. In the **Planning** ribbon, select **Number** > **Copy from another series** > **2025 Gross Revenue**. Enter **2026 Target** as the title and select **Create**. The column is prepopulated with 2025 values.

    > [!NOTE]
    > Native columns don't allow data input or value changes, so you create a copy to hold the target values. This approach also keeps the 2025 actuals separate from the 2026 plan and target.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/copy-series-2025-revenue-2026-target-column.png" alt-text="Screenshot of creating a copy of the 2025 revenue native measure into a new 2026 target measure." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/copy-series-2025-revenue-2026-target-column.png":::

1. Double-click the grand total cell of the *2026 Target* column, enter $28.5*m*, and select the check mark. Planning allocates the values you enter proportionally to all regions, categories, and subcategories based on the 2025 revenue mix.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/enter-2026-target-value-proportional-allocation.png" alt-text="Screenshot of entering a value and allocating it across row and column hierarchies." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/enter-2026-target-value-proportional-allocation.png":::

1. Expand the column hierarchy to quarters. Select the Q1 row total cell of the *2026 Target* column, select the distribution icon, and select **Lock all children**. Repeat for the Q2 row total cell. Locked cells turn grey. Locking the children prevents the next data input from distributing into Q1 and Q2.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/expand-column-hierarchy-lock-children.png" alt-text="Screenshot of locking the Q1 and Q2 child cells in the 2026 Target revenue column." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/expand-column-hierarchy-lock-children.png":::

1. Double-click the grand total cell of the *2026 Target* column, enter $30m, and press Enter. The extra $1.5m distributes only across Q3 and Q4, as Q1 and Q2 are locked.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/distribute-value-unlocked-columns.png" alt-text="Screenshot of allocating values to unlocked Q3 and Q4 without affecting the Q1 and Q2 values." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/distribute-value-unlocked-columns.png":::

1. Select the Q1 total cell, select the distribution icon, and select **Unlock all children**. Repeat for the Q2 total cell. Unlocking the children once allocation is complete ensures the next allocation or change also applies to Q1 and Q2.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/unlock-all-children-q1-total-cell.png" alt-text="Screenshot of option to unlock all children for the Q1 revenue target column." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/unlock-all-children-q1-total-cell.png":::

## Build a bottom-up sales plan

In this section, you build a bottom-up sales plan by adjusting individual subcategories and applying bulk edits across regions and categories. This approach complements the top-down target with granular, ground-level input.

1. In the **Planning** ribbon, select **Number** > **Copy from another series** > **2025 Gross Revenue**. Enter *2026 Sales Plan* as the title and select **Create**. The column is prepopulated with 2025 values.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/create-2026-sales-plan-from-2025-gross-revenue.png" alt-text="Screenshot of creating a 2026 sales plan by copying values from 2025 gross revenue." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/create-2026-sales-plan-from-2025-gross-revenue.png":::

1. In the footer, select the **Settings** icon and set rows per page to **All**. This action displays all the dimension categories on a single page with a scroll bar.
1. Hover near the *Americas* row, select the row gripper, and select **Collapse** > **Region** to collapse to region level. This action collapses the row hierarchy and displays only the regions.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/collapse-hierarchy-region-level.png" alt-text="Screenshot of the row hierarchy collapsed to show only the region level in the planning grid." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/collapse-hierarchy-region-level.png":::

1. Expand *Americas* > *Beverages* and locate the *Energy & Sports* row.
1. Double-click the grand total cell of the *2026 Sales Plan* column for *Energy & Sports* and append 8% to the existing value by entering "+ 8%" in the formula bar. Press Enter. The totals roll up to *Beverages* → *Americas*.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/increase-energy-value-eight-percent.png" alt-text="Screenshot of increasing the value of the energy and sports row by 8%." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/increase-energy-value-eight-percent.png":::

1. Select the *Energy & Sports* grand total cell, select **Distribute to column with trend**, and drag the slider to *4%*. The annual total distributes across quarters following a 4% growth trend—Q1 receives the smallest share and Q4 the largest.

   :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/distribute-column-trend-four-percent.png" alt-text="Screenshot of distributing the entered value across child rows and columns based on a trend value of 4%." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/distribute-column-trend-four-percent.png":::

1. In the **Planning** ribbon, select **Bulk Edit** and configure the options as follows:

    | Setting                   | Value                    |
    | ------------------------- | ------------------------ |
    | **Measure**               | 2026 Sales Plan          |
    | **Region Name**           | Asia Pacific, Europe     |
    | **Category**              | Beverages, Personal Care |
    | **Quarter Name**          | Q3                       |
    | **Apply to Row Level**    | Subcategory              |
    | **Apply to Column Level** | Month Short              |
    | **Type**                  | Append By                |
    | **Value**                 | 8%                       |

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/bulk-edit-configuration-increase-eight-percent.png" alt-text="Screenshot of the bulk edit configuration increasing Q3 sales plan values by 8 percent for selected regions and categories." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/bulk-edit-configuration-increase-eight-percent.png":::                     |

1. Q3 values for the selected regions and categories increase by 8%.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/selected-region-category-bulk-update.png" alt-text="Screenshot of bulk updating the values for multiple regions, categories, and subcategories." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/selected-region-category-bulk-update.png":::

## Add collaboration columns

In this section, you add comments and a status column to the sales plan. These collaboration features let planners document assumptions and track review progress directly in the sheet.

1. Select and right-click the grand total cell of the *2026 Sales Plan* column for *Energy & Sports* under *Americas* → *Beverages*. Select **Add Comment**, enter “*8% uplift agreed with the Americas sales lead. Annual total distributed across quarters with a 4% growth trend”. S*elect **Post**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/add-cell-level-comment.png" alt-text="Screenshot of adding a cell-level comment in a planning sheet." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/add-cell-level-comment.png":::

1. In the **Planning** ribbon, select **Comments** > **Settings**. Enable **Comments Column** and select **Save**. A comments column appears in the grid.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/add-comments-column.png" alt-text="Screenshot of adding a comments column to a planning sheet." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/add-comments-column.png":::

1. Double-click the comments cell for the *Americas row*. Enter “*Sales Plan reviewed and ready for submission”*, type *@* to tag a team member, and select **Post**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/tag-user-post-comment-comments-column.png" alt-text="Screenshot of entering a comment in the comments column and tagging a user." lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/tag-user-post-comment-comments-column.png":::

1. Collapse the column hierarchy. In the **Planning** ribbon, select **List** > **Single Select** to add a dropdown field.
1. Enter *Status* as the title, select **Options** > **Preset**, and select **Process Status**. Select **Apply**, then **Create**. The *Status* column appears in the grid.
1. Set the *Status* cell for the *Americas* row to *In Progress*.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/set-process-status-progress.png" alt-text="Screenshot of setting the process status to In Progress for the Americas row. " lightbox="../../media/planning-tutorial/planning/tutorial-1-allocation-collaboration/set-process-status-progress.png":::

