---
title: Known issue - Disabled SQL database error
description: A known issue is posted where you receive an error that the SQL database was disabled.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/16/2025
ms.custom: known-issue-1170
---

# Known issue - Disabled SQL database error

You might encounter an error message when attempting to connect to Fabric SQL databases. When you pause a Fabric F SKU capacity, we deactivate all SQL database items. When you resume the capacity, we reactivate the databases, and connectivity should be restored. However, it can take up to 15 minutes for all Fabric items to respond to a capacity pause or resume notification. The Azure portal doesn't stop users from performing pause and resume operations in quick succession. Therefore, when you pause and resume a capacity in quick succession, the operations can happen out of order. Also, databases are disabled when they're not supposed to be.

**Status:** Open

**Product Experience:** Databases

## Symptoms

When you attempt to connect to a Fabric SQL database from the Fabric portal or a client tool, you see an error message similar to: `This SQL database has been disabled. Please reach out to your Fabric Capacity administrator for more information.` The error also surfaces as SQL error codes 42131 or 42119.

## Solutions and workarounds

You can self-mitigate by pausing you capacity, waiting 15 minutes, and resuming you capacity again. This action brings all SQL database items back to their intended active state. If self-mitgation isn't an option, contact Microsoft Support for further assistance.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
