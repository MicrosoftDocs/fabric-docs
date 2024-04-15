---
title: Overview of managed private endpoints for Microsoft Fabric (preview)
description: Learn about managed private endpoints for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 03/06/2024
---

# Overview of managed private endpoints for Fabric (preview)

Managed private endpoints are feature that allows secure and private access to data sources from Fabric Spark workloads.

## What are Managed Private Endpoints?

* Managed private endpoints are connections that workspace admins can create to access data sources that are behind a firewall or that are blocked from accessing from the public internet.

* Managed private endpoints allow Fabric Spark workloads to securely access data sources without exposing them to the public network or requiring complex network configurations.

* The private endpoints provide a secure way to connect and access the data from these data sources using items such as notebooks and Spark job definitions. 

* Microsoft Fabric creates and manages managed private endpoints based on the inputs from the workspace admin. Workspace admins can set up managed private endpoints from the workspace settings by specifying the resource ID of the data source, identifying the target subresource, and providing a justification for the private endpoint request.

* Managed private endpoints support various data sources, such as Azure Storage, Azure SQL Database and many more.

:::image type="content" source="./media/security-managed-private-endpoints-overview/managed_private_endpoint.gif" alt-text="Animated illustration showing the process of creating a managed private endpoint in Microsoft Fabric.":::

For more information about supported data sources for managed private endpoints in Fabric, see [Supported data sources](./security-managed-private-endpoints-create.md#supported-data-sources).

## Limitations and considerations

* **Starter pool limitation**: Workspaces with managed virtual networks (VNets) can't access starter pools. This category encompasses workspaces that use managed private endpoints or are associated with a Fabric tenant enabled with Azure Private Links and have executed Spark jobs. Such workspaces rely on on-demand clusters, taking three to five minutes to start a session.

* **Managed private endpoints**: Managed private endpoints are supported only for Fabric trial capacity and Fabric capacities F64 or higher.

* * **Tenant Region Compatibility**: Managed private endpoints function only in regions where Fabric Data Engineering workloads are available. Creating them in unsupported Fabric Tenant home regions results in errors. These unsupported Tenant home regions include
  
| Region         |
|----------------|
| Central US     |
| Israel Central |
| Italy North    |
| West India     |
| Mexico Central |
| Qatar Central  |
| Spain Central  |


* **Capacity Region Compatibility**: Managed private endpoints function only in regions where Fabric Data Engineering workloads are available. Creating them in unsupported capacity regions results in errors. These unsupported regions include 
  
| Region         |
|----------------|
| Central US     |
| Italy North    |
| Qatar Central  |
| West India     |
| France South   |
| Germany North  |
| Japan West     |
| Korea South    |
| Southafrica West |
| UAE Central    |

* **Spark job resilience**: To prevent Spark job failures or errors, migrate workspaces with managed private endpoints to Fabric capacity SKUs of F64 or higher.

* **Workspace migration**: Workspace migration across capacities in different regions is unsupported.

These limitations and considerations might affect your use cases and workflows. Take them into account before enabling the Azure Private Link tenant setting for your tenant.

## Related content

* [Create and use managed private endpoints](./security-managed-private-endpoints-create.md)
* [Overview of private links in Fabric](./security-private-links-overview.md)
* [Overview of managed virtual networks in Fabric](./security-managed-vnets-fabric-overview.md)
