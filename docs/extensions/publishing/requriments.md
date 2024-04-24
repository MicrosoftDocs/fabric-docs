---
title: Overview of Fabric extensibility requiements 
description: Learn about the requirments for fabric extensions to be  publish as a workload over the Fabric extensibility platform.
author: gesaur
ms.author: gesaur
ms.reviewer: gesaur
ms.topic: how-to
ms.custom:
ms.date: 04/17/2024
---

# Fabric Workload Requirements
This article discribes in details all the functional and non-functional requirmenets that are required for a custom workload to be listed in Fabric Workload Hub. These requirmenets will help you create a new workload with seamless user expereince that will delight your customers. Make sure your workload complies with these requirmenets before you submit your workload to publictiong. 


# Farbric and Functional Requirements
| **Requirement Category** | **Detailed Description** | **Applicable Domain**  | **Reference Links**  |
| -- | -- | -- | -- |
| **Singificant value** | Your offers must provide enough value to justify the investment it takes to learn and use them. Your offer should provide significant benefits such as enhanced efficiency, innovative features, or strategic advantages. | Functional, SaaS Submission | [More information about offer value](https://learn.microsoft.com/legal/marketplace/certification-policies#1008-significant-value) |
| **Free Trial** | Your workload must include a Free Trial to allow first-time users access to the workload. This should  facilitate a seamless trial expereince | Functional | [??????] add link to free trail
| **OneLake** | | | |



# non-Functional and SaaS Submission Requirements

Before [publishing your Software as a Service (SaaS) offer on the Azure Marketplace](https://learn.microsoft.com/partner-center/marketplace/plan-saas-offer), it's essential to prepare and meet the following requirements and the full guidlines of [the marketplace's general policies](https://learn.microsoft.com/en-us/legal/marketplace/certification-policies#100-general) and [SaaS specific policies](https://learn.microsoft.com/en-us/legal/marketplace/certification-policies#1000-software-as-a-service-saas).

> [!NOTE]
> The requirements for the NuGet metadata and the SaaS submission offer should be identical to ensure consistency. The applicable domain will state "SaaS submission and NuGet metadata" to reflect this necessity.


| **Requirement Category** | **Detailed Description** | **Applicable Domain**  | **Reference Links**  |
| -- | -- | -- | -- |
| **Title Accuracy** | Must have accurate and descriptive title, including the seller’s name. If the offer is promoted on another website both titles should match.	| SaaS submission, NuGet Metadata | [More information about the title](https://learn.microsoft.com/en-us/legal/marketplace/certification-policies#10011-title)  |
| **Concise Summary** | The summary appears in the Azure commercial marketplace search results and must be limited to 100 characters, and effectively convey the essence of the SaaS offer. | SaaS submission, NuGet Metadata | [More information about the summary](https://learn.microsoft.com/en-us/legal/marketplace/certification-policies#10012-summary) |
| **Comprehensive Description** | The description should comprehensively detail any limitations, conditions, or exceptions to the functionality, features, and deliverables. It must articulate the value proposition and requirements clearly and distinctly represent the product. For non-English content, the description must start or end with the phrase, "This application is available in [languages]." | SaaS submission, NuGet Metadata | [More information about the description](https://learn.microsoft.com/en-us/legal/marketplace/certification-policies#10013-description) |
| **Marketplace Visibility** | Each SaaS offer must feature at least one public plan, such as Contact Me, BYOL, or Get It Now (Transact). Private plans are not permitted without an accompanying public plan to ensure active marketplace engagement. | SaaS Submission | [More information about the Marketplace visibility](https://learn.microsoft.com/en-us/legal/marketplace/certification-policies#10015-active-and-visible-presence) |
| **Graphic Elements** | Graphic elements must be current, and related to your offer. Logo: Appear on the offer listing page and must be uploaded as a `.png` file between 216-350 pixels sqr. Images: must be 1280c720 pixel `.png` files. Videos:must be hosted on YouTube or Vimeo. No short URLs, "human readable" redirects may be used. | SaaS Submission | [More information about graphic elements](https://learn.microsoft.com/en-us/legal/marketplace/certification-policies#1003-graphic-elements) |
| **Pricing Model Compliance** | The pricing for the SaaS offer must align with the [marketplace-supported pricing models](https://learn.microsoft.com/azure/marketplace/plans-pricing), ensuring transparency and consistency for customers. | SaaS Submission | SaaS Submission | [More information about pricing](https://learn.microsoft.com/legal/marketplace/certification-policies#1004-acquisition-pricing-and-terms) |
| **Essential Offer Details** | Include relevant offer infromation such as terms and conditions, privacy policy, supporting documentation and "Learn more" links | SaaS submission, NuGet Metadata, Legal & Privacy Compliance | [More information about offer infromation](https://learn.microsoft.com/legal/marketplace/certification-policies#1005-offer-information)  and the [personal information](https://learn.microsoft.com/legal/marketplace/certification-policies#1006-personal-information) |
| **Inappropraie content** | Customers expect offers to be free of inappropriate, harmful, or offensive content. | SaaS Submission, Nuget metadata, Legal Compliance| [More information about content](https://learn.microsoft.com/legal/marketplace/certification-policies#10010-inappropriate-content) |
| **Security** | Customers want to be confident that offers are safe and secure. Your offer must not jeopardize or compromise user , Azure service, or related services or systems security. If your offer collects credit card information, or uses a third-party payment processor that collects credit card information, the payment processing must meet the current PCI Data Security Standard (PCI DSS). | SaaS Submission, Security Compliance | [More Information about Security](https://learn.microsoft.com/legal/marketplace/certification-policies#10011-security) |
| **Authetication and fullfilment APIs for transacatable SaaS through Microsoft** | Your offer must support Azure AD SSO for marketplace activation and independent transactions, and must be integrated with the SaaS Fulfilment APIs. | SaaS Submission | [More information about the authentication options](https://learn.microsoft.com/legal/marketplace/certification-policies#10003-authentication-options) and [fulfillment and metering APIs](https://learn.microsoft.com/legal/marketplace/certification-policies#10004-saas-fulfillment-and-metering-apis) |



# Design requirements

TODO [Horizon](https://aka.ms/horizon)

# Nuget package requirmenets 
1. Add all the asssests of the workload such as icons, screenshots videos under fe/assests
2. For more details about the https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/frontendManifest.md
3. 

4.  Duplicated fields
Title, Summary, icon,...
Make sure they are identical to the SaaS offer metadata

5. Backend part
   * Backend information should be filed under be/

# Azure requirements
| **Requirement Category** | **Detailed Description** | **Applicable Domain**  | **Reference Links**  |
| -- | -- | -- | -- |
| **SaaS in Azure Marketplace** | For your SaaS offer to be listed on Azure Marketplace, it must be primarily platformed on Microsoft Azure. | SaaS submission, Azure Requirmenets, Functional | [More information about the SaaS Azure Requirmenets](https://learn.microsoft.com/legal/marketplace/certification-policies#10001-value-proposition-and-offer-requirements) |

# Compliance requirements

TODO

