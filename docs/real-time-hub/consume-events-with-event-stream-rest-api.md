---
title: Consume events with Eventstream REST APIs
description: Configure Eventstream definitions to consume Azure and Fabric events by using Microsoft Fabric REST APIs.
ms.reviewer: george-guirguis
ms.topic: how-to
ms.date: 10/05/2026
ai-usage: ai-assisted
---

# Consume events with Eventstream REST APIs

Use an Eventstream definition to subscribe to supported Azure and Fabric event groups and route the events through an Eventstream. The public Eventstream definition API doesn't currently expose Business events as a source type.

Complete the common prerequisites and authentication steps in [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md) first. Before configuring sources, confirm that the deployment identity has the permissions required for every selected event group. See [Subscribe permissions for Azure and Fabric events](fabric-events-subscribe-permission.md).

## Build the Eventstream definition

Use the [Eventstream REST API](../real-time-intelligence/event-streams/eventstream-rest-api.md) for the general topology structure. Use the [Eventstream item definition](/rest/api/fabric/articles/item-management/definitions/eventstream-definition) for the definition parts and schemas.

An Eventstream definition requires the `sources`, `destinations`, `streams`, and `operators` arrays. For the simplest event consumer, add one of the event-specific sources from the following sections and connect it to one default stream:

```json
{
  "sources": [
    {
      "name": "<source-name>",
      "type": "<source-type>",
      "properties": {}
    }
  ],
  "destinations": [],
  "streams": [
    {
      "name": "event-consumer-stream",
      "type": "DefaultStream",
      "properties": {},
      "inputNodes": [
        {
          "name": "<source-name>"
        }
      ]
    }
  ],
  "operators": [],
  "compatibilityLevel": "1.1"
}
```

Replace the source object with one of the following examples. The `inputNodes[].name` value must match the source `name`. An Eventstream topology can contain only one default stream. To consume multiple event groups in the same Eventstream, add every source name to the default stream's `inputNodes` array.

## Azure Blob Storage events source

```json
{
  "name": "AzureBlobStorageEventsSource",
  "type": "AzureBlobStorageEvents",
  "properties": {
    "azureBlobStorageEvents": [
      {
        "id": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
        "azureResourceId": "/subscriptions/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/resourceGroups/example-rg/providers/Microsoft.Storage/storageAccounts/exampleaccount",
        "includedEventTypes": [
          "Microsoft.Storage.BlobCreated",
          "Microsoft.Storage.BlobDeleted"
        ]
      }
    ],
    "streamEvents": true
  }
}
```

The `azureResourceId` value is the Azure Resource Manager ID of the storage account. Give each entry in `azureBlobStorageEvents` a unique `id`.

For Azure resource prerequisites and supported event types, see [Get Azure Blob Storage events](get-azure-blob-storage-events.md).

## Fabric workspace item events source

```json
{
  "name": "FabricWorkspaceItemEventsSource",
  "type": "FabricWorkspaceItemEvents",
  "properties": {
    "eventScope": "Workspace",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "includedEventTypes": [
      "Microsoft.Fabric.ItemCreateSucceeded",
      "Microsoft.Fabric.ItemUpdateSucceeded",
      "Microsoft.Fabric.ItemDeleteSucceeded"
    ],
    "filters": []
  }
}
```

## Fabric Job events source

```json
{
  "name": "FabricJobEventsSource",
  "type": "FabricJobEvents",
  "properties": {
    "eventScope": "Item",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "itemId": "cccccccc-2222-3333-4444-dddddddddddd",
    "includedEventTypes": [
      "Microsoft.Fabric.JobEvents.ItemJobCreated",
      "Microsoft.Fabric.JobEvents.ItemJobStatusChanged",
      "Microsoft.Fabric.JobEvents.ItemJobSucceeded",
      "Microsoft.Fabric.JobEvents.ItemJobFailed"
    ],
    "filters": []
  }
}
```

## Fabric OneLake events source

```json
{
  "name": "FabricOneLakeEventsSource",
  "type": "FabricOneLakeEvents",
  "properties": {
    "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "itemId": "cccccccc-2222-3333-4444-dddddddddddd",
    "oneLakePaths": [
      "/Tables",
      "/Files"
    ],
    "includedEventTypes": [
      "Microsoft.Fabric.OneLake.FileCreated",
      "Microsoft.Fabric.OneLake.FileDeleted",
      "Microsoft.Fabric.OneLake.FileRenamed",
      "Microsoft.Fabric.OneLake.FolderCreated",
      "Microsoft.Fabric.OneLake.FolderDeleted",
      "Microsoft.Fabric.OneLake.FolderRenamed"
    ],
    "filters": []
  }
}
```

## Fabric capacity overview events source

Use the capacity ID and supported event types for the capacity you want to monitor.

```json
{
  "name": "FabricCapacityOverviewEventsSource",
  "type": "FabricCapacityOverviewEvents",
  "properties": {
    "eventScope": "Capacity",
    "capacityId": "cccccccc-2222-3333-4444-dddddddddddd",
    "includedEventTypes": [
      "Microsoft.Fabric.Capacity.State",
      "Microsoft.Fabric.Capacity.Summary"
    ],
    "filters": []
  }
}
```

