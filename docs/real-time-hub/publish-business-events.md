---
title: Publish Business events with APIs
description: Use NotebookUtils, User Data Functions, and Activator item-definition APIs to publish Business events in Microsoft Fabric.
ms.reviewer: george-guirguis
ms.topic: how-to
ms.date: 10/05/2026
ai-usage: ai-assisted
---

# Publish business events with APIs

Microsoft Fabric provides three programmable interfaces for publishing business events:

| Publisher | Publishing API | API reference |
|---|---|---|
| Fabric notebook | `notebookutils.businessEvents.publish()` | [NotebookUtils Business event utilities](/fabric/data-engineering/notebookutils/notebookutils-business-events) |
| User data function | `FabricBusinessEventsClient.PublishEvent()` | [FabricBusinessEventsClient Python API](/python/api/fabric-user-data-functions/fabric.functions.businessevents.fabricbusinesseventsclient?view=fabric-user-data-functions-python-latest&preserve-view=true) |
| Activator | Activator item-definition APIs | [Reflex definition](/rest/api/fabric/articles/item-management/definitions/reflex-definition) |

This article covers the APIs and REST endpoints that create, configure, execute, and validate these publishers. Complete the common authentication and definition-handling steps in [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md) first.

## Prerequisites

Before you publish an event:

1. [Create the business event and event schema set](create-business-events-rest-api.md).
1. Enable data access security and grant the publishing identity the `Publish` permission.
1. Confirm that the payload property names and data types match the selected schema version.

For the complete permission model, see [Manage data access for Business events](business-events/manage-business-events-data-access.md).

## Publish from a notebook

The `notebookutils.businessEvents` module is available in Python 3.12 and PySpark (Python) notebooks.

To create the notebook and its code through REST API, see [Create Notebook](/rest/api/fabric/notebook/items/create-notebook). You can include the notebook public definition in the create request.

### API contract

```text
publish(
    eventSchemaSetWorkspace: str,
    eventSchemaSet: str,
    eventTypeName: str,
    eventData: dict | list[dict],
    dataVersion: str = "v1"
) -> bool
```

| Parameter | Type | Description |
|---|---|---|
| `eventSchemaSetWorkspace` | String | Name or ID of the workspace that contains the event schema set. |
| `eventSchemaSet` | String | Name or ID of the event schema set. |
| `eventTypeName` | String | Name of the Business event type. |
| `eventData` | Dictionary or list of dictionaries | One event payload or a batch of payloads. Each dictionary must conform to the selected schema. |
| `dataVersion` | String | Schema version. The default is `v1`. |

The method returns `True` when publishing succeeds. It raises an exception when the event can't be published.

To inspect the API from a notebook, run:

```python
notebookutils.businessEvents.help("publish")
```

### Publish one event

```python
published = notebookutils.businessEvents.publish(
    eventSchemaSetWorkspace="<workspace-id>",
    eventSchemaSet="<event-schema-set-id>",
    eventTypeName="OrderCreated",
    eventData={
        "orderId": "ORD-1001",
        "amount": 125.50
    },
    dataVersion="v1"
)

print(f"Published: {published}")
```

### Publish a batch

Pass a list of payloads to publish multiple events of the same type and schema version:

```python
published = notebookutils.businessEvents.publish(
    eventSchemaSetWorkspace="<workspace-id>",
    eventSchemaSet="<event-schema-set-id>",
    eventTypeName="OrderCreated",
    eventData=[
        {
            "orderId": "ORD-1002",
            "amount": 80.00
        },
        {
            "orderId": "ORD-1003",
            "amount": 210.25
        }
    ],
    dataVersion="v1"
)
```

All payloads in the list must conform to the schema version specified by `dataVersion`.

### Run the publishing notebook through REST API

Use the Job Scheduler REST API to execute a notebook that contains the publishing call:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks/{notebookId}/jobs/execute/instances?jobType=RunNotebook
Authorization: Bearer <access-token>
```

Poll the job instance until it reaches a terminal state:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/notebooks/{notebookId}/jobs/execute/instances/{jobInstanceId}?beta=true
Authorization: Bearer <access-token>
```

For request parameters, responses, and identity support, see:

