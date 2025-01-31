---
title: Known issue - Data warehouse tables aren't accessible or updatable
description: A known issue is posted where data warehouse tables aren't accessible or updatable.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/17/2024
ms.custom: known-issue-891
---

# Known issue - Data warehouse tables aren't accessible or updatable

You can access data warehouse tables through the SQL analytics endpoint. Due to this known issue, you can't apply changes to the tables. You also see an error marker next to the table and receive an error if you try to access the table. The table sync also doesn't complete as expected.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

You see a red circle with white 'X' next to the unavailable tables. When you try to access table, you receive an error. The error message is similar to: `An internal error has occurred while applying table changes to SQL`.

## Solutions and workarounds

Update the on-premises data gateway to the October or latest version.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
