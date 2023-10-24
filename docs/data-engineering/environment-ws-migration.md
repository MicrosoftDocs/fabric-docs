---
title: Migrate the workspace libraries and Spark properties to an default Environment 
description: Learn how to migrate the existing libraries and Spark properties to an Environment.
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.date: 10/01/2023
---

# Migrate the workspace libraries and Spark properties to an default Environment

The Data Engineering/Science experience at workspace setting has been upgraded. Adding new libraries and Spark properties are no longer supported in workspace setting. Instead, you can create a Fabric Environment, configure the library and property in it and attach it as the workspace default Environment. The existing libraries and Spark properties in your workspace need to migrate to a default Environment. In this tutorial, you learn how to migrate the existing workspace libraries and Spark properties to an Environment.

> [!IMPORTANT]  
>
> - The workspace setting is restricted to admin only.
> - The existing workspace settings are still effective for your Notebooks or Spark job definitions if no Environment is attached to them. However, further changes are no longer accepted. We **STRONGLY RECOMMEND** you migrate them to an Environment to have the full support.
> - The migration contains the step that removes all the existing configurations. Please **follow the instruction** strictly in this tutorial. There is no way to bring back the files if they are deleted accidentally.
>

## Prepare the files for migration

In the upgraded workspace setting, you can review your existing configurations.
:::image type="content" source="media\environment-migration\prepare-file-1.png" alt-text="Prepare the files for migration-1":::

- Step 1: Record the current **Runtime** version.

- Step 2: Download existing configurations by clicking **Download all files** button.
    >
    > The content will be downloaded as different files. **Sparkproperties.yml** records all the Spark properties key value pairs. **Publiclibrary.yml** recordes all the public library definitions. The custom packages uploaded by you or your organization are downloaded as **files** one by one.
    > :::image type="content" source="media\environment-migration\prepare-file-2.png" alt-text="Download files":::
    >

**Onces the files are downloaded, you are prepared to migrate.**

## Create and configure an environment

- Step 1: Create an Environment in the workspace list/creation hub. The page directs to the Environment page after it’s created.

- Step 2: At the home tab of Environment, make sure the **Runtime** version is the same with your existing workspace Runtime.
    >
    > :::image type="content" source="media\environment-migration\create-and-configure-env-runtime.png" alt-text="Confirm runtime version":::
    >

- Step 3: *Skip this step if there was no public library in your workspace setting.* Navigate to the **Public Libraries** section, find **Add from .yml** button in the ribbon, upload the **Publiclibrary.yml**, which was downloaded from the workspace setting.
    >
    > :::image type="content" source="media\environment-migration\create-and-configure-env-public-lib.png" alt-text="Install public library":::
    >

- Step 4: *Skip this step if there was no custom library in your workspace setting.* Navigate to the **Custom Libraries** section, find **Upload** button in the ribbon, upload the **custom library files**, which was downloaded from the workspace setting.
    >
    > :::image type="content" source="media\environment-migration\create-and-configure-env-custom-lib.png" alt-text="Install custom library":::
    >

- Step 5: *Skip this step if there was no Spark property in your workspace setting.* Navigate to the **Spark properties** section, find **Upload** button in the ribbon, upload the **Sparkproperties.yml**, which was downloaded from the workspace setting.

- Step 6: Click **Publish** and review the changes again. Publish the changes after confirmation. The publishing may take several minutes to finish.

**Once the publish is done, the Environment is configured successfully.**

## Enable default Environment in workspace setting

>
> [!IMPORTANT]
> All the existing configurations will be **discarded** after “Enable environment”. Please make sure that you have **downloaded** everything and **installed** them successfully in an Environment.
>

- Step 1: Navigate to Workspace settings -- Data Engineering/Science -- Environment again, click **Enable environment** button to clean the existing configurations and start the journey with Workspace level Environment.
    >
    > This screen appears if the existing configurations are deleted successfully.
    > :::image type="content" source="media\environment-migration\enable-default-env-new-ws-setting.png" alt-text="New workspace setting":::
    >

- Step 2: Turn on the **Customize environment** toggle. This will allow you to attach an Environment as workspace default.
    >
    > :::image type="content" source="media\environment-migration\enable-default-env-turn-on-toggle.png" alt-text="Turn on customize environment toggle":::
    >

- Step 3: Attach the environment you configured as the workspace default.
    >
    > :::image type="content" source="media\environment-migration\enable-default-env-attach-default.png" alt-text="Attach default environment":::
    >

**Now, we successfully migrate the existing configurations to an Environment.**
:::image type="content" source="media\environment-migration\success.png" alt-text="Migration done":::
