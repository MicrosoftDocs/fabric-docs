---
title: Secure your data movement with Copy Job and Virtual Network Data Gateway
description: This article provides a secure and high-performance way to move data between private networks and Fabric without exposing data to the public internet.
ms.reviewer: lle
ms.topic: concept-article
ms.date: 09/01/2025
---

# Secure your data movement with Copy Job and Virtual Network Data Gateway

This article provides a secure and high-performance way to move data between private networks and Fabric without exposing data to the public internet.

## Overview

You can now use **Copy Job** with the **Virtual Network (VNET) Data Gateway** in Microsoft Fabric. This integration provides a secure and high-performance way to move data between private networks and Fabric without exposing data to the public internet.
This capability is especially useful for organizations in regulated industries where sensitive data must remain inside private networks.

## Why use Virtual Network Data Gateway with Copy Job

When moving data from private networks, you might encounter challenges such as:

- Requiring public endpoints, which increase security risks.
- Configuring and maintaining complex VPN tunnels.
- Experiencing performance bottlenecks due to indirect network routes.

The Virtual Network Data Gateway addresses these challenges by acting as a secure bridge between your private data sources and Microsoft Fabric. Copy Job now supports using the gateway directly, ensuring data stays private and compliant.

## How it works 

1. Deploy the Virtual Network Data Gateway inside your Azure Virtual Network.
2. Configure Copy Job in Fabric to use the Virtual Network Data Gateway for source connections.
3. When the job runs, data flows through the gateway via the private network path.
4. Data doesn't leave the secure perimeter or traverse the public internet.

:::image type="content" source="media/copy-job/copy-job-with-virtual-network-gateway.png" alt-text="Screenshot of the copy job with virtual network data gateway." lightbox="media/copy-job/copy-job-with-virtual-network-gateway.png":::

## Benefits

- **Security** – Data remains inside the private network during transfer.
- **Performance** – Use Copy Job for reliable and optimized transfers.
- **Simplicity** – Works with existing Copy Job configurations; no more setup complexity.

## Get started

1. [Set up the Virtual Network Data Gateway](/data-integration/vnet/create-data-gateways).
2. [Create a Copy Job in Microsoft Fabric](create-copy-job.md).
3. Select the Virtual Network Data Gateway when configuring the source connection.

## Next steps

- Learn more about [Copy Job in Fabric](what-is-copy-job.md).
- Review [Virtual Network Data Gateway setup and configuration](/data-integration/vnet/manage-data-gateways).
