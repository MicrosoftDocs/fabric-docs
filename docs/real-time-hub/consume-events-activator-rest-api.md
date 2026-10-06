---
title: Consume events with Activator REST APIs
description: Learn how to configure Activator definitions that consume Azure, Fabric, and Business events by using Microsoft Fabric REST APIs.
ms.reviewer: george-guirguis
ms.topic: how-to
ms.date: 10/05/2026
ai-usage: ai-assisted
---

# Consume events with Activator REST APIs

Use an Activator definition to subscribe to Azure, Fabric, or Business events and evaluate them with Activator rules.

Complete the common prerequisites and authentication steps in [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md) first. Before configuring sources, confirm that the deployment identity has the permissions required for every selected event group. See [Subscribe permissions for Azure and Fabric events](fabric-events-subscribe-permission.md). Create Business event types and permissions by following [Create Business events and manage data access with REST APIs](create-business-events-rest-api.md).

## Build the Activator definition

The `ReflexEntities.json` file contains a JSON array of connected entities. Each entity has this common structure:

```json
{
  "uniqueIdentifier": "<guid>",
  "payload": {},
  "type": "<entity-type>"
}
```

The source payload examples in this article can be assembled into a complete Activator definition with the pipeline example below. It includes the container, Real-Time Hub source, `SourceEvent` view, enabled `EventTrigger` rule, `FabricItemInvocation` binding, and pipeline action entity. For a complete Business event publisher graph, see [Publish from Activator through item-definition APIs](publish-business-events.md#publish-from-activator-through-item-definition-apis).

The `FabricItemBinding` row requires all seven base arguments, including empty `additionalInformation` and `parameters` arrays when the pipeline takes no parameters. Its `fabricJobConnectionDocumentId` must reference the `uniqueIdentifier` of the `fabricItemAction-v1` entity; `workspaceId`, `itemId`, `itemType`, and `jobType` in the row must agree with that action's pipeline target. The row name is `FabricItemBinding`, its kind is `FabricItemInvocation`, and an `ActStep` contains exactly one action-binding row. This binding shape is documented in the [Microsoft Activator action authoring reference](https://github.com/microsoft/skills-for-fabric/blob/6c11ad58c25992e5d1435ce7cd80d217d5598a31/plugins/fabric-skills/skills/activator-cli/references/authoring/action-types.md#how-rules-reference-fabric-item-actions).

## Create a complete Activator definition that runs a pipeline

This example subscribes to Fabric workspace item-create events and runs a pipeline for each event. Replace the tenant, source workspace, pipeline workspace, and pipeline item IDs with IDs from your environment. The other GUIDs are definition-local identifiers; keep each reference aligned if you change them. Save the array as `ReflexEntities.json` and submit it by using the Activator create or `updateDefinition` flow in [Build the Activator definition](#build-the-activator-definition).

```json
[
  {
    "uniqueIdentifier": "10000000-0000-0000-0000-000000000001",
    "type": "container-v1",
    "payload": {
      "name": "Workspace event pipeline",
      "type": "rthSubscriptions"
    }
  },
  {
    "uniqueIdentifier": "10000000-0000-0000-0000-000000000002",
    "type": "realTimeHubSource-v1",
    "payload": {
      "name": "Workspace item-created events",
      "connection": {
        "scope": "Workspace",
        "tenantId": "<tenant-id>",
        "workspaceId": "<source-workspace-id>",
        "eventGroupType": "Microsoft.Fabric.WorkspaceEvents"
      },
      "filterSettings": {
        "eventTypes": [
          {
            "name": "Microsoft.Fabric.ItemCreateSucceeded"
          }
        ],
        "filters": []
      },
      "parentContainer": {
        "targetUniqueIdentifier": "10000000-0000-0000-0000-000000000001"
      }
    }
  },
  {
    "uniqueIdentifier": "10000000-0000-0000-0000-000000000003",
    "type": "timeSeriesView-v1",
    "payload": {
      "name": "Workspace item-created event",
      "parentContainer": {
        "targetUniqueIdentifier": "10000000-0000-0000-0000-000000000001"
      },
      "definition": {
        "type": "Event",
        "instance": "{\"templateId\":\"SourceEvent\",\"templateVersion\":\"1.2.4\",\"steps\":[{\"name\":\"SourceEventStep\",\"id\":\"10000000-0000-0000-0000-000000000006\",\"rows\":[{\"name\":\"SourceSelector\",\"kind\":\"SourceReference\",\"arguments\":[{\"name\":\"entityId\",\"type\":\"string\",\"value\":\"10000000-0000-0000-0000-000000000002\"}]}]}]}"
      }
    }
  },
  {
    "uniqueIdentifier": "10000000-0000-0000-0000-000000000004",
    "type": "timeSeriesView-v1",
    "payload": {
      "name": "Run pipeline for workspace event",
      "parentContainer": {
        "targetUniqueIdentifier": "10000000-0000-0000-0000-000000000001"
      },
      "definition": {
        "type": "Rule",
        "instance": "{\"templateId\":\"EventTrigger\",\"templateVersion\":\"1.2.4\",\"steps\":[{\"name\":\"FieldsDefaultsStep\",\"id\":\"10000000-0000-0000-0000-000000000007\",\"rows\":[{\"name\":\"EventSelector\",\"kind\":\"Event\",\"arguments\":[{\"name\":\"event\",\"type\":\"complex\",\"kind\":\"EventReference\",\"arguments\":[{\"name\":\"entityId\",\"type\":\"string\",\"value\":\"10000000-0000-0000-0000-000000000003\"}]}]}]},{\"name\":\"EventDetectStep\",\"id\":\"10000000-0000-0000-0000-000000000008\",\"rows\":[{\"name\":\"OnEveryValue\",\"kind\":\"OnEveryValue\",\"arguments\":[]}]},{\"name\":\"ActStep\",\"id\":\"10000000-0000-0000-0000-000000000009\",\"rows\":[{\"name\":\"FabricItemBinding\",\"kind\":\"FabricItemInvocation\",\"arguments\":[{\"name\":\"workspaceId\",\"type\":\"string\",\"value\":\"<pipeline-workspace-id>\"},{\"name\":\"itemId\",\"type\":\"string\",\"value\":\"<pipeline-id>\"},{\"name\":\"itemType\",\"type\":\"string\",\"value\":\"Pipeline\"},{\"name\":\"jobType\",\"type\":\"string\",\"value\":\"Pipeline\"},{\"name\":\"fabricJobConnectionDocumentId\",\"type\":\"string\",\"value\":\"10000000-0000-0000-0000-000000000005\"},{\"name\":\"additionalInformation\",\"type\":\"array\",\"values\":[]},{\"name\":\"parameters\",\"type\":\"array\",\"values\":[]}]}]}]}",
        "settings": {
          "shouldRun": true,
          "shouldApplyRuleOnUpdate": false
        }
      }
    }
  },
  {
    "uniqueIdentifier": "10000000-0000-0000-0000-000000000005",
    "type": "fabricItemAction-v1",
    "payload": {
      "name": "Run workspace event pipeline",
      "fabricItem": {
        "itemId": "<pipeline-id>",
        "workspaceId": "<pipeline-workspace-id>",
        "itemType": "Pipeline"
      },
      "jobType": "Pipeline",
      "parentContainer": {
        "targetUniqueIdentifier": "10000000-0000-0000-0000-000000000001"
      }
    }
  }
]
```

Replace each angle-bracketed value with the corresponding GUID. If the pipeline accepts parameters, add a `FabricItemParameter` entry per parameter to the `parameters` array; for a parameterless pipeline, keep it empty. To use another event group, replace the `realTimeHubSource-v1` entity with the matching source payload in this article and update the source identifier in the `SourceReference`. For multiple event groups, add a separate source, `SourceEvent` view, and enabled rule per group; each rule can reference the same pipeline action entity.

After creating or updating the definition, call `getDefinition` to verify the row and references persisted. Then generate an event that matches the source and verify a corresponding pipeline job instance. Definition acceptance alone doesn't prove that the rule ran or started the pipeline.

For Azure, Fabric, and Business event consumption, use an entity whose `type` is `realTimeHubSource-v1`. The following example monitors Fabric workspace item events:

```json
{
  "uniqueIdentifier": "eeeeeeee-4444-5555-6666-ffffffffffff",
  "payload": {
    "name": "Workspace event monitor",
    "connection": {
      "scope": "Workspace",
      "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
      "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
      "eventGroupType": "Microsoft.Fabric.WorkspaceEvents"
    },
    "filterSettings": {
      "eventTypes": [
        {
          "name": "Microsoft.Fabric.ItemCreateSucceeded"
        },
        {
          "name": "Microsoft.Fabric.ItemUpdateSucceeded"
        }
      ],
      "filters": []
    },
    "parentContainer": {
      "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
    }
  },
  "type": "realTimeHubSource-v1"
}
```

Preserve the `uniqueIdentifier`, `parentContainer`, and references from downstream entities when you reuse the definition in another environment.

To restrict the events that a source receives, see [Filter events with REST API definitions](configure-event-filters-rest-api.md).

Replace the source entity's `payload` with one of the following event-specific examples.

## Azure Blob Storage events in Activator

```json
{
  "name": "Azure Blob Storage events",
  "connection": {
    "scope": "SubArtifact",
    "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "artifactId": "cccccccc-2222-3333-4444-dddddddddddd",
    "subArtifactId": "dddddddd-3333-4444-5555-eeeeeeeeeeee",
    "subArtifactDisplayName": "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Storage/storageAccounts/<account-name>",
    "eventGroupType": "Microsoft.Storage.StorageAccounts"
  },
  "filterSettings": {
    "eventTypes": [
      {
        "name": "Microsoft.Storage.BlobCreated"
      },
      {
        "name": "Microsoft.Storage.BlobDeleted"
      }
    ],
    "filters": []
  },
  "parentContainer": {
    "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
  }
}
```

Generate stable GUID values for `artifactId` and `subArtifactId`. Store the storage account's full Azure Resource Manager ID in `subArtifactDisplayName`.

## Fabric workspace item events in Activator

```json
{
  "name": "Workspace item events",
  "connection": {
    "scope": "Workspace",
    "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "eventGroupType": "Microsoft.Fabric.WorkspaceEvents"
  },
  "filterSettings": {
    "eventTypes": [
      {
        "name": "Microsoft.Fabric.ItemCreateSucceeded"
      },
      {
        "name": "Microsoft.Fabric.ItemUpdateSucceeded"
      }
    ],
    "filters": []
  },
  "parentContainer": {
    "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
  }
}
```

Add the workspace event types that you want to consume to `eventTypes`.

## Fabric job events in Activator

```json
{
  "name": "Fabric Job events",
  "connection": {
    "scope": "Artifact",
    "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "artifactId": "cccccccc-2222-3333-4444-dddddddddddd",
    "eventGroupType": "Microsoft.Fabric.JobEvents"
  },
  "filterSettings": {
    "eventTypes": [
      {
        "name": "Microsoft.Fabric.JobEvents.ItemJobCreated"
      },
      {
        "name": "Microsoft.Fabric.JobEvents.ItemJobStatusChanged"
      },
      {
        "name": "Microsoft.Fabric.JobEvents.ItemJobSucceeded"
      },
      {
        "name": "Microsoft.Fabric.JobEvents.ItemJobFailed"
      }
    ],
    "filters": []
  },
  "parentContainer": {
    "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
  }
}
```

Set `artifactId` to the ID of the Fabric item whose jobs you want to monitor. The source item and Activator workspaces must be in the same region.

## Fabric OneLake events in Activator

```json
{
  "name": "Fabric OneLake events",
  "connection": {
    "scope": "Artifact",
    "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "artifactId": "cccccccc-2222-3333-4444-dddddddddddd",
    "eventGroupType": "Microsoft.Fabric.OneLakeEvents"
  },
  "filterSettings": {
    "eventTypes": [
      {
        "name": "Microsoft.Fabric.OneLake.FileCreated"
      },
      {
        "name": "Microsoft.Fabric.OneLake.FileDeleted"
      },
      {
        "name": "Microsoft.Fabric.OneLake.FileRenamed"
      },
      {
        "name": "Microsoft.Fabric.OneLake.FolderCreated"
      },
      {
        "name": "Microsoft.Fabric.OneLake.FolderDeleted"
      },
      {
        "name": "Microsoft.Fabric.OneLake.FolderRenamed"
      }
    ],
    "filters": []
  },
  "parentContainer": {
    "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
  }
}
```

Set `artifactId` to the lakehouse or other supported OneLake item's ID. The source item and Activator workspaces must be in the same region.

## Fabric capacity overview events in Activator

```json
{
  "name": "Fabric capacity overview events",
  "connection": {
    "scope": "Capacity",
    "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "capacityId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "eventGroupType": "Microsoft.Fabric.CapacityEvents"
  },
  "filterSettings": {
    "eventTypes": [
      {
        "name": "Microsoft.Fabric.Capacity.State"
      },
      {
        "name": "Microsoft.Fabric.Capacity.Summary"
      }
    ],
    "filters": []
  },
  "parentContainer": {
    "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
  }
}
```

## Fabric capacity operation events in Activator

```json
{
  "name": "Fabric capacity operation events",
  "connection": {
    "scope": "Capacity",
    "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "capacityId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "eventGroupType": "Microsoft.Fabric.CapacityOperationEvents"
  },
  "filterSettings": {
    "eventTypes": [
      {
        "name": "Microsoft.Fabric.CapacityOperationEvents.Operation"
      }
    ],
    "filters": []
  },
  "parentContainer": {
    "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
  }
}
```

## Fabric anomaly detection events in Activator

```json
{
  "name": "Fabric anomaly detection events",
  "connection": {
    "scope": "Artifact",
    "tenantId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "artifactId": "cccccccc-2222-3333-4444-dddddddddddd",
    "eventGroupType": "Microsoft.Fabric.AnomalyEvents"
  },
  "filterSettings": {
    "eventTypes": [
      {
        "name": "Microsoft.Fabric.AnomalyEvents.AnomalyDetected"
      }
    ],
    "filters": []
  },
  "parentContainer": {
    "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
  }
}
```

Set `artifactId` to the Anomaly Detector item ID. To consume events from only one detector configuration, add a `StringContains` filter on `subject` whose value is the configuration ID.

## Business events in Activator

For Business events, identify each event type by its fully qualified ID:

```json
{
  "name": "Business events",
  "connection": {
    "scope": "BusinessEvents",
    "eventTypeFullyQualifiedIds": [
      "/workspaces/bbbbbbbb-1111-2222-3333-cccccccccccc/eventschemasets/cccccccc-2222-3333-4444-dddddddddddd/eventtypes/OrderPlaced",
      "/workspaces/bbbbbbbb-1111-2222-3333-cccccccccccc/eventschemasets/cccccccc-2222-3333-4444-dddddddddddd/eventtypes/PaymentFailed"
    ]
  },
  "filterSettings": {
    "filters": []
  },
  "parentContainer": {
    "targetUniqueIdentifier": "ffffffff-5555-6666-7777-aaaaaaaaaaaa"
  }
}
```

Keep these properties inside the complete `realTimeHubSource-v1` entity.

## Prepare the Activator definition parts

Save the entities as `ReflexEntities.json`. Include `.platform` when you manage item metadata through Git or the definition API.

```powershell
$activatorParts = @(
    New-FabricDefinitionPart `
        -Path "ReflexEntities.json" `
        -DefinitionPath ".\ReflexEntities.json"
)

if (Test-Path ".\.platform") {
    $activatorParts += New-FabricDefinitionPart `
        -Path ".platform" `
        -DefinitionPath ".\.platform"
}
```

For Activator create and update requests, don't include `definition.format`. Submit the `parts` collection directly under `definition`.

## Create an Activator

Create the Activator with its complete definition in one request:

```powershell
$workspaceId = "<target-workspace-id>"
$createBody = @{
    displayName = "ProductionEventActivator"
    description = "Evaluates events and runs actions."
    type = "Reflex"
    definition = @{
        parts = $activatorParts
    }
} | ConvertTo-Json -Depth 100

$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/items"
$activator = Invoke-RestMethod `
    -Method Post `
    -Uri $uri `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $createBody
```

## Apply or update the Activator definition

```powershell
$updateBody = @{
    definition = @{
        parts = $activatorParts
    }
} | ConvertTo-Json -Depth 100

$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/items/$($activator.id)/updateDefinition"
$response = Invoke-WebRequest `
    -Method Post `
    -Uri $uri `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $updateBody
```

When an update changes a Real-Time hub source's filters, assign a new `uniqueIdentifier` to the `realTimeHubSource-v1` entity and update every downstream `SourceReference` that targets it. Keep existing identifiers when the source subscription doesn't change.

## Validate the Activator definition

Retrieve the deployed definition through the core item-definition API:

```powershell
$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/items/$($activator.id)/getDefinition"
$definition = Invoke-RestMethod `
    -Method Post `
    -Uri $uri `
    -Headers $headers
```

Decode `ReflexEntities.json` and verify the source connection, filters, `SourceReference`, enabled `EventTrigger` rule, action, and environment-specific IDs. A retained `realTimeHubSource-v1` and `SourceEvent` view, or even a pipeline action entity, doesn't prove a rule exists or executed. Trigger an event that matches the rule and verify the expected consumer action, such as an actual pipeline run. For Business event consumers, verify that the rule acted on the published event; a successful publisher response alone isn't a delivery receipt. For a pipeline action, confirm the rule includes a `FabricItemInvocation` row referencing the pipeline action, rather than just the action entity.

## Troubleshoot Activator API updates

| Symptom or error | Cause | Resolution |
|---|---|---|
| A filter update says that updating event subscription filters isn't supported | The definition reused the existing Real-Time hub source identifier. | Assign a new `uniqueIdentifier` to the source and update every downstream `SourceReference` that targets it. |
| Activator opens with missing or disconnected entities | A generated `uniqueIdentifier`, parent reference, or template reference changed. | Restore the identifiers from the exported definition and update all references consistently. |
| Sources and event views persist but no consumer action occurs | The definition contains no enabled trigger rule, or its `ActStep` doesn't reference an action. | Export a working rule, add its connected `EventTrigger` instance and action row, then generate a matching event and verify the action ran. |

## Next steps

- [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md).
- [Create Business events and manage data access with REST APIs](create-business-events-rest-api.md).
- [Publish Business events with APIs](publish-business-events.md).
- [Filter events with REST API definitions](configure-event-filters-rest-api.md).
- [Reflex item definition](/rest/api/fabric/articles/item-management/definitions/reflex-definition).
- [Activator items REST API](/rest/api/fabric/reflex/items).
