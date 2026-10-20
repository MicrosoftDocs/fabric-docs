---
title: "Read and write additional table metadata (preview)"
description: "Use the OneLake additional table metadata API to read and write descriptions and tags for tables and columns."
ms.reviewer: mahi # Product team ms alias(es)
ms.date: 10/09/2026
ms.topic: how-to
ai-usage: ai-generated
#customer intent: As an application developer, I want to read and write table and column descriptions and tags in OneLake without using a format-specific metadata API.
---

# Read and write additional table metadata (preview)

<!-- Validated description and tag writes by using columnName in MSIT and DXT through each environment's table endpoint, including description-only requests and empty columns arrays. Also validated replacement semantics and description read-through and write-through for an internal OneLake table shortcut in the same MSIT lakehouse. -->

Use the OneLake additional table metadata API to read and write descriptions and key-value tags for a table and its columns. This API uses a common REST route rather than the Iceberg REST Catalog or Unity Catalog-compatible routes.

For example, add a description that explains a table's business purpose, tag the table with its owning team, and describe how to interpret a column. These operations work with descriptive metadata, not table rows. To retrieve rows, use the [OneLake table read API](./read-table-data-rest-api.md).

> [!IMPORTANT]
> The additional table metadata API is in **public preview**. Features and behavior might change before general availability.

## Prerequisites

