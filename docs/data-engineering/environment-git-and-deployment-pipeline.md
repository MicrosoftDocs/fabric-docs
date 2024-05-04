---
title: Fabric environment Git integration and deployment pipeline
description: Learn the Git integration and deployment pipeline for environment.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 05/01/2024
ms.search.for: Fabric environment Git integration and deployment pipeline
---

# Environment Git integration and deployment pipeline

This article describe how to use Git integration and deployment pipeline for environment in Microsoft Fabric.

## Git integration for environment

Microsoft Fabric provides the Git integration ability for developers. With Git, you can backup and version the work, revert the item to previous stages as needed and collaborate with others or work alone using Git branches.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

> [!NOTE]
>
> - Currently, only Libraries and Spark compute, which includes Spark runtime, are supported through Git.
> - The Git integration is manipulating with the **staging state** of the environment, meaning that the published and saved configurations are both checking in Git.
> - The changes from Git to environment item in portal need to **publish** to become effective. It's recommend to perform a publish after updating the environment from Git to ensure the effectiveness of the configuration.
> - If you prefer code-first experience, you can use [Publish API of environment](environment-public-APIs.md#make-the-changes-effective) to publish the changes from Git without triggering publish through UI.
> - Each commit has up to 150 MB as upper limit. The custom library, which size is larger than 150 MB is currently not supported through Git.

### Connect the Fabric workspace to an Azure DevOps repository

If you are the admin of the workspace, you can set-up the connection in **Source control** section at the workspace setting. Learn more on [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).

After connecting successfully, your can find the items including the environments syncing with the repo.

:::image type="content" source="media\environment-git-and-deployment-pipeline\env-git-connected-to-repo.png" alt-text="Screenshot of successfully connecting the workspace to an Azure DevOps repo":::

### Local representation of an environment in Git

Within the item root folder, environments are structured with a **Libraries** folder containing **PublicLibraries** and **CustomLibraries** sub-folders, alongside the **Setting** folder.

:::image type="content" source="media\environment-git-and-deployment-pipeline\env-git-representation.png" alt-text="Screenshot of the local representation of the environment in Git":::

#### Libraries

When you commit an environment to Git, the **public library** section is transformed into its YAML representation. Additionally, the **custom library** is committed along with its source file.

:::image type="content" source="media\environment-git-and-deployment-pipeline\env-git-representation-public-library.png" alt-text="Screenshot of the public library local representation of the environment in Git":::

You can update the public library by editing the YAML representation. Like the experience in the portal, you can specify a library from PyPI and conda. You can specify the library with expected version, a version range or without version. The system can help to determine a version that is compatible with other dependencies in your environment. By deleting the YAML file, you can clear all the existing public libraries.

You can update the custom library by adding new files or deleting existing files directly.

> [!NOTE]
> You can bring your own YAML file to manage the public library. The file name needs to be ***environment.yml*** to be recognized correctly by the system.

#### Spark compute

The Spark compute section is transformed into the YAML representation as well. Within this YAML file, you can switch the attached **pool**, fine-tune **compute configurations**, manage **Spark properties**, and select the desired **Spark runtime**.

:::image type="content" source="media\environment-git-and-deployment-pipeline\env-git-representation-spark-compute.png" alt-text="Screenshot of the Spark compute local representation of the environment in Git":::

> [!NOTE]
>
> The pool information doesn't appear if the environment uses the **Starter pool**. If you want to use a **custom pool** in the environment, you can add the ***instance_pool_id*** section with the expected pool ID in the YAML file.

## Deployment pipeline for environment

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Fabric’s deployment pipelines simplify the process of delivering modified content across different phases, such as moving from development to test. The automatic pipeline can include the environment items to stream the re-creation process.

You can set up a deployment pipeline by assigning the workspaces with different phases. Learn more on [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

:::image type="content" source="media\environment-git-and-deployment-pipeline\env-deployment-pipeline.png" alt-text="{alt-text}":::

You can find the deploying status after setting up the pipeline successfully. After clicking the **Deploy** button with environment selected, all contents of the environment are deployed to the destination workspaces. The status of the original environment is preserved in this process, meaning the published configurations stay in published state and require no extra publishing.

> [!IMPORTANT]
>
> The **custom pool** is currently not supported in deployment pipeline. If the environment selects the custom pool, the configurations of **Compute** section in the destination environment are set with default values. Using deployment rules to specify different pool in new workspace will be included in upcoming release.

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md).
- [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).
- [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).
