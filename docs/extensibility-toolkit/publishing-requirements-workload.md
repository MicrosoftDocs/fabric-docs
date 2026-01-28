---
title: Fabric Extensibility toolkit validation guidelines and requirements for workloads
description: Learn about the guidelines and requirements for publishing a Microsoft Fabric workload.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.date: 12/15/2025
---

# Microsoft Fabric Workload Publishing Requirements


This document outlines all publishing requirements for Microsoft Fabric workloads.

---

## 1. Business Requirements

Building applications in Fabric is more like creating documents in office than provisioning resources in Azure. While we don't expect every user to be able to take advantage of every workload in Fabric, each of the workloads must appeal to the broadest set of users.

Fabric is designed to support the largest Tier 1 projects and data sizes. The Fabric platform provides a common set of services that the workload must not replace with their own proprietary services. Consistent use of the platform services across all the workloads ensures a uniform experience and functionality throughout the system.

This document provides a comprehensive overview of all the different components that you need to take into account to publish a workload.

---

### 1.1 - Value To Customers

Workload must clearly articulate its value proposition, benefits, and use cases to help customers understand how it solves their business problems

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

---

### 1.2.1 - Term of use link in Workload page is correct

Workload must provide a valid, accessible HTTPS link to terms of use in the manifest

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Governance overview and guidance](../governance/governance-compliance-overview.md)
- [Product Manifest](./manifest-product.md)

**Guidelines:**

**LINK:**

This validation extracts a URL from the manifest and verifies it is reachable via HTTP request. The URL is extracted from the manifest field `product.productDetail.supportLink.terms.url`. 

*Requirements:*
- URL must use HTTPS protocol for security
- URL must be reachable and return HTTP status 200-399
- URL must respond within reasonable timeout period
- URL format must be valid and well-formed
- Manifest field `product.productDetail.supportLink.terms.url` must exist and contain a valid URL
- URL redirects are allowed and will be followed

---

### 1.2.2 - Privacy Policy link in workload hub is correct

Workload must provide a valid, accessible HTTPS link to privacy policy in the manifest

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Governance overview and guidance](../governance/governance-compliance-overview.md#secure-protect-and-comply)
- [Product Manifest](./manifest-product.md)

**Guidelines:**

**LINK:**

This validation extracts a URL from the manifest and verifies it is reachable via HTTP request. The URL is extracted from the manifest field `product.productDetail.supportLink.privacy.url`. 

*Requirements:*
- URL must use HTTPS protocol for security
- URL must be reachable and return HTTP status 200-399
- URL must respond within reasonable timeout period
- URL format must be valid and well-formed
- Manifest field `product.productDetail.supportLink.privacy.url` must exist and contain a valid URL
- URL redirects are allowed and will be followed

---

### 1.3.1 - Marketplace Offer has been published

Workload must have a published marketplace offer with a valid, accessible license URL

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Creating a SaaS offer](/partner-center/marketplace-offers/create-new-saas-offer)
- [Commercial marketplace certification policies](/legal/marketplace/certification-policies#1000-software-as-a-service-saas)
- [Publishing Overview](./publishing-overview.md)
- [Publish Workload Tutorial](./tutorial-publish-workload.md)

**Guidelines:**

**LINK:**

This validation extracts a URL from the manifest and verifies it is reachable via HTTP request. The URL is extracted from the manifest field `product.productDetail.supportLink.license.url`. 

*Requirements:*
- URL must use HTTPS protocol for security
- URL must be reachable and return HTTP status 200-399
- URL must respond within reasonable timeout period
- URL format must be valid and well-formed
- Manifest field `product.productDetail.supportLink.license.url` must exist and contain a valid URL
- URL redirects are allowed and will be followed

---

### 1.3.2 - Marketplace Offer Link in workload page is correct

The offer link needs to point to Azure Marketplace or AppSource.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Documentation](/marketplace/marketplace-overview)

**Guidelines:**

**LINK:**

This validation extracts a URL from the manifest and verifies it is reachable via HTTP request. The URL is extracted from the manifest field `product.productDetail.supportLink.license.url`. 

*Requirements:*
- URL must use HTTPS protocol for security
- URL must be reachable and return HTTP status 200-399
- URL must respond within reasonable timeout period
- URL format must be valid and well-formed
- Manifest field `product.productDetail.supportLink.license.url` must exist and contain a valid URL
- URL domain must be one of:  https://azuremarketplace.microsoft.com, https://appsource.microsoft.com/
- URL redirects are allowed and will be followed

