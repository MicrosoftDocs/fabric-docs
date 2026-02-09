---
title: Track and Visualize Data in Microsoft Fabric
description: Discover how Microsoft Fabric integrates Power BI, Real-Time Intelligence, and Fabric IQ to transform data into actionable insights through analytics and visualization.
#customer intent: As a business analyst, I want to create Power BI reports using semantic models so that I can provide structured and governed insights to my team.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 01/20/2026
ms.topic: concept-article
---

# Track and visualize

One of the final steps in the data lifecycle is making sense of the data through analytics, visualization and data-drvien alerts. In Microsoft Fabric, this is primarily handled by the integration between Power BI, Real-Time Intelligence and Fabric IQ workloads. 

### Power BI reports and translytical taskflows

:::image type="content" source="./media/track-visualize-data/track-powerbi-translytical.png" alt-text="Screenshot of Power BI translytical taskflows diagram.":::

[Power BI reports](/power-bi/consumer/end-user-reports) use Semantic Models in OneLake as their analytical backbone, enabling advanced analytics through a structured, reusable, and governed layer of business logic. Power BI reports provide data exploration and visualisation experiences for business users.

From a collaboration standpoint, Power BI reports can be distributed and embedded across Microsoft 365 applications, enabling users to access and interact with insights in their everyday workflows. In [Microsoft Teams](/power-bi/collaborate-share/service-collaborate-microsoft-teams), reports can be pinned in channels or chats for collaborative analysis; in SharePoint, they can be embedded into pages using the Power BI web part for contextual reporting; in [PowerPoint](/power-bi/collaborate-share/service-power-bi-powerpoint-add-in-about), live reports can be inserted into presentations; and in [Excel](/power-bi/collaborate-share/service-connect-excel-power-bi-datasets), users can connect to Power BI datasets to build PivotTables and charts directly on top of semantic models. These integrations preserve interactivity, security, and governance across the organization.

[Translytical taskflows](/power-bi/create-reports/translytical-task-flow-overview) refer to a unified experience that enables users to transition between transactional and analytical operations within Power BI reports. This functionality allows business users to not only analyze data but also to call user data functions to take direct action directly from the report interface. The user data function can then update records, trigger workflows, or write back to OneLake without leaving the report interface. Translytical taskflows are especially valuable in scenarios like sales management, inventory adjustments, or customer service, where insights and actions need to be tightly coupled. 

### Real-time insights and action

:::image type="content" source="./media/track-visualize-data/track-rti.png" alt-text="Screenshot of Real-Time Intelligence architecture diagram.":::

The Real-Time Intelligence workload in Microsoft Fabric enables organizations to ingest, process, analyze, and act on streaming data with minimal latency. It combines capability from the following services:

#### Eventstream

[Eventstream](/fabric/real-time-intelligence/event-streams/overview) is designed to ingest, transform, and route streaming data from various sources into Fabric services like [Eventhouse](/fabric/real-time-intelligence/event-streams/add-destination-kql-database) or [Lakehouse](/fabric/real-time-intelligence/event-streams/add-destination-lakehouse). It provides a no-code, visual interface for building streaming pipelines, allowing users to connect to sources such as Azure Event Hubs, Kafka, IoT devices, or REST APIs, and apply transformations like filtering, enrichment, and schema mapping in real time.

Eventstream supports basic routing and schema alignment, timestamp normalization, partitioning, and integration with [Activator](/fabric/real-time-intelligence/event-streams/add-destination-activator). As Eventstreams feed high-velocity data into Fabric, Activator continuously monitors these streaming events against [defined rules](/fabric/real-time-intelligence/data-activator/activator-rules-overview) in near real-time. 

#### Eventhouse
[Eventhouses](/fabric/real-time-intelligence/eventhouse) are a scalable, real-time analytics engine designed to ingest, process, and analyze large volumes of event-based data with minimal latency. It supports structured, semi-structured, and unstructured data from diverse sources, automatically indexing and partitioning data by ingestion time. They leverage Kusto Query Language (KQL) for fast, scalable querying of time-series and event data. KQL enables advanced filtering, aggregations, joins, and anomaly detection over large volumes of streaming data, making Eventhouses ideal for operational monitoring and telemetry analysis.

[Integration with Activator happens through KQL Querysets](/fabric/real-time-intelligence/data-activator/activator-alert-queryset), which allow you to define reusable queries that continuously evaluate conditions on Eventhouse data. Activator can subscribe to these query outputs and apply rules based on the query results. When a KQL query detects a condition (e.g., CPU usage exceeds 90% or a trend indicates failure risk), Activator triggers automated actions like sending alerts, launching Power Automate flows, or executing Fabric pipelines. This combination of KQL's analytical power with Activator's orchestration enables real-time, data-driven automation across business scenarios.

#### Real-Time Dashboard
[Real-Time Dasboards](/fabric/real-time-intelligence/dashboard-real-time-create) provide live, interactive visualizations of streaming data, enabling users to monitor key metrics and operational signals as they happen. Built on top of Eventhouse (KQL databases), these dashboards allow users to query and display time-series data with minimal latency, offering insights into system performance, customer behavior, or sensor activity in real time. They support dynamic filtering, auto-refresh, and alerting capabilities, making them ideal for use cases like IT monitoring, manufacturing telemetry, financial transaction tracking, and customer support analytics. Real-Time Dashboards also integrate with Activator, allowing users to not only observe but also [respond to critical events](/fabric/real-time-intelligence/data-activator/activator-get-data-real-time-dashboard) directly from the dashboard interface thus turning insights into action without delay.

