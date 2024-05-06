---
title: Differences between Real-Time Intelligence and comparable Azure Solutions
description: Learn about the differences between Real-Time Intelligence and comparable Azure Solutions.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 05/01/2024
ms.search.form: Overview
---
# What is the difference between Real-Time Intelligence and comparable Azure Solutions?

As organizations have advanced their digital transformation goals, they have faced more and more data sources that produce time sensitive, highly detailed data points, events and signals in the form of (a) sensor data from physical assets such as plants, vehicles, towers, IoT/Edge devices, (b) change data capture (CDC) streams from databases that run their web and mobile applications for customers, (c) logs from their on-prem and cloud infrastructure and applications among other sources. These data streams are vital for organizations to close the digital feedback loop and better understand how their customers use and consume their physical and digital assets and how they can keep improving the value they offer to stay competitive in the market.

This value realization demands building real-time data streaming architectures that use cloud based, on-prem data services in the areas of data capture, transport, operational transforms and analytical transforms. These are often built with a combination of products such as Azure Event Hubs, Azure IoT Hubs, Apache Kafka, Amazon Kinesis, IBM Message Queues, Google Pub/Sub. As this data arrives in the clouds, it goes through various stages of hot, warm and cold path processing and transformation and eventually lands in data stores such as Azure Data Explorer, Azure Synapse Analytics, Azure Data Lake Store Gen 2 before becoming ready for advanced analytics and AI apps. In terms of visualization, this data is delivered via tools such as Power BI, Grafana, Web or Mobile Apps, API endpoints.

With the introduction of Real-Time Intelligence in Fabric, organizations have more than 1 implementation approach and architecture to realize their use cases requiring advanced analytics of streaming data. Microsoft Azure provides powerful capabilities for pro developers to design and implement architectures that require deep integration with other Azure based services, end-to-end automation, and deployment of the entire solution as a single, unified package. Real-Time Intelligence in Microsoft Fabric empowers citizen developers and business users to discover data streams in their organizations and compose their analytical solutions and apps. With out of the box integration with Azure IOT Hub, Azure Eventhub, Azure Data Explorer, Real-Time Intelligence enables extending Azure based architectures into Microsoft Fabric as well as composing net new solutions using existing or new data sources. Picture below shows Azure PaaS led reference architecture as well as Real-Time Intelligence reference architecture in realizing telemetry analytics use cases in a typical manufacturing/automotive organisations.

For more information on Real-Time Intelligence, see [What is Real-Time Intelligence in Fabric?](overview.md).

:::image type="content" source="media/real-time-intelligence-compare/compare-azure-paas-real-time-intelligence-architecture.png" alt-text="Diagram comparing Azure PAAS and Real-Time Intelligence architectures.":::

Without a unified real-time platform such as Microsoft Fabric Real-Time Intelligence, organizations have had to spend significant budgets, manpower and resources in creating, integrating, deploying, maintaining and operating multitude of disparate cloud or non-cloud based products and silo'ed solutions, resulting in complex, fragile, hard to operate and maintain architectures. As a result of this complexity, organizations have been reluctant to invest in this value creation or have found the costs too high to afford a decent return on investment. End users have often demanded real-time insights into their business operations which is powered by this time sensitive, high granularity data but the complexity, fragility and cost have often been inhibitors for organizations to invest in building platforms that can infuse speed, agility and precision demanded by digital transformation.

Real-Time Intelligence brings you the full power of real-time in Fabric, helping you gain valuable, actionable insights from your 1st and 3rd party data in real time. With Real-Time Intelligence, you gain:

- A complete SaaS solution – an end-to-end solution that helps you discover insights from your time-oriented data, and granting you the ability to ingest, transform, query, visualize and act on it in real time

- A single place for your data in motion – access a single data estate for all your event data in motion, using Real-Time Hub to make it easier to ingest, store and curate granular data from anywhere across your organization

- Rapid solution development – empower employees of all skill levels with a range of experiences to better extract value from data and quickly build solutions on top of it for further business growth

- Real-time AI insights – scale beyond human monitoring and easily drive actions with out-of-the-box, automated capabilities to discover unknown unknowns and leverage the full Microsoft ecosystem to drive your business forward

