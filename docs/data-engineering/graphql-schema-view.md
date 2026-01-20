---
title: Fabric API for GraphQL schema view and Schema explorer
description: Learn about the Fabric API for GraphQL schema view and the Schema explorer pane, including how to modify objects.
ms.reviewer: edlima
ms.author: eur
author: eric-urban
ms.topic: article
ms.custom: freshness-kr
ms.search.form: GraphQL schema view
ms.date: 01/21/2026
#customer intent: As a developer, I want to understand how to access and use the GraphQL schema view so that I can explore the API structure and available operations.  
---

# Fabric API for GraphQL schema view and schema explorer

The Fabric API for GraphQL automatically generates a schema that defines the structure of your API based on the data sources you connect. The schema, written in GraphQL Schema Definition Language (SDL), describes all available types, fields, queries, and mutations that clients can use to interact with your data.

The schema view provides a read-only, text-based view of your complete GraphQL schema, while the schema explorer in the left pane lets you navigate, inspect, and modify the objects exposed through your API. Together, these tools help you understand your API's structure and control what data is accessible to clients.

## Who uses the schema view

The schema view and explorer are valuable for:
- **Data engineers** configuring which Fabric lakehouse and warehouse objects to expose through GraphQL
- **Application developers** discovering available Fabric data types, fields, and relationships before writing queries
- **Fabric workspace contributors** understanding and managing the data access structure for their workspace
- **BI developers** reviewing Fabric data relationships when building custom analytics applications

Use the schema view to explore your API's structure and the schema explorer to modify which data objects are exposed.

## Access and explore the schema

You can access the schema view from either the query editor or directly from your GraphQL API item. To open the schema view, select **Schema** from the lower left corner. The schema view displays a read-only, text-based version of your complete GraphQL SDL with all generated types, fields, queries, and mutations.

The following image shows the schema view with the **Schema explorer** pane on the left:

:::image type="content" source="media/graphql-schema-view/schema-view.png" alt-text="Screenshot of the API schema view screen, which includes the Schema explorer in the left pane." lightbox="media/graphql-schema-view/schema-view.png":::

### Navigate with the schema explorer

The **Schema explorer** in the left pane lets you navigate and inspect all the objects in your API. The explorer is available in both the schema view and the query editor, making it easy to explore your API structure while writing queries.

Expand the nodes in the schema explorer to view:
- **Types**: The GraphQL types generated from your data source tables and views
- **Queries**: Automatically generated read operations for retrieving data
- **Mutations**: Automatically generated write operations for creating, updating, and deleting data (warehouse only)

#### Types

Types represent the structure of your data and appear under the name of the data source from which they were generated. The following image shows the **SalesOrderDetail** type generated from the **SalesOrderDetail** table in the **AdventureWorks** SQL analytics endpoint:

:::image type="content" source="media/graphql-schema-view/schema-explorer-types.png" alt-text="Screenshot of the Schema explorer pane, showing the expanded list of types available under an example data source named SalesOrderDetail." lightbox="media/graphql-schema-view/schema-explorer-types.png":::

#### Queries

The API automatically generates queries for retrieving data from the objects you expose. Expand the queries node to see all available read operations:

:::image type="content" source="media/graphql-schema-view/schema-explorer-queries.png" alt-text="Screenshot of the Schema explorer pane, showing an expanded list of automatically generated queries." lightbox="media/graphql-schema-view/schema-explorer-queries.png":::

#### Mutations

Mutations are write operations for creating, updating, and deleting data. Expand the mutations node to see all available write operations:

:::image type="content" source="media/graphql-schema-view/schema-explorer-mutations.png" alt-text="Screenshot of the Schema explorer pane, showing an expanded list of automatically generated mutations." lightbox="media/graphql-schema-view/schema-explorer-mutations.png":::

> [!NOTE]
> Mutations are only generated for Fabric Data Warehouse data sources. SQL Analytics Endpoints (Lakehouses and mirrored databases) are read-only and only support queries. If you don't see mutations in your Schema explorer, verify that you've connected to a Fabric Data Warehouse. 

