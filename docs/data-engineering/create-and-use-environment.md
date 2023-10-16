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

The Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of data engineering and data science experiences. Learn more about Fabric Spark runtime: [Apache Spark Runtime in Fabric](spark-compute.md)

Through the Runtime dropdown in **Home** tab of Environment, you can see all the available **Spark runtime**. You can pick a runtime that works well with your requirements.

:::image type="content" source="media\environment-introduction\env-runtime-dropdown.png" alt-text="Choose runtime in Environment":::


## Attach an Environment

### Attach an Environment as the workspace default
