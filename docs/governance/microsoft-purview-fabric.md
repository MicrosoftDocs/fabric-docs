---
title: Use Microsoft Purview to govern Microsoft Fabric
description: This article describes how Microsoft Purview and Microsoft Fabric work together to deliver a complete, governed data flow.
ms.reviewer: viseshag
ms.author: whhender
author: whhender
ms.topic: overview 
ms.date: 05/23/2023
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

Microsoft Purview works seamlessly with Microsoft Fabric so can discover and manage Microsoft Fabric artifacts in the Microsoft Purview governance portal. The integration allows you to take advantage of these applications in Microsoft Purview:

- **Microsoft Purview Information Protection** - allows you to discover and classify data at scale, with built in labeling and protection and encryption. Set sensitivity label on datasets, reports, PBIX files, datamarts, etc. Protect data when export to Excel, PowerPoint, Word, PBIX and PDF files. For more information, see [Information Protection in Microsoft Purview](information-protection.md).
- **Microsoft Purview Data Loss Prevention** - allows you to prevent accidental or unauthorized sharing of sensitive data. Automatically enforce compliance with regulations and internal policies across cloud and on-premises. Data loss prevention is currently supported for Power BI datasets only. For more information, see [Data loss prevention policies for Power BI](/power-bi/enterprise/service-security-dlp-policies-for-power-bi-overview).
- **Microsoft Purview Data Estate Insights** - aggregates information about your data estate to allow you to gain insights about your governance journey, your data, or even your data catalog usage at a glance. For more information, see [Microsoft Purview Data Estate Insights](/azure/purview/concept-insights).
- **Microsoft Purview Data Map** - creates a business-oriented map of your data estate, and elastically stores the metadata that underpins your data estate insights and data catalog to allow you to manage your data estate all in one place. For more information, see the [Microsoft Purview Data Map](/azure/purview/overview#data-map).
- **Microsoft Purview Data Catalog** - allows your users to browse and search for relevant data in their organization. Users can also annotate and curate data sources so your data estate is discoverable and reliable. For more information, see the [Microsoft Purview Data Catalog](/azure/purview/overview#data-catalog-app).

## Microsoft Purview Hub

The Microsoft Purview Hub allows you to see insights about your Fabric data inside Fabric itself! It also acts as a gateway between Fabric and Microsoft Purview so you can govern the rest of your data estate as well.

[Link to hub documentation](use-microsoft-purview-hub.md)

## Microsoft Purview permissions

With a [Microsoft Fabric license](../enterprise/licenses.md), users are able view all the Microsoft Fabric artifacts they have access to in the Microsoft Purview Data Catalog. This allows your users to search for and discover the resources available to them.

To view the Microsoft Purview Data Estate Insights, your users need an [insights reader role](/azure/purview/catalog-permissions#roles) in the Microsoft Purview governance portal.

## Learn more

- How to use the [Microsoft Purview Hub] (use-microsoft-purview-hub.md)
