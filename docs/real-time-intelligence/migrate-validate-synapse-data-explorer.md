---
title: Validate migration from Azure Synapse Data Explorer to Eventhouse - REST API (preview)
description: Validate whether a source Azure Synapse Data Explorer is valid for Eventhouse migration.
author: shsagir
ms.author: shsagir
ms.reviewer: sharmaanshul
ms.topic: reference
ms.date: 11/19/2024
---
# Validate migration from Azure Synapse Data Explorer to Eventhouse - REST API (preview)

Validates if a source Azure Synapse Data Explorer cluster is suitable for migration to Eventhouse. The endpoint performs multiple checks on the specified URL to determine if the cluster meets the criteria for migration to Fabric. These checks include verifying the existence of the cluster, ensuring it's in the correct region, confirming user authorization, and more.

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
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventhouses/validateMigrationFromAzure
```

## URI Parameters

| Name | In | Required | Type | Description |
|-|-|-|-|-|
| workspaceId | path | True | string\n*uuid* | The workspace ID. |

## Request Body

| Name | Required | Type | Description |
|-|-|-|-|
| clusterUrl | True | string | The URL of the Azure Synapse Data Explorer cluster to validate for migration. |

## Response schema

| Name | Type | Description |
|-|-|-|
| validationType | string | The type of validation response. Valid values:<li>**Success**: Indicates that the specified cluster qualifies for migration.</li><li>**Warning**: Indicates that the specified cluster qualifies for migration. However, there are warnings, such as the cluster has a feature in Azure that is not supported Fabric and will not transition as part of the migration.</li><li>**Error**: Indicates that the specified cluster doesn't qualify for migration.</li> |
| statusCode | string | The HTTP status code, such as *OK* (200), *Unauthorized* (401), and *PreconditionFailed* (412). |
| messageCode | string | For errors and warnings, a code that indicates the specific reason for why the cluster doesn't qualify for migration. For example: U*serIsUnauthorizedOnSourceCluster*, *EntityNotFoundException* |
| message | string | The message that provides additional information about the validation result. |
| CustomParameters | object | For errors and warnings, a JSON object that provides additional details with specific custom information about the validation result. |

## Examples

### Sample request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/eventhouses/validateMigrationFromAzure

{
  "clusterUrl": "https://<PoolName>.<WorkspaceName>.kusto.azuresynapse.net"
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
  "Message": "Cluster 'sourcecluster' is valid for Fabric migration, but has warnings.",
  "CustomParameters": "{\"PrivateEndpointsWarning\":\"Cluster has Private Endpoints. Private Endpoints are not supported in Fabric.\"}"
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
- [Migrate to Eventhouse](migrate-to-eventhouse.md)
