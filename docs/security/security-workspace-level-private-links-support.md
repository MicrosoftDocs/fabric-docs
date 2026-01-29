---
title: Supported scenarios for workspace private links
description: Find information and links for supported and unsupported workspace-level private link scenarios.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: overview
ms.custom:
ms.date: 10/22/2025

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
* Notebook, Spark job definition, Environment
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

The following item types aren't currently supported in workspaces enabled with workspace-level private links:

* Deployment pipelines
* Default semantic models

If a workspace contains any unsupported item types, inbound public access can't be restricted for the workspace, even if workspace-level private link is set up. 

Similarly, if a workspace is already configured to restrict inbound public access, unsupported item types can't be created in that workspace.

When working with unsupported item types, be aware of the following considerations.

* **Deployment pipelines:** When a workspace is assigned to a deployment pipeline, it can't be configured to block public access, as deployment pipelines don't currently support workspace-level private links.

* **Default semantic models:** Existing lakehouses, warehouses, and mirrored databases use a default semantic model that doesn't support workspace-level private links, which prevents you from blocking public access to the workspace. You can bypass this default semantic model limitation by configuring the workspace to block public access first, and then creating a lakehouse, warehouse, or mirrored database.

## Management options for supported item types

This section describes how you can manage supported item types in workspaces enabled with private links, using either the Fabric portal or REST APIs.

### Fabric Core support

APIs with endpoints containing `v1/workspaces/{workspaceId}` support workspace-level private links because they operate within the context of a specific workspace. In contrast, admin APIs use `admin/workspaces/{workspaceId}` in their endpoints and aren't covered by workspace-level private links. 
Admin APIs remain accessible even for restricted workspaces, because the tenant-level setting for blocking public access governs them.

* [Items - REST API (Core)](/rest/api/fabric/core/items): Also check individual item types for details.
* [Folders - REST API (Core)](/rest/api/fabric/core/folders)
* [Git - REST API (Core)](/rest/api/fabric/core/git)
* [Managed Private Endpoints - REST API (Core)](/rest/api/fabric/core/managed-private-endpoints) 
* [Job Scheduler - REST API (Core)](/rest/api/fabric/core/job-scheduler)
* [OneLake Data Access Security - Create Or Update Data Access Roles - REST API (Core)](/rest/api/fabric/core/onelake-data-access-security) 
* [OneLake Shortcuts - REST API (Core)](/rest/api/fabric/core/onelake-shortcuts)
    * From a restricted workspace, you can create shortcuts to other data sources such as external storage, or through trusted access.
    * When you create a shortcut to another restricted workspace, you need to create a managed private endpoint and get approval from the target workspace private link service owner in Azure. For more information, see [Cross-workspace communication](security-cross-workspace-communication.md).
    * Shortcut transforms aren't currently supported in restricted workspaces.
* [Tags - REST API (Core)](/rest/api/fabric/core/tags)
* [Workspaces - REST API (Core)](/rest/api/fabric/core/workspaces)
* [External Data Shares Provider - REST API (Core)](/rest/api/fabric/core/external-data-shares-provider): The recipient needs to use the workspace fully qualified domain name (FQDN) to access the shared OneLake URL.

> [!NOTE]
> * **Network communication policy API:** Workspace-level network settings don't restrict the [workspaces network communication policy API](/rest/api/fabric/core/workspaces/set-network-communication-policy). This API remains accessible from public networks, even if public access to the workspace is blocked. Tenant-level network restrictions still apply. See also [Table 1. Access to workspace communication policy API based on tenant and private link settings](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace).
> * **Deployment pipelines:** If any workspace in a deployment pipeline is set to deny public access (restricted), deployment pipelines can't connect to that workspace. Configuring inbound restriction is blocked for any workspace that is assigned to a pipeline.
> * **Item sharing:** Item sharing isn't supported. If items are already shared with users, those users can no longer access the items using the shared links.

### Lakehouse support

Create and manage Lakehouses in workspaces enabled with private links by using the Fabric portal or REST APIs.