---

### 1.3.3 - Workload publisher name is clear

Workload must display a clear, professional publisher name that helps customers identify the vendor

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Documentation](/marketplace/marketplace-overview)

---

### 1.3.4 - Workload publisher name is aligned with marketplace

Publisher name must be consistent between the workload manifest and Azure Marketplace listing to avoid customer confusion

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Documentation](/marketplace/marketplace-overview)

---

### 1.4.1 - Attestation Link in workload page is correct

Workload must provide a valid, accessible HTTPS link to certification attestation documentation

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)

**Guidelines:**

**LINK:**

This validation extracts a URL from the manifest and verifies it is reachable via HTTP request. The URL is extracted from the manifest field `product.productDetail.supportLink.certification.url`. 

*Requirements:*
- URL must use HTTPS protocol for security
- URL must be reachable and return HTTP status 200-399
- URL must respond within reasonable timeout period
- URL format must be valid and well-formed
- Manifest field `product.productDetail.supportLink.certification.url` must exist and contain a valid URL
- URL redirects are allowed and will be followed

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 1.4.2 - Getting started material exists

Workload must provide learning materials or getting started guides to help new users onboard successfully

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)

---

### 1.4.3 - At a glance section includes image or a video

Workload must include visual content (images or videos) in the 'At a glance' section to demonstrate functionality

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [How to configure at a glance section](./how-to-configure-workload-media-section.md)
- [Product Manifest](./manifest-product.md)
- [Video guidelines](/partner-center/marketplace-offers/create-new-saas-offer-listing#add-videos-optional)

---

### 1.4.4 - Learning Material must land on static pages

Learning material links must direct users to stable, static documentation pages rather than dynamic or temporary content

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)

---

### 1.4.5 - Documentation link in Workload page is correct

Workload must provide a valid, accessible HTTPS link to comprehensive product documentation

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)

**Guidelines:**

**LINK:**

This validation extracts a URL from the manifest and verifies it is reachable via HTTP request. The URL is extracted from the manifest field `product.productDetail.supportLink.documentation.url`. 

*Requirements:*
- URL must use HTTPS protocol for security
- URL must be reachable and return HTTP status 200-399
- URL must respond within reasonable timeout period
- URL format must be valid and well-formed
- Manifest field `product.productDetail.supportLink.documentation.url` must exist and contain a valid URL
- URL redirects are allowed and will be followed

---

## 2. Technical Requirements

Technical implementation requirements including authentication, APIs, and integration

---

### 2.1.1 - Verified Microsoft Entra App ID

Workload must register a valid Microsoft Entra application with proper GUID format and configuration

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Authentication Overview](./authentication-overview.md)
- [Documentation](./authentication-overview.md)
- [App Registration Guide](/entra/identity-platform/quickstart-register-app)
- [Verified Microsoft Entra App ID](/entra/verified-id/decentralized-identifier-overview)

---

### 2.1.2 - Dependency on Fabric.Extend scope

The workload must take a static dependency on Fabric.Extend scope and get user consent for it. Workload Development Kit infrastructure helps to implement the consent flow, but the responsibility is with the workload owner to take dependency on Fabric.Extend scope and ensure consent is granted. Fabric reserves the rights to block the integration with a workload for which the consent isn't granted.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Entra Scopes](/entra/identity-platform/scopes-oidc)

---

### 2.1.3 - Microsoft Entra Redirect URL must be correct

The redirect must land in Fabric for The Extensibility Authentication redirect URL must return a minimal HTML page that only executes windows.close() JavaScript without other content

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Authentication Overview](./authentication-overview.md)
- [How to Acquire Entra Token](./how-to-acquire-entra-token.md)

---

### 2.1.4 - Microsoft Entra Scopes are kept to a limit

Workload should request only essential Microsoft Entra scopes to minimize permissions and follow principle of least privilege

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Entra Scopes](/entra/identity-platform/scopes-oidc)
- [Fabric Scopes](/rest/api/fabric/articles/scopes)
- [Authentication Overview](./authentication-overview.md)
- [Authentication Guidelines](./authentication-guidelines.md)

---

### 2.2 - OneLake

