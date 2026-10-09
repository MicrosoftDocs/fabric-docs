---
title: Entity Type Inheritance
description: Learn about modeling inheritance in an ontology (preview) item to create type hierarchies.
ms.date: 09/21/2026
ms.topic: how-to
ai-usage: ai-generated
---

# Model with inheritance in ontology (preview)

As an ontology grows, you might need to model specialized entity types that share a common structure. The **ontology (preview)** item provides inheritance so you can derive entity types from a base entity type instead of restating its properties. Inheritance creates type hierarchies within your ontology item.

This capability helps you reduce duplication across the ontology, express is-a hierarchies (like vehicles that specialize into cars and trucks), and preserve more of the structure in industry-curated RDF and OWL ontologies when you import them.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## About inheritance

Inheritance lets a *derived entity type* designate an existing *base entity type* as its parent. Inheritance is single-parent: a derived entity type has at most one base entity type. For example, a Car entity type and a Truck entity type can each derive from a Vehicle base entity type, and a North-American Customer and a South-American Customer can each derive from a Customer base entity type.

When you derive an entity type, it inherits two things from its base:

- The base's **properties**, along with the per-property metadata on them.
- An **is-a** link to the base entity type, which the query layer uses for [polymorphic query](#polymorphic-query).

The derived entity type doesn't inherit the following things:

- **Entity-type-level metadata**, such as the description, synonyms, custom attributes, and metadata. The derived entity type starts with empty entity-type-level metadata that you author locally.
- **Data bindings.** A derived entity type has no binding at creation. You bind it to its own data source.
- **Non-is-a relationships.** Regular entity type relationships modeled on the base don't propagate to the derived entity type.

## Create a derived entity type

To create a derived entity type:

1. Select **+ Add entity type** from the ontology ribbon.
1. In the **Add entity type** dialog, expand **Additional configuration** and select **Choose entity to inherit from**.

    :::image type="content" source="media/how-to-use-inheritance/add-entity-type-configuration.png" alt-text="Screenshot of adding a base type when creating an entity." lightbox="media/how-to-use-inheritance/add-entity-type-configuration.png":::

1. Enter the details and select **Add Entity Type**.

To see the details of the derived entity type, select **View Entity Type details** from the ontology ribbon. 

The **Configure** page opens and shows **Properties** inherited from the base class, a lineage-type **Relationship**, and **Details** about its inheritance relationships.

:::image type="content" source="media/how-to-use-inheritance/configure.png" alt-text="Screenshot of the derived entity details." lightbox="media/how-to-use-inheritance/configure.png":::

>[!NOTE]
> Circular inheritance isn't permitted. The ontology rejects any change that would make an entity type derive, directly or indirectly, from itself.

## Extend a derived entity type

After you derive an entity type, you can continue adding information to that entity type to specialize it beyond the inherited information. You can add local properties, add local relationships, and bind it to its own data source, all without changing the base entity type.

You can also model a relationship from a derived entity type back to its base (or to any ancestor) alongside the is-a link. The is-a link and a modeled relationship can coexist between the same pair of entity types. 

Use the **Relationship** and **Lineage** buttons on the ontology canvas to toggle between relationship and inheritance views.

:::image type="content" source="media/how-to-use-inheritance/canvas-lineage.png" alt-text="Screenshot of the lineage view of the canvas." lightbox="media/how-to-use-inheritance/canvas-lineage.png":::

## Work with inherited properties

Properties that a derived entity type inherits from its base entity type have these behaviors:

- You **can't remove** an inherited property, and its **name and data type are immutable** on the derived entity type. This behavior keeps every derived type consistent with the shape defined at the base.
- You **can override** an inherited property's per-property [metadata](how-to-add-metadata.md) (such as its description or key-value pairs) locally on the derived entity type. An override applies only to that entity type and leaves the base unchanged.
    - If you **revert** an override, the property resumes serving the live value from the base.

Because inheritance is live rather than copied, an edit you make to a base property automatically propagates to every derived entity type that doesn't override the corresponding field. If you add a property to the base after a type already derives from it, the derived type picks up the new inherited property without extra work. Overridden fields persist when the base changes.

## Polymorphic query

Inheritance carries meaning into query. A **polymorphic query** against a base entity type returns instances of the base *and* of its directly derived entity types in a single result set. A question about "all vehicles" returns Vehicle, Car, and Truck instances, and a question about "all customers" returns both the North-American and South-American customers. Polymorphic query resolves one hop: it includes the base and its direct children.

## Cross-ontology reuse

You can derive an entity type from a base entity type defined in a different ontology. Cross-ontology inheritance behaves the same as inheritance within a single ontology.

Cross-ontology reuse requires read permission on every element in the reuse path, including the source ontology and the source base entity type. If any element in the path isn't readable, the operation fails with a permission error that identifies the missing element.

## Related content

- [Reuse shared properties in ontology (preview)](how-to-reuse-properties.md)
- [What is ontology (preview)?](overview.md)
- [Agent integration options for ontology (preview)](concepts-agent-integration.md)
- [Microsoft Fabric terminology](../../fundamentals/fabric-terminology.md)