#### [Fabric portal](#tab/fabric-portal-1)
* [Create a Lakehouse](/fabric/data-engineering/create-lakehouse)
#### [REST API](#tab/rest-apis-1)
* [Lakehouse REST API](../data-engineering/lakehouse-api.md)
* [Items - REST API (Lakehouse)](/rest/api/fabric/lakehouse/items)
* [Livy Sessions - REST API (Lakehouse)](/rest/api/fabric/lakehouse/livy-sessions)
* [Tables - REST API (Lakehouse)](/rest/api/fabric/lakehouse/tables)
* [Background Jobs - REST API (Lakehouse)](/rest/api/fabric/lakehouse/background-jobs)
---

### Warehouse support

Create and manage warehouses in workspaces enabled with private links by using the Fabric portal or REST APIs.

#### [Fabric portal](#tab/fabric-portal-2)
* [Create a Warehouse](/fabric/data-warehouse/create-warehouse)
#### [REST API](#tab/rest-apis-2)
* [Warehouse REST API](/rest/api/fabric/warehouse/items)
* [Items - REST API (WarehouseSnapshot)](/rest/api/fabric/warehousesnapshot/items)
* To get the workspace private link service connection string for a warehouse:
   [Get Connection String - REST API (Warehouse)](/rest/api/fabric/warehouse/items/get-connection-string)
---

To use the warehouse connection string with a workspace-level private link, add z{xy} to the regular warehouse connection string. For example:

```http
https://{GUID}-{GUID}.z{xy}.datawarehouse.fabric.microsoft.com
```

Using the warehouse connection string, you can also access a warehouse via the SQL Tabular Data Stream (TDS) endpoint in tools such as SQL Server Management Studio.

### SQL Endpoint support

Find the workspace private link service connection string for a SQL Endpoint by using the Fabric portal or REST API.