- [Run on demand item job REST API](/rest/api/fabric/core/job-scheduler/run-on-demand-item-job).
- [Get item job instance REST API](/rest/api/fabric/core/job-scheduler/get-item-job-instance).
- [Manage and execute notebooks with APIs](../data-engineering/notebook-public-api.md).

A `Completed` notebook job confirms that the notebook execution finished. Return the publishing result through `notebookutils.notebook.exit(str(published))` when the calling automation needs to inspect it. In a tested run, the `?beta=true` response exposed `properties.exitValue: "True"`; a response from the separate `/jobs/instances/` path didn't expose this value. A successful publisher call doesn't confirm delivery to a consumer.

## Publish from a user data function

A user data function receives a `FabricBusinessEventsClient` through an event schema set connection. Fabric supplies the connected client when it invokes the function; don't add credentials or event endpoints to the function code.

To create the user data functions item and its code through REST API, see [Create User Data Function](/rest/api/fabric/userdatafunction/items/create-user-data-function). You can include the user data function public definition in the create request. The create API supports user identities but doesn't currently support service principals or managed identities.

### Create the connected user data function

The tested public definition contains three parts: `definition.json`, `function_app.py`, and `resources/functions.json`. In `definition.json`, connect to the **event schema set ID** with `artifactType: "EventDefinition"`:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/userDataFunction/definition/1.1.0/schema.json",
  "runtime": "PYTHON",
  "connectedDataSources": [
    {
      "alias": "be1",
      "artifactId": "<event-schema-set-id>",
      "artifactType": "EventDefinition",
      "workspaceId": "<event-schema-set-workspace-id>"
    }
  ],
  "functions": [
    {
      "name": "publish_order_created",
      "description": "Publish an OrderCreated Business event.",
      "isPublicEndpointEnabled": true
    }
  ],
  "libraries": {
    "public": [],
    "private": []
  }
}
```

Don't use `EventSchemaSet` as the connection's `artifactType`: the tested create operation rejected it. Set the binding alias to `be1` in `resources/functions.json` and use the same alias in the Python decorator:

```json
{
  "runtime": "PYTHON",
  "functionsMetadata": [
    {
      "name": "publish_order_created",
      "scriptFile": "function_app.py",
      "bindings": [
        {
          "methods": ["POST"],
          "route": "",
          "authLevel": "Anonymous",
          "name": "req",
          "direction": "In",
          "type": "HttpTrigger"
        },
        {
          "itemType": null,
          "subType": "FabricBusinessEventsClient",
          "alias": "be1",
          "name": "businessEventsClient",
          "direction": "In",
          "type": "FabricItem"
        }
      ],
      "fabricProperties": {
        "fabricMetadataSchemaVersion": "1.1.0",
        "fabricFunctionParameters": [
          {"dataType": "str", "name": "orderId"},
          {"dataType": "float", "name": "amount"}
        ],
        "fabricFunctionReturnType": "str"
      }
    }
  ]
}
```

Save the Python example in the next section as `function_app.py`. Encode all three files by using [New-FabricDefinitionPart](automate-event-consumption-rest-api-cicd.md#encode-definition-parts), keeping the forward slash in the `resources/functions.json` part path:

```powershell
$parts = @(
    (New-FabricDefinitionPart -Path "definition.json" -DefinitionPath ".\definition.json")
    (New-FabricDefinitionPart -Path "function_app.py" -DefinitionPath ".\function_app.py")
    (New-FabricDefinitionPart -Path "resources/functions.json" -DefinitionPath ".\resources\functions.json")
)
$body = @{
    displayName = "OrderPublisherUDF"
    definition = @{ parts = $parts }
} | ConvertTo-Json -Depth 100

$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/userDataFunctions"
$response = Invoke-WebRequest -Method Post -Uri $uri -Headers $headers `
    -ContentType "application/json" -Body $body
```

Don't specify `definition.format` for this create request: the tested `UserDataFunctionV1` value returned `InvalidDefinitionFormat`. If the API returns `202 Accepted`, [poll the long-running operation](automate-event-consumption-rest-api-cicd.md#handle-long-running-operations) before invoking the function; request acceptance alone doesn't establish that definition validation succeeded.

### API contract

```text
PublishEvent(
    type: str,
    event_data: dict | list[dict],
    data_version: str = "v1"
) -> None
```

