---
title: Supported scenarios for workspace private links
description: Find information and links for supported and unsupported workspace-level private link scenarios.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: overview
ms.custom:
ms.date: 09/29/2025

#customer intent: As a workspace admin, I want to get more information about how to use workspace-level private link in supported and unsupported scenarios.

---

# Supported scenarios and limitations for workspace-level private links


Workspace-level private links in Microsoft Fabric provide a secure way to connect to specific workspace resources over a private network. This article explains which scenarios and item types are supported, highlights current limitations, and offers guidance on best practices and troubleshooting for using workspace-level private links.
<!--
> [!NOTE]
> - For information about connecting one workspace to another workspace, see [cross-workspace communication](./security-cross-workspace-communication.md). 
> - For details about API calls that return information from multiple workspaces, see [Multi-workspace APIs](./security-fabric-multi-workspace-api-overview.md). 
-->

## Supported item types for workspace-level private link

You can use workspace-level private links to connect to the following item types in Fabric:

* Lakehouse, SQL Endpoint, Shortcut
* Direct connection via OneLake endpoint
* Notebook, Spark Job Definition, Environment
* Machine learning experiment, machine learning model
* Pipeline
* Copy Job
* Mounted Data Factory
* Warehouse 
* Dataflows Gen2 (CI/CD)
* Variable library
* Mirrored database
* Eventstream
* Eventhouse

### Notes about unsupported item types

Review the following considerations when working with unsupported item types.

* Inbound Public access can't be restricted for a workspace if it contains unsupported items, even if workspace-level private link is set up.

* Unsupported item types can't be created in workspaces where inbound public access is restricted.

* When a workspace is assigned to a deployment pipeline, it can't be configured to block public access, as deployment pipelines don't currently support workspace-level private link.

* Existing lakehouses, warehouses and mirrored databases use a default semantic model that doesn't support workspace-level private links, which prevents you from blocking public access to the workspace. You can bypass this default semantic model limitation by configuring the workspace to block public access first, and then creating a lakehouse, warehouse or mirrored database.

* Lakehouses with schemas aren't supported when a workspace-level private link is enabled for a workspace.

* To read files in a Lakehouse located in another workspace, use a fully qualified path that includes the workspace ID and lakehouse ID (not their display names). This approach ensures the Spark session can resolve the path correctly and avoids socket timeout errors. [Learn more](workspace-outbound-access-protection-data-engineering.md#understanding-the-behavior-of-file-paths)

* Spark connector for SQL DW isn't currently supported when a workspace-level private link is enabled for a workspace.

* Pipelines and Copy Jobs are generally supported. However, the following scenario isn't currently supported:

   * **Gateway-based connections:** Pipelines and Copy Jobs can't use connections that rely on an on-premises data gateway or a virtual network (VNet) data gateway infrastructure. This limitation applies specifically to gateway-dependent connections. Standard cloud-based connections continue to work normally with these features.

* The **OneLake Catalog - Govern** tab isn't available when Private Link is activated.
  
* Workspace monitoring is not currently supported when a workspace-level private link is enabled for a workspace.

## Supported APIs

This section lists the APIs that support workspace-level private links.

### Fabric Core support

APIs with endpoints containing `v1/workspaces/{workspaceId}` support workspace-level private links because they operate within the context of a specific workspace. In contrast, admin APIs use `admin/workspaces/{workspaceId}` in their endpoints and aren't covered by workspace-level private links. Admin APIs remain accessible even for restricted workspaces, as they're governed by the tenant-level block public access setting.

* [Items - REST API (Core)](/rest/api/fabric/core/items): Also check individual item types for details.
* [Folders - REST API (Core)](/rest/api/fabric/core/folders)
* [Git - REST API (Core)](/rest/api/fabric/core/git)
* [Managed Private Endpoints - REST API (Core)](/rest/api/fabric/core/managed-private-endpoints) 
* [Job Scheduler - REST API (Core)](/rest/api/fabric/core/job-scheduler)
* [OneLake Data Access Security - Create Or Update Data Access Roles - REST API (Core)](/rest/api/fabric/core/onelake-data-access-security) 
* [OneLake Shortcuts - REST API (Core)](/rest/api/fabric/core/onelake-shortcuts)
    * From a restricted workspace, you can create shortcuts to other data sources such as external storage, or through trusted access.
    * When you create a shortcut to another restricted workspace, you need to create a managed private endpoint and get approval from the target workspace private link service owner in Azure. For more information, see [Cross-workspace communication](security-cross-workspace-communication.md).
    * Shortcut transforms are not currently supported in restricted workspaces.
* [Tags - REST API (Core)](/rest/api/fabric/core/tags)
* [Workspaces - REST API (Core)](/rest/api/fabric/core/workspaces)
* [External Data Shares Provider - REST API (Core)](/rest/api/fabric/core/external-data-shares-provider): The recipient needs to use the workspace fully qualified domain name (FQDN) to access the shared OneLake URL.

> [!NOTE]
> * The [workspaces network communication policy API](/rest/api/fabric/core/workspaces/set-network-communication-policy) isn't restricted by workspace-level network settings. This API remains accessible from public networks, even if public access to the workspace is blocked. Tenant-level network restrictions still apply. See also [Table 1. Access to workspace communication policy API based on tenant and private link settings](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace).
> * **Deployment pipelines:** If any workspace in a deployment pipeline is set to deny public access (restricted), deployment pipelines can't connect to that workspace. Configuring inbound restriction is blocked for any workspace that is assigned to a pipeline.
> * **Item sharing:** Item sharing isn't supported. If items are already shared with users, those users can no longer access the items using the shared links.

### Lakehouse support

Create and manage Lakehouses in workspaces enabled with private links by using the Fabric portal or REST APIs.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Create a Lakehouse](/fabric/data-engineering/create-lakehouse) |[Lakehouse REST API](../data-engineering/lakehouse-api.md)<br>[Items (Lakehouse)](/rest/api/fabric/lakehouse/items)<br>[Livy Sessions (Lakehouse)](/rest/api/fabric/lakehouse/livy-sessions)<br>[Tables (Lakehouse)](/rest/api/fabric/lakehouse/tables)<br>[Background Jobs (Lakehouse)](/rest/api/fabric/lakehouse/background-jobs)      |