Real-Time Dashboards differ from regular Power BI reports primarily in their ability to visualize and respond to live streaming data with minimal latency. While Power BI reports are typically built on imported datasets refreshed on schedule, which are best for historical analysis and interactive exploration. On the other hand, Real-Time Dashboards are designed for operational monitoring and immediate insight. 

#### Anomaly Detector

The [Anomaly Detector](/fabric/real-time-intelligence/anomaly-detection) automatically identifies unusual patterns or outliers in streaming or time-series data. It works by analyzing data ingested into Eventhouse (KQL databases) and [applying statistical models or machine learning techniques](/fabric/real-time-intelligence/anomaly-detection-models) to detect deviations from expected behavior. These anomalies could represent system failures, fraud, performance degradation, or other critical events that require attention.

Unlike static threshold-based alerts, the Anomaly Detector adapts to the data's historical trends and seasonality, making it more effective at identifying subtle or context-sensitive issues. It can be configured to monitor specific metrics, such as CPU usage, transaction volume, or sensor readings—and flag anomalies in real time. 

Once an anomaly is detected, it can [trigger downstream actions via Activator](/fabric/real-time-hub/set-alerts-anomaly-detection), such as sending alerts, updating dashboards, or launching automated workflows.
This capability supports operational scenarios where early detection of anomalies can prevent downtime, financial loss, or customer dissatisfaction. It allows organizations to move from reactive monitoring to proactive intervention across business processes.

#### Activator

[Activator](/fabric/real-time-intelligence/data-activator/activator-introduction) is a no-code, low-latency event detection engine in Fabric's Real-Time Intelligence that continuously monitors streaming data (e.g. from Eventstreams) for user-defined conditions. [It supports simple threshold rules as well as stateful pattern detection](/fabric/real-time-intelligence/data-activator/activator-rules-overview) (for example, when a metric BECOMES critical or DECREASES over time). When a rule is met, Activator immediately triggers the specified action, such as sending a Teams/email alert or launching an [automated Power Automate flow](/fabric/real-time-intelligence/data-activator/activator-trigger-power-automate-flows) to drive real-time responses. Activator can also [trigger Fabric items](/fabric/real-time-intelligence/data-activator/activator-trigger-fabric-items) to enable automation of the Fabric data platform. This enables organizations to automate decisions and operational tasks in near real-time, bridging live data insights to instant actions and improving responsiveness.

### Business semantics

The [Fabric IQ workload](/fabric/iq/overview) maps your enterprise data to a shared business ontology and enabling AI agents to act on that understanding. Fabric IQ unifies data across OneLake (lakehouses, warehouses, event streams, Power BI datasets, etc.) and organizes it according to the language of the business, exposing this live semantic model to analytics, AI copilots/agents, and operational applications with consistent meaning and context. This new layer is built on top of your existing data estate: it leverages the data and BI investments you've already made (e.g. Power BI models), adding a semantic understanding and agentic AI capabilities on top. 

#### Ontology

[Fabric Ontology](/fabric/iq/ontology/overview) is a shared, machine-understandable vocabulary of your business that defines the key entities (things like Customer, Product, Plane), their relationships, properties, business rules, and possible actions while maintaining all in the language of the business. It brings together a live, connected representation of how your business operates, mapped directly to the underlying data in OneLake (structured, unstructured and streaming datasets). This rich business context is available to both analytics tools and AI agents so they don't just see tables, but also "Customers place Orders for Products", "Flights have Segments and Crews", "Delayed shipments impact Revenue", and so on. This data-centric context is critical for any AI that's expected to make decisions or analyses about the business.

In practice, this means when you define an ontology element (say an entity "Flight" with properties like Status or Delay), [you map it to the actual table/fields](/fabric/iq/ontology/how-to-bind-data) in an Eventhouse, Lakehouse or Warehouse that contain that information without copying or moving the data. This means once the data lands in OneLake, it becomes part of the live ontology if it's been mapped. 

Beyond business entities and relationships, ontologies can also define actionable rules (e.g., "If inventory < threshold, trigger replenishment"). [Operations Agents](/fabric/real-time-intelligence/operations-agent) use these rules to trigger workflows in Activator. Workflow Context: When an Operations Agent [invokes Activator to run a Power Automate flow](/fabric/real-time-intelligence/data-activator/activator-trigger-power-automate-flows), it passes parameters derived from ontology properties (e.g., CustomerID, OrderStatus). This ensures that automation flows operate with full business context, not just raw IDs.

#### Graph model

[Graph models](/fabric/graph/graph-database) in Microsoft provide a native graph engine that transforms ontology-defined entities and relationships into a connected network, enabling multi-hop reasoning, impact analysis, and advanced algorithms like shortest path and community detection. This integration allows AI agents and analytics tools to query complex relationships efficiently, offering real-time insights into dependencies and cascading effects that traditional relational models struggle to handle. You can interrogate Graph models using the [GraphQL queries](/fabric/graph/gql-language-guide) via [Fabric APIs](/fabric/graph/gql-query-api).
