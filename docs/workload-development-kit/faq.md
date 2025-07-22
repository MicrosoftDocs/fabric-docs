---
title: FAQ for workload certification
description: Learn how to certify and publish a workload with the Microsoft Fabric Workload Development Kit.
author: tebercov
ms.author: tevbercov
ms.topic: how-to
ms.custom:
ms.date: 07/22/2025
---

# Frequently asked questions

This article contains frequently asked questions relating to the Microsoft Workload Development kit.

## General

### I have a question that isn't answered in this FAQ, where can I get help?

Post your question at [Microsoft-Fabric-workload-development-sample/discussions](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/discussions) 
or [Microsoft-Fabric-workload-development-sample/issues](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/issues) and the Fabric team can answer the question directly. 

## Fabric Workload Design

### What design language does Fabric use?

Fabric controls are aligned to the Fluent 2 design language. Visit the [Fabric UX System](https://aka.ms/fabricux)  page for more details.

### What are base (*.Base*) components?

Base components shouldn't be used in designs. They're meant only as a nested building block for the creation and management of component variants in the toolkit and aren't published via the library. Make sure you‘re not using any components prefixed with *.Base* (nested *.Base* components are fine).

### Where can I find examples of common page layouts in Fabric?

Specific screens in Fabric are collected in the Page examples file while more generic layout templates are available in this file under Page templates.

### What guidelines should I follow if, I want to use icons in my workloads?

Review the [Fabric UX System](https://aka.ms/fabricux) for further information on design guidelines.

## Fabric Workload Business model

### What kind of trials can I offer?

You can choose how you want to structure the trial experience. If you want to provide a trial for an individual user or a whole tenant. You can also define If the trial is the same experience or has a limited functionality. Keep in mind that the Trial is the first impression of your product for a customer and you want to optimize it to your customer's expectations. 

### What business model should I choose for my SaaS offer?

Azure Marketplace provides different ways to monetize your offer (for example, per user, per your own metric, flat fee, ...). In the end, you want to optimize your business model to the needs of your customer. Further information can be found at [SaaS Pricing Models](/partner-center/marketplace/plan-saas-offer#saas-pricing-models).

### What can I do to support my existing customers in Fabric? 

You can choose if you want to offer the fabric capability to your customers as part of an existing license. For that you can provide a Bring your own license (BYOL) capability into your workload.

### I don't have an Azure Marketplace SaaS offer. Where can I get started?

Further information can be found here: [Plan a Saas offer for the commercial marketplace](/partner-center/marketplace/plan-saas-offer).

### Is there a plan to certify these workloads?

We don't perform code certification as these workloads are embedded in Fabric, not hosted on it. Workloads are embedded in Fabric similarly to how apps are embedded in Microsoft Teams. We validate the workload publishers and request them to attest to specific areas, use the certification link from the [Workload detailed page](../fundamentals/fabric-home.md) to review the publisher attestations. Furthermore, all workloads are governed with a Microsoft Entra application, giving Tenant admins full control over who can consent to which applications or scopes, ensuring compliance with organizational Microsoft Entra governance. 

### Is the Partner Workload running on a Fabric Capacity?

No, the Partner Workloads can't charge the Fabric capacity directly. To purchase Partner Workloads, you need to follow Azure Marketplace offer located on the workload page. The capacity is only used as a restriction scope to where items can be created. Partner Workloads may create and run  Fabric items (for example: Lakehouse, Notebook) on behalf of the working user based on Microsoft Entra permissions.

### On which capacities can I assign the Partner Workload? 

Partner Workloads can be assigned on F & P Capacities. 

### How can I get leads for my published workload?

You can apply several approaches to generate and capture leads for your published workload:

- **Azure Marketplace lead management**: On Azure Marketplace page that is linked from your workload page, you can enable lead generation. The embedded video allows capturing views when the video is played or autoplayed.

- **YouTube video integration**: On your workload page, you can add a YouTube video, which provides analytics including view counts and engagement metrics that can help you understand user interest.

- **User token information**: When any user creates an item using your workload, a user token is always passed as part of the OAuth 2.0 On-Behalf-Of (OBO) authentication flow. You can apply the email, name, and organization information that is included in the Microsoft Entra token to identify and track users engaging with your workload.

- **Trial experience**: Design an effective trial experience that captures user interest and converts them into paying customers. For guidance on monetization patterns and trial strategies, see [Partner Monetization Patterns](https://fabricux-c6c9fchnggh3d5dn.b02.azurefd.net/?path=/docs/patterns-partner-monetization--docs).

Currently there's no direct integration with Partner Center leads when a workload is being added to a tenant, capacity, or workspace.

<!--
## Fabric Workload Submission 

### Where should I submit my Workload?

-- This is a test -- 
### When should I resubmit my Fabric Workload?
### How long does it take until my Fabric Workload is certified and available in Fabric Marketplace?
### Is there any checklist to check before submitting to the Marketplace?
### Can I deploy multiple workload versions at the same time?
### How can I test my Workload?
### How can I share a preview version with my customer before submitting to Marketplace?
### Is there any default EULA and terms of use that I can use?
### Do I need to submit an Azure Marketplace SaaS offer before reaching out to the team?
### What should I do if I already have a SaaS offer? How can I link it to the Faberic Workload nuget package?

## Fabric development
### I want to develop my first workload. Where should I start from?
### How can I get help for any development questions?
### Why should I fill duplicated metadata data in the SaaS offer and the .nuget package?
### What is the source of truth for duplicated metadata? Where do you fetch the metadata from to present in the detailed page in Fabric Hub?
### Where do I create a SaaS offer?
### Do I need to submit a SaaS offer for my workload to show up in Fabric Hub?
### When should I re-submit SaaS offer in Partner center??
### Should I re-submit a SaaS offer in Partner center everytime I have a new .nugget package?
-->
