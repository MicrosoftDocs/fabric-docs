---
title: "OneLake Iceberg metadata API"
description: "Overview of the OneLake REST API endpoint for Apache Iceberg REST Catalog (IRC) APIs in Microsoft Fabric."
ms.reviewer: mahi # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.date: 10/09/2026
ms.topic: concept-article
ai-usage: ai-assisted
#customer intent: As a OneLake user, I want to learn what the Iceberg table APIs are, what operations they support, and any current limitations or considerations, so that I can understand how to interact with my Fabric data using the Iceberg REST Catalog standard.
---

# OneLake Iceberg metadata API

OneLake offers a REST API endpoint for interacting with tables in Fabric. This article describes how to use this endpoint to interact with Apache Iceberg REST Catalog (IRC) APIs available at this endpoint for reads, writes, and credential vending.

These operations discover namespaces and support reading and writing table metadata. To retrieve rows from a Delta Lake or Apache Iceberg table while enforcing OneLake security, use the [OneLake table read API](./read-table-data-rest-api.md).

For overall OneLake table API guidance and prerequisite guidance, see the [OneLake table API overview](./table-apis-overview.md).

For examples of using the API, see the [Iceberg table API samples](./iceberg-table-apis-get-started.md#client-quickstart-examples).

## Iceberg table API endpoint

The OneLake table API endpoint is:

```
https://onelake.table.fabric.microsoft.com
```

At the OneLake table API endpoint, the Iceberg REST Catalog (IRC) API is available under the following `<BaseUrl>`. You can generally provide this path when initializing existing IRC clients or libraries.

```
https://onelake.table.fabric.microsoft.com/iceberg
```

Examples of IRC client configuration with the OneLake table endpoint are covered in the [Iceberg table API samples](./iceberg-table-apis-get-started.md#client-quickstart-examples).

> [!NOTE]
> To access Delta Lake tables through Iceberg metadata, enable [automatic Delta Lake to Iceberg metadata conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg) for your tenant or workspace. This setting isn't required to create a native Iceberg table.

## How write operations work

Use the following write workflow for native Iceberg tables, such as tables created through the `Create table` operation. [Virtual Iceberg metadata generated for Delta Lake tables](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg) provides read compatibility with Iceberg clients; it doesn't support Iceberg catalog commits. To update a Delta Lake table, write to the source table by using a Delta Lake-compatible writer.

You can't commit Iceberg metadata updates through table shortcuts. To update descriptions and tags through an internal OneLake table shortcut, use the [additional table metadata API](./additional-table-metadata.md#work-with-metadata-through-onelake-shortcuts) instead.

Native Iceberg write operations use both the catalog endpoint and OneLake storage:

1. The client creates or loads a table through the Iceberg REST Catalog endpoint.
1. The client writes data files, manifests, and metadata files directly to OneLake. The client can authenticate to storage directly or use temporary credentials returned by credential vending.
1. The client commits the metadata update through the Iceberg REST Catalog endpoint. Commit requirements provide optimistic concurrency checks so that conflicting updates fail instead of overwriting a newer table state.

The commit endpoint updates Iceberg metadata; it doesn't carry table rows in the request body. Use an Iceberg client that manages both the storage writes and catalog commit rather than modifying Iceberg metadata files manually.

## Iceberg table API operations

This endpoint currently supports the following IRC operations. You can find examples of these operations in the [Iceberg table API samples](./iceberg-table-apis-get-started.md#example-requests-and-responses).

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

- **Check namespace**

    `HEAD <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>`

    This operation returns `204 No Content` if a schema exists and `404 Not Found` if it doesn't.

- **List tables**

    `GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables`

    This operation returns the list of tables found within a given schema.

- **Get table**

    `GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>`

    This operation returns metadata details for a table within a schema, if the table is found.

- **Check table**

    `HEAD <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>`

    This operation returns `204 No Content` if a table exists and `404 Not Found` if it doesn't.

- **Create table**

    `POST <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables`

    This operation creates a native Iceberg table in a schema by using an IRC `CreateTableRequest`.

- **Commit table updates**

    `POST <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>`

    This operation commits metadata updates to a native Iceberg table by using an IRC `CommitTableRequest`. Commit requests include `requirements` and `updates`. You can't commit updates for table shortcuts or virtual Iceberg metadata generated for Delta Lake tables.

- **Drop table**

    `DELETE <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>`

    This operation removes a table from the catalog and deletes its OneLake directory, including its data and metadata. Don't use it to remove only virtual Iceberg metadata from a Delta Lake table.

- **Load table credentials**

    `GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>/credentials`

    This operation returns temporary storage credentials for a table as an IRC `LoadCredentialsResponse`. You can also request vended credentials when loading a table by sending the `X-Iceberg-Access-Delegation: vended-credentials` header with the `Get table` operation.

## Current limitations, considerations

The use of the OneLake Iceberg metadata API is subject to the following limitations and considerations:

- **Certain data items may not support schemas**

    Depending on the type of data item you use, such as non-schema-enabled Fabric lakehouses, there may not be schemas within the Tables directory. In such cases, for compatibility with API clients, the OneLake table APIs provide a default, fixed `dbo` schema (or namespace) to contain all tables within a data item.

- **Current namespace scope**

    In Fabric, data items contain a flat list of schemas, which each contains a flat list of tables. Today, the top-level namespaces listed by the Iceberg APIs are schemas, so although the Iceberg REST Catalog (IRC) standard supports multi-level namespaces, the OneLake implementation offers one level, mapping to schemas.

    Because of this limitation, we don't yet support the `parent` query parameter for the `list namespaces` operation.

- **Credential vending**

    Credential vending returns temporary storage credentials for an existing table. Each returned credential includes a `prefix` that identifies the storage location where the credential applies. If a client receives multiple credentials of the same type, it should use the most specific matching `prefix`, as described by the Iceberg REST Catalog specification.

- **Client support for vended credentials**

    The client must support applying credentials returned by OneLake to the matching storage location. OneLake returns HTTPS credential prefixes, while Iceberg metadata uses ABFS locations. Clients must account for these URI representations when selecting a credential. The [client examples](./iceberg-table-apis-get-started.md#client-quickstart-examples) show how PyIceberg, Snowflake, and DuckDB request vended credentials and use them for OneLake reads and writes.

- **Other operations**

    Only the operations listed in [Iceberg table API operations](#iceberg-table-api-operations) are supported today. Operations that aren't listed aren't supported by the OneLake table API endpoint.

## Related content

- Learn more about the [OneLake table APIs overview](./table-apis-overview.md).
- See the [Iceberg table API samples](./iceberg-table-apis-get-started.md).
- [Read OneLake table data](./read-table-data-rest-api.md).
- Set up [automatic Delta Lake to Iceberg format conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).
