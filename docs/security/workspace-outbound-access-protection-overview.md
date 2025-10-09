---
title: Workspace outbound access protection overview
description: "This article describes workspace outbound access protection in Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview
ms.date: 10/03/2025

#customer intent: As a Fabric administrator, I want to control and secure outbound connections from workspace artifacts so that I can protect organizational data and ensure compliance with security policies.

---

# Workspace outbound access protection

Workspace outbound access protection in Microsoft Fabric lets admins secure the outbound data connections from items in their workspaces to external resources. With this feature, admins can block all outbound connections, and then allow only approved connections to external resources through secure links between Fabric and virtual networks. You have granular control over your organization's data security because you can restrict connectivity for specific workspaces while allowing others to maintain open access.

This article provides an overview of workspace outbound access protection and its configuration options.

> [!NOTE]
> For *inbound* security, Fabric supports private links at the [tenant level](security-private-links-overview.md) and at the [workspace level](security-workspace-level-private-links-overview.md).

### How is outbound access restricted at the workspace level?

Workspace-level outbound access protection lets you control which external resources items in the workspace can access. When outbound access protection is enabled, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to grant access only to approved destinations by configuring managed private endpoints or connectors:

* **Managed private endpoints**: Secure connections that let workspace items access approved resources in a virtual network while blocking all other outbound connections.

* **Data connection rules**: Pre-configured integrations that let workspace items access approved external services. Admins control access by allowlisting specific connectors.

The following sections explain these options in more detail.

### Using managed private endpoints to allow outbound access 

In a workspace with outbound access protection enabled, admins can set up managed private endpoints to allow access to external resources through a virtual network. By default, all outbound access is blocked, but admins can configure managed private endpoints to explicitly allow connections to resources outside of the workspace.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-endpoints.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection with managed private endpoints." border="false":::

In the preceding diagram:

* The outbound access protection enabled workspace can connect to all the resources that support private endpoints by setting up a managed private endpoint from the workspace to the destination. For example, in the preceding diagram, Workspace A (outbound access protection enabled) can connect to the SQL server because it has a managed private endpoint set up to the SQL server.

* The outbound access protection enabled workspace can also connect to another workspace within the same tenant if a managed private endpoint is established from the source to the target workspace. For example, in the diagram, Workspace B has a managed private endpoint configured to workspace C. This managed private endpoint allows items in Workspace B (for example shortcuts) to reference the data in Workspace C (for example, in a lakehouse).

* Multiple workspaces can connect to the same source by setting up managed private endpoints. For example, in the diagram, both Workspace A and Workspace B can connect to the SQL server because managed private endpoints are set up for each of them for this SQL server.

### Using data connection rules to allow outbound access

In a workspace with outbound access protection enabled, another method for allowing outbound access is through connectors. Admins can specify which connectors are permitted to be used within the workspace. By default, all connectors are blocked until they are explicitly allowed.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-connectors.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection with data connection rules." border="false":::

In the preceding diagram:

* Workspace A (outbound access protection enabled) can connect to the SQL server because the SQL connector is allowed in the connector allowlist. However, Workspace A cannot connect to the Cosmos DB because the Cosmos DB connector is not in the allowlist.

## Supported item types

The following table summarizes the supported workloads and item types that can be protected using workspace outbound access protection.

|Workload  |Supported items  |More information  |
|---------|---------|---------|
|OneLake     |<ul><li>OneLake shortcuts</li></ul>         |[Workspace outbound access protection for OneLake](workspace-outbound-access-protection-onelake.md)         |
|Data Engineering     |<ul><li>Lakehouses</li><li>Notebooks</li><li>Spark Job Definitions</li><li>Environments</li><li>Warehouses</li></ul>         |[Workspace outbound access protection for data engineering workloads](workspace-outbound-access-protection-data-engineering.md)         |
|Data Factory     |<ul><li>Data Flows Gen2 (with CICD)</li><li>Data Pipelines</li><li>Copy Jobs</li></ul>         |[Workspace outbound access protection for Data Factory](workspace-outbound-access-protection-data-factory.md)         |

## Considerations and limitations

The following limitations apply when using workspace outbound access protection:

### Regions

* Outbound access protection is only available in regions where Fabric Data Engineering workloads are supported. For more information, see [Overview of managed private endpoints for Microsoft Fabric](security-managed-private-endpoints-overview.md#limitations-and-considerations).

### Licensing and capacity

* Outbound access protection only supports workspaces hosted on Fabric SKUs. Other capacity types and F SKU trials aren't supported.

* Ensure you re-register the `Microsoft.Network` feature on your subscription in the Azure portal.

### Workspaces with unsupported artifacts

* If a workspace contains unsupported artifacts, workspace admins can't enable outbound access protection until those artifacts are removed.

* If outbound access protection is enabled on a workspace, workspace admins can't add unsupported artifacts. Outbound access protection must be disabled first, and then workspace admins can add unsupported artifacts.

* If the workspace is part of Deployment Pipelines, workspace admins can't enable outbound access protection because Deployment Pipelines are unsupported. Similarly, if outbound access protection is enabled, the workspace can't be added to Deployment Pipelines.

### General limitations

* Workspace outbound access protection isn't supported for existing workspaces that already contain a semantic model in a lakehouse.

* Outbound access protection isn't supported for schema enabled lakehouses.

#### Data connection rule limitations

##### Internal (Fabric) connection types with workspace-level granularity: 

Workspace admins can specify which workspaces are allowed as destinations for certain item types. For example, under the Lakehouse connection type, admins can add specific workspaces to the allowlist, enabling Lakehouses in those workspaces to be accessed. The following Fabric connection types support workspace-level granularity in the allowlist:

   * Lakehouse
   * Warehouse
   * Dataflows
   * Fabric SQL Database

Other Fabric connection types, such as Datamarts, KQL Database, Fabric Data Pipelines, and CopyJob, do not support workspace-level granularity. For these connection types, admins cannot specify individual workspaces in the allowlist.

##### External connection type endpoint granularity

Some external connection types support endpoint-level granularity, such as SQL Server, Azure Data Lake Gen2, Azure Databricks, and Web. When configuring these connection types, workspace admins can add specific endpoint exceptions in the exception box if the connection type supports endpoint granularity. This allows admins to permit outbound connections only to approved endpoints.

## Related content

- [Set up workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)
