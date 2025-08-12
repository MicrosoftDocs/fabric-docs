---
title: Buy a Microsoft Fabric subscription
description: Learn how to buy a Microsoft Fabric subscription so that you can start working in the Microsoft Fabric platform.
author: JulCsc
ms.author: juliacawthra
ms.topic: concept-article
ms.custom:
ms.date: 05/06/2025

# Customer intent: As an administrator or an executive, I want to learn how to but a Microsoft Fabric subscription so that I can start working in the Microsoft Fabric platform.
---

# Buy a Microsoft Fabric subscription

This article describes the differences between the [Microsoft Fabric](../fundamentals/microsoft-fabric-overview.md) capacities, and shows you how to buy an Azure SKU for your organization. The article is aimed at admins who want to buy Microsoft Fabric for their organization.

With [capacity quotas](fabric-quotas.md) you can set limits to the maximum number of Fabric Capacity Units (CUs) for each of the capacities on your subscription.

After you buy a capacity, you can learn how to [manage your capacity](/power-bi/enterprise/service-admin-premium-manage#manage-capacity) and [assign workspaces](/power-bi/enterprise/service-admin-premium-manage#assign-a-workspace-to-a-capacity) to it.

> [!NOTE]
> The [Fabric Analyst in a Day (FAIAD)](https://aka.ms/LearnFAIAD) workshop is a free, hands-on training designed for analysts working with Power BI and Microsoft Fabric. You can get hands-on experience on how to analyze data, build reports, using Fabric. It covers key concepts like working with lakehouses, creating reports, and analyzing data in the Fabric environment.

## Prerequisites

To buy a Microsoft Fabric subscription, you need one of the following licenses:

* Microsoft Fabric free

* Power BI

## SKU types

Microsoft Fabric has an array of capacities that you can buy. The capacities are split into Stock Keeping Units (SKU). Each SKU provides a different amount of computing power, measured by its Capacity Unit (CU) value. Refer to the [Capacity and SKUs](licenses.md#capacity) table to see how many CUs each SKU provides.

Microsoft Fabric operates on two types of SKUs:

* **Azure** (F capacities, which can only be purchased through the Azure portal) - Billed per second with no commitment. To save costs, you can make a [yearly reservation](/azure/cost-management-billing/reservations/fabric-capacity).

* **Microsoft 365** (Power BI Premium P capacities, which are [only available to customers who have them on an active Enterprise Agreement](https://powerbi.microsoft.com/blog/important-update-coming-to-power-bi-premium-licensing/)) - Billed monthly or yearly, with a monthly commitment.

## Azure SKUs

Azure SKUs, also known as F SKUs, are the recommended capacities for Microsoft Fabric. You can use your Azure capacity for as long as you want without any commitment. Pricing is regional and billing is made on a per second basis with a minimum of one minute.

Azure capacities offer the following improvements over the Microsoft 365 SKUs.

* Pay-as-you-go with no time commitment.

* A [capacity reservation](/azure/cost-management-billing/reservations/fabric-capacity). This feature allows you to reserve a capacity for a specific period of time, and save money on your Azure bill. A reserved capacity is no longer charged at the pay-as-you-go rates.

* You can [scale your capacity](scale-capacity.md) up or down using the Azure portal.

* You can [pause](pause-resume.md#pause-your-capacity) and [resume](pause-resume.md#resume-your-capacity) your capacity as needed. This feature is designed to save money when the capacity isn't in use.

* [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview).

* [Azure Monitor Metrics](/azure/azure-monitor/essentials/data-platform-metrics).

### Buy an Azure SKU

To buy an Azure SKU, you need to be an owner or a contributor of an Azure subscription. If you do not have access to these roles in a subscription, you can ask your Azure subscription administrator to create a custom role with the following [Azure role-based access control](/azure/role-based-access-control/overview) (Azure RBAC) permissions:
  * Microsoft.Fabric/capacities/read
  * Microsoft.Fabric/capacities/write
  * Microsoft.Fabric/capacities/suspend/action
  * Microsoft.Fabric/capacities/resume/action

To buy an Azure SKU, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com/).

2. In Azure, select the **Microsoft Fabric** service. You can search for *Microsoft Fabric* using the search menu.

3. Select **Create Fabric Capacity**.

4. In the **Basics** tab, fill in the following fields:

    * *Subscription* - The subscription you want your capacity to be assigned to. All Azure subscriptions are billed together.

    * *Resource group* - The resource group you want your capacity to be assigned to.

    * *Capacity name* - Provide a name for your capacity.

    * *Region* - Select the region you want your capacity to be part of.

    * *Size* - Select your capacity size. Capacities come in different stock keeping units (SKUs) and we measure them by capacity units (CUs). You can view a detailed list of Microsoft Fabric capacities in [Capacities and SKUs](licenses.md#capacity).

    * *Fabric capacity administrator* - Select the [admin](../admin/microsoft-fabric-admin.md#capacity-admin-roles) for this capacity.
        * The capacity administrator must belong to the tenant where the capacity is provisioned.
        * Business to business (B2B) users can't be capacity administrators.

5. Select **Next: Tags** and if necessary, enter a name and a value for your capacity.

6. Select **Review + create**.

### Microsoft 365 SKUs

Microsoft 365 SKUs, also known as P SKUs, are Power BI SKUs that also support Fabric when it's [enabled](../admin/fabric-switch.md) on top of your Power BI subscription. Power BI EM SKUs don't support Microsoft Fabric.

## Related content

* [Microsoft Fabric licenses](licenses.md)

* [Microsoft Fabric capacity quotas](fabric-quotas.md)
