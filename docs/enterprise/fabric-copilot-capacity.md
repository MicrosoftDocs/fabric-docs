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

This article describes how to set up a Fabric Copilot capacity. This article is aimed at admins who want to manage their organization's copilot usage and provide a consoliated billing capability.
Fabric Copilot capacity is a capacity setting that consolidates organizational Fabric copilot usage for users designated by the capacity admin.

## Steps to enabling a Fabric Copilot capacity

There are three steps required to enable Fabric Copilot capacity.
1. The Fabric administrator [enables Copilot](../admin/service-admin-copilot.md) for users within the organization.
2. The Fabric administrator enables capacity administrators as [authorized to designate their capacity as a Copilot capacity](../admin/service-admin-copilot.md)  to designate their capacities as Fabric Copilot Capacities.
3. The capacity administrator needs to assign a group of users as [Fabric Copilot capacity users](capacity-settings.md) on their capacity.

## Frequently asked questions

1. What regions can I set up a Fabric Copilot capacity?

Fabric Copilot capacity is only supported in the Fabric tenant's home region.

2. What are the size restrictions for a Fabric Copilot capacity?

Fabric Copilot capacity needs to be greater or equal to a P1 premium capacity or an F64 Fabric capacity.

3. Does Fabric Copilot Capacity maintain my organization's data governance requirements?

Data is always processed in the region where you are using copilot, and this does not change with Copilot capacity. Usage / billing records which contain the metadata of the Fabric items / workspaces are available to the capacity administrator of the Copilot capacity and by allowing only authorized users to designate Copilot capacity, we have delegated control to the Fabric admin.
