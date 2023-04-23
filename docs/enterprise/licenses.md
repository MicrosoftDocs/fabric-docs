---
title: Microsoft Fabric licenses
description: Understand how licenses in Microsoft Fabric work, and what are tenants, capacities and SKUs.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 03/01/2023
---

# Microsoft Fabric licenses

Microsoft Fabric is a platform that allows users to get, create, share and visualize data using various tools. To share content and collaborate in Microsoft Fabric, your organization needs to have an [organizational license](#organizational-licenses) and at least one [individual license](#individual-licenses).

A Microsoft Fabric subscription is made out of tenants, capacities and workspaces and can be organized in various ways according to your organizational needs. This illustration provides two example subscriptions, each organized differently. Typically, companies organize their subscription in a model that resembles the *Retail company A* example.

:::image type="content" source="media/licenses/tenants_capacities.png" alt-text="An illustration of two organizations. Retail company A has one organizational tenant with three capacities, marketing, sales and finance. Retail company B has two tenants, Marketing and sales and finance. The finance tenant has two capacities, procurement and human resources. The marketing and sales tenant has four capacities, Europe, Asia, Australia and America. Each capacity has a few workspaces.":::

## Microsoft Fabric components

This section describes tenants, capacities and workspaces, which are the main building blocks of a Microsoft Fabric subscription.

### Tenant

The foundation of a Microsoft Fabric subscription is the tenant. Each tenant is tied to a specific domain. Your tenant is created when you buy a capacity, and once it's created, you can add to it more capacities. Usually, an organization has one tenant. In such cases, the tenant is synonyms with the organization. Some companies may want to have several tenants, each with their own capacities.

### Capacity

A Microsoft Fabric capacity resides on a tenant. Each capacity that sits under a specific tenant is a distinct pool of resources allocated to Microsoft Fabric. The size of the capacity determines the amount of computation power your organization gets. Before you purchase Microsoft Fabric, review the [capacity and SKUs](#capacity-and-skus) section, to establish which capacity is right for your organization.

### Workspace

[Workspaces](../get-started/workspaces.md) reside within capacities and are used as containers for Microsoft Fabric items. Each Microsoft Fabric user has a personal workspace known as *My Workspace*. More workspaces can be created to enable collaboration. By default, workspaces are created in your organization's shared capacity. When your organization has other capacities, workspaces including *My Workspaces* can be assigned to any capacity in your organization.

>[!NOTE]
>If you're using a Power BI shared capacity, Microsoft Fabric items aren't supported. To enable support for Microsoft Fabric items on your Power BI capacity, [enable Microsoft Fabric](../admin/admin-switch.md).

Workspaces can be created in (or assigned to) capacities that belong to a Microsoft Fabric [organizational license](#organizational-licenses), and in legacy Power BI capacities. Workspaces have different capabilities depending on the capacity they're created in, and the [individual license](#individual-licenses) of the user creating them.

| Individual license | Organizational license<sup>*</sup> | User capabilities |
|--|--|--|
| [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) | None. Created by a Pro user in the Power BI service without residing on a capacity. | Use basic Power BI features and collaborate on reports, dashboards, and scorecards. |
| Trial | Microsoft Fabric trial | Create Microsoft Fabric items and collaborate with others in the same Microsoft Fabric trial capacity. |
| [Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq) | Power BI PPU capacity | Create PPU workspaces and Power BI items. Collaborate using most of the [Power BI Premium features](/power-bi/enterprise/service-premium-features), including paginated reports, dataflows, and datamarts. |
| [Power BI Premium](/power-bi/enterprise/service-premium-what-is) | Power BI Microsoft 365 (P SKUs) | Create Power BI content. Share, collaborate on, and distribute Power BI and Microsoft Fabric content. To create workspaces and share content you need a Pro or PPU license. To view content, you can use a Free license. |
| [Power BI Embedded](https://azure.microsoft.com/services/power-bi-embedded/#overview) | Azure (A SKUs) | Independent Software Vendors (ISVs) and developers use Power BI Embedded to embed visuals and analytics in their applications. |
| Microsoft Fabric capacity | Microsoft Fabric | Create and share Microsoft Fabric content. To create content you can use a Free license, and to share content you need a Pro license. |

<sup>*</sup>Some of the organizational licenses mentioned in this table are legacy licenses inherited from Power BI.

## Microsoft Fabric license types

Microsoft Fabric has individual and organizational licenses. This section lists these licenses and explains what each license allows you to do.

### Organizational licenses

Organizational licenses provide the infrastructure for Microsoft Fabric. Without an organizational license, users can't work in Fabric. There are two types of organizational licenses:

* **Premium Per user (PPU)** - Premium Per User, or PPU, is the entry level organization license. PPU uses a shared capacity across the organization, which provides the computing power for all the Fabric operations that take place in the organization. PPU licenses provide partial access to Microsoft Fabric. If you're using a PPU license, you'll only be able to access Power BI items in Microsoft Fabric.

* **Capacity** - Capacity licenses, known as Premium licenses in Power BI, are split into Stock Keeping Units (SKUs). Each SKU provides a set of Fabric resources for your organizations. Your organization can have as many organizational licenses as needed.

| License | Description | Create | Share |
|---------|-------------|--------|-------|
| [**PPU**](/power-bi/enterprise/service-premium-per-user-faq) | Create Power BI items and use many Power BI [Premium features](/power-bi/enterprise/service-premium-features) | Create Power BI items and connect to Power BI items created by other Pro and PPU users | You can share Power BI content with other PPU users, and consume Power BI content created by other Pro and PPU users |
| [**Capacity**](#capacity-and-skus) | Use all the Microsoft Fabric features | Create Microsoft Fabric items and connect to other Microsoft Fabric items | Save your items to a workspace and share them with any Microsoft Fabric license holder |

### Capacity and SKUs

Capacity is a dedicated set of resources reserved for exclusive use. It offers dependable, consistent performance for your content. Each capacity offers a selection of SKUs, and each SKU provides different resource tiers for memory and computing power. The type of SKU you require, depends on the type of solution you wish to deploy.

The capacity and SKUs table lists the Microsoft Fabric SKUs. Capacity Units (CU) are used to measure the compute power available for each SKU. For the benefit of customers that are familiar with Power BI, the table also includes the equivalent Power BI SKUs and v-cores.

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

* **Free** - A free license allows you to create Power BI content in Microsoft Fabric.

* **Pro** - A [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) license lets you share content with other users. Every organization needs at least one [Pro license](/power-bi/enterprise/service-admin-purchasing-power-bi-pro). If you're purchasing a Microsoft Fabric license for your organization, ensure you purchase at least one Pro license for your organization.

This table lists the main differences between the capabilities of the individual licenses.

| Capabilities | Free | Pro |
|--|--|--|
| Access Microsoft Fabric | :::image type="content" source="../media/yes.png" alt-text="Yes."::: | :::image type="content" source="../media/yes.png" alt-text="Yes."::: |
| View content | :::image type="content" source="../media/no.png" alt-text="No."::: | :::image type="content" source="../media/yes.png" alt-text="Yes."::: |
| Create Workspaces | :::image type="content" source="../media/yes.png" alt-text="Yes."::: | :::image type="content" source="../media/yes.png" alt-text="Yes."::: |
| Create items | :::image type="content" source="../media/no.png" alt-text="No."::: | :::image type="content" source="../media/yes.png" alt-text="Yes."::: |
| Share items | :::image type="content" source="../media/No.png" alt-text="No."::: | :::image type="content" source="../media/yes.png" alt-text="Yes."::: |
| Connect to items | :::image type="content" source="../media/no.png" alt-text="No."::: | :::image type="content" source="../media/yes.png" alt-text="Yes."::: |

## Next steps

[Buy a Microsoft Fabric license](licenses-buy.md)
