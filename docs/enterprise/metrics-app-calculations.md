---
title: Metrics app calculations
description: Understand some of the calculations that the Microsoft Fabric Capacity Metrics app uses to calculate consumption.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
ms.date: 12/31/2023
---

# Metrics app calculations

This article explains some of the calculations that are used to calculate consumption in Microsoft Fabric. Use this article to get a better understanding of the information displayed in the [Microsoft Fabric Capacity Metrics app](metrics-app.md).

## Consumption analysis

An overloaded capacity is a capacity that reaches more than 100% of its compute power. When a capacity is overloaded, it starts to throttle. The [throttling](metrics-app-compute-page.md#throttling) visual helps you understand your consumption as a percentage of Fabric's throttling limit at a given time point. Throttling continues until the capacity usage is lower than 100%. The throttling visual has three tabs, each showing information about different throttling types, based on different time windows.

| Tab                   | Threshold limit | What happens when your capacity reaches 100%?                                         |How long before your capacity is back at 100%? |
|-----------------------|-----------------|-------------------------------------------------------------------------|---|
| Interactive delay     | 10 minutes      | A 20-second throttle is applied to interactive requests                 | After delays are applied new interactive and background requests continue to accumulate future compute usage |
| Interactive rejection | 60 minutes      | Interactive requests are rejected and users see an error in the UI      | Background requests continue to accumulate future compute usage |
| Background rejection  | 24 hours        | All requests are rejected including background and interactive requests | N/A   |

When the future compute usage drops below 100%, additional requests are accepted. These requests can result in your capacity's usage exceeding 100% again. You might perceive this as a single continuous throttling event, when in fact it's two consecutive throttling events.

### Background rejection

Since the background rejection threshold is 24 hours, high percent throttling numbers indicate you overused your daily (24 hour) capacity resources. When your background rejection is higher than 100%, all requests are rejected. Rejection stops once your capacity usage is lower than 100%. For example, a background rejection of 250% means that you used 2.5 times the amount of your daily capacity resources for your SKU level.

### Interactive delay and interactive rejection

When you look at these visuals, you only see what’s affecting your capacity at a specific timepoint. These visuals include usage that was [smoothed](throttling.md#balance-between-performance-and-reliability) into the current evaluation window. Later timepoints might include additional smoothed usage that isn't impacting this timepoint. Background smoothed consumption could lower the amount of usage available for interactive requests in future timepoints.

* **Interactive delay** - A 250% interactive delay means that Fabric is attempting to fit 25 minutes of consumption into the next 10 minutes.

* **Interactive rejection** - A 250% interactive rejection means that Fabric is attempting to fit 2.5 hours of consumption into the next 60 minutes.

### Calculate the time to recover from throttling

When your usage is over 100%, you’ll need to wait until the capacity lowers future usage to below 100%. You can use the following formula to estimate how long it would take to drop below 100%, assuming no additional compute is used.

$$
\text{minimum time to recover from throttling} = \frac{\text{\% rejection type } – \text{ }100}{100}\times{\text{period duration}}
$$

Interactive rejection and interactive delay could take longer than 1.5 times the window duration to stop getting throttled. New requests could be adding more carry forward usage to the capacity making the time it takes for the capacity usage to get to 100% longer than the 60 minute or 10-minute time windows.

#### Background rejection calculation example

When your usage reached 250%, all requests are rejected for the next 36 hours.

$$
\frac{250-100}{100}\times{24 \text{ hours} = 36 \text{ hours}}
$$

It will take 1.5 days for the capacity usage to get to 100%. Since background rejection doesn't allow new compute consumption, this estimate is accurate.

#### Interactive rejection calculation example

When your usage reaches 250%, only interactive requests are rejected for the next90 minutes.

$$
\frac{250-100}{100}\times{60 \text{ minutes} = 90 \text{ minutes}}
$$

It takes at least 1.5 hours for the capacity usage to get below 100%. However, since new background requests might impact your capacity, the duration of this event might be longer.

#### Interactive delays calculation example

When your usage reaches 250%, interactive requests are delayed for the next 15 minutes.

$$
\frac{250-100}{100}\times{10 \text{ minutes} = 15 \text{ minutes}}
$$

It takes at least 15 minutes for the capacity usage to get below 100%. However, since new interactive and background requests might impact your capacity, the duration of this event might be longer.

## Performance delta

The [matrix by item and operation](metrics-app-compute-page.md#matrix-by-item-and-operation) table uses colors to help you understand how Fabric items perform in your organization.

* **No color** - A value higher than -10

* **Orange** - A value between -10 and -25

* **Red** - A value lower than -25

To create the *performance delta*, Microsoft Fabric calculates an hourly average for all the fast operations that take under 200 milliseconds to complete. The hourly value is used as a slow moving average over the last seven days (168 hours). The slow moving average is then compared to the average between the most recent data point, and a data point from seven days ago. The *performance delta* indicates the difference between these two averages.

You can use the *performance delta* value to assess whether the average performance of your items improved or worsened over the past week. The higher the value is, the better the performance is likely to be. A value close to zero indicates that not much changed, and a negative value suggests that the average performance of your items got worse over the past week.

Sorting the matrix by the *performance delta* column helps identify semantic models that have the biggest change in their performance. During your investigation, don't forget to consider the *CU (s)* and number of *Users*. The *performance delta* value is a good indicator when it comes to Microsoft Fabric items that have a high CU utilization because they're heavily used or run many operations. However, small semantic models with little CU activity might not reflect a true picture, as they can easily show large positive or negative values.

## Related content

* [Understand the metrics app compute page](metrics-app-compute-page.md)

* [Understand the metrics app timepoint page](metrics-app-timepoint-page.md)
