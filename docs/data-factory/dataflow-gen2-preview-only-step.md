---
title: Preview only step in Dataflow Gen2
description: Accelerate authoring in Dataflow Gen2 with preview-only steps—apply transformations during design time without affecting runtime execution.
ms.reviewer: miescobar
ms.topic: how-to
ms.date: 09/07/2026
ms.custom: dataflows
ai-usage: ai-assisted
---

# Preview only step in Dataflow Gen2

Preview only steps are transformation steps in Dataflow Gen2 that are executed only during the authoring phase for the data preview. They're excluded from run operations, ensuring they don't affect runtime behavior or production logic.

They're designed to accelerate the authoring experience by reducing evaluation time in the data preview pane. They allow you to iterate and validate transformations more quickly without impacting the final execution of the dataflow.

Some of the scenarios where preview only steps can help are:

- Filtering or isolating subsets of data for faster previews.

- Testing logic without waiting for full dataset evaluation.

- Exploring new data sources without impacting run integrity.

## Add a preview-only step

Add a preview-only step by using the following experiences:

- [Navigator and table preview](#navigator-and-table-preview).
- [Power Query editor](#power-query-editor).

### Navigator and table preview

When you select a table or folder in Navigator, select the **Limit editor preview to 1000 rows** checkbox to automatically add a temporary preview only step. This limit makes previews more responsive when you connect to large or slow data sources.

The preview limit applies only while you author the query. It doesn't affect dataflow execution, refresh, or the rows loaded to a destination. After you create the query, you can customize or remove the preview only step in the Power Query editor.

:::image type="content" source="media/dataflow-gen2-preview-only-step/navigator-table-preview.png" alt-text="Screenshot of Navigator showing the Limit editor preview to 1000 rows option." lightbox="media/dataflow-gen2-preview-only-step/navigator-table-preview.png":::

> [!NOTE]
> The checkbox label can be contextual based on the source that you preview. It might indicate a row limit for table data or a file limit for folder-based sources.

### Power Query editor

To set a preview only step in the Power Query editor, follow these steps:

1. Open your dataflow in the Power Query editor within Microsoft Fabric.

1. Right-click the transformation step that you want to designate as preview only.

1. Select **Enable only in previews** from the context menu.

After you select the option, the step name appears in italic style. To make the step part of dataflow execution again, right-click the step and clear **Enable only in previews**.

:::image type="content" source="media/dataflow-gen2-preview-only-step/enable-only-in-preview-option.png" alt-text="Screenshot of the Power Query editor in Dataflow Gen2 with the contextual menu of a step showing the enable only in previews option.":::

## Common transforms used as preview-only steps

Preview-only steps are especially useful for transformations that help streamline the authoring experience without affecting the final execution of the dataflow. Common examples include:

- **Filtering rows**: Apply filters to reduce the volume of data shown in the preview pane, making it easier to focus on specific records during development.

- **Column selection or removal**: Temporarily hide or remove columns that you don't need during authoring to simplify the preview layout.

- **Sorting data**: Sort rows to bring relevant records to the top for easier inspection.

- **Grouping or aggregating**: Use grouping to collapse data into summary views that are faster to render in preview.

- **Sample file filtering**: When working with a data source that lists files in the table preview, limit the preview to a specific sample file or subset of files to reduce load time.
