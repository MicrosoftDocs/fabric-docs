---
title: 'Microsoft Fabric Capacity Planning Guide: Scale for Centralized Analytics'
description: Learn how to plan and manage Microsoft Fabric capacity for centrally managed enterprise and managed self-service solutions. Get strategies for tiered capacity planning, workload criticality, and governance.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: cnovak
ms.topic: troubleshooting
ms.custom:
   - ai-gen-docs-bap
   - ai-gen-title
   - ai-seo-date:08/26/2025
ms.date: 08/26/2025
---

# Microsoft Fabric capacity planning guide: Scale for centralized analytics

This article is **part 3** of the Microsoft Fabric capacity planning guide. It's aimed at Microsoft Fabric tenant admins, capacity admins, Center of Excellence (COE) leads, and IT planners managing Fabric across an organization for centralized content and explains how to plan and manage capacity for centrally owned content. You learn strategies for tiered capacity planning, aligning resources to workload criticality, and ensuring governance for enterprise-scale analytics solutions.

[**Part 1**](capacity-planning-plan-deployment.md) addressed capacity planning for a team's first Fabric solution (from proof of concept, or POC, to production). [**Part 2**](capacity-planning-scale-self-service-analytics.md) covered scaling out to multiple teams in a self-service model, balancing consolidation and isolation. This article addresses capacity strategies for **centrally owned content** - when analytics solutions are managed by a _central IT or Center of Excellence (COE)_ team as described in Microsoft's [Fabric adoption roadmap](/power-bi/guidance/fabric-adoption-roadmap-content-ownership-and-management). This includes _enterprise BI_ (all content centrally owned) and _managed self-service_ scenarios (central IT manages core data, business units build reports on that data - that is, _"discipline at the core and flexibility at the edge"_). These solutions often support critical cross-department analytics, so capacity planning must meet **stringent service-level agreements (SLAs)** for performance and reliability, in addition to being cost efficient.

Large organizations at this stage might need to formalize SLAs (for example, uptime guarantees between IT and business units) and ensure some analytics solutions are treated as _mission critical_.

We use a three-phase approach:

- **Identify and segregate** centrally managed content versus self-service content, and plan the data architecture accordingly.
- **Provision capacity** according to workload criticality, measure usage, and allocate the right size and number of capacities.
- **Maintain and optimize** capacities, monitor usage, adjust scaling, and enforce governance continuously. We discuss this part in detail in Part 4 of the strategic capacities planning series.

## Phase 1: Identify and segregate central content

At this stage, a central team (IT or COE) delivers analytics solutions. Start by **mapping out which content will be centrally managed** versus what remains business-owned self-service. This content ownership pattern is described in the Microsoft [Fabric adoption roadmap](/power-bi/guidance/fabric-adoption-roadmap) guidance:

| Model | Description |
|---|---|
| **Enterprise BI content**   | Centrally owned; provides organization-wide insights (for example, finance reports, dashboards); strict governance. |
| **Managed self-service**    | Central team manages core data; business units create analyses from trusted sources; balances central control and team flexibility. |

- **Catalog central versus self-service content:** Identify **centrally managed content** (enterprise semantic models, curated certified Lakehouses, Warehouses, etc.) from **self-service content** (departmental reports, ad-hoc analysis). This classification drives how you allocate capacity. Centrally managed content might deserve dedicated higher resources, whereas purely self-service content can follow Part 2's shared capacity strategies.
- **Separate data prep versus consumption layers:** In managed self-service scenarios, consider splitting the solution into layers:
  - A **central data layer** (staging, ETL, Lakehouses, Warehouses, semantic models) maintained by IT. For example, bronze or silver layers and centrally hosted shared gold layer.
  - A **business consumption layer** (for example, reports and dashboards) is usually managed by departments. A central team might maintain a Fabric Lakehouse and gold-tier semantic models, which department analysts access via live connections or shortcuts to create reports or set up their own Lakehouses. Using **live connections to central models and shortcuts** supports data reuse and consistency across reports and solutions.

   This separation of duties ensures that **data is curated and stable at the core while enabling agility at the edges**.

