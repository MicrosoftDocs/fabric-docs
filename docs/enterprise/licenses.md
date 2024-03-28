---
title: Microsoft Fabric concepts
description: Understand Microsoft Fabric concepts such as tenants, capacities, and SKUs.
author: KesemSharabi
ms.author: mihart
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 03/24/2024
---

# Microsoft Fabric concepts and licenses

[Microsoft Fabric](../get-started/microsoft-fabric-overview.md) is a platform that allows users to get, create, share, and visualize data using an array of tools. To share content and collaborate in Microsoft Fabric, your organization needs to have an [F or P capacity license](#capacity-license), and at least one [per-user license](#per-user-licenses).

A Microsoft Fabric deployment can be organized in various ways according to your organizational needs. This illustration shows two different ways of deploying Fabric in an organization. Retail company A has a single Microsoft Entra tenant for the entire company. Retail company B has two Microsoft Entra tenants, which have complete separation between them, one for military products and another for commercial products. Both companies deployed Fabric capacities according to their geographical location.

:::image type="content" source="media/licenses/tenants-capacities.png" alt-text="Illustration. Org A has one tenant with three capacities. Org B has two tenants, each with a few capacities. Every capacity has workspaces." lightbox="media/licenses/tenants-capacities.png":::

## Microsoft Fabric concepts

This section describes tenants, capacities, and workspaces, which are helpful in understanding a Fabric deployment.

### Tenant

Microsoft Fabric is deployed to a [Microsoft Entra tenant](/microsoft-365/education/deploy/intro-azure-active-directory#what-is-an-azure-ad-tenant). Each tenant is tied to a specific Domain Name System (DNS) and other domains can be added to the tenant. If you don't already have a Microsoft Entra tenant, you can either add your domain to an existing tenant or a tenant is created for you when you acquire a free, trial, or paid license for a Microsoft online service. Once you have your tenant, you can add capacities to it. To create a tenant, see [Quickstart: Create a new tenant in Microsoft Entra ID](/entra/fundamentals/create-new-tenant).

### Capacity

A Microsoft Fabric capacity resides on a tenant. Each capacity that sits under a specific tenant is a distinct pool of resources allocated to Microsoft Fabric. The size of the capacity determines the amount of computation power available. Before you purchase Microsoft Fabric, review the [capacity license](#capacity-license) section, to establish which capacity is right for your use case.

### Workspace

[Workspaces](../get-started/workspaces.md) reside within capacities and are used as containers for Microsoft Fabric items. Each Microsoft Fabric user has a personal workspace known as *My Workspace*. More workspaces can be created to enable collaboration.  

Each Microsoft Entra tenant that has Fabric deployed to it, has a shared capacity that hosts all the *My Workspaces* and the workspaces with Pro or Premium Per User license mode. By default, workspaces are created in your tenant's shared capacity. When your tenant has other capacities, workspaces - including *My Workspaces* - can be assigned to any capacity in your tenant.

>[!NOTE]
>If you're using a [Power BI Premium](/power-bi/enterprise/service-premium-what-is) capacity, Microsoft Fabric items aren't enabled. To enable support for Microsoft Fabric items on your Power BI capacity, [enable Microsoft Fabric](../admin/fabric-switch.md).

Workspaces can be created in (or assigned to) Microsoft Fabric capacities. The workspace license mode dictates what kind of capacity the workspace can be hosted in and as a result the capabilities available.

| Workspace license mode | User capabilities | Access | Supported experiences |
|--|--|--|--|
| Pro | Use basic Power BI features and collaborate on reports, dashboards, and scorecards. |To access a workspace with a [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) license mode, you need a Power BI Pro, Premium Per-user (PPU) license, or a Power BI individual trial. | Power BI |
| [Premium per-user](/power-bi/enterprise/service-premium-per-user-faq) (PPU) | Collaborate using most of the [Power BI Premium features](/power-bi/enterprise/service-premium-features), including dataflows, and datamarts. |To access a Premium Per User (PPU) workspace you need a PPU license or a Power BI individual trial. | Power BI |
| [Premium per capacity](/power-bi/enterprise/service-premium-what-is) (P SKUs)   | Create Power BI content. Share, collaborate on, and distribute Power BI content. | To create workspaces and share content you need a Pro or PPU license. To view content, you need a Microsoft Fabric (Free) license with a viewer role on the workspace. If you have any other role on the workspace, you need a Pro or a PPU license, or a Power BI individual trial. | All Fabric experiences |
| [Embedded](/power-bi/developer/embedded/embedded-capacity#power-bi-embedded) (A SKUs) | Embed content in an Azure capacity. | To create workspaces and share content you need a Pro, Premium Per User (PPU) or a Power BI individual trial license. | Power BI |
| Fabric capacity (F SKUs) | Create, share, collaborate on, and distribute Fabric content. | To view Power BI content it must reside on an F64 or larger [SKU](#capacity-license), and you need to have a viewer role on the workspace. | All Fabric experiences |
| Trial | Try Fabric features and experiences for 60 days. | Microsoft Fabric (Free) license | All Fabric experiences |

## Microsoft Fabric license types

Microsoft Fabric has capacity licenses and per-user licenses. This section lists these licenses and explains what each license allows you to do.

### Capacity license

A capacity license provides the infrastructure for Microsoft Fabric. Your capacity license allows you to:

* Use all the Microsoft Fabric features licensed by capacity

* Create Microsoft Fabric items and connect to other Microsoft Fabric items

    >[!NOTE]
    >To create Power BI items in workspaces that are not *My workspace*, you need a *Pro* license.

* Save your items to a workspace and share them with a user that has an appropriate licensed

Capacity licenses are split into Stock Keeping Units (SKUs). Each SKU provides a set of Fabric resources for your organization. Your organization can have as many capacity licenses as needed.

A capacity is a dedicated set of resources reserved for exclusive use. It offers dependable, consistent performance for your content. Each capacity offers a selection of SKUs, and each SKU provides different resource tiers for memory and computing power. The type of SKU you require, depends on the type of solution you wish to deploy.

The capacity and SKUs table lists the Microsoft Fabric SKUs. Capacity Units (CU) are used to measure the compute power available for each SKU. For the benefit of customers that are familiar with Power BI, the table also includes Power BI Premium per capacity *P* SKUs and v-cores. Power BI Premium *P* SKUs support Microsoft Fabric. *A* and *EM* SKUs only support Power BI items.

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

<sup>*</sup>SKUs that are smaller than F64 require a Pro or Premium Per User (PPU) license, or a Power BI individual trial to consume Power BI content.

### Per user licenses

Per-user licenses allow users to work in Microsoft Fabric. There are three types of individual licenses:

* **Free** - A free license allows you to create and share Fabric content other than Power BI items in Microsoft Fabric, if you have access to a Fabric capacity (either trial or paid).

    >[!NOTE]
    >To create Power BI items in a workspace other than *My workspace* and share them, you need a Power BI Pro or a Premium Per-User (PPU) license, or a Power BI individual trial.

* **Pro** - A [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) license lets you share Power BI content with other users. Every organization needs at least one user with a [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) or a Premium Per User (PPU) license, if they intend to use Power BI within Fabric.

    SKUs smaller than F64 require a Power BI Pro or Premium Per User license for each user consuming Power BI content. Content in workspaces on F64 or larger Fabric capacities is available for users with a Free license if they have viewer role on the workspace.

* **Premium per-user (PPU)** - PPU licenses allow organizations to access Power BI [Premium features](/power-bi/enterprise/service-premium-features) by licensing every user with a PPU license instead of purchasing a Power BI Premium capacity. PPU can be more cost effective when Power BI Premium features are needed for fewer than 250 users. PPU uses a shared capacity across the organization, which provides the computing power for the Power BI operations. PPU licenses provide partial access to Microsoft Fabric. If you're using a PPU license, the only items that you can access in Fabric are the Power BI items.

This table lists the main differences between the capabilities of per-user licenses.

| Capabilities | Free | Pro | PPU |
|--|--|--|--|
| Access Microsoft Fabric web application | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create Fabric capacity workspaces |:::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create Power BI Premium workspaces |:::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create Pro workspaces |:::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create, update, delete or manage Power BI items in workspaces other than their "My Workspace" | :::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create PPU workspaces |:::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/no-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create non-Power BI Fabric items in Fabric / Trial capacity workspaces | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Create non-Power BI Fabric items in Power BI Premium capacity workspaces | :::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Share non-Power BI Fabric items | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/no-icon.svg" border="false"::: |
| View Power BI items in Pro workspaces or Fabric Capacity workspaces (where the Fabric Capacity SKU is less than a F64) | :::image type="icon" source="../media/no-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |
|View Power BI items in Power BI Premium Per Capacity or Fabric Capacity workspaces (where the Fabric capacity SKU is greater than or equal to a F64) | :::image type="icon" source="../media/yes-icon.svg" border="false"::: | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |:::image type="icon" source="../media/yes-icon.svg" border="false"::: |

## Related content

* [Buy a Microsoft Fabric subscription](buy-subscription.md)
