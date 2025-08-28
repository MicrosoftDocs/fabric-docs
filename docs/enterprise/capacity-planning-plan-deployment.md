---
title: 'Microsoft Fabric capacity planning guide: Plan your first deployment'
description: Learn how to plan Microsoft Fabric capacity for your first deployment. Discover strategies for budgeting, scaling, and optimizing your analytics solution.
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

# Microsoft Fabric capacity planning guide: Plan your first deployment

This article is **part 1** of the Microsoft Fabric capacity planning guide. It helps Microsoft Fabric capacity admins, tenant admins, Center of Excellence (COE) leads, and analytics team leaders plan Microsoft Fabric capacity for your organization's first deployment. Strategic capacity planning lets you budget, scale, and optimize your analytics solution from proof of concept to production.

## Scenario

An organization is evaluating Microsoft Fabric as a unified analytics platform. The Fabric tenant admin studies the [Microsoft Fabric Adoption Roadmap](/power-bi/guidance/fabric-adoption-roadmap). Now, they're ready to build their **first analytics solution** on Fabric, like a sales dashboard and data science solution, and need to [**plan for capacity**](plan-capacity.md): How many capacity units can they need? Should they start small or large? How should they budget for capacity as the project grows?

:::image type="content" source="media/capacity-planning/scenario.png" alt-text="Flowchart of a Microsoft Fabric analytics dashboard that shows capacity planning metrics.":::

## Guidance for Microsoft Fabric capacity planning

When you start with Fabric, it's smart to **start small, learn, and scale gradually**. The [Microsoft Fabric Adoption Roadmap](/power-bi/guidance/fabric-adoption-roadmap) recommends starting with early projects that involve much [**exploration and experimentation**](/power-bi/guidance/powerbi-implementation-planning-usage-scenario-prototyping-and-sharing). Use a trial or small capacity for a proof of concept, then gradually increase capacity as you move to pilot and production. This phased approach manages cost and risk, so you only invest in larger capacity when you have data to justify it.

## Phase 1: Proof of concept (POC)

In Phase 1, the goal is to **validate your solution idea on Fabric with minimal cost and risk**. You typically run a small-scale project to test Fabric's capabilities and get early feedback. Microsoft's adoption roadmap calls this the [**“Exploration” stage**](/power-bi/guidance/fabric-adoption-roadmap-maturity-levels) of a solution—characterized by experimentation, a narrow scope, and involvement of only a **small group of users**.

### Key actions in Phase 1

**Use the Free Trial Capacity:** Start with the **Microsoft** [**Fabric trial capacity**](../fundamentals/fabric-trial.md), which lasts 60 days and provides compute at no cost. This option is perfect for a POC. It lets you build and run Fabric content (Lakehouse, pipelines, and more) without buying capacity up front.

**Important:** Make sure the team reviews considerations, limitations, and FAQs for Trial Capacity during planning to avoid issues later. For example, check if the POC scope includes AI and Copilot, which region to create the trial capacity in, and which [region](../admin/region-availability.md) to use for pilot and production capacity. The types of items in the workspace can affect your ability to change license modes or move the workspace to a capacity in a different region. See [Moving data around](../admin/portal-workspaces.md) for details.

**Keep the Scope Narrow:** [Define a focused use case](/power-bi/guidance/fabric-adoption-roadmap-maturity-levels) for the POC. This use case might be a single report or a subset of data. Limit the data volume and user count so the trial capacity can easily handle it. Microsoft Fabric [adoption phase guidance](/power-bi/guidance/fabric-adoption-roadmap-maturity-levels) suggests a POC should be _"purposely narrow in scope… A small group of users test the proof of concept solution and provide feedback."_

**Isolate the POC Environment:** Use a dedicated workspace or capacity (preferably trial capacity) for the POC. This setup ensures you **don't impact any production systems** (if they exist) and clearly signals to users that this environment is a test.

:::image type="content" source="media/capacity-planning/isolate.gif" alt-text="Animation of isolating a proof of concept environment in Microsoft Fabric.":::

