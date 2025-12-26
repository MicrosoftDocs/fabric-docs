---
title: 'Microsoft Fabric Capacity Planning Guide: Manage Growth and Governance'
description: Learn how to plan, scale, and govern Microsoft Fabric capacity for analytics solutions.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: cnovak
ms.topic: troubleshooting
ms.date: 09/04/2025
ai-usage: ai-assisted
---

# Microsoft Fabric capacity planning guide: Manage growth and governance

This article is **part 4** of the Microsoft Fabric capacity planning guide. It helps Microsoft Fabric tenant admins, capacity admins, and Center of Excellence (COE) leads govern and scale Microsoft Fabric capacities effectively. The article outlines **best practices for two scenarios**: **self-service (decentralized)** and **centralized** content, followed by **common practices applicable to both**.

When multiple business units use Fabric in a self-service model, strong **governance and communication** is key to sustainable capacity management. In centralized content management, Enterprise solutions and managed self-service solutions require continuous monitoring and governance to ensure they meet service-level agreements (SLAs) and adapt to changing demands.

## Self-service (decentralized) capacities

In decentralized self-service environments, multiple business units share the same capacity. Governance focuses on **empowering users with guardrails** to prevent cross-team interference.

- **Leverage center of excellence (COE) to optimize and educate continuously:** Confirm the roles and responsibilities so it's clear what action is taken, why, when, and by whom. If not already, [establish a COE](/power-bi/guidance/fabric-adoption-roadmap-center-of-excellence) that includes IT admins and power users from each business domain to define capacity policies and share best practices. The COE supports self-service users, enforces guidelines, and offers [training](/power-bi/guidance/fabric-adoption-roadmap-mentoring-and-user-enablement) to optimize resource usage. It helps build a [community of practice](/power-bi/guidance/fabric-adoption-roadmap-community-of-practice) in the organization, and implements endorsements and shortcuts to reduce redundancies. They also ensure projects meet standards before launch and onboarding new solutions. Encourage each team to follow best practices that reduce capacity usage. Invest in [training business units](/power-bi/guidance/fabric-adoption-roadmap-mentoring-and-user-enablement) to understand capacity metrics, perform periodic cleanups, and use development best practices. Empowered, knowledgeable users help maintain system efficiency and support the balance between self-service and governance.
- **Define and communicate "fair use" guidelines:** Document what's acceptable on shared capacities (for example, refresh frequency limits and data volume caps). Communicate these to all teams and the **consequences for misuse**. For example, if a department consistently overloads the capacity, they might be moved to a quarantine capacity or required to optimize their solution. A **center of excellence (COE)** helps craft and socialize these rules, providing a unified governance voice across departments.
- **Implement chargeback or showback:** Use the [Fabric chargeback app](chargeback-app.md) to attribute capacity usage to each department, promoting transparency even if actual cross-billing isn't implemented, for instance, that Marketing consumed X% of resources translating to $Y of the monthly capacity cost. This often encourages optimization and prudent usage. Showing departments their resource "bill" encourages more efficient usage. It also makes cost discussions easier: when requesting more capacity, you can show which groups bear the cost and can help fund more capacity as adoption grows.
- **Set continuous capacity monitoring and reporting:** Treat the [Fabric capacity metrics app](metrics-app.md) as the source for operational key performance indicators (KPIs). [Monitor capacities regularly](capacity-planning-troubleshoot-consumption.md) and proactively share utilization reports with stakeholders. For example, share a monthly report showing each capacity's utilization, any throttling incidents, and top-consuming workspaces. Transparent reporting helps identify heavy users, justify capacity upgrades, and keep content owners informed about their impact.
- **Plan gradual scale-out:** **Don't wait for constant contention to add capacity.** As more departments onboard or overall usage rises, plan to **scale up or add another capacity**. Also understand that scaling up always doubles stock-keeping unit (SKU) size, so it might not be suitable for every scenario. For example, if a single capacity runs consistently above ~80% during peak times, consider splitting workloads (for example, Finance moves to a new capacity) or upgrading the size (if the budget allows doubling the size). Make scaling decisions part of your governance check-ins. For example, quarterly, decide if usage trends warrant purchasing more capacity. This way, capacity supply keeps pace with demand in a controlled fashion.

> [!NOTE]
> Each Microsoft Fabric workload has specific thresholds determined by capacity SKU size and license type. Ensure your chosen [SKU meets these requirements](sku-considerations.md).

## Enterprise (centralized) capacities

In centralized environments, a core IT or COE team is responsible for managing essential content, including enterprise business intelligence and managed self-service applications. Governance is implemented through formal mechanisms, emphasizing **stringent service level agreements (SLAs), proactive oversight, and hierarchical supervision**. It's recommended that organizations consistently maintain, administer, and enhance their enterprise capacities. The following guidelines are vital for mission-critical (tier 1) solutions, yet they remain relevant to other high-priority business operational (tier 2) and select noncritical ad-hoc (tier 3) solutions as well.