:::image type="content" source="media/real-time-intelligence-compare/real-time-intelligence-architecture.png" alt-text="Diagram showing the solution architecture using Real-Time Intelligence.":::

In this document, we are enlisting some points of consideration as you evaluate the fit-for-purpose implementation architecture for your streaming use cases:

## Overall

| Capability | Platform as a Service led solution | Fabric Real-time Intelligence led solution |
|--|--|--|
| Integration of services |Depends on integration compatibility between the services in scope of the architecture|One-click integration at each step of data ingestion, process, analyze, visualize and act|
| Pro and citizen dev experience |More suitable for pro-developers |Pro-developers, citizen developers and business users can co-exist |
| Low code/No-code |In Azure Stream Analytics, and in alerting layer with Logic Apps and Power Automate|Available in ingestion, analyze, visualize as well as act layer|
| Consumption Model |Service dependent estimation, consumption and billing model|Uniform Fabric Capacity Unit led consumption and billing model |

## Ingest and process

| Capability | Platform as a Service led solution | Fabric Real-time Intelligence led solution |
|--|--|--|
| Multi-cloud connectors |Azure Stream Analytics connects to Confluent Kafka. No connectors to read data from Amazon Kinesis or Google Pub/Sub |Native integration for Confluent Kafka, Amazon Kinesis, Google Pub/Sub|
| Support for CDC streams | Requires deployment of additional services such as Debezium | Native integration for Azure CosmosDB, Postgresql, Azure SQL |
| Support for protocols |Eventhub, AMQP, Kafka, MQTT | Eventhub, AMQP, Kafka, MQTT (coming soon) |

## Analyse & transform

| Capability | Platform as a Service led solution | Fabric Real-time Intelligence led solution |
|--|--|--|
| Data profiling | Not available | Data profiling view of your real-time tables provides out of the box histograms and min-max ranges for each column |
| Visual data exploration | Not available |Drag-drop features to visually analyse your real-time data |
| Copilot experience | Azure Data Explorer cluster can be added as a source in Fabric KQL Queryset to leverage Copilot capabilities | Natively available |
| Visualization (Microsoft tools) | Power BI, ADX Dashboards | Native one-click integration with PowerBI and Real-time Dashboard |
| Built-in ML models | Anomaly Detection, Forecasting| Anomaly Detection, Forecasting |
| Visualization (3rd party tools) | Grafana, Kibana, Matlab | Grafana, Kibana, Matlab can also be integrated with Fabric Eventhouse |

## Act

| Capability | Platform as a Service led solution | Fabric Real-time Intelligence led solution |
|--|--|--|
| Driving business actions from insights | Requires usage of Azure Logic Apps or Power Automate or Azure Functions, Azure Monitor alerts | Natively available in Fabric using Reflex item in Data Activator with out of the box integration with Power BI Semantic Models, Eventstream and KQL queries |
| Reactive system events | | Built-in events published through Real-Time Hub and use reflexes to automate data processes such as Pipelines and Notebooks |
| Real-time Semantic Models | Not available or code-first solution using Logic Apps or Azure Functions | |
| Built-in AI | Not available | Anomaly Detection (coming soon) |
| Notification destinations | Depends on the connector portfolio of the service | Teams, Outlook and Power Automate connectors |

## Catalog

| Capability | Platform as a Service led solution | Fabric Real-time Intelligence led solution |
|--|--|--|
| Unified catalog of data streams | Not available | Real-time hub of:<br />1. Data streams created by the users<br />2. Existing streams from Microsoft sources<br />3. Fabric system event streams |
| Discovery of Microsoft data streams | Not available | Real-time Intelligence hub discovers data streams in your Azure tenant |
| Capture and act on events from Azure Storage  Requires deploying Azure Event Grid, to act on events occurring in Azure Storage  Natively available in Fabric |Requires deploying Azure Event Grid, to act on events occurring in Azure Storage|Can be deployed from Fabric. An event grid resource is created in the same resource group as Azure Storage account.|
| Capture and act on events from Fabric | Not applicable | Natively available in Fabric |

## Related content

- [Get started with Real-Time Intelligence](tutorial-introduction.md)
