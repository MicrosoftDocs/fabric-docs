---
title: Fabric Extensibility toolkit vendor attestation template
description: Template document for vendor attestation requirements when publishing to Microsoft Fabric Workload Hub.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.date: 12/15/2025
---

# Vendor Attestation Document Template

## Executive Summary

This Vendor Self-Attestation document is designed for vendors to formally declare their compliance with the requirements outlined by Microsoft for publishing workloads using the Microsoft Workload Development Kit (WDK). It includes an attestation of adherence to standards in areas such as functional compatibility, security, performance, reliability, supportability, and legal compliance. Additionally, an attestation checklist is included to provide further details regarding each requirement and identify any exceptions, variances, or specific notes.

## Key Terms Defined

Vendor / Independent Software Vendor (ISV) / Partner: The company or individual responsible for developing, distributing, and maintaining the workload using Microsoft Fabric’s Workload Development Kit. Vendors may also provide value-added services, support, or integration solutions to extend the capabilities of Microsoft workloads and assist customers in their deployment and management. In this document, the vendor attests to their compliance with the requirements defined by Microsoft.

Customer: The end user or organization that uses the workload developed by the vendor. Customers benefit from the functionalities provided by the workload, and their needs drive the requirements for reliability, performance, and supportability.

Workload: A software component or solution designed to perform specific tasks on the Microsoft Fabric platform. Workloads typically interact with various services and require compatibility, reliability, and security measures to ensure seamless operation.

Microsoft Fabric Workload Development Kit (WDK): A toolkit provided by Microsoft that includes tools, guidelines, and best practices for developing and publishing workloads to run efficiently on the Microsoft Fabric platform.

Publish Workload Requirements: A set of requirements and standards specified by Microsoft that each workload must meet to be published and deployed within the Microsoft environment. These requirements include functional, security, performance, and compliance standards.

The document serves as an assurance from vendors to Microsoft and its Customers, ensuring that all requirements are met for the safe and efficient operation of workloads within the Microsoft ecosystem.

The appendix allows vendors to provide detailed information about each requirement, specifying whether it's supported, and detailing any exceptions or additional information for clarity.

## Process

The document is composed of three sections. All sections are to be provided to Microsoft as Vendor’s formal attestation, while ONLY Section III, which details all of the specifics on the attestation are to be hosted on the partners website for customers to reference.

Microsoft must be notified promptly prior to releasing any changes if the changes materially impact the attestation especially regarding security, compliance, privacy and/or if the change has significant variance from the design / UX guidelines.

## Section I

## ISV Information

### Vendor Information

|Name|Required or optional|
|-----|-----|
| Company Name: | (Required) |
| Company Website: | (Required)  |
| Address: | (Required)  |
| City: | (Required)  |
| State: | (Required)  |
| Postal Code: | (Required)  |
| County: | (Required)  |
| Phone: | (Optional) |

### Primary Contact

|Name|Required or optional|
|-----|-----|
| Name: | (Required)  |
| Title: | (Required)  |
| Email: | (Required / Email Alias OK) |

## Section II

## Attestation

To: Microsoft Corporation

Subject: Vendor Self-Attestation for Compliance with Microsoft Workload Development Requirements

We, the undersigned, [Vendor Name], hereby confirm and attest that we have reviewed, understood, and complied with all applicable requirements as outlined in the Microsoft Extensibility toolkit documentation, specifically the [Publish Workload Requirements](publishing-requirements-workload.md).

## Section III

### Publish Workload Requirements Attestation Checklist

We, the vendor, [Vendor Name], confirm and attest to reviewing, meeting, and complying with the requirements outlined in the Microsoft Fabric Extensibility Toolkit specifically the [Publish Workload Requirements](publishing-requirements-workload.md)

The following sections documents details, exceptions, or variances regarding the attestation of adherence to the Publish Workload Requirements.

### Workload Information

|Name|Required or optional|
|-----|-----|
| Workload Version: | (Required)  |
| Workload Name: | (Required)  |
| Release Date: | (Required / Email Alias OK) |

#### Business Requirements

##### Value To Customers

The workload provides the following value to customers –

> [!NOTE]
> Short paragraph here with text and / or bulleted items

##### Trial

We provide an easy and fast trial experience. The trial is available to the customer without waiting time (less than 5 seconds), and provides a free and easy way to explore the offered workload for a limited time in accordance with Microsoft guidelines for Trials

[] Yes

[] No

> [!NOTE]
> Description of the trial and the limits around the trial

#### Monetization

The workload is available on the marketplace for the customer to procure with or without a trial in accordance with the monetization guidelines

[] Yes

[] No

> [!NOTE]
> Link to the workloads here

### Technical Requirements

#### Microsoft Entra Access

The workloads use Microsoft Entra authentication and authorization.

[ ] No other authentication and authorization mechanisms are used

[ ] Different authentication and authorization mechanisms are used for stored data In Fabric

> [!NOTE]
> Provide details here:
> Provide the endpoint / tenant ID for the Microsoft Entra
> If other Non Microsoft Entra Authentication and Authorization Mechanisms are required, outline details.

