---
title: Latency and accuracy considerations in Data Activator rules
description: An overview of Data Activator latency considerations and performance when building Data Activator rules.
author: mihart
ms.author: mihart
ms.topic: overview
ms.custom:  
ms.search.form: product-reflex
ms.date: 10/2/2024
#customer intent: As a Fabric user who is working with rules, I want to understand the factors that help to determine when actions are included and excluded from rule reporting.
---

# What is Latency in Data Activator

Receiving accurate alerts and timely alerts is a consideration when creating rules. Data Activator has some settings that allows you to adjust the tradeoff between allowing for more data to arrive and how soon alert receivers will receive their alerts.

## Performance 

## Late arrival tolerance 

Late arrival tolerance refers to how long the system waits for an event to arrive and see the event. This ensures that “late” events and events that arrive out of order will have the opportunity to make it into the set of data that rule evaluation happens over. If a data point falls outside of the time allowed, the system does not take it into consideration. Any events that arrive after that tolerance will not be factored in. 
If a data point fall outside of the time allowed, that data point will not be considered when the rule is evaluated.
Overall, the consideration is, is it more important to get the “late” data points and have the rule evaluated on that data, or is it more important to get alerts on potentially incomplete data evaluated sooner?  

A blue dot on a black background

Description automatically generated  

Figure 1 

For example, in Figure 1, data points are measured in 15-minute increments. The first three (blue) dots have made it in the time window. The fourth (orange) dot has not. The system will only evaluate the rule over the blue dots unless the user indicates that they want to allow for a late arrival tolerance and wait to see if other data points will arrive.  

Note that the system will not be able to factor in delays from the user’s data. For example, the user can have IoT sensors that are offline for 1 hour, once they go back online, Data Activator can receive the data, but the data was delayed for 1 hour from that offline state, which has happened outside of the system. 

## Example of late arrival tolerance

Ingestion timestamp  

Temp  

09:00  

09:02  

20  

09:01  

09:03  

30  

09:02  

09:07  

40  

Using the data above, let’s say a user goes with Data Activator's default late arrival tolerance settings and wants to calculate the average of the temperature values ingested. Temperature values 20 and 30 will be considered and the average temperature will be calculated as 25.  

However, if the late arrival tolerance is at least 5 min, the value 40 will also now be considered and the average temperature will be calculated as 30.  

> [!NOTE]
> You currently cannot override the default late arrival tolerance. This setting is also not applicable for Power BI rules. Power BI rules are evaluated any time new data arrives in Data Activator. 

## Latency 
Depending on the source a rule is built on, there are some considerations you may want to take into account to better understand any latency on receiving alerts from rules.
### Rules built on Power BI visuals 

There are two parts that make up latency for rules built on Power BI visuals: the frequency of querying Power BI visuals that’s built in the system, and a delay that may be introduced by Data Activator’s backend. 

Data Activator queries Power BI for new data every hour. This means that events that meet the rule condition will trigger an activation at a maximum of one hour after the event has occurred. 

The delay introduced by Data Activators backend can take up to 10 min to process all the data. 

### Rules built on Eventstreams 

There are a few different components that can make up latency for rules built on Eventstreams: late arrival tolerance, a delay that may be introduced by Data Activator’s backend, and if aggregation is used in the rule definition. 

Late arrival tolerance contributes to latency. Rules that are created with a late arrival tolerance will have a latency that is at least the amount of time that the late arrival tolerance is set to. 

The delay introduced by Data Activators backend can take around one min to process all the data. 

If an aggregation is used in the rule definition, then the rule will only be activated when it completes the specified time windows. For example, let’s say a rule has been built with averaging the data over four hours. If an event that meets the rule conditions is ingested at 12 pm, the rule will only fire at 4 pm. The aggregation of data needed to be completed before the rule could be activated. 

## Related content
