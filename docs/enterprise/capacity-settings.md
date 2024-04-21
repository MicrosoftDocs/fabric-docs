---
title: Manage your Fabric capacity
description: Learn how to manage your Microsoft Fabric capacity and understand that different settings that are available to you.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 04/21/2024
---

# Manage your Fabric capacity

This article describes the Microsoft Fabric capacity settings. The article is aimed at admins who want to understand how to manage their Microsoft Fabric capacities.

## Get to the capacity settings

To get to the capacity settings, follow these steps:

1. In the Power BI service, select the gear icon (**&#9881;**), and then select **Admin portal**.

2. In the Admin portal, select **Capacity settings**.

## View your capacity

The capacity settings page shows a list of all the capacities in your [tenant](licenses.md#tenant). At the top of the page you can see a list of the different Fabric capacity types. Select a capacity type to view all the capacities of that type in your tenant.

* **Power BI Premium** - A capacity that was bought as part of a Power BI Premium subscription. These capacities use P SKUs.

   >[!NOTE]
   >Power BI capacities are transitioning to Fabric. For more information, see [Power BI Premium transition to Microsoft Fabric](/power-bi/enterprise/service-premium-faq#power-bi-premium-transition-to-microsoft-fabric).

* **Power BI Embedded** - A capacity that was bought as part of a Power BI Embedded subscription. These capacities use A SKUs.

* **Trial** - A [Microsoft Fabric trial](../get-started/fabric-trial.md) capacity. These capacities use Trial SKUs.

* **Fabric capacity** - A Microsoft Fabric capacity. These capacities use F SKUs.

The rest of this article is divided to sections based on the different capacity types. To view the settings of your capacity, select the tab that matches your capacity type. If there's no tab to select, the section applies to all capacity types.

## Manage your capacity

This section lists basic capacity management tasks, such as creating a new capacity, changing a capacity's name and deleting a capacity.

### Create a new capacity

# [Power BI Premium](#tab/power-bi-premium)

To create a new Power BI Premium capacity, follow these steps:

1. In the **Capacity settings** page, select **Power BI Premium**.

2. Select **Set up new capacity**.

3. In the *Set up a new capacity* page, enter the following information:

   * **Capacity name** - Give your capacity a name.

   * **Capacity admins** - Add capacity admins.

   * **Region** - Select the region you want to create the capacity in.

   * **Available v-cores** - Select the number of v-cores you want to use for the capacity.

   * **Capacity size** - Select the size of the capacity.
      >[!NOTE]
      >If you select an EM size, you'll create a Power BI Embedded capacity.

4. Select **Create**.

# [Power BI Embedded](#tab/power-bi-embedded)

You can create a new Power BI Embedded capacity with an A SKU or an EM SKU.

#### Create a new Power BI Embedded capacity with an A SKU

To create a new Power BI Embedded capacity with an A SKU, follow these steps:

1. Log into Azure and search for **Power BI Embedded**.

2. Select **Create**.

3. In the *Basics* tab, enter the following information:

   * **Subscription** - Select the Azure subscription you want to use for the capacity.

   * **Resource group** - Select the Azure resource group you want to use for the capacity.

   * **Resource name** - Give your capacity a name.

   * **Location** - Select the region you want to create the capacity in.

   * **Size** - Select the size of the capacity.

   * **Power BI capacity administrator** - Select the capacity admins.

4. Select **Review + create**.

5. Review the details of your capacity, and then select **Create**.

#### Create a new Power BI Embedded capacity with an EM SKU

To create a new Power BI Embedded with an EM SKU, follow these steps:

1. In the **Capacity settings** page, select **Power BI Premium**.

2. Select **Set up new capacity**.

3. In the *Set up a new capacity* page, enter the following information:

   * **Capacity name** - Give your capacity a name.

   * **Capacity admins** - Add capacity admins.

   * **Region** - Select the region you want to create the capacity in.

   * **Available v-cores** - Select the number of v-cores you want to use for the capacity.

   * **Capacity size** - Select one of these sizes:
       * **EM1** - 1 v-core
       * **EM2** - 2 v-cores
       * **EM3** - 4 v-cores

4. Select **Create**.

# [Trial](#tab/trial)

To create a new Trial capacity, see [Microsoft Fabric trial](../get-started/fabric-trial.md#start-the-fabric-trial).

# [Fabric Capacity](#tab/fabric-capacity)

To create a new Fabric capacity, follow these steps:

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

---

### Change the name of your capacity

# [Power BI Premium](#tab/power-bi-premium)

To change the name of your Power BI Premium capacity, follow these steps:

1. In the **Capacity settings** page, select **Power BI Premium**.

2. From the list of capacities, select the gear icon (**&#9881;**) next to the capacity you want to change.

3. In the capacity's setting page, select the pencil icon next to the **Capacity name** field.

4. Enter the new name for the capacity, and then select the checkmark icon (**&check;*)*.

# [Power BI Embedded](#tab/power-bi-embedded)

You can't change a trial capacity's name.

# [Trial](#tab/trial)

You can't change a trial capacity's name.

# [Fabric Capacity](#tab/fabric-capacity)

You can't change a Fabric capacity's name.

---

### Add and remove admins

# [Power BI Premium](#tab/power-bi-premium)

To add or remove admins in a Power BI Premium capacity, follow these steps:

1. In the **Capacity settings** page, select **Power BI Premium**.

2. From the list of capacities, select the capacity you want to make changes to.

3. In the capacity's setting page, from the *Details tab*, select expand **Admin permissions**.

4. Add or remove admins from the text box.

5. Select **Apply**.

# [Power BI Embedded](#tab/power-bi-embedded)

To add or remove admins in a Power BI Embedded capacity, follow these steps:

1. In the **Capacity settings** page, select **Power BI Embedded**.

2. From the list of capacities, select the gear icon (**&#9881;**) next to the capacity you want to make changes to.

3. From the settings page, select the **Manage fabric capacities in Azure** link. Your Power BI Embedded capacity opens in Azure in a new tab.

4. Select **Capacity administrators** and do one of the following:

   * To add an admin, select **Add**, select the user or group to add as an admin, and then select **Select**.

   * To remove an admin, select the admin you want to remove, and then select **Delete**.

# [Trial](#tab/trial)

A [trial capacity](../get-started/fabric-trial.md#start-the-fabric-trial) is assigned to the user who signed up for the trial. To add or remove admins in a Trial capacity, follow these steps:

1. In the **Capacity settings** page, select **Trial**.

2. From the list of capacities, select the gear icon (**&#9881;**) next to the capacity you want to make changes to.

3. From the settings page, select the **Manage fabric capacities in Azure** link. Your Trial capacity opens in Azure in a new tab.

4. Select **Capacity administrators** and do one of the following:

   * To add an admin, select **Add**, select the user or group to add as an admin, and then select **Select**.

   * To remove an admin, select the admin you want to remove, and then select **Delete**.

# [Fabric Capacity](#tab/fabric-capacity)

To add or remove admins in a Fabric capacity, follow these steps:

1. In the **Capacity settings** page, select **Fabric Capacity**.

2. From the list of capacities, select the capacity you want to make changes to.

3. In the capacity's setting page, from the *Details tab*, select expand **Admin permissions**.

4. Add or remove admins from the text box.

5. Select **Apply**.

---

### Resize a capacity

# [Power BI Premium](#tab/power-bi-premium)

To resize a Power BI Premium capacity, follow these steps:

1. In the **Capacity settings** page, select **Power BI Premium**.

2. Select the capacity you want to resize.

3. Select **Change size**.

4. In the *Change size* window, from the **Capacity size** dropdown, select the new size for the capacity.

5. Select **Apply**.

# [Power BI Embedded](#tab/power-bi-embedded)

To resize a Power BI Embedded capacity, follow these steps:

1. From the list of Fabric capacities, select the gear icon (**&#9881;**) next to the capacity you want to delete.

2. In the capacity's setting page, select the link **Manage fabric capacities in Azure**. A list of your Fabric capacities in Azure opens in a new tab.

3. Select the capacity you want to resize.

4. In the capacity settings page, in the *Scale* section, select **Change size**.

5. Select the new size for the capacity.

6. Select **Resize**.

# [Trial](#tab/trial)

You can't resize a trial capacity.

# [Fabric Capacity](#tab/fabric-capacity)

To resize a Fabric capacity, see [Scale your capacity](../enterprise/scale-capacity.md).

---

### Delete a capacity

When you delete a capacity, the workspaces associated with the capacity are retained for seven days before they're deleted. If you have defined a [workspace retention policy](../admin/portal-workspaces.md#workspace-retention) your workspaces are retained for the period specified. For more information about what happens to your files when you delete a capacity, see [Fabric capacity deletion](../admin/service-admin-portal-capacity-settings.md#fabric-capacity-deletion).

Ongoing operations are stopped or canceled and scheduled operations are canceled.

# [Power BI Premium](#tab/power-bi-premium)

To delete a Power BI Premium capacity, follow these steps:

1. In the **Capacity settings** page, select **Power BI Premium**.

2. From the list of *Power BI Premium* capacities, select the gear icon (**&#9881;**) next to the capacity you want to delete.

3. In the capacity's setting page, select **Delete capacity**.

4. In the confirmation dialog, select **Delete**.

# [Power BI Embedded](#tab/power-bi-embedded)

To delete a Power BI Embedded capacity, follow these steps:

1. In the **Capacity settings** page, select **Power BI Embedded**.

2. From the list of *Power BI Embedded* capacities, select the gear icon (**&#9881;**) next to the capacity you want to delete.

3. In the capacity's setting page, select **Delete capacity**.

4. In the confirmation dialog, select **Delete**.

# [Trial](#tab/trial)

To delete a trial capacity, you need to cancel the trial. To cancel a trial, see [End a Fabric trial](../get-started/fabric-trial.md#end-a-fabric-trial).

# [Fabric Capacity](#tab/fabric-capacity)

To delete a *Fabric Capacity*, follow these steps:

1. From the list of Fabric capacities, select the gear icon (**&#9881;**) next to the capacity you want to delete.

2. In the capacity's setting page, select the link **Manage fabric capacities in Azure**. A list of your Fabric capacities in Azure opens in a new tab.

3. From the Fabric capacities list in Azure, select the capacity you want to delete by clicking its name.

4. Select **Delete**.

5. In the confirmation dialog, retype the capacity name, and then select **Delete**.

---

### Autoscale

# [Power BI Premium](#tab/power-bi-premium)

To enable autoscale on a Power BI Premium capacity, see [Using Autoscale with Power BI Premium](/power-bi/enterprise/service-premium-auto-scale).

# [Power BI Embedded](#tab/power-bi-embedded)

To enable autoscale on a Power BI Embedded capacity, see [Using Autoscale with Power BI Premium](/power-bi/enterprise/service-premium-auto-scale).

# [Trial](#tab/trial)

Autoscale isn't available for Trial capacities.

# [Fabric Capacity](#tab/fabric-capacity)

Autoscale isn't available for Fabric capacities.

---

## Capacity settings

After selecting a capacity, you can control its settings from these two tabs:

* **Details** - Capacity details are settings that are specific to the capacity.

* **Delegated tenant settings** - Tenant settings are delegated by Fabric admins to be managed by capacity admins. Changes to these settings only affect the capacity the changes are made in.

    >[!NOTE]
    >Delegated tenant settings are available for Power BI Premium and Fabric capacities.

To view the settings of a specific capacity, follow these steps:

1. Go to the capacity settings page.

2. Select the capacity type your capacity belongs to.

3. From the capacity list, select the capacity you want to view.

### Details

This table summarizes the actions you can take in the details section.

>[!NOTE]
>Trail capacities only have some of the settings listed in the table

| Details setting name                 | Description |
|--------------------------------------|-------------|
| Disaster Recovery                    | Enable [disaster recovery](/azure/reliability/reliability-fabric#set-up-disaster-recovery) for the capacity |
| Capacity usage report                | The usage report is replaced with the [capacity metrics app](metrics-app.md) |
| Notifications                        | Enable [notification](../admin/service-admin-premium-capacity-notifications.md) for your capacity |
| Contributor permissions              | Set up the ability to add workspaces to the capacity. Select one of these two options:<li>The entire organization</li><li>Specific users or security groups</li> |
| Admin permissions                    | Give specific users or security groups the ability to do the following:<li>Change capacity settings</li><li>Add contributors to the capacity</li><li>Add or remove workspaces from the capacity</li> |
| Power BI workloads                   | Configure [Power BI workloads](/power-bi/enterprise/service-admin-premium-workloads) for:<li>[Semantic models](/power-bi/enterprise/service-admin-premium-workloads#semantic-models)</li><li>[Paginated reports](/power-bi/enterprise/service-admin-premium-workloads#paginated-reports)</li><li>[AI](/power-bi/enterprise/service-admin-premium-workloads#ai-preview)</li> |
| Preferred capacity for My workspace  | Designate the capacity as the [default capacity for My workspaces](/power-bi/enterprise/service-admin-premium-manage#designate-a-default-capacity-for-my-workspaces)         |
| Data Engineering/Science Settings    | Allow workspace admins to set the size of their spark [pools](../data-engineering/workspace-admin-settings.md#pool) |
| Workspaces assigned to this capacity | Add or remove workspaces assigned to the capacity |

### Delegated tenant settings

[Delegating admin settings](../admin/admin-overview.md#delegate-admin-rights) can be used to grant granular access to features in the capacity. The delegated tenant settings section lists these tenant settings:

* Workload management tenant settings that are automatically delegated to the capacity.

* Tenant settings delegated by the Fabric Admin.

By default, delegated tenant settings inherit their configuration from the tenant. To override this configuration, follow these steps:

1. From the **Delegate tenant setting** list, open the setting you want to delegate permissions for.

2. Select the **Override tenant admin selection** checkbox.

3. Select **Enabled**

4. In the *Apply to* section, select one of the following options:

   * **All the users in capacity** - Delegate the setting to all the users in the capacity.

   * **Specific security groups** - Apply the setting to specific security groups. Enter the security groups you want to apply the setting to.

    To exclude specific security groups from the setting, select **Except specific security groups** and enter the security groups you want to exclude. This setting is optional and can be used with together with the *Apply to* setting.

5. Select **Apply**.

## Related content

* [Microsoft Fabric licenses](licenses.md)

* [About tenant settings](../admin//about-tenant-settings.md)
