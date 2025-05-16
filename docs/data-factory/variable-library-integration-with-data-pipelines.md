---
title: Variable library integration with Data pipelines (Preview)
description: Learn about how to use Variable library with data pipelines. 
ms.reviewer: whhender
ms.author: noelleli
author: n0elleli
ms.topic: concept-article
ms.custom: pipelines
ms.date: 04/01/2025
---

# Variable library integration with Data pipelines (Preview)



The [Variable library](../cicd/variable-library/variable-library-overview.md) is a new item type in Microsoft Fabric that allows users to define and manage variables at the workspace level, so they could soon be used across various workspace items, such as data pipelines, notebooks, Shortcut for lakehouse and more. It provides a unified and centralized way to manage configurations, reducing the need for hardcoded values and simplifying your CI/CD processes, making it easier to manage configurations across different environments.

> [!NOTE]
>  Variable library and its integration with data pipelines is currently in public preview.


## How to use Variable library with data pipelines

### Create a Variable Library

1. Navigate to your workspace and create a new item.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-new-artifact.png" lightbox="media/variable-library-integration-with-data-pipelines/create-new-artifact.png" alt-text="Screenshot showing where to add a new item in your Fabric workspace highlighted.":::
 
2. Use the filter to find Variable library or scroll down to the Develop data section.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-new-variable-library.png" lightbox="media/variable-library-integration-with-data-pipelines/create-new-variable-library.png" alt-text="Screenshot showing the filter for a new Variable library item.":::
 
3. Select Variable library (preview) to create a new Variable library. Choose a name and hit Create.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/set-variable-library-name.png" lightbox="media/variable-library-integration-with-data-pipelines/set-variable-library-name.png" alt-text="Screenshot showing a new Variable library item with a name set and the Create button highlighted.":::
 
4. Once the Variable library is created, you are taken to the homepage. Click **+ New** to add a new variable.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-new-variables.png" lightbox="media/variable-library-integration-with-data-pipelines/add-new-variables.png" alt-text="Screenshot showing the start page for a new Variable library item.":::

5. Once you add a new variable, you can configure your variable and set the Name, Type, and Default value set. You can also add Notes. 

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/variable-configurations.png" lightbox="media/variable-library-integration-with-data-pipelines/variable-configurations.png" alt-text="Screenshot showing the configurations to set for a new variable.":::

6. Add Alternative value sets as you need (for example, different values for different deployment pipeline environments). After you set a name and click **Create**, you can edit the variable values and choose value set to make active. 

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-value-sets.png" lightbox="media/variable-library-integration-with-data-pipelines/add-value-sets.png" alt-text="Screenshot highlighting where to add new value sets for a variable.":::

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-and-add-value-set.png" lightbox="media/variable-library-integration-with-data-pipelines/create-and-add-value-set.png" alt-text="Screenshot showing how to add a name for a new value set.":::
   
7.	Save your changes once you're done.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/save-variables.png" lightbox="media/variable-library-integration-with-data-pipelines/save-variables.png" alt-text="Screenshot showing the Save button highlighted in the top left corner.":::

### Use Variable library variables in your pipeline

1. To use a Variable library variable in your pipeline, create a new pipeline or navigate to an existing pipeline.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-new-data-pipeline.png" lightbox="media/variable-library-integration-with-data-pipelines/create-new-data-pipeline.png" alt-text="Screenshot highlighting the create new item button in the top left corner and the Data pipeline item highlighted.":::

2. In your data pipeline, you need to create a reference to your variable library variable in the bottom panel.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/new-variable-library-reference-in-pipeline.png" lightbox="media/variable-library-integration-with-data-pipelines/new-variable-library-reference-in-pipeline.png" alt-text="Screenshot highlighting the Library variables (preview) tab and the +New button in the bottom panel of the pipeline canvas.":::

3. After you click **+ New**, you'll need to add a name for your variable reference, then use the drop-down to select your Variable library and Variable name in your Variable library.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-new-variable-library-reference.png" lightbox="media/variable-library-integration-with-data-pipelines/add-new-variable-library-reference.png" alt-text="Screenshot showing the configuration settings for a new Library variable reference.":::

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/configure-new-variable-library-reference.png" lightbox="media/variable-library-integration-with-data-pipelines/configure-new-variable-library-reference.png" alt-text="Screenshot showing the configuration set for a new Library variable reference.":::

4. Once you have added your library variable references, add your pipeline activities. In the activity settings, click **Add dynamic content** for the setting you want to parameterize. 

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-dynamic-content.png" lightbox="media/variable-library-integration-with-data-pipelines/add-dynamic-content.png" alt-text="Screenshot showing Add dynamic content highlighted in the settings of a Lookup activity.":::

5. The expression builder opens. If you don't see **Library variables (preview)**, click the 3 dots next to **Functions** and select **Library variables (preview)**. 

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/pipeline-expression-builder.png" lightbox="media/variable-library-integration-with-data-pipelines/pipeline-expression-builder.png" alt-text="Screenshot showing the 3 dots next to Functions in the expression builder and the Library variables (preview) tab highlighted.":::

6. Click on your Library variable reference to add a new expression to the expression builder. Then, click **Ok** to add your expression. 

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-expression.png" lightbox="media/variable-library-integration-with-data-pipelines/add-expression.png" alt-text="Screenshot showing a Library variable reference highlighted to be added to the expression builder."

      :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-expression-final.png" lightbox="media/variable-library-integration-with-data-pipelines/add-expression-final.png" alt-text="Screenshot showing the expression set in the expression builder.":::

8. You'll now see that the dynamic content is added to your activity setting. 

      :::image type="content" source="media/variable-library-integration-with-data-pipelines/dynamic-content-populated.png" lightbox="media/variable-library-integration-with-data-pipelines/dynamic-content-populated.png" alt-text="Screenshot showing the expression set as dynamic content in the Lookup activity settings.":::

9. Save and run your pipeline as you normally would. You'll see that the value passed is whatever value is set as Active in your Variable library. 

      :::image type="content" source="media/variable-library-integration-with-data-pipelines/save-and-run.png" lightbox="media/variable-library-integration-with-data-pipelines/save-and-run.png" alt-text="Screenshot showing the Save and Run settings highlighted on the pipeline canvas.":::


## Known limitations

The following known limitations apply to the integration of Variable library in pipelines in Data Factory in Microsoft Fabric:

- It is required for you to set a name for your variable reference within the pipeline canvas in order to use your Variable library variables in data pipeline. Unique names must be set for your variable references.
- The Variable library supports Boolean, Datetime, Guid, Integer, Number, and String as data types. In your data pipeline, you will see Boolean as Bool type, Datetime as String type, Guid as String type, Integer as Int type, and String as String type. Number types are not supported in data pipelines. 
- External connection parameterization is supported with variable library integrated with data pipelines. However, you must look up the GUID for your connection from Settings | Manage connections and gateways. There you will find the GUID for your connection by clicking Settings next to your connection name.
- If you choose to parameterize with a library variable, you will not be able to preview your data or use the drop-down selection to see existing tables or files.
- Currently, you're unable to view what value is set for the variable library variable in the pipeline canvas prior to running the pipeline.
- If you make changes in your Variable Library, you might not see new variables or changes to your existing data pipeline references immediately. If that happens, close your pipeline and re-open it. 



## Related content

- [CI/CD for pipelines in Data Factory](../data-factory/cicd-pipelines.md)
- [Parameters in pipelines](../data-factory/parameters.md)
- [Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric](../cicd/cicd-overview.md?source=recommendations)