For capacity prerequisites and event type descriptions, see [Get Fabric capacity overview events in Real-Time hub](create-streams-fabric-capacity-overview-events.md).

## Fabric capacity operation events source

```json
{
  "name": "FabricCapacityOperationEventsSource",
  "type": "FabricCapacityOperationEvents",
  "properties": {
    "eventScope": "Capacity",
    "capacityId": "cccccccc-2222-3333-4444-dddddddddddd",
    "includedEventTypes": [
      "Microsoft.Fabric.CapacityOperationEvents.Operation"
    ],
    "filters": []
  }
}
```

## Fabric anomaly detection events source

The Anomaly Detector and its configuration must already exist. Use the Anomaly Detector item ID and the configuration ID from the source environment.

```json
{
  "name": "FabricAnomalyDetectionEventsSource",
  "type": "FabricAnomalyDetectionEvents",
  "properties": {
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "itemId": "cccccccc-2222-3333-4444-dddddddddddd",
    "configurationId": "dddddddd-3333-4444-5555-eeeeeeeeeeee",
    "includedEventTypes": [
      "Microsoft.Fabric.AnomalyEvents.AnomalyDetected"
    ],
    "filters": []
  }
}
```

For source prerequisites and supported event types, see [Get Fabric anomaly detection events in Real-Time hub](create-streams-anomaly-detection-events.md).

## Prepare the Eventstream definition part

Save the complete definition as `eventstream.json`, and encode it by using the helper in the [overview](automate-event-consumption-rest-api-cicd.md#encode-definition-parts):

```powershell
$eventstreamParts = @(
    New-FabricDefinitionPart `
        -Path "eventstream.json" `
        -DefinitionPath ".\eventstream.json"
)

if (Test-Path ".\eventstreamProperties.json") {
    $eventstreamParts += New-FabricDefinitionPart `
        -Path "eventstreamProperties.json" `
        -DefinitionPath ".\eventstreamProperties.json"
}

if (Test-Path ".\.platform") {
    $eventstreamParts += New-FabricDefinitionPart `
        -Path ".platform" `
        -DefinitionPath ".\.platform"
}
```

## Create an Eventstream

Use a display name that contains letters, numbers, or underscores. Don't use spaces.

```powershell
$workspaceId = "<target-workspace-id>"
$body = @{
    displayName = "ProductionEventConsumer"
    description = "Consumes events through Eventstream."
    definition = @{
        format = "eventstream"
        parts = $eventstreamParts
    }
} | ConvertTo-Json -Depth 100

$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/eventstreams"
$response = Invoke-WebRequest `
    -Method Post `
    -Uri $uri `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $body
```

## Update an event stream

Always submit the complete definition.

```powershell
$updateBody = @{
    definition = @{
        format = "eventstream"
        parts = $eventstreamParts
    }
} | ConvertTo-Json -Depth 100

$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/eventstreams/$eventstreamId/updateDefinition"
$response = Invoke-WebRequest `
    -Method Post `
    -Uri $uri `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $updateBody
```

## Validate the event stream topology

An `updateDefinition` request can return `200 OK` before the source finishes updating. Retrieve the topology, wait for each source to leave `Updating`, and inspect its deployed properties and error. Do the same after a create operation finishes: an accepted create operation doesn't guarantee that each subscription started.

```powershell
$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/eventstreams/$eventstreamId/topology"
$topology = Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
$topology.sources | Select-Object name, type, status, error
$topology.destinations | Select-Object name, type, status, error
```

Don't submit another source update while its status is `Updating`. Investigate any `Failed` source or `Warning` destination even if `error` is null. A source in `Running` confirms subscription setup, not event delivery; a destination in `Warning` isn't evidence of Eventhouse ingestion. Publish an identifiable event and verify that a matching record reaches the intended Eventhouse table before reporting end-to-end success.

## Troubleshoot event stream API updates

| Symptom or error | Cause | Resolution |
|---|---|---|
| The definition update succeeds, but the source reports `ESComponentUpdateFailure` | The item definition was accepted, but the asynchronous event subscription update failed validation. | Retrieve the event stream topology, inspect the source error details, correct the source definition, and retry after the source leaves `Updating`. |
| An update reports that the source is in `Updating` state | A previous source update is still in progress. | Poll the topology until the source leaves `Updating` before you submit another update. |
| A source subscription fails with `401 Unauthorized` | The deployment identity might lack a required source permission. | Check [subscribe permissions for Azure and Fabric events](fabric-events-subscribe-permission.md), then inspect the deployed source status and error. |
| An Eventhouse destination reports `Warning` with a null `error` | The destination hasn't been shown to ingest events; a null error doesn't establish success. | Inspect destination configuration and status, publish a uniquely identifiable event, and check the destination table for the record. |

## Next steps

- [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md).
- [Consume events with Activator REST APIs](consume-events-activator-rest-api.md).
- [Filter events with REST API definitions](configure-event-filters-rest-api.md).
- [Subscribe permissions for Azure and Fabric events](fabric-events-subscribe-permission.md).
- [Eventstream item definition](/rest/api/fabric/articles/item-management/definitions/eventstream-definition).
- [Event stream REST API](../real-time-intelligence/event-streams/eventstream-rest-api.md).
