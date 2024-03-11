---
title: Detection conditions in Data Activator
description: Understand how detection conditions in triggers and properties operate in Data Activator.
author: davidiseminger
ms.author: davidi
ms.topic: concept
ms.custom: 
ms.date: 11/16/2023
---

# Detection conditions in Data Activator

> [!IMPORTANT]
> Data Activator is currently in preview.

This article describes the range of detection conditions available to you when you create a trigger.

## Summaries over time

Summaries are available in **select** cards in properties and triggers, using the “Add” button. 

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-01.png" alt-text="Screenshot of adding data activator summary.":::


When you create a summary, you specify a **time window** which can be between 1 minute and 24 hours long. A summary takes all of the values of the property/column during each time window and converts them into a single summary value for the time window.


|Summary type  |Description  |
|---------|---------|
|Average over time      |Computes the average value of the property/column over the time window|
|Count     |Computes the number of events containing the property/column over the time window|
|Minimum/Maximum over time     |Computes the minimum/maximum value of the property/column during the time window|


## Filters

Filters are available in **select** and **detect** cards using the **Add** button. In a filter, you specify a comparison condition on a property. The filter retains only those events that meet the comparison condition. All other events are removed from consideration for the trigger.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-02.png" alt-text="Screenshot of using a data activator filter.":::

You can use filters on any type of property, but typically you'll use filters with text values, so that you can create a condition on a subset of your data. For example, you might set a filter of “City=’Redmond’” on some package-tracking events, to set a condition on only events on packages in Redmond.

You can specify up to three filters on a card.

## Conditions

You specify a condition in the **detect** card.

### Condition types

The condition type specifies what type of condition should cause the trigger to activate:

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-03.png" alt-text="Screenshot of using data activator condition types.":::

Condition types fall into the following categories:


|Condition type  |Description  |
|---------|---------|
|**Is** conditions     |**Is** conditions activate for each event for which the condition is true. |
|**Becomes** conditions     |**Becomes** conditions activate only when the condition becomes true, after having previously been false. For example, “Becomes greater than 10” will activate if the value of the property changes from a value of 5 (less than 10) to a value of 11 (greater than 10). It will only activate again when the condition goes from being false to true. |
|**Enters/Exits Range** conditions     |The Enters range condition specifies a range of values, and activates at the point when a property value enters the range. It only activates when the previous value of the property was outside of the range, and the current value is within the range. <p>The exits range condition is similar, except that it activates when the property value goes outside of the range. |
|**Changes, Changes to, Changes from**     |These conditions activate when a condition changes, changes to, or changes from condition activation boundaries.   |



### Condition timers

After you specify a condition type, you can specify a condition timer.

:::image type="content" source="media/data-activator-detection-conditions/data-activator-detection-conditions-04.png" alt-text="Screenshot of using data activator condition timers.":::


The condition timer indicates how long, or how many times, the condition must be true before the trigger fires.



|Timer  |Description  |
|---------|---------|
|Each time |Activate the trigger each time the condition is true |
|Number of times |Count how many times the condition is true, and activate the trigger only when it has been true this many times |
|Stays |Activate the trigger if the condition is continuously true for this amount of time |




## Related content

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md)
* [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