- Complete the [shared table API prerequisites and authentication steps](./table-apis-overview.md#prerequisites).
- Identify the workspace ID, item ID, schema name, and table name for your target table.
- Identify the existing columns that you want to describe or tag.
- Use an identity with the permissions required to read or write metadata for the target table.

The examples use a table named `sales` in the `dbo` schema and an existing column named `customer_id`. Replace these names with the names for your table.

## Endpoint and operations

Use the following base URL:

```text
https://onelake.table.fabric.microsoft.com
```

Both operations use the same route:

```text
/common/v1/<WorkspaceID>/<ItemID>/schemas/<SchemaName>/tables/<TableName>/additionalMetadata
```

| Method | Operation | Successful response |
| --- | --- | --- |
| `GET` | Read additional metadata for a table and its columns. | `200 OK` with a JSON metadata response. |
| `POST` | Set additional metadata for a table and its columns. | `200 OK` with a JSON metadata response. |

Use GUIDs for `<WorkspaceID>` and `<ItemID>`. URL-encode the schema and table names as individual path segments. Include an `Authorization: Bearer <Token>` header with a Microsoft Entra ID access token for the `https://storage.azure.com/` audience. For `POST`, also include `Content-Type: application/json`.

## Supported descriptions and tags

Use these fields in a `POST` request:

| Field | Type | Description and limits |
| --- | --- | --- |
| `description` | String | The table description. Maximum 1,024 characters. |
| `tags` | Object | Table tags as string key-value pairs. Each key has a maximum of 128 characters, and each value has a maximum of 256 characters. |
| `columns` | Array | Additional metadata for the columns that you identify in the request. |
| `columns[].columnName` | String | The name of an existing column. Use this field to identify the column that you want to describe or tag. |
| `columns[].description` | String | The column description. Maximum 1,024 characters. |
| `columns[].tags` | Object | Column tags as string key-value pairs. The key and value limits are the same as for table tags. |

## Read additional metadata

Send a `GET` request to get table-level and column-level metadata.

```http
GET https://onelake.table.fabric.microsoft.com/common/v1/<WorkspaceID>/<ItemID>/schemas/dbo/tables/sales/additionalMetadata
Authorization: Bearer <Token>
Accept: application/json
```

A successful request returns `200 OK`. The following JSON shows the response format:

```json
{
  "description": "Sales transactions.",
  "tags": {
    "domain": "sales",
    "owner": "sales-analytics"
  },
  "columns": [
    {
      "columnName": "customer_id",
      "description": "Customer identifier.",
      "tags": {
        "role": "customer-key"
      }
    }
  ]
}
```

The values, column names, and fields in your response depend on the target table and its metadata. The contract doesn't require every field to be present.

## Write additional metadata

Send a `POST` request with a JSON body to replace the table's additional metadata.

> [!IMPORTANT]
> `POST` replaces existing additional metadata; it isn't a partial update. Include the table description, table tags, and column descriptions and tags that you want to keep in each request. For example, a request that contains only `description` sets the table description and removes existing table tags and all column descriptions and tags.

This example sets a table description and tags, plus a description and tag for `customer_id`. It identifies the column by using `columnName`.

```http
POST https://onelake.table.fabric.microsoft.com/common/v1/<WorkspaceID>/<ItemID>/schemas/dbo/tables/sales/additionalMetadata
Authorization: Bearer <Token>
Content-Type: application/json
Accept: application/json
```

Request body:

```json
{
  "description": "Sales transactions used for revenue reporting.",
  "tags": {
    "domain": "sales",
    "owner": "sales-analytics"
  },
  "columns": [
    {
      "columnName": "customer_id",
      "description": "Identifier of the customer associated with the sale.",
      "tags": {
        "role": "customer-key"
      }
    }
  ]
}
```

A successful request returns `200 OK` with an additional metadata response. For example:

```json
{
  "description": "Sales transactions used for revenue reporting.",
  "tags": {
    "domain": "sales",
    "owner": "sales-analytics"
  },
  "columns": [
    {
      "columnName": "customer_id",
      "description": "Identifier of the customer associated with the sale.",
      "tags": {
        "role": "customer-key"
      }
    }
  ]
}
```

Send another `GET` request to check the metadata after the write.

### Preserve existing metadata

To change selected descriptions or tags without removing other metadata, use a read-modify-write sequence:

1. Send a `GET` request to read the current additional metadata.
1. Change the descriptions or tags that you want to update in the returned metadata. Retain the other fields, tag keys, and column entries that you want to keep.
1. Send the complete updated metadata in a `POST` request.
1. Send another `GET` request to confirm the result.

Coordinate concurrent metadata updates so another write doesn't occur between your `GET` and `POST` requests.

## Read and write metadata with Python

The following sample authenticates with Microsoft Entra ID, reads the current metadata, updates selected descriptions and tags while preserving other metadata, and reads the metadata again. It doesn't call a format-specific catalog API or request storage credentials.

> [!CAUTION]
> Running this sample writes metadata. Use a test table and column, and replace the example descriptions and tags before you run it. The sample preserves metadata from its initial read, but it can overwrite changes made by another client before the write.

Install the dependencies:

```bash
python -m pip install azure-identity requests
```

Configure a supported [Azure Identity authentication method](/python/api/overview/azure/identity-readme#defaultazurecredential), such as signing in locally with Azure CLI, before running the sample.

```python
import json
from urllib.parse import quote

import requests
from azure.identity import DefaultAzureCredential

workspace_id = "<WorkspaceID>"
item_id = "<ItemID>"
schema_name = "dbo"
table_name = "sales"
column_name = "customer_id"

url = (
    "https://onelake.table.fabric.microsoft.com/common/v1/"
    f"{workspace_id}/{item_id}/schemas/{quote(schema_name, safe='')}/"
    f"tables/{quote(table_name, safe='')}/additionalMetadata"
)

with DefaultAzureCredential() as credential, requests.Session() as session:
    session.headers.update({"Accept": "application/json"})

    def request_metadata(method, **kwargs):
        token = credential.get_token("https://storage.azure.com/.default")
        response = session.request(
            method,
            url,
            headers={"Authorization": f"Bearer {token.token}"},
            timeout=30,
            **kwargs,
        )
        response.raise_for_status()
        return response.json()

    metadata = request_metadata("GET")
    print("Before:")
    print(json.dumps(metadata, indent=2))

    metadata["description"] = "Sales transactions used for revenue reporting."
    metadata.setdefault("tags", {}).update(
        {"domain": "sales", "owner": "sales-analytics"}
    )

    columns = metadata.setdefault("columns", [])
    column = next(
        (entry for entry in columns if entry.get("columnName") == column_name),
        None,
    )
    if column is None:
        column = {"columnName": column_name}
        columns.append(column)

    column["description"] = "Identifier of the customer associated with the sale."
    column.setdefault("tags", {}).update({"role": "customer-key"})

    print("Write response:")
    print(json.dumps(request_metadata("POST", json=metadata), indent=2))

    print("After:")
    print(json.dumps(request_metadata("GET"), indent=2))
```

The `json` argument sets the `Content-Type: application/json` request header. The sample raises an exception for an unsuccessful HTTP response rather than treating it as a successful metadata update.

## Work with metadata through OneLake shortcuts

For an internal OneLake table shortcut, use the shortcut's workspace ID, item ID, schema name, and table name in the same additional metadata route. The operations work with the target table's metadata, not a separate copy of metadata for the shortcut:

- `GET` returns the target table's additional metadata, including its descriptions and tags.
- `POST` replaces the target table's additional metadata. The changes are visible when you read metadata through either the shortcut or the target table.

For example, if a shortcut named `sales_shortcut` points to `sales`, read the source table's metadata through the shortcut by using this request:

```http
GET https://onelake.table.fabric.microsoft.com/common/v1/<WorkspaceID>/<ItemID>/schemas/dbo/tables/sales_shortcut/additionalMetadata
Authorization: Bearer <token>
Accept: application/json
```

To update metadata through the shortcut, send a `POST` request to the same URL. The [replacement semantics](#write-additional-metadata) also apply to the target table: a description-only request through the shortcut removes the target table's existing tags and column metadata. Use the [read-modify-write sequence](#preserve-existing-metadata) to retain metadata that you want to keep.

Access requires permissions for the operation on both the shortcut path and the target table path. For passthrough shortcuts, your identity needs both sets of permissions; target-table permissions alone aren't sufficient. For delegated shortcuts, target access uses the configured connection identity. For details, see [OneLake shortcut security](../onelake-shortcut-security.md#accessing-shortcuts).

## Handle errors and diagnose requests

For an unsuccessful request, inspect the HTTP status and the JSON error response. The error contract has the following shape; the code and message placeholders aren't specific service error values:

```json
{
  "error": {
    "code": "<ErrorCode>",
    "message": "<ErrorMessage>"
  }
}
```

The `error` object can also include a `target` and a `details` array. Each detail contains a `code` and `message`, and can include a `target`. The contract doesn't enumerate operation-specific error codes or status codes.

For diagnostics, you can send an optional `x-ms-root-activity-id` header containing a GUID. Record the `x-ms-root-activity-id` response header when you troubleshoot a request. Don't log the bearer token.

## Related content

- [Overview of OneLake table APIs](./table-apis-overview.md).
- [OneLake Iceberg metadata API](./iceberg-table-apis-overview.md).
- [OneLake Delta metadata API](./delta-table-apis-overview.md).
- [OneLake shortcuts](../onelake-shortcuts.md).
- [Read OneLake table data](./read-table-data-rest-api.md).