- **Apply development and testing versus production separation:** As emphasized in Part 1, always segregate development and testing from production. This remains crucial for centrally managed content. Central IT should have _Dev_ and _QA_ workspaces on a nonproduction capacity categorized as noncritical for building and validating new enterprise solutions (or updates) without risking the live system.
- **Apply Part 2 strategies for self-service:** When centrally managed data supports departmental self-service, address multi-team capacity needs. Have each department create its own Lakehouse with a shortcut to the central version, using either dedicated or shared capacities. This lets departments access unified data while using their own compute resources. Decide upfront which groups share capacities and which require isolation to ensure fairness and meet service-level agreements (SLAs). Use tools like the Chargeback app to track and allocate usage costs transparently. More on this is discussed in Part 4 - capacities governance.

In summary, **Phase 1** is about laying the groundwork: know what content is centrally managed, segment your architecture (data versus reports) to align with that, and plan which capacities host which pieces. By clearly delineating ownership and environments now, you make the next steps (capacity sizing and governance) much more straightforward.

## Phase 2: Measure, classify, and provision capacity by workload criticality

With a clear inventory of central versus distributed content, the next step is to **align capacity resources to the importance and usage patterns of each workload**. Not all content is equal - some is mission-critical while some is less important. It's best practice to **classify workloads into tiers** by criticality and SLA needs (for example: tier 1 - mission-critical, tier 2 - business operational, tier 3 - ad hoc/non-critical). Microsoft's [Fabric adoption roadmap](/power-bi/guidance/fabric-adoption-roadmap) guidance notes that the [governance](/power-bi/guidance/fabric-adoption-roadmap-governance) and [oversight](/power-bi/guidance/fabric-adoption-roadmap-system-oversight) should scale with the importance of the data. We extend that idea to capacity planning: higher-tier workloads deserve more dedicated and reliable capacity.

1. **Measure current usage (or pilot new workloads) to estimate needs:** For each central or managed solution, gather metrics on its resource consumption. If it's an existing solution (migrated from a previous system or from the earlier Fabric phases), use the [Fabric capacity metrics app](metrics-app.md) to assess [how much compute it uses](capacity-planning-troubleshoot-consumption.md). Key metrics to consider:
    - **Peak concurrent capacity unit (CU) usage:** What is the highest utilization observed during busy periods? (for example, the semantic model refresh at 6am plus users querying at 9am - did it hit, say 85% of the available capacity)
    - **Average steady-state usage:** Roughly [how many CUs does it consume on average](capacity-planning-troubleshoot-consumption.md)? This helps size for baseline load.
    - **Frequency and pattern of spikes for interactive operations:** Is usage spiky (suggesting need for headroom) or smooth?
    - **Per-item breakdown:** Identify which specific item consumes the most (perhaps one heavy pipeline or an AI notebook). The metrics app's item breakdown helps here.
    - If the solution is **new or not yet in production**, treat it like a POC/pilot: use approach outlined in "try out capacities" of part 2 of the series to estimate capacity requirements.

    Using these measurements, **estimate the capacity size required**. We recommend [taking the peak 30-second usage](plan-capacity.md) and ensuring the chosen size can accommodate it without exceeding limits. For instance, if your central finance dataset showed peaks of ~1500 CU/30s in testing, that implies an F64 (which provides 1920 CU/30s) would be a safer choice than F32 (960 CU). **"Scale up your capacity so that it covers your utilization"**, as the [Fabric docs](plan-capacity.md) put it. Remember to leave some buffer - running at 100% even occasionally can risk throttling.

