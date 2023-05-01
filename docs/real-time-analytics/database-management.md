---
title: Data management in Real-Time Analytics
description: Learn how to manage your data in a KQL Database.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Data management

Synapse Real-Time Analytics offers a range of options for managing your data, both on a database and table level. You can manage your data either through the UI of your KQL Database or by using management commands. Management commands, also known as control commands, are requests to the service to retrieve information that is not necessarily data in the database tables, or requests to modify the service state.

For more information, see [Management commands](/azure/data-explorer/kusto/management/index?context=/fabric/context/context&pivots=fabric)

You can manage your data in the following ways:

* Modify [Data retention policy](#data-retention-policy)
* Activate [Data copy to OneLake](#data-copy-to-onelake)
* Create [Stored functions](#stored-functions)
* Create [Materialized views](#materialized-views)
<!-- * Alter [table policy update](#table-update-policy)-->

## Database management

### Data retention policy

To change the data retention policy, select **Manage** on the **Home** tab of your database. And then, select **Data retention policy** to modify it. Then, enter a time period and select **Done**. By default, your data is stored for 36,500 days.

For more information, see [Retention policy](/azure/data-explorer/kusto/management/retentionpolicy?context=/fabric/context/context).  

### Data copy to OneLake

To expose the data in your KQL database to all of [!INCLUDE [product-name](../includes/product-name.md)]'s experiences, activate data copy and create a OneLake shortcut. For more information, see [One logical copy](onelake-mirroring.md).

## Table management

<!-- ### Table update policy



-->
### Materialized views

A materialized view is an aggregation query over a source table, or over another materialized view. It represents a single `summarize` statement. You can create materialized views using the `.create materialized-view` command.

For more information, see [Create materialized views](materialized-view.md)

## Stored functions

This feature allows you to create or alter an existing function using the `.create-or-alter` `function` command, which stores it in the database metadata. If the function with the provided *functionName* doesn't exist in the database metadata, the command creates a new function. Otherwise, the named function is changed.

For more information, see [Create stored functions](create-functions.md)

## Next steps

* [Create a database](create-database.md)
* [Get data from a blob](get-data-blob.md)
* [Query data in the KQL Queryset](kusto-query-set.md)
