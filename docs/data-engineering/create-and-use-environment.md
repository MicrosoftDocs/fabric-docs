---
title: Create, Configure, and Use an Environment in Fabric
description: Learn how to create, configure, and use a Microsoft Fabric environment in your notebooks and Spark job definitions.
ms.reviewer: shuaijunye
ms.topic: how-to
ms.date: 03/20/2026
ms.search.form: Create and use Environment
ai-usage: ai-assisted
---

# Create, configure, and use an environment in Fabric

A Microsoft Fabric environment is a workspace item that defines Spark session configuration for notebooks and Spark job definitions. Use an environment to choose a Spark runtime, configure compute settings, manage libraries, and manage small resource files that notebooks can access.

This article presents an overview of how to create, configure, and use an environment.

## Why use an environment item

You can run notebooks and Spark job definitions by using **Workspace default** without attaching an environment item. In that case, you use workspace-level Spark settings.

Use an environment item when you need reusable, governed defaults for teams:

- Define Spark compute and libraries once, and apply them consistently across notebooks and Spark job definitions.
- Set an environment as workspace default so users inherit shared configuration through **Workspace default**.
- Version and operate environment settings as a single artifact.

## Workspace-level environments

Use this workflow when you want to set workspace-wide defaults for notebooks and Spark job definitions.

An environment item is created in a specific workspace and is associated with that workspace. You can also use that environment in other workspaces where you have access, if sharing and workspace compatibility requirements are met.

### Create an environment from a workspace

