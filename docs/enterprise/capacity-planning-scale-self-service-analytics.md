---
title: 'Microsoft Fabric Capacity Planning Guide: Scale for Decentralized Analytics'
description: Learn Microsoft Fabric capacity planning for decentralized self-service analytics. Discover strategies to budget, scale, and optimize your solution.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: cnovak
ms.topic: troubleshooting
ms.date: 08/26/2025
---

# Microsoft Fabric capacity planning guide: Scale for decentralized analytics

This article is **part 2** of the Microsoft Fabric capacity planning guide. It explains how Microsoft Fabric tenant and capacity admins can plan and manage capacity for decentralized self-service analytics across multiple business units. You learn strategies for balancing consolidation and isolation, ensuring efficient resource use and optimal performance in a multiteam environment.

Microsoft's [Fabric adoption roadmap](/power-bi/guidance/fabric-adoption-roadmap-content-ownership-and-management) defines _business-led self-service_ and _managed self-service_ as strategies where business units largely own content (decentralized), compared to enterprise-owned content. With many teams using **Microsoft Fabric** at the same time, capacity admins need to plan and budget capacity to achieve two goals:

- **Consolidation:** Efficiently share capacity across groups to **maximize utilization and minimize cost** (avoid underused silos).
- **Isolation:** Provide **sufficient isolation** so one team's heavy usage doesn't affect others' performance (avoid the "noisy neighbor" problem).

This guide gives strategies to balance these goals in a customer-friendly, practical way. You learn how to allocate capacities, like per department or shared pools. By the end, you have a clear approach to planning and budgeting Fabric capacity in a decentralized multiteam environment.

## Capacity allocation strategies in a multiteam environment

When multiple business units build solutions on Fabric, you need a strategy for **allocating capacity** among them. Two common models are:

- **Dedicated capacity per department/domain** - Each team gets its own Fabric capacity.
- **Shared capacity across departments** - Multiple teams' workloads run on the same capacity.

### Dedicated capacity per department

In this model, each department, like Finance or Marketing, gets its own capacity—often through a separate Azure subscription or resource group—to make billing clear and manage Fabric quota. This setup gives complete isolation, with compute resources dedicated to each department and costs easily attributed through Azure billing. But it can be expensive if capacities are underused, because idle resources still incur costs. Managing multiple separate capacities also increases admin effort. This approach works best when strict isolation is essential, like for mission-critical solutions that need guaranteed performance.

### Shared capacity (consolidated)

When multiple departments share a single, larger capacity, resources are pooled for greater overall use and less idle time. Microsoft notes that while collaboration is enabled under the Fabric capacity model, unmanaged shared resources can be depleted. Combining workloads helps balance usage peaks and increases value, often letting higher workload thresholds—like buying a F64 instead of several F16s—or removing the need for [Pro licenses](licenses.md). Organizations often start with central capacity for smaller self-service projects. The main drawback is contention: heavy use by one team can affect others. Strong governance and monitoring are essential for fairness.

| **Model** | **Pros** | **Cons** |
|---|---|---|
| **Dedicated capacity per department** | - Complete isolation: compute resources are exclusive to each department.<br>- Clear cost attribution through Azure billing.<br>- Ideal for mission-critical workloads that need guaranteed performance. | - Potentially costly if underused (for example, idle evenings).<br>- Increased admin overhead (multiple capacities, separate monitoring, and admins). |
| **Shared capacity (consolidated)** | - Higher overall use: pooled resources reduce idle time.<br>- Lets collaboration across departments.<br>- Better price-performance (for example, one F128 vs. multiple F32s).<br>- Smooths out usage peaks across teams.<br>- Use Fabric Chargeback app to distribute cost across departments, domains, or subdomains. | - Contention risk: one team's heavy use can affect others.<br>- Needs strong governance and monitoring for fairness. |

### Hybrid approach

These models aren't mutually exclusive. Mix them to fit your needs. For example, Contoso might decide Sales and Marketing can share a capacity because their workloads are light, but Finance, with heavier and sensitive workloads, gets a dedicated capacity. Microsoft guidance reminds us there's _"no one-size-fits-all"_; an organization likely uses a combination of strategies depending on each team's needs and the company's [data culture](/power-bi/guidance/fabric-adoption-roadmap-data-culture). It's common to start with consolidation for cost efficiency, then **scale out** to separate capacities as use grows or when specific teams outpace the shared environment.

## Consolidation planning guidelines

Review all departmental use cases and categorize them by size and criticality. Use a **shared capacity** for multiple small or medium, noncritical workloads to maximize return on investment of capacity. Use **dedicated capacity** for either large workloads that can affect others, or mission-critical content that needs guaranteed performance. In shared capacities, implement internal cost tracking.

Microsoft provides a [**Fabric Chargeback app**](chargeback-app.md) to attribute capacity usage to teams, users, and workspaces. This tool lets you build chargeback processes to allocate costs based on actual consumption, so teams stay accountable even in a shared model.

