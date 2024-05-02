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

With the introduction of Real-Time Intelligence in Fabric, organizations have more than 1 implementation approach and architecture to realize their use cases requiring advanced analytics of streaming data. Microsoft Azure provides powerful capabilities for pro developers to design and implement architectures that require deep integration with other Azure based services, end-to-end automation, and deployment of the entire solution as a single, unified package. Real-Time Intelligence in Microsoft Fabric empowers citizen developers to discover data streams in their organizations and compose their analytical solutions and apps. With out of the box integration with Azure IOT Hub, Azure Eventhub, Azure Data Explorer, Real-Time Intelligence enables extending Azure based architectures into Microsoft Fabric as well as composing net new solutions using existing or new data sources. Picture below shows Azure PaaS led reference architecture as well as Real-Time Intelligence reference architecture in realizing telemetry analytics use cases in a typical manufacturing/automotive organisations.

For more information on Real-Time Intelligence, see [What is Real-Time Intelligence in Fabric?](overview.md).

:::image type="content" source="media/real-time-intelligence-compare/compare-azure-paas-real-time-intelligence-architecture.png" alt-text="Diagram comparing Azure PAAS and Real-Time Intelligence architectures.":::

Without a unified real-time platform such as Microsoft Fabric Real-Time Intelligence, organizations have had to spend significant budgets, manpower and resources in creating, integrating, deploying, maintaining and operating multitude of disparate cloud or non-cloud based products and silo'ed solutions, resulting in complex, fragile, hard to operate and maintain architectures. As a result of this complexity, organizations have been reluctant to invest in this value creation or have found the costs too high to afford a decent return on investment. End users have often demanded real-time insights into their business operations which is powered by this time sensitive, high granularity data but the complexity, fragility and cost have often been inhibitors for organizations to invest in building platforms that can infuse speed, agility and precision demanded by digital transformation.

With Microsoft Fabric Real-time Intelligence, **/TODO: include blurb from our standard overview text on real-time intelligence**

:::image type="content" source="media/real-time-intelligence-compare/real-time-intelligence-architecture.png" alt-text="Diagram showing the solution architecture using Real-Time Intelligence.":::

**/TODO: picture to be fixed (Real-Time Hub, PBI, Sources for Eventhouse), Tessa

In this document, we are enlisting some points of consideration as you evaluate the fit-for-purpose implementation architecture for your streaming use cases:

## Overall

| Capability | Platform as a Service led solution | Fabric Real-time Intelligence led solution |
|--|--|--|
| Integration of services | Need to determine integration compatibility and methods depending on the PaaS services used in the architecture | One-click integration at each step of data ingestion, process, analyse, visualize and act. |
| Pro and citizen dev experience | Highly suitable for pro-developer with mostly code-led development approach | Pro and citizen developers can co-exist with code-led  as well as familiar Power BI like user interface with click, point, drag and drop features |
| Low code/No-code | Only in the visualization layer and alerting layer with Logic Apps and Power Automate | Available in ingestion, analyse, visualize as well as act layer |
| Consumption Model | Depending on the service, unit of consumption may differ and requires separate estimation of usage and pricing | Uniform Fabric Capacity Unit led consumption model |
| Private Endpoints | Most of the Azure PaaS services support private endpoints | Private endpoints for Eventstream  and Eventhouse are available |
| Managed Private Endpoints | Most of the Azure PaaS services support managed private endpoints with several Azure services | Eventstream will support Managed Private Endpoints with Azure Eventhubs and Azure IoT Hubs. |
| Authentication and authorization | Entra-ID led with control plane permissions need to be assigned each PaaS service individually. | Entra-ID and control plane permissions assigned and managed centrally via Fabric workspace level access control |
| Deployment automation | | |
| Integration with other Azure services | | |

## Ingest and process

| Capability | Platform as a Service led solution | Fabric Real-time Intelligence led solution |
|--|--|--|
| Multi-cloud connectors | No connectors to read data from Confluent Kafka, Amazon Kinesis or Google Pub/Sub | Native integration for Confluent Kafka, Amazon Kinesis, Google Pub/Sub |
| Support for CDC streams | Requires deployment of additional services such as Debezium | Native integration for Azure CosmosDB, Postgresql, Azure SQL |
| Support for protocols | Depends on the streaming service used | Eventhub, AMQP, Kafka, MQTT (coming soon) |
| Support for data formats | | JSON, CSV, AVRO |
| Support for connectors | | |

## Analyse & transform

