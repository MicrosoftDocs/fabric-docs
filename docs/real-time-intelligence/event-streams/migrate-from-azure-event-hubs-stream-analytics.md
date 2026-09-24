---
title: Eventstream for Azure Event Hubs and Stream Analytics users
description: Learn how Microsoft Fabric Eventstream maps to Azure Event Hubs and Stream Analytics capabilities, and when to consolidate real-time streaming into Fabric.
ms.reviewer: kevinlam1
ms.topic: upgrade-and-migration-article
ms.date: 08/12/2026
ms.search.form: Eventstream Overview
ai-usage: ai-assisted
---

# Microsoft Fabric Eventstream for Azure Event Hubs and Stream Analytics users

Microsoft Fabric Eventstream is a fully managed, no-code/low-code platform that enables organizations to ingest, process, and route real-time data from any source to any Fabric destination. It turns data in motion into immediate business insights and actions. For teams already using Azure Event Hubs and Azure Stream Analytics, Eventstream covers the same core scenarios while consolidating ingestion, transformation, and routing into one experience natively integrated with the Fabric ecosystem.

This article compares the combined Event Hubs + Stream Analytics pattern to Fabric Eventstream, and highlights what you gain by consolidating to Fabric.

## The Azure pattern: Event Hubs + Stream Analytics

In Azure, real-time streaming pipelines typically combine two services. Event Hubs handles ingestion: producers send events using Kafka, AMQP, or HTTPS, and the service buffers and fans out those events to consumers. Stream Analytics sits downstream and reads from Event Hubs as an input, applies SQL-based transformations and windowing logic, and writes results to one or more output sinks like Azure Data Lake, SQL Database, or Power BI.

This pattern works well but has two limitations. First, it means maintaining two separate resources, two sets of scaling configurations, two monitoring surfaces, and glue logic connecting them. Schema changes, CDC pipelines, and multi-destination fan-out require additional coordination across both services. Second, and more fundamentally, the Event Hubs + Stream Analytics pattern only works when the data source can send data to Event Hubs. If your data lives elsewhere, in a database, a message broker, another cloud's streaming service, or a SaaS application, you can't ingest and analyze it until you build a separate pipeline to push it into Event Hubs first. Eventstream removes this constraint by providing rich connectors that reach out to those sources directly.

## Fabric Eventstreams

An eventstream is a single resource that covers ingestion, transformation, and routing, all authored in one drag-and-drop canvas. Under the hood, Eventstream is built on Azure Event Hubs, Azure Stream Analytics, and a connector service: when you create an eventstream, an event hub namespace is automatically provisioned. Kafka clients, AMQP producers, and HTTPS endpoints can connect without code changes, while the connector service brings in data from sources that can't publish to Event Hubs on their own.

### Ingestion: what transfers from Event Hubs

The ingestion capabilities you relied on in Event Hubs carry over directly:

- **Kafka endpoint**: Every eventstream exposes a Kafka-compatible endpoint. Existing producers can be repointed with only a connection string change.
- **Existing Event Hubs as a source**: If you have Event Hubs namespaces you aren't ready to migrate, Eventstream can connect to them directly as a source. You keep upstream producers intact and bring data into Fabric without disruption.
- **Schema Registry**: Eventstream integrates with the Fabric Schema Registry for centralized schema management and versioning, the same concept as the Event Hubs Schema Registry.
- **Data retention**: Up to 90 days, matching the Event Hubs Premium and Dedicated tiers.
- **Private connectivity**: Workspace Private Link (preview) for inbound connections, equivalent to Event Hubs private endpoints.

Eventstream also goes well beyond Event Hubs in source coverage. Instead of only Kafka, AMQP, and HTTPS, you get more than 30 built-in connectors including Azure IoT Hub, Service Bus, Event Grid, MQTT brokers, change data capture from SQL Server, PostgreSQL, MySQL, MongoDB, Oracle, and Azure Cosmos DB, and external sources like Amazon Kinesis, Google Cloud Pub/Sub, and Confluent Kafka. Sources that previously required separate ingestion pipelines can feed into a single eventstream. When a source lives in a private network, a Streaming Virtual Network Gateway provides a secure bridge between Fabric and your private infrastructure.

### Processing: what transfers from Stream Analytics

