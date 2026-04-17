---
title: Get authorized access for a principal
description: Learn the API details for the get authorized access for a principal API.
ms.reviewer: aamerril # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.custom:
ms.date: 02/11/2026
#customer intent: As a Fabric user, I want to learn how to create and manage OneLake security so that I can control access to specific folders in my lakehouse and ensure data security.
---

# Get authorized access for a principal

- Service:
    - Core

- API Version:
    - v1

Fetches the allowed data access for a given principal according to the OneLake security roles configured on the item. This API consolidates a principal's permissions across roles, providing an "effective access" view of their permissions.

> [!NOTE]
> This API is part of a Preview release and is provided for evaluation and development purposes only. It may change based on feedback and is not recommended for production use.

## Required Delegated Scopes

OneLake.ReadWrite.All

## Microsoft Entra supported identities

This API supports the Microsoft [identities](/en-us/rest/api/fabric/articles/identity-support) listed in this section.

| Identity | Support |
| --- | --- |
| User | Yes |
| [Service principal](/en-us/entra/identity-platform/app-objects-and-service-principals#service-principal-object) and [Managed identities](/en-us/entra/identity/managed-identities-azure-resources/overview) | Yes |

## Interface

```http
GET https://onelake.dfs.fabric.microsoft.com/v1.0/workspaces/{workspaceId}/artifacts/{artifactId}/securityPolicy/principalAccess
```

## URI Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| itemId | path | True | string (uuid) | The ID of the Fabric item to put the roles. |

## Request Header

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| If-Match |  | string | An ETag value. The ETag must be specified in quotes. If provided, the call will succeed only if the resource's ETag matches the provided ETag. |
| If-None-Match |  | string | An ETag value. The ETag must be specified in quotes. If provided, the call will succeed only if the resource's ETag doesn't match the provided ETag. |

## Request Body

| Name | Type | Required |Description |
| --- | --- | --- | --- |
| aadObjectId | string | Yes  | The Entra object ID of the user to check access for. |
| inputPath | string | Yes | Either "Tables" or "Files". The response will return the principal's access for either the Tables or Files section of the item only, based on which input was specified. |
| continuationToken | string | optional | Used to fetch continued results if the initial set is more than the maxResults. |
| maxResults | integer | optional | Maximum items per page. If not specified, the default is 500. |

## Responses

| Name | Type | Description |
| --- | --- | --- |
| 200 OK |  | Request completed successfully.<br><br>Headers<br><br>Etag: string |
| 429 Too Many Requests | ErrorResponse | The service rate limit was exceeded. The server returns a `Retry-After` header indicating, in seconds, how long the client must wait before sending additional requests.<br><br>Headers<br><br>Retry-After: integer |
| Other Status Codes | ErrorResponse | Common error codes:<br><br>- ItemNotFound - Indicates that the server can't find the requested item.<br>- PreconditionFailed -Indicates that the current resource ETag doesn't match the value specified in the If-Match header. |

## Examples

### Sample request

**HTTP**

```http
GET https://onelake.dfs.fabric.microsoft.com/v1.0/workspaces/cfafbeb1-8037-4d0c-896e-a46fb27ff222/artifacts/25bac802-080d-4f73-8a42-1b406eb1fceb/securityPolicy/principalAccess

{
  "aadObjectId": "CA81C0F4-5C79-4907-BD0A-B4D576AEA59B",
  "inputPath": "Tables",
  "continuationToken": "(token, optional)",
  "maxResults": (optional)
}

```

### Sample response

- Status code:
    - 200

```http
ETag: 33a64df551425fcc55e4d42a148795d9f25f89d4
{
  "identityETag": "3fc4dc476ded773e4cf43936190bf20fa9480a077b25edc0b4bbe247112542f6",
  "metadataETag": "\"eyJhciI6IlwiMHg4REU3NjQ2MzA2QTIxNjhcIiIsInNjIjoiXCIweDhERTcwQzdBNjlENzk1Q1wiIiwiaXIiOiJcIjB4OERFNjhEREMyNjhBM0U0XCIiLCJkciI6IlwiNWM0YmFhZWIwYTE2MzYxZjkzNThjMzNjMDllYmM2ODJhZjQ1NmIxMDZlNTRmN2E1MzRhNjk5NzA1MjgzMTU5Yy1mODUxMjc0MDBjYjY0YzFkYTA2NjFlZWIyNzg4ZTNhZDc1N2Y3MTZhZWIyYTk0OTA4NGUxOGI2MWUyYWNjNzAxXCIifQ==\"",
  "value": [
    {
      "path": "Tables/dbo/Customers",
      "access": [
        "Read"
      ],
      "rows": "SELECT * FROM [dbo].[Customers] WHERE [customerId] = '123' UNION SELECT * FROM [dbo].[Customers] WHERE [customerID] = 'ALFKI'",
      "effect": "Permit"
    },
    {
      "path": "Tables/dbo/Employees",
      "access": [
        "Read"
      ],
      "rows": "SELECT * FROM [dbo].[Employees] WHERE [address] = '123'",
      "effect": "Permit"
    },
    {
      "path": "Tables/dbo/EmployeeTerritories",
      "access": [
        "Read"
      ],
      "effect": "Permit"
    }
  ]
}
```

## Definitions

| Name | Description |
| --- | --- |
| Access | The type of access permission granted. Currently, the only supported access type is `Read`. Additional access types might be added over time. |
| ColumnAccess | Represents a column the principal is permitted to access, including the effect and action granted on that column. |
| ColumnAction | The action permitted on a column. Currently, the only supported action is `Read`. Additional action types might be added over time. |
| ColumnEffect | The effect applied to a column. Currently, the only supported effect is `Permit`. Additional effect types might be added over time. |
| Effect | The effect that a principal has on access to the data resource. Currently, the only supported effect type is `Permit`, which grants access to the resource. Additional effect types might be added over time. |
| ErrorRelatedResource | The error related resource details object. |
| ErrorResponse | The error response. |
| ErrorResponseDetails | The error response details. |
| PrincipalAccessEntry | Represents the effective access a principal has to a specific resource path, including the access type, effect, and any row-level or column-level filtering applied. |
| PrincipalAccessResponse | The response object containing the effective access for a principal across all resources within the specified input path. |

### Access

Enumeration

The type of access permission granted. Currently, the only supported access type is `Read`. Additional access types might be added over time.

| Value | Description |
| --- | --- |
| Read | Read access to the resource. |

### ColumnAccess

Object

Represents a column the principal is permitted to access, including the effect and action granted on that column.

| Name | Type | Description |
| --- | --- | --- |
| name | string | The case-sensitive name of the column the principal is permitted to access. |
| columnEffect | ColumnEffect | The effect applied to the column. Currently, the only supported value is `Permit`. Additional effect types might be added over time. |
| columnAction | ColumnAction[] | The array of actions permitted on the column. Currently, the only supported value is `Read`. Additional action types might be added over time. |

### ColumnAction

Enumeration

The action permitted on a column. Currently, the only supported action is `Read`. Additional action types might be added over time.

| Value | Description |
| --- | --- |
| Read | Read action on the column. |

### ColumnEffect

Enumeration

The effect applied to a column. Currently, the only supported effect is `Permit`. Additional effect types might be added over time.

| Value | Description |
| --- | --- |
| Permit | The column effect type Permit. |

### Effect

Enumeration

The effect that a principal has on access to the data resource. Currently, the only supported effect type is `Permit`, which grants access to the resource. Additional effect types might be added over time.

| Value | Description |
| --- | --- |
| Permit | The effect type Permit. |

### ErrorRelatedResource

Object

The error related resource details object.

| Name | Type | Description |
| --- | --- | --- |
| resourceId | string | The resource ID that's involved in the error. |
| resourceType | string | The type of the resource that's involved in the error. |

### ErrorResponse

Object

The error response.

| Name | Type | Description |
| --- | --- | --- |
| errorCode | string | A specific identifier that provides information about an error condition, allowing for standardized communication between our service and its users. |
| message | string | A human readable representation of the error. |
| moreDetails | ErrorResponseDetails[] | List of additional error details. |
| relatedResource | ErrorRelatedResource | The error related resource details. |
| requestId | string (uuid) | ID of the request associated with the error. |

### ErrorResponseDetails

Object

The error response details.

| Name | Type | Description |
| --- | --- | --- |
| errorCode | string | A specific identifier that provides information about an error condition, allowing for standardized communication between our service and its users. |
| message | string | A human readable representation of the error. |
| relatedResource | ErrorRelatedResource | The error related resource details. |

### PrincipalAccessEntry

Object

Represents the effective access a principal has to a specific resource path, including the access type, effect, and any row-level or column-level filtering applied.

| Name | Type | Description |
| --- | --- | --- |
| path | string | The path to the resource that the principal has access to, such as `Tables/dbo/Customers`. |
| access | Access[] | The array of access permissions granted to the principal for this resource. |
| columns | ColumnAccess[] | The array of columns the principal is permitted to access. Each entry specifies the column name, the effect, and the permitted actions. If this property is omitted, no column-level security applies and all columns are permitted. |
| rows | string | A T-SQL expression representing the row-level security filter applied to the principal's access. Only rows matching this predicate are visible to the principal. This property is omitted if no row-level filtering applies. |
| effect | Effect | The effect that the principal has on access to the data resource. Currently, the only supported effect type is `Permit`, which grants access to the resource. Additional effect types might be added over time. |

### PrincipalAccessResponse

Object

The response object containing the effective access for a principal across all resources within the specified input path.

| Name | Type | Description |
| --- | --- | --- |
| identityETag | string | An ETag value representing the current state of the principal's identity and group memberships. Changes when the principal's group memberships or identity properties are updated. |
| metadataETag | string | An ETag value representing the current state of the security metadata for the item. Changes when the security roles or policies on the item are updated. |
| value | PrincipalAccessEntry[] | An array of access entries representing the effective access the principal has across resources within the specified input path. |