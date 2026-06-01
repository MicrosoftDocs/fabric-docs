---
title: Add Semantic Enrichment with Metadata
description: Learn how to add metadata, descriptions, synonyms, and additional metadata key-value pairs to ontology objects to improve semantic accuracy and agent performance.
ms.date: 6/1/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Add semantic enrichment with metadata

Semantic enrichment lets you add structured metadata to ontology objects, including descriptions, synonyms, and custom key-value attributes. By enriching your ontology with semantic metadata, you improve discoverability, provide context for AI agents, and ensure consistent understanding across your organization.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Semantic enrichment helps AI agents and downstream systems better understand your data by providing:

* **Descriptions** that explain the purpose and meaning of entity types, properties, and relationship types
* **Synonyms** that capture alternative names and terms for entity types
* **Additional metadata** that add domain-specific metadata as key-value pairs

This metadata improves agent answer correctness, especially for prompts that depend on contextual information like units of measurement, sensitivity levels, or business definitions. For an example of data agent responses before and after semantic enrichment, see the [Example with data agent](#example-with-data-agent) section.

## Prerequisites

Before you add semantic enrichment to your ontology, make sure you have:

* A [Fabric workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* **Ontology item (preview)** [enabled on your Fabric tenant](overview-tenant-settings.md#ontology-item-preview).
* An ontology (preview) item that has [entity types](how-to-create-entity-types.md) or [relationship types](how-to-create-relationship-types.md).
* Understanding of [core ontology concepts](overview.md#core-concepts-defining-an-ontology).

## Key concepts

Semantic enrichment uses the following ontology (preview) concepts. For definitions of these terms, see the [Ontology (preview) glossary](resources-glossary.md).

* *Entity type*
* *Property*
* *Relationship type*

## Add metadata to entity types

Entity types support descriptions, synonyms, and custom metadata attributes. Follow these steps to add semantic enrichment to entity types.

1. In the **Explorer** pane of the Home configuration canvas, select the entity type that you want to enrich. Select **View Entity Type details** from the top ribbon.

1. In the **Metadata** section, select the **Edit** button to open the metadata configuration.

    :::image type="content" source="media/how-to-add-semantic-enrichment/add-metadata-entity.png" alt-text="Screenshot of adding metadata attributes to an entity type." lightbox="media/how-to-add-semantic-enrichment/add-metadata-entity.png":::

1. Add a **Description** to explain what the entity type represents. The description helps users and agents understand the purpose and meaning of the entity type.

1. To add **Synonyms**, enter alternative names or terms that refer to the same entity type. Synonyms improve discoverability and help agents understand different ways users might reference the entity.

1. To add additional metadata, enter key-value pairs under **Semantic properties**. Additional metadata lets you add key-value pairs to represent domain-specific metadata, like:
    * Units of measurement (example: `Unit of measurement: cm`)
    * Sensitivity classification (example: `Sensitivity: Confidential`)
    * Business owner information (example: `Business owner: Elaheh Mansouri`)
    * Data quality indicators (example: `Data quality: Incomplete`)

    > [!IMPORTANT]
    > Additional metadata keys must be unique within each entity type. You can't use duplicate key names on the same entity type.

1. Select **Update** to apply your metadata changes.

## Add metadata to properties

Properties support descriptions and custom metadata attributes, but not synonyms. Follow these steps to add semantic enrichment to properties.

1. From the **Configure** tab of the entity type details, open the [data binding configuration](how-to-bind-data.md) for an entity type.

1. In the **Properties** section, select the **Tag** icon next to the property you want to enrich.

    :::image type="content" source="media/how-to-add-semantic-enrichment/add-metadata-properties.png" alt-text="Screenshot of adding metadata to properties." lightbox="media/how-to-add-semantic-enrichment/add-metadata-properties.png":::

    :::image type="content" source="media/how-to-add-semantic-enrichment/add-metadata-properties-2.png" alt-text="Screenshot showing property metadata configuration." lightbox="media/how-to-add-semantic-enrichment/add-metadata-properties-2.png":::

1. Add a **Description** that explains what the property represents and how to interpret it.

1. To add additional metadata, enter key-value pairs under **Semantic properties**.

    > [!IMPORTANT]
    > Additional metadata keys must be unique within each property. You can't use duplicate key names on the same property.

1. Select **Update** to apply your changes.

## Add metadata to relationship types

Relationship types support descriptions and custom metadata attributes, but not synonyms. Follow these steps to add semantic enrichment to relationship types.

1. From the **Configure** tab of the entity type details, open the [relationship type configuration](how-to-create-relationship-types.md#create-relationship-type).

1. In the **Metadata** section, the **Edit** button to open the metadata configuration.

1. Add a **Description** that explains the nature of the relationship and when it applies.

1. To add additional metadata, enter key-value pairs under **Semantic properties**.

    > [!IMPORTANT]
    > Additional metadata keys must be unique within each relationship type. You can't use duplicate key names on the same relationship type.

1. Select **Update** to apply your metadata changes.

## Edit or delete metadata attributes

You can modify or remove metadata attributes from entity types, properties, and relationship types.

1. Select the ontology object (entity type, property, or relationship type) that contains the metadata you want to change.

1. In the **Metadata** section, locate the metadata attribute you want to modify.

    :::image type="content" source="media/how-to-add-semantic-enrichment/edit-metadata.png" alt-text="Screenshot of editing metadata attributes." lightbox="media/how-to-add-semantic-enrichment/edit-metadata.png":::

1. Make updates to the metadata as needed and select **Update**.

1. Only custom metadata attributes can be deleted.

## Example with data agent

This section shows how semantic enrichment can improve the performance of a data agent.

Consider the Lakeshore Retail example scenario used in the [Ontology (preview) tutorial](tutorial-0-introduction.md). Lakeshore is a retail ice cream seller that keeps data on sales and freezer streaming data. The tutorial ontology contains entity types *Store*, *Freezer*, *Products*, and *SaleEvent*. [Part 4 of the tutorial](#tutorial-4-create-data-agent.md) shows how to create a data agent that uses this ontology as a data source.

With the basic set of information, the data agent is unable to answer the following question:

*Which ice cream shops performed best this month and sold the most frozen desserts?*

:::image type="content" source="media/how-to-add-semantic-enrichment/data-agent-before.png" alt-text="Screenshot of data agent responses before semantic enrichment. The data agent can't retrieve the requested information." lightbox="media/how-to-add-semantic-enrichment/data-agent-before.png":::

To help the agent better understand and process the data, semantic enrichment lets you add details to the following parts of the ontology:

* **Products (entity type)**
    - Synonyms: `frozen desserts`, `ice cream items`, `desserts`, `menu items`, `treats`, and `products sold`.
    - Additional metadata key value pairs: `seasonality: summer`, `shelfPlacement: frozen`, `requiresFreezerTruck: true`.
    
    :::image type="content" source="media/how-to-add-semantic-enrichment/example-products.png" alt-text="Screenshot of adding the listed semantic enrichment details to the Products entity type." lightbox="media/how-to-add-semantic-enrichment/example-products.png":::

* **Category (property on Products entity type)**:
    - Description: `Represents the high-level group or classification`.
    - Additional metadata key value pairs: `supportSalesReporting: true`, `promotionPriority: high`.

    :::image type="content" source="media/how-to-add-semantic-enrichment/example-category.png" alt-text="Screenshot of adding the listed semantic enrichment details to the Category property." lightbox="media/how-to-add-semantic-enrichment/example-category.png":::

* **Sold (relationship)**:
    - Description: `Represents products purchased by customers at a retail store location`.
    - Additional metadata key value pairs: `AgentUsageHint: Use to connect products with store sales performance`, `ExampleQuestion: Which stores sold the most frozen desserts?`.

    :::image type="content" source="media/how-to-add-semantic-enrichment/example-sold.png" alt-text="Screenshot of adding the listed semantic enrichment details to the Sold relationship." lightbox="media/how-to-add-semantic-enrichment/example-sold.png":::

After adding these semantic enrichment details, the data agent is better able to relate the terms in the question to data in the ontology, enabling it to answer the question.

:::image type="content" source="media/how-to-add-semantic-enrichment/data-agent-after.png" alt-text="Screenshot of data agent responses after semantic enrichment. The data agent's response is improved." lightbox="media/how-to-add-semantic-enrichment/data-agent-after.png":::

## Best practices for semantic enrichment

Follow these best practices to maximize the value of semantic enrichment:

### Write clear descriptions

* Start descriptions with what the entity type, property, or relationship represents
* Include the business context and purpose
* Mention key characteristics or constraints
* Keep descriptions concise but informative (one to three sentences)

### Use effective synonyms

* Include common abbreviations and acronyms
* Add industry-specific terminology
* Consider regional variations in terminology
* Include both formal and informal terms that users might search for

### Design meaningful key-value pairs for additional metadata

* Use consistent key naming conventions across your ontology
* Choose keys that are self-explanatory (for example, `unit`, `sensitivity`, `owner`)
* Document your key-value additional metadata standards for your team
* Consider how agents and downstream systems consume the attributes

### Optimize for agent performance

* Add unit information for numeric properties (for example, `unit: celsius`, `unit: USD`)
* Include sensitivity classifications for properties containing personal or sensitive data
* Provide context about valid ranges or formats
* Use descriptions that explain relationships between entities

### Maintain metadata over time

* Review and update descriptions when business logic changes
* Add synonyms as new terminology emerges in your organization
* Remove outdated additional metadata key-value pairs that are no longer relevant
* Version your ontology to track metadata changes over time

## Limitations and considerations

* **Duplicate keys**: Keys for additional metadata must be unique within each entity type, property, or relationship type. If you add duplicate keys, you get an error.
* **Predefined metadata**: Description and Synonym fields are predefined. You can edit them or leave them empty, but you can't delete them.
* **Synonyms**: Only entity types support synonyms. Properties and relationship types don't support synonyms.
* **Object size limits**: Entity type objects have a maximum size limit. Consider this limit when you add large numbers of key-value pairs for additional metadata.

## Related content

* [Create entity types](how-to-create-entity-types.md)
* [Create relationship types](how-to-create-relationship-types.md)
* [Data binding in ontology](how-to-bind-data.md)