| Parameter | Type | Description |
|---|---|---|
| `type` | String | Business event type name. |
| `event_data` | Dictionary or list of dictionaries | One event payload or a batch of payloads that conform to the event schema. |
| `data_version` | String | Schema version. The default is `v1`. |

For the complete class and method reference, see [FabricBusinessEventsClient Python API](/python/api/fabric-user-data-functions/fabric.functions.businessevents.fabricbusinesseventsclient?view=fabric-user-data-functions-python-latest&preserve-view=true).

### Define the publishing function

Add an event schema set connection to the user data functions item, and use its alias in the `@udf.connection` decorator:

```python
import fabric.functions as fn

udf = fn.UserDataFunctions()

@udf.connection(
    argName="businessEventsClient",
    alias="be1"
)
@udf.function()
def publish_order_created(
    businessEventsClient: fn.FabricBusinessEventsClient,
    orderId: str,
    amount: float
) -> str:
    businessEventsClient.PublishEvent(
        type="OrderCreated",
        event_data={
            "orderId": orderId,
            "amount": amount
        },
        data_version="v1"
    )

    return f"Published OrderCreated for {orderId}."
```

For connection and batch-publishing examples, see [Write user data functions for Business events](/fabric/data-engineering/user-data-functions/write-functions-business-events).

Use `orderId` consistently in the function signature, `fabricFunctionParameters`, and invocation body. An input parameter named `order_id` failed the tested definition with `MetadataValidationError`; the function name `publish_order_created` was accepted.

### Invoke the publishing function through REST API

After you publish the user data function, invoke it through its function endpoint:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/userDataFunctions/{userDataFunctionsId}/functions/{functionName}/invoke
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "orderId": "ORD-1004",
  "amount": 175.25
}
```

The request property names must match the input parameters of the published function. The caller needs permission to execute the user data function and `Publish` permission for the event schema set. In the tested invocation, a token for the `https://analysis.windows.net/powerbi/api` resource returned HTTP `200` with `status: "Succeeded"` and the function's returned text. This result doesn't establish that a downstream consumer received the event.

Use the user data function ID and function name returned by the item-definition APIs to construct the `/invoke` endpoint. Authenticate the request with a Microsoft Entra token for the `https://analysis.windows.net/powerbi/api` resource.

## Publish from Activator through item-definition APIs

Activator stores its configuration in the `ReflexEntities.json` definition part. A **Publish a business event** rule action consists of:

- A `BusinessEventPublication` row in the rule's `ActStep`.
- A `businessEventAction-v1` entity that identifies the target event schema set.
- A shared identifier that links the rule row to the action entity.

Activator publishes the business event when the rule triggers. There's no separate REST operation that invokes the publishing action directly.

> [!IMPORTANT]
> Template instances are stored as JSON-encoded strings in `definition.instance`. The examples in this section show the decoded JSON. Encode the complete template instance as a string before you add it to `ReflexEntities.json`.

### Create a new Activator in one API call

Build the complete `ReflexEntities.json` definition with the source, event view, enabled rule, publishing row, and action entity, and include it in the [Create Item](/rest/api/fabric/core/items/create-item) request.

The following PowerShell example constructs the complete definition for an `OrderCreated` business event source that publishes an `OrderProcessed` business event. Both event types must already exist, the target `OrderProcessed` schema must have a string `orderId` field, and the effective publishing identity must have `Publish` permission on the target event schema set. Substitute the source and target IDs for your workspaces and schema sets.

