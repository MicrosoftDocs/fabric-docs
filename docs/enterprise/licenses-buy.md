---
title: Buy a Microsoft Fabric license
description: Learn how to buy a Microsoft Fabric license.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 12/27/2022
---

# Buy a Microsoft Fabric license

This article describes how to purchase a [Microsoft Fabric](../get-started/microsoft-fabric-overview.md) capacity for your organization. The article is aimed at admins who want to purchase Microsoft Fabric for their organization.

After you purchase a capacity, you can learn how to [manage your capacity](/power-bi/enterprise/service-admin-premium-manage#manage-capacity) and [assign workspaces](/power-bi/enterprise/service-admin-premium-manage#assign-a-workspace-to-a-capacity) to it.

## SKU types

Microsoft Fabric has an array of capacities that you can buy. The capacities are split into Stock Keeping Units (SKU). Each SKU provides a different amount of computing power, measured by its Capacity Unit (CU) value. Refer to the [Capacity and SUKs](licenses.md#capacity-and-skus) table to see how many CUs each SKU provides.

Microsoft Fabric operates on two types of SKUs:

* **Azure** - Billed hourly with no commitment.

* **Microsoft 365** - Billed monthly or yearly, with a monthly commitment

## Azure SKUs

Azure SKUs, also known as F SKUs, are the recommended capacities for Microsoft Fabric. To buy an Azure SKU you need to be an owner or a contributor of an [Azure subscription](/azure/role-based-access-control/overview). You can use your Azure capacity for as long as you want without any commitment. Pricing is regional and billing is made on a per second basis with a minimum of one minute.

Azure capacities offer the following improvements over the Microsoft 365 SKUs.

* Pay as you go with no time commitment.

* You can [scale your capacity](/power-bi/developer/embedded/azure-pbie-scale-capacity#scale-a-capacity) up or down using the Azure portal or via the Azure APIs.

* You can [pause](/power-bi/developer/embedded/azure-pbie-pause-start#pause-your-capacity) and [start](/power-bi/developer/embedded/azure-pbie-pause-start#start-your-capacity) your capacity as needed. This feature is designed to save money when the capacity isn't in use.

* [Azure cost management](/cost-management-billing/cost-management-billing-overview).

* [Azure Monitor Metrics](/azure/azure-monitor/essentials/data-platform-metrics). 

## Microsoft 365 SKUs

Microsoft 365 SKUs, also known as EM or P SKUs, are legacy SKUs inherited from Power BI. You can only renew a Microsoft 365 SKU if you already have a Power BI subscription, and Microsoft Fabric is [enabled](../admin/admin-switch.md) on top of your Power BI subscription.

## Next steps

[Microsoft Fabric licenses](licenses.md)
