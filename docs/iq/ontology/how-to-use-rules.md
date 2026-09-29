---
title: Define Business Rules (Preview)
description: Learn about using business rules in ontology (preview).
ms.date: 09/15/2026
ms.topic: how-to
---

# Create and manage business rules in ontology (preview)

In ontology (preview), business rules let you define the rules and guardrails that your operations use day to day. Write rules in natural language and link them to entity types, properties, and relationship types so consumers can discover the same rules. Consumers of ontology, like AI agents, can use these rules to ground their responses.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

This article shows how to create, browse, edit, and delete business rules in the new ontology experience.

## Prerequisites

Before creating business rules, ensure you have:
* Write permission on the ontology item.
* Entity types, properties, or relationship types in the ontology if you want to link the rule to ontology concepts.

## Access business rules

1. Open an ontology item in Fabric.
1. In the **Explorer**, expand **Overview** and select **Rules**.

    :::image type="content" source="media/how-to-use-rules/open-rules.png" alt-text="Screenshot of opening the rules page." lightbox="media/how-to-use-rules/open-rules.png":::

### View created rules

After you create rules, the **Business rules** page lists the rules in the ontology and the entity types linked to each rule.

:::image type="content" source="media/how-to-use-rules/rules-list.png" alt-text="Screenshot of the Business rules page, showing saved rules and linked entity types." lightbox="media/how-to-use-rules/rules-list.png":::

To browse and find rules:

* Enter text in **Search rules by name** to find a rule by name.
* Select **Entity type** to filter the list. You can select more than one entity type.
* Select **Clear all** in the entity type menu to remove entity type filters.
* Select a rule name or row to open the rule details page.

If a rule links only to properties or relationships, open the rule details page to view all linked concepts.

## Create a business rule

1. On the **Business rules** page, the **+ Create rule** button appears if there are no rules yet, and the **New rule** button appears if there are already rules created. Select the button that's visible in your scenario.
1. On the rule details page, enter a **Rule name** and a **Rule definition** that describes what must, must not, or should be true.

    For example: *Every refrigeration unit must receive a safety inspection at least once every 90 days.*

