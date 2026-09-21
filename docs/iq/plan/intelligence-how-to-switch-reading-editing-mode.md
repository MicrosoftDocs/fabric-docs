---
title: Reading and Editing Modes in the Intelligence Ribbon in Fabric Planning
description: Switch between reading and editing modes to control how you view and build reports. Learn what each Intelligence ribbon option does in both modes.
#customer intent: As a report viewer, I want to switch between reading and editing modes so that I can access the right set of tools for my task.
ms.date: 09/17/2026
ms.topic: how-to
---
# Switch between reading and editing modes

The Intelligence ribbon provides key tools to sync underlying data, annotate report visuals, export high-resolution content, explore data structure models, manage bookmarks, and reset view configurations, even in reading mode.

In this article, you learn how to:

* Switch between reading and editing modes
* Use reading view options in the Intelligence ribbon
* Use editing view options in the Intelligence ribbon

## Toggle reading and editing modes

Use editing mode to create or edit reports and dashboards. You see various ribbons such as chart-specific or visual-specific ribbons, and advanced design and formatting options in editing mode.

Reading mode is intended for viewers and primarily provides options for analysis and collaboration. For example, the **Data** ribbon in a Matrix visual has options to insert rows and columns in editing mode; however, these options are disabled in reading mode.

To switch from reading to editing mode, select the **Reading** button and select the **Editing** option.

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/data-ribbon-reading-editing-mode.gif" alt-text="Animation showing how to switch between reading and editing mode and the data ribbon options in each mode." lightbox="media/intelligence-how-to-switch-reading-editing-mode/data-ribbon-reading-editing-mode.gif":::

Explore the Intelligence ribbon options in reading and editing mode in the following sections.

***

## Refresh data

Select **Refresh Data** to reload the report or dashboard with the latest dataset from the underlying semantic model.

* **Purpose**: Ensures metrics, tables, and visuals reflect real-time or newly ingested data.
* **When to use**: Use this option if the source database is updated while you are actively viewing or presenting the dashboard.

***

## Notes

Select **Notes** to collaborate or mark up the active view:

* **Add Notes**: Attach text annotations directly to visuals or dashboard sections to provide context, call out anomalies, or leave feedback for team members.
* **Marker Mode**: Activate marker mode during live presentations to draw or highlight key areas of interest directly on the dashboard screen without permanently editing the underlying report structure.
* **View all Notes** / **Hide All Notes**: Select the respective options to show or hide notes in the report.

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/notes-options-intelligence-ribbon.png" alt-text="Sreenshot of adding a note and options to view all notes, enable marker mode, and hide notes." lightbox="media/intelligence-how-to-switch-reading-editing-mode/notes-options-intelligence-ribbon.png":::

***

## Export content

In reading mode, select **Export** to generate high-resolution file outputs of the report view. Export to PNG, JPG, or PDF files to capture a crisp, high-resolution snapshot image of the current dashboard view. This option is ideal for slide decks, documentation, or emailing report updates.

> [!NOTE]
> In reading mode, you can save a high-resolution snapshot of your matrix reports, but not the actual data. While reading view supports exporting visual snapshots of matrix reports, raw data exports in Excel or CSV format are restricted to users with edit permissions in editing mode.

### [Export charts in reading mode](#tab/charts)

Select **Export**, choose the file format (PNG, JPG, or PDF), and select the resolution (Low, Medium, High, or Ultra).

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/export-png-jpg-pdf.png" alt-text="Screenshot of options to export in jpg, png, and pdf formats and choose the resolution." lightbox="media/intelligence-how-to-switch-reading-editing-mode/export-png-jpg-pdf.png":::

### [Export matrices in reading mode](#tab/matrices)

Select **Export**, choose the file format (PNG, JPG, or PDF), and select the resolution (Low, Medium, High, or Ultra).

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/export-matrix-reading-mode.png" alt-text="Screenshot of options to export matrices in reading view." lightbox="media/intelligence-how-to-switch-reading-editing-mode/export-matrix-reading-mode.png":::

---

In **Editing** mode, access the **Export** option from the corresponding visual ribbon.

### [Export charts in editing mode](#tab/charts)

Select **Export As** from the corresponding visual ribbon, and then select the PDF or PNG format.

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/export-chart-editing-view.png" alt-text="Screenshot of export options for charts in the Line ribbon in editing view." lightbox="media/intelligence-how-to-switch-reading-editing-mode/export-chart-editing-view.png":::

### [Export matrices in editing mode](#tab/matrices)

Select **Export** from the **Matrix** ribbon, and then select the file format (Excel, PDF, or CSV). For hierarchical data, choose whether to export with expand and collapse buttons.

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/export-matrix-editing-view.png" alt-text="Screenshot of export option for Matrices." lightbox="media/intelligence-how-to-switch-reading-editing-mode/export-matrix-editing-view.png":::

---

***

## Explore model

Select **Explore Model** to inspect the architecture that powers your analytics in reading mode.

* **Dataset visibility:** Browse the specific tables, measures, and dimensions built into the semantic model.
* **Auditing and analysis:** Helps report creators and analyst users verify how calculated metrics are defined and understand the underlying data relationships.

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/model-explorer.png" alt-text="Screenshot of the model explorer with data assigned from the semantic model." lightbox="media/intelligence-how-to-switch-reading-editing-mode/model-explorer.png":::

