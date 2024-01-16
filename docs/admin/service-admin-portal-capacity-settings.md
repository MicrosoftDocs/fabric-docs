---
title: Manage capacity settings
description: Learn how to manage your Fabric capacity settings and understand what settings you can configure for your organization.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom:
  - admin-portal
  - ignite-2023
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Administration
---

# Manage capacity settings

Capacity is a dedicated set of resources reserved for exclusive use. Premium and Embedded capacities offer a dependable and consistent performance for your content. Here are some settings that you can configure when managing your organization's capacity settings:

* Create new capacities
* Delete capacities
* Manage capacity permissions
* Change the size of the capacity

To learn how to access the Fabric admin portal settings, see [What is the admin portal?](admin-center.md)

## Power BI Premium

The **Power BI Premium** tab enables you to manage any Power BI Premium capacities (EM or P SKU) that have been purchased for your organization. All users within your organization can see the **Power BI Premium** tab, but they only see contents within it if they're assigned as either a *Capacity admin* or a user that has assignment permissions. If a user doesn't have any permissions, the following message appears:

![Screenshot of message that indicates no access to Premium settings.](media/service-admin-portal-capacity-settings/premium-settings-no-access.png)

To understand more about the concepts of capacity management, see [Managing Premium capacities](/power-bi/enterprise/service-premium-capacity-manage).

The capacity management process is described in [Configure and manage capacities in Power BI Premium](/power-bi/enterprise/service-admin-premium-manage).

## Power BI Embedded

The **Power BI Embedded** tab enables you to view your Power BI Embedded (A SKU) capacities that you've purchased for your customer. Because you can only purchase A SKUs from Azure, you [manage embedded capacities in Azure](/power-bi/developer/embedded/azure-pbie-create-capacity) from **the Azure portal**.

For more information about Power BI Embedded, see:

* Power BI Embedded SKUs - [Capacity and SKUs in Power BI embedded analytics](/power-bi/developer/embedded/embedded-capacity)

* Create a Power BI Embedded capacity in Azure - [Create Power BI Embedded capacity in the Azure portal](/power-bi/developer/embedded/azure-pbie-create-capacity)

* Scale a capacity in Azure - [Scale your Power BI Embedded capacity in the Azure portal](/power-bi/developer/embedded/azure-pbie-scale-capacity)

* Pause and start a capacity Azure - [Pause and start your Power BI Embedded capacity in the Azure portal](/power-bi/developer/embedded/azure-pbie-pause-start)

## Fabric capacity deletion

When a Fabric capacity is deleted, Fabric items in workspaces assigned to the capacity are soft-deleted
and become unusable. They become usable again if the workspace is associated to a Fabric or Premium capacity.
Power BI items are not affected.

## Related content

- [What is the admin portal?](admin-center.md)
