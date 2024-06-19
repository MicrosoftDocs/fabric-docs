---
title: Known issue - Issue dropping tables with Row Level Security 
description: In the SQL Endpoint, if there is a change to the table schema or the table is being dropped, we drop the table in the SQL Endpoint and any relationships.
If the table is altered, we recreate the table with its relationships.
The table drop is blocked if there are any functions (for example, used in row level security) on the tables. The function needs to be dropped first.
author: LorenzoBonati
ms.author: LorenzoBonati
ms.topic: troubleshooting  
ms.date: 19/06/2024
ms.custom: known-issue-750
---

# Known issue - Issue dropping tables with Row Level Security

Symptom: The following error occurs - Cannot DROP TABLE because it is being referenced by object 'function name']
SQL Endpoint may not sync due to this issue.

**Status:** Open

**Product Experience:** Fabric Data Warehouse 

## Solutions and workarounds

Workaround:

1. Alter security policy drop filter predicate on <table>
2. Update table in OL
3. Wait for sync
4. Alter security policy add filter predicate on <table>

The current limitation is in place until SQL DW supports Alter table.

## Next steps

- This is only a temporary issue until we support alter table Q3, [What's new and planned for Synapse Data Warehouse in Microsoft Fabric - Microsoft Fabric | Microsoft Learn](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Flearn.microsoft.com%2Fen-gb%2Ffabric%2Frelease-plan%2Fdata-warehouse&data=05%7C02%7Clbonati%40microsoft.com%7Cf689f753b8ca4b215e0a08dc8c66b88a%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C638539620017846135%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=1G4sSJsHqJKa0T2aOEE482kXYiBTbfQYH%2BSOisrJXD4%3D&reserved=0)