```powershell
$sourceWorkspaceId = "<source-workspace-id>"
$sourceSchemaSetId = "<source-event-schema-set-id>"
$targetWorkspaceId = "<target-workspace-id>"
$targetSchemaSetId = "<target-event-schema-set-id>"
$containerId = [guid]::NewGuid().ToString()
$sourceId = [guid]::NewGuid().ToString()
$eventViewId = [guid]::NewGuid().ToString()
$ruleId = [guid]::NewGuid().ToString()
$actionId = [guid]::NewGuid().ToString()

$eventInstance = @{
    templateId = "SourceEvent"
    templateVersion = "1.3.0"
    steps = @(@{
        id = [guid]::NewGuid().ToString()
        name = "SourceEventStep"
        rows = @(@{
            kind = "SourceReference"
            name = "SourceSelector"
            arguments = @(@{
                name = "entityId"
                type = "string"
                value = $sourceId
            })
        })
    })
} | ConvertTo-Json -Depth 30 -Compress

$ruleInstance = @{
    templateId = "EventTrigger"
    templateVersion = "1.3.0"
    steps = @(
        @{
            id = [guid]::NewGuid().ToString()
            name = "FieldsDefaultsStep"
            rows = @(@{
                kind = "Event"
                name = "EventSelector"
                arguments = @(@{
                    name = "event"
                    type = "complex"
                    kind = "EventReference"
                    arguments = @(@{
                        name = "entityId"
                        type = "string"
                        value = $eventViewId
                    })
                })
            })
        },
        @{
            id = [guid]::NewGuid().ToString()
            name = "EventDetectStep"
            rows = @(@{
                kind = "OnEveryValue"
                name = "OnEveryValue"
                arguments = @()
            })
        },
        @{
            id = [guid]::NewGuid().ToString()
            name = "ActStep"
            rows = @(@{
                kind = "BusinessEventPublication"
                name = "BusinessEventBinding"
                arguments = @(
                    @{ name = "schemaName"; type = "string"; value = "OrderProcessed" },
                    @{ name = "schemaVersion"; type = "string"; value = "v1" },
                    @{ name = "businessEventDocumentId"; type = "string"; value = $actionId },
                    @{
                        name = "data"
                        type = "array"
                        values = @(@{
                            type = "complex"
                            kind = "FabricItemParameter"
                            arguments = @(
                                @{ name = "parameterName"; type = "string"; value = "orderId" },
                                @{
                                    name = "parameterValue"
                                    type = "complexArray"
                                    values = @(@{
                                        type = "complexReference"
                                        kind = "EventFieldReference"
                                        arguments = @(@{
                                            name = "fieldName"
                                            type = "string"
                                            value = "orderId"
                                        })
                                    })
                                },
                                @{ name = "parameterType"; type = "string"; value = "String" }
                            )
                        })
                    }
                )
            })
        }
    )
} | ConvertTo-Json -Depth 30 -Compress

$entities = @(
    @{
        uniqueIdentifier = $containerId
        type = "container-v1"
        payload = @{
            name = "Order event publisher"
            type = "rthSubscriptions"
        }
    },
    @{
        uniqueIdentifier = $sourceId
        type = "realTimeHubSource-v1"
        payload = @{
            name = "OrderCreated source"
            connection = @{
                scope = "BusinessEvents"
                eventTypeFullyQualifiedIds = @(
                    "/workspaces/$sourceWorkspaceId/eventschemasets/$sourceSchemaSetId/eventtypes/OrderCreated"
                )
            }
            filterSettings = @{ filters = @() }
            parentContainer = @{ targetUniqueIdentifier = $containerId }
        }
    },
    @{
        uniqueIdentifier = $actionId
        type = "businessEventAction-v1"
        payload = @{
            name = "Business event action"
            schemaName = "OrderProcessed"
            schemaVersion = "v1"
            item = @{
                itemId = $targetSchemaSetId
                workspaceId = $targetWorkspaceId
            }
            parentContainer = @{ targetUniqueIdentifier = $containerId }
        }
    },
    @{
        uniqueIdentifier = $eventViewId
        type = "timeSeriesView-v1"
        payload = @{
            name = "OrderCreated event"
            parentContainer = @{ targetUniqueIdentifier = $containerId }
            definition = @{
                type = "Event"
                instance = $eventInstance
            }
        }
    },
    @{
        uniqueIdentifier = $ruleId
        type = "timeSeriesView-v1"
        payload = @{
            name = "Publish OrderProcessed"
            parentContainer = @{ targetUniqueIdentifier = $containerId }
            definition = @{
                type = "Rule"
                instance = $ruleInstance
                settings = @{
                    shouldRun = $true
                    shouldApplyRuleOnUpdate = $false
                }
            }
        }
    }
)

$entities | ConvertTo-Json -Depth 30 |
    Set-Content -Path ".\ReflexEntities.json" -Encoding utf8
$activatorParts = @(
    New-FabricDefinitionPart -Path "ReflexEntities.json" `
        -DefinitionPath ".\ReflexEntities.json"
)
```

Run the [definition-part encoding helper](automate-event-consumption-rest-api-cicd.md#encode-definition-parts) before this example. The `definition.instance` properties are JSON-encoded strings, not nested objects. The `SourceReference` points to the source, the rule's `EventReference` points to the event view, and `businessEventDocumentId` points to the action entity. Keep those references aligned when changing IDs. This complete graph was accepted by `updateDefinition` and retained by `getDefinition` with an `OrderCreated.orderId` to target string-field mapping; actual triggering and downstream publication weren't verified in that test.

Don't include `definition.format` in the request. Submit the `parts` collection directly under `definition`.

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items
Authorization: Bearer {access-token}
Content-Type: application/json

{
  "displayName": "<activator-name>",
  "description": "<description>",
  "type": "Reflex",
  "definition": {
    "parts": [
      {
        "path": "ReflexEntities.json",
        "payload": "<base64-payload-from-activatorParts>",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

Submit the generated definition part without copying its Base64 payload manually:

```powershell
$activatorWorkspaceId = "<activator-workspace-id>"
$createBody = @{
    displayName = "OrderBusinessEventPublisher"
    description = "Publish OrderProcessed when OrderCreated arrives."
    type = "Reflex"
    definition = @{ parts = $activatorParts }
} | ConvertTo-Json -Depth 100

