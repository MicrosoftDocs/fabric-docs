---
title: Workspace outbound access protection overview
description: "This article describes workspace outbound access protection in Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview
ms.date: 11/26/2025

#customer intent: As a Fabric administrator, I want to control and secure outbound connections from workspace artifacts so that I can protect organizational data and ensure compliance with security policies.

---

# Workspace outbound access protection

Workspace outbound access protection in Microsoft Fabric lets admins secure the outbound data connections from items in their workspaces to external resources. With this feature, admins can block all outbound connections, and then allow only approved connections to external resources through secure connections. You have granular control over your organization's data security because you can restrict connectivity for specific workspaces while allowing others to maintain open access.

This article provides an overview of workspace outbound access protection and its configuration options.

> [!NOTE]
> In addition to outbound access protection, Microsoft Fabric provides *inbound* security by supporting private links. Learn more about configuring private links at the [tenant level](security-private-links-overview.md) and the [workspace level](security-workspace-level-private-links-overview.md).

## How is outbound access controlled at the workspace level?

When outbound access protection is enabled for a workspace, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to permit specific outbound connections. These exceptions are established using *managed private endpoints*, which are network connections that let you securely link workspace items to supported external data sources over private virtual networks. You can also connect to other workspaces within the same tenant by using managed private endpoints in conjunction with the Private Link service.

### Using managed private endpoints to allow outbound access

Admins can use managed private endpoints to create an allow list of approved external resources that can be accessed from the workspace. By default, all outbound connections are blocked when outbound access protection is enabled. Admins can then configure managed private endpoints to explicitly allow connections to resources outside of the workspace.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection with managed private endpoints." border="false":::

In this diagram:

* Workspace A and Workspace B both have outbound access protection enabled. They can connect to all the resources that support private endpoints through a managed private endpoint from the workspace to the destination. For example, Workspace A can connect to the SQL server because it has a managed private endpoint set up to the SQL server.

* A workspace with outbound access protection enabled can connect to another workspace in the same tenant. In this scenario, a managed private endpoint is configured in the source workspace pointing to the target workspace, and the Private Link service is enabled on the target workspace. In the diagram, Workspace B connects to Workspace C using this setup, allowing items in Workspace B to access data in Workspace C.

* Multiple workspaces can connect to the same source by setting up managed private endpoints. For example, both Workspace A and Workspace B can connect to the SQL server because managed private endpoints are set up for each of them for this SQL server.

## Supported item types

Workspace outbound access protection works with the following item types.

* Lakehouses
* Notebooks
* Spark Job Definitions
* Environments
* Warehouses

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

* If the workspace is part of Deployment Pipelines, workspace admins can't enable outbound access protection because Deployment Pipelines are unsupported. Similarly, if outbound access protection is enabled, the workspace can't be added to Deployment Pipelines.

### General limitations

* Workspace outbound access protection isn't supported for existing workspaces that already contain a semantic model in a lakehouse.

* In workspaces with outbound access protection enabled, querying data warehouse file paths from notebooks using the `dbo` schema isn't supported, because access to schema-based paths isn't supported. To query the warehouse from notebooks, use the T-SQL option instead.

* The Fabric portal UI doesn't currently support enabling both inbound protection (workspace-level private links) and outbound access protection at the same time for a workspace. To configure both settings together, use the [Workspaces - Set Network Communication Policy API](/rest/api/fabric/core/workspaces/set-network-communication-policy?tabs=HTTP), which allows full management of inbound and outbound protection policies.

## Next steps

- [Manage admin access to outbound access protection settings](./workspace-outbound-access-protection-tenant-setting.md)
- [Enable workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
