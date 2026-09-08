---
title: Differences Between Real-Time Intelligence and Comparable Azure Solutions
description: Discover the differences between Real-Time Intelligence and Azure solutions. Learn which streaming analytics platform best fits your needs.
ms.reviewer: tzgitlin
ms.topic: overview
ms.date: 09/01/2026
ms.update-cycle: 180-days
ms.subservice: rti-core
ms.collection: ce-skilling-ai-copilot
ms.search.form: Overview
ai-usage: ai-assisted
---

# What is the difference between Real-Time Intelligence and comparable Azure solutions?

Real-Time Intelligence and comparable Azure solutions help organizations process time-sensitive data from multiple sources: sensor data from physical assets, change data capture (CDC) streams from databases, and logs from infrastructure and applications. This approach gives professional developers fine-grained control over service selection, deployment, networking, automation, and integration patterns.

Real-Time Intelligence in Microsoft Fabric provides a unified SaaS experience for the same class of event-driven and streaming analytics scenarios. Instead of assembling each stage from separate services, users can discover data streams in Real-Time hub, ingest and route events with Eventstream, store and query data in Eventhouse, analyze data with KQL and notebooks, visualize data in Real-Time Dashboards or Power BI, model operational context, and trigger actions with Activator.

The main difference is the implementation model. Azure PaaS gives pro developers maximum control for custom architectures and deep Azure integration. Real-Time Intelligence gives business users, citizen developers, data analysts, and pro developers an integrated workflow for building real-time solutions faster, with fewer manually stitched services.
Learn more about Real-Time Intelligence in [What is Real-Time Intelligence in Fabric?](overview.md)

:::image type="content" source="media/real-time-intelligence-compare/compare-azure-paas-real-time-intelligence-architecture.png" alt-text="Diagram that shows Azure PaaS solutions compared to Real-Time Intelligence architectures for telemetry analytics." lightbox="media/real-time-intelligence-compare/compare-azure-paas-real-time-intelligence-architecture.png":::

## Microsoft Fabric capabilities for real-time analytics

Real-Time Intelligence includes a broad set of integrated services and experiences for building end-to-end real-time analytics solutions. These capabilities include:

* [Real-Time hub](../real-time-hub/real-time-hub-overview.md) for discovering, managing, and governing streaming data, Fabric events, Azure events, and Microsoft data sources.
* [Eventstream](event-streams/overview.md) for ingesting, filtering, transforming, enriching, and routing streaming data from Microsoft, multicloud, and custom sources.
* Multicloud connectivity including Amazon Kinesis, Google Cloud Pub/Sub, Apache Kafka, Confluent Cloud Kafka, and Amazon MSK.
* Change Data Capture (CDC) integration for databases such as Azure SQL Database, Azure Cosmos DB, PostgreSQL, MySQL, Azure SQL Managed Instance, and SQL Server.
* [Eventhouse](eventhouse.md) and KQL databases for storing, querying, and analyzing structured, semi-structured, and unstructured streaming data.
* Kusto Query Language (KQL) for advanced analytics, exploration, and operational monitoring.
* Copilot in Real-Time Intelligence for natural language [data exploration](dashboard-explore-data.md), [KQL generation](copilot-writing-queries.md), [dashboard creation](copilot-generate-dashboard.md), and analysis.
* [Real-Time Dashboards](real-time-dashboards-overview.md) for operational monitoring, visualization, investigations, and alerting.
* Power BI integration for business intelligence and reporting on real-time data.
* [Activator](data-activator/rule-actions.md) for detecting conditions, triggering notifications, automating workflows, and launching Fabric activities such as notebooks, pipelines, Spark jobs, dataflows, functions, copy jobs, and business events.
* [Digital Twin Builder (preview)](digital-twin-builder/overview.md) for modeling physical systems and business entities using digital twins.
* [Schema Registry (preview)](schema-sets/schema-registry-overview.md) for defining, validating, governing, and evolving event schemas across real-time workflows.
* [Fabric events and Azure events](../real-time-hub/fabric-events-overview.md) integration for reacting to platform-generated business and operational events.
* Notebook and Spark integration for advanced stream processing, machine learning, AI functions, and developer-driven analytics workflows.
* [Operations Agents](operations-agent.md) and [MCP](mcp-overview.md) integrations for AI-assisted operational monitoring and management scenarios.
* [Anomaly detection](anomaly-detection.md) and forecasting models for detecting unusual patterns and predicting future trends in streaming data.
* Ontology and Fabric IQ for business context, semantic understanding, and AI-powered experiences across enterprise data.

:::image type="content" source="media/overview/overview-schematic.png" alt-text="Diagram that shows solution architecture using Real-Time Intelligence in Fabric." lightbox="media/overview/overview-schematic.png":::

## Azure PaaS-based solutions for real-time analytics

Azure provides a broad set of services that you can combine to build custom real-time analytics and event-driven architectures. These capabilities include:

* [Azure Event Hubs](/azure/data-explorer/ingest-data-event-hub-overview) for high-throughput event ingestion, telemetry collection, and streaming analytics scenarios.
* [Azure Event Grid](/azure/data-explorer/ingest-data-event-grid-overview) for reactive event routing and event-driven application integration.
* Azure Service Bus for enterprise messaging, transactional workflows, and reliable message delivery.
* [Azure Stream Analytics](/azure/data-explorer/stream-analytics-connector) for real-time stream processing, filtering, aggregation, and complex event processing.
* [Azure Data Explorer](/azure/data-explorer/data-explorer-overview) for high-performance analysis of telemetry, logs, time-series, and streaming data.
* [Azure IoT Hub](/azure/data-explorer/ingest-data-iot-hub-overview) for secure device connectivity and IoT data ingestion.
* [Azure Functions](/azure/data-explorer/integrate-azure-functions) for event-driven code execution and automation.
* [Azure Logic Apps](/azure/data-explorer/logic-apps) for low-code workflow automation and integration across cloud and enterprise systems.
* [Azure Monitor](/azure/azure-monitor/vm/send-fabric-destination?toc=/azure/data-explorer/toc.json) for operational monitoring, alerting, observability, and diagnostics.
* [Azure Digital Twins](/azure/digital-twins/overview) for modeling physical environments, assets, and relationships.
* [Azure Event Hubs Schema Registry](/azure/event-hubs/schema-registry-overview) for schema management and governance in event-driven architectures.
* [Apache Kafka-compatible](/azure/event-hubs/azure-event-hubs-apache-kafka-overview) event streaming through Azure Event Hubs.
* [Power BI](/azure/data-explorer/power-bi-data-connector?tabs=web-ui), [Azure Data Explorer dashboards](/azure/data-explorer/azure-data-explorer-dashboards), [Grafana](/azure/data-explorer/grafana?tabs=azure-managed-grafana), and other visualization tools for monitoring and analysis.
* [Azure AI](/azure/data-explorer/integrate-mcp-servers) and machine learning services for anomaly detection, forecasting, predictive analytics, and AI-powered applications.
* Infrastructure-as-code, networking, security, governance, and DevOps capabilities for deploying and operating custom real-time solutions across Azure environments.