#### One Lake

Workloads integrate with One Lake to store data in the standard formats supported by the Fabric platform so that other services can take advantage of it.

[ ] All data and metadata is stored in One Lake or Fabric Data Stores

[ ] Not all data and metadata is stored in One Lake or Fabric Data Stores

> [!NOTE]
> Clarify what data or metadata is stored outside of One Lake and/or Fabric

#### Microsoft Entra Conditional Access

Enterprise customers require centralized control and management of the identities and credentials used to access their resources and data and via Microsoft Entra to further secure their environment via conditional access.

[ ]  The service works in its entirety with even if customers enable this functionality

[ ]  The service works in with limitations if customers enable this functionality

[ ]  The service doesn't work Microsoft Entra Conditional Access

> [!NOTE]
> Clarify limitations, constraints, exceptions if applicable

#### Admin REST API

Admin REST APIs are an integral part of Fabric admin and governance process. These APIs help Fabric admins in discovering workspaces and items, and enforcing governance such as performing access reviews, etc. Basic functionality is supported as part of the Workload Development Kit and doesn't need any work from Partners.

[ ]  Microsoft Fabric Admin APIs are being used (/admin/*)

[ ]  No Microsoft Fabric Admin APIs are being used

#### Customer Facing Monitoring & Diagnostic

Health and telemetry data needs to be stored for a minimum for 30 days including activity ID for customer support purposes, including Trials.

[ ] Minimum 30 days requirement is adhered to

[ ] Vendor stores the data for __ days beyond the minimum requirement

#### B2B

The implementation of the workload is in line with Microsoft Fabric’s sharing strategy focused on allowing customers to collaborate with their business partners, customers, vendors, subsidiaries, etc. It also means users from other tenants can potentially be granted access to items partners are creating.

[ ] Cross tenant B2B collaboration supported

[ ] Workload Item Access only within the tenant

> [!NOTE]
> Clarify limitations, constraints, exceptions if applicable

#### Business Continuity and disaster recovery

The vendor has a comprehensive Business Continuity and Disaster Recovery (BCDR) plans designed to tackle unplanned disasters and recovery steps.

> [!NOTE]
> Either provide a link to the BCD plan or TOS (Terms of Service) for their offering here along with a summary

#### Performance

The Workload implementation takes measures to test and track performance of their Items

[ ] Performance Metrics on workload performance  are available via the monitoring hub

[ ] Workload includes a separate monitoring UI to test and track performance

[ ] Performance tracking isn't currently available to the end user however vendor support personnel can monitor, test, track performance via their internal instrumentation and monitoring systems

> [!NOTE]
> Notes here

#### Presence

To ensure that customer expectations independent of their home or capacity region are met, vendors need to align with fabric regions and clouds. Availability in certain restrictions also impacts your Data Residency commitments.

[ ] Service availability and colocation/alignment in the following fabric regions

> [!NOTE]
> Notes here

[ ] All or part of the service doesn't reside in Azure

> [!NOTE]
> Notes here

#### Public APIs

Fabric Public APIs are the backbone of automation, enabling seamless communication and integration for both customers and partners within the Fabric ecosystem. Fabric Public API empowers users to build innovative solutions, enhance scalability, and streamline workflows.

[X] The workload uses Fabric Public APIs

### Design / UX Requirements

#### Common UX

The workload and all item types the partner provides as part of it comply with the Fabric UX guidelines.

[ ] The following variance and/or exceptions have been granted by Microsoft

> [!NOTE]
> Exception and reason for variance and/or exception

#### Item Creation Experience

The item creation experience is in accordance with the Fabric UX System.

[ ] Yes

[ ] No

#### Monitoring Hub All Long running operations need to integrate with Fabric Monitoring Hub

[ ] Yes

[ ] No

#### Trial Experience

The workload provides a Trial Experience for users as outlined in the design guidelines

[ ] Trial Supported

[ ] Trial Not Supported

#### Monetization Experience

The monetization experience is in line with the design guidelines provided

[ ] The monetization experience is integrated with the market place and compliant with the guidelines

[ ] Bring Your Own License (BYOL)

[ ] Free / Freemium

[ ] Other

> [!NOTE]
> Limitations here, outline details for Other and Freemium models link to Terms of Service if applicable

#### Accessibility

The user experience is in compliance with the Fabric UX design guidelines for Accessibility

[ ] The user experience is compliant with the guidelines

[ ] The following limitations exist

> [!NOTE]
> Limitations here

#### World Readiness / Internationalization

English is supported as the default language. Localization through optional, should be considered.

[ ] English is the only supported language

[ ] The following languages are supported

> [!NOTE]
> List of Languages

#### Item Settings

Item settings are implemented as a part of the ribbon as outlined in the UX guidelines

[ ] Yes

[ ] No

> [!NOTE]
> Clarify any variances/exceptions

#### Samples

Samples are optionally provided that preconfigure items of their type to help customers get started more easily.

[ ]  Samples not provided

[ ]  Samples for preconfiguration of items provided

#### Custom Actions

Custom actions can be optionally provided as a part of the item editor.

[ ]  Custom Actions aren't implemented

[ ]  Custom Actions implemented as part of Workload

> [!NOTE]
> List of custom actions

#### Workspace settings

Workspace settings provide a way that workloads can be configured on a workspace level.

[ ] Supported

[X] Not Supported

#### Global Search

Searching for items in Fabric is supported through the top search bar.

[ ] Supported

[X] Not supported

### Security / Compliance Requirements

#### Security general

Protection of customer data and metadata is of paramount importance. Workloads must go through a security review and assessment. Vendor attests that the security review and assessment was completed and will be periodically performed as enhancements and changes are made. Security issues discovered which could have a detrimental impact on the customer should be addressed promptly and customers notified where applicable.

> [!NOTE]
> Please outline all the security and compliance tests, attestations performed. The more detailed this is the easier it's for customers/Microsoft to review. This should include references to the latest security assessment reports

#### Privacy

Partners that build workloads also have a responsibility to protect that data when they access it. Every workload goes through a privacy assessment and a privacy review. Vendor attests that privacy review was completed and is periodically performed as enhancements and changes are made.

**Extra Requirements:

[ ] Publisher attests that only essential HTTP-only cookies are used by the Workload and only after positively authenticating the user.

[ ] Publisher attests that it's not using or relying on third-party cookies as part of their solution.

[ ] Publisher attests that's obtaining any Microsoft Entra token using the JavaScript APIs provided by the Fabric Workload Client SDK

> [!NOTE]
> Outline all the privacy assessment and reviews performed.  Links to latest reports and privacy policy provided here

#### Data Residency

Microsoft Fabric is making an Enterprise Promise around data not leaving the geography of the tenant for stored data and data in transit. As a workload in Fabric directly and users need to be aware what your commitments to Data Residency are. Define what your commitments are to the Data Residency of customer data.

> [!NOTE]
> Summarize your commitments. For details on Data Residency and compliance, provide an existing link to your Data Residency and compliance support>

#### Compliance

The publisher attests to the following security, data, and compliance regulations and standards

> [!NOTE]
> Summarize how your app handles security, data, and compliance. Describe the Workload’s security attributes and data-handling practices. If applicable to your customers, align with more Fabric certifications.
> List all standards compliance / reports/ certifications here ISO, SOC2, HIPAA, and others
> For more details reference a link to your security, data, and compliance information.

### Support

#### Live site

Partner workloads are an integral part of Fabric that requires that the Microsoft support teams are aware of how to contact you in case customers are reaching out to us directly.

**Microsoft direct vendor outreach:**

|Name|Required or optional|
|-----|-----|
| Contact Name/Team: | (Vendor Primary contact Name / Team Here) |
| Number | (Optional Phone # here) |
| Email alias | (Email alias here) |
| Self Service portal | (Link to website) |

#### Supportability

Vendors are responsible for defining and documenting their support parameters (Service level agreement, contact methods, ...). This information needs to be linked from the Workload page and should always be accessible to customers. In addition, the Marketplace criteria, need to be taken into account for the listing of the SaaS offer.

[ ] Vendor attests that support information is published to the marketplace offering and available to user/customers directly via the workload

#### Service Health and Availability

Vendors need to host a service health dashboard that shows their service health and availability to customers. This information can be included on the Supportability page.

**Service heath dashboard can be found here:**

> [!NOTE]
> URL to service health dashboard

### Fabric Features

#### Application Life Cycle Management (ALM)

Microsoft Fabric's lifecycle  management tools enable efficient product development, continuous updates, fast releases, and ongoing feature enhancements.

[ ] Supported

[X] Not Supported

#### Private Links

In Fabric, you can configure and use an endpoint that allows your organization to access Fabric privately.

[ ] Supported

[X] Not Supported

#### Data Hub

The OneLake data hub makes it easy to find, explore, and use the Fabric data items in your organization that you have access to. It provides information about the items and entry points for working with them. If you're implementing a Data Item, show up in the Data Hub as well.

[ ] Supported

[X] Not Supported

#### Data Lineage

In modern business intelligence (BI) projects, understanding the flow of data from the data source to its destination can be a challenge. The challenge is even bigger if you built advanced analytical projects spanning multiple data sources, data items, and dependencies. Questions like "What happens if I change this data?" or "Why isn't this report up to date?" can be hard to answer.

[ ] Supported

[X] Not Supported

#### Sensitivity labels

Sensitivity labels from Microsoft Purview Information Protection on items can guard your sensitive content against unauthorized data access and leakage. They're a key component in helping your organization meet its governance and compliance requirements. Labeling your data correctly with sensitivity labels ensures that only authorized people can access your data.

**Extra requirements:**

For partners that are using Export functionality within their Item they need to follow the guidelines.

[ ] Supported

[X] Not Supported

### Extra  Notes

Use this section to provide any further explanations, references, or notes that may be relevant to your attestation:

> [!NOTE]
> Additional Notes by Vendor

## References

> [!NOTE]
> Consolidate all relevant reference here for completeness, e.g. support policy, compliance, service health, etc. might seem redundant but useful to have it in a single place
