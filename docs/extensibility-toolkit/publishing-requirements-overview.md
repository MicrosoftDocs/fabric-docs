---
title: Publishing Requirements for Microsoft Fabric Workloads
description: Comprehensive guide to all publishing requirements, validation tools, and processes for Microsoft Fabric workloads and items.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# Publishing requirements for Microsoft Fabric workloads

> [!IMPORTANT]
> This section applies ONLY to cross-tenant publishing (Workload Hub distribution). Organizations publishing workloads for internal tenant use do not need to meet these requirements.

This article provides a comprehensive overview of all requirements for publishing workloads to Microsoft Fabric, including workload registration, item requirements, attestation documentation, and validation tools.

## Prerequisites

Before you can publish your workload to the Workload Hub, you must meet these fundamental requirements:

### Workload ID Registration

Every workload requires a unique **Workload ID** that follows the format `[Publisher].[Workload]` (for example, `Contoso.SalesInsights`).

* **Registration Process**: Complete workload registration at <https://aka.ms/fabric_workload_registration>
* **Approval Required**: Your Workload ID must be approved before publishing
* **Fixed Value**: Once registered and approved, the Workload ID cannot be changed
* **Manifest Configuration**: Set the approved Workload ID in your [workload manifest](manifest-workload.md)

For detailed information about workload ID requirements and the registration process, see [Publish your workload](publishing-overview.md).

### Microsoft Entra App Verification

All workloads must use a **verified Microsoft Entra application** for authentication and API access.

* **Verification Required**: Your Entra application must complete the Microsoft verification process
* **Publisher Verification**: Applications must have verified publisher status
* **Compliance Standards**: Verified apps meet Microsoft's security and compliance requirements
* **Publishing Prerequisite**: App verification must be completed before workload publishing

For detailed information about the verification process and requirements, see [Microsoft Entra verified publisher documentation](/entra/identity-platform/publisher-verification-overview).

## Comprehensive Requirements

Publishing to Microsoft Fabric involves meeting requirements across three main categories:

### General Requirements

General requirements apply to all workloads regardless of publishing scenario and cover fundamental infrastructure, authentication, and configuration needs.

📋 **[General Publishing Requirements](./publishing-requirements-general.md)**

Key areas include:

* Microsoft Entra custom domain verification and application registration
* Resource ID format and domain configuration requirements
* Infrastructure hosting, HTTPS, and security standards
* Manifest configuration and endpoint setup
* Basic authentication and authorization patterns

### Workload-Level Requirements

Workload requirements cover the overall workload functionality, infrastructure, and compliance standards specific to Workload Hub distribution.

📋 **[Publishing requirements for workloads](./publishing-requirements-workload.md)**

Key areas include:

* Infrastructure and hosting requirements
* Security and authentication standards
* Performance and reliability criteria
* Documentation and support requirements
* Compliance and certification standards

### Item-Level Requirements

Item requirements focus on the specific user-facing components and experiences within your workload.

📋 **[Publishing requirements for items](./publishing-requirements-item.md)**

Key areas include:

* User interface and experience standards
* Data handling and processing requirements
* Integration with Fabric platform features
* Accessibility and usability standards
* Item lifecycle management

## Attestation Documentation

All workloads must provide **attestation documentation** that certifies compliance with Microsoft Fabric standards.

### Attestation Requirements

* **Template Compliance**: Follow the provided attestation document template
* **Public Accessibility**: Host the document at a publicly accessible HTTPS URL
* **Manifest Integration**: Include the attestation document URL in your workload manifest
* **Content Validation**: Ensure all information is accurate and up-to-date
* **Regular Updates**: Keep attestation documentation current with any changes

### Attestation Document Template

The attestation document template provides the required structure and content areas for your compliance certification.

📋 **[Publishing Vendor Attestation Template](./publishing-vendor-attestation-template.md)** - Use this template to create your attestation document

**Required in Manifest**: Your workload manifest must include the `AttestationUrl` property pointing to your published attestation document.

## Validation Tools

Microsoft Fabric provides validation tools to help partners ensure their workloads meet publishing requirements before submission.

### Publishing Validation Tool

Use the official validation tool to check your workload against publishing requirements:

🔧 **[How to validate your workload for publishing](./tutorial-validate-workload.md)**

The validation tool provides:

* **Automated Checks**: Scans your workload for common compliance issues
* **Requirement Coverage**: Validates against both workload and item requirements
* **Detailed Reports**: Provides specific feedback on areas that need attention
* **Pre-Submission Validation**: Catch issues before submitting for review

### Validation Process

1. **Complete Development**: Ensure your workload is feature-complete
2. **Run Validation Tool**: Use the publishing validation tool to identify issues
3. **Address Findings**: Fix any compliance gaps identified by the tool
4. **Re-validate**: Run the tool again to confirm all issues are resolved
5. **Submit for Review**: Proceed with the publishing request form

## Publishing Process Overview

Once you meet all requirements, follow this process:

1. **Workload ID Registration**: Complete registration and receive approval
2. **Requirements Compliance**: Meet all workload and item requirements
3. **Attestation Documentation**: Create and publish your attestation document
4. **Validation**: Use validation tools to verify compliance
5. **Manifest Preparation**: Include Workload ID and attestation URL in manifest
6. **Publishing Request**: Submit the [Publishing Request Form](https://aka.ms/fabric_workload_publishing)
7. **Review Process**: Microsoft reviews your submission against requirements
8. **Approval**: Once approved, your workload is published to the Workload Hub

## Support and Resources

### Getting Help

* **Documentation**: Review all linked requirement documents thoroughly
* **Validation Tools**: Use provided tools to identify and fix issues early
* **Partner Support**: Contact your Microsoft partner representative for guidance
* **Publishing Form**: Use the official publishing request form for submissions

### Related Content

* [Publishing Overview](./publishing-overview.md) - High-level publishing process
* [Publish your workload](./publishing-overview.md) - Detailed publishing workflow  
* [Manifest overview](./manifest-overview.md) - Workload manifest configuration
* [Publishing requirements for workloads](./publishing-requirements-workload.md)
* [Publishing requirements for items](./publishing-requirements-item.md)
* [How to validate your workload for publishing](./tutorial-validate-workload.md)
