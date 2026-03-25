---
title: Capacity overage in Microsoft Fabric
description: Learn about capacity overage in Microsoft Fabric, including how it works, cost considerations, overage limits, and best practices.
author: SnehaGunda
ms.author: sngun
ms.reviewers: pankar
ms.topic: concept-article
ms.date: 03/11/2026
ai-usage: ai-assisted
---

# Capacity overage in Microsoft Fabric

Capacity overage is an opt-in feature that automatically pays for excess capacity usage, up to a limit set by the capacity admin. It prevents throttling and ensures that workloads continue uninterrupted, even when they temporarily exceed a capacity's limits.

This feature acts as a safety net that keeps your capacity running while you take action to prevent further throttling. When enabled, capacity overage charges at 3 times the pay-as-you-go rate, limited only to usage that exceeds your current capacity and would otherwise trigger throttling. By enabling capacity overage, you ensure that workloads continue uninterrupted during unexpected demand spikes or small regular overloads. This approach complements good capacity management practices rather than replacing them.

> [!NOTE]
> Capacity overage is currently in public preview. Functionality and pricing are subject to change before general availability. This feature is currently only available for F SKUs.

## Key benefits

Capacity overage offers the following key benefits:

- Acts as a safety net during unexpected overloads, keeping capacities running while giving admins time to respond.
- Automatically handles small, routine interactive overloads without requiring admin action.

## How capacity overage works

Capacity overage prevents throttling by automatically paying off excess capacity usage up to a limit admin sets. Here is how throttling in Fabric interacts with capacity overage:

- Each capacity has fixed compute resources measured in Capacity Units (CUs).

- When demand exceeds available capacity (after smoothing) beyond a defined threshold, Fabric applies throttling. To learn more about throttling, see [how throttling works.](throttling.md)

- Capacity overage pays off excess utilization at the point when throttling would otherwise occur.

Capacity overage intervenes at the point of throttling. When your capacity's smoothed usage exceeds the built-in thresholds, instead of applying delays or rejections, capacity overage will automatically "pay off" the excess usage by charging your Azure subscription. This keeps your capacity in a non-throttled state. Running jobs aren't impacted, and the capacity continues operating without user‑visible throttling.

To balance cost and performance, capacity admins define a rolling 24‑hour overage limit. This limit is compared against your processed overages from the past 24 hours, evaluated at 5‑minute intervals. For example, if a check is made at 09:00 the limit will be compared to your processed overages from 09:00 yesterday to 09:00 today. At 09:05, the window shifts forward by five minutes, evaluating usage from 09:05 yesterday to 09:05 today.

Overage limits use Fabric quota, so you can only set a limit if it falls within your available quota. The required quota equals 1/24th of the limit you set. This is because Fabric spreads your CU hours limit across 24 hours. For example, a 48 CU hour limit adds 2 CUs to your quota. If the available quota can't support the configured limit, capacity overage can't be enabled until the quota is increased or the limit is reduced. To learn more about quotas, see [Fabric quotas](fabric-quotas.md).

### Track overage usage

Microsoft Fabric provides several methods to track when capacity overage activates and how much extra capacity is used:

| Method | What it shows |
|--------|---------------|
| **Capacity Metrics app** | Logs processed overages, shows CU-hours billed, and capacity state (Active vs. Throttling). |
| **Azure Cost Management** | Tracks billed overages via a separate meter (Capacity overage capacity usage); shows financial impact over time. |
| **Capacity Events in Real-Time Hub** | Real-time alerting of capacity overage events using the summary table. |

### Key behavior concepts

| Concept | Description |
|---------|-------------|
| **Trigger point** | Activates when interactive delay threshold percentage exceeds 100% (i.e, when your smoothed usage for the next 10 minutes exceeds 100% capacity.). |
| **What gets billed** | Any cumulative carry forward at the point interactive delay threshold percentage exceeds 100%. |
| **No performance boost** | Does not increase SKU size or available resources; it only prevents throttling. Size the SKU for sustained load. |
| **Spending limit** | Set a 24‑hour CU hours limit. Once the limit is reached, capacity overage stops and throttling resumes until usage rolls out of the window or you increase the limit. This limit is checked every 5 minutes, so it is possible to slightly exceed your limit; consider this check when setting a reasonable limit. |
| **Surge protection interaction** | Capacity overage doesn't override surge protection; both features work together to manage load. |
| **Self-managing behavior** | Fully automated, starts when threshold is reached and stops when usage drops below threshold. |

## Cost considerations for capacity overage

