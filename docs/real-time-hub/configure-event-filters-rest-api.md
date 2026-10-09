---
title: Filter events with REST API definitions
description: Learn how to configure event type and advanced filters for Eventstream and Activator REST API definitions.
ms.reviewer: george-guirguis
ms.topic: how-to
ms.date: 10/05/2026
ai-usage: ai-assisted
---

# Filter events with REST API definitions

Apply event type and advanced filters when you consume events through Eventstream or Activator. Complete the source definition first:

- [Consume events with Eventstream REST APIs](consume-events-with-event-stream-rest-api.md).
- [Consume events with Activator REST APIs](consume-events-activator-rest-api.md).

Eventstream and Activator use the same filter object structure for most operators. The location of the filter configuration and support for some operators differ between the two item definitions.

## Eventstream filter placement

When Eventstream is the event consumer, configure event types and filters in the event source node's `properties` object:

```json
{
  "name": "FabricJobEventsSource",
  "type": "FabricJobEvents",
  "properties": {
    "eventScope": "Item",
    "workspaceId": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "itemId": "cccccccc-2222-3333-4444-dddddddddddd",
    "includedEventTypes": [
      "Microsoft.Fabric.JobEvents.ItemJobFailed"
    ],
    "filters": [
      {
        "operatorType": "StringIn",
        "key": "data.jobType",
        "values": [
          "Pipeline"
        ]
      }
    ]
  }
}
```

For Fabric event sources that support advanced filters, `includedEventTypes` and `filters` are members of the source node's `properties` object. Keep them in the location defined by the selected Eventstream source type's schema.

## Activator filter placement

For Activator, configure event types and filters in the `realTimeHubSource-v1` entity's `payload.filterSettings` object:

```json
{
  "filterSettings": {
    "eventTypes": [
      {
        "name": "Microsoft.Storage.BlobCreated"
      }
    ],
    "filters": [
      {
        "operatorType": "StringBeginsWith",
        "key": "subject",
        "values": [
          "/blobServices/default/containers/orders/"
        ]
      }
    ]
  }
}
```

> [!IMPORTANT]
> Activator doesn't support changing filters on an existing Real-Time hub source identifier. To change the filters through `updateDefinition`, assign a new `uniqueIdentifier` to the `realTimeHubSource-v1` entity and update every downstream `SourceReference` that targets the source. Otherwise, the update fails with a message that directs you to create a new source.

For Eventstream, use `includedEventTypes` to select event types. For Activator, use `filterSettings.eventTypes`. In both consumers, use `filters` to compare CloudEvents fields or event data fields. An event must match a selected event type and every entry in `filters`.

## Event type filtering

In an Activator definition, each object in `filterSettings.eventTypes` has a `name` property that contains a fully qualified event type. In an Eventstream definition, `includedEventTypes` is an array of fully qualified event type strings. Combine multiple event types with **OR**.

For example, an Activator event matches the following configuration when its type is either `Microsoft.Storage.BlobCreated` or `Microsoft.Storage.BlobDeleted`:

```json
{
  "eventTypes": [
    {
      "name": "Microsoft.Storage.BlobCreated"
    },
    {
      "name": "Microsoft.Storage.BlobDeleted"
    }
  ]
}
```

Business event sources in Activator identify their event types in `connection.eventTypeFullyQualifiedIds` instead of `filterSettings.eventTypes`.

## Filter properties

Each entry in `filters` uses these properties:

| Property | Required | Description |
|---|---|---|
| `operatorType` | Yes | Specifies the comparison to perform. Operator names are case-sensitive. |
| `key` | Yes | Specifies the CloudEvents field or event data field to evaluate. |
| `value` | For single-value operators | Specifies one number or Boolean value. |
| `values` | For multivalue and range operators | Specifies an array of strings, numbers, or numeric ranges. |

Don't include `value` or `values` for `IsNullOrUndefined` and `IsNotNull`.

## Filter keys

Fabric events use the CloudEvents schema. You can filter on CloudEvents context attributes such as `id`, `source`, `type`, `subject`, `time`, `dataschema`, and extension attributes. To access a field in the event payload, start the key with `data.` and use dot notation for nested objects. For example:

- `data.url` accesses the `url` field in `data`.
- `data.appEventTypeDetail.action` accesses the nested `action` field.
- `subject` accesses the CloudEvents subject.

Keys can resolve to a number, Boolean, string, or an array of one of those primitive types. Arrays of objects aren't supported. If an array contains values whose types don't match the filter value's type, those values are ignored.

> [!IMPORTANT]
> A dot in a key is interpreted as a path separator. You can't escape a literal dot that's part of a property name.

## Filter values

The property that contains the comparison value depends on the operator:

