---
title: Variable library integration with Data pipelines (Preview)
description: Learn about how to use Variable library with data pipelines. 
ms.reviewer: 
ms.author: noelleli
author: n0elleli
ms.topic: conceptual
ms.custom:
ms.date: 03/18/2025
---

# Variable library integration with Data pipelines (Preview)

This document describes how to use Variable library in your pipelines in Data Factory in Fabric.

## Introduction

The Variable library is a new item type in Microsoft Fabric that allows users to define and manage variables at the workspace level, so they could soon be used across various workspace items, such as data pipelines, notebooks, Shortcut for lakehouse and more. It provides a unified and centralized way to manage configurations, reducing the need for hardcoded values and simplifying your CI/CD processes, making it easier to manage configurations across different environments.

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
 
4. Once the Variable library is created, you will be taken to the homepage. Click **+ New** to add a new variable.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-new-variables.png" lightbox="media/variable-library-integration-with-data-pipelines/add-new-variables.png" alt-text="Screenshot showing the start page for a new Variable library item.":::

5. Once you add a new variable, you can configure your variable and set the Name, Type, and Default value set. You can also add Notes. 

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/variable-configurations.png" lightbox="media/variable-library-integration-with-data-pipelines/variable-configurations.png" alt-text="Screenshot showing the configurations to set for a new variable.":::

6. Add Alternative value sets as you need (e.g. different values for different deployment pipeline environments). After you set a name and click **Create**, you can edit the variable values and choose value set to make active. 

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/add-value-sets.png" lightbox="media/variable-library-integration-with-data-pipelines/add-value-sets.png" alt-text="Screenshot highlighting where to add new value sets for a variable.":::

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/create-and-add-value-set.png" lightbox="media/variable-library-integration-with-data-pipelines/create-and-add-value-set.png" alt-text="Screenshot showing how to add a name for a new value set.":::
   
7.	Save your changes once you're done.

   :::image type="content" source="media/variable-library-integration-with-data-pipelines/save-variables.png" lightbox="media/variable-library-integration-with-data-pipelines/save-variables.png" alt-text="Screenshot showing the Save button highlighted in the top left corner.":::

### Use Variable library variables in your pipeline

1. Create a new pipeline or navigate to an existing pipeline.


2. Create a reference to your variable library variables.


3. Add your pipeline activities.


4. Use the expression builder to select your Library variables.


5. Run your pipeline and verify that it runs successfully and that the variable value is the same as it is in your Variable library. 



## Known limitations

The following known limitations apply to the integration of Variable library in pipelines in Data Factory in Microsoft Fabric:

- It is required for you to set a name for your variable reference within the pipeline canvas in order to use your Variable library variables in data pipeline. Unique names must be set for your variable references.
- Connection parameterization is **not** supported with Variable library integrated with data pipelines. You can, however, parameterize internal workspace artifact IDs which includes Lakehouse, Warehouse, KQL Database, SQL Database (preview). 
- Currently, you are unable to view what value has been set for the Variable library variable in the pipeline canvas. 



## Related content

- [CI/CD for pipelines in Data Factory](../datafactory/cicd-pipelines.md)
- [Parameters in pipelines](../datafactory/parameters.md)
- [Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric](../cicd/cicd-overview.md?source=recommendations)
