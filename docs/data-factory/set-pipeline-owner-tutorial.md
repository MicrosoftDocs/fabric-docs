---
title: Set a Service Principal as Pipeline Owner
description: Learn how to modify data pipelines in Microsoft Fabric using a service principal to operationalize production scenarios. Follow this step-by-step guide to update metadata and definitions via the REST API.
ms.date: 02/10/2026
ms.topic: tutorial
---

# Set a service principal as a pipeline owner

This tutorial shows you how to use the Fabric REST API to edit a data pipeline using a service principal (SPN). When a service principal modifies a pipeline, it becomes the **LastModifiedBy** user for that pipeline. This user is essential for operationalizing pipelines in production scenarios where pipelines need to run under a service principal identity rather than a user identity.

By completing this tutorial, you learn how to:

> [!div class="checklist"]
> * [Obtain an access token for a service principal](#get-an-access-token-for-the-service-principal)
> * [Update pipeline metadata (name and description) by using a service principal](#update-pipeline-metadata)
> * [Update pipeline definition (activities) by using a service principal](#update-pipeline-definition-activities)

## Prerequisites

- A Fabric [workspace](../fundamentals/create-workspaces.md) with a [data pipeline](create-first-pipeline-with-sample-data.md)
- A [service principal](/entra/identity-platform/howto-create-service-principal-portal) registered in Microsoft Entra ID with the following information:
  - Tenant ID
  - Client ID (Application ID)
  - Client Secret
- [Contributor or higher permissions on the workspace](../fundamentals/give-access-workspaces.md) for the service principal
- A tool to make REST API calls (curl or similar)

> [!IMPORTANT]
> Ensure the service principal has access to the Fabric workspace before proceeding. Without proper permissions, the API calls fail with authorization errors.

## Get an access token for the service principal

Before making any API calls, get a bearer token for your service principal. Use the Microsoft Entra ID token endpoint to request a token with the Fabric API scope.

**Sample request:**

**Method:** `POST`

**URI:**

```
https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token
```

**Headers:**

```
Content-Type: application/x-www-form-urlencoded
```

**Body (form-urlencoded):**

```
grant_type=client_credentials
client_id={clientId}
client_secret={clientSecret}
scope=https://api.fabric.microsoft.com/.default
```

**curl example:**

```bash
curl -X POST "https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id={clientId}" \
  -d "client_secret={clientSecret}" \
  -d "scope=https://api.fabric.microsoft.com/.default"
```

**Sample response:**

```json
{
  "token_type": "Bearer",
  "expires_in": 86399,
  "ext_expires_in": 86399,
  "access_token": "<access-token>"
}
```

Copy the `access_token` value. Use this value in the Authorization header for the next API calls.

## Update pipeline metadata

The simplest way to set the service principal as the pipeline owner is to update the pipeline's metadata, such as the name or description. This action updates the **LastModifiedBy** property to the service principal.

**Sample request:**

**Method:** `PATCH`

**URI:**

```
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/dataPipelines/{pipelineId}
```

**Headers:**

```json
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload:**

```json
{
  "description": "Edited via SPN"
}
```

**curl example:**

```bash
curl -X PATCH "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/dataPipelines/{pipelineId}" \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{"description": "Edited via SPN"}'
```

**Sample response:**

```json
{
  "id": "{pipelineId}",
  "type": "DataPipeline",
  "displayName": "My Pipeline",
  "description": "Edited via SPN",
  "workspaceId": "{workspaceId}"
}
```

> [!NOTE]
> You can update the `displayName` and `description` properties. Either change updates the **LastModifiedBy** property to the service principal.

## Update pipeline definition (activities)

If you need to modify the pipeline activities or configuration, you need to retrieve the current definition, modify it, and then update it. This process involves three steps.

### Step 1: Get the pipeline definition

Retrieve the current pipeline definition, which includes the activities and configuration encoded as base64.

**Sample request:**

**Method:** `POST`

**URI:**

```
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/dataPipelines/{pipelineId}/getDefinition
```

**Headers:**

```json
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**curl example:**

```bash
curl -X POST "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/dataPipelines/{pipelineId}/getDefinition" \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Sample response:**

```json
{
  "definition": {
    "parts": [
      {
        "path": "pipeline-content.json",
        "payload": "<Base64-encoded-pipeline-content>",
        "payloadType": "InlineBase64"
      },
      {
        "path": ".schedules",
        "payload": "<Base64-encoded-schedules>",
        "payloadType": "InlineBase64"
      },
      {
        "path": ".platform",
        "payload": "<Base64-encoded-platform>",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

### Step 2: Decode, modify, and re-encode the payload

The `pipeline-content.json` payload contains the pipeline activities and configuration. To modify it:

1. Decode the Base64 payload to get the JSON content.
1. Modify the JSON as needed (add, remove, or update activities).
1. Encode the modified JSON back to Base64.

**Example using bash:**

```bash
# Decode Base64 to JSON
echo "<Base64-payload>" | base64 --decode > pipeline-content.json

# Edit the JSON file as needed
# ...

# Encode back to Base64
base64 -w 0 pipeline-content.json
```

**Example using PowerShell:**

```powershell
# Decode Base64 to JSON
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("<Base64-payload>")) | Out-File pipeline-content.json

# Edit the JSON file as needed
# ...

# Encode back to Base64
[System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("pipeline-content.json"))
```

### Step 3: Update the pipeline definition

Send the modified definition to update the pipeline.

**Sample request:**

**Method:** `POST`

**URI:**

```
https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/dataPipelines/{pipelineId}/updateDefinition
```

**Headers:**

```json
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload:**

```json
{
  "definition": {
    "parts": [
      {
        "path": "pipeline-content.json",
        "payload": "<Updated-Base64-encoded-content>",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

**curl example:**

```bash
curl -X POST "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/dataPipelines/{pipelineId}/updateDefinition" \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "definition": {
      "parts": [{
        "path": "pipeline-content.json",
        "payload": "<Updated-Base64-encoded-content>",
        "payloadType": "InlineBase64"
      }]
    }
  }'
```

**Sample response:**

```
200 OK
```

## Parameters

| Name | In | Required | Type | Description |
|------|------|----------|------|-------------|
| `workspaceId` | Path | True | String (GUID) | The workspace ID |
| `pipelineId` | Path | True | String (GUID) | The data pipeline ID |
| `tenantId` | Path | True | String (GUID) | Microsoft Entra tenant ID |
| `clientId` | Body | True | String (GUID) | Service principal client ID |
| `clientSecret` | Body | True | String | Service principal client secret |

## Considerations

- **Token expiration:** Access tokens typically expire after one hour. For long-running automation, implement token refresh logic.
- **Permissions:** The service principal needs at least Contributor permissions on the workspace to modify pipelines.
- **API endpoint:** Use `api.fabric.microsoft.com` for production environments. Some internal Microsoft environments might use different endpoints.
- **Definition parts:** When updating the pipeline definition, you only need to include the `pipeline-content.json` part. The `.schedules` and `.platform` parts are optional.

## Related content

For more information, see the following resources:

- [REST API capabilities for pipelines in Fabric Data Factory](pipeline-rest-api-capabilities.md)
- [Microsoft Fabric REST API documentation](/rest/api/fabric/articles/)
- [Service principal support in Data Factory](service-principals.md)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
