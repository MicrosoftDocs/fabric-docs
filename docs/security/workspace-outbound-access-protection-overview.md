---
title: Workspace outbound access protection overview
description: "This article describes workspace outbound access protection in Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview
ms.date: 02/09/2026

#customer intent: As a Fabric administrator, I want to control and secure outbound connections from workspace artifacts so that I can protect organizational data and ensure compliance with security policies.

---

# Workspace outbound access protection

Workspace outbound access protection in Microsoft Fabric lets admins secure the outbound data connections from items in their workspaces to external resources. With this feature, admins can block all outbound connections, and then allow only approved connections to external resources through secure connections. You have granular control over your organization's data security because you can restrict connectivity for specific workspaces while allowing others to maintain open access.

This article provides an overview of workspace outbound access protection and its configuration options.

> [!NOTE]
> In addition to outbound access protection, Microsoft Fabric provides *inbound* security by supporting private links. Learn more about configuring private links at the [tenant level](security-private-links-overview.md) and the [workspace level](security-workspace-level-private-links-overview.md).

## How is outbound access controlled at the workspace level?

When outbound access protection is enabled for a workspace, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to permit specific outbound connections. There are two options for allowing outbound access:

* **Managed private endpoints**, which are network connections that let you securely link workspace items to supported external data sources over private virtual networks. You can also connect to other workspaces within the same tenant by using managed private endpoints in conjunction with the Private Link service. Managed private endpoints are supported for Data Engineering and OneLake workloads.

* **Data connection rules**, which are policies that permit workspace items to access external services through specific cloud connections or gateway connections. Admins control outbound connectivity by explicitly allowing or blocking connectors. Data connection rules are supported for Data Factory workloads and mirrored databases.

The following sections explain these options in more detail.

### Using managed private endpoints to allow outbound access

For Data Engineering and OneLake workloads, admins can use managed private endpoints to create an allow list of approved external resources that can be accessed from the workspace. By default, all outbound connections are blocked when outbound access protection is enabled. Admins can then configure managed private endpoints to explicitly allow connections to resources outside of the workspace.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection with managed private endpoints." border="false":::

In this diagram:

* Workspace A and Workspace B both have outbound access protection enabled. They can connect to all the resources that support private endpoints through a managed private endpoint from the workspace to the destination. For example, Workspace A can connect to the SQL server because it has a managed private endpoint set up to the SQL server.

* A workspace with outbound access protection enabled can connect to another workspace in the same tenant. In this scenario, a managed private endpoint is configured in the source workspace pointing to the target workspace, and the Private Link service is enabled on the target workspace. In the diagram, Workspace B connects to Workspace C using this setup, allowing items in Workspace B (such as shortcuts) to access data in Workspace C (such as lakehouses).

* Multiple workspaces can connect to the same source by setting up managed private endpoints. For example, both Workspace A and Workspace B can connect to the SQL server because managed private endpoints are set up for each of them for this SQL server.

### Using data connection rules to allow outbound access

For Data Factory workloads, admins can use data connection rules to create an allow list of approved connectors that can be used within the workspace. When outbound access protection is enabled, all connectors are blocked by default. Admins can then explicitly allow specific connectors, creating an allow list of approved connections that workspace items can use to access external services.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-connectors.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-connectors.png" alt-text="Diagram of workspace outbound access protection with data connection rules." border="false":::

In the diagram, outbound access protection is enabled in Workspace A. Data connection rules are also configured in Workspace A, which allow specific cloud or gateway connections. The Dataflow in Workspace A can access SQL Server and ADLS Gen2 Storage through these allowed connectors, while all other outbound connections remain blocked.

## Supported item types

The following table summarizes the supported workloads and item types that can be protected using workspace outbound access protection.

| Workload | Exception (allow list) mechanism | Supported items | More information |
|--|--|--|--|
| Data Engineering | Managed private endpoints | <ul><li>Lakehouses</li><li>Notebooks</li><li>Spark Job Definitions</li><li>Environments</li></ul> | [Workspace outbound access protection for data engineering workloads](workspace-outbound-access-protection-data-engineering.md) |
| Data Factory | Data connection rules | <ul><li>Data Flows Gen2 (with CICD)</li><li>Pipelines</li><li>Copy Jobs</li></ul> | [Workspace outbound access protection for Data Factory](workspace-outbound-access-protection-data-factory.md) |
| Data Warehouse | Not applicable | <ul><li>Warehouses</li><li>SQL analytics endpoints</li></ul> | [Workspace outbound access protection for data warehouse workloads](workspace-outbound-access-protection-data-warehouse.md) |
| Mirrored databases | Data connection rules | Microsoft Fabric mirrored databases from:<ul><li>Azure SQL Database</li><li>Snowflake</li><li>Mirrored Database</li><li>Azure Cosmos DB</li><li>Azure SQL Managed Instance</li><li>Azure Database for PostgreSQL</li><li>SQL Server</li><li>Oracle</li><li>Google Big Query</li></ul> | [Workspace outbound access protection for mirrored databases](workspace-outbound-access-protection-mirrored-databases.md) |
| OneLake | Managed private endpoints | <ul><li>OneLake shortcuts</li></ul> | [Workspace outbound access protection for OneLake](workspace-outbound-access-protection-onelake.md) |

## Considerations and limitations

This section outlines important considerations and limitations when using workspace outbound access protection.

### Regions

