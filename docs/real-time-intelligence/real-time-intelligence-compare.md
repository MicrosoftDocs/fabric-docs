---
title: Differences between Real-Time Intelligence and comparable Azure solutions
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
# What is the difference between Real-Time Intelligence and comparable Azure solutions?

As organizations progress in their digital transformation journey, they encounter an increasing number of data sources. These sources generate time-sensitive, intricate data points, events, and signals. This data can originate from various sources such as (a) sensor data from physical assets like plants, vehicles, towers, IoT Edge devices, (b) change data capture (CDC) streams from databases powering customer-facing web and mobile applications, and (c) logs from on-premises and cloud infrastructure and applications, among others. These data streams are crucial for organizations to close the digital feedback loop, gain a deeper understanding of customer usage patterns of their physical and digital assets, and continually enhance the value they provide to maintain market competitiveness.

Realizing this value necessitates the construction of real-time data streaming architectures that use both cloud-based and on-premises data services for data capture, transport, operational transformations, and analytical transformations. These architectures are typically built using a mix of products such as Azure Event Hubs, Azure IoT Hubs, Apache Kafka, Amazon Kinesis, IBM Message Queues, and Google Pub/Sub. As the data arrives in the cloud, it undergoes various stages of processing and transformation, often referred to as hot, warm, and cold paths, before landing in data stores like Azure Data Explorer, Azure Synapse Analytics, and Azure Data Lake Store Gen 2. Once processed, this data is ready for advanced analytics and AI applications and can be visualized using tools like Power BI, Grafana, Web or Mobile Apps, and API endpoints.

The introduction of Real-Time Intelligence in Fabric offers organizations multiple implementation approaches and architectures for their use cases that require advanced analytics of streaming data. Microsoft Azure equips professional developers with robust capabilities to design and implement architectures that necessitate deep integration with other Azure services, end-to-end automation, and deployment of the entire solution as a unified package. Real-Time Intelligence in Microsoft Fabric enables citizen developers and business users to discover data streams within their organizations and build their analytical solutions and applications. With seamless integration with Azure IoT Hub, Azure Event Hubs, and Azure Data Explorer, Real-Time Intelligence facilitates the extension of Azure-based architectures into Microsoft Fabric and the creation of new solutions using existing or new data sources. The following diagram illustrates both Azure Platform as a service (PaaS) based solution architecture and Real-Time Intelligence solution architecture for telemetry analytics use cases in typical manufacturing/automotive organizations.

For more information on Real-Time Intelligence, see [What is Real-Time Intelligence in Fabric?](overview.md).

:::image type="content" source="media/real-time-intelligence-compare/compare-azure-paas-real-time-intelligence-architecture.png" alt-text="Diagram comparing Azure PaaS solutions with Real-Time Intelligence architectures." lightbox="media/real-time-intelligence-compare/compare-azure-paas-real-time-intelligence-architecture.png":::

Historically, organizations allocated substantial budgets, workforce, and resources to develop, integrate, deploy, sustain, and manage various disconnected cloud-based or on-premises products and isolated solutions. This has led to intricate, complex architectures that are challenging to operate and maintain. So, organizations have hesitated to pursue such investments due to the complexity, or have deemed the costs too prohibitive to justify a satisfactory return on investment. Yet, the demand for real-time business operation insights driven by immediate, high granularity data, has been consistent among end users.

Real-Time Intelligence revolutionizes this landscape by harnessing the full potential of real-time capabilities within Fabric, enabling you to derive valuable, actionable insights from your first-party and third-party data instantaneously. With Real-Time Intelligence, you benefit from:

- **A comprehensive SaaS offering**: An all-encompassing solution that facilitates the discovery of insights from your time-sensitive data, allowing you to ingest, process, query, visualize, and act upon it in real-time.
- **A centralized hub for your dynamic data**: A unified data estate for all your event data in motion, simplifying the ingestion, storage, and curation of fine-grained data from across your organization through the Real-Time Hub.
- **Rapid solution development**: Empower team members of varying expertise to extract more value from data and quickly build solutions on top it for further business growth.
- **Insights powered by real-time AI**: Scale manual monitoring and effortlessly initiate actions with ready-to-use, automated features that uncover hidden patterns, and fully use the Microsoft ecosystem to drive your business forward.

