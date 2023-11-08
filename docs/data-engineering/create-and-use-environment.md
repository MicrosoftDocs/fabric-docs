---
title: Create, configure, and use an environment in Microsoft Fabric
description: Learn how to create and use a Fabric environment in your notebooks and Spark job definitions.
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.date: 11/15/2023
ms.search.for: Create and use Environment
---

# Create, configure, and use an environment in Microsoft Fabric

Microsoft Fabric environment provides flexible configurations for running your Spark jobs. In an environment, you can select different Spark runtime, configure your compute resources, and install libraries from public repository or upload the custom ones built locally. Environment can be easily attached to the Notebooks and Spark job definitions.

This tutorial gives you an overview of creating, configuring, and using an environment.
  
> [!IMPORTANT]
> The environment item in Microsoft Fabric is currently in PREVIEW.

## Create an environment

There are multiple entry points for creating an environment.

### Create an environment from the homepage, workspace view, and create hub

- **Data Engineering** homepage

    From the **Data Engineering** homepage, navigate to the **New** section and create an environment by selecting the **Environment** card.
    :::image type="content" source="media\environment-introduction\env-data-engineering-card.png" alt-text="Screenshot of Environment card in DE homepage.":::

- **Data Science** homepage

    Similar to the data engineering homepage,  from the **Data Science** homepage, navigate to the **New** section and create an environment by selecting the **Environment** card.
    :::image type="content" source="media\environment-introduction\env-data-science-card.png" alt-text="Screenshot of environment card in DS homepage.":::

- **Workspace** view

    From the workspace, open the **New** dropdown and select **Environment (Preview)**.
    :::image type="content" source="media\environment-introduction\env-workspace-card.png" alt-text="Screenshot of Environment card in workspace view.":::

- **Creation hub**

    In the creation hub, you can find the **Environment** card under both **Data Engineering** and **Data Science** sections.
    :::image type="content" source="media\environment-introduction\env-creation-hub-card.png" alt-text="Screenshot of environment card in creation hub.":::

### Create an environment from the attachment dropdowns

