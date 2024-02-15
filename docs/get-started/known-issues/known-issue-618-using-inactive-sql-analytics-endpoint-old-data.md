---
title: Known issue - Using an inactive SQL analytics endpoint can show old data
description: A known issue is posted where Using an inactive SQL analytics endpoint can show old data.
author: mihart
ms.author: mihart
ms.topic: troubleshooting 
ms.date: 02/14/2024
ms.custom: known-issue-618
---

# Known issue - Using an inactive SQL analytics endpoint can show old data

If you use a SQL analytics endpoint that hasn't been active for a while, the SQL analytics endpoint scans the underlying delta tables. It's possible for you to query one of the tables before the refresh is completed with the latest data. If so, you might see old data being returned or even errors being raised if the parquet files were vacuumed.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

When querying a table through the SQL analytics endpoint, you see old data or get an error, similar to: "Failed to complete the command because the underlying location does not exist. Underlying data description: %1."

## Solutions and workarounds

You can retry after allowing the SQL analytics endpoint to complete its refresh process.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
