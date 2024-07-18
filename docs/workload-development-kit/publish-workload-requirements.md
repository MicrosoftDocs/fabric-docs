---
title: Fabric Workload Hub validation guidelines and requirements (preview)
description: Learn about the guidelines and requirements for publishing a Microsoft Fabric workload to the Workload Hub.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.date: 05/21/2024
---

# Workload certification (preview)

This article describes the requirements that are needed for a custom workload to be listed in the Microsoft Fabric Workload Hub. Make sure your workload complies with these requirements before you submit your workload for publication.

## Business requirements

Building applications in Fabric is more like creating documents in office than provisioning resources in Azure. While we don’t expect every user to be able to take advantage of every workload in Fabric, each of the workloads must appeal to the broadest set of users.

Fabric is designed to support the largest Tier 1 projects and data sizes. The Fabric platform provides a common set of services that the workload must not replace with their own proprietary services. Consistent use of the platform services across all the workloads ensures a uniform experience and functionality throughout the system.


| Name | Description | Certification method  | Status |Reference  |
|---|---|---|---|---|
| Value to customers | Your offer must provide enough value to justify the investment it takes to learn and use. Your offer should provide significant benefits such as enhanced efficiency, innovative features, or strategic advantages. | Attestation | Required | |
| Terms and conditions | You need to provide your customers with terms and conditions for the offer you provide on the platform. In the terms and conditions you need to highlight the compliancy aspects of your solution. For example, what happens to data at rest and transit? Where are the services you provide Azure customers available from? | Workload Package | Required | [Governance overview and guidance](../governance/governance-compliance-overview.md) |
| Metadata | Metadata such as title, summary, and icon, must be identical in the Workload package manifest and the SaaS offer submission in Partner Center. Add all the assets of the workload such as icons and screenshots under `fe/assests` directory. Your workload package has to comply with the frontend and [backend](extensibility-back-end.md) manifest requirements. | Workload Package | Requried | [Manifest](extensibility-back-end.md)
| Attestation Document | Partners need to provide a page that contains all the information about their workload certification status. This document needs to be linked in the Workload Package and kept up-to-date. You must add the link in the workload metadata manifest under the `supportLink` field in `certification`. The link must also appear in the workload product page in the Workload Hub. | Workload Package | Required | [Example document](publish-workload-attestation-example.md) |
| Trial | Provide an easy and fast trial experience. The trial should be available to the customer without waiting time (less than 5 seconds), and give the them a free and easy way to explore the offered workload. | Attestation | Required |  [Trials](monetization.md#trials) |
| Marketplace Offer | Partners need to enlist a SaaS offer in the Azure Marketplace. This offer can just be a *contact us* listing to get leads from the platform. We expect partners to also transact over the Marketplace. You can build Bring Your Own License (BYOL) capabilities into your workload. | Workload Package | Required | [Commercial marketplace certification policies](/legal/marketplace/certification-policies#1000-software-as-a-service-saas)  |
|Documentation | You need to provide doucmentation for your Workload to customers in an easy and understandable form.  | Workload Package | Required | |
| Monetization | You can leverage the Azuer Markeplace to monetize your workload. | Attestation | Optional | [Monetize your workload](monetization.md) |


## Design/ UX requirements

To get familiar with the design requirements for your Fabric workload review the [Fabric UX System](https://aka.ms/fabricux). The Fabric UX System provides an overview of the patterns and components that are available in the Fabric UX to accelerate your work. It also includes Fabric UX React and Angular wrapper libraries that integrate with Fluent web components.

Fabric users expect a fast loading UX. Independent of the technical implementation and regional hosting, your workload should load fast within all Fabric regions.

| Name | Description | Certification method  | Status | Reference  |
|---|---|---|---|---|
| Shared UX | The workload and all Item types the partner provides as part of it need to comply with the Fabric UX guidelines.  | Attestation | Required | [Fabric UX System](https://aka.ms/fabricux) |
| Item Creation Experience | TBD - need to copy the boilerplade to align with the | Attestation | Required | [Fabric UX System](https://aka.ms/fabricux) |
| Help Pane | TBD  | Workload Package | Required | [Help pane](https://learn.microsoft.com/en-us/fabric/get-started/fabric-help-pane) |
| Item editing with Ribbon | TBD  | Attestation | Required | [Fabric UX System](https://aka.ms/fabricux) |
| Monitoring hub | TBD  | Attestation | Required | [Monitoring Hub](./monitoring-hub.md) |
| Accessibility | TBD - Navigation into IFrame is needed| Attestation | Required |  |
| World Readiness | TBD | Workload Package | Required |  |
| Jobs to be done | To be listed in different create experiences within Fabric you need to onboard to the Jobs to Be done defininition for Item types.  | Workload Package | Optional |  |
| Item Settings | TBD | Attestation | Optional |  |
| Sample Items | TBD | Attestation | Optional |  |
| Item actions | TBD | Attestation | Optional |  |
| Workspace settings | TBD | Attestation | Not supported |  |
| Search | TBD | Attestation | Not supported |  |


## Technical requirements

The following table lists technical requirements for your workload offer.

| Category | Description | Certification method  | Status | Reference  |
|---|---|---|---|---|
| AAD Access | Fabric workloads must ensure that Azure AD identities can be granted access to our applications, services and API endpoints. If your service provides other authentication methods to data that was originaly stored in Fabric you need to document this. | Attestation | Required | [Autentication](./authentication-concept.md) |
| OneLake | OneLake is where data is stored in Fabric. Workloads need to integrate with it to store data in the standard formats supported by the platform so that other services can take advantage of it. | Attestation | Required | [OneLake, the OneDrive for data](../onelake/onelake-overview.md) |
| AAD Conditional Access | Enterprise customers require centralized control and management of the identities and credentials used to access their resources and data and, in Microsoft, Azure AD provides that service. If customers have enabled the feature make sure that your service will work with it. | Attestation | Required | [Conditional access](https://learn.microsoft.com/en-us/fabric/security/security-conditional-access) |
| Admin Rest API | Admin REST APIs are an integral part of Fabric admin and governance process. These APIs help Fabric admins in discovering workspaces and items, and enforcing governance such as performing access reviews, etc. | Attestation | Not supported | [Admin REST API](https://learn.microsoft.com/en-us/rest/api/fabric/admin/items) |
| Customer Facing Monitoring & Diagnostic | TBD | Attestation | Required | |
| B2B | Fabric sharing strategy is focused on allowing customers to collaborate with their business partners, customers, vendors, subsidiaries etc. This also mens users form other tenants can potentially be granted access to items partner are creating.  | Attestation | Optional | [Guest User Sharing](https://learn.microsoft.com/en-us/fabric/security/security-b2b) |
| Business Continuity and disaster recorvery | Fabric sommits to a seamless service availability to customers. We recognize the importance of planning for unforeseen events in a world of uncertainties. We ask partners providing workloads to customers within Fabric to think aobut this as well and define Business Continuity and Disaster Recovery (BCDR) plans designed to tackle unplanned disasters and recovery steps. | Attestation | Optional | [Reliability in Microsoft Fabric](https://learn.microsoft.com/en-us/azure/reliability/reliability-fabric) |
| Performance | Performance is a very important requirement for Fabric customers. We recommend our parnters to think about this in the context of their workload as well and take measures to test and track prefromance of their Items.  | Attestation | Optional |  TBD|
| Presence | To ensure that you can meet customer expectations in the same way no matter the region or cloud where Fabric is used, partners need to think how they want to align with fabric regions and clouds. Availablilty in certain restrictions also impacts the your Data Residency commitments. | Attestation | Optional | [Fabric Regions](https://learn.microsoft.com/en-us/fabric/admin/region-availability) |
| Public APIs | Fabric Public APIs are the backbone of automation, enabling seamless communication and integration for both customers and ISVs within the Fabric ecosystem. Fabric Public API empowers users to build innovative solutions, enhance scalability, and streamline workflows. | Attestation | Not supported | [Doucmentation](https://learn.microsoft.com/en-us/rest/api/fabric/articles/) |


## Security & Compliance requirements

The following table lists compliance requirements for your workload offer.

| Category | Description | Certification method | Status  | References  |
|---|---|---|---|---|
| Security general | Microsoft customers entrust Fabric with their most sensitive data. As partners implementing workloads can have access to data on it they also have a responsibility to protect that data. To that end we request workloads to  goe through a security assessment, a security review and attest that they dit it. discovered in the process. | Attestation | Requried | [Secure, protect and comply](../governance/governance-compliance-overview#secure-protect-and-comply) |
| Privacy | Microsoft customers entrust Fabric  with their most sensitive data. As such, partners tht build workloads also have a responsibility to protect that data when they access it. To that end we request that every workload goes through a privacy assessment and a privacy review. | Attestation | Required | [Secure, protect and comply](../governance/governance-compliance-overview#secure-protect-and-comply) |
| Data Residency | Fabric is making a Enterprise Promise around data residency not leaving the geography of the tenant not only for stored data but also for data in transit. As a workload you are showing up in Fabric directly and users need to be aware what your commitments to Data Residency are. In the attestation you need to define what our commitments are to the Data Residency of customer data.  | Attestation | Requried | [Data residency in Azure](https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency/)
| Compliance attestation | Within the Attestation Document you can show customers how your app handles security, data, and compliance. In this self-assessment the Workload developer describes the Workload’s security attributes and data-handling practices. The publisher attestation document should be hosted on the partner website.  If applicable to your customers, align with additional Fabric certifications. | Attestation | Optional | [Governance overview and guidance](../governance/governance-compliance-overview.md) |

## Fabric features

| Category | Description | Certification method  | Status | Reference  |
|---|---|---|---|---|
| Application lifecycle managment (ALM) | Microsoft Fabric's lifecycle management tools enable efficient product development, continuous updates, fast releases, and ongoing feature enhancements. | Attestation | Not Supported | [ALM in Fabric](https://learn.microsoft.com/en-us/fabric/cicd/) |
| Private Links | In Fabric, you can configure and use an endpoint that allows your organization to access Fabric privately.  | Attestation | Not supported | [Private Links](https://learn.microsoft.com/en-us/fabric/security/security-private-links-use) |
| Data Hub | The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them. If you are implementing a Data Item you will show up in the Data Hub as well. | Attestation | Not supported |[OneLake data hub](https://learn.microsoft.com/en-us/fabric/get-started/onelake-data-hub) |
| Data linage | In modern business intelligence (BI) projects, understanding the flow of data from the data source to its destination can be a challenge. The challenge is even bigger if you've built advanced analytical projects spanning multiple data sources, data items, and dependencies. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer. | Attestation | Not supported | [Linage in Fabric](https://learn.microsoft.com/en-us/fabric/governance/lineage) |
| Sensitivity Labels (MIP) | Sensitivity labels from Microsoft Purview Information Protection on items can guard your sensitive content against unauthorized data access and leakage. They're a key component in helping your organization meet its governance and compliance requirements. Labeling your data correctly with sensitivity labels ensures that only authorized people can access your data. | Attestation | Not supported | [Sensitivity Labels](https://learn.microsoft.com/en-us/fabric/get-started/apply-sensitivity-labels) |


## Related content

* [Microsoft Fabric Workload Development Kit](development-kit-overview.md)

* [Commercial marketplace certification policies](/legal/marketplace/certification-policies)

