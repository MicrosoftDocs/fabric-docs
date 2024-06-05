---
title: Fabric trial capacity
description: Understand how the Fabric trial works.
author: mihart
ms.author: mihirwagle
ms.topic: conceptual
ms.custom:
ms.date: 05/23/2024
---

# Microsoft Fabric trial capacity


Microsoft Fabric is provided free of charge when you sign up for a Microsoft Fabric trial capacity. Your use of the Microsoft Fabric trial capacity includes access to the Fabric product workloads and the resources to create and host Fabric items. The Fabric trial lasts for 60 days.

> [!NOTE]
> If you're ready to purchase Fabric, visit the [Purchase Fabric page.](../enterprise/buy-subscription.md)

With one Fabric trial capacity, you get the following features:

- Full access to all of the Fabric workloads and features. There are a few key Fabric features that aren't available on trial capacities. These include Co-Pilot, Trusted workspace access, and Managed private endpoints.
- OneLake storage up to 1 TB.
- The ability for users to create Fabric items and collaborate with others in the Fabric trial capacity.

Creating and collaborating in Fabric includes:
- Creating [Workspaces](workspaces.md) (folders) for projects that support Fabric capabilities.
- Sharing Fabric items, such as semantic models, warehouses, and notebooks, and collaborating on them with other Fabric users.
- Creating analytics solutions using Fabric items.

> [!NOTE]
> One capacity per trial. Additional Fabric capacity trials can be started until a maximum, set by Microsoft, is met.

