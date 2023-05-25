---
title: Microsoft Fabric licenses
description: Understand how licenses in Microsoft Fabric work, and what are tenants, capacities and SKUs.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.custom: build-2023
ms.date: 05/24/2023
---

# Microsoft Fabric licenses

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft Fabric is a platform that allows users to get, create, share and visualize data using various tools. To share content and collaborate in Microsoft Fabric, your organization needs to have an [organizational license](#organizational-licenses) and at least one [individual license](#individual-licenses).

A Microsoft Fabric subscription is made out of tenants, capacities and workspaces and can be organized in various ways according to your organizational needs. This illustration provides two example subscriptions, each organized differently. Typically, companies organize their subscription in a model that resembles the *Retail company A* example.

:::image type="content" source="media/licenses/tenants-capacities.png" alt-text="Illustration. Org A has one tenant with three capacities. Org B has two tenants, each with a few capacities. Every capacity has workspaces." lightbox="media/licenses/tenants-capacities.png":::

## Microsoft Fabric components

This section describes tenants, capacities and workspaces, which are the main building blocks of a Microsoft Fabric subscription.

### Tenant

The foundation of a Microsoft Fabric subscription is the tenant. Each tenant is tied to a specific domain. Your tenant is created when you buy a capacity, and once it's created, you can add to it more capacities. Usually, an organization has one tenant. In such cases, the tenant is synonyms with the organization. Some companies may want to have several tenants, each with their own capacities.

### Capacity

A Microsoft Fabric capacity resides on a tenant. Each capacity that sits under a specific tenant is a distinct pool of resources allocated to Microsoft Fabric. The size of the capacity determines the amount of computation power your organization gets. Before you purchase Microsoft Fabric, review the [capacity and SKUs](#capacity-and-skus) section, to establish which capacity is right for your organization.

### Workspace

[Workspaces](../get-started/workspaces.md) reside within capacities and are used as containers for Microsoft Fabric items. Each Microsoft Fabric user has a personal workspace known as *My Workspace*. More workspaces can be created to enable collaboration. By default, workspaces are created in your organization's shared capacity. When your organization has other capacities, workspaces including *My Workspaces* can be assigned to any capacity in your organization.

>[!NOTE]
>If you're using a Power BI shared capacity, Microsoft Fabric items aren't supported. To enable support for Microsoft Fabric items on your Power BI capacity, [enable Microsoft Fabric](../admin/fabric-switch.md).

Workspaces can be created in (or assigned to) capacities that belong to a Microsoft Fabric [organizational license](#organizational-licenses), and in legacy Power BI capacities. Workspaces have different capabilities depending on the capacity they're created in.

| Capacity license<sup>*</sup> | User capabilities | Supports Fabric |
|--|--|--|
| Shared Capacity. Created by a [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro)  user in the Power BI service without residing on a capacity. | Use basic Power BI features and collaborate on reports, dashboards, and scorecards. | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
| Microsoft Fabric trial | Create Microsoft Fabric items and collaborate with others in the same Microsoft Fabric trial capacity. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
 | Shared Capacity. Created by a Power BI [Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq) user | Create PPU workspaces and Power BI items. Collaborate using most of the [Power BI Premium features](/power-bi/enterprise/service-premium-features), including paginated reports, dataflows, and datamarts. | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
 | [Power BI Premium Per Capacity](/power-bi/enterprise/service-premium-what-is) (P SKUs) | Create Power BI content. Share, collaborate on, and distribute Power BI and Microsoft Fabric content. To create workspaces and share content you need a Pro or PPU license. To view content, you can use a Free license. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
 | [Power BI Embedded Capacity](https://azure.microsoft.com/services/power-bi-embedded/#overview) Azure (A SKUs) | Independent Software Vendors (ISVs) and developers use Power BI Embedded to embed visuals and analytics in their applications. | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
| Microsoft Fabric Capacity (F SKUs)| Create and share Microsoft Fabric content. To create content you can use a Free license, and to share content you need a Pro license. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |

<sup>*</sup>Some of the organizational licenses mentioned in this table are legacy licenses inherited from Power BI.

## Microsoft Fabric license types

Microsoft Fabric has individual and organizational licenses. This section lists these licenses and explains what each license allows you to do.

### Organizational licenses

Organizational licenses provide the infrastructure for Microsoft Fabric. Without an organizational license, users can't work in Fabric. There are two types of organizational licenses:

* **Premium Per user (PPU)** - Premium Per User, or PPU, is the entry level organization license. PPU uses a shared capacity across the organization, which provides the computing power for the Power BI operations that take place in the organization. PPU licenses provide partial access to Microsoft Fabric. If you're using a PPU license, you'll only be able to access Power BI items in Microsoft Fabric.

* **Capacity** - Capacity licenses, known as Premium licenses in Power BI, are split into Stock Keeping Units (SKUs). Each SKU provides a set of Fabric resources for your organizations. Your organization can have as many organizational licenses as needed.

| License | Description | Create | Share |
|---------|-------------|--------|-------|
| [PPU](/power-bi/enterprise/service-premium-per-user-faq) | Create Power BI items and use many Power BI [Premium features](/power-bi/enterprise/service-premium-features) | Create Power BI items and connect to Power BI items created by other Pro and PPU users | You can share Power BI content with other PPU users, and consume Power BI content created by other Pro and PPU users |
| [Capacity](#capacity-and-skus) | Use all the Microsoft Fabric features | Create Microsoft Fabric items and connect to other Microsoft Fabric items | Save your items to a workspace and share them with any Microsoft Fabric license holder |

### Capacity and SKUs

Capacity is a dedicated set of resources reserved for exclusive use. It offers dependable, consistent performance for your content. Each capacity offers a selection of SKUs, and each SKU provides different resource tiers for memory and computing power. The type of SKU you require, depends on the type of solution you wish to deploy.

The capacity and SKUs table lists the Microsoft Fabric SKUs. Capacity Units (CU) are used to measure the compute power available for each SKU. For the benefit of customers that are familiar with Power BI, the table also includes the equivalent Power BI SKUs and v-cores. Power BI Premium *P* SKUs support Microsoft Fabric. *A* and *EM* SKUs don't support Microsoft Fabric.

| SKU<sup>*</sup> | Capacity Units (CU) | Power BI SKU | Power BI v-cores |
|--|--|--|--|
| F2 | 2 | - | 0.25 |
| F4 | 4 | - | 0.5 |
| F8 | 8 | EM/A1 | 1 |
| F16 | 16 | EM2/A2 | 2 |
| F32 | 32 | EM3/A3 | 4 |
| F64 | 64 | P1/A4 | 8 |
| F128 | 128 | P2/A5 | 16 |
| F256 | 256 | P3/A6 | 32 |
| F512 | 512 | P4/A7 | 64 |
| F1024 | 1024 | P5/A8 | 128 |
| F2048 | 2048 | - | 256 |

<sup>*</sup>SKUs that are smaller than F64 require a Pro license to consume Power BI content.

### Individual licenses

Individual licenses allow users to work in Microsoft Fabric. There are two types of individual licenses:

* **Free** - A free license allows you to create and share Fabric content in Microsoft Fabric if you have access to a Fabric Capacity (either trial or paid).

* **Pro** - A [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) license lets you share Power BI content with other users. Every organization needs at least one [Pro license](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) if they intend to work with Power BI. If you're purchasing a Microsoft Fabric license for your organization, ensure you purchase at least one Pro license for your organization.

This table lists the main differences between the capabilities of the individual licenses.

| Capabilities | Free | Pro |
|--|--|--|
| Access Microsoft Fabric web application | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create Fabric capacity workspaces |:::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create Pro and Power BI Premium workspaces |:::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create Power BI items in workspaces other than their "My Workspace" | :::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Share Power BI items | :::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| View Shared Power BI content in Pro workspaces or Fabric Capacity workspaces (where the Fabric Capacity SKU is less than a F64) and where they have a reader role | :::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
|View Shared Power BI content in Power BI Premium Per Capacity or Fabric Capacity workspaces (where the Fabric capacity SKU is greater than or equal to a F64) and where they have a reader role | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create non-Power BI Fabric items in Fabric / Trial / Power BI Premium capacity workspaces | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Share non-Power BI Fabric items | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |

## Next steps

[Buy a Microsoft Fabric subscription](buy-subscription.md)
