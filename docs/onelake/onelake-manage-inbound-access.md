---
title: Manage inbound access from OneLake with workspace private links
description: Inbound access protection in Fabric secures your data by limiting inbound requests. 
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: concept-article
ms.custom:
ms.date: 08/20/2025
#customer intent: As a data admin, I want to learn how to protect my data by limiting inbound requests. As a data engineer, I want to learn how to work with my data, even when private links are turned on. 
---

# Limit inbound requests with inbound access protection

Inbound access protection secures connections between your virtual network and Microsoft Fabric. By setting up private links, you can prevent access to your data in OneLake from the public internet.

## What is inbound access protection?

Turning on inbound access protection restricts public access to your Fabric tenant or workspace. All inbound calls must use an approved private endpoint, either from your own virtual network or from an approved service such as another Fabric workspace. These private endpoints ensure that connections come only from trusted sources and not the public internet. To learn more about how to set up private endpoints and block public access to your workspace, see [Fabric workspace private links](/fabric/security/security-workspace-level-private-links-overview).

:::image type="content" source="media/onelake-manage-inbound-access/onelake-inbound-workspace-managed-private-endpoint.png" alt-text="Diagram of the destination storage account making an outbound call to the source storage account during copy operations." lightbox="media/onelake-manage-inbound-access/onelake-inbound-workspace-managed-private-endpoint.png" border="false":::

## OneLake and private links

To connect to your workspace over a private endpoint, you need to use the workspace fully qualified domain name (FQDN). This workspace FQDN ensures the call goes directly to the private endpoint, and is specific to each workspace. OneLake supports both Blob and DFS (Data File System) versions of the workspace FQDN:

- `https://{workspaceid}.z{xy}.dfs.fabric.microsoft.com`
- `https://{workspaceid}.z{xy}.blob.fabric.microsoft.com\`

Where:

- `{workspaceid}` is the workspace GUID without dashes.
- `{xy}` is the first two characters of the workspace GUID.

To connect to your tenant private endpoint, you can continue to use the OneLake global FQDN:

- `https://onelake.dfs.fabric.microsoft.com`
- `https://onelake.blob.fabric.microsoft.com`

If your environment doesn't have a workspace private link set up, the workspace FQDN connects over the public internet. If only a tenant private link is set up, the workspace FQDN connects to the tenant private link. If both a tenant and workspace private link are set up, the workspace FQDN connects to the workspace private link.