- **Enforce capacity oversight & SLA:** [Assign a capacity admin or team](/power-bi/guidance/fabric-adoption-roadmap-system-oversight) [to manage each key capacity](../admin/capacity-settings.md). They monitor usage, handle incidents, plan upgrades, and ensure SLAs are met - like uptime and query speed for executive reports. If metrics risk breaching SLAs, admins must escalate actions (such as optimizing or scaling up). Include SLA adherence in regular ops meetings or reports. Manage enterprise capacities with IT-level discipline to ensure reliable performance and maintain platform trust.
- **Implement proactive scaling for spikes:** Usage can spike unexpectedly. Pausing settles any overuse as a one-time billing event through pay-as-you-go charges, effectively resetting usage and preventing throttling. Scheduled capacity resizing - such as scaling up at the end of a quarter and back down after - can be automated with [Fabric CLI](/rest/api/fabric/articles/fabric-command-line-interface), [Azure Automation](pause-resume.md), or [Fabric’s REST APIs](/rest/api/microsoftfabric/fabric-capacities) to manage predictable surges. F SKUs are flexible, allowing both resizing and pausing as needed.
- **Combine RI / Pay Go:** Use reserved instance (RI) for discounts on pricing when possible, and supplement it [**pause/resume/resize**](pause-resume.md) of the capacity with pay-as-you-go pricing for flexibility. For predictable surges, compare costs: scaling up with pay-as-you-go for occasional peaks (for example, you have a F64 as RI, using F128 on Mondays by adding pay-as-you-go F64) can be cheaper than buying extra RI. However, if added capacity is needed more than four days a week, RI can offer better value.

  > [!NOTE]
  > Background operations are smoothed over 24 hours. So, if a large job or set of jobs is executed, you should ensure the smoothed usage is well below the set threshold of your capacity at lower size. For example, the smoothed capacity usage of F128 capacity should be <40% in order for it to be 80% when you scale it down to F64 and ensure it's not throttled at the F64 size.

- **Use surge protection for interactive workloads:** Enable [**surge protection**](surge-protection.md) in capacity settings when user-facing queries (for example, reports) share capacity with background tasks (for example, refreshes, AI jobs). It helps prioritize interactive workloads by limiting background compute when 24-hour usage is high. Remember, 
  - **Surge protection is not a substitute** for proper capacity sizing or content optimization
  - When active, it **rejects background jobs** to protect user experience - these can be delayed or need reruns.
  - **Many interactive operations like SQL query** are also considered background and might be rejected. For more information, see [Fabric operations](fabric-operations.md).
  - **Critical workloads** still require **dedicated capacity** for full protection.
- **Implement [Azure quotas](fabric-quotas.md) for Fabric capacities:** Based on resource groups and organizational structure, it's best to create multiple subscriptions, since subscription quotas apply to all resources within each subscription. Plan logical or organizational unit level separation accordingly. After determining the number of subscriptions and sizes of Fabric capacities required, allow a 25%-50% buffer for peak usage or throttling. Set quotas in the Azure portal based on this assessment.

## Common best practices (both scenarios)

Some governance practices apply universally, whether content is self-service or centrally managed. These practices ensure efficient and reliable capacity usage:

- **Monitor capacity utilization continuously:** Regardless of the scenario, **visibility into capacity performance is essential**. Make the [**Fabric capacity metrics app**](metrics-app.md) your compass for each capacity's health. Regularly check the **utilization charts and tables** to [see how each capacity is performing](capacity-planning-troubleshoot-consumption.md). Key metrics to monitor:
  - **Trends in CU usage**: [Check if the capacity frequently runs near its limit](capacity-planning-troubleshoot-consumption.md). Identify times of day or specific operations that spike usage.
  - **Throttling or delays**: The metrics app's charts and system events show if any operations are [throttled](throttling.md), delayed, or rejected due to overuse. Ideally, this stays at 0; if not, note when and why it's happening.
  - **Top consumers** – Identify which workspaces or items (semantic models, Spark jobs, etc.) are consuming the most capacity units (CUs). This can highlight an outlier that might need [optimization](optimize-capacity.md) or isolation.
  - **Underutilization**: Note if a capacity is mostly idle (for example, never above 30% usage). This might indicate an opportunity to consolidate workloads and reduce costs. 
  - **Alerts:** [Set up alerts](../admin/service-admin-premium-capacity-notifications.md) so you get notified when thresholds are crossed. For example, you can enable the tenant setting to alert admins if a capacity becomes overloaded or an outage occurs. 

  The goal is to address issues proactively: if you notice a pattern of heavy usage, act _before_ users complain.

