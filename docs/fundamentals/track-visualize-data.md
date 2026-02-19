---
title: Track and visualize data in Microsoft Fabric
description: Discover how Microsoft Fabric integrates Power BI, Real-Time Intelligence, and Fabric IQ to transform data into actionable insights through analytics and visualization.
#customer intent: As a business analyst, I want to create Power BI reports using semantic models so that I can provide structured and governed insights to my team.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/11/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Track and visualize data

One of the final steps in the data lifecycle is making sense of the data through analytics, visualization, and data-driven alerts. In Microsoft Fabric, the integration between Power BI, Real-Time Intelligence, and Fabric IQ workloads handles this step.

## Power BI reports and translytical taskflows

:::image type="content" source="./media/track-visualize-data/track-powerbi-translytical.png" alt-text="Diagram of Power BI translytical taskflows architecture.":::

[Power BI reports](/power-bi/consumer/end-user-reports) use semantic models in OneLake as their analytical backbone, enabling advanced analytics through a structured, reusable, and governed layer of business logic. Power BI reports provide data exploration and visualization experiences for business users.

You can distribute and embed Power BI reports across Microsoft 365 applications so your team can access and interact with insights in their everyday workflows. In [Microsoft Teams](/power-bi/collaborate-share/service-collaborate-microsoft-teams), pin reports in channels or chats for collaborative analysis. In SharePoint, embed reports into pages by using the Power BI web part for contextual reporting. In [PowerPoint](/power-bi/collaborate-share/service-power-bi-powerpoint-add-in-about), insert live reports into presentations. In [Excel](/power-bi/collaborate-share/service-connect-excel-power-bi-datasets), connect to Power BI datasets to build PivotTables and charts directly on top of semantic models. These integrations preserve interactivity, security, and governance across your organization.

[Translytical taskflows](/power-bi/create-reports/translytical-task-flow-overview) provide a unified experience that enables you to transition between transactional and analytical operations within Power BI reports. You can analyze data and call user data functions to take direct action from the report interface. The user data function can then update records, trigger workflows, or write back to OneLake without leaving the report. Translytical taskflows are especially valuable in scenarios like sales management, inventory adjustments, or customer service, where insights and actions need to be tightly coupled.

## Real-time insights and actions

:::image type="content" source="./media/track-visualize-data/track-real-time-intelligence.png" alt-text="Diagram of Real-Time Intelligence architecture.":::

The Real-Time Intelligence workload in Microsoft Fabric enables you to ingest, process, analyze, and act on streaming data with minimal latency. It combines capabilities from the following services:

### Ingest streaming data with Eventstream

[Eventstream](../real-time-intelligence/event-streams/overview.md) ingests, transforms, and routes streaming data from various sources into Fabric services like [Eventhouse](../real-time-intelligence/event-streams/add-destination-kql-database.md) or [Lakehouse](../real-time-intelligence/event-streams/add-destination-lakehouse.md). It provides a no-code, visual interface for building streaming pipelines. You can connect to sources such as Azure Event Hubs, Kafka, IoT devices, or REST APIs, and apply transformations like filtering, enrichment, and schema mapping in real time.

Eventstream supports routing and schema alignment, timestamp normalization, partitioning, and integration with [Activator](../real-time-intelligence/event-streams/add-destination-activator.md). As Eventstreams feed high-velocity data into Fabric, Activator continuously monitors these streaming events against [defined rules](../real-time-intelligence/data-activator/activator-rules-overview.md) in near real time.

### Analyze events with Eventhouse

[Eventhouses](../real-time-intelligence/eventhouse.md) are a scalable, real-time analytics engine designed to ingest, process, and analyze large volumes of event-based data with minimal latency. They support structured, semi-structured, and unstructured data from diverse sources and automatically index and partition data by ingestion time. They use Kusto Query Language (KQL) for fast, scalable querying of time-series and event data. KQL enables advanced filtering, aggregations, joins, and anomaly detection over large volumes of streaming data, making Eventhouses ideal for operational monitoring and telemetry analysis.

[Integration with Activator happens through KQL querysets](../real-time-intelligence/data-activator/activator-alert-queryset.md), which let you define reusable queries that continuously evaluate conditions on Eventhouse data. Activator can subscribe to these query outputs and apply rules based on the query results. When a KQL query detects a condition (for example, CPU usage exceeds 90% or a trend indicates failure risk), Activator triggers automated actions like sending alerts, launching Power Automate flows, or executing Fabric pipelines. This combination of KQL's analytical power with Activator's orchestration enables real-time, data-driven automation across business scenarios.

### Real-time dashboards

[Real-time dashboards](../real-time-intelligence/dashboard-real-time-create.md) provide live, interactive visualizations of streaming data, enabling you to monitor key metrics and operational signals as they happen. Built on top of Eventhouse (KQL databases), these dashboards let you query and display time-series data with minimal latency, offering insights into system performance, customer behavior, or sensor activity in real time. They support dynamic filtering, auto-refresh, and alerting capabilities, making them ideal for use cases like IT monitoring, manufacturing telemetry, financial transaction tracking, and customer support analytics. Real-time dashboards also integrate with Activator, so you can not only observe but also [respond to critical events](../real-time-intelligence/data-activator/activator-get-data-real-time-dashboard.md) directly from the dashboard interface, turning insights into action without delay.

