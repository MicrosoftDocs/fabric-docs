---
title: Create, configure, and use an environment in Microsoft Fabric
description: Learn how to create and use a Fabric environment in your notebooks and Spark job definitions.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 05/01/2024
ms.search.for: Create and use Environment
---

# Create, configure, and use an environment in Microsoft Fabric

Microsoft Fabric environments is a consolidated item for all your hardware and software settings. In an environment, you can select different Spark runtimes, configure your compute resources, install libraries from public repositories or local directory and more.

This tutorial gives you an overview of creating, configuring, and using an environment.

## Create an environment

You can find the standard entry points of creating new environments in the Fabric **Data Engineering/Data Science** homepage, workspace **New** section and the Creation hub. You can also find the entry point of creating new environment when you select environment for your notebook, Spark job definition and the workspace setting.

## Configure an environment

There are three major components in an environment, which are Spark compute including Spark runtime, libraries, and resource. Spark compute and libraries are the configurations that needs publishing to be effective while the resources is a shared storage that can be manipulated in real-time. See [Save and publish changes](create-and-use-environment.md#save-and-publish-changes) section for more details.

### Configure Spark compute

For an environment, you can choose from various [Spark runtimes](runtime.md), each with its own default settings and preinstalled packages. To view the available runtimes, navigate to the **Home** tab of the environment and select **Runtime**. Select the runtime that best suits your needs.

:::image type="content" source="media\environment-introduction\env-runtime-dropdown.png" alt-text="Screenshot of choosing runtime in environment.":::

> [!IMPORTANT]
>
> - If you are updating the runtime of an environment with existing configurations or libraries, you must republish the contents based on the updated runtime version.
> - If the existing configurations or libraries are not compatible with the newly updated runtime version, the publishing fails. You must remove the incompatible configurations or libraries and publish the environment again.

[Microsoft Fabric Spark compute](spark-compute.md) provides unparalleled speed and efficiency running on Spark and requirement-tailored experiences. In your environment, you can choose from various pools created by workspace admins and capacity admins. You can further adjust the configurations and manage Spark properties to be effective in Spark sessions. For more information, see [Spark compute configuration settings in Fabric environments](environment-manage-compute.md).

### Manage libraries

Except for the built-in libraries provided by each Spark runtime, the Fabric environment allows you to install libraries from public sources or upload custom libraries built by you or your organization. Once you successfully install the libraries, they're available in your Spark sessions. For more information, see [Library management in Fabric environments](environment-manage-library.md).

### Resources

The Resources section in environment facilitates the ability to manage small resources during the development phase. When files are uploaded to the environment, they become accessible from various notebooks once they are attached to the same environment. For more information, see [Manage the resources in Fabric environment](environment-manage-resources.md)

### Save and publish changes

In the **Home** tab of environment ribbon, you can easily find two buttons called **Save** and **Publish**. They will be activated when there are unsaved or unpublished pending changes in the Libraries and Spark compute sections.  

:::image type="content" source="media\environment-introduction\env-save-and-publish.png" alt-text="Screenshot showing where to select the save and Publish actions.":::

You will also see a banner prompting this two button when there are pending changes in the the Libraries and Spark compute sections, they have the same functionalities with the ones in the ribbon.

- The unsaved changes will be lost if you refresh or leave the browser page. You can click the **Save** button to make sure the changes are recorded before leaving. Saving doesn't make the configurations effective but caching them in the system.
- **Publish** is the button to make the changes in Libraries and Spark compute becomes effective. The **Pending changes** page appears after clicking Publish, this page allows you have a final review before publishing. After you select **Publish all**, the Fabric environment starts to proceed the configuration and gets they ready to use.This process may take a while, particularly when library changes are included.
- If you want to cancel an ongoing publish, click the **View progress** in the banner and you will find the **Cancel** button.
- A notification appears when the publishing is done. Error notification appears when the process encounters issues.

> [!NOTE]
> An environment accepts one publish at a time, no further changes can be made in Libraries or Spark compute section when there is an on-going publish.
> Publishing doesn't impact adding/deleting/editing the files and folders in **Resources**. The actions to manage resources are in real-time, publish doesn't block changes in Resources section.

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

## Share an existing environment

Microsoft Fabric supports sharing an item with different level of permissions.

:::image type="content" source="media\environment-introduction\env-sharing.gif" alt-text="Screen recording of showing how to share an environment.":::

When you share an environment item, recipients automatically receive **Read permission**. With this permission, they can explore the environment’s configurations and attach it to notebooks or Spark jobs. To ensure smooth code execution, remember to grant the Read permission of attached environment when sharing your notebooks and Spark job definitions.

Furthermore, you have the option to share the environment with Share and Edit permissions. Users with **Share permission** can continue sharing the environment with others, with their existing permissions. Meanwhile, recipients with **Edit permission** can update the environment’s content.

## Related content

- [Spark compute configuration settings in Fabric environments](environment-manage-compute.md)
- [Library management in Fabric environments](environment-manage-library.md)