$uri = "https://api.fabric.microsoft.com/v1/workspaces/$activatorWorkspaceId/items"
$response = Invoke-WebRequest -Method Post -Uri $uri -Headers $headers `
    -ContentType "application/json" -Body $createBody
```

If creation returns `202 Accepted`, poll the [long-running operation](automate-event-consumption-rest-api-cicd.md#handle-long-running-operations) and check that it succeeded. This example provides a complete rule graph for a business event source. You can use the same event view, enabled rule, and `BusinessEventPublication` action with a documented `kqlSource-v1` source as shown next. For other supported sources, use their corresponding [source connection](consume-events-activator-rest-api.md) and map fields that the source actually returns.

### Use a KQL query as the Activator publisher source

The Reflex definition documents `kqlSource-v1` for scheduled KQL queries against an Eventhouse. To reuse the publisher graph in the preceding section, replace the Business event source entity in `$entities` with the following entity before writing `ReflexEntities.json`. Keep `$sourceId` unchanged so the existing `SourceReference` continues to point to it. Replace the Eventhouse reference, table, timestamp column, and query with values from your environment. The query must return the `orderId` field used by the existing publishing-row mapping.

```powershell
$kqlSourceEntity = @{
    uniqueIdentifier = $sourceId
    type = "kqlSource-v1"
    payload = @{
        name = "Orders KQL source"
        runSettings = @{
            executionIntervalInSeconds = 60
        }
        query = @{
            queryString = "Orders | where Timestamp > ago(5m) | project orderId"
        }
        eventhouseItem = @{
            targetUniqueIdentifier = "<eventhouse-item-reference-id>"
        }
        parentContainer = @{
            targetUniqueIdentifier = $containerId
        }
    }
}

$entities = @($entities | Where-Object { $_.uniqueIdentifier -ne $sourceId })
$entities += $kqlSourceEntity
$entities | ConvertTo-Json -Depth 30 |
    Set-Content -Path ".\ReflexEntities.json" -Encoding utf8
$activatorParts = @(
    New-FabricDefinitionPart -Path "ReflexEntities.json" `
        -DefinitionPath ".\ReflexEntities.json"
)
```

This KQL source shape is documented, but the source-to-published-event flow in this article hasn't been verified end to end. After creating the Activator, retrieve its definition, confirm the source reference and enabled rule, and separately verify that a matching query result publishes an event that a test consumer receives.

### Warehouse SQL and Real-Time Dashboard query sources

The public Activator item-definition reference doesn't document REST source-entity bindings for Warehouse SQL queries or Real-Time Dashboard tiles. The public product guidance describes creating rules from the SQL query editor with **Create rule** and from a dashboard tile with **Set alert**. It doesn't provide a REST `ReflexEntities.json` source contract for either entry point. Use the documented UI flow to author the rule, then retrieve its definition with `getDefinition` if you need to inspect or preserve the resulting entities. Don't invent a Warehouse or dashboard source type from the UI terminology.

- [Create an alert rule on a Fabric Warehouse SQL query](../real-time-intelligence/data-activator/set-alerts-warehouse-sql-query.md).
- [Create Activator alerts from a Real-Time Dashboard](../real-time-intelligence/data-activator/activator-get-data-real-time-dashboard.md).
- [Activator ingestion from Real-Time Dashboards](../real-time-intelligence/data-activator/ingestion/ingestion-realtime-dashboards.md).

For dashboard tiles, the KQL query must use the predefined `_startTime` and `_endTime` parameters. Activator copies the tile query and polls the backing Eventhouse. Later edits to the tile query don't update an existing rule. These documented UI workflows aren't evidence that you can author their definitions through the item-definition API.

### Modify an existing Activator

Use `getDefinition` only when you want to preserve and modify an existing Activator:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{activatorId}/getDefinition
Authorization: Bearer {access-token}
```

