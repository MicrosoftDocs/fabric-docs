---
title: Use a function as a Data Activator rule action
description: Learn how to define a user data function as an Activator rule action to execute custom business logic when conditions are met in Microsoft Fabric.
ms.reviewer: sumuth
ms.topic: how-to
ms.custom: freshness-kr
ms.date: 07/23/2026
ms.search.form: User data functions Activator action
ai-usage: ai-assisted
---

# Use a function as a Data Activator rule action

Configure a user data function as an action in a Fabric Activator rule. When the rule condition is met, Activator automatically invokes your function, so you can run custom Python logic in response to real-time events and streaming data.

Use this integration when you need to:

- **Run custom business logic**: Execute complex calculations, data transformations, or decision-making logic that goes beyond simple notifications.
- **Integrate with external systems**: Call external APIs, post messages to third-party services, or trigger downstream processes when conditions are met.
- **Process and analyze data**: Apply custom analysis or enrichment to data when specific thresholds or patterns are detected.

## Prerequisites

Before you begin, you need:

- A [Fabric workspace](../../get-started/create-workspaces.md) with an active capacity or trial capacity.
- A [user data functions item](./create-user-data-functions-portal.md) with at least one published function.
- An [Activator rule](../../real-time-intelligence/data-activator/activator-create-activators.md) with a configured condition.

## Define a function for use as an Activator action

To write a function that an Activator rule can trigger, use the `@udf.function()` decorator and define parameters that match the values you want to pass from the rule.

### Example function

This example function processes a temperature alert from a streaming data source:

```python
import fabric.functions as fn
import logging

udf = fn.UserDataFunctions()

@udf.function()
def process_temperature_alert(sensor_id: str, temperature: float, threshold: float) -> str:
    logging.info(f"Temperature alert triggered for sensor {sensor_id}")

    if temperature > threshold * 1.5:
        severity = "critical"
    else:
        severity = "warning"

    return f"Alert [{severity}]: Sensor {sensor_id} reported {temperature}°C (threshold: {threshold}°C)"
```

### Supported parameter types

Activator supports all parameter types that user data functions support:

| JSON type | Python data type |
|-----------|-----------------|
| String | `str` |
| Datetime string | `datetime` |
| Boolean | `bool` |
| Numbers | `int`, `float` |
| Array | `list[]` (for example, `list[int]`) |
| Object | `dict` |

For details about how Activator passes number and boolean values, see [Pass parameter values to Fabric items](../../real-time-intelligence/data-activator/activator-trigger-fabric-items.md#pass-parameter-values-to-fabric-items-preview).

## Configure the Activator rule to run a function

After you publish your function, configure an Activator rule to call it when a condition is met.

1. Open your Activator item and select an existing rule or [create a new rule](../../real-time-intelligence/data-activator/activator-create-activators.md).
1. In the rule definition pane, find the **Action** section.
1. For **Select action**, select **Run function** under the **Run Fabric Activities** section.
1. In the **Select Fabric item to run** dialog, browse or search for your user data functions item, and then select it.
1. Select the specific **Function** you want to invoke from the dropdown list.
1. For each parameter defined in your function, enter a value. You can:
    - Enter a static value directly.
    - Use properties from the data source by typing `@` or selecting the button next to the text box. For example, `@SensorId` or `@Temperature`.
1. Select **Save** to save the rule.

> [!NOTE]
> Make sure the parameter names and types in the Activator rule match exactly what you defined in your function. Mismatched names or types cause the function invocation to fail.

## Test the rule action

Before you start the rule, test it to verify that the function is invoked correctly:

1. In the rule definition pane, select **Test action**.
1. Activator invokes your function with sample data and displays the result.
1. If the test succeeds, select **Start** from the top menu bar to activate the rule.

To stop an active rule, select **Stop** from the top menu bar.

## Pass dynamic values from streaming data

Pass dynamic property values from your streaming data source directly to your function parameters. When you configure the action parameters, type `@` to see a list of available properties from your data source.

For example, if your streaming data contains fields such as `SensorId`, `Temperature`, and `Threshold`, map them directly to your function parameters:

| Function parameter | Activator value |
|-------------------|-----------------|
| `sensor_id` | `@SensorId` |
| `temperature` | `@Temperature` |
| `threshold` | `@Threshold` |

This mapping lets your function receive real-time values each time the rule condition is met.

## Considerations and best practices

- **Publish before you configure**: You must publish your function before it appears in the Activator action configuration. Draft or unpublished functions aren't available for selection.
- **Keep functions lightweight**: Activator invokes functions in response to real-time events. Design your functions to run quickly to avoid delays in downstream processing.
- **Handle errors gracefully**: Include error handling in your function code. If the function raises an unhandled exception, the Activator rule logs the failure but continues to evaluate conditions.
- **Use logging**: Add `logging.info()` or `logging.warning()` statements to your function for troubleshooting. View logs in the [function logs](./view-function-logs.md) panel.

## Next step

> [!div class="nextstepaction"]
> [Get data from Fabric events for Activator](../../real-time-intelligence/data-activator/ingestion/ingestion-fabric-events.md)

## Related content

- [Configure actions for Activator rules](../../real-time-intelligence/data-activator/rule-actions.md)
- [Trigger Fabric items from Activator](../../real-time-intelligence/data-activator/activator-trigger-fabric-items.md)
- [User data functions programming model](./python-programming-model.md)
- [Create a user data functions item](./create-user-data-functions-portal.md)
- [Test user data functions](./test-user-data-functions.md)