**Measure usage and feedback:** Even at this early stage, start using the [**Fabric Capacity Metrics app**](metrics-app.md) to monitor how the POC uses resources. Track the capacity units used during background and interactive operations like pipeline runs for data refreshes, or interactive report runs. Also, gather feedback from the POC users: Was their experience with the solution fast? Useful? Any issues? The combination of metrics and user feedback shows whether the solution approach works and guides improvements. If the trial capacity shows signs of strain (for example, approaching its limits), review the scope, simplify the POC, or plan for more capacity in the next phase. Typically, a POC on a trial runs comfortably if scoped right. 

## Phase 2: Development to pilot

Phase 2 involves **building out the full solution and testing it in a controlled pilot**. Now that the concept is proven, get a suitable capacity and onboard more users, but not the whole company. The objectives in this phase are to **properly size your capacity, finish development, and validate with a broader audience** before the big production launch.

### Key actions in Phase 2

**Estimate Required Capacity & Acquire It:** Based on POC learnings, estimate what capacity SKU you need for the full solution. Microsoft provides the [**Fabric SKU Estimator (Preview)**](fabric-sku-estimator.md) tool to help with this. You input expected data volumes, usage patterns, number of users, etc., and it suggests an SKU (for example, it might suggest an **F16** or **F32**). 

> [!NOTE]
> Fabric SKU Estimator is a starting point, not an absolute answer. As mentioned in [Evaluate and optimize your Microsoft Fabric capacity](optimize-capacity.md), capacity planning is a continuous exercise until you find the right balance between optimization and cost. It's always a good strategy to start small and then gradually increase the size as needed.

**Develop on a Separate Capacity:** It's best practice to do development and testing on a **non-production capacity**. This environment gives them more flexibility and since it's not the final production capacity, they can push it and even overload it using stress tests without impacting end users.

**Gradually Roll Out a Pilot:** With the solution fully built and internally tested, run a **pilot** on the smaller but separate capacity. Invite a larger set of users (for example, a particular department or 10-15% of the eventual user base) to use the solution in their day-to-day work. During the pilot, monitor the capacity closely using  [Fabric Capacity Metrics app](metrics-app.md) to [proactively monitor usage](capacity-planning-troubleshoot-consumption.md) during the rollout. Look for peak utilization percentages and any signs of **throttling** (the metrics app shows if any operations were delayed or dropped due to overuse). _Ideally, you want to see high but not maxed-out usage_. 

**Optimize and Fine-Tune:** Use the pilot phase to catch performance issues and optimize. If certain actions or times of day cause heavy load, adjust accordingly. When a capacity is under strain, it's [recommended to use one of the three strategies](optimize-capacity.md): **optimize content, scale up, or scale out**. During pilot, you mainly focus on [optimization](optimize-capacity.md) (tuning queries, repartitioning data, etc.) since scaling up or out comes when going production. By the end of the pilot, you should have a well-tuned solution and a clear idea of how much capacity is needed for the full launch.

:::image type="content" source="media/capacity-planning/optimize.gif" alt-text="Screenshot of optimizing capacity in Microsoft Fabric during pilot phase.":::

**Forecast for Production:** Analyze the pilot's data to extrapolate what happens with full user count. This can be as simple as linear scaling (4× more users might ~4× the load), but consider usage patterns - not everyone accesses it at once. 

> [!NOTE]
> We recommend [proactively monitoring using Capacity Metrics app](capacity-planning-troubleshoot-consumption.md) to [plan and decide capacity](plan-capacity.md): _"Scale up your capacity so that it covers your utilization"_ observed in pilot. In other words, pick a capacity size (also called SKU) where the highest usage from the pilot sits comfortably under 100 percent on that SKU.

## Phase 3: Pilot to production

In Phase 3, deploy your Fabric solution to a **production capacity** and open it to all intended users. Focus on reliability, performance, and governance at scale. Use what you learn to build a robust operational setup.

### Key actions in phase 3

**Scale up for production:** Switch to a **production capacity** that handles the full load. You might upgrade your pilot capacity or buy a new one at a higher SKU.

