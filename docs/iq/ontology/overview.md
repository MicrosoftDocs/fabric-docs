---
title: What Is Ontology (Preview)?
description: Learn about core concepts and features of the ontology (preview) item.
ms.date: 09/15/2026
ms.topic: overview
ms.search.form: Ontology Overview
---

# What is ontology (preview)?

The **ontology (preview)** item in Microsoft Fabric IQ provides a shared, machine-understandable representation of your business. It defines the concepts that matter to your organization, such as customers, products, assets, orders, and locations, along with their properties, how they relate, and the rules and metrics that give them business meaning. You then bind these definitions to enterprise data so people, applications, and AI agents can use the same vocabulary and context.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Ontology helps bridge the gap between how data is physically stored and how your business understands it. Instead of requiring every consumer to interpret tables, columns, measures, and joins independently, an ontology supplies reusable business concepts and source mappings across domains. This shared context can support analytics, real-time operational experiences, and AI agents that need consistent definitions and relationships.

## Why use an ontology?

Organizations often represent the same business concept differently across data sources, semantic models, applications, and teams. Ontology provides a common context layer that lets you:

- **Model the business in business terms.** Define entities, properties, relationships, rules, metrics, and hierarchies independently of any single physical table.
- **Build on existing semantic investments.** Optionally generate an ontology from Power BI semantic models to retain relevant tables, columns, relationships, calculated columns, and source-owned DAX measures.
- **Connect concepts to enterprise data.** Bind ontology definitions to supported Fabric data sources without requiring the ontology to become a separate data store.
- **Give AI agents shared context.** Ground agent experiences in governed definitions, relationships, metrics, rules, and source mappings instead of relying only on raw schemas or prompts.
- **Manage the model as it evolves.** Organize definitions with namespaces, reuse common concepts through inheritance, create named versions, and use Fabric permissions and lifecycle tooling.

## How ontology fits in Fabric IQ

