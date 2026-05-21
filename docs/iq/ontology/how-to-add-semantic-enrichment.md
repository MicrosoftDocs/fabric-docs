---
title: Add semantic enrichment with metadata
description: Learn how to add metadata, descriptions, synonyms, and custom attributes to ontology objects to improve semantic accuracy and agent performance.
ms.date: 05/21/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Add semantic enrichment with metadata

Semantic enrichment lets you add structured metadata to ontology objects, including descriptions, synonyms, and custom key-value attributes. By enriching your ontology with semantic metadata, you improve discoverability, provide context for AI agents, and ensure consistent understanding across your organization.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Semantic enrichment helps AI agents and downstream systems better understand your data by providing:

* **Descriptions** that explain the purpose and meaning of entity types, properties, and relationship types
* **Synonyms** that capture alternative names and terms for entity types
* **Custom attributes** that add domain-specific metadata as key-value pairs

This metadata improves agent answer correctness, especially for prompts that depend on contextual information like units of measurement, sensitivity levels, or business definitions.

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
* *Metadata attribute*

## Add metadata to entity types

Entity types support descriptions, synonyms, and custom metadata attributes. Follow these steps to add semantic enrichment to entity types.

1. Select an entity type in the **Entity Types** pane to open the **Entity type configuration** pane.

1. In the **Metadata** section, select **Add metadata attribute**.

    :::image type="content" source="media/how-to-add-semantic-enrichment/add-metadata-entity.png" alt-text="Screenshot of adding metadata attributes to an entity type.":::

1. Add a **Description** to explain what the entity type represents. The description helps users and agents understand the purpose and meaning of the entity type.

1. To add **Synonyms**, enter alternative names or terms that refer to the same entity type. Synonyms improve discoverability and help agents understand different ways users might reference the entity.

    > [!NOTE]
    > You can add multiple synonyms for an entity type. Each synonym should represent a valid alternative name.

1. To add **Custom attributes**, enter a key-value pair. Custom attributes let you add domain-specific metadata such as:
    * Units of measurement
    * Sensitivity classification
    * Business owner information
    * Data quality indicators

    > [!IMPORTANT]
    > Custom attribute keys must be unique within each entity type. You can't use duplicate key names on the same entity type.

1. Select **Save** to apply your metadata changes.

## Add metadata to properties

Properties support descriptions and custom metadata attributes, but not synonyms. Follow these steps to add semantic enrichment to properties.

1. Select a property in the **Properties** tab of an entity type configuration.

1. In the **Metadata** section, select **Add metadata attribute**.

    :::image type="content" source="media/how-to-add-semantic-enrichment/add-metadata-properties.png" alt-text="Screenshot of adding metadata to properties.":::

    :::image type="content" source="media/how-to-add-semantic-enrichment/add-metadata-properties-2.png" alt-text="Screenshot showing property metadata configuration.":::

1. Add a **Description** that explains what the property represents and how to interpret it.

1. To add **Custom attributes**, enter key-value pairs for domain-specific metadata. Common use cases include:
    * Units (for example, `unit: celsius`, `unit: meters`)
    * Format specifications (for example, `format: ISO-8601`)
    * Valid ranges (for example, `min: 0`, `max: 100`)

    > [!IMPORTANT]
    > Custom attribute keys must be unique within each property. You can't use duplicate key names on the same property.

1. Select **Save** to apply your changes.

## Add metadata to relationship types

Relationship types support descriptions and custom metadata attributes. Follow these steps to add semantic enrichment to relationship types.

1. Select a relationship type to open the relationship type configuration.

1. In the **Metadata** section, select **Add metadata attribute**.

1. Add a **Description** that explains the nature of the relationship and when it applies.

1. To add **Custom attributes**, enter key-value pairs for domain-specific metadata such as:
    * Cardinality information
    * Relationship constraints
    * Business rules

    > [!IMPORTANT]
    > Custom attribute keys must be unique within each relationship type. You can't use duplicate key names on the same relationship type.

1. Select **Save** to apply your metadata changes.

## Edit or delete metadata attributes

You can modify or remove metadata attributes from entity types, properties, and relationship types.

1. Select the ontology object (entity type, property, or relationship type) that contains the metadata you want to change.

1. In the **Metadata** section, locate the metadata attribute you want to edit or delete.

    :::image type="content" source="media/how-to-add-semantic-enrichment/edit-metadata.png" alt-text="Screenshot of editing metadata attributes.":::

    :::image type="content" source="media/how-to-add-semantic-enrichment/edit-metadata-2.png" alt-text="Screenshot showing edit metadata configuration.":::

1. To edit an attribute:
    * Select the attribute to modify its value.
    * Update the key or value as needed.
    * Select **Save**.

1. To delete an attribute:
    * Select the delete icon next to the attribute.
    * Confirm the deletion.

    > [!NOTE]
    > You can't delete predefined metadata attributes (Description and Synonym), but you can edit them. You can delete custom metadata attributes.

## Query metadata with SQL and APIs

After adding semantic enrichment to your ontology, you can query metadata attributes programmatically.

### Query with SQL

To query ontology metadata, use SQL queries against your ontology item:

```sql
-- Query entity type metadata
SELECT EntityTypeName, Description, Synonyms, CustomAttributes
FROM EntityTypeMetadata
WHERE EntityTypeName = 'Store';

-- Query property metadata
SELECT PropertyName, Description, CustomAttributes
FROM PropertyMetadata
WHERE EntityTypeName = 'Store';
```

### Query with public APIs

Use the Ontology public APIs to retrieve metadata:

* Retrieve all metadata for an entity type
* Filter by specific metadata attributes
* Access custom attributes by key

For more information about using the Ontology APIs, see the API reference documentation.

### Query with MCP tools

Access ontology metadata through Model Context Protocol (MCP) tools. For more information, see [Use the ontology MCP server](how-to-use-ontology-mcp-server.md).

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

### Design meaningful custom attributes

* Use consistent key naming conventions across your ontology
* Choose keys that are self-explanatory (for example, `unit`, `sensitivity`, `owner`)
* Document your custom attribute standards for your team
* Consider how agents and downstream systems consume the attributes

### Optimize for agent performance

* Add unit information for numeric properties (for example, `unit: celsius`, `unit: USD`)
* Include sensitivity classifications for properties containing personal or sensitive data
* Provide context about valid ranges or formats
* Use descriptions that explain relationships between entities

### Maintain metadata over time

* Review and update descriptions when business logic changes
* Add synonyms as new terminology emerges in your organization
* Remove outdated custom attributes that are no longer relevant
* Version your ontology to track metadata changes over time

## Limitations and considerations

* **Duplicate keys**: Custom attribute keys must be unique within each entity type, property, or relationship type. If you add duplicate keys, you get an error.
* **Predefined metadata**: Description and Synonym fields are predefined. You can edit them or leave them empty, but you can't delete them.
* **Synonyms**: Only entity types support synonyms. Properties and relationship types don't support synonyms.
* **Object size limits**: Entity type objects have a maximum size limit. Consider this limit when you add large numbers of custom attributes.

## Related content

* [Create entity types](how-to-create-entity-types.md)
* [Create relationship types](how-to-create-relationship-types.md)
* [Data binding in ontology](how-to-bind-data.md)
* [Use the ontology MCP server](how-to-use-ontology-mcp-server.md)
* [Ontology glossary](resources-glossary.md)