- **Forecast and adjust capacity:** Conduct periodic evaluations, such as monthly or quarterly, to ensure capacity allocation aligns with current usage requirements.
  - If peak usage for a particular capacity is steadily increasing (for example, 60% → 75% → 90%), it's advisable to scale up to the next SKU before reaching full utilization. Analyze usage trends to accurately predict when scaling is necessary; this might involve upgrading from F32 to F64 or expanding capacity by adding more units to distribute workloads more effectively.
  - On the other hand, if a capacity is consistently underutilized (with peak usage remaining below 30%), consider consolidating workloads onto it or scaling down to optimize costs provided service-level agreements are upheld.
  - Utilize collected data - including metrics applications and logs - for capacity forecasting. For instance: "Following an increase of 50 users last quarter, peak CU rose by 20%. We anticipate onboarding 100 more users next quarter, which suggests an approximate 40% CU increase; therefore, upgrading from F64 to F128 would be prudent." This approach facilitates proactive procurement and budgeting.
  - Ensure compliance with regional data residency requirements during new project expansions. If the organization establishes a new branch that uses central analytics resources, review [multigeo capacities](../admin/service-admin-premium-multi-geo.md) accordingly.
  - Each Microsoft Fabric workload has specific thresholds determined by capacity SKU size and license type. Ensure your chosen [SKU meets these requirements](sku-considerations.md). For instance, review [Fabric capacity requirements](../fundamentals/direct-lake-overview.md) when implementing semantic model. If the semantic model demands F128 capacity, begin with the F128 SKU.
- **Optimize before scaling:** Always [optimize workloads](optimize-capacity.md) before increasing capacity. Inefficiencies result in unnecessary costs, so ensure operations run efficiently. Performance tuning might be supported by central IT or the COE. For instance:
  - Optimize slow Power BI measures or SQL queries, seeking COE best-practice advice.
  - Reschedule consecutive pipelines to avoid resource peaks.
  - Use incremental refresh for large semantic models when possible.
  - Train report authors to use precise filters and limit large ad-hoc data pulls.

  Once capacity use is efficient, scale proactively for increased demand. Don't wait for full utilization or complaints. Disciplined management ensures investments meet real needs, whether under centralized or decentralized models, emphasizing optimal resource use. In short: **optimize first, expand only when necessary**.

- **Use chargeback for accountability:** Chargeback tracks departmental usage of shared capacity for transparency, whether in decentralized or centralized models. It attributes costs to business sponsors and shows return on investment (ROI), such as usage percentages by Finance and Sales, via the [Fabric chargeback app](chargeback-app.md). Departments might need to invest in more resources if usage rises, with chargeback data supporting decisions. Knowing their usage is monitored encourages users to adjust behavior, like avoiding heavy tasks during peak times. Chargeback also informs budget discussions when increased demand from a department requires new capacity.
- **Follow COE or central team governance to avoid silos:** Having a central body (be it a formal [COE](/power-bi/guidance/fabric-adoption-roadmap-center-of-excellence), the IT admin team, or a "capacity council") is a best practice for all setups. This group's role is to keep an eye on the **big picture** – ensuring one department's decisions or one project's needs align with the organization's capacity strategy. In self-service, the COE provides guidance, training, and mediation (they help users help themselves but step in when needed). In centralized, the COE/IT team is the de facto owner of capacity, enforcing standards and processes. In both, the COE can facilitate knowledge sharing (best practices, successes) and align capacity management with business objectives. For example, they might create a governance report combining metrics from all capacities, to share quarterly with leadership. They ensure that whether capacity is spread across teams or centrally, there's a **holistic strategy and oversight** rather than siloed decision-making.

## Conclusion

By adopting robust growth and governance practices, Fabric administrators ensure that capacity expands in alignment with user adoption, accommodates more users and projects without compromising performance, and avoids exceeding budgetary constraints. In decentralized environments, effective governance mitigates noisy neighbor situations and fosters a well regulated, supportive self-service system. In centralized environments, diligent management preserves high service standards required for mission critical analytics. Adhering to recognized best practices - including monitoring, technical safeguards, transparency, optimization, and comprehensive oversight - cultivates a culture of capacity management that is data driven, proactive, and collaborative. As a result, all users benefit from a stable, efficient Fabric platform, even as workloads scale.

## Related content

- [Plan your Microsoft Fabric capacity: Strategic guide overview](capacity-planning-overview.md)
- [Plan your deployment](capacity-planning-plan-deployment.md)
- [Scale for decentralized analytics](capacity-planning-scale-self-service-analytics.md)
- [Scale for centralized analytics](capacity-planning-enterprise-managed-self-service-solutions.md)