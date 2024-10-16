---
title: ncy and accuracy considerations in Data Activator rules
description: An overview of Data Activator ncy considerations and performance when building Data Activator rules.
author: mihart
ms.author: mihart
ms.topic: overview
ms.custom:  
ms.search.form: product-reflex
ms.date: 10/12/2024
#customer intent: As a Fabric user who is working with rules, I want to understand the factors that help to determine when actions are included and excluded from rule reporting.
---

# What is ncy in Data Activator

Receiving accurate and timely information is an important consideration when creating rules. Data Activator uses algorithms to adjust the tradeoff between the amount of data included and the speed of delivery. This article reviews the algorithms and settings that determine the balance between inclusion and speed. Should Data Activator allow for more data to arrive and be included or should Data Activator ensure that recipients receive their alerts on time.  

##  arrival tolerance 

 arrival tolerance refers to how long Data Activator waits for an event to arrive and be acknowledged. Tolerance ensures that late events and events that arrive out of order have an opportunity to be included in the rule evaluation. If a data point falls outside of the late arrival tolerance, Data Activator doesn't take it into consideration. Any events that arrive after that tolerance aren't factored in. 

Overall, the consideration is whether it's more important to:

- wait for the late data points, or 
- run the rule on potentially incomplete data so that the rule activates sooner  

In this example, data points are measured in 15-minute increments. The first three dots, which are blue, made it in the time window. The fourth dot, which is orange, didn't. Data Activator only evaluates the rule over data that arrives and is ingested within the 15-minute window. Unless the user indicates that they want to allow for a late arrival tolerance and wait to see if other data points arrive.  

:::image type="content" source="media/data-activator-get-started/data-activator-dot-chart.png" alt-text="Screenshot of a line chart displaying time intervals.":::

Data Activator can't factor in delays from the user’s data. For example, the user can have IoT sensors that are offline for 1 hour. Once they go back online, Data Activator can receive the data, but the data was delayed for 1 hour from that offline state, which happens outside of Data Activator. 

Here's another example.  

The user creates a rule that calculates the average temperature in minute intervals. The **Wait time for late arriving events** is set to **Default**. Temperature values 20 and 30 are included and the average temperature is 25. However, if the late arrival tolerance is set to 2 minutes or more, the value 40 is also included, and the average temperature is 30.  

|------|-------|-------|
|  Signal timestamp  | Ingestion timestamp  | Temp  |
|09:00  |09:02  |20  |
|09:01 | 09:03  | 30 |  
|09:02  |   09:07 | 40 | 

> [!NOTE]
> You currently can't override the default late arrival tolerance. This setting is also not applicable for Power BI rules. Power BI rules are evaluated any time new data arrives in Data Activator. 

## Data Activator built-in latency

Depending on the source a rule is built on, there are some considerations you may want to take into account to account for latency on receiving alerts from rules. The delay introduced by Data Activator's backend can take up to 10 min to process all the data. 

### Rules built on Power BI visuals 

There are two parts that make up latency for rules built on Power BI visuals: the frequency of querying Power BI visuals that’s built in the system, and a delay that the Data Activator backend might introduce. 

Data Activator queries Power BI for new data every hour. This means that events that meet the rule condition trigger an activation at a maximum of one hour after the event occurs. 

### Rules built on Eventstreams 

There are a few different components that impact latency for rules built on Eventstreams: 
- late arrival tolerance
- a delay that might be introduced by Data Activator’s backend
- if aggregations are used in the rule definition 

Late arrival tolerance contributes to latency. Rules that are created with a late arrival tolerance have a latency that is at least the amount of time that the late arrival tolerance is set to. 

The delay introduced by Data Activators backend can take around one min to process all the data. 

If an aggregation is used in the rule definition, then the rule only activates when it completes the specified time windows. For example, let’s say a rule is built to average the data over four hours. If an event that meets the rule conditions is ingested at 12 pm, the rule fires at 4 pm. The aggregation of data needed to be completed before the rule could be activated. 

## Red content
