---
title: Create a lakehouse with OneLake
description: Learn how to create a lakehouse and load data into it with OneLake; you can also add data in bulk or schedule data loads.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
ms.date: 03/05/2025
#customer intent: As a data engineer, I want to learn how to create a lakehouse and load data into it with OneLake so that I can efficiently manage and analyze large amounts of data in Microsoft Fabric.
---

# Bring your data to OneLake with Lakehouse

This tutorial is a quick guide to creating a lakehouse and getting started with the basic methods of interacting with it. After completing this tutorial, you'll have a lakehouse provisioned inside of Microsoft Fabric working on top of OneLake.

## Create a lakehouse

1. Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).

1. Select **Workspaces** from the left-hand menu.

1. To open your workspace, enter its name in the search textbox located at the top and select it from the search results.

1. In the upper left corner of the workspace home page, select **New item** and then choose **Lakehouse** from the **Store data** section.

1. Give your lakehouse a name and select **Create**.

   :::image type="content" source="media\create-lakehouse-onelake\new-lakehouse-name.png" alt-text="Screenshot showing where to enter your new lakehouse name." lightbox="media\create-lakehouse-onelake\new-lakehouse-name.png":::

1. A new lakehouse is created and, if this lakehouse is your first OneLake item, OneLake is provisioned behind the scenes.

At this point, you have a lakehouse running on top of OneLake. Next, add some data and start organizing your lake.

## Load data into a lakehouse

1. In the file browser on the left, select more options (**...**) next to **Files** and then select **New subfolder**. Name your subfolder and select **Create**.

   :::image type="content" source="media\create-lakehouse-onelake\new-subfolder-menu.png" alt-text="Screenshot showing where to select New subfolder in the menu.":::

1. You can repeat this step to add more subfolders as needed.

1. Select more options (**...**) next to your folder, and then select **Upload** > **Upload files** from the menu.

1. Choose the file you want from your local machine and then select **Upload**.

   :::image type="content" source="media\create-lakehouse-onelake\upload-files-screen.png" alt-text="Screenshot of the upload files screen where you can select a local file to upload.":::

1. You now have data in OneLake. To add data in bulk or schedule data loads into OneLake, use the **Get data** button to create pipelines. Find more details about options for getting data in [Microsoft Fabric decision guide: copy activity, dataflow, or Spark](../fundamentals/decision-guide-pipeline-dataflow-spark.md).

1. Select more options (**...**) for the file you uploaded and select **Properties** from the menu.

   The **Properties** screen shows the various details for the file, including the URL and Azure Blob File System (ABFS) path for use with Notebooks. You can copy the ABFS into a Fabric Notebook to query the data using Apache Spark. To learn more about notebooks in Fabric, see [Explore the data in your lakehouse with a notebook](..\data-engineering\lakehouse-notebook-explore.md).

Now you have your first lakehouse with data stored in OneLake.

## Related content

Learn how to connect to existing data sources with [OneLake shortcuts](onelake-shortcuts.md).
