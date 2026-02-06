---
title: "OneLake table APIs for Delta"
description: "Overview of the OneLake REST API endpoint for Delta APIs in Microsoft Fabric."
ms.reviewer: preshah
ms.author: preshah
author: mspreshah
ms.date: 10/23/2025
ms.topic: concept-article
#customer intent: As a OneLake user, I want to learn what the Delta are, what operations they support, and any current limitations or considerations, so that I can understand how to interact with my Fabric data using the Delta API standard.
---

# OneLake table APIs for Delta

OneLake offers a REST API endpoint for interacting with tables in Microsoft Fabric. This article describes how to get started using this endpoint to interact with Delta APIs available at this endpoint for metadata read operations. These operations are compatible with [Unity Catalog API open standard.](https://github.com/unitycatalog/unitycatalog/tree/main/api)

For overall OneLake table API guidance and prerequisite guidance, see the [OneLake table API overview](./table-apis-overview.md).

For detailed API documentation, see the [Getting started guide](./delta-table-apis-get-started.md#example-requests-and-responses). 

## Delta table API endpoint

The OneLake table API endpoint is:

```
https://onelake.table.fabric.microsoft.com
```

At the OneLake table API endpoint, the Delta APIs are available under the following `<BaseUrl>`. 

```
https://onelake.table.fabric.microsoft.com/delta
```

## Delta table API operations

The following Delta API operations are currently supported at this endpoint. Detailed guidance for these operations is available in the [Getting started guide](./delta-table-apis-get-started.md#example-requests-and-responses).

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

The use of the OneLake table APIs for Delta is subject to the following limitations and considerations:

- **Certain data items may not support schemas**

    Depending on the type of data item you use, such as non-schema-enabled Fabric lakehouses, there may not be schemas within the Tables directory. In such cases, for compatibility with API clients, the OneLake table APIs provide a default, fixed `dbo` schema (or namespace) to contain all tables within a data item.

- **Other query string parameters required if your schema name or table name contains dots**

    If your schema or table name contains dots (.) and is included in the URL, you must also provide other query parameters. For example, when the schema name includes dots, include the catalog_name as a query parameter in the API call to check whether the schema exists.

- **Metadata write operations, other operations**

    Only the operations listed in [Delta table API operations](#delta-table-api-operations) are supported today. Operations that handle metadata write operations aren't yet supported by the OneLake table Delta API endpoint. 

## Related content

- Learn more about [OneLake table APIs](./table-apis-overview.md).
- See [detailed guidance and API details](./delta-table-apis-get-started.md).
