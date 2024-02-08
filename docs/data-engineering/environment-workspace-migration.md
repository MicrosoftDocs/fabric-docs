---
title: Migrate workspace libraries and Spark properties to a default environment
description: Learn how to migrate your existing libraries and Spark properties to a Fabric environment.
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Migrate workspace libraries and Spark properties to a default environment

Microsoft Fabric environments provide flexible configurations for running your Spark jobs. In an environment, you can select different Spark runtimes, configure your compute resources, and install libraries from public repositories or upload local custom-built libraries. You can easily attach environments to your notebooks and Spark job definitions.

Data Engineering and Data Science workspace settings are upgraded to include Fabric environments. As a part of this upgrade, Fabric no longer supports adding new libraries and Spark properties in workspace settings. Instead, you can create a Fabric environment, configure the library and property in it and attach it as the workspace default environment. After you create an environment and set it as the default, you can migrate the existing libraries and Spark properties to that default environment.

In this tutorial, learn how to migrate the existing workspace libraries and Spark properties to an environment.

> [!IMPORTANT]
>
> - Workspace settings are restricted to admins.
> - Your existing workspace settings remain effective for your notebooks or Spark job definitions if no environment is attached to them. However, you aren't able to make further changes to those settings. We **STRONGLY RECOMMEND** you migrate your existing settings to an environment.
> - The migration process includes a step that **permanently removes all existing configurations**. Please **carefully** follow these instructions. There is no way to bring back files if they are deleted accidentally.

## Prepare the files for migration

In **Workspace settings**, review your existing configurations.
:::image type="content" source="media\environment-migration\prepare-file-1.png" alt-text="Screenshot showing where to find your configuration settings under Current settings in the Environment tab.":::

1. Make a note of the current **Runtime** version.

1. Download existing configurations by selecting **Download all files**.

    The content is downloaded as different files. **Sparkproperties.yml** contains all of the Spark properties key value pairs. The **Publiclibrary.yml** file contains all of the public library definitions. Any custom packages uploaded by you or your organization are downloaded as **files** one by one.
    :::image type="content" source="media\environment-migration\prepare-file-2.png" alt-text="Screenshot showing settings are downloaded to different file formats.":::

**After the files are downloaded, you can migrate.**

## Create and configure an environment

1. Create an environment in the workspace list/creation hub. After you create a new environment, the Environment page appears.

2. In the **Home** tab of the environment, make sure the **Runtime** version is the same as your existing workspace Runtime.

    :::image type="content" source="media\environment-migration\create-and-configure-env-runtime.png" alt-text="Screenshot of showing where to check the Runtime version.":::

3. *Skip this step if you didn't have any public libraries in your workspace settings.* Navigate to the **Public Libraries** section and select **Add from .yml** on the ribbon. Upload **Publiclibrary.yml**, which you downloaded from the existing workspace settings.

    :::image type="content" source="media\environment-migration\create-and-configure-env-public-library.png" alt-text="Screenshot showing where to select Add from .yml to install a public library.":::

4. *Skip this step if you didn't have any custom libraries in your workspace settings.* Navigate to the **Custom Libraries** section and select **Upload** on the ribbon. Upload the custom library files, which you downloaded from the existing workspace settings.

    :::image type="content" source="media\environment-migration\create-and-configure-env-custom-library.png" alt-text="Screenshot showing where to select Upload to install a custom library.":::

5. *Skip this step if you didn't have any Spark properties in your workspace settings.* Navigate to the **Spark properties** section and select **Upload** on the ribbon. Upload the **Sparkproperties.yml** file, which you downloaded from the existing workspace settings.

6. Select **Publish** and carefully review the changes again. If everything is correct, publish the changes. Publishing takes several minutes to finish.

**After publishing is complete, you have successfully configured your environment.**

## Enable and select a default environment in workspace settings

> [!IMPORTANT]
> All existing configurations will be **discarded** when you select **Enable environment**. Make sure that you have downloaded all existing configurations and installed them successfully in an environment before proceeding.

1. Navigate to **Workspace settings** -> **Data Engineering/Science** -> **Environment**, and select **Enable environment**. This action removes the existing configurations and begins your workspace-level environment experience.

    The following screen appears when you successfully delete the existing configurations.

    :::image type="content" source="media\environment-migration\enable-default-env-new-workspace-setting.png" alt-text="Screenshot of new workspace settings.":::

1. Move the **Customize environment** toggle to the **On** position. This option allows you to attach an environment as a workspace default.

    :::image type="content" source="media\environment-migration\enable-default-env-turn-on-toggle.png" alt-text="Screenshot showing where to move the Customize environment toggle to the On position.":::

1. Select the environment you configured in the previous steps as the workspace default, and select **Save**.

    :::image type="content" source="media\environment-migration\enable-default-env-attach-default.png" alt-text="Screenshot showing where to select an environment to attach it as the default environment.":::

1. Confirm that your new environment now appears under **Default environment for workspace** on the **Spark settings** page.

    :::image type="content" source="media\environment-migration\success.png" alt-text="Screenshot of migration succeeds.":::

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md).
