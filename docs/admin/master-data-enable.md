---
title: "Enable master data endorsement"
description: "This article shows Microsoft Fabric administrators how to enable master data endorsement on their tenant."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 07/09/2024

#customer intent: As a Fabric administrator, I want to enable the master data endorsement feature so that specified users can apply the master data badge to data items that my organization considers to be core, single-source-of-truth data.
---
# Enable master data endorsement

This article describes how to enable master data endorsement. It's target audience is Fabric administrators.

Master data endorsement is a way organizations can help users find data that the organization regards as core, single-source-of-truth data. As a Fabric administrator, you specify who in the organization is qualifed to designate data as master data. For more information about endorsement and master data, see [Endorsement overview](../governance/endorsement-overview.md).

## Prerequisites

You must be a Fabric administrator to enable master data endorsement.

## Enable master data endorsement

To enable master data endorsement, turn on the **Endorse master data (preview)** tenant setting and specify who is authorized to apply the master data badge to data items.

1. [Open the admin portal and go to the tenant settings](./about-tenant-settings.md#how-to-get-to-the-tenant-settings).
1. Expand the **Endorse master data (preview)** tenant setting.
1. Switch the toggle to **Enabled**.
1. Determine who can apply the master data badge to data items by choosing the appropriate options:
    * **The entire organization**: Everyone in the organization is authorized to apply the master data badge to data items.
    * **Specific security groups**: Only members of the specified seurity group(s) are authorized to apply the master data badge to data items.
    * **Exclude specific security groups**: If you don't want particular users to be able to apply the master data badge, select the **Exclude specific security groups** checkbox and provide the names of a security group(s) that includes those users.

    > [!NOTE]
    > Users who are authorized to apply the master data badge must also have write permission on any data item they wish to apply the badge to.

## Related content

* [Endorsement overview](../governance/endorsement-overview.md)
* [Enable item certification](./certification-enable.md)
* [Governance documentation](../governance/index.yml)