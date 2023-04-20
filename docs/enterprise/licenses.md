---
title: Microsoft Fabric licenses
description: Understand how licenses in Microsoft Fabric work, and what are tenants, capacities and SKUs.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 03/01/2023
---

# Microsoft Fabric licenses

Microsoft Fabric is a platform that allows users to get, create, share and visualize data using various tools. To share content and collaborate in Microsoft Fabric, you're organization needs to have license which includes a capacity, and you need a [Pro license](/power-bi/enterprise/service-admin-purchasing-power-bi-pro). If you're purchasing a Microsoft Fabric license for your organization, ensure you purchase at least one Pro license for your organization.

A Microsoft Fabric subscription is made out of tenants, capacities and workspaces.

:::image type="content" source="media/licenses/tenants_capacities.png" alt-text="An illustration of two organizations. Retail company A has one organizational tenant with three capacities, marketing, sales and finance. Retail company B has two tenants, Marketing and sales and finance. The finance tenant has two capacities, procurement and human resources. The marketing and sales tenant has four capacities, Europe, Asia, Australia and America. ":::

## Tenant

A Microsoft Fabric subscription is made out of at least one *tenant*. Each tenant is tied to a specific domain. Usually, an organization will have one tenant. In such cases, the tenant is synonyms with the organization. Some companies may want to have several tenants, each with their own capacities.

## Capacities

A Microsoft Fabric capacity resides on a *tenant*. Each capacity that sits under a specific tenant is a distinct pool of resources allocated to Microsoft Fabric.   The examples below illustrate two possible configurations of tenants and capacities per organization.

Microsoft Fabric resides on a designated capacity. The size of the capacity determines the amount of computation power your organization gets. Before you purchase Microsoft Fabric, review the the [capacity and SKUs](#capacity-and-skus) section, to establish which capacity is right for your organization.

## Workspaces

Workspaces reside within capacities. Each Microsoft Fabric user has a personal workspace known as *My Workspace*. Additional workspaces known as *workspaces* can be created to enable collaboration. By default, workspaces, including personal workspaces, are created in the shared capacity. When you have a capacity, both *My Workspaces* and *workspaces* can be assigned to your capacity.

Capacity administrators automatically have their My workspaces assigned to Premium capacities.



## Microsoft Fabric license types

Microsoft Fabric has individual and organizational licenses, Free, Pro Premium Per User (PPU) and Premium which is the standard Microsoft Fabric license. The table below summarizes the differences between these licenses. You can find more information in [Power BI service licenses](../fundamentals/service-features-license-type.md#power-bi-service-licenses) and in the [Power BI pricing](https://powerbi.microsoft.com/en-au/pricing/) page. 

### Organizational licenses

Organizational licenses provide the infrastructure for Microsoft Fabric. Without an organizational license users can't work in Fabric. Premium Per User, or PPU, is the entry level organization license. PPU uses a shared set capacity across the organization, which provides the computing power for all the Fabric operations that take place in the organization. Capacity licenses, previously known as Premium, are split into Stock Keeping Units (SKUs). Each SKU provides a set of Fabric resources for your organizations. Your organization can have as many organizational licenses as needed.

| License | Description | Create | Share |
|---------|-------------|--------|-------|
| [**PPU**](/power-bi/enterprise/service-premium-per-user-faq) | Create Microsoft Fabric items and use many Microsoft Fabric features | Create Microsoft Fabric items and connect to Microsoft Fabric items created by other Pro and PPU users | You can share content with other PPU users, and consume content created by other Pro and PPU users |
| [**Capacity**](#capacity-and-skus) | Use all the Microsoft Fabric features | Create Microsoft Fabric items and connect to other Microsoft Fabric items | Save your items to a Premium workspace and share them with any Microsoft Fabric license holder |

### Individual licenses

Individual licenses allow users to work in Microsoft Fabric. Every organization needs at least one Pro license.

| Capabilities | Free | Pro |
|--|--|--|
| Access Microsoft Fabric | Yes | Yes |
| View content | Yes | No |
| Create Workspaces | Yes | Yes |
| Create items | Yes | No |
| Share items | Yes | No |
| Connect to items | Yes | No |

## Capacity and SKUs

[Capacity](capacity-and-skus.md) is a dedicated set of resources reserved for exclusive use. It offers dependable, consistent performance for your content. Each capacity offers a selection of SKUs, and each SKU provides different resource tiers for memory and computing power. The type of SKU you require, depends on the type of solution you wish to deploy.

Under F64 you need a Pro license to consume Power BI content

## Next steps

>[!div class="nextstepaction"]
>[Autoscale](autoscale.md)
