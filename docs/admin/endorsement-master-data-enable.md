---
title: "Enable master data endorsement"
description: "This article shows Microsoft Fabric administrators how to enable master data endorsement on their tenant."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 07/11/2024

#customer intent: As a Fabric administrator, I want to enable the master data endorsement feature so that specified users can apply the master data badge to data items that my organization considers to be core, single-source-of-truth data.
---
# Enable master data endorsement

This article describes how to enable master data endorsement. Its target audience is Fabric administrators.

Master data endorsement is a way organizations can help its Fabric users find and use data that the organization regards as core, single-source-of-truth data, such as customer lists, product codes, etc. This is accomplished by qualified users applying a **Master data** badge to data items that they judge to contain that core, single-source-of-truth data.

As a Fabric administrator, you're responsible for enabling master data endorsement in your organization and specifying who in the organization is qualified to designate data items as master data.

For more information about endorsement and master data, see [Endorsement overview](../governance/endorsement-overview.md).

## Prerequisites

You must be a Fabric administrator to enable master data endorsement.

## Enable master data endorsement

To enable master data endorsement, turn on the **Endorse master data (preview)** tenant setting and specify who is authorized to apply the **Master data** badge to data items.

1. [Open the admin portal and go to the tenant settings](./about-tenant-settings.md#how-to-get-to-the-tenant-settings).
1. Find and expand the **Endorse master data (preview)** tenant setting.
1. Switch the toggle to **Enabled**.
1. Specify who can apply the **Master data** badge to data items by choosing the appropriate options:
    * **The entire organization**: Everyone in the organization is authorized to apply the master data badge to data items.
    * **Specific security groups**: Only members of the specified security groups are authorized to apply the **Master data** badge to data items.
    * **Exclude specific security groups**: If you want to exclude particular users who are included in the option you chose, select the **Exclude specific security groups** checkbox and provide the names of a security group or groups that include the users you want to exclude.

    > [!NOTE]
    > Users who are authorized to apply the **Master data** badge must also have write permission on data items they wish to apply the badge to.

## Related content

* [Endorsement overview](../governance/endorsement-overview.md)
* [Enable item certification](./endorsement-certification-enable.md)
* [Endorse items](../fundamentals/endorsement-promote-certify.md)
* [Governance documentation](../governance/index.yml)