## Overall differences

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Integration of services** | Depends on integration compatibility between the services in the architecture. For more information, see [Choose between Azure Event Grid, Event Hubs, and Service Bus](/azure/service-bus-messaging/compare-messaging-services). | Integrates data ingestion, processing, visualization, and actioning in a unified experience via Eventstream, KQL, Spark, and Real-Time Dashboards. This experience enables you to build end-to-end real-time solutions more efficiently without combining and managing multiple services. |
| **Pro and citizen dev experience** | More suitable for pro developers. | Pro developers, citizen developers, and business users can coexist. |
| **Low-code/No-code** | Available only for transformation in Azure Stream Analytics and for creating alerts with Logic Apps or Power Automate. Pro development is required for end-to-end implementation. | You can build end-to-end solutions from ingesting, analyzing, transforming, visualizing, and acting, without the need to write code. For more information, see [Interacting with RTI components](overview.md#how-do-i-interact-with-the-components-of-real-time-intelligence). |
| **Consumption Model** | Service-dependent estimation, consumption, and billing model. | Uniform Fabric Capacity Unit consumption and billing model. |

## Ingest and process

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Multicloud connectors** | Azure Stream Analytics connects to Confluent Kafka. There aren't connectors to read data from streaming sources in other clouds such as Amazon Kinesis or Google Pub/Sub. | Native integrations across multiple clouds, including Confluent Kafka, Amazon Kinesis, and Google Pub/Sub. |
| **Support for CDC streams** | Requires deploying other services like Debezium. | Native integration for streaming CDC sources such as [Azure Cosmos DB CDC](event-streams/add-source-azure-cosmos-db-change-data-capture.md), [Azure SQL CDC](event-streams/add-source-azure-sql-database-change-data-capture.md), [Azure SQL Managed Instance CDC](event-streams/add-source-azure-sql-managed-instance-change-data-capture.md), [PostgreSQL CDC](event-streams/add-source-postgresql-database-change-data-capture.md), [MySQL DB CDC](event-streams/add-source-mysql-database-change-data-capture.md), [SQL Server CDC](event-streams/add-source-sql-server-change-data-capture.md), [Oracle Database CDC](event-streams/add-source-oracle-database-change-data-capture.md), [MongoDB CDC](event-streams/add-source-mongodb-change-data-capture.md), and [Fabric mirrored database change feed](event-streams/add-source-mirrored-database-change-feed.md). For the full list of CDC sources, see [Add and manage eventstream sources](event-streams/add-manage-eventstream-sources.md). |
| **Support for protocols** | HTTP, AMQP, Kafka, and MQTT. | HTTP, AMQP, and Kafka. |
| **Stream processing** | Azure Stream Analytics, a fully managed real-time analytics service, helps you analyze and process fast-moving streams of data to derive actionable insights. | In Fabric Real-Time Intelligence, stream processing is built directly into Eventstream, with native capabilities for filtering, transforming, and routing streaming data. For advanced analytics and custom processing, Eventstream can also integrate with Spark notebooks, allowing developers to use code-based approaches to process streaming data. |
| **On-premises and virtual network integration** | Requires deploying and managing self-hosted integration runtimes or gateways for each service. | The [virtual network data gateway](event-streams/create-manage-streaming-virtual-network-data-gateways.md) provides a single, reusable connection to on-premises and virtual network data sources across all Eventstream connectors. |

## Analyze & transform

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Data profiling** | Not available | The data profiling view of your real-time tables shows out-of-the-box histograms and min-max ranges for each column. |
| **Digital twin modeling** | Azure Digital Twins | Digital twin builder (preview) |
| **Visual data exploration** | Not available | Drag features to visually analyze your real-time data. |
| **Copilot experience** | There is no copilot specific to Azure messaging services, but overall Azure Copilot can help with Azure resource management and operations across Azure services in general.  | Copilot in the Fabric Real-Time Intelligence workload is an AI assistant that helps you query, analyze, and explore your real-time data. Copilot translates natural language into Kusto Query Language (KQL) queries and enables interactive data exploration, without requiring KQL expertise. For more information, see [Copilot for Real-Time Intelligence](copilot-real-time-intelligence.md). |
| **Built-in ML models** | Anomaly detection and forecasting models are available, but you need to write your own code to leverage Azure Machine Learning to build, train, and deploy them. | Anomaly detection and forecasting models are natively built in, so you can apply them to incoming streaming data without writing code. Eventstream also supports Spark Structured Streaming, so you can use built-in AI functions to enrich and transform streaming data with pretrained AI models directly in your streaming pipelines. |
| **Visualization (Microsoft)** | Power BI, Azure Data Explorer dashboards | Native one-click integration with Power BI and real-time dashboard |
| **Visualization (Third party)** | Grafana, Kibana, Matlab | Grafana, Kibana, and Matlab can also be integrated with Eventhouse. |

## Act

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Driving business actions from insights** | Needs Azure Logic Apps, Power Automate, Azure Functions, or Azure Monitor alerts. | Available in Fabric using Fabric [!INCLUDE [fabric-activator](includes/fabric-activator.md)] items with built-in integration with Power BI semantic models, Eventstream, and KQL queries using KQL Querysets or Real-Time Dashboards. Operations agent (preview) can also monitor an eventhouse or ontology and recommend or trigger actions, like Teams messages, notebooks, pipelines, or Power Automate flows. |
| **Reactive system events** | Not available | Built in events published through Real-Time hub. Use [!INCLUDE [fabric-activator](includes/fabric-activator.md)] items to automate data processes, like pipelines and notebooks. |
| **Real-time Semantic Models** | Not available or code-first solution using Logic Apps or Azure Functions | Not available |
| **Built-in AI** | Not available | Copilot in Real-Time Intelligence, AI agents (preview) for Eventhouse and KQL databases, and Operations agent (preview) for continuous monitoring and recommended actions are natively built in, so you can apply them to incoming streaming data without writing code. Eventstream also supports Spark Structured Streaming, so you can use built-in AI functions to enrich and transform streaming data with pretrained AI models directly in your streaming pipelines. |
| **Notification destinations** | Depends on the service's connector portfolio. | Microsoft Teams, Microsoft Outlook, Dataflow, **Pipeline**, **Spark job**, **Notebook**, **Function**, Copy job, and Business events (preview). For more information, see [Configure actions for Activator rules](data-activator/rule-actions.md).|

## Catalog

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Unified catalog of data streams** | Not available | Real-time hub:<br />- Data streams created by the users<br />- Existing streams from Microsoft sources<br />- Fabric system eventstreams |
| **Discovery of Microsoft data streams** | Not available | Real-time Intelligence hub finds data streams in your Azure tenant. |
| **Schema registry** | Azure Schema Registry is a feature of Event Hubs that provides a central repository for schemas for event-driven and messaging-centric applications. It provides the flexibility for your producer and consumer applications to exchange data without having to manage and share the schema. For more information, see [Azure Schema Registry in Azure Event Hubs](/azure/event-hubs/schema-registry-overview). | Schema Registry in Fabric Real-Time Intelligence is a central place to define, validate, and evolve data schemas for streaming data. Schema Registry in Fabric Real-Time Intelligence helps improve data quality, consistency, and control across your event-driven workflows. For more information, see [Schema Registry in Fabric Real-Time Intelligence - Microsoft Fabric](schema-sets/schema-registry-overview.md). |


## Related content

- [Get started with Real-Time Intelligence](tutorial-introduction.md)
