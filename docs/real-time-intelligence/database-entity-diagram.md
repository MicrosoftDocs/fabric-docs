---
title: View an entity diagram in KQL database (preview)
description: Learn how to access an entity diagram in KQL database to view the relationship between items in Real-Time Intelligence.
ms.reviewer: guregini
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.date: 08/05/2025
ms.search.form: KQL Database
#Customer intent: Learn how to use the entity diagram in KQL database to manage and optimize database relationships and dependencies.
---
# View an entity diagram in KQL database (preview)

In Real-Time Intelligence, you can view the lineage and relationship of KQL database items. The view allows you to visually explore relationships between database entities and help you understand the data flow from the source to the destination, providing a clear graph representation. By using the entity diagram, you can efficiently manage your database and gain a deeper understanding of how these entities interact. This visual representation of entities simplifies database management and helps you optimize your data structures, making it easier to track dependencies and take actions quickly.

For information about workspace lineage in Fabric, see [Lineage](../governance/lineage.md).

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with view permissions

For users who want to turn on the ingestion details:
* Database Admin or Database Monitor permissions to view ingestion details in the entity diagram. For more information, see [Role-based access control](/kusto/access-control/role-based-access-control?view=microsoft-fabric&preserve-view=true).


## Open entity diagram view

To access the view, browse to your desired KQL database and select **Entity diagram**.

## What do you see in an entity diagram view?

When you open entity diagram view, you see the dependencies between all the items in the KQL database.

:::image type="content" source="media/database-entity-diagram/entity-diagram-view.png" alt-text="Screenshot showing an entity diagram view in KQL database." lightbox="media/database-entity-diagram/entity-diagram-view.png":::

The entity diagram view displays the following information:

* Tables
* Update policies
* External tables
* Materialized views
* Functions
* Continuous exports
* [Cross-database entities](/kusto/query/cross-cluster-or-database-queries?view=microsoft-fabric&preserve-view=true)
* [Eventstreams](event-streams/overview.md)

You can select an item to view its relationships with other items in the database. The entity diagram highlights all the items related to that item, and dims the rest.

**View ingestion details**

You can also view the ingestion details of each table and materialized view. To view ingestion details, on the right side of the ribbon, select **Show details** and under **Ingestion**, select the desired time range. The information is added to the relevant entity's card.

:::image type="content" source="media/database-entity-diagram/entity-diagram-ingestion-details.gif" alt-text="Screenshot of an entity diagram, showing the ingestion details view." lightbox="media/database-entity-diagram/entity-diagram-ingestion-details.gif":::

**View ingestion from Eventstreams details**

You can also view ingestion details for each table originating from [Eventstream](event-streams/overview.md).

:::image type="content" source="media/database-entity-diagram/entity-diagram-event-stream.png" alt-text="Screenshot of an entity diagram, showing the ingestion from Eventstream details view." lightbox="media/database-entity-diagram/entity-diagram-event-stream.png":::

In addition to the name of the eventstream, you can see additional information by selecting the green stream icon, which reveals the name of the [derived stream](event-streams/add-destination-derived-stream.md) and the name of the [ingestion mapping](/kusto/management/mappings?view=microsoft-fabric&preserve-view=true). If no mapping is displayed, the [default (identity) mapping](/kusto/management/mappings?view=microsoft-fabric#identity-mapping&preserve-view=true) is being used. When you enable **Ingestion** details under **Show details**, you'll see the number of records ingested into each table from all sources, including Eventstreams.

:::image type="content" source="media/database-entity-diagram/diagram-click-icon.png" alt-text="Screenshot of an entity diagram, with the details revealed after clicking the green icon." lightbox="media/database-entity-diagram/diagram-click-icon.png":::

>[!NOTE]
> Only Eventstreams appear as external sources in the entity diagram view. Other external sources are not displayed in the entity diagram.

## What scenarios can you use an entity diagrams for?

This section explores various scenarios where you can use the entity diagram view in KQL database:

### Proactively manage dependencies

Managing dependencies between entities like tables and functions becomes straightforward with lineage. For example, if you rename a table or alter its schema, you can instantly identify which functions rely on that table within their KQL query. This proactive approach helps avoid unexpected issues and ensures seamless updates to your database structure.

### Trace relationships between materialized views and source tables

Entity diagrams allow you to trace the relationships between materialized views and their underlying source tables. This makes it simple to identify original data sources, enabling you to track and troubleshoot data flow more effectively.

### Interact with elements and act

You can select on any element in the graph to highlight its related items, while the rest of the graph is dimmed out, making it easier to focus on specific relationships. For tables and external tables, in the **More menu** [**...**], you can select other options, such as querying the table, creating a Power BI report based on the table, and more.

:::image type="content" source="media/database-entity-diagram/entity-diagram-table-more-menu.png" alt-text="Screenshot of an entity diagram table, showing the more menu.":::

### Track record ingestion

Entity diagrams enable you to track how many records were ingested into each table and materialized view. This clear view of data flows helps you stay on top of ingestion size and volume, ensuring your database processes data correctly.

## Related content

* [Workspace lineage](../governance/lineage.md)