#### [Fabric portal](#tab/fabric-portal-3)
* [Find the Connection String (SQL Endpoint)](/fabric/data-warehouse/how-to-connect#find-the-warehouse-connection-string)
#### [REST API](#tab/rest-apis-3)
* [Items - List SQL Endpoints](/rest/api/fabric/sqlendpoint/items/list-sql-endpoints)
* [Items - Get Connection String (SQL Endpoint)](/rest/api/fabric/sqlendpoint/items/get-connection-string)
---

### Notebook support

Manage notebooks in workspaces enabled with private links by using the Fabric portal or REST APIs.

#### [Fabric portal](#tab/fabric-portal-4)
* [How to use notebooks](/fabric/data-engineering/how-to-use-notebook)
#### [REST API](#tab/rest-apis-4)
* [Items - REST API (Notebook)](/rest/api/fabric/notebook/items)
* [Manage and run notebooks in a workspace](/fabric/data-engineering/notebook-public-api)
---

### Livy endpoint support

Use the Fabric portal or APIs in workspaces enabled with private links to create and execute statements or run batch jobs using Livy endpoints.

#### [Fabric portal](#tab/fabric-portal-5)
* [Manage Livy API endpoints](/fabric/data-engineering/get-started-api-livy)
#### [REST API](#tab/rest-apis-5)
* [Livy Sessions - REST API (Notebook)](/fabric/data-engineering/get-started-api-livy)
---

A *Livy session job* establishes a Spark session that remains active for the duration of your interaction with the Livy API. Livy sessions are ideal for interactive workloads. The session starts when you submit a job and remains available until you explicitly end it or the system terminates it after 20 minutes of inactivity. Multiple jobs can run within the same session, sharing state and cached data.

A *Livy batch job* involves submitting a Spark application for a single execution. Unlike a Livy session job, a batch job doesn't maintain a persistent Spark session. Each Livy batch job starts a new Spark session that ends when the job completes. This method is suitable for tasks that don't depend on cached data or require state to be maintained between jobs.

### Spark job definition support

Use the Fabric portal or the APIs in workspaces enabled with private links to create, read, update, and delete Spark job definition items.

#### [Fabric portal](#tab/fabric-portal-6)
* [Create Spark Job Definition](/fabric/data-engineering/create-spark-job-definition) 
#### [REST API](#tab/rest-apis-6)
* [Items - REST API (SparkJobDefinition)](/rest/api/fabric/sparkjobdefinition/items)
* Run batch jobs in a workspace with [Background Jobs - REST API (SparkJobDefinition)](/rest/api/fabric/sparkjobdefinition/background-jobs)
---

### Environment support

Manage environments in workspaces enabled with private links by using the Fabric portal, or use Environment REST APIs to create, read, update, and delete Environment items.

#### [Fabric portal](#tab/fabric-portal-7)
* [Create, configure, and use an environment](/fabric/data-engineering/create-and-use-environment)
#### [REST API](#tab/rest-apis-7)
* [Items - REST API (Environment)](/rest/api/fabric/environment/items)
* [Spark Compute - REST API (Environment)](/rest/api/fabric/environment/published/get-spark-compute)
* [Spark Libraries - REST API (Environment)](/rest/api/fabric/environment/published/list-libraries)
* [Custom Pools - REST API (Spark)](/rest/api/fabric/spark/custom-pools)
* [Livy Sessions - REST API (Spark)](/rest/api/fabric/spark/livy-sessions)
* [Workspace Settings - REST API (Spark)](/rest/api/fabric/spark/workspace-settings)
---

> [!NOTE]
> For Spark, workspace-level private links that use friendly names don't work.

### Machine learning experiment support

Manage machine learning experiments in workspaces enabled with private links by using the Fabric portal or REST API.

#### [Fabric portal](#tab/fabric-portal-8)
* [Machine learning experiments](/fabric/data-science/machine-learning-experiment)
#### [REST API](#tab/rest-apis-8)
* [Items - REST API (MLExperiment)](/rest/api/fabric/mlexperiment/items)
---

### Machine learning model support

Manage machine learning models in workspaces enabled with private links by using the [Items - REST API (MLModel)](/rest/api/fabric/mlmodel/items).


### Pipeline, Copy job, and Mounted Data Factory support

Manage pipelines, copy jobs, and mounted data factories in workspaces enabled with private links by using the Fabric portal or the following REST APIs.

#### [Fabric portal](#tab/fabric-portal-9)
* [Data pipeline](/fabric/data-factory/default-destination)
* [Copy job activity](/fabric/data-factory/copy-job-activity)
#### [REST API](#tab/rest-apis-9)
* [Items - REST API (DataPipeline)](/rest/api/fabric/datapipeline/items)
* [Items - REST API (CopyJob)](/rest/api/fabric/copyjob/items)
* [Items - REST API (MountedDataFactory)](/rest/api/fabric/mounteddatafactory/items)
* [Pipelines - REST API (Power BI Power BI REST APIs)](/rest/api/power-bi/pipelines)
---

The following scenarios are unsupported:

* Workspace staging is not supported for Fabric Data Warehouse, Snowflake, or Teradata connectors in Copy activity and Copy job. Use external staging as an alternative.
* Copy to Eventhouse isn't supported.


### Eventstream support

Manage eventstreams in workspaces enabled with private links by using the Fabric portal or REST APIs to create eventstream items and view their topology.

#### [Fabric portal](#tab/fabric-portal-10)
* [Create and manage an eventstream](/fabric/real-time-intelligence/event-streams/create-manage-an-eventstream)
#### [REST API](#tab/rest-apis-10)
* [Items - REST API (Eventstream)](/rest/api/fabric/eventstream/items)
* [Topology - Get Eventstream Topology](/rest/api/fabric/eventstream/topology/get-eventstream-topology)
---

Eventstream APIs use a graph-like structure to define an Eventstream item, which consists of four components: source, destination, operator, and stream. 

Currently, Eventstream only supports Workspace Private Link for a limited set of sources and destinations. If you include an unsupported component in the Eventstream API payload, the request may fail.

The following scenarios are unsupported:

* Custom Endpoint as a source isn't supported.
* Custom Endpoint as a destination isn't supported.
* Eventhouse as a destination (with direct ingestion mode) isn't supported.
* Activator as a destination isn't supported.

### Eventhouse support

Manage eventhouses in workspaces enabled with private links by using the Fabric portal or REST API.

#### [Fabric portal](#tab/fabric-portal-11)
* [Create an eventhouse](/fabric/real-time-intelligence/create-eventhouse)
#### [REST API](#tab/rest-apis-11)
* [Items - REST API (Eventhouse)](/rest/api/fabric/eventhouse/items)
---

The following scenarios are unsupported:

* Consuming events from Eventstreams 
* SQL Server TDS endpoints 

### Dataflows Gen2 (CI/CD) support

Manage Dataflows Gen2 in workspaces enabled with private links by using the Fabric portal or REST API.

A connection based on a virtual network data gateway must be used, including in the output destination. The virtual network data gateway must reside in the same virtual network as the workspace-level private link endpoint used by the workspace.

Power Platform Dataflow Connector: When a workspace has workspace private links enabled and public access denied, for any two dataflows in that workspace (dataflow A and dataflow B), neither dataflow will be able to connect to the other dataflow using the Power Platform Dataflow Connector, because the dataflow won't appear in the navigator.

#### [Fabric portal](#tab/fabric-portal-12)
* [Dataflow Gen2 default destination](/fabric/data-factory/default-destination)
#### [REST API](#tab/rest-apis-12)
* [Public APIs capabilities for Dataflows Gen2 in Fabric Data Factory (Preview)](/fabric/data-factory/dataflow-gen2-public-apis) 
---

### Variable library support

Manage variable libraries in workspaces enabled with private links by using the Fabric portal or REST API.

#### [Fabric portal](#tab/fabric-portal-13)
* [Create and manage variable libraries](/fabric/cicd/variable-library/get-started-variable-libraries)
#### [REST API](#tab/rest-apis-13)
* [Items - REST API (VariableLibrary)](/rest/api/fabric/variablelibrary/items)
---

### Mirrored database support

You can manage mirrored databases in workspaces enabled with private links by using the Fabric portal or REST API.

#### [Fabric portal](#tab/fabric-portal-14)
* [Mirrored database tutorials](/fabric/mirroring/overview)
#### [REST API](#tab/rest-apis-14)
* [Fabric Mirroring Public REST API](/fabric/mirroring/mirrored-database-rest-api)
* [Items - REST API (MirroredDatabase)](/rest/api/fabric/mirroreddatabase/items)
---

> [!NOTE]
> * Currently, workspace-level private link is supported for [open mirroring](/fabric/mirroring/open-mirroring), [Azure Cosmos DB mirroring](/fabric/mirroring/azure-cosmos-db), [Azure SQL Managed Instance mirroring](/fabric/mirroring/azure-sql-managed-instance) and [SQL Server 2025 mirroring](/fabric/mirroring/sql-server). For other types of database mirroring, if your workspace is configured to deny inbound public access, active mirrored databases enter a paused state, and mirroring can't be started.
> * For open mirroring, when your workspace is configured to deny inbound public access, ensure the publisher writes data into the OneLake landing zone via a private link with workspace FQDN.

## Supported and unsupported management tools

- You can use either the Fabric portal or REST API to manage all [supported item types](#supported-item-types-for-workspace-level-private-link) in workspaces with workspace private links enabled. When a workspace allows public access, the Fabric portal continues to function using public connectivity. If a workspace is configured to deny inbound public access, you can access it in the Fabric portal only when the request originates from the workspace's associated private endpoint. If access is attempted from public connectivity or from a different private endpoint, the Fabric portal displays an "Access Restricted" message. 
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
- The Fabric portal UI doesn't currently support enabling both inbound protection (workspace-level private links) and outbound access protection at the same time for a workspace. To configure both settings together, use the [Workspaces - Set Network Communication Policy API](/rest/api/fabric/core/workspaces/set-network-communication-policy?tabs=HTTP), which allows full management of inbound and outbound protection policies.
- For Data Engineering workloads:
   - To query Lakehouse files or tables from a workspace that has workspace-level private link enabled, you must create a cross-workspace managed private endpoint connection to access resources in the other workspace. <!--For instructions, see [Cross workspace communication](security-cross-workspace-communication.md).-->
   - You can use either relative or full paths to query files or tables within the same workspace, or use a cross-workspace managed private endpoint connection to access them from another workspace. To read files in a Lakehouse located in another workspace, use a fully qualified path that includes the workspace ID and lakehouse ID (not their display names). This approach ensures the Spark session can resolve the path correctly and avoids socket timeout errors. [Learn more](workspace-outbound-access-protection-data-engineering.md#understanding-file-path-behavior-in-fabric-notebooks).
- Current limitations for Private Link with an eventhouse:
   - Copilot features: Machine learning workloads might experience limited functionality due to a known regression.
   - Eventstream pull: Eventstream workloads don't currently support full polling functionality.
   - Fabric doesn't currently support Event Hub integration.
   - Queued ingestion via OneLake isn't currently available.
* The **OneLake Catalog - Govern** tab isn't available when Private Link is activated.
* **OneLake Security** isn't currently supported when a workspace-level private link is enabled for a workspace.
* Workspace monitoring isn't currently supported when a workspace-level private link is enabled for a workspace.

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
