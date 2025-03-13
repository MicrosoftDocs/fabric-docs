---
title: Lifecycle management of the Microsoft Fabric Variable library
description: Understand how to use Variable libraries in the context of lifecycle management and CI/CD.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 02/11/2025
ms.search.form: CI/CD and Variable library
#customer intent: As a developer, I want to learn how to use the Microsoft Fabric Variable library tool to manage my content lifecycle.
---

# Variable library CI/CD (preview)

Variable libraries make it easy to manage configurations across different stages of the release pipeline and to save values in Git. This article explains how to use Variable libraries in the context of lifecycle management and CI/CD.

## Variable libraries and deployment pipelines

Variable libraries and their values can be deployed in deployment pipelines to manage variable values across different stages. Each stage has its own active value set which can be changed at any time. The active value set in each stage is unaffected by deployments.

<!--- * Permissions for Item reference are checked during deployment.
* --->

If you update the Variable library variables or value set, the item will appear as different in a when you [compare](../deployment-pipelines/compare-pipeline-content.md) them.
For example, the following changes in the Variable library are reflected as *different* in the deployment pipeline:

* added, deleted or edited variables
* added or deleted value sets
* names of variables
* order of variables

:::image type="content" source="./media/variable-library-cicd/variable-library-compare.png" alt-text="Screenshot of compare in deployment pipelines with the variable library showing as different in the two stages.":::

Changes to the **active** value set doesn't register as in a *different* when you compare since the active value set is stored in the deployment pipeline, and not in the Variable library itself.

## Variable libraries and Git integration

Like other Fabric items, Variable libraries can be integrated with Git for source control. Variable library items are stored as folders that can be maintained and synced between Fabric and your Git provider.

Item permissions are checked during Git Update and commit.

The Variable library item schema is a JSON object that contains three parts:

* [Variables](#variables)
* [Value-sets](#value-set) folder
* [platform.json](../git-integration/source-code-format.md#platform-file): Automatically generated file

:::image type="content" source="./media/variable-library-cicd/git-files.png" alt-text="Screenshot of Git folder with variable library files in it.":::

### Variables

The variables.json file contains the variable names and their default values: 

* name
* type
* defaultValue
* note (optional)

For example:

```json
{
  "variables": [
    {
      "name": "WaitTime",
      "type": "integer",
      "defaultValue": 1,
      "note": "Wait time in minutes"
    },
    {
      "name": "var2",
      "type": "string",
      "defaultValue": "value2"
    }
  ],
}
```

### Value set

The variable library folder contains a subfolder called ValueSets. This folder contains a JSON file for each value set. The JSON file contains only the variable values for *non default* values in that value set. 

* name
* value

For example:

```json
{
  "name": "TestVL",
  "variableOverrides": [
    {
      "name": "WaitTime",
      "value": "3"
    }
  ]
}
```

Values for variables not in this file are taken from the default value set.

## Considerations and limitations

 [!INCLUDE [limitations](./includes/variable-library-limitations.md)]

## Related content

* [Git integration source code format](../git-integration/source-code-format.md)