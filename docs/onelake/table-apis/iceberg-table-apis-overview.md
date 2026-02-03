---
title: "OneLake table APIs for Iceberg"
description: "Overview of the OneLake REST API endpoint for Apache Iceberg REST Catalog (IRC) APIs in Microsoft Fabric."
ms.reviewer: mahi
ms.author: mahi
author: matt1883
ms.date: 10/01/2025
ms.topic: concept-article
#customer intent: As a OneLake user, I want to learn what the Iceberg table APIs are, what operations they support, and any current limitations or considerations, so that I can understand how to interact with my Fabric data using the Iceberg REST Catalog standard.
---

# OneLake table APIs for Iceberg

OneLake offers a REST API endpoint for interacting with tables in Microsoft Fabric. This article describes how to get started using this endpoint to interact with Apache Iceberg REST Catalog (IRC) APIs available at this endpoint for metadata read operations.

For overall OneLake table API guidance and prerequisite guidance, see the [OneLake table API overview](./table-apis-overview.md).

For detailed API documentation, see the [Getting started guide](./iceberg-table-apis-get-started.md#client-quickstart-examples). 

## Iceberg table API endpoint

The OneLake table API endpoint is:

```
https://onelake.table.fabric.microsoft.com
```

At the OneLake table API endpoint, the Iceberg REST Catalog (IRC) APIs are available under the following `<BaseUrl>`. You can generally provide this path when initializing existing IRC clients or libraries.

```
https://onelake.table.fabric.microsoft.com/iceberg
```

Examples of IRC client configuration with the OneLake table endpoint are covered in the [Getting started guide](./iceberg-table-apis-get-started.md#client-quickstart-examples).

> [!NOTE]
> Before using the Iceberg APIs, be sure you have Delta Lake to Iceberg metadata conversion enabled for your tenant or workspace. [See the instructions to learn how to enable automatic Delta Lake to Iceberg metadata conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).

## Iceberg table API operations

The following IRC operations are currently supported at this endpoint. Detailed guidance for these operations is available in the [Getting started guide](./iceberg-table-apis-get-started.md#example-requests-and-responses).

- **Get configuration**
    
    `GET <BaseUrl>/v1/config?warehouse=<Warehouse>`

    This operation accepts the workspace ID and data item ID (or their equivalent friendly names if they don’t contain any special characters). `<Warehouse>` is typically `<WorkspaceID>/<dataItemID>`.
    
    This operation returns the `Prefix` string that is used in subsequent requests.

- **List namespaces**

    `GET <BaseUrl>/v1/<Prefix>/namespaces`

    This operation returns the list of schemas within a data item. If the data item doesn't support schemas, a fixed schema named `dbo` is returned.

- **Get namespace**

    `GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>`

    This operation returns information about a schema within a data item, if the schema is found. If the data item doesn't support schemas, a fixed schema named `dbo` is supported here.

- **List tables**

    `GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables`

    This operation returns the list of tables found within a given schema.

- **Get table**

    `GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>`

    This operation returns metadata details for a table within a schema, if the table is found.

## Current limitations, considerations

The use of the OneLake table APIs for Iceberg is subject to the following limitations and considerations:

- **Certain data items may not support schemas**

    Depending on the type of data item you use, such as non-schema-enabled Fabric lakehouses, there may not be schemas within the Tables directory. In such cases, for compatibility with API clients, the OneLake table APIs provide a default, fixed `dbo` schema (or namespace) to contain all tables within a data item.

- **Current namespace scope**

    In Fabric, data items contain a flat list of schemas, which each contains a flat list of tables. Today, the top-level namespaces listed by the Iceberg APIs are schemas, so although the Iceberg REST Catalog (IRC) standard supports multi-level namespaces, the OneLake implementation offers one level, mapping to schemas.

    Because of this limitation, we don't yet support the `parent` query parameter for the `list namespaces` operation.

- **Metadata write operations, other operations**

    Only the operations listed in [Iceberg table API operations](#iceberg-table-api-operations) are supported today. Operations that handle metadata write operations aren't yet supported by the OneLake table API endpoint. We plan to add support for more operations at a later time.

## Related content

- Learn more about [OneLake table APIs](./table-apis-overview.md).
- See [detailed guidance and API details](./iceberg-table-apis-get-started.md).
- Set up [automatic Delta Lake to Iceberg format conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).
