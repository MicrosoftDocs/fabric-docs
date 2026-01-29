---
title: Fabric Workload Hub validation guidelines and requirements
description: Learn about the guidelines and requirements for publishing a Microsoft Fabric workload to the Workload Hub.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.date: 02/18/2025
---

# Workload publishing requirements

This article describes the requirements that are needed for a custom workload to be listed in the Microsoft Fabric Workload Hub. Make sure your workload complies with these requirements before you submit your workload for publication.

_Definitions:_

* Required:
Workloads need to implement and comply with the requirement to pass validation.

* Optional:
Workloads can decide if they want to use or support this requirement or not. In any case, it needs to be documented in the Attestation document.

* Not-Supported:
Workloads can't support this requirement today because the platform doesn't allow it. To create transparency to the customer partners are still asked to put the information into their Attestation document.

## Business requirements

Building applications in Fabric is more like creating documents in office than provisioning resources in Azure. While we don’t expect every user to be able to take advantage of every workload in Fabric, each of the workloads must appeal to the broadest set of users.

Fabric is designed to support the largest Tier 1 projects and data sizes. The Fabric platform provides a common set of services that the workload must not replace with their own proprietary services. Consistent use of the platform services across all the workloads ensures a uniform experience and functionality throughout the system.

This document provides a comprehensive overview of all the different components that you need to take into account to publish a workload. Sharing this information upfront is required to move into Preview and GA, see [Publishing Flow](./publish-workload-flow.md).

