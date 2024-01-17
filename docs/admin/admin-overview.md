---
title: Administration overview
description: This article provides a Microsoft Fabric administration overview.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 12/27/2023
---

# Administration overview

[Microsoft Fabric](../get-started/microsoft-fabric-overview.md) is a software as a service (SaaS) platform that lets users get, create, share, and visualize data. Fabric unified administration enables you to [secure](../security/security-overview.md) and [govern](../governance/governance-compliance-overview.md) data across the platform, and [manage](#manage) Fabric features. Controlling feature access and capabilities allow you to comply with company policies and external rules and regulations. Fabric also allows admins to [delegate](#delegate-admin-rights) their responsibilities. Delegation lets you create different groups of admins for different tasks in your organization. Delegating admin responsibilities can reduce pressure that might cause one admin team to become a bottleneck for organizational processes.

## Manage

As a Fabric admin, you can manage many platform aspects for your organization. This section discusses the ability to manage some of Fabric's components, and the impact this has on your organization.

### Grant licenses

To access the Fabric SaaS platform, you need a license. Fabric has two type of licenses:

* [Capacity license](../enterprise/licenses.md#capacity-license) - An organizational license that provides a pool of resources for Fabric operations. Capacity licenses are divided into stock keeping units (SKUs). Each SKU provides a different number of capacity units (CUs) which are used to calculate the capacity's compute power.

* [Per user license](../enterprise/licenses.md#per-user-licenses) - Per user licenses allow users to work in Fabric.

Fabric admins can [buy licenses](../enterprise/buy-subscription.md) and control them with tools such as capacity [pause and resume](../enterprise/pause-resume.md) and [scale](../enterprise/scale-capacity.md).

### Assign admin roles

Fabric admins can assign and manage [Fabric admin roles](../admin/roles.md). Admin roles allow users to buy licenses, and control organizational settings. For example, as an admin you can access the [admin center](../admin/admin-center.md) and manage your organization's [tenant settings](../admin/about-tenant-settings.md).

### Customize a Fabric tenant

Fabric is composed of tenants, capacities, and workspaces. Your organization might have one or more tenants, each with at least one capacity. Workspaces reside in capacities, and are where data is created, transformed, and consumed. Each organization can organize its tenants, capacities, and workspaces in accordance with their organizational structure. For example, in an organization with one tenant, capacities can be organized according to the organizational functions, and workspaces can be created according to each function's divisions.

Fabric admins can control these processes throughout the organization. For example, being an admin allows you to create and delete workspaces, and to control [workspace settings](../get-started/workspaces.md#workspace-settings) such as [Azure connections](../data-factory/dataflow-support.md), [Git integration](../cicd/git-integration/intro-to-git-integration.md) and [OneLake](../onelake/onelake-overview.md).

To distribute management across the organization, you can also use [domains](../governance/domains.md). With a domain, you create a logical grouping of workspaces. For example, your organization can create domains according to functions such as sales and marketing. Designated users can become admins and oversee Fabric functions related to the data in each domain. Using domains allows your organization to appoint  the right admins at the right level. You no longer need global admins with lots of permissions and responsibilities to manage every single area in your organization. Using domains, you can allocate some admin rights to users who are closer to the domain's subject matter. By doing that, you free Fabric admins to concentrate on organizational processes, and allow experts to directly manage data in their fields.

### Add and remove users

Using the [Microsoft 365 admin center](/microsoft-365/admin/admin-overview/admin-center-overview), admins can [manage Fabric users](../admin/service-admin-portal-users.md). Managing users includes adding and deleting users, groups, and admins. You can also manage per user licenses and assign admin roles.

### Govern and secure data

Fabric provides a set of tools that allow admins to manage and govern data across the organization. For example, you can use the [information protection capabilities](../governance/information-protection.md) to protect sensitive information in your organization.

With a set of [governance](../governance/governance-compliance-overview.md) and [security](../security/security-overview.md) tools, you can make sure that your organization's data is secure, and that it complies to your organizational policies.

[Data residency](../admin/admin-share-power-bi-metadata-microsoft-365-services.md) is also supported in Fabric. As an admin, by deciding where your tenants and capacities are created, you can specify your [organization's data storage location](/power-bi/guidance/powerbi-implementation-planning-tenant-setup#location-for-data-storage).

You can also control your organization's [disaster recovery capacity setting](/azure/reliability/reliability-fabric#disaster-recovery-capacity-setting) to make sure your data is safe if a disaster happens.

## Control

An admin has control over Fabric settings and permissions across the platform. You can also delegate admin settings to other admins in your organization, to allow granular control across your organization.

### Delegate admin rights

To avoid becoming a bottleneck for every single setting in your organization, a Fabric admin can delegate many of the controls to capacity, workspace, and domain admins. Delegating settings allows your organization to have several admins with different levels of admin rights in multiple logical locations within your organization. For example, you can have a three admins with access to all the settings in your organization, and another admin for each team in your organization. The team admin can control settings and permissions relevant for the team, at the capacity, workspace, or domain level, depending on the way your organization is set up. You can also have multiple levels of admins in your organization, depending on your organization's needs.

### Enable Fabric settings

Fabric admins can enable and disable global platform settings by controlling the [Tenant settings](../admin/about-tenant-settings.md). If your organization has one tenant, you can enable and disable settings for the entire organization from that tenant. Organizations with multiple tenants require an admin for each tenant. If your organization has several tenants, it can opt for a centralized approach by appointing one admin (or a team of admins) to control the settings for all the organization's tenants.

Capacity and workspace settings allow you to be more specific when you control your Fabric platform, because they apply to a specific capacity or workspace. Most Fabric experiences and features, have their own settings, allowing control at an experience or feature level. For example, workspace admins can customize [Spark compute configuration settings](../data-engineering/environment-manage-compute.md).

### Grant permissions

In Fabric, [workspace roles](../get-started/roles-workspaces.md) allow workspace admins to manage who can access data. Some of the things workspace roles determine, are which users can view, create, share, and delete Fabric items. As an admin, you can grant and revoke workspace roles, using them to control access to data in your organization. You can also create security groups and use them to control workspace access.

## Monitor

An important part of an admin's role is to monitor what's going on in the organization. Fabric has several tools for monitoring different aspects of the platform usage. Monitoring enables your organization to comply with internal policies and external rules and regulations. You can also use monitoring to review consumption and billing, so that you can establish the best way to use your organizational resources. By analyzing what's happening in your organization, you can decide if buying more resources is needed, and potentially save money by using cheaper or fewer resources if that can be done.

### Admin monitoring workspace

To view the usage of Fabric features in your organization, use the [feature usage and adoption report](../admin/feature-usage-adoption.md) in the [admin monitoring workspace](../admin/monitoring-workspace.md). The report allows you to gain insights into consumption across the organization. You can also use its semantic model to create a tailored report specific for your organization.

### Monitoring hub

The [monitoring hub](../admin/monitoring-hub.md) lets you review Fabric activities per experience. Using the hub, you can spot failed activities and see who submitted the activity and how long it lasted. The hub can expose many other details regarding each activity, and you can also filter and search it as needed.

### View audit logs

Audit logs allow you to [track user activities in Fabric](../admin/track-user-activities.md). You can search the logs and see which [operations](../admin/operation-list.md) were performed in your organization. Reviewing the logs can have many uses in your organization, such as making sure policies are followed and debugging unexpected system behavior.

### Understand consumption

Consumption in Fabric is measured using capacity units (CUs). Using the [Capacity Metrics app](../enterprise/metrics-app.md) admins can view consumption in their organization. This report enables you to make informed decisions regarding the use of your organizational resources. You can then take action by [scaling](../enterprise/scale-capacity.md) a capacity up or down, [pausing](../enterprise/pause-resume.md) a capacity operation, optimizing query efficiency, or buying another capacity if needed. Understanding consumption makes your organization's Fabric operations run smoother, and might save your organization money.

### Reviewing bills

Admins can view their organization's [bills](../enterprise/azure-billing.md) to understand what their organization is paying for. You can compare your bill with your consumption to understand if and where your organization can make savings.

## Capabilities

This section provides a high level list of some of Fabric admin capabilities mentioned in this article.

| Capability |Description |
|------------|------------|
| [Capacity Metrics app](../enterprise/metrics-app.md)  | Monitor your organization's consumption          |
| [Feature usage and adoption report](../admin/feature-usage-adoption.md)        | Review the usage of Fabric features       |
| [Tenant settings](../admin/about-tenant-settings.md)  | Control Fabric settings across your organization |
| [Track user activities in Microsoft Fabric](../admin/track-user-activities.md) | Use log entries to view Fabric operations |
| [workspace roles](../get-started/roles-workspaces.md) | Set up permissions for Fabric workspaces         |

## Related content

* [Security overview](../security/security-overview.md)

* [Governance and compliance overview](../governance/governance-compliance-overview.md)