## Modify objects using the schema explorer

After the API generates your initial schema, you can use the schema explorer to refine what's exposed through your API. The schema explorer provides management options that let you control your API's structure without modifying the underlying data sources. These tools are essential for maintaining a clean, well-organized API that exposes only the data your clients need.

### Access modification options

To modify an object, select the ellipsis (**...**) next to any type in the schema explorer. The following example shows the modification menu for the **SalesOrderDetail** type:

:::image type="content" source="media/graphql-schema-view/schema-explorer-modify-object.png" alt-text="Screenshot of the schema explorer with the ellipsis selected, showing the available menu options." lightbox="media/graphql-schema-view/schema-explorer-modify-object.png":::

### Available modification options

**Update schema** - Synchronizes your GraphQL schema with the latest structure from the data source. Use this when you've added new tables, views, or columns to your data source and want to expose them through the API. This operation discovers and adds new objects while preserving your existing configuration.

**Rename** - Changes how the object appears in your GraphQL API. This is useful for creating more intuitive API naming conventions or hiding implementation details from clients. For example, you might rename `tbl_SalesOrderDetail` to simply `SalesOrderDetail`. The rename only affects the API schema and doesn't modify the underlying data source object.

**Remove from schema** - Removes the object from your GraphQL API, making it unavailable to clients. Use this to hide sensitive data, remove deprecated objects, or simplify your API surface. The data remains in your data source; only the API exposure is removed.

**Manage relationships** - Opens the relationship management interface where you can define how objects connect to each other. Relationships enable nested queries and graph traversal, letting clients retrieve related data in a single request. For more information, see [Manage relationships in Fabric API for GraphQL](manage-relationships-graphql.md).

**Properties** - Displays detailed metadata about the object, including the original name as it appears in the data source, the GraphQL type name, the owner, and the location (workspace and data source name). Use this to verify how objects are mapped between your data source and the GraphQL API.

## Enable and disable queries and mutations

The enable or disable feature for queries and mutations provides administrators and developers with granular control over API access and usage. It allows you to selectively activate or deactivate specific queries and mutations within the GraphQL schema. This lets you manage API capabilities dynamically without modifying code or deploying changes.

Use this feature for scenarios like:
- **API versioning**: Disable deprecated operations while transitioning clients to new versions
- **Maintenance windows**: Temporarily disable write operations (mutations) during data maintenance
- **Security and compliance**: Restrict access to sensitive operations without removing them from the schema
- **Phased rollouts**: Enable new queries or mutations for testing before making them broadly available

Queries and mutations in the schema explorer have two other options:

- **Disable**: Prevents any requests from running the query or mutation. If execution is attempted, an error is returned. After a query or mutation is disabled, a schema reload occurs, and the query or mutation appears grayed out in the schema explorer.

:::image type="content" border="true" source="media/graphql-schema-view/disable-query.png" alt-text="Screenshot of disable query or mutation option shown on schema explorer." lightbox="media/graphql-schema-view/disable-query.png":::

- **Enable**: Lets you re-enable a previously disabled query or mutation. The query or mutation is immediately available after the schema reload operation that occurs when you select the **Enable** option.

:::image type="content" border="true" source="media/graphql-schema-view/enable-query.png" alt-text="Screenshot of enable query of mutation option shown on schema explorer." lightbox="media/graphql-schema-view/enable-query.png":::

> [!NOTE]
> Queries and mutations autogenerated from stored procedures behave differently than those generated from tables or views. They can only be deleted, not disabled. After deletion, you can readd them using the **Get Data** or **Update Schema** options. For more information, see [Stored procedures](api-graphql-stored-procedures.md).

## Related content

- [Fabric API for GraphQL editor](api-graphql-editor.md)
- [Manage relationships in Fabric API for GraphQL](manage-relationships-graphql.md)
- [Get started with Fabric API for GraphQL](get-started-api-graphql.md)
