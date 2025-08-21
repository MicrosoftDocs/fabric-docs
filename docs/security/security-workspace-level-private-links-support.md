---
title: Supported scenarios for workspace private links
description: Find information and links for supported and unsupported workspace-level private link scenarios.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: overview
ms.custom:
ms.date: 08/21/2025

#customer intent: As a workspace admin, I want to get more information about how to use workspace-level private link in supported and unsupported scenarios.

---

# Supported scenarios and limitations for workspace-level private links (preview)


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
* Data pipeline
* Copy Job
* Mounted Data Factory
* Warehouse 
* Dataflows Gen2 (CI/CD)
* Variable library
* Mirrored database

### Notes about unsupported item types

Review the following considerations when working with unsupported item types.

* Inbound Public access can't be restricted for a workspace if it contains unsupported items, even if workspace-level private link is set up.

* Unsupported item types can't be created in workspaces where inbound public access is restricted.

* When a workspace is assigned to a deployment pipeline, it can't be configured to block public access, as deployment pipelines don't currently support workspace-level private link.

* Existing lakehouses and warehouses use a default semantic model that doesn't support workspace-level private links, which prevents you from blocking public access to the workspace. You can bypass this default semantic model limitation by configuring the workspace to block public access first, and then creating a lakehouse or warehouse.

* Lakehouses with schemas aren't supported when a workspace-level private link is enabled for a workspace.

* Using fully qualified paths with workspace and lakehouse names can cause a socket timeout exception. To access files, use relative paths for the current lakehouse or use a fully qualified path with the workspace and lakehouse GUIDs. Use the following guidelines for correct path usage.

   * Incorrect path: 

     `Path: abfss://<YourWorkspace>@onelake.dfs.fabric.microsoft.com/<YourLakehouse>.Lakehouse/Files/people.csv`

     This path fails because the Spark session's default configuration can't resolve paths using display names.

   * Correct paths:

      * Relative path:

         `Path: Files/people.csv`

         Use this path for files within your current Lakehouse.

      * Fully Qualified Path (with GUIDs):

         `Path: abfss://<YourWorkspaceID>@onelake.dfs.fabric.microsoft.com/<YourLakehouseID>/Files/people.csv`

         Use this path to access data in a different workspace or when a fully qualified path is required.

* Spark connector for SQL DW isn't currently supported when a workspace-level private link is enabled for a workspace.

* Data Pipelines and Copy Jobs are generally supported. However, the following scenario isn't currently supported:

   * **Gateway-based connections:** Data Pipelines and Copy Jobs can't use connections that rely on an on-premises data gateway or a virtual network (VNet) data gateway infrastructure. This limitation applies specifically to gateway-dependent connections. Standard cloud-based connections continue to work normally with these features.

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

For a list of all APIs available for Lakehouse items, see [Manage lakehouse in Microsoft Fabric with REST API](../data-engineering/lakehouse-api.md).

You can also find relevant APIs here:

* [Items - REST API (Lakehouse)](/rest/api/fabric/lakehouse/items)
* [Livy Sessions - REST API (Lakehouse)](/rest/api/fabric/lakehouse/livy-sessions)
* [Tables - REST API (Lakehouse)](/rest/api/fabric/lakehouse/tables)
* [Background Jobs - REST API (Lakehouse)](/rest/api/fabric/lakehouse/background-jobs)

### Warehouse support

You can use these Warehouse APIs in workspace-level private link:

* [Items - REST API (Warehouse)](/rest/api/fabric/warehouse/items)
* [Items - REST API (WarehouseSnapshot)](/rest/api/fabric/warehousesnapshot/items)

You can obtain the workspace private link service connection string for a warehouse by using the following API:

* [Get Connection String - REST API (Warehouse)](/rest/api/fabric/warehouse/items/get-connection-string)

To use the warehouse connection string with workspace-level private link, add z{xy} to the regular warehouse connection string. For example

```http
https://{GUID}-{GUID}.z{xy}.datawarehouse.fabric.microsoft.com
```

Using the warehouse connection string, you can also access a warehouse via the SQL Tabular Data Stream (TDS) endpoint in tools such as SQL Server Management Studio.

### SQL Endpoint support

You can obtain the workspace private link service connection string for a SQL Endpoint by using the following API:

* [List SQL Endpoints](/rest/api/fabric/sqlendpoint/items/list-sql-endpoints)

* [Get Connection String - REST API (SQL Endpoint)](/rest/api/fabric/sqlendpoint/items/get-connection-string)

### Notebook support

You can use the APIs in workspaces enabled with private links to create, read, update, delete Notebook items.

* [Items - REST API (Notebook)](/rest/api/fabric/notebook/items)
  
To run notebooks in a workspace, refer to [Manage and run notebooks](/fabric/data-engineering/notebook-public-api)

