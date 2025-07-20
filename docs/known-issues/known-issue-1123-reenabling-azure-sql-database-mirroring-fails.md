---
title: Known issue - Reenabling Azure SQL database mirroring fails
description: A known issue is posted where reenabling Azure SQL database mirroring fails.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/07/2025
ms.custom: known-issue-1123
---

# Known issue - Reenabling Azure SQL database mirroring fails

After setting up mirroring for an Azure SQL database, you can disable the mirror. In certain scenarios, the disable operation doesn't clean up the metadata properly. Then, when you reenable mirroring, the operation fails with an error.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

When you try to reenable mirroring, you receive an error. The error message is similar to: `Cannot enable fabric link on the database because the metadata tables are corrupted`

## Solutions and workarounds

To prevent the error from recurring, [add the **VIEW PERFORMANCE DEFINITION** permission](/fabric/database/mirrored-database/azure-sql-database-tutorial). The permission temporarily fixes the issue while we work on a permanent fix. If you add the new permission and still encounter the same issue, open a Fabric support ticket.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
