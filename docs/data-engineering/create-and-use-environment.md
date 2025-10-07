---
title: Create, Configure, and Use an Environment in Fabric
description: Learn how to create, configure, and use a Microsoft Fabric environment in your notebooks and Spark job definitions.
ms.author: eur
ms.reviewer: shuaijunye
author: eric-urban
ms.topic: how-to
ms.date: 03/31/2025
ms.search.form: Create and use Environment
---

# Create, configure, and use an environment in Fabric

A Microsoft Fabric environment is a consolidated item for all your hardware and software settings. In an environment, you can select different Spark runtimes, configure your compute resources, install libraries from public repositories or a local directory, and set other settings.

This article presents an overview of how to create, configure, and use an environment.

## Create an environment

You can create new environments from multiple entry points:

**Standard entry point:**

1. In Fabric, navigate to the desired workspace.

1. Select **New item** and locate **Environment**.

    :::image type="content" source="media\environment-introduction\new-item-environment.png" alt-text="Screenshot showing how to create a new environment in the Fabric portal." lightbox="media\environment-introduction\new-item-environment.png":::

1. Name your environment and select **Create**.

**Create during selection:**

1. Open a notebook or Spark job definition.

1. Select the **Environment** dropdown and then select **New environment**.

    :::image type="content" source="media\environment-introduction\env-create-during-selection.png" alt-text="Screenshot that shows how to create a new environment during environment selection in a notebook." lightbox="media\environment-introduction\env-create-during-selection.png":::

1. Name your environment and select **Create**.

Once the environment is created, select the runtime version. Choose **Runtime 1.3 (Spark 3.5, Delta 3.2)** from the dropdown menu.

:::image type="content" source="media\environment-introduction\select-runtime.png" alt-text="Screenshot showing how to select the runtime version for the environment." lightbox="media\environment-introduction\select-runtime.png":::

## Configure an environment

An environment has three major components:

- Spark compute, which includes Spark runtime.
- Libraries.
- Resources.