Real-time dashboards differ from regular Power BI reports primarily in their ability to visualize and respond to live streaming data with minimal latency. Power BI reports are typically built on imported datasets refreshed on a schedule and are best for historical analysis and interactive exploration. Real-time dashboards, on the other hand, are designed for operational monitoring and immediate insight.

### Anomaly detection

The [anomaly detector](../real-time-intelligence/anomaly-detection.md) automatically identifies unusual patterns or outliers in streaming or time-series data. It works by analyzing data ingested into Eventhouse (KQL databases) and [applying statistical models or machine learning techniques](../real-time-intelligence/anomaly-detection-models.md) to detect deviations from expected behavior. These anomalies could represent system failures, fraud, performance degradation, or other critical events that require attention.

Unlike static threshold-based alerts, the anomaly detector adapts to the data's historical trends and seasonality, making it more effective at identifying subtle or context-sensitive issues. You can configure it to monitor specific metrics, such as CPU usage, transaction volume, or sensor readings, and flag anomalies in real time.

When an anomaly is detected, it can [trigger downstream actions through Activator](../real-time-hub/set-alerts-anomaly-detection.md), such as sending alerts, updating dashboards, or launching automated workflows. This capability supports operational scenarios where early detection of anomalies can prevent downtime, financial loss, or customer dissatisfaction. It enables you to move from reactive monitoring to proactive intervention across business processes.

### Automate responses with Activator

[Activator](../real-time-intelligence/data-activator/activator-introduction.md) is a no-code, low-latency event detection engine in Fabric's Real-Time Intelligence that continuously monitors streaming data (for example, from Eventstreams) for user-defined conditions. [It supports simple threshold rules and stateful pattern detection](../real-time-intelligence/data-activator/activator-rules-overview.md) (for example, when a metric BECOMES critical or DECREASES over time). When a rule is met, Activator immediately triggers the specified action, such as sending a Teams or email alert or launching an [automated Power Automate flow](../real-time-intelligence/data-activator/activator-trigger-power-automate-flows.md) to drive real-time responses. Activator can also [trigger Fabric items](../real-time-intelligence/data-activator/activator-trigger-fabric-items.md) to enable automation of the Fabric data platform. This capability enables you to automate decisions and operational tasks in near real time, bridging live data insights to instant actions and improving responsiveness.

## Business semantics

The [Fabric IQ workload](../iq/overview.md) maps your enterprise data to a shared business ontology and enables AI agents to act on that understanding. Fabric IQ unifies data across OneLake (lakehouses, warehouses, event streams, Power BI datasets, and more) and organizes it according to the language of the business. It exposes this live semantic model to analytics, AI copilots and agents, and operational applications with consistent meaning and context. This layer is built on top of your existing data estate. It uses the data and BI investments you already made, such as Power BI models, and adds semantic understanding and agentic AI capabilities.

### Ontology

[Fabric Ontology](../iq/ontology/overview.md) is a shared, machine-understandable vocabulary of your business that defines the key entities (for example, Customer, Product, or Plane), their relationships, properties, business rules, and possible actions while maintaining all terms in the language of the business. It brings together a live, connected representation of how your business operates, mapped directly to the underlying data in OneLake (structured, unstructured, and streaming datasets). This rich business context is available to both analytics tools and AI agents. They don't just see tables but also relationships like "Customers place Orders for Products," "Flights have Segments and Crews," and "Delayed shipments impact Revenue." This data-centric context is critical for any AI that's expected to make decisions or analyses about the business.

When you define an ontology element (such as an entity "Flight" with properties like Status or Delay), [you map it to the actual table and fields](../iq/ontology/how-to-bind-data.md) in an Eventhouse, Lakehouse, or Warehouse that contain that information, without copying or moving the data. After the data lands in OneLake, it becomes part of the live ontology.

Beyond business entities and relationships, ontologies can also define actionable rules, such as "If inventory < threshold, trigger replenishment." [Operations Agents](../real-time-intelligence/operations-agent.md) use these rules to trigger workflows in Activator. When an Operations Agent [invokes Activator to run a Power Automate flow](../real-time-intelligence/data-activator/activator-trigger-power-automate-flows.md), it passes parameters derived from ontology properties, such as CustomerID and OrderStatus. This approach ensures that automation flows operate with full business context, not just raw IDs.

### Graph model

[Graph models](../graph/graph-database.md) in Microsoft Fabric provide a native graph engine that transforms ontology-defined entities and relationships into a connected network. By using this network, you can enable multi-hop reasoning, impact analysis, and advanced algorithms like shortest path and community detection. This integration lets AI agents and analytics tools query complex relationships efficiently. It offers real-time insights into dependencies and cascading effects that traditional relational models struggle to handle. You can interrogate graph models by using [GraphQL queries](../graph/gql-language-guide.md) through [Fabric APIs](../graph/gql-query-api.md).

## Related content

* [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
* [Get data into Microsoft Fabric](get-data.md)
* [Store data in Microsoft Fabric](store-data.md)
* [Prepare and transform data](prepare-transform-data.md)
* [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
* [External integration and platform connectivity](external-integration.md)
