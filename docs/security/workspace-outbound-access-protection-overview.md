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

## Restricting outbound access at the workspace level

Workspace-level outbound access protection lets you control which external resources items in the workspace can access. When outbound access protection is enabled, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to grant access only to approved destinations by configuring managed private endpoints or connectors:

* **Managed private endpoints**: Managed private endpoints are secure connections that link the workspace to specific resources in a virtual network. By setting up managed private endpoints, workspace admins can allow items in the workspace to connect to these resources while blocking all other outbound connections.

* **Connectors**: Connectors are pre-configured integrations that enable items in the workspace to connect to various external services and data sources. By configuring an allowlist of approved connectors, workspace admins can control which external services items in the workspace can access.

The following sections explain these options in more detail.

### Using managed private endpoints to allow outbound access 

In a workspace with outbound access protection enabled, admins can set up managed private endpoints to allow access to external resources through a virtual network. By default, all outbound access is blocked, but admins can configure managed private endpoints to explicitly allow connections to resources outside of the workspace.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-endpoints.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection." border="false":::

In the preceding diagram:

* The outbound access protection enabled workspace can connect to all the resources that support private endpoints by setting up a managed private endpoint from the workspace to the destination. For example, in the preceding diagram, Workspace A (outbound access protection enabled) can connect to the SQL server because it has a managed private endpoint set up to the SQL server.

* The outbound access protection enabled workspace can also connect to another workspace within the same tenant if a managed private endpoint is established from the source to the target workspace. For example, in the diagram, Workspace B has a managed private endpoint configured to workspace C. This managed private endpoint allows items in Workspace B (for example shortcuts) to reference the data in Workspace C (for example, in a lakehouse).

* Multiple workspaces can connect to the same source by setting up managed private endpoints. For example, in the diagram, both Workspace A and Workspace B can connect to the SQL server because managed private endpoints are set up for each of them for this SQL server.

### Using connectors to allow outbound access

In a workspace with outbound access protection enabled, another method for allowing outbound access is through connectors. Admins can specify which connectors are permitted to be used within the workspace. By default, all connectors are blocked until they are explicitly allowed.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-connectors.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection." border="false":::

In the preceding diagram:

* Workspace A (outbound access protection enabled) can connect to the SQL server because the SQL connector is allowed in the connector allowlist. However, Workspace A cannot connect to the Cosmos DB because the Cosmos DB connector is not in the allowlist.

## Supported item types

Workspace outbound access protection works with the following item types.

OneLake

* OneLake shortcuts

Data Engineering

* Lakehouses
* Notebooks
* Spark Job Definitions
* Environments
* Warehouses

Data Factory

* Data Flows Gen2 (with CICD)
* Data Pipelines
* Copy Jobs

For information about workspace outbound access protection scenarios across the various supported item types, see [Workspace outbound access - scenarios](./workspace-outbound-access-protection-scenarios.md).


## Considerations and limitations


The following limitations apply when using workspace outbound access protection:

* Workspace outbound access protection isn't supported for existing workspaces that already contain a semantic model in a lakehouse.
* Outbound access protection is only available in regions where Fabric Data Engineering workloads are supported. For more information, see [Overview of managed private endpoints for Microsoft Fabric](security-managed-private-endpoints-overview.md#limitations-and-considerations).
* Outbound access protection only supports workspaces hosted on Fabric SKUs. Other capacity types and F SKU trials aren't supported.
* If a workspace contains unsupported artifacts, workspace admins can't enable outbound access protection until those artifacts are removed.
* If outbound access protection is enabled on a workspace, workspace admins can't add unsupported artifacts. Outbound access protection must be disabled first, and then workspace admins can add unsupported artifacts.
* If the workspace is part of Deployment Pipelines, workspace admins can't enable outbound access protection because Deployment Pipelines are unsupported. Similarly, if outbound access protection is enabled, the workspace can't be added to Deployment Pipelines.<!--check with PM-->
* If your workspace has outbound access protection enabled, it uses managed virtual networks (VNETs) for Spark. In this case, Starter pools are disabled, and you should expect Spark sessions to take 3 to 5 minutes to start.
* With outbound access protection, all public access from Spark is blocked. This restriction prevents users from downloading libraries directly from public channels like PyPI using pip. To install libraries for their Data Engineering jobs, users have two options:
   * Reference library packages from a data source connected to the Fabric workspace via a managed private endpoint.
   * Upload wheel files for their required libraries and dependencies (that aren’t already included in the prebaked runtime).
* Enabling outbound access protection blocks all public access from your workspace. Therefore, to query a Lakehouse from another workspace, you must create a cross-workspace managed private endpoint to allow the Spark jobs to establish a connection.
* Using fully qualified paths with workspace and Lakehouse names can cause a socket timeout exception. To access files, use relative paths for the current Lakehouse or use a fully qualified path with the Workspace and Lakehouse GUIDs.
* Use the correct file path formats when referencing files in a lakehouse.
   * For files within the current lakehouse, use *relative paths*, for example:

      `Files/people.csv`

   * When accessing files across workspaces or when absolute paths are required, use *fully qualified paths* with GUIDs, including your workspace ID and lakehouse ID, for example:

      `Path: abfss://<YourWorkspaceID>@onelake.dfs.fabric.microsoft.com/<YourLakehouseID>/Files/people.csv`

   * Avoid using workspace or lakehouse display names in fully qualified paths, as Spark sessions can't resolve them and might result in socket timeout errors. Example of an **incorrect** file path:

      `Path: abfss://<YourWorkspace>@onelake.dfs.fabric.microsoft.com/<YourLakehouse>.Lakehouse/Files/people.csv`

* Outbound access protection isn't supported for schema enabled lakehouses.
* Ensure you re-register the `Microsoft.Network` feature on your subscription in the Azure portal.
* Outbound access protection doesn't protect from data exfiltration via inbound requests, such as GET requests made as part of external AzCopy operations to move data out of a workspace. To protect your data from unauthorized inbound requests, see [Protect inbound traffic](protect-inbound-traffic.md).


## Related content

- [Set up workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)
