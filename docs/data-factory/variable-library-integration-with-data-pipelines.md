---
title: Variable library integration with pipelines
description: Learn about how to use Variable library with pipelines. 
ms.reviewer: whhender
ms.author: noelleli
author: n0elleli
ms.topic: concept-article
ms.custom: pipelines
ms.date: 10/16/2025
---

# Variable library integration with pipelines

The [Variable library](../cicd/variable-library/variable-library-overview.md) is a new item type in Microsoft Fabric. By using the variable library, you can define and manage variables at the workspace level. You can use these variables across various workspace items, such as pipelines, notebooks, shortcut for lakehouse, and more. It provides a unified and centralized way to manage configurations, reducing the need for hardcoded values and simplifying your CI/CD processes. It's easier to manage configurations across different environments.

## How to use Variable library with pipelines

1. Go to your workspace and create a new item.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-new-artifact.png" lightbox="media/variable-library-integration-with-data-pipelines/create-new-artifact.png" alt-text="Screenshot showing where to add a new item in your Fabric workspace highlighted.":::

1. Use the filter to find Variable library or scroll down to the Develop data section.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-new-variable-library.png" lightbox="media/variable-library-integration-with-data-pipelines/create-new-variable-library.png" alt-text="Screenshot showing the filter for a new Variable library item.":::

1. Select Variable library to create a new Variable library. Enter a name and select **Create**.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/set-variable-library-name.png" lightbox="media/variable-library-integration-with-data-pipelines/set-variable-library-name.png" alt-text="Screenshot showing a new Variable library item with a name set and the Create button highlighted.":::

1. After you create the Variable library, you're taken to the homepage. Select **+ New** to add a new variable.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-new-variables.png" lightbox="media/variable-library-integration-with-data-pipelines/add-new-variables.png" alt-text="Screenshot showing the start page for a new Variable library item.":::

1. When you add a new variable, you can configure your variable and set the Name, Type, and Default value. You can also add Notes. 

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/variable-configurations.png" lightbox="media/variable-library-integration-with-data-pipelines/variable-configurations.png" alt-text="Screenshot showing the configurations to set for a new variable.":::

1. Add Alternative value sets as needed (for example, different values for different deployment pipeline environments). After you set a name and select **Create**, you can edit the variable values and choose which value set to make active. 

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-value-sets.png" lightbox="media/variable-library-integration-with-data-pipelines/add-value-sets.png" alt-text="Screenshot highlighting where to add new value sets for a variable.":::

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-and-add-value-set.png" lightbox="media/variable-library-integration-with-data-pipelines/create-and-add-value-set.png" alt-text="Screenshot showing how to add a name for a new value set.":::

1. Save your changes when you're done.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/save-variables.png" lightbox="media/variable-library-integration-with-data-pipelines/save-variables.png" alt-text="Screenshot showing the Save button highlighted in the top left corner.":::

### Use Variable library variables in your pipeline

1. To use a Variable library variable in your pipeline, create a new pipeline or go to an existing pipeline.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-new-data-pipeline.png" lightbox="media/variable-library-integration-with-data-pipelines/create-new-data-pipeline.png" alt-text="Screenshot highlighting the create new item button in the top left corner and the pipeline item highlighted.":::

1. In your pipeline, create a reference to your variable library variable in the bottom panel.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/new-variable-library-reference-in-pipeline.png" lightbox="media/variable-library-integration-with-data-pipelines/new-variable-library-reference-in-pipeline.png" alt-text="Screenshot highlighting the Library variables tab and the +New button in the bottom panel of the pipeline canvas.":::

1. Select **+ New**. A pop-up opens that shows all your Variable libraries. Use this picker to select your Variable library variable and select **Ok**.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-new-variable-library-reference.png" lightbox="media/variable-library-integration-with-data-pipelines/add-new-variable-library-reference.png" alt-text="Screenshot showing the +New button in the Library variable tab highlighted.":::

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/configure-new-variable-library-reference.png" lightbox="media/variable-library-integration-with-data-pipelines/configure-new-variable-library-reference.png" alt-text="Screenshot showing a Library variable selected in the variable picker.":::

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/pipeline-library-reference.png" lightbox="media/variable-library-integration-with-data-pipelines/pipeline-library-reference.png" alt-text="Screenshot showing the configuration set for a new Library variable reference.":::

1. After you add your library variable references, add your pipeline activities. In the activity settings, select **Add dynamic content** for the setting you want to parameterize.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-dynamic-content.png" lightbox="media/variable-library-integration-with-data-pipelines/add-dynamic-content.png" alt-text="Screenshot showing Add dynamic content highlighted in the settings of a Lookup activity.":::

1. The expression builder opens. If you don't see **Library variables**, select the three dots next to **Functions** and select **Library variables**. 

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/pipeline-expression-builder.png" lightbox="media/variable-library-integration-with-data-pipelines/pipeline-expression-builder.png" alt-text="Screenshot showing the 3 dots next to Functions in the expression builder and the Library variables tab highlighted.":::

1. Select your Library variable reference to add a new expression to the expression builder. Then, select **Ok** to add your expression. 

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-expression.png" lightbox="media/variable-library-integration-with-data-pipelines/add-expression.png" alt-text="Screenshot showing a Library variable reference highlighted to be added to the expression builder.":::

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-expression-final.png" lightbox="media/variable-library-integration-with-data-pipelines/add-expression-final.png" alt-text="Screenshot showing the expression set in the expression builder.":::

1. You see that the dynamic content is added to your activity setting.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/dynamic-content-populated.png" lightbox="media/variable-library-integration-with-data-pipelines/dynamic-content-populated.png" alt-text="Screenshot showing the expression set as dynamic content in the Lookup activity settings.":::

1. You can preview your data by selecting **Preview data**. This action opens a new pane that shows the value of your library variable. Select **Ok** to get a preview of your data.

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/preview-data.png" lightbox="media/variable-library-integration-with-data-pipelines/preview-data.png" alt-text="Screenshot showing the preview data option.":::

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/preview-data-pane.png" lightbox="media/variable-library-integration-with-data-pipelines/preview-data-pane.png" alt-text="Screenshot showing the preview data pane.":::

1. Save and run your pipeline as you normally would. You see that the value passed is whatever value is set as Active in your Variable library. 

    :::image type="content" source="media/variable-library-integration-with-data-pipelines/save-and-run.png" lightbox="media/variable-library-integration-with-data-pipelines/save-and-run.png" alt-text="Screenshot showing the Save and Run settings highlighted on the pipeline canvas.":::

## Known limitations

The following known limitations apply to the integration of Variable library in pipelines in Data Factory in Microsoft Fabric:

- The Variable library supports Boolean, Datetime, Guid, Integer, Number, and String as data types. In your pipeline, you see Boolean as Bool type, Datetime as String type, Guid as String type, Integer as Int type, and String as String type. Number types aren't supported in pipelines. 
- External connection parameterization is supported by using the variable library integrated with pipelines. However, you must look up the GUID for your connection from **Settings** | **Manage connections and gateways**. You find the GUID for your connection by selecting **Settings** next to your connection name.

## Related content

- [CI/CD for pipelines in Data Factory](../data-factory/cicd-pipelines.md)
- [Parameters in pipelines](../data-factory/parameters.md)
- [Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric](../cicd/cicd-overview.md?source=recommendations)