When you start a Fabric capacity trial, your trial [capacity](../enterprise/licenses.md#capacity) has 64 capacity units (CU). You get the equivalent of an F64 capacity but there are a few key features that aren't available on trial capacities. These include [Co-Pilot](/fabric/get-started/copilot-faq-fabric), [Trusted workspace access](../security/security-trusted-workspace-access.md), and [Managed private endpoints](https://blog.fabric.microsoft.com/blog/introducing-managed-private-endpoints-for-microsoft-fabric-in-public-preview). 

To begin using your Fabric trial capacity, add items to **My workspace** or create a new workspace. Assign that workspace to your trial capacity [using the *Trial* license mode](workspaces.md#license-mode), and then all the items in that workspace are saved and executed in that capacity. Invite colleagues to those workspaces so they can share the trial experience with you.

Although you don't actually receive a new license, the actions that you can perform and the features that you can user are similar to [Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq] during the trial. When you share your workspace that's in trial capacity, the permissions of workspace users are also upgraded. Your Account manager still displays your nontrial license. But in order to make full use of Fabric, your trial includes the equivalent of a PPU license. 

## Existing Power BI users

If you're an existing Power BI user, you can skip to [Start the Fabric trial](#start-the-fabric-capacity-trial). If you're already enrolled in a Power BI trial, you don't see the option to **Start trial" in your Account manager. Instead, open Fabric and attempt to use a feature that requires a Fabric capacity. Fabric prompts you to start a Fabric trial capacity. 

## Users who are new to Power BI

The Fabric trial requires a per-user Power BI license. Navigate to [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com) to sign up for a Fabric (Free) license. Once you have the free license, you can [begin participating in the Fabric capacity trial](#start-the-fabric-capacity-trial).  

You may already have a license and not realize it. For example, some versions of Microsoft 365 include a Fabric (Free) or Power BI Pro license. Open Fabric (app.fabric.microsoft.com) and select your Account manager to see if you already have a license, and which license it is. Read on to see how to open your Account manager. 

## Start the Fabric capacity trial

Follow these steps to start your Fabric capacity trial.

1. Open the [Fabric homepage](https://app.fabric.microsoft.com/home) and select the Account manager.

    :::image type="content" source="media/fabric-trial/fabric-home-page.png" alt-text="Screenshot of the Microsoft Fabric homepage with the Account manager outlined in red.":::

3. In the Account manager, select **Start trial**. If you don't see the *Start trial* button, trials might be disabled for your tenant.

> [!NOTE]
> If the Account manager already displays **Trial status**, you may already have a **Power BI trial** in progress.  In this case, attempt to use a Fabric feature to generate a prompt to start a Fabric trial capacity too.  For more information, see [x](#other-ways-to-start-a-microsoft-fabric-trial).

:::image type="content" source="media/fabric-trial/me-control.png" alt-text="Screenshot of the Microsoft Fabric Account manager.":::

5. If prompted, agree to the terms and then select **Start trial**.

6. Once your trial capacity is ready, you receive a confirmation message. Select **Got it** to begin working in Fabric. You're now the Capacity administrator for that trial capacity. To learn how to share your trial capacity using workspaces, see [Share trial capacities](#share-trial-capacities)

7. Open your Account manager again. Notice the heading for **Trial status**. Your Account manager keeps track of the number of days remaining in your trial. You also see the countdown in your Fabric menu bar when you work in a product workload.

    :::image type="content" source="media/fabric-trial/trial-status-me-control.png" alt-text="Screenshot of the Microsoft Fabric trial status.":::

Congratulations. You now have a Fabric trial capacity that includes a Power BI individual trial (if you didn't already have a Power BI *paid* license) and a Fabric trial capacity. To share your capacity, see [Share trial capacities.](#share-trial-capacities)

## Other ways to start a Microsoft Fabric trial

In some situations, your Fabric administrator [enables Microsoft Fabric for the tenant](../admin/fabric-switch.md#enable-for-your-tenant) but you don't have access to a capacity that has Fabric enabled. You have another option for enabling a Fabric capacity trial. When you try to create a Fabric item in a workspace that you own (such as **My Workspace**) and that workspace doesn't support Fabric items, you're prompted to start a Fabric capacity trial. If you agree, your Fabric capacity trial starts and your **My workspace** is upgraded to a trial capacity workspace. You're now the Capacity administrator and can add workspaces to the trial capacity. 

## Share trial capacities

Each standard Fabric trial includes 64 capacity units. The person who starts the trial becomes the Capacity administrator for only that trial capacity. And that Capacity administrator can share the trial by assigning workspaces to that specific trial capacity.  

Other users on the same tenant can also start a Fabric trial and become the Capacity administrator for their trial capacity. Microsoft sets a limit on the number of trial capacities that can be created on a single tenant. ​So sharing workspaces in trial capacities is essential to allow your colleagues to participate in the Fabric capacity trial. Each Fabric trial capacity can be used by hundreds of users.

The Capacity administrator can assign the trial capacity to multiple workspaces. Anyone with access to one of those workspaces is now also participating in the Fabric capacity trial. 

If you're the Capacity administrator, assign workspaces to the trial capacity two different ways. 

- [Use the Admin center **Capacity settings**](give-access-workspaces.md). All users with access to those workspaces are now able to use that trial capacity. The Fabric administrator can edit **Capacity settings** as well.
    :::image type="content" source="media/fabric-trial/fabric-admin-portal.png" alt-text="Screenshot of the Admin center showing Capacity settings selected.":::

- [Use Workspace settings](create-workspaces.md).  

    :::image type="content" source="media/fabric-trial/migrate-to-trial.png" alt-text="Screenshot of the trial workspace settings.":::

If the Fabric tenant switch is enabled, users in that tenant can view, consume, and add Fabric content. If the Fabric tenant switch is disabled, users in that tenant can only view and consume Fabric content. For more information, see [Fabric tenant setting](#look-up-the-fabric-tenant-switch-setting).

## Look up the Fabric tenant switch setting

If you're a Capacity administrator or a tenant admin, you can view, verify, or change the Fabric switch. If you need help, [contact the Capacity administrator directly](#look-up-the-trial-capacity-administrator).

:::image type="content" source="media/fabric-trial/fabric-tenant-setting.png" alt-text="Screenshot of the Admin portal with Tenant settings outlined in red and an arrow pointing to the word Enabled.":::

## Look up the trial Capacity administrator

Contact your Capacity administrator to request access to a trial capacity or to check whether your organization has the Fabric tenant setting enabled. Ask your Fabric administrator to use the Admin portal to look up your Capacity administrator. 

If you're the capacity or Fabric administrator, from the upper right corner of Fabric, select the gear icon. Select **Admin portal**. For a Fabric trial, select *Capacity settings** and then choose the **Trial** tab. 

:::image type="content" source="media/fabric-trial/fabric-admin.png" alt-text="Screenshot of Admin center showing the Capacity settings screen.":::

## End a Fabric trial

End a Fabric capacity trail by canceling, letting it expire, or purchasing the full Fabric experience. Only capacity admins can cancel the trial but ndividual users don't have this ability. All licenses return to their original versions. You no longer have the equivalent of a PPU license. If you want to retain your data ad continue to use Microsoft Fabric, [purchase a capacity](../enterprise/buy-subscription.md) and migrate your workspaces to that capacity. <!-- For more information, see [Canceling, expiring, and closing](../enterprise/fabric-close-end-cancel.md). -->

### The trial expires 

A standard Fabric capacity trial lasts 60 days. If you don't upgrade to a paid Fabric capacity before the end of the trial period, non-Power BI Fabric items are removed according to the [retention policy upon removal](../admin/portal-workspaces.md#workspace-states). You have seven days after the expiration date to save your non-Power BI Fabric items by assigning the workspaces to an active capacity.

To retain your Fabric items, before your trial ends, [purchase Fabric](https://aka.ms/fabricibiza).

### Cancel your Fabric capacity trial - non admins

Only the capacity administrator can cancel the Fabric capacity trial. 

### Cancel the Fabric trial - Capacity admins

To cancel your free Fabric trial capacity, open your Account Manager and select **Cancel trial**. Once canceled, Microsoft can't extend the Fabric capacity trial, and you may not be able to start a new trial using your same user ID. Other users can still start their own Fabric trial capacity. You can also [purchase a capacity](../enterprise/buy-subscription.md) and migrate your workspaces to that capacity. If your have workspaces with Fabric items, assign those workspaces to the new trial or purchased capacity within seven days.

:::image type="content" source="media/fabric-trial/cancel-trial.png" alt-text="Screenshot of the Cancel trial button in Account manager.":::

When you cancel a free Fabric capacity trial, the trial capacity, with all of its workspaces and their contents, is deleted. In addition, you can't:
	
- Create workspaces that support Fabric capabilities.
- Share Fabric items, such as machine learning models, warehouses, and notebooks, and collaborate on them with other Fabric users.
- Create analytics solutions using these Fabric items.
 
    ![image](https://github.com/mihart/fabric-docs-pr/assets/4922988/ad0426d6-efff-4bd3-8563-da2df31279dc)


## Considerations and limitations

**I am unable to start a trial**

If you don't see the **Start trial** button in your Account manager:

- Your Fabric administrator might disable access, and you can't start a Fabric trial. To request access, [contact your Fabric administrator](#look-up-the-trial-capacity-administrator). You can also start a trial using your own tenant. For more information, see [Sign up for Power BI with a new Microsoft 365 account](/power-bi/enterprise/service-admin-signing-up-for-power-bi-with-a-new-office-365-trial).

- You're an existing Power BI trial user, and you don't see **Start trial** in your Account manager. You can start a Fabric trial by attempting to [create a Fabric item](#other-ways-to-start-a-microsoft-fabric-trial). When you attempt to create a Fabric item, you're prompted to start a Fabric trial. If you don't see this prompt, it's possible that this action is deactivated by your Fabric administrator.

If you don't have a work or school account and want to sign up for a free trial. 

- For more information, see [Sign up for Power BI with a new Microsoft 365 account](/power-bi/enterprise/service-admin-signing-up-for-power-bi-with-a-new-office-365-trial).

If you do see the **Start trial** button in your Account manager:

- You might not be able to start a trial if your tenant exhausted its limit of trial capacities. If that is the case, you have the following options:
- Request another trial capacity user to share their trial capacity workspace with you. [Give users access to workspaces](give-access-workspaces.md)
  - [Purchase a Fabric capacity from Azure](https://aka.ms/fabricibiza) by performing a search for *Microsoft Fabric*.

- To increase tenant trial capacity limits, [reach out to your Fabric administrator](#look-up-the-trial-capacity-administrator) to create a Microsoft support ticket.

**In Workspace settings, I can't assign a workspace to the trial capacity**

This bug occurs when the Fabric administrator turns off trials after you start a trial. To add your workspace to the trial capacity, open the Admin portal by selecting it from the gear icon in the top menu bar. Then, select **Trial > Capacity settings** and choose the name of the capacity. If you don't see your workspace assigned, add it here.

:::image type="content" source="media/fabric-trial/capacity-wk-assignment.png" alt-text="Screenshot of the Capacities page in the Admin portal.":::

**What is the region for my Fabric trial capacity?**

If you start the trial using the Account manager, your trial capacity is located in the home region for your tenant. See [Find your Fabric home region](../admin/find-fabric-home-region.md) for information about how to find your home region, where your data is stored.

**What impact does region have on my Fabric trial?**

Not all regions are available for the Fabric trial. Start by [looking up your home region](../admin/find-fabric-home-region.md) and then check to [see if your region is supported for the Fabric trial](../admin/region-availability.md). If your home region doesn't have Fabric enabled, don't use the Account manager to start a trial. To start a trial in a region that isn't your home region, follow the steps in [Other ways to start a Fabric trial](#other-ways-to-start-a-microsoft-fabric-trial). If you already started a trial from Account manager, cancel that trial and follow the steps in [Other ways to start a Fabric trial](#other-ways-to-start-a-microsoft-fabric-trial) instead.

**Can I move my tenant to another region?**

You can't move your organization's tenant between regions by yourself. If you need to change your organization's default data location from the current region to another region, you must contact support to manage the migration for you. For more information, see [Move between regions](/power-bi/support/service-admin-region-move).

**Fabric trial capacity availability by Azure region**

To learn more about regional availability for Fabric trials, see [Fabric trial capacities are available in all regions.](../admin/region-availability.md)

**How is the Fabric trial different from an individual trial of Power BI paid?**

A per-user trial of Power BI paid allows access to the Fabric landing page. Once you sign up for the Fabric trial, you can use the trial capacity for storing Fabric workspaces and items and for running Fabric workloads. All rules guiding [Power BI licenses](/power-bi/fundamentals/service-features-license-type) and what you can do in the Power BI workload remain the same. The key difference is that a Fabric capacity is required to access non-Power BI workloads and items.

**Autoscale**

The Fabric trial capacity doesn't support autoscale. If you need more compute capacity, you can purchase a Fabric capacity in Azure.

**For existing Synapse users**

- The Fabric trial is different from a Proof of Concept (POC). A Proof of Concept (POC) is standard enterprise vetting that requires financial investment and months' worth of work customizing the platform and using fed data. The Fabric trial is free for users and doesn't require customization. Users can sign up for a free trial and start running product workloads immediately, within the confines of available capacity units.

- You don't need an Azure subscription to start a Fabric trial. If you have an existing Azure subscription, you can purchase a (paid) Fabric capacity.

**For existing Power BI users**

Trial Capacity administrators can migrate existing workspaces into a trial capacity using workspace settings and choosing **Trial** as the license mode. To learn how to migrate workspaces, see [create workspaces](create-workspaces.md).

:::image type="content" source="media/fabric-trial/migrate-to-trial.png" alt-text="Screenshot of the trial workspace settings.":::

## Related content

- Learn about [licenses](../enterprise/licenses.md)

- Review Fabric [terminology](fabric-terminology.md)