The Spark compute and library configurations are required for publishing to be effective. Resources are shared storage that can change in real time. For more information, see [Save and publish changes](create-and-use-environment.md#save-and-publish-changes).

### Configure Spark compute

For an environment, you can choose from various [Spark runtimes](runtime.md) with their own default settings and preinstalled packages. To view the available runtimes, go to the **Home** tab of the environment and select **Runtime**. Select the runtime that best suits your needs.

:::image type="content" source="media\environment-introduction\env-runtime-dropdown.png" alt-text="Screenshot that shows choosing a runtime in an environment." lightbox="media\environment-introduction\env-runtime-dropdown.png":::

> [!IMPORTANT]
>
> - If you're updating the runtime of an environment with existing configurations or libraries, you must republish the contents based on the updated runtime version.
> - If the existing configurations or libraries aren't compatible with the newly updated runtime version, the publishing fails. You must remove the incompatible configurations or libraries and publish the environment again.

[Fabric Spark compute](spark-compute.md) provides unparalleled speed and efficiency running on Spark and requirement-tailored experiences. In your environment, you can choose from various pools created by workspace admins and capacity admins. You can further adjust the configurations and manage Spark properties to be effective in Spark sessions. For more information, see [Spark compute configuration settings in Fabric environments](environment-manage-compute.md).

### Manage libraries

Each Spark runtime provides built-in libraries. With the Fabric environment, you can also install libraries from public sources or upload custom libraries that you or your organization built. After you successfully install the libraries, they're available in your Spark sessions. For more information, see [Library management in Fabric environments](environment-manage-library.md). For the best practices for managing libraries in Fabric, see [Manage Apache Spark libraries in Fabric](library-management.md).

### Use resources

The **Resources** section in an environment facilitates the ability to manage small resources during the development phase. Files uploaded to the environment are accessible across notebooks when they're attached. For more information, see [Manage the resources in a Fabric environment](environment-manage-resources.md).

### Save and publish changes

On the **Home** tab, you can easily find **Save** and **Publish**. They're activated when there are unsaved or unpublished pending changes in the **Libraries** and **Spark compute** sections.

:::image type="content" source="media\environment-introduction\env-save-and-publish.png" alt-text="Screenshot that shows where to select Save and Publish." lightbox="media\environment-introduction\env-save-and-publish.png":::

> [!IMPORTANT]
>
> - If Private Link is enabled, the first Spark job in the workspace need to trigger VNet provisioning, which can take approximately 10–15 minutes. Since environment publishing also runs as a Spark job, it may experience an additional delay if it happens to be the first Spark job executed after Private Link is enabled.

When pending changes are in the **Libraries** and **Spark compute** sections, you also see a banner that prompts you with **Save** and **Publish**. The functionalities are the same as for the buttons:

- The unsaved changes are lost if you refresh or leave the browser open. Select **Save** to make sure that your changes are recorded before you leave. Saving doesn't apply the configuration but caches the changes in the system.
- To apply the changes to **Libraries** and **Spark compute**, select **Publish**. The **Pending changes** page appears for final review before publishing. Next, select **Publish all** to initiate configuration in the Fabric environment. This process might take some time, especially if library changes are involved.
- To cancel a publishing process, select **View progress** in the banner and cancel the operation.
- A notification appears upon publishing completion. An error notification occurs if there are any issues during the process.

An environment accepts only one **Publish** action at a time. You can't make changes to the **Libraries** or **Spark compute** sections during an ongoing **Publish** action.

Publishing doesn't affect adding, deleting, or editing the files and folders in the **Resources** section. The actions to manage resources are in real time. The **Publish** action doesn't block changes in the **Resources** section.

## Share an existing environment

Fabric supports sharing an item with different levels of permissions.

:::image type="content" source="media\environment-introduction\environment-sharing.png" alt-text="Screenshot that shows how to share an environment." lightbox="media\environment-introduction\environment-sharing.png":::

When you share an environment item, recipients automatically receive Read permission. With this permission, they can explore the environment's configurations and attach it to notebooks or Spark jobs. For smooth code execution, make sure to grant Read permissions for attached environments when you share notebooks and Spark job definitions.

You can also share the environment with Share and Edit permissions. Users with Share permission can continue sharing the environment with others. Meanwhile, recipients with Edit permission can update the environment's content.

## Attach an environment

You can attach a Fabric environment to your **Data Engineering/Science** workspaces or your notebooks and Spark job definitions.

### Attach an environment as a workspace default

> [!IMPORTANT]
> After an environment is selected as a workspace default, only workspace admins can update the contents of the default environment.

Select **Workspace settings** > **Data Engineering/Science** > **Spark settings** to see the **Environment** tab.

:::image type="content" source="media\environment-introduction\env-workspace-setting-default.png" alt-text="Screenshot that shows the Workspace settings Set default environment pane." lightbox="media\environment-introduction\env-workspace-setting-default.png":::

Workspace admins can define the default workload for entire workspaces. The values configured here are effective for notebooks and Spark job definitions that attach to **Workspace settings**.

:::image type="content" source="media\environment-introduction\env-workspace-setting-in-code-artifact.png" alt-text="Screenshot that shows the workspace configuration effective range." lightbox="media\environment-introduction\env-workspace-setting-in-code-artifact.png":::

The **Set default environment** toggle can enhance the user experience. By default, this toggle is set to **Off**. If there's no default Spark property or library required as the workspace default, you can define the Spark runtime in this circumstance. If you want to prepare a default Spark compute and libraries for the workspace, you can switch the toggle to **On** and easily attach an environment as the workspace default. This option makes all configurations in the environment effective as the **Workspace settings**.

:::image type="content" source="media\environment-introduction\env-workspace-toggle-on.png" alt-text="Screenshot that shows default environment selection." lightbox="media\environment-introduction\env-workspace-toggle-on.png":::

### Attach an environment to a notebook or a Spark job definition

The environment is available on both the **Notebook** and **Spark Job Definition** tabs. When notebooks and Spark job definitions are attached to an environment, they can access its libraries, compute configurations, and resources. The Explorer lists all available environments that are shared with you, are from the current workspace, and are from other workspaces to which you have access.

:::image type="content" source="media\environment-introduction\env-notebook-selection.png" alt-text="Screenshot that shows where to attach an environment in a notebook." lightbox="media\environment-introduction\env-notebook-selection.png":::

If you switch to a different environment during an active session, the newly selected environment doesn't take effect until the next session.

When you attach an environment from another workspace, both workspaces must have the *same capacity and network security settings*. Although you can select environments from workspaces with different capacities or network security settings, the session fails to start.

When you attach an environment from another workspace, the compute configuration in that environment is ignored. Instead, the pool and compute configurations default to the settings of your current workspace.

## Related content

- [Spark compute configuration settings in Fabric environments](environment-manage-compute.md)
- [Library management in Fabric environments](environment-manage-library.md)
