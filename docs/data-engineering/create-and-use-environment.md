---
title: Create, configure, and use an environment in Microsoft Fabric
description: Learn how to create and use a Fabric environment in your notebooks and Spark job definitions.
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.for: Create and use Environment
---

# Create, configure, and use an environment in Microsoft Fabric

Microsoft Fabric environments provide flexible configurations for running your Spark jobs. In an environment, you can select different Spark runtimes, configure your compute resources, and install libraries from public repositories or upload local custom-built libraries. You can easily attach environments to your notebooks and Spark job definitions.

This tutorial gives you an overview of creating, configuring, and using an environment.

> [!IMPORTANT]
> The environment item in Microsoft Fabric is currently in PREVIEW.

## Create an environment

There are multiple entry points for creating an environment.

### Create an environment from the homepage, workspace view, or create hub

- **Data Engineering** homepage

    From the **Data Engineering** homepage, select **New** and then select the **Environment** card to crate an environment.
    :::image type="content" source="media\environment-introduction\env-data-engineering-card.png" alt-text="Screenshot of the Environment card in the Data Engineering homepage.":::

- **Data Science** homepage

    From the **Data Science** homepage, select **New** and then select the **Environment** card to create a new environment.
    :::image type="content" source="media\environment-introduction\env-data-science-card.png" alt-text="Screenshot of the Environment card in the Data Science homepage.":::

- **Workspace** view

    From your workspace, select **New** and then select **Environment (Preview)**.
    :::image type="content" source="media\environment-introduction\env-workspace-card.png" alt-text="Screenshot of the Environment card in the workspace view.":::

- **Creation hub**

    In the creation hub, you can select the **Environment** card from either the **Data Engineering** or the **Data Science** sections.
    :::image type="content" source="media\environment-introduction\env-creation-hub-card.png" alt-text="Screenshot showing where you can select the Environment card in the creation hub.":::

### Create an environment from the attachment menus

