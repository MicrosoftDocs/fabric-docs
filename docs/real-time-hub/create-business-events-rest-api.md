---
title: Create Business events and manage data access with REST APIs
description: Learn how to create a Business event, enable data access security, and configure publish and consume permissions by using REST APIs.
ms.reviewer: george-guirguis
ms.topic: how-to
ms.date: 10/05/2026
ai-usage: ai-assisted
---

# Create Business events and manage data access with REST APIs

Create the event schema set and Business event type before you configure a publisher or an Activator consumer. Then enable data access security and grant the identities that publish or consume the event the required permissions. The public Eventstream definition API doesn't expose Business events as a source.

Complete the common prerequisites and authentication steps in [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md) first.

Business event data access is denied by default. Workspace permissions control who can view or edit the event schema set item. Data access roles separately control who can publish and consume its events.

The [Create Event Schema Set API](/rest/api/fabric/eventschemaset/items/create-event-schema-set) currently supports user identities. The data access role APIs also support service principals and managed identities.

> [!IMPORTANT]
> Data access roles aren't included when you import or export an event schema set definition. In a CI/CD deployment, create or import the target event schema set first, and then use the APIs in this article to enable data access security and assign the target environment's roles. Don't continue to dependent publishers or consumers until the role API succeeds.

## Define the Business event

Create an `EventSchemaSetDefinition.json` file that contains the event type and its Avro schema. Set `category` to `BusinessEventType` so that the event type is available to Business event publishers and consumers.

The following example defines an `OrderCreated` Business event:

```json
{
  "eventTypes": [
    {
      "id": "OrderCreated",
      "description": "An order was created.",
      "category": "BusinessEventType",
      "format": "CloudEvents/1.0",
      "envelopeMetadata": {
        "id": {
          "type": "string",
          "required": true
        },
        "type": {
          "type": "string",
          "required": true,
          "value": "OrderCreated"
        },
        "source": {
          "type": "string",
          "required": true
        },
        "specversion": {
          "type": "string",
          "required": true
        },
        "time": {
          "type": "timestamp",
          "required": true
        },
        "datacontenttype": {
          "type": "string",
          "required": true
        },
        "dataversion": {
          "type": "string",
          "required": true
        },
        "dataschema": {
          "type": "string",
          "required": true
        }
      },
      "schemaUrl": "#/schemas/OrderCreated",
      "schemaFormat": "Avro/1.12.0"
    }
  ],
  "schemas": [
    {
      "id": "OrderCreated",
      "description": "OrderCreated payload schema.",
      "format": "Avro/1.12.0",
      "versions": [
        {
          "id": "v1",
          "description": "Initial schema version.",
          "format": "Avro/1.12.0",
          "schema": "{\"type\":\"record\",\"name\":\"OrderCreated\",\"fields\":[{\"name\":\"orderId\",\"type\":\"string\"},{\"name\":\"amount\",\"type\":\"double\"}]}"
        }
      ]
    }
  ]
}
```

For the complete definition schema, see [EventSchemaSet item definition](/rest/api/fabric/articles/item-management/definitions/eventschemaset-definition).

In a tested create and subsequent `getDefinition`, the submitted `category: "BusinessEventType"` value was retained. The linked definition reference also names an `eventTypeCategory` property. The behavior of replacing `category` with `eventTypeCategory` wasn't tested; don't assume the two field names are interchangeable without verifying the deployed definition.

## Create the event schema set

Encode the definition and create the event schema set:

```powershell
$workspaceId = "<workspace-id>"
$eventSchemaSetName = "OrderBusinessEvents"
$definitionPath = ".\EventSchemaSetDefinition.json"

$definitionPayload = [Convert]::ToBase64String(
    [Text.Encoding]::UTF8.GetBytes(
        (Get-Content -Path $definitionPath -Raw)
    )
)

$body = @{
    displayName = $eventSchemaSetName
    description = "Business events for order processing."
    definition = @{
        parts = @(
            @{
                path = "EventSchemaSetDefinition.json"
                payload = $definitionPayload
                payloadType = "InlineBase64"
            }
        )
    }
} | ConvertTo-Json -Depth 20

$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/eventSchemaSets"
$response = Invoke-RestMethod `
    -Method Post `
    -Uri $uri `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $body

$eventSchemaSetId = $response.id
```

The operation can return `202 Accepted`. If it does, poll the URL in the `Location` response header before you continue. Save the returned item ID. Consumers identify the event type by using this fully qualified ID:

```text
/workspaces/{workspaceId}/eventschemasets/{eventSchemaSetId}/eventtypes/{eventTypeName}
```

## Enable data access security

The event schema set create API doesn't enable data access security or create a default data access role. Enable security before you create the role.

The security enablement request requires a Microsoft Entra token for the `https://storage.azure.com` resource:

```powershell
$storageAccessToken = az account get-access-token `
    --resource "https://storage.azure.com" `
    --query accessToken `
    --output tsv

$storageHeaders = @{
    Authorization = "******"
    "Content-Type" = "application/json"
}

$oneLakeControlEndpoint = "onelake.dfs.fabric.microsoft.com"
$uri = "https://$oneLakeControlEndpoint/v1.0/workspaces/$workspaceId/artifacts/$eventSchemaSetId/security/enable"
$body = @{
    enableOneSecurity = $true
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Uri $uri `
    -Headers $storageHeaders `
    -Body $body
```

> [!IMPORTANT]
> Run the security enablement request before you create a data access role. The request uses a Storage access token instead of the Fabric access token.

## Create the publish and consume data access role

Create a role that grants the deployment identities permission to publish, consume, or perform both actions. The following example grants both permissions across every event type in the event schema set:

```powershell
$tenantId = "<tenant-id>"
$memberObjectId = "<microsoft-entra-object-id>"

$roleBody = @{
    value = @(
        @{
            name = "DefaultBusinessEventsContributor"
            decisionRules = @(
                @{
                    effect = "Permit"
                    permission = @(
                        @{
                            attributeName = "Path"
                            attributeValueIncludedIn = @("*")
                        }
                        @{
                            attributeName = "Action"
                            attributeValueIncludedIn = @(
                                "Publish"
                                "Consume"
                            )
                        }
                    )
                }
            )
            members = @{
                microsoftEntraMembers = @(
                    @{
                        tenantId = $tenantId
                        objectId = $memberObjectId
                        objectType = "User"
                    }
                )
            }
        }
    )
} | ConvertTo-Json -Depth 20

$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/items/$eventSchemaSetId/dataAccessRoles"
Invoke-RestMethod `
    -Method Put `
    -Uri $uri `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $roleBody
```

> [!WARNING]
> `PUT .../dataAccessRoles` replaces the role collection with the roles in the request body. Retrieve the existing roles and preserve every role and member that you don't intend to remove.

For supported member types, event-type scopes, publish and consume permissions, and more role examples, see [Manage data access for Business events](business-events/manage-business-events-data-access.md). For the REST request schema, see [Create or update data access roles](/rest/api/fabric/core/onelake-data-access-security/create-or-update-data-access-roles).

## Verify the data access role

Retrieve the role and confirm its scope, actions, and members:

```powershell
$roleName = "DefaultBusinessEventsContributor"
$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/items/$eventSchemaSetId/dataAccessRoles/$roleName" +
    "?preview=true"

$role = Invoke-RestMethod `
    -Method Get `
    -Uri $uri `
    -Headers $headers

$role | ConvertTo-Json -Depth 20
```

After the event schema set, Business event type, security configuration, and data access role are ready, use the event type's fully qualified ID in the Activator consumer definition.

## Use these APIs in CI/CD

You can promote the event schema set and dependent Fabric items by using item definition import and export, Git integration, or deployment pipelines. The data access role collection is separate from the event schema set definition and isn't promoted with the item.

In each target environment:

1. Create or import the event schema set.
1. Wait for the create or import operation to complete, and capture the target event schema set ID.
1. Enable data access security by using the target workspace ID and event schema set ID.
1. Create or update the publish and consume data access roles by using the target identities.
1. Retrieve the roles from the target event schema set and verify their actions, scopes, and members.
1. Deploy or activate publishers and consumers.
1. Invoke or trigger each deployed publisher and consumer to verify its effective identity and permissions.

Use environment-specific Microsoft Entra object IDs in the role request. Don't assume that identities or role memberships from the source environment exist in the target environment.

Before security is enabled in a newly deployed workspace, the data access role API can return `UniversalSecurityFeatureDisabledForWorkspace`. Enable security for the target event schema set, and then create its roles.

Deployment might rebind an item connection without transferring the connection's runtime authorization. If a deployed user data function or other publisher returns `Unauthorized`, identify the effective target identity, add it to a role with `Publish`, revalidate the connection, and invoke the publisher again.

## Next steps

- [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md).
- [Publish Business events with APIs](publish-business-events.md).
- [Consume events with Eventstream REST APIs](consume-events-with-event-stream-rest-api.md).
- [Consume events with Activator REST APIs](consume-events-activator-rest-api.md).
- [Manage data access for Business events](business-events/manage-business-events-data-access.md).