**Monitor continuously and set alerts:** When it's live, continuous [monitoring capacities](optimize-capacity.md) is critical. Use [the Fabric Capacity Metrics app](metrics-app.md) to monitor capacity usage and throttling events. Set up [notification](../admin/service-admin-premium-capacity-notifications.md) for capacity usage exceedance so admins or specified contacts get notified when usage exceeds the configured threshold. Use the [Capacity troubleshooting guide](capacity-planning-troubleshoot-errors.md) when admins get notified. Review [Monitor Capacities](throttling.md) to learn about bursting and smoothing.

**Use Fabric's auto-management features:** Fabric capacities have [bursting and smoothing](https://blog.fabric.microsoft.com/blog/fabric-capacities-everything-you-need-to-know-about-whats-new-and-whats-coming?ft=All) built in. Unlike traditional systems that stay within hard compute limits and let jobs wait, fail, or run suboptimally, capacities self-manage to some extent. Bursting lets jobs succeed, running at peak performance to finish fast. Smoothing spreads the cost of jobs over a longer time period, preventing scheduling issues. These features absorb occasional peaks. In production, you might notice some burst usage—it's fine if it's infrequent. Sustained overload still leads to [throttling](throttling.md). Use the [Microsoft Fabric Metrics app](metrics-app.md) to check if your capacity is throttling.

Bursting lets jobs run at peak performance. Fewer delays reduce the perception of slowness. Users are happier because jobs finish faster. Smoothing reduces the impact of spikes in compute. Pay for the compute from your future capacity. There's no need to schedule jobs after another one finishes.

:::image type="content" source="media/capacity-planning/burst-smooth.gif" alt-text="Animation that shows bursting and smoothing features in Microsoft Fabric capacity management.":::

**Continuous optimizations through Center of Excellence:** When a capacity is under strain, use one of three strategies: optimize content, scale up, or scale out. Even in production, optimization doesn't stop. Keep looking for ways to improve efficiency. Follow [optimization](optimize-capacity.md) best practices for each workload like Power BI, Warehouse, Spark, and Data Factory. Use community practices like [Center of Excellence](/power-bi/guidance/fabric-adoption-roadmap-center-of-excellence) to encourage others to use best practices and achieve excellence through communities in organizations. Over time, solutions change—more data, more users, new reports—so ongoing tuning helps capacity keep up without frequent upgrades.

:::image type="content" source="media/capacity-planning/scale-up.gif" alt-text="Animation that shows scaling up capacity in Microsoft Fabric.":::

**Plan for scale-up or scale-out:** As adoption grows, plan a strategy for scaling. If more users or projects join, decide whether to [scale up](optimize-capacity.md) the existing capacity (for example, go from F32 to F64) or [scale out](optimize-capacity.md) by adding another capacity and splitting workloads. See [Optimize Capacity](optimize-capacity.md) for guidance on scale up versus scale out. Scaling up is straightforward—one bigger pool for everything. Scaling out gives isolation. Using multiple capacities is a good way to isolate compute for high-priority items and for self-service or development content.

:::image type="content" source="media/capacity-planning/scale-out.gif" alt-text="Animation that shows scaling out capacity in Microsoft Fabric.":::

**Implement governance:** Running in production means setting up governance and management processes. Assign clear responsibility for capacity monitoring (who checks metrics and when). Use [surge protection](surge-protection.md) (a Fabric feature that automatically protects against background over usage) as a safety net. Governance can also include regular reviews with stakeholders about capacity costs and needs, like monthly reports showing how the capacity is used to justify ROI.

## Conclusion

By following this three-phase approach, organizations introduce Microsoft Fabric in a controlled, cost-effective way and build confidence in their capacity planning. This approach sets a strong foundation for expanding Fabric to more solutions. Later articles in this series cover those topics.

The next articles cover advanced capacity planning topics like scaling strategies for multiple solutions, cost management, and capacity governance at enterprise scale. Now that your first Fabric solution is running, you've navigated the journey from POC to production, and you're ready to build on this success.

## Next step

> [!div class="nextstepaction"]
> [Part 2: Scale self-service analytics](capacity-planning-scale-self-service-analytics.md)