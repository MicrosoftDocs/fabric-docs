---
title: Trigger Fabric items
description: Understand how to trigger Fabric items with Activator and automate data loading and transformation processes.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter, ignite-2024
ms.date: 11/08/2024
ms.search.form: Data Activator Fabric Item
---

# Activate Fabric items

Fabric data pipelines and notebooks can be used to load or transform data in Microsoft Fabric. Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules can take an action that starts jobs on other Fabric items, which can be used in the following scenarios:

* Start data pipelines when new files are loaded to Azure storage accounts, to load files into OneLake. You can learn more about [Azure Storage events](/azure/storage/blobs/storage-blob-event-overview).

* Start Fabric notebooks when issues with data quality are found using Power BI reports. You can learn more about [getting data from Power BI](activator-get-data-power-bi.md).

## Activate a Fabric item

Start by selecting an existing rule or [creating a rule](activator-create-activators.md).

In the rule definition pane on the right side of the screen, find **Action** section to define the action when chosen condition is met. Select **Fabric item** as the action type and select a specific item from the [OneLake Data Hub](../../governance/onelake-catalog-overview.md) pop-up window.

:::image type="content" source="media/activator-trigger-fabric-items/data-activator-fabric-item.png" alt-text="Screenshot showing Fabric item selected from the Type dropdown.":::

:::image type="content" border="true" source="media/activator-trigger-fabric-items/data-activator-fabric-item-select-item.png" alt-text="Screenshot showing Activator Action card with a notebook being selected.":::

## Test, start, or stop an [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule

Once you enter all of the required information, select **Save** to save the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule. To test the rule, select **Test action**. To start the rule, select **Start** from the top menu bar and to stop the rule, select **Stop.** **Stop** only appears while a rule is active.  

## Related content

* [Get started with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-get-started.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
