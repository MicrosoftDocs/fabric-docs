---
title: Reuse shared properties
description: Learn how to define and reference shared properties across entity types in an ontology (preview) item.
ms.date: 09/21/2026
ms.topic: how-to
ai-usage: ai-generated
---

# Reuse shared properties in ontology (preview)

As an ontology grows, you might need the same property definition across unrelated entity types. The **ontology (preview)** item provides [shared properties](#about-shared-properties), which you define once and add to any entity type by reference.

Shared properties reduce duplication across the ontology and help teams keep common definitions and metadata consistent.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## About shared properties

A *shared property* is a property that's a first-class, top-level construct in the ontology. It carries full metadata, including its data type, description, and semantic-enrichment fields. Any entity type can include a shared property by reference, rather than by copy. Instead of redefining `CreatedBy`, `CreatedOn`, or `Owner` on every entity type that needs them, shared properties let you define each once and reference it wherever it applies.

Shared property names are unique within an ontology.

## Create a shared property

To create a shared property:

1. Select **Shared properties** from the Explorer pane.

    :::image type="content" source="media/how-to-reuse-properties/shared-properties.png" alt-text="Screenshot of the shared explorer option." lightbox="media/how-to-reuse-properties/shared-properties.png":::

1. Select **New shared property**, enter the property details, and select **Add**.
1. The property is visible on the **Shared properties** page. 

    After you add the property to entity types, you can see all the entity types that use this property in the **Used by** column.

    :::image type="content" source="media/how-to-reuse-properties/shared-properties-populated.png" alt-text="Screenshot of the shared property and entity types that use it." lightbox="media/how-to-reuse-properties/shared-properties-populated.png":::

## Reference and bind a shared property

To add a shared property to an entity type:

1. Open the **Configure** tab for the entity.
1. Select **Manage property bindings** > **Add existing property**.

    :::image type="content" source="media/how-to-reuse-properties/add-existing-property.png" alt-text="Screenshot of adding an existing property." lightbox="media/how-to-reuse-properties/add-existing-property.png":::

1. Select shared properties to add to the entity and select **Add**.

    :::image type="content" source="media/how-to-reuse-properties/add-existing-property-details.png" alt-text="Screenshot of choosing the existing property to add." lightbox="media/how-to-reuse-properties/add-existing-property-details.png":::

1. The property is now available on the entity type.

When you bind data to a shared property on an entity, binding is local to that entity. The shared property itself stays unbound and available for other entity types to reference and bind independently.

### Override metadata locally

You can override a referenced property's [metadata](how-to-add-metadata.md) (such as its description or key-value pairs) on a specific entity type. The override:

- Applies only to that entity type and leaves the shared property unchanged elsewhere.
- Appears with a provenance badge that makes the override visible.
- Reverts in one action back to the shared property's current value.

If the shared property's value changes while an override is in place, the override persists, and the new value applies to every other referencing entity type that hasn't overridden the same field.

### Remove a shared property reference

When you remove a shared property reference from an entity type, the outcome depends on whether local state exists:

- **Soft detach** keeps the property on the entity type as a local property, preserving its binding, any metadata override, and any relationship endpoint that uses it. Its provenance changes to local.
- **Full delete** removes the property from the entity type and clears the local binding and override.

If the entity type holds no local binding, override, or relationship endpoint against the reference, removing it is a direct action with no choice to make.

## Delete a shared property

When you choose to delete the shared property itself, the ontology shows an impact analysis that lists every affected entity type and categorizes each impact as a data binding, a relationship that uses the property, or a metadata override.

:::image type="content" source="media/how-to-reuse-properties/delete-property.png" alt-text="Screenshot of deleting a shared property." lightbox="media/how-to-reuse-properties/delete-property.png":::

After you confirm, the ontology removes the central shared property record. The ontology soft-detaches each impacted entity type, which keeps a local copy of the property along with its binding, relationship endpoint, and overridden metadata, so you don't lose any local work. Entity types that only referenced the property, with no local state, lose the reference.

## View property sources

Because a property on an entity type can come from several places, the **Configure** page indicates where each property comes from, and you can filter by property source:

- **Local** — defined directly on this entity type.
- **Inherited** — inherited from a base entity type.
- **Shared** — composed from a shared property.

:::image type="content" source="media/how-to-reuse-properties/property-sources.png" alt-text="Screenshot of filterable property sources." lightbox="media/how-to-reuse-properties/property-sources.png":::

## Cross-ontology reuse

You can reference a shared property defined in a different ontology. Cross-ontology references behave the same as their same-ontology counterparts.

Cross-ontology reuse requires read permission on every element in the reuse path, including the source ontology and the source shared property. If any element in the path isn't readable, the operation fails with a permission error that identifies the missing element.

## Related content

- [Model with inheritance in ontology (preview)](how-to-use-inheritance.md)
- [What is ontology (preview)?](overview.md)
- [Agent integration options for ontology (preview)](concepts-agent-integration.md)
- [Microsoft Fabric terminology](../../fundamentals/fabric-terminology.md)
