---
title: GQL Query HTTP API reference
description: Refer to the complete HTTP API reference for querying graph data in Microsoft Fabric using GQL (Graph Query Language).
ms.topic: reference
ms.date: 11/18/2025
author: lorihollasch
ms.author: loriwhip
ms.reviewer: splantikow
ms.search.form: GQL Query HTTP API reference
---

# GQL Query API reference

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Run GQL queries against property graphs in Microsoft Fabric using a RESTful HTTP API. This reference describes the HTTP contract: request and response formats, authentication, JSON result encoding, and error handling.

> [!IMPORTANT]
> This article exclusively uses the [social network example graph dataset](sample-datasets.md).

## Overview

The GQL Query API is a single endpoint (RPC over HTTP) that accepts GQL queries as JSON payloads and returns structured, typed results. The API is stateless, handles authentication, and provides comprehensive error reporting.

### Key features

- **Single endpoint** - All operations use HTTP POST to one URL.
- **JSON based** - Request and response payloads use JSON with rich encoding of typed GQL values.
- **Stateless** - No session state required between requests.
- **Type safe** - Strong, GQL-compatible typing with discriminated unions for value representation.

## Prerequisites

* You need a graph in Microsoft Fabric that contains data — including nodes and edges (relationships). See the [graph quickstart](quickstart.md) to create and load a sample graph.
* You should be familiar with [property graphs and a basic understanding of GQL](gql-language-guide.md), including the structure of [execution outcomes and results](gql-language-guide.md#execution-outcomes-and-results).
* You need to install and set up the [Azure CLI](/cli/azure/) tool `az` to log in to your organization. Command line examples in this article assume use of a POSIX-compatible command line shell such as bash.

## Authentication

The GQL Query API requires authentication via bearer tokens.

Include your access token in the Authorization header of every request:

```http
Authorization: Bearer <your-access-token>
```

In general, you can obtain bearer tokens using [Microsoft Authentication Library (MSAL)](/entra/identity-platform/msal-overview) 
or other authentication flows compatible with Microsoft Entra.

Bearer tokens are commonly obtained through two major paths:

### User-delegated access

You can obtain bearer tokens for user-delegated service calls from the command line via the [Azure CLI](/cli/azure/) tool `az`, 

Get a bearer token for user-delegated calls from the command line by:

- Run `az login`
- Then `az account get-access-token --resource https://api.fabric.microsoft.com`

This uses the [Azure CLI](/cli/azure/) tool `az`.

When you use `az rest` for performing requests, bearer tokens are obtained automatically.

### Application access

You can obtain bearer tokens for applications registered in Microsoft Entra. Consult the [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart) for further details.

## API endpoint

The API uses a single endpoint that accepts all query operations:

```
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/GraphModels/{GraphModelId}/executeQuery?preview=true
```

To obtain the `{workspaceId}` for your workspace, you can list all available workspaces using `az rest`:

```bash
az rest --method get --resource "https://api.fabric.microsoft.com" --url "https://api.fabric.microsoft.com/v1/workspaces"
```

To obtain the `{graphId}`, you can list all available graphs in a workspace using `az rest`:

```bash
az rest --method get --resource "https://api.fabric.microsoft.com" --url "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/GraphModels"
```

You can use more parameters to further narrow down query results:

- `--query 'value[?displayName=='My Workspace']` for listing only items with a `displayName` of `My Workspace`.
- `--query 'value[starts_with(?displayName='My')]` for listing only items whose `displayName` starts with `My`.
- `--query '{query}'` for listing only items that match the provided JMESPath `{query}`. See the [Azure CLI documentation on JMESPath](/cli/azure/use-azure-cli-successfully-query) regarding the supported syntax for `{query}`.
- `-o table` for producing a table result.

> [!NOTE] 
> See the [section on using az-rest](#complete-example-with-az-rest) or the [section on using curl](#complete-example-with-curl) for how to execute queries via the API endpoint from a command line shell.

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
      "OPERATION": "",
      "OPERATION_CODE": "0",
      "CURRENT_SCHEMA": "/"
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
| `code`        | string | six-character status code (000000 = success) |
| `description` | string | Human-readable status message                |
| `diagnostics` | object | Detailed diagnostic records                  |
| `cause`       | object | Optional underlying cause status object      |

#### Status codes

Status codes follow a hierarchical pattern:

- `00xxxx` - Complete success
- `01xxxx` - Success with warnings
- `02xxxx` - Success with no data
- `03xxxx` - Success with information
- `04xxxx` and higher - Errors and exception conditions

For more information, see the [GQL status codes reference](gql-reference-status-codes.md).

#### Diagnostic records

Diagnostic records can contain other key-value pairs that further detail the status object. Keys starting with an underscore (`_`) are specific to graph for Microsoft Fabric. The GQL standard prescribes all other keys.

> [!NOTE]
> Values in the diagnostic record of keys specific to graph in Microsoft Fabric are JSON-encoded GQL values. See [Value types and encoding](#value-types-and-encoding).

#### Causes

Status objects include an optional `cause` field when an underlying cause is known.

#### Other status objects

Some results can report other status objects as a list in the (optional) `additionalStatuses` field.

If so, then the primary status object is always determined to be the most critical status object (such as an exception condition) as prescribed by the GQL standard.

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
      "gqlType": "INT32",
      "jsonType": "number"
    }
  ],
  "isOrdered": true,
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

#### Omitted results

For operations that don't return data (for example, catalog and/or data updates):

```json
{
  "kind": "NOTHING"
}
```

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
|---|---|---|---|
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
  "columns": [
    {"name": "name", "gqlType": "STRING", "jsonType": "string"},
    {"name": "mixed", "gqlType": "ANY", "jsonType": "unknown"}
  ],
  "data": [
    {
      "name": "Alice",
      "mixed": {"gqlType": "INT32", "value": 42}
    }
  ]
}
```

## Error handling

### Transport errors

Network and HTTP transport errors result in standard HTTP error status codes (4xx, 5xx).

### Application errors

Application-level errors always return HTTP 200 with error information in the status object:

```json
{
  "status": {
    "code": "42001",
    "description": "error: syntax error or access rule violation",
    "diagnostics": {
      "OPERATION": "query",
      "OPERATION_CODE": "0",
      "CURRENT_SCHEMA": "/",
      "_errorLocation": {
        "gqlType": "STRING",
        "value": "line 1, column 15"
      }
    },
    "cause": {
      "code": "22007",
      "description": "error: data exception - invalid date, time, or, datetime
format",
      "diagnostics": {
        "OPERATION": "query",
        "OPERATION_CODE": "0",
        "CURRENT_SCHEMA": "/"
      }
    }
  }
}
```

### Status checking

To determine success, check the status code:

- Codes starting with `00`, `01`, `02`, `03` indicate success (with possible warnings)
- All other codes indicate errors

## Complete example with az rest

Run a query using the `az rest` command to avoid having to obtain bearer tokens manually, like so:

<!-- GQL Query: Checked 2025-11-20 -->
```bash
az rest --method post --url "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/GraphModels/{GraphModelId}/executeQuery?preview=true" \
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
curl -X POST "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/GraphModels/{GraphModelId}/executeQuery?preview=true" \
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
- **Validate inputs** - Sanitize and properly escape any user-provided query parameters injected into the query.

### Value representation

- **Handle large integer values** - Integers are encoded as strings if they can't be represented as JSON numbers natively.
- **Handle special floating point values** - Floating-point values returned from queries can be `Infinity`, `-Infinity`, or `NaN` (not a number) values.
- **Handle null values** - JSON null represents GQL null.

## Related content

- [Graph data models](graph-data-models.md)
- [GQL language guide](gql-language-guide.md)
- [GQL values and value types](gql-values-and-value-types.md)
- [GQL status codes reference](gql-reference-status-codes.md)