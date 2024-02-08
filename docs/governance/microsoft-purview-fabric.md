---
title: Use Microsoft Purview to govern Microsoft Fabric
description: This article describes how Microsoft Purview and Microsoft Fabric work together to deliver a complete, governed data flow.
ms.reviewer: viseshag
ms.author: whhender
author: whhender
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/12/2023
---

# Use Microsoft Purview to govern Microsoft Fabric

Microsoft Purview and Microsoft Fabric are part of the Microsoft Intelligent data platform that allows you to store, analyze, and govern your data. With Microsoft Fabric and Microsoft Purview together you're able to govern your entire estate and lineage of data. From data source down to the Power BI report, Microsoft Purview and Fabric work together seamlessly so you can store, analyze, and govern your data without piecing together services from multiple vendors.

## What is Microsoft Purview?

Microsoft Purview is a family of data governance, risk, and compliance solutions that can help your organization govern, protect, and manage your entire data estate. Microsoft Purview solutions provide integrated coverage and help address the recent increases in remote user connectivity, the fragmentation of data across organizations, and the blurring of traditional IT management roles.

Microsoft Purview includes [risk and compliance solutions](/microsoft-365/compliance/purview-compliance) and [unified data governance solutions](/azure/purview/overview) that support both Microsoft 365, on-premises, multicloud, and software-as-a-service (SaaS) data services. Microsoft Purview can help you:

- Protect sensitive data across clouds, apps, and devices
- Identify data risks and manage regulatory compliance requirements
- Get started with regulatory compliance
- Create an up-to-date map of your entire data estate that includes data classification and end-to-end lineage
- Identify where sensitive data is stored in your estate
- Create a secure environment for data consumers to find valuable data
- Generate insights about how your data is stored and used

For more information, you can follow these links:

- Get started with [Microsoft Purview risk and compliance solutions](/microsoft-365/compliance/purview-compliance)
- Get started with [Microsoft Purview governance solutions](/azure/purview/overview)

## Microsoft Purview and Microsoft Fabric together

Microsoft Purview works with Microsoft Fabric so users can discover and manage Microsoft Fabric items in Microsoft Purview applications. The integration currently allows you to take advantage of these applications:

- **Microsoft Purview Data Catalog** - automatically view metadata about your Microsoft Fabric items in the Microsoft Purview Data Catalog with [live view in Microsoft Purview.](/purview/live-view) Or, connect your data catalog to Microsoft Fabric in [the same tenant](/purview/register-scan-fabric-tenant) or [across tenants](/purview/register-scan-fabric-tenant-cross-tenant).
- **Microsoft Purview Information Protection** - allows you to discover, classify, and protect Fabric data using sensitivity labels from Microsoft Purview Information Protection. Sensitivity labels can be set on all Fabric items. Data remains protected when it's exported via supported export paths. Compliance admins can monitor activities on sensitivity labels in Microsoft Purview Audit For more information, see [Information Protection in Microsoft Purview](information-protection.md).
- **Microsoft Purview Data Loss Prevention (DLP)** - DLP policies are currently supported in Fabric for Power BI semantic models only. DLP policies detect upload of sensitive data into semantic models. They can detect sensitivity labels and sensitive info types, such as credit card and social security numbers. They can be configured to generate policy tips for semantic model owners and alerts for security admins. DLP policies can also be configured to allow data owners to override them. For more information, see [data loss prevention policies](/power-bi/enterprise/service-security-dlp-policies-for-power-bi-overview).
- **Microsoft Purview Audit** - all Microsoft Fabric user activities are logged and available in the Microsoft Purview audit log. For more information, see [track user activities for Microsoft Fabric](../admin/track-user-activities.md) and [track user activities in Power BI](/power-bi/admin/service-admin-auditing#use-the-audit-log).

Microsoft Purview and Microsoft Fabric will continue to work more closely together. Soon you'll be able to use more solutions to monitor and manage Microsoft Fabric as well.

## Microsoft Purview Hub

The Microsoft Purview Hub allows you to see insights about your Fabric data inside Fabric itself! It also acts as a gateway between Fabric and Microsoft Purview so you can govern the rest of your data estate as well.

[You can follow this link to the Microsoft Purview Hub documentation.](use-microsoft-purview-hub.md)

## Learn more

- How to use the [Microsoft Purview Hub](use-microsoft-purview-hub.md)
