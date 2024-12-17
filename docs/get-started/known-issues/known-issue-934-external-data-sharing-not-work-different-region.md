---
title: Known issue - External data sharing doesn't work in a different region capacity lakehouse
description: A known issue is posted where external data sharing doesn't work in a different region capacity lakehouse.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/17/2024
ms.custom: known-issue-934
---

# Known issue - External data sharing doesn't work in a different region capacity lakehouse

When you accept an external data share invitation, you can select the lakehouse where the external share to the shared data is created. If you select a lakehouse within a capacity that resides in a different region than your home tenant region, the operation fails.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

After selecting the lakehouse and the path where to create the external share to the external data, the operation fails.

## Solutions and workarounds

As a workaround, accept the share invitation in a workspace within your home tenant capacity.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
