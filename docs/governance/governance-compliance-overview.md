---
title: Governance and compliance in Microsoft Fabric
description: This article provides an overview of the governance and compliance in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 09/26/2024
ai-usage: ai-assisted
---

# Governance overview and guidance

Microsoft Fabric governance and compliance capabilities help you manage, protect, monitor, and improve the discoverability of your organization's sensitive information. These capabilities help you gain and maintain customer trust and meet data governance and compliance requirements and regulations. Many of these capabilities are built in and included with your Microsoft Fabric license, while some others require additional licensing from Microsoft Purview.

This article describes at a high level the main features and components that help you govern your organization's data estate. It includes guidance for taking advantage of the capabilities these features and components offer. It also provides links to more detailed information about each feature and component.

| [Manage your data estate](#manage-your-data-estate) | [Secure, protect, and comply](#secure-protect-and-comply) | [Encourage data discovery, trust, and use](#encourage-data-discovery-trust-and-use) | [Monitor, uncover, get insights, and act](#monitor-uncover-get-insights-and-act) |
|:-|:-|:-|:-|
| [Admin portal](#admin-portal) | [Privacy](#privacy) | [OneLake data hub](#onelake-data-hub) | [Monitoring hub](#monitoring-hub) |
| [Tenant, domain, and workspace settings](#tenant-domain-and-workspace-settings) | [Data security](#data-security) | [Endorsement, trust, and reuse](#endorsement) | [Capacity metrics](#capacity-metrics) |
| [Domains](#domains) | [Purview Information Protection](#purview-information-protection)* | [Tags](#tags) | [Purview hub](#purview-hub) |
| [Workspaces](#workspaces) | [Purview Data Loss Prevention](#purview-data-loss-prevention)* | [Data lineage and impact analysis](#data-lineage-and-impact-analysis) | [Admin monitoring](#admin-monitoring) |
| [Capacities](#capacities) | [Securing Fabric items within a workspace](#securing-items-in-a-workspace) | [Purview for governance across the org](#purview-for-governance-across-the-org)* |  |
| [Metadata scanning](#metadata-scanning) | [Securing data in Fabric items](#securing-data-in-fabric-items) |  |  |
|  | [Auditing](#auditing) |  |  |

*Requires additional licensing

## Manage your data estate

This section describes some of the main features you can use to help manage your data estate.

### Admin portal

The Microsoft Fabric admin portal is a centralized place that allows your organization's administrators to control your overall Fabric estate. This control includes settings that govern Microsoft Fabric. For example, you can make changes to tenant settings, govern capacities, domains, and workspaces, and control how users interact with Microsoft Fabric. To provide flexibility, you can delegate some aspects of administration and governance to capacities, domains, and workspaces so the respective admins can manage them in their scope.

For more information about the admin portal, see [What is the admin portal?](../admin/admin-center.md)

**Guidance**: Platform/IT owners should have access to the admin portal. They can define domains, and delegate domain and capacity management to domain and capacity owners as best suits your organizational needs.

### Tenant, domain, and workspace settings

Tenant, domain, and workspace admins each have settings within their scope that they can configure to control who has access to certain functionalities at different levels. You can delegate some tenant-level settings to domain and capacity admins.

For more information, see [About tenant settings](../admin/about-tenant-settings.md), [Configure domain settings](./domains.md#configure-domain-settings), and [Workspace settings](../fundamentals/workspaces.md#workspace-settings).

**Guidance**: Fabric admins should define tenant-wide settings, and domain admins should override delegated settings as needed. Individual teams (workspace owners) define their own more granular workspace-level controls and settings.

### Domains

Use domains to logically group all the data in an organization that's relevant to particular areas or fields, such as by business unit. One of the most common uses for domains is to group data by business department, so each department can manage its data according to its specific regulations, restrictions, and needs.

Grouping data into domains and subdomains enables better discoverability and governance. For instance, in the [OneLake data hub](../governance/onelake-catalog-overview.md), users can filter content by domain to find content that is relevant to them. With respect to governance, you can delegate some tenant-level settings for managing and governing data to the domain level, which allows domain-specific configuration of those settings.

For more information, see [Domains](./domains.md).

**Guidance**: Business and enterprise architects should design the organization's domain setup, while Fabric admins should implement this design by creating domains and subdomains and assigning domain owners. Preferably, center of excellence (COE) teams should be part of this discussion to align the domains with the overall strategy of the organization.

### Workspaces

Teams in organizations use workspaces to create Fabric items and collaborate with each other. Assign these workspaces to teams or departments based on governance requirements and data boundaries. How you assign workspaces depends on internal team structure and how the teams want to handle their Fabric items (for example, do they need one or many workspaces).

**Guidance**: For development purposes, a best practice is to have isolated workspaces per developer, so each developer can work on their own without interfering with the shared workspace. Fabric admins define who has permission to create workspaces. Workspace admins define Spark environments that users can reuse. For more information about best practices, see [Best practices for lifecycle management in Fabric](../cicd/best-practices-cicd.md).

### Capacities

Capacities are the compute resources used by all Fabric workloads. Based on organizational requirements, use capacities as isolation boundaries for compute, chargebacks, and more.

**Guidance**: Split up capacities based on the requirements of the environment, such as development, test, acceptance, and production (DTAP). This approach provides better workload isolation and chargeback.

### Metadata scanning

Metadata scanning helps your organization govern Microsoft Fabric data by enabling cataloging tools to catalog and report on the metadata of all your organization's Fabric items. It uses a set of admin REST APIs, known as the *scanner APIs*. The scanner APIs extract metadata such as item name, ID, sensitivity, endorsement status, and more.

For more information, see [Metadata scanning](./metadata-scanning-overview.md).

## Secure, protect, and comply

Data security and a compliant data platform are important for making sure that your data stays safe and isn't compromised. For details about network security, access control, and encryption, see the [Security overview](../security/security-overview.md).

Fabric leverages Microsoft Purview for protecting sensitive data and helping ensure compliance with data privacy regulations and requirements.

### Privacy

The first phase of any data protection strategy is to identify where your private data sits. This step is one of the most challenging but important steps towards making sure you can protect your data at the source. The following sections describe capabilities Fabric provides to help your organization meet this challenge.

### Data security

To make sure data in Fabric is secure from unauthorized access and stays compliant with data privacy requirements, use sensitivity labels from Microsoft Purview Information Protection in combination with built-in Fabric capabilities to manually or automatically tag your organization's data. Purview Audit then captures audit trails on activities performed in Fabric. This process includes capturing user activities in the Fabric tenant, such as Lakehouse access, Power BI access, Spark activities, data factory activities, sign-ins, and more.

### Purview Information Protection

Information protection in Fabric enables you to discover, classify, and protect Fabric data by using sensitivity labels from Microsoft Purview Information Protection. Fabric provides multiple capabilities, such as default labeling, label inheritance, and [programmatic labeling](/fabric/governance/service-security-sensitivity-label-inheritance-set-remove-api), to help achieve maximal sensitivity label coverage across your entire Fabric data estate. Once labeled, data remains protected even when it's exported out of Fabric via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit.

For more information, see [Information Protection in Microsoft Fabric](./information-protection.md).

**Guidance**: Specify sensitivity labels from Microsoft Purview Information Protection and their associated label policies at an organizational level. They should be valid for the whole organization.

### Purview Data Loss Prevention

Purview DLP policies for Fabric and Power BI automatically detect sensitive information as you upload it into [DLP-supported item types](/purview/dlp-powerbi-get-started#supported-item-types) in your Fabric tenant. They help you take risk remediation actions so that your organization stays compliant with governmental and industry regulations.

Compliance and security administrators receive audit logs for every DLP detection. The audit logs give them further visibility into business-critical data and its location within the tenant. They can set up alerts that are automatically generated whenever sensitive information is detected in a DLP-supported item. They can also create customized messages to users to help guide them about how to deal with sensitive data. For example, admins could configure a message that is sent to the Fabric data owner whenever proprietary information is detected in their data, explaining that this information is internal and shouldn't be shared externally.

For more information, see [Get started with Data loss prevention policies for Fabric and Power BI](/purview/dlp-powerbi-get-started).

### Securing items in a workspace

Organizational teams can have individual workspaces where different personas collaborate and work on generating content. Workspace admins regulate access to the items in the workspace by assigning workspace roles to users.

**Guidance**: Data owners should recommend users who could be workspace administrators. These users could be team leads in your organization, for example. These workspace administrators should then govern access to the items in their workspace by assigning appropriate workspace roles to users and consumers of the items.

### Securing data in Fabric items

Along with the broad security that gets applied at the tenant or workspace level, individual teams can deploy other data-level controls to manage access to individual tables, rows, and columns. Fabric currently provides such data-level control for SQL analytics endpoints, warehouses, Direct Lake, and KQL Database.

**Guidance**: Individual teams are expected to apply these additional controls at the item and data level.

### Auditing

To mitigate the risks of unauthorized access and use of your Fabric data, Fabric administrators and compliance teams in your organizations can track and investigate user activity on Fabric items by using Purview Audit, which is available in the Purview compliance portal. Many companies also need these audit logs for regulatory requirements, which often mandate storing audit logs for forensic investigation and potential data regulation violations.

**Guidance**: Fabric administrators and compliance teams should be aware that Fabric item-level audits are logged in Purview Audit and can be used for analysis.

### Certifications

Microsoft Fabric has HIPAA BAA, ISO/IEC 27017, ISO/IEC 27018, ISO/IEC 27001, and ISO/IEC 27701 compliance certifications. To learn more, see [Fabric compliance offerings](https://powerbi.microsoft.com/blog/microsoft-fabric-is-now-hipaa-compliant/).

## Encourage data discovery, trust, and use

Fabric provides built-in capabilities to help users find and use reliable, quality data.

### OneLake data hub

The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them. Filtering and search options make it easier to get to relevant data.

For more information, see [Discover data items in the OneLake data hub](../governance/onelake-catalog-overview.md).

 **Guidance**: Carefully defining and setting up domains is essential for creating an efficient experience in the data hub. Carefully defined domains help set the context for teams and make for better definition of boundaries and ownership. Mapping workspaces to domains is key to helping implement this in Fabric.

### Endorsement

Endorsement is a way to make trustworthy, quality data more discoverable. Organizations often have large numbers of Microsoft Fabric items - data, processes, and content -  available for sharing and reuse by their Fabric users. Endorsement helps users identify and find the trustworthy high-quality items they need. With endorsement, item owners can promote their quality items, and organizations can certify items that meet their quality standards. Endorsed items are then clearly labeled, both in Fabric and in other places where users look for Fabric items. Endorsed items are also given priority in some searches, and you can sort for endorsed items for in some lists. In the [Microsoft Purview hub](./use-microsoft-purview-hub.md), admins can get insights about their organization's endorsed items in order to better drive users to quality content. 

For more information, see [Endorsement](./endorsement-overview.md).

**Guidance**: Certification enablement should be delegated to domain admins, and the domain admins should authorize data owners and producers to be able to certify the items they create. The data owners and producers should then always certify their items that have been tested and are ready for use by other teams. This helps separate low-quality, nontrusted items from trusted, ready-to-use assets. It also makes these trusted assets easier to find. In addition, data consumers should be educated about how to find trusted assets, and encouraged to use only certified items in their reports and other downstream processing.

### Tags

Tags are configurable text labels that can be applied to Fabric items to enhance item discoverability and use. Fabric administrators can define a set of tags that data owners can use to categorize their items. Once tags are applied to items, data consumers can view, search, and filter by the applied tags across the various Fabric experiences.

For more information, see [Tags in Microsoft Fabric](./tags-overview.md).

### Data lineage and impact analysis

In modern business intelligence projects, understanding the flow of data from a data source to its destination is a complex task. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. They might require a team of experts or deep investigation to understand. Lineage helps users understand the flow of data by providing a visualization that shows the relations between all the items in a workspace. For each item in the lineage view, you can display an impact analysis that shows what downstream items are affected if you make changes to the item.

For more information, see [Lineage](./lineage.md) and [Impact analysis](./impact-analysis.md).

**Guidance**: Use proper and consistent naming conventions for items. This practice helps when looking at lineage information.  

### Purview for governance across the org

Microsoft Purview offers solutions for protecting and governing data across an organization's entire data estate. The integration between Purview and Fabric makes it possible to use some of Purview's capabilities to govern and monitor your Fabric data in the context of your organization's entire data estates.

The data governance capabilities offered on Fabric via Purview's [live view](/purview/live-view) (preview) are described in the following sections. See also [Use Microsoft Purview to govern Microsoft Fabric](./microsoft-purview-fabric.md).

#### Data curation

Data curation in your organization involves gathering metadata information, lineage information, and other data from all sources that your organization uses. These sources can be on-premises, third-party clouds, third-party products and services, or CRM systems. This extraction process is also referred to as scanning in Purview. The built-in scanners in Purview retrieve all information by scanning your organization's data estate. In Purview, Data Map executes this process.

#### Data Map

Purview has a scanning engine that can scan and fetch metadata from disparate sources and populate Purview's data map. Purview exposes this metadata via Atlas APIs so that external services or ISVs can consume it. Data Map also interacts with Fabric and gets its metadata populated internally, so that business users can search, find, and use these data products to build their insights. Currently, data consumers can view all Fabric workspaces they have viewer access to. This view is known as [live view](/purview/live-view). On top of this view, you can execute manual scans on all Fabric items from Purview, where the process picks item-level metadata and makes it available for use in Purview. This feature is only available for the enterprise tier. Currently, you can have lineage on an item level.

#### Data discovery in Purview

Data consumers who work with your data should be able to search and find the relevant data. Purview helps by providing the concepts of domains. Business-friendly terminology and groupings make it more relevant and easier to search for data that teams are interested in, based on terms they're familiar with. This approach also blends well with the data mesh architectural pattern. Data catalog is the application layer in Purview that helps teams search for data.

**Guidance**: Enterprise and business architecture teams should define domains and also a persona mapping between business and technical players to make roles and responsibilities clear. These definitions must be in line with the domain definitions in Fabric.

#### Data Catalog in Purview

Purview Data Catalog exposes the metadata captured from all sources feeding your data platform. By using Data Catalog, you can search for the data and items you're interested in working with without having to know which systems are holding your data. All Fabric item metadata is available inside Purview.

## Monitor, uncover, get insights, and act

### Monitoring hub

The Microsoft Fabric monitoring hub enables users to monitor Fabric activities from a central location. Any Fabric user can use the monitoring hub, however, the monitoring hub displays activities only for Fabric items the user has permission to view.

For more information, see [Use the Monitoring hub](../admin/monitoring-hub.md).

**Guidance**: This capability should be exposed to developers and team members for monitoring scheduled workloads (such as a data flow or pipeline refresh), a Spark run, a data warehouse query, etc.

### Capacity metrics

**Guidance**: Platform owners and users with platform administrator roles should be aware of this feature and use it to monitor usage and consumption. For more information, see [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md).

### Purview hub

Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and data owners manage and govern their Fabric data estate. For administrators and data owners, the hub offers reports that provide insights about their Fabric items, particularly with respect to sensitivity labeling and endorsement. The hub also serves as a gateway to more advanced Purview capabilities such as Information Protection, Data Loss Prevention, and Audit. For more information, see [Microsoft Purview hub](./use-microsoft-purview-hub.md).

**Guidance**: Data stewards and owners should be made aware of the Fabric's Purview hub and what it provides in terms of getting insights about your organization's sensitive and endorsed data.

### Admin monitoring

The admin monitoring workspace provides admins with monitoring capabilities for their organization. Using the admin monitoring workspace resources, admins can perform security and governance tasks such as audits and usage checks. For more information, see [What is the admin monitoring workspace?](../admin/monitoring-workspace.md).

**Guidance**: We recommend that platform owners/Fabric administrators use this feature to gain an overall view of the Fabric platform.

## Related content

* [Fabric security overview](../security/security-overview.md)
* [Fabric administration overview](../admin/admin-overview.md)
* [Microsoft Purview permissions](/purview/purview-permissions)

