---
title: NotebookUtils business event utilities for Fabric
description: Use NotebookUtils business event utilities to publish business events from Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 09/16/2026
ai-usage: ai-assisted
---

# NotebookUtils business event utilities for Fabric

Use the `notebookutils.businessEvents` module to publish business events from a Fabric notebook. You can publish a single event or a batch of events that follow a business event schema in an event schema set.

The business event utilities are available in Python 3.12 and PySpark (Python) notebooks.


The following table lists the available methods:

| Method | Signature | Description |
|---|---|---|
| `help` | `help(methodName: str = '') -> None` | Displays help for the module or the specified method. |
| `publish` | `publish(eventSchemaSetWorkspace: str, eventSchemaSet: str, eventTypeName: str, eventData: Union[Dict[str, Any], List[Dict[str, Any]]], dataVersion: str = 'v1') -> bool` | Publishes one or more business events to the specified event type. |

## Get help

Run the following command to get an overview of the module:

```python
notebookutils.businessEvents.help()
```

To get help for the `publish` method, specify the method name:

```python
notebookutils.businessEvents.help("publish")
```

## Publish a business event

Use `publish()` to send a payload that matches the schema of a business event:

```python
published = notebookutils.businessEvents.publish(
    eventSchemaSetWorkspace="ContosoWorkspace",
    eventSchemaSet="OrderEvents",
    eventTypeName="OrderDelayed",
    eventData={
        "orderId": "12345",
        "status": "delayed",
        "reason": "weather"
    },
    dataVersion="v1"
)

print(f"Published: {published}")
```

The following table describes the parameters:

| Parameter | Type | Description |
|---|---|---|
| `eventSchemaSetWorkspace` | String | The name or ID of the workspace that contains the event schema set. |
| `eventSchemaSet` | String | The name or ID of the event schema set. |
| `eventTypeName` | String | The name of the business event type to publish. |
| `eventData` | Dictionary or list of dictionaries | The event payload. Each dictionary must conform to the selected business event schema. |
| `dataVersion` | String | The version of the business event schema. The default is `v1`. |

The method returns `True` when the event publishes successfully. If the event can't be published, the method raises an exception.

## Publish multiple business events

To publish multiple events of the same type in one call, pass a list of dictionaries to `eventData`:

```python
published = notebookutils.businessEvents.publish(
    eventSchemaSetWorkspace="ContosoWorkspace",
    eventSchemaSet="OrderEvents",
    eventTypeName="OrderDelayed",
    eventData=[
        {
            "orderId": "12345",
            "status": "delayed",
            "reason": "weather"
        },
        {
            "orderId": "12346",
            "status": "delayed",
            "reason": "traffic"
        }
    ],
    dataVersion="v1"
)

print(f"Published: {published}")
```

All payloads in the list must conform to the schema version specified by `dataVersion`.

## Considerations

- Create the business event type and its schema before you publish events from a notebook.
- Use either names or IDs for `eventSchemaSetWorkspace` and `eventSchemaSet`.
- Match the property names, data types, and required fields in `eventData` to the selected schema version.
- Handle exceptions from `publish()` so that notebook and pipeline runs report publishing failures.

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
- [Use a notebook as a business events publisher](../../real-time-hub/business-events/business-events-notebook.md)
- [Tutorial: Publish business events using a notebook](../../real-time-hub/business-events/tutorial-business-events-notebook-user-data-function-activator.md)