Decode the Base64 `payload` for the `ReflexEntities.json` part, add or replace the publishing action, and submit the complete modified definition through `updateDefinition`. The update operation replaces the definition; it isn't a JSON Patch operation. For the response contract, see [Get Item Definition](/rest/api/fabric/core/items/get-item-definition).

### Add the Business event action entity

Add a `businessEventAction-v1` entity to the top-level `ReflexEntities.json` array:

```json
{
  "type": "businessEventAction-v1",
  "uniqueIdentifier": "<business-event-action-id>",
  "payload": {
    "name": "Business event action",
    "schemaName": "OrderProcessed",
    "schemaVersion": "v1",
    "item": {
      "itemId": "<event-schema-set-id>",
      "workspaceId": "<event-schema-set-workspace-id>"
    },
    "parentContainer": {
      "targetUniqueIdentifier": "<activator-container-id>"
    }
  }
}
```

Use a new GUID for `uniqueIdentifier`. The `parentContainer.targetUniqueIdentifier` value must reference the Activator container entity.

### Add the publishing row to the rule

In the rule's `ActStep`, add a `BusinessEventPublication` row. The following example maps the source event's `orderId` field to the target event's required `orderId` field:

```json
{
  "kind": "BusinessEventPublication",
  "name": "BusinessEventBinding",
  "arguments": [
    {
      "name": "schemaName",
      "type": "string",
      "value": "OrderProcessed"
    },
    {
      "name": "schemaVersion",
      "type": "string",
      "value": "v1"
    },
    {
      "name": "businessEventDocumentId",
      "type": "string",
      "value": "<business-event-action-id>"
    },
    {
      "name": "data",
      "type": "array",
      "values": [
        {
          "type": "complex",
          "kind": "FabricItemParameter",
          "arguments": [
            {
              "name": "parameterName",
              "type": "string",
              "value": "orderId"
            },
            {
              "name": "parameterValue",
              "type": "complexArray",
              "values": [
                {
                  "type": "complexReference",
                  "kind": "EventFieldReference",
                  "arguments": [
                    {
                      "name": "fieldName",
                      "type": "string",
                      "value": "orderId"
                    }
                  ]
                }
              ]
            },
            {
              "name": "parameterType",
              "type": "string",
              "value": "String"
            }
          ]
        }
      ]
    }
  ]
}
```

The `businessEventDocumentId` value must exactly match the `uniqueIdentifier` of the `businessEventAction-v1` entity. Add one `FabricItemParameter` value for each target schema field that you want to populate.

The `parameterType` value must match the target schema field type. Each `parameterValue` must contain at least one value or field reference. This article documents the `EventFieldReference` expression used to copy a source event field into the published Business event.

### Update and verify an existing definition

For an existing Activator, Base64-encode the complete modified `ReflexEntities.json` content and submit it as an `InlineBase64` definition part:

Don't include `definition.format` in the update request.

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{activatorId}/updateDefinition
Authorization: Bearer {access-token}
Content-Type: application/json

