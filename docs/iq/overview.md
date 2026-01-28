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

IQ (preview) is a workload for unifying data sitting across OneLake (including [lakehouses](../data-engineering/lakehouse-overview.md), [eventhouses](../real-time-intelligence/eventhouse.md), and [semantic models](../data-warehouse/semantic-models.md)) and organizing it according to the language of your business. The data is then exposed to analytics, AI agents, and applications with consistent semantic meaning and context.

[!INCLUDE [Fabric feature-preview-note](../includes/feature-preview-note.md)]

## Why use IQ (preview)?

IQ (preview) enables the following benefits:

* **Consistency across tools:** A single definition of a concept (like *Customer*, *Material*, or *Asset*) drives how Power BI, notebooks, and agents interpret data.
* **Faster onboarding:** New dashboards or AI experiences don't need to rediscover business meaning, as business concepts only need to be declared once.
* **Governance and trust:** Clear semantics reduce duplication and semantic drift, while constraints improve data quality.
* **Cross domain reasoning:** Graph links let you traverse relationships (like *Order > Shipment > Temperature Sensor > Cold Chain Breach*) to explain outcomes.
* **AI readiness and decision-ready actions:** Ontologies provide structured grounding for copilots and agents, so answers reflect your enterprise language. Because business rules and constraints live in the ontology, agents can move beyond answers to safe, auditable actions.

## Where IQ (preview) fits in Fabric

Here's how IQ (preview) implements key Fabric capabilities:

* **Ingest and store:** Builds on data from lakehouse tables, eventhouse streams, and existing semantic models.
* **Model and represent semantics:** The ontology (preview) item offers modeling capabilities by defining entity types, properties on entity types, and relationship types. Optionally bootstrap an ontology structure from existing data sources and models, or create your own. Then, bind ontology features to data sources, and explore them in a navigable graph that is built automatically.
* **Analyze and visualize:** The ontology (preview) item integrates with Graph in Microsoft Fabric to provide a visual graph and query experience based on your business concepts. You can also build Power BI models grounded in your ontology, or use the ontology to inform power domain aware agents.
* **Operate and govern:** You can version, validate, and govern your ontology definitions. You can also monitor ontology health through Fabric monitoring tools.

## Items in IQ (preview)

IQ (preview) contains the following items:

* *Ontology (preview):* [Ontology (preview)](ontology/overview.md) is an item for the enterprise vocabulary and semantic layer that unifies meaning across domains and OneLake sources. It defines entity types, relationships, properties, and rules and constraints, and binds them to real data so that downstream tools share the same language.
* *Fabric data agent (preview)*: [Fabric data agent (preview)](../data-science/concept-data-agent.md) allows you to build your own conversational Q&A systems using generative AI.
* *Graph in Microsoft Fabric* (preview): [Graph in Microsoft Fabric (preview)](../graph/overview.md) offers native graph storage and compute for nodes, edges, and traversals over connected data. It's good for path finding, dependency analysis, and graph algorithms.
* *Operations agent (preview)*: [Operations agent (preview)](../real-time-intelligence/operations-agent.md) lets you create an AI agent to monitor real-time data and recommend business actions.
* *Power BI semantic model:* A [semantic model](../data-warehouse/semantic-models.md) is a curated analytics model that's optimized for reporting and interactive analysis with measures, scorecard hierarchies, and relationships for visuals and DAX.

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

* **Ontology (preview) and semantic model:** Define enterprise concepts, like *Customer*, *Shipment*, and *Breach*, only once. Generate or align Power BI models so that KPIs stay consistent across reports.
* **Ontology (preview) and Graph in Microsoft Fabric:** Ontology declares which things connect and why. Graph in Microsoft Fabric stores and computes traversals, like "Find shipments exposed to risky routes and related breaches."
* **Ontology (preview) and data agent:** Ontology grounds agents in shared business semantics and rules. As a result, agents can retrieve relevant context, reason across domains, and recommend or trigger governed actions.
* **All items:** Ontology defines the language for your business. Digital twin builder makes it operational for assets. Graph in Microsoft Fabric powers dependency and impact analysis. Semantic models present trusted KPIs.
<!--* **Ontology (preview) and digital twin builder:** Ontology provides reusable types (like *Asset*, *Sensor*, and *Thresholds*). Digital twin builder instantiates specific twins and runs scenarios using those types.-->

## Next steps

Learn about building an ontology in [What is ontology (preview)?](ontology/overview.md)