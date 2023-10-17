---
title: Azure Batch activity
description: Learn how to add an Azure Batch activity to a pipeline and use it to connect to an Azure Batch instance and run a command.
ms.reviewer: xupxhou
ms.author: abnarain
author: nabhishek
ms.topic: how-to
ms.date: 10/17/2023
---

# Use the Azure Batch activity to run a command on an Azure Batch instance

The Azure Batch activity in Data Factory for Microsoft Fabric allows you to run a command against an Azure Batch instance.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add an Azure Batch activity to a pipeline with UI

To use an Azure Batch activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for Azure Batch in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   > [!NOTE]
   > You may need to expand the menu and scroll down to see the KQL activity as highlighted in the screenshot below.

   :::image type="content" source="media/azure-batch-activity/add-azure-batch-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Azure Batch activity highlighted.":::

1. Select the new KQL activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/azure-batch-activity/azure-batch-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Azure Batch activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### KQL activity settings

1. Select the **Settings** tab, then