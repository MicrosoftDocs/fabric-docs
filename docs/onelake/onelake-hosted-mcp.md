---
title: Connect AI agents to the hosted OneLake MCP server (preview)
description: Connect to the hosted OneLake MCP server (preview) to browse files, inspect table metadata, and get file-transfer instructions. Includes tools and parameters.
ms.reviewer: tompeplow
ms.topic: how-to
ms.date: 10/22/2026
ai-usage: ai-generated
---

# Connect AI agents to the hosted OneLake MCP server (preview)

The hosted OneLake Model Context Protocol (MCP) server lets AI agents browse files, inspect table metadata, and manage directories in a Fabric item without installing a local MCP server. Connect an MCP-compatible client to the item's HTTPS endpoint, then use natural-language requests or call the tools directly.

The hosted server provides an item data-plane connection and is an alternative to the [local Fabric MCP server](onelake-local-mcp.md). For workspace and item management, OneLake shortcuts, and OneLake data access roles, use the [Fabric Core MCP server](/rest/api/fabric/articles/mcp-servers/core-remote/overview-core-mcp-server). Connect to each server for the operations you need.

> [!IMPORTANT]
> The hosted OneLake MCP server is currently in **public preview**. Features and behavior might change before general availability.

## Prerequisites

- A Fabric item that stores data in OneLake, with a hosted OneLake MCP endpoint available in your environment.
- A Microsoft Entra identity with permission to perform the intended operations on the item's data.
- An MCP client that supports Streamable HTTP and can attach a Microsoft Entra bearer token to requests.
- Network access to the MCP endpoint and, for direct file transfers, the returned storage endpoint.

For the permissions model, see [Data security in OneLake](security/get-started-security.md). Workspace access alone doesn't mean that every identity can read or write every data path. For networking requirements, see [Connect to OneLake](onelake-access-api.md#additional-onelake-endpoints).

## Connect to an item

Use the hosted OneLake MCP endpoint URL for your workspace and item.

1. Add the URL to your client's HTTP MCP configuration. Configure authentication as described in the next section, then initialize the connection.
1. Ask the agent to call `onelake_list_items_data` to discover the item's top-level data areas without changing data. Choose a returned directory to explore with `onelake_list_files`, using an item-relative `path`. Don't assume that every item has a `Files` directory.

For Visual Studio Code setup and configuration locations, see [Add MCP servers in VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers). Authentication configuration depends on the client and agent environment; adding a URL doesn't sign you in.

The item endpoint has this path:

```http
POST {oneLakeHost}/v1.0/workspaces/{workspaceId}/items/{itemId}/mcp
```

Here, `{oneLakeHost}` is the HTTPS origin from your endpoint URL, and the two IDs identify the workspace and item. Keep the endpoint's hostname and path together. Don't replace a regional or environment-specific hostname with a different OneLake hostname.

