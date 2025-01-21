---
title: Fabric Copilot capacity
description: Learn how to set up a Fabric Copilot capacity to enable Copilot adoption
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - ignite-2024
ms.date: 
---

# Setting up a Fabric Copilot capacity

This article describes how to set up a Fabric Copilot capacity. This article is aimed at admins who want to manage their organization's Copilot usage and provide a consolidated billing capability.

When you enable the Fabric Copilot capacity for a specified set of users, all of their Copilot usage across Fabric is only billed in the Fabric Copilot capacity.
 
## Steps to enabling a Fabric Copilot capacity

There are three steps required to enable Fabric Copilot capacity.
1. The Fabric administrator [enables Copilot](../admin/service-admin-portal-copilot.md) for users within the organization.
2. The Fabric administrator enables capacity administrators as [authorized to designate their capacity as a Copilot capacity](../admin/service-admin-portal-copilot.md).
3. The capacity administrator needs to assign a group of users as [Fabric Copilot capacity users](../admin/capacity-settings.md) on their capacity.

## Considerations and limitations

*Fabric Copilot capacity is only supported in the Fabric tenant's home region.

*The Fabric Copilot capacity has to reside on at least an F64 or P1 [SKU](licenses.md#capacity).

*Data is processed in the region where you are using Copilot. Usage / billing records which contain the metadata of the Fabric items / workspaces are available to the capacity administrator of the Copilot capacity.
