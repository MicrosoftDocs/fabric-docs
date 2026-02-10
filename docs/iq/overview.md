---
title: What is Fabric IQ (preview)?
description: Learn about the purpose and item components of the IQ (preview) workload in Microsoft Fabric.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 11/04/2025
ms.topic: overview
ms.service: fabric
---

# What is Fabric IQ (preview)?

IQ (preview) is a workload for unifying data sitting across OneLake and organizing it according to the language of your business. The data is then exposed to analytics, AI agents, and applications with consistent semantic meaning and context. This page provides an overview of the IQ workload, the items it contains, and how those items work together to deliver unified data and semantics in Microsoft Fabric.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

As a [workload in Fabric](../fundamentals/fabric-terminology.md), IQ is a collection of capabilities targeted to the common functionality of modeling an environment with unified language. The items grouped into the IQ workload include:
* [Ontology (preview)](ontology/overview.md)
* [Graph in Microsoft Fabric (preview)](../graph/overview.md)
* [Fabric data agent (preview)](../data-science/concept-data-agent.md)
* [Operations agent (preview)](../real-time-intelligence/operations-agent.md)
* [Power BI semantic models](../data-warehouse/semantic-models.md)

For more information about the role of each item in the IQ workload, see the section [Items in IQ (preview)](#items-in-iq-preview).

>[!NOTE]
>Fabric items can be part of multiple workloads. Several of the items in Fabric IQ are shared with other Fabric workloads like Real-Time Intelligence and Power BI, since they are relevant to the intent of multiple workload scenarios.

## Why use IQ (preview)?

IQ (preview) enables the following benefits:

* **Unification of data:** Unify analytical and operational data, by combining data from various sources across OneLake (like [lakehouses](../data-engineering/lakehouse-overview.md), [eventhouses](../real-time-intelligence/eventhouse.md), and [Power BI semantic models](../data-warehouse/semantic-models.md)) into a single consistent model. 
* **Consistent language across tools:** Provides a single definition of a concept (like *Customer*, *Material*, or *Asset*) that drives how Power BI, notebooks, and agents interpret data.
* **Faster onboarding:** Provides new dashboards and AI experiences with consistent business meaning, as business concepts only need to be declared once.
* **Governance and trust:** Reduces duplication and inconsistent definitions across teams by enforcing clear semantics, while constraints improve data quality.
* **Cross domain reasoning:** Represents relationships between concepts with graph links, and allows you to traverse relationships (like *Order > Shipment > Temperature Sensor > Cold Chain Breach*) to explain outcomes.
* **AI readiness and decision-ready actions:** Provides structured grounding for copilots and agents, so answers reflect your enterprise language as defined in your ontology. Because business rules and constraints live in the ontology, agents can move beyond answers to safe, auditable actions.

## Where IQ (preview) fits in Fabric

Here's how IQ (preview) implements key Fabric capabilities:

* **Ingest and store:** Builds on data from lakehouse tables, eventhouse streams, and existing Power BIsemantic models.
* **Model and represent semantics:** The ontology (preview) item offers modeling capabilities by defining entity types, properties on entity types, and relationship types. Optionally bootstrap an ontology structure from existing data sources and models, or create your own. Then, bind ontology features to data sources, and explore them in a navigable graph that is built automatically.
* **Analyze and visualize:** The IQ items of ontology (preview) and Graph in Microsoft Fabric work together to provide a visual graph and query experience based on your business concepts. You can also build ontologies based on your Power BI semantic models so the same terminology can be used for analysis across items, or use the ontology to inform power domain aware agents.
* **Operate and govern:** You can version, validate, and govern your ontology definitions. You can also monitor ontology health through Fabric monitoring tools.

## Items in IQ (preview)

IQ (preview) is a Fabric workload that contains the following items. Some of these items are shared with other Fabric workloads, and items can work together to accomplish the shared IQ vision of unified data and semantics.

* *[Ontology (preview)](ontology/overview.md)* is an item for the enterprise vocabulary and semantic layer that unifies meaning across domains and OneLake sources. It defines entity types, relationships, properties, and rules and constraints, and binds them to real data so that downstream tools share the same language. Ontologies are the core item for defining a common language in the IQ workload.
* *[Graph in Microsoft Fabric (preview)](../graph/overview.md)* offers native graph storage and compute for nodes, edges, and traversals over connected data. It's good for path finding, dependency analysis, and graph algorithms. Graph is integrated with the ontology item and brings a visual representation of your business concepts and relationships to the IQ workload.
    * This item is also part of the Real-Time Intelligence workload.
* *[Fabric data agent (preview)](../data-science/concept-data-agent.md)* allows you to build your own conversational Q&A systems using generative AI. In IQ, data agents can connect to your ontology as a source, enabling them to understand your business concepts and use these terms when answering questions.
    * This item is also part of the Data Science workload.
* *[Operations agent (preview)](../real-time-intelligence/operations-agent.md)* lets you create an AI agent to monitor real-time data and recommend business actions. It supports the IQ workload vision of intelligent agents that can reason across business concepts while being aware of terminology.
    * This item is also part of the Real-Time Intelligence workload.
* *[Power BI semantic model](../data-warehouse/semantic-models.md)* is a curated analytics model that's optimized for reporting and interactive analysis with measures, scorecard hierarchies, and relationships for visuals and DAX. Semantic models are another way to represent the structure, language, and relationships of your business data, and ontologies can be generated directly from them to keep that language consistent across Fabric experiences.
    * This item is also part of the Power BI workload.

### Choose the right item

This section contains guidance for choosing the right tools for your scenario from the modeling options in Fabric. The following table includes modeling-related items from IQ and Real-Time Intelligence.

| Item | When to use | 
| --- | --- |
| [Ontology (preview)](ontology/overview.md) in IQ | Use when you need cross-domain consistency, governance, and AI/agent grounding, and you want to reason across processes. |
| [Graph in Microsoft Fabric (preview)](../graph/overview.md) | Use when relationship-heavy questions (like impact chains, communities, and shortest paths) dominate your decision making, and you need graph-native performance. |
| [Power BI semantic model](../data-warehouse/semantic-models.md) | Use when business users need trusted KPIs and fast visuals with dimensional modeling, calculations, and governed datasets for self-service BI. |
| [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) in Real-Time Intelligence | Use when you need operational context, stateful twins, scenario analysis, or what-if simulation tied to real assets and signals. |

### Item relationships

This section describes how items work together or relate to one another.

* **Ontology (preview) and semantic model:** By using these IQ items together, you can get the benefits of both representations while defining enterprise concepts—like *Customer*, *Shipment*, and *Breach*—only once. Generate or align Power BI semantic models so that terminology and key performance indicators (KPIs) stay consistent across reports.
* **Ontology (preview) and Graph in Microsoft Fabric:** Ontology declares which things connect and why. Graph in Microsoft Fabric stores and computes traversals, like "Find shipments exposed to risky routes and related breaches." These items work together in IQ by integrating the graph experience into ontology items.
* **Ontology (preview) and data/operations agents:** Ontology grounds agents in shared business semantics and rules. As a result, agents can retrieve relevant context, reason across domains, and recommend or trigger governed actions.
* **All items:** Power BI semantic models present trusted KPIs. Ontology defines the language for your business, in a way that's consistent with existing semantic model representations. Graph in Microsoft Fabric powers dependency and impact analysis. Data and operations agents enable intelligent agent interactions that are aware of your business concepts. Together, these items form a unified IQ workload that connects data, semantics, analysis, and AI-driven actions.
<!--* **Ontology (preview) and digital twin builder:** Ontology provides reusable types (like *Asset*, *Sensor*, and *Thresholds*). Digital twin builder instantiates specific twins and runs scenarios using those types.-->

## Next steps

Learn more about ontology (preview), the core semantic representation item in the IQ workload: [What is ontology (preview)?](ontology/overview.md).