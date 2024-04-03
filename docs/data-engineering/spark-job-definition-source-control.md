---
title: Spark Job Definition source control
description: Learn about Spark Job Definition Git integration 
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: conceptual
ms.custom:
ms.date: 04/03/2024
ms.search.form: Spark Job Definition git
---

# Spark Job Definition Git integration 

This article explains how Git integration  work for Spark Job Definition(SJD) in Microsoft Fabric. Learn how to set up a connection to your repository, manage your SJD change via source control, and deploy them across different workspace.

## Spark Job Definition Git integration

Spark Job Definition enable Git integration for source control with Azure DevOps. With this integration, user will be able to track the change of the Spark Job Definition via full git history. If the language selected inside is PySpark or SparkR, the Main definition file and Reference file would be also included as part of the commit. The change to the source code within the Main definition file and Reference file will be tracked as well.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

### Set up a connection

From your workspace settings, you can easily set up a connection to your repo to commit and sync changes. To set up the connection, see [Get started with Git integration](../cicd/git-integration/git-get-started.md). Once connected, your items, including Spark Job Definition, appear in the **Source control** panel.

:::image type="content" source="media\spark-job-definition-source-control\source-control-panel.png" alt-text="Screenshot of workspace source control panel." lightbox="media\spark-job-definition-source-control\source-control-panel.png":::

After you successfully commit the Spark Job Definition item to the Git repo, you see the SJD folder structure in the repo.


### Spark Job Definition representation in Git

The following image is an example of the file structure of each Spark Job Definition item in the repo:

:::image type="content" source="media\spark-job-definition-source-control\spark-job-definition-repo-view.png" alt-text="Screenshot of sjd Git repo file structure." lightbox="media\spark-job-definition-source-control\spark-job-definition-repo-view.png":::

When you commit the Spark Job Definition item to the git repo, for each item, there is a git folder created and named as this schema: name of the item + "SparkJobDefinition". Please do not rename the folder name, as it is used to track the item in the workspace. For example, if the item name is "sjd1", the git folder name would be "sjd1SparkJobDefinition

Inside the git folder, there are two subfolders: `main` and `reference`. The `main` folder contains the main definition file and the `reference` folder contains the reference file.

Besides the main and reference file, there is a `SparkJobDefinitionV1.json` file that contains the metadata of the Spark Job Definition item, please do not modify this file.
The .platform file contains the platform information related to the git setup, please do not modify this file.

> [!NOTE]
>
> - If Java/Scala is selected as the language, the Main definition file and Reference file will not be included in the commit if the file is uploaded as .jar file.
> - The attached environment persists in a SJD when you sync from repo to a Fabric workspace. Currently, cross-workspace reference environments aren't supported. You must manually attach to a new environment or workspace default settings in to run the SJD.
> - The default lakehouse ID persists in the SJD when you sync from the repo to a Fabric workspace. If you commit a notebook with the default lakehouse, you must refer a newly created lakehouse item manually. For more information, see [Lakehouse Git integration](lakehouse-git-deployment-pipelines.md).


## Related content

- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
