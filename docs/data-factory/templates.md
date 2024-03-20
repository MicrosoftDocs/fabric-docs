---
title: Templates
description: Learn about templates for Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.author: jburchel
author: jonburchel
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Pipeline Template
---

# Templates for Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

Templates are pre-defined pipelines that allow you to get started quickly with Data Factory. These templates help to reduce development time by providing an easy way to create pipelines for common data integration scenarios.  

:::image type="content" source="media/templates/templates-list.png" lightbox="media/templates/templates-list.png" alt-text="Screenshot showing the templates browser in [!INCLUDE [product-name](../includes/product-name.md)].":::

## How to build a pipeline from a template

1. To get started with a template, start by selecting **New** and then **Data pipeline**.

   :::image type="content" source="media/templates/new-data-pipeline.png" alt-text="Screenshot showing the new data pipeline button.":::

1. Set a name for your new pipeline and select **Create**.  The pipeline editor window opens.
1. Select **Choose a task to start**.

   :::image type="content" source="media/templates/choose-task-to-start.png" alt-text="Screenshot showing the pipeline editor window with the Choose a task to start button highlighted.":::

1. The template browser appears.  Select the **Copy data from ADLS Gen2 to Lakehouse Table** template, and then select **Next**.

   :::image type="content" source="media/templates/templates-list-with-template-selected.png" lightbox="media/templates/templates-list-with-template-selected.png" alt-text="Screenshot showing the templates browser and the Copy data from ADLS Gen2 to Lakehouse Table template selected.":::

1. Select from the drop-down list your source and destination connections or use **+ New** to create a new connection.

   :::image type="content" source="media/templates/source-destination-configuration-in-template.png" lightbox="media/templates/source-destination-configuration-in-template.png" alt-text="Screenshot showing the template source and destination connections configuration and the New button to create a new connection.":::

1. After making your selections or creating new connections, select the **Use this template** button to generate a new pipeline directly.
1. The pipeline is created using the connections you set.  You can view the newly created pipeline in the pipeline editor, where you can use the **Run** and **Schedule** buttons to control its execution.

   :::image type="content" source="media/templates/pipeline-editor.png" lightbox="media/templates/pipeline-editor.png" alt-text="Screenshot showing the pipeline editor with the Run and Schedule buttons highlighted in the toolbar of the Home tab.":::

1. Initially the new Copy activity is highlighted on the editor canvas, and its properties shown in the properties pane at the bottom of the editor.
1. When you select the background of the pipeline canvas, you can see the general pipeline properties in the properties pane, where you can add or edit existing parameters.

   :::image type="content" source="media/templates/pipeline-properties.png" alt-text="Screenshot showing the pipeline properties with the Parameters tab selected and several parameters added.":::

1. When you're done, save your edits by selecting the save button on the toolbar of the **Home** tab.

   :::image type="content" source="media/templates/save-button.png" alt-text="Screenshot of the Home tab of the pipeline editor with the Save button selected.":::

1. Now you can run your pipeline, providing values for any parameters as required.

   :::image type="content" source="media/templates/run-with-parameters.png" lightbox="media/templates/run-with-parameters.png" alt-text="Screenshot showing the Pipeline run dialog with parameters specified.":::

## Related content

- [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
