---
title: Latency and accuracy considerations in Activator rules
description: An overview of Activator latency considerations and performance when building Activator rules.
ms.topic: concept-article
ms.search.form: product-reflex
ms.date: 04/30/2026
#customer intent: As a Fabric user who is working with rules, I want to understand the factors that help to determine when actions are included and excluded from rule reporting.
---

# Latency in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]

Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] runs rules against real-time data. Results are near instantaneous, but various factors can introduce latency. In most cases, you don't notice this latency, but in some cases, it can be up to 10 minutes. Receiving accurate and timely information is an important consideration when creating and receiving rules. This article reviews the processes and settings that determine the balance between inclusion of events and rule structure, and how quickly Activator sends an activation. For example, should [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] allow more data to arrive and be included, or should [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] ensure that recipients receive their alerts at a set time? And, how does rule structure affect the speed at which Activator sends an activation to recipients?

Three important factors impact rule activation latency:

- Late arrival tolerance.
- Backend processing latency.
- Aggregation latency.

## Late arrival tolerance

In streaming data, events don't always arrive in order or on time. An event's *event time* (when it happened) might fall within a rule's time window, but its *arrival time* (when Activator received it) might fall outside that window - making the event late. By default, Activator drops late events from rule evaluation.

The **Wait time for late-arriving events** setting controls how long Activator waits before closing the evaluation window, giving late events a chance to arrive. This setting is in the **Advanced settings** section of the rule **Definition** screen. To learn how to configure it, see [Late arrival tolerance setting](#late-arrival-tolerance-setting).

## Backend processing latency

Activator might need to process a rule before it activates, which can introduce a delay of up to one minute. For example, if the rule compares against a previous set of events, Activator retrieves the previous data, makes the comparison, and computes the result. As another example, if the rule runs against 10 million rows of data, Activator's processing of that volume also introduces latency.

## Aggregation latency

If an aggregation is used in the rule definition, then the rule only activates when it completes the specified time windows. For example, let's say a rule is built to average the data over four hours. If an event that meets the rule conditions is ingested at 12 PM, the rule triggers at 4 PM. The latency is the result of the aggregation settings. Even when a rule includes a simple aggregation, such as *average*, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can't send an activation until [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] runs the aggregation across the incoming event data.

## Background time concepts

To better frame the discussion, let's define some background time concepts.

- *Event time*: The time when the original event happened. It's part of the event payload. For example, the moment that a sensor detects a car approaching a toll booth is the event time.
- *Processing time*: The time at which the processing system receives and observes the event. For example, after the toll booth sensor sees the car, the time at which the computer system receives and processes the sensor's information is the processing time.
- *Arrival time* (watermark or ingestion time): A marker that indicates when the event data reaches [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. By the nature of streams, the incoming event data never stops, so arrival times indicate the progress made by [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to a certain point in the stream. It's at this point that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can produce complete, correct, and repeatable results that don’t need to be retracted. And, it's at this point that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can begin processing the data. Activator processes data in a predictable and repeatable way. For example, if Activator needs to recount data for error handling, it can use arrival times as safe starting and ending points. For example, once the toll booth system has received all car detections up to 9:05 AM, the arrival time marker advances to 9:05 AM. Any detections that arrive after that point — even if their *Event time* was before 9:05 AM — are late.

Late arrival occurs when a rule has a time parameter and the *Event time* is within that time parameter, but the *Arrival time* falls outside of it. Using the toll booth example: the sensor detects the car and the *Event time* is within the rule's time window. However, if the sensor takes too long to transmit the detection — for example, due to network congestion — the event arrives at Activator after the window closes. Activator considers that event *late*. If you want late arrivals to be included, set the **Wait time for late-arriving events** in **Advanced settings**.

For additional resources on this subject, see Tyler Akidau's blog posts [Streaming 101](https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-101) and [Streaming 102](https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-102).

## Late arrival tolerance setting

You can configure the late arrival tolerance setting. The default value is two minutes. This setting contributes to latency. Rules you create with a wait time have a minimum latency equal to the configured duration. When creating a rule, decide whether to use the default or change it. The setting ensures that late events and out-of-order events have an opportunity to be included in rule evaluation. If an event falls outside the configured late arrival tolerance, Activator doesn't take it into consideration. Any events with an *Arrival time* after that threshold aren't factored in.

:::image type="content" source="media/activator-latency/data-activator-latency-settings.png" alt-text="Screenshot of the rule Definition screen with Advanced settings expanded, showing the Wait time for late-arriving events setting.":::

Overall, consider whether it's more important to:

- Wait for the late data points, or
- Run the rule on potentially incomplete data so that the rule activates sooner.  

In this example, data points are measured in 15-minute increments. The first three dots, which are blue, make it in the time window. The fourth dot, which is orange, doesn't. The *Event time* is within the 15-minute interval, but the event isn't ingested by [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] within the 15-minute interval. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] only evaluates the rule over data with an *Arrival time* within the 15-minute window. Unless you increase the late arrival tolerance, data points that arrive after the window closes aren't included.

:::image type="content" source="media/activator-latency/data-activator-dot-charts.png" alt-text="Screenshot of a line chart displaying time intervals.":::

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can't factor in delays from your data sources. For example, you might have IoT sensors that are offline for one hour. Once they go back online, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can receive the data, but the data was delayed for one hour from that offline state, which happens outside of [!INCLUDE [fabric-activator](../includes/fabric-activator.md)].

Here's another example.  

You create a rule that calculates the average temperature in minute intervals. The **Wait time for late-arriving events** is set to the default of two minutes. Activator includes temperature values 20 and 30, and calculates an average of 25. However, Activator doesn't include the late-arriving 40-degree event until the next rule activation.

|  Event time | Arrival time | Temperature |
| ----------- | ------------ | ----------- |
| 09:00       | 09:02        | 20          |
| 09:01       | 09:03        | 30          |  
| 09:02       | 09:07        | 40          |

> [!NOTE]
> For query data sources such as Power BI, KQL Querysets, and Real-Time Dashboards, the query frequency also affects how quickly Activator detects new events. See [Query frequency for query data sources](activator-query-frequency.md).

## Rules built on Power BI visuals

Built-in latency differs by service. Latency for eventstreams is different from latency for Power BI visuals. Two factors affect latency for rules built on Power BI visuals: the frequency of querying Power BI visuals that are built in the system, and a delay that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]'s backend might introduce.

Power BI rules are evaluated any time new data arrives in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. By default, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] queries Power BI once per hour, which means events that meet the rule condition trigger an activation at a maximum of one hour after the event occurs. You can change this frequency in the data source settings. For more information, see [Query frequency for query data sources](activator-query-frequency.md) and [Create Power BI alerts and refine them in Fabric Activator](activator-get-data-power-bi.md).
