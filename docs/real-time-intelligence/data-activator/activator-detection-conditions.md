---
title: Detection settings in Activator
description: Understand how detection settings in Activator rules operate and learn how to configure them effectively.
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.date: 05/04/2026
ms.search.form: Data Activator Detection Settings
ai-usage: ai-assisted
---

# Detection settings in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

This article describes the range of detection settings available when you create a rule. You learn how detection settings operate in Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] and how to configure them effectively. The various detection settings work together to pinpoint the exact data that you're interested in tracking.

The examples in this article use the **Package delivery events** sample eventstream. It specifically references the **Temperature** attribute and **Too hot for medicine** rule created in the [tutorial](activator-tutorial.md).

## Detection setting options

You configure detection settings in the **Definition** pane, which appears on the right side of [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. The pane opens when you select a rule in the **Explorer** pane on the left. The detection settings in **Summarization**, **Condition**, and **Property filter** work together to define exactly which data events trigger the rule. Each setting is described in the sections that follow.

The following image shows the **Definition** pane with the detection settings for the **Temperature** attribute of the **Too hot for medicine** rule.

:::image type="content" source="media/activator-detection-conditions/data-activator-detection-pane.png" alt-text="Screenshot of Definition pane in Activator showing the detection settings of the Temperature attribute for the Too hot for medicine rule." lightbox="media/activator-detection-conditions/data-activator-detection-pane.png":::

## Summarization

A summarization converts a stream of raw events into a single computed value over a rolling time window. It's made up of an aggregation type (**Operation**), a **Window size**, and a **Step size**. Summarizations are useful when a rule should respond to a trend or pattern over time, rather than to individual events.

The **Window size** defines how far back in time each computation looks. For example, a window size of 1 hour means each summary value is computed from events in the most recent hour. The **Step size** controls how frequently the window advances and a new summary value is computed. For example, a step size of 15 minutes means a new aggregated value is produced every 15 minutes. Both values can range from 10 seconds to 24 hours.

The following table describes the available aggregation types.

| Aggregation     | Description |
| -----------     | ----------- |
| Average         | Computes the average value of the property or column over the time window. |
| Minimum         | Computes the minimum value of the property or column over the time window. |
| Maximum         | Computes the maximum value of the property or column over the time window. |
| Sum             | Computes the sum of the property or column values over the time window. |
| Total           | Computes the number of events containing the property or column over the time window. Unlike **Sum**, which adds up the values of the property, **Total** counts how many events occurred. |

## Conditions

A condition defines the pattern that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] must detect in the data to activate the rule. Conditions are grouped by data type, and each group contains condition types that describe different kinds of change or state.

The following image and table describe the condition categories available in the drop-down.

:::image type="content" source="media/activator-detection-conditions/data-activator-conditions.png" alt-text="Screenshot of the Condition section in the Definition pane showing the Condition drop-down expanded with eight collapsed categories: Numeric change, Numeric state, Text change, Text state, Logical change, Logical state, Common change, and Heartbeat.":::

| Category | Description |
| -------- | ----------- |
| **Numeric change** | Conditions that activate when a numeric value changes relative to a threshold, such as **Increases above** or **Decreases below**. Use these conditions to detect directional trends in numeric data. |
| **Numeric state** | Conditions that activate when a numeric value is in a particular state, such as **Is greater than**, **Is less than**, or **Is between**. The rule activates for each event where the condition is true. |
| **Text change** | Conditions that activate when a text value changes to or from a specific value, such as **Changes to** or **Changes from**. |
| **Text state** | Conditions that activate when a text value matches a pattern, such as **Contains**, **Begins with**, or **Ends with**. |
| **Logical change** | Conditions that activate when a boolean value changes state. **Becomes true** activates when a value changes from false to true. **Becomes false** activates when a value changes from true to false. |
| **Logical state** | Conditions that activate for each event where a boolean value matches the specified state. **Is equal to** and **Is not equal to** compare the value against true or false. |
| **Common change** | Activates when an attribute value changes. The **Changes** condition applies across data types and has no specific threshold or target value. |
| **Heartbeat** | Conditions based on event arrival. **No presence of data** activates when no new events arrive within a specified time. **Object first appearance** activates the first time a given object ID appears in the eventstream. |

For any condition that has a **Value** field, the value can either be a literal that you type in or a reference to another attribute or property on the same data. To reference another attribute, select the tag button on the right of the **Value** field or type `@`, and then pick the attribute or property from the list. Only items of a matching type appear in the list. Use a reference instead of a literal when the value you're comparing against isn't fixed — for example, when each package has its own maximum-allowed temperature.

:::image type="content" source="media/activator-detection-conditions/data-activator-condition-dynamic-reference.png" alt-text="Screenshot of the Definition pane of a rule monitoring Humidity, with the Condition section highlighted. The Value field of the Is equal to condition shows the Humidity attribute selected as the threshold, with a tag button on the right side of the field that opens an attribute picker." lightbox="media/activator-detection-conditions/data-activator-condition-dynamic-reference.png":::

### Occurrence

For some condition types, an **Occurrence** field appears that controls how long, or how many times, the condition must be true before the rule activates. For example, if you want to be alerted only when a temperature remains above 100 degrees for at least 10 minutes, set the condition to **Is greater than** 100 and set the occurrence to **When it has been true for** 10 minutes. The following table describes the available occurrence options.

| Occurrence | Description |
| ---------- | ----------- |
| Every time the condition is met | The rule activates each time the condition is true. |
| When it has been true for *n* times | The rule activates only after the condition is true the specified number of times. |
| When it has been true for | The rule activates only if the condition remains continuously true for the specified duration. |

## Property filter

The **Property filter** section creates a condition on a subset of your data, limiting which events the rule evaluates. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] supports property filters on any type of attribute - numeric, text, or boolean.

Each filter specifies an **Attribute**, an **Operation**, and a **Value**. Only events that satisfy the filter are passed to the rule condition. All other events are excluded.

:::image type="content" source="media/activator-detection-conditions/data-activator-filter.png" alt-text="Screenshot of the Property filter section in the Definition pane showing Filter 1 configured with Attribute set to Temperature (°C), Operation set to Is greater than, and Value set to 0.":::

For example, the image shows a filter on the **Temperature (°C)** attribute where **Operation** is **Is greater than** and **Value** is **0**. This filter excludes all events where Temperature is zero or below. Another example is a text filter where **Attribute** is set to **City**, **Operation** is **Is equal to**, and **Value** is **Redmond** - limiting rule evaluation to events where packages are in Redmond.

You can apply up to three filters to a single rule. When you apply multiple filters, an event must satisfy all filters for the event to be evaluated. Filters are combined with AND logic.

## Advanced settings

The **Advanced settings** section of the **Definition** pane contains timing settings that affect rule evaluation accuracy, not detection logic. The **Wait time for late-arriving events** setting controls how long Activator holds the evaluation window open to allow delayed events to arrive. To learn more, see [Latency in Activator](activator-latency.md).

## Related content

* [Create [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules in design mode](activator-create-activators.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)
* [Latency in Activator](activator-latency.md)