### Warehouse support

Create and manage warehouses in workspaces enabled with private links by using the Fabric portal or REST APIs.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Create a Warehouse](/fabric/data-warehouse/create-warehouse) |[Warehouse REST API](/rest/api/fabric/warehouse/items)<br>[Items (WarehouseSnapshot)](/rest/api/fabric/warehousesnapshot/items)<br></br>To get the workspace private link service connection string for a warehouse:<br>[Get Connection String (Warehouse)](/rest/api/fabric/warehouse/items/get-connection-string) |

To use the warehouse connection string with a workspace-level private link, add z{xy} to the regular warehouse connection string. For example:

```http
https://{GUID}-{GUID}.z{xy}.datawarehouse.fabric.microsoft.com
```

Using the warehouse connection string, you can also access a warehouse via the SQL Tabular Data Stream (TDS) endpoint in tools such as SQL Server Management Studio.

### SQL Endpoint support

Obtain the workspace private link service connection string for a SQL Endpoint by using the Fabric portal or REST API.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Find the Connection String (SQL Endpoint)](/fabric/data-warehouse/how-to-connect#find-the-warehouse-connection-string) | [Get Connection String (SQL Endpoint)](/rest/api/fabric/sqlendpoint/items/get-connection-string)<br> [List SQL Endpoints](/rest/api/fabric/sqlendpoint/items/list-sql-endpoints)<br>[Get Connection String - REST API (SQL Endpoint)](/rest/api/fabric/sqlendpoint/items/get-connection-string) |

### Notebook support

Manage notebooks in workspaces enabled with private links by using the Fabric portal or REST APIs.

|Fabric portal  |REST APIs  |
|---------|---------|
|[How to use notebooks](/fabric/data-engineering/how-to-use-notebook)<br>|[Items - REST API (Notebook)](/rest/api/fabric/notebook/items)<br>[Manage and run notebooks in a workspace](/fabric/data-engineering/notebook-public-api)|

### Livy endpoint support

Use the Fabric portal or APIs in workspaces enabled with private links to create and execute statements or run batch jobs using Livy endpoints.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Manage Livy API endpoints](/fabric/data-engineering/get-started-api-livy)         | [Livy Sessions (Notebook)](/fabric/data-engineering/get-started-api-livy)

A Livy session job establishes a Spark session that remains active for the duration of your interaction with the Livy API. Livy sessions are ideal for interactive workloads. The session starts when you submit a job and remains available until you explicitly end it or the system terminates it after 20 minutes of inactivity. Multiple jobs can run within the same session, sharing state and cached data.

A Livy batch job involves submitting a Spark application for a single execution. Unlike a Livy session job, a batch job doesn't maintain a persistent Spark session. Each Livy batch job starts a new Spark session that ends when the job completes. This method is suitable for tasks that don't depend on cached data or require state to be maintained between jobs.

### Spark job definition support

