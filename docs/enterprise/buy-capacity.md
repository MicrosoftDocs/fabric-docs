---
title: Buy Fabric capacity Azure SKUs
description: Learn how to buy Microsoft Fabric capacity through an Azure subscription or a Cloud Solution Provider (CSP) to run Fabric workloads in your organization.
author: dknappettmsft
ms.author: daknappe
ms.topic: how-to
ms.date: 08/04/2026
ai-usage: ai-assisted

#customer intent: As an administrator or an executive, I want to learn how to buy Microsoft Fabric capacity so that I can start working in the Microsoft Fabric platform.
---

# Buy Fabric capacity in Azure

Fabric capacity gives your organization the compute it needs to run Fabric workloads. Before anyone in your organization can create items or run jobs in Fabric, an administrator buys capacity through an Azure subscription or through a Cloud Solution Provider (CSP).

Fabric capacity comes as Azure F SKUs, which you buy through an Azure subscription, or Microsoft 365 P SKUs, which are Power BI Premium capacities. You can buy F SKU capacity in two ways: directly through the Azure portal, or through a Cloud Solution Provider (CSP). To learn more about the SKU types and Fabric licensing, see [Understand Microsoft Fabric licenses and capacity](licenses.md#capacity).

The rest of this article shows you how to buy an F SKU directly through the Azure portal or through a CSP.

> [!TIP]
> The [Fabric Analyst in a Day (FAIAD)](https://aka.ms/LearnFAIAD) workshop is a free, hands-on training for analysts who work with Power BI and Fabric. You get hands-on experience analyzing data and building reports in Fabric. It covers key concepts such as working with lakehouses, creating reports, and analyzing data in the Fabric environment.

## Prerequisites

To buy Fabric capacity, you need:

- One of the following licenses:
   - Microsoft Fabric free
   - Power BI

- An Azure subscription

- Permission on an Azure subscription to create a capacity. As a best practice, create a custom role scoped to the following [Azure role-based access control](/azure/role-based-access-control/overview) (Azure RBAC) permissions:

   ```   
   Microsoft.Fabric/capacities/read
   Microsoft.Fabric/capacities/write
   Microsoft.Fabric/capacities/suspend/action
   Microsoft.Fabric/capacities/resume/action
   ```

   You can also use the built-in Owner or Contributor roles, but these roles are privileged roles that grant more permission than necessary.

## Buy an Azure capacity SKU for Fabric

To buy an Azure capacity SKU for Fabric in the Azure portal, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. In Azure, select the **Microsoft Fabric** service. Search for *Microsoft Fabric* by using the search menu.

1. Select **Create Fabric Capacity**.

1. In the **Basics** tab, fill in the following fields:

    * **Subscription** - The subscription you want to assign your capacity to. Azure bills all subscriptions together.

    * **Resource group** - The resource group you want to assign your capacity to.

    * **Capacity name** - Provide a name for your capacity.

    * **Region** - Select the region you want your capacity to be part of.

    * **Size** - Select your capacity size. Capacities come in different stock keeping units (SKUs), and Fabric measures them by capacity units (CUs). View a detailed list of Fabric capacities in [Capacities](licenses.md#capacity).

    * **Fabric capacity administrator** - Select the [admin](../admin/microsoft-fabric-admin.md#capacity-admin-roles) for this capacity.
        * The capacity administrator must belong to the tenant where you provision the capacity.
        * Business to business (B2B) users can't be capacity administrators.

1. Select **Next: Tags** and if necessary, enter a name and a value for your capacity.

1. Select **Review + create**.

## Buy through a Cloud Solution Provider (CSP)

In addition to buying Fabric capacity directly through the Azure portal, you can buy Fabric capacities through a Cloud Solution Provider (CSP). A CSP is a Microsoft-authorized partner who can provision and manage cloud subscriptions (such as Azure) on your organization's behalf, and provide consolidated billing and support.

Your selected partner helps you set up an Azure subscription if you don't already have one and buy the appropriate Fabric F SKU capacity for your organization. After your partner creates the capacity in your tenant, you can assign your Fabric workspaces (including those on trial capacities) to the newly bought capacity.

Buying through a CSP doesn't change how Fabric works. After the capacity is available in your tenant, you manage and use it the same way as a capacity you buy directly through Azure. If you need help finding a CSP partner, search the [Microsoft AppSource partner directory](https://appsource.microsoft.com/marketplace/partner-dir).

## Related content

* [Understand Microsoft Fabric licenses and capacity](licenses.md)

* [Manage your capacity](/power-bi/enterprise/service-admin-premium-manage#manage-capacity)

* [Assign workspaces to a capacity](/power-bi/enterprise/service-admin-premium-manage#assign-a-workspace-to-a-capacity)

* [Scale your capacity](scale-capacity.md)

* [Pause and resume your capacity](pause-resume.md)

* [Monitor Fabric costs with Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview)

* [Monitor capacity metrics with Azure Monitor Metrics](/azure/azure-monitor/essentials/data-platform-metrics)

* [Fabric capacity quotas](fabric-quotas.md)
