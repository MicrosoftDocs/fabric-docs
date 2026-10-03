---
title: "OneLake Delta metadata API"
description: "Overview of the OneLake REST API endpoint for Delta APIs in Microsoft Fabric."
ms.reviewer: preshah # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.date: 09/16/2026
ms.topic: concept-article
ai-usage: ai-assisted
#customer intent: As a OneLake user, I want to learn what the Delta are, what operations they support, and any current limitations or considerations, so that I can understand how to interact with my Fabric data using the Delta API standard.
---

# OneLake Delta metadata API

OneLake offers a REST API endpoint for interacting with tables in Fabric. This article describes how to get started using this endpoint to interact with Delta APIs available at this endpoint for metadata read operations. These operations are compatible with [Unity Catalog API open standard.](https://github.com/unitycatalog/unitycatalog/tree/main/api)

These operations discover schemas, tables, and table metadata. To retrieve rows from a Delta table while enforcing OneLake security, use the [OneLake table read API](./read-table-data-rest-api.md).

For overall OneLake table API guidance and prerequisite guidance, see the [OneLake table API overview](./table-apis-overview.md).

For examples of using the API, see the [Delta table API samples](./delta-table-apis-get-started.md#example-requests-and-responses).

## Delta table API endpoint

The OneLake table API endpoint is:

```
https://onelake.table.fabric.microsoft.com
```

At the OneLake table API endpoint, the Delta API is available under the following `<BaseUrl>`.

```
https://onelake.table.fabric.microsoft.com/delta
```

## Delta table API operations

This endpoint currently supports the following Delta API operations. You can find examples of these operations in the [Delta table API samples](./delta-table-apis-get-started.md#example-requests-and-responses).

- **List schemas**
    
    `GET <BaseUrl>/<WorkspaceName or WorkspaceID>/<ItemName or ItemID>/api/2.1/unity-catalog/schemas?catalog_name=<ItemName or ItemID>`

    This operation accepts the workspace ID and data item ID (or their equivalent friendly names if they don’t contain any special characters). 
    
    This operation returns the list of schemas within a data item. If the data item doesn't support schemas, a fixed schema named `dbo` is returned.

- **List tables**

    `GET <BaseUrl>/<WorkspaceName or WorkspaceID>/<ItemName or ItemID>/api/2.1/unity-catalog/tables?catalog_name=<ItemName or ItemID>&schema_name=<SchemaName>`

    This operation returns the list of tables found within a given schema.

- **Get table**

    `GET <BaseUrl>/<WorkspaceName or WorkspaceID>/<ItemName or ItemID>/api/2.1/unity-catalog/tables/<TableName>`

    This operation returns metadata details for a table within a schema, if the table is found.

- **Schema exists**

    `HEAD <BaseUrl>/<WorkspaceName or WorkspaceID>/<ItemName or ItemID>/api/2.1/unity-catalog/schemas/<SchemaName>`

    This operation checks for the existence of a schema within a data item and returns success if the schema is found.

- **Table exists**

    `HEAD <BaseUrl>/<WorkspaceName or WorkspaceID>/<ItemName or ItemID>/api/2.1/unity-catalog/tables/<TableName>`

    This operation checks for the existence of a table within a schema and returns success if the schema is found.

## Current limitations, considerations

The OneLake Delta metadata API has the following limitations and considerations:

- **Certain data items may not support schemas**

    Depending on the type of data item you use, such as non-schema-enabled Fabric lakehouses, there may not be schemas within the Tables directory. In such cases, for compatibility with API clients, the OneLake table APIs provide a default, fixed `dbo` schema (or namespace) to contain all tables within a data item.

- **Other query string parameters required if your schema name or table name contains dots**

    If your schema or table name contains dots (.) and is included in the URL, you must also provide other query parameters. For example, when the schema name includes dots, include the catalog_name as a query parameter in the API call to check whether the schema exists.

- **Metadata write operations and other metadata operations**

    The Delta metadata API surface supports only the metadata operations listed in [Delta table API operations](#delta-table-api-operations). This surface doesn't support metadata write operations. This limitation doesn't describe row retrieval through the separate table read API.

## Related content

- Learn more about the [OneLake table APIs overview](./table-apis-overview.md).
- See the [Delta table API samples](./delta-table-apis-get-started.md).
- [Read OneLake table data](./read-table-data-rest-api.md).
