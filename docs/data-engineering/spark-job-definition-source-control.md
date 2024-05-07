---
title: Spark Job Definition source control
description: Learn about Spark Job Definition Git integration 
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: conceptual
ms.date: 04/03/2024
ms.search.form: Spark Job Definition git
---

# Spark Job Definition Git integration 

This article explains how Git integration for Spark Job Definitions (SJD) in Microsoft Fabric works. Learn how to set up a repository connection, manage Spark job definition changes through source control, and deploy them across various workspaces.


Enabling Git integration for Spark job definitions in Azure DevOps allows you to track changes via full git history. If PySpark or SparkR is selected, the main definition file and reference file are included as part of the commit. The changes to the source code within these files is tracked as well.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

### Set up a connection

From your workspace settings, you can easily set up a connection to your repo to commit and sync changes. To set up the connection, see [Get started with Git integration](../cicd/git-integration/git-get-started.md) article. Once connected, your items, such as Spark job definitions, will be visible in the **Source control** panel.

:::image type="content" source="media\spark-job-definition-source-control\source-control-panel.png" alt-text="Screenshot of workspace source control panel." lightbox="media\spark-job-definition-source-control\source-control-panel.png":::

Once you commit the Spark job definition to the Git repo, the job definition folder structure appears in the repository.


### Spark Job Definition representation in Git

The following image is an example of the file structure of each Spark job definition item in the repo:

:::image type="content" source="media\spark-job-definition-source-control\spark-job-definition-repo-view.png" alt-text="Screenshot of sjd Git repo file structure." lightbox="media\spark-job-definition-source-control\spark-job-definition-repo-view.png":::

When you commit the Spark job definition item to the repo, a git folder is created for each item and named according to this schema: \<Item name\> + "SparkJobDefinition". Don't rename the folder as it is used to track the item in the workspace. For example, if the item name is "sjd1", the git folder name would be "sjd1SparkJobDefinition".

There are two subfolders within the git folder. They are the *main* and the *reference*. The *main* folder contains the main definition file and the *reference* folder contains the reference file.

In addition to the main and reference files, there's also a *SparkJobDefinitionV1.json* file. It holds the metadata for the Spark job definition item, so don't modify it.
The *.platform* file contains the platform information related to Git setup> it shouldn't be modified too.

> [!NOTE]
>
> - If you choose Java or Scala as the language, the main and reference files won't be committed when uploaded as a .jar file.
> - The attached environment persists in a Spark job definition after syncing from the repository to a Fabric workspace. Currently, cross-workspace reference environments aren't supported. You must manually attach to a new environment or use workspace default settings to run the job definition.
> - The Spark job definition retains the default lakehouse ID when syncing from the repository to a Fabric workspace. If you commit a notebook with the default lakehouse, you'll need to manually reference a newly created lakehouse item. For more information, see [Lakehouse Git integration](lakehouse-git-deployment-pipelines.md).


## Related content

- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
