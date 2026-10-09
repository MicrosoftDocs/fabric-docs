---
title: GQL Query HTTP API Reference for graph in Microsoft Fabric
description: Refer to the complete HTTP API reference for querying graph data in graph in Microsoft Fabric using GQL (Graph Query Language) via REST endpoints.
ms.topic: reference
ms.date: 09/18/2026
ms.reviewer: splantikow
ms.search.form: GQL Query HTTP API reference
ai-usage: ai-assisted
---

# GQL Query API reference

Run GQL queries against property graphs in graph in Microsoft Fabric using a RESTful HTTP API. This reference describes the HTTP contract: request and response formats, authentication, JSON result encoding, and error handling.

> [!IMPORTANT]
> This article exclusively uses the [social network example graph dataset](sample-datasets.md).

## Overview

The GQL Query API exposes a REST endpoint that accepts GQL queries as JSON payloads and returns structured, typed results. It supports continuation polling for queries that don't finish during the initial request.

### Key features

- **Single endpoint** - All operations use HTTP POST to one URL.
- **JSON based** - Request and response payloads use JSON with rich encoding of typed GQL values.
- **Continuation polling** - Long-running queries can continue across multiple HTTP requests.
- **Type safe** - Strong, GQL-compatible typing with discriminated unions for value representation.

## Prerequisites

