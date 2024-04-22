---
title: Overview of Fabric extensibility publishing flow (Public Preview)
description: Learn how to publish a workload over the Fabric extensibility platform.
author: rasala
ms.author: rasala, gesaur
ms.reviewer: gesaur
ms.topic: how-to
ms.custom:
ms.date: 04/17/2024
---

# Intro
The Fabric Workload Hub serves as a marketplace users can browse, explore and manage workloads within Fabric. Workloads are categorized into two groups: Core Fabric workloads and those developed by Microsoft partners.

The hub is structured with two main views:

**My Workloads:** This view lists the workloads that have been added by the user or others within the organization, including built-in workloads that are part of Fabric.
**More Workloads:** This view showcases all available workloads that can be added to Fabric.

Publishing your workload to the Fabric Workload Hub involves several key steps to ensure a smooth and successful process. Below is a step by step flow with additional details to guide you through each stage. Review all steps before you start developing your workload and make sure you comply with all of the mandatory requirmenets.

## Step 1: Develop and Test Your Workload
Ensure your workload is compatible with the Fabric Extensibility framework and prepare your branding materials for listing.
Find this comprehensive [guide](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/README.md) that covers everything you need to know to create your own custom Fabric workload.
For testing your workload follow these instructions.



## Step 2: Comply to the functional requirmenets
In order to pass all validation checks your workload should comply with the following functional and design requirmenets:

### 2.1. Fabric requirements
Your nuget package should comply to the following requirmenets
### 2.2. Design requirements
### 2.3. Compliance requirmenets
### 2.4. Privacy requirmenets

## Step 3: Create an Azure  Marketplace Lisitng 

### Prerequisite
To submit your Fabric, you must be enrolled with [Partner Center](https://learn.microsoft.com/en-us/partner-center/overview). If you're not yet enrolled, [Open a developer account in Partner Center](https://learn.microsoft.com/en-us/azure/marketplace/create-account).

### 3.1. Create a SaaS offer
Once you have a Partner Center account follow these [steps](https://learn.microsoft.com/en-us/partner-center/marketplace/create-new-saas-offer) to create a SaaS offer.
If you alrady have an exting SaaS offer in Azure Marketplace, you don't need to create a new one. Follow these steps to connect your SaaS offer with Fabric Hub. ***????????????????????????***
Choose the configuration based on your solution and buisness model prefenrces. For instance if you arelady have a transacatbility model choose the option "No, I would prefer to only list my offer through the marketplace and process transactions independently".
Note that choosing both options at the same time:
"Yes, I would like to sell through Microsoft and have Microsoft host transactions on my behalf" and "Yes, I would like Microsoft to manage customer licenses on my behalf" will create a SaaS offer in [AppSource](https://appsource.microsoft.com/) storefront and not [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/home) therefore this combination is not allowed. Having a SaaS offer in both AppSource and Azure Marketplace is allowed.
> [!NOTE]
> Your SaaS offer must have [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/home) storefront entry. Having both [AppSource](https://appsource.microsoft.com/) and Azure Marketplace is allowed. Therefore the offer setup combination of "Yes, I would like to sell through Microsoft and have Microsoft host transactions on my behalf" and "Yes, I would like Microsoft to manage customer licenses on my behalf" will create a SaaS offer in AppSource only, therefore it is not supported yet. 

> [!NOTE]
> The following metadata are required both in the manifest in the nuget package and in Partner Center when you create your SaaS offer. Any duplocated metadata should be identical in SaaS offer setup in Partner Ceneter and in the nuget package manifest. Metadata includes but not limited to:
> Workload title
> Icons
> Screenshots
> Descriptions
> Publisher name
> Product compliance documentations




### 3.1. SaaS public link 
Add the public link of SaaS offer to your .nupkg. 

## Step 4 Reach out to our Workload Fabric Team
Once you have a public SaaS link in Azure Marketplace and the nuget packge and workload complies to the above requirmenets, 
reach out to our team for opting in to the public preview
mailto: FabricWorkloadSubmission@microsoft.com
Include in your email:
* Workload extension
* Final Success submission email from Partner Ceneter


   
    
