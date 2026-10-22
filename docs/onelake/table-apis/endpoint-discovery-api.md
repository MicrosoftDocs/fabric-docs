---
title: Discover item endpoints with the OneLake API
description: Use the OneLake endpoint discovery API to find connection details, authentication audiences, MCP servers, and skills for a Microsoft Fabric item.
ms.service: fabric
ms.subservice: onelake
ms.topic: reference
ms.date: 10/20/2026
ai-usage: ai-assisted
---

# Discover item endpoints with the OneLake API

Use the OneLake endpoint discovery API to find how your application or agent can connect to a Microsoft Fabric item. One request returns connection details grouped by engine, including authentication audiences, Model Context Protocol (MCP) servers, and agent skills where available.

Instead of maintaining a list of endpoints for each item type, your integration reads the discovery response and selects a connection it supports. For example, an application can discover a lakehouse's SQL connection details, while an agent can discover its recommended MCP server.

Discovery returns connection metadata. It doesn't run queries, return table rows, or grant access to the returned services.

## Prerequisites

- Identify the workspace and item you want to connect to. Use their globally unique identifiers (GUIDs), or the workspace name and item name with its item-type suffix.
- Use a Microsoft Entra identity with access to the target item.
- Obtain a Microsoft Entra access token for the Azure Storage audience, `https://storage.azure.com/`. For authentication libraries that accept scopes, use `https://storage.azure.com/.default`.
- Ensure your client can reach the discovery endpoint and the service you select from its response, subject to the workspace's network restrictions.

