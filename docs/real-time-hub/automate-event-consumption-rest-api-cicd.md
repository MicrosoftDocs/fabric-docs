---
title: Azure, Fabric, and Business events REST APIs and CI/CD overview
description: Learn the common authentication, definition, deployment, validation, Git, and CI/CD steps for creating, publishing, consuming, and filtering events in Microsoft Fabric.
ms.reviewer: george-guirguis
ms.topic: overview
ms.date: 10/05/2026
ai-usage: ai-assisted
---

# Azure, Fabric, and Business events REST APIs and CI/CD overview

Microsoft Fabric APIs let you automate how you create and publish Business events and how Eventstream and Activator consume Azure, Fabric, and Business events. Use reusable definitions, deploy them across environments, store them in Git, and promote them through deployment pipelines.

Use the articles in this section for the consumer or configuration that you want to automate:

- [Create Business events and manage data access with REST APIs](create-business-events-rest-api.md).
- [Publish Business events with APIs](publish-business-events.md).
- [Consume events with Eventstream REST APIs](consume-events-with-event-stream-rest-api.md).
- [Consume events with Activator REST APIs](consume-events-activator-rest-api.md).
- [Filter events with REST API definitions](configure-event-filters-rest-api.md).

The owning Eventstream or Activator definition manages the underlying event subscription. You don't call a separate subscription API.

> [!NOTE]
> The Activator REST APIs and item definition use the legacy item type name `Reflex`. These articles use *Activator* in descriptive text and use *Reflex* only for literal API paths, item types, and file names.

## Supported APIs

For operation endpoints, request schemas, and responses, see:

- [Core item REST API](/rest/api/fabric/core/items).
- [Event Schema Set items REST API](/rest/api/fabric/eventschemaset/items).
- [Eventstream items REST API](/rest/api/fabric/eventstream/items).
- [Activator items REST API](/rest/api/fabric/reflex/items).
- [Notebook items REST API](/rest/api/fabric/notebook/items).
- [User Data Function items REST API](/rest/api/fabric/userdatafunction/items).
- [Job Scheduler REST API](/rest/api/fabric/core/job-scheduler).
- [OneLake data access security REST API](/rest/api/fabric/core/onelake-data-access-security).

## Prerequisites

Before you start, make sure that:

- The target workspace is assigned to a supported Fabric capacity.
- The deployment identity has the **Contributor** workspace role when it creates an item.
- The deployment identity has read and write permission on an existing item when it retrieves or updates its definition.
- The deployment identity has permission to subscribe to the selected Azure or Fabric events. For details, see [Subscribe permissions for Azure and Fabric events](fabric-events-subscribe-permission.md).
- For Business events, the deployment identity has the required publish or consume permission. For details, see [Manage data access for Business events](business-events/manage-business-events-data-access.md).

Use `Eventstream.ReadWrite.All` or `Item.ReadWrite.All` for Eventstream, and `Reflex.ReadWrite.All` or `Item.ReadWrite.All` for Activator. Identity support differs by API. Check the identity table in each REST operation and [Microsoft Entra identity support](/rest/api/fabric/articles/identity-support).

## Authenticate to Fabric

Acquire a Microsoft Entra access token for the Fabric API, and include it in the `Authorization` header of every Fabric request.

For production automation, use a supported service principal or managed identity. For an application authentication example, see the [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart).

```powershell
$accessToken = "<access-token>"

$headers = @{
    Authorization = "Bearer $accessToken"
}
```

> [!IMPORTANT]
> Don't store access tokens, client secrets, connection credentials, or other secrets in item definitions or source control.

## Encode definition parts

Fabric item definitions contain one or more UTF-8 files encoded as Base64. Use a shared helper to create definition parts:

```powershell
function New-FabricDefinitionPart {
    param(
        [Parameter(Mandatory)]
        [string] $Path,

        [Parameter(Mandatory)]
        [string] $DefinitionPath
    )

    $content = Get-Content -Path $DefinitionPath -Raw

    return @{
        path = $Path
        payload = [Convert]::ToBase64String(
            [Text.Encoding]::UTF8.GetBytes($content)
        )
        payloadType = "InlineBase64"
    }
}
```

Each consumer article identifies its required part names and request format.

## Update complete definitions

The update-definition APIs replace the current definition. When you update an existing item, retrieve its definition, apply the intended changes, and submit every required definition part. A partial update can remove sources, rules, destinations, or actions that aren't included in the request.

Add `?updateMetadata=true` when a definition includes `.platform` and you want to update display name or description metadata from that file.

## Handle long-running operations

Create, get-definition, and update-definition operations can return `202 Accepted`. Use the `Location` and `Retry-After` response headers to poll for completion as described in [Long-running operations](/rest/api/fabric/articles/long-running-operation).

## Validate deployments

After an operation completes:

1. Retrieve the deployed item definition.
1. Decode each part and verify environment-specific IDs, event types, filters, destinations, and actions.
1. For Eventstream, retrieve the topology and wait for each source to leave `Updating`.
1. For Eventstream, confirm every required source is `Running`, inspect destination status and errors, and don't interpret a `Warning` destination as ingested data.
1. For Activator, verify the retained source, enabled trigger rule, action row, and entity references in `ReflexEntities.json`. A source and event view alone aren't a runnable consumer.
1. Generate a test event through its publishing API.
1. Check the publisher result through the Job Scheduler or user data function invocation. Then verify separately that the destination contains the event or that the Activator rule's action ran. A publisher result or a `Running` topology source alone doesn't prove delivery.
1. Check [paused event configurations](fabric-events-paused-state.md) if delivery doesn't start.

## Parameterize environment-specific values

Check the definition parts for values that change between development, test, and production environments.

Common Eventstream values include:

- Source workspace IDs and item IDs.
- Event schema set workspace IDs and item IDs.
- Azure resource IDs.
- Destination workspace IDs, item IDs, and table names.

Common Activator values include:

- Source tenant, workspace, and item IDs.
- Event schema set IDs and event type names.
- Eventstream, eventhouse, pipeline, notebook, and other referenced item IDs.
- Rule recipients and action targets.

Don't replace generated identifiers that connect nodes or entities unless you're intentionally changing the definition graph.
Substitute environment-specific values in your deployment script before encoding the definition.

## Use Git integration

For general Fabric CI/CD, Git integration, and deployment pipeline guidance, see [What is CI/CD in Microsoft Fabric?](../cicd/cicd-overview.md) This article covers only behavior that's specific to Azure, Fabric, and Business events and the items used in their end-to-end flows.

Git integration supports the Fabric items used in these event scenarios, including event schema sets, notebooks, user data functions, Eventstream, and Activator.

For item-specific formats and behavior, see:

- [EventSchemaSet item definition](/rest/api/fabric/articles/item-management/definitions/eventschemaset-definition).
- [Notebook source control and deployment](../data-engineering/notebook-source-control-deployment.md).
- [User data functions source control and deployment](../data-engineering/user-data-functions/git-and-deployment-pipelines.md).
- [Eventstream CI/CD](../real-time-intelligence/event-streams/eventstream-cicd.md).
- [Activator Git integration](../real-time-intelligence/git-activator.md).

Keep the complete item folder together. Don't edit logical IDs or generated entity identifiers without updating every reference.

Git synchronization moves item definitions, but it doesn't move Business event data access roles. Recreate the target event schema set roles through the data access security APIs.

## Use deployment pipelines

Deployment pipelines support event schema sets, notebooks, user data functions, Eventstream, and Activator.

Business event data access roles aren't part of the event schema set definition. Git integration, deployment pipelines, and item definition import or export don't move these roles to the target environment. After your CI/CD process creates or imports the target event schema set, use the data access security APIs to enable security and assign the required publish and consume roles. Continue deploying dependent publishers and consumers only after these API calls succeed.

### Review promoted references

Don't assume that every Business event reference is rebound automatically. Review the target definitions after each Git update or pipeline deployment.

