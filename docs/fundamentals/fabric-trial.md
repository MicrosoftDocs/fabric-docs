---
title: Fabric trial capacity
description: Understand how the Fabric trial works. This includes starting a trial, ending a trial, and sharing a trial.
author: mihart
ms.reviewer: mihirwagle
ms.author: mihart
ms.topic: concept-article
ms.custom:
  - ignite-2024
ms.collection: ce-skilling-ai-copilot
ms.date: 01/29/2025
---

# Microsoft Fabric trial capacity

[!INCLUDE [new user recruitment](../includes/fabric-new-user-research.md)]

Microsoft Fabric is provided free of charge when you sign up for a Microsoft Fabric trial capacity. Your use of the Microsoft Fabric trial capacity includes access to the Fabric product workloads and the resources to create and host Fabric items. The Fabric trial lasts for 60 days unless canceled sooner.

> [!NOTE]
> If you're ready to purchase Fabric, visit the [Purchase Fabric page.](../enterprise/buy-subscription.md)

With one trial of a Fabric capacity, you get the following features:

- Full access to all of the Fabric workloads and features. There are a few key Fabric [features that aren't available on trial capacities](#about-the-trial-capacity).
- OneLake storage up to 1 TB.
- A license similar to Premium Per User (PPU)
- One capacity per trial. Other Fabric capacity trials can be started until a maximum, set by Microsoft, is met.
- The ability for users to create Fabric items and collaborate with others in the Fabric trial capacity.

Creating and collaborating in Fabric includes:

- Creating [Workspaces](workspaces.md) (folders) for projects that support Fabric capabilities.
- Sharing Fabric items, such as semantic models, warehouses, and notebooks, and collaborating on them with other Fabric users.
- Creating analytics solutions using Fabric items.

## About the trial capacity

When you start a trial of a Fabric capacity, your trial [capacity](../enterprise/licenses.md#capacity) has 64 capacity units (CU). You get the equivalent of an F64 capacity but there are a few key features that aren't available on trial capacities. These features include:
- [Copilot](./copilot-faq-fabric.yml)
- [Trusted workspace access](../security/security-trusted-workspace-access.md)
- [Managed private endpoints](https://blog.fabric.microsoft.com/blog/introducing-managed-private-endpoints-for-microsoft-fabric-in-public-preview)

## About the trial license

If you do not already have an assigned Power BI [Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq) license, you'll receive a Power BI [Individual Trial](/power-bi/fundamentals/service-self-service-signup-purchase-for-power-bi?tabs=trial#start-a-trial) when initiating a Fabric trial capacity. This individual trial enables you to perform the actions and use the features that a PPU license enables. Your Account manager still displays the nontrial licenses assigned to you. But in order to make full use of Fabric, your Fabric trial includes the Power BI Individual trial.

## Use your trial

To begin using your trial of a Fabric capacity, add items to **My workspace** or create a new workspace. Assign that workspace to your trial capacity [using the *Trial* license mode](workspaces.md#license-mode), and then all the items in that workspace are saved and executed in that capacity. Invite colleagues to those workspaces so they can share the trial experience with you. If you, as the capacity administrator, enable **Contributor permissions**, then others can also assign their workspaces to your trial capacity. For more information about sharing, see [Share trial capacities](#share-trial-capacities).

## Existing Power BI users

If you're an existing Power BI user, you can skip to [Start the Fabric trial](#start-the-fabric-capacity-trial). If you're already enrolled in a Power BI trial, you don't see the option to **Start trial** or **Free trial** in your Account manager. 

## Users who are new to Power BI

The Fabric trial requires a per-user Power BI license. Navigate to [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com/?pbi_source=learn-get-started-fabric-trial) to sign up for a Fabric (Free) license. Once you have the free license, you can [begin participating in the Fabric capacity trial](#start-the-fabric-capacity-trial).  

You may already have a license and not realize it. For example, some versions of Microsoft 365 include a Fabric (Free) or Power BI Pro license. Open Fabric (app.fabric.microsoft.com) and select your Account manager to see if you already have a license, and which license it is. Read on to see how to open your Account manager. 

## Start the Fabric capacity trial

You can start a trial several different ways. The first two methods make you the Capacity administrator of the trial capacity.  
- Sign up for a trial capacity. You manage who else can use your trial by giving coworkers permission to create workspaces in your trial capacity. Or, by assigning workspaces to the trial capacity, which automatically adds coworkers (with roles in those workspaces) to the trial capacity.
- Attempt to use a Fabric feature. If your organization enabled self-service, attempting to use a Fabric feature launches a Fabric trial.
- Join a trial started by a coworker by adding your workspace to that existing trial capacity. This action only is possible if the owner gives you, or gives the entire organization, **Contributor permissions** to the trial.

For more information, see [Sharing trial capacities](#share-trial-capacities).

Follow these steps to start your Fabric capacity trial and become the Capacity administrator of that trial.

1. Open the [Fabric homepage](https://app.fabric.microsoft.com/home?pbi_source=learn-get-started-fabric-trial) and select the Account manager.

    :::image type="content" source="media/fabric-trial/fabric-home-page.png" alt-text="Screenshot of the Microsoft Fabric homepage with the Account manager outlined in red.":::

1. In the Account manager, select **Free trial**. If you don't see **Free trial** or **Start trial** or a **Trial status**, trials might be disabled for your tenant.

    > [!NOTE]
    > If the Account manager already displays **Trial status**, you may already have a **Power BI trial** or a **Fabric (Free) trial** in progress. To test this out, attempt to use a Fabric feature. For more information, see [Start using Fabric](#other-ways-to-start-a-microsoft-fabric-trial).

    :::image type="content" source="media/fabric-trial/me-control.png" alt-text="Screenshot of the Microsoft Fabric Account manager.":::

1. If prompted, agree to the terms and then select **Start trial**.

1. Once your trial capacity is ready, you receive a confirmation message. Select **Got it** to begin working in Fabric. You're now the Capacity administrator for that trial capacity. To learn how to share your trial capacity using workspaces, see [Share trial capacities](#share-trial-capacities)

1. Open your Account manager again. Notice the heading for **Trial status**. Your Account manager keeps track of the number of days remaining in your trial. You also see the countdown in your Fabric menu bar when you work in a product workload.

    :::image type="content" source="media/fabric-trial/trial-status-me-control.png" alt-text="Screenshot of the Microsoft Fabric trial status.":::

Congratulations. You now have a Fabric trial capacity that includes a Power BI individual trial (if you didn't already have a Power BI *paid* license) and a Fabric trial capacity. To share your capacity, see [Share trial capacities.](#share-trial-capacities)

## Other ways to start a Microsoft Fabric trial

In some situations, your Fabric administrator enables Microsoft Fabric for the tenant but you don't have access to a capacity that has Fabric enabled. You have another option for enabling a Fabric capacity trial. When you try to create a Fabric item in a workspace that you own (such as **My Workspace**) and that workspace doesn't support Fabric items, you receive a prompt to start a trial of a Fabric capacity. If you agree, your trial starts and your **My workspace** is upgraded to a trial capacity workspace. You're the Capacity administrator and can add workspaces to the trial capacity. 

## Share trial capacities

Each standard trial of a Fabric capacity includes 64 capacity units. The person who starts the trial becomes the Capacity administrator for that trial capacity. Other users on the same tenant can also start a Fabric trial and become the Capacity administrator for their own trial capacity. Hundreds of customers can use each trial capacity. But, Microsoft sets a limit on the number of trial capacities that can be created on a single tenant. To help others in your organization try out Fabric, share your trial capacity. There are several ways to share.  

### Share using Contributor permissions

Enabling the **Contributor permissions** setting allows other users to assign their workspaces to your trial capacity. If you're the Capacity or Fabric administrator, enable this setting from the Admin portal. 
1. From the top right section of the Fabric menubar, select the cog icon to open **Settings**.
2. Select **Admin portal** > **Trial**. **Enabled for the entire organization** is set by default.

Enabling **Contributor permissions** means that any user with an Admin role in a workspace can assign that workspace to the trial capacity and access Fabric features. Apply these permissions to the entire organization or apply them to only specific users or groups. 

### Share by assigning workspaces

If you're the Capacity administrator, assign the trial capacity to multiple workspaces. Anyone with access to one of those workspaces is now also participating in the Fabric capacity trial. 
1. Open **Workspaces** and select the name of a Premium workspace.
2. Select the ellipses(...) and choose **Workspace settings** > **Premium** > **Trial**.

    :::image type="content" source="media/fabric-trial/migrate-trial.png" alt-text="Screenshot of the trial workspace settings.":::

For more information, see [Use Workspace settings](workspaces.md#license-mode).  

## Look up the trial Capacity administrator

Contact your Capacity administrator to request access to a trial capacity or to check whether your organization has the Fabric tenant setting enabled. Ask your Fabric administrator to use the Admin portal to look up your Capacity administrator. 

If you're the capacity or Fabric administrator, from the upper right corner of Fabric, select the gear icon. Select **Admin portal**. For a Fabric trial, select **Capacity settings** and then choose the **Trial** tab. 

:::image type="content" source="media/fabric-trial/fabric-admin.png" alt-text="Screenshot of Admin center showing the Capacity settings screen.":::

## End a Fabric trial

End a Fabric capacity trail by canceling, letting it expire, or purchasing the full Fabric experience. Only capacity and Fabric admins can cancel the trial of a Fabric capacity. Individual users don't have this ability. 

One reason to cancel a trial capacity is when the capacity administrator of a trial capacity leaves the company. Since Microsoft limits the number of trial capacities available per tenant, you might want to remove the unmanaged trial to make room to sign up for a new trial.

When you cancel a free Fabric capacity trial, and don't move the workspaces and their contents to a new capacity that supports Fabric:

- Microsoft can't extend the Fabric capacity trial, and you might not be able to start a new trial using your same user ID. Other users can still start their own Fabric trial capacity. 
- All licenses return to their original versions. You no longer have the equivalent of a PPU license. The license mode of any workspaces assigned to that trial capacity changes to Power BI Pro. 
- All Fabric items in the workspaces become unusable and are eventually deleted. Your Power BI items are unaffected and still available when the workspace license mode returns to Power BI Pro.  
- You can't create workspaces that support Fabric capabilities.
- You can't share Fabric items, such as machine learning models, warehouses, and notebooks, and collaborate on them with other Fabric users.
- You can't create any other analytics solutions using these Fabric items.

If you want to retain your data and continue to use Microsoft Fabric, [purchase a capacity](../enterprise/buy-subscription.md) and migrate your workspaces to that capacity. Or, migrate your workspaces to a capacity that you already own that supports Fabric items.

For more information, see [Canceling, expiring, and closing](../enterprise/fabric-close-end-cancel.md).

### The trial expires 

A standard Fabric capacity trial lasts 60 days. If you don't upgrade to a paid Fabric capacity before the end of the trial period, non-Power BI Fabric items are removed according to the [retention policy upon removal](../admin/portal-workspaces.md#workspace-states). You have seven days after the expiration date to save your non-Power BI Fabric items by assigning the workspaces to capacity that supports Fabric.

To retain your Fabric items, before your trial ends, [purchase Fabric](https://aka.ms/fabricibiza).

### Cancel your Fabric capacity trial - non admins

Only the capacity or Fabric administrator can cancel the Fabric capacity trial. 

### Cancel the Fabric trial - Capacity and Fabric admins

Capacity admins and Fabric admins can cancel a trial capacity. The user who starts a trial automatically becomes the capacity administrator. The Fabric administrator has full access to all Fabric management tasks. All Fabric items (non-Power BI items) in those workspaces become unusable and are eventually deleted

#### Cancel a trial using your Account manager

As a Capacity admin, you can cancel your free Fabric trial capacity from your Account manager. Canceling the trial this way ends the trial for yourself and anyone else you invited to the trial. 

Open your Account Manager and select **Cancel trial**. 

:::image type="content" source="media/fabric-trial/cancel-trial.png" alt-text="Screenshot of the Cancel trial button in Account manager.":::

### Cancel the Fabric trial using the Admin portal

As a Capacity or Fabric administrator, you can use the Admin portal to cancel a trial of a Fabric capacity. 

Select **Settings** > **Admin portal** > **Capacity settings**. Then choose the **Trials** tab. Select the cog icon for the trial capacity that you want to delete. 

:::image type="content" source="media/fabric-trial/fabric-delete-trial.png" alt-text="Screenshot of the Trial tab in the Admin portal.":::

## Considerations and limitations

**I am unable to start a trial**

If you don't see the **Start trial** button in your Account manager:

- Your Fabric administrator might disable access, and you can't start a Fabric trial. To request access, [contact your Fabric administrator](#look-up-the-trial-capacity-administrator). You can also start a trial using your own tenant. For more information, see [Sign up for Power BI with a new Microsoft 365 account](/power-bi/enterprise/service-admin-signing-up-for-power-bi-with-a-new-office-365-trial).

- You're an existing Power BI trial user, and you don't see **Start trial** in your Account manager. You can start a Fabric trial by attempting to [create a Fabric item](#other-ways-to-start-a-microsoft-fabric-trial). When you attempt to create a Fabric item, you receive a prompt to start a Fabric trial. If you don't see this prompt, it's possible that this action is deactivated by your Fabric administrator.

If you don't have a work or school account and want to sign up for a free trial. 

- For more information, see [Sign up for Power BI with a new Microsoft 365 account](/power-bi/enterprise/service-admin-signing-up-for-power-bi-with-a-new-office-365-trial).

If you do see the **Start trial** button in your Account manager:

- You might not be able to start a trial if your tenant exhausted its limit of trial capacities. If that is the case, you have the following options:
  - Request another trial capacity user to share their trial capacity workspace with you. [Give users access to workspaces](../fundamentals/give-access-workspaces.md).
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

:::image type="content" source="media/fabric-trial/migrate-trial.png" alt-text="Screenshot of the trial workspace settings.":::

## Related content

- Learn about [licenses](../enterprise/licenses.md)

- Review Fabric [terminology](fabric-terminology.md)
