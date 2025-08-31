---
title: About cross-workspace communication
description: Learn how to set up cross-workspace communication.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: how-to
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to understand how to securely enable and configure cross-workspace communication, so I can allow data and resource access between workspaces while maintaining security controls.

---

# About cross-workspace communication

By default, a workspace with [restricted inbound public access](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace) restricts connections from other workspaces. To enable cross-workspace communication in this scenario, you must use either managed private endpoints (MPE) or a data gateway. These options are necessary even if private endpoints exist between the client and one or both workspaces, because the connection is initiated by the source workspace, not the client. If the target workspace allows inbound public access, connections from other workspaces are permitted without additional configuration.

## Using a managed private endpoint 

A managed private endpoint establishes a trust relationship from the source workspace (Workspace 1 in the diagram) to the target workspace (Workspace 2), allowing connections from the source workspace to the target workspace. A managed private endpoint can be created via the workspace settings in the [Fabric portal](security-managed-private-endpoints-create.md) or [API](/rest/api/fabric/core/managed-private-endpoints/create-workspace-managed-private-endpoint?tabs=HTTP).

:::image type="content" source="media/security-cross-workspace-communication/access-via-managed-private-endpoint.png" alt-text="Diagram illustrating how managed private endpoints can establish connection to a workspace set to deny public access." lightbox="media/security-cross-workspace-communication/access-via-managed-private-endpoint.png" border="false":::

To create a managed private endpoint to the target workspace, you need the private link service Resource ID of the target workspace. You can find this Resource ID in Azure by viewing the Resource JSON for the workspace. Ensure that the workspace ID in the JSON matches the intended target workspace.

:::image type="content" source="./media/security-cross-workspace-communication/resource-json.png" alt-text="Screenshot showing how to get the private link resource ID in the resource json file." lightbox="media/security-cross-workspace-communication/resource-json.png":::

The private link service owner for Workspace 2 needs to approve the managed private endpoint request in **Azure private link center** > **Pending connections**. 

Cross-workspace connections using managed private endpoints are currently limited to the following scenarios:

* Shortcut access from one workspace to another workspace.
* A notebook in one workspace accessing a lakehouse in another workspace. When the notebook is in the source workspace, connecting to the target workspace requires using the workspace fully qualified domain name (FQDN).
* A pipeline in one workspace accessing a notebook in another workspace.
* An eventstream in one workspace accessing a lakehouse in another workspace.
* An eventstream in one workspace accessing an eventhouse in another workspace when using event processing before ingestion.

For examples of how to set up cross-workspace communication using managed private endpoints, see the following article:

- [Accessing a lakehouse in a restricted workspace from a notebook in an open workspace](security-workspace-private-links-example-notebook.md)
- [Use a pipeline to access a lakehouse in an inbound restricted workspace from an open workspace](security-workspace-private-links-example-pipeline.md)

## Using a data gateway

You can use a virtual network data gateway or an on-premises data gateway (OPDG) to establish cross-workspace communication with a workspace that has a restricted inbound public access policy. With either option, you need to create private endpoint on the virtual network that holds the data gateway. This private endpoint should point to the Private Link service for the target workspace.

### Virtual network data gateway

The following diagram illustrates how the connection is established using a virtual network data gateway:

:::image type="content" source="./media/security-cross-workspace-communication/virtual-network-data-gateway.png" alt-text="Diagram illustrating a connection using a virtual network data gateway." lightbox="media/security-cross-workspace-communication/virtual-network-data-gateway.png" border="false":::  

For an example, see [Accessing a lakehouse in a restricted workspace from a notebook in an open workspace](./security-workspace-private-links-example-notebook.md).

### On-premises data gateway

The following diagram illustrates how the connection is established using an on-premises data gateway:

:::image type="content" source="./media/security-cross-workspace-communication/on-premises-data-gateway.png" alt-text="Diagram illustrating a connection using an on-premises data gateway." lightbox="media/security-cross-workspace-communication/on-premises-data-gateway.png" border="false":::  

For an example of how to set up cross-workspace communication using an on-premises data gateway, see [Accessing a lakehouse in a restricted workspace from a notebook in an open workspace](./security-workspace-private-links-example-notebook.md).

## Related content

* [About private links](./security-private-links-overview.md)
* [Workspace-level private links overview](./security-workspace-level-private-links-overview.md)
<!-- * [Microsoft Fabric multi-workspace APIs](./security-fabric-multi-workspace-api-overview.md) -->
