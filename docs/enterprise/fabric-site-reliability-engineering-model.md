---
title: Site reliability engineering (SRE) model
description: Learn how the Microsoft Fabric site reliability engineering (SRE) model keeps the service reliable with safe deployment, monitoring, and rapid incident response.
author: dknappettmsft
ms.author: daknappe
ms.topic: concept-article
ms.date: 07/14/2026
ai-usage: ai-assisted

#customer intent: As a Fabric customer, I want to understand the Fabric team's site reliability engineering practices so that I know how Fabric maintains service reliability and responds to incidents.
---

# Microsoft Fabric site reliability engineering (SRE) model

The Microsoft Fabric site reliability engineering (SRE) model is the Fabric team's approach to maintaining a reliable, performant, and scalable service for customers. It gives you transparency into how Fabric minimizes service disruption through safe deployment, continuous monitoring, and rapid incident response.

This article describes how the Fabric team monitors service health, mitigates incidents, and acts on necessary improvements. Other operational aspects, such as security and release management, are outside the scope of this article. The techniques described here also provide a blueprint for teams that host service-based solutions to build foundational live site processes that are efficient and effective at scale.

The Fabric team ships weekly feature updates to the service and on-demand targeted fixes to address service quality issues. The release process includes a comprehensive set of quality gates: code reviews, ad-hoc testing, automated component-based and scenario-based tests, feature flighting, and regional safe deployment. However, even with these safeguards, live site incidents can and do happen.

Live site incidents fall into several categories:

* Dependent-service issues such as Microsoft Entra ID, Azure SQL, Storage, virtual machine scale set, Service Fabric.

* Infrastructure outage such as a hardware failure, data center failure.

* Fabric environmental configuration issues such as insufficient capacity.

* Fabric service code regressions.

* Customer misconfiguration such as insufficient resources and bad queries or reports.

Reducing incident volume is one way to decrease live site burden and to improve customer satisfaction. However, doing so isn't always possible given that some of the incident categories are outside the team's direct control. Furthermore, as the service footprint expands to support growth in usage, the probability of an incident occurring due to external factors increases. High incident counts can occur even when the Fabric service has minimal service code regressions and meets or exceeds its service level objective (SLO) for overall reliability of 99.95%. This situation leads the Fabric team to devote significant resources to reducing incident impact.

## Live site incident process

When investigating live site incidents, the Fabric team follows a standard operational process that's common across Microsoft and the industry. The following image summarizes the standard live site incident handling lifecycle.

:::image type="complex" source="media/fabric-site-reliability-engineering-model/site-reliability.png" alt-text="A diagram of Fabric's site incident process, including service monitoring, incident response, and continuous improvement.":::
   The diagram shows a continuous, three-phase loop for handling live site incidents. Phase 1, service monitoring, defines service level indicators and service level objectives and triggers an alert when a violation occurs. Phase 2, incident response, notifies affected customers, analyzes affected components, and mitigates the impact. Phase 3, continuous improvement, completes postmortem analysis and prioritizes fixes in the engineering backlog. The output of Phase 3 feeds back into Phase 1, forming a repeating cycle.
:::image-end:::

* **Phase 1: Service monitoring** - The SRE team works with engineers, program managers, and the senior leadership team to define service level indicators (SLIs) and service level objectives (SLOs) for both major scenarios and minor scenarios. These objectives apply to different metrics of the service, including reliability scenarios and components, performance (latency) scenarios and components, and resource consumption. The live site team and product team then craft alerts that monitor service level indicators (SLIs) against agreed upon targets. When violations occur, an alert triggers an investigation.