Use the Fabric portal or the APIs in workspaces enabled with private links to create, read, update, and delete Spark job definition items.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Create Spark Job Definition](/fabric/data-engineering/create-spark-job-definition)         | [Items (SparkJobDefinition)](/rest/api/fabric/sparkjobdefinition/items)<br></br>To run batch jobs in a workspace:<br>[Background Jobs - REST API (SparkJobDefinition)](/rest/api/fabric/sparkjobdefinition/background-jobs)        |

### Environment support

Manage environments in workspaces enabled with private links by using the Fabric portal or use Environment REST APIs to create, read, update, and delete Environment items.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Create, configure, and use an environment](/fabric/data-engineering/create-and-use-environment)         | [Items (Environment)](/rest/api/fabric/environment/items)<br>[Spark Compute (Environment)](/rest/api/fabric/environment/spark-compute)<br>[Spark Libraries (Environment)](/rest/api/fabric/environment/spark-libraries)<br>[Custom Pools (Spark)](/rest/api/fabric/spark/custom-pools)<br>[Livy Sessions (Spark)](/rest/api/fabric/spark/livy-sessions)<br>[Workspace Settings (Spark)](/rest/api/fabric/spark/workspace-settings) |

> [!NOTE]
> For Spark, workspace-level private links that use friendly names don't work.

### Machine learning experiment support

Manage machine learning experiments in workspaces enabled with private links by using the Fabric portal or REST API.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Machine learning experiments](/fabric/data-science/machine-learning-experiment)  |[Items (MLExperiment)](/rest/api/fabric/mlexperiment/items)|

### Machine learning model support

Manage machine learning models in workspaces enabled with private links by using the [Items - REST API (MLModel)](/rest/api/fabric/mlmodel/items).

### Pipeline, Copy job, and Mounted Data Factory support
Manage pipelines, copy jobs, and mounted data factories in workspaces enabled with private links by using the Fabric portal or the following REST APIs.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Data pipeline](/fabric/data-factory/default-destination)<br>[Copy job activity](/fabric/data-factory/copy-job-activity)  | [Items (DataPipeline)](/rest/api/fabric/datapipeline/items)<br>[Items (CopyJob)](/rest/api/fabric/copyjob/items)<br> [Items (MountedDataFactory)](/rest/api/fabric/mounteddatafactory/items)<br>[Pipelines (Power BI Power BI REST APIs)](/rest/api/power-bi/pipelines) |

> [!NOTE]
> * Copy to warehouse isn't supported.
> * Copy to Eventhouse isn't supported.
> * OneLake staging isn't currently supported.

### Eventstream support

Manage eventstreams in workspaces enabled with private links by using the Fabric portal or REST APIs to create eventstream items and view their topology.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Create and manage an eventstream](/fabric/real-time-intelligence/event-streams/create-manage-an-eventstream)         |     [Items - REST API (Eventstream)](/rest/api/fabric/eventstream/items)<br>[Topology - Get Eventstream Topology](/rest/api/fabric/eventstream/topology/get-eventstream-topology) |

Eventstream APIs use a graph-like structure to define an Eventstream item, which consists of four components: source, destination, operator, and stream. 

Currently, Eventstream only supports Workspace Private Link for a limited set of sources and destinations. If you include an unsupported component in the Eventstream API payload, the request may fail.

Unsupported scenarios:
* Custom Endpoint as a source is not supported.
* Custom Endpoint as a destination is not supported.
* Eventhouse as a destination (with direct ingestion mode) is not supported.
* Activator as a destination is not supported.

### Eventhouse support

Manage eventhouses in workspaces enabled with private links by using the Fabric portal or REST API.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Create an eventhouse](/fabric/real-time-intelligence/event-houses/create-eventhouse)  | [Items (Eventhouse)](/rest/api/fabric/eventhouse/items) |

Unsupported scenarios:

* Consuming events from Eventstreams 
* SQL Server TDS endpoints 

### Dataflows Gen2 (CI/CD) support

Manage Dataflows Gen2 in workspaces enabled with private links by using the Fabric portal or REST API.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Dataflow Gen2 default destination](/fabric/data-factory/default-destination)         |[Public APIs capabilities for Dataflows Gen2 in Fabric Data Factory (Preview)](/fabric/data-factory/dataflow-gen2-public-apis)         |

A virtual network data gateway must be used for every dataflow connector. The virtual network data gateway must reside in the same virtual network as the workspace-level private link endpoint used by the workspace. 

### Variable library support

Manage variable libraries in workspaces enabled with private links by using the Fabric portal or REST API.

|Fabric portal  |REST APIs  |
|---------|---------|
|[Create and manage variable libraries](/fabric/cicd/variable-library/get-started-variable-libraries)         |[Items (VariableLibrary)](/rest/api/fabric/variablelibrary/items)         |



