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

* Managed private endpoints are private endpoints that workspace admins can create to connect to data sources that are behind a firewall or that are blocked from accessing from the public internet.

* Managed private endpoints allow Fabric Spark workloads to securely access data sources without exposing them to the public network or requiring complex network configurations.

* The private endpoints provide a secure way to connect and access the data from these data sources through Fabric Spark items such as notebooks and Spark job definitions. 

* Managed private endpoints are created and managed by Microsoft Fabric, and the user only needs to specify the resource ID of the data source and the target subresource, and provide a justification of their access request for the data source admin who has to approve it.

* Managed private endpoints support various data sources, such as Azure Storage, Azure SQL Database, Azure Synapse Analytics, Azure Cosmos DB, Application gateway, Azure Key Vault, and many more.

:::image type="content" source="./media/security-managed-private-endpoints-overview/managed_private_endpoint.gif" alt-text="Animated illustration showing the process of creating a managed private endpoint in Microsoft Fabric.":::

For more information about supported data sources for managed private endpoints in Fabric, see [Supported data sources](./security-managed-private-endpoints-create.md#supported-data-sources).

### Limitations and considerations

* Starter pools aren't available for workspaces with managed VNets. This includes workspaces that use managed private endpoints or that belong to a Fabric tenant with Azure Private Links enabled and that have run a Spark job. These workspaces will use on-demand clusters, which can take 3 to 5 minutes to start a session.

* Managed private endpoints are only supported for Fabric Trial capacity and Fabric capacities F64 or higher.

* Managed private endpoints are only supported in the regions where Fabric Data Engineering workloads are available. Attempting to create managed private endpoints in a capacity region where Data Engineering workloads are not supported would result in errors.

* To prevent Spark jobs from failing or running into errors, please migrate workspaces with any managed private endpoints to Fabric capacity SKUs of F64 or higher.

* Lakehouse table maintenance operations aren't supported for workspaces enabled with managed private endpoints.

* Deleting the last managed private endpoint for a workspace does not support Managed VNET deletion. After creating and deleting a managed private endpoint, the workspace remains associated with a Managed VNET, preventing Starter Pools activation

* Workspace migration across capacities in different regions isn't supported.

These limitations and considerations might affect your use cases and workflows. Take them into account before enabling the Azure Private Link tenant setting for your tenant.

## Related content

* [Create and use managed private endpoints](./security-managed-private-endpoints-create.md)
* [Overview of private links in Fabric](./security-private-links-overview.md)
* [Overview of managed virtual networks in Fabric](./security-managed-vnets-fabric-overview.md)
