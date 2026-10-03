---
title: Capacity overage in Microsoft Fabric
description: Learn about capacity overage in Microsoft Fabric, including how it works, cost considerations, overage thresholds, and best practices.
author: SnehaGunda
ms.author: sngun
ms.reviewer: pankar
ms.topic: concept-article
ms.date: 08/26/2026
ai-usage: ai-assisted
---

# Capacity overage in Microsoft Fabric

Capacity overage is an opt-in feature that pays for eligible excess capacity usage, up to a rolling 24-hour threshold that the capacity admin sets. It helps prevent throttling during temporary demand above the provisioned SKU. The configured threshold isn't a hard spending cap. Because Fabric evaluates overage periodically and operations already in progress continue to run, your charges can exceed the threshold.

This feature acts as a safety net that keeps your capacity running while you take action to prevent further throttling. When you enable it, capacity overage charges at three times the pay-as-you-go rate, but only for usage that exceeds your current capacity and would otherwise trigger throttling. By enabling capacity overage, you ensure that workloads continue uninterrupted during unexpected demand spikes or small regular overloads. This approach complements good capacity management practices rather than replacing them.

> [!NOTE]
> Capacity overage is enabled by default when you create a Fabric capacity. You can configure it during capacity creation or later after provisioning through the OneLake Catalog or the Admin portal.

## Key benefits

Capacity overage offers the following key benefits:

- Acts as a safety net during unexpected overloads, keeping capacities running while giving admins time to respond.
- Automatically handles small, routine interactive overloads without requiring admin action.

## How capacity overage works

Capacity overage prevents throttling by automatically paying off excess capacity usage up to a threshold an admin sets. Here's how throttling in Fabric interacts with capacity overage:

- Each capacity has fixed compute resources measured in Capacity Units (CUs).

- When demand exceeds available capacity (after smoothing) beyond a defined threshold, Fabric applies throttling. To learn more about throttling, see [how throttling works](throttling.md).

- Capacity overage pays off excess usage at the point when throttling would otherwise occur.

Capacity overage intervenes at the point of throttling. When your capacity's smoothed usage exceeds the built-in thresholds, instead of applying delays or rejections, capacity overage automatically reconciles the excess usage by charging your Azure subscription. This approach keeps your capacity in a non-throttled state. Running jobs continue without interruption, and the capacity keeps operating without user‑visible throttling.

To balance cost and performance, capacity admins define a rolling 24‑hour overage threshold. Fabric compares this threshold against your processed overages from the past 24 hours and evaluates it at 5‑minute intervals. For example, if Fabric runs a check at 09:00, it compares the threshold to your processed overages from 09:00 yesterday to 09:00 today. At 09:05, the window shifts forward by five minutes, evaluating usage from 09:05 yesterday to 09:05 today.

Overage thresholds use Fabric quota, so you can only set a threshold if it falls within your available quota. The required quota equals 1/24th of the threshold you set, because Fabric spreads your CU hours threshold across 24 hours. For example, a 48 CU hour threshold adds 2 CUs to your quota. If the available quota can't support the configured threshold, you can't enable capacity overage until you increase the quota or reduce the threshold. To learn more about quotas, see [Fabric quotas](fabric-quotas.md).

### Track overage usage

Microsoft Fabric provides several methods to track when capacity overage activates and how much extra capacity you use:

| Method | What it shows |
|--------|---------------|
| **Capacity Metrics app** | Logs processed overages, shows CU-hours billed, and capacity state (Active vs. Throttling). |
| **Azure Cost Management** | Tracks billed overages through a separate meter (Capacity overage capacity usage); shows financial impact over time. |
| [**Capacity Events in Real-Time Hub**](../real-time-hub/explore-fabric-capacity-overview-events.md) | Real-time alerting of capacity overage events by using the summary table. |

### Key behavior concepts

| Concept | Description |
|---------|-------------|
| **Trigger point** | Activates when interactive delay threshold percentage exceeds 100% (that is, when your smoothed usage for the next 10 minutes exceeds 100% capacity). |
| **What gets billed** | Any cumulative carry forward at the point interactive delay threshold percentage exceeds 100%. |
| **No performance boost** | Doesn't increase SKU size or available resources; it only prevents throttling. Size the SKU for sustained load. |
| **Spending threshold** | Set a 24‑hour CU hours threshold. After you reach the threshold, capacity overage stops and throttling resumes until usage rolls out of the window or you increase the threshold. The threshold isn't a hard cap. For more information, see [Understand the overage threshold](#understand-the-overage-threshold). |
| **Surge protection interaction** | Capacity overage doesn't override surge protection; both features work together to manage load. |
| **Self-managing behavior** | Fully automated; starts when usage reaches the threshold and stops when usage drops below the threshold. |

