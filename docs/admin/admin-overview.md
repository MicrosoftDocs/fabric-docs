---
title: Microsoft Fabric Admin Overview - Tools, Portal, and Settings
description: Microsoft Fabric administration covers tenant settings, the admin portal, licensing, and governance. Learn how to configure and manage your Fabric environment.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 04/21/2026

#customer intent: As a Fabric administrator, I want to understand admin tools, tasks, and settings so that I can effectively manage my organization's Fabric environment.

---

# What is Microsoft Fabric administration?

Microsoft Fabric administration is the set of tasks and tools you use to configure, secure, and govern the Fabric software as a service (SaaS) platform across your organization. As an admin, you control tenant-wide settings, manage feature access to meet company policies and regulations, and delegate responsibilities so no single team becomes a bottleneck.

This article describes admin responsibilities, tools, and key tasks for managing your Fabric environment.

## Microsoft Fabric admin responsibilities

This article uses the generic term "admin." For details about which types of admins can perform specific tasks, see [Understand Fabric admin roles](roles.md), [Microsoft Entra built-in roles](/entra/identity/role-based-access-control/permissions-reference), and [Microsoft 365 admin roles](/microsoft-365/admin/add-users/about-admin-roles).

An admin is responsible for managing the organization's Microsoft Fabric environment, including:

* **Administration**—Manage and operate the Fabric platform—configure tenant and workspace settings, control features and access, allocate resources, and monitor usage and activity. Details about these tasks are covered in this Fabric administration documentation.
* **Security**—Help safeguard data with identity, access, encryption, and network protection settings. See the [Fabric security documentation](../security/index.yml) for details.
* **Governance**—Define and enforce policies for data access, sharing, classification, and auditing. See the [Fabric governance documentation](../governance/index.yml) for details.

Admins ensure that Microsoft Fabric operates according to organizational policies and external regulations while enabling users to access and use the platform effectively.

## Admin tasks and tools for Microsoft Fabric

Your role determines which admin responsibilities and tools you can access.

| Responsibility | Management tools |
|--------------|------------------|
| Data classification | Microsoft Purview |
| Data loss prevention | Microsoft Purview |
| Activity auditing | Compliance portal |
| Conditional access | Microsoft Entra ID |
| Tenant-level monitoring | Admin portal monitoring workspace |

Microsoft Fabric admins work mostly in the Microsoft Fabric admin portal, but you should be familiar with related admin tools. To find out which role is required to perform these tasks, see [Understand Fabric admin roles](roles.md).