You can also create a new environment from the location where you attach the environment. Learn more at [how to attach and use an environment](create-and-use-environment.md#attach-an-environment).

- **Notebook attachment dropdown**

    In the **Home** tab of the Notebook ribbon, there's a dropdown to attach an environment. Open the **Workspace default** menu item and select **New Environment** to create a new one.
    :::image type="content" source="media\environment-introduction\env-dropdown-notebook.png" alt-text="Screenshot of environment creation through attachment dropdown in Notebook.":::

- **Spark job definition attachment dropdown**

    In the **Home** tab of the Spark job definition ribbon, there's a dropdown to attach an environment. Open the **Workspace default** menu item and select **New Environment** to create a new one.
    :::image type="content" source="media\environment-introduction\env-dropdown-spark-job-definition.png" alt-text="Screenshot of environment creation through attachment dropdown in SJD.":::

- **Workspace setting attachment dropdown**

    In the **Data Engineering/Science** section of the workspace setting, the workspace admin can attach an environment as workspace default. Learn more at [how to attach an environment as workspace default](create-and-use-environment.md#attach-an-environment-as-workspace-default). You can also create a new one through the **Environment** dropdown.
    :::image type="content" source="media\environment-introduction\env-dropdown-workspace.png" alt-text="Screenshot of environment creation through attachment dropdown in WS setting.":::

## Configure an environment

There are three major components you can configure for an environment: Spark runtime, libraries, and Spark compute.

### Choose a Spark runtime

For an environment, you can choose from various [Spark runtimes](runtime.md), each with its own default settings and pre-installed packages. To view the available runtimes, navigate to the **Home** tab of the environment and select the **Runtime** dropdown. Select a runtime that best suits your needs.

:::image type="content" source="media\environment-introduction\env-runtime-dropdown.png" alt-text="Screenshot of choosing runtime in environment.":::

> [!IMPORTANT]
>
> - If you are updating the runtime of an environment with existing configurations or libraries, the contents must be re-publish based on the updated runtime version.
> - If the existing configurations or libraries are not compatible with the newly updated runtime version, the publishing will fail. You need to remove the incompatible ones and publish the environment again.
>

### Configure Spark compute

[Microsoft Fabric Spark compute](spark-compute.md) provides unparalleled speed and efficiency of running on Spark as well as requirement-tailored experiences. In the environment, you can choose from various pools created by workspace admins and capacity admins. You can further adjust the configurations and manage Spark properties to be effective on Spark sessions.
Learn more at [how to configure Spark compute.](environment-manage-compute.md)

### Manage libraries

Except for the built-in libraries provided by each Spark runtime, the Fabric environment provides the ability to install the libraries from public sources or the custom ones built by you or your organization. Once the libraries are installed successfully, they'll be available on the Spark sessions.
Learn more on [how to manage libraries](environment-manage-library.md)

### Save and publish the changes

To save and publish changes in the Fabric environment, you can navigate to the **Home** tab.
:::image type="content" source="media\environment-introduction\env-save-and-publish.png" alt-text="Screenshot of save and publish the changes.":::

- The **Save** button becomes active when there are changes that haven't been saved. If you refresh the page without saving, all pending changes are lost. If any section contains invalid input, the Save button is disabled. The Save action applies to all unsaved changes in both *Libraries* and *Spark compute* sections.
- The **Publish** button becomes active when there are changes that haven't yet been published. You can directly publish these changes without first saving them. Clicking the Publish button takes you to the *Pending changes* page where you can review all the changes before publishing. Once you choose to **Publish all** the changes, the Fabric environment runs jobs on the backend to prepare the configurations for use. This process takes several minutes, particularly if there are library changes involved.

> [!NOTE]
> During the publishing process, if changes involve libraries, the system will assist in downloading dependencies and resolving potential conflicts.

A **banner** promoting Save and Publish will appear when there are pending changes.

- By clicking on the corresponding buttons in the banner, you can **Save** or **Publish** the changes. These buttons have the same functionalities as the ones on the Home tab.
- During the publish process, clicking **View progress** button in the banner can take you to the **pending changes** page again. You can find **Cancel** button in pending changes page during publishing.
- You'll be notified once the publishing is done or encounters error.

## Attach an environment

Microsoft Fabric environment can be attached to your Data Engineering/Science workspaces or your Notebooks and Spark job definitions.

### Attach an environment as workspace default

You can find the **Environment** tab by navigating to *Workspace setting -> Data Engineering/Science -> Spark setting*.

#### New workspaces

When you're working in a workspace that's either new or doesn't have library and Spark settings set up before, you are presented with the screen shown below.
:::image type="content" source="media\environment-introduction\env-workspace-setting-default.png" alt-text="Screenshot of Workspace setting environment section.":::

Workspace admins can define the default experience for entire workspaces. The values configured here are effective for notebooks and Spark job definitions that attach to *Workspace Settings*.
:::image type="content" source="media\environment-introduction\env-workspace-setting-in-code-artifact.png" alt-text="Screenshot of Workspace configuration effective range.":::

The **Set default environment** toggle can enhance the user experience. By default, this toggle is set to "Off". If there's no default Spark property or library required as the workspace default, admins can define the Spark runtime under this circumstance. However, if an admin wants to prepare a default Spark compute and libraries for the workspace, they can turn on the toggle and easily attach an environment as the workspace default. This makes all configurations in the environment effective as the *Workspace Setting*.
:::image type="content" source="media\environment-introduction\env-workspace-toggle-on.png" alt-text="Screenshot of default environment selection.":::

#### Workspaces with existing library or Spark properties

The release of the environment has brought a major upgrade to the *Data Engineering/Data Science* section in workspace settings. As part of this upgrade, library management and adding new Spark properties at the workspace level are no longer supported. You can follow ["Migrate the workspace libraries and Spark properties to a default environment"](environment-workspace-migration.md) to migrate them to an environment and attach as workspace default.

### Attach an environment to Notebook or Spark job definitions

You can find the **Environment** dropdown in both Notebook and Spark job definition's Home tab. The available environments are listed in the drop-down. If you select any environment, the Spark compute and libraries configured in it are effective once the Spark session gets started.
:::image type="content" source="media\environment-introduction\env-notebook-selection.png" alt-text="Screenshot of attaching an environment in Notebook.":::

>[!NOTE]
> If you switch to a different environment while in an active session, the newly selected environment will not take effect until the next session.

## Next steps

- [Learn how to configure the Spark compute in environment](environment-manage-compute.md)
- [Learn how to install libraries in environment](environment-manage-library.md)
