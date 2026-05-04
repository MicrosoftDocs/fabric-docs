---
title: Activator throttling effects
description: Learn how Fabric capacity throttling affects Activator rule evaluation and UI operations, and how to recover from capacity overload.
ms.subservice: rti-activator
ms.topic: concept-article
ms.date: 04/30/2026
ms.custom: "sfi-image-nochange"
ms.search.form: product-reflex
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator or Activator user, I want to understand how throttling affects Activator rule evaluation and UI operations, so I can keep my rules running and respond to capacity overload.
---

# How Fabric capacity throttling affects Activator

Throttling occurs when you consume more capacity resources than you purchased. Prolonged overload results in degraded performance and gaps in event processing. The [Fabric throttling policy](../../enterprise/throttling.md) explains Fabric capacity throttling, its stages, available mitigations, and best practices to prevent it.

## Stages of capacity overload

Activator distinguishes between three stages of capacity overload and throttling.

1. Capacity overloads lasting between 10 and 60 minutes.
1. Capacity overloads lasting over 60 minutes and up to 24 hours.
1. Capacity overloads lasting over 24 hours.

The following table summarizes the effect on interactive UI operations and Activator rule evaluation at each stage.

| Stage | Interactive UI | Rule evaluation |
| ----- | -------------- | --------------- |
| Stage 1 | Delayed 20 seconds | Continues normally |
| Stage 2 | Rejected | Continues normally |
| Stage 3 | Rejected | Paused |

### Stage 1: Overloads lasting 10 to 60 minutes

At this stage of capacity overload, Activator introduces several delays to prevent further overload and ensure that background processing continues to operate at peak performance. These steps prioritize background processing over interactive UI usage and minimize business impact. Rule evaluation (your business logic) keeps running, while UI operations are delayed.

- Loading and displaying of data-aware graphs is delayed by 20 seconds.

:::image type="content" source="media/activator-throttling-effects/activator-throttling-delay.png" alt-text="Screenshot that shows the delays Activator introduces in order to prioritize backend processing.":::
  
- Auto-refreshing of graphs is disabled. You can restart auto-refresh by toggling **Live auto-refresh** on, or by manually reloading the browser page.

- Loading of data-aware dropdown lists (such as time range selectors) is delayed by 20 seconds.

- Sending of test alerts is delayed by 20 seconds.

- Running of interactive queries is delayed and a banner informs you that capacity is exceeded.
  
  :::image type="content" source="media/activator-throttling-effects/activator-throttling-banners.png" alt-text="Screenshot shows the banner that displays when capacity is exceeded.":::
  
### Stage 2: Overloads lasting over 60 minutes to 24 hours

At this stage, Activator takes a few more steps to prioritize background processing over interactive UI usage and minimize business impact. Rule evaluation continues normally. All interactive UI operations are rejected. The rejections include:

- Data-aware graphs aren't displayed.
- Data-aware dropdowns aren't displayed.
- Test alerts aren't sent.

### Stage 3: Overloads lasting over 24 hours

At this stage, Activator rejects both interactive and background operations. Rule evaluation pauses. You're notified by email and Activator banners.

- System notifications are sent to item owners to inform them that Activator is pausing rule evaluation.

  :::image type="content" source="media/activator-throttling-effects/activator-throttling-emails.png" alt-text="Screenshot shows a sample email sent to a customer explaining the stage three throttling.":::
  
- Banners inform you about the exceeded capacity and rejected interactive and background operations.

## Recover from overload situations

You can wait for Activator to recover on its own. Don't issue new rule requests while you wait. If the overload situation continues, the Fabric Capacity administrator can take several actions to recover from capacity overload.

- Upgrade the SKU of the Fabric capacity. A larger SKU has more idle capacity per timepoint, which burns down carryforward faster.

- [Pause and resume the capacity](../../enterprise/pause-resume.md). Pausing results in a billing event for accumulated future capacity usage. When the capacity resumes, it starts with zero future capacity usage and can accept new operations immediately.

- [Configure capacity Autoscale](/power-bi/enterprise/service-premium-auto-scale) (P SKU capacities only).

- Move lower priority or high-consumption workspaces out of the capacity.

- If Activator rule executions are causing the overload, consider stopping the rules and adjusting their conditions.

For more information, see [The Fabric throttling policy](../../enterprise/throttling.md).

## Related content

- [Activator capacity consumption, usage reporting, and billing](activator-capacity-usage.md)
- [Apply filters to reduce Activator rule costs](reduce-cost-rules-apply-filters.md)
- [The Fabric throttling policy](../../enterprise/throttling.md)
