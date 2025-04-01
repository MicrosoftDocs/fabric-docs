---
title: Known issue - Mirroring fails for tables with unique index on unsupported data type
description: A known issue is posted where mirroring fails for tables with unique index on unsupported data type.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 02/19/2025
ms.custom: known-issue-1027
---

# Known issue - Mirroring fails for tables with unique index on unsupported data type

You have a table with a primary key on a supported data type. The table also has a unique key constraint on an unsupported data type. The table doesn't mirror successfully, and you receive an error.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When trying to mirror the table, the mirror fails. You receive an error, and the message is similar to: `Table cannot be mirrored to Fabric because the primary key column uses one of the following datatypes - computed types, user-defined types, geometry, geography, hierarchy ID, SQL variant, timestamp, datetime2(7), datetimeoffset(7) or time(7)`.

## Solutions and workarounds

Here are a few options to try to restart mirroring:

1. Restart the mirror.
1. Enable only the working tables in the mirror. Add the missing tables using the [Items - Update Mirrored Database Definition public API](/rest/api/fabric/mirroreddatabase/items/update-mirrored-database-definition). Restart the mirror.
1. [Create a support ticket](/power-bi/support/create-support-ticket) if you're still facing the issue.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
