---
title: Fabric extensibility monetization
description: Learn about how you can monetize your workload in Fabric.
author: gesaur
ms.author: gesaur
ms.reviewer: gesaur
ms.topic: how-to
ms.custom:
ms.date: 05/06/2024
---


# Overview

Within this chapter we are providing an overivew how partners can monetize their workload within the Fabric platform. Monetization does not only include the purchasing of a concrete Workload. Within Fabric there are different pesonas that need to work togtehter to get access to a new workload within an organization. This already shows that it is a journey for our customers that they need to be guided through.


## Workload hub

The journey of a user that searches for new functionallity within Fabric starts in the workload hub. There they can brows existing as well as new workloads they are interested in. Here each workload has an overview page that provides users with additional information about the workload (e.g. description, publisher name, pricing and terms and conditions.)

For workload provides it is important to provide rich and accurate information about the workload they are providing to users. As a first step users can start trials and the purchasing process right out of the workload page. 

## Trials

We expect our partners to provide an out of the box trial experience for users within Fabric. Users are expecting this to get familar with the offer and understand what the workload they are trying can do. This Trial is available immediately to customers and does not need any addtional deployment steps or communication with the workload provider. After the user has added the workload to their tenant or capcity they can immediately start working with the new items. 
Trial experiences are not directly bound to [Fabric Trials](../get-started/fabric-trial.md). Partners can decide on the type of trial they want to provide to their users. Those trials can be tenant, user or metrics based. It is up to the partner to define the limits of a trial and also enforce them within their [backend](./extensibility-backend.md).

One requirement for trials is that users are always aware of their current status. Further information on design guidelines can be found [here](./monetization.md#UX guidelines)

## Workload purchasing 

Monetization for Fabric workloads that partners are building happens over the Azuer Marketplace. Within the [publish workload](./publish-workload.md) flow you can find a in-dept documentation how you can publish a new workload as a [SaaS Offer](https://learn.microsoft.com/en-us/marketplace/purchase-saas-offer-in-azure-portal) in the portal. This is the basis for customers to start the purchasing flow. Further information on the Azure Markeptlace can be found [here](https://learn.microsoft.com/en-us/marketplace/azure-marketplace-overview). 

Within the Marketplace it is up to the partner to define the [listing type](https://learn.microsoft.com/en-us/partner-center/marketplace/plan-saas-offer#listing-options) they want to provide. Most of our partners are deciding on a Contact me listing as users need to have certain righs to purchase within the Azuer Markeplace. 

Some partners want to leverage the capability to Sell the workload through Microsoft. To get more information on how tis could work take a closer look to [SaaS billing](https://learn.microsoft.com/en-us/partner-center/marketplace/plan-saas-offer#saas-billing) and how you can list [private offers](https://learn.microsoft.com/en-us/marketplace/private-offers-in-azure-marketplace) in the marketplace.  

If you already have a Markeplace offer and you don't want to monitize the workload seperately, you can also leverage your existing listing in the Markeplace. 
Typically only certain groups within a customer are allowed to purchase components in the Azuer Marketplace. This is the reason why a contact me 


## Workload activation 

Because there are several ways how workloads can be purchased it's up to the partner to communicate the updated license status to their [extension backend](./extensibility-backend.md). This can be done over the Partner l[anding page](https://learn.microsoft.com/en-us/partner-center/marketplace/azure-ad-transactable-saas-landing-page) in the case of a transactable offer, or leveraging a special dialog as part of the item flow in case of Bring your own license. Futher information on how to structure such experiences within the [extensibility frontend](./extensibility-frontend.md) can be found in the chapter [UX guidelines](./monetization.md#UX guidelines)


# UX guidelines

You can find addtional informaton on the UX guidelines in the Figma files located here: @@@


