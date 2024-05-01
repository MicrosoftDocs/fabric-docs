---
title: Buy a Microsoft Fabric subscription
description: Learn how to buy a Microsoft Fabric subscription.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/01/2024
---

# Buy a Microsoft Fabric subscription

This article describes the differences between the [Microsoft Fabric](../get-started/microsoft-fabric-overview.md) capacities, and shows you how to buy an Azure SKU for your organization. The article is aimed at admins who want to buy Microsoft Fabric for their organization.

After you buy a capacity, you can learn how to [manage your capacity](/power-bi/enterprise/service-admin-premium-manage#manage-capacity) and [assign workspaces](/power-bi/enterprise/service-admin-premium-manage#assign-a-workspace-to-a-capacity) to it.

## SKU types

Microsoft Fabric has an array of capacities that you can buy. The capacities are split into Stock Keeping Units (SKU). Each SKU provides a different amount of computing power, measured by its Capacity Unit (CU) value. Refer to the [Capacity and SKUs](licenses.md#capacity-license) table to see how many CUs each SKU provides.

Microsoft Fabric operates on two types of SKUs:

* **Azure** - Billed per second with no commitment.

* **Microsoft 365** - Billed monthly or yearly, with a monthly commitment

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

To buy an Azure SKU, you need to be an owner or a contributor of an [Azure subscription](/azure/role-based-access-control/overview).

1. Select the **Microsoft Fabric** service. You can search for *Microsoft Fabric* using the search menu.

2. Select **Create Fabric Capacity**.

3. In the **Basics** tab, fill in the following fields:

    * *Subscription* - The subscription you want your capacity to be assigned to. All Azure subscriptions are billed together.

    * *Resource group* - The resource group you want your capacity to be assigned to.

    * *Capacity name* - Provide a name for your capacity.

    * *Region* - Select the region you want your capacity to be part of.

    * *Size* - Select your capacity size. Capacities come in different stock keeping units (SKUs) and we measure them by capacity units (CUs). You can view a detailed list of Microsoft Fabric capacities in [Capacities and SKUs](licenses.md#capacity-license).

    * *Fabric capacity administrator* - Select the [admin](../admin/microsoft-fabric-admin.md#capacity-admin-roles) for this capacity.

4. Select **Next: Tags** and if necessary, enter a name and a value for your capacity.

5. Select **Review + create**.

## Microsoft 365 SKUs

Microsoft 365 SKUs, also known as P SKUs, are Power BI SKUs that also support Fabric when it's [enabled](../admin/fabric-switch.md) on top of your Power BI subscription. Power BI EM SKUs don't support Microsoft Fabric.

## Related content

[Microsoft Fabric licenses](licenses.md)
