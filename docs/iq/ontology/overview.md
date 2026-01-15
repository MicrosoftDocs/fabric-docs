---
title: What is ontology (preview)?
description: Learn about the ontology (preview) item.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 10/06/2025
ms.topic: overview
ms.search.form: Ontology Overview
---

# What is ontology (preview)?

The *ontology (preview)* item (part of the [IQ (preview) workload](../overview.md)) digitally represents the enterprise vocabulary and semantic layer that unifies meaning across domains and OneLake sources. It defines entity types, relationships, properties, and constraints. It then binds the entity type definitions to real data, so downstream tools can share the same language. Both humans and AI agents can use this language for cross-domain reasoning and decision-ready actions.

Ontology works well in situations where you need cross-domain consistency, governance, or AI agent grounding, and you want to reason across processes.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Ontology overview

An *ontology* is a shared, machine-understandable vocabulary of your business. It's made up of the **things** in your environment (represented as *entity types*), their **facts** (represented as *properties* on entity types), and the ways they **connect** (represented as *relationships*), while offering constraints and rules that keep representations consistent. 

You can also think of an ontology like a business context layer, containing:

* A catalog of concepts (like *Product*, *Order*, *Plant*, *Sensor*, *Route*), defined once and reused everywhere
* Bindings that connect those concepts to actual data sources in OneLake
* A graph representation that links related concepts for richer navigation, lineage, and reasoning
* A query surface that lets you ask questions about concepts (not just tables), supporting federated queries across sources

## Core concepts: Defining an ontology

An ontology consists of [entity types](#entity-type), [entity instances](#entity-instance), [properties](#property), and [relationships](#relationship). This section describes each of these core concepts.

### Entity type

An *entity type* is the reusable logical model of a real world concept (like *Shipment*, *Product*, or *Sensor*). It standardizes the name, description, identifiers, properties, and constraints for that item, so that every team in your business means the same thing when they use a term like "shipment." By elevating the concept above any single table, entity types eliminate conflicting column level definitions across sources. They provide a single point to attach properties, relationships, and labels that downstream tools can use to improve semantics across tables and models.

### Entity instance

An *entity instance* is a concrete occurrence of an entity type, populated from data bindings (like a semantic row). Entity instances keep track of which source created them and when they were true, and can participate in relationships. Entity instances transform raw rows into governed, typed business objects that tools and agents can reason over consistently.

### Property

A *property* is a named fact about an entity, with a declared data type. It can contain bindings to source data and semantic annotations (like an *identifier* or metadata attributes). Properties improve semantics by enforcing consistent types, units, and naming, and by enabling rules and quality checks at the concept level.

### Relationship

A *relationship* is a typed, directional link between entity types or instances. Relationships can have attributes (like *distance*, *confidence*, or *effectiveAt*) and cardinality rules. Relationships make context explicit and reusable for how things connect, enabling traversal, dependency analysis, rule based inference, and clearer answers to business questions without custom join logic.

## Core concepts: Your data in the ontology

After you define an ontology, you can [bind it to your data](how-to-bind-data.md) to visualize and query the data through the lens of your ontology. Read about each core data concept in the following sections.

### Data binding

*Binding* connects your ontology's definitions (including entity types, properties, and relationships) to concrete data living in OneLake, including lakehouse tables, eventhouse streams, and semantic models. A binding describes data types, identity keys, how columns map to properties, and how keys map to relationships across multiple data sources. By enabling schema evolution rules, data quality checks (based on things like nullability, ranges, and uniqueness), and provenance at the concept layer, bindings turn raw rows and events into governed business objects. Binding improves semantics by ensuring every instance carries consistent meaning, types, constraints, and lineage, regardless of source.

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]

### Ontology graph

>[!IMPORTANT]
>Ontology's graph feature relies on [Graph in Microsoft Fabric](../../graph/overview.md), so you must enable the Graph setting for your tenant. For more information, see [Ontology (preview) required tenant settings](overview-tenant-settings.md).

The *ontology graph* is a navigable instance graph built from your bindings and relationship definitions. You can see it from the [ontology preview experience](how-to-use-preview-experience.md). In the graph, nodes are entity instances, and edges are links (either asserted or derived) with metadata attributes. Each node or edge keeps data source lineage and follows a scheduled data refresh. Graphs enable visual exploration of business context, execution of graph algorithms (like paths, centrality, and communities), and rule‑driven inferences. Graphs improve semantics by making relationships first‑class, so context isn't buried in join logic, but instead is explicit, queryable, and governed.

[!INCLUDE [refresh-graph-model](includes/refresh-graph-model.md)]

### Querying your ontology

*Ontology querying* lets you ask business-level questions over bound sources through ontology concepts. Queries start with entity types and allow filtering by properties, traversing relationships, aggregating by time, and other constraints. The ontology layer pushes predicates down to the native engines where possible (GQL for Graph in Microsoft Fabric and KQL for Eventhouse). It also includes an NL2Ontology query layer that converts natural language into a detailed federated query plan, executes the plan, and returns the relevant results. By querying concepts rather than physical schemas, federated queries improve semantics. They ensure that filters, joins, units, and validity windows align with the canonical definitions you published in your ontology.

## Next steps

* Prepare your tenant for ontology (preview) by enabling required tenant settings in [Ontology (preview) required tenant settings](overview-tenant-settings.md).
* Get started with the [Ontology (preview) tutorial](tutorial-0-introduction.md).
* Skip ahead to instructions for [generating an ontology from a semantic model](tutorial-1-create-ontology.md?pivots=semantic-model#generating-an-ontology-from-a-semantic-model).

