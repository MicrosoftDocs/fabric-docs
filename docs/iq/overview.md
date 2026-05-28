---
title: What is Fabric IQ?
description: Learn about Fabric IQ, part of Microsoft IQ and a workload in Microsoft Fabric.
ms.date: 05/26/2026
ms.topic: overview
ai-usage: ai-assisted
---

# What is Fabric IQ?

*Fabric IQ* is part of Microsoft IQ, a set of capabilities that form the enterprise intelligence layer of the Microsoft stack. In Microsoft IQ, Fabric IQ works alongside [Work IQ](/microsoft-365/copilot/extensibility/work-iq) and [Foundry IQ](/azure/foundry/agents/concepts/what-is-foundry-iq) to provide context for a complete view of your organization. Work IQ provides context on how employees work, Foundry IQ provides context on an organization's policies and authoritative documents, and Fabric IQ provides context on business entities and data.

Fabric IQ provides context on the state of your business. It is grounded in all the analytical, real-time, and operational data about your business, but data alone is not enough. Fabric IQ elevates that data up to the language of your business. With that richer context, people and agents can correctly interpret the data and reason and make decisions in terms of business concepts and objectives.

## Pillars of Fabric IQ

Fabric IQ brings three pillars of business context into Microsoft IQ: [unified data](#unified-data-with-onelake), [business intelligence](#business-intelligence-with-power-bi-semantic-models), and [operational intelligence](#operational-intelligence-with-ontologies). These pillars are delivered through two core [items](#iq-as-a-workload-in-fabric) in the Fabric IQ workload, ontology and semantic model, creating shared context over business data in OneLake.

:::image type="content" source="media/overview/fabric-iq-pillars.png" alt-text="Diagram showing the Fabric IQ pillars." lightbox="media/overview/fabric-iq-pillars.png":::

### Unified data with OneLake

[OneLake](../onelake/onelake-overview.md) is the foundation of Fabric IQ, unifying enterprise data across clouds and on-premises data into a single, governed source of truth. Through shortcuts, mirroring, and the OneLake catalog, it eliminates fragmentation and creates a multi-cloud, unified data lake that Fabric IQ uses to securely discover and access relevant context. It also serves as the distribution layer for that data, making it consistently available to Fabric workloads, Foundry, and Copilot Studio so all intelligence from semantic models, ontology, and agents is grounded in the same trusted, organization-wide data.

### Business intelligence with Power BI semantic models

[Power BI semantic models](../data-warehouse/semantic-models.md) provide a curated analytics layer with measures, hierarchies, and dimensions. Ontologies can be generated directly from semantic models already in production, keeping business language consistent across experiences. 

Semantic models and ontologies work together. You can generate or align ontologies directly from semantic models so terminology and KPIs stay consistent across reports, agents, and applications. Define enterprise concepts, such as Customer, Shipment, and Breach, only once and reuse them across Fabric IQ experiences.

### Operational intelligence with ontologies

[Ontologies](ontology/overview.md) define core business entities, relationships, properties, rules, and actions. Agents understand what actions are available and how to invoke them. Operations agents monitor live data, detect anomalies, and take governed action.

Ontologies can be generated from existing Power BI semantic models, allowing you to bootstrap from trusted logic and definitions already in production. Both humans and AI agents can use this shared language for cross-domain reasoning and decision-ready actions. You can also query your ontology using natural language through the NL2Ontology query layer, which converts business questions into structured queries.

## Why use Fabric IQ?

Organizations work with data at the level of tables and schemas, which are structures built for machines, not meaning. However, they run on business concepts like customers, shipments, and assets. Without semantic understanding, AI remains unfit for high-stakes decisions because each question requires manual translation by a domain expert.

Using the Fabric IQ framework enables these benefits:

* **Cross-domain reasoning.** Relationships between concepts through graph links allow you to traverse relationships (like Order > Shipment > Temperature Sensor > Cold Chain Breach) to explain outcomes.
* **Faster onboarding.** New dashboards and AI experiences get consistent business meaning because business concepts only need to be declared once.
* **Governance and trust.** Reduced duplication and inconsistent definitions across teams by enforcing clear semantics, while constraints improve data quality.

Fabric IQ's three pillars ensure that every agent starts with the same understanding of the business and can apply it correctly across workflows. However, frontier organizations cannot start at the IQ layer. Building this capability requires a unified data foundation. Microsoft Fabric delivers this through four core capabilities:

:::image type="content" source="media/overview/fabric-iq-framework.png" alt-text="Diagram showing the Fabric IQ framework." lightbox="media/overview/fabric-iq-framework.png":::

* **Unify the data estate.** Unify analytical and operational data by combining data from various sources across OneLake (like [lakehouses](../data-engineering/lakehouse-overview.md), [eventhouses](../real-time-intelligence/eventhouse.md), and [Power BI semantic models](../data-warehouse/semantic-models.md)) into a single consistent model. Fabric IQ can also unify external operational data using [OneLake shortcuts](../onelake/onelake-shortcuts.md), referencing it in place without copying or building ETL pipelines.
* **Process and harmonize data.** Query acceleration and AI-powered analytics enable simpler setup, faster insights, and AI-driven development. Spend less time managing performance and more time delivering meaningful insights.
* **Curate semantic knowledge.** Teams, applications, and AI agents all operate from a consistent, trusted foundation of shared concepts and data. A single definition of a concept (like Customer, Material, or Asset) drives how Power BI, notebooks, and agents interpret data. Users uncover insights that reflect not just raw data, but semantic meaning, including how entities relate, what matters most, and what actions to take. This eliminates ambiguity and ensures decisions by both people and AI reflect a unified view of the business.
* **Empower AI agents.** Fabric IQ provides structured grounding for copilots and agents, so answers reflect your enterprise language as defined in your [ontology](ontology/overview.md).

## IQ as a workload in Fabric

Within Microsoft Fabric, the *IQ (preview)* [workload](../fundamentals/fabric-terminology.md) is a grouping of related Fabric items for unifying and contextualizing business data. In addition to the core items of ontology and semantic model, the IQ workload provides additional items for analyzing, consuming, and operationalizing that context (across the ontology, semantic model, and OneLake).

>[!NOTE]
>Fabric items can be part of multiple workloads. Several of the items in the IQ workload are shared with other Fabric workloads like Real-Time Intelligence and Power BI, since they are relevant to the intent of multiple workload scenarios.

The following table lists all the items contained in the IQ (preview) workload:

| Fabric item | Description | Learn more |
| --- | --- | --- |
| Ontology (preview) | Define a shared business vocabulary—entity types, relationships, properties, and rules—that unifies meaning across domains and data sources. Use ontology to establish cross-domain consistency and governance, and to ground AI agents in trusted business language. | [What is ontology (preview)?](ontology/overview.md) |
| Power BI semantic model | Build curated analytics models with measures, hierarchies, and relationships optimized for reporting. Use semantic models when business users need trusted KPIs and fast, interactive visuals. Ontologies can be generated directly from semantic models to keep business language consistent across experiences. <br><br>*Also part of the Power BI workload.* | [Power BI semantic models in Microsoft Fabric](../data-warehouse/semantic-models.md) |
| Plan (preview) | Collaborate on planning, forecasting, and reporting from a single data foundation without switching tools. Use plan to bring together business planning, analytics, and data management in one no-code experience. | [What is plan (preview)?](plan/overview.md) |
| Graph (preview) | Store and query connected data with nodes, edges, and traversals. Use Graph when relationship-heavy questions (like impact chains, dependencies, and shortest paths) drive your decisions. Graph is integrated with the ontology item for a visual representation of business concepts. <br><br>*Also part of the Real-Time Intelligence workload.* | [Graph in Microsoft Fabric overview (preview)](../graph/overview.md) |
| Data agent | Create virtual analysts that connect to your Fabric data sources and answer natural language questions for a specific domain. Use data agents to give users a tailored Q&A experience grounded in semantic models and ontologies, publishable across Microsoft 365, Foundry, Copilot Studio, and custom apps. <br><br>*Also part of the Data Science workload.* | [Fabric data agent concepts](../data-science/concept-data-agent.md) |
| Operations agent (preview) | Monitor real-time data and recommend business actions with an AI agent that reasons across your business concepts. Use operations agents to detect anomalies and trigger governed responses on live data. <br><br>*Also part of the Real-Time Intelligence workload.* | [Create and configure operations agents](../real-time-intelligence/operations-agent.md) |

>[!NOTE]
> OneLake is the data foundation for all Microsoft Fabric items. Though OneLake isn't explicitly included as an item in the IQ workload, all items in the workload rely on OneLake data tables and interact with them natively.

### Item relationships

* **Ontology and semantic model:** Define enterprise concepts like *Customer* or *Shipment* once, then generate or align ontologies from semantic models so terminology and KPIs stay consistent across reports and agents.
* **Ontology and Graph:** Ontology declares what connects and why. Graph stores and traverses those connections, like tracing a shipment through a risky route to a cold-chain breach. The graph experience is integrated directly into ontology items.
* **Ontology and data/operations agents:** Ontology grounds agents in shared business language and rules so they can reason across domains and trigger governed actions.
* **Plan and semantic model:** Plan connects to existing semantic models so their dimensions and measures flow into planning sheets for plan-versus-actuals analytics and dynamic forecasting.
* **All items together:** Semantic models deliver trusted KPIs; ontology defines shared business language for those KPIs; Graph powers relationship and impact analysis; plan turns insights into coordinated actions; and data and operations agents provide intelligent, concept-aware interactions over live and historical data.

## Next steps

Learn about the other workloads in Microsoft IQ:
* [Work IQ](/microsoft-365/copilot/extensibility/work-iq)
* [Foundry IQ](/azure/foundry/agents/concepts/what-is-foundry-iq)