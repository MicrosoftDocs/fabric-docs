---
title: Detection conditions in Activator
description: Understand how detection settings in Activator rules operate and learn how to configure them effectively.
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.date: 11/25/2024
ms.search.form: Data Activator Detection Condition
---

# Detection settings in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

This article describes the range of detection settings available to you when you create a rule. You learn how detection settings operate in Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] and how to configure them effectively. The various detection settings work together to pinpoint the exact data that you're interested in tracking. 

Our example uses the **Package delivery events** sample eventstream. From this eventstream, we already created an object named **Temperature** and a rule **Too hot for medicine**.

## Detection setting options

Detection settings are managed in the **Definition** pane which opens on the right side of [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. Select a rule from the **Explorer** or select **New rule** to open the **Definition** pane. Here you set the detection settings using **Summarization**, **Filter**, and **Condition**.

:::image type="content" source="media/activator-detection-conditions/data-activator-pane.png" alt-text="Screenshot of opening Definition pane in activator."lightbox="media/activator-detection-conditions/data-activator-pane.png":::

**Summarization**

A summarization is made up of an aggregation (average, minimum, sum, etc.), window size, and step size for the attribute used in the rule. In this example, we use the **Temperature** object as our attribute. The **Temperature** object comes from our *Package delivery events* stream.

If the **Summarization** section isn't shown in your **Definition** pane, select **Add summarization** to open it.

When you create a summarization, you specify a time window for your rule. The time window ranges from 10 seconds to 24 hours. A summarization takes all of the values of the rule properties during each time window and converts them into a single summary value for the time window. In this example, our rule summarization is the **Average** aggregation for the attribute **Temperature**. 

:::image type="content" source="media/activator-detection-conditions/data-activator-summarizations.png" alt-text="Screenshot showing the Monitor section of the Definition pane with the Temperature attribute selected.":::

The summarization also includes a step size. The step size ranges from 10 seconds to 24 hours. 

|Summary type  |Description  |
|---------|---------|
|Average over time      |Computes the average value of the property or column over the time window.|
|Count     |Computes the number of events containing the property or column over the time window.|
|Minimum/Maximum over time     |Computes the minimum/maximum value of the property or column during the time window.|
Total  | Computes the total value of the property or column during that time window. 

## Filters

The **Definition** pane has a button for **Add filter** and a section called **Property filter**. Here we're covering the **Add filter** button. 

In a filter, you specify a comparison operation for the selected attribute. The filter retains only those events that meet the comparison condition. All other events are removed from consideration for the rule.

:::image type="content" source="media/activator-detection-conditions/data-activator-filter.png" alt-text="Screenshot of using an activator filter.":::

Use filters on any type of attribute. The filters create a condition on a subset of your data. For example, you might set a filter of “City=Redmond” on some package-tracking events, to set a condition on only events on packages in Redmond. You can also set a filter on numerical data. In our example, we filtered for temperatures greater than 60. Any events that don't fit the filter conditions aren't included.

You can specify up to three filters.

## Conditions

The third detection setting is **Condition**. Use **Condition** to tell [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] when to activate the rule.

:::image type="content" source="media/activator-detection-conditions/data-activator-conditions.png" alt-text="Screenshot of using activator condition types.":::

Condition types fall into the following categories:

|Condition type  |Description  |
|---------|---------|
|**Is** conditions     |**Is** conditions activate for each event where the condition is true. |
|**Becomes** conditions     |**Becomes** conditions activate only when the condition becomes true, after being false. For example, "Becomes greater than 10" activates when the value of the property changes from a value of five (less than 10) to a value of 11 (greater than 10). It only activates when the condition goes from being false to true. |
|**Enters, Exits Range** conditions     |The Enters range condition activates when a property value enters a defined value range. It only activates when the previous value of the property was outside of the range, and the current value is within the range. The exits range condition is similar, except that it activates when the property value goes outside of the range. |
|**Changes, Changes to, Changes from**     |These conditions activate when a condition changes, changes to, or changes from specified boundaries.   |
Text states such as **Contains**, **Ends**, **Begins**  | These conditions activate when text meets the selected condition. 
|**Heartbeat** conditions | "No presence of data" conditions activate when data doesn't arrive in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. Time elapsed is the time that you want the rule to monitor if new data doesn't arrive. "Object first appearance" conditions activate the first time a given object ID appears in the event stream.

After you specify a condition type, you specify an occurrence.

The occurrence indicates how long, or how many times, the condition must be true before the rule activates.

|Timer  |Description  |
|---------|---------|
|Every time |Activate the rule each time the condition is true. |
|Number of times |Count how many times the condition is true, and activate the rule only when it becomes true the specified number of times. |
|Stays |Activate the rule if the condition is continuously true for the specified amount of time. |

## Advanced settings

To learn about the advanced settings, see [Latency in Activator](activator-latency.md).

## Related content

* [Create [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules in design mode](activator-create-activators.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
