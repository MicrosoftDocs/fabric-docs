---
title: Governance and compliance in Microsoft Fabric
description: This article provides an overview of the governance and compliance in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 09/01/2026
ai-usage: ai-assisted
---

# Governance overview and guidance

Microsoft Fabric gives you the capabilities to govern, protect, discover, and operate your organization's data estate. Use these capabilities to organize ownership and administration, secure sensitive data and meet compliance requirements, help people find and trust the right data, understand the governance health of your estate, and monitor operations across Fabric. Many of these capabilities are built in and included with your Microsoft Fabric license, while some others require additional licensing from Microsoft Purview.

This article introduces the main outcomes you can achieve when you govern and manage your Fabric data estate, and it links to more detailed information for each one. Many of these outcomes come together in **the Govern section of the OneLake catalog**, alongside the Explore and Secure sections.

### Manage and govern your Fabric estate in the OneLake catalog

The Govern section of the OneLake catalog is the centralized experience for managing and governing organizational content in Microsoft Fabric.

In addition to governance capabilities such as domains, endorsements, metadata scanning, policies, and governance insights, Govern also provides access to administrative experiences including workspace management, capacity management, tenant settings, and other organization-wide controls.

## Manage the data estate

Organize ownership, domains, and administration so that teams can manage their data according to their specific needs. A single person often wears more than one hat. For example, a Capacity Admin can also be a Fabric Admin, Domain Admin, Workspace Admin, or Data Steward. The following capabilities are described by what you're trying to accomplish rather than by role.

Administrative experiences such as tenant configuration (OneLake catalog → Govern → Configurations), workspace management (OneLake catalog → Govern → Workspaces), and capacity management (OneLake catalog → Govern → Capacities) are available in the Govern section.

You can also manage policies for your Fabric estate from the Govern section of the OneLake catalog.

> [!NOTE]
> Start in Govern for governance and administration. If the OneLake catalog and Govern aren't yet
> available in your region, use the **Admin portal** to access the existing administration
> capabilities during the regional rollout.

### Tenant, domain, and workspace settings

Tenant, domain, and workspace admins each have settings within their scope that they can configure to control who has access to certain functionalities at different levels. You can delegate some tenant-level settings to domain and capacity admins.

