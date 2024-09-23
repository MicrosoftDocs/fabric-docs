---
title: Known issue - Dataflows automatically create tables from queries on Fabric destinations
description: A known issue is posted where dataflows automatically create tables from queries on Fabric destinations.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/04/2024
ms.custom: known-issue-815
---

# Known issue - Dataflows automatically create tables from queries on Fabric destinations

In a Dataflow Gen 2 dataflow, you can create queries using functions or combine files steps. You can also have a data destination that is a lakehouse, warehouse, or other experience in Fabric. If both of the previous criteria are true, the query is created as a table in the destination.

**Status:** Fixed: September 4, 2024

**Product Experience:** Data Factory

## Symptoms

If you face this issue, you might see one of the following symptoms:

- Your refresh fails with the exception: `MashupException.Error: Expression.Error: We cannot convert a value of type Table to type Function. Details: Reason = Expression.Error;Value = #table({}, {});Microsoft.Data.Mashup.Error.Context = User`
- You have undesired tables in your destination loaded by your dataflow.

## Solutions and workarounds

Follow the below steps:

1. Before publishing your dataflow, make sure that only table queries have a destination set
1. If your dataflow failed to refresh, edit your query. Revise any queries with steps added by the Dataflow Gen2 engine such as **Converted to table** and remove any steps to bring your query to the desired state before publishing again

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