Enabling capacity overage may result in additional charges beyond your capacity SKU. Consider the following cost controls and behaviors:

- **Billing meter:** Azure bills overage usage through a separate meter at 3 times pay‑as‑you‑go rates. This rate only applies to CU hours beyond your SKU allowance.

- **Spending limit:** Set a rolling 24‑hour CU limit to control costs. When you reach the limit, capacity overage stops and throttling resumes until usage rolls out of the window or you increase the limit.

- **Usage-based charges:** There's no standing charge for enabling capacity overage. You pay only for the CU hours that prevent throttling.

- **Adjusting limits:** You can update limits at any time. Increasing the limit resumes billing if overload persists. Lowering the limit may result in throttling if your processed capacity overages exceed the new limit.

- **Enabling overage protection during throttling:** If you enable capacity overage during a heavy throttling event, Fabric charges you for all cumulative carry forward at the time you switch on capacity overage.

- **When capacity overage activates:**
  - Review workloads and optimize or redistribute where possible.
  - Scale up to a larger SKU if you have frequent capacity overages or are in a deep throttling state (e.g. background rejection).
  - Adjust limits based on budget and performance needs.

- **Viewing charges:** Use Azure Cost Management and filter by the overage meter (Capacity Overage Capacity Usage CU) to monitor usage and costs.

## Capacity overage limits

Capacity overage limits are defined in CU hours. For example, an F2 provides 2 CU hours per hour, or 48 CU hours per day, while an F256 provides 256 CU hours per hour, or 6,144 CU hours per day.

The following table shows the daily CU hours available for each capacity SKU to help you choose an appropriate overage limit. Because Azure bills overage usage at 3 times pay‑as‑you‑go rates, it is recommended to keep the overage limit below **one‑third of your daily CU hours**; the point at which costs are similar to scaling up the SKU. Higher limits, however, can be useful for handling short, severe interactive spikes that could still result in throttling even after scaling up.

| Capacity SKU | Base Capacity Units | CU Hours Per Day |
|--------------|---------------------|------------------|
| F2 | 2 | 48 |
| F4 | 4 | 96 |
| F8 | 8 | 192 |
| F16 | 16 | 384 |
| F32 | 32 | 768 |
| F64 | 64 | 1,536 |
| F128 | 128 | 3,072 |
| F256 | 256 | 6,144 |
| F512 | 512 | 12,288 |
| F1024 | 1,024 | 24,576 |
| F2048 | 2,048 | 49,152 |

## Considerations and limitations

Consider the following when using capacity overage:

- Capacity overage pays off your excess capacity debt for the current time window but doesn't clear your future debt. This ensures capacity overage pays off the minimum viable amount of CU to keep your capacity running. It also means, if you have significant overloads, capacity overage can continue for long periods, eventually reaching your CU hours limit. When capacity overage activates, review your capacity and take appropriate action.

- Capacity overage prevents throttling and allows new jobs to run. This prevents downstream impact on users but can also admit new large jobs. To prevent Fabric from accepting new background jobs during background rejection, set a capacity surge protection limit of 100%.

- Use caution when scaling down capacity with capacity overage enabled. Reducing capacity can result in significant overages that capacity overage automatically charges.

## FAQs and best practices

### When should I use capacity overage?
Use it when uptime is critical and capacity limits are hit occasionally. It's ideal for rare unexpected spikes or small regular spikes where scaling up is not required. If you're throttled regularly outside of these scenarios, scale up instead.

### Does it improve performance?
No. It prevents throttling but doesn't add memory or speed. Jobs run as usual but without delays or rejections.

### What happens if I enable it during throttling?
It pays off accumulated overage immediately.

### Can I tell which workloads or users caused the overage?
Overloads result from the accumulation of all operations on the capacity. Analyze data in the Capacity Metrics app to find insights into what operations ran on your capacity within a specified time window.

### Will capacity overage protect me from all capacity-related issues?
No. It only prevents throttling due to CU exhaustion. Memory, concurrency, and other limits still apply (see the [Semantic model SKU limitation](powerbi/service-premium-what-is.md#semantic-model-sku-limitation) for example).

### If my capacity never exceeds 100% interactive delay, is there any cost to leaving capacity overage on?
No. You only pay when overages occur.

## Related content

- [Enable capacity overage](enable-capacity-overage.md)
- [Fabric throttling policy](throttling.md)
- [Surge protection](surge-protection.md)
- [Fabric Capacity Metrics app](metrics-app.md)
- [Understand your Azure bill on a Fabric capacity](azure-billing.md)