{
  "definition": {
    "parts": [
      {
        "path": "ReflexEntities.json",
        "payload": "<base64-encoded-reflex-entities>",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

For the complete request and long-running-operation response contracts, see [Update Item Definition](/rest/api/fabric/core/items/update-item-definition).

Call `getDefinition` after a create or update operation to verify that:

1. The `BusinessEventPublication` row is present in the rule's `ActStep`.
1. The `businessEventAction-v1` entity is present.
1. The row's `businessEventDocumentId` matches the entity's `uniqueIdentifier`.
1. The target workspace, event schema set, event type, and schema version are correct for the destination environment.
1. An enabled `EventTrigger` connects the source event view to the `ActStep` containing the publishing row.

Item IDs and workspace IDs are environment-specific. Replace them when you deploy the Activator definition to another workspace.

Retaining the action entity and row doesn't prove that a rule ran or an event was published. Trigger the source event, then confirm the publishing rule fired and a separate test consumer received the Business event. The source templates in this article don't specify Warehouse SQL-query or Real-Time Dashboard-query bindings; don't substitute undocumented source types for them. A KQL query source also requires an exported, enabled rule and a query over actual data before it can be treated as a working publisher.

## Verify the API result

Validate each publishing API from its response:

- **Notebook:** Poll the Job Scheduler API until the job reaches `Completed`. Return the result of `notebookutils.businessEvents.publish()` through `notebookutils.notebook.exit()` so the API caller can inspect the notebook exit value.
- **User data function:** Require the function to return a success result only after `PublishEvent()` completes. Verify that the `/invoke` request returns HTTP `200` and the expected function result.
- **Activator:** Call `getDefinition` and verify the retained enabled trigger rule, `BusinessEventPublication` row, `businessEventAction-v1` entity, matching action identifier, and destination IDs. Trigger the source event and observe the rule's action and a receiving consumer.

The publishing APIs confirm that the publisher accepted or executed the request; they don't return a downstream delivery receipt. For an end-to-end API test, configure a test consumer through the [Eventstream](consume-events-with-event-stream-rest-api.md) or [Activator](consume-events-activator-rest-api.md) item-definition APIs and verify its observable output.

## Troubleshoot publishing APIs

| Symptom | Cause | Resolution |
|---|---|---|
| The API can't find the event type. | The event type isn't categorized as a Business event, the item hasn't finished indexing, or the publishing identity can't access the workspace. | Confirm that the event type definition contains `category: "BusinessEventType"`, wait for indexing, and verify workspace access. |
| Publishing returns a permission error. | The publishing or execution identity doesn't have `Publish` permission. | Add the identity to a data access role that grants `Publish` for the event type or event schema set. |
| Publishing fails schema validation. | A required property is missing, a property name or data type doesn't match, or the wrong schema version was selected. | Compare the payload with the event schema and use the correct schema version. |
| The Notebook job completes but the publish result is unclear. | The notebook didn't return the publishing result as its job exit value, or an exception was handled without failing the notebook. | Let publishing exceptions fail the notebook and return the result through `notebookutils.notebook.exit()` so the Job Scheduler API can expose it. |
| User data function creation fails with `UnsupportedArgument` or `InvalidDefinitionFormat`. | The connection uses `EventSchemaSet` instead of `EventDefinition`, or the create request specifies `definition.format: "UserDataFunctionV1"`. | Use the event schema set ID with `artifactType: "EventDefinition"` and submit the three definition parts without `definition.format`. |
| User data function creation fails with `MetadataValidationError`. | An input parameter uses an unsupported name such as `order_id`, or its metadata doesn't match the function signature. | Use `orderId` in the Python signature, metadata, and invocation body. An underscore in the function name was accepted in the tested case. |
| The user data function returns a connection error. | The event schema set connection is missing, its alias changed, or the caller can't access the connected item. | Check the `EventDefinition` binding and matching metadata/decorator alias, verify the connected item and permission, then retry. |
| Activator definition update returns `InvalidTemplateInstance`. | The action row uses an incorrect name or kind, a required parameter value is empty, or the companion action entity is missing. | Use `BusinessEventPublication` and `BusinessEventBinding`, include the `businessEventAction-v1` entity, and verify all required parameter mappings. |
| The Activator rule doesn't publish the event. | The action row and action entity identifiers don't match, the target IDs are from another environment, or the action can't publish to the target event schema set. | Match `businessEventDocumentId` to the action entity `uniqueIdentifier`, replace environment-specific IDs, and verify `Publish` permission. |

## Next steps

- [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md).
- [Create Business events and manage data access with REST APIs](create-business-events-rest-api.md).
- [Consume events with Eventstream REST APIs](consume-events-with-event-stream-rest-api.md).
- [Consume events with Activator REST APIs](consume-events-activator-rest-api.md).
- [Manage data access for Business events](business-events/manage-business-events-data-access.md).
