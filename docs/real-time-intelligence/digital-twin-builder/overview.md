---
title: What is digital twin builder (preview)?
description: Learn what digital twin builder (preview) is and how it creates digital representations of real-world environments in Real-Time Intelligence in Microsoft Fabric.
ms.date: 05/18/2026
ms.topic: overview
ai-usage: ai-assisted

#customer intent: As an operational decision-maker, I want to understand what digital twin builder (preview) is so that I can decide whether to use it to model my physical operations in Microsoft Fabric.
---

# What is digital twin builder (preview)?

Digital twin builder (preview) is an item in the [Real-Time Intelligence](../overview.md) workload in [Microsoft Fabric](../../fundamentals/microsoft-fabric-overview.md). It creates digital representations of real-world environments to optimize physical operations using data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Digital twin builder equips users with low-code/no-code experiences to model business concepts, such as assets and processes, through an ontology. You can map data from various source systems to the ontology and define system-wide or site-wide semantic relationships. The item also includes built-in exploration experiences for your modeled data. You can connect ontologies to [Real-Time Dashboards](../dashboard-real-time-create.md) or [Power BI](/power-bi/fundamentals/power-bi-overview) to create customized views and dashboards for customers, clients, and internal audiences. The low-code/no-code experience makes digital twin builder accessible to operational decision-makers who want to improve operations at scale.

## How digital twin builder fits into Microsoft Fabric

> [!NOTE]
> Digital twin builder (preview) in Fabric is different from the [Azure Digital Twins](/azure/digital-twins) service.

Fabric brings together Data Engineering, Data Factory, Data Science, Data Warehouse, Real-Time Intelligence, and Power BI experiences on a shared software as a service (SaaS) foundation. It delivers enterprise-class security and scalability and includes OneLake—a common tenant-wide store that integrates with all Fabric analytic experiences. The following diagram shows these elements of Fabric and where the digital twin builder (preview) item fits in.

:::image type="content" source="media/overview/fabric.png" alt-text="Diagram that shows Fabric workloads, including digital twin builder.":::

As an item on Fabric, digital twin builder benefits from Fabric's scalability and unified security model. It uses native Fabric data connectors to ingest data from a wide variety of enterprise data sources, and incorporates other Fabric workloads seamlessly into its experiences. Digital twin builder data is stored in OneLake, where other Fabric experiences in your tenant can access and consume it.

Before you can bring data into a digital twin builder item, you must first bring the data to a Fabric [lakehouse](../../data-engineering/lakehouse-overview.md).

## Configure your data in digital twin builder

Get started with digital twin builder (preview) by standardizing your IT and OT data into an ontology and defining semantic relationships within it.

The main stages of building an ontology in digital twin builder are:
* **Ontology modeling:** Design a shared vocabulary and structure to create comprehensive digital replicas of assets, processes, or environments that represent the physical world.
* **Ontology mapping:** Harmonize disparate data into an ontology layer by defining entity types within your ontology that represent concepts in your physical operations, and mapping data from your different source systems to instances of these entity types.
* **Contextualization:** Further augment the context of your data by creating semantic relationship types between entity types in your ontology. Reflecting real-world relationships and dependencies helps you accurately represent the physical world within digital twin builder.

## Explore your data in digital twin builder

After you build your ontology, explore the digital twin builder (preview) data and connect it to extended analysis and visualization capabilities.

* **Explorer:** Access different views within digital twin builder to examine and analyze your modeled data. Views include a card view of all assets with associated details, and time series charts for analysis. Keyword search and advanced query allow you to locate specific assets within your operation.
* **Ontology extensions:** Extend your ontology by connecting it to analytics, AI, and visualization experiences that enable deeper insights. Here are some ways you can extend your ontology:
    * Use the programmatic creation of digital twins with public [digital twin builder APIs](/rest/api/fabric/digitaltwinbuilder/items), unlocking the scalability of digital twin creation.
    * Manage digital twin builder with CI/CD by using [Fabric deployment pipelines](../../cicd/deployment-pipelines/intro-to-deployment-pipelines.md), templates, or GitOps.
    * Build Q&A systems with generative AI over contextualized digital twin data by using [Fabric data agent](../../data-science/concept-data-agent.md).
    * Build and train [machine learning models in Fabric](../../data-science/machine-learning-model.md) based on digital twin data in OneLake.
    * Visualize and analyze digital twin builder data with [Power BI](/power-bi/fundamentals/power-bi-overview) or [Real-Time Dashboards](../dashboard-real-time-create.md).
    * Monitor data and activate alerts and actions with [Activator](../data-activator/activator-introduction.md).

## Related content

* [Digital twin builder (preview) tutorial](tutorial-0-introduction.md)
* [Digital twin builder (preview) in Real-Time Intelligence tutorial](tutorial-rti-0-introduction.md)
* [Digital twin builder (preview) glossary](resources-glossary.md)