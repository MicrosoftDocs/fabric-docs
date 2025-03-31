---
title: Known issue - Database mirroring error that source table doesn't exist
description: A known issue is posted where you receive a database mirroring error that source table doesn't exist.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/18/2025
ms.custom: known-issue-1056
---

# Known issue - Database mirroring error that source table doesn't exist

If you drop and recreate the same table quickly and repeatedly on the source SQL database, the mirrored table might enter a failed state. The error message indicates the source table doesn't exist.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

The issue affects Mirrored Azure SQL database, SQL MI, and Fabric SQL database. You see this error when you drop and recreate the same table quickly and repeatedly on the source SQL database. The mirrored table might enter a failed state indicating the source table doesn't exist. The error message is similar to: `Error: SqlError, Type: UserError, Message: Source table does not exist in the current database. Ensure that the correct database context is set. Specify a valid schema and table name for the database`.

## Solutions and workaround

For Azure SQL database and SQL MI, the workaround is to restart mirroring in auto mode when encountering the error. For Fabric SQL database, raise a support request with the Fabric Mirroring team.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
