---
title: Publish a workload to the Fabric Workload Hub
description: Learn how to publish a workload you created using the Microsoft Fabric Workload Development Kit, to the Fabric Workload Hub.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
# customer intent: As an ISV I want to publish my workload to the Fabric Workload Hub so that I can make it available to customers.
---

# Publish a workload to the Fabric Workload Hub

Learn how to publish a workload you created using the Microsoft Fabric Workload Development Kit, to the Fabric Workload Hub. The Fabric Workload Hub is a marketplace where users can browse, explore, and manage workloads within Fabric. Workloads are categorized into two groups: Core Fabric workloads and workloads developed by Microsoft partners.

## Prerequisites

* [Partner Center](/partner-center/partner-center-enroll-overview) enrollment. If you're not enrolled, [open a developer account in Partner Center](/azure/marketplace/create-account).

* Ensure your workload is compatible with the Microsoft Fabric Workload Development Kit's framework and prepare your branding materials for listing. To pass all validation checks and display your workload publicly in the Fabric Workload Hub, your workload must comply with the [functional and design requirements](publish-workload-requirements.md).

* The SaaS offer linked to your Fabric workload must meet all requirements defined in these [Commercial marketplace certification policies](/legal/marketplace/certification-policies):
    * [100 General](/legal/marketplace/certification-policies#100-general)
    * [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas)

## Publish your workload

Follow these steps to publish your workload to the Fabric Workload Hub.

1. Using your Partner Center account, [create a SaaS offer](/partner-center/marketplace/create-new-saas-offer) in the Azure Marketplace. If you already have an existing SaaS offer in the Azure Marketplace, ensure that the SaaS offer metadata in Partner Center and the workload package metadata you created are identical.

    Your SaaS offer must have an [Azure Marketplace](https://azuremarketplace.microsoft.com/home) storefront entry. You can have both [AppSource](https://appsource.microsoft.com/) and Azure Marketplace offers. However, the offer setup combination of *Yes, I would like to sell through Microsoft and have Microsoft host transactions on my behalf* and *Yes, I would like Microsoft to manage customer licenses on my behalf* creates a SaaS offer in AppSource only, and isn't supported.

2. Review your SaaS offer's metadata. Your metadata should match across the Fabric workload package manifest, the SaaS offer setup in Partner Center, and the SaaS listing in Azure Marketplace. Metadata includes but isn't limited to:
    * Icons
    * Screenshots
    * Descriptions
    * Publisher name
    * Product compliance documentations

3. In the `license` field under the `supportLink` section add the public SaaS link offer linked to your workload. The SaaS offer must be live in Azure Marketplace with at least one public plan. The workload package manifest must accurately define the public SaaS URL linked to the workload manifest.

4. Reach out to our Workload Fabric Team to opt into the public preview. Send an email to fabric_wdt_submission@service.microsoft.com and include the workload package in your email. The publisher of the SaaS offer should be the same publisher who sends the email, or the email domain of the engineering contact in the SaaS offer should match the email domain of the publisher reaching out to us with the workload package.

5. After your package passes validation you receive an email from the team, and you'll be able to preview your workload with specific tenants or publicly publish it to all tenants through the *workloads* page in the admin portal. The *workloads* page is only available if you passed validation.

6. Update the metadata that needs to be duplicated, such as your workload description, title, and screenshots. Resubmit your SaaS offer and update the metadata in both the workload package manifest and the SaaS offer metadata in Partner Center. Changes in metadata available only in the workload package manifest require only a resubmission of a new workload package.

## Related content

* [Publishing guidelines and requirements](publish-workload-requirements.md)

* [Monetize your workload](monetization.md)
