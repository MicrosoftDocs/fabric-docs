---
title: Use rules (with Fabric Activator)
description: Learn about using Fabric Activator rules in ontology (preview).
ms.date: 04/24/2026
ms.topic: how-to
---

# Rules in ontology (preview) (with Fabric Activator)

The *rules* feature of ontology (preview) lets you automate and manage event-driven alerts directly within your entity types. With the integrated capabilities of [Fabric Activator](../../real-time-intelligence/data-activator/activator-introduction.md), you can achieve real-time monitoring and response for your business entities. This feature allows you to define alerts that monitor properties across every instance of an entity type, to ensure comprehensive, ongoing oversight.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Rules transform ontologies from static information models to operationalized ones. The ontology becomes capable of automatically initiating business processes through alerts and automated actions, all within a seamless and context-aware environment. This feature helps you unlock automation capabilities without needing to switch between tools or write custom code, to streamline workflows and enhance efficiency.

>[!NOTE]
> Rules in ontology (preview) rely on Fabric Activator and are subject to Fabric Activator costs. For more information about Fabric Activator pricing, see [Understand Activator capacity consumption, usage reporting, and billing](../../real-time-intelligence/data-activator/activator-capacity-usage.md).


## Prerequisites

Before defining rules, make sure you have the following prerequisites:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** enabled on your tenant.
* An ontology (preview) item with [data binding](how-to-bind-data.md) completed for at least one time series property.

## Key concepts

Rules use the following ontology (preview) concepts. For definitions of these terms, see the [Ontology (preview) glossary](resources-glossary.md).

* *Entity type*
* *Rule*
* *[Fabric Activator](../../real-time-intelligence/data-activator/activator-introduction.md)*

## Create a rule

1. Open the rules configuration from the Home configuration canvas or from the entity type details.

    To open rules from the configuration canvas, select **...** next to an entity type name to open its options menu. Hover over **Manage rules**, then select **Add rule**.

    :::image type="content" source="media/how-to-use-rules/add-rules-canvas.png" alt-text="Screenshot of Manage rules from the Home configuration canvas." lightbox="media/how-to-use-rules/add-rules-canvas.png":::

    To open rules from the entity type details view (any tab), select **Manage rules > Add rule**.

    :::image type="content" source="media/how-to-use-rules/add-rules-preview.png" alt-text="Screenshot of View rules from the entity type details Configuration tab." lightbox="media/how-to-use-rules/add-rules-preview.png":::

1. The **Add rule** panel opens and displays the rule configuration options.

    :::image type="content" source="media/how-to-use-rules/add-rule.png" alt-text="Screenshot of Add rule panel." lightbox="media/how-to-use-rules/add-rule.png":::

1. Configure the rule, including **Details**, **Monitor**, **Conditions**, **Actions**, and **Save location**. 

    While configuring, keep the following notes in mind:

    * Ontology-authored rules support temporal conditions (for example, thresholds exceeded over a time window) and aggregations via the Fabric Activator condition configuration, evaluated per entity instance. For more information about using these fields, see [Create a rule in Fabric Activator](../../real-time-intelligence/data-activator/activator-create-activators.md).

    * By default, ontology rules are saved to a new Fabric Activator item. If you want to choose an existing Fabric Activator item instead, select it manually from the **Save location** step. We recommend saving all rules for an ontology to the same workspace and Fabric Activator item.

        :::image type="content" source="media/how-to-use-rules/save-location.png" alt-text="Screenshot of changing the save location.":::

1. When you're finished configuring, select **Create**.

1. The rule is now visible in the **Rules** panel. To start or stop the rule, toggle the switch next to the rule name.

    :::image type="content" source="media/how-to-use-rules/completed-rule.png" alt-text="Screenshot of the option to disable a rule." lightbox="media/how-to-use-rules/completed-rule.png":::

## View and edit a rule

You can reopen the **Rules** panel at any time by selecting **View rules** from any of the **Manage rules** dialogs described in [Create a rule](#create-a-rule).

In the **Rules** pane, you can: 
* Change which Fabric Activator item is used to store ontology rules, by selecting **Edit** next to the Activator name.

    :::image type="content" source="media/how-to-use-rules/edit-activator-overall.png" alt-text="Screenshot of editing the overall activator instance used for ontology rules.":::

* Manage the rule by selecting **...** next to the rule name to open its options menu. From here, you can **Edit** the rule, **Delete** the rule, or **Open in Activator**. Opening a rule in Fabric Activator lets you make more edits to the rule and analyze its conditions and actions. For more information, see [Create a rule in Fabric Activator](../../real-time-intelligence/data-activator/activator-create-activators.md).

    :::image type="content" source="media/how-to-use-rules/rule-options.png" alt-text="Screenshot of the options for a rule.":::