> [!TIP]
> When deciding which workspaces or solutions can share a capacity, consider factors like:
>
> - **Geographic region:** Keep content in the same data region on the same capacity to reduce latency and compliance issues.
> - **Data domain or subject area:** Workloads with related data or similar refresh cycles can coexist well.
> - **Usage patterns:** If Team A mainly runs heavy jobs at night and Team B runs interactive reports during the day, they can share capacity effectively.
> - **Priority and service-level agreement (SLA):** Don't mix a mission-critical workload with a noncritical project on one capacity. Align shared groups by similar criticality or SLA expectations.
> - **Ownership and support:** Make sure any shared capacity has a clearly identified Capacity Admin or central team to monitor it, and all contributing teams agree to follow usage guidelines.

Once you identify logical groupings, **size the capacity appropriately** for them. Use the [Fabric Capacity Metrics App](metrics-app.md) data from any existing usage to estimate combined load. If historical data isn't available, the [**Fabric SKU Estimator**](fabric-sku-estimator.md) gives a starting SKU recommendation, but measure and adjust over time. Use the [Fabric Chargeback app](chargeback-app-install.md) to track each workspace's capacity usage (capacity unit consumption), so you can report monthly usage by department and charge accordingly, like through internal cost center transfers. This transparency encourages teams to use resources responsibly.

Finally, [**monitor the shared capacity**](capacity-planning-troubleshoot-consumption.md) closely for the health of each unit sharing it. The [Fabric metrics app](metrics-app.md) shows at a glance which workspace or item uses the most capacity. Regularly share these insights with each department, like "Marketing used 30 percent of the capacity this month, mostly from semantic model X refreshes." This lets each unit optimize their own heavy items, maybe with help from the COE on best practices. It also flags if a team's growth means they need their own capacity soon.

## Maintaining performance in shared capacities (isolation techniques)

If you consolidate multiple teams on a shared capacity, it's important to set up safeguards for **isolation** when needed. Even with governance, you can run into situations where one workload disrupts others. Here are strategies to help you manage these situations—think of them as tools to keep the capacity healthy and all teams happy:

### Try-out capacity - onboard new solutions safely

:::image type="content" source="media/capacity-planning/try-out.gif" alt-text="Animation of a new workspace being onboarded in Microsoft Fabric.":::

When you roll out a **new workspace or project**, deploy it on a small temporary capacity instead of directly into a shared one. This isolated pilot lets you measure its capacity utilization in a controlled way. Optimize and tune it if needed. After you check that it runs efficiently, move it into the shared capacity for full release. This approach prevents surprises—if the new solution uses too many resources, you catch it in the trial phase without affecting other teams. Pause the capacity when it's not in use to avoid billing.

### "Timeout" capacity - quarantine noisy neighbors

:::image type="content" source="media/capacity-planning/timeout.gif" alt-text="Animation of a workspace being moved to a smaller capacity in Microsoft Fabric.":::

If a workspace or user starts using too many resources on the shared capacity (causing others to throttle), move that workload to a separate **small capacity** temporarily. This acts as a quarantine: the rest of the teams recover, and the team using too many resources experiences limited compute, which often motivates them to fix their queries or upgrade to their own capacity. Admins can assign the workspace to a new capacity in the Fabric admin portal. Communicate this as an exceptional measure—"you maxed out the shared environment, so you've been moved to a smaller sandbox until the issue is resolved." This tactic protects everyone and creates accountability for heavy users. Pause the quarantine capacity when it's not in use.

### Rescue capacity - handle temporary overloads

:::image type="content" source="media/capacity-planning/rescue.gif" alt-text="Animation of a workspace being moved to a standby capacity in Microsoft Fabric.":::

Keep a **standby capacity** ready to handle occasional spikes. For example, a capacity that's usually paused (no cost while paused) can be quickly resumed during an emergency. If a team has an urgent job that's overloading the shared capacity, switch that team's workspace to the standby capacity for the peak period. This approach "rescues" the workload, letting it finish on dedicated resources, while the main capacity instantly frees up for others. After the surge, move the workspace back and pause the standby. This strategy helps with one-off events or seasonal/reporting spikes that aren't frequent enough to permanently allocate capacity. It's manual burst handling beyond Fabric's automatic bursting and smoothing. Watch for cost (pay-as-you-go charges while it's running) and set criteria for when to trigger this. Pause the capacity when it's not in use.

## Managing self-service growth and governance

When multiple business units use Fabric in a self-service model, strong **governance and communication** are key to sustainable capacity management. Part 4 of the strategic capacity planning series covers best practices to manage capacity growth and governance.

## Conclusion

By following these guidelines, Fabric admins foster a successful **self-service analytics ecosystem** that scales. You achieve cost efficiency by sharing resources where appropriate, while still ensuring each group gets the performance it needs through smart isolation tactics. In short, **plan capacity with both the forest and the trees in mind**—the big picture of total resources, and the individual needs of each team. This article concludes part 2 of the strategic capacity planning series. With these strategies, you confidently expand Fabric usage across your organization without compromising governance or user satisfaction. The next part in the series covers enterprise-scale considerations for centrally managed solutions, building on these foundations.

> [!div class="nextstepaction"]
> [Part 3: Scale for enterprise and managed self-service solutions](capacity-planning-enterprise-managed-self-service-solutions.md)