---
title: Data Factory limitations overview
description: Identifies limitations that affect Data Factory in Microsoft Fabric features.
author: ssabat
ms.author: susabat
ms.topic: troubleshooting
ms.date: 04/10/2024
---

# Data Factory limitations overview

There are certain limitations to the current Data Factory in Microsoft Fabric features. Before submitting a support request, review the lists in this section to determine if you're experiencing a known limitation.

For service level outages or degradation notifications, check [Microsoft Fabric support](https://support.fabric.microsoft.com/).  

## Data pipeline limitations in Microsoft Fabric

The following list describes the current limitations of pipelines in Data Factory in Microsoft Fabric.

- Most of the Azure Data Factory copy and orchestration patterns are applicable to Fabric pipelines, but [tumbling window](/azure/data-factory/how-to-create-tumbling-window-trigger) and [event triggers](/azure/data-factory/how-to-create-custom-event-trigger) aren't yet available.
- Pipelines don't support Continuous Integration and Continuous Delivery (CI/CD).
- Connectors don't support OAuth, Azure key vault (AKV), and Managed System Identity (MSI).
- Connectors can't use parameters.
- GetMetaData activity can't have a source from Fabric KQL databases.
- Script activity can't have a source from Fabric KQL databases.
- Copy activity uses a Web connector, whereas Web/Webhook activities use a Web v2 connector that supports richer functionality, like audience and resource URI.
- Custom activities aren't available in Fabric pipelines. Use Azure Batch activity instead.
- Data pipelines are scoped to their workspace, and can't interact with items in other workspaces.
- The on-premises data gateway can be used with Dataflow Gen2 to ingest on-premises data now. You can orchestrate on-premises data ingestion with a data flow activity in the pipeline.
- Pipelines can't use a managed VNet.
- Web activity does not support service principal based authentication.

## Data pipeline resource limits

The following table describes the resource limitations for pipelines in Data Factory in Microsoft Fabric.

| Pipeline Resource | Default limit | Maximum limit |
|---|---|---|
| Total number of entities, such as pipelines, activities, triggers within a workspace | 5,000 | 5,000 |
| Concurrent pipeline runs per data factory that's shared among all pipelines in workspace  | 10,000 | 10,000 |
| External activities  like stored procedure, Web, Web Hook, and others | 3,000 | 3,000 |
| Pipeline activities execute on integration runtime, including Lookup, GetMetadata, and Delete | 1,000 | 1,000 |
| Concurrent authoring operations, including test connection, browse folder list and table list, preview data, and so on | 200 | 200 |
| Maximum activities per pipeline, which includes inner activities for containers | 40 | 40 |
| Maximum parameters per pipeline | 50 | 50 |
| ForEach items | 100,000 | 100,000 |
| ForEach parallelism | 20 | 50 |
| Lookup Activity item count | 5000 | 5000 |
| Maximum queued runs per pipeline | 100 | 100 |
| Characters per expression | 8,192 | 8,192 |
| Maximum timeout for pipeline activity runs | 24 hours | 24 hours |
| Bytes per object for pipeline objects | 200 KB | 200 KB |
| Bytes per payload for each activity run | 896 KB | 896 KB |
| Data Integration Units per copy activity run | Auto | 256 |
| Write API calls | 1,200/h | 1,200/h |
| Read API calls | 12,500/h | 12,500/h |
| Maximum time of data flow debug session | 8 hrs | 8 hrs |
| Meta Data Entity Size limit in a factory | 2 GB | 2 GB |

## Data Factory Dataflow Gen2 limitations

The following list describes the limitations for Dataflow Gen2 in Data Factory in Microsoft Fabric.

- Data Factory Fast Copy isn't yet available.
- Data destination to Lakehouse:
  - Spaces or special characters aren't supported in column or table names.
  - Duration and binary columns aren't supported while authoring Dataflow Gen2 dataflows.
- You need to have the latest version of the gateway installed to use with Dataflow Gen2.
- When using OAuth2 credentials, the gateway currently doesn't support refreshes longer than an hour. These refreshes will fail because the gateway cannot support refreshing tokens automatically when access tokens expire, which happens one hour after the refresh started. If you get the errors "InvalidConnectionCredentials" or "AccessUnauthorized" when accessing cloud data sources using OAuth2 credentials even though the credentials have been updated recently, you may be hitting this error. This limitation for long running refreshes exists for both VNET gateways and on-premises data gateways.
- The incremental refresh feature isn't available yet in Dataflow Gen2.
- The Delta Lake specification doesn't support case sensitive column names, so `MyColumn` and `mycolumn`, while supported in Mashup, results in a "duplicate columns" error.
- Dataflows that use a Gateway and the data destination feature are limited to an evaluation or refresh time of one hour. Read more about the [gateway considerations when using data destinations](gateway-considerations-output-destinations.md).
- Currently, column nullability is based on the underlying behavior specified in the Power Query that generates the data for the Dataflow Gen2. 

The following table indicates the supported data types in specific storage locations.

| **Supported data types per storage location:**  | DataflowStagingLakehouse | Azure DB (SQL) Output | Azure Data Explorer Output | Fabric Lakehouse (LH) Output | Fabric Warehouse (WH) Output |
|-------------------------------------------------|--------------------------|-----------------------|----------------------------|------------------------------|------------------------------|
| Action| No| No | No  | No    | No    |
| Any   | No| No | No  | No    | No    |
| Binary| No| No | No  | No    | No    |
| Currency | Yes   | Yes| Yes | Yes   | No    |
| DateTimeZone| Yes   | Yes| Yes | No    | No    |
| Duration | No| No | Yes | No    | No    |
| Function | No| No | No  | No    | No    |
| None  | No| No | No  | No    | No    |
| Null  | No| No | No  | No    | No    |
| Time  | Yes   | Yes| No  | No   | No   |
| Type  | No| No | No  | No    | No    |
| Structured (List, Record, Table)| No| No | No  | No    | No    |

## Related content

- [Service level outages](https://support.fabric.microsoft.com)
- [Get your questions answered by the Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
