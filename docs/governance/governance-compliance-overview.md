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

### Tenant, domain, and workspace settings

### Domains 

### Workspaces

### Capacities

### Metadata scanning

## Secure, protect, and comply

### Privacy

### Data security

### Purview Information Protection

Information protection in Fabric enables you to discover, classify, and protect Fabric data using sensitivity labels from Microsoft Purview Information Protection. Fabric provides multiple capabilities, such as default labeling, label inheritance, and programmatic labeling, to help achieve maximal sensitivity label coverage across your entire Fabric data estate. Once labeled, data remains protected even when it's exported out of Fabric via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit.

For more information, see [Information Protection in Microsoft Fabric](./information-protection.md).

### Securing items in a workspace

### Securing data in Fabric items

### Auditing

## Encourage data discovery, trust, and use

### OneLake data hub

The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them.

Finding relevant data to work is critical to generate right insights. Fabric provides you with OneLake Datahub which allows consumers to filter items by type, domain, etc.

### Endorsement

Mine
Endorsement is a way to make trustworthy, quality data more discoverable. Organizations often have large numbers of Microsoft Fabric items - data, processes and content - available for sharing and reuse by their Fabric users. Endorsement helps users identify and find the trustworthy high-quality items they need. With endorsement, item owners can promote their quality items, and organizations can certify items that meet their quality standards. Endorsed items are then clearly labeled, both in Fabric and in other places where users look for Fabric items. Endorsed items are also given priority in some searches, and you can sort for endorsed items for in some lists. In the Microsoft Purview hub, admins can get insights about their organization's endorsed items in order to better drive users to quality content.

### Data lineage and impact analysis

In modern business intelligence projects, understanding the flow of data from a data source to its destination is a complex task. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. They might require a team of experts or deep investigation to understand. Lineage helps users understand the flow of data by providing a visualization that shows the relations between all the items in a workspace. For each item in the lineage view, you can display an impact analysis that shows what downstream items would be affected if you made changes to the item. 

### Purview for governance across the org

His

Microsoft Purview offers solutions for protecting and governing data across an organization's entire data estate. An integration between Purview and Fabric makes it possible to use some of Purviews capabilities to govern and monitor your Fabric data in the context of your org's entire data estates.

The data governance capabilities which are offered on Fabric using purview described in the following sections.

#### Data Curation

Data curation in your organization involves gathering metadata information, lineage information, and others from all sources that your organization uses. This could be n-premise, third-party clouds, third-party products and services, or CRM systems to name a few. This extraction process is also referred to as scanning in purview. All information is retrieved using inbuilt scanners in purview which scan your organization’s data estate to collect this information. In purview this is executed by data map.

#### Data Map
P
urview has a scanning engine which can scan and fetch metadata from disparate sources and populate purview’s data map. Purview exposes Via atlas APIs so that it can be consumed by external services or ISVs. Data Map also interacts with Fabric and gets its metadata populated internally so that business users can search, find and use these data products to build their insights on. Currently, data consumers can look at all Fabric workspaces they have viewer access to. This is known as live view. On top of this manual scans can be executed on all fabric Items from purview , where item level metadata is picked and is available for use in purview. In the current state , you can have lineage on an item level too. 

#### Data Discovery in Purview

Data consumers who work with your data should be able to  search and find the relevant data. Purview helps here by providing concepts of domains .  Business friendly terminology and groupings would make it more relevant and easier to search for data which teams are interested in based on terms which they are familiar with. This also blends well with the data mesh architectural pattern.  You could define data products which represent a grouping of items which consumers would search for. Definition for what defines a domain / definition of data products and defining roles and responsibilities are deliverables of the enterprise / business architecture teams. Data catalog is the application layer within purview which helps teams to search for data.

#### Data Catalog in purview
Purview data catalog exposes the metadata captured from all sources feeding your data platform. With this customers can search for the data and items they are interested to work in without having to know which systems are holding your data. All metadata information of fabric items are available inside purview.

## Monitor, uncover, get insights, and act

### Monitoring hub

### Capacity metrics

### Purview hub

Mine
Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and data owners manage and govern their Fabric data estate. For administrators and data owners, the hub offers reports that provide insights about their Fabric items, particularly with respect to sensitivity labeling and endorsement. The hub also serves as a gateway to more advanced Purview capabilities such as Information Protection, Data Loss Prevention, and Audit. For more information, see Microsoft Purview hub.

His
Purview hub also acts as an entry point towards purview governance and compliance portals where compliance administrators could investigate audit logs, set MIP / DLP policies and act on compliance issues.

### Admin monitoring

Fabric governance and compliance is tightly integrated with Microsoft Purview Information Protection and Data Loss Prevention. In addition, your Fabric data estate is automatically attached to Purview and can be investigated with Purview capabilities such as Data catalog and Microsoft Purview Audit.  

This article briefly describes the basic building blocks of Fabric governance and compliance and provides links for more information. Fabric governance and compliance capabilities work together with capabilities of [Fabric security](../security/security-overview.md) and [Fabric administration](../admin/admin-overview.md) to keep your organization’s data secure.

## Information protection

Information protection in Fabric enables you to discover, classify, and protect Fabric data using sensitivity labels from Microsoft Purview Information Protection. Fabric provides multiple capabilities, such as default labeling, label inheritance, and programmatic labeling, to help achieve maximal sensitivity label coverage across your entire Fabric data estate. Once labeled, data remains protected even when it's exported out of Fabric via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit.

For more information, see [Information Protection in Microsoft Fabric](./information-protection.md).

## Data loss prevention

Data loss prevention (DLP) policies help organizations detect and protect their sensitive data. DLP policies detect upload of sensitive data into Power BI semantic models and supported Fabric items. They can detect sensitivity labels and sensitive info types, such as credit card and social security numbers. They can be configured to generate policy tips for item owners and alerts for security admins. DLP policies can also be configured to allow data owners to override them.

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