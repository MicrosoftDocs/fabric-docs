---
title: Lifecycle Management of the Microsoft Fabric Variable library
description: Understand how to use variable libraries in the context of lifecycle management and CI/CD.
author: billmath
ms.author: billmath
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 04/23/2025
ms.search.form: CICD and variable library
#customer intent: As a developer, I want to learn how to use a Microsoft Fabric variable library to manage my content lifecycle.
---

# Variable library CI/CD (preview)

Variable libraries make it easy to manage configurations across different stages of the release pipeline and to save values in Git. This article explains how to use variable libraries in the context of lifecycle management and CI/CD.

## Variable libraries and deployment pipelines

Variable libraries and their values can be deployed in deployment pipelines to manage variable values across different stages.

:::image type="content" source="./media/variable-library-cicd/set-variable-library-1.png" alt-text="Screenshot of deployment pipeline." lightbox="media/variable-library-cicd/set-variable-library-1.png":::
:::

The following is important information to remember:

- All **value sets** in the variable library are available to all stages of the deployment pipeline, but only one is active in a stage.
- The **active value set** for each stage is selected independently and can be changed anytime.
- By default, when first deployed/commited, the variable librarie's active set is, set to be the default value. You can change this by accessing the newly created variable library in the target stage/repo and changing the active set.

:::image type="content" source="./media/variable-library-cicd/set-variable-library-2.png" alt-text="Screenshot of compare in deployment pipelines showing active set." lightbox="media/variable-library-cicd/set-variable-library-2.png":::
:::

- While the *selected active value set* in each stage is unaffected by deployments, the values themselves can be updated in the variable library. The consumer item in its workspace (for example, a pipeline) automatically receives the correct value from the active value set.

The following operations to variables or value sets in one stage of a deployment pipeline, cause the variable library to be reflected as *different* [compared](../deployment-pipelines/compare-pipeline-content.md) to the same item in a different stage.

- added, deleted, or edited variables
- added or deleted value sets
- names of variables
- order of variables

:::image type="content" source="./media/variable-library-cicd/variable-library-compare.png" alt-text="Screenshot of compare in deployment pipelines with the variable library showing as different in the two stages.":::

A simple change to the **active value set** doesn't register as *different* when you compare, since the active value set is part of the item configuration, but it is not included in its definition. This is why it is not shown on the Deployment pipeline 'Compare' and not overwritten on each deployment.

## Variable libraries and Git integration

Like other Fabric items, variable libraries can be integrated with Git for source control. Variable library items are stored as folders that can be maintained and synced between Fabric and your Git provider.

Item permissions are checked during Git Update and commit.

The variable library item schema is a JSON object that contains four parts:

- [Value sets](#value-set) folder
- [Settings](#settings)
- [platform.json](/rest/api/fabric/articles/item-management/definitions/item-definition-overview#platform-file): Automatically generated file
- [Variables](#variables)

:::image type="content" source="./media/variable-library-cicd/git-files.png" alt-text="Screenshot of Git folder with variable library files in it.":::

### Value set

The variable library folder contains a subfolder called valueSets. This folder contains a JSON file for each value set. This JSON file contains only the variable values for *non default* values in that value set. (The default values are in the [variables.json](#variables) file.)

For more information about the value set file, including an example, see [value set example](/rest/api/fabric/articles/item-management/definitions/variable-library-definition#valueset).

Values for variables not in this file are taken from the default value set.

### Settings

The settings.json file contains settings for the variable library.

For a sample settings file, see [settings.json example](/rest/api/fabric/articles/item-management/definitions/variable-library-definition#settingsjson-example-).

### Variables

The variables.json file contains the variable names and their default values.

For more information about the variables file, including an example, see [variables.json example](/rest/api/fabric/articles/item-management/definitions/variable-library-definition#variables).

## Considerations and limitations

 [!INCLUDE [limitations](../includes/variable-library-limitations.md)]

## Related content

- [Git integration source code format](../git-integration/source-code-format.md)
