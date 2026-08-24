---
title: Get Started with Fabric IQ
description: New to Fabric IQ in Microsoft Fabric? Start here to find your entry point and learn which capabilities you'll use for your scenario.
ms.date: 07/24/2026
ms.topic: overview
ai-usage: ai-assisted
ms.search.form: Get started
#customer intent: As someone new to Fabric IQ, I want a short starting point that points me to the right capability and tutorial for my scenario, so that I can begin without absorbing the full overview article first.
---

# Get started with Fabric IQ

Fabric IQ is the part of Microsoft IQ that provides context on business entities and data. It elevates your data into the language of your business—concepts like *Customer*, *Shipment*, and *Asset*—so that people and AI agents can reason and act in business terms. Fabric IQ delivers this context through three layers: unified data in OneLake, business intelligence from Power BI semantic models, and operational intelligence from ontologies.

The IQ (preview) workload in Fabric provides a suite of items across these layers for analyzing, consuming, and operationalizing business context.

Fabric IQ isn't a single tool. It's a set of related capabilities you combine based on what you want to do. This article points you to the right starting point. For the full concept and the relationships between capabilities, see [What is Fabric IQ?](overview.md)

## Find your starting point

Find the job that matches your scenario, and then follow the entry article for that Fabric IQ capability.

| I want to... | Use this capability | Start here |
| --- | --- | --- |
| Define a shared business vocabulary—entities, relationships, and rules—and ground AI agents in it | Ontology (preview) | [What is ontology?](ontology/overview.md) |
| Build curated analytics with trusted measures, hierarchies, and key performance indicators (KPIs) | Power BI semantic model | [Power BI semantic models in Fabric](../data-warehouse/semantic-models.md) |
| Plan, forecast, and report collaboratively in one no-code experience | Plan (preview) | [What is plan?](plan/overview.md) |
| Query connected data with nodes, edges, and traversals for impact and dependency analysis | Graph | [Graph in Microsoft Fabric overview](../graph/overview.md) |
| Give users natural-language Q&A over a specific data domain | Data agent | [Fabric data agent concepts](../data-science/concept-data-agent.md) |
| Monitor live data, detect anomalies, and take governed action | Operations agent | [Create and configure operations agents](../real-time-intelligence/operations-agent.md) |
| Ask questions about your Power BI data inside Microsoft 365 Copilot Chat or Cowork | Integrations | [Fabric IQ in Microsoft 365 Copilot Chat](connectors/microsoft-365-copilot-overview.md) |

## Try an end-to-end tutorial

If you'd rather learn by building, follow a guided tutorial that walks through a complete scenario from setup to cleanup.

- **[Ontology tutorial](ontology/tutorial-0-introduction.md)** - Build your first ontology for a fictional retail company. You create entity types and relationships (either by generating them directly from a semantic model or creating them from scratch), bind streaming and static data, and query the ontology from a Fabric data agent using natural language. This tutorial is the best starting point for the operational intelligence layer.
- **[Graph tutorial](../graph/tutorial-introduction.md)** - Load sample data, model nodes and edges, and query a graph with the query builder and Graph Query Language (GQL).
- **[Data agent tutorial](../data-science/data-agent-end-to-end-tutorial.md)** - Build a Fabric data agent that reasons over lakehouse data, both interactively and programmatically.
## Check tenant settings

Some Fabric IQ capabilities require a Fabric administrator to enable tenant settings before you begin. If you plan to use ontology (preview), review [Ontology required tenant settings](ontology/overview-tenant-settings.md). For data agent, see [Configure Fabric data agent tenant settings](../data-science/data-agent-tenant-settings.md).

## Related content

- [What is Fabric IQ?](overview.md)
- [What is ontology?](ontology/overview.md)
- [What is plan?](plan/overview.md)
- [Graph in Microsoft Fabric overview](../graph/overview.md)
- [Fabric data agent concepts](../data-science/concept-data-agent.md)
- [Create and configure operations agents](../real-time-intelligence/operations-agent.md)
- [Power BI semantic models in Microsoft Fabric](../data-warehouse/semantic-models.md)
- [Fabric IQ in Microsoft 365 Copilot Chat](connectors/microsoft-365-copilot-overview.md)
