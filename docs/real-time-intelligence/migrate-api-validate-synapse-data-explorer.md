---
title: Validate migration from Azure Synapse Data Explorer to Eventhouse - REST API (preview)
description: Validate whether a source Azure Synapse Data Explorer is valid for Eventhouse migration.
author: spelluru
ms.author: spelluru
ms.reviewer: sharmaanshul
ms.topic: reference
ms.date: 03/26/2025
---
# Validate migration from Azure Synapse Data Explorer to Eventhouse - REST API (preview)

Validates if a source Azure Synapse Data Explorer cluster qualifies for migration to Eventhouse. The endpoint invokes a validation flow that performs various checks on the specified cluster URL to determine whether the provided cluster meets the criteria for migration to an eventhouse.

## Permissions

The caller must have *contributor* or higher workspace role.

## Required Delegated Scopes

Workspace.ReadWrite.All

## Microsoft Entra supported identities

This API supports the Microsoft [identities](/rest/api/fabric/articles/identity-support) listed in this section.

| Identity | Support |
|-|-|
| User | Yes |
| [Service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) | Yes |
| [Managed identities](/entra/identity/managed-identities-azure-resources/overview) | Yes |

## Interface

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventhouses/validateMigrationFromAzure
```

## URI Parameters

| Name | In | Required | Type | Description |
|-|-|-|-|-|
| workspaceId | path | True | string<br>*uuid* | The workspace ID. |

## Request Body

| Name | Required | Type | Description |
|-|-|-|-|
| clusterUrl | True | string | The URL of the Azure Synapse Data Explorer cluster to validate for migration. |

## Response

| Name | Type | Description |
|-|-|-|
| 200 OK | [Response details](#response-details) | The specified cluster qualifies for migration. |
| 401 Unauthorized | [Response details](#response-details) | The user is unauthorized on the source cluster. |
| 412 PreconditionFailed | [Response details](#response-details) | The cluster failed at least one validation condition and doesn't qualify for migration. |
| Other Status Codes | [Error response](/rest/api/fabric/eventhouse/items/create-eventhouse#errorresponse) | Common error codes:<br><br>InvalidItemType - Item type is invalid.<br>ItemDisplayNameAlreadyInUse - Item display name is already used.<br>CorruptedPayload - The provided payload is corrupted. |

## Response details

| Name | Type | Description |
|-|-|-|
| validationType | string | The type of validation response. Valid values:<li>**Success**: Indicates that the specified cluster qualifies for migration.</li><li>**Warning**: Indicates that the specified cluster qualifies for migration. However, there are warnings, such as the cluster has a feature in Azure that isn't supported Fabric and won't transition as part of the migration.</li><li>**Error**: Indicates that the specified cluster doesn't qualify for migration.</li> |
| statusCode | string | The HTTP status code, such as *OK* (200), *Unauthorized* (401), and *PreconditionFailed* (412). |
| messageCode | string | For errors and warnings, a code that indicates the specific reason for why the cluster doesn't qualify for migration. For example: *UserIsUnauthorizedOnSourceCluster*, *EntityNotFoundException* |
| message | string | The message that provides additional information about the validation result. |
| CustomParameters | object | For errors and warnings, a JSON object that provides more details with specific custom information about the validation result. |

## Examples

### Sample request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventhouses/validateMigrationFromAzure

{
  "clusterUrl": "https://{PoolName}.{WorkspaceName}.kusto.azuresynapse.net"
}
```

### Sample responses

#### Success

```json
{
  "ValidationType": "Success",
  "StatusCode": "OK",
  "MessageCode": null,
  "Message": null,
  "CustomParameters":  ""
}
```

#### Warning

```json
{
  "ValidationType": "Warning",
  "StatusCode": "OK",
  "MessageCode": "ClusterValidForMigrationWithWarnings",
  "Message": "Cluster 'PoolName' is valid for Fabric migration, but has warnings.",
  "CustomParameters": "{\"PrivateEndpointsWarning\": \"Cluster has Private Endpoints. Private Endpoints are not supported in Fabric.\", \"FirewallRulesWarning\": \"Cluster has Firewall rules. Firewall rules are not supported in Fabric.\"}"
}
```

#### Error

```json
{
  "ValidationType": "Error",
  "StatusCode": "Unauthorized",
  "MessageCode": "UserUnauthorizedOnSourceCluster",
  "Message": "User is unauthorized on the source cluster",
  "CustomParameters": "{}"
}
```

## Related content

- [Migrate from Azure Synapse Data Explorer to Eventhouse](migrate-synapse-data-explorer.md)
- [Migrate to Eventhouse](migrate-api-to-eventhouse.md)
