---
title: Detection conditions in Data Activator
description: Understand how detection conditions in triggers and properties operate in Data Activator and learn how to configure them effectively.
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.date: 09/15/2024
---

# Detection conditions in Data Activator

This article describes the range of detection conditions available to you when you create a trigger. You learn how detection conditions in triggers and properties operate in Data Activator and how to configure them effectively.

> [!IMPORTANT]
> Data Activator is currently in preview.

## Summaries over time

Summaries are available in the **Monitor **section cards in **Properties **and **Rules**.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-01.png" alt-text="Screenshot of adding Data Activator summary.":::

When you create a summary, you specify a **time window** which can be between 1 minute and 24 hours long. A summary takes all of the values of the property or column during each time window and converts them into a single summary value for the time window.

|Summary type  |Description  |
|---------|---------|
|Average over time      |Computes the average value of the property or column over the time window|
|Count     |Computes the number of events containing the property or column over the time window|
|Minimum/Maximum over time     |Computes the minimum/maximum value of the property or column during the time window|

## Filters

Filters are available in the **Monitor **section. In a filter, you specify a comparison condition on a property. The filter retains only those events that meet the comparison condition. All other events are removed from consideration for the rule.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-02.png" alt-text="Screenshot of using a data activator filter.":::

You can use filters on any type of property. However, you typically use filters with text values, so that you can create a condition on a subset of your data. For example, you might set a filter of “City=’Redmond’” on some package-tracking events, to set a condition on only events on packages in Redmond.

You can specify up to three filters.

## Conditions

You specify a condition in the **Condition** and **Section**.

### Condition types

The condition type specifies what type of condition causes the rule to activate.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-03.png" alt-text="Screenshot of using data activator condition types.":::

Condition types fall into the following categories:

|Condition type  |Description  |
|---------|---------|
|**Is** conditions     |**Is** conditions activate for each event where the condition is true. |
|**Becomes** conditions     |**Becomes** conditions activate only when the condition becomes true, after being false.  example, "Becomes greater than 10" activates when the value of the property changes from a value of five (less than 10) to a value of 11 (greater than 10). It only activates when the condition goes from being false to true. |
|**Enters, Exits Range** conditions     |The Enters range condition activates when a property value enters a defined value range. It only activates when the previous value of the property was outside of the range, and the current value is within the range. The exits range condition is similar, except that it activates when the property value goes outside of the range. |
|**Changes, Changes to, Changes from**     |These conditions activate when a condition changes, changes to, or changes from specified boundaries.   |

### Occurrence options

After you specify a condition type, you specify an occurrence.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-04.png" alt-text="Screenshot of using data activator condition timers.":::

The occurrence indicates how long, or how many times, the condition must be true before the rule activates.

|Timer  |Description  |
|---------|---------|
|Each time |Activate the rule each time the condition is true. |
|Number of times |Count how many times the condition is true, and activate the rule only when it becomes true the specified number of times. |
|Stays |Activate the rule if the condition is continuously true for the specified amount of time. |

## Related content

* [Get started with Data Activator](data-activator-get-started.md)
* [Create Data Activator rules in design mode](data-activator-create-triggers-design-mode.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