| Capability | Platform as a Service led solution | Fabric Real-time Intelligence led solution |
|--|--|--|
| Data profiling | Not available | Data profiling view of your real-time tables provides out of the box histograms and min-max ranges for each column |
| Visual data exploration | Not available | Use drag-drop features to visually analyse your real-time data |
| Copilot experience | Azure Data Explorer cluster can be added as a source in Fabric KQL Queryset to leverage Copilot capabilities | Natively available |
| ALM support  Does not exist today for KQL queries  Natively available (coming soon) |
| Visualization (Microsoft tools) | Power BI, ADX Dashboards | Native one-click integration with PowerBI and Real-time Dashboard |
| Built-in ML models | | Anomaly Detection, Forecasting |
| Analytical data consumption | | |
| Visualization (3rd party tools) | Grafana, Kibana, Matlab | Can also be integrated with Fabric Eventhouse |

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
| Capture and act on events from Azure Storage  Requires deploying Azure Event Grid, to act on events occurring in Azure Storage  Natively available in Fabric |
| Capture and act on events from Fabric | Not applicable | Natively available in Fabric |

## Product comparison

### Azure Eventhubs and Fabric Eventstream

| Capability | Azure Eventhubs | Fabric Eventstream |
|--|--|--|
| Private Link |  |  |
| Customer managed key |  |  |
| Capture |  |  |
| Dynamic partition scale out |  |  |
| Ingress events |  |  |
| Runtime Audit logs |  |  |
| Availability Zone |  |  |
| Message size | Max 1MB (exact size depends on the chosen tier of Azure Eventhub) | Max 1MB (soon to be increased) |
| Consumer groups |  |  |
| Max data retention period |  | 90 days |
| Events storage for retention |  |  |
| Number of partitions |  |  |
| Schema Registry |  |  |
| Throughput | Depending on the chosen tier of Azure Eventhub's (Basic, Standard, Premium and Dedicated), ingress and egress throughput can range from 1 or 2 MB per sec to no limits. | Max 50MB/sec depending on the chosen throughput level. Soon to be increased to 100MB/sec. |
| SDK support |  |  |

### Azure Stream Analytics and Fabric Eventstream

| Capability | Azure Stream Analytics | Fabric Eventstream |
|--|--|--|
| Private Link |  |  |
| Window functions |  |  |
| Geospatial functions |  |  |
| Compatibility level |  |  |
| Parse AVRO and Json data |  |  |
| Parsing Protobuf |  |  |
| Event ordering |  |  |
| Checkpoint and replay |  |  |
| Job diagram |  |  |
| Error policy |  |  |
| UDF |  |  |
| No code editor |  |  |
| Output types |  |  |
| Input types |  |  |

### Azure Data Explorer and Fabric Eventhouse

| Capability | Azure Data Explorer | Fabric Eventhouse |
|--|--|--|
| No code editor for data elements | Not available | Low-code experience to create data elements (Tables, Functions, Materialized Views, Update Policies and Shortcuts) |
| Compute options | User choice of various full managed compute options according to customer needs, including isolated and confidential compute. | Automatically chosen as part of Fabric SaaS platform |
| Deployment Delay | Few minutes | < 20 secs |
| Ingestion Pipelines | Fabric ingestion pipelines with Azure Data Explorer as a sink: Fabric Pipeline and Fabric Dataflow. Also available with Azure Data Factory, Event Hubs, IoT Hub, and Event Grid. | Built-in Fabric ingestion pipelines: Eventstream, Fabric Pipeline, and Fabric Dataflow. Also available with Azure Data Factory and Event Hub |
| OneLake Integration | Not currently available | Data stored in KQL databases in Fabric Real-Time Analytics is available in OneLake. Data in OneLake is available in Real-Time Analytics via shortcuts |
| Spark Integration | Built-in Kusto Spark integration with support for Microsoft Entra pass-through authentication, Synapse Workspace MSI, and Service Principal. | Built-in Kusto Spark connector adds value like predicate pushdowns. The data is also available in the OneLake so that Fabric experiences can access data also via OneLake APIs. |
| KQL Queries & Commands | Yes | Yes |
| T-SQL Queries | Using Azure Data Explorer query. | Using KQL Queryset or built-in Notebooks. |
| Query repository and sharing | Queries are stored in the user's Azure Data Explorer web experience. | Queries are stored in a KQL Queryset item that is shared with the other Fabric workspace users. |
| APIs and SDKs | Yes | Available in the data plane |
| Connectors | Yes | Yes |
| Autoscale | Optional: Manual, Optimized, Customer | Built-in |
| Consumption Model | Cost plus billing model with multiple meters: Azure Data Explorer IP markup, with passthrough of infrastructure (Compute, Storage, and Networking) expenses. Leverages Azure reserved instances plans when in place. | KQL Database Uptime, OneLake Cache Storage and OneLake Storage |
| Minimum Consumption | Not applicable | Service is always available at the selected minimum level, and you pay at least the minimum compute selected (or actual use) while no longer paying for premium storage. |
| Python & R extensions | Yes | Only Python extension |
| Vnet | Yes | Managed at Fabric tenant level – can be behind Private Endpoint |
| Customer managed keys | Yes | Currently unavailable |
| Role-based access control plane | Control plane access based on the Azure RBAC model and managed through Azure portal. | Control plane access managed through the workspace and database user UX. |
| Availability Zones | Yes; dependent on regional zonal availability. User controlled. | Yes; dependent on regional zonal availability. |
| REST API Endpoint | Yes, ingestion, query and management commands endpoints | Ingestion and query URI endpoints |