Ontology is the **business context and semantic modeling layer** between enterprise data and the experiences that consume it. It stores and serves ontology definitions and bindings (it isn't itself a general-purpose data-query engine). Agent and visualization experiences use the ontology as context and execute against the appropriate bound data sources.

The following diagram illustrates that relationship.

:::image type="content" source="media/overview/ontology-fabric-iq-overview.png" alt-text="Graphic showing how ontology in Fabric gives a live, unified view of the business." lightbox="media/overview/ontology-fabric-iq-overview.png":::

Ontology aligns with familiar semantic-model constructs while extending them with ontology-specific modeling concepts. You can represent tables, columns, measures, and relationships alongside entity hierarchies, business rules, source bindings, namespaces, and other semantic metadata. You can build an ontology from scratch, or you can generate it directly from semantic models. This option helps you extend existing semantic models into operational and agentic scenarios without having to rebuild their business meaning from scratch when you already have it defined.

## Key capabilities

### Unified semantic modeling

Define reusable **entity types**, their **properties**, and the **relationships** between them. The updated ontology model supports more flexible representations, including keyless entity types, relationships without dedicated join tables, namespaces, entity hierarchies, and reuse through inheritance. These capabilities help you model business domains without requiring you to reshape the source data solely to fit the ontology.

For more information, see [Create entity types in ontology (preview)](how-to-create-entity-types.md).

### Alignment with Power BI semantic models

One way to create an ontology is to generate it from a Power BI semantic model to reuse existing business definitions. Semantic-model tables and relationships provide the starting structure, while ontology adds business context and capabilities for operational and agent-based consumption. The updated experience expands semantic-model alignment to include calculated columns and DAX measures.

Measures from a source semantic model appear in ontology as **metrics** associated with the relevant entities. The source semantic model remains the owner of the DAX expression, while ontology retains the metric's source and business context so agents can recognize and use the organization's defined calculations rather than recreating them.

For more information, see [Generate an ontology (preview) from semantic models](how-to-generate-from-semantic-models.md).

### Flexible data bindings

A **data binding** connects an ontology definition to real data. Bindings describe which source supplies an entity's properties, metrics, instances, or relationships and preserve the mapping between business terminology and source structures. During preview, source options include semantic models, lakehouses, eventhouses, warehouses, SQL databases, mirrored databases, and supported OneLake constructs such as shortcuts, views, and materialized views.

Ontology acts as a virtual semantic and context layer over these sources. Source data remains in the system that owns it, and consuming experiences can query the live bound source rather than copying all data into the ontology.

For more information, see [Data binding in ontology (preview)](how-to-bind-data.md).

### Metrics and business rules

**Metrics** give people and agents access to trusted calculations from Power BI semantic models. By carrying source-owned measures into the ontology context, business questions can use established calculations such as revenue, inventory value, or active-customer measures instead of generating new formulas for each consumer.

**Rules** capture business logic in natural language and link it to entities, properties, and relationships. Representing a rule in the ontology makes the same rule context available to multiple consumers, which reduces the need to duplicate business instructions across individual prompts, agents, and applications.

For more information, see [Create and manage business rules in ontology (preview)](how-to-use-rules.md).

### Namespaces and reuse

**Namespaces** organize ontology elements into meaningful scopes. They help distinguish and manage concepts across larger models and domains while allowing the ontology to preserve a coherent business vocabulary. For more information, see [Namespaces in ontology (preview)](how-to-use-namespaces.md).

**Inheritance** lets authors define a common entity type and extend it for more specialized concepts. **Shared properties** let authors define a property once and reference it across multiple entity types. Together, these capabilities help teams avoid recreating common definitions and maintain consistency as the ontology grows. For more information, see [Model with inheritance in ontology (preview)](how-to-use-inheritance.md) and [Reuse shared properties in ontology (preview)](how-to-reuse-properties.md).

### AI-assisted ontology experiences

The [ontology agent](how-to-use-ontology-agent.md) supports the ontology lifecycle through natural-language interactions. In the current preview scope, it can use connected Fabric sources to help generate ontology definitions and bindings, answer business questions against ontology context, and propose changes for review. Changes follow a proposal-first model so users can review them before applying them.

Other agent experiences can also consume ontology context. When an agent uses an ontology, it can work with governed entities, relationships, definitions, rules, metrics, and source mappings, helping its responses remain more grounded and consistent across underlying systems. Availability and supported functionality can vary by agent experience. See the documentation for the specific consumer you plan to use.

For more information, see [Use the ontology agent (preview) in Fabric](how-to-use-ontology-agent.md).

### Real-time exploration

You can explore ontology-backed data through entity-focused experiences. The ontology supplies definitions and mappings, while the consuming experience executes the query against the relevant source. This separation lets agent experiences use the same business context without requiring ontology to duplicate their visualization or query engines.

For more information, see [Use the ontology agent (preview) in Fabric](how-to-use-ontology-agent.md).

### Optional graph execution

Ontology defines the business meaning of entities and relationships. **Graph in Microsoft Fabric is an optional execution layer** for scenarios in which the relationship path itself is important, such as multihop traversal, dependency analysis, reachability, or shortest-path questions. Routine lookups, aggregations, metrics, and fresh time-series questions can continue to use their source systems.

An ontology-derived schema graph doesn't load instance data by default. When you need graph execution, you can opt in to materializing the relevant data. This data materialization replaces the earlier framing that presented every ontology as having an automatically materialized instance graph.

For more information, see [Materialize a graph from an ontology (preview)](how-to-use-ontology-graph.md).

### Lifecycle, interoperability, and governance

Ontology supports named [version history](how-to-use-version-history.md) so authors can create checkpoints, review prior versions, and restore a known state. In the initial experience, you create versions manually, and each version includes identifying information such as date, time, creator, name, and description. Restoring a version replaces the current ontology definition with that saved definition.

Ontology can also [import](how-to-import-export.md#import-an-ontology) supported RDF, Turtle, and OWL definitions into an empty ontology item and [export](how-to-import-export.md#export-an-ontology) supported ontology definitions in RDF or Turtle formats. Import results identify preserved, automatically adjusted, and unsupported elements so authors can review how an external definition maps to ontology in Fabric.

Fabric workspace and item permissions control access to ontology items. Authoring and querying respect access to bound data, including OneLake security and source-enforced row-level security (RLS), object-level security (OLS), and column-level security (CLS), alongside programmatic access and CI/CD capabilities. For more information, see [Table, column, and row-level security in OneLake](../../onelake/security/table-column-row-security.md).

## Core concepts

### Entity type

An **entity type** is the reusable definition of a business concept, such as *Customer*, *Shipment*, *Machine*, or *Store*. It can define a name, description, properties, identifiers, metrics, rules, metadata, and relationships. An entity type represents business meaning independently of any single source table.

### Entity instance

An **entity instance** is a data-backed occurrence of an entity type, such as a particular customer or machine. Consuming experiences resolve instances from an entity type's bindings, then display or query them.

### Property

A **property** is a named characteristic of an entity type, such as a customer's email address or a machine's operating state. Properties have data types, and you can map them to fields in one or more bound sources.

### Relationship

A **relationship** defines how two entity types connect, such as *Customer places Order* or *Machine belongs to Production Line*. Relationships make business connections explicit and reusable by people, applications, agents, and optional graph execution.

### Metric

A **metric** represents a governed calculation associated with ontology concepts. In the preview experience, metrics originate from DAX measures in a source semantic model and retain their connection to that source.

### Rule

A **rule** is a natural-language statement of business logic linked to ontology concepts. Rules provide additional operational context that supported consumers can use during reasoning.

### Namespace

A **namespace** provides a scope for organizing and distinguishing ontology elements. Namespaces are especially useful when a model contains concepts owned by multiple domains or teams.

### Data binding

A **data binding** maps ontology definitions to source data. It identifies the source structures that provide entity properties, instances, metrics, or relationship values and lets consumers work in ontology terminology while using data from the owning system.

## Migrate from old experience

The new ontology experience is the default experience for new ontology items. If you already have an ontology that you created in the old experience, use the in-product action to **create a copy in the new experience**. The copy flow preserves the original item while creating a separate ontology item based on its supported definitions.

:::image type="content" source="media/overview/migrate-banner.png" alt-text="Screenshot of the banner in the old ontology with a button to create a copy in the new experience." lightbox="media/overview/migrate-banner.png":::

The new experience item is created with the same entity types, properties and bindings, and relationship types from the original old experience item.

After you create the new experience item, review these elements manually and re-create them if needed:

- Because the new experience copy is a separate item in Fabric, reconnect downstream consumers to the new item. This might include:
    - Agents
    - Dashboards
    - Other integrations
- Recreate [rules](how-to-use-rules.md#migrate-activator-rules-from-ontology-old-experience) and manually set up Activator alerts if you need them.

Your old ontology stays in your workspace and is available until the old experience retires.

>[!IMPORTANT]
> The old experience of ontology retires on Jan 31, 2027.

## Next steps

- [Prepare your tenant](overview-tenant-settings.md) by enabling the required ontology settings.
- [Create an ontology manually](tutorial-1-create-ontology.md) or [generate one from a Power BI semantic model](how-to-generate-from-semantic-models.md).
- [Bind ontology concepts](how-to-bind-data.md) to your enterprise data.
- Add [metadata](how-to-add-metadata.md), [rules](how-to-use-rules.md), [metrics](how-to-use-metrics.md), [inheritance](how-to-use-inheritance.md), [shared properties](how-to-reuse-properties.md), and [namespaces](how-to-use-namespaces.md).
- Connect a [supported agent](concepts-agent-integration.md) to consume the ontology context. Or, use the built in [ontology agent](how-to-use-ontology-agent.md) experience.
- If you have an existing ontology item that was created with the old experience, review the [migration guidance](#migrate-from-old-experience) and create a copy in the new experience.