OneLake is where data is stored in Fabric. Workloads need to integrate with it to store data in the standard formats supported by the platform so that other services can take advantage of it.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [OneLake Overview](../onelake/onelake-overview.md)
- [How to Store Data in OneLake](./how-to-store-data-in-onelake.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 2.3 - Microsoft Entra Conditional Access

Workload must support Microsoft Entra Conditional Access policies for enterprise security requirements

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](./authentication-overview.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 2.4 - Customer Facing Monitoring & Diagnostic

Workload must provide monitoring and diagnostic capabilities for customers to troubleshoot and track usage

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 2.5 - B2B

Fabric sharing strategy is focused on allowing customers to collaborate with their business partners, customers, vendors, subsidiaries, etc. It also means users from other tenants can potentially be granted access to items partners are creating.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../security/security-b2b.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 2.6 - Business Continuity and disaster recovery

Fabric commits to a seamless service availability to customers. We recognize the importance of planning for unforeseen events in a world of uncertainties. We ask partners providing workloads to customers within Fabric to define Business Continuity and Disaster Recovery (BCDR) plans designed to tackle unplanned disasters and recovery steps.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Reliability in Microsoft Fabric](/azure/reliability/reliability-fabric)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 2.7 - Performance

Performance is an important requirement for Fabric customers. We recommend our partners to think about performance in the context of their workload and take measures to test and track performance of their Items.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 2.8 - Presence

To ensure that you can meet customer expectations independent of their home or capacity region, partners need to think about how they want to align with Fabric regions and clouds. Availability in certain regions also impacts your Data Residency commitments.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../admin/region-availability.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 2.9 - Accessibility

The workload and all Item types the partner provides as part of it need to comply with the Fabric UX guidelines.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Fabric UX System](https://aka.ms/fabricux)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 2.10 - World Readiness

English has to be the default language. Content can be localized if you decide to do it. In this case add the supported languages to your attestation page.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

## 3. Design/UX Requirements

Get familiar with the design requirements for your Fabric workload, review the Fabric UX System (https://aka.ms/fabricux). The Fabric UX System provides an overview of the patterns and components that are available in the Fabric UX to accelerate your work. It also includes Fabric UX React and Angular wrapper libraries that integrate with Fluent web components.

Fabric users expect a fast loading UX. Independent of the technical implementation and regional hosting, your workload should load fast within all Fabric regions.

---

### 3.1.1 - Workload has a clear name

Workload must have a clear, descriptive name that helps users understand its purpose at a glance. You can't use generic terms (for example AI, Agent, ..) without prefix or suffix to differentiate from others on the platform.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)

---

### 3.1.2 - Workload icons, and images are clear

Workload must provide custom, professional icons, and images that are distinct from default placeholders and represent the brand

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

---

### 3.1.2.1 - Product icon is clear

Product icon must meet dimension requirements (240x240) and be visually clear and recognizable

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

**Guidelines:**

**IMAGE:**

Make sure the image in the manifest is aligned with the requirements

*Requirements:*
- Image file must exist and be accessible
- Image file must not be corrupted or invalid
- Image must be of the following types: image/png, image/jpeg, image/svg+xml
- Image must be aligned with one of the formats: 16x16, 20x20, 24x24, 32x32, 40x40, 48x48, 64x64
- Image should be optimized for web delivery

---

### 3.1.2.2 - Favicon icon is clear

Favicon must be provided in the manifest with appropriate dimensions and clarity for browser tab display

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

**Guidelines:**

**IMAGE:**

Make sure the image in the manifest is aligned with the requirements

*Requirements:*
- Image file must exist and be accessible
- Image file must not be corrupted or invalid
- Image must be of the following types: image/png, image/jpeg, image/svg+xml
- Image must be aligned with one of the formats: 16x16, 20x20, 24x24, 32x32, 40x40, 48x48, 64x64
- Image should be optimized for web delivery

---

### 3.1.2.3 - Custom actions Icon validation

Custom action icons must meet dimension requirements and be clear, recognizable representations of their functions

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

---

### 3.1.2.4 - Create experience Icon validation

Create experience icons must meet dimension requirements and provide clear visual representation for item creation

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

---

### 3.1.2.5 - Create experience Icon small validation

Small create experience icons must meet dimension requirements and remain clear at reduced sizes

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

---

### 3.1.2.6 - Tabs Icon validation

Tab icons must meet dimension requirements and be visually distinct to aid navigation

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

---

### 3.1.2.7 - Tabs Icon active validation

Active tab icons must meet dimension requirements and provide clear visual indication of selected state

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)
- [Microsoft Fabric visuals kit](https://aka.ms/fabricvisualskit)

---

### 3.1.3 - Workload has a clear sub title

Workload must provide a clear, concise slogan/subtitle that complements the name and communicates key value

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)

---

### 3.1.4 - Workload has a clear description

Workload must provide a comprehensive description that explains features, capabilities, and use cases

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)

