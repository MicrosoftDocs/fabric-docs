---
title: Add and Manage Bookmarks in Fabric Planning
description: Learn how to create, manage, and share bookmarks in Fabric planning.
ms.date: 11/19/2026
ms.topic: how-to
ai-usage: ai-assisted
#customer intent: As a user, I want to understand and use bookmark feature effectively.
---

# Save analysis and insights with bookmarks

Bookmarks help you capture the current state of your report, such as applied filters, rankings, layout adjustments, and formatting. Use bookmarks to return to key insights with a single click or share tailored views with specific stakeholders.

## Prerequisite

* You have access to the plan item.

## Save applied filters

Instead of manually reapplying filters and toggling columns for every review, use bookmarks to preserve curated views of your data. Easily switch between broad overviews and granular slices filtered by product, region, or specific KPIs.

1. Select the **Bookmark** icon to open the **Bookmark** pane.

    :::image type="content" source="media/planning-how-to-add-bookmark/add-bookmark-icon.png" alt-text="Screenshot of the bookmark icon and the bookmark side pane." lightbox="media/planning-how-to-add-bookmark/add-bookmark-icon.png":::

1. Create a bookmark under the appropriate tab based on your sharing needs:

    * **Public**: Visible to users with access to the sheet, subject to [role-based bookmark permissions](planning-how-to-manage-security.md).
    * **Private**: Accessible only to you (the creator).

    Select **Add New**.

    :::image type="content" source="media/planning-how-to-add-bookmark/create-new-bookmark.png" alt-text="Screenshot of creating a new bookmark in a planning sheet." lightbox="media/planning-how-to-add-bookmark/create-new-bookmark.png":::

1. Select the **More options (…)** menu to rename the bookmark.
1. In the **Planning** ribbon, go to **Filter** > **Add New Filter**.
1. Enter a name to identify the filter and enter the filter condition. In this example, the filter displays the rows with total quantity greater than 1k. Select **Save** to apply the filter.

    :::image type="content" source="media/planning-how-to-add-bookmark/create-filter-condition.png" alt-text="Screenshot of creating a filter condition to display rows with quantity greater than 1k." lightbox="media/planning-how-to-add-bookmark/create-filter-condition.png":::

1. In the **Planning** ribbon, go to **Show Columns** and select only the dimensions and measures required for your current analysis.

    :::image type="content" source="media/planning-how-to-add-bookmark/select-dimensions-measures-display.png" alt-text="Screenshot of using the Show Columns option to hide the sales and profit measures." lightbox="media/planning-how-to-add-bookmark/select-dimensions-measures-display.png":::

1. Go to the **More options (…)** menu and select **Update** to save the changes to the bookmark.

    :::image type="content" source="media/planning-how-to-add-bookmark/update-bookmark-option.png" alt-text="Screenshot of the update bookmark option in the more options menu." lightbox="media/planning-how-to-add-bookmark/update-bookmark-option.png":::

1. Switch between focused data slices, such as isolating a particular product line, focusing on a specific region, or hiding non-essential measures and dimensions by using bookmarks.

    :::image type="content" source="media/planning-how-to-add-bookmark/switch-bookmarks-filters.gif" alt-text="Animation showing how to switch views between different bookmarks." lightbox="media/planning-how-to-add-bookmark/switch-bookmarks-filters.gif":::

## Capture top and bottom performers

Instead of scanning through hundreds of rows to spot outliers, use ranking rules to isolate your top revenue drivers or underperforming accounts. Save these ranked configurations as bookmarks to preserve specific threshold views and switch effortlessly between global overviews and targeted performance lists.

1. Create a new bookmark.
1. In the **Planning** ribbon, select **Top n**.
1. Configure the rule to display the top or bottom-performing categories. In this example, you show the top two product subcategories with the highest sales in Q1. Select **Apply** to rank your data.

    :::image type="content" source="media/planning-how-to-add-bookmark/configure-ranking-sub-category.png" alt-text="Screenshot of configuring ranking to display the top two subcategories." lightbox="media/planning-how-to-add-bookmark/configure-ranking-sub-category.png":::

1. Go to the **More options (…)** menu to rename the bookmark. Select **Update** to save your changes.

    :::image type="content" source="media/planning-how-to-add-bookmark/bookmark-update-option-top-categories.png" alt-text="Screenshot of option to update the top performing category bookmark." lightbox="media/planning-how-to-add-bookmark/bookmark-update-option-top-categories.png":::

1. Once configured, capture these ranked views as bookmarks so report consumers can immediately benchmark top performers against underperforming segments.

    :::image type="content" source="media/planning-how-to-add-bookmark/bottom-performing-sub-categories.png" alt-text="Screenshot of configuring ranking to display the bottom performing categories and creating a bookmark." lightbox="media/planning-how-to-add-bookmark/bottom-performing-sub-categories.png":::

## Highlight key metrics with formatting

Use bookmarks to capture custom formatting and layout changes so critical variances and KPI thresholds stand out immediately. Saving these visual states allows you to switch seamlessly between standard grid views and executive-ready highlights without having to reconfigure your planning sheet.

1. Create a new bookmark.
1. Select the cells to highlight. In the **Format** ribbon, select the background and font color to apply.
1. Select **Update** from the **More options (...)** menu to save formatting.

    :::image type="content" source="media/planning-how-to-add-bookmark/apply-formatting-cells.png" alt-text="Screenshot of applying formatting and updating the bookmark." lightbox="media/planning-how-to-add-bookmark/apply-formatting-cells.png":::

1. In the **Planning** ribbon, select **Layout** and choose your preferred report structure (such as Hierarchy, Outline, Stepped, Table, or Tree). Select **Update** from the **More options (…)** menu next to the bookmark to save the layout changes.

    :::image type="content" source="media/planning-how-to-add-bookmark/change-sheet-layout.png" alt-text="Screenshot of option to change the planning sheet layout." lightbox="media/planning-how-to-add-bookmark/change-sheet-layout.png":::

1. Apply advanced number customizations from **Appearance** settings and save the changes using bookmarks. To apply semantic formatting, you need a Planner session and workspace permissions that allow you to edit the plan item. See [Planning roles](overview-roles.md).

    :::image type="content" source="media/planning-how-to-add-bookmark/appearance-settings.png" alt-text="Screenshot of appearance settings to enable semantic number formatting in the planning sheet." lightbox="media/planning-how-to-add-bookmark/appearance-settings.png":::

1. Customize report layouts, cell formatting, appearance settings, totals, and number formats, then save the entire configuration as a bookmark for instant reuse.

    :::image type="content" source="media/planning-how-to-add-bookmark/switch-layout-formatting-bookmarks.gif" alt-text="Animation showing how to create bookmarks with different layouts and formatting." lightbox="media/planning-how-to-add-bookmark/switch-layout-formatting-bookmarks.gif":::

## Manage bookmark options

Select **More options (…)** next to a bookmark to access the following actions:

* **Update**: Overwrite the bookmark with your current report view and settings.
* **Make default**: Set the bookmark as the default view whenever the sheet is opened.
* **Promote to Public**: Move a private bookmark to the **Public** tab so other users can access it.
* **Rename**: Edit the bookmark's display name.
* **Delete**: Permanently remove the bookmark.
* **Copy link**: Copy a direct, shareable URL to the bookmark.
* **Group**: Organize related bookmarks into a separate section.
