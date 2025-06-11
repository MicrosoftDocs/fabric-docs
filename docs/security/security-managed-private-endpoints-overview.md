---
title: Overview of managed private endpoints for Microsoft Fabric
description: Learn about managed private endpoints for Microsoft Fabric.
author: msmimart
ms.author: danzhang
ms.topic: conceptual
ms.custom: references_regions
ms.date: 05/12/2025
---

# Overview of managed private endpoints for Fabric

Managed private endpoints are feature that allows secure and private access to data sources from certain Fabric workloads.

## What are Managed Private Endpoints?

* Managed private endpoints are connections that workspace admins can create to access data sources that are behind a firewall or that are blocked from public internet access.

* Managed private endpoints allow Fabric workloads to securely access data sources without exposing them to the public network or requiring complex network configurations.

* Microsoft Fabric creates and manages managed private endpoints based on the inputs from the workspace admin. Workspace admins can set up managed private endpoints from the workspace settings by specifying the resource ID of the data source, identifying the target subresource, and providing a justification for the private endpoint request.

* Managed private endpoints support various data sources, such as Azure Storage, Azure SQL Database and many more.

:::image type="content" source="./media/security-managed-private-endpoints-overview/managed_private_endpoint.gif" alt-text="Animated illustration showing the process of creating a managed private endpoint in Microsoft Fabric.":::

> [!NOTE]
> Managed private endpoints are supported for Fabric trial capacity and all Fabric F SKU capacities.

For more information about supported data sources for managed private endpoints in Fabric, see [Supported data sources](./security-managed-private-endpoints-create.md#supported-data-sources).

## Supported item types

* Fabric Spark workloads: This includes notebooks, lakehouses, and Spark job definitions. For more information, see [Create and use managed private endpoints](https://go.microsoft.com/fwlink/?linkid=2295703).

* Eventstream: For more information, see [Connect to Azure resources securely using managed private endpoints (Preview)](../real-time-intelligence/event-streams/set-up-private-endpoint.md).

## Limitations and considerations

* **Tenant Region Compatibility**: Managed private endpoints function only in regions where Fabric Data Engineering workloads are available. Creating them in unsupported Fabric Tenant home regions results in errors. These unsupported Tenant home regions include:
  
    | Region         |
    |----------------|
    | Singapore |
    | Israel Central |
    | Switzerland West | 
    | Italy North    |
    | West India     |
    | Mexico Central |
    | Qatar Central  |
    | Spain Central  |
    | Brazil South  |

* **Capacity Region Compatibility**: Creating managed private endpoints in unsupported capacity regions results in errors. These unsupported regions include: 
  
    | Region         |
    |----------------|
    | West Central US |
    | Switzerland West |
    | Italy North    |
    | Qatar Central  |
    | West India     |
    | France South   |
    | Germany North  |
    | Japan West     |
    | Korea South    |
    | South Africa West |
    | UAE Central    |
    | Brazil South   |
    | Singapore |

* **Limitations for specific workloads**:

    * Spark: See [Create and use managed private endpoints](https://go.microsoft.com/fwlink/?linkid=2295703).

    * Eventstream: [Connect to Azure resources securely using managed private endpoints (Preview)](../real-time-intelligence/event-streams/set-up-private-endpoint.md).

* **Workspace migration**: Workspace migration across capacities in different regions is unsupported.

* **[OneLake shortcuts](../onelake/onelake-shortcuts.md)** do not yet support connections to ADLS Gen2 storage accounts using managed private endpoints.

* Creating a managed private endpoint with a fully qualified domain name (FQDN) via Private Link Service is not supported.
* After you request to delete a managed private endpoint, wait at least 15 minutes before trying to create a new private endpoint to the same resource again. 

These limitations and considerations might affect your use cases and workflows. Take them into account before enabling the Azure Private Link tenant setting for your tenant.

## Related content

* [Create and use managed private endpoints](./security-managed-private-endpoints-create.md)
* [Overview of private links in Fabric](./security-private-links-overview.md)
* [Overview of managed virtual networks in Fabric](./security-managed-vnets-fabric-overview.md)
