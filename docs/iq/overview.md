---
title: What is Fabric IQ (preview)?
description: Learn about the purpose and item components of the Fabric IQ (preview) workload in Microsoft Fabric.
ms.date: 05/11/2026
ms.topic: overview
ai-usage: ai-assisted
---

# What is Fabric IQ?

*Fabric IQ* is part of Microsoft IQ, a set of capabilities that form the enterprise intelligence layer of the Microsoft stack. In Microsoft IQ, Fabric IQ works alongside [Work IQ](/microsoft-365/copilot/extensibility/work-iq) and [Foundry IQ](/azure/foundry/agents/concepts/what-is-foundry-iq) to provide context for a complete view of your organization. Fabric IQ captures the business data piece of this vision.

Fabric IQ unifies analytical, real-time, and operational data under a coherent semantic framework so agents and people interpret information the same way. Through [OneLake tables](../onelake/onelake-overview.md), [Power BI semantic models](../data-warehouse/semantic-models.md), and [ontologies](ontology/overview.md), Fabric IQ organizes contextual business data so it can be consumed by agents and Microsoft IQ as a whole.

:::image type="content" source="media/overview/fabric-iq-pillars.png" alt-text="Diagram showing the Fabric IQ pillars of ontologies, semantic models, and OneLake." lightbox="media/overview/fabric-iq-pillars.png":::

## Why use Fabric IQ?

Organizations work with data at the level of tables and schemas, which are structures built for machines, not meaning. However, they run on business concepts like customers, shipments, and assets. Without semantic understanding, AI remains unfit for high-stakes decisions because each question requires manual translation by a domain expert.

Fabric IQ addresses this gap by providing:

* **Unification of data.** Unify analytical and operational data by combining data from various sources across OneLake (like [lakehouses](../data-engineering/lakehouse-overview.md), [eventhouses](../real-time-intelligence/eventhouse.md), and [Power BI semantic models](../data-warehouse/semantic-models.md)) into a single consistent model. Fabric IQ can also unify external operational data using [OneLake shortcuts](../onelake/onelake-shortcuts.md), referencing it in place without copying or building ETL pipelines.
* **Alignment with a consistent view of the business.** Teams, applications, and AI agents all operate from a consistent, trusted foundation of shared concepts and data. This eliminates ambiguity and ensures decisions by both people and AI reflect a unified view of the business.
* **Consistent language and richer intelligence.** A single definition of a concept (like Customer, Material, or Asset) drives how Power BI, notebooks, and agents interpret data. Users uncover insights that reflect not just raw data, but semantic meaning, including how entities relate, what matters most, and what actions to take.
* **Faster onboarding.** New dashboards and AI experiences get consistent business meaning because business concepts only need to be declared once.
* **Governance and trust.** Reduced duplication and inconsistent definitions across teams by enforcing clear semantics, while constraints improve data quality.
* **Cross-domain reasoning.** Relationships between concepts through graph links allow you to traverse relationships (like Order > Shipment > Temperature Sensor > Cold Chain Breach) to explain outcomes.
* **AI readiness and decision-ready actions.** Structured grounding for copilots and agents, so answers reflect your enterprise language as defined in your [ontology](ontology/overview.md).

## Pillars of Fabric IQ in Microsoft IQ