1. Optionally, add [linked ontology concepts](#link-ontology-concepts).
1. Optionally, add a [description and additional metadata](#add-rule-metadata).
1. Select **Save**.

    :::image type="content" source="media/how-to-use-rules/completed-rule.png" alt-text="Screenshot of a completed business rule with a rule definition, linked entity type, description, and metadata." lightbox="media/how-to-use-rules/completed-rule.png":::

The **Rule name** and **Rule definition** fields are required. Linked ontology concepts, description, and additional metadata are optional.

### Write a clear rule definition

A useful rule definition expresses how your business operates.

| Pattern | Example |
| --- | --- |
| Must be true | Every refrigeration unit must receive a safety inspection at least once every 90 days. |
| Must not be true | A shipment must not depart when its cold-chain temperature is above the approved threshold. |
| Should normally be true | Orders over $50,000 should have finance approval before release. |

Suggestions:

* Use the same names and business language as your ontology.
* Link each entity type, property, or relationship type that the rule explicitly depends on.
* Put rationale and supporting context in the description instead of combining it with the rule definition.
* Use additional metadata for consistent structured context such as category, policy name, or documents.

### Link ontology concepts

Linked concepts make rules easier for authorized agents and applications to discover and interpret.

1. On the rule details page, under **Linked ontology concepts**, select **Add concept**.
1. In the **Add concepts** dialog, use the following tabs to browse or search the ontology:

    * **Entity types**
    * **Properties**
    * **Relationships**

1. Select one or more concepts.
1. Select **Save** to add the selected concepts to the rule.

    :::image type="content" source="media/how-to-use-rules/add-rule-concepts.png" alt-text="Screenshot of the Add concepts dialog with the entity type list and concept picker tabs." lightbox="media/how-to-use-rules/add-rule-concepts.png":::

To remove a linked concept, deselect the concept and then save the rule.

### Add rule metadata

The **Rule metadata** section provides optional context for reviewers, agents, and other consumers.

1. On the rule details page, find **Rule metadata** and select **Edit**.
1. Enter an optional **Description**.
1. To add structured context, select **Add** under **Additional metadata**.
1. Enter a key and value, and then select **Add**.
1. Repeat the previous step for any additional key-value pairs.
1. Select **Save** in the **Rule metadata** dialog.
1. Select **Save** on the rule details page.

    :::image type="content" source="media/how-to-use-rules/rule-metadata.png" alt-text="Screenshot of the Rule metadata dialog with a description and an additional metadata key-value pair." lightbox="media/how-to-use-rules/rule-metadata.png":::

Examples of useful additional metadata include:

* `category: maintenance`
* `region: EMEA`
* `policyFamily: food-safety`
* `owner: facilities-operations`

## Edit or delete a business rule

To edit a business rule:
1. On the **Business rules** page, select the rule you want to edit.
1. Update the rule name or rule definition.
1. Add or remove linked ontology concepts as needed.
1. Select **Edit** in the **Rule metadata** section to update the description or additional metadata.
1. Select **Save**.

Removing the last linked concept displays the same non-blocking warning that appears when you create a rule without links.

To delete a business rule:

1. On the **Business rules** page, find the rule you want to delete.
1. Select **More actions (...)** and then select **Delete rule**.
1. Review the confirmation dialog.
1. Select **Delete**.

    :::image type="content" source="media/how-to-use-rules/delete-rule-confirmation.png" alt-text="Screenshot of the Delete rule confirmation dialog." lightbox="media/how-to-use-rules/delete-rule-confirmation.png":::

Deleting a rule removes it from every linked entity type.

>[!IMPORTANT]
> Deleting a business rule can't be undone.

## Retrieve business rules with ontology MCP

Authorized agents and applications can use the ontology MCP `list_ontology_rules` tool to retrieve the defined business rules. The tool returns each rule's name, natural-language definition, linked entity types, properties and relationships, description, and additional metadata.

The tool is read-only, leaving it up to you to interpret and operationalize the rules because ontology doesn't execute on them.

## Migrate Activator rules from ontology old experience

The [ontology old experience](old-experience/overview.md) supported alerting of rules with [Fabric Activator](../../real-time-intelligence/data-activator/activator-introduction.md). The new ontology experience doesn't currently provide direct integration with Activator.

If you're migrating an old experience ontology to the new experience, follow these steps to recreate your rules.

1. Identify the old experience ontology item and its Activator integrations.
1. [Migrate](overview.md#migrate-from-old-experience) the old experience item to the new experience.
1. Recreate the relevant business logic as ontology business rules expressed in natural language in the new experience item.
1. Configure Activator separately for the data sources and services that are related to your rules logic (outside of the ontology new experience). For detailed instructions, see [Tutorial: Create and activate a Fabric Activator rule](../..//real-time-intelligence/data-activator/activator-tutorial.md).

> [!NOTE]
> The ontology new experience doesn't replace or migrate existing Activator workflows.

### Share your feedback

We'd like to hear how you want to use Activator with the ontology new experience and rules in ontology. Your feedback can help us understand which integration scenarios are most important.

Submit feedback through [Fabric feedback channels](../../fundamentals/feedback.md).

## Limitations and considerations

* A business rule is a natural-language definition. Ontology doesn't run the rule against data or execute actions.
* Changes to the ontology can affect business rules.
    * Renaming a linked entity type, property, or relationship type updates the structured reference in the rule.
    * Deleting a linked concept removes it from the rule.
* The ontology new experience doesn't provide Activator integration, and migrating to the new experience doesn't replace or migrate existing Activator workflows.

### Troubleshooting

| Issue | Resolution |
| --- | --- |
| **Create** or **Save** isn't available | Enter values in the required **Rule name** and **Rule definition** fields. |
| A rule name is rejected | Choose a unique name. |
| A concept isn't available in the picker | Confirm that the entity type, property, or relationship type exists in the ontology. |
| A metadata key is rejected | Use a key that isn't already present in the rule. |
| A saved rule isn't visible | Clear the rule-name search and any entity type filters. |

## Related content

* [Create entity types](how-to-create-entity-types.md)
* [Create relationship types](how-to-create-relationship-types.md)
* [Add metadata](how-to-add-metadata.md)
