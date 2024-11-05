---
title: Lineage in KQL database
description: Learn how to view the lineage of KQL database items in Real-Time Intelligence.
ms.reviewer: guregini
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - ignite-2024
ms.date: 11/04/2024
ms.search.form: KQL Database
#Customer intent: .
---
# Lineage in KQL database

In Real-Time Intelligence, you can view the lineage of KQL database items. The lineage view allows you to visually explore relationships between database entities to help you understand the data flow from the source to the destination, providing a clear graph representation. By using lineage, you can efficiently manage your database and gain a deeper understanding of how these entities interact. This visual representation of entities simplifies database management and helps you optimize your data structures, making it easier to track dependencies and take actions quickly.

For more information about lineage in Fabric, see [Lineage](../governance/lineage.md).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with view permissions

## Permissions

Any user with a [role in a workspace](../get-started/roles-workspaces.md) can access that workspace's lineage view. However, users with the *Viewer* role won't see data sources.

## Open lineage view

To access linege view, browse to your KQL database and select **Lineage**.

## What do you see in lineage view?

When you open lineage view on an item, you'll see the connections between all the items in the KQL database.

<!-- Image of Lineage view -->

Lineage view displays the following information:

* Tables
* Update policies
* External tables
* Materialized views
* Functions
* Continuous exports

You can highlight an item's lineage to view its relationships with other items in the database. Lineage highlights all the items related to that item, and dims the rest.

## What scenarios can you use lineage for?

This section explore various scenarios where you can use lineage in KQL database:

### Proactively manage dependencies

Managing dependencies between entities like tables and functions becomes straightforward with lineage. For example, if you rename a table or alter its schema, you can instantly identify which functions rely on that table within their KQL query. This proactive approach helps avoid unexpected issues and ensures seamless updates to your database structure.

### Trace relationships between materialized views and source tables

Lineage allows you to trace the relationships between materialized views and their underlying source tables. This makes it simple to identify original data sources, enabling you to track and troubleshoot data flow more effectively.

### Interact with elements and act

You can click on any element in the graph to highlight its related items, while the rest of the graph is dimmed out, making it easier to focus on specific relationships. For tables and external tables, additional options are available, such as querying the table, creating a Power BI report based on the table, and more

### Track record ingestion

Lineage enables you to track how many records were ingested into each table and materialized view. This clear view of data flows helps you stay on top of ingestion size and volume, ensuring your database processes data correctly.

## Related content

* [Lineage](../governance/lineage.md)
