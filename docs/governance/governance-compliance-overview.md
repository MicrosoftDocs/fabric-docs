---
title: Governance and compliance in Microsoft Fabric
description: This article provides an overview of the governance and compliance in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: overview
ms.custom:
ms.date: 03/26/2024
---

# Governance overview and guidance

Microsoft Fabric governance and compliance provides set of capabilities that help you manage, protect, monitor, and improve the discoverabilitly of your organization's sensitive information, so as to gain and maintain customer trust and to meet data governance and compliance requirements and regulations. Many of these capabilities are built in and included with your Microsoft Fabric license, while some others require additional licensing from Microsoft Purview.

This article describes at a high level the main features and components that help you govern your organization's data estate, and includes some guidance with regard to taking advantage of the capabilities these features and components offer. It also provides links to more detailed information about each feature and component.

|[Manage your data estate](#manage-your-data-estate)|[Secure, protect, and comply](#secure-protect-and-comply)|[Encourage data discovery, trust, and use](#encourage-data-discovery-trust-and-use)|[Monitor, uncover, get insights, and act](#monitor-uncover-get-insights-and-act)|
|:----|:----|:----|:----|
|[Admin portal](#admin-portal)|[Privacy](#privacy)|[OneLake data hub](#onelake-data-hub)|[Monitoring hub](#monitoring-hub)|
|[Tenant, domain, and workspace setttings](#tenant-domain-and-workspace-settings)|[Data security](#data-security)|[Endorsement, trust and reuse](#endorsement)|[Capacity metrics](#capacity-metrics)|
|[Domains](#domains)|[Purview Information Protection](#purview-information-protection)*|[Data lineage and impact analysis](#data-lineage-and-impact-analysis)|[Purview hub](#purview-hub)|
|[Workspaces](#workspaces)|[Securing Fabric items within a workspace](#securing-items-in-a-workspace)|[Purview for governance across the org](#purview-for-governance-across-the-org)*|[Admin monitoring](#admin-monitoring)|
|[Capacities](#certifications)|[Securing data in Fabric items](#securing-data-in-fabric-items)|||
|[Metadata scanning](#metadata-scanning)|[Auditing](#auditing)|||
*Requires additional licensing

## Manage your data estate

This section describes some of the main features you can use to help manage your data estate.

### Admin portal

The Microsoft Fabric admin portal is a centralized place that allows your organization's administrators to control your overall Fabric estate. This includes settings that govern Microsoft Fabric. For example, you can make changes to tenant settings, govern capacities, domains, and workspaces, and control how users interact with Microsoft Fabric. To provide flexibility, some aspects of administration and governance can be delegated to capacities, domains, and workspaces so the respective admins can manage them in their scope.

For more information about the admin portal, see [What is the admin portal?](../admin/admin-center.md).

**Guidance**: The admin portal enables domain and capacity admins to manage their respective domains and capacities, while allowing tenant admins to manage all capacities and domains across the tenant.

### Tenant, domain, and workspace settings

Tenant, domain, and workspace admins each have settings within their scope that they can configure to control who has access to certain functionalities at different levels. Some tenant-level settings can be delegated to domain and capacity admins.

**Guidance**: Fabric admins should define tenant-wide settings, leaving domain admins to override delegated settings as needed. Individual teams (workspace owners) are expected to define their own more granular workspace-level controls and settings.

### Domains

Domains are a way of logically grouping together all the data in an organization that is relevant to particular areas or fields, for example, by business unit. One of the most common uses for domains is to group data by business department, making it possible for departments to manage their data according to their specific regulations, restrictions, and needs.

Grouping data into domains and subdomains enables better discoverability and governance. For instance, in the [OneLake data hub](../get-started/onelake-data-hub.md), users can filter content by domain in order find content that is relevant to them. With respect to governance, some tenant-level settings for managing and governing data can be delegated to the domain level, thus allowing domain-specific configuration of those settings.

For more information, see [Domains](./domains.md).

**Guidance**: Business and enterprise architects should design the organization's domain setup, while Fabric admins should implement this design by creating domains and subdomains and assigning domain owners. Preferably, center of excellence (COE) teams should be part of this discussion to align the domains with the overall strategy of the organization.

### Workspaces

Teams in organizations use workspaces to create Fabric items and collaborate with each other. These workspaces can be assigned to teams or departments based on governance requirements and data boundaries. How exactly workspace assignment is done depends on internal team struture and how the teams want to handle their Fabric items (e.g. do they need one or many workspaces).

**Guidance**: For development purposes, a best practice is to have isolated workspaces per developer, so that they can work on their own without interfering with the shared workspace. Fabric admins are expected to define who has permission to create workspaces. Workspace admins are expected to define Spark environments that can be reused by users.

### Capacities

Capacities are the compute resources used by all Fabric workloads. Based on organizational requirements, capacities can be used as isolation boundaries for compute, chargebacks etc.

**Guidance**: Split up capacities based on the requirements of the environment, e.g. development/test/acceptance/production (DTAP). This makes for better workload isolation and chargeback.

### Metadata scanning

Metadata scanning facilitates governance of your organization's Microsoft Fabric data by making it possible for cataloging tools to catalog and report on the metadata of all your organization's Fabric items. It accomplishes this using a set of Admin REST APIs that are collectively known as the *scanner APIs*. The scanner APIs extract metadata such as item name, ID, sensitivity, endorsement status, etc.

For more information, see [Metadata scanning](./metadata-scanning-overview.md).

## Secure, protect, and comply

Data security and having a compliant data platform are important for making sure that your data stays safe and is not compromised. For details about network security, access control, and encryption, see the [Security overview](../security/security-overview.md)

Fabric leverages Microsoft Purview for protecting sensitive data and helping ensure compliance with data privacy regulations and requirements.

### Privacy

The first phase of any data protection strategy is to identify where your private data sits. This is considered one of the most challenging but important steps towards making sure you can protect your data at the source. The following sections describe capabilities Fabric provides to help your organization meet this challenge.

### Data security

To make sure data in Fabric is secure from unauthorized access and stays compliant wtih data privacy requirements, you can leverage sensitivity labels from Microsoft Purview Information Protection in combination with built-in Fabric capabilities to manually or automatically tag your organization's data. Purview Audit then captures audit trails on activities performed in Fabric.  This includes capturing user activities in the Fabric tenant, such as Lakehouse access, Power BI access, Spark activities, data factory activities, logins, etc.

### Purview Information Protection

Information protection in Fabric enables you to discover, classify, and protect Fabric data using sensitivity labels from Microsoft Purview Information Protection. Fabric provides multiple capabilities, such as default labeling, label inheritance, and programmatic labeling, to help achieve maximal sensitivity label coverage across your entire Fabric data estate. Once labeled, data remains protected even when it's exported out of Fabric via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit.

For more information, see [Information Protection in Microsoft Fabric](./information-protection.md).

**Guidance**: Sensitivity labels from Micrsoft Purview Information Protection and their associated label policies should be specified at an organizational level and be valid for the whole organization.

### Securing items in a workspace

Organizational teams can have individual workspaces where different personas collaborate and work on generating content. Access to the items in the workspace is regulated via workspace roles assigned to users by the workspace admin.

**Guidance**: Fabric administrators should decide, through specifying who can create workspaces, who can become a workspace administrator. These could be team leads in your organization, for example. These workspace administrators should then govern access to the items in their workspace by assigning appropriate workspace roles to users and consumers of the items.

### Securing data in Fabric items

Along with the broad security that gets applied at the tenant or workspace level, there are additional data-level controls that can be deployed by individual teams to manage access to individual tables, rows, and columns. Fabric currently provides such data-level control for SQL analytics endpoints, Synapse Data Warehouses in Fabric, and Direct Lake.

**Guidance**: Individual teams are expected to apply these additional controls at the item and data level.

### Auditing

To mitigate the risks of unauthorized access and use of your Fabric data, Fabric administrators and compliance teams in your organizations can track and investigate user activity on Fabric items using Purview Audit, which is available in the Purview compliance portal. Many companies also need these audit logs for regulatory requirements, which often mandate storing audit logs for forensic investigation and potential data regulation violations.

**Guidance**: Fabric administrators and compliance teams should be made aware that Fabric item-level audits are logged in Purview Audit and can be used for analysis.

### Certifications

Microsoft Fabric has HIPPA BAA, ISO/IEC 27017, ISO/IEC 27018, ISO/IEC 27001, and ISO/IEC 27701 compliance certifications. To learn more, see [Fabric compliance offerings](https://powerbi.microsoft.com/blog/microsoft-fabric-is-now-hipaa-compliant/).

## Encourage data discovery, trust, and use

Fabric provides built-in capabilities to help users find and use reliable, quality data.

### OneLake data hub

The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them. Filtering and search options make it easier to get to relevant data.

For more information, see [Discover data items in the OneLake data hub](../get-started/onelake-data-hub.md).

 **Guidance**: Carefully defining and setting up domains is essential for creating an efficient experience in the data hub. Carefully defined domains help set the context for teams and makes for better definition of boundaries and ownership. Mapping workspaces to domains is key to helping implement this in Fabric.

### Endorsement

Endorsement is a way to make trustworthy, quality data more discoverable. Organizations often have large numbers of Microsoft Fabric items - data, processes and content -  available for sharing and reuse by their Fabric users. Endorsement helps users identify and find the trustworthy high-quality items they need. With endorsement, item owners can promote their quality items, and organizations can certify items that meet their quality standards. Endorsed items are then clearly labeled, both in Fabric and in other places where users look for Fabric items. Endorsed items are also given priority in some searches, and you can sort for endorsed items for in some lists. In the [Microsoft Purview hub](./use-microsoft-purview-hub.md), admins can get insights about their organization's endorsed items in order to better drive users to quality content. 

For more information, see [Endorsement](./endorsement-overview.md).

**Guidance**: Certification enablement should be delegated to domain admins, and the domain admins should authorize data owners and producers to be able to certify the items they create. The data owners and producers should then always certify their items which have been tested and are ready for use by other teams. This helps separate low-quality, non-trusted items from trusted, ready-to-use assets. It also makes these trusted assets easier to find. In addition, data consumers should be educated about how to find trusted assets, and encouraged to use only certified items in their reports and other downstream processing.

### Data lineage and impact analysis

In modern business intelligence projects, understanding the flow of data from a data source to its destination is a complex task. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. They might require a team of experts or deep investigation to understand. Lineage helps users understand the flow of data by providing a visualization that shows the relations between all the items in a workspace. For each item in the lineage view, you can display an impact analysis that shows what downstream items would be affected if you made changes to the item.

For more information, see [Lineage](./lineage.md) and [Impact analysis](./impact-analysis.md).

**Guidance**: We recommend using proper and consistent naming conventions for items. This can help while looking at lineage information.  

### Purview for governance across the org

Microsoft Purview offers solutions for protecting and governing data across an organization's entire data estate. The integration between Purview and Fabric makes it possible to use some of Purview's capabilities to govern and monitor your Fabric data in the context of your organizations's entire data estates.

The data governance capabilities offered on Fabric via Purview's [live view](/purview/live-view) (preview) are described in the following sections.

#### Data curation

Data curation in your organization involves gathering metadata information, lineage information, and others from all sources that your organization uses. These could be on-premises, third-party clouds, third-party products and services, or CRM systems to name a few. This extraction process is also referred to as scanning in Purview. All information is retrieved using built-in scanners in Purview which scan your organization’s data estate to collect this information. In Purview this is executed by Data Map.

#### Data Map

Purview has a scanning engine which can scan and fetch metadata from disparate sources and populate Purview's data map. Purview exposes this metadata via Atlas APIs so that it can be consumed by external services or ISVs. Data Map also interacts with Fabric and gets its metadata populated internally, so that business users can search, find, and use these data products to build their insights. Currently, data consumers can look at all Fabric workspaces they have viewer access to. This is known as [live view](/purview/live-view). On top of this, manual scans can be executed on all Fabric Items from Purview, where item level metadata is picked and made available for use in Purview. Currently you can have lineage on an item level.

#### Data discovery in Purview

Data consumers who work with your data should be able to search and find the relevant data. Purview helps here by providing concepts of domains. Business-friendly terminology and groupings make it more relevant and easier to search for data which teams are interested in, based on terms which they are familiar with. This also blends well with the data mesh architectural pattern. Data catalog is the application layer in Purview that helps teams search for data.

**Guidance**: Enterprise and business architecture teams should define domains and also the define a clear persona mapping between business and techinal players to make roles and responsibilities clear.

#### Data Catalog in Purview

Purview Data Catalog exposes the metadata captured from all sources feeding your data platform. With Data Catalog, customers can search for the data and items they are interested in working with without having to know which systems are holding your data. All metadata information of Fabric items is available inside Purview.

## Monitor, uncover, get insights, and act

### Monitoring hub

**Guidance**: This capability should be exposed to developers and team members for monitoring scheduled workloads (such as a data flow or pipeline refresh), a Spark run, a data warehouse query, etc.

### Capacity metrics

**Guidance**: Platform owners and those with platform administrator roles should be aware of this feature and use it to monitor usage and consumption. FOr more information, see [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md).

### Purview hub

Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and data owners manage and govern their Fabric data estate. For administrators and data owners, the hub offers reports that provide insights about their Fabric items, particularly with respect to sensitivity labeling and endorsement. The hub also serves as a gateway to more advanced Purview capabilities such as Information Protection, Data Loss Prevention, and Audit. For more information, see [Microsoft Purview hub](./use-microsoft-purview-hub.md).

**Guidance**: Data stewards and owners should be made aware of the Fabric's Purview hub and what it provides in terms of getting insights about your organizations sentive and endoresed data.

### Admin monitoring

The Admin monitoring workspace provides admins with monitoring capabilities for their organization. Using the admin monitoring workspace resources, admins can perform security and governance tasks such as audits and usage checks. For more information, see [What is the admin monitoring workspace?](../admin/monitoring-workspace.md).

**Guidance**: We recommend tenant administrators use this feature to gain an overall view of the Fabric platform. 

## Related content

* [Fabric security overview](../security/security-overview.md)
* [Fabric administration overview](../admin/admin-overview.md)