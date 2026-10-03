---
title: Manage Fabric Capacity in the OneLake Catalog
description: Learn how to manage your Microsoft Fabric capacities from the OneLake catalog Govern experience and understand the different settings available to you.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.date: 09/18/2026
ai-usage: ai-assisted
---

# Manage your capacities in the OneLake catalog (preview)

A Fabric capacity is a dedicated pool of compute resources that powers the items and workloads across your organization. As a Fabric administrator or capacity administrator, you need a single place to see the capacities you're responsible for and keep them sized and configured the way your organization requires.

This article shows you how to manage your capacities from the **Capacities** section in the [Govern section of the OneLake catalog](../governance/onelake-catalog-govern.md). From this centralized location, you can view the capacities you administer, create and delete capacities, change capacity settings, and configure delegated tenant settings.

> [!NOTE]
> OneLake catalog and Govern are rolling out by region. If they're not available in your region, select **Settings** (gear) icon > **Admin portal** > **Capacity settings** during the regional rollout.

## Prerequisites

To access the **Manage capacities** page, you must be a [Fabric administrator](../admin/microsoft-fabric-admin.md) or a [capacity administrator](../admin/roles.md#capacity-admin-roles). Fabric administrators can access the page even if they aren't an administrator of any capacity. Capacity administrators can access the capacities they administer.

Fabric roles and Azure role-based access control (Azure RBAC) permissions are independent. To perform an operation on an Azure-managed capacity, you also need the applicable Azure RBAC permissions on the Azure subscription or capacity resource. For available resource provider operations, see the Azure permissions for [Microsoft Fabric](/azure/role-based-access-control/permissions/analytics#microsoftfabric) and [Power BI Embedded](/azure/role-based-access-control/permissions/analytics#microsoftpowerbidedicated).

## View all capacities

To get to your capacities in the OneLake catalog, follow these steps:

1. Sign in to [Fabric](https://app.fabric.microsoft.com) by using your admin account credentials.
1. Select **OneLake catalog**, and then select the **Govern** tab.
1. Select **Capacities**.

The **Manage capacities** page shows a list of all the capacities you have permission to manage in your [tenant](../enterprise/licenses.md#tenant). 

:::image type="content" source="media/onelake-catalog-capacities/onelake-catalog-capacities.png" alt-text="Screenshot of OneLake catalog Govern tab showing Manage Capacities page with a list of Fabric capacities." lightbox="media/onelake-catalog-capacities/onelake-catalog-capacities.png":::

From this page, you can search for a capacity by name, filter the list by capacity type, size, region, and subscription ID, sort by any available column, and open the pane to create a new capacity.

The list includes all capacity types:

* **Power BI Premium** - A capacity you buy as part of a Power BI Premium subscription. These capacities use P SKUs.

   > [!NOTE]
   > Power BI Premium per-capacity (P SKU) subscriptions are retiring. To keep your Power BI workloads running, migrate to Fabric capacity (F SKUs). For an end-to-end view of the migration, see [Power BI Premium to Microsoft Fabric migration overview](/power-bi/support/premium-migration-overview). For answers to common questions, see the [Power BI Premium to Microsoft Fabric migration FAQ](/power-bi/support/premium-migration-faq).

* **Power BI Embedded** - A capacity you buy as part of a Power BI Embedded subscription. These capacities use A or EM SKUs.
* **Trial** - A [Fabric trial](../fundamentals/fabric-trial.md) capacity. These capacities use Trial SKUs.
* **Fabric capacity** - A Fabric capacity. These capacities use F SKUs.

## View details for a capacity

To view details for a capacity, follow these steps:

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the capacity.
1. Select the capacity to open the details page.

   :::image type="content" source="media/onelake-catalog-capacities/onelake-catalog-capacities-details.png" alt-text="Screenshot of Fabric capacity details page displaying SKU, region, ID, service admins, and assigned workspaces." lightbox="media/onelake-catalog-capacities/onelake-catalog-capacities-details.png":::

The capacity details view includes:

* Basic capacity information, such as name, SKU, Region, and ID.
* The service admin assigned to the capacity.
* The list of workspaces assigned to the capacity.
* Workspace details, including workspace admins and migration, OneLake geo-replication, monitoring, and surge protection status.

## Create a new capacity

The **Manage capacities** page contains a **New capacity** option, where you can create a new Fabric capacity or Azure Embedded capacity. You must be a Fabric administrator. To create an Azure-managed capacity, you also need Azure RBAC permission to create capacity resources in the selected subscription. For F SKU requirements, see [Buy Fabric capacity in Azure](../enterprise/buy-capacity.md#prerequisites). For a Power BI Embedded capacity, the applicable permissions include `Microsoft.PowerBIDedicated/capacities/read` and `Microsoft.PowerBIDedicated/capacities/write`.

To create a new capacity, follow these steps:

1. In Fabric, go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, select **New capacity**.
1. On the **New capacity** page, enter the following information:

   * **Capacity Type** - Select the type of capacity.
   * **Capacity name** - Give your capacity a name.
   * **Capacity admins** - Add capacity admins.
   * **Subscription** - Select the Azure subscription you want to use for the capacity.
   * **Resource group** - Select the Azure resource group you want to use for the capacity.
   * **Region** - Select the region where you want to create the capacity.
   * **Capacity size** - Select the size of the capacity.
   * **Capacity admins** - Select the capacity admins.

      > [!NOTE]
      > - You can create a new Power BI Embedded capacity with an A SKU or an EM SKU. If you select an EM size, you create a Power BI Embedded capacity.
      > - To create a new Trial capacity, see [Fabric trial](../fundamentals/fabric-trial.md#start-the-fabric-capacity-trial).

1. To add tags, expand **Additional settings**, select **Add tag**, and then enter the tag name and value.
1. Select **Apply**.

:::image type="content" source="media/onelake-catalog-capacities/onelake-catalog-capacities-new.png" alt-text="Screenshot of OneLake catalog Manage Capacities page with New capacity panel open." lightbox="media/onelake-catalog-capacities/onelake-catalog-capacities-new.png":::

## Manage capacities with the actions menu

From either the **Manage capacities** page or a capacity's details page, use the actions menu to perform basic capacity management tasks. For example, pause or resize a capacity, reassign workspaces, configure surge protection, or set capacity overage limits. The actions available depend on the capacity type and your permissions.

To select an action, follow these steps:

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the capacity.
1. Do one of the following:

   - Next to the capacity name, select **More options** (three dots), and then select the action you want to take.
      :::image type="content" source="media/onelake-catalog-capacities/onelake-catalog-capacities-dot-menu.png" alt-text="Screenshot of Fabric capacity context menu with options including Reassign workspaces and Configure surge protection." lightbox="media/onelake-catalog-capacities/onelake-catalog-capacities-dot-menu.png":::

   - Open the details page by selecting the capacity name. Use the **Actions** menu to take the action you want.
   
      :::image type="content" source="media/onelake-catalog-capacities/onelake-catalog-capacities-actions.png" alt-text="Screenshot of the Actions menu with Pause, Resize, Reassign workspaces, and other capacity management options." lightbox="media/onelake-catalog-capacities/onelake-catalog-capacities-actions.png":::

### Rename your capacity

To change the name of your Power BI Premium, Power BI Embedded EM SKU, or Trial capacity, follow these steps. You must be a capacity administrator. To rename a Power BI Embedded EM SKU, you also need the `Microsoft.PowerBIDedicated/capacities/read` and `Microsoft.PowerBIDedicated/capacities/write` Azure RBAC permissions on the capacity resource. For information about assigning capacity administrators, see [Add and remove admins](#add-and-remove-admins).

> [!NOTE]
> You can't rename:
> - A SKUs
> - Fabric capacities (F SKUs)

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the capacity.
1. Next to the capacity name, select **More options** (three dots) > **Rename**.
1. Type the new name in the **Capacity name** field.
1. Select (**Apply**).

### Pause and resume a capacity

You can pause a Fabric capacity to stop billing when the capacity isn't in use, and resume it when you need it again. For F SKU prerequisites and steps, see [Pause and resume your capacity](../enterprise/pause-resume.md). For an A SKU, you need the `Microsoft.PowerBIDedicated/capacities/read`, `Microsoft.PowerBIDedicated/capacities/write`, `Microsoft.PowerBIDedicated/capacities/suspend/action`, and `Microsoft.PowerBIDedicated/capacities/resume/action` Azure RBAC permissions on the capacity resource.

> [!NOTE]
> You can only pause and resume A SKU and F SKU capacities.

### Resize a capacity

The size of a capacity determines the amount of resources allocated to it, such as memory and processing power. To resize a capacity, you must be a capacity administrator. To resize an Azure-managed capacity, you also need Azure RBAC permission to read and update the capacity resource. For F SKU requirements, see [Scale your Fabric capacity](../enterprise/scale-capacity.md#prerequisites). For a Power BI Embedded capacity, the applicable permissions include `Microsoft.PowerBIDedicated/capacities/read` and `Microsoft.PowerBIDedicated/capacities/write`. For information about assigning capacity administrators, see [Add and remove admins](#add-and-remove-admins).

> [!NOTE]
> - You can't resize a trial capacity.

To resize a capacity, follow these steps:

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the capacity.
1. Next to the capacity name, select **More options** (three dots) > **Resize**.
1. In the **Resize capacity** pane, specify the new **Target size** for the capacity.
1. Select **Apply** to apply the changes.

### Autoscale a capacity

You can enable autoscale for a Power BI Premium or Power BI Embedded capacity to automatically adjust its size based on workload demand. For steps, see [Using Autoscale with Power BI Premium](../enterprise/powerbi/service-premium-auto-scale.md).

> [!NOTE]
> Autoscale isn't available for Trial and Fabric F SKU capacities.

To enable autoscale for a capacity, follow these steps:

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the capacity.
1. Next to the capacity name, select **More options** (three dots) > **Manage Autoscale**.
1. In the **Autoscale settings** pane, toggle the switch to **Enable Autoscale**.
1. Select a **Subscription** and **Resource group** for billing.
1. Select **Save**.

### Reassign a workspace to a different capacity

You can move a workspace from one capacity to another from the OneLake catalog **Govern** section. For steps, see [Reassign a workspace to a different capacity](../admin/portal-workspaces.md#reassign-a-workspace-to-a-different-capacity). For information about limitations you might encounter, see [Capacity reassignment restrictions and common issues](../admin/portal-workspace-capacity-reassignment.md).

:::image type="content" source="media/onelake-catalog-capacities/onelake-catalog-capacities-move.png" alt-text="Screenshot of Move workspaces to another capacity pane with workspace and target capacity dropdowns." lightbox="media/onelake-catalog-capacities/onelake-catalog-capacities-move.png":::

### Configure surge protection

Surge protection helps protect your capacities from unexpected spikes in background workload demand. For steps, see [Surge protection](../enterprise/surge-protection.md).

### Set a capacity overage limit

Set a capacity overage limit to control how much overage a capacity can accrue. For steps, see [Enable capacity overage in Microsoft Fabric](../enterprise/enable-capacity-overage.md).

### Delete a capacity

When you delete a Power BI Premium, Trial, or Fabric capacity, the process soft deletes non-Power BI Fabric items in workspaces assigned to the capacity. You can still see these Fabric items in the OneLake catalog and the workspace list, but you can't open or use them. If you associate the workspace that holds these items to a capacity (other than Power BI Embedded) from the same region as the deleted capacity within seven days, the deleted items are restored. This seven-day period is separate from the [workspace retention setting](../admin/workspace-retention.md#set-up-the-retention-period-for-deleted-collaborative-workspaces).

You must be a Fabric administrator to delete a capacity. To delete an Azure-managed capacity, you also need the applicable Azure RBAC delete permission on the capacity resource, such as `Microsoft.Fabric/capacities/delete` for an F SKU or `Microsoft.PowerBIDedicated/capacities/delete` for a Power BI Embedded capacity.

> [!NOTE]
> To delete a trial capacity, you need to [end the trial](#end-a-trial).

To delete a capacity, follow these steps:

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the capacity.
1. Next to the capacity name, select **More options** (three dots) >  **Delete**.
1. In the Delete capacity pane, confirm the deletion by following the prompts.

### End a trial

To end a trial capacity, follow these steps:

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the trial capacity.
1. Next to the capacity name, select **More options** (three dots) > **End trial**.
1. In the End trial pane, confirm the action by following the prompts.

## Manage capacity settings

 In addition to the basic actions available in the actions menu, you can access all settings for a capacity. 

To open the full capacity settings experience, follow these steps:

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the capacity.
1. Next to the capacity name, select **More options** (three dots) > **Settings**.

The **Capacity settings** section opens and displays all settings specific to the capacity. The **Delegated tenant settings** section allows Fabric admins to delegate tenant settings for capacity admins to manage. Changes to these settings affect only the capacity where you make them.

:::image type="content" source="media/onelake-catalog-capacities/onelake-catalog-capacities-settings.png" alt-text="Screenshot of Capacity settings menu with Disaster Recovery selected and options like Surge Protection and Copilot capacity." lightbox="media/onelake-catalog-capacities/onelake-catalog-capacities-settings.png":::

> [!NOTE]
> Delegated tenant settings are available for Power BI Premium and Fabric capacities.

### Settings details

This table summarizes the settings available for a capacity.

> [!NOTE]
>
> - Some features in the table are available only if they're enabled in the tenant.
> - Trial capacities only have some of the settings listed in the table.

| Details setting name                 | Description |
|--------------------------------------|-------------|
| Disaster Recovery                    | Enable [disaster recovery](/azure/reliability/reliability-fabric#set-up-disaster-recovery) for the capacity |
| Surge protection                 | Enable [surge protection](../enterprise/surge-protection.md) for the capacity |
| Throttling notifications                        | Enable [notification](../admin/service-admin-premium-capacity-notifications.md) for your capacity |
| Copilot capacity                     | Designate this capacity as a [Copilot in Fabric capacity](../enterprise/fabric-copilot-capacity.md) |
| Contributor permissions              | Set up the ability to add workspaces to the capacity. Select one of these two options:<ul><li>The entire organization</li><li>Specific users or security groups</li></ul> |
| Capacity admins                    | Give specific users the ability to do the following:<ul><li>Change capacity settings</li><li>Add contributors to the capacity</li><li>Add or remove workspaces from the capacity</li></ul> |
| Power BI workloads                   | Configure [Power BI workloads](/power-bi/enterprise/service-admin-premium-workloads) for:<ul><li>[Semantic models](/power-bi/enterprise/service-admin-premium-workloads#semantic-models)</li><li>[Paginated reports](/power-bi/enterprise/service-admin-premium-workloads#paginated-reports)</li><li>[AI](/power-bi/enterprise/service-admin-premium-workloads#ai-preview)</li></ul> |
| Data Engineering/Science Settings    | Allow workspace admins to set the size of their Spark [pools](../data-engineering/workspace-admin-settings.md#pool) |
| Capacity overage (preview)           | Enable [capacity overage](../enterprise/enable-capacity-overage.md) to allow the capacity to temporarily exceed its allocated resources. |
| On-demand billing for Apache Spark | Enable [on-demand billing for Apache Spark](../data-engineering/autoscale-billing-for-spark-overview.md) to allow the capacity to be billed based on actual usage rather than allocated resources. |

<sup>*</sup> To assign a workspace to a Fabric capacity or a capacity with an A SKU, you need a capacity **contributor** role and a workspace admin role. A **contributor** on a capacity can assign workspaces to that capacity but can't modify capacity settings or delete the capacity. By using this role, workspace admins can move their workspaces into a managed capacity without full administrative control.

### Delegated tenant settings

Use [delegating admin settings](../admin/delegate-settings.md) to grant granular access to features in the capacity. The delegated tenant settings section lists these tenant settings:

* Workload management tenant settings that Fabric automatically delegates to the capacity.
* Tenant settings that the Fabric admin delegates.

By default, delegated tenant settings inherit their configuration from the tenant. To override this configuration, follow these steps. When you enable tenant setting delegation, you can disable it by clearing the **Override tenant admin selection** checkbox.

1. From the **Delegate tenant setting** list, open the setting you want to delegate permissions for.
1. Select the **Override tenant admin selection** checkbox.
1. Select **Enabled**.
1. In the **Apply to** section, select one of the following options:

   * **All the users in capacity** - Delegate the setting to all the users in the capacity.
   * **Specific security groups** - Apply the setting to specific security groups. Enter the security groups you want to apply the setting to.

    To exclude specific security groups from the setting, select **Except specific security groups** and enter the security groups you want to exclude. This setting is optional, and you can use it together with the **Apply to** setting.
   
1. Select **Apply**.

## Add and remove admins

To add and remove admins from your capacity, you need to be a capacity admin. Only users that belong to the tenant the capacity is part of can be admins of the capacity.

1. Go to **OneLake catalog** > **Govern** > **Capacities**.
1. On the **Manage capacities** page, filter or search the list to find the capacity.
1. Next to the capacity name, select **More options** (three dots) > **Settings**.
1. In **Settings**, select **Capacity admins**, and then add or remove admins as needed. 
1. Select **Apply** to save your changes.

## Related content

* [Fabric licenses](../enterprise/licenses.md)
* [About tenant settings](../admin/about-tenant-settings.md)