:::image type="content" source="media/real-time-intelligence-compare/real-time-intelligence-architecture.png" alt-text="Diagram showing the solution architecture using Real-Time Intelligence." lightbox="media/real-time-intelligence-compare/real-time-intelligence-architecture.png":::

This article outlines key considerations for determining the most suitable implementation architecture tailored to your streaming use cases:

## Overall

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Integration of services** | Depends on integration compatibility between the services in scope of the architecture. | One-click integration at each step of data ingestion, process, analyze, visualize, and act. |
| **Pro and citizen dev experience** | More suitable for pro developers. | Pro developers, citizen developers, and business users can coexist. |
| **Low-code/No-code** | Available in Azure Stream Analytics, and for alerting layer in Logic Apps and Power Automate. | Available in ingestion, analyze, visualize, and the act layer. |
| **Consumption Model** | Service dependent estimation, consumption, and billing model. | Uniform Fabric Capacity Unit consumption and billing model. |

## Ingest and process

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Multi-cloud connectors** | Azure Stream Analytics connects to Confluent Kafka. No connectors to read data from Amazon Kinesis or Google Pub/Sub. | Native integration for Confluent Kafka, Amazon Kinesis, Google Pub/Sub. |
| **Support for CDC streams** | Requires deployment of other services such as Debezium. | Native integration for Azure Cosmos DB, Postgresql, and Azure SQL. |
| **Support for protocols** | Azure Event Hubs, AMQP, Kafka, and MQTT. | Azure Event Hubs, AMQP, Kafka. |

## Analyze & transform

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Data profiling** | Not available | Data profiling view of your real-time tables provides out-of-the-box histograms and min-max ranges for each column. |
| **Visual data exploration** | Not available | Drag-and-drop features to visually analyze your real-time data. |
| **Copilot experience** | Azure Data Explorer cluster can be added as a source in Fabric KQL Queryset to use Copilot capabilities. | Natively available |
| **Built-in ML models** | Anomaly detection, Forecasting | Anomaly detection, Forecasting |
| **Visualization (Microsoft)** | Power BI, Azure Data Explorer dashboards | Native one-click integration with Power BI and Real-Time Dashboard |
| **Visualization (Third party)** | Grafana, Kibana, Matlab. | Grafana, Kibana, Matlab can also be integrated with Event house. |

## Act

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Driving business actions from insights** | Requires Azure Logic Apps or Power Automate or Azure Functions, Azure Monitor alerts. | Natively available in Fabric using Reflex items in Data Activator with out-of-the-box integration with Power BI Semantic Models, Event stream, and KQL queries. |
| **Reactive system events** | Not available | Built-in events published through Real-Time hub; Use reflex items to automate data processes, such as pipelines and notebooks. |
| **Real-time Semantic Models** | Not available or code-first solution using Logic Apps or Azure Functions | Not available |
| **Built-in AI** | Not available | Not available |
| **Notification destinations** | Depends on the connector portfolio of the service. | Microsoft Teams, Microsoft Outlook, and Power Automate connectors. |

## Catalog

| Capability | Azure PaaS-based solution | Real-time Intelligence solution |
|--|--|--|
| **Unified catalog of data streams** | Not available | Real-time hub:<br />1. Data streams created by the users<br />2. Existing streams from Microsoft sources<br />3. Fabric system event streams. |
| **Discovery of Microsoft data streams** | Not available | Real-time Intelligence hub discovers data streams in your Azure tenant. |
| **Capture and act on events from Azure Storage** | Requires deploying Azure Event Grid to act on events occurring in Azure Storage. | Can be deployed from Fabric. An Event Grid resource is created in the same resource group as the Azure Storage account. |
| **Capture and act on events from Fabric** | Not applicable | Natively available in Fabric |

## Related content

- [Get started with Real-Time Intelligence](tutorial-introduction.md)
