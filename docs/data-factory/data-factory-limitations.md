---
title: Data Factory limitations overview
description: Identifies limitations that affect Data Factory in Microsoft Fabric features.
ms.reviewer: susabat
ms.topic: troubleshooting
ms.date: 3/15/2026
ms.custom: configuration
---

# Data Factory limitations overview

There are certain limitations to the current Data Factory in Microsoft Fabric features. Before submitting a support request, review the lists in this section to determine if you're experiencing a known limitation.

For service level outages or degradation notifications, check [Microsoft Fabric support](https://support.fabric.microsoft.com/).  

## Pipeline limitations in Microsoft Fabric

The following list describes the current limitations of pipelines in Data Factory in Microsoft Fabric.

- Most of the Azure Data Factory copy and orchestration patterns are applicable to Fabric pipelines, but [tumbling window](/azure/data-factory/how-to-create-tumbling-window-trigger) isn't yet available.
-	Connectors don't support OAuth and  Azure key vault (AKV).
-	Managed System Identity (MSI) is only available for Azure Blob Storage. Support for other sources is coming soon. 
-	GetMetaData activity can't have a source from Fabric KQL databases.
-	Script activity can't have a source from Fabric KQL databases.
-	Validation activity, Mapping Data Flow activity, and the SSIS integration runtime aren't available. 
-	Web activity doesn't support service principal based authentication.
-	Background sync of authentication doesn't happen for pipelines. Recommendation is to do minor description like updates to pipelines and save them. That way, new token is obtained and cached so pipeline can run again with updated password of entra id. 

## Pipeline resource limits

The following table describes the resource limitations for pipelines in Data Factory in Microsoft Fabric.

| Pipeline Resource | Default limit | Maximum limit |
|---|---|---|
| Total number of pipelines within a [workspace](/fabric/fundamentals/workspaces) | 5,000 | 5,000 |
| Concurrent pipeline runs per [workspace](/fabric/fundamentals/workspaces) that's shared among all pipelines in [workspace](/fabric/fundamentals/workspaces)  | 10,000 | 10,000 |
| Concurrent external activities like stored procedure, Web, Web Hook, and others per [workspace](/fabric/fundamentals/workspaces) | 100 | 100 |
| Concurrent pipeline activities execution for Lookup, GetMetadata, and Delete per [workspace](/fabric/fundamentals/workspaces) | 100 | 100 |
| Concurrent authoring operations, including test connection, browse folder list and table list, preview data, and so on per [workspace](/fabric/fundamentals/workspaces) | 50 | 50 |
| Maximum activities per pipeline, which includes inner activities for containers | 120 | 120 |
| Maximum parameters per pipeline | 50 | 50 |
|Maximum schedules per pipeline|20|20|
| ForEach items | 100,000 | 100,000 |
| ForEach parallelism | 20 | 50 |
| Lookup Activity item count | 5000 | 5000 |
| Maximum queued runs per pipeline | 100 | 100 |
| Characters per expression | 8,192 | 8,192 |
| Maximum timeout for pipeline activity runs | 24 hours | 24 hours |
| Bytes per object for pipeline objects | 200 KB | 200 KB |
| Bytes per payload for each activity run | 896 KB | 896 KB |
| Intelligent throughput optimization per copy activity run | Auto | 256 |
| Concurrent intelligent throughput optimization per [workspace](/fabric/fundamentals/workspaces) (the throughput is shared with Copy job) | 400 | 400 |
| Meta Data Entity Size limit in a factory | 2 GB | 2 GB |

## Copy job resource limits
The following table describes the limitations for Copy job in Data Factory in Microsoft Fabric.

| Copy job resource | Default limit | Maximum limit |
|---|---|---|
| Intelligent throughput optimization per table/object | Auto | 256 |
| Concurrent intelligent throughput optimization per [workspace](/fabric/fundamentals/workspaces) (the throughput is shared with pipeline) | 400 | 400 |

## Data Factory Dataflow Gen2 limitations

The following list describes the limitations for Dataflow Gen2 in Data Factory in Microsoft Fabric.
* **Query limit for staging and destinations**: A single Dataflow Gen2 supports up to **50 queries** that either:
  * Have **staging enabled**, or
  * Have a **data destination configured** (for example, Warehouse, Lakehouse, or other Fabric destinations).

  Queries that **don’t write data**—such as **functions**, **helper queries**, or **intermediate transformation queries** that aren’t staged and don’t have a data destination—**don’t count toward this limit**.

* **Supported gateway required**: Dataflow Gen2 requires a currently supported data gateway. At minimum, the last six released gateway versions are supported.

* **Delta Lake case sensitivity limitation**: Delta Lake doesn’t support case‑sensitive column names. Columns like `MyColumn` and `mycolumn` result in duplicate column errors, even though they’re allowed in Mashup.

* **Column nullability default behavior**: All destination columns default to allowing null values.

* **Publish and validation time limit**: Each query must complete validation and publish within 10 minutes. Queries exceeding this limit should be simplified or split across multiple dataflows.

* **Guest user access not supported**: Guest users can’t connect to data sources or destinations in the tenant they’re visiting. Use a native user account in the tenant instead.

* **Required permissions to consume dataflows**: Consuming data from a Dataflow Gen2 requires Admin, Member, or Contributor permissions. Viewer permission isn’t supported.

* **Staging authentication expiration**: If staging items aren’t accessed for more than 90 days, re‑authentication is required. This can be done by creating a new Dataflow Gen2 in the same workspace.

## Related content

- [Service level outages](https://support.fabric.microsoft.com)
- [Get your questions answered by the Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
