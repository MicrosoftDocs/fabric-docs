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

Workspace outbound access protection in Microsoft Fabric lets admins secure the outbound data connections from items in their workspaces to external resources. With this feature, admins can block all outbound connections, and then allow only approved connections to external resources through secure connections. You have granular control over your organization's data security because you can restrict connectivity for specific workspaces while allowing others to maintain open access.

This article provides an overview of workspace outbound access protection and its configuration options.

> [!NOTE]
> For *inbound* security, Fabric supports private links at the [tenant level](security-private-links-overview.md) and at the [workspace level](security-workspace-level-private-links-overview.md).

## How is outbound access controlled at the workspace level?

When outbound access protection is enabled for a workspace, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to permit specific outbound connections. There are two options for allowing outbound access:

* **Managed private endpoints**, which are network connections that securely link workspace items to supported resources over private virtual networks. This method is supported for Data Engineering and OneLake workloads.

* **Data connection rules**, which are policies that permit workspace items to access external services through specific cloud connections or gateway connections. Admins control outbound connectivity by explicitly allowing or blocking connectors. This method is supported for Data Factory workloads.

The following sections explain these options in more detail.

### Using managed private endpoints to allow outbound access

For Data Engineering and OneLake workloads, admins can use managed private endpoints to create an allowlist of approved external resources that can be accessed from the workspace. By default, all outbound connections are blocked when outbound access protection is enabled. Admins can then configure managed private endpoints to explicitly allow connections to resources outside of the workspace.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection with managed private endpoints." border="false":::

In this diagram:

* Workspace A and Workspace B both have outbound access protection enabled. They can connect to all the resources that support private endpoints through a managed private endpoint from the workspace to the destination. For example, Workspace A can connect to the SQL server because it has a managed private endpoint set up to the SQL server.

* An outbound access protection enabled workspace can also connect to another workspace within the same tenant if a managed private endpoint is established from the source to the target workspace. For example, Workspace B has a managed private endpoint configured to workspace C. This managed private endpoint allows items in Workspace B (for example shortcuts) to reference the data in Workspace C (for example, in a lakehouse).

* Multiple workspaces can connect to the same source by setting up managed private endpoints. For example, both Workspace A and Workspace B can connect to the SQL server because managed private endpoints are set up for each of them for this SQL server.

### Using data connection rules to allow outbound access

For Data Factory workloads, admins can use data connection rules to create an allowlist of approved connectors that can be used within the workspace. By default, all connectors are blocked when outbound access protection is enabled. Admins can then specify which connectors are allowed to be used within the workspace.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-connectors.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection with data connection rules." border="false":::

In the diagram, outbound access protection is enabled in Workspace A. Data connection rules are also configured in Workspace A, which allow specific cloud or gateway connections. The Dataflow in Workspace A can access SQL Server and ADLS Gen2 Storage through these allowed connectors, while all other outbound connections remain blocked.

## Supported item types

The following table summarizes the supported workloads and item types that can be protected using workspace outbound access protection.

|Workload  |Supported items  |More information  |
|---------|---------|---------|
|OneLake     |<ul><li>OneLake shortcuts</li></ul>         |[Workspace outbound access protection for OneLake](workspace-outbound-access-protection-onelake.md)         |
|Data Engineering     |<ul><li>Lakehouses</li><li>Notebooks</li><li>Spark Job Definitions</li><li>Environments</li></ul>         |[Workspace outbound access protection for data engineering workloads](workspace-outbound-access-protection-data-engineering.md)         |
|Data Warehouse     |<ul><li>Data Warehouse</li></ul>         |[Workspace outbound access protection for data engineering workloads](workspace-outbound-access-protection-data-engineering.md)         |
|Data Factory     |<ul><li>Data Flows Gen2 (with CICD)</li><li>Pipelines</li><li>Copy Jobs</li></ul>         |[Workspace outbound access protection for Data Factory](workspace-outbound-access-protection-data-factory.md)         |

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

* In workspaces with outbound access protection enabled, querying data warehouse file paths from notebooks using the `dbo` schema isnt supported, because access to schema-based paths isn't supported. To query the warehouse from notebooks, use the T-SQL option instead.

### Data connection rule limitations

#### Internal (Fabric) connection types with workspace-level granularity

Workspace admins can specify which workspaces are allowed as destinations for certain item types. For example, under the Lakehouse connection type, admins can add specific workspaces to the allowlist, enabling Lakehouses in those workspaces to be accessed. The following Fabric connection types support workspace-level granularity in the allowlist:

   * Lakehouse
   * Warehouse
   * Dataflows
   * Fabric SQL Database

Other Fabric connection types, such as Datamarts, KQL Database, Fabric Data Pipelines, and CopyJob, don't support workspace-level granularity. For these connection types, admins can't specify individual workspaces in the allowlist.

#### External connection type endpoint granularity

Some external connection types support endpoint-level granularity, such as SQL Server, Azure Data Lake Gen2, Azure Databricks, and Web. When configuring these connection types, workspace admins can add specific endpoint exceptions in the exception box if the connection type supports endpoint granularity. This configuration allows admins to permit outbound connections only to approved endpoints.

## Next steps

- [Manage admin access to outbound access protection settings](./workspace-outbound-access-protection-tenant-setting.md)
- [Enable workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
