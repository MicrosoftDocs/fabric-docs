---
title: Governance and compliance in Microsoft Fabric
description: This article provides an overview of the governance and compliance in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: overview
ms.custom:
ms.date: 01/23/2024
---

# Governance and compliance in Microsoft Fabric

Microsoft Fabric governance and compliance provides set of capabilities that help you know, protect, manage, and monitor your organization's sensitive information, so as to gain and maintain customer trust and to meet data governance and compliance requirements and regulations. Many of these capabilities are built in, others require 

|[Manage your data estate](#manage-your-data-estate)|[Secure, protect, and comply](#secure-protect-and-comply)|[Encourage data discovery, trust, and use](#encourage-data-discovery-trust-and-use)|[Monitor, uncover, get insights, and act](#monitor-uncover-get-insights-and-act)|
|:----|:----|:----|:----|
|Admin portal|Privacy|OneLake data hub|Monitoring hub|
|Tenant, domain, and workspace setttings|Data security|Endorsement Trust and reuse|Capacity metrics|
|Domains|Purview Information Protection|Data lineage and impact analysis|Purview hub|
|Workspaces|Securing Fabric items within a workspace|Use Purview to govern data across the organization|Admin monitoring|
|Capacities|Securing data with Fabric items|||
|Metadata scanning|Audit logs|||


## Manage your data estate

### Admin portal

DONE
The Microsoft Fabric admin portal is a centralized place that allows your organization’s administrators to control your overall Fabric estate. This includes settings that govern Microsoft Fabric. For example, you can make changes to tenant settings, govern capacities, domains, and workspaces, and control how users interact with Microsoft Fabric. To provide flexibility, some aspects of administration and governance can be delegated to capacities, domains, and workspaces so the respective admins can manage them in their scope.

**Guidance**: The admin portal enables domain and capacity admins to manage their respective domains and capacities, while allowing tenant admins to manage all capacities and domains across the tenant.

### Tenant, domain, and workspace settings

NOT DONE:
Administrators on the tenant, domain, and workspace levels have controls to set certain settings which can allow certain functionality for a subset of users / privileged users or explicitly deny access to certain functionality and actions on different levels. This equates to applying tenant level settings / (non-negotiable) controls at the tenant admin level. Domain administrators have a limited set of delegated settings , which they are empowered to override. Tenant administrators can also decide on which users / groups are allowed to create workspaces. 

**Guidance**: The Fabric admins define tenant-wide settings, and the domain admins are expected to override the settings as needed. Individual teams (workspace owners) are expected to define their own more granular workspace-level controls and settings. 

### Domains

Data Mesh is a decentralized data architecture that organizes data by specific domains.  It's an architectural pattern which has been followed by many organizations to help build a governed data platform. To support this pattern, Fabric makes it possible to define domains and sub-domains within the platform.

a domain is a way of logically grouping together all the data in an organization that is relevant to a particular area or field. One of the most common uses for domains is to group data by business department, making it possible for departments to manage their data according to their specific regulations, restrictions, and needs.

This helps to effectively plan for organizing your teams and their items structurally. Fabric also provides delegated settings in domains which can help domain admins to adjust specific “delegated tenant level settings” which can be over over-ridden based on the business demand.

**Guidance**: Business and enterprise architects should design the organization's domain setup, while Fabric admins implement this design by creating domains and assigning domain owners as requested. Preferably, center of excellence (COE) teams should be part of this discussion to align the domains with the overall strategy of the organization.

### Workspaces

DONE: Assigning workspaces to individual teams to hold the Fabric items used by the team very much depends on internal team structure and how the teams want to handle their Fabric items (e.g. do they need one or many workspaces). For development purposes, a best practice is to have isolated workspaces per developer, so that they can work on their own without interfering with the shared workspace. Fabric admins are expected to define who has permission to create workspaces. Workspace admins are expected to define Spark environments that can be reused by users.

### Capacities

DONE: Recommendation: Split up capacities based on the requirements of the environment, e.g. development/test/acceptance/production (DTAP). This makes for better workload isolation and chargeback.

### Metadata scanning

NO GUIDANCE, ALL DESCRIPTION
Metadata information, or "data about your data", is crucial to understanding your data and using it effectively.

Metadata scanning facilitates governance of your organization's Microsoft Fabric data by making it possible for cataloging tools to catalog and report on the metadata of all your organization's Fabric items. It accomplishes this using a set of Admin REST APIs that are collectively known as the *scanner APIs*. The scanner APIs extract metadata such as item name, ID, sensitivity, endorsement status, etc. The scanner APIs help external tools or third-party tooling to collect metadata information from Fabric.

For more information, see [Metadata scanning](./metadata-scanning-overview.md).

Guidance: Scanner APIs help external tools or third-party tooling to collect metadata information from Fabric.

## Secure, protect, and comply

Data security and having a compliant data platform are important to make sure that your data stays safe and is not compromised. For details about network security, access control, and encryption, see the [Security overview](XXX)

Fabric leverages Microsoft Purview for making sure that the data is secure, complies with protected, and policies are applied to detect and alert sensitive data usage

And that leakage of sensitive data are detected and alerted 

### Privacy

The first phase of any data protection strategy is to identify where your private data sits.  This is considered one of the most challenging but important steps to make sure you can protect your data at the source. Manually identifying this is an inhumane task and can be quite ineffective. Fabric provides capabilities XXXXXX to do this..... 
To help with this, Microsoft Purview provides capabilities to automatically identify where your private data sits. This can be done by automatically scanning your estate or users do have the ability to manually tag sensitive items.  

 

### Data security

### Purview Information Protection

Information protection in Fabric enables you to discover, classify, and protect Fabric data using sensitivity labels from Microsoft Purview Information Protection. Fabric provides multiple capabilities, such as default labeling, label inheritance, and programmatic labeling, to help achieve maximal sensitivity label coverage across your entire Fabric data estate. Once labeled, data remains protected even when it's exported out of Fabric via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit.

For more information, see [Information Protection in Microsoft Fabric](./information-protection.md).

DONE: Recommendation: Sensitivity labels from Micrsoft Purview Information Protection and their associated label policies should be specified at an organizational level and be valid for the whole organization.

### Securing items in a workspace

DONE: Recommendation: Fabric administrators should decide, through specifying who can create workspaces, who can become a workspace administrator. These could be team leads in your organization, for example. These workspace administrators should then govern access to the items in their workspace by assigning appropriate workspace roles to users and consumers of the items.

### Securing data in Fabric items

DONE: Guidance: Individual teams are expected to apply additional controls at the item level.


### Auditing

To mitigate the risks of unauthorized access and use of your Fabric data, Fabric administrators and compliance teams in your organizations track and investigate user activity on Fabric items using Purview Audit. Many companies also need these audit logs for regulatory requirements which mandate storing audit logs for forensic investigation and potential data regulation violations. Microsoft Fabric provides item-level audits recoreding all activities on items in the audit logs that can be investigated in Purview Audit, which is available in the Purview compliance portal. Security teams and CISO teams can use these audit logs for monitoring and follow up actions.

Statement: Recommendation: Fabric item-level audits are logged in purview audits and can be used for analysis. Security teams / CISO teams can use these audit logs for monitoring and follow up actions. 

## Encourage data discovery, trust, and use

Fabric provides built-in capabilities to help users find and use reliable, quality data.

### OneLake data hub

The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them. Filtering and search options make it easier to get to relevant data.

For more information, see [Discover data items in the OneLake data hub](../get-started/onelake-data-hub.md).

 DONE: Guidance: Carefully defining and setting up domains is essential. This helps set the context for teams and makes for better definition of boundaries and ownership. Mapping workspaces to domains is key to helping implement this in Fabric.

### Endorsement

Mine
Endorsement is a way to make trustworthy, quality data more discoverable. Organizations often have large numbers of Microsoft Fabric items - data, processes and content - available for sharing and reuse by their Fabric users. Endorsement helps users identify and find the trustworthy high-quality items they need. With endorsement, item owners can promote their quality items, and organizations can certify items that meet their quality standards. Endorsed items are then clearly labeled, both in Fabric and in other places where users look for Fabric items. Endorsed items are also given priority in some searches, and you can sort for endorsed items for in some lists. In the Microsoft Purview hub, admins can get insights about their organization's endorsed items in order to better drive users to quality content.

DONE: Guidance: Certification enablement should be delegated to domain admins, and the domain admins should authorize data owners and producers to be able to certify the items they create. The data owners and producers should then always certify their items which have been tested and are ready for use by other teams. This helps separate low-quality, non-trusted items from trusted, ready-to-use assets. It also makes these trusted assets easier to find. In addition, data consumers should be educated about how to find trusted assets, and encouraged to use only certified items in their reports and other downstream processing.

### Data lineage and impact analysis

In modern business intelligence projects, understanding the flow of data from a data source to its destination is a complex task. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. They might require a team of experts or deep investigation to understand. Lineage helps users understand the flow of data by providing a visualization that shows the relations between all the items in a workspace. For each item in the lineage view, you can display an impact analysis that shows what downstream items would be affected if you made changes to the item. 

DONE: Guidance: We recommend using proper and consistent naming conventions for items. This can help while looking at lineage information.  

### Purview for governance across the org

His

Microsoft Purview offers solutions for protecting and governing data across an organization's entire data estate. An integration between Purview and Fabric makes it possible to use some of Purviews capabilities to govern and monitor your Fabric data in the context of your org's entire data estates.

The data governance capabilities which are offered on Fabric using purview described in the following sections.

From the live instance.

#### Data curation

Data curation in your organization involves gathering metadata information, lineage information, and others from all sources that your organization uses. This could be n-premise, third-party clouds, third-party products and services, or CRM systems to name a few. This extraction process is also referred to as scanning in purview. All information is retrieved using inbuilt scanners in purview which scan your organization’s data estate to collect this information. In purview this is executed by data map.

#### Data Map

Purview has a scanning engine which can scan and fetch metadata from disparate sources and populate purview’s data map. Purview exposes Via atlas APIs so that it can be consumed by external services or ISVs. Data Map also interacts with Fabric and gets its metadata populated internally so that business users can search, find and use these data products to build their insights on. Currently, data consumers can look at all Fabric workspaces they have viewer access to. This is known as live view. On top of this manual scans can be executed on all fabric Items from purview , where item level metadata is picked and is available for use in purview. In the current state, you can have lineage on an item level too.

#### Data discovery in Purview

Data consumers who work with your data should be able to  search and find the relevant data. Purview helps here by providing concepts of domains.  Business friendly terminology and groupings would make it more relevant and easier to search for data which teams are interested in based on terms which they are familiar with. This also blends well with the data mesh architectural pattern.  You could define data products which represent a grouping of items which consumers would search for. Definition for what defines a domain / definition of data products and defining roles and responsibilities are deliverables of the enterprise / business architecture teams. Data catalog is the application layer within purview which helps teams to search for data.

NEEDS WORK: Architechs should define domains and also the define a clear persona mapping between business and techinal players to make roles and responsibilities clear.

#### Data Catalog in Purview

Purview data catalog exposes the metadata captured from all sources feeding your data platform. With this customers can search for the data and items they are interested to work in without having to know which systems are holding your data. All metadata information of fabric items are available inside purview.

## Monitor, uncover, get insights, and act

### Monitoring hub

DONE: Guidance: This capability should be exposed to developers / team members who can use it to monitor scheduled workloads ( like a data flow / pipeline refresh ) , a spark run , data warehouse query , Kusto Query and DA jobs. 

### Capacity metrics

DONE: Guidance: Be aware that;;Platform owners / platform administrator roles in your organization could utilize this tooling to monitor usage and consumption.

### Purview hub

Mine
Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and data owners manage and govern their Fabric data estate. For administrators and data owners, the hub offers reports that provide insights about their Fabric items, particularly with respect to sensitivity labeling and endorsement. The hub also serves as a gateway to more advanced Purview capabilities such as Information Protection, Data Loss Prevention, and Audit. For more information, see Microsoft Purview hub.

His
Purview hub also acts as an entry point towards purview governance and compliance portals where compliance administrators could investigate audit logs, set MIP / DLP policies and act on compliance issues.

Guidance: 

### Admin monitoring

Fabric governance and compliance is tightly integrated with Microsoft Purview Information Protection and Data Loss Prevention. In addition, your Fabric data estate is automatically attached to Purview and can be investigated with Purview capabilities such as Data catalog and Microsoft Purview Audit.  

This article briefly describes the basic building blocks of Fabric governance and compliance and provides links for more information. Fabric governance and compliance capabilities work together with capabilities of [Fabric security](../security/security-overview.md) and [Fabric administration](../admin/admin-overview.md) to keep your organization’s data secure.

Guidance: We recommend tenant administrators use this feature to have an overall view of the fabric platform. 
Look at it to get an overall view. Data stewards.. how healthy is the platform (high level view, ) role that fits that profile. 

+++++++++


## Information protection

Information protection in Fabric enables you to discover, classify, and protect Fabric data using sensitivity labels from Microsoft Purview Information Protection. Fabric provides multiple capabilities, such as default labeling, label inheritance, and programmatic labeling, to help achieve maximal sensitivity label coverage across your entire Fabric data estate. Once labeled, data remains protected even when it's exported out of Fabric via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit.

For more information, see [Information Protection in Microsoft Fabric](./information-protection.md).

For more information, see [Data loss prevention policies for Power BI and Fabric](/power-bi/enterprise/service-security-dlp-policies-for-power-bi-overview).

## Endorsement

Endorsement is a way to make trustworthy, quality data more discoverable. Organizations often have large numbers of Microsoft Fabric items - data, processes and content -  available for sharing and reuse by their Fabric users. Endorsement helps users identify and find the trustworthy high-quality items they need. With endorsement, item owners can promote their quality items, and organizations can certify items that meet their quality standards. Endorsed items are then clearly labeled, both in Fabric and in other places where users look for Fabric items. Endorsed items are also given priority in some searches, and you can sort for endorsed items for in some lists. In the [Microsoft Purview hub](./use-microsoft-purview-hub.md), admins can get insights about their organization's endorsed items in order to better drive users to quality content. 

For more information, see [Endorsement](./endorsement-overview.md).

## Metadata scanning

Metadata scanning facilitates governance of your organization's Microsoft Fabric data by making it possible for cataloging tools to catalog and report on the metadata of all your organization's Fabric items. It accomplishes this using a set of Admin REST APIs that are collectively known as the *scanner APIs*. The scanner APIs extract metadata such as item name, ID, sensitivity, endorsement status, etc.

For more information, see [Metadata scanning](./metadata-scanning-overview.md).

## Data lineage and impact analysis

In modern business intelligence projects, understanding the flow of data from a data source to its destination is a complex task. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. They might require a team of experts or deep investigation to understand. Lineage helps users understand the flow of data by providing a visualization that shows the relations between all the items in a workspace. For each item in the lineage view, you can display an impact analysis that shows what downstream items would be affected if you made changes to the item.

For more information, see [Lineage](./lineage.md) and [Impact analysis](./impact-analysis.md).

## Domains

Domains are a way of logically grouping together all the data in an organization that is relevant to particular areas or fields, for example, by business unit. One of the most common uses for domains is to group data by business department, making it possible for departments to manage their data according to their specific regulations, restrictions, and needs.

Grouping data into domains enables better discoverability and governance. For instance, in the [OneLake data hub](../get-started/onelake-data-hub.md), users can filter content by domain in order find content that is relevant to them. With respect to governance, some tenant-level settings for managing and governing data can be delegated to the domain level, thus allowing domain-specific configuration of those settings.

For more information, see [Domains](./domains.md).

## Microsoft Purview hub

Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and data owners manage and govern their Fabric data estate. For administrators and data owners, the hub offers reports that provide insights about their Fabric items, particularly with respect to sensitivity labeling and endorsement. The hub also serves as a gateway to more advanced Purview capabilities such as Information Protection, Data Loss Prevention, and Audit. For more information, see [Microsoft Purview hub](./use-microsoft-purview-hub.md).

## Certifications

Microsoft Fabric has HIPPA BAA, ISO/IEC 27017, ISO/IEC 27018, ISO/IEC 27001, and ISO/IEC 27701 compliance certifications. To learn more, see [Fabric compliance offerings](https://powerbi.microsoft.com/blog/microsoft-fabric-is-now-hipaa-compliant/).

## Related content

* [Fabric security overview](../security/security-overview.md)
* [Fabric administration overview](../admin/admin-overview.md)