The transformation logic you wrote in Stream Analytics maps to Eventstream's event processor:

- **No-code editor**: The drag-and-drop canvas replaces the Stream Analytics no-code editor. You add transformation nodes visually without writing SQL.
- **SQL operator**: For code-first teams, Eventstream includes a SQL operator where you write SQL expressions directly, including windowing, aggregations, and joins, using the same mental model as Stream Analytics queries. It also enables content-based routing, sending different event types to different destinations from a single query.
- **Windowing and aggregations**: The **Group by** transformation supports time-windowed aggregations grouped by one or more fields, covering the tumbling, hopping, and sliding window patterns common in Stream Analytics jobs.
- **Stream joins**: The **Join** transformation combines two input streams on a matching condition, equivalent to Stream Analytics stream-to-stream joins.
- **Filter, projection, and expansion**: The **Filter**, **Manage fields**, and **Expand** transformations cover row filtering, column selection and renaming, and array flattening.

### CDC pipelines: reducing glue work

A common pattern with Event Hubs + Stream Analytics is capturing database change events: a CDC connector pushes Debezium-format JSON payloads into Event Hubs, and a Stream Analytics job parses and reshapes them before writing to a destination. Eventstream DeltaFlow (preview) collapses this entire pattern into the source connector configuration. Connect directly to a SQL database (Azure SQL, PostgreSQL, SQL Server on VM, or Azure SQL Managed Instance), choose analytics-ready output, and DeltaFlow transforms the raw CDC events into clean tabular rows, auto-creates destination tables in Eventhouse, and handles schema evolution when source tables change.

## Fabric-native capabilities

Beyond parity with Event Hubs and Stream Analytics, Eventstream adds capabilities that come from being part of the Fabric platform:

- **Multiple simultaneous destinations**: Fan out to an Eventhouse, a Lakehouse, a Notebook, and Activator at the same time. Each destination receives the same stream independently, with no interference between them.
- **Eventhouse (KQL-based analytics)**: Route events directly to a KQL database for sub-second query performance using Kusto Query Language, enabling real-time dashboards without a separate analytics service.
- **Lakehouse integration**: Events are written to a Fabric Lakehouse in Delta Lake format automatically, making them available for downstream Spark notebooks and SQL analytics endpoints.
- **Notebook integration**: Route events to a Fabric Notebook for teams who prefer Spark. From there you can run custom transformations, machine learning models, and AI functions, such as calling `ai.generate_response()` to generate predictions or recommendations, then publish the results back out as business events for other teams to subscribe to. Fabric auto-generates the stream connection code, so the streaming data is ready to work with in Spark immediately.
- **Activator integration**: Route events to Activator to trigger alerts and Power Automate workflows when stream conditions are met, without building a separate alerting layer.

## When to keep Azure Event Hubs or Stream Analytics

Fabric Eventstream is designed for scenarios where you want a unified streaming experience within Fabric. Consider keeping or continuing to use the dedicated Azure services when:

- **You need platform-level control**: Event Hubs and Stream Analytics are PaaS services that offer granular configuration, including partition counts, throughput unit sizing, streaming unit tuning, and CI/CD deployment through ARM templates, Bicep, or Terraform. Eventstream is a SaaS experience that abstracts this infrastructure. If your team needs to own and tune the underlying platform, the Azure services offer more control.
- You need dedicated or reserved throughput at very high scale with predictable capacity (Event Hubs Dedicated tier).
- **You depend on Stream Analytics user-defined functions (UDFs)**: If your queries rely on JavaScript UDFs, you need to stay within Stream Analytics for now, as Eventstream doesn't yet support custom UDFs in its SQL processing.
- Your downstream systems are outside Fabric and require outputs to Azure services that Eventstream doesn't yet support as destinations (for example, Azure Cosmos DB, Azure SQL Database, or Azure Functions as direct outputs).

For most analytics-focused real-time workloads within Fabric, Eventstream consolidates the role of both services.

## Related content

- [Microsoft Fabric Eventstream overview](overview.md)
- [What is Azure Event Hubs?](/azure/event-hubs/event-hubs-about)
- [Introduction to Azure Stream Analytics](/azure/stream-analytics/stream-analytics-introduction)
- [Real-Time Intelligence in Microsoft Fabric](../overview.md)