You can also create a new environment from the location where you attach an environment. For more information, see [Attach an environment](#attach-an-environment).

- **Notebook attachment menu**

    In the **Home** tab of the notebook ribbon, there's a menu to attach an environment. Select **Workspace default** and then select **New environment** to create a new one.
    :::image type="content" source="media\environment-introduction\env-dropdown-notebook.png" alt-text="Screenshot showing where to select New Environment from the Workspace default menu in the in notebook screen.":::

- **Spark job definition attachment menu**

    You can attach an environment from the **Home** tab of the Spark job definition ribbon, and also create a new environment from the same menu. From the ribbon, select **Workspace default** and then select **New Environment**.
    :::image type="content" source="media\environment-introduction\env-dropdown-spark-job-definition.png" alt-text="Screenshot showing where to select New Environment from the Workspace default menu in the Spark job definition screen.":::

- **Workspace setting attachment menu**

    In the **Data Engineering/Science** section of your workspace settings screen, a workspace admin can attach an environment as the workspace default. For more information, see [Attach an environment as workspace default](#attach-an-environment-as-workspace-default). You can also create a new one in the **Environment** tab.

    :::image type="content" source="media\environment-introduction\env-dropdown-workspace.png" alt-text="Screenshot showing where to select New Environment in the Workspace default attachment menu in Workspace settings.":::

## Configure an environment

There are three major components you can configure for an environment: Spark runtime, libraries, and Spark compute.

### Choose a Spark runtime

For an environment, you can choose from various [Spark runtimes](runtime.md), each with its own default settings and preinstalled packages. To view the available runtimes, navigate to the **Home** tab of the environment and select **Runtime**. Select the runtime that best suits your needs.

:::image type="content" source="media\environment-introduction\env-runtime-dropdown.png" alt-text="Screenshot of choosing runtime in environment.":::

> [!IMPORTANT]
>
> - If you are updating the runtime of an environment with existing configurations or libraries, you must republish the contents based on the updated runtime version.
> - If the existing configurations or libraries are not compatible with the newly updated runtime version, the publishing fails. You must remove the incompatible configurations or libraries and publish the environment again.

### Configure Spark compute

[Microsoft Fabric Spark compute](spark-compute.md) provides unparalleled speed and efficiency running on Spark and requirement-tailored experiences. In your environment, you can choose from various pools created by workspace admins and capacity admins. You can further adjust the configurations and manage Spark properties to be effective in Spark sessions. For more information, see [Spark compute configuration settings in Fabric environments](environment-manage-compute.md).

### Manage libraries

Except for the built-in libraries provided by each Spark runtime, the Fabric environment allows you to install libraries from public sources or upload custom libraries built by you or your organization. Once you successfully install the libraries, they're available in your Spark sessions. For more information, see [Library management in Fabric environments](environment-manage-library.md).

### Save and publish changes

To save or publish changes in a Fabric environment, select the option you want from the ribbon on the **Home** tab.

:::image type="content" source="media\environment-introduction\env-save-and-publish.png" alt-text="Screenshot showing where to select the save and Publish actions.":::

- The save option is active when you have changes that aren't saved. If you refresh the page without saving, all pending changes are lost. If any section contains invalid input, the save option is disabled. The save action applies to all unsaved changes in both Libraries and Spark compute sections.
- The **Publish** option is active when you have changes that aren't published. You don't need to save before publishing the changes. When you select **Publish**, the **Pending changes** page appears, where you can review all changes before publishing. After you select **Publish all**, the Fabric environment runs jobs on the backend to prepare the configurations for use. This process takes several minutes, particularly if library changes are included.

> [!NOTE]
> During the publishing process, if the changes involve libraries, the system will assist in downloading dependencies and resolving potential conflicts.

A banner prompting you to **Save** or **Publish** appears when you have pending changes.

- You can select **Save** or **Publish**; these actions are the same as **Save** and **Publish** on the **Home** tab.
- During the publish process, selecting **View progress** in the banner opens the **Pending changes** page again. To stop the publish process, select **Cancel** in the **Pending changes** page.
- A notification appears when the publishing is done, or if the process encounters errors.

## Attach an environment

Microsoft Fabric environment can be attached to your **Data Engineering/Science** workspaces or your notebooks and Spark job definitions.

### Attach an environment as workspace default

Find the **Environment** tab by selecting **Workspace setting** -> **Data Engineering/Science** -> **Spark settings**.

#### New workspaces

When you're working in a workspace that's either new or doesn't have the library and Spark settings set up, the following **Spark settings** screen appears.

:::image type="content" source="media\environment-introduction\env-workspace-setting-default.png" alt-text="Screenshot of the Workspace settings Set default environment screen.":::

Workspace admins can define the default experience for entire workspaces. The values configured here are effective for notebooks and Spark job definitions that attach to **Workspace Settings**.
:::image type="content" source="media\environment-introduction\env-workspace-setting-in-code-artifact.png" alt-text="Screenshot of Workspace configuration effective range.":::

The **Set default environment** toggle can enhance the user experience. By default, this toggle is set to **Off**. If there's no default Spark property or library required as the workspace default, admins can define the Spark runtime in this circumstance. However, if an admin wants to prepare a default Spark compute and libraries for the workspace, they can switch the toggle to **On** and easily attach an environment as the workspace default. This option makes all configurations in the environment effective as the **Workspace Settings**.

:::image type="content" source="media\environment-introduction\env-workspace-toggle-on.png" alt-text="Screenshot of default environment selection.":::

#### Workspaces with existing library or Spark properties

The environment feature is a big upgrade to the **Data Engineering/Data Science** section in **Workspace Settings**. As part of this upgrade, Fabric no longer supports library management and adding new Spark properties at the workspace level. You can migrate your existing libraries and Spark properties to an environment and attach it as the workspace default. For more information, see [Migrate workspace libraries and Spark properties to a default environment](environment-workspace-migration.md).

### Attach an environment to a notebook or a Spark job definition

The **Environment** menu appears in both the notebook and Spark job definition Home tabs. Available environments are listed in the menu. If you select an environment, the Spark compute and libraries configured in it are effective after you start a Spark session.

:::image type="content" source="media\environment-introduction\env-notebook-selection.png" alt-text="Screenshot showing where to attach an environment in a notebook.":::

>[!NOTE]
> If you switch to a different environment while in an active session, the newly selected environment will not take effect until the next session.

## Related content

- [Spark compute configuration settings in Fabric environments](environment-manage-compute.md)
- [Library management in Fabric environments](environment-manage-library.md)