* **Phase 2: Incident response** - The Fabric team structures its processes to achieve the following results:

    * Prompt and targeted notifications to customers of any relevant impact. For more information, see [Time To Notify Zero](#time-to-notify-zero) and [Stay informed about service issues](#stay-informed-about-service-issues).

    * Analysis of affected service components and workflows

    * Targeted mitigation of incident impact

* **Phase 3: Continuous improvement** - Completion of relevant post-mortem analysis and resolution of any identified process, monitoring, or configuration or code fixes. The team then prioritizes the fixes against its general engineering backlog based on overall severity and risk of reoccurrence.

## Service monitoring practices

The Fabric team emphasizes a consistent, data-driven, and customer-centric approach to its live site operations. Defining service level indicators (SLIs) and implementing corresponding live site monitoring alerts are part of the approval criteria for enabling any new Fabric feature in production. Product group engineers also include steps for investigation and mitigation of alerts when they occur using a template troubleshooting guide (TSG). Product group engineers then present those deliverables to the site reliability engineering (SRE) team.

One way the Fabric team enables exponential service growth is by using an SRE team. These individuals are skilled in service architecture, automation, and incident management practices, and they join incidents to drive end-to-end resolution. This approach contrasts with the rotational model where engineering leaders from the product group take on an incident manager role for only a few weeks per year. The SRE team ensures that a consistent group of individuals are responsible for driving live site improvements and ensuring that the team incorporates learnings from previous incidents into future escalations. The SRE team also assists with large-scale drills that test business continuity and disaster recovery (BCDR) capabilities of the service.

SRE team members use their unique skill set and considerable live site experience, and they also partner with feature teams to enhance SLIs and alerts that the product team provides in numerous ways. Some of the ways they enhance SLIs include:

* **Anomaly alerts** - SREs develop monitors that consider typical usage and operational patterns within a given production environment and alert when significant deviations occur. *Example: Semantic model refresh latency increases by 50% relative to similar usage periods*.

* **Customer/environment-specific alerts** - SREs develop monitors that detect when specific customers, provisioned capacities, or deployed clusters deviate from expected behavior. *Example: A single capacity owned by a customer is failing to load semantic models for querying*.

* **Fine-grained alerts** - SREs consider subsets of the population that might experience issues independently of the broader population. For such cases, SREs craft specific alerts to ensure that alerts fire if those less common scenarios fail despite lower volume. *Example: Semantic models that use the GitHub connector are failing to refresh*.

* **Perceived reliability alerts** - SREs also craft alerts that detect cases when customers are unsuccessful due to any type of error. This detection can include failures from user errors and indicate a need for improved documentation or a modified user experience. These alerts can also notify engineers of unexpected system errors that engineers might otherwise misclassify as a user error. *Example: Semantic model refresh fails due to incorrect credentials*.

Another critical role of the SRE team is to automate TSG actions to the extent possible through Azure Automation. In cases where complete automation isn't possible, the SRE team defines actions to enrich an alert with useful and incident-specific diagnostic information to accelerate subsequent investigation. The SRE team pairs such enrichment with prescriptive guidance in a corresponding TSG so that live site engineers can either take a specific action to mitigate the incident or quickly escalate to SMEs for additional investigation.

As a direct result of these efforts, Fabric mitigates more than 82% of incidents without any human interaction. The remaining incidents have enough enrichment data and supporting documentation for engineers to handle them without SME involvement in 99.7% of cases.

Live site SREs also enforce alert quality in several ways, including the following:

* Ensuring that TSGs include impact analysis and escalation policy.

* Ensuring that alerts execute for the absolute smallest time window possible for faster detection.

* Ensuring that alerts use reliability thresholds instead of absolute limits to scale clusters of different size.

## Incident response practices

When an automated live site incident is created for the Fabric service, one of the first priorities is to notify customers of potential impact. Azure has a target notification time of 15 minutes, which is difficult to achieve when incident managers manually post notifications after joining a call. Communications in such cases are at risk of being late or inaccurate due to required manual analysis. Azure Monitor offers centralized monitoring and alerting solutions that, based on certain metrics within this time window, can detect possible impact. However, Fabric is a SaaS offering with complex scenarios and user interactions that such alerting systems can't easily model and track. In response, the Fabric team developed the [Time To Notify Zero (TTN0)](#time-to-notify-zero) notification service.

Fabric's live site philosophy emphasizes automated resolution of incidents to improve overall scalability and sustainability of the SRE team. The emphasis on automation enables mitigation at scale and can avoid costly rollbacks or risky expedited fixes to production systems. When manual investigation is required, Fabric adopts a tiered approach in which a dedicated SRE team does the initial investigation. SRE team members are experienced in managing live site incidents, facilitating cross-team communication, and driving mitigation. In cases where the acting SRE team member requires more context on an impacted scenario/component, they might engage the subject matter expert (SME) of that area for guidance. Finally, the SME team conducts simulations of system component failures to understand and to mitigate issues in advance of an active live site incident.

Once the affected component or scenario of the service is determined, the Fabric team has multiple techniques for quickly mitigating impact. Some of them are:

* **Activate side-by-side deployment infrastructure** - Fabric supports running different versioned workloads in the same cluster, allowing the team to run a new (or previous) version of a specific workload for certain customers without triggering a full-scale deployment (or rollback). The approach can reduce mitigation time to 15 minutes and lower overall deployment risk.

* **Execute business continuity/disaster recovery (BCDR) process** - Allows the team to fail over primary workloads to this alternate environment in three minutes if a serious issue arises in a new service version. You can also use BCDR when environmental factors or dependent services prevent the primary cluster/region from operating normally.

* **Leverage resiliency of dependent services** - Fabric proactively evaluates and invests in resiliency and redundancy efforts for all dependent services (such as SQL, Azure Cache for Redis, Azure Key Vault). Resiliency includes sufficient component monitoring to detect upstream and downstream regressions as well as local, zone, and regional redundancy (where applicable). Investing in these capabilities ensures that tooling exists for automatic or manual triggering of recovery operations to mitigate impact from an affected dependency.

### Time To Notify Zero

Time To Notify Zero, also known as *TTN0*, is a fully automated incident notification service that uses internal Fabric alerting infrastructure to identify the specific scenarios and customers that a newly created incident affects. TTN0 also integrates with external monitoring agents outside of Azure to detect connectivity issues that might otherwise go unnoticed. TTN0 sends customers an email when it detects a service disruption or degradation. With TTN0, the Fabric team can send reliable, targeted notifications within 10 minutes of impact start time (which is 33% faster than the Azure target). Because the solution is fully automated, there's minimal risk from human error or delays.

### Stay informed about service issues

Fabric keeps you informed when a service issue affects your environment, so you can respond quickly and keep stakeholders updated. Fabric uses several message types to communicate service issues, depending on how Fabric detects an issue and where it surfaces the information:

* **Service interruption** - An issue identified through monitoring systems or other detection methods. You might see it on supported surfaces such as in-product banners, Teams, email (when enabled), or the Service Health dashboard.

* **Service status message** - A high-level message about service degradation or an outage affecting a specific scenario or region. You see it on the Fabric Support page.

* **Service health message** - A message for customers affected by a service degradation or outage. You see it on the Service Health dashboard in the Fabric admin portal.

The following ways to stay informed are in preview:

* **In-product banners (preview)** - When a service issue affects your environment, a banner notification might appear on relevant Fabric pages with available information about potential impact and status. The banner updates as new information becomes available. You can dismiss the banner at any time, and it might reappear with the latest updates. When multiple issues are active, the banner prioritizes the most recent updates.

* **Teams and email notifications (preview)** - Microsoft Teams and email also deliver service interruption updates, similar to the in-product banner. These notifications are off by default, and a Fabric admin can enable them for your organization. For more information, see [Fabric service interruption notifications](../admin/service-interruption-notifications.md).

* **Service Health dashboard (preview)** - The Fabric admin portal includes a dedicated Service Health page that provides a centralized view of service health activity, including available information about active issues and recent incidents. The dashboard is available at **Admin Portal** > **Help + Support** > **Service Health**, and it complements the existing Microsoft 365 admin center health view. Only users who can create support cases to Microsoft customer support can view the Service Health messages. For more information, see [Track Fabric service health and known issues](/power-bi/support/service-admin-health).

Fabric admins control notifications through two independent settings in the admin portal: in-product banners, and Teams and email notifications. Service issue visibility, notifications, and timing depend on supported scenarios, configuration, and available system data. The Fabric team is working to expand automated issue detection to more Fabric workloads beyond Power BI.

## Continuous improvement practices

The Fabric team reviews all customer-impacting incidents during a weekly service review with representation from all engineering groups that contribute to the Fabric service. The review disseminates key learnings from the incident to leaders across the organization and provides an opportunity to adapt its processes to close gaps and address inefficiencies.

Before review, the SRE team prepares postmortem content and identifies preliminary repair items for the live site team and product development team. Items might include code fixes, augmented telemetry, or updated alerts or TSGs. Fabric SREs are familiar with many of these areas and often proactively make the adjustments in real time while responding to an active incident. Doing so helps ensure that the system incorporates changes in time to detect reoccurrence of a similar issue. In cases where an incident results from a customer escalation, the SRE team adjusts existing automated alerting and SLIs to reflect customer expectations. For the small number of incidents that require escalation to a subject matter expert (SME) of the impacted scenario/component, the Fabric SRE team reviews ways in which the team could handle the same incident (or similar incidents) without escalation in the future. The detailed analysis by the SRE team helps the product development team design a more resilient, scalable, and supportable product.

Beyond review of specific postmortems, the SRE team also generates reports on aggregate incident data to identify opportunities for service improvement such as future automation of incident mitigation or product fixes. The reporting combines data from multiple sources, including the customer support team, automated alerting, and service telemetry. The consolidated view provides visibility into those issues that are most negatively impacting service and team health, and the SRE team then prioritizes potential improvements based on overall benefit to service reliability. For example, if a particular alert is firing too frequently or generating disproportionate impact on service reliability, the SRE team can partner with the product development team to invest in relevant quality improvements. Completing these work items drives improvement to service and live site metrics and directly contributes to organizational objective key results (OKRs). In cases where the team consistently meets an SLI for a long time, the SRE team might suggest increases to the service SLO to provide an improved experience for customers.

## Objective key results (OKRs)

The Fabric team uses a comprehensive set of objective key results (OKRs) to ensure overall service health and customer satisfaction. OKRs fall into two categories:

* **Service health OKRs** - These OKRs directly or indirectly measure the health of scenarios or components in the service. Monitoring or alerting often tracks them. *Example: A single capacity owned by a customer fails to load semantic models for querying*.

* **Live site health OKRs** - These OKRs directly or indirectly measure how efficiently and effectively live site operations address service incidents and outages. *Example: Time to notify (TTN) customers of an impacting incident*.

The time the Fabric team takes to react to incidents - measured by time to notify (TTN), time to alert (TTA), and time to mitigate (TTM) - consistently meets or exceeds targets. Alert automation directly correlates with the team's ability to sustain exponential service growth, while continuing to meet or exceed target response times for incident alerting, notification, and mitigation.

The Fabric live site team and the senior leadership team actively track these OKRs to ensure that the team continues to meet or exceed the baseline required to support substantial service growth, maintain a sustainable live site workload, and ensure high customer satisfaction.

## Related content

* [Microsoft Fabric concepts and licenses](licenses.md)
* [Microsoft Fabric features parity](fabric-features.md)