For more information, see [About tenant settings](../admin/about-tenant-settings.md), [Configure domain settings](./domains.md#configure-domain-settings), and [Workspace settings](../fundamentals/workspaces.md#workspace-settings).

**Guidance**: Fabric admins should define tenant-wide settings, and domain admins should override delegated settings as needed. Individual teams (workspace owners) define their own more granular workspace-level controls and settings.

### Domains

Use domains to logically group all the data in an organization that's relevant to particular areas or fields, such as by business unit. One of the most common uses for domains is to group data by business department, so each department can manage its data according to its specific regulations, restrictions, and needs.

Grouping data into domains and subdomains enables better discoverability and governance. For instance, in the [OneLake catalog](../governance/onelake-catalog-overview.md), users can filter content by domain to find content that is relevant to them. With respect to governance, you can delegate some tenant-level settings for managing and governing data to the domain level, which allows domain-specific configuration of those settings.

For more information, see [Domains](./domains.md).

**Guidance**: Business and enterprise architects should design the organization's domain setup, while Fabric admins should implement this design by creating domains and subdomains and assigning domain owners. Preferably, center of excellence (COE) teams should be part of this discussion to align the domains with the overall strategy of the organization.

### Workspaces

Teams in organizations use workspaces to create Fabric items and collaborate with each other. Assign these workspaces to teams or departments based on governance requirements and data boundaries. How you assign workspaces depends on internal team structure and how the teams want to handle their Fabric items (for example, do they need one or many workspaces).

**Guidance**: For development purposes, a best practice is to have isolated workspaces per developer, so each developer can work on their own without interfering with the shared workspace. Fabric admins define who has permission to create workspaces. Workspace admins define Spark environments that users can reuse. For more information about best practices, see [Best practices for lifecycle management in Fabric](../cicd/best-practices-cicd.md).

### Capacities

Capacities are the compute resources used by all Fabric workloads. Based on organizational requirements, use capacities as isolation boundaries for compute, chargebacks, and more.

**Guidance**: Split up capacities based on the requirements of the environment, such as development, test, acceptance, and production (DTAP). This approach provides better workload isolation and chargeback.

### Delegate administration

You can delegate some aspects of administration and governance to capacities, domains, and workspaces so the respective admins can manage them in their scope.

For an overview of administration experiences and tools, see [What is Microsoft Fabric administration?](../admin/admin-overview.md). For Govern tasks and navigation, see [Govern and manage your Fabric data estate with the OneLake catalog](onelake-catalog-govern.md).

**Guidance**: Platform/IT owners should have access to Fabric administration experiences. They can define domains, and delegate domain and capacity management to domain and capacity owners as best suits your organizational needs.

### Metadata scanning

Metadata scanning helps your organization govern Microsoft Fabric data by enabling cataloging tools to catalog and report on the metadata of all your organization's Fabric items. It uses a set of admin REST APIs, known as the *scanner APIs*. The scanner APIs extract metadata such as item name, ID, sensitivity, endorsement status, and more.

For more information, see [Metadata scanning](./metadata-scanning-overview.md).

## Encourage trusted discovery

Help people find, evaluate, and trust the right data across your estate.

### OneLake catalog

The OneLake catalog makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them. Filtering and search options make it easier to get to relevant data. The catalog is also where data owners govern the data they own.

For more information, see the [OneLake catalog overview](../governance/onelake-catalog-overview.md).

**Guidance**: Carefully defining and setting up domains is essential for creating an efficient experience in the catalog. Carefully defined domains help set the context for teams and make for better definition of boundaries and ownership. Mapping workspaces to domains is key to helping implement this in Fabric.

### Endorsement

Endorsement makes trustworthy, quality data easier to discover. Organizations often have large numbers of Microsoft Fabric items—data, processes, and content—available for sharing and reuse by their Fabric users. Endorsement helps users identify and find the trustworthy, high-quality items they need. With endorsement, item owners can promote their quality items, and organizations can certify items that meet their quality standards. Endorsed items are clearly labeled, both in Fabric and in other places where users look for Fabric items. Endorsed items are given priority in some searches, and you can sort for endorsed items in some lists.

For more information, see [Endorsement](./endorsement-overview.md).

**Guidance**: Delegate certification enablement to domain admins, and have the domain admins authorize data owners and producers to certify the items they create. Data owners and producers should then always certify their items that they test and are ready for use by other teams. This practice helps separate low-quality, untrusted items from trusted, ready-to-use items. It also makes these trusted items easier to find. In addition, educate data consumers about how to find trusted items, and encourage them to use only certified items in their reports and other downstream processing.

### Tags

Tags are configurable text labels that you can apply to Fabric items to enhance item discoverability and use. Fabric administrators can define a set of tags that data owners can use to categorize their items. Once you apply tags to items, data consumers can view, search, and filter by the applied tags across the various Fabric experiences.

For more information, see [Tags in Microsoft Fabric](./tags-overview.md).

### Data lineage and impact analysis

In modern business intelligence projects, understanding the flow of data from a data source to its destination is a complex task. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. They might require a team of experts or deep investigation to understand. Lineage helps users understand the flow of data by providing a visualization that shows the relations between all the items in a workspace. For each item in the lineage view, you can display an impact analysis that shows what downstream items are affected if you make changes to the item.

For more information, see [Lineage](./lineage.md) and [Impact analysis](./impact-analysis.md).

**Guidance**: Use proper and consistent naming conventions for items. This practice helps when looking at lineage information.

<a id="secure-protect-and-comply"></a>

## Protect and comply

Secure your data and meet compliance requirements. Some of these capabilities are included with Microsoft Fabric, while others require additional licensing from Microsoft Purview. Capabilities that require additional Purview licensing are noted in this section. For details about network security, access control, and encryption, see the [Security overview](../security/security-overview.md).

### Privacy

The first phase of any data protection strategy is to identify where your private data sits. This step is one of the most challenging but important steps toward making sure you can protect your data at the source. The following sections describe capabilities Fabric provides to help your organization meet this challenge.

### Data security

To ensure data in Fabric is secure from unauthorized access and stays compliant with data privacy requirements, use sensitivity labels from Microsoft Purview Information Protection in combination with built-in Fabric capabilities to manually or automatically tag your organization's data. Purview Audit then captures audit trails on activities performed in Fabric. This process includes capturing user activities in the Fabric tenant, such as lakehouse access, Power BI access, Spark activities, data factory activities, sign-ins, and more.

### Securing items in a workspace

Organizational teams can have individual workspaces where different personas collaborate and work on generating content. Workspace admins regulate access to the items in the workspace by assigning workspace roles to users.

**Guidance**: Data owners should recommend users who could be workspace administrators. These users could be team leads in your organization, for example. These workspace administrators should then govern access to the items in their workspace by assigning appropriate workspace roles to users and consumers of the items.

### Securing data in Fabric items

Along with the broad security that gets applied at the tenant or workspace level, individual teams can deploy other data-level controls to manage access to individual tables, rows, and columns. Fabric currently provides such data-level control for SQL analytics endpoints, warehouses, Direct Lake, and KQL Database.

**Guidance**: Individual teams are expected to apply these additional controls at the item and data level.

### Purview Information Protection

Information protection in Fabric requires additional licensing from Microsoft Purview. It enables you to discover, classify, and protect Fabric data by using sensitivity labels from Microsoft Purview Information Protection. Fabric provides multiple capabilities, such as default labeling, label inheritance, and [programmatic labeling](/fabric/governance/service-security-sensitivity-label-inheritance-set-remove-api), to help achieve maximal sensitivity label coverage across your entire Fabric data estate. Once labeled, data remains protected even when it's exported out of Fabric via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit.

For more information, see [Information Protection in Microsoft Fabric](./information-protection.md).

**Guidance**: Specify sensitivity labels from Microsoft Purview Information Protection and their associated label policies at an organizational level. They should be valid for the whole organization.

### Purview Data Loss Prevention

Purview Data Loss Prevention (DLP) requires additional licensing from Microsoft Purview. DLP policies for Fabric and Power BI automatically detect sensitive information as you upload it into [DLP-supported item types](/purview/dlp-powerbi-get-started#supported-item-types) in your Fabric tenant. They help you take risk remediation actions so that your organization stays compliant with governmental and industry regulations.

Compliance and security administrators receive audit logs for every DLP detection. The audit logs give them further visibility into business-critical data and its location within the tenant. They can set up alerts that are automatically generated whenever sensitive information is detected in a DLP-supported item. They can also create customized messages to users to help guide them about how to deal with sensitive data. For example, admins could configure a message that is sent to the Fabric data owner whenever proprietary information is detected in their data, explaining that this information is internal and shouldn't be shared externally.

For more information, see [Get started with Data loss prevention policies for Fabric and Power BI](/purview/dlp-powerbi-get-started).

### Auditing

To mitigate the risks of unauthorized access and use of your Fabric data, Fabric administrators and compliance teams in your organizations can track and investigate user activity on Fabric items by using Purview Audit, which is available in the Purview compliance portal. Many companies also need these audit logs for regulatory requirements, which often mandate storing audit logs for forensic investigation and potential data regulation violations.

**Guidance**: Fabric administrators and compliance teams should be aware that Fabric item-level audits are logged in Purview Audit and can be used for analysis.

### Purview governance across your organization

Microsoft Purview offers solutions for protecting and governing data across an organization's entire data estate, and it requires Microsoft Purview licensing. The integration between Purview and Fabric makes it possible to use some of Purview's capabilities to govern your Fabric data in the context of your organization's entire data estate. The data governance capabilities offered on Fabric via Purview's [live view](/purview/live-view) (preview) let data consumers view Fabric workspaces they have access to, and let you run manual scans that make item-level metadata available in Purview.

For more information, see [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md).

### Certifications

Microsoft Fabric has HIPAA BAA, ISO/IEC 27017, ISO/IEC 27018, ISO/IEC 27001, and ISO/IEC 27701 compliance certifications. To learn more, see [Fabric compliance offerings](https://powerbi.microsoft.com/blog/microsoft-fabric-is-now-hipaa-compliant/).

## Understand and improve governance health

Understand the governance state of your estate and take action to improve it. In the **Govern** section, the **All data estate** view gives governance administrators an organization-wide view, and the **My data** view gives data owners a view of the data they own.

- **Governance Health**: the overall governance state of your estate, so you can see where you stand at a glance.
- **Governance Insights**: explanations of your governance status that help you understand what's working and what needs attention.
- **Recommended Actions**: concrete next steps that guide you to improve governance, with links to supporting resources.
- **Governance Coverage**: how broadly governance capabilities are applied across your items and domains.
- **Governance Visibility**: how well you can see the governance state of the data across your estate.

For more information, see [Govern with the OneLake catalog](./onelake-catalog-govern.md).

## Monitor Fabric operations

Monitor capacity, activity, and system operations across Fabric. This section covers platform operations, which are distinct from the governance state and actions described in [Understand and improve governance health](#understand-and-improve-governance-health).

### Monitoring hub

The Microsoft Fabric monitoring hub enables users to monitor Fabric activities from a central location. Any Fabric user can use the monitoring hub; however, the monitoring hub displays activities only for Fabric items the user has permission to view.

For more information, see [Use the Monitoring hub](../admin/monitoring-hub.md).

**Guidance**: Expose this capability to developers and team members for monitoring scheduled workloads, such as a dataflow or pipeline refresh, a Spark run, or a data warehouse query.

### Capacity metrics

The Microsoft Fabric Capacity Metrics app helps you monitor capacity usage and consumption across your organization.

**Guidance**: Platform owners and users with platform administrator roles should use this feature to monitor usage and consumption. For more information, see [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md).

### Admin monitoring

The Govern report in the OneLake catalog gives Fabric administrators tenant-wide inventory, usage, sharing, protection, and curation insights. It consolidates and expands on information previously divided among separate administration and security reports. The administrator report and semantic model are stored in the Admin monitoring workspace. For more information, see [Explore the Govern report](onelake-catalog-govern.md#govern-report) and [What is the admin monitoring workspace?](../admin/monitoring-workspace.md)

**Guidance**: Use this feature to gain an overall view of the Fabric platform.

## Related content

* [OneLake catalog overview](../governance/onelake-catalog-overview.md)
* [Domains](./domains.md)
* [Fabric administration overview](../admin/admin-overview.md)
* [Fabric security overview](../security/security-overview.md)
* [Microsoft Purview permissions](/purview/purview-permissions)
* [Fabric governance documentation](index.yml)

