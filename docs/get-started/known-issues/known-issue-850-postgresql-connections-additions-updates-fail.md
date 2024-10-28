---
title: Known issue - PostgreSQL data source connections additions or updates fail
description: A known issue is posted where PostgreSQL data source connections additions or updates fail.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/09/2024
ms.custom: known-issue-850
---

# Known issue - PostgreSQL data source connections additions or updates fail

You can use PostgreSQL as a connection. When you add or update the data source using the PostgreSQL connection, you might receive an error.

**Status:** Fixed: October 9, 2024

**Product Experience:** Power BI

## Symptoms

You receive an error when adding or updating the PostgreSQL data source connection.

## Solutions and workarounds

To work around this issue, use one of the following options to connect:

- Reuse an existing shared cloud connection
- Create a new connection in a dataflow and use this new connection
- Create a connection using a Data Gateway

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
