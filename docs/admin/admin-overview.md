---
title: What is Microsoft Fabric administration?
description: Learn how Fabric administration provides an operating model to govern, secure, operate, and optimize your organization's Microsoft Fabric data estate.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 09/01/2026
ai-usage: ai-assisted

#customer intent: As a Fabric administrator, I want to understand admin tools, tasks, and settings so that I can effectively manage my organization's Fabric environment.
---

# What is Microsoft Fabric administration?

Fabric administration is the set of responsibilities, roles, and tools used to govern, secure, operate, and optimize the Microsoft Fabric environment across an organization. Administration isn't a single settings screen—it's how you manage your organization's Fabric data estate so teams can build, share, and consume data with confidence.

Administrators focus on three connected responsibilities that keep the platform configured correctly and compliant with organizational policies:

* **Administration**—This *Fabric governance and administration documentation* covers how to manage the Fabric platform, configure tenant and workspace features, and monitor usage and activity. It also covers how to define and enforce policies for data access, sharing, classification, and auditing.
* **Security**—See the *[Security documentation](../security/index.yml)* to learn how to help safeguard data with identity, access, encryption, and network protection settings.

This article introduces Fabric administration as an operating model and shows how administration fits into managing the overall Fabric data estate.

## Administer the Fabric data estate

Fabric administrators are responsible for a set of outcomes across the data estate. Use these outcomes—not individual settings screens—as the mental model for administration. Each outcome group links to the publicly documented capabilities you use to achieve it.

| Outcome | Purpose | Capabilities |
|---------|---------|--------------|
| Govern | Establish structure and policy so data is organized, discoverable, and compliant. | [Tenant settings](about-tenant-settings.md), [Domains](../governance/domains.md), [Workspace controls](../fundamentals/workspaces.md) |
| Secure | Protect data and control who can access it. | [Security controls](../security/security-overview.md), [Access controls](../fundamentals/roles-workspaces.md), [Compliance capabilities](../governance/governance-compliance-overview.md) |
| Operate | Keep the platform running reliably at tenant scale. | [Capacities](capacity-settings.md), [Tenant-wide configuration](tenant-settings-index.md), [Monitoring and health](monitoring-hub.md) |
| Optimize | Get more value from your Fabric investment. | [Govern report](../governance/onelake-catalog-govern.md#govern-report), [Capacity planning](../enterprise/metrics-app.md) |

<a id="delegate-admin-rights"></a>

## Administrative roles

Fabric provides multiple administrative roles so organizations can distribute responsibilities and avoid central bottlenecks. Administration is a delegated operating model: you assign scoped roles so the people closest to a capacity, workspace, or domain can manage it without needing full tenant access.

Depending on organizational structure, administrators may hold responsibilities across multiple scopes such as tenant administration, capacity administration, workspace administration, and governance ownership.

For details about which types of admins can perform specific tasks, see [Understand Fabric admin roles](roles.md), [Microsoft Entra built-in roles](/entra/identity/role-based-access-control/permissions-reference), and [Microsoft 365 admin roles](/microsoft-365/admin/add-users/about-admin-roles).

## Administrative tools: Governance and administration together

Governance defines the policies, structure, and insights that keep data trustworthy, while administration keeps the platform configured, secure, and operational. The **Govern** section in the OneLake catalog brings these capabilities together. Use it to review governance insights and access tenant settings, workspace and capacity management, policies, and other administrative controls.

The following table summarizes the tools used to manage the Fabric data estate. The entries you see in Govern depend on your permissions:

* Users without admin permissions see **Configurations**, with Help and support entries only, when this experience is enabled for their tenant.
* Domain admins see **Configurations**, with Help and support entries, and **Domains**.
* Capacity admins see **Configurations**, with Help and support entries, and **Capacities**.

| Task | Tool | Purpose |
|-------|------|---------|
| Manage Fabric | [OneLake catalog Govern section](#the-onelake-catalog-govern-section) | Govern and administer your organization's Fabric data estate from a single location. |
| Manage identity and access | [Microsoft Entra ID](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/TenantOverview.ReactView) | Configure conditional access to Fabric resources. |
| Manage identity and access | [Microsoft 365 admin center](https://admin.microsoft.com) | Manage users and groups, purchase and assign licenses, and control access to Fabric. |
| Manage security and compliance | [Microsoft 365 Security & Microsoft Purview compliance portal](https://protection.office.com) | Review and manage auditing, data classification, data loss prevention policies, and data lifecycle management. |
| Automate administration | [PowerShell cmdlets](/powershell/power-bi/overview) | Manage workspaces and other aspects of Fabric using scripts. |
| Automate administration | [Administrative APIs and SDK](/rest/api/fabric/articles/get-started/using-fabric-apis) | Build custom admin tools. |

<a id="what-is-the-admin-experience-in-govern"></a>

### The OneLake catalog Govern section

Use the OneLake catalog **Govern** section as the primary destination for governing and administering your organization's Fabric data estate.

To access the OneLake catalog, sign in to [Fabric](https://app.fabric.microsoft.com). Select **OneLake catalog**, and then select the **Govern** section from the top menu.

You can also access Govern from the **Settings** (gear) menu by selecting **OneLake Catalog | Govern**.

> [!NOTE]
> OneLake catalog and Govern are rolling out by region. If they're not available in your region,
> use the **Admin portal** during the regional rollout. In Fabric, select the **Settings** (gear)
> icon, and then select **Admin portal**.

Govern also provides **Quick access** cards for common administration tasks:

* [Admin monitoring workspace](monitoring-workspace.md)
* [Manage users](service-admin-portal-users.md)
* [Audit logs](service-admin-portal-audit-logs.md)

<a id="monitor-fabric-usage-and-activity"></a>
<a id="fabric-settings"></a>

## Related content

* [Understand Fabric admin roles](roles.md)
* [Fabric tenant settings](about-tenant-settings.md)
* [OneLake catalog overview](../governance/onelake-catalog-overview.md)
