---
title: "Namespaces in Ontology (Preview)"
description: Learn how to use namespaces to organize an ontology (preview) item, disambiguate same-named concepts, and support governance and reuse of external vocabularies.
ms.date: 09/10/2026
ms.topic: how-to
ai-usage: ai-generated
---

# Organize ontology (preview) with namespaces

A *namespace* is a grouping construct in the ontology (preview) item that organizes related concepts—such as entity types and relationship types—and gives each one a qualified, unique identity. As an enterprise ontology grows, it might mix vocabularies from many sources: your own business model, shared models across teams and domains, and common external vocabularies. Without namespaces, every concept lives in a single flat space. With namespaces, you can avoid collisions and unnatural naming, and prepare large ontologies to govern and evolve.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

For example, a Customer concept in a sales domain and a Customer concept in a finance domain often mean different things. Namespaces let both versions of the Customer concepts exist in the same ontology with a clear, qualified identity, so that people, applications, and agents can tell them apart.

This article explains what namespaces are, how they differ from display folders and perspectives, and how you use them to disambiguate same-named concepts, reuse external vocabularies, and set governance and ownership boundaries in your model.

## About namespaces

A *namespace* is a first-class grouping construct for the concepts in an ontology, including entity types, relationship types, and other concepts. Namespaces follow the RDF namespace model, so each one gives the concepts it contains a qualified semantic identity rather than just a display grouping.

A namespace can also carry optional metadata, such as a description and a prefix. Together, the URI and metadata give each concept in the namespace a qualified identity, for example a *Customer* entity type scoped to a finance billing namespace versus a *Customer* entity type scoped to a sales namespace.

### The default namespace

Every ontology comes with a default namespace:

- By default, all concepts belong to the *Default* namespace.
- You can see the default namespace in the model.
- You can't delete the default namespace.

The default namespace name guarantees uniqueness only *within* the ontology, not globally. If you need globally unique identity for a set of concepts, create a custom namespace with a URI that reflects your organization and domain.

### Interoperability with external vocabularies

Because namespaces build on RDF namespaces and use stable URIs, they can map to external standards such as RDF or IRI-style identifiers. This mapping helps when you import or reference partner and industry vocabularies, so you can reuse well-known external terms while keeping clear ownership and identity for the concepts in your ontology.

## Create a namespace

To create a namespace:

1. Select **+ Namespace** from the ontology ribbon.

    :::image type="content" source="media/how-to-use-namespaces/namespaces-ribbon.png" alt-text="Screenshot of adding a namespace from the ribbon." lightbox="media/how-to-use-namespaces/namespaces-ribbon.png":::

1. Enter namespace details, including a **Namespace name** and optional metadata like a **Namespace description** and **Additional metadata**.

    :::image type="content" source="media/how-to-use-namespaces/new-namespace.png" alt-text="Screenshot of the new namespace details." lightbox="media/how-to-use-namespaces/new-namespace.png":::

    You can't assign concepts like entity types and relationships while creating the namespace. Instead, [assign concepts to a namespace](#assign-concepts-to-a-namespace) after you create the namespace.

1. Select **Create**.
1. The new namespace appears in the **Namespaces** view.

    Later, once you [assign concepts to this namespace](#assign-concepts-to-a-namespace), that information is also visible here in the **Assigned concepts** column.

    :::image type="content" source="media/how-to-use-namespaces/namespaces.png" alt-text="Screenshot of the namespace view." lightbox="media/how-to-use-namespaces/namespaces.png":::

## Assign concepts to a namespace

You can add two types of ontology concepts to a namespace: entity types and relationship types.

Every concept belongs to exactly one namespace. You can assign a concept to a namespace when you create the concept, or reassign it afterward.

* To assign a concept to a namespace while creating the concept, expand **Additional configuration** in the creation dialog and select a namespace under **Choose namespace**.

    For entity types:

    :::image type="content" source="media/how-to-use-namespaces/add-entity-type-namespace.png" alt-text="Screenshot of adding a namespace while creating an entity type." lightbox="media/how-to-use-namespaces/add-entity-type-namespace.png":::

    For relationship types:
    
    :::image type="content" source="media/how-to-use-namespaces/add-relationship-type-namespace.png" alt-text="Screenshot of adding a namespace while creating a relationship type." lightbox="media/how-to-use-namespaces/add-relationship-type-namespace.png":::

* To assign a concept to a namespace after the concept is created, find the namespace details on the concept's configuration page, and select the edit icon. For entity types, it's in the **Details** section of the **Configure** page. For relationship types, it's near the top of the relationship edit page.

    For entity types:

    :::image type="content" source="media/how-to-use-namespaces/edit-entity-type-namespace.png" alt-text="Screenshot of adding a namespace to an existing entity type." lightbox="media/how-to-use-namespaces/edit-entity-type-namespace.png":::
    
    For relationship types:

    :::image type="content" source="media/how-to-use-namespaces/edit-relationship-type-namespace.png" alt-text="Screenshot of adding a namespace to an existing relationship type." lightbox="media/how-to-use-namespaces/edit-relationship-type-namespace.png":::

When you reassign a concept, the ontology runs validation to prevent duplicate concepts within the target namespace. If the assignment would create a duplicate, the ontology blocks it. Because each namespace is a separate scope, the same name can exist in more than one namespace. For example, a *Customer* entity type can exist in both a sales namespace and a finance namespace without conflict.

## Edit, rename, and delete namespaces

You can edit, rename, or delete a namespace from the **Namespaces** page. Access this page through the **Manage namespaces** button in the ontology ribbon.

:::image type="content" source="media/how-to-use-namespaces/manage-namespaces-ribbon.png" alt-text="Screenshot of the manage namespace button in the ribbon." lightbox="media/how-to-use-namespaces/manage-namespaces-ribbon.png":::

You can edit a namespace's metadata—its name, description, and prefix—without breaking existing references. When you change a namespace name, qualified references to its concepts update automatically, so links elsewhere in the ontology stay intact.

You can delete a namespace only when it has no remaining references. If any concept still references the namespace, the ontology blocks the deletion until you remove or reassign those references. This behavior helps you make safe rename, delete, and lifecycle changes as the model evolves.

## Related content

- [What is ontology (preview)?](overview.md)
- [Agent integration options for ontology (preview)](concepts-agent-integration.md)
