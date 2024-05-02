---
title: "Standards compliance in Microsoft Fabric"
description: "This article describes Microsoft Fabric's adherence to compliance standards."
author: paulinbar
ms.author: painbar
ms.reviewer: kadejo
ms.service: fabric
ms.topic: concept-article #Don't change
ms.date: 05/02/2024

#customer intent: As a Fabric administrator or decision maker, I want to learn about Fabric's adherence to compliance standards.

---

# Standards compliance in Microsoft Fabric

This article describes Microsoft Fabric's adherence to compliance standards and provides links to relevant resources. The target audience is Fabric administrators and others who need to know how and whether Fabric meets their organization's security, privacy, and reliability standards.

## Introduction

Adherence to compliance standards transcends mere rule-following. It represents a commitment to building software with a foundation of security, privacy, and quality. These frameworks, encompassing legal requirements, industry standards, and internal best practices, serve as guiding principles throughout the development process.

Microsoft Fabric is governed by the [Microsoft Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=31) and the [Microsoft Enterprise Privacy Statement](https://www.microsoft.com/privacystatement/OnlineServices/Default.aspx).

For the location of data processing, refer to the *Location of Data Processing* terms in the [Microsoft Online Services Terms](https://www.microsoftvolumelicensing.com/Downloader.aspx?DocumentId=9555) and to the [Data Protection Addendum](https://www.microsoft.com/download/details.aspx?id=101581).

## Business continuity and disaster recovery

When it comes to business continuity and disaster recovery (BCDR), Microsoft uses the [shared responsibility model](/azure/reliability/business-continuity-management-program) for disaster recovery (DR). In a shared responsibility model, Microsoft ensures that the baseline infrastructure and platform services are available. At the same time, many Azure services don't automatically replicate data or fall back from a failed region to cross-replicate to another enabled region. For those services, the customer is responsible for setting up a disaster recovery plan that works for their workload. Most services that run on Azure platform as a service (PaaS) offerings provide features and guidance to support DR, and you can use [service-specific features to support fast recovery](/azure/reliability/reliability-guidance-overview) to help develop your DR plan.

DR is about recovering from high-impact events, such as natural disasters or failed deployments that result in downtime and data loss. Regardless of the cause, the best remedy for a disaster is a well-defined and tested DR plan and an application design that actively supports DR. Before you begin to think about creating your disaster recovery plan, see [Recommendations for designing a disaster recovery strategy](/azure/well-architected/reliability/disaster-recovery).

## Security development lifecycle

Fabric follows the Security Development Lifecycle (SDL), which consists of a set of strict security practices that support security assurance and compliance requirements. The SDL helps developers build more secure software by reducing the number and severity of vulnerabilities in software, while reducing development cost. For more information, see [Microsoft Security Development Lifecycle Practices](https://www.microsoft.com/securityengineering/sdl/practices).

## Compliance offerings

Compliance offerings are grouped into four segments: **globally applicable**, **US government**, **industry specific**, and **region/country specific**. Compliance offerings are based on various types of assurances, including formal certifications, attestations, validations, authorizations, and assessments produced by independent third-party auditing firms, as well as contractual amendments, self-assessments, and customer guidance documents produced by Microsoft. Each offering description provides links to downloadable resources to assist you with your own compliance obligations. You can access Azure and other Microsoft cloud services audit documentation via the [Service Trust Portal](https://servicetrust.microsoft.com/) (STP).  

While certifications typically occur after a product launch (Generally Available or GA), Microsoft integrates compliance best practices throughout the development lifecycle. This proactive approach ensures a strong foundation for future certifications, even though they follow established audit cycles. In simpler terms, Microsoft prioritizes building compliance in from the start, even if formal certification comes later.

Compliance is a shared responsibility. To comply with laws and regulations, cloud service providers and their customers enter a shared responsibility to ensure that each does their part.

* Compliance Offerings - [Compliance offerings for Microsoft 365, Azure, and other Microsoft services. | Microsoft Learn](/compliance/regulatory/offering-home)
* Audit Reports - [Service Trust Portal Home Page (microsoft.com)](https://servicetrust.microsoft.com/ViewPage/HomePageVNext)
* Compliance is a Shared Responsibility - [Shared responsibility in the cloud - Microsoft Azure | Microsoft Learn](/azure/security/fundamentals/shared-responsibility?toc=%2Fcompliance%2Fassurance%2Ftoc.json&bc=%2Fcompliance%2Fassurance%2Fbreadcrumb%2Ftoc.json)

For more compliance information, the [Microsoft Trust Center](https://www.microsoft.com/trustcenter) is the primary resource for Fabric. For more information about compliance, see [Microsoft compliance offerings](/compliance/regulatory/offering-home).

## Related content

* [Fabric governance documentation](./governance/index.md)
* [Fabric security documentation](../security/index.md)
* [Fabric admin documentation](../admin/index.md)