1. In your browser, go to your Fabric workspace in the [Fabric portal](https://app.fabric.microsoft.com/).

1. Select **+New item**.
1. Search for "environment" in the search bar and select the **Environment** tile.

    :::image type="content" source="media\environment-introduction\new-item-environment.png" alt-text="Screenshot showing how to select the Environment tile from a workspace in the Fabric portal." lightbox="media\environment-introduction\new-item-environment.png":::

1. Name your environment and select **Create**.

### Attach an environment as a workspace default

> [!IMPORTANT]
> After an environment is selected as a workspace default, only workspace admins can update the contents of the default environment.

Workspace admins can define the default workload for entire workspaces. The values configured here are effective for notebooks and Spark job definitions that attach to **Workspace settings**.

:::image type="content" source="media\environment-introduction\env-workspace-setting-in-code-artifact.png" alt-text="Screenshot that shows the workspace configuration effective range." lightbox="media\environment-introduction\env-workspace-setting-in-code-artifact.png":::

The **Set default environment** toggle controls whether **Workspace default** is backed by an environment item.

1. In your browser, go to your Fabric workspace in the [Fabric portal](https://app.fabric.microsoft.com/).

1. Select **Workspace settings**.

1. Select **Data Engineering/Science**, and then select **Spark settings**.

1. Select the **Environment** tab.

    :::image type="content" source="media\environment-introduction\env-workspace-setting-default.png" alt-text="Screenshot that shows Workspace settings with Spark settings open and the Environment tab selected." lightbox="media\environment-introduction\env-workspace-setting-default.png":::

1. To use an environment-backed workspace default, turn **Set default environment** to **On**, select the environment item that you want to use, and then save your changes.

    - When this toggle is **Off** (default), users still see **Workspace default** in notebooks and Spark job definitions. In this state, **Workspace default** uses workspace-level Spark settings.
    - When this toggle is **On**, you select an environment item as the workspace default. Notebooks and Spark job definitions that use **Workspace default** then inherit that environment's Spark compute and library configurations.
    
    :::image type="content" source="media\environment-introduction\env-workspace-toggle-on.png" alt-text="Screenshot that shows default environment selection." lightbox="media\environment-introduction\env-workspace-toggle-on.png":::

## Notebook and Spark job definition-level environments

Use this workflow when you want to create, select, or change environments directly from a notebook or Spark job definition.

### Create or change an environment from a notebook or Spark job definition

1. In your browser, go to your Fabric workspace in the [Fabric portal](https://app.fabric.microsoft.com/).

1. Open a notebook or Spark job definition.

1. Select the **Environment** dropdown and then select **New environment**.

    :::image type="content" source="media\environment-introduction\env-create-during-selection.png" alt-text="Screenshot that shows how to create a new environment during environment selection in a notebook." lightbox="media\environment-introduction\env-create-during-selection.png":::

    > [!NOTE]
    > Alternatively, if you want to change the environment without creating a new one, you can select **Change environment** from the dropdown menu. You can select an existing environment and then select **Confirm** to attach it to the notebook or Spark job definition.

1. Name your environment and select **Create**.

### Attach an environment to a notebook or a Spark job definition

The environment is available on both the **Notebook** and **Spark Job Definition** tabs. When notebooks and Spark job definitions are attached to an environment, they can access its libraries, compute configurations, and resources. The Explorer lists all available environments that are shared with you, are from the current workspace, and are from other workspaces to which you have access.

:::image type="content" source="media\environment-introduction\env-notebook-selection.png" alt-text="Screenshot that shows where to attach an environment in a notebook." lightbox="media\environment-introduction\env-notebook-selection.png":::

If you switch to a different environment during an active session, the newly selected environment doesn't take effect until the next session.

When you attach an environment from another workspace, both workspaces must have the *same capacity and network security settings*. Although you can select environments from workspaces with different capacities or network security settings, the session fails to start.

When you attach an environment from another workspace, the compute configuration in that environment is ignored. Instead, the pool and compute configurations default to the settings of your current workspace.


## Configure an environment

An environment has three major components:

- Spark compute, which includes Spark runtime.
- Libraries.
- Resources.

The Spark compute and library configurations are required for publishing to be effective. Resources are shared storage that can change in real time. For more information, see [Save and publish changes](create-and-use-environment.md#save-and-publish-changes).

### Configure Spark compute

Configure Spark compute in an environment by selecting a runtime and setting session-level compute properties.

For detailed steps, including runtime selection and compute customization, see [Spark compute configuration settings in Fabric environments](environment-manage-compute.md).

If you change runtime or compute settings, save and publish the environment for those changes to take effect. For more information, see [Save and publish changes](#save-and-publish-changes).

### Manage libraries

Each Spark runtime provides built-in libraries. With the Fabric environment, you can also install libraries from public sources or upload custom libraries that you or your organization built. After you successfully install the libraries, they're available in your Spark sessions. For more information, see [Library management in Fabric environments](environment-manage-library.md). For the best practices for managing libraries in Fabric, see [Manage Apache Spark libraries in Fabric](library-management.md).

### Use resources

The **Resources** section in an environment facilitates the ability to manage small resources during the development phase. Files uploaded to the environment are accessible across notebooks when they're attached. For more information, see [Manage the resources in a Fabric environment](environment-manage-resources.md).

## Save and publish changes

Use **Save** and **Publish** to control when environment configuration changes take effect.

- **Save** stores your pending changes.
- **Publish** applies pending changes to **Libraries** and **Spark compute**.
- Changes in **Resources** are real time and don't require publishing.

On the **Home** tab, **Save** and **Publish** are enabled when there are pending changes in **Libraries** or **Spark compute**.

:::image type="content" source="media\environment-introduction\env-save-and-publish.png" alt-text="Screenshot that shows where to select Save and Publish." lightbox="media\environment-introduction\env-save-and-publish.png":::

> [!IMPORTANT]
> If Private Link is enabled, the first Spark job in the workspace needs to trigger VNet provisioning, which can take approximately 10–15 minutes. Since environment publishing also runs as a Spark job, it may experience an additional delay if it happens to be the first Spark job executed after Private Link is enabled.

When pending changes exist, a banner also provides **Save** and **Publish** actions.

Use this workflow:

1. Make changes in **Libraries** or **Spark compute**.
1. Select **Save** to keep your edits. Saved changes are staged and not yet effective.
1. Select **Publish** and then **Publish all** to make the staged changes effective.

During publish:

- To cancel a publishing process, select **View progress** in the banner and cancel the operation.
- A notification appears upon publishing completion. An error notification occurs if there are any issues during the process.

An environment accepts only one **Publish** action at a time. You can't make changes to the **Libraries** or **Spark compute** sections during an ongoing **Publish** action.

## Share an existing environment

Fabric supports sharing an item with different levels of permissions.

:::image type="content" source="media\environment-introduction\environment-sharing.png" alt-text="Screenshot that shows how to share an environment." lightbox="media\environment-introduction\environment-sharing.png":::

When you share an environment item, recipients automatically receive Read permission. With this permission, they can explore the environment's configurations and attach it to notebooks or Spark jobs. For smooth code execution, make sure to grant Read permissions for attached environments when you share notebooks and Spark job definitions.

You can also share the environment with Share and Edit permissions. Users with Share permission can continue sharing the environment with others. Meanwhile, recipients with Edit permission can update the environment's content.

## Delete an environment

You can delete an environment when it's no longer needed. Before deleting an environment, consider the following:

> [!IMPORTANT]
> - Deleting an environment is permanent and cannot be undone.
> - Any notebooks or Spark job definitions currently attached to the environment will need to be reconfigured to use a different environment or workspace settings.
> - If the environment is set as a workspace default, you must first change the workspace default setting before deletion.

### Delete an environment using REST API

You can delete an environment programmatically using the Fabric REST API:

**Endpoint**: `DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}`

**Required permissions**: `Environment.ReadWrite.All` or `Item.ReadWrite.All`

For more information about the REST API, see [Delete environment](/rest/api/fabric/environment/items/delete-environment).

## Related content

- [Spark compute configuration settings in Fabric environments](environment-manage-compute.md)
- [Library management in Fabric environments](environment-manage-library.md)