1. **Align capacity to SLA tiers:** Now map those solutions to capacity plans:
    - **Tier 1 (mission-critical):** These get the most robust treatment. Plan for **dedicated capacity** for each tier 1 solution or cluster of related critical content. Ensure the size is large enough to handle peaks with plenty of headroom (for example, if peak is ~70% of an F64, that's good; if peak would be ~95%, go higher). You want minimal risk of delays or failures. As Microsoft advises, to fully protect critical solutions, **isolate them on a correctly sized capacity**. Use following checklist to ensure the mission-critical solutions have the capacities set up right way.
       - Dedicated large capacity.
       - Data processing is separated into different capacities and/or workspace.
       - Alert notifications are enabled for high utilization.
       - Dedicated admin and support team with a defined SLA that's reviewed quarterly.
       - Surge protection is enabled.
       - Capacity name identifies tier 1.
       - Proactive scaling for spikes.
       - Enough preapproved [Fabric quota](fabric-quotas.md) to scale up if needed.
       - Continuous monitoring and optimization.
    - **Tier 2 (business operational):** These important, widely used solutions aren't mission-critical. They can share medium-sized capacity; for instance, combine compatible tier 2 workloads on a single capacity. Ensure reliable performance but allow some risk (for example, occasional 90% utilization is acceptable with monitoring). Consolidate workloads with different usage patterns to avoid simultaneous spikes, and use the isolation strategies from Part 2 if resource contention arises - split them as needed.
    - **Tier 3 (non-critical/ad hoc):** For minor or sandbox workloads where occasional slowness is acceptable, prioritize cost efficiency over performance. Consolidate multiple tier 3 workspaces on a single smaller capacity (for example, use an F16 instead of several F4s for small projects), or if those are small Power BI semantic models or reports and if users have Power BI Pro licenses, use Power BI shared capacity. Avoid unnecessary spending on low-priority workloads. Shared capacity with governance, as outlined in Part 4, is sufficient.
1. **Organize by architectural patterns and operational processes:** For centrally managed content, another approach to planning involves considering architectural patterns such as data processing architectures versus reporting or consumption architectures, and operational processes like function or domain. Often, you separate capacities by environment (development versus production, as mentioned) but also separate by:
    - Separate capacities by **architectural patterns:** For large-scale solutions, it's essential to establish checks to ensure a solution meets specific tier requirements before onboarding. In enterprise reporting, separating ETL/ELT processes from reporting layers - using distinct workspaces for each - is often needed for mission-critical workloads. This separation allows for flexible resource allocation as needed. Heavy background processing (for example, Spark ETL jobs or AI training) should use different capacities than interactive report queries, since overlapping can cause performance issues. Review [Compute optimization by workload](optimize-capacity.md) for more information on each workload.
    - Separate capacities by **department or domain:** Separate capacities by department or domain even for central content delivery if needed. For example, a company might have an "Enterprise finance analytics" capacity distinct from "Enterprise operations analytics" capacity, each managed by the central team but serving different domains. This can simplify chargeback (finance pays for the capacity it uses) and contain issues - if one capacity overloads, it doesn't affect the other domain's content.
    - Separate capacities by **workload thresholds:** Each Microsoft Fabric workload has specific thresholds determined by capacity SKU size and license type. Ensure your chosen [SKU meets these requirements](sku-considerations.md); for instance, review [Fabric capacity requirements](../fundamentals/direct-lake-overview.md) when implementing semantic model. If the semantic model demands F128 capacity, begin with the F128 SKU.
1. **Use clear naming conventions for capacities** to reflect their purpose and criticality. This was a tip from Part 2 as well; for example, include "prod" versus "dev", or "tier 1" versus "tier 2" in the capacity names. An example scheme: _fabricprodtier1eu_ for a production, top-tier capacity in EU region. Good names make it easier for admins and support to instantly recognize what a capacity is for.

    > [!NOTE]
    > You can't change the Fabric capacity name once it's created. If you need to change the name, you must delete the existing capacity and create a new one.

1. **Provision and right-size capacities:** Acquire the capacities according to your plan. This might involve purchasing new Fabric capacities in the Azure portal or resizing existing ones:
    - Use the [**Fabric SKU estimator**](fabric-sku-estimator.md) tool as a check for your sizing - it can validate that an F128 truly seems needed versus F64, based on inputs. **But trust your actual usage metrics first and foremost**.
    - Whenever possible, [**start with smaller SKUs and scale up gradually**](optimize-capacity.md). You can always [scale up](scale-capacity.md) a capacity's size with minimal downtime. This incremental approach avoids over-allocating budget. For instance, you might start a new enterprise solution on F64, closely watch metrics for a month, then decide to scale to F128 if needed.

    > [!NOTE]
    > For Power BI workload, scaling up and down between F32 to F64 applies different licensing and may take some time. Similarly, scaling up or down between sizes smaller or equal to F256, and equal or higher than F512, might result in a slower experience.

    - Keep **mission-critical workloads separate from others on different capacities**. Using two medium capacities - one for mission-critical tasks and one for other workloads - is preferable to combining them on a larger capacity if their SLA needs differ. For instance, run tier 1 on an F64 and tier 2 on another F64 rather than both on a single F128. This way, issues with tier 2 don't affect tier 1. This approach might increase costs, so proper workload classification is necessary.

1. **Consider region, data residency and compliance:** When provisioning Microsoft Fabric capacities, it's essential to [**consider the tenant's home region**](../admin/find-fabric-home-region.md), as this determines where metadata and some customer data are stored by default. Organizations seeking flexibility should leverage [**multi-geo support**](../admin/service-admin-premium-multi-geo.md), which allows deploying capacities in different Azure regions to meet **local data residency requirements**. For compliance with the **EU Data Boundary (EUDB)**, both tenant and capacity must reside within EU/EFTA regions, or use Fabric Realms (the realm defines the boundaries within which metadata policies, data sharing, and security roles operate) to ensure colocation of metadata and customer data. Selecting a **capacity region different from the home region** ensures workspace data is stored in the chosen location, which is critical for regulatory alignment. Ultimately, **compliance depends on accurate configuration**. Misalignment between tenant and capacity regions can lead to noncompliance, especially in regulated industries.
1. **Communicate this capacity plan to stakeholders, and tie it to SLAs:** For each central solution, there should be an agreed capacity and associated performance expectation. For instance, "Enterprise sales semantic model runs on capacity X (F128), guaranteeing <8 s report load times for up to 100 concurrent users, and 99% availability" - whereas a less critical "Analytics sandbox" might have a note "hosted on a shared capacity Y; heavy usage may be throttled at peak times, not for mission-critical use." Setting these expectations manages risk and sets the stage for Phase 3, where we maintain and adjust capacities as needed.

## Phase 3: Maintain, monitor, and optimize enterprise capacities

Deploying the capacities isn't the end - it's the beginning of an **ongoing operational process**. Phase 3 focuses on **operational excellence** in capacity management. This includes proactive monitoring to catch issues early, iterative optimization to make the best use of the capacity you have, scaling or rearchitecting when needed to adjust the plan, and strong communication and governance to keep everyone aligned. In **Part 4** of the strategic capacities planning series, the article explores managing capacity growth and governance.

## Conclusion

By following these recommendations, organizations can confidently manage Fabric capacities at enterprise scale. The central mantra is **"align capacity to business priorities"** - ensure your most crucial data and analytics solutions always have the resources they need, and avoid paying for capacity that isn't used by lower-priority workloads.

Capacity planning is an ongoing discipline - as your organization's use of Fabric evolves, revisit and adjust your capacity strategy. With careful planning, vigilant monitoring, and adaptive governance, Microsoft Fabric can deliver reliable, performant analytics for everything from team dashboards to the company's most critical data applications.

> [!div class="nextstepaction"]
> [Part 4: Manage growth and governance](capacity-planning-manage-capacity-growth-governance.md)
