---
title: Lifecycle Management of the Microsoft Fabric Variable library
description: Understand how to use variable libraries in the context of lifecycle management and CI/CD.
ms.reviewer: Lee
ms.topic: concept-article
ms.date: 09/06/2026
ms.search.form: CICD and variable library
#customer intent: As a developer, I want to learn how to use a Microsoft Fabric variable library to manage my content lifecycle.
---

# Variable library CI/CD 

Use variable libraries in Fabric to manage configurations across stages of the release pipeline and to save values in Git. This article explains how to use variable libraries in the context of lifecycle management and continuous integration and continuous delivery (CI/CD).

## Variable libraries and deployment pipelines

You can deploy variable libraries and their values in deployment pipelines to manage variable values across stages.

:::image type="content" source="./media/variable-library-cicd/set-variable-library-1.png" alt-text="Screenshot of a deployment pipeline." lightbox="media/variable-library-cicd/set-variable-library-1.png":::

Remember this important information:

- All *value sets* in the variable library are available to all stages of the deployment pipeline, but only one set is active in a stage.
- The *active value set* for each stage is selected independently. You can change it anytime.
- When a variable library is deployed to an empty stage, the deployment creates a workspace where the **Default** value set is active. If the target environment requires another value set, open the variable library in the target workspace, set the required value set as active, and save the variable library before running dependent items or deployment plan actions.

  :::image type="content" source="./media/variable-library-cicd/set-variable-library-2.png" alt-text="Screenshot of the command for changing an active value set from the default to an alternative value set in a deployment pipeline." lightbox="media/variable-library-cicd/set-variable-library-2.png":::

- Although deployments don't affect the *selected active value set* in each stage, you can update the values themselves in the variable library. The consumer item in its workspace (for example, a pipeline) automatically receives the correct value from the active value set.

The following operations to variables or value sets in one stage of a deployment pipeline cause the variable library to be reflected as **Different form source** [compared](../deployment-pipelines/compare-pipeline-content.md) to the same item in a different stage:

- Added, deleted, or edited variables
- Added or deleted value sets
- Names of variables
- Order of variables

:::image type="content" source="./media/variable-library-cicd/variable-library-compare.png" alt-text="Screenshot of compared deployment pipelines with the variable library showing as different in the two stages.":::

A simple change to the active value set doesn't register as **Different form source** when you compare. The active value set is part of the item configuration, but it's not included in the definition. That's why it doesn't appear on the deployment pipeline comparison and isn't overwritten on each deployment.

## Use Variable library values in a deployment plan

A [deployment plan](../deployment-plan/deployment-plan-overview.md) action can use a Variable library reference instead of a literal parameter value. When the deployment runs, Fabric resolves the reference by using the active value set of the Variable library in the target workspace. This allows the same action to use values that are specific to each deployment stage.

Before deploying, make sure the target workspace contains the referenced Variable library and variable, and that the correct value set is active. The deployment doesn't change the active value set. If the deployment creates the target workspace, **Default** is active until you select and save another value set.

For a deployment plan action, you can use a variable reference as the value of a parameter. For more information, see [Pass parameters to an action](../deployment-plan/deployment-plan-actions.md#pass-parameters-to-an-action).

If Fabric can't resolve a reference, it reports which part of the reference failed. For the resolution sequence and fixes, see [Variable reference resolution failures](variable-reference-resolution-failure.md).

## Variable libraries and Git integration

Like other Fabric items, variable libraries can be integrated with Git for source control. Variable library items are stored as folders that you can maintain and sync between Fabric and your Git provider.

Item permissions are checked during Git update and commit.

The active value set selection is workspace state and isn't stored in Git. When initial synchronization imports a variable library into a new workspace, **Default** is active. If the target environment requires another value set, open the imported variable library in the new workspace, set the required value set as active, and save the variable library before running dependent items or deployment plan actions.

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
- [What is a deployment plan?](../deployment-plan/deployment-plan-overview.md)
- [Deployment plan actions](../deployment-plan/deployment-plan-actions.md)
- [Variable reference resolution failures](variable-reference-resolution-failure.md)