### Livy endpoint support

You can use these APIs in workspaces enabled with private links to create and execute statements or run batch jobs using Livy endpoints.

* [Livy Sessions - REST API (Notebook)](/fabric/data-engineering/get-started-api-livy)

A Livy session job establishes a Spark session that remains active for the duration of your interaction with the Livy API. Livy sessions are ideal for interactive workloads. The session starts when you submit a job and remains available until you explicitly end it or the system terminates it after 20 minutes of inactivity. Multiple jobs can run within the same session, sharing state and cached data.

A Livy batch job involves submitting a Spark application for a single execution. Unlike a Livy session job, a batch job doesn't maintain a persistent Spark session. Each Livy batch job starts a new Spark session that ends when the job completes. This method is suitable for tasks that don't depend on cached data or require state to be maintained between jobs.

### Spark job definition support

You can use the APIs in workspaces enabled with private links to create, read, update, and delete Spark job definition items.

* [Items - REST API (SparkJobDefinition)](/rest/api/fabric/sparkjobdefinition/items)

To run batch jobs in a workspace, refer to the following documentation:

* [Background Jobs - REST API (SparkJobDefinition)](/rest/api/fabric/sparkjobdefinition/background-jobs)

### Environment support

* [Items - REST API (Environment)](/rest/api/fabric/environment/items)
* [Spark Compute - REST API (Environment)](/rest/api/fabric/environment/spark-compute)
* [Spark Libraries - REST API (Environment)](/rest/api/fabric/environment/spark-libraries)
* [Custom Pools - REST API (Spark)](/rest/api/fabric/spark/custom-pools)
* [Livy Sessions - REST API (Spark)](/rest/api/fabric/spark/livy-sessions)
* [Workspace Settings - REST API (Spark)](/rest/api/fabric/spark/workspace-settings)

> [!NOTE]
> For Spark, workspace-level private links that use friendly names don't work.

### Machine learning experiment support

* [Items - REST API (MLExperiment)](/rest/api/fabric/mlexperiment/items)

### Machine learning model support

* [Items - REST API (MLModel)](/rest/api/fabric/mlmodel/items)

### Data pipeline, Copy job, and Mounted Data Factory support

These APIs are supported in following scenarios: 

* [Items - REST API (DataPipeline)](/rest/api/fabric/datapipeline/items)
* [Items - REST API (CopyJob)](/rest/api/fabric/copyjob/items)
* [Items - REST API (MountedDataFactory)](/rest/api/fabric/mounteddatafactory/items)
* [Data pipelines - REST API (Power BI Power BI REST APIs)](/rest/api/power-bi/pipelines) 

> [!NOTE]
> * Copy to warehouse isn't supported.
> * Copy to Eventhouse isn't supported.
> * OneLake staging isn't currently supported.

### Eventhouse support

[Items - REST API (Eventhouse)](/rest/api/fabric/eventhouse/items)

Unsupported scenarios:

* Consuming events from Eventstreams 
* SQL Server TDS endpoints 

### Dataflows Gen2 (CI/CD) support

* [Public APIs capabilities for Dataflows Gen2 in Fabric Data Factory (Preview)](/fabric/data-factory/dataflow-gen2-public-apis)

A virtual network data gateway must be used for every dataflow connector. The virtual network data gateway must reside in the same virtual network as the workspace-level private link endpoint used by the workspace. 

### Variable library support

[Items - REST API (VariableLibrary)](/rest/api/fabric/variablelibrary/items)

### Mirrored database support

* [Fabric Mirroring Public REST API](/fabric/database/mirrored-database/mirrored-database-rest-api)
* [Items - REST API (MirroredDatabase)](/rest/api/fabric/mirroreddatabase/items)

> [!NOTE]
> * Currently, workspace-level private link is supported for [open mirroring](/fabric/database/mirrored-database/open-mirroring), [Azure Cosmos DB mirroring](/fabric/database/mirrored-database/azure-cosmos-db) and [SQL Server 2025 mirroring](/fabric/database/mirrored-database/sql-server) (using CTP 2.0 or higher version). For other types of database mirroring, if your workspace is configured to deny inbound public access, active mirrored databases enter a paused state, and mirroring can't be started. 
> * For open mirroring, when your workspace is configured to deny inbound public access, ensure the publisher writes data into the OneLake landing zone via a private link with workspace FQDN.

## Supported and unsupported tools

- Workspace-level private link connections are supported via REST API.
- The Fabric portal doesn't currently support workspace-level private links. If a workspace allows public access, the Fabric portal continues to function using public connectivity. If a workspace is configured to deny inbound public access, the Fabric portal displays an **Access restricted** page.
- SQL Server Management Studio is supported for connecting to warehouses via private link.
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
