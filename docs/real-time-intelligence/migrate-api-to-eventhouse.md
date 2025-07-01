---
title: Migrate from Azure Synapse Data Explorer to Eventhouse - REST API (preview)
description: Migrate a source Azure Synapse Data Explorer to Eventhouse.
author: spelluru
ms.author: spelluru
ms.reviewer: sharmaanshul
ms.topic: reference
ms.date: 03/26/2025
---
# Migrate from Azure Synapse Data Explorer to Eventhouse - REST API (preview)

Migrates a source Azure Synapse Data Explorer cluster to Eventhouse. The process creates a new eventhouse and migrates all databases from the source cluster to the eventhouse. For more information, see [Migrate from Azure Synapse Data Explorer to Fabric Eventhouse](migrate-synapse-data-explorer.md).

> [!IMPORTANT]
>
> - Plan your migration carefully, as the process is irreversible and the source cluster can't be restored. Start by running the [validate migration](migrate-api-validate-synapse-data-explorer.md) API to ensure that the source cluster is suitable for migration.
> - After the migration, the source cluster is placed in a new state called *Migrated*. In this state, the cluster is suspended and can't be resumed or restored. As long as the source cluster exists, its endpoints are redirected to the eventhouse. The source cluster's endpoints remain active for up to 90 days following the migration. Once the source cluster is deleted, its endpoints stop redirecting to the eventhouse. We recommend that users update all queries and ingestion processes to the new eventhouse endpoints within this period.

## Permissions

The caller must have *contributor* or higher workspace role.

## Required Delegated Scopes

Eventhouse.ReadWrite.All or Item.ReadWrite.All

## Microsoft Entra supported identities

This API supports the Microsoft [identities](/rest/api/fabric/articles/identity-support) listed in this section.

| Identity | Support |
|-|-|
| User | Yes |
| [Service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) | Yes |
| [Managed identities](/entra/identity/managed-identities-azure-resources/overview) | Yes |

## Interface

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventhouses
```

## URI Parameters

| Name | In | Required | Type | Description |
|-|-|-|-|-|
| workspaceId | path | True | string<br>*uuid* | The workspace ID. |

## Request Body

| Name | Required | Type | Description |
|-|-|-|-|
| displayName | True | string | The eventhouse display name. The eventhouse name can contain alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported. |
| creationPayload | True | [EventhouseCreationPayload](#eventhousecreationpayload) | The creation payload for the eventhouse. |
| description | | string | The eventhouse description. Maximum length is 256 characters. |

## Definitions

| Name | Description |
|-|-|
| EventhouseCreationPayload | The creation payload for the eventhouse item. |

### EventhouseCreationPayload

Eventhouse item creation payload

| Name | Type | Description |
|-|-|-|
| migrationSourceClusterUrl | string | The URL of the Azure Synapse Data Explorer cluster to migrate to an Eventhouse. |

## Response

| Name | Type | Description |
|-|-|-|
| 202 Accepted | | Request accepted, eventhouse provisioning in progress.<br><br>Response object includes:<br><br>Location: string - URI address for monitoring the progress, see [Monitor migration progress](#monitor-migration-progress).<br>x-ms-operation-id: string<br>Retry-After: integer |
| Other Status Codes | [Error response](/rest/api/fabric/eventhouse/items/create-eventhouse#errorresponse) | Common error codes:<br><br>InvalidItemType - Item type is invalid.<br>ItemDisplayNameAlreadyInUse - Item display name is already used.<br>CorruptedPayload - The provided payload is corrupted. |

### Monitor migration progress

If the migration request response is successful, you can use GET requests with the `Location` URI returned in the response to monitor the progress of the migration, as follows:

```http
GET https://api.fabric.microsoft.com/v1/operations/{operationId}
```

## Examples

### Sample request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/WorkspaceId/eventhouses

{
  "displayName": "NewEventhouse",
  "description": "Eventhouse migrated from Azure Synapse Data Explorer pool.",
  "creationPayload": {
    "migrationSourceClusterUrl": "https://{AzurePoolName}.{WorkspaceName}.kusto.azuresynapse.net"
  }  
}
```

### Sample responses

#### Success

```http
"Location": "https://api.fabric.microsoft.com/v1/operations/{operationId}",
"x-ms-operation-id": "{operationId}",
"Retry-After": 30
```

## Related content

- [Migrate from Azure Synapse Data Explorer to Eventhouse](migrate-synapse-data-explorer.md)
- [Validate migration](migrate-api-validate-synapse-data-explorer.md)
