---
title: Fabric Apache Spark Diagnostic Emitter overview
description: Learn how Fabric Apache Spark Diagnostic Emitter works, which diagnostic streams are supported, and when to use Log Ingestion API, Event Hubs, or Blob Storage destinations.
ms.reviewer: jejiang
ms.topic: concept-article
ms.date: 03/18/2026
ai-usage: ai-assisted
---

# Fabric Apache Spark Diagnostic Emitter overview

Fabric Apache Spark Diagnostic Emitter is generally available in Microsoft Fabric. It provides a unified way to collect Apache Spark diagnostics and route them to Azure destinations for monitoring, troubleshooting, and long-term analysis.

## What the diagnostic emitter collects

The emitter supports four diagnostic streams:

- **Spark event logs**: Structured Spark engine events for job, stage, and task lifecycle.
- **Spark driver logs**: Log output from the Spark driver process.
- **Spark executor logs**: Log output from executor processes for task-level diagnostics.
- **Spark metrics**: JVM, executor, and task-level performance metrics.

You can also write custom application logs by using Apache Log4j in Scala and PySpark. These logs are emitted together with system diagnostics when routing is configured.

## Where diagnostics can be sent

The emitter supports the following destinations:

- **Azure Log Analytics**: [Collect logs and metrics with Azure Log Analytics](data-collector-api-to-log-ingestion-api.md)
- **Azure Event Hubs**: [Collect Apache Spark applications logs and metrics using Azure Event Hubs](azure-fabric-diagnostic-emitters-azure-event-hub.md)
- **Azure Blob Storage**: [Collect your Apache Spark applications logs and metrics using Azure storage account](azure-fabric-diagnostic-emitters-azure-storage.md)

All destinations use the same `spark.synapse.diagnostic.emitter` configuration pattern, with destination-specific values.

You can configure one destination or multiple destinations, depending on your operational needs.

## Log Ingestion API compared to Data Collector API

For Azure Log Analytics, Log Ingestion API is the recommended model. Compared to HTTP Data Collector API, it provides:

- Explicit schema mapping through **Data Collection Rules (DCRs)**.
- Routing and endpoint controls through **Data Collection Endpoints (DCEs)**.
- Authentication with service principal client secret or certificate.

If you're currently using HTTP Data Collector API, migrate to Log Ingestion API for future-proof Spark observability.

For legacy reference only, see [Monitor Apache Spark applications with Azure Log Analytics](azure-fabric-diagnostic-emitters-log-analytics.md).

## Related content

- [Collect logs and metrics with Azure Log Analytics](data-collector-api-to-log-ingestion-api.md)
- [Collect Apache Spark applications logs and metrics using Azure Event Hubs](azure-fabric-diagnostic-emitters-azure-event-hub.md)
- [Collect your Apache Spark applications logs and metrics using Azure storage account](azure-fabric-diagnostic-emitters-azure-storage.md)
