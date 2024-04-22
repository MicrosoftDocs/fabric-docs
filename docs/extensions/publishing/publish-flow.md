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

My Workloads: This view lists the workloads that have been added by the user or others within the organization, including built-in workloads that are part of Fabric.
More Workloads: This view showcases all available workloads that can be added to Fabric.

To publish your workload to the Fabric Workload Hub, which is currently in public preview, you can follow these steps. Please review all steps before you start developing your workload and make sure you comply with all of the mandatory requirmenets, before you submit your Fabric workload to ensure a smooth and quick publishing flow.

## Step 1: Develop Your Workload
Ensure your workload is compatible with the Fabric Extensibility framework and prepare your branding materials for listing.
Find this comprehensive [guide](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/README.md) that covers everything you need to know to create your own custom Fabric workload.

## Step 2: Comply to the functional requirmenets
In order to pass all validation checks your workload should comply with the following functional and design requirmenets:

### 2.1. Fabric requirements
Your nuget package should comply to the following 
### 2.2. Design requirements
### 2.3. Compliance requirmenets
### 2.4. Privacy requirmenets

## Step 3: Create an Azure  Marketplace Lisitng 

### Prerequisite
To submit your Fabric, you must be enrolled with [Partner Center](https://learn.microsoft.com/en-us/partner-center/overview). If you're not yet enrolled, [Open a developer account in Partner Center](https://learn.microsoft.com/en-us/azure/marketplace/create-account).

1. Create nuget package
2. Test the extension in your test tenant
3. Create a SaaS offer in Partner Center
   < add a link>

4. Add the link of SaaS offer link to your .nupkg 
Make sure that the .nupkg complies with these requirements
5. Make sure your extensions complies with the requirmernts
6. Reach out to our team for opting in to the public preview
   mailto: FabricWorkloadSubmission@microsoft.com
   
    
