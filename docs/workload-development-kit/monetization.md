---
title: Fabric Workload Development Kit monetization
description: Learn about how you can monetize your workload in Microsoft Fabric by publishing your workload to the Fabric Workload Hub.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom:
ms.date: 05/21/2024
---

# Monetize your workload

With the Microsoft Fabric Workload Development Kit, you can develop Fabric workloads and publish them to the Fabric Workload Hub. Publishing your workload allows you to make it available to Fabric users, and monetize it.

## Workload hub

A user that searches for new functionality within Microsoft Fabric is likely to review the workload hub. In the workload hub, you can browse existing workloads. Each workload has an overview page that provides additional information about the workload and includes information such as workload description, publisher name, pricing, and terms and conditions.

When you create a workload, it's important to provide rich and accurate information about the workload to interest users browsing the workload hub. Users can start trials or purchase your workload directly from the workload page.

## Trials

We expect our partners to provide an out of the box trial experience for users within Fabric. Trials are a good way for users to get familiar with your offer and understand what the workload can do. Trials should be available immediately to customers without any deployment steps or communication with the workload provider. After the user added the workload to their tenant, they can immediately start working with the new items.

Trial experiences aren't directly bound to [Fabric Trials](../fundamentals/fabric-trial.md). Partners can decide on the type of trial they want to provide. Trials can be tenant, user, or metrics based. It's up to you to define the limits of the trial and enforce them within the workload's [backend](extensibility-back-end.md).

When you create a trial, make sure that the users are aware of their status at any given time.

## Workload purchasing

Monetization for Fabric workloads created by partners takes place in the [Azure Marketplace](/marketplace/azure-marketplace-overview). You can find a detailed guide on how to publish a workload in [publish workload flow](publish-workload-flow.md).

As a partner, you define the [listing type](/partner-center/marketplace/plan-saas-offer#listing-options) you want to provide. A popular listing type is *Contact me* as it allows you to support customers who want to buy your workload from the Azure Marketplace.

To sell the workload using [SaaS billing](/partner-center/marketplace/plan-saas-offer#saas-billing) and to learn how to list your workload in the marketplace, see [private offers](/marketplace/private-offers-in-azure-marketplace).

If you already have a marketplace offer and you don't want to monetize your workload separately, you can use your existing listing in the marketplace.

## Workload license status

It's up to you as a partner to communicate the updated license status to your [extension backend](extensibility-back-end.md). Depending on your offer, use one of these methods to show the license status.

* **Transactable offer** - Your [marketplace landing page](/partner-center/marketplace/azure-ad-transactable-saas-landing-page).

* **Your own license** - A special dialog as part of the item flow.

## Related content

* [Microsoft Fabric Workload Development Kit](development-kit-overview.md)
