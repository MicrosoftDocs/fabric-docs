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
ms.date: 08/15/2024
ms.search.form: Variable libraries, CI/CD
#customer intent: As a developer, I want to learn how to use the Microsoft Fabric Variable library tool to manage my content lifecycle.
---

# Variable library CI/CD (preview)

Variable libraries make it easy to manage configurations across different stages of the release pipeline and to save values in Git. This article explains how to use Variable libraries in the context of lifecycle management and CI/CD.

## Variable libraries and deployment pipelines

Variable libraries and their values can be deployed in deployment pipelines to manage variable values across different stages. Each stage has its own active value set which can be changed at any time.

* Permissions for Item reference are checked during deployment.
* If you update the Variable library or any of its variables, the item will appear as different in a granular compare.

:::image type="content" source="./media/variable-library-cicd/variable-library-compare.png" alt-text="Screenshot of granlar compare in deployment pipelines with the variable library showing as different in the two stages.":::

## Variable libraries and Git integration

Variable library items are stored as folders that can be maintained and synced between Fabric and your Git provider. The files and subfolders here represent a Variable library. Depending on your project, the Variable library folder can include:

* Variable library name

  * [Value sets](#value-set): Contains a JSON file for each value set.
  * platform.json: [Automatically generated](../git-integration/source-code-format.md#platform-file) file.
  * [variables.json](#variables): Contains the variables and their default values.

### Variables

The variables.json file contains the variables and their default values. For example:

```json
{
  "variables": [
    {
      "name": "WaitTime",
      "type": "integer",
      "defaultValue": "1",
      "note": "Wait time in minutes"
    }
  ]
}
```

### Value set

The variable library folder contains a subfolder called ValueSets. This subfolder contains a JSON file for each value set. The JSON file contains only the variable values for non default values in that value set. For example:

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

Item permissions are checked during Git Update and commit.

## Related content

* [Git integration source code format](..//git-integration/git-integration-source-code-format.md)