---

### 3.1.4.1 - Workload has a clear description in the Workload Hub Card

Workload Hub card must include a concise description optimized for the card display format

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)

---

### 3.1.5 - Workload info page has banner at size 1920X240

Workload must provide a banner image with exact dimensions of 1920x240 pixels for the info page header

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Product Manifest](./manifest-product.md)
- [Fabric UX System](https://aka.ms/fabricux)

**Guidelines:**

**IMAGE:**

Make sure the image in the manifest is aligned with the requirements

*Requirements:*
- Image file must exist and be accessible
- Image file must not be corrupted or invalid
- Image must be of the following types: image/png, image/jpeg, image/svg+xml
- Image must be aligned with one of the formats: 16x16, 20x20, 24x24, 32x32, 40x40, 48x48, 64x64
- Image should be optimized for web delivery

---

### 3.1.6 - Gallery videos aren't allowed to show non product related ads

Gallery videos must focus exclusively on product features without displaying third-party advertisements or unrelated content

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Video guidelines](/partner-center/marketplace-offers/create-new-saas-offer-listing#add-videos-optional)

---

## 4. Security & Compliance Requirements

Security, privacy, and compliance requirements for data protection and regulatory adherence

---

### 4.1 - Security general

Microsoft customers entrust Fabric with their most sensitive data. As partners implementing workloads can have access to this data, they also have a responsibility to protect that data. We request workloads to go through a security assessment, a security review, and attest that they completed it and remediated any issues discovered in the process.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../governance/governance-compliance-overview.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.1.1 - Publisher must obtain user Microsoft Entra ID token from the Fabric host before calling Fabric JS functions

Workload must obtain Microsoft Entra ID tokens exclusively through the Fabric host before invoking any Fabric JavaScript functions

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Authentication Guidelines](./authentication-guidelines.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.1.2 - Publisher must only obtain any Microsoft Entra token using the JavaScript APIs provided by the Fabric Workload Client SDK

Workload must use only the official Fabric Workload Client SDK JavaScript APIs for obtaining Microsoft Entra tokens, no custom implementations

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Authentication Guidelines](./authentication-guidelines.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.1.3 - Publisher must not use third party cookies as part of their solution

Workload must not rely on third-party cookies; only essential HTTP-only cookies after authentication are permitted

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Cookie compliance](https://european-union.europa.eu/cookies_en)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.1.4 - Microsoft Entra App Name and publisher need to be aligned with the Workload

Microsoft Entra application name and publisher must align with the workload name to ensure clear identity and avoid user confusion

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Authentication Guidelines](./authentication-guidelines.md)
- [How to register an Entra app](/entra/identity-platform/quickstart-register-app)

---

### 4.2 - Privacy

Microsoft customers entrust Fabric with their most sensitive data. As such, partners that build workloads also have a responsibility to protect that data when they access it. To that end we request that every workload goes through a privacy assessment and a privacy review.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../governance/governance-compliance-overview.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.2.1 - Publisher using only essential HTTP-only cookies after positively authenticating the user

Workload owners can only use essential HTTP-only cookies. Workload can use them only after positively authenticating the user. Only use same-origin cookies

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](https://european-union.europa.eu/cookies_en)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.2.2 - Third-party cookie policy

Partner workloads aren't to use, write, or rely on third-party cookies

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../governance/governance-compliance-overview.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.2.3 - Microsoft Entra token policy

Publisher must only obtain any Microsoft Entra token using the JavaScript APIs provided by the Fabric Workload Client SDK

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.3 - Data Residency

Fabric is making an Enterprise Promise around data not leaving the geography of the tenant for stored data and data in transit. As a workload you're showing up in Fabric directly and users need to be aware what your commitments to Data Residency are. In the attestation, you need to define what our commitments are to the Data Residency of customer data.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](https://azure.microsoft.com/explore/global-infrastructure/data-residency/)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 4.4 - Compliance attestation

Within the Attestation Document you can show customers how your app handles security, data, and compliance. In this self-assessment, the Workload developer describes the Workload's security attributes and data-handling practices. The publisher attestation document should be hosted on the partner website. If applicable to your customers, align with more Fabric certifications.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../governance/governance-compliance-overview.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

## 5. Support Requirements

Support and documentation requirements for customer assistance and troubleshooting

---

### 5.1 - Livesite

Partner workloads are becoming an integral part of Fabric therefore our support teams need to be aware how you want to be contacted in case customers are reaching out to us directly. Partners need to provide the contact details as part of the publishing process to us.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 5.2 - Supportability

Partners are responsible to define and document their support parameters (Service level agreement, contact methods, etc.). This information needs to be linked from the Workload page and should always be accessible to customers. In addition, the Marketplace criteria need to be taken into account for the listing of the SaaS offer.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](/partner-center/marketplace-offers/marketplace-criteria-content-validation)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 5.2.1 - Help Link in Workload Page is correct

Workload must provide a valid, accessible HTTPS link to help resources and support documentation

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)

**Guidelines:**

**LINK:**

This validation extracts a URL from the manifest and verifies it is reachable via HTTP request. The URL is extracted from the manifest field `product.productDetail.supportLink.help.url`. 

*Requirements:*
- URL must use HTTPS protocol for security
- URL must be reachable and return HTTP status 200-399
- URL must respond within reasonable timeout period
- URL format must be valid and well-formed
- Manifest field `product.productDetail.supportLink.help.url` must exist and contain a valid URL
- URL redirects are allowed and will be followed

---

### 5.2.2 - Support contact is listed in the product details page

Product details page must clearly display support contact information for customer assistance

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](/partner-center/marketplace-offers/marketplace-criteria-content-validation)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 5.3 - Service Health & Availability

Partners need to host a website that shows their service health and availability to customers. This information can be included in the Supportability page.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ⚠️ Optional | ⚠️ Optional |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](/partner-center/marketplace-offers/marketplace-criteria-content-validation)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

## 6. Fabric Features

Integration with Microsoft Fabric platform features and capabilities

---

### 6.1 - Application lifecycle management (ALM)

Microsoft Fabric's lifecycle management tools enable efficient product development, continuous updates, fast releases, and ongoing feature enhancements.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../cicd/cicd-overview.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 6.2 - Private Links

In Fabric, you can configure and use an endpoint that allows your organization to access Fabric privately.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../security/security-private-links-use.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 6.3 - Data Hub

The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them. If you're implementing a Data Item, show up in the Data Hub as well.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [How to integrate with OneLake catalog](./how-to-integrate-with-onelake-catalog.md)
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../governance/onelake-catalog-overview.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 6.4 - Data lineage

In modern business intelligence (BI) projects, understanding the flow of data from the data source to its destination can be a challenge. The challenge is even bigger if you built advanced analytical projects spanning multiple data sources, data items, and dependencies. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../governance/lineage.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 6.5 - Sensitivity Labels

Sensitivity labels from Microsoft Purview Information Protection on items can guard your sensitive content against unauthorized data access and leakage. They're a key component in helping your organization meet its governance and compliance requirements. Labeling your data correctly with sensitivity labels ensures that only authorized people can access your data.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../fundamentals/apply-sensitivity-labels.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

### 6.5.1 - Sensitivity Labels - Exports

For partners that are using Export functionality within their Item they need to follow the guidelines.

**Stage Requirements:**

| Preview | General Availability |
|---------|---------------------|
| ✅ Required | ✅ Required |

**References:**
- [Vendor Attestation Document Template](./publishing-vendor-attestation-template.md)
- [Documentation](../fundamentals/apply-sensitivity-labels.md)

**Guidelines:**

**ATTESTATION:**

Make sure the information in the Attestation document is valid, can be reached and follows the template. 

*Requirements:*
- Attestation document URL must be present in manifest
- Document must be downloadable and accessible
- Document must be in a supported format (Website, PDF)
- Document must follow the template format
- Document content must be extractable and readable

---

---

## Additional Information

### Version History

This document is automatically generated.

---

*Generated by Microsoft Fabric Workload Validation System*  
*© 2025 Microsoft Corporation. All rights reserved.*
