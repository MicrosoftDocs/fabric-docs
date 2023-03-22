---
title: Creating a lakehouse with OneLake
description: Follow steps to create a lakehouse and load data with OneLake.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.date: 03/24/2023
---

# Creating a lakehouse with OneLake

[!INCLUDE [preview-note](../includes/preview-note.md)]

This tutorial is a quick guide to creating a lakehouse and getting started with the basic methods of interacting with it. After completing this tutorial, you'll have a lakehouse provisioned inside of Microsoft Fabric working on top of OneLake.

## Create a lakehouse

1. In the upper left corner of the workspace home page, select **New** and then **Show all**.

1. Scroll down and choose **Lakehouse** under the **Data engineering** header.

1. Give your lakehouse a name and select **Create**.

   :::image type="content" source="media\create-lakehouse-onelake\new-lakehouse-name.png" alt-text="Screenshot showing where to enter your new lakehouse name." lightbox="media\create-lakehouse-onelake\new-lakehouse-name.png":::

1. A new lakehouse is created and if this is your first OneLake artifact, it's provisioned behind the scenes.

At this point, you have a lakehouse running on top of OneLake. Next, add some data and start organizing your lake.

## Load data to a lakehouse

1. In the file browser on the left, select **Files** and then select **New subfolder**. Name your subfolder and select **Create**.

   :::image type="content" source="media\create-lakehouse-onelake\new-subfolder-menu.png" alt-text="Screenshot showing where to select New subfolder in the menu." lightbox="media\create-lakehouse-onelake\new-subfolder-menu.png":::

1. You can repeat this step to add more subfolders as needed.

1. Select a folder and the select **Upload files** from the list.

1. Choose the file you want from your local machine and then select **Upload**.

   :::image type="content" source="media\create-lakehouse-onelake\upload-files-screen.png" alt-text="Screenshot of the upload files screen." lightbox="media\create-lakehouse-onelake\upload-files-screen.png":::

1. You’ve now added data to OneLake. To add data in bulk or schedule data loads into OneLake, use the **Get data** button to create pipelines. See more details about **Get data** features here: Data Integration Consolidated Documentation.

1. Select the More icon (**…**) for the file you uploaded and select **Properties** from the menu.

The **Properties** screen shows the various details for the file, including the URL and Azure Blob File System (ABFS) path for use with Notebooks. You can copy the ABFS into a Fabric Notebook to query the data using Spark. To learn more about notebooks in Microsoft Fabric, see [Explore the data in your Lakehouse with a notebook](..\data-engineering\lakehouse-notebook-explore.md).

Congratulations, you've created your first lakehouse with data stored in OneLake!

## Next steps

- [What are shortcuts?](onelake-shortcut-overview.md)
