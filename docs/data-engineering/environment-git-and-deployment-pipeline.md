---
title: Fabric environment Git integration and deployment pipeline
description: Learn about the Git integration and deployment pipeline for Microsoft Fabric environments, including how to connect Azure DevOps.
ms.reviewer: shuaijunye
ms.topic: how-to
ms.date: 03/25/2026
ms.search.form: Fabric environment Git integration and deployment pipeline
---

# Use Git integration and deployment pipelines for environments

When you configure an environment in the Fabric portal — adding libraries, selecting a Spark runtime, tuning compute settings — those choices live only in the Fabric service. If someone accidentally changes a setting or you need to reproduce the environment in another workspace, there's no built-in history to fall back on.

Git integration and deployment pipelines solve this problem. By connecting your workspace to a Git repo, you get version history, branching, and code review for your environment configuration, just like you would for application code. Deployment pipelines then let you promote a tested environment across stages (for example, from development to test to production) without manually recreating it.

## Integrate Git for Fabric environments

Git integration lets you back up, version, and collaborate on your environment configuration through Git branches. When you connect a workspace to a Git repo, Fabric serializes the environment's libraries and Spark compute settings (including the Spark runtime) into files that Git can track. Other environment components aren't included in Git at this time.

Changes you make in Git are synced to the environment's *staging* state — they don't take effect until you publish. Publish after every Git sync to ensure the live environment reflects your changes. If you prefer a code-first workflow, you can publish through the [Environment Publish API](environment-public-api.md#make-the-changes-effective).

Keep the following considerations in mind:

- **Custom pool references** — When you sync an environment from a repo to a different workspace, the attached custom pool ID is preserved as-is. Because pool definitions are workspace-scoped, cross-workspace references don't resolve. Update *instance_pool_id* in the synced file to an existing pool in the destination workspace, or remove the property to revert to a starter pool. You can list available pools with the [List Workspace Custom Pools API](/rest/api/fabric/spark/custom-pools/list-workspace-custom-pools) or create one with the [Create Workspace Custom Pool API](/rest/api/fabric/spark/custom-pools/create-workspace-custom-pool).
- **Commit size limit** — Each commit is limited to 150 MB. Custom libraries larger than 150 MB can't be committed through Git.

## Connect the Fabric workspace to an Azure DevOps repository

If you're the admin of a workspace, go to **Workspace settings** and set up the connection in the **Source control** section. To learn more, see [Manage a workspace with Git](../cicd/git-integration/git-get-started.md).

After you connect, you can find items, including the environments that are syncing with the repo.

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-git-connected-to-repo.png" alt-text="Screenshot that shows successfully connecting the workspace to an Azure DevOps repo." lightbox="media\environment-git-and-deployment-pipeline\environment-git-connected-to-repo.png":::

### Local representation of an environment in Git

In the item root folder, environments are organized with a **Libraries** folder that contains **PublicLibraries** and **CustomLibraries** subfolders, along with the **Setting** folder.

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-git-representation.png" alt-text="Screenshot that shows the local representation of the environment in Git." lightbox="media\environment-git-and-deployment-pipeline\environment-git-representation.png":::

#### Libraries

When you commit an environment to Git, the public library section is transformed into its YAML representation. The custom library is also committed along with its source file.

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-git-representation-public-library.png" alt-text="Screenshot that shows the public library local representation of the environment in Git." lightbox="media\environment-git-and-deployment-pipeline\environment-git-representation-public-library.png":::

You can update the public library by editing the YAML representation. Just like the portal experience, you can specify a library from PyPI and Conda. You can specify the library with the expected version, a version range, or without a version. The system can help you determine a version that's compatible with other dependencies in your environment. To clear all the existing public libraries, delete the YAML file.

You can update the custom library by adding new files or deleting existing files directly.

> [!NOTE]
> You can bring your own YAML file to manage the public library. The file name needs to be *environment.yml* so that the system can recognize it correctly.

#### Spark compute

The **Spark compute** section is also transformed into the YAML representation. Within this YAML file, you can switch the attached pool, fine-tune compute configurations, manage Spark properties, and select the Spark runtime that you want.

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-git-representation-spark-compute.png" alt-text="Screenshot that shows the Spark compute local representation of the environment in Git." lightbox="media\environment-git-and-deployment-pipeline\environment-git-representation-spark-compute.png":::

## Set up a deployment pipeline for an environment

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Fabric deployment pipelines simplify the process of delivering modified content across different phases, such as moving from development to test. The automatic pipeline can include the environment items to streamline the recreation process.

You can set up a deployment pipeline by assigning the workspaces with different phases. For more information, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

:::image type="content" source="media\environment-git-and-deployment-pipeline\environment-deployment-pipeline.png" alt-text="Screenshot that shows deploying an environment in a deployment pipeline." lightbox="media\environment-git-and-deployment-pipeline\environment-deployment-pipeline.png":::

You can find the deployment status after you set up the pipeline successfully. After you select **Deploy** with the environment selected, all contents of the environment are deployed to the destination workspaces. The status of the original environment is preserved in this process so that the published configurations stay in the published state and require no extra publishing.

> [!IMPORTANT]
> Currently, the custom pool isn't supported in deployment pipelines. If the environment selects the custom pool, the configurations of the **Compute** section in the destination environment are set with default values. In this case, the environments keep showing diff in the deployment pipeline even if the deployment is done successfully.
>

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
- [Manage a workspace with Git](../cicd/git-integration/git-get-started.md)
- [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md)
