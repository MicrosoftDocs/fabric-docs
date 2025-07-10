---
title: Trigger Fabric items
description: Understand how to trigger Fabric items with Activator and automate data loading and transformation processes.
author: spelluru
ms.author: spelluru
ms.topic: concept-article
ms.custom: FY25Q1-Linter
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

## Limitations on passing parameters to Fabric items

Activator doesn't support passing parameters to all Fabric items. However, you can pass parameters from Azure events to the data pipeline in the following ways:

* **[Set up the rule from data pipeline](/fabric/data-factory/pipeline-storage-event-triggers)**
* **Set up the rule from Real-Time hub**: To set a rule from an Azure event in Real-Time hub, select **Azure events** on the left navigation menu, and then select **Set alert**.

:::image type="content" source="media/activator-trigger-fabric-items/pass-parameters-from-real-time-hub.png" alt-text="Screenshot showing creating storage event trigger from Real Time hub." lightbox="media/activator-trigger-fabric-items/pass-parameters-from-real-time-hub.png":::

> [!NOTE]
> Parameters might not be passed if you create the rule from the Activator portal or make changes to the action type after the rule is created.

## Related content

* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
