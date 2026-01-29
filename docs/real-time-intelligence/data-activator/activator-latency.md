---
title: Latency and accuracy considerations in Activator rules
description: An overview of Activator latency considerations and performance when building Activator rules.
ms.topic: overview
ms.custom: 
ms.search.form: product-reflex
ms.date: 10/22/2024
#customer intent: As a Fabric user who is working with rules, I want to understand the factors that help to determine when actions are included and excluded from rule reporting.
---

# Latency in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] runs rules against real-time data. Results are near instantaneous, but there are factors that can introduce latency. In most cases, that latency is imperceptible but in other cases that latency can be up to 10 minutes. Receiving accurate and timely information is an important consideration when creating and receiving rules. This article reviews the processes and settings that determine the balance between inclusion of events and the structure of a rule, and how quickly an activator is sent. For example, should [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] allow for more data to arrive and be included or should [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] ensure that recipients receive their alerts at a set time? And, how does the way a rule is structured impact the speed at which an activation is sent to recipients?

There are three important factors that impact rule activation latency:

- The user setting for late arrival tolerance.
- A delay, up to one minute, that might be introduced by [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]'s backend processing.
- Aggregations on the rule.

## Late arrival tolerance

Late arrival tolerance is set in the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule **Definition** screen, and applied to the event [Arrival time](#background-time-concepts). To learn how to set late arrival tolerance, see [Late arrival tolerance setting](#late-arrival-tolerance-setting).

## Backend processing latency

Rules might need processing before the rule activates. For example, if the rule is a comparison to a previous set of events, it takes backend processing to retrieve the previous data, make the comparison, and compute the result. Another example is if the rule is running against 10 million rows of data, latency is introduced by the backend processing of that data.

## Aggregation latency

If an aggregation is used in the rule definition, then the rule only activates when it completes the specified time windows. For example, let’s say a rule is built to average the data over four hours. If an event that meets the rule conditions is ingested at 12 pm, the rule triggers at 4 pm. The latency is a result of the aggregation settings. Even when a rule includes a simple aggregation, such as *average*, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can't send an activation until [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] runs the aggregation across the incoming event data.

## Background time concepts

To better frame the discussion, let's define some background concepts.

- _Event time_: The time when the original event happened. It's part of the event payload. For example, when a moving car on the highway approaches a toll booth and noticed by a sensor.
- _Processing time_: The time when the event reaches the processing system and is observed. For example, when a toll booth sensor sees the car and the computer system takes a few moments to process the data.
- _Arrival time_ (watermark or ingestion time): A marker that indicates when the event data reaches [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. By the nature of streams, the incoming event data never stops, so arrival times indicate the progress made by [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to a certain point in the stream. It's at this point that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can produce complete, correct, and repeatable results that don’t need to be retracted. And, it's at this point that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can begin processing the data. The processing can be done in a predictable and repeatable way. For example, if a recount needs to be done for some error handling condition, arrival times are safe starting and ending points.

Late arrival occurs when the rule has a time parameter and the *Event time* is within that time parameter but the *Arrival time* falls outside of that parameter. If we use the toll booth example again, the car is recognized by the toll booth sensor and the *Event time* is within the time parameter. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] sees that the rule has an aggregation and performs that aggregation over the data. The time it takes to perform that aggregation puts the *Arrival time* outside of the time parameter. That event is now considered *late*. If you want late arrivals to be included, set a value for the *Late arrival tolerance*.

For additional resources on this subject, see Tyler Akidau's blog posts [Streaming 101](https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-101) and [Streaming 102](https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-102).

## Late arrival tolerance setting

Late arrival tolerance is a user setting. Late arrival tolerance refers to how long [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] waits for an event to arrive and be acknowledged and processed. The default is two minutes. Late arrival tolerance contributes to latency. Rules that are created with a late arrival tolerance have a latency that is at least the amount of time that the late arrival tolerance is set to. When creating a rule, decide whether to use the default tolerance or change it. Tolerance ensures that late events and events that arrive out of order have an opportunity to be included in the rule evaluation. If an event falls outside of the late arrival tolerance, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] doesn't take it into consideration. Any events with an *Arrival time* after that tolerance aren't factored in.

:::image type="content" source="media/activator-latency/data-activator-latency-settings.png" alt-text="Screenshot of the Conditions pane scrolled to the Advanced settings options.":::

Overall, the consideration is whether it's more important to:

- Wait for the late data points, or
- run the rule on potentially incomplete data so that the rule activates sooner.  

In this example, data points are measured in 15-minute increments. The first three dots, which are blue, make it in the time window. The fourth dot, which is orange, doesn't. The *Event time* is within the 15-minute interval, but the event isn't ingested by [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] within the 15-minute interval. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] only evaluates the rule over data with an *Arrival time* within the 15-minute window. Unless the user indicates that they want to allow for a late arrival tolerance and wait to see if other data points arrive. 

:::image type="content" source="media/activator-latency/data-activator-dot-charts.png" alt-text="Screenshot of a line chart displaying time intervals.":::

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can't factor in delays from the user’s data. For example, the user can have IoT sensors that are offline for 1 hour. Once they go back online, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can receive the data, but the data was delayed for 1 hour from that offline state, which happens outside of [!INCLUDE [fabric-activator](../includes/fabric-activator.md)].

Here's another example.  

The user creates a rule that calculates the average temperature in minute intervals. The late arrival tolerance is set to **Default**. **Default** is two minutes. Temperature values 20 and 30 are included and the average temperature is 25. However, the late arriving event for the 40-degree temperature isn't included until the next rule activation occurs.  

|  Event time  | Arrival time  | Temperature  |
|------|-------|-------|
|09:00  |09:02  |20  |
|09:01 | 09:03  | 30 |  
|09:02  |   09:07 | 40 |

> [!IMPORTANT]
> You currently can't override the default late arrival tolerance. This setting is also not applicable for Power BI rules.

### Rules built on Power BI visuals

Built-in latency differs by service. Latency for eventstreams is different than latency for Power BI visuals. There are two parts that make up latency for rules built on Power BI visuals: the frequency of querying Power BI visuals that’s built in the system, and a delay that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]'s backend might introduce.

Power BI rules are evaluated any time new data arrives in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] ingests new data from Power BI every hour. This means that events that meet the rule condition trigger an activation at a maximum of one hour after the event occurs. For more information, see [Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from Power BI](activator-get-data-power-bi.md).
