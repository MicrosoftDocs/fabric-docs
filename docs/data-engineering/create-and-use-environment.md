---
title: Create and use an Environment
description: Learn how to create and use the Environment in your Notebooks and Spark job definitions.
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.date: 10/01/2023
ms.search.for: Create and use Environment
---

# Environment 101: create, configure and use an Environment

This tutorial gives you an overview of creating, configuring and using an Environment.
  
> [!IMPORTANT]
> The Fabric Environment is currently in PREVIEW.

## Create an Environment

There are multiple entry points of creating an Environment.

### Create an Environment from homepages, workspace view and creation hub

1. **Data Engineering** homepage
    - You can easily create an Environment through the **Environment** card under the **New** section in the Data Engineering homepage.

    :::image type="content" source="media\environment-introduction\env-de-card.png" alt-text="Environment card in DE homepage.":::

2. **Data Science** homepage
    - Similar with the DE homepage, you can easily create an Environment through the **Environment** card under the **New** section in the Data science homepage.

    :::image type="content" source="media\environment-introduction\env-ds-card.png" alt-text="Environment card in DS homepage.":::

3. **Workspace** view
    - If you are in your workspace, you can also create an  **Environment** through the **New** dropdown.

    :::image type="content" source="media\environment-introduction\env-ws-card.png" alt-text="Environment card in workspace view.":::

4. **Creation hub**
    - In the creation hub, you can find the **Environment** card under both **Data Engineering** and **Data Science** sections.

    :::image type="content" source="media\environment-introduction\env-creation-hub-card.png" alt-text="Environment card in creation hub.":::

### Create an Environment from attachment dropdowns

You can also find the entry points of creating new Environment at the places that you can attach the Environment. Learn how to attach and use an Environment: [Attach an Environment](create-and-use-environment.md\#attach-an-environment)

1. **Notebook attachment dropdown**
    - In the **Home** tab of Notebook ribbon, there is a dropdown to attach Environment. You can create a new one through the **Environment** dropdown.
    :::image type="content" source="media\environment-introduction\env-dropdown-nb.png" alt-text="Environment creation through attachment dropdown in Notebook":::

2. **Spark job definition attachment dropdown**
    - In the **Home** tab of Spark job definition ribbon, there is a dropdown to attach Environment as well. You can create a new one through the **Environment** dropdown.
    :::image type="content" source="media\environment-introduction\env-dropdown-sjd.png" alt-text="Environment creation through attachment dropdown in SJD":::

3. **Workspace setting attachment dropdown**
    - In the **Data Engineering/Science** section of workspace setting, workspace admin can attachment an Environment as workspace default Environment. Learn more about how to attach an Environment as workspace default: [Attach an Environment as the workspace default](create-and-use-environment.md\#attach-an-environment-as-the-workspace-default). You can also create a new one through the **Environment** dropdown.
    :::image type="content" source="media\environment-introduction\env-dropdown-ws.png" alt-text="Environment creation through attachment dropdown in WS setting":::

## Configure an environment

There are three major components you can configure in the Environment: Spark runtime, libraries, and Spark compute.

### Choose a Spark runtime

In the Microsoft Fabric Environment, you can choose from various [Spark runtimes](runtime.md), each with its own default settings and pre-installed packages. To view the available runtimes, navigate to the **Home** tab of the Environment and select the **Runtime** dropdown. From there, you can select a runtime that best suits your needs.

:::image type="content" source="media\environment-introduction\env-runtime-dropdown.png" alt-text="Choose runtime in Environment":::

> [!IMPORTANT]
>
> - If you are updating the runtime in an Environment with existing configurations/libraries, the contents need to be re-publish based on the newly updated runtime version.
> - If the existing configurations/libraries are not compatible with newly updated runtime version, the publishing will fail. You need to remove the incompatible ones and publish the Environment again.
>

### Configure Spark compute

[Microsoft Fabric Spark compute](spark-compute.md) provides unparalleled speed and efficiency of running on Spark in as well as requirement tailored experiences. In the Environment, you can choose from various pool created by workspace admins and capacity admins. You can further adjust the configurations and manage Spark properties to be effective on Spark sessions.
Learn more on [how to configure Spark compute](environment-manage-compute.md)

### Manage libraries

Except for the built-in libraries provided by each Spark runtime, Fabric Environment provides the ability to install the libraries from public sources or the custom ones built by you or your organization. Once the libraries are installed successfully, they will be available on the Spark sessions.
Learn more on [how to manage libraries](environment-manage-library.md)

### Save and Publish the changes

To save and publish changes in the Fabric Environment, you can navigate to the **Home** tab.
:::image type="content" source="media\environment-introduction\env-save-and-publish.png" alt-text="Save and Publish the changes":::

- The **Save** button becomes active when there are changes that have not been saved. If you refresh the page without saving, all pending changes will be lost. If any section contains invalid input, the Save button will be disabled. The Save action applies to all unsaved changes in both *Libraries* and *Spark compute* sections.
- The **Publish** button becomes active when there are changes that have not yet been published. You can directly publish these changes without first saving them. Clicking the Publish button will take you to the **Pending changes** page where you can review all the changes before publishing. Once you choose to **Publish all** the changes, the Fabric Environment will run jobs on the backend to prepare the configurations for use. This process may take several minutes, particularly if there are library changes involved.

A **banner** promoting Save and Publish will appear when there are pending changes.

- By clicking on the corresponding buttons in the banner, you can **Save** or **Publish** the changes. These buttons have the same functionalities as the ones on the Home tab.
- During the publish process, clicking **View progress** button in the banner can take you to the **pending changes** page again. You can find **Cancel** button in pending changes page during publishing.
- You will be notified once the publishing is done or encounters error.

## Attach an Environment

Microsoft Fabric Environment can be attached to your Fabric Notebooks, Fabric Spark job definitions and even the Data Engineering/Science workspaces.

### Attach an Environment to Notebook or Spark job definitions

You can find the **Environment** dropdown in both Notebook and Spark job definition's Home tab. The available Environments are listed in the drop-down. If you select any Environment, the Spark compute and libraries configured in it are effective once the Spark session get started.




