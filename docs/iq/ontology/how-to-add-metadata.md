---
title: Add Metadata (Preview)
description: Learn how to add metadata, descriptions, synonyms, and additional metadata key-value pairs to ontology objects> Metadata helps agents answer ontology questions more accurately using business language.
ms.date: 09/04/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Add metadata (preview)

Metadata lets you add structured metadata detail to ontology objects, including descriptions, synonyms, and custom key-value attributes. By enriching your ontology with semantic metadata, you improve discoverability, provide context for AI agents, and ensure consistent understanding across your organization.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Metadata helps AI agents and downstream systems better understand your data by providing:

* **Descriptions** that explain the purpose and meaning of entity types, properties, and relationship types
* **Synonyms** that capture alternative names and terms for entity types
* **Additional metadata** that captures domain-specific attributes as key-value pairs

This metadata improves agent answer correctness, especially for prompts that depend on contextual information like units of measurement, sensitivity levels, or business definitions.

## Prerequisites

Before you add metadata to your ontology, make sure you have:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** [enabled on your Fabric tenant](overview-tenant-settings.md#ontology-item).
* An ontology (preview) item that has [entity types](how-to-create-entity-types.md) or [relationship types](how-to-create-relationship-types.md).
* Understanding of [core ontology concepts](overview.md#core-concepts).

## Add metadata to entity types

Entity types support descriptions, synonyms, and additional metadata key-value pairs. Follow these steps to add metadata to entity types.

1. In the **Explorer** pane of the Home configuration canvas, select the entity type to enrich. Select **View Entity Type details** from the top ribbon.

1. In the **Configure** tab, scroll down to the **Metadata** section. Add optional metadata properties.

    :::image type="content" source="media/how-to-add-metadata/add-metadata-entity.png" alt-text="Screenshot of adding metadata attributes to an entity type." lightbox="media/how-to-add-metadata/add-metadata-entity.png":::

    * The **Description** explains what the entity type represents, and helps users and agents understand the purpose and meaning of the entity type.

    * **Synonyms** are alternative names or terms that refer to the same entity type. Synonyms improve discoverability and help agents understand different ways users might reference the entity.

    * **Additional metadata** are key-value pairs for domain-specific metadata, such as:
        * Units of measurement (example: `Unit of measurement: cm`)
        * Sensitivity classification (example: `Sensitivity: Confidential`)
        * Business owner information (example: `Business owner: Elaheh Mansouri`)
        * Data quality indicators (example: `Data quality: Incomplete`)

        >[!IMPORTANT]
        > Additional metadata keys must be unique within each entity type. You can't use duplicate key names.

1. Select **Update** to apply your metadata changes.

## Add metadata to properties

Properties support descriptions and additional metadata key-value pairs, but not synonyms. Follow these steps to add metadata to properties.

1. From the **Configure** tab of the entity type details, hover over a property and select **Edit property metadata**.

    :::image type="content" source="media/how-to-add-metadata/add-metadata-properties.png" alt-text="Screenshot of adding metadata to properties from Configure tab." lightbox="media/how-to-add-metadata/add-metadata-properties.png":::

    Or, open the [data binding configuration](how-to-bind-data.md) for an entity type, and select **Metadata** next to the property in the Properties list.

    :::image type="content" source="media/how-to-add-metadata/add-metadata-properties-binding.png" alt-text="Screenshot of adding metadata to properties from binding page." lightbox="media/how-to-add-metadata/add-metadata-properties-binding.png":::

1. Add optional metadata, including a **Description** that explains what the property represents and how to interpret it, and **Additional metadata** as key-value pairs.

    :::image type="content" source="media/how-to-add-metadata/add-metadata-properties-2.png" alt-text="Screenshot showing property metadata configuration." lightbox="media/how-to-add-metadata/add-metadata-properties-2.png":::

    >[!IMPORTANT]
    > Additional metadata keys must be unique within each property. You can't use duplicate key names on the same property.

1. Select **Update** to apply your changes.

## Add metadata to relationship types

Relationship types support descriptions and additional metadata key-value pairs, but not synonyms. Follow these steps to add metadata to relationship types.

1. From the **Configure** tab of the entity type details, open the [relationship type configuration](how-to-create-relationship-types.md#create-relationship-type).

1. Scroll down to the **Metadata** section and select **Edit** to open the metadata configuration.

    :::image type="content" source="media/how-to-add-metadata/add-metadata-relationship.png" alt-text="Screenshot of editing relationship metadata." lightbox="media/how-to-add-metadata/add-metadata-relationship.png":::

1. Add a **Description** that explains the nature of the relationship and when it applies.

1. To add **Additional metadata**, enter key-value pairs.

    >[!IMPORTANT]
    > Additional metadata keys must be unique within each relationship type. You can't reuse the same key name.

1. Select **Update** to apply your metadata changes.

## Edit or delete metadata attributes

You can modify or remove metadata attributes from entity types, properties, and relationship types.

1. Select the ontology object (entity type, property, or relationship type) that contains the metadata you want to change.

1. In the **Metadata** section, edit or remove the metadata attribute you want to modify.

1. Select **Update** to save your changes.

## Guidance for metadata

Follow these best practices to maximize the value of metadata.

### Write clear descriptions

* Start descriptions with what the entity type, property, or relationship represents.
* Include the business context and purpose.
* Mention key characteristics or constraints.
* Keep descriptions concise but informative (one to three sentences).

### Use effective synonyms

* Include common abbreviations and acronyms.
* Add industry-specific terminology.
* Consider regional variations in terminology.
* Include both formal and informal terms that users might search for.

### Design meaningful key-value pairs for additional metadata

* Use consistent key naming conventions across your ontology.
* Document your key-value additional metadata standards for your team.
* Consider how agents and downstream systems consume the attributes.

### Optimize for agent performance

* Add unit information for numeric properties, such as `unit: celsius` or `unit: USD`.
* Include sensitivity classifications for properties that contain personal or sensitive data.
* Provide context about valid ranges or formats.
* Use descriptions that explain relationships between entities.

### Maintain metadata over time

* Review and update descriptions when business logic changes.
* Add synonyms as new terminology emerges in your organization.
* Remove outdated additional metadata key-value pairs.

## Limitations and considerations

* **Duplicate keys**: Each entity type, property, and relationship type must have unique keys for additional metadata. If you add duplicate keys, you get an error.
* **Synonyms**: Only entity types support synonyms. Properties and relationship types don't support synonyms.

### Data agent limitations

Metadata improves schema understanding but doesn't currently influence all stages of the Fabric data agent pipeline. When you use a data agent with ontology metadata, keep the following limitations in mind:

* Entity and property descriptions, synonyms, and custom attributes can help the data agent understand ontology concepts during schema exploration and reasoning.
* Ontology query generation doesn't directly use the metadata. Any benefit comes from the data agent interpreting the ontology schema before query generation.

>[!NOTE]
> Metadata helps AI experiences understand ontology metadata and business meaning. It doesn't currently modify the ontology query generation process itself, and publicly available data agent experiences don't currently use relationship-level enrichment.

## Related content

* [Create entity types](how-to-create-entity-types.md)
* [Create relationship types](how-to-create-relationship-types.md)
* [Data binding in ontology](how-to-bind-data.md)