* **[Microsoft Fabric admin portal](#what-is-the-admin-portal)**
  * Acquire and work with capacities
  * Ensure quality of service
  * Manage workspaces
  * Publish visuals
  * Verify codes used to embed Microsoft Fabric in other applications
  * Troubleshoot data access and other issues

* **[Microsoft 365 admin portal](https://admin.microsoft.com)**
  * Manage users and groups
  * Purchase and assign licenses
  * Block users from accessing Microsoft Fabric

* **[Microsoft 365 Security & Microsoft Purview compliance portal](https://protection.office.com)**
  * Review and manage auditing
  * Data classification and tracking
  * Data loss prevention policies
  * Microsoft Purview Data Lifecycle Management

* **[Microsoft Entra ID in the Azure portal](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/TenantOverview.ReactView)**
  * Configure conditional access to Microsoft Fabric resources

* **[PowerShell cmdlets](/powershell/power-bi/overview)**
  * Manage workspaces and other aspects of Microsoft Fabric using scripts

* **[Administrative APIs and SDK](/rest/api/fabric/articles/using-fabric-apis)**
  * Build custom admin tools.

## What is the admin portal?

The admin portal includes settings that govern Microsoft Fabric. For example, you can change [tenant settings](tenant-settings-index.md), access the Microsoft 365 admin portal, and control how users interact with Microsoft Fabric.

To access the admin portal, you need a [Fabric license](../enterprise/licenses.md#per-user-licenses) and the **Fabric administrator** role.

If you're not in one of these roles, you only see **Capacity settings** in the admin portal.

### Admin portal features

The admin portal controls are listed in the following table, with links to relevant documentation.

| Feature | Description  |
| :---    | :---         |
| [Tenant settings](tenant-settings-index.md) | Enable, disable, and configure Microsoft Fabric. |
| [Users](service-admin-portal-users.md) | Manage users in the Microsoft 365 admin portal. |
| [Power BI Premium Per-User (PPU)](service-admin-portal-premium-per-user.md) | Configure auto refresh and semantic model workload settings. |
| [Audit logs](service-admin-portal-audit-logs.md) | Audit Microsoft Fabric activities in the Microsoft Purview portal. |
| [Domains](../governance/domains.md) | Manage and organize business data using custom domains in Fabric. |
| [Workloads](../fundamentals/fabric-home.md#create-items-and-explore-workloads) | Manage workloads and their settings. |
| [Tags](../governance/tags-overview.md) | Manage tags for organizing content. |
| [Capacity settings](capacity-settings.md) | Manage Microsoft Fabric F, Power BI Premium P, and Power BI Embedded EM and A capacities. |
| [Refresh summary](service-admin-portal-refresh-summary.md) | Schedule refresh on a capacity and view the details of refreshes that occurred. |
| [Embed codes](service-admin-portal-embed-codes.md) | View and manage the embed codes that have been generated for your organization to share reports publicly. |
| [Organizational visuals](organizational-visuals.md#organizational-visuals) | View, add, and manage which type of Power BI visuals users can access across the organization. |
| [Organizational themes (preview)](/power-bi/create-reports/desktop-organizational-themes) | Manage and distribute custom report themes across the organization. |
| [Azure connections](service-admin-portal-azure-connections.md) | Configure and manage connections to Azure resources. |
| [Workspaces](portal-workspaces.md) | View and manage the workspaces that exist in your organization. |
| [Custom branding](service-admin-custom-branding.md) | Change the look and feel of Microsoft Fabric to match your organization's branding. |
| [Fabric identities](fabric-identities-manage.md) | Govern the Fabric identities that exist in your organization. |
| [Featured content](service-admin-portal-featured-content.md) | Manage the reports, dashboards, and apps that were promoted to the Featured section on your Home page. |

### How to get to the admin portal

To get to the admin portal, follow these steps:

1. Sign in to [Microsoft Fabric](https://app.fabric.microsoft.com/?pbi_source=learn-admin-admin-center) using your admin account credentials.

1. Select the **Settings** (gear) icon, and then select **Admin portal**.

   :::image type="content" source="./media/admin-center/admin-portal-option-settings-menu.png" alt-text="Screenshot of the Admin portal option on the Fabric settings menu.":::

## Manage licenses and subscriptions

To access the Fabric SaaS platform, you need a license. Fabric has two types of licenses:

* [Capacity license](../enterprise/licenses.md#capacity) - An organizational license that provides a pool of resources for Fabric operations. Capacity licenses are divided into stock keeping units (SKUs). Each SKU provides a different number of capacity units (CUs) which are used to calculate the capacity's compute power.

* [Per user license](../enterprise/licenses.md#per-user-licenses) - Per user licenses allow users to work in Fabric.

To purchase licenses, you must be a Billing administrator. Billing administrators can [buy licenses](../enterprise/buy-subscription.md) and control them with tools such as capacity [pause and resume](../enterprise/pause-resume.md) and [scale](../enterprise/scale-capacity.md).

After you purchase licenses, use the Microsoft 365 admin center, PowerShell, or the Azure portal to view and manage those licenses.

### Turn off self-service sign-up and purchasing

Self-service lets individuals sign up, try, or buy Fabric or Power BI on their own. You might want to restrict self-service if all licensing is centralized and managed by an admin team, or if your organization doesn't permit trials. To learn how to turn off self-service, see [Enable or disable self-service](/power-bi/enterprise/service-admin-disable-self-service).

Turning off self-service sign-up keeps users from exploring Fabric on their own. If you block individual sign-up, you might want to [get Fabric (free) licenses for your organization and assign them to all users](/power-bi/enterprise/service-admin-licensing-organization#about-self-service-sign-up).

### Take over a self-service subscription

As an admin, you can't assign or unassign licenses for a self-service purchase subscription bought by a user in your organization. You can [take over a purchase or trial subscription](/microsoft-365/commerce/subscriptions/manage-self-service-purchases-admins#take-over-a-self-service-purchase-or-trial-subscription), and then assign or unassign licenses.

### View your subscriptions

To see which subscriptions your organization has, follow these steps.

1. Sign in to the [Microsoft 365 admin center](https://admin.microsoft.com).
1. In the navigation menu, select **Billing** > **Your products**.

Your active Fabric and Power BI subscriptions are listed along with any other subscriptions you have.

## Configure tenant settings

Admins can enable and disable global platform settings by controlling the [Tenant settings](about-tenant-settings.md). If your organization has one tenant, you can enable and disable settings for the entire organization from that tenant. Organizations with multiple tenants require an admin for each tenant. In multitenant organizations, appoint a central admin or team to manage settings across all tenants.

Capacity and workspace settings let you be more specific when you control your Fabric platform, because they apply to a specific capacity or workspace. Most Fabric experiences and features have their own settings, allowing control at an experience or feature level. For example, workspace administrators can customize [Spark compute configuration settings](../data-engineering/environment-manage-compute.md).

### Customize a Fabric tenant

Fabric is composed of tenants, capacities, and workspaces. Your organization might have one or more tenants, each with at least one capacity. Workspaces reside in capacities, and are where data is created, transformed, and consumed. Each organization can arrange its tenants, capacities, and workspaces based on its structure. For example, capacities can align with business functions like sales or marketing, and workspaces with each function's divisions.

Admins can control these processes throughout the organization. For example, you can create and delete workspaces, and control [workspace settings](../fundamentals/workspaces.md#workspace-settings) such as [Azure connections](../data-factory/dataflow-support.md), [Git integration](../cicd/git-integration/intro-to-git-integration.md), and [Microsoft OneLake](../onelake/onelake-overview.md).

To share management across the organization, you can also use [domains](../governance/domains.md). A domain is a logical grouping of workspaces—for example, by function such as sales or marketing. You can assign domain admins who are closer to the subject matter, freeing Fabric administrators to focus on organizational processes while experts manage data in their fields.

### Grant workspace permissions

In Fabric, [workspace roles](../fundamentals/roles-workspaces.md) let workspace admins manage who can access data. Workspace roles determine which users can view, create, share, and delete Fabric items. As an admin, you can grant and revoke workspace roles, using them to control access to data in your organization. You can also create security groups and use them to control workspace access.

## Manage users in Microsoft Fabric

Admins can [manage Fabric users](service-admin-portal-users.md) by using the [Microsoft 365 admin center](/microsoft-365/admin/admin-overview/admin-center-overview). Managing users includes adding and deleting users, groups, and admins. You can also manage per user licenses and assign [admin roles](roles.md).

## Secure and govern data in Microsoft Fabric

Fabric provides tools that help admins manage and govern data across the organization. For example, you can use [information protection capabilities](../governance/information-protection.md) to help protect sensitive information.

With [governance](../governance/governance-compliance-overview.md) and [security](../security/security-overview.md) tools, you can help keep your organization's data secure and compliant with your organizational policies.

[Data residency](admin-share-power-bi-metadata-microsoft-365-services.md) is also supported in Fabric. As an admin, by deciding where your tenants and capacities are created, you can specify your [organization's data storage location](/power-bi/guidance/powerbi-implementation-planning-tenant-setup#location-for-data-storage).

You can also control your organization's [disaster recovery capacity setting](/azure/reliability/reliability-fabric#disaster-recovery-capacity-setting) to help keep your data safe if a disaster happens.

## Delegate admin rights

To prevent becoming a bottleneck in your organization, you can delegate many controls to Capacity, Workspace, and Domain administrators. [Delegating settings](delegate-settings.md) lets your organization have several admins with different levels of admin rights in multiple logical locations. For example, you can have three admins with access to all the settings in your organization, and another admin for each team in your organization. The team admin can control settings and permissions relevant for the team, at the capacity, workspace, or domain level, depending on the way your organization is set up. You can also have multiple levels of admins in your organization, depending on your organization's needs.

## Monitor Fabric usage and activity

Fabric provides several tools for monitoring platform usage. Use monitoring to comply with internal policies and regulations, review consumption and billing, and optimize resource allocation.

### Admin monitoring workspace

To view the usage of Fabric features in your organization, use the [feature usage and adoption report](feature-usage-adoption.md) in the [admin monitoring workspace](monitoring-workspace.md). The report provides insights into consumption across the organization. You can also use its semantic model to create a tailored report for your organization.

### Monitoring hub

The [monitoring hub](monitoring-hub.md) lets you review Fabric activities per experience. Using the hub, you can spot failed activities and see who submitted the activity and how long it lasted. The hub can expose many other details regarding each activity, and you can also filter and search it as needed.

### View audit logs

Audit logs let you [track user activities in Fabric](track-user-activities.md). You can search the logs and see which [operations](operation-list.md) were performed in your organization. Use audit logs to verify that policies are followed and to debug unexpected system behavior.

### Understand capacity consumption

Fabric measures consumption in capacity units (CUs). With the [Capacity Metrics app](../enterprise/metrics-app.md), admins can view consumption in their organization. This report helps you make informed decisions about your organizational resources. You can then take action by [scaling](../enterprise/scale-capacity.md) a capacity up or down, [pausing](../enterprise/pause-resume.md) a capacity operation, optimizing query efficiency, or buying another capacity if needed.

### Review Fabric bills

Admins can view their organization's [bills](../enterprise/azure-billing.md) to understand what their organization is paying for. You can compare your bill with your consumption to understand if and where your organization can make savings.

## Related content

* [Admin monitoring workspace](monitoring-workspace.md)
* [Workspace tenant settings](portal-workspace.md)
* [Manage workspaces](portal-workspaces.md)
* [Use the capacity metrics app to monitor consumption](../enterprise/metrics-app.md)
* [Feature usage and adoption report](feature-usage-adoption.md)
* [Fabric tenant settings](about-tenant-settings.md)
* [Track user activities in Microsoft Fabric](track-user-activities.md)
* [Set up permissions for Fabric workspaces](../fundamentals/roles-workspaces.md)
* [CI/CD workflow options in Fabric](../cicd/manage-deployment.md)
