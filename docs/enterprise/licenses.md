---
title: Understand Microsoft Fabric Licenses
description: Explore Microsoft Fabric licenses, tenants, capacities, and SKUs to plan deployment and collaboration. Learn key scenarios and choose the right option.
author: JulCsc
ms.author: juliacawthra
ms.topic: concept-article
ms.custom:
ms.date: 01/30/2026
ai-usage: ai-assisted
---

# Understand Microsoft Fabric licenses

Microsoft Fabric licenses and capacities determine how users create, share, and view items across your organization. To collaborate, you need an [F or P capacity](#capacity) and at least one [per-user license](#per-user-licenses). This article explains tenants, capacities, workspaces, license modes, and scenarios so you can plan a scalable deployment.

The following diagram illustrates two common ways organizations can structure their Microsoft Fabric deployment using tenants and capacities. For example, a company can use a single Microsoft Entra tenant for all business units, or separate tenants for different divisions or compliance needs. Each tenant can have one or more Fabric capacities, often aligned to geographic or business requirements.

:::image type="content" source="media/licenses/tenants-capacities.png" alt-text="Screenshot of two organizational deployment examples: Org A with one tenant and three capacities; Org B with two tenants each containing several capacities and workspaces." lightbox="media/licenses/tenants-capacities.png":::

<a id="microsoft-fabric-concepts"></a>

## Core building blocks

This section describes tenants, capacities, and workspaces, which are helpful in understanding a Fabric deployment.

### Tenant

Microsoft Fabric runs in a Microsoft Entra tenant. A tenant is associated with one primary DNS domain, and you can add additional custom domains to it. If you don’t already have a tenant, one is created automatically when you acquire a free, trial, or paid Microsoft online service license, or you can add your domain to an existing tenant. After the tenant exists, add one or more Fabric capacities to support workloads. To create a tenant manually, see [Quickstart: Create a new tenant in Microsoft Entra ID](/entra/fundamentals/create-new-tenant).

### Capacity

A Microsoft Fabric capacity resides in a tenant. Each capacity in a tenant is a distinct resource pool for Microsoft Fabric. The size of the capacity determines the amount of computation power available.

Your capacity lets you:

- Use all Microsoft Fabric features licensed by capacity
- Create Microsoft Fabric items and connect to other Microsoft Fabric items

    > [!NOTE]
    > To create Power BI items in workspaces that aren't *My workspace*, you need a *Pro* license.

- Save your items to a workspace and share them with a user that has an appropriate license

Capacities use stock-keeping units (SKUs). Each SKU provides Fabric resources for your organization. Your organization can have as many capacities as needed.

The table lists the Microsoft Fabric SKUs. Capacity units (CUs) measure the compute power for each SKU. For customers familiar with Power BI, the table also lists Power BI Premium per capacity *P* SKUs and virtual cores (v-cores). Power BI Premium *P* SKUs support Microsoft Fabric. *A* and *EM* SKUs only support Power BI items. This table is provided as a reference for comparing compute capacity and should not be interpreted as functional or licensing equivalence.

| SKU | Capacity Units (CUs) | Power BI SKU | Power BI v-cores |
|--|--|--|--|
| F2 | 2 | - | 0.25 |
| F4 | 4 | - | 0.5 |
| F8 | 8 | EM/A1 | 1 |
| F16 | 16 | EM2/A2 | 2 |
| F32 | 32 | EM3/A3 | 4 |
| F64 | 64 | P1/A4 | 8 |
| Trial | 64 | - | 8 |
| F128 | 128 | P2/A5 | 16 |
| F256 | 256 | P3/A6 | 32 |
| F512 | 512 | P4/A7 | 64 |
| F1024 | 1024 | P5/A8 | 128 |
| F2048 | 2048 | - | 256 |

<a id="embedded-scenarios"></a>

#### Power BI embedding scenarios

| Scenario | Required capacity or SKU | User license requirement | Notes |
|---|---|---|---|
| Embed for your organization (Microsoft Entra users) | F (any), P, or A/EM | Depends on SKU & size (see [licensing rules](#capacity)) | F64+ or P capacities support viewing by users with a Microsoft Fabric free license. |
| App owns data (external users) | F(any), A/EM or P SKUs | End users unlicensed | Service principal handles authentication. |

In "Embed for your organization" and embedding in Microsoft 365 apps (SharePoint Online, PowerPoint), F SKUs smaller than F64 and all A SKUs require each consuming user to have a Pro, Premium Per User (PPU), or individual trial license to view Power BI content.

### Workspace

[Workspaces](../fundamentals/workspaces.md) reside within capacities and are used as containers for Microsoft Fabric items. Each Microsoft Fabric user has a personal workspace known as *My Workspace*. Create more workspaces to enable collaboration.  

Each Microsoft Entra tenant with Fabric has a shared capacity that hosts all *My Workspaces* and workspaces using the Power BI Pro or Power BI Premium Per-User(PPU) workspace types. By default, workspaces are created in your tenant's shared capacity. When your tenant has other capacities, assign any workspace—including *My Workspaces*—to any capacity in the tenant.

> [!NOTE]
> If you're using a [Power BI Premium](/power-bi/enterprise/service-premium-what-is) capacity, Microsoft Fabric items aren't enabled. To enable support for Microsoft Fabric items on your Power BI capacity, [enable Microsoft Fabric](../admin/fabric-switch.md).

## Workspace types

Workspaces can be created in (or assigned to) Microsoft Fabric capacities. The workspace type dictates which underlying capacity type (Fabric F SKU, Power BI Premium per capacity P SKU, shared/PPU shared pool, or Pro/Free shared) the workspace can use. A Power BI Premium Per User (PPU) workspace type isn't a Fabric capacity; it uses a shared Premium feature pool and doesn't itself enable Fabric (non–Power BI) item creation unless an F capacity also exists.

> [!NOTE]
> License mode is now called workspace type. This is a terminology change only; functionality remains the same.

The workspace type determines user capabilities. Workspace types are organized into two categories:

### Power BI workspace types

These workspace types are optimized for Power BI workloads:

| Workspace type | User capabilities | Access | Supported experiences |
|--|--|--|--|
| Power BI Pro | Use basic Power BI features and collaborate on reports, dashboards, and scorecards. |To access a workspace with a [Power BI Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) workspace type, you need a Power BI Pro, Power BI Premium Per-user (PPU) license, or a Power BI individual trial. | Power BI |
| [Power BI Premium Per-User (PPU)](/power-bi/enterprise/service-premium-per-user-faq) | Collaborate using most of the [Power BI Premium features](/power-bi/enterprise/service-premium-features), including dataflows, and datamarts. In addition, it offers 48 data refreshes per day, support for semantic models that use more than 1GB of memory, and the XMLA endpoint. |To access a Power BI Premium Per-User (PPU) workspace you need a PPU license or a Power BI individual trial. | Power BI |
| [Power BI Embedded](/power-bi/developer/embedded/embedded-capacity#power-bi-embedded) (A SKUs) | Embed visuals and analytics into internal/external applications or websites. For example to embed into an  Azure capacity. | To create workspaces and share content you need a Pro, Premium Per User (PPU) or a Power BI individual trial license. | Power BI |

### Fabric workspace types

These workspace types support all Microsoft Fabric experiences:

| Workspace type | User capabilities | Access | Supported experiences |
|--|--|--|--|
| Fabric (F SKUs) | Create, share, collaborate on, and distribute Fabric content. Offers Azure‑specific capabilities such as ARM APIs, Terraform support, and managed private endpoints.| To view Power BI content with a Microsoft Fabric free per user license, your capacity must reside on an F64 or larger [SKU](#capacity), and you need to have a viewer role on the workspace. | All Fabric experiences |
| Fabric Trial | Try Fabric features and experiences for 60 days. | Microsoft Fabric (Free) license | All Fabric experiences |
| [Power BI Premium](/power-bi/enterprise/service-premium-what-is) (P SKUs)   | Create Power BI content. Share, collaborate on, and distribute Power BI content. | To create workspaces and share content you need a Pro or PPU license. To view content, you need a Microsoft Fabric (Free) license with a viewer role on the workspace. If you have any other role on the workspace, you need a Pro or a PPU license, or a Power BI individual trial. | All Fabric experiences |

> [!NOTE]
> Premium Per User (PPU) provides access to most Power BI Premium features on a per-user basis. It doesn't provision a Fabric capacity. To create or run non–Power BI Fabric items (for example, lakehouses, warehouses, notebooks) you still need an F capacity (or a Trial Fabric capacity).

<a id="per-user-licenses"></a> 
## Per-user or individual licenses

Per-user licenses let users work in Microsoft Fabric. A Free (Fabric) license is automatically assigned the first time a user signs in to the Fabric portal (if the tenant has Fabric enabled). It lets you create non-Power BI Fabric items only in a workspace backed by an F or Trial capacity. You can choose from three individual license types:

- **Free** - Automatically granted on first Fabric sign-in (if Fabric is enabled in the tenant). Lets you create and share non-Power BI Fabric items when the workspace runs on a Fabric (F) or Trial capacity. Doesn’t remove Power BI viewing requirements on F capacities smaller than F64.

    > [!NOTE]
    > To create Power BI items in a workspace other than *My workspace* and share them, you need a Power BI Pro or a Power BI Premium Per-User (PPU) license, or a Power BI individual trial.

- **Pro** - A [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) license lets you share Power BI content with other users. Every organization needs at least one user with a [Pro](/power-bi/enterprise/service-admin-purchasing-power-bi-pro) or a Premium Per User (PPU) license, if they intend to use Power BI within Fabric. On F SKUs smaller than F64, each user viewing Power BI content must have Pro, PPU, or an individual trial. On F64 or larger, users with only a Free license and a viewer role can view Power BI content.
- **Power BI Premium per-user (PPU)** - PPU licenses let organizations use Power BI [Premium features](/power-bi/enterprise/service-premium-features) by licensing every user with a PPU license instead of buying a Power BI Premium capacity. PPU is more cost effective when Power BI Premium features are needed for fewer than 250 users. PPU uses shared capacity across the organization, which provides the computing power for Power BI operations.

> [!IMPORTANT]
> **Premium Per User (PPU) doesn't provision a Fabric capacity.** Although PPU provides access to most Power BI Premium features, it doesn't enable you to create or run non-Power BI Fabric items (such as lakehouses, warehouses, or notebooks). To use Fabric workloads beyond Power BI, you need an F capacity or a Trial Fabric capacity.

### Common licensing scenarios

The following table shows common scenarios to help you choose the right licensing approach:

| What you want to do | Recommended license | Notes |
|---------------------|---------------------|-------|
| Use Power BI Premium features for a small team (< 250 users) | PPU licenses | Cost-effective for Power BI only; doesn't enable Fabric workloads |
| Create and use Fabric items (lakehouses, notebooks, warehouses) | F capacity + Free license | F64 or larger allows Free users to view Power BI content with viewer role |
| Create and share Power BI content only | Pro licenses or F capacity | Pro required for collaboration in Pro workspaces |
| View Power BI content in a large organization | F64+ capacity + Free license | Viewers need only Free license with viewer role on F64+ |
| Try Fabric features for 60 days | Trial capacity | Free trial includes F64 capacity equivalent |
| Use Power BI Premium features organization-wide | P capacity (or F capacity) | Supports all Fabric experiences when Fabric is enabled |

The following table lists the main differences between the capabilities of per-user licenses. For embedded analytics license considerations, see [Capacity and SKUs in Power BI embedded analytics](/power-bi/developer/embedded/embedded-capacity).

| Capabilities | Free | Pro | PPU |
|--|--|--|--|
| Access Microsoft Fabric web application | &#x2705; | &#x2705; | &#x2705; |
| Create Fabric capacity workspaces |&#x2705; | &#x2705; | &#x2705; |
| Create Power BI Premium workspaces |&#x274C; | &#x2705; | &#x2705; |
| Create Pro workspaces |&#x274C; | &#x2705; |&#x2705; |
| Create, update, delete, or manage Power BI items in workspaces other than their "My workspace" | &#x274C; | &#x2705; |&#x2705; |
| Create PPU workspaces |&#x274C; | &#x274C; |&#x2705; |
| Create non-Power BI Fabric items in Fabric / Trial capacity workspaces | &#x2705; | &#x2705; |&#x2705; |
| Create non-Power BI Fabric items in Power BI Premium capacity workspaces | &#x2705; | &#x2705; |&#x2705; |
| Share non-Power BI Fabric items | &#x2705; | &#x2705; |&#x2705; |
| View Power BI items in Pro workspaces or Fabric Capacity workspaces (where the Fabric Capacity SKU is less than a F64) | &#x274C; | &#x2705; |&#x2705; |
| Users signing in with an Entra user account and a workspace viewer role on a Power BI Premium Per Capacity or a Fabric Capacity with an F64 or higher SKU, can view the content of that workspace | &#x2705; | &#x2705; |&#x2705; |

## Licensing scenario summary

Use this reference to see who can do what.

| Scenario | Do you have an F (Fabric) capacity? | Do you have a Power BI Premium per capacity (P) SKU only? | Do you have only PPU licenses? | Do you have an A capacity? | Can you create Fabric (non–Power BI) items? | Can you view Power BI content with a Microsoft Fabric free license? | Notes |
|---------|------------------|--------------|--------------------|------------|----------|--------------|--------|
| Fabric capacity (F64 or larger) + free users | Yes | No | Optional | No | Yes | Yes (viewer role) | Free users rely on capacity. They can't create Power BI items outside My workspace without a Pro or PPU license. |
| Fabric capacity (any F SKU < F64) + free users | Yes | No | Optional | No | Yes | No (outside My workspace) | Viewing Power BI content requires a Pro or PPU license when the F SKU is below F64. |
| Power BI Premium per capacity (P1–P5) only | No | Yes | Optional | No | Yes (Fabric items disabled until enabled by Fabric Admin) | Yes (with a viewer role, same as Fabric) | Enable Fabric to create Fabric items. |
| PPU only (no F or P capacity) | No | No | Yes | No | No | Not applicable | PPU is a per-user feature set, not a capacity. |
| Pro only (no F/P capacity) | No | No | No | No | No (personal Power BI does not include Fabric non–Power BI items) | Not applicable | A Fabric capacity is required for Fabric workloads. |
| Trial Fabric capacity | Temporary | No | Optional | No | Yes | Yes (acts like F64 for viewing) | Ends after the trial. |
| Embedding for your organization (User Owns the Data) with content on A capacity | No | No | No | Yes | No | With a Power BI Pro or PPU license or Power BI Individual Trial | Standard "user owns data" embedding rules. |
| Embedding for your customers (App Owns the Data) with content on A capacity | No | No | No | Yes | No | Only when using the app that owns the data and authenticating through that app; cannot use the user’s Entra identity | Follows strict “app owns data” model. |

Next, review purchase options to select the capacity and user licensing mix that fits your rollout strategy.

## Related content

- [Buy a Microsoft Fabric subscription](buy-subscription.md)