- You need a graph that contains data, including nodes and edges (relationships). See the [graph quickstart](quickstart.md) to create and load a sample graph.
- You should be familiar with [property graphs and a basic understanding of GQL](gql-language-guide.md), including the structure of [execution outcomes and results](gql-language-guide.md#execution-outcomes-and-results).
- You need to install and set up the [Azure CLI](/cli/azure/) tool `az` to sign in to your organization. Command line examples in this article assume use of a POSIX-compatible command line shell such as bash.

## Authentication

The GQL Query API requires authentication via bearer tokens.

Include your access token in the Authorization header of every request:

```http
Authorization: Bearer <your-access-token>
```

In general, you can obtain bearer tokens using [Microsoft Authentication Library (MSAL)](/entra/identity-platform/msal-overview) or other authentication flows compatible with Microsoft Entra.

Bearer tokens are commonly obtained through two major paths:

### User-delegated access

You can obtain bearer tokens for user-delegated service calls from the command line via the [Azure CLI](/cli/azure/) tool `az`.

Get a bearer token for user-delegated calls from the command line by:

- Run `az login`
- Then `az account get-access-token --resource https://api.fabric.microsoft.com`

This uses the [Azure CLI](/cli/azure/) tool `az`.

When you use `az rest` for performing requests, bearer tokens are obtained automatically.

### Application access

You can obtain bearer tokens for applications registered in Microsoft Entra. Consult the [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart) for further details.

## API endpoint

The API uses a single endpoint that accepts all query operations:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/graphModels/{graphModelId}/executeQuery?beta=true
```

The Query API is in beta and isn't recommended for production use. Set the required `beta` query parameter to `true`. The older `preview=true` parameter remains supported for backward compatibility, but use `beta=true` for new integrations.

To obtain the `{workspaceId}` for your workspace, you can list all available workspaces using `az rest`:

```bash
az rest --method get --resource "https://api.fabric.microsoft.com" --url "https://api.fabric.microsoft.com/v1/workspaces"
```

To obtain the `{graphModelId}`, you can list all available graphs in a workspace using `az rest`:

```bash
az rest --method get --resource "https://api.fabric.microsoft.com" --url "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/graphModels"
```

You can use Azure CLI output options to filter or format the responses from these list requests. These options run in the Azure CLI client; they aren't Query API parameters:

- `--query "value[?displayName=='My Workspace']"` lists only items with a `displayName` of `My Workspace`.
- `--query "value[?starts_with(displayName, 'My')]"` lists only items whose `displayName` starts with `My`.
- `--query "{query}"` lists only items that match the provided JMESPath `{query}`. See [Query Azure CLI command results](/cli/azure/use-azure-cli-successfully-query) for the supported syntax.
- `-o table` for producing a table result.

> [!NOTE]
> See the [section on using az-rest](#complete-example-with-az-rest) or the [section on using curl](#complete-example-with-curl) for how to execute queries via the API endpoint from a command line shell.

### Query parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------: | ----------- |
| `beta` | boolean | Yes | Set to `true` to use the beta Query API. |
| `continuationToken` | string | No | Token from `result.nextPage` when a query is still running. Submit the same query text when you use the token. |

### Request headers

| Header          | Value              | Required |
|-----------------|--------------------|---------:|
| `Content-Type`  | `application/json` | Yes      |
| `Accept`        | `application/json` | Yes      |
| `Authorization` | `Bearer <token>`   | Yes      |

## Request format

All requests use HTTP POST with a JSON payload.

### Basic request structure

```json
{
  "query": "MATCH (n) RETURN n LIMIT 100"
}
```

### Request fields

| Field   | Type   | Required | Description              |
|---------|--------|---------:|--------------------------|
| `query` | string | Yes      | The GQL query to execute |

## Response format

All responses for successful requests use HTTP 200 status with JSON payload containing execution status and results.

### Response structure

```json
{
  "status": {
    "code": "00000",
    "description": "note: successful completion",
    "diagnostics": {
      "OPERATION": "query",
      "OPERATION_CODE": "0",
      "CURRENT_SCHEMA": "/",
      "_graphaneGqlStatus": {
        "gqlType": "STRING",
        "value": "00000"
      }
    }
  },
  "result": {
    "kind": "TABLE",
    "columns": [...],
    "data": [...]
  }
}
```

### Status object

Every response includes a status object with execution information:

| Field         | Type   | Description                                  |
|---------------|--------|----------------------------------------------|
| `code`        | string | Five-character public API status code. |
| `description` | string | Human-readable status description. |
| `diagnostics` | object | Detailed diagnostic record, including the canonical query-engine GQLSTATUS when available. |
| `cause`       | object | Optional underlying cause status object. |

#### Status codes

The primary `status.code` uses these public API categories:

- `00000` - Successful completion with at least one row.
- `00001` - Successful completion with an omitted result. Reserved for future DDL and DML support.
- `01000` - Warning or informational condition.
- `02000` - No rows are currently available from a row-producing query.
- `42000` - Syntax, access-rule, or other user-correctable query error.
- `50000` - System or unclassified error.

For more information, see the [GQL status codes reference](gql-reference-status-codes.md).

#### Diagnostic records

Diagnostic records can contain other key-value pairs that further detail the status object. Keys starting with an underscore (`_`) are specific to graph. The GQL standard prescribes all other keys.

> [!NOTE]
> The `_graphaneGqlStatus` diagnostic contains the canonical five-character
> GQLSTATUS reported by the query engine. Every underscore-prefixed diagnostic
> member contains either `null` or a JSON-encoded GQL value. For example,
> `_graphaneGqlStatus` uses `STRING`, while error-classification diagnostics use
> `BOOL`. See [Value types and encoding](#value-types-and-encoding).

#### Causes

Status objects include an optional `cause` field when an underlying cause is known.

#### Other status objects

Some results can report other status objects as a list in the optional `additionalStatuses` field.

The primary status is the most critical recorded condition. Every additional status and nested cause has its own public API code and canonical GQLSTATUS diagnostic.

### Result types

Results use a discriminated union pattern with the `kind` field:

#### Table results

For queries that return tabular data:

```json
{
  "kind": "TABLE",
  "columns": [
    {
      "name": "name",
      "gqlType": "STRING",
      "jsonType": "string"
    },
    {
      "name": "age",
      "gqlType": "INT64",
      "jsonType": "number|string"
    }
  ],
  "isOrdered": false,
  "isDistinct": false,
  "data": [
    {
      "name": "Alice",
      "age": 30
    },
    {
      "name": "Bob",
      "age": 25
    }
  ]
}
```

#### Long-running queries

If a query doesn't finish during the current HTTP request, the API returns HTTP 200 with public status code `02000`, an empty table, and a `nextPage` token:

```json
{
  "status": {
    "code": "02000",
    "description": "No data available, retry with continuation token"
  },
  "result": {
    "kind": "TABLE",
    "columns": [],
    "data": [],
    "nextPage": "{continuationToken}"
  }
}
```

Poll for completion by sending the same request body and adding the token to the URL:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/graphModels/{graphModelId}/executeQuery?beta=true&continuationToken={continuationToken}
```

Treat `nextPage` as an opaque value. Percent-encode it exactly once according
to RFC 3986 before using it as the `continuationToken` query-parameter value.
Don't decode, inspect, or modify the token.

Continue until the response no longer contains `nextPage`. Query execution can continue for up to 20 minutes from the initial request. If it exceeds that total duration, the API returns HTTP 408 with error code `QueryTimeout`.

#### Truncated results

Graph truncates a query response when its internal binary representation exceeds
64 MB. The API returns the rows that fit and adds a status to
`additionalStatuses`. The additional status uses public code `01000` and
preserves canonical GQLSTATUS `01M11` in `_graphaneGqlStatus`.

Truncation doesn't produce a `nextPage` token for the omitted rows. Narrow the query with filters, specific projections, or `LIMIT`, and then run it again.

#### Omitted results

The response schema can represent an operation whose statement never produces
rows, independent of the data or evaluation outcome. This outcome uses status
code `00001`:

```json
{
  "kind": "NOTHING"
}
```

This omitted result differs from a table with no rows. An empty table is the
result of evaluating a row-producing query that currently has no rows to
return.

Graph reserves this result shape and status code for future data definition
language (DDL) and data manipulation language (DML) statement support. Current
query statements always return table results.

## Value types and encoding

The API uses a rich type system to represent GQL values with precise semantics.
The JSON format of GQL values follows a discriminated union pattern.

> [!NOTE]
> The JSON format of tabular results realizes the discriminated union pattern by separating `gqlType` and `value` to achieve a more compact representation. See [Table serialization optimization](#table-serialization-optimization).

### Value structure

```json
{
  "gqlType": "TYPE_NAME",
  "value": <type-specific-value>
}
```

### Primitive types

| GQL Type | Example                                   | Description         |
|----------|-------------------------------------------|---------------------|
| `BOOL`   | `{"gqlType": "BOOL", "value": true}`      | Native JSON boolean |
| `STRING` | `{"gqlType": "STRING", "value": "Hello"}` | UTF-8 string        |

### Numeric types

#### Integer types

| GQL Type | Range         | JSON Serialization | Example                                 |
|----------|---------------|--------------------|-----------------------------------------|
| `INT64`  | -2⁶³ to 2⁶³-1 | Number or string*  | `{"gqlType": "INT64", "value": -9237}`  |
| `UINT64` | 0 to 2⁶⁴-1    | Number or string*  | `{"gqlType": "UINT64", "value": 18467}` |

Large integers outside JavaScript's safe range (-9,007,199,254,740,991 to 9,007,199,254,740,991) are serialized as strings:

```json
{"gqlType": "INT64", "value": "9223372036854775807"}
{"gqlType": "UINT64", "value": "18446744073709551615"}
```

#### Floating-point types

| GQL Type | Range | JSON Serialization | Example |
| -------- | ----- | ------------------ | ------- |
| `FLOAT64` | IEEE 754 binary64 | JSON number or string | `{"gqlType": "FLOAT64", "value": 3.14}` |

Floating-point values support IEEE 754 special values:

```json
{"gqlType": "FLOAT64", "value": "Inf"}
{"gqlType": "FLOAT64", "value": "-Inf"}
{"gqlType": "FLOAT64", "value": "NaN"}
{"gqlType": "FLOAT64", "value": "-0"}
```

### Temporal types

Supported temporal types use ISO 8601 string formats:

| GQL Type         | Format                             | Example                                                               |
|------------------|------------------------------------|-----------------------------------------------------------------------|
| `ZONED DATETIME` | YYYY-MM-DDTHH:MM:SS[.ffffff]±HH:MM | `{"gqlType": "ZONED DATETIME", "value": "2023-12-25T14:30:00+02:00"}` |

### Graph element reference types

| GQL Type | Description          | Example                                        |
|----------|----------------------|------------------------------------------------|
| `NODE`   | Graph node reference | `{"gqlType": "NODE", "value": "node-123"}`     |
| `EDGE`   | Graph edge reference | `{"gqlType": "EDGE", "value": "edge_abc#def"}` |

### Complex types

The complex types are composed of other GQL values.

#### Lists

Lists contain arrays of nullable values with consistent element types:

```json
{
  "gqlType": "LIST<INT64>",
  "value": [1, 2, null, 4, 5]
}
```

Special list types:

- `LIST<ANY>` - Mixed types (each element includes full type info)
- `LIST<NULL>` - Only null values allowed
- `LIST<NOTHING>` - Always empty array

#### Paths

Paths are encoded as lists of graph element reference values.

```json
{
    "gqlType": "PATH",
    "value": ["node1", "edge1", "node2"]
}
```

See [Table serialization optimization](#table-serialization-optimization).

### Table serialization optimization

For table results, value serialization is optimized based on column type information:

- **Known types** - Only the raw value is serialized
- **ANY columns** - Full value object with type discriminator

```json
{
  "kind": "TABLE",
  "columns": [
    {"name": "name", "gqlType": "STRING", "jsonType": "string"},
    {"name": "amount", "gqlType": "INT64", "jsonType": "number|string"},
    {"name": "mixed", "gqlType": "ANY", "jsonType": "object"}
  ],
  "data": [
    {
      "name": "Alice",
      "amount": "123",
      "mixed": {"gqlType": "INT64", "value": "1"}
    }
  ]
}
```

## Error handling

### Transport errors

HTTP status and GQL status describe different layers of the response:

| HTTP status | Meaning |
| ----------- | ------- |
| 200 | The API processed the request. Inspect `status.code` because the result can represent success, no rows, a query still in progress, or a user-correctable query error. |
| 408 | Query execution exceeded the 20-minute total timeout. The error code is `QueryTimeout`. |
| 429 | The service rate limit was exceeded. Wait for the duration in the `Retry-After` header before retrying. |
| 499 | The caller canceled the request. The error code is `ClientCancelled`. |
| Other 4xx or 5xx | The request or service failed before returning a GQL execution outcome. Inspect the HTTP error response. |

### Application errors

An application-level error can return HTTP 200 with error information in the status object. For example, division by zero uses the public API code `42000` and preserves canonical GQLSTATUS `22012` in the diagnostic record:

```json
{
  "status": {
    "code": "42000",
    "description": "error: data exception - division by zero",
    "diagnostics": {
      "OPERATION": "query",
      "OPERATION_CODE": "0",
      "CURRENT_SCHEMA": "/",
      "_graphaneGqlStatus": {
        "gqlType": "STRING",
        "value": "22012"
      },
      "_graphaneIsUserError": {
        "gqlType": "BOOL",
        "value": true
      },
      "_graphaneIsTransientError": {
        "gqlType": "BOOL",
        "value": false
      }
    }
  }
}
```

### Status checking

To determine the broad outcome, check the public `status.code`. Use `_graphaneGqlStatus` when your application needs to distinguish a specific query-engine condition, such as numeric overflow (`22003`) from division by zero (`22012`).

## Complete example with az rest

Run a query using the `az rest` command to avoid having to obtain bearer tokens manually, like so:

<!-- GQL Query: Checked 2025-11-20 -->
```bash
az rest --method post --url "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/graphModels/{graphModelId}/executeQuery?beta=true" \
--headers "Content-Type=application/json" "Accept=application/json" \
--resource "https://api.fabric.microsoft.com" \
--body '{ 
  "query": "MATCH (n:Person) WHERE n.birthday > 19800101 RETURN n.firstName, n.lastName, n.birthday ORDER BY n.birthday LIMIT 100" 
}'
```

## Complete example with curl

The example in this section uses the `curl` tool for performing HTTPS requests from the shell.

We assume you have a valid access token stored in a shell variable, like so:

```bash
export ACCESS_TOKEN="your-access-token-here"
```

> [!TIP]
> See the [section on authentication](#authentication) for how to obtain a valid bearer token.

Run a query like so:

<!-- GQL Query: Checked 2025-11-20 -->
```bash
curl -X POST "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/graphModels/{graphModelId}/executeQuery?beta=true" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "query": "MATCH (n:Person) WHERE n.birthday > 19800101 RETURN n.firstName, n.lastName, n.birthday ORDER BY n.birthday LIMIT 100" 
  }'
```

## Best practices

Follow these best practices when using the GQL Query API.

### Error handling

- **Always check status codes** - Don't assume success based on HTTP 200.
- **Parse error details** - Use diagnostics and cause chains for debugging.

### Security

- **Use HTTPS** - Never send authentication tokens over unencrypted connections.
- **Rotate tokens** - Implement proper token refresh and expiration handling.
- **Validate inputs** - Validate and correctly escape any user-provided values that your application inserts into the query text.

### Value representation

- **Handle large integer values** - Integers are encoded as strings if they can't be represented as JSON numbers natively.
- **Handle special floating-point values** - The API serializes positive infinity, negative infinity, not-a-number, and negative zero as `"Inf"`, `"-Inf"`, `"NaN"`, and `"-0"`.
- **Handle null values** - JSON null represents GQL null.

## Related content

- [graph data models](graph-data-models.md)
- [GQL language guide](gql-language-guide.md)
- [GQL values and value types](gql-values-and-value-types.md)
- [GQL status codes reference](gql-reference-status-codes.md)