Fabric IQ brings together three categories of business context: [operational intelligence](#operational-intelligence-with-ontologies), [business intelligence](#business-intelligence-with-semantic-models), and [unified data](#unified-data-with-onelake).

:::image type="content" source="media/overview/fabric-iq-pillars.png" alt-text="Diagram showing the Fabric IQ pillars of ontologies, semantic models, and OneLake." lightbox="media/overview/fabric-iq-pillars.png":::

### Operational intelligence with ontologies

[Ontologies](ontology/overview.md) define core business entities, relationships, properties, rules, and actions. Agents understand what actions are available and how to invoke them. Operations agents monitor live data, detect anomalies, and take governed action.

Ontologies can be generated from existing Power BI semantic models, allowing you to bootstrap from trusted logic and definitions already in production. Both humans and AI agents can use this shared language for cross-domain reasoning and decision-ready actions. You can also query your ontology using natural language through the NL2Ontology query layer, which converts business questions into structured queries.

### Business intelligence with semantic models

[Power BI semantic models](../data-warehouse/semantic-models.md) provide a curated analytics layer with measures, hierarchies, and dimensions. Ontologies can be generated directly from semantic models already in production, keeping business language consistent across experiences. 

Semantic models and ontologies work together. You can generate or align ontologies directly from semantic models so terminology and KPIs stay consistent across reports, agents, and applications. Define enterprise concepts, such as Customer, Shipment, and Breach, only once and reuse them across Fabric IQ experiences.

### Unified data with OneLake

[OneLake](../onelake/onelake-overview.md) unifies structured, unstructured, real-time, and graph data across clouds (Azure, AWS, GCP, on-prem, SAP, Snowflake, Databricks) with zero-copy, zero-ETL access. Graph provides native storage and compute for relationship-heavy queries and traversals. 

With OneLake, Fabric IQ brings intelligence to the data rather than requiring data migration.

## IQ as a workload in Fabric

Within Microsoft Fabric, the *Fabric IQ (preview)* [workload](../fundamentals/fabric-terminology.md) is a grouping of related Fabric items for unifying and contextualizing business data.

>[!NOTE]
>Fabric items can be part of multiple workloads. Several of the items in Fabric IQ are shared with other Fabric workloads like Real-Time Intelligence and Power BI, since they are relevant to the intent of multiple workload scenarios.

The items that are grouped in the Fabric IQ workload are:
* [Ontology (preview)](ontology/overview.md)
* [Plan (preview)](plan/overview.md)
* [Graph (preview)](../graph/overview.md)
* [Data agent](../data-science/concept-data-agent.md)
* [Operations agent (preview)](../real-time-intelligence/operations-agent.md)
* [Power BI semantic models](../data-warehouse/semantic-models.md)

For more information about the role of each item in the Fabric IQ workload, see the section [Items in Fabric IQ (preview)](#items-in-fabric-iq-preview).

>[!NOTE]
> OneLake is the data foundation for all Microsoft Fabric items. Though OneLake isn't explicitly included as an item in the Fabric IQ workload, all items in the workload rely on OneLake data tables and interact with them natively.

### Where Fabric IQ (preview) fits in Fabric

Here's how the Fabric IQ (preview) workload implements key Fabric capabilities:

* **Ingest and store:** Builds on data from lakehouse tables, eventhouse streams, and existing [Power BI semantic models](../data-warehouse/semantic-models.md). Fabric IQ scenarios can also consume data shared across organizational boundaries through [OneLake external data sharing](../governance/external-data-sharing-overview.md), extending visibility to governed data in other tenants. The [plan (preview)](plan/overview.md) item uses [OneLake mirroring](../database/mirrored-database/overview.md) and [OneLake shortcuts](../onelake/onelake-shortcuts.md) to integrate data sources while minimizing ETL, keeping data in place and preserving governance.
* **Model and represent semantics:** [Power BI semantic models](../data-warehouse/semantic-models.md) provide a logical description of an analytical domain. Choose which tables to add from a lakehouse or warehouse, and use the semantic model to represent your domain within Fabric. Semantic models can also be exported to [ontology (preview)](ontology/overview.md), which offers modeling capabilities by defining entity types, properties on entity types, and relationship types. Optionally bootstrap an ontology structure from existing data sources and models, or create your own. Then, bind ontology features to data sources, and explore them in a navigable graph that is built automatically.
* **Analyze and visualize:** Use [Power BI semantic models](../data-warehouse/semantic-models.md) as the basis for [reports in Power BI](../data-warehouse/reports-power-bi-service.md). You can also visualize data in [ontology (preview)](ontology/overview.md) and [graph (preview)](../graph/overview.md), which work together to provide a visual graph and query experience based on your business concepts. Use ontologies based on your Power BI semantic models to keep the same terminology for analysis across items, or use ontologies to inform power domain aware agents.
* **Operate and govern:** You can version, validate, and govern your ontology definitions. Governance, lineage tracking, and auditing apply consistently across all data sources, including data accessed through [OneLake shortcuts](../onelake/onelake-shortcuts.md) and [cross-tenant shares](../governance/external-data-sharing-overview.md). You can also monitor ontology health through Fabric monitoring tools. Plan (preview) adds workflow approvals and detailed audit trails for writeback operations and plan revisions.

## Items in Fabric IQ (preview)

The Fabric IQ (preview) workload contains the following items. Some of these items are shared with other Fabric workloads, and items can work together to accomplish the shared Fabric IQ vision of unified data and semantics.

* *[Ontology (preview)](ontology/overview.md)* is an item for the enterprise vocabulary and semantic layer that unifies meaning across domains and OneLake sources. It defines entity types, relationships, properties, and condition–action rules (through Fabric Activator). Then, the ontology binds all of these definitions to real data so that downstream tools share the same language. Ontologies are the core item for defining a common language in the Fabric IQ workload.
* *[Plan (preview)](plan/overview.md)* allows you to integrate planning, visualization, analytics, and data management on a single platform. Plan is a unified no-code platform for collaborative planning, reporting, analytics, data integration, and management. It enables organizations to work from a consistent data foundation, allowing business users to plan, analyze, and report without switching between multiple tools.
* *[Graph (preview)](../graph/overview.md)* offers native graph storage and compute for nodes, edges, and traversals over connected data. It's good for path finding, dependency analysis, and graph algorithms. Graph is integrated with the ontology item and brings a visual representation of your business concepts and relationships to the Fabric IQ workload.
    * This item is also part of the Real-Time Intelligence workload.
* *[Data agent](../data-science/concept-data-agent.md)* allows you to build your own conversational Q&A systems using generative AI. In Fabric IQ, data agents can connect to your ontology as a source, enabling them to understand your business concepts and use these terms when answering questions.
    * This item is also part of the Data Science workload.
* *[Operations agent (preview)](../real-time-intelligence/operations-agent.md)* lets you create an AI agent to monitor real-time data and recommend business actions. It supports the Fabric IQ workload vision of intelligent agents that can reason across business concepts while being aware of terminology.
    * This item is also part of the Real-Time Intelligence workload.
* *[Power BI semantic model](../data-warehouse/semantic-models.md)* is a curated analytics model that's optimized for reporting and interactive analysis with measures, scorecard hierarchies, and relationships for visuals and DAX. Semantic models are another way to represent the structure, language, and relationships of your business data, and ontologies can be generated directly from them to keep that language consistent across Fabric experiences.
    * This item is also part of the Power BI workload.

### Choose the right item

This section contains guidance for choosing the right tools for your scenario from the modeling options in Fabric. The following table includes modeling-related items from the Fabric IQ workload and Real-Time Intelligence.

| Item | When to use | 
| --- | --- |
| [Ontology (preview)](ontology/overview.md) in Fabric IQ workload | Use when you need cross-domain consistency, governance, and AI/agent grounding, and you want to reason across processes. |
| [Graph (preview)](../graph/overview.md) | Use when relationship-heavy questions (like impact chains, communities, and shortest paths) dominate your decision making, and you need graph-native performance. Graph supports GQL-style pattern matching and shortest-path queries for relationship-heavy questions. |
| [Power BI semantic model](../data-warehouse/semantic-models.md) | Use when business users need trusted KPIs and fast visuals with dimensional modeling, calculations, and governed datasets for self-service BI. |
| [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) in Real-Time Intelligence | Use when you need operational context, stateful twins, scenario analysis, or what-if simulation tied to real assets and signals. |

### Item relationships

This section describes how items work together or relate to one another.

* **Ontology (preview) and semantic model:** By using these Fabric IQ items together, you can get the benefits of both representations while defining enterprise concepts—like *Customer*, *Shipment*, and *Breach*—only once. Generate or align Power BI semantic models so that terminology and key performance indicators (KPIs) stay consistent across reports.
* **Ontology (preview) and Graph:** Ontology declares which things connect and why. Graph stores and computes traversals, like "Find shipments exposed to risky routes and related breaches." These items work together in Fabric IQ by integrating the graph experience into ontology items.
* **Ontology (preview) and data/operations agents:** Ontology grounds agents in shared business semantics and rules. As a result, agents can retrieve relevant context, reason across domains, and recommend or trigger governed actions.
* **Plan (preview) and semantic model:** Plan (preview) can connect to existing semantic models, allowing their dimensions and measures to be used in planning sheets for seamless plan-versus-actuals analytics. You can also create dynamic forecasts directly on your semantic model and update them as new actuals become available.
* **All items:** Power BI semantic models present trusted KPIs. Ontology defines the language for your business, in a way that's consistent with existing semantic model representations. Plan connects data to decisions and helps you translate insights to actions efficiently. Graph powers dependency and impact analysis. Data and operations agents enable intelligent agent interactions that are aware of your business concepts. Real-time eventhouse streams can feed the Operations agent with live signals, while the Plan item translates those signals into coordinated actions. Together, these items form the Fabric IQ workload that connects data, semantics, planning, analysis, and AI-driven actions.

## Next steps

Learn about the other workloads in Microsoft IQ:
* [Work IQ](/microsoft-365/copilot/extensibility/work-iq)
* [Foundry IQ](/azure/foundry/agents/concepts/what-is-foundry-iq)

Learn about the Fabric items in the Fabric IQ workload:
* [What is ontology (preview)?](ontology/overview.md)
* [What is plan (preview)?](plan/overview.md)
* [What is Fabric Graph (preview)?](../graph/overview.md)
* [What is the Fabric data agent?](../data-science/concept-data-agent.md)
* [Create and configure operations agents](../real-time-intelligence/operations-agent.md)
* [Semantic models](../data-warehouse/semantic-models.md)
