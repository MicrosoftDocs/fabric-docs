---
title: Manage inbound access from OneLake with workspace private links
description: Inbound access protection in Fabric secures your data by limiting inbound requests. 
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: concept-article
ms.custom:
ms.date: 08/13/2025
#customer intent: As a data admin, I want to learn how to protect my data by limiting inbound requests. As a data engineer, I want to learn how to work with my data, even when private links are turned on. 
---

# Limit inbound requests with inbound access protection

Inbound access protection secures connections between your virtual network and Microsoft Fabric. By setting up private links, you can prevent access to your data in OneLake from the public internet.  

## What is inbound access protection?

When you turn on inbound access protection, you restrict public access to your Fabric tenant or workspace. When public access is blocked, all inbound calls must come over an approved private endpoint, either created from your own VNet, or from an approved service, such as a different Fabric workspace. These private endpoints create direct connections between you and Fabric, ensuring all inbound calls come from approved sources and not the public internet. To learn more about how to set up private endpoints and block public access to your workspace, see [Fabric workspace private links](/fabric/security/security-workspace-level-private-links-overview).

:::image type="content" source="./media/onelake-manage-inbound-access/onelake-inbound-workspace-managed-private-endpoint.png" alt-text="Diagram of the destination storage account making an outbound call to the source storage account during copy operations." border="false":::

## OneLake and private links

To connect to your workspace over a private endpoint, you need to use the workspace fully qualified domain name (FQDN). This workspace FQDN ensures the call goes directly to the private endpoint, and is specific to each workspace.  OneLake supports a Blob and DFS version of the workspace FQDN:

- `https://{workspaceid}.z{xy}.dfs.fabric.microsoft.com`
- `https://{workspaceid}.z{xy}.blob.fabric.microsoft.com\`

Where:

- `{workspaceid}` is the workspace GUID without dashes.
- `{xy}` is the first two characters of the workspace GUID.

To connect to your tenant private endpoint, you can continue to use the OneLake global FQDN:

- `https://onelake.dfs.fabric.microsoft.com`
- `https://onelake.blob.fabric.microsoft.com`

If your environment doesn't have a workspace private link set up, the workspace FQDN will connect over the public internet. If only a tenant private link is set