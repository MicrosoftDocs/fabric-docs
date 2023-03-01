---
title: Microsoft Fabric licenses
description: Understand how licenses in Microsoft Fabric work, and what are tenants, capacities and SKUs.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 03/01/2023
---

# Microsoft Fabric licenses

Microsoft Fabric is a platform that allows users to create and share Microsoft Fabric items such as **??xxx??**, **??yyy??**, **??zzz??**, and more. Microsoft Fabric users can collaborate with each other to create new content and consume shared content. To share content and collaborate, users need a [Pro license](tbd). If you're purchasing a Microsoft Fabric license, ensure you purchase at least one Power BI Pro license for your organization.

Microsoft Fabric resides on a designated capacity. The size of the capacity determines the amount of computation power your organization gets. Before you purchase Microsoft Fabric, review the the [capacity and SKUs](#capacity-and-skus) section, to establish which capacity is right for your organization.

A Microsoft Fabric capacity resides on a *tenant*. Each capacity that sits under a specific tenant is a distinct pool of resources allocated to Microsoft Fabric. Usually, an organization will have one tenant. In such cases, the tenant is synonyms with the organization. Some companies may want to have several tenants, each with their own capacities. The examples below illustrate two possible configurations of tenants and capacities per organization.

:::row:::
   :::column span="":::

**Example 1 - Retail company A**

One tenant and three capacities:

* Organizational tenant

    * Marketing capacity

    * Sales capacity

    * Finance capacity

   :::column-end:::
   :::column span="":::

**Example 2 - Retail company B**

Two tenants and six capacities:

* Marketing and sales tenant

    * Asia capacity

    * Europe Capacity

    * America capacity

    * Australia capacity

* Finance tenant

    * procurement capacity

    * Human resources capacity

   :::column-end:::
:::row-end:::

## Microsoft Fabric license types

Microsoft Fabric has four types of licenses, Free, Pro Premium Per User (PPU) and Premium which is the standard Microsoft Fabric license. The table below summarizes the differences between these licenses. You can find more information in [Power BI service licenses](../fundamentals/service-features-license-type.md#power-bi-service-licenses) and in the [Power BI pricing](https://powerbi.microsoft.com/en-au/pricing/) page.

| License | Description | Create | Share<sup>*</sup> |
|---------|-------------|--------|-------|
| **Free**    | Create reports and dashboards | Create reports and dashboards in Microsoft Fabric | No |
| [**Pro**](tbd) | Use to collaborate with other Pro license users | Create Microsoft Fabric items and connect to Microsoft Fabric items created by other Pro users | You can publish your content, and share and consume content created by other Pro users |
| [**PPU**](tbd) | Create Microsoft Fabric items and use many Microsoft Fabric features | Create Microsoft Fabric items and connect to Microsoft Fabric items created by other Pro and PPU users | You can share content with other PPU users, and consume content created by other Pro and PPU users |
| [**Premium**](tbd) | Use all the Microsoft Fabric features | Create Microsoft Fabric items and connect to other Microsoft Fabric items | Save your items to a Premium workspace and share them with any Microsoft Fabric license holder |

<sup>*</sup> Any license holder can share content if it's saved to a Premium workspace.  

## Capacity and SKUs

[Capacity](capacity-and-skus.md) is a dedicated set of resources reserved for exclusive use. It offers dependable, consistent performance for your content. Each capacity offers a selection of SKUs, and each SKU provides different resource tiers for memory and computing power. The type of SKU you require, depends on the type of solution you wish to deploy.

## Workspaces

Workspaces reside within capacities. Each Microsoft Fabric user has a personal workspace known as *My Workspace*. Additional workspaces known as *workspaces* can be created to enable collaboration. By default, workspaces, including personal workspaces, are created in the shared capacity. When you have a capacity, both *My Workspaces* and *workspaces* can be assigned to your capacity.

Capacity administrators automatically have their My workspaces assigned to Premium capacities.

## Next steps

>[!div class="nextstepaction"]
>[Autoscale](autoscale.md)