### Mirrored database support

You can manage mirrored databases in workspaces enabled with private links by using the following REST APIs:

* [Fabric Mirroring Public REST API](/fabric/database/mirrored-database/mirrored-database-rest-api)
* [Items - REST API (MirroredDatabase)](/rest/api/fabric/mirroreddatabase/items)

> [!NOTE]
> * Currently, workspace-level private link is supported for [open mirroring](/fabric/database/mirrored-database/open-mirroring) and [Azure Cosmos DB mirroring](/fabric/database/mirrored-database/azure-cosmos-db). For other types of database mirroring, if your workspace is configured to deny inbound public access, active mirrored databases enter a paused state, and mirroring can't be started. 
> * For open mirroring, when your workspace is configured to deny inbound public access, ensure the publisher writes data into the OneLake landing zone via a private link with workspace FQDN.

## Supported and unsupported tools

- You can use either the Fabric portal or the REST API to manage all [supported item types](#supported-item-types-for-workspace-level-private-link) in workspaces with private links enabled. If a workspace allows public access, the Fabric portal continues to function using public connectivity. If a workspace is configured to deny inbound public access, the Fabric portal displays an **Access restricted** page.
- Direct deeplinks to a Monitoring hub Level 2 (L2) page might not work as expected when using workspace-level private links. You can access the L2 page by first navigating to the Monitoring hub's Level 1 (L1) page in the Fabric portal.
- SQL Server Management Studio (SSMS) is supported for connecting to warehouses via workspace-level private link.
- Storage Explorer can be used with workspace-level private links.
- Azure Storage Explorer, PowerShell, AzCopy, and other Azure Storage tools can connect to OneLake via a private link.
- To use OneLake File Explorer, you must have access to your tenant, either via public access or a tenant private link.  

## Considerations and limitations

- The workspace-level private link feature is only supported in a Fabric capacity (F SKU). Other capacities, such as premium (P SKU) and trial capacities, aren't supported.
- A workspace can't be deleted if an existing private link service is set up for it.
- Only one private link service can be created per workspace, and each workspace can have only one private link service. However, multiple private endpoints can be created for a single private link service.
- The limit of private endpoints for a workspace is 100. Create a support ticket if you need to increase this limit.
- Limit of workspace PLS you can create per tenant: 500. Create a support ticket if you need to increase this limit.
- Up to 10 workspace private link services can be created per minute.
- For Data Engineering workloads:
   - To query Lakehouse files or tables from a workspace that has workspace-level private link enabled, you must create a cross-workspace managed private endpoint connection to access resources in the other workspace. <!--For instructions, see [Cross workspace communication](security-cross-workspace-communication.md).-->
   - You can use either relative or full paths to query files or tables within the same workspace, or use a cross-workspace managed private endpoint connection to access them from another workspace.
- You could run into Spark issues in the following regions when outbound access protection is enabled for the workspace: Mexico Central, Israel Central, and Spain Central.
- Dataflows currently don't support using a Fabric Warehouse or Fabric Lakehouse in the same workspace as either a data source or an output destination.
- Current limitations for Private Link with an eventhouse:
   - Copilot features: Machine learning workloads might experience limited functionality due to a known regression.
   - Eventstream pull: Eventstream workloads don't currently support full polling functionality.
   - Fabric doesn't currently support Event Hub integration.
   - Queued ingestion via OneLake isn't currently available.

## Common errors and troubleshooting

### Request denied by inbound policy

When trying to access a workspace configured to restrict public access, users encounter the following error:

```
   "errorCode": "RequestDeniedByInboundPolicy",
   "message": "Request is denied due to inbound communication policy"
```

* **Cause**: This error occurs when the request is made from a network location that the workspace's communication policy doesn't allow.

* **Mitigation**: 

   1. Check if you are in the allowed network location. 
   1. When using a workspace-level private link to access the workspace, ensure you're using workspace FQDN.

### Unsupported items in a workspace

When trying to set a workspace to restrict public access, users encounter the following error:

```
   "errorCode": "InboundRestrictionNotEligible",
   "message": "This workspace contains items that do not comply with requested policy"
```

* **Cause**: This error occurs because the workspace contains one or more items that aren't compatible with workspace-level private links. As a result, you can't configure the workspace to restrict public access.

* **Mitigation**: Delete the unsupported items in this workspace or use another workspace instead.

## Related content

* [About private links](./security-private-links-overview.md)
* [Set up and use workspace-level private links](./security-workspace-level-private-links-set-up.md)
<!--* [Microsoft Fabric multi-workspace APIs](./security-fabric-multi-workspace-api-overview.md)-->