### Data Activator

No direct comparison with any existing Azure/Microsoft service. Power Automate (single workflow), low code/high code vs ASA

## Appendix A **/TODO: Devang, is this sScenarios  and Use Cases?**

| | |
|--|--|
| :::image type="content" source="media/real-time-intelligence-compare/compare-scenario-edge-devices.png" alt-text="Diagram showing the architecture for edge devices."::: | **Data source**: Edge devices<br />**Data transport**: Azure IoT Hub<br />**Data transform/process**: Azure Stream Analytics, Azure Data Explorer, Azure Databricks<br />**AI**: Azure ML<br />**Data serving**: Power BI, Azure Maps, Web/Mobile Apps |
| :::image type="content" source="media/real-time-intelligence-compare/compare-scenario-iot-sensors.png" alt-text="Diagram showing the architecture for IOT sensors."::: | **Data source**: IOT Sensors, unstructured/semi-structured data<br />**Data transport**: Azure IoT Hub, Azure Event Hubs, Pipelines<br />**Data transform/process**: Azure Stream Analytics, Synapse Data Explorer Pools, Spark Pools, Serverless Pools, Azure Cognitive Services<br />**AI**: Azure ML<br />**Data serving**: Power BI, Azure CosmosDB, Cognitive Search |
| :::image type="content" source="media/real-time-intelligence-compare/compare-scenario-blob-storage.png" alt-text="Diagram showing the architecture for blob storage."::: | **Data source**: Blob storage, Azure Managed DBs<br />**Data transport**: Azure Event Hubs<br />**Data transform/process**: Azure Stream Analytics, Azure Databricks, Azure Synapse Analytics<br />**AI**: Anomaly Detector on Cognitive Services<br />**Data serving**: Power BI, WebApp |
| :::image type="content" source="media/real-time-intelligence-compare/compare-scenario-radio-network.png" alt-text="Diagram showing the architecture for radio networks."::: | **Data source**: Cell phones, radio networks<br />**Data transport**: Spark Structured Streaming<br />**Data transform/process**: Azure Databricks<br />**AI**: Azure ML<br />**Data serving**: PowerBI, Azure Maps, QGIS, ArcGIS |
| :::image type="content" source="media/real-time-intelligence-compare/compare-scenario-vehicle-sensors.png" alt-text="Diagram showing the architecture for vehicle sensors."::: | **Data source**: Vehicle sensors, GPS, Edge devices<br />**Data transport**: Azure IoT Hub<br />**Data transform/process**: Azure Stream Analytics, Azure Synapse Analytics<br />**AI**: Not applicable<br />**Data serving**: PowerBI, Power App, Web/Mobile Apps, Hololens |
| :::image type="content" source="media/real-time-intelligence-compare/compare-scenario-vehicle-plants.png" alt-text="Diagram showing the architecture for vehicle plants."::: | **Data source**: Vehicles, Plants, Sensors, Towers<br />**Data transport**: Azure IoT Hub, Azure Event Hubs, Kafka<br />**Data transform/process**: Azure Stream Analytics, Azure Functions, Azure Data Explorer, Azure Databricks<br />**AI**: Azure ML<br />**Data serving**: PowerBI, Grafana, WebApp, LogicApp, Notebook |
| :::image type="content" source="media/real-time-intelligence-compare/compare-scenario-on-premesis-cloud-logs.png" alt-text="Diagram showing the architecture for cloud logs."::: | **Data source**: On-prem, cloud logs<br />**Data transport**: Azure Functions, Azure Event Hubs<br />**Data transform/process**: Azure Data Explorer<br />**AI**: Not applicable<br />**Data serving**: PowerBI, Jupyter Notebooks, Logic Apps |
| :::image type="content" source="media/real-time-intelligence-compare/compare-scenario-amadeus.png" alt-text="Diagram showing the architecture for Azure Amadeus."::: | **Data source**: **/TODO: Devang**<br />**Data transport**: **/TODO: Devang**<br />**Data transform/process**: **/TODO: Devang**<br />**AI**: **/TODO: Devang**<br />**Data serving**: **/TODO: Devang** |

**/TODO: My idea is to combine elements of different architectures into one complex architecture of an organization**

## Related content

- [Get started with Real-Time Intelligence](tutorial-introduction.md)
