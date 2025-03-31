---
title: Known issue - SQL analytics endpoint tables lose permissions
description: A known issue is posted where tables in the SQL analytics endpoint lose permissions.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/31/2024
ms.custom: known-issue-909
---

# Known issue - SQL analytics endpoint tables lose permissions

After you successfully sync your tables in your SQL analytics endpoint, the permissions get dropped.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

Permissions applied to the SQL analytics endpoint tables aren't available after a successful sync between the lakehouse and the SQL analytics endpoint.

## Solutions and workarounds

The behavior is currently expected for the tables after a schema change. You need to reapply the permissions after a successful sync to the SQL analytics endpoint.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
