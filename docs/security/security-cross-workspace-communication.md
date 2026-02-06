---
title: About Cross-Workspace Communication
description: Learn how to set up cross-workspace communication.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: concept-article
ms.custom:
ms.date: 10/20/2025

#customer intent: As a workspace admin, I want to understand how to securely enable and configure cross-workspace communication so I can allow data and resource access between workspaces while maintaining security controls.

---

# About cross-workspace communication

By default, a workspace with [restricted inbound public access](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace) restricts connections from other workspaces. To enable cross-workspace communication in this scenario, you must use either managed private endpoints or a data gateway.

These options are necessary even if private endpoints exist between the client and one or both workspaces. The reason is that the source workspace (not the client) initiates the connection. If the target workspace allows inbound public access, connections from other workspaces are permitted without additional configuration.

## Managed private endpoint

A managed private endpoint establishes a trust relationship from the source workspace (Workspace 1 in the following diagram) to the target workspace (Workspace 2). The trust relationship allows connections from the source workspace to the target workspace. You can create a managed private endpoint by using workspace settings in the [Microsoft Fabric portal](security-managed-private-endpoints-create.md) or the [API](/rest/api/fabric/core/managed-private-endpoints/create-workspace-managed-private-endpoint?tabs=HTTP).

:::image type="content" source="media/security-cross-workspace-communication/access-via-managed-private-endpoint.png" alt-text="Diagram that illustrates how managed private endpoints can establish a connection to a workspace that's set to deny public access." lightbox="media/security-cross-workspace-communication/access-via-managed-private-endpoint.png" border="false":::

To create a managed private endpoint to the target workspace, you need the Azure Private Link service's resource ID for the target workspace. You can find this resource ID in Azure by viewing the resource JSON for the workspace. Ensure that the workspace ID in the JSON matches the intended target workspace.

:::image type="content" source="./media/security-cross-workspace-communication/resource-json.png" alt-text="Screenshot that shows how to get a Private Link resource ID in the resource JSON file." lightbox="media/security-cross-workspace-communication/resource-json.png":::

The Private Link service owner for Workspace 2 needs to approve the request for a managed private endpoint in **Azure private link center** > **Pending connections**.

Cross-workspace connections that use managed private endpoints are currently limited to the following scenarios:

* Shortcut access from one workspace to another workspace.
* A notebook in one workspace accessing a lakehouse in another workspace. When the notebook is in the source workspace, connecting to the target workspace requires using the workspace's fully qualified domain name (FQDN).
* A pipeline in one workspace accessing a notebook in another workspace.
* An eventstream in one workspace accessing a lakehouse in another workspace.
* An eventstream in one workspace accessing an eventhouse in another workspace when it's using event processing before ingestion.

For examples of how to set up cross-workspace communication by using managed private endpoints, see the following articles:

* [Accessing a lakehouse in an inbound restricted workspace from a notebook in an open workspace](security-workspace-private-links-example-notebook.md)
* [Use a pipeline to access a lakehouse in an inbound restricted workspace from an open workspace](security-workspace-private-links-example-pipeline.md)

## Data gateway

You can use a virtual network data gateway or an on-premises data gateway (OPDG) to establish cross-workspace communication with a workspace that has a policy that restricts inbound public access. With either option, you need to create a private endpoint on the virtual network that holds the data gateway. This private endpoint should point to the Private Link service for the target workspace.

### Virtual network data gateway

The following diagram illustrates how the connection is established through a virtual network data gateway.

:::image type="content" source="./media/security-cross-workspace-communication/virtual-network-data-gateway.png" alt-text="Diagram that illustrates a connection through a virtual network data gateway." lightbox="media/security-cross-workspace-communication/virtual-network-data-gateway.png" border="false":::  

For an example, see [Access inbound restricted lakehouse data from Power BI by using a virtual network gateway](./security-workspace-private-links-example-power-bi-virtual-network.md).

### On-premises data gateway

The following diagram illustrates how the connection is established through an OPDG.

:::image type="content" source="./media/security-cross-workspace-communication/on-premises-data-gateway.png" alt-text="Diagram that illustrates a connection through an on-premises data gateway." lightbox="media/security-cross-workspace-communication/on-premises-data-gateway.png" border="false":::  

For an example of how to set up cross-workspace communication by using an on-premises data gateway, see [Access inbound restricted lakehouse data from Power BI by using an on-premises data gateway](./security-workspace-private-links-example-on-premises-data-gateway.md).

## Related content

* [Private links for Fabric tenants](./security-private-links-overview.md)
* [Private links for Fabric workspaces](./security-workspace-level-private-links-overview.md)
* [Microsoft Fabric multi-workspace APIs](./security-fabric-multi-workspace-api-overview.md)
