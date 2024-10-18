---
title: Latency and accuracy considerations in Data Activator rules
description: An overview of Data Activator latency considerations and performance when building Data Activator rules.
author: mihart
ms.author: mihart
ms.topic: overview
ms.custom:  
ms.search.form: product-reflex
ms.date: 10/12/2024
#customer intent: As a Fabric user who is working with rules, I want to understand the factors that help to determine when actions are included and excluded from rule reporting.
---

# Latency in Activator

Activator runs rules against real-time data. Results are near instantaneous, but there are factors that can introduce latency. In most cases, that latency is imperceptible but in other cases that latency can be up to ten minutes. Receiving accurate and timely information is an important consideration when creating and receiving rules. This article reviews the processes and settings that determine the balance between inclusion of events and the structure of a rule, and how quickly an activator is sent. For example, should Activator allow for more data to arrive and be included or should Activator ensure that recipients receive their alerts at a set time? And, how does the way a rule is structured impact the speed at which an activation is sent to recipients? 

There are two important factors that impact rule activation latency: 
- the user setting for late arrival tolerance
- a delay that might be introduced by Activator’s backend processing

For example, if the rule includes an aggregation, Activator can't send an activation until the aggregation is run across the incoming event data. If the rule is a comparison to a previous set of events, it takes backend processing to retrieve the previous data, make the comparison, and compute the result. If the rule is running against ten million rows of data, processing can take up to ten minutes.  
  
## Background time concepts

To better frame the discussion, let's define some background concepts.
- _Event time_: The time when the original event happened. It is part of the event payload. For example, when a moving car on the highway approaches a toll booth and noticed by a sensor.
- _Processing time_: The time when the event reaches the processing system and is observed. For example, when a toll booth sensor sees the car and the computer system takes a few moments to process the data.
- _Arrival time_ (watermark or ingestion time): A marker that indicates when the event data reaches Activator. By the nature of streams, the incoming event data never stops, so arrival times indicate the progress made by Activator to a certain point in the stream. It's at this point that Activator can produce complete, correct, and repeatable results that don’t need to be retracted. And, it's at this point that Activator can begin processing the data. The processing can be done in a predictable and repeatable way. For example, if a recount needs to be done for some error handling condition, arrival times are safe starting and ending points.

Late arrival occurs when the rule has a time parameter and the *Event time* is within that time parameter but the *Arrival time* falls outside of that parameter. Using the toll booth example, the car is recognized by the toll booth sensor and the *Event time is within the time parameter. Activator sees that the rule has an aggregation and performs that aggregation over the data. The time it takes to perform that aggregation puts the *Arrival time* outside of the time parameter. That event is now considered *late*. If you want late arrivals to be included, set a value for the *Late arrival tolerance*. Late arrival tolerance is set in the Activator rule **Definition** screen, and applied to the event *Arrival time*. Continue reading to learn how you can set late arrival tolerance on a rule. 

For additional resources on this subject, see Tyler Akidau's blog posts [Streaming 101](https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-101) and [Streaming 102](https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-102).

##  Late arrival tolerance 

Late arrival tolerance is a user setting. Late arrival tolerance refers to how long Activator waits for an event to arrive and be acknowledged and processed. The default is two minutes. When creating a rule, decide whether to use the default tolerance or change it. Tolerance ensures that late events and events that arrive out of order have an opportunity to be included in the rule evaluation. If an event falls outside of the late arrival tolerance, Activator doesn't take it into consideration. Any events with an *Arrival time* after that tolerance aren't factored in. 



:::image type="content" source="media/data-activator-get-started/data-activator-latency-settings.png" alt-text="Screenshot of the Conditions pane scrolled to the Advanced settings options.":::


Overall, the consideration is whether it's more important to:

- wait for the late data points, or 
- run the rule on potentially incomplete data so that the rule activates sooner  

In this example, data points are measured in 15-minute increments. The first three dots, which are blue, made it in the time window. The fourth dot, which is orange, didn't. The *Event time* was within the 15-minute interval, but the event wasn't ingested by Activator within the 15-minute interval. Data Activator only evaluates the rule over data with an *Arrival time* within the 15-minute window. Unless the user indicates that they want to allow for a late arrival tolerance and wait to see if other data points arrive.  

:::image type="content" source="media/data-activator-get-started/data-activator-dot-chart.png" alt-text="Screenshot of a line chart displaying time intervals.":::

Activator can't factor in delays from the user’s data. For example, the user can have IoT sensors that are offline for 1 hour. Once they go back online, Activator can receive the data, but the data was delayed for 1 hour from that offline state, which happens outside of Data Activator. 

Here's another example.  

The user creates a rule that calculates the average temperature in minute intervals. The late arrival tolerance is set to **Default**. **Default** is two minutes. Temperature values 20 and 30 are included and the average temperature is 25. However, the late arriving event for the 40 degree temperature is not included until the next rule activation occurs.  

|------|-------|-------|
|  Event time  | Arrival time  | Temperature  |
|09:00  |09:02  |20  |
|09:01 | 09:03  | 30 |  
|09:02  |   09:07 | 40 | 

> [!NOTE]
> You currently can't override the default late arrival tolerance. This setting is also not applicable for Power BI rules. Power BI rules are evaluated any time new data arrives in Data Activator. For more information, see [Rules built on Power BI visuals](#rules-built-on-power-bi-visuals).

### Rules built on Power BI visuals 

Built-in latency differs by service. Latency for eventstreams is different than latency for Power BI visuals. There are two parts that make up latency for rules built on Power BI visuals: the frequency of querying Power BI visuals that’s built in the system, and a delay that Activator's backend might introduce. 

Activator queries Power BI for new data every hour. This means that events that meet the rule condition trigger an activation at a maximum of one hour after the event occurs. 





Late arrival tolerance contributes to latency. Rules that are created with a late arrival tolerance have a latency that is at least the amount of time that the late arrival tolerance is set to. 

The delay introduced by Data Activators backend can take around one min to process all the data. 

If an aggregation is used in the rule definition, then the rule only activates when it completes the specified time windows. For example, let’s say a rule is built to average the data over four hours. If an event that meets the rule conditions is ingested at 12 pm, the rule fires at 4 pm. The aggregation of data needed to be completed before the rule could be activated. 

## Related content
