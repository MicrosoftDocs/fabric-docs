---
title: Publish a workload to the Fabric Workload Hub (preview)
description: Learn how to publish a workload you created using the Microsoft Fabric Workload Development Kit, to the Fabric Workload Hub.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
# customer intent: As an ISV I want to publish my workload to the Fabric Workload Hub so that I can make it available to customers.
---

# Publish a workload to the Fabric Workload Hub (preview)

The Fabric Workload Hub is a marketplace where users can browse, explore, and manage workloads within Fabric. Workloads are categorized into two groups: Core Fabric workloads and workloads developed by Microsoft partners. Within the Fabric Workload Hub users can explore different capabilities that are avaialble to them. Partner workloads that have not been enabled so far can be added to the tenant that users can leverage those functionallities.


## Process

Publishing a partner workload in Fabric involves different steps. To publish the workload to all Fabric users.

:::image type="content" source="./media/publish-workload-flow/publishing-process.png" alt-text="Screenshot showing the different stages for publishing.":::

Before you can start the publishing process you need to define your publishing tenant as well as the Workload ID that you want to leverage. Both are fixed and can't be changed at a later time.

* Publisher tenant

This Fabric tenant will be used to publish and manage the lifecycle of workloads in the future. Please make sure to use a Production tenant and not a test tenant. 

* Workload ID

The workload ID consists of two components `[Publisher].[Workload]`. For the `[Publisher]` please make sure to leverage a meandingfull name. Idealy leverage your company name or abbreviation. For the `[Workload]`it would be best to align with your product name or offering. The Workload ID must be unique in the system.  

Before you start your publishing journey please decide on both and fill out the o [Workload registration form](https://aka.ms/fabric_workload_registration). The fabric team will check the information and enable you to start the publishing process.
Without this step you will not be able to publish Workloads outside of your own organization.

## Preview Audience

Before you publish your workload to all Fabric customers you can leverage a preview audience to test and get early feedback. After you Tenant has been activated to publish your worklod with the ID you have chosen, the workload can be previewd in up to 10 tenants. It is recommended to start testing the workload with another Fabric Test Tenant that you own.

After the tenant was added to the preview audience the Administrator of the tenant needs to enable the enable the feature in the [Fabric tenant settings](../admin/tenant-settings-index.md). Changin this setting will have immediate effect and allow all users within the tenant to leverage the functionallity. There will be a clear indication for the workload and the items to users that those are part of a preview and and the publishing requirements have not been validates so far.  process.  

## Preview

Previewing a workload provides the capability to enlist the workload in the Workload hub to all Fabric users. For this, workload owners need to fill out the [Publishing Request Form](https://aka.ms/fabric_workload_publishing) which will trigger a validation process. The [Workload publishing requirments](./publish-workload-requirements.md). provides an overview of the rquirements needed.

After the form has been sumitted the Fabric workload team will validate the information and provide feedback on the request. If the workload checks all the requirments, partners will be informed about the status change through the contact details provided in the form and every Fabric tenant will be able to see the workload in the Workload Hub with an indication that the workload is still in preview.

## General Availability

When the workload is ready for General availability a new request for GA publishing needs to be created through the [Publishing Request Form](https://aka.ms/fabric_workload_publishing).The [Workload publishing requirments](./publish-workload-requirements.md) define the rquirements a workload needs to meet to reach GA.

After the form has been sumitted the Fabric workload team will validate the information and provide feedback on the request. If the workload checks all the requirments, partners will be informed about the status change through the contact details provided in the form and the preview indication will be removed for all Fabric tenants


## Prerequisites

For the publishing of the workload there are some prerequisites that workload publishers need to keep in mind.

* [Partner Center](/partner-center/partner-center-enroll-overview) enrollment. If you're not enrolled, [open a developer account in Partner Center](/azure/marketplace/create-account).

* Ensure your workload is compatible with the Microsoft Fabric Workload Development Kit's framework and prepare your branding materials for listing. To pass all validation checks and display your workload publicly in the Fabric Workload Hub, your workload must comply with the [functional and design requirements](publish-workload-requirements.md).

* The SaaS offer linked to your Fabric workload must meet all requirements defined in these [Commercial marketplace certification policies](/legal/marketplace/certification-policies):
    * [100 General](/legal/marketplace/certification-policies#100-general)
    * [1000 Software as a Service (SaaS)](/legal/marketplace/certification-policies#1000-software-as-a-service-saas




## Related content

* [Publishing guidelines and requirements](./publish-workload-requirements.md)

* [Monetize your workload](monetization.md)
