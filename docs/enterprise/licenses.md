---
title: Microsoft Fabric concepts
description: Understand Microsoft Fabric concepts such as tenants, capacities and SKUs.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.custom: build-2023
ms.date: 08/03/2023
---

# Microsoft Fabric concepts and licenses

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft Fabric is a platform that allows users to get, create, share, and visualize data using various tools. To share content and collaborate in Microsoft Fabric, your organization needs to have an [capacity license](#capacity-license) and at least one [per-user license](#per-user-licenses).

Microsoft Fabric consists of tenants, capacities, and workspaces and can be organized in various ways according to your organizational needs. This illustration shows two different ways of deploying Fabric in an organization.

:::image type="content" source="media/licenses/tenants-capacities.png" alt-text="Illustration. Org A has one tenant with three capacities. Org B has two tenants, each with a few capacities. Every capacity has workspaces." lightbox="media/licenses/tenants-capacities.png":::

## Microsoft Fabric concepts

This section describes tenants, capacities, and workspaces, which are helpful in understanding a Fabric deployment

### Tenant

Microsoft Fabric is deployed to a tenant. Each tenant is tied to a specific Domain Name System (DNS) and additional domains can be added to it. If you don't already have a Microsoft Azure Active Directory tenant, you can either add your domain to an existing tenant or a tenant will be created when you acquire a free, trial or paid license for a Microsoft online service. Once you have your tenant, you can add capacities to it.

### Capacity

A Microsoft Fabric capacity resides on a tenant. Each capacity that sits under a specific tenant is a distinct pool of resources allocated to Microsoft Fabric. The size of the capacity determines the amount of computation power available. Before you purchase Microsoft Fabric, review the [capacity license](#capacity-license) section, to establish which capacity is right for your use case.

### Workspace

[Workspaces](../get-started/workspaces.md) reside within capacities and are used as containers for Microsoft Fabric items. Each Microsoft Fabric user has a personal workspace known as *My Workspace*. More workspaces can be created to enable collaboration. By default, workspaces are created in your tenant's shared capacity. When your tenant has other capacities, workspaces - including *My Workspaces* - can be assigned to any capacity in your tenant.

>[!NOTE]
>If you're using a Power BI Premium capacity, Microsoft Fabric items aren't supported. To enable support for Microsoft Fabric items on your Power BI capacity, [enable Microsoft Fabric](../admin/fabric-switch.md).

Workspaces can be created in (or assigned to) capacities that belong to a Microsoft Fabric [capacity license](#capacity-license). The workspace license mode dictates what kind of capacity the workspace can be hosted in and as a result the capabilities available.

| Workspace license mode<sup>*</sup> | User capabilities | Access | Supports Fabric<sup>**</sup> |
|--|--|--|--|
| [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) | Use basic Power BI features and collaborate on reports, dashboards, and scorecards. |To access a Pro workspace, you need a Pro per-user license. | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
| [Premium per-user](/power-bi/enterprise/service-premium-per-user-faq) (PPU) | Collaborate using most of the [Power BI Premium features](/power-bi/enterprise/service-premium-features), including paginated reports, dataflows, and datamarts. |To collaborate and share content you need a Premium per-user (PPU) license. | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
| [Premium capacity](/power-bi/enterprise/service-premium-what-is) (P SKUs)   | Create Power BI content. Share, collaborate on, and distribute Power BI content. | To create workspaces and share content you need a Pro or PPU license. To view content, you can use a Free license. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| [Embedded](/power-bi/developer/embedded/embedded-capacity#power-bi-embedded) (A SKUs) | Embed content in an Azure capacity. | To create workspaces and share content you need a Pro license. To view content, you can use a Free license. | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
| Fabric capacity (F SKUs) | Create, share, collaborate on, and distribute Fabric content. | To create workspaces and share content you need a Pro license. To view content, you can use a Free license. | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Trial | Try Fabric features and experiences for 60 days. | A Free license | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |

<sup>*</sup>Some of the workspace licenses mentioned in this table are legacy licenses inherited from Power BI.

<sup>**</sup>Items that don't support Fabric support Power BI items.

## Microsoft Fabric license types

Microsoft Fabric has capacity and per-user licenses. This section lists these licenses and explains what each license allows you to do.

### Capacity license

A capacity license provided the infrastructure for Microsoft Fabric. Without a capacity license, users can't work in Fabric. You capacity license allows you to:

* Use all the Microsoft Fabric features

* Create Microsoft Fabric items and connect to other Microsoft Fabric items

* Save your items to a workspace and share them with any Microsoft Fabric license holder

Capacity licenses, known as Premium licenses in Power BI, are split into Stock Keeping Units (SKUs). Each SKU provides a set of Fabric resources for your organizations. Your organization can have as many capacity licenses as needed.

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

### Per-user licenses

Per-user licenses allow users to work in Microsoft Fabric. There are three types of individual licenses:

* **Free** - A free license allows you to create and share Fabric content in Microsoft Fabric if you have access to a Fabric Capacity (either trial or paid).

* **Pro** - A [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) license lets you share content with other users. Every organization needs at least one [Pro license](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) if they intend to work with Fabric. If you're purchasing a Microsoft Fabric capacity license for your organization, ensure you purchase at least one Pro license too.

* **Premium per-user (PPU)** - Premium per-user, or PPU, is the entry level license for Power BI [Premium features](/power-bi/enterprise/service-premium-features). PPU uses a shared capacity across the organization, which provides the computing power for the Power BI operations. PPU licenses provide partial access to Microsoft Fabric. If you're using a PPU license, you'll only be able to access Power BI items in Microsoft Fabric.

This table lists the main differences between the capabilities of per-user licenses.

| Capabilities | Free | Pro | PPU |
|--|--|--|--|
| Access Microsoft Fabric web application | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
| Create Fabric capacity workspaces |:::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
| Create Power BI Premium workspaces |:::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/no-icon.svg" border="false"::: |
| Create Pro workspaces |:::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create Power BI items in workspaces other than their "My Workspace" | :::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| View Shared Power BI items in Pro workspaces or Fabric Capacity workspaces (where the Fabric Capacity SKU is less than a F64) and where they have a reader role | :::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/no-icon.svg" border="false"::: |
|View Shared Power BI items in Power BI Premium Per Capacity or Fabric Capacity workspaces (where the Fabric capacity SKU is greater than or equal to a F64) and where they have a reader role | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/no-icon.svg" border="false"::: |
| Create non-Power BI Fabric items in Fabric / Trial / Power BI Premium capacity workspaces | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/no-icon.svg" border="false"::: |
| Share non-Power BI Fabric items | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/no-icon.svg" border="false"::: |

## Next steps

[Buy a Microsoft Fabric subscription](buy-subscription.md)
