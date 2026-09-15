---
title: Use Filter Context in Intelligence Visuals in Fabric Planning
description: Discover how filter context keeps comments, annotations, and titles aligned with your current data selection—no manual updates or DAX measures required.
ms.date: 09/11/2026
ms.topic: how-to
---

# Configure context awareness

Context awareness means that manually entered content such as comments, notes, headers, and data inputs automatically respond to the current filter and slicer context. For example, if you enter a note for Q4, applying a filter for Q1 should display the note associated with Q1 rather than continuing to show the Q4 note.

:::image type="content" source="media/intelligence-how-to-configure-filter-context/correct-incorrect-comment-filter.png" alt-text="Screenshot of an incorrect and correct comment for a filter selection." lightbox="media/intelligence-how-to-configure-filter-context/correct-incorrect-comment-filter.png":::

In Fabric Planning, context awareness ensures that elements like notes and conditional formatting update dynamically as users change filters or slicers. When used with Super Filter, all intelligence visuals automatically become context-aware without additional configuration or the need to create DAX measures.

In this article, you learn how context awareness works with notes, titles, conditional formatting, and axis labels.

## Filter context for notes

Filter context ensures that planning displays notes in the same data context as the visual, making annotations relevant to the user's current selection.

### [Annotations in charts](#tab/charts)

1. To enable context awareness for notes, select the visual and select **Filter context** from the **(...) More options** menu. Turn on the **Filter Context** switch and select **Notes** in **Filter Context Settings**.


    :::image type="content" source="media/intelligence-how-to-configure-filter-context/enable-filter-context-notes.png" alt-text="Screenshot of enabling annotations for charts from filter context settings." lightbox="media/intelligence-how-to-configure-filter-context/enable-filter-context-notes.png":::

1. Select the dimension categories you want in the **Super Filter**. In the **Intelligence** ribbon, select **Notes** to add a new note.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/add-note-q3-corporate.png" alt-text="Screenshot of adding a note for the Q3 + Corporate selection." lightbox="media/intelligence-how-to-configure-filter-context/add-note-q3-corporate.png":::

1. When you change the filter selection, filter context removes the note because it no longer applies to the selected data. In this example, the note you added to the *Copiers* bar is removed.
1. Add a new note for the changed filter selection.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/add-note-q1-consumer.png" alt-text="Screenshot of adding a note for the Q1 + Consumer selection." lightbox="media/intelligence-how-to-configure-filter-context/add-note-q1-consumer.png":::

1. The following animation shows how notes change in response to filter selection changes.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/notes-changing-filter-selection.gif" alt-text="Animation showing notes changing in response to slicer changes." lightbox="media/intelligence-how-to-configure-filter-context/notes-changing-filter-selection.gif":::

### [Annotations in matrices](#tab/matrices)

1. To enable context awareness in matrices, select **Filter Context** in the Matrix ribbon. Then, turn on the **Filter Context** switch in **Filter Context Settings**.
1. Turn on the **Notes** and **Comments** switches to make notes and comments respond dynamically to filter selections. Select **Save**.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/enable-filter-context-matrix.png" alt-text="Screenshot showing filter context settings dialog with notes and comments toggles enabled in matrix." lightbox="media/intelligence-how-to-configure-filter-context/enable-filter-context-matrix.png":::

1. Make a filter selection, then enter a note or comment relevant to the selected category.
    
    :::image type="content" source="media/intelligence-how-to-configure-filter-context/add-comment-east-same-day.png" alt-text="Screenshot of adding a note for east region and same day delivery." lightbox="media/intelligence-how-to-configure-filter-context/add-comment-east-same-day.png":::

1. Change the filter selection and enter another note or comment.

1. Filter context displays the relevant notes and comments based on the slicer selection.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/notes-changing-matrix-visual.gif" alt-text="Animation showing notes and comments changing in response to filter selections." lightbox="media/intelligence-how-to-configure-filter-context/notes-changing-matrix-visual.gif":::

---

## Filter context for titles

Filter context ensures that titles dynamically reflect the current filter selection. This feature helps users quickly understand the data displayed in the visual.

1. To enable filter context, select the visual and select **Filter context** from the **(...) More options** menu. Turn on the **Filter Context** switch in **Filter Context Settings**.
1. The **Title** option is selected by default. To apply filter context to titles, also select **Axis Label**.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/enable-filter-context-title.png" alt-text="Screenshot of the Filter Context Settings dialog with Title and Axis Label options highlighted." lightbox="media/intelligence-how-to-configure-filter-context/enable-filter-context-title.png":::

1. In the visual ribbon (Overlapped column), go to the **Filter context** tab under **Canvas Settings**. Use the options in this tab to configure how filter selections appear in the title.

    * **Measure**: When a visual contains multiple measures, select a measure to display with the filter selection.
    * **Display style:** Choose to display the measure name with the filter selection, or select **Custom** to define the display text.

    In this example, select **Custom**, enter the text to display, and select the filter dimensions to include in the title from the dropdown.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/configure-filter-context-dimensions-custom-text.png" alt-text="Screenshot of settings panel showing custom text and dimension selection options for filter context." lightbox="media/intelligence-how-to-configure-filter-context/configure-filter-context-dimensions-custom-text.png":::

    Notice how the title reflects the filter selections:

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/title-changing-filter-selection.gif" alt-text="Animation showing how the title changes in response to filter selections." lightbox="media/intelligence-how-to-configure-filter-context/title-changing-filter-selection.gif":::

## Filter context for conditional formatting

Use filter context with conditional formatting to apply formatting based on the selected filter category. Filter context allows you to use filter dimensions to define conditional formatting rules. When you select the specified filter category, formatting is applied.

1. To enable filter context for conditional formatting, select the visual and select **Filter context** from the **(...) More options** menu. Enable the **Filter Context** switch in **Filter Context Settings** and then select **Conditional Formatting**.
1. In the visual ribbon (Overlapped column), go to **Conditional Formatting** > **New rule**.
1. In the **Conditional Formatting** panel, set **Impacts on** to **Chart**, then select the color to apply.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/set-conditional-formatting-impacts-chart-color.png" alt-text="Screenshot of setting Impacts on to Chart and selecting a color in the Conditional Formatting panel." lightbox="media/intelligence-how-to-configure-filter-context/set-conditional-formatting-impacts-chart-color.png":::

1. Select the filter dimension from the dropdown and define the conditional formatting rule.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/configure-conditional-formatting-rule-filter-dimension.png" alt-text="Screenshot of selecting the filter context dimension while defining the conditional formatting rule." lightbox="media/intelligence-how-to-configure-filter-context/configure-conditional-formatting-rule-filter-dimension.png":::

1. Formatting is applied when the configured dimension is selected in the filter and all other formatting conditions are met. In this example, conditional formatting is applied only when the *Corporate* segment is selected and sales exceed 2k.

    :::image type="content" source="media/intelligence-how-to-configure-filter-context/conditional-formatting-applied-filter-dimension-selected.gif" alt-text="Animation showing how conditional formatting is applied when the configured filter dimension is selected." lightbox="media/intelligence-how-to-configure-filter-context/conditional-formatting-applied-filter-dimension-selected.gif":::