***

## Settings

Select **Settings** to access configuration controls for each visual and select custom presentation views.

* **Bookmark management:** Use bookmarks to save specific states of your report, including applied filters, visual focus, and layout configurations. Turn on the **Bookmark** toggle to access public bookmarks and create private ones.

    :::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/enable-bookmark-pane.gif" alt-text="Animation showing how to enable the bookmark pane and how the dashboard changes when a bookmark is selected." lightbox="media/intelligence-how-to-switch-reading-editing-mode/enable-bookmark-pane.gif":::

* **Personalize visuals:** In Reading mode, you can switch between various chart types or visual types such as charts, cards, tables, and matrices and tailor the corresponding data assignments. Turn on the **Personalize** switch under **Settings** to change the visual type and data.

1. Select the visual and select the **Edit** icon to personalize.

    :::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/personalize-original-data-assignments.png" alt-text="Screenshot of enabling the personalize option and the edit option for data assignments." lightbox="media/intelligence-how-to-switch-reading-editing-mode/personalize-original-data-assignments.png":::

1. Select the arrow icon to change the visualization type or chart family. In this example, you change the **Line** chart to a **Matrix** visual.

    :::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/personalize-change-visualization-type.png" alt-text="Screenshot of changing the visualization type from line chart to matrix." lightbox="media/intelligence-how-to-switch-reading-editing-mode/personalize-change-visualization-type.png":::

1. Select the arrow icon corresponding to a row or column dimension or measure to change it to another one. Select the plus (+) icon to add a new dimension or measure.

    :::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/personalize-data-assignments.png" alt-text="Screenshot of changing the data assignments." lightbox="media/intelligence-how-to-switch-reading-editing-mode/personalize-data-assignments.png":::

***

## Reset to default

Select **Reset to Default** to instantly restore the report or dashboard to its original, published state.

* **Action:** Clears all session-based changes, including applied slicers and filters, drawn marker annotations, added notes, and changes made by using the personalize option.
* **When to use:** Use when starting a new analysis session or returning to the base view after live interactions.

***

## Canvas

Select **Canvas** to open page-level customization settings such as size, borders, and themes. This option is enabled only in editing mode.

* **General**: Apply canvas-level formatting and structure, including borders, wallpaper, background styles, and enabling grid lines.
* **Layers**: Group, hide, or reorder elements on the canvas, such as bringing items forward or sending them to the back.
* **Themes**: Customize the report appearance by applying a prebuilt color scheme, creating a custom scheme, or importing a theme.

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/canvas-settings.png" alt-text="Screenshot of canvas settings." lightbox="media/intelligence-how-to-switch-reading-editing-mode/canvas-settings.png":::

***

## Layout

Customize individual elements with the options in the **Layout** tabs.

* **General**: Customize properties such as the height, width, position, border, shadow, and tooltip for the selected element.
* **Interactions**: Control whether the selected element can cross-highlight or cross-filter other elements. For more information, see [Edit interactions](#edit-interactions).
* **Sync Slicer**: The slicer selections for one page of the plan can automatically sync the selections in other pages.

***

## Elements

Use this option in editing mode to insert shapes, images, page navigators, and text boxes.

* **Action**: Insert visual and interactive elements including shapes, images, page navigators, buttons, and text boxes into the dashboard canvas.
* **When to use**: Use this option in editing mode to enrich your dashboard layout with supporting graphics, page navigation for multi-page reports, and explanatory text such as report summaries.

***

## Edit interactions

Control how other elements in your dashboard respond when you select a data point in a particular element. Elements can cross-filter or cross-highlight other elements in the dashboard. Select **Edit Interactions**, and then select an element to see the interaction options.

> [!NOTE]
> Configure interactions in editing mode, and then switch to reading mode to select data points for cross-filtering or cross-highlighting.

:::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/cross-filter-highlight-options.png" alt-text="Screenshot of options to cross filter or cross highlight another element." lightbox="media/intelligence-how-to-switch-reading-editing-mode/cross-filter-highlight-options.png":::

* **Cross highlight**: Selecting an element or category (such as a specific region or product) visually highlights the portion that corresponds to your selection while dimming the rest. When you select a region in the pie chart, the contribution of the selected region is highlighted in the other charts.

    :::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/cross-highlight.gif" alt-text="Animation showing how a selection can cross-highlight the contribution in other dashboard elements." lightbox="media/intelligence-how-to-switch-reading-editing-mode/cross-highlight.gif":::

* **Cross filter**: Selecting an element actively filters out non-matching data across the selected charts or tables, updating the view to show only the rows, metrics, and categories relevant to your selection. In this example, the pie chart cross-filters the other elements. In this example, you configure the bar chart to cross-filter the other charts in the dashboard. When you select the Q2 > Warehouse category, notice how the other charts are filtered to the selected data.

    :::image type="content" source="media/intelligence-how-to-switch-reading-editing-mode/cross-filter-bar-chart.gif" alt-text="Animation showing how to cross filter data in other charts." lightbox="media/intelligence-how-to-switch-reading-editing-mode/cross-filter-bar-chart.gif":::
