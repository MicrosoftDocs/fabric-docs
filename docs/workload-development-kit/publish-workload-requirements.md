---
title: Fabric Workload Hub validation guidelines and requirements (preview)
description: Learn about the guidelines and requirements for publishing a Microsoft Fabric workload to the Workload Hub.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 05/21/2024
---

# Workload certification (preview)

This article describes the requirements that are needed for a custom workload to be listed in the Microsoft Fabric Workload Hub. Make sure your workload complies with these requirements before you submit your workload for publication.

## Business requirements

Building applications in Fabric is more like creating documents in office than provisioning resources in Azure. While we don’t expect every user to be able to take advantage of every workload in Fabric, each of the workloads must appeal to the broadest set of users.

Fabric is designed to support the largest Tier 1 projects and data sizes. The Fabric platform provides a common set of services that the workload must not replace with their own proprietary services. Consistent use of the platform services across all the workloads ensures a uniform experience and functionality throughout the system.

[OneLake](../onelake/onelake-overview.md) is the storage platform that brings together all the data in Fabric into a single integrated product. OneLake includes data security management. Infrastructure level security, compliance, and governance are managed by expert administrators on a tenant level.

Your workloads must adhere to the following business requirements:

| Category | Description | Domain  | Reference  |
|---|---|---|---|
| Significant value | Your offer must provide enough value to justify the investment it takes to learn and use. Your offer should provide significant benefits such as enhanced efficiency, innovative features, or strategic advantages. | Functional<br><br>SaaS submission | [100.8 Significant value](/legal/marketplace/certification-policies#1008-significant-value) |
| Trial | Provide an easy and fast trial experience. The trial should be available to the customer without waiting time (less than 5 seconds), and give the them a free and easy way to explore the offered workload. | Functional |  [Trials](monetization.md#trials) |
| Monetization | Partners need to enlist a SaaS offer in the Azure Marketplace. This offer can just be a *contact us* listing to get leads from the platform. We expect partners to also transact over the Marketplace. You can build Bring Your Own License (BYOL) capabilities into your workload. | Functional | [Monetize your workload](monetization.md) |

## Design requirements

To get familiar with the design requirements for your Fabric workload review the [Fabric UX System](https://aka.ms/fabricux). The Fabric UX System provides an overview of the patterns and components that are available in the Fabric UX to accelerate your work. It also includes Fabric UX React and Angular wrapper libraries that integrate with Fluent web components.

Fabric users expect a fast loading UX. Independent of the technical implementation and regional hosting, your workload should load fast within all Fabric regions.

## SaaS submission requirements

Before publishing your Software as a Service (SaaS) offer on the Azure Marketplace, your workload needs to meet these [Commercial marketplace certification policies](/legal/marketplace/certification-policies#100-general):

* [100 General](/legal/marketplace/certification-policies#100-general)

* [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas)

The requirements for the workload package metadata and the SaaS submission offer metadata have to be identical to ensure consistency. The applicable domain will state *SaaS submission and workload package metadata* to reflect this necessity.

## Workload package requirements

Metadata such as title, summary, and icon, must be identical in the Workload package manifest and the SaaS offer submission in Partner Center. Add all the assets of the workload such as icons and screenshots under `fe/assests` directory.

Your workload package has to comply with the frontend and [backend](extensibility-back-end.md) manifest requirements.

## Technical requirements

The following table lists technical requirements for your workload offer.

| Category | Description | Domain  | Reference  |
|---|---|---|---|
| SaaS in the Azure Marketplace | For your SaaS offer to be listed on the Azure Marketplace, it must be primarily platform on Microsoft Azure. | SaaS submission<br><br>Azure requirements<br><br> Functional | [1000.1 Value proposition and offer requirements](/legal/marketplace/certification-policies#10001-value-proposition-and-offer-requirements) |
| OneLake | OneLake is where data is stored in Fabric. Workloads need to integrate with it to store data in the standard formats supported by the platform so that other services can take advantage of it. | Functional | [OneLake, the OneDrive for data](../onelake/onelake-overview.md) |

## Compliance requirements

The following table lists compliance requirements for your workload offer.

| Category | Description | Domain  | Links  |
|---|---|---|---|
| Publisher attestation | The Publisher attestation document is a way for Workload developers to show customers how their app handles security, data, and compliance. In this self-assessment the Workload developer describes the Workload’s security attributes and data-handling practices. The publisher attestation document should be hosted on the partner website. You must add the link in the workload metadata manifest under the `supportLink` field in `certification`. The link must also appear in the workload product page in the Workload Hub. | Compliance | |
| Terms and conditions | You need to provide your customers with terms and conditions for the offer you provide on the platform. In the terms and conditions you need to highlight the compliancy aspects of your solution. For example, what happens to data at rest and transit? Where are the services you provide Azure customers available from? | Compliance<br><br>SaaS Submission | [Governance overview and guidance](../governance/governance-compliance-overview.md) |
| ISO 27001:2013 | Your Fabric Workload must comply with ISO 27001:2013. ISO support should be listed in the publisher attestation document.| Compliance<br><br>Security |  |
| SOC 2 Type 2 | Your Fabric Workload must comply with SOC 2 Type 2. | Compliance<br><br>Security |  |
| Optional and recommended certifications | If applicable to your customers, align with additional Fabric certifications.   | Compliance<br><br>Security | [Governance overview and guidance](../governance/governance-compliance-overview.md) |

## Additional requirements

The following table lists additional requirements for your workload offer.

| Category | Description | Domain  | Reference |
|---|---|---|---|
| Engineering contact | The engineering contact email domain must match the email domain of the publisher who reaches our team with the workload package |  SaaS submission | [Publish your workload](publish-workload-flow.md#publish-your-workload) > step 4. |
| Title accuracy | Your workload must have an accurate and descriptive title, and the seller’s name. If the offer is promoted on another website both titles should match. | SaaS submission<br><br>Workload package metadata | [100.1.1 Title](/legal/marketplace/certification-policies#10011-title)  |
| Concise summary | The summary appears in the Azure commercial marketplace search results and must be limited to 100 characters. The summary has to convey the essence of the SaaS offer. | SaaS submission<br><br>Workload package metadata | [100.1.2 Summary](/legal/marketplace/certification-policies#10012-summary) |
| Comprehensive description | The description should comprehensively detail any limitations, conditions, or exceptions to the functionality, features, and deliverables. It must articulate the value proposition and requirements clearly and distinctly represent the product. For non-English content, the description must start or end with the phrase, *This application is available in \<list of languages>.* | SaaS submission<br><br> Workload package metadata | [100.1.3 Description](/legal/marketplace/certification-policies#10013-description) |
| Marketplace visibility | Each SaaS offer must feature at least one public plan, such as *Contact Me*, *BYOL*, or *Get It Now (Transact)*. Private plans aren't permitted without an accompanying public plan to ensure active marketplace engagement. | SaaS submission | [100.1.5 Active and visible presence](/legal/marketplace/certification-policies#10015-active-and-visible-presence) |
| Graphic elements | Graphic elements must be current, and related to your offer.<li>**Logo** - Appear on the offer listing page and must be uploaded as a `.png` file between 216-350 pixels square</li><li>**Images** - Must be 1280x720 pixel `.png` files.</li><li>**Videos** - Must be hosted on YouTube or Vimeo. No short URLs, *human readable* redirects might be used.</li> | SaaS submission | [100.3 Graphic elements](/legal/marketplace/certification-policies#1003-graphic-elements) |
| Pricing model compliance | The pricing for the SaaS offer must align with the [plans and pricing for commercial marketplace offers](/azure/marketplace/plans-pricing), ensuring transparency and consistency for customers. | SaaS submission |  [100.4 Acquisition, pricing, and terms](/legal/marketplace/certification-policies#1004-acquisition-pricing-and-terms) |
| Essential offer details | Include relevant offer information such as terms and conditions, privacy policy, supporting documentation and *Learn more* links | SaaS submission<br><br>Workload package metadata<br><br>Legal and privacy compliance | [100.5 Offer information](/legal/marketplace/certification-policies#1005-offer-information)<br><br>[100.6 Personal information](/legal/marketplace/certification-policies#1006-personal-information) |
| Inappropriate content | Customers expect offers to be free of inappropriate, harmful, or offensive content. | SaaS submission<br><br>Workload package metadata<br><br>Legal and privacy compliance| [100.10 Inappropriate content](/legal/marketplace/certification-policies#10010-inappropriate-content) |
| Security | Customers want to be confident that offers are safe and secure. Your offer must not jeopardize or compromise users, Azure services, related services, or systems security. If your offer collects credit card information, or uses a third-party payment processor that collects credit card information, the payment processing must meet the current PCI Data Security Standard (PCI DSS). | SaaS submission<br><br>Security compliance | [100.11 Security](/legal/marketplace/certification-policies#10011-security) |
| Microsoft Entra seamless single sign-on | Your offer must support [Microsoft Entra seamless single sign-on](/entra/identity/hybrid/connect/how-to-connect-sso) for marketplace activation and independent transactions.| [1000.3 Authentication options](/legal/marketplace/certification-policies#10003-authentication-options) |
| Fulfillment APIs integration | Your offer must be integrated with the SaaS Fulfillment APIs. | SaaS Submission | [1000.4 SaaS Fulfillment and Metering APIs](/legal/marketplace/certification-policies#10004-saas-fulfillment-and-metering-apis) |
| Advertising | Fabric Workload must not include advertising. | | |

## Related content

* [Microsoft Fabric Workload Development Kit](development-kit-overview.md)

* [Commercial marketplace certification policies](/legal/marketplace/certification-policies)

