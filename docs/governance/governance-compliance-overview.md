---
title: What is Microsoft Fabric governance and compliance?
description: This article provides an overview of the governance and compliance in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 05/23/2023
---

# What is Microsoft Fabric governance and compliance?

Microsoft Fabric governance and compliance is a set of capabilities that help you manage, protect, and monitor your organization's sensitive information. This article briefly describes the basic building blocks of Fabric governance and compliance and provides links for more information.

## Information protection

Information protection in Fabric enables you to discover, classify, and protect Fabric data using sensitivity labels from Microsoft Purview Information Protection. Fabric's information protection capabilities help ensure that all the Fabric items in your organization are labeled. Once labeled, data remains protected even when it's exported out of Fabric via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit. For more information, see [Information Protection in Microsoft Fabric](./information-protection.md).

## Data loss prevention

Data loss prevention (DLP) policies help organizations detect and protect their sensitive data. Currently, Fabric supports DLP for Power BI semantic models only. DLP policies detect upload of sensitive data into semantic models. They can detect sensitivity labels and sensitive info types, such as credit card and social security numbers. They can be configured to generate policy tips for semantic model owners and alerts for security admins. DLP policies can also be configured to allow data owners to override them. For more information, see [Data loss prevention policies for Power BI](/power-bi/enterprise/service-security-dlp-policies-for-power-bi-overview).

## Endorsement

Organizations often have large numbers of Microsoft Fabric items - data, processes and content -  available for sharing and reuse by their Fabric users. Endorsement helps users identify and find the trustworthy high-quality items they need. With Endorsement, item owners can promote their quality items, and organizations can certify items that meet their quality standards. Endorsed items are then clearly labeled, both in Fabric and in other places where users look for Fabric items. Endorsed items are also given priority in some searches, and you can sort for endorsed items for in some lists. In the [Microsoft Purview hub](./use-microsoft-purview-hub.md), admins can get insights about their organization's endorsed items in order to better drive users to quality content.

For more information, see [Endorsement](./endorsement-overview.md).

## Metadata scanning

Metadata scanning facilitates governance of your organization's Microsoft Fabric data by making it possible for cataloging tools to catalog and report on the metadata of all your organization's Fabric items. It accomplishes this using a set of Admin REST APIs that are collectively known as the *scanner APIs*. For more information, see [Metadata scanning](./metadata-scanning-overview.md).

## Lineage

In modern business intelligence projects, understanding the flow of data from a data source to its destination is a complex task. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. They might require a team of experts or deep investigation to understand. Lineage helps users understand the flow of data by providing a visualization that shows the relations between all the items in a workspace. For each item in the lineage view, you can display an impact analysis that shows what downstream items would be affected if you made changes to the item. For more information, see [Lineage](./lineage.md) and [Impact analysis](./impact-analysis.md).

## Microsoft Purview hub

Microsoft Purview hub is a centralized page in Fabric that helps Fabric administrators and data owners manage and govern their Fabric data estate. For administrators and data owners, the hub offers reports that provide insights about their Fabric items, particularly with respect to sensitivity labeling and endorsement. The hub also serves as a gateway to more advanced Purview capabilities such as Information Protection, Data Loss Prevention, and Audit. For more information, see [Microsoft Purview hub](./use-microsoft-purview-hub.md).

>[!NOTE]
>The Microsoft Purview hub is currently available to administrators only.

## Related content

* [What is Microsoft Fabric](../get-started/microsoft-fabric-overview.md)