- Use `value` for an operator that accepts one number or Boolean: `NumberLessThan`, `NumberGreaterThan`, `NumberLessThanOrEquals`, `NumberGreaterThanOrEquals`, and `BoolEquals`.
- Use `values` for an operator that accepts one or more alternatives: `NumberIn`, `NumberNotIn`, and all string operators.
- For `NumberInRange` and `NumberNotInRange`, use `values` as an array of two-element arrays. Each nested array contains the inclusive lower and upper bounds of one range.
- Don't specify a value property for `IsNullOrUndefined` or `IsNotNull`.

When `values` contains multiple entries, the entries are combined with **OR**. For example, `StringIn` matches if the key equals any string in `values`. Separate filter objects are combined with **AND**, so an event must satisfy every filter object.

The following filter matches when `data.region` is either `westus` or `eastus`:

```json
{
  "operatorType": "StringIn",
  "key": "data.region",
  "values": [
    "westus",
    "eastus"
  ]
}
```

The following two filters match only when the subject begins with the specified container path **and** `data.contentLength` is greater than 1,024:

```json
[
  {
    "operatorType": "StringBeginsWith",
    "key": "subject",
    "values": [
      "/blobServices/default/containers/orders/"
    ]
  },
  {
    "operatorType": "NumberGreaterThan",
    "key": "data.contentLength",
    "value": 1024
  }
]
```

## Number operators

| `operatorType` | Value property | Match behavior |
|---|---|---|
| `NumberIn` | `values`: number array | Matches when the key equals any number in `values`. |
| `NumberNotIn` | `values`: number array | Matches when the key doesn't equal any number in `values`. |
| `NumberLessThan` | `value`: number | Matches when the key is less than `value`. |
| `NumberGreaterThan` | `value`: number | Matches when the key is greater than `value`. |
| `NumberLessThanOrEquals` | `value`: number | Matches when the key is less than or equal to `value`. |
| `NumberGreaterThanOrEquals` | `value`: number | Matches when the key is greater than or equal to `value`. |
| `NumberInRange` | `values`: array of number pairs | Matches when the key is within at least one inclusive range. |
| `NumberNotInRange` | `values`: array of number pairs | Matches when the key is outside every inclusive range. |

For example, the following filter matches `data.counter` when its value is `1` or `5`:

```json
{
  "operatorType": "NumberIn",
  "key": "data.counter",
  "values": [
    1,
    5
  ]
}
```

The following filter matches a value greater than or equal to `30`:

```json
{
  "operatorType": "NumberGreaterThanOrEquals",
  "key": "data.counter",
  "value": 30
}
```

The following filter matches a value in either the inclusive range 3.14159 through 999.95 or the inclusive range 3,000 through 4,000:

```json
{
  "operatorType": "NumberInRange",
  "key": "data.measurement",
  "values": [
    [
      3.14159,
      999.95
    ],
    [
      3000,
      4000
    ]
  ]
}
```

> [!IMPORTANT]
> Eventstream supports `NumberInRange` and `NumberNotInRange` in item definitions. Activator currently rejects both range operators when you apply a definition through the REST API. For an inclusive Activator range, use `NumberGreaterThanOrEquals` and `NumberLessThanOrEquals` as two filters on the same key:
>
> ```json
> [
>   {
>     "operatorType": "NumberGreaterThanOrEquals",
>     "key": "data.measurement",
>     "value": 3.14159
>   },
>   {
>     "operatorType": "NumberLessThanOrEquals",
>     "key": "data.measurement",
>     "value": 999.95
>   }
> ]
> ```
>
> Separate filters use **AND**, so this replacement represents one inclusive `NumberInRange` interval. There's no equivalent pair of advanced filters for `NumberNotInRange` because its lower-than and greater-than conditions require **OR**.

When the key is an array of numbers, a positive number operator matches if any compatible array element satisfies the comparison. A negative operator fails when any compatible element equals an excluded value or falls within an excluded range.

## Boolean operator

`BoolEquals` uses a Boolean `value` and matches when the key equals that value:

```json
{
  "operatorType": "BoolEquals",
  "key": "data.isEnabled",
  "value": true
}
```

When the key is a Boolean array, the filter matches if any element equals `value`.

## String operators

String comparisons are case-insensitive.

| `operatorType` | Match behavior |
|---|---|
| `StringContains` | Matches when the key contains any string in `values` as a substring. |
| `StringNotContains` | Matches when the key contains none of the strings in `values`. |
| `StringBeginsWith` | Matches when the key begins with any string in `values`. |
| `StringNotBeginsWith` | Matches when the key begins with none of the strings in `values`. |
| `StringEndsWith` | Matches when the key ends with any string in `values`. |
| `StringNotEndsWith` | Matches when the key ends with none of the strings in `values`. |
| `StringIn` | Matches when the complete key value equals any string in `values`. |
| `StringNotIn` | Matches when the complete key value equals none of the strings in `values`. |

