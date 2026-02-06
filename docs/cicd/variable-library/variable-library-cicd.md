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
ms.date: 12/15/2025
ms.search.form: CICD and variable library
#customer intent: As a developer, I want to learn how to use a Microsoft Fabric variable library to manage my content lifecycle.
---

# Variable library CI/CD 

You can use Microsoft Fabric variable libraries to manage configurations across stages of the release pipeline and to save values in Git. This article explains how to use variable libraries in the context of lifecycle management and continuous integration and continuous delivery (CI/CD).

## Variable libraries and deployment pipelines

You can deploy variable libraries and their values in deployment pipelines to manage variable values across stages.

:::image type="content" source="./media/variable-library-cicd/set-variable-library-1.png" alt-text="Screenshot of a deployment pipeline." lightbox="media/variable-library-cicd/set-variable-library-1.png":::

Remember this important information:

- All *value sets* in the variable library are available to all stages of the deployment pipeline, but only one set is active in a stage.
- The *active value set* for each stage is selected independently. You can change it anytime.
- When you first deploy or commit a variable library, the library's active set has the default value. You can change this value by accessing the newly created variable library in the target stage or repository and changing the active set.

  :::image type="content" source="./media/variable-library-cicd/set-variable-library-2.png" alt-text="Screenshot of the command for changing an active value set from the default to an alternative value set in a deployment pipeline." lightbox="media/variable-library-cicd/set-variable-library-2.png":::

- Although deployments don't affect the *selected active value set* in each stage, you can update the values themselves in the variable library. The consumer item in its workspace (for example, a pipeline) automatically receives the correct value from the active value set.

The following operations to variables or value sets in one stage of a deployment pipeline cause the variable library to be reflected as **Different form source** [compared](../deployment-pipelines/compare-pipeline-content.md) to the same item in a different stage:

- Added, deleted, or edited variables
- Added or deleted value sets
- Names of variables
- Order of variables

:::image type="content" source="./media/variable-library-cicd/variable-library-compare.png" alt-text="Screenshot of compared deployment pipelines with the variable library showing as different in the two stages.":::

A simple change to the active value set doesn't register as **Different form source** when you compare. The active value set is part of the item configuration, but it's not included in the definition. That's why it doesn't appear on the deployment pipeline comparison and isn't overwritten on each deployment.

## Variable libraries and Git integration

Like other Fabric items, variable libraries can be integrated with Git for source control. Variable library items are stored as folders that you can maintain and sync between Fabric and your Git provider.

Item permissions are checked during Git update and commit.

The schema for the variable library item is a JSON object that contains four parts:

- Folder for value sets
- Settings
- [Platform.json](/rest/api/fabric/articles/item-management/definitions/item-definition-overview#platform-file), an automatically generated file
- Variables

:::image type="content" source="./media/variable-library-cicd/git-files.png" alt-text="Screenshot of a Git folder with variable library files in it.":::

### Value sets

The variable library folder contains a subfolder called `valueSets`. This folder contains a JSON file for each value set. This JSON file contains only the variable values for *non-default* values in that value set.

For more information about the value set file, see [value sets](value-sets.md) and the [value set example](/rest/api/fabric/articles/item-management/definitions/variable-library-definition#valueset).

Values for variables not in this file are taken from the default value set.

### Settings

The `settings.json` file contains settings for the variable library.

For more information, see [variables](variable-types.md) and the [settings.json example](/rest/api/fabric/articles/item-management/definitions/variable-library-definition#settingsjson-example-).

### Variables

The `variables.json` file contains the variable names and their default values.

For more information, see the [variables.json example](/rest/api/fabric/articles/item-management/definitions/variable-library-definition#variables).

## Considerations and limitations

[!INCLUDE [limitations](../includes/variable-library-limitations.md)]

## Related content

- [Git integration source code format](../git-integration/source-code-format.md)