## Understand the overage threshold

The overage threshold you configure is a **spending threshold, not a hard spending cap**. Fabric evaluates processed overage at regular intervals. When your capacity reaches the threshold, there can be a short delay before throttling begins, and operations that are already running continue to run. As a result, your actual overage charges can exceed the threshold you set.

The following usage avoids throttling and bills at the overage rate:

* Excess usage that accrued before your capacity entered overage.

* Operations that run while your capacity is in overage.

* Operations that run for up to five minutes after your capacity reaches the threshold.

The threshold applies to processed overage in a rolling 24‑hour window. As older overage consumption ages out of the window, overage headroom becomes available again.

| Phase | Capacity behavior | Billing behavior |
|-------|-------------------|------------------|
| Normal | Usage stays within the SKU allocation. | No overage charge. |
| Overage active | Fabric accepts eligible excess usage while processed overage stays below the threshold. | Fabric bills the excess usage at the overage rate. |
| Threshold reached | Fabric moves toward throttling after the service evaluation interval. | In-flight consumption can push charges above the threshold. |
| Recovery | Older processed overage leaves the rolling window. | Overage headroom becomes available again. |

## Cost considerations for capacity overage

Enabling capacity overage might result in additional charges beyond your capacity SKU. Consider the following cost controls and behaviors:

- **Billing meter:** Azure bills overage usage through a separate meter at three times pay‑as‑you‑go rates. This rate only applies to CU hours beyond your SKU allowance.

- **Spending threshold:** Set a rolling 24‑hour CU threshold to control costs. When you reach the threshold, capacity overage stops and throttling resumes until usage rolls out of the window or you increase the threshold.

- **Usage-based charges:** Enabling capacity overage carries no standing charge. You pay only for the CU hours that prevent throttling.

- **Adjusting thresholds:** You can update the threshold at any time. Increasing the threshold resumes billing if overload persists. Lowering the threshold might result in throttling if your processed capacity overages exceed the new threshold.

- **Enabling overage protection during throttling:** If you enable capacity overage during a heavy throttling event, Fabric charges you for all cumulative carry forward at the time you switch on capacity overage.

- **When capacity overage activates:**
  - Review workloads and optimize or redistribute where possible.
  - Scale up to a larger SKU if you have frequent capacity overages or are in a deep throttling state (for example, background rejection).
  - Adjust the threshold based on budget and performance needs.

- **Viewing charges:** Use Azure Cost Management and filter by the overage meter (Capacity Overage Capacity Usage CU) to monitor usage and costs.

## Capacity overage thresholds

Capacity overage thresholds are defined in CU hours. For example, an F2 provides 2 CU hours per hour, or 48 CU hours per day, while an F256 provides 256 CU hours per hour, or 6,144 CU hours per day.

The following table shows the daily CU hours available for each capacity SKU to help you choose an appropriate overage threshold. Because Azure bills overage usage at three times pay‑as‑you‑go rates, keep the overage threshold below **one‑third of your daily CU hours**; the point at which costs are similar to scaling up the SKU. Higher thresholds can be useful for handling short, severe interactive spikes that could still result in throttling even after scaling up.

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
| F4096 | 4,096 | 98,304 |
| F8192 | 8,192 | 196,608 |

## Considerations and limitations

Consider the following points when you use capacity overage:

- Capacity overage is available only for F SKUs.

- Capacity overage pays off your excess capacity debt for the current time window but doesn't clear your future debt. This behavior ensures capacity overage pays off the minimum viable amount of CU to keep your capacity running. It also means, if you have significant overloads, capacity overage can continue for long periods, eventually reaching your CU hours threshold. When capacity overage activates, review your capacity and take appropriate action.

- Capacity overage prevents throttling and allows new jobs to run. This behavior prevents downstream impact on users but can also admit new large jobs. To prevent Fabric from accepting new background jobs during background rejection, set a capacity surge protection limit of 100%.

- Use caution when scaling down capacity with capacity overage enabled. Reducing capacity can result in significant overages that capacity overage automatically charges.

## FAQs and best practices

### When should I use capacity overage?
Use it when uptime is critical and you occasionally hit capacity limits. It's ideal for rare unexpected spikes or small regular spikes where you don't need to scale up. If you're throttled regularly outside of these scenarios, scale up instead.

### Does capacity overage improve performance?
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