| Item or reference | Git behavior | Deployment pipeline behavior | Required validation |
|---|---|---|---|
| Event schema set | Creates the target item from the committed logical item. Data access security and roles aren't included. | Creates or updates the target item with a new target item ID. Data access security and roles aren't promoted. | Enable security and recreate the target roles through APIs. |
| Notebook publishing call | Literal workspace and event schema set IDs in notebook code aren't rebound. | Literal workspace and event schema set IDs in notebook code aren't rebound. | Parameterize or replace the IDs for each target environment before running the notebook. |
| User data function event schema set connection | The connection automatically resolves to the target workspace and paired target event schema set. | The connection can rebind to the paired target workspace and event schema set. | Inspect `definition.json`, revalidate connection credentials and permissions, and invoke the deployed function. |
| Activator `businessEventAction-v1` publishing destination | The committed action uses the event schema set logical ID so that the paired item can resolve in the target workspace. | The destination workspace and event schema set IDs can rebind to the paired target event schema set. | Retrieve the target definition and trigger the rule through its source publishing API. |
| Activator Business event source | The fully qualified event type ID in `eventTypeFullyQualifiedIds` isn't automatically rebound. | The fully qualified event type ID in `eventTypeFullyQualifiedIds` isn't automatically rebound. | Replace the source workspace and event schema set IDs, assign a new Real-Time hub source `uniqueIdentifier`, and update downstream `SourceReference` values. |
| Eventstream | A configured workspace source retains the source workspace ID. | Same-workspace dependencies can bind to their paired target items. Cross-workspace destinations might block deployment. | Confirm whether the retained source is intentional. Keep destinations in the same workspace when possible and follow the [Eventstream CI/CD limitations](../real-time-intelligence/event-streams/eventstream-cicd.md#limitation). |

For Business events, use this deployment order:

1. Import or deploy the event schema set that defines the Business event types.
1. Enable data access security in the target environment through its API.
1. Create or update the target environment's publish and consume data access roles through the data access role API.
1. Deploy the notebook, user data function, or Activator publisher.
1. Deploy the Eventstream or Activator consumer.
1. Retrieve every target definition and replace references that weren't rebound automatically.
1. Confirm that the promoted identities have the required target roles.
1. Invoke or trigger every publisher and generate matching source events for every consumer. Confirm actual destination ingestion or rule actions before marking the stage successful.

For the event schema set schema, see [EventSchemaSet item definition](/rest/api/fabric/articles/item-management/definitions/eventschemaset-definition). For the required postdeployment API calls, see [Create Business events and manage data access with REST APIs](create-business-events-rest-api.md).

Cross-workspace references have limited lifecycle management support. Test these deployments and rebind references that aren't mapped automatically. For current support and limitations, see [Git integration and deployment pipelines for Real-Time Intelligence](../real-time-intelligence/git-deployment-pipelines.md).

## Troubleshoot API and deployment issues

| Symptom or error | Cause | Resolution |
|---|---|---|
| `401 Unauthorized` | The token is missing, expired, or issued for the wrong resource. | Acquire a new token for the Fabric API and recreate the `Authorization` header. |
| `403 Forbidden` | The identity lacks a required API scope, workspace role, item permission, source subscription permission, or Business events consume permission. | Verify every permission listed in [Prerequisites](#prerequisites). |
| `CorruptedPayload` | A definition part isn't valid Base64, contains invalid JSON, or uses the wrong part path or format. | Decode the submitted payload locally, validate the JSON, and confirm the expected file names and definition format. |
| `InvalidItemType` | The endpoint or definition format doesn't match the item type. | Use `/eventstreams` with `format: eventstream`. Use `/reflexes` without specifying `definition.format`. |
| `ItemDisplayNameAlreadyInUse` | Another item in the target workspace uses the requested display name. | Choose another display name or update the existing item. |
| `OperationNotSupportedForItem` | The requested definition operation isn't supported for the selected item or its current configuration. | Verify the item ID and item type. Check whether an encrypted sensitivity label blocks `getDefinition`. |
| `429 Too Many Requests` | The service rate limit was exceeded. | Wait for the duration in the `Retry-After` header before retrying. |
| An update removes sources, rules, or actions | `updateDefinition` replaced the complete definition with a partial definition. | Export the current definition, apply the intended change, and submit every required part. |
| A deployed Business event publisher or consumer receives a permission error | The event schema set was imported, but its data access roles weren't recreated in the target environment. Data access roles aren't included in item definitions or CI/CD promotion. | After the event schema set is created, enable data access security and create or update the target environment's roles through the data access security APIs. Continue the CI/CD flow only after the role API succeeds. |
| An Eventstream deployment returns a cross-workspace destination error | The Eventstream contains a destination in another workspace. | Move or pair the destination in the target workspace, or reconfigure the destination after deployment. See [Eventstream CI/CD](../real-time-intelligence/event-streams/eventstream-cicd.md#limitation). |
| A promoted notebook publishes to the previous stage | The publishing call contains literal source workspace and event schema set IDs. | Replace or parameterize both IDs for the target environment before running the notebook. |
| A promoted Activator consumes Business events from the previous stage | `eventTypeFullyQualifiedIds` retained the source environment's fully qualified event type ID. | Replace the ID, assign the source a new `uniqueIdentifier`, update downstream `SourceReference` values, and submit the complete Activator definition. |
| A promoted user data function has a rebound connection but publishing returns `Unauthorized` | The deployed connection metadata exists, but its runtime credentials or publishing identity isn't authorized in the target environment. | Revalidate the connection, add the effective target identity to a role with `Publish`, republish if required, and invoke the function before promoting it further. |
| The item deploys but events don't arrive | The source permission, network configuration, data access policy, source identifier, event type, or filter is incorrect. | Compare the deployed definition with the source environment and check [paused event configurations](fabric-events-paused-state.md). |
| An event source subscription returns `401` even though the item create completed | The effective identity might lack a required source permission. | Check [subscribe permissions for Azure and Fabric events](fabric-events-subscribe-permission.md), then inspect the deployed source status and error. |

## Related content

- [Create Business events and manage data access with REST APIs](create-business-events-rest-api.md).
- [Publish Business events with APIs](publish-business-events.md).
- [Consume events with Eventstream REST APIs](consume-events-with-event-stream-rest-api.md).
- [Consume events with Activator REST APIs](consume-events-activator-rest-api.md).
- [Filter events with REST API definitions](configure-event-filters-rest-api.md).
- [Long-running operations](/rest/api/fabric/articles/long-running-operation).
- [What is CI/CD in Microsoft Fabric?](../cicd/cicd-overview.md).
- [Git integration and deployment pipelines for Real-Time Intelligence](../real-time-intelligence/git-deployment-pipelines.md).
