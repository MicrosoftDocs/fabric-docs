---
title: Known issue - SQL queries fail intermittently
description: A known issue is posted where SQL queries fail intermittently.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 08/28/2024
ms.custom: known-issue-822
---

# Known issue - SQL queries fail intermittently

You can run SQL queries against a data warehouse. If you have a long running session (typically more than one hour), the query intermittently fails.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

Your SQL query intermittently fails with an error message similar to: `The query failed because the access is denied on table`. When you retry the same query, it succeeds.

## Solutions and workarounds

As a workaround, retry the query.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
