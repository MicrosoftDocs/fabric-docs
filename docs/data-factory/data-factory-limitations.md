---
title: Data Factory limitations overview
description: Identifies limitations that affect Data Factory in Microsoft Fabric features.
ms.reviewer: susabat
ms.topic: troubleshooting
ms.date: 3/23/2026
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

- Data destination to Lakehouse:
  - Spaces or special characters aren't supported in column or table names.
  - Duration and binary columns aren't supported while authoring Dataflow Gen2 dataflows.
- You must have a [currently supported gateway installed](/data-integration/gateway/service-gateway-monthly-updates) to use with Dataflow Gen2. At minimum, Dataflow Gen2 supports the last six released gateway versions.
- When you use OAuth2 credentials, the gateway currently doesn't support refreshes longer than an hour. These refreshes fail because the gateway can't support refreshing tokens automatically when access tokens expire, which happens one hour after the refresh started. If you get the errors "InvalidConnectionCredentials" or "AccessUnauthorized" when accessing cloud data sources using OAuth2 credentials even though the credentials have been updated recently, you may be hitting this error. This limitation for long running refreshes exists for both VNET gateways and on-premises data gateways.
- The Delta Lake specification doesn't support case sensitive column names, so `MyColumn` and `mycolumn`, while supported in Mashup, results in a "duplicate columns" error.
- Currently, column nullability is defaulting to allow nulls in all columns in the destination.
- After you save/publish your dataflow gen2 we require the validation/publish process to finish within 10 minutes per query. If you exceed this 10-minute limit try to simplify your queries or split your queries in dataflow gen2. 
- You can't connect to a public endpoint of an Azure Storage account using Power Query Online or Dataflow Gen2 (no gateway) if the Azure Storage account already has one or more Private Endpoints created. You need to connect to such storage accounts using a VNet data gateway or an on-premises data gateway that can connect using private endpoints.
- Dataflow Gen2 doesn't support for guest users in the tenant to connect to the data sources and destinations in the tenant the user is guest. Use a native user in the tenant to connect to the data sources and destinations.
- Consuming data from a dataflow gen2 with the dataflow connector requires Admin, Member or Contributor permissions. Viewer permission isn't sufficient and isn't supported for consuming data from the dataflow.
- When you don't access staging items with your dataflow for more than 90 days, you need to re-authendicate to ensure the dataflow is able to access the staging items. You can do this by creating a new dataflow gen2 within the same workspace. 
- When downstream items such as semantic models or other dataflows consume data from a Dataflow Gen2 using the Dataflows connector, the data is retrieved through an internal API. This API can experience intermittent timeouts, which may result in refresh failures for the consuming items. The error message shown in these cases can be misleading, for example: "The key didn't match any rows in the table." This error doesn't indicate a problem with your data; it means the backend service was temporarily unable to return the dataflow results. To mitigate this issue, configure a [data destination](dataflow-gen2-data-destinations-and-managed-settings.md) (such as Lakehouse or Warehouse) for each source dataflow, and update downstream items to read from that destination using the Lakehouse or Warehouse connector instead of the Dataflows connector. This approach bypasses the internal API entirely and typically improves overall refresh reliability and performance.

* **Supported gateway required**: Dataflow Gen2 requires a currently supported data gateway. At minimum, the last six released gateway versions are supported.

* **Delta Lake case sensitivity limitation**: Delta Lake doesn’t support case‑sensitive column names. Columns like `MyColumn` and `mycolumn` result in duplicate column errors, even though they’re allowed in Mashup.

* **Column nullability default behavior**: All destination columns default to allowing null values.

* **Publish and validation time limit**: Each query must complete validation and publish within 10 minutes. Queries exceeding this limit should be simplified or split across multiple dataflows.

* **Guest user access not supported**: Guest users can’t connect to data sources or destinations in the tenant they’re visiting. Use a native user account in the tenant instead.

* **Required permissions to consume dataflows**: Consuming data from a Dataflow Gen2 requires Admin, Member, or Contributor permissions. Viewer permission isn’t supported.

* **Staging authentication expiration**: If staging items aren’t accessed for more than 90 days, re‑authentication is required. This can be done by creating a new Dataflow Gen2 in the same workspace.
* **Relative references not supported with gateways**: Relative references for Fabric connectors ([Lakehouse](connector-lakehouse.md), [Warehouse](connector-data-warehouse.md), [SQL database](connector-sql-database.md)) aren't yet supported when a gateway is used.

## Related content

- [Service level outages](https://support.fabric.microsoft.com)
- [Get your questions answered by the Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
