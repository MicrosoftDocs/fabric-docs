---
title: End-to-end tutorials in Microsoft Fabric
description: This article lists the end-to-end tutorials in Microsoft Fabric. They walk you through a scenario, starting from data acquisition to data consumption and help you with a foundational understanding of Fabric.
ms.reviewer: sngun
ms.author: sngun
author: SnehaGunda
ms.topic: overview
ms.custom:
ms.search.form: product-trident
ms.date: 11/25/2024
---

# End-to-end tutorials in Microsoft Fabric

In this article, you find a comprehensive list of end-to-end tutorials available in Microsoft Fabric. These tutorials guide you through a scenario that covers the entire process, from data acquisition to data consumption. They're designed to help you develop a foundational understanding of the Fabric UI, the various experiences supported by Fabric and their integration points, and the professional and citizen developer experiences that are available.

## Multi-experience tutorials

The following table lists tutorials that span multiple Fabric experiences.

|Tutorial name  |Scenario |
|---------|---------|
|[Lakehouse](../data-engineering/tutorial-lakehouse-introduction.md) | In this tutorial, you ingest, transform, and load the data of a fictional retail company, Wide World Importers, into the lakehouse and analyze sales data across various dimensions.  |
|[Data Science](../data-science/tutorial-data-science-introduction.md)    |  In this tutorial, you explore, clean, and transform a taxicab trip semantic model, and build a machine learning model to predict trip duration at scale on a large semantic model.   |
|[Real-Time Intelligence](../real-time-intelligence/tutorial-introduction.md)   | In this tutorial, you use the streaming and query capabilities of Real-Time Intelligence to analyze London bike share data. You learn how to stream and transform the data, run KQL queries, build a Real-Time Dashboard and a Power BI report to gain insights and respond to this real-time data. |
|[Digital twin builder (preview) in Real-Time Intelligence](../real-time-intelligence/digital-twin-builder/tutorial-rti-0-introduction.md) | In this tutorial, you set up a digital twin builder (preview) item and use it to contextualize sample data streamed from Real-Time Intelligence. Then you project your data to Eventhouse using a Fabric notebook, and extract further insights by running KQL queries and visualizing the digital twin builder data in a Real-Time Dashboard. |
|[Data warehouse](../data-warehouse/tutorial-introduction.md) |  In this tutorial, you build an end-to-end data warehouse for the fictional Wide World Importers company. You ingest data into data warehouse, transform it using T-SQL and pipelines, run queries, and build reports. |
|[Fabric SQL database](../database/sql/tutorial-introduction.md) | The tutorial provides [a comprehensive guide to utilizing the SQL database in Fabric](../database/sql/overview.md). This tutorial is tailored to help you navigate through the process of database creation, setting up database objects, exploring autonomous features, and combining and visualizing data. Additionally, you learn how to create a GraphQL endpoint, which serves as a modern approach to connecting and querying your data efficiently.|
|[Fabric Activator](../real-time-intelligence/data-activator/activator-tutorial.md) | The tutorial is designed for customers who are new to Fabric Activator. Using a sample eventstream, you learn your way around Activator. Once you're familiar with the terminology and interface, you create your own object, rule, and activator. |

## Experience-specific tutorials

The following tutorials walk you through scenarios within specific Fabric experiences.

|Tutorial name  |Scenario |
|---------|---------|
| [Power BI](/power-bi/fundamentals/fabric-get-started) |  In this tutorial, you build a dataflow and pipeline to bring data into a lakehouse, create a dimensional model, and generate a compelling report. |
| [Data Factory](../data-factory/tutorial-end-to-end-introduction.md) | In this tutorial, you ingest data with pipelines and transform data with dataflows, then use the automation and notification to create a complete data integration scenario. |
| [Data Science end-to-end AI samples](../data-science/use-ai-samples.md) | In this set of tutorials, learn about the different Data Science experience capabilities and examples of how ML models can address your common business problems. |
| [Data Science - Price prediction with R](../data-science/r-avocado.md) | In this tutorial, you build a machine learning model to analyze and visualize the avocado prices in the US and predict future prices. |
| [Application lifecycle management](../cicd/cicd-tutorial.md) | In this tutorial, you learn how to use deployment pipelines together with git integration to collaborate with others in the development, testing, and publication of your data and reports. |
| [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/tutorial-0-introduction.md) | In this tutorial, you model and contextualize data from multiple sources into a digital twin builder (preview) ontology. You explore the ontology with queries, then create a Power BI dashboard to visualize the data. |

## Related content

* [Create a workspace](../fundamentals/create-workspaces.md)
* Discover data items in the [OneLake data hub](../governance/onelake-catalog-overview.md)
