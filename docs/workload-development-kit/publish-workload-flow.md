---
title: Publish a workload to the Fabric Workload Hub
description: Learn how to publish a workload you created using the Microsoft Fabric Workload Development Kit, to the Fabric Workload Hub.
ms.topic: how-to
ms.date: 05/21/2024
#customer intent: As an ISV I want to publish my workload to the Fabric Workload Hub so that I can make it available to customers.
---

# Publish a workload to the Fabric Workload Hub

The Fabric [Workload Hub](./more-workloads-add.md) is a place where users can browse, explore, and manage workloads within Fabric. Workloads are categorized into two groups: Core Fabric workloads and workloads developed by Microsoft partners. Within the Workload Hub users can explore different capabilities that are available to them and add those new functionalities.

## Process

Publishing a partner workload in Fabric involves different steps. Before all Fabric users have access to it there are different stages available to test the workload and get early feedback from your customers.

:::image type="content" source="./media/publish-workload-flow/publishing-process.png" alt-text="Diagram showing that the steps in the publishing stages process are 1. Testing, 2. Preview Audience, 3. Preview, 4. General availability. They're explained in this article.":::

As a first step you need to define your `Publishing tenant` and the `Workload ID` that you want to use. Both are fixed and can't be changed at a later time.

* Publisher tenant

This Fabric tenant is used to publish and manage the lifecycle of workloads in the future. Make sure to use a production tenant that users that need to manage the lifecycle for the workload have access to.  

* Workload ID

The workload ID consists of two components combined by a dot `[Publisher].[Workload]`. For the `[Publisher]` make sure to use a meaningful name. Ideally use your company name or abbreviation. For the `[Workload]`, it would be best to align with your product name or offering. The Workload ID must be unique in the system.  

Before you start your publishing journey, you need to decide on both and fill out the [Workload registration form](https://aka.ms/fabric_workload_registration). The fabric team checks the information and enables you to start the publishing process. Without completing this step, you can't publish a workload outside of your own organization.

Once Registration is completed, you can use the ID in your [Workload Manifest](./backend-manifest.md). The Workload Manifest that uses the Workload ID can now be [uploaded](./manage-workload.md) into the Fabric Portal. Once it's uploaded, you can begin publishing.  

## Preview Audience

Before you publish your workload to all Fabric customers, you can use a preview audience to test and get early feedback. After your Tenant is enabled to publish the workload with the ID you selected, you can enable up to 10 tenants. We recommend to start testing the workload with another Fabric test tenant that you own.
After the tenant was added to the preview audience, the Administrator of the tenant needs to enable the feature in the [Fabric tenant settings](../admin/tenant-settings-index.md). Changing this setting has immediate effect and allowing all users within the tenant to use the functionality. The workload and the items have a clear indication that they're part of a preview and the publishing requirements aren't validated so far.

## Preview

The preview enlists a workload and all items it contains to all Fabric users in the Workload Hub. To move a workload to the preview stage, owners need to fill out the [Publishing Request Form](https://aka.ms/fabric_workload_publishing) which triggers a validation process. The [Workload publishing requirements](./publish-workload-requirements.md) provide an overview of the requirements the workload needs to meet to be enlisted.

After the form was submitted, the Fabric workload team validates the information and provide feedback on the request. If the workload checks all the requirements, partners are informed about the status change through the contact details provided in the form. The workload shows up in the Workload Hub of every Fabric customer with an indication that it's still in preview.

## General Availability

When the workload is ready for General availability, a new request for GA publishing needs to be created through the [Publishing Request Form](https://aka.ms/fabric_workload_publishing). The [Workload publishing requirements](./publish-workload-requirements.md) define the requirements a workload needs to meet to reach GA.

After the form was submitted, the Fabric workload team validates the information and provide feedback on the request. If the workload checks all the requirements, partners are informed about the status change through the contact details provided in the form and the preview indication is removed from the workload and the items in all Fabric tenants

## Related content

* [Publishing guidelines and requirements](./publish-workload-requirements.md)

* [Monetize your workload](monetization.md)

