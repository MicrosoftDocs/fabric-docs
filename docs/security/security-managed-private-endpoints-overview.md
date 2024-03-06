---
title: Overview of managed private endpoints for Microsoft Fabric (preview)
description: Learn about managed private endpoints for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 02/28/2024
---

# Overview of managed private endpoints for Fabric (preview)

Managed private endpoints are feature that allows secure and private access to data sources from Fabric Spark workloads.

## What are Managed Private Endpoints?

* Managed private endpoints are connections that workspace admins can create to access data sources that are behind a firewall or that are blocked from accessing from the public internet.

* Managed private endpoints allow Fabric Spark workloads to securely access data sources without exposing them to the public network or requiring complex network configurations.

* The private endpoints provide a secure way to connect and access the data from these data sources using items such as notebooks and Spark job definitions. 

* Managed private endpoints are created and managed by Microsoft Fabric. By just specifying the resource ID of the data source and the target subresource, and a justification for private endpoint request for the data source admin, admins can set up the managed private endpoints from the workspace settings.

* Managed private endpoints support various data sources, such as Azure Storage, Azure SQL Database, Azure Synapse Analytics, Azure Cosmos DB, Application gateway, Azure Key Vault, and many more.

:::image type="content" source="./media/security-managed-private-endpoints-overview/managed_private_endpoint.gif" alt-text="Animated illustration showing the process of creating a managed private endpoint in Microsoft Fabric.":::

For more information about supported data sources for managed private endpoints in Fabric, see [Supported data sources](./security-managed-private-endpoints-create.md#supported-data-sources).

### Limitations and considerations

* **Starter Pools Limitation** : Workspaces with managed VNets cannot access Starter Pools. This includes workspaces using managed private endpoints or belonging to a Fabric tenant with Azure Private Links enabled, which have run Spark jobs. These workspaces rely on on-demand clusters, taking 3 to 5 minutes to start a session.
* **Managed Private Endpoints**: Supported only for Fabric Trial capacity and Fabric capacities F64 or higher.
* **Regional Compatibility**: Managed private endpoints function only in regions where Fabric Data Engineering workloads are available. Creating them in unsupported capacity regions results in errors.
* **Spark Job Resilience**: To prevent Spark job failures or errors, migrate workspaces with managed private endpoints to Fabric capacity SKUs of F64 or higher.
* **Lakehouse Table Maintenance**: Not supported for workspaces with managed private endpoints.
* **Managed VNET Association**: Deleting the last managed private endpoint does not allow Managed VNET deletion. Workspace admins creating and then deleting a managed private endpoint keep the workspace associated with a Managed VNET, preventing Starter Pools activation.
* **Workspace Migration**: Unsupported across capacities in different regions.

These limitations and considerations might affect your use cases and workflows. Take them into account before enabling the Azure Private Link tenant setting for your tenant.

## Related content

* [Create and use managed private endpoints](./security-managed-private-endpoints-create.md)
* [Overview of private links in Fabric](./security-private-links-overview.md)
* [Overview of managed virtual networks in Fabric](./security-managed-vnets-fabric-overview.md)