All string operators use a string array in `values`. The following filter matches a URL that contains either `/priority/` or `/expedited/`:

```json
{
  "operatorType": "StringContains",
  "key": "data.url",
  "values": [
    "/priority/",
    "/expedited/"
  ]
}
```

The following filter matches Blob Storage event subjects for blobs in the `orders` container:

```json
{
  "operatorType": "StringBeginsWith",
  "key": "subject",
  "values": [
    "/blobServices/default/containers/orders/blobs/"
  ]
}
```

The following filter matches image file names:

```json
{
  "operatorType": "StringEndsWith",
  "key": "subject",
  "values": [
    ".jpg",
    ".jpeg",
    ".png"
  ]
}
```

When the key is an array of strings, a positive string operator matches if any compatible array element satisfies the comparison against any entry in `values`. A negative string operator fails when any compatible element satisfies an excluded comparison.

## Null operators

`IsNullOrUndefined` matches when the key is absent or its value is `null`:

```json
{
  "operatorType": "IsNullOrUndefined",
  "key": "data.optionalValue"
}
```

`IsNotNull` matches when the key exists and its value isn't `null`:

```json
{
  "operatorType": "IsNotNull",
  "key": "data.requiredValue"
}
```

## Missing keys

If the event doesn't contain the key, these operators don't match:

- `NumberGreaterThan`
- `NumberGreaterThanOrEquals`
- `NumberLessThan`
- `NumberLessThanOrEquals`
- `NumberIn`
- `BoolEquals`
- `StringContains`
- `StringNotContains`
- `StringBeginsWith`
- `StringNotBeginsWith`
- `StringEndsWith`
- `StringNotEndsWith`
- `StringIn`

If the event doesn't contain the key, `NumberNotIn` and `StringNotIn` match. Use `IsNullOrUndefined` or `IsNotNull` when the presence of the key is part of the intended condition.

## Filter limits and validation

Filter configurations have these limits and validation rules:

- A source supports up to 25 filter objects.
- All filter objects can contain up to 25 comparison values in total.
- Each string comparison value can contain up to 512 characters.
- The same key can appear in more than one filter. Because separate filters use **AND**, all filters on that key must match.
- `operatorType` must be one of the documented values and must use the corresponding `value`, `values`, or no-value shape.
- The key's runtime type must be compatible with the operator and filter values. Incompatible values don't satisfy the filter.
- Arrays can contain strings, numbers, or Booleans, but arrays of objects aren't supported.
- Numeric range bounds are inclusive and each range must contain a lower and upper number.

The APIs enforce these rules at different stages. Activator rejects filter and value counts that exceed the limits during `updateDefinition`. Eventstream can accept the definition and then fail the asynchronous source update. A successful item-definition response also doesn't guarantee that every malformed filter property was deployed. The Eventstream runtime might normalize numeric values, omit an invalid property, or report a source error.

After an Eventstream update, retrieve its topology and inspect the source's `status`, `properties.filters`, and `error` properties:

```powershell
$uri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/eventstreams/$eventstreamId/topology"
$topology = Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
$source = $topology.sources | Where-Object name -eq $sourceName

$source.status
$source.properties.filters
$source.error
```

Wait while `status` is `Updating`. Don't submit another source update until the source leaves that state. Confirm that the deployed filters contain the documented property shape. Numeric values might be returned as floating-point values, such as `5.0` instead of `5`.

For Activator, retrieve and decode `ReflexEntities.json` after `updateDefinition` and check the retained filter settings, connected event view, and **enabled rule**. A source that retains filters without a trigger rule can't verify filtered action execution.

Definition persistence and a `Running` source don't prove that the filter matched an event or that an action executed. To validate matching behavior, choose a field and type that exist in the selected event's documented payload, generate one uniquely identifiable matching event and one nonmatching event, and inspect the destination records or triggered rule action. Don't use an undocumented Boolean field on a Workspace item event as evidence that `BoolEquals` matches. For a negative or absent-key operator, confirm the emitted event's actual fields before interpreting the result.

For the full entity schema, supported source entities, events, objects, attributes, rules, and actions, see [Reflex item definition](/rest/api/fabric/articles/item-management/definitions/reflex-definition).

## Related content

- [Azure, Fabric, and Business events REST APIs and CI/CD overview](automate-event-consumption-rest-api-cicd.md).
- [Consume events with Eventstream REST APIs](consume-events-with-event-stream-rest-api.md).
- [Consume events with Activator REST APIs](consume-events-activator-rest-api.md).
- [Paused event configurations](fabric-events-paused-state.md).
- [Eventstream item definition](/rest/api/fabric/articles/item-management/definitions/eventstream-definition).
- [Reflex item definition](/rest/api/fabric/articles/item-management/definitions/reflex-definition).
