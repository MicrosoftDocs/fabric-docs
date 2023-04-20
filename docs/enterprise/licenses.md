---
title: Microsoft Fabric licenses
description: Understand how licenses in Microsoft Fabric work, and what are tenants, capacities and SKUs.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 03/01/2023
---

# Microsoft Fabric licenses

Microsoft Fabric is a platform that allows users to get, create, share and visualize data using various tools. To share content and collaborate in Microsoft Fabric, you're organization needs to have an [organizational license](#organizational-licenses) and at least one [individual license](#individual-licenses).

A Microsoft Fabric subscription is made out of tenants, capacities and workspaces.

* **Tenant** - The foundation of a Microsoft Fabric subscription is the tenant. Each tenant is tied to a specific domain. Usually, an organization will have one tenant. In such cases, the tenant is synonyms with the organization. Some companies may want to have several tenants, each with their own capacities.

* **Capacity** - A Microsoft Fabric capacity resides on a tenant. Each capacity that sits under a specific tenant is a distinct pool of resources allocated to Microsoft Fabric. The size of the capacity determines the amount of computation power your organization gets. Before you purchase Microsoft Fabric, review the the [capacity and SKUs](#capacity-and-skus) section, to establish which capacity is right for your organization.

* **Workspace** - [Workspaces](../get-started/workspaces.md) reside within capacities. Each Microsoft Fabric user has a personal workspace known as *My Workspace*. Additional workspaces can be created to enable collaboration. By default, workspaces are created in the shared capacity. When you have a capacity, both *My Workspaces* and *workspaces* can be assigned to your capacity.

The illustration below shows two possible configurations of tenants and capacities per organization.

:::image type="content" source="media/licenses/tenants_capacities.png" alt-text="An illustration of two organizations. Retail company A has one organizational tenant with three capacities, marketing, sales and finance. Retail company B has two tenants, Marketing and sales and finance. The finance tenant has two capacities, procurement and human resources. The marketing and sales tenant has four capacities, Europe, Asia, Australia and America. Each capacity has a few workspaces.":::

## Microsoft Fabric license types

Microsoft Fabric has individual and organizational licenses. This section lists these licenses and explains what each license allows you to do.

### Organizational licenses

Organizational licenses provide the infrastructure for Microsoft Fabric. Without an organizational license users can't work in Fabric. There are two types of organizational licenses:

* **Premium Per user (PPU)** - Premium Per User, or PPU, is the entry level organization license. PPU uses a shared set capacity across the organization, which provides the computing power for all the Fabric operations that take place in the organization. PPU licenses provide partial access to Microsoft Fabric. If your using a PPU license, you'll only be able to access Power BI items in Microsoft Fabric.

* **Capacity** - Capacity licenses, previously known as Premium, are split into Stock Keeping Units (SKUs). Each SKU provides a set of Fabric resources for your organizations. Your organization can have as many organizational licenses as needed.

The table below lists the main differences between the two licenses.

| License | Description | Create | Share |
|---------|-------------|--------|-------|
| [**PPU**](/power-bi/enterprise/service-premium-per-user-faq) | Create Power BI items and use many Power BI features | Create Power BI items and connect to Power BI items created by other Pro and PPU users | You can share Power BI content with other PPU users, and consume Power BI content created by other Pro and PPU users |
| [**Capacity**](#capacity-and-skus) | Use all the Microsoft Fabric features | Create Microsoft Fabric items and connect to other Microsoft Fabric items | Save your items to a workspace and share them with any Microsoft Fabric license holder |

### Capacity and SKUs

Capacity is a dedicated set of resources reserved for exclusive use. It offers dependable, consistent performance for your content. Each capacity offers a selection of SKUs, and each SKU provides different resource tiers for memory and computing power. The type of SKU you require, depends on the type of solution you wish to deploy.

The table below lists the Microsoft Fabric SKUs. Here's a short explanation for each column:

* **SKU** - The name of the Microsoft Fabric SKU.

* **Capacity units (CU)** - CUs are used to measure the compute power available for each SKU.

* **Power BI SKUs** - Equivalent [Power BI SKUs](/power-bi/enterprise/service-premium-what-is#capacities-and-skus). If no SKU is listed, there isn't an equivalent Power BI SKU.

* **Power BI v-cores** - Equivalent Power BI v-cores.  

* **Recommended usage** - Lists the Microsoft recommended use for each SKU.

| SKU<sup>*</sup> | Capacity Units (CU) | Power BI SKU | Power BI v-cores | Recommended use |
|--|--|--|--|--|
| F2 | 2 | - | 0.25 |  |
| F4 | 4 | - | 0.5 |  |
| F8 | 8 | EM/A1 | 1 |  |
| F16 | 16 | EM2/A2 | 2 |  |
| F32 | 32 | EM3/A3 | 4 |  |
| F64 | 64 | P1/A4 | 8 |  |
| F128 | 128 | P2/A5 | 16 |  |
| F256 | 256 | P3/A6 | 32 |  |
| F512 | 512 | P4/A7 | 64 |  |
| F1024 | 1024 | P5/A8 | 128 |  |
| F2048 | 2048 | - | 256 |  |

<sup>*</sup>SKUs that are smaller than F64 require a Pro license to consume Power BI content.

### Individual licenses

Individual licenses allow users to work in Microsoft Fabric. There are two types of individual licenses:

* **Free** - A free license allows you to create 

* **Pro** - 


Every organization needs at least one [Pro license](/power-bi/enterprise/service-admin-purchasing-power-bi-pro). If you're purchasing a Microsoft Fabric license for your organization, ensure you purchase at least one Pro license for your organization.


| Capabilities | Free | Pro |
|--|--|--|
| Access Microsoft Fabric | Yes | Yes |
| View content | Yes | No |
| Create Workspaces | Yes | Yes |
| Create items | Yes | No |
| Share items | Yes | No |
| Connect to items | Yes | No |

## Next steps

>[!div class="nextstepaction"]
>[Autoscale](autoscale.md)
