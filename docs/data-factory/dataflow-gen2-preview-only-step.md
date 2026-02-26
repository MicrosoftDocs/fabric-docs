---
title: Preview only step in Dataflow Gen2 (Preview)
description: Accelerate authoring in Dataflow Gen2 with preview-only steps—apply transformations during design time without affecting runtime execution.
ms.reviewer: miescobar
ms.topic: how-to
ms.date: 09/15/2025
ms.custom: dataflows
---

# Preview only step in Dataflow Gen2 (Preview)

> [!NOTE]
> Preview only step is currently in preview.

Preview only steps are transformation steps in Dataflow Gen2 that are executed only during the authoring phase for the data preview. They're excluded from run operations, ensuring they don't affect runtime behavior or production logic.

They're designed to accelerate the authoring experience by reducing evaluation time in the data preview pane. They allow you to iterate and validate transformations more quickly without impacting the final execution of the dataflow.

Some of the scenarios where preview only steps can help are:

- Filtering or isolating subsets of data for faster previews.

- Testing logic without waiting for full dataset evaluation.

- Exploring new data sources without impacting run integrity.

## Set a preview only step

To set a preview-only step in Dataflow Gen2, follow these steps:

1. Open your dataflow in the Power Query editor within Microsoft Fabric.

1. Right-click on the transformation step you want to designate as preview-only.

1. Select **Enable only in previews** from the context menu.

Once the option is selected, the step name is shown in italic style. To remove this option, you can right-click the step again and disable the option.

:::image type="content" source="media/dataflow-gen2-preview-only-step/enable-only-in-preview-option.png" alt-text="Screenshot of the Power Query editor in Dataflow Gen2 with the contextual menu of a step showing the enable only in previews option.":::

## Common transforms used as preview only steps

Preview only steps are especially useful for transformations that help streamline the authoring experience without affecting the final execution of the dataflow. Common examples include:

- **Filtering rows**: Apply filters to reduce the volume of data shown in the preview pane, making it easier to focus on specific records during development.

- **Column selection or removal**: Temporarily hide or remove columns that aren't needed during authoring to simplify the preview layout.

- **Sorting data**: Sort rows to bring relevant records to the top for easier inspection.

- **Grouping or aggregating**: Use grouping to collapse data into summary views that are faster to render in preview.

- **Sample file filtering**: When working with a data source that lists files available through the file-system view, limit the preview to a specific sample file or subset of files to reduce load time.

## Presence in dialogs

Some dialogs in Dataflow Gen2 have experiences that can automatically add preview only steps to expedite the preview evaluation. The current dialogs that offer these experiences are:

- [File system view](#file-system-view)

- [Combine files experience](#combine-files-experience)

### File system view

When you connect data sources that display files—such as SharePoint folder, Folder, Azure Data Lake Gen2, or Azure Blob Storage—a gear icon appears in the top-right corner of the dialog. You can select this icon to define which files to include in the data preview.

:::image type="content" source="media/dataflow-gen2-preview-only-step/file-system-view-experience.png" alt-text="Screenshot of the file system view experience showing a gear icon on the top right to select the logic for the preview only step.":::

### Combine files experience

Similar to the file system view experience, a gear icon appears in the top-right corner of the Combine files dialog. You can use it to define preview-only logic for the sample file, which influences how data is previewed across all combined files.

:::image type="content" source="media/dataflow-gen2-preview-only-step/combine-files-experience.png" alt-text="Screenshot of the combine files experience showing a gear icon on the top right to select the logic for the preview only step." lightbox="media/dataflow-gen2-preview-only-step/combine-files-experience.png":::
