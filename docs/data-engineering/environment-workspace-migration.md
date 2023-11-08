---
title: Migrate the workspace libraries and Spark properties to a default environment 
description: Learn how to migrate the existing libraries and Spark properties to an environment.
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.date: 11/15/2023
---

# Migrate the workspace libraries and Spark properties to a default environment

The Data Engineering/Science experience at workspace setting has been upgraded. Adding new libraries and Spark properties are no longer supported in workspace setting. Instead, you can create a Fabric environment, configure the library and property in it and attach it as the workspace default environment. The existing libraries and Spark properties in your workspace need to migrate to a default environment. In this tutorial, you learn how to migrate the existing workspace libraries and Spark properties to an environment.

> [!IMPORTANT]  
>
> - The workspace setting is restricted to admin only.
> - The existing workspace settings are still effective for your Notebooks or Spark job definitions if no environment is attached to them. However, further changes are no longer accepted. We **STRONGLY RECOMMEND** you migrate them to an environment to have the full support.
> - The migration contains the step that removes all the existing configurations. Please **follow the instruction** strictly in this tutorial. There is no way to bring back the files if they are deleted accidentally.
>

## Prepare the files for migration

In the upgraded workspace setting, you can review your existing configurations.
:::image type="content" source="media\environment-migration\prepare-file-1.png" alt-text="Screenshot of preparing the files for migration-1.":::

1. Record the current **Runtime** version.

2. Download existing configurations by clicking **Download all files** button.

    The content will be downloaded as different files. **Sparkproperties.yml** records all the Spark properties key value pairs. The **Publiclibrary.yml** records all the public library definitions. The custom packages uploaded by you or your organization are downloaded as **files** one by one.
    :::image type="content" source="media\environment-migration\prepare-file-2.png" alt-text="Screenshot of downloading files.":::

**Once the files are downloaded, you are prepared to migrate.**

## Create and configure an environment

1. Create an environment in the workspace list/creation hub. The page directs to the environment page after creation.

2. At the home tab of the environment, make sure the **Runtime** version is the same with your existing workspace Runtime.

    :::image type="content" source="media\environment-migration\create-and-configure-env-runtime.png" alt-text="Screenshot of confirming runtime version.":::

3. *Skip this step if there was no public library in your workspace setting.* Navigate to the **Public Libraries** section, find **Add from .yml** button in the ribbon. Upload the **Publiclibrary.yml**, which was downloaded from the workspace setting.

    :::image type="content" source="media\environment-migration\create-and-configure-env-public-library.png" alt-text="Screenshot of installing public library.":::

4. *Skip this step if there was no custom library in your workspace setting.* Navigate to the **Custom Libraries** section, find **Upload** button in the ribbon. Upload the **custom library files**, which was downloaded from the workspace setting.

    :::image type="content" source="media\environment-migration\create-and-configure-env-custom-library.png" alt-text="Screenshot of install custom library.":::

5. *Skip this step if there was no Spark property in your workspace setting.* Navigate to the **Spark properties** section, find **Upload** button in the ribbon. Upload the **Sparkproperties.yml**, which was downloaded from the workspace setting.

6. Click **Publish** and review the changes again. Publish the changes after confirmation. The publishing takes several minutes to finish.

**Once the publish is done, the environment is configured successfully.**

## Enable default environment in workspace setting

> [!IMPORTANT]
> All the existing configurations will be **discarded** after “Enable environment”. Please make sure that you have **downloaded** everything and **installed** them successfully in an environment.
>

1. Navigate to *Workspace settings* -- *Data Engineering/Science* -- *Environment* again, click **Enable environment** button to clean the existing configurations and start the journey with Workspace level environment.

    This screen appears if the existing configurations are deleted successfully.
    :::image type="content" source="media\environment-migration\enable-default-env-new-workspace-setting.png" alt-text="Screenshot of new workspace setting.":::

2. Turn on the **Customize environment** toggle. This toggle allows you to attach an environment as workspace default.

    :::image type="content" source="media\environment-migration\enable-default-env-turn-on-toggle.png" alt-text="Screenshot of turning on customize environment toggle.":::

3. Attach the environment you configured as the workspace default.

    :::image type="content" source="media\environment-migration\enable-default-env-attach-default.png" alt-text="Screenshot of attaching default environment.":::

    **Now, we successfully migrate the existing configurations to an environment.**

    :::image type="content" source="media\environment-migration\success.png" alt-text="Screenshot of migration succeeds.":::

## Next steps

Advance to the next articles to learn how to create and get started with your own Fabric environment:

- To get started with [!INCLUDE [product-name](../includes/product-name.md)] environment, see [Create, configure, and use an environment](create-and-use-environment.md).
