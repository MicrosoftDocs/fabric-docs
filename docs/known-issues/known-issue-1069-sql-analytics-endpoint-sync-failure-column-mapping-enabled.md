---
title: Known issue - SQL analytics endpoint sync failure when columnMapping is enabled
description: A known issue is posted where you see an SQL analytics endpoint sync failure when columnMapping is enabled.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/24/2025
ms.custom: known-issue-1069
---

# Known issue - SQL analytics endpoint sync failure when columnMapping is enabled

You can create a lakehouse table that contains columns with [data types not supported by the SQL analytics endpoint](/fabric/data-warehouse/data-types#unsupported-data-types). You can also set the table property of `delta.columnMapping.mode` to `name`. If both of these cases are true, the metadata sync fails, and you see table sync failures.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

The SQL analytics endpoint metadata sync fails and causes table sync failures. The failure happens when the lakehouse table has an unsupported column and the `delta.columnMapping.mode` property is enabled.

## Solutions and workarounds

To work around this issue, drop the unsupported column from the lakehouse table.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