For authentication setup, see [Prepare for authentication](./table-apis-overview.md#prepare-for-authentication). Discovery is scoped to an item, so you don't need a schema name or table name for this request.

> [!IMPORTANT]
> Authenticate the discovery request with an Azure Storage token, not a Fabric API token. After discovery, use the `auth.audience` returned for the connection you select. Different connections in the same response can require different audiences.

## Request

```http
GET https://onelake.table.fabric.microsoft.com/api/v2/{workspaceId}/{itemId}/endpoints
Authorization: Bearer <access-token>
Accept: application/json
```

The request has no body.

### Path parameters

Use either of these addressing forms:

| Form | Path | Description |
| --- | --- | --- |
| IDs | `/api/v2/{workspaceId}/{itemId}/endpoints` | Both values are nonempty GUIDs, including dashes. The item must belong to the specified workspace. |
| Names | `/api/v2/{workspaceName}/{itemName}.{itemType}/endpoints` | Both values use names. The item segment includes its OneLake item-type suffix, such as `Sales.Lakehouse`. URL-encode each complete path segment. |

Don't mix a workspace GUID with an item name, or a workspace name with an item GUID. Mixed addressing returns `400 Bad Request`. A name-based request without the item-type suffix also returns `400 Bad Request`.

Prefer IDs when you already have them. Names can change when a workspace or item is renamed.

### Workspace-specific host

For workspace-specific hostnames and private-link routing, see [OneLake and private links](../onelake-manage-inbound-access.md#onelake-and-private-links). For the networking model and setup guidance, see [Workspace-level private links](../../security/security-workspace-level-private-links-overview.md).

## Response

A successful request returns `200 OK` with an `application/json` body.

The response contains a `workspace` object and an `items` array. The item addressed by the request appears in that array, including when the request uses GUIDs. Its `engines` array groups the available ways to connect.

### Workspace and item properties

| Property | Type | Description |
| --- | --- | --- |
| `workspace.id` | String | Resolved workspace GUID. |
| `workspace.name` | String | Workspace name. |
| `items` | Array of objects | Resolved item and its connection metadata. |
| `items[].id` | String | Resolved item GUID. |
| `items[].name` | String | Item name. |
| `items[].type` | String | OneLake item-type name. This can differ from `platformType`. |
| `items[].platformType` | String | Public Fabric item-type name. |
| `items[].isSchemaEnabled` | Boolean | Whether schemas are enabled for the item. |
| `items[].defaultSchema` | String | Default schema name, when returned. Don't assume this property is present for every item. |
| `items[].isDataItem` | Boolean | Whether the item is classified as a data item. This isn't a connection-availability or permission check. |
| `items[].supportsTables` | Boolean | Whether the item supports tables. This doesn't establish that tables exist or that the caller can read them. |
| `items[].engines` | Array of objects | Connection options grouped by engine, including storage access where available. |

Use the returned `engines` and their connection metadata to select a connection. Don't derive endpoint availability from `type`, `platformType`, or `isDataItem` alone.

### Engine properties

Each entry in `items[].engines` can contain the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `name` | String | Engine name, such as `SQL Analytics`. |
| `description` | String | Human-readable description of the engine's purpose. |
| `recommended` | Boolean | Recommendation for the default connection. Use this as a selection hint, not a guarantee of authorization or availability. |
| `published` | Boolean | Publication state, when provided. For a data agent's `Agent` engine, indicates whether the agent has a published version. |
| `skills` | Object | Optional references to agent skills for this engine. |
| `mcpServers` | Array of objects | Hosted MCP connection descriptors. The array can be empty. |
| `endpoints` | Array of objects | Direct connection descriptors for protocol-specific clients. |
| `localMcpServers` | Array of objects | Optional descriptors for MCP servers that run locally. These aren't hosted MCP URLs. |

An engine doesn't have to provide every connection mechanism. For example, it can expose direct endpoints without a hosted MCP server. Optional properties can be omitted, and collections can be empty.

For example, a data agent's `Agent` engine can return `published: true`. Publishing creates a read-only version for consumers; subsequent draft changes don't affect that version until the agent is published again. This flag doesn't mean the latest draft changes are published or that the caller has permission to use the agent. See [Data agent publishing and versioning](../../data-science/data-agent-sharing.md#publishing-and-versioning).

### Skills

The optional `skills` object references agent skills for the engine:

| Property | Type | Description |
| --- | --- | --- |
| `skills.repository` | String | Repository location for the engine's skills. |
| `skills.skill` | Array of objects | Skill references. The property name is singular, `skill`, even though its value is an array. Each entry has a `name` and `description`. |

Only load skills if your client supports them. Apply your application's trust and installation policies before loading a skill.

### Hosted MCP servers

Each `mcpServers[]` entry describes a hosted server:

| Property | Type | Description |
| --- | --- | --- |
| `name` | String | MCP server identifier. |
| `url` | String | URL to use when connecting to the server. Use the complete returned value. |
| `auth.audience` | String | Microsoft Entra token audience for this server. |
| `description` | String | Human-readable description of the server's capabilities. |
| `tags` | Array of strings | Capability hints, such as `read` or `write`. |

Initialize the MCP connection and discover its tools through MCP. A URL that contains the workspace and item IDs doesn't mean that every tool infers those IDs: supply any arguments required by the tool's advertised input schema.

### Direct endpoints

Each `endpoints[]` entry describes a connection for a protocol-specific client:

| Property | Type | Description |
| --- | --- | --- |
| `type` | String | Endpoint discriminator used to select a compatible client or connector. |
| `description` | String | Human-readable description of the endpoint. |
| `data` | String | Connection value. Depending on `type`, this can be a URL, hostname, or another protocol-specific address. It isn't always an HTTP URL or a complete connection string. |
| `auth.audience` | String | Microsoft Entra token audience for the endpoint. |
| `tags` | Array of strings | Capability or execution-mode hints. |
| `properties` | Object | Optional endpoint-specific connection properties. Interpret the keys according to the endpoint type. |

For example, a `SQLConnectionString` entry provides the server in `data`, with `DatabaseName` and `Port` in `properties`. The port is returned as a string. Pass these values to your SQL client rather than deriving the database name from the item name.

Tags such as `read` and `write` describe capabilities; `interactive` and `batch` describe execution modes where applicable. Tags aren't authorization grants. A `read` tag also doesn't imply that a connection is read-only if it carries other capabilities.

### Local MCP servers

The optional `localMcpServers` array describes MCP servers that run locally:

| Property | Type | Description |
| --- | --- | --- |
| `localMcpServers[].name` | String | Local MCP server identifier. |
| `localMcpServers[].package` | String | Package identifier. |
| `localMcpServers[].command` | String | Launch command. |
| `localMcpServers[].args` | Array of strings | Launch arguments. |
| `localMcpServers[].repository` | String | Source repository location. |
| `localMcpServers[].installHint` | String | Installation guidance link. |
| `localMcpServers[].description` | String | Human-readable description. |
| `localMcpServers[].preview` | Boolean | Preview indicator for the local server. |
| `localMcpServers[].tags` | Array of strings | Capability hints. |

Only use local MCP servers if your client supports them. Apply your application's trust and installation policies before running a local command. Don't treat a local MCP descriptor as a hosted server to connect to.

## Example: discover a lakehouse connection

Send the following request with your workspace ID, lakehouse ID, and Azure Storage token:

```http
GET https://onelake.table.fabric.microsoft.com/api/v2/{workspaceId}/{itemId}/endpoints
Authorization: Bearer <access-token>
Accept: application/json
```

The following example illustrates the response structure for a lakehouse, including SQL Analytics, Spark, and OneLake engines. Workspace and item IDs and names are illustrative. The engines and connections returned for your item can differ.

> [!IMPORTANT]
> Values in angle brackets, such as `<returned-mcp-server-url>`, are non-executable placeholders, not connection values. Use the addresses, authentication audiences, server identifiers, repository locations, and skill names from the live discovery response. Don't copy connection values from documentation or construct URLs from the example structure. Returned values can change as services evolve.

```json
{
  "workspace": {
    "id": "12345678-1234-4234-8234-123456789abc",
    "name": "Sales workspace"
  },
  "items": [
    {
      "id": "87654321-4321-4321-8321-cba987654321",
      "name": "Sales",
      "type": "Lakehouse",
      "platformType": "Lakehouse",
      "isSchemaEnabled": true,
      "defaultSchema": "dbo",
      "isDataItem": true,
      "supportsTables": true,
      "engines": [
        {
          "name": "SQL Analytics",
          "description": "Query data using T-SQL",
          "recommended": true,
          "skills": {
            "repository": "<returned-sql-skills-repository>",
            "skill": [
              {
                "name": "<returned-sql-skill-name>",
                "description": "<returned-sql-skill-description>"
              }
            ]
          },
          "mcpServers": [
            {
              "name": "<returned-sql-mcp-server-name>",
              "url": "<returned-sql-mcp-server-url>",
              "auth": {
                "audience": "<returned-sql-mcp-audience>"
              },
              "description": "Execute T-SQL queries, explore schemas, and manage database objects",
              "tags": ["read"]
            }
          ],
          "endpoints": [
            {
              "type": "SQLConnectionString",
              "description": "SQL analytics endpoint",
              "data": "<returned-sql-server-hostname>",
              "auth": {
                "audience": "<returned-sql-endpoint-audience>"
              },
              "tags": ["read"],
              "properties": {
                "DatabaseName": "<returned-database-name>",
                "Port": "<returned-port>"
              }
            }
          ]
        },
        {
          "name": "Spark",
          "description": "Run PySpark and Spark SQL workloads",
          "recommended": false,
          "skills": {
            "repository": "<returned-spark-skills-repository>",
            "skill": [
              {
                "name": "<returned-spark-skill-name>",
                "description": "<returned-spark-skill-description>"
              }
            ]
          },
          "mcpServers": [],
          "endpoints": [
            {
              "type": "Livy",
              "description": "Spark interactive sessions",
              "data": "<returned-livy-sessions-url>",
              "auth": {
                "audience": "<returned-livy-sessions-audience>"
              },
              "tags": ["read", "write", "interactive"]
            },
            {
              "type": "LivyBatch",
              "description": "Spark batch job submission",
              "data": "<returned-livy-batches-url>",
              "auth": {
                "audience": "<returned-livy-batches-audience>"
              },
              "tags": ["read", "write", "batch"]
            }
          ]
        },
        {
          "name": "OneLake",
          "description": "Storage, file access, and open table catalogs",
          "recommended": false,
          "mcpServers": [
            {
              "name": "<returned-onelake-mcp-server-name>",
              "url": "<returned-onelake-mcp-server-url>",
              "auth": {
                "audience": "<returned-onelake-mcp-audience>"
              },
              "description": "File, table, and catalog operations \u2014 handles auth, path resolution, and format selection",
              "tags": ["read", "write"]
            }
          ],
          "endpoints": [
            {
              "type": "Dfs",
              "description": "ADLS Gen2 DFS REST API",
              "data": "<returned-dfs-url>",
              "auth": {
                "audience": "<returned-dfs-audience>"
              },
              "tags": ["read", "write"]
            },
            {
              "type": "Blob",
              "description": "Azure Blob Storage REST API",
              "data": "<returned-blob-url>",
              "auth": {
                "audience": "<returned-blob-audience>"
              },
              "tags": ["read", "write"]
            },
            {
              "type": "ABFS",
              "description": "Hadoop-compatible filesystem path",
              "data": "<returned-abfs-path>",
              "auth": {
                "audience": "<returned-abfs-audience>"
              },
              "tags": ["read", "write"]
            },
            {
              "type": "Delta",
              "description": "Delta Lake / Unity Catalog",
              "data": "<returned-delta-catalog-url>",
              "auth": {
                "audience": "<returned-delta-catalog-audience>"
              },
              "tags": ["read"]
            },
            {
              "type": "Iceberg",
              "description": "Apache Iceberg REST Catalog",
              "data": "<returned-iceberg-catalog-url>",
              "auth": {
                "audience": "<returned-iceberg-catalog-audience>"
              },
              "tags": ["read"],
              "properties": {
                "Config": "<returned-iceberg-config-url>"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

For a direct SQL connection, select the `SQLConnectionString` entry and configure your client with its `data`, `properties.DatabaseName`, and `properties.Port`. Authenticate for that entry's `auth.audience`.

For a default hosted MCP connection, use this selection flow:

1. Find the engine marked `recommended: true`.
1. Inspect that engine's `mcpServers`. If it contains one server, use that server if it supports your scenario. If it contains multiple servers and your task is to read data, select a server whose `tags` contains `read`.
1. Obtain a token for the selected server's `auth.audience`.
1. Connect to its returned `url`, initialize the MCP session, and inspect the available tools and their input schemas.

In this example, the recommended engine is SQL Analytics and it returns one hosted MCP server. The discovery token, MCP token, and direct SQL token can require different audiences. Obtain each token for the audience required by that request; don't infer audiences from the placeholders or reuse a token across audiences.

If no recommended engine or suitable server is returned, use another advertised connection that your application supports and its policy allows, or report that no suitable connection is available. If several candidates remain, use an explicit application policy or let the user choose. Don't assume array order expresses priority, and don't construct a missing endpoint URL.

## Allow for additional connection options

New engines, endpoints, MCP servers, skills, and response properties can be added as Fabric capabilities expand. Use the connection options your client supports and ignore unrecognized entries or additional properties rather than rejecting the response.

## Errors and troubleshooting

Use the HTTP status code first. Error bodies can differ between authentication, request validation, and item resolution. For example, a response can use `error.code`, `Error.Code`, or `FailureResponseCode`; don't assume every failure uses the successful response structure or one error schema.

| Status | What to check |
| --- | --- |
| `400 Bad Request` | Use two GUIDs or two name-based segments. Include the item-type suffix for names, URL-encode name segments, and don't use an all-zero GUID. Check the route and API version. |
| `401 Unauthorized` | Include a valid bearer token for `https://storage.azure.com/`. A token for the Fabric API audience isn't valid for discovery. |
| `403 Forbidden` | Check the caller's access to the target item and the applicable network restrictions. |
| `404 Not Found` | Confirm the workspace and item IDs, the item's workspace membership, and its visibility to the caller. Also check the limitation below; a discovery `404` doesn't always mean that an item was deleted. |

Retain the response body and any returned request or activity identifiers for troubleshooting, but don't log access tokens. For transient failures, use bounded retries with backoff and honor `Retry-After` when supplied. Don't repeatedly retry a malformed request or an unchanged authorization failure.

### Semantic model discovery limitation

Discovery can return `404 Not Found` for a semantic model when its OneLake integration isn't enabled, even when the item is visible through Fabric APIs. If your application already integrates with semantic models, retain that integration for this case rather than assuming discovery can resolve every model. Don't use a discovery failure as proof that the model doesn't exist.

## Related content

- [Overview of OneLake table APIs](./table-apis-overview.md)
- [Access OneLake with APIs](../onelake-access-api.md)
- [Manage inbound access from OneLake with workspace private links](../onelake-manage-inbound-access.md)
