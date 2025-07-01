---
title: Known issue - SQL analytics endpoint table sync fails when table contains linked functions
description: A known issue is posted where the SQL analytics endpoint table sync fails when table contains linked functions.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/29/2025
ms.custom: known-issue-767
---

# Known issue - SQL analytics endpoint table sync fails when table contains linked functions

The Fabric SQL analytics endpoint uses a backend service to sync delta tables created in a lakehouse. The backend service recreates the tables in the SQL analytics endpoint based on the changes in lakehouse delta tables. When there are functions linked to the SQL table, such as Row Level Security (RLS) functions, the creation operation fails and the table sync fails.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

In the scenario where there are functions linked to the SQL table, some or all of the tables on the SQL analytics endpoint aren't synced.

## Solutions and workarounds

To mitigate the issue, perform the following steps:

1. Run the SQL statement `ALTER SECURITY POLICY DROP FILTER PREDICATE ON <Table>` on the table where the sync failed
1. Update the table on OneLake
1. Force the sync using the lakehouse or wait for the sync to complete automatically
1. Run the SQL statement `ALTER SECURITY POLICY ADD FILTER PREDICATE ON <Table>` on the table where the sync failed
1. Confirm the table is successfully synced by checking the data

Alternatively, you can try dropping and recreating the function.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
