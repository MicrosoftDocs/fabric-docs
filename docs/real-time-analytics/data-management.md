---
title: Data management
description: Learn how to manage your data in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 01/31/2024
ms.search.form: Manage data in a KQL Database
---

# Data management

Synapse Real-Time Analytics offers a range of options for managing your data, both on a database and table level. You can manage your data either through the UI of your KQL database or by using management commands. Management commands, also known as control commands, are requests to the service to retrieve information that isn't necessarily data in the database tables, or requests to modify the service state.

For more information, see [Management commands](/azure/data-explorer/kusto/management/index?context=/fabric/context/context&pivots=fabric)

[!INCLUDE [managed-identity](../includes/real-time-analytics/managed-identity.md)]

## Data retention policy

The retention policy controls the mechanism that automatically removes data from tables or [materialized views](/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview?context=/fabric/context/context&pivots=fabric).

For more information, see [Data retention policy](data-policies.md#data-retention-policy).

## Caching policy

The caching policy allows to you to choose which data should be cached and kept in local SSD storage.

For more information, see [Caching policy](data-policies.md#caching-policy).

## One logical copy

To expose the data in your KQL database to all Microsoft Fabric experiences, create a OneLake shortcut.

For more information, see [One logical copy](one-logical-copy.md).

## Table update policy

When you trigger an update policy with a command that adds data to a source table, data also appends to a target table. The target table can have a different schema, retention policy, and other policies from the source table.

For more information, see [Create a table update policy](table-update-policy.md).

## Materialized views

A materialized view is an aggregation query over a source table, or over another materialized view. It represents a single `summarize` statement. You can create materialized views using the `.create materialized-view` command.

For more information, see [Create materialized views](materialized-view.md)

## Stored functions

This feature allows you to create or alter an existing function using the `.create-or-alter` `function` command, which stores it in the database metadata. If the function with the provided *functionName* doesn't exist in the database metadata, the command creates a new function. Otherwise, the named function is changed.

For more information, see [Create stored functions](create-functions.md)

## Related content

* [Create a database](create-database.md)
* [Get data from Azure storage](get-data-azure-storage.md)
* [Query data in a KQL queryset](kusto-query-set.md)
