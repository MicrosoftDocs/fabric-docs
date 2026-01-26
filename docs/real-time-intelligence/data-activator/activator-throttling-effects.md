---
title: "Activator throttling"
description: This article explains how Fabric capacity throttling impacts Activator background operations and shows up in the UI.
ms.service: fabric
ms.subservice: rti-activator
ms.topic: concept-article
ms.date: 11/12/2024
ms.custom: "sfi-image-nochange"
---

# Understanding how Fabric capacity throttling impacts Activator

Throttling occurs when a customer consumes more capacity resources than purchased. Prolonged overload results in degraded performance and gaps in event processing. The [Fabric throttling policy](/fabric/enterprise/throttling) document explains Fabric capacity throttling, its stages, available mitigations, and best practices to prevent it.

## Stages of capacity overload

Activator distinguishes between three stages of capacity overload and throttling.
1.	Capacity overloads lasting between 10 and 60 minutes
2.  Capacity overloads lasting over 60 minutes and up to 24 hours  
3.	Capacity overloads lasting over 24 hours 

### Overloads lasting between 10 and 60 minutes

The first stage of capacity overload occurs when the overload lasts between 10 and 60 minutes. During this stage, Activator introduces several delays to prevent further overload and ensure that background processing continues to operate at peak performance. These steps are taken to prioritize background processing over interactive UI usage and minimize business impact on the customer. The business logic keeps running, while UI operations are delayed.

- Loading and displaying of data-aware graphs is delayed by 20 seconds.

:::image type="content" source="media/activator-throttling-effects/activator-throttling-delay.png" alt-text="Screenshot that shows the delays Activator introduces in order to prioritize backend processing.":::
  
- Auto-refreshing of graphs is disabled. The user can restart auto-refresh by toggling the **Live auto-refresh** on or by manually reloading the browser page.

- Loading of data-aware dropdown lists (such as time range selectors) is delayed by 20 seconds.

- Sending of test alerts is delayed by 20 seconds.

- Running of interactive queries is delayed and a banner informs the user that capacity is exceeded.
  
  :::image type="content" source="media/activator-throttling-effects/activator-throttling-banners.png" alt-text="Screenshot shows the banner that displays when capacity is exceeded.":::
  
### Overloads lasting between 60 minutes and up to 24 hours

The second stage of capacity overload occurs when the overload lasts between 60 minutes and 24 hours. During this stage, Activator takes a few more steps to prioritize background processing over interactive UI usage and minimize business impact on the customer. All interactive UI operations are rejected. The rejections include not displaying data-aware graphs or data-aware dropdowns. Also, Activator doesn't send test alerts.


### Overloads lasting over 24 hours

The third stage of capacity overload occurs when the overload lasts longer than 24 hours. During this stage, Activator starts rejecting background operations. The customer is notified by email and Activator banners. 

- System notifications are sent to inform item owners that Activator is pausing rule evaluations.

  :::image type="content" source="media/activator-throttling-effects/activator-throttling-emails.png" alt-text="Screenshot shows a sample email sent to a customer explaining the stage three throttling.":::
  
- Banners inform users about the exceeded capacity and rejected interactive and background operations.


## Recover from overload situations

You have the option to simply wait for Activator to recover on its own. Don't issue new rule requests while you are waiting. But if the overload situation continues, there are several actions that the Fabric Capacity administrator can take to recover from capacity overload. 

- Upgrade the SKU of the Fabric capacity.

- Pause/resume the throttled capacity. Pausing effectively collects the payment for the spike and resumes from a clean slate.

- Configure capacity Autoscale.

- Move lower priority or overconsuming workspaces out of the capacity.

- If Activator rule executions are causing the overload, consider stopping the rules and adjusting the conditions.

For more information, see [Fabric capacity management](/fabric/enterprise/throttling).
