---
title: Trigger Fabric items
description: Understand how to trigger Fabric items with Data Activator and automate data loading and transformation processes.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.subservice: rti-activator
ms.date: 11/19/2024
---

# Activate Fabric items

Fabric data pipelines and notebooks can be used to load or transform data in Microsoft Fabric. Data Activator rules can take an action that starts jobs on other Fabric items, which can be used in the following scenarios:

* Start data pipelines when new files are loaded to Azure storage accounts, to load files into OneLake. You can learn more about [Azure Storage events](/azure/storage/blobs/storage-blob-event-overview).

* Start Fabric notebooks when issues with data quality are found using Power BI reports. You can learn more about [getting data from Power BI](data-activator-get-data-power-bi.md).

> [!IMPORTANT]
> Data Activator is currently in preview.

## Activate a Fabric item

Start by selecting an existing rule or [creating a rule](data-activator-create-triggers-design-mode.md).

In the rule definition pane on the right side of the screen, find **Action** section to define the action when chosen condition is met. Select **Fabric item** as the action type and select a specific item from the [OneLake Data Hub](/fabric/get-started/onelake-data-hub) pop-up window.

:::image type="content" source="media/data-activator-trigger-fabric-items/data-activator-fabric-item.png" alt-text="Screenshot showing Fabric item selected from the Type dropdown.":::

![Screenshot showing Data Activator Action card with a notebook being selected.](media/data-activator-trigger-fabric-items/data-activator-fabric-item-select-item.png)

## Test, start, or stop a Data Activator rule

Once you enter all of the required information, select **Save** to save the Data Activator rule. To test the trigger, select **Test action**. To start the trigger, select **Start** from the top menu bar and to stop the rule, select **Stop.** **Stop** only appears while a rule is active.  

## Related content

* [Get started with Data Activator](data-activator-get-started.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../get-started/microsoft-fabric-overview.md)
