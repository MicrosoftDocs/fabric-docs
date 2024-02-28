---
title: Overview of managed private endpoints for Microsoft Fabric
description: Learn about managed private endpoints for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 02/27/2024
---

# Overview of managed private endpoints for Fabric

Mananged private endpoints are feature that allows secure and private access to data sources from Fabric Spark workloads.

## What are Managed Private Endpoints?

* Managed private endpoints are private endpoints that workspace admins can create to connect to data sources that are behind a firewall or that are blocked from accessing from the public internet.

* Managed private endpoints allow Fabric Spark workloads to securely access data sources without exposing them to the public network or requiring complex network configurations.

* The private endpoints provide a secure way to connect and access the data from these data sources through Fabric Spark items such as notebooks and Spark job definitions. 

* Managed private endpoints are created and managed by Microsoft Fabric, and the user only needs to specify the resource ID of the data source and the target subresource, and provide a justification of their access request for the data source admin who has to approve it.

* Managed private endpoints support various data sources, such as Azure Storage, Azure SQL Database, Azure Synapse Analytics, Azure Cosmos DB, Application gateway, Azure Key Vault, and many more.

:::image type="content" source="./media/security-managed-private-endpoints-overview/illustrating-mananaged-private-endpoint-creation.gif" alt-text="Animated illustration showing the process of creating a managed private endpoint in Microsoft Fabric.":::

For more information about supported data sources for managed private endpoints in Fabric, see [Supported data sources](./security-managed-private-endpoints-create.md#supported-data-sources).

### Limitations and considerations

* Starter pools aren't supported in workspaces that are enabled with managed VNets (that is, workspaces that have managed private endpoints or workspaces that are in a Fabric tenant that has Azure Private Links enabled and that have run a Spark job).

* Managed private endpoints are only supported for Fabric Trial capacity and Fabric capacities F64 or higher.

* Workspaces that have at least one managed private endpoint can only be migrated to F64 or greater Fabric capacity SKUs.

* The Data Science items Models and Experiments aren't supported for tenants where Azure Private Link is enabled.

* Lakehouse table maintenance operations aren't supported for workspaces enabled with managed VNets.

* Workspace migration across capacities in different regions isn't supported.

These limitations and considerations might affect your use cases and workflows, so please take them into account before enabling the Azure Private Link tenant setting for your tenant.

## Related content

* [Create and use managed private endpoints](./security-managed-private-endpoints-create.md)
* [Overview of private links in Fabric](./security-private-links-overview.md)
* [Overview of managed virtual networks in Fabric](./security-managed-vnets-fabric-overview.md)