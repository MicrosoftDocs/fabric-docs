---
title: Fabric environment Git integration and deployment pipeline
description: Learn about the Git integration and deployment pipeline for Microsoft Fabric environments, including how to connect Azure DevOps.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 07/14/2024
ms.search.for: Fabric environment Git integration and deployment pipeline
---

# Environment Git integration and deployment pipeline

This article describes how to use Git integration and deployment pipelines for environment in Microsoft Fabric.

## Git integration for Microsoft Fabric environment

Microsoft Fabric supports Git integration, allowing developers to backup, control versions, revert to previous stages, and collaborate on their work using Git branches.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

> [!NOTE]
>
> - Currently, Git supports only Libraries and Spark compute, including Spark runtime.
> - The Git integration manages the **staging state** of the environment, to apply changes made in Git to the environment, they must be **published**. It's recommended to publish after updating the environment from Git to ensure the effectiveness of the configuration. You can use the [Publish API of environment](environment-public-api.md#make-the-changes-effective) to **publish changes through REST API** if you prefer the code-first experience.
> - The attached **custom pool** persists in an environment when you sync from repo to a Fabric workspace. The pool definition is in the workspace setting and cross-workspace reference the pool is not supported. You must **manually update** the *instance_pool_id* to an existing custom pool in your destination workspace space or revert to Starter pool by remove this property. You can refer to [Custom Pools - List Workspace Custom Pools](/rest/api/fabric/spark/custom-pools/list-workspace-custom-pools) to get the full list of available pool in the destination workspace by REST API, or refer to [Custom Pools - Create Workspace Custom Pool](/rest/api/fabric/spark/custom-pools/create-workspace-custom-pool) to create a new custom pool.
> - Each commit has as upper limit of 150 MB. Custom libraries larger than 150 MB aren't currently supported through Git.

### Connect the Fabric workspace to an Azure DevOps repository

If you are the admin of a workspace, navigate to the workspace settings, and set up the connection in **Source control** section. To learn more, see [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).

After connecting, you can find items including the environments syncing with the repo.

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-git-connected-to-repo.png" alt-text="Screenshot of successfully connecting the workspace to an Azure DevOps repo." lightbox="media\environment-git-and-deployment-pipeline\environment-git-connected-to-repo.png":::

### Local representation of an environment in Git

In the item root folder, environments are organized with a **Libraries** folder that contains **PublicLibraries** and **CustomLibraries** sub-folders, along with the **Setting** folder.

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-git-representation.png" alt-text="Screenshot of the local representation of the environment in Git.":::

#### Libraries

When you commit an environment to Git, the **public library** section is transformed into its YAML representation. Additionally, the **custom library** is committed along with its source file.

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-git-representation-public-library.png" alt-text="Screenshot of the public library local representation of the environment in Git.":::

You can update the public library by editing the YAML representation. Just like the portal experience, you can specify a library from PyPI and conda. You can specify the library with expected version, a version range or without version. The system can help you determine a version that is compatible with other dependencies in your environment. To clear all the existing public libraries, delete the YAML file.

You can update the custom library by adding new files or deleting existing files directly.

> [!NOTE]
> You can bring your own YAML file to manage the public library. The file name needs to be ***environment.yml*** to be recognized correctly by the system.

#### Spark compute

The Spark compute section is transformed into the YAML representation as well. Within this YAML file, you can switch the attached **pool**, fine-tune **compute configurations**, manage **Spark properties**, and select the desired **Spark runtime**.

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-git-representation-spark-compute.png" alt-text="Screenshot of the Spark compute local representation of the environment in Git.":::

## Deployment pipeline for environment

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Fabric’s deployment pipelines simplify the process of delivering modified content across different phases, such as moving from development to test. The automatic pipeline can include the environment items to stream the re-creation process.

You can set up a deployment pipeline by assigning the workspaces with different phases. Learn more on [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-deployment-pipeline.png" alt-text="Screenshot of deploying environment in deployment pipeline." lightbox="media\environment-git-and-deployment-pipeline\environment-deployment-pipeline.png":::

You can find the deploying status after setting up the pipeline successfully. After clicking the **Deploy** button with environment selected, all contents of the environment are deployed to the destination workspaces. The status of the original environment is preserved in this process, meaning the published configurations stay in published state and require no extra publishing.

> [!IMPORTANT]
>
> - The **custom pool** is currently not supported in deployment pipeline. If the environment selects the custom pool, the configurations of **Compute** section in the destination environment are set with default values. In this case, the environments keep showing diff in deployment pipeline even the deployment is done successfully.
> - Using deployment rules to specify different pool in new workspace will be included in upcoming release.

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md).
- [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).
- [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).
