---
title: Publishing Overview
description: Overview on how to publish a workload in Fabric.
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 09/04/2025
---

# Publishing overview

This article provides a high-level overview of how to publish a workload in Microsoft Fabric. Publishing typically happens in two stages:

1. Publish to your own tenant for organizational usage.
2. (Optional) Publish to other Fabric tenants via the Workload Hub.

## Stage 1: Publish to your tenant (organizational use)

Use this path when you want to deploy and validate your workload within your own organization.

- Prepare your manifest package (see [Manifest overview](manifest-overview.md)).
- Upload the package in the Fabric Admin Portal to enable the workload for your tenant.
- Use a preview audience if you need to pilot with specific users or test tenants.
- Ensure tenant settings and capacity are configured so users can create and use your items.

Outcome: Your workload is available to users in your tenant through the Workload Hub and behaves like a native experience.

## Stage 2: Publish to other tenants (optional)

If you want to make your workload discoverable to all Fabric customers, you can enlist it in the Workload Hub.

- Register your workload ID and publishing tenant.
- Validate and align with [Publishing guidelines and requirements](../workload-development-kit/publish-workload-requirements.md).
- Submit the [Publishing Request Form](https://aka.ms/fabric_workload_publishing) to move through preview and then GA.
- Once approved, your workload appears in the Workload Hub with the appropriate stage indicator (Preview or GA).

Outcome: Your workload is listed to all Fabric tenants, with controls for preview audiences and GA availability.

## Related content

- [Publish your workload](publish-workload-flow.md)
- [Manifest overview](manifest-overview.md)
