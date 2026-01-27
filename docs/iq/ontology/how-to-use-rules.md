---
title: Rules (with Fabric Activator)
description: Learn about using Fabric Activator rules in ontology (preview).
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 01/23/2026
ms.topic: how-to
---

# Rules in ontology (preview) (with Fabric Activator)

The *rules* feature of ontology (preview) lets you automate and manage event-driven alerts directly within your entity types. With the integrated capabilities of [Fabric Activator](../../real-time-intelligence/data-activator/activator-introduction.md), you can achieve real-time monitoring and response for your business entities. This feature allows you to define alerts that monitor properties across every instance of an entity type, to ensure comprehensive, ongoing oversight.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Rules transform ontologies from static information models to dynamic, operational frameworks. These frameworks are capable of automatically initiating business processes through alerts and automated actions, all within a seamless and context-aware environment. This feature helps you unlock automation capabilities without needing to switch between tools or write custom code, to streamline workflows and enhance efficiency.

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

1. Open the rules configuration from the ontology overview, or from the preview experience.

    To open rules from the ontology overview, select **...** next to an entity type name to open its options menu. Hover over **Add and view rule**, then select **View rules**.

    :::image type="content" source="media/how-to-use-rules/view-rules-ontology.png" alt-text="Screenshot of View rules from the ontology page." lightbox="media/how-to-use-rules/view-rules-ontology.png":::

    To open rules from the preview experience, select **Add and view rules > View rules** from the menu ribbon.

    :::image type="content" source="media/how-to-use-rules/view-rules-preview.png" alt-text="Screenshot of View rules from the preview page." lightbox="media/how-to-use-rules/view-rules-preview.png":::

1. The **Rules** panel opens, showing all the rules associated with an entity type. 

    :::image type="content" source="media/how-to-use-rules/rules-panel.png" alt-text="Screenshot of Rules panel." lightbox="media/how-to-use-rules/rules-panel.png":::

1. By default, ontology rules are saved to a new Fabric Activator item. If you want to make changes, select **Edit** from the **Rules** panel. From there, you can change the name of the new Fabric Activator item or choose an existing Fabric Activator item to use instead.

    :::image type="content" source="media/how-to-use-rules/edit-activator.png" alt-text="Screenshot of selecting the Fabric Activator item.":::

    >[!NOTE]
    >We recommend saving all rules for an ontology to the same workspace and Fabric Activator item.

1. In the main **Rules** panel, create a new rule with the **Add rule** button.

    :::image type="content" source="media/how-to-use-rules/add-rule.png" alt-text="Screenshot of adding the rule.":::

1. Configure the rule, including conditions, actions, and save location. For more information about these fields, see [Create a rule in Fabric Activator](../../real-time-intelligence/data-activator/activator-create-activators.md).

    :::image type="content" source="media/how-to-use-rules/rule-configuration.png" alt-text="Screenshot of configuring the rule." lightbox="media/how-to-use-rules/rule-configuration.png":::

    When you're finished configuring, select **Create**.

1. The rule is now visible in the **Rules** panel. To start or stop the rule, toggle the switch next to the rule name.

    :::image type="content" source="media/how-to-use-rules/completed-rule.png" alt-text="Screenshot of the option to disable a rule.":::

## View and edit a rule

To examine the rule in more detail, open it in Fabric Activator. Select **...** next to the rule name to open its options menu, then **Open in Activator**. 

:::image type="content" source="media/how-to-use-rules/open-in-activator.png" alt-text="Screenshot of opening the rule in Fabric Activator.":::

In Fabric Activator, you can make further edits to the rule and analyze its conditions and actions. For more information, see [Create a rule in Fabric Activator](../../real-time-intelligence/data-activator/activator-create-activators.md).