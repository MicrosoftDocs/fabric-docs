---
title: What is Fabric IQ (preview)?
description: Learn about the purpose and item components of the Fabric IQ (preview) workload in Microsoft Fabric.
ms.date: 04/02/2026
ms.topic: overview
ai-usage: ai-assisted
---

# What is Fabric IQ (preview)?

Fabric IQ (preview) is a workload for unifying data sitting across OneLake and organizing it according to the language of your business. The data is then exposed to analytics, AI agents, and applications with consistent semantic meaning and context. This page provides an overview of the Fabric IQ workload, the items it contains, and how those items work together to deliver unified data and semantics in Microsoft Fabric.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

As a [workload in Fabric](../fundamentals/fabric-terminology.md), Fabric IQ is a collection of capabilities targeted to the common functionality of modeling an environment with unified language. The items grouped into the Fabric IQ workload include:
* [Ontology (preview)](ontology/overview.md)
* [Plan (preview)](plan/overview.md)
* [Graph (preview)](../graph/overview.md)
* [Data agent](../data-science/concept-data-agent.md)
* [Operations agent (preview)](../real-time-intelligence/operations-agent.md)
* [Power BI semantic models](../data-warehouse/semantic-models.md)

For more information about the role of each item in the Fabric IQ workload, see the section [Items in Fabric IQ (preview)](#items-in-fabric-iq-preview).

>[!NOTE]
>Fabric items can be part of multiple workloads. Several of the items in Fabric IQ are shared with other Fabric workloads like Real-Time Intelligence and Power BI, since they are relevant to the intent of multiple workload scenarios.

## Why use Fabric IQ (preview)?

Fabric IQ (preview) enables the following benefits:

* **Unification of data:** Unify analytical and operational data, by combining data from various sources across OneLake (like [lakehouses](../data-engineering/lakehouse-overview.md), [eventhouses](../real-time-intelligence/eventhouse.md), and [Power BI semantic models](../data-warehouse/semantic-models.md)) into a single consistent model. Fabric IQ can also unify external operational data using [OneLake shortcuts](../onelake/onelake-shortcuts.md), referencing it in place without copying or building ETL pipelines.
* **Consistent language across tools:** Provides a single definition of a concept (like *Customer*, *Material*, or *Asset*) that drives how Power BI, notebooks, and agents interpret data.
* **Faster onboarding:** Provides new dashboards and AI experiences with consistent business meaning, as business concepts only need to be declared once.
* **Governance and trust:** Reduces duplication and inconsistent definitions across teams by enforcing clear semantics, while constraints improve data quality.
* **Cross domain reasoning:** Represents relationships between concepts with graph links, and allows you to traverse relationships (like *Order > Shipment > Temperature Sensor > Cold Chain Breach*) to explain outcomes.
* **AI readiness and decision-ready actions:** Provides structured grounding for copilots and agents, so answers reflect your enterprise language as defined in your ontology. Ontology also defines rules through integration with Fabric Activator, enabling governed, real-time actions (like alerts or notifications) when conditions are met. Because business rules and constraints live in the ontology, agents can move beyond answers to safe, auditable actions.

## Where Fabric IQ (preview) fits in Fabric

Here's how Fabric IQ (preview) implements key Fabric capabilities:

* **Ingest and store:** Builds on data from lakehouse tables, eventhouse streams, and existing Power BI semantic models. Fabric IQ scenarios can also consume data shared across organizational boundaries through [OneLake external data sharing](../governance/external-data-sharing-overview.md), extending visibility to governed data in other tenants. The plan (preview) item uses [OneLake mirroring](../database/mirrored-database/overview.md) and [OneLake shortcuts](../onelake/onelake-shortcuts.md) to integrate data sources while minimizing ETL, keeping data in place and preserving governance.
* **Model and represent semantics:** The ontology (preview) item offers modeling capabilities by defining entity types, properties on entity types, and relationship types. Optionally bootstrap an ontology structure from existing data sources and models, or create your own. Then, bind ontology features to data sources, and explore them in a navigable graph that is built automatically.
* **Analyze and visualize:** The Fabric IQ items of ontology (preview) and graph work together to provide a visual graph and query experience based on your business concepts. You can also build ontologies based on your Power BI semantic models so the same terminology can be used for analysis across items, or use the ontology to inform power domain aware agents.
* **Operate and govern:** You can version, validate, and govern your ontology definitions. Governance, lineage tracking, and auditing apply consistently across all data sources, including data accessed through [OneLake shortcuts](../onelake/onelake-shortcuts.md) and [cross-tenant shares](../governance/external-data-sharing-overview.md). You can also monitor ontology health through Fabric monitoring tools. Plan (preview) adds workflow approvals and detailed audit trails for writeback operations and plan revisions.

## Items in Fabric IQ (preview)

Fabric IQ (preview) is a Fabric workload that contains the following items. Some of these items are shared with other Fabric workloads, and items can work together to accomplish the shared Fabric IQ vision of unified data and semantics.

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

This section contains guidance for choosing the right tools for your scenario from the modeling options in Fabric. The following table includes modeling-related items from Fabric IQ and Real-Time Intelligence.

| Item | When to use | 
| --- | --- |
| [Ontology (preview)](ontology/overview.md) in Fabric IQ | Use when you need cross-domain consistency, governance, and AI/agent grounding, and you want to reason across processes. |
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

Learn more about the items that make up Fabric IQ:
* [What is ontology (preview)?](ontology/overview.md)
* [What is plan (preview)?](plan/overview.md)
* [What is Fabric Graph (preview)?](../graph/overview.md)
* [What is the Fabric data agent?](../data-science/concept-data-agent.md)
* [Getting started with operations agents](../real-time-intelligence/operations-agent.md)
* [Semantic models](../data-warehouse/semantic-models.md)

