---
title: Include file for the metrics app matrix default fields
description: Include file that describes the default fields in the Fabric Capacity Metrics app matrix by item and operation visual.
author: dknappettmsft
ms.author: daknappe
ms.topic: include
ms.date: 07/08/2026
---

The following table lists the default fields that the matrix by item and operation visual displays. You can't remove default fields from the table.

|Name      |Description  |
|----------|--------------|
|Workspace |The workspace the item belongs to |
|Item kind |The item type |
|Item name |The item name |
|CU (s)    |Capacity Units (CU) processing time in seconds. Sort to view the top CUs that processed items over the past two weeks   |
|Duration (s) |Processing time in seconds. Sort to view the items that needed the longest processing time during the past two weeks |
|Users     |The number of users that used the item                                 |
|<sup>*</sup>Billing type |Displays information if the item is billable or not     |

<sup>*</sup> The billing type column displays the following values:

* *Billable* - Indicates that operations for this item are billable.
* *Nonbillable*  - Indicates that operations for this item are nonbillable.
* *Both* - An item can have both billing types in two scenarios:
  - If the item has both billable and nonbillable operations.
  - If the item has operations that are in transition period from nonbillable to billable.
