---
title: Manage your Fabric capacity
description: Learn how to manage your Microsoft Fabric capacity and understand that different settings that are available to you.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 12/18/2023
---

# Manage your Fabric capacity

This article describes the Microsoft Fabric capacity settings. The article is aimed at admins who want to understand how to manage their Microsoft Fabric capacities.

## Get to the capacity settings

To get to the capacity settings, follow these steps:

1. In the Power BI service, select the gear icon (**&#9881;**) in the upper-right corner, and then select **Admin portal**.

2. In the Admin portal, select **Capacity settings**.

## View your capacity

The capacity settings page shows a list of all the capacities in your [tenant](licenses.md#tenant). At the top of the page you can see a list of the different Fabric capacity types. Select a capacity type to view all the capacities of that type in your tenant.

* **Power BI Premium** - A capacity that was bought as part of a Power BI Premium subscription. These capacities use P SKUs.

* **Power BI Embedded** - A capacity that was bought as part of a Power BI Embedded subscription. These capacities use a EM SKUs.

* **Trial** - A [Microsoft Fabric trial](../get-started/fabric-trial.md) capacity. These capacities use a A SKUs.

* **Fabric capacity** - A Microsoft Fabric capacity. These capacities use a A SKUs.

To view a specific capacity, follow these steps:

1. Go to the capacity settings page.

2. Select the capacity type your capacity belongs to.

3. From the capacity list, select the capacity you want to view.

## Manage your capacity

This section lists basic capacity management tasks, such as creating a new capacity, changing a capacity's name and deleting a capacity.

### Create a new capacity

This section describes how to create a new Fabric capacity. Power BI capacities are being deprecated and for instructions related to trial capacities, see [Microsoft Fabric trial](../get-started/fabric-trial.md#start-the-fabric-trial).

1. In the **Capacity settings** page, select **Fabric capacity**.

2. Below the list of capacities, select the link **Set up a new capacity in Azure**. The *Create Fabric capacity* page in Azure, opens in a new tab.

3. In the Azure *Create Fabric capacity* page, enter the following information:

   * **Subscription** - Select the Azure subscription you want to use for the capacity.

   * **Resource group** - Select the Azure resource group you want to use for the capacity.

   * **Capacity name** - Give your capacity a name.

   * **Region** - Select the region you want to create the capacity in.

   * **Size** - Select the size of the capacity.

   * **Fabric capacity administrator** - Select the capacity admins.

4. Select **Review + create**.

5. Review the details of your capacity, and then select **Create**.

### Change the name of your capacity

To change the name of your capacity, follow these steps:

1. Select the capacity type your capacity belongs to.

2. From the list of capacities, select the gear icon (**&#9881;**) next to the capacity you want to change.

3. In the capacity's setting page, select the pencil icon next to the **Capacity name** field.

4. Enter the new name for the capacity, and then select the checkmark icon (**&check;*)*.

### Add and remove users

### Resize a capacity

### Delete a capacity

To delete a *Power BI Premium* capacity, follow these steps:

1. From the list of *Power BI Premium* capacities, select the gear icon (**&#9881;**) next to the capacity you want to delete.

2. In the capacity's setting page, select **Delete capacity**.

3. In the confirmation dialog, select **Delete**.

To delete a *Fabric Capacity*, follow these steps:

1. From the list of Fabric capacities, select the gear icon (**&#9881;**) next to the capacity you want to delete.

2. In the capacity's setting page, select the link **Manage fabric capacities in Azure**. A list of your Fabric capacities in Azure opens in a new tab.

3. From the Fabric capacities list in Azure, select the capacity you want to delete by clicking its name.

4. Select **Delete**.

5. In the confirmation dialog, retype the capacity name, and then select **Delete**.

>[!NOTE]
>You can't delete a *Trial* capacity.

## Capacity settings

There are two type of capacity settings you can control:

* **Details** - Capacity details are settings that are specific to the capacity.

* **Delegated tenant settings** - Tenant settings enable you to delegate certain settings to specific users or security groups

### Details

This table summarizes the actions you can take in the details section.

| Details setting name                 | Description |
|--------------------------------------|-------------|
| Disaster Recovery                    | Enable [disaster recovery](/azure/reliability/reliability-fabric#set-up-disaster-recovery) for the capacity |
| Capacity usage report                | The usage report is replaced with the [capacity metrics app](metrics-app.md) |
| Notifications                        | Enable [notification](../admin/service-admin-premium-capacity-notifications.md) for you capacity |
| Contributor permissions              | Set up the ability to add workspaces to the capacity. Select one of these two options:<li>The entire organization</li><li>Specific users or security groups</li> |
| Admin permissions                    | Give specific users or security groups the ability to do the following:<li>Change capacity settings</li><li>Add contributors to the capacity</li><li>Add or remove workspaces from the capacity</li> |
| Power BI workloads                   | Configure [Power BI workloads](/power-bi/enterprise/service-admin-premium-workloads) for:<li>[Semantic models](/power-bi/enterprise/service-admin-premium-workloads#semantic-models)</li><li>[Paginated reports](/power-bi/enterprise/service-admin-premium-workloads#paginated-reports)</li><li>[AI](/power-bi/enterprise/service-admin-premium-workloads#ai-preview)</li> |
| Preferred capacity for My workspace  | Designate the capacity as the [default capacity for My workspaces](/power-bi/enterprise/service-admin-premium-manage#designate-a-default-capacity-for-my-workspaces)         |
| Data Engineering/Science Settings    | Allow workspace admins to set the size of their spark [pools](../data-engineering/workspace-admin-settings.md#pool) |
| Workspaces assigned to this capacity | Add or remove workspaces assigned to the capacity |

### Delegated tenant settings

Delegate the tenant settings listed in this section to specific users or security groups. [Delegating admin settings](../admin/admin-overview.md#delegate-admin-rights) to other admins in your organization, allows granular control across your organization.

To delegate a tenant setting, follow these steps:

1. From the **Delegate tenant setting** list, open the setting you want to delegate permissions for.

2. Select the **Override tenant admin selection** checkbox.

3. Select **Enabled**

4. In the *Apply to* section, select one of the following options:

   * **All the users in capacity** - Delegate the setting to all the users in the capacity.

   * **Specific security groups** - Apply the setting to specific users or security groups.


### Trial capacity settings

| Trial capacity setting name          | Description  |
|--------------------------------------|---------|
| Capacity usage report                |         |
| Notifications                        |         |
| Power BI workloads                   |         |
| Data Engineering/Science Settings    |         |
| Workspaces assigned to this capacity |         |

## Related content

[Microsoft Fabric licenses](licenses.md)
