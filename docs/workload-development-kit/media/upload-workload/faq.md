---
title: FAQ for extensibility certification 
description: Learn how to certify and publish a workload over the Fabric extensibility platform.
author: gesaur,rasala
ms.author: gesaur,rasala
ms.reviewer: gesaur, rasala
ms.topic: how-to
ms.custom:
ms.date: 04/17/2024
---

# General
## I have a question that is not answered below, where can i get help?
Please reach out to [Fabric workload dev support](mailto:ILDCWLSupport@microsoft.com)

# Fabric Workload Design
## What design language is Fabric following?
Fabric controls are aligned to the Fluent 2 design language. Visit the [Fabric UX System](https://aka.ms/fabricux)  page for more details.

## What are base (.Base) components?
Base components should not be used in designs. They’re meant only as a nested building block for the creation and management of component variants in the toolkit and are not published via the library. Make sure you‘re not using any components prefixed with “.Base” (nested .Base components are fine).

## Where can I find examples of common page layouts in Fabric?
Specific screens in Fabric are collected in the Page examples file while more generic layout templates are available in this file under Page templates.

## What guidelines should I follow if, I want to use icons in my extensions?
Please take a look in the the [Fabric UX System](https://aka.ms/fabricux) for further information on this. 

# Fabric Workload Business model
## What kind of trials can i offer?
You can choose how you want to strucutre the trial experience. If you want to provide a trial for an individual user or a whole tenant. You can also define If the trial is the same experience or has a limited functionallity. Keep in mind that the Trial is the first impression of your product for a customer and you want to optimize it to your customers expectations. 

## What buisness model should I choose for my SaaS offer?
This really depends on your offer. The Azuer Market Place provids different ways to monetize your offer (e.g. per user, per your own metric, flat fee, ...). In the end you want to optimize your business model to the needs of your customer. Further information can be found here:[SaaS Pricing Models](https://learn.microsoft.com/en-us/partner-center/marketplace/plan-saas-offer#saas-pricing-models)

## What can I do to support my existing customers in Fabric? 
You can choos if you want to offer the fabric capability to your customers as part of an existing license. For that you can provide a Bring your own license (BYOL) capability into your Extension.

## I don't have a Azuer Marketplace SaaS ofer where can i get started?
Further information can be found here: [Pnan a Saas offer for the commercial marketplace](https://learn.microsoft.com/en-us/partner-center/marketplace/plan-saas-offer)


# Fabric Workload Submission 
## Where should I submit my Workload?
-- This is a test -- 
## When should I resubmit my Fabric Workload?
## How long does it take until my Fabric Workload is certified and available in Fabric Marketplace?
## Is there any checklist to check before submitting to the Marketplace?
## Can I deploy multiple extension versions at the same time?
## How can I test my Workload?
## How can I share a preview version with my customer before submitting to Marketplace?
## Is there any default EULA and terms of use that I can use?
## Do I need to submit an Azure Marketplace SaaS offer before reaching out to the team?
## What should I do if I already have a SaaS offer? How can I link it to the Faberic Workload nuget package?



# Fabric development
## I want to develop my first extension. Where should I start from?
## How can I get help for any development questions?
## Why should I fill duplicated metadata data in the SaaS offer and the .nuget package?
## What is the source of truth for duplicated metadata? Where do you fetch the metadata from to present in the detailed page in Fabric Hub?
## Where do I create a SaaS offer?
## Do I need to submit a SaaS offer for my workload to show up in Fabric Hub?
## When should I re-submit SaaS offer in Partner center??
## Should I re-submit a SaaS offer in Partner center everytime I have a new .nugget package?