| Name | Description | Validation method | Preview | General Availability | Reference |
|---|---|---|---|---|---|
| Value to customers | Your offer must provide enough value to justify the investment it takes to learn and use. Your offer should provide significant benefits such as enhanced efficiency, innovative features, or strategic advantages. | Attestation | Required | Required | |
| Terms and conditions | You need to provide your customers with terms and conditions for the offer you provide on the platform. In the terms and conditions you need to highlight the compliancy aspects of your solution. For example, what happens to data at rest and transit? Where are the services you provide Azure customers available from? | Workload Package | Required |Required | [Governance overview and guidance](../governance/governance-compliance-overview.md) |
| Metadata | Metadata such as title, summary, and icon, must be identical in the Workload package manifest and the SaaS offer submission in Partner Center. Add all the assets of the workload such as icons and screenshots under `fe/assests` directory. Your workload package has to comply with the frontend and [backend](extensibility-back-end.md) manifest requirements. | Workload Package | Required |Required | [Manifest](extensibility-back-end.md)
| Attestation Document | Partners need to provide a page that contains all the information about their workload publishing requirements status. This document needs to be linked in the Workload Package and kept up-to-date. You must add the link in the workload metadata manifest under the `supportLink` field in `certification`. The link must also appear in the workload product page in the Workload Hub. | Workload Package | Required | Required | |
| Trial | Provide an easy and fast trial experience. The trial should be available to the customer without waiting time (less than 5 seconds), and give the them a free and easy way to explore the offered workload. | Attestation | Required | Required | [Trials](monetization.md#trials) |
| Marketplace Offer | Partners need to enlist a SaaS offer in Azure Marketplace. This offer can just be a *contact us* listing to get leads from the platform. We expect partners to also transact over the Marketplace. You can build Bring Your Own License (BYOL) capabilities into your workload. | Workload Package | Required | Required | [Creating a SaaS offer](/partner-center/marketplace-offers/create-new-saas-offer) <br> <br> [Commercial marketplace certification policies](/legal/marketplace/certification-policies#1000-software-as-a-service-saas) |
|Documentation | You need to provide documentation for your Workload to customers in an easy and understandable form. | Workload Package | Required | Required | |
| Monetization | You can use Azure Marketplace to monetize your workload. | Attestation | Not Supported | Optional | [Monetize your workload](monetization.md) |
| Workload page| Gallery videos aren't allowed to show non product related ads. Add up to four videos that demonstrate your offer. Videos should be hosted on an external video service|Workload Package|Optional|Optional|[Azure Marketplace video guidelines](/partner-center/marketplace-offers/create-new-saas-offer-listing#add-videos-optional)|

## Technical requirements

The following table lists technical requirements for your workload offer.

| Category | Description | Validation method | Preview | General Availability | Reference |
|---|---|---|---|---|---|
| Microsoft Entra Access | Fabric workloads must use Microsoft Entra authentication and authorization. If your service provides other authentication methods to data stored in Fabric, these methods need to be document. <br><br> *Extra requirements:* <br>   | Attestation | Required | Required | [Authentication](./authentication-concept.md) |
|  | The workload  must take a static dependency on `https://analysis.windows.net/powerbi/api/Fabric.Extend` scope and get user consent for it. Workload Development Kit infrastructure helps to implement the consent flow, but the responsibility is with the workload owner to take dependency on Fabric. Extend scope and ensure consent is granted. Fabric reserves the rights to block the integration with a workload for which the consent isn't granted. | Workload Package | Required | Required | |
| OneLake | OneLake is where data is stored in Fabric. Workloads need to integrate with it to store data in the standard formats supported by the platform so that other services can take advantage of it. | Attestation | Required | Required | [OneLake, the OneDrive for data](../onelake/onelake-overview.md) |
| Microsoft Entra Conditional Access | Enterprise customers require centralized control and management of the identities and credentials used to access their resources and data and, in Microsoft, Microsoft Entra provides that service. Make sure that your service works with even if customers enable this functionality. | Attestation | Required | Required | [Conditional access](../security/security-conditional-access.md) |
| Admin REST API | Admin REST APIs are an integral part of Fabric admin and governance process. These APIs help Fabric admins in discovering workspaces and items, and enforcing governance such as performing access reviews, etc. Basic functionality is supported as part of the Workload Development Kit and doesn't need any work from Partners. | Attestation | Supported | Supported | [Admin REST API](/rest/api/fabric/admin/items) |
| Customer Facing Monitoring & Diagnostic | Partners are required to store health telemetry for 30 days including activity ID for customer support purposes. | Attestation | Required | Required | |
| B2B | Fabric sharing strategy is focused on allowing customers to collaborate with their business partners, customers, vendors, subsidiaries, etc. It also means users form other tenants can potentially be granted access to items partner are creating. | Attestation | Optional | Optional | [Guest User Sharing](../security/security-b2b.md) |
| Business Continuity and disaster recovery | Fabric commits to a seamless service availability to customers. We recognize the importance of planning for unforeseen events in a world of uncertainties. We ask partners providing workloads to customers within Fabric to define Business Continuity and Disaster Recovery (BCDR) plans designed to tackle unplanned disasters and recovery steps. | Attestation | Optional | Optional| [Reliability in Microsoft Fabric](/azure/reliability/reliability-fabric) |
| Performance | Performance is an important requirement for Fabric customers. We recommend our partners to think about performance in the context of their workload and take measures to test and track performance of their Items. | Attestation | Optional | Required | |
| Presence | To ensure that, you can meet customer expectations independent of their home or capacity region, partners need to think how they want to align with fabric regions and clouds. Availability in certain restrictions also impacts your Data Residency commitments. | Attestation | Optional | Optional | [Fabric Regions](../admin/region-availability.md) |
| Public APIs | Fabric Public APIs are the backbone of automation, enabling seamless communication and integration for both customers and partners within the Fabric ecosystem. Fabric Public API empowers users to build innovative solutions, enhance scalability, and streamline workflows. | Attestation | Not supported | Not supported | [Documentation](/rest/api/fabric/articles/) |

## Design/ UX requirements

Get familiar with the design requirements for your Fabric workload review the [Fabric UX System](https://aka.ms/fabricux). The Fabric UX System provides an overview of the patterns and components that are available in the Fabric UX to accelerate your work. It also includes Fabric UX React and Angular wrapper libraries that integrate with Fluent web components.

Fabric users expect a fast loading UX. Independent of the technical implementation and regional hosting, your workload should load fast within all Fabric regions.

| Name | Description | Validation method | Preview | General Availability | Reference |
|---|---|---|---|---|---|
| Common UX | The workload and all Item types the partner provides as part of it need to comply with the Fabric UX guidelines. | Attestation | Required | Required | [Fabric UX System](https://aka.ms/fabricux) |
| Item Creation Experience | Partners need to comply with the Item creation experience according to the Fabric UX System. | Attestation | Required | Required | [Fabric UX System](https://aka.ms/fabricux) |
| Monitoring hub | Long running operations need to integrate with Fabric Monitoring Hub. | Attestation | Required | Required | [Monitoring Hub](./monitoring-hub.md) |
| Trial Experience | Partners are required to provide a Trial Experience for users as outlined in the design guidelines. | Attestation | Optional | Required | [Fabric Templates](https://aka.ms/fabrictemplates) |
| Monetization Experience | Partners that want to monetize their solution in fabric need to follow the patterns defined in the Fabric Templates. Monetization can happen through Azure Marketplace or you can use your existing methods. In any case, you need to follow the design guidelines defined in the Fabric templates. | Attestation | Optional | Required | [Fabric Templates](https://aka.ms/fabrictemplates) |
| Accessibility | Partners need to comply with the Fabric UX design guidelines for Accessibility. | Attestation | Optional | Required | [Fabric UX System](https://aka.ms/fabricux) |
| World Readiness | English has to be the default language. Content can be localized if you decide to do it. In this case add the supported languages to your attestation page. | Workload Package | Optional | Required | |
| Jobs to be done | To be listed in different create experiences within Fabric, you need to onboard to the Jobs to Be done definition for your Item types. | Workload Package | Optional | Required | |
| Item Settings | Partners need to implement the item settings as part of the Ribbon. | Attestation | Required | Required | [Fabric UX System](https://aka.ms/fabricux) |
| Samples | Partners can use samples that are creating preconfigured items of their type to help customers get started more easily. | Attestation | Optional | Optional | |
| Custom Item actions | Partners can implement custom actions as part of their item editor. | Attestation | Optional | Optional | |
| Workspace settings | Workspace settings provide a way that workloads can be configured on a workspace level. | Attestation | Not supported | Not supported | [Workspace](../fundamentals/workspaces.md) |
| Global Search | Searching for items in Fabric is supported through the top search bar. | Attestation | Not supported | Not supported | [Fabric Search](../fundamentals/fabric-home.md) |

## Security & Compliance requirements

| Category | Description | Validation method | Preview | General Availability | References |
|---|---|---|---|---|---|
| Security general | Microsoft customers entrust Fabric with their most sensitive data. As partners implementing workloads can have access to this data, they also have a responsibility to protect that data. We request workloads to go through a security assessment, a security review and attest that they did it. discovered in the process. | Attestation | Optional | Required | [Secure, protect, and comply](../governance/governance-compliance-overview.md#secure-protect-and-comply) |
| Privacy | Microsoft customers entrust Fabric with their most sensitive data. As such, partners the build workloads also have a responsibility to protect that data when they access it. To that end we request that every workload goes through a privacy assessment and a privacy review. <br><br> *Extra requirements:* <br> | Attestation | Optional | Required | [Secure, protect, and comply](../governance/governance-compliance-overview.md#secure-protect-and-comply) |
||Workload owners can only use essential HTTP-only cookies. Workload can use them only after positively authenticating the user. Only use same-origin cookies| Attestation | Required | Required | [Cookie compliance](https://european-union.europa.eu/cookies_en) |
||Partner workloads aren't to use, write, or rely on third-party cookies| Attestation|Required|Required|[Cookie compliance](https://european-union.europa.eu/cookies_en)|
||Publisher must only obtain any Microsoft Entra token using the JavaScript APIs provided by the Fabric Workload Client SDK|Attestation|Required|Required||
| Data Residency | Fabric is making an Enterprise Promise around data not leaving the geography of the tenant for stored data and data in transit. As a workload you're showing up in Fabric directly and users need to be aware what your commitments to Data Residency are. In the attestation, you need to define what our commitments are to the Data Residency of customer data. | Attestation | Optional | Required | [Data residency in Azure](https://azure.microsoft.com/explore/global-infrastructure/data-residency/) |
| Compliance attestation | Within the Attestation Document you can show customers how your app handles security, data, and compliance. In this self-assessment, the Workload developer describes the Workload’s security attributes and data-handling practices. The publisher attestation document should be hosted on the partner website. If applicable to your customers, align with more Fabric certifications. | Attestation | Optional | Optional | [Governance overview and guidance](../governance/governance-compliance-overview.md) |

## Support


| Category | Description | Validation method | Preview | General Availability | References |
|---|---|---|---|---|---|
| Live site | Partner workloads are becoming an integral part of Fabric therefore our support teams need to be aware how you want to be contacted in case customers are reaching out to us directly. Partners need to provide the contact details as part of the publishing process to us. | Attestation | Optional | Required | |
| Supportability | Partners are responsible to define and document their support parameters (Service level agreement, contact methods, ...). This information needs to be linked from the Workload page and should always be accessible to customers. In addition the Marketplace criteria, need to be taken into account for the listing of the SaaS offer. | Attestation | Optional | Required | [Marketplace listing guidelines](/partner-center/marketplace-offers/marketplace-criteria-content-validation) [Workload requirements](./supportability.md) |
| Service Health & Availability | Partners need to host their a website that shows their service health and availability to customers. This information can be included in the Supportability page. | Attestation | Optional | Required | |

## Fabric features

| Category | Description | Validation method | Preview | General Availability | Reference |
|---|---|---|---|---|---|
| Application lifecycle management (ALM) | Microsoft Fabric's lifecycle management tools enable efficient product development, continuous updates, fast releases, and ongoing feature enhancements. | Attestation | Not Supported | Not Supported | [ALM in Fabric](../cicd/cicd-overview.md) |
| Private Links | In Fabric, you can configure and use an endpoint that allows your organization to access Fabric privately. | Attestation | Not Supported | Not supported | [Private Links](../security/security-private-links-use.md) |
| Data Hub | The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them. If you're implementing a Data Item, show up in the Data Hub as well. | Attestation | Not Supported | Not supported |[OneLake data hub](../governance/onelake-catalog-overview.md) |
| Data linage | In modern business intelligence (BI) projects, understanding the flow of data from the data source to its destination can be a challenge. The challenge is even bigger if you built advanced analytical projects spanning multiple data sources, data items, and dependencies. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. | Attestation | Not Supported | Not supported | [Linage in Fabric](../governance/lineage.md) |
| Sensitivity Labels | Sensitivity labels from Microsoft Purview Information Protection on items can guard your sensitive content against unauthorized data access and leakage. They're a key component in helping your organization meet its governance and compliance requirements. Labeling your data correctly with sensitivity labels ensures that only authorized people can access your data. <br><br> *Extra requirements:* <br> | Attestation | Not Supported | Not supported | [Sensitivity Labels](../fundamentals/apply-sensitivity-labels.md) |
|| For partners that are using Export functionality within their Item they need to follow the guidelines. | Attestation | Required | Required | |

## Related content

* [Microsoft Fabric Workload Development Kit](development-kit-overview.md)
* [Publishing flow](./publish-workload-flow.md)
* [Commercial marketplace certification policies](/legal/marketplace/certification-policies)