* Outbound access protection is only available in regions where Fabric Data Engineering workloads are supported. For more information, see [Overview of managed private endpoints for Microsoft Fabric](security-managed-private-endpoints-overview.md#limitations-and-considerations).

### Licensing and capacity

* Outbound access protection only supports workspaces hosted on Fabric SKUs. Other capacity types and F SKU trials aren't supported.

* Ensure you re-register the `Microsoft.Network` feature on your subscription in the Azure portal.

### Workspaces with unsupported artifacts

* If a workspace contains unsupported artifacts, workspace admins can't enable outbound access protection until those artifacts are removed.

* If outbound access protection is enabled on a workspace, workspace admins can't add unsupported artifacts. Outbound access protection must be disabled first, and then workspace admins can add unsupported artifacts.

### General limitations

* Workspace outbound access protection isn't supported for existing workspaces that already contain a semantic model in a lakehouse.

* In workspaces with outbound access protection enabled, querying data warehouse file paths from notebooks using the `dbo` schema isn't supported, because access to schema-based paths isn't supported. To query the warehouse from notebooks, use the T-SQL option instead.

* The Fabric portal UI doesn't currently support enabling both inbound protection (workspace-level private links) and outbound access protection at the same time for a workspace. To configure both settings together, use the [Workspaces - Set Network Communication Policy API](/rest/api/fabric/core/workspaces/set-network-communication-policy?tabs=HTTP), which allows full management of inbound and outbound protection policies.

* Workspace outbound access protection isn't currently compatible with [OneLake Diagnostics](/fabric/onelake/onelake-diagnostics-overview). If you require OneLake diagnostics and outbound access protection to work together, you must select a lakehouse in the same workspace.

* Workspace outbound access protection isn't currently compatible with [Fabric external data sharing](/fabric/governance/external-data-sharing-overview). Cross-tenant allow lists aren't supported with workspace outbound access protection. 

### Data connection rules

#### Fabric portal limitation with private links

The Fabric portal UI doesn't currently support configuring data connection rules if private links are enabled at either the workspace or tenant level. To set up outbound access protection with data connection rules when private links are enabled, use the Outbound Gateway Rules REST API ([learn more](workspace-outbound-access-protection-allow-list-connector.md#how-to-create-an-allow-list-using-data-connection-rules)).

#### Region availability limitation

Data connection rules aren't yet available in the following region:

* Qatar Central

#### Internal (Fabric) connection types with workspace-level granularity

Workspace admins can specify which workspaces are allowed as destinations for certain item types. For example, under the Lakehouse connection type, admins can add workspaces to an allow list, enabling Lakehouses in those workspaces to be accessed. The following Fabric connection types support workspace-level granularity:

   * Lakehouse
   * Warehouse
   * Dataflows
   * Fabric SQL Database

Other Fabric connection types, such as Datamarts, KQL Database, Fabric Data Pipelines, and CopyJob, don't support workspace-level granularity. For these connection types, admins can't specify individual workspaces in the allow list.

#### External connection types with endpoint granularity

Some external connection types, such as SQL Server, Azure Data Lake Gen2, Azure Databricks, and Web, support endpoint-level granularity. Workspace admins can specify approved endpoints as exceptions, allowing outbound connections only to those endpoints.

#### Summary of connector granularity

The following table summarizes the level of granularity supported by different connector types for outbound access protection.

* *Endpoint* means you can allow access to specific external endpoints. 
* *Workspace* means you can allow access to specific workspaces.

| Connector type                  | Granularity|
|---------------------------------|------------|
| Web                             | Endpoint   |
| SharePoint                      | Endpoint   |
| AnalysisServices                | Endpoint   |
| SQL Server                      | Endpoint   |
| OData                           | Endpoint   |
| AzureDataLakeStorage            | Endpoint   |
| AzureBlobs                      | Endpoint   |
| Dataflows                       | Workspace  |
| Snowflake                       | Endpoint   |
| PostgreSQL                      | Endpoint   |
| Databricks                      | Endpoint   |
| HttpServer                      | Endpoint   |
| RestService                     | Endpoint   |
| Amazon S3                       | Endpoint   |
| Web v2                          | Endpoint   |
| My SQL                          | Endpoint   |
| Dataverse CommonDataService     | Endpoint   |
| Lakehouse                       | Workspace  |
| Warehouse                       | Workspace  |
| Fabric SQL Database             | Workspace  |

## Tenant admin API for workspace network policies

Fabric administrators can monitor and audit the network communication policies configured across workspaces in their tenant using the **Workspaces - List Networking Communication Policies** admin API. This API provides visibility into which workspaces have inbound or outbound access protection enabled and what specific policies are configured. The caller must be a Fabric administrator or authenticate using a service principal, and the API requires the `Tenant.Read.All` or `Tenant.ReadWrite.All` permissions. For detailed API documentation including request format, response schema, and examples, see [Workspaces - List Networking Communication Policies](/rest/api/fabric/admin/workspaces/list-networking-communication-policies).

### Key capabilities

The API allows administrators to:

* **View all protected workspaces**: Retrieve a list of all workspaces that have inbound or outbound access protection enabled in the tenant.
* **Audit security configurations**: Review the specific inbound and outbound policies configured for each workspace, including default actions and exception rules.
* **Monitor compliance**: Verify that workspace network policies align with organizational security requirements and governance standards.
* **Support security operations**: Enable automated security audits, compliance checks, and reporting workflows.

### Returned information

For each workspace with access protection enabled, the API returns:

* **Workspace ID**: The unique identifier of the workspace
* **Inbound policies**: Public access rules (Allow or Deny)
* **Outbound policies**: 
  * Public access rules (Allow or Deny)
  * Connection rules with allowed endpoints or workspaces
  * Gateway rules with allowed gateways
  * Git access rules

## Next steps

- [Manage admin access to outbound access protection settings](./workspace-outbound-access-protection-tenant-setting.md)
- [Enable workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
