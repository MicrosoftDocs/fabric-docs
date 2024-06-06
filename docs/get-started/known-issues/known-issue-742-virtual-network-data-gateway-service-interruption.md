---
title: Known issue - Virtual network data gateway service interruption
description: A known issue is posted where there's a virtual network data gateway service interruption.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/06/2024
ms.custom: known-issue-742
---

# Known issue - Virtual network data gateway service interruption

We're performing a data migration for the service backing virtual network (Vnet) data gateways to improve the security. The migration is tentatively scheduled to occur between May 28, 2024 and May 31, 2024.

**Status:** Fixed: June 6, 2024

**Product Experience:** Power BI

## Symptoms

You can't create, update, or delete virtual network data gateways during your region's migration, which takes between two and three hours. The queries fail if your gateway isn't running before the migration starts.

## Solutions and workarounds

During the migration period, you can use an on-premises data gateway instead.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