Use a GUID-addressed endpoint. Friendly names are available as tool arguments, as described in [Common parameters](#common-parameters). A name-addressed URL can initialize successfully but fail when a tool uses its URL context.

> [!NOTE]
> If initialization returns `404`, confirm the item, environment, and endpoint availability before configuring the agent.

## Authentication and permissions

Use a Microsoft Entra access token for the Azure Storage audience, `https://storage.azure.com/`. For authentication libraries that accept scopes, use `https://storage.azure.com/.default`. Don't substitute a token for `https://api.fabric.microsoft.com/`.

Send the token in the `Authorization: Bearer <access-token>` header on each request. For authentication setup, see [Prepare for authentication](table-apis/table-apis-overview.md#prepare-for-authentication).

The client is responsible for obtaining and refreshing its token. Signing in to Azure CLI doesn't automatically authenticate an arbitrary HTTP MCP client. Use your client's supported credential mechanism, and don't put tokens in chat, shared configuration files, or source control.

OneLake evaluates the caller's permissions for each operation. Connecting an agent doesn't grant it additional data access. Keep user approval enabled for writes and deletes, and review the target item and path before approving them.

## MCP connection and discovery

The endpoint uses JSON-RPC 2.0 over [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http). Each MCP message is a separate HTTP POST to the same endpoint.

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <access-token>`. |
| `Content-Type` | `application/json`. |
| `Accept` | `application/json, text/event-stream`. |
| `MCP-Protocol-Version` | The version negotiated during initialization, on subsequent requests. |
| `Mcp-Session-Id` | The server's session ID, if initialization returns one. Send it on subsequent requests. |

Initialize the connection with your client's supported protocol version, then send `notifications/initialized`. The server negotiates protocol version `2025-06-18` and identifies itself as `microsoft.onelake`, version `1.0.0`. Its capabilities include `logging` and `tools`, with `tools.listChanged: true`. Use the negotiated values rather than hard-coding the server version.

Discover the tools with this request:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list",
  "params": {}
}
```

Read each entry's `name`, `description`, `inputSchema`, and `annotations`. If a response includes `result.nextCursor`, pass it as `params.cursor` to get the next page. Refresh discovery when the server sends `notifications/tools/list_changed`.

The catalog described here contains 15 tools: 11 marked read-only and idempotent, and four marked destructive. Tool annotations describe behavior; they aren't permission grants. The server doesn't advertise an `outputSchema` for these tools.

## Tool reference

Use the exact tool names and parameter casing returned by `tools/list`. The following tables cover all parameters in this catalog. Discover the current schemas when connecting, because the available tools can change. File tools use OneLake's distributed file system (DFS) API or Blob API.

### Common parameters

Every tool accepts these optional parameters in addition to its tool-specific parameters:

| Parameter | JSON type | Description |
| --- | --- | --- |
| `workspaceId` | String | Workspace GUID or name. If you omit this parameter, the endpoint uses its workspace context. |
| `itemId` | String | Item GUID or name. For names, use `itemName.itemType`, such as `Sales.Lakehouse`. If you omit this parameter, the endpoint uses its item context. |

Normally, omit both parameters to work with the item in the URL. When you explicitly specify a target, use both GUIDs or both names. URL scoping supplies defaults; it doesn't remove these targeting parameters or replace authorization.

The schemas declare these parameters as strings with a `default` of `null`. Omit an optional string to use its default rather than sending JSON `null`: `null` isn't included in its declared type. This rule also applies to `path`, `prefix`, `schemaName`, and `contentType` where those strings are optional.

File and directory paths are relative to the item, such as `Files/incoming/orders.csv` or `Tables/dbo/orders`. Don't include the workspace or item identifier in a `path` argument.

### Browse and read data

The server marks these tools as read-only and idempotent.

| Tool | Required parameters | Optional parameters, excluding common parameters | Purpose |
| --- | --- | --- | --- |
| `onelake_list_files` | None. | `path`: string, item root if omitted. `recursive`: boolean, default `false`. | List files and directories through the DFS API, including metadata such as owner, permissions, and ETag. |
| `onelake_blob_list` | None. | `prefix`: string, no filter if omitted. `maxResults`: integer, default `100`. | List blobs through the Blob API, with names, lengths, content types, and modification times. |
| `onelake_list_items_data` | None. | None. | List the item's top-level data areas. This tool doesn't list Fabric items in a workspace. |
| `onelake_read_file` | `path`: string. | None. | Read a small text file through the DFS API. |
| `onelake_download_file` | `path`: string. | None. | Download through the Blob API. The server advertises inline embedded resources for files up to 4 MB and direct-transfer instructions for larger files. |
| `onelake_get_principal_access` | None. | None. | Retrieve reported access flags and access-control metadata. See the access-flag limitation in this section before using this result. |

Start with a narrow `path` or `prefix`. Recursive listings and broad Blob listings can produce more data than an agent needs.

> [!IMPORTANT]
> `onelake_get_principal_access` can report `canRead: false` even when the same caller can read the item. Don't use this tool as an authorization gate. OneLake enforces permissions on the requested operation. Use that operation's result and the [OneLake security model](security/get-started-security.md) to diagnose access.

### Inspect table metadata

The server marks these tools as read-only and idempotent. They inspect metadata, not table rows.

| Tool | Required parameters | Optional parameters, excluding common parameters | Purpose |
| --- | --- | --- | --- |
| `onelake_list_namespaces` | None. | None. | List Iceberg namespace identifiers through the table API. |
| `onelake_get_namespace` | `namespace`: string. | None. | Get namespace details, including the returned table-list payload. |
| `onelake_get_table_config` | `tableName`: string. | `schemaName`: string. The description specifies `dbo` when omitted; the schema's `default` is `null`. | Get table metadata, described by the server as format, schema columns, partition information, and version metadata. |

Use a namespace returned by `onelake_list_namespaces` rather than assuming that every item has the same schemas. For the underlying APIs, see [OneLake table APIs](table-apis/table-apis-overview.md).

### Get file-transfer instructions

The server marks these tools as read-only and idempotent. They return instructions but don't transfer file bytes. Executing an upload instruction is a separate write operation.

| Tool | Required parameters | Optional parameters, excluding common parameters | Purpose |
| --- | --- | --- | --- |
| `onelake_get_download_instructions` | `path`: string. | None. | Get a resource link and instructions for downloading a file directly from OneLake. |
| `onelake_get_upload_instructions` | `path`: string. | `sizeBytes`: integer, default `0`, for display. `contentType`: string, omitted by default. `overwrite`: boolean, default `false`. | Get a resource link and instructions for uploading to a destination path. |

Use `onelake_get_upload_instructions` for an upload. The catalog doesn't include an inline upload tool, even though the upload-instruction tool's description refers to `uploadFile`. Similarly, use the advertised name `onelake_download_file`, not the `downloadFile` shorthand in the download-instruction tool's description.

An upload-instruction result includes a `resource_link` content block. Its `uri` is the destination, and `_meta` includes `method`, `tokenAudience`, `path`, and `overwrite`. The result also includes text guidance. The link doesn't contain the file bytes or grant access to the destination.

Authenticate the transfer separately for the returned audience. Before running a command, check its destination and overwrite behavior. Generated text can contain a hostname that differs from the resource link, or say a small file exceeds the inline limit. Don't run conflicting instructions unchanged; verify the destination against the item's storage connection information.

### Create and delete directories or files

The server marks these four tools as destructive. Require confirmation before invoking them.

| Tool | Required parameters | Optional parameters, excluding common parameters | Purpose |
| --- | --- | --- | --- |
| `onelake_create_directory` | `path`: string. | None. | Create a directory and any required parent directories. |
| `onelake_delete_directory` | `path`: string. | `recursive`: boolean, default `false`. | Delete a directory; recursive deletion includes its contents. |
| `onelake_delete_file` | `path`: string. | None. | Delete a file through the DFS API. |
| `onelake_blob_delete` | `path`: string. | None. | Delete a blob through the Blob API. |

The tool descriptions warn that file and blob deletion is irreversible. Don't use these tools to remove files from a table as a substitute for a table-aware maintenance operation.

## Read tool results

An MCP tool call returns a JSON-RPC `result` with a `content` array. Inspect each block's `type`; don't assume that every tool returns a JSON object directly.

| Content type | How to use it |
| --- | --- |
| `text` | Read `text` as a string. Metadata tools can serialize JSON into this string. Parse that JSON only after checking for an error. File text and instruction text aren't necessarily JSON. |
| `resource` | An embedded resource, used for inline downloads. Read its nested `resource` object according to the MCP resource format. |
| `resource_link` | A reference to a resource, used for direct transfers. Inspect its `uri` and metadata; the bytes aren't embedded in the response. |

Handle both JSON HTTP responses and `text/event-stream` responses. For the latter, process the JSON-RPC messages carried by server-sent events. See [MCP tool results](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#tool-result).

Metadata payloads have different shapes:

- DFS listings return `Paths`, an array of objects, and can include `ContinuationToken`, which can be `null`. Each path includes `Name` (string), `IsDirectory` (boolean), `ContentLength` (integer), `LastModified` (string), `ETag` (string), `Owner` (string), and `Permissions` (string).
- Blob listings return a `Blobs` array. Entries include `Name`, `ContentLength`, `ContentType`, `LastModified`, `ETag`, and the boolean `IsPrefix`. An empty `ContentType` is a string, not `null`.
- Namespace listings return `namespaces` as an array of arrays of strings, such as `[["dbo"]]`, and can include `next-page-token`.
- Namespace details return `namespace` as a string, `exists` as a boolean, and `tables` as a JSON-encoded string. Parse `tables` separately to inspect the nested table list.
- Access results include `workspaceId`, `itemId`, the boolean flags `canRead`, `canWrite`, and `canExecute`, plus string fields `owner` and `permissions`. These strings can be empty.

Preserve field casing and distinguish omitted properties, `null`, empty strings, and empty arrays. Process fields your client understands without rejecting an entire response when additional fields appear.

## Example: explore an item's files

After connecting to a lakehouse and confirming that `onelake_list_items_data` returns a `Files` directory, ask your agent:

> "List the directories under Files in this item. Don't change any data."

The corresponding tool call is:

```json
{
  "jsonrpc": "2.0",
  "id": 20,
  "method": "tools/call",
  "params": {
    "name": "onelake_list_files",
    "arguments": {
      "path": "Files",
      "recursive": false
    }
  }
}
```

The following is the complete decoded JSON from the response's first `result.content[].text` block, not the JSON-RPC envelope. Item and owner IDs, directory names, timestamps, and ETags are illustrative.

```json
{
  "Paths": [
    {
      "Name": "87654321-4321-4321-8321-cba987654321/Files/incoming",
      "IsDirectory": true,
      "ContentLength": 0,
      "LastModified": "Wed, 21 Oct 2026 10:00:00 GMT",
      "ETag": "0x8DE000000000001",
      "Owner": "11111111-2222-4333-8444-555555555555",
      "Permissions": "rwxr-x---"
    },
    {
      "Name": "87654321-4321-4321-8321-cba987654321/Files/archive",
      "IsDirectory": true,
      "ContentLength": 0,
      "LastModified": "Tue, 20 Oct 2026 10:00:00 GMT",
      "ETag": "0x8DE000000000002",
      "Owner": "11111111-2222-4333-8444-555555555555",
      "Permissions": "rwxr-x---"
    }
  ],
  "ContinuationToken": null
}
```

Both entries are directories. Their `ContentLength` values don't represent the total sizes of the files beneath them. To explore the first directory, call `onelake_list_files` with `path: "Files/incoming"`. The returned `Name` includes the item ID, but the next tool's `path` is item-relative.

Other tasks you can ask your agent to complete include:

- "List the namespaces in this lakehouse, then show the metadata for a table I select."
- "Read the JSON configuration file at Files/config/settings.json."
- "Get download instructions for Files/exports/orders.parquet. Don't transfer it yet."

## Errors and limitations

Check the HTTP status, a top-level JSON-RPC `error`, and `result.isError`. HTTP `200` alone doesn't mean that a tool succeeded.

| Response | Meaning and action |
| --- | --- |
| HTTP `401` | Authentication is missing or invalid. Obtain a valid token for the correct audience and attach it to the request. |
| HTTP `404` during initialization | Check the endpoint, environment, and workspace/item pair. A missing item can return `TargetItemNotInWorkspace`. |
| HTTP `400` with JSON-RPC code `-32700` | The request body isn't valid JSON-RPC. Correct the body before retrying. |
| HTTP `200` with `result.isError: true` | The tool failed. Inspect its text message. Missing paths, missing required arguments, invalid argument types, and denied access can use this form. |

For example, a missing file can return this complete JSON-RPC response:

```json
{
  "result": {
    "content": [
      {
        "type": "text",
        "text": "The requested path or resource was not found."
      }
    ],
    "isError": true
  },
  "id": 27,
  "jsonrpc": "2.0"
}
```

Additional limitations:

- Storage and table listings don't expose continuation-token input parameters in this catalog. Don't assume a listing is exhaustive when it reaches a limit or returns a continuation token. Use the underlying [OneLake file APIs](onelake-access-api.md) or [table APIs](table-apis/table-apis-overview.md) when you need pagination.
- `maxResults` limits a Blob listing; it isn't a pagination cursor.

## Related content

- [Fabric Core MCP server tools reference](/rest/api/fabric/articles/mcp-servers/core-remote/tools-core-mcp-server).
- [Use the local Fabric MCP server with OneLake](onelake-local-mcp.md).
- [Connect to OneLake](onelake-access-api.md).
- [OneLake table APIs overview](table-apis/table-apis-overview.md).
- [Data security in OneLake](security/get-started-security.md).
