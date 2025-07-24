---
title: Fabric trial capacity
description: Understand how the Fabric trial works. This includes starting a trial, ending a trial, and sharing a trial.
author: julcsc
ms.reviewer: alpowers, mibruhje
ms.author: juliacawthra
ms.topic: concept-article
ms.custom: fabric-cat
ms.collection: ce-skilling-ai-copilot
ms.date: 07/23/2025
ms.update-cycle: 180-days
---

# Try Microsoft Fabric for free

The Microsoft Fabric trial gives you **free, full-featured access for 60 days** to explore everything Fabric has to offer—across data engineering, data science, real-time analytics, business intelligence, and more. Whether you're new to Fabric or coming from the product to learn more, this trial is your gateway to understanding how Fabric brings all your data and analytics tools together in one place.

> **Quick start**: [Start your Fabric trial](#start-your-fabric-trial)

## What's included—and what's not

Your trial is configured with either an F4 [capacity](../enterprise/licenses.md#capacity) (4 capacity units) or an F64 capacity (64 capacity units) and behaves like a Premium Per User (PPU) license. 

> [!NOTE]
> If your trial currently has 4 capacity units, you might be eligible to increase to 64 capacity units. For more information, see [Increase trial capacity](#increase-trial-capacity).

With your trial capacity, you can:

- Use all Fabric workloads, including **Data Factory**, **Synapse Data Engineering**, **Real-Time Analytics**, and **Power BI**.
- Create and share **semantic models**, **pipelines**, **notebooks**, **reports**, and more.
- Collaborate in **workspaces** and monitor usage with the **Microsoft Fabric Capacity Metrics app**.
- Store up to **1 TB of data** in OneLake.

However, some features are not available:

- Copilot and Trusted Workspace Access are not supported.
- Private Link is disabled.
- Region selection is not available—trial capacity is automatically created in your tenant’s home region.
- Only one trial capacity per user is allowed.

> [!NOTE]
> The [Fabric Analyst in a Day (FAIAD)](https://aka.ms/LearnFAIAD) workshop is a free, hands-on training designed for analysts working with Power BI and Microsoft Fabric. You can get hands-on experience on how to analyze data, build reports, using Fabric. It covers key concepts like working with lakehouses, creating reports, and analyzing data in the Fabric environment.

## When your Fabric trial ends

Your Microsoft Fabric trial lasts for 60 days, unless you cancel it earlier. As the trial nears its end, you’ll see notifications in the Fabric portal and in the **Capacity settings** page of the Admin portal, helping you track how much time remains.

Once the trial expires:

- Access to the trial capacity is revoked. Any workspaces assigned to the trial capacity will no longer be accessible unless they are reassigned to a paid capacity.
- Fabric items (like reports, notebooks, and pipelines) remain in your tenant, but they become inactive until reassigned to a valid capacity.
- You will not lose your data. All content remains stored in OneLake and can be reactivated by assigning it to a paid Fabric capacity.
- You can upgrade at any time to a paid Fabric SKU (F64 or higher) to continue using your workspaces and items without interruption.

Read more about [ending your trial](#end-a-fabric-trial).

> [!TIP]
> To check your trial status or expiration date, go to **Admin portal > Capacity settings > Trial**.

If you’re ready to continue using Fabric, visit the [Purchase Fabric page](../enterprise/buy-subscription.md) to explore your options.

To learn more about limitations and get answers to frequently asked questions about the Fabric trial, see [the FAQ](#frequently-asked-questions).

<a id="start-the-fabric-capacity-trial"></a>

## Start your Fabric capacity trial

You can start a trial several different ways. The first two methods make you the Capacity administrator of the trial capacity.  

- **Method 1**: Start a new trial capacity from the Account manager
- **Method 2**: Trigger a new trial capacity by trying to use a Fabric feature
- **Method 3**: Join an existing trial capacity

### Method 1: Start a new trial capacity from the Account manager

You can sign up for a trial capacity. You manage who else can use your trial by giving coworkers permission to create workspaces in your trial capacity. Assigning workspaces to the trial capacity automatically adds coworkers (with roles in those workspaces) to the trial capacity. To start your Fabric capacity trial and become the Capacity administrator of that trial, follow these steps:

1. To open your Account manager, select the tiny photo from the upper-right corner of the [Fabric homepage](https://app.fabric.microsoft.com/home?pbi_source=learn-get-started-fabric-trial). 

    :::image type="content" source="media/fabric-trial/fabric-home-page.png" lightbox="media/fabric-trial/fabric-home-page.png" alt-text="Screenshot of the Microsoft Fabric homepage with the Account manager outlined in red.":::

1. In the Account manager, select **Start trial**. If you don't see **Start trial**, **Free trial**, or a **Trial status**, trials might be disabled for your tenant.

    > [!NOTE]
    > If the Account manager already displays **Trial status**, you might already have a **Power BI trial** or a **Fabric (Free) trial** in progress. To test this out, attempt to use a Fabric feature. For more information, see [Start using Fabric](#other-ways-to-start-a-microsoft-fabric-trial).

    :::image type="content" source="media/fabric-trial/me-control.png" lightbox="media/fabric-trial/me-control.png" alt-text="Screenshot of the Microsoft Fabric Account manager.":::

1. If prompted, agree to the terms and then select **Start trial**.
1. Within the **Activate your 60-day free Fabric trial** capacity prompt, review the **Trial capacity region**. You can either accept the default home region or update it to a new region location that best suits your needs. Once you make your selection, agree to the terms and conditions, then select **Activate**.

   > [!IMPORTANT]
   > When planning your region deployment for Fabric capacities, it's important to make the appropriate selection from the outset. If you decide to move a workspace containing Fabric items to a different region after your trial is created, you need to delete all existing Fabric items before proceeding. For detailed instructions, see [Moving your data around](../admin/portal-workspaces.md#moving-data-around).
   >
   > To ensure the best performance and resource management, we recommend deploying your capacity in a region where your existing resources are already located. This approach minimizes network latency, reduces ingress and egress charges, and enhances overall reliability.

1. Once your trial capacity is ready, you receive a confirmation message. Select **Fabric Home Page** to begin a guided walkthrough of Fabric. You're now the Capacity administrator for that trial capacity. To learn how to share your trial capacity using workspaces, see [Share trial capacities](#share-trial-capacities).

Congratulations. You now have a Fabric trial capacity that includes a Power BI individual trial (if you didn't already have a Power BI *paid* license) and a Fabric trial capacity. To share your capacity, see [Share trial capacities.](#share-trial-capacities)

### Method 2: Trigger a Fabric trial by trying to use a Fabric feature

If your organization enabled self-service, attempting to use a Fabric feature launches a Fabric trial. If your Fabric administrator enabled Microsoft Fabric for the tenant but you still don't have access to a Fabric-enabled capacity, follow these steps:

1. Try to create a Fabric item in a workspace that you own (such as **My Workspace**) that doesn't currently support Fabric items.
1. Follow the prompt to start a trial of a Fabric capacity.

Once you agree, your trial starts and your **My workspace** is upgraded to a trial capacity workspace. You're the Capacity administrator and can add workspaces to the trial capacity.

<a id="other-ways-to-start-a-microsoft-fabric-trial"></a>

### Method 3: Join an existing trial

You can join a trial started by a coworker by adding your workspace to that existing trial capacity. This action only is possible if the owner gives you or the entire organization **Contributor permissions** to the trial.

For more information, see [Sharing trial capacities](#share-trial-capacities).

## Start using your trial

To start using your trial of a Fabric capacity, add items to **My workspace** or create a new workspace. Assign that workspace to your trial capacity [using the *Trial* license mode](workspaces.md#license-mode), and then all the items in that workspace are saved and executed in that capacity. Invite colleagues to those workspaces so they can share the trial experience with you. If you, as the Capacity administrator, enable **Contributor permissions**, then others can also assign their workspaces to your trial capacity. For more information about sharing, see [Share trial capacities](#share-trial-capacities).

- **Existing Power BI users**: If you're an existing Power BI user, jump to [Start the Fabric trial](#start-the-fabric-capacity-trial). 
  - If you're already enrolled in a Power BI trial, you don't see the option to **Start trial** or **Free trial** in your Account manager.
- **New Power BI users**: The Fabric trial requires a per-user Power BI license. Navigate to [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com/?pbi_source=learn-get-started-fabric-trial) to sign up for a Fabric (Free) license. Once you have the free license, you can [begin participating in the Fabric capacity trial](#start-the-fabric-capacity-trial).  
  - You might already have a license and not realize it. For example, some versions of Microsoft 365 include a Fabric (Free) or Power BI Pro license. Open Fabric [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com) and select your Account manager to see if you already have a license, and which license it is. Read on to see how to open your Account manager.

## Get the status of your trial

To see the status of your trial, open your Account manager again and look for the **Trial status**. Your Account manager keeps track of the number of days remaining in your trial. You can also see the countdown in the Fabric menu bar.

:::image type="content" source="media/fabric-trial/trial-status-me-control.png" lightbox="media/fabric-trial/trial-status-me-control.png" alt-text="Screenshot of the Microsoft Fabric trial status.":::

## Share trial capacities

Each standard trial of a Fabric capacity includes 64 capacity units. The person who starts the trial becomes the Capacity administrator for that trial capacity. Other users on the same tenant can also start a Fabric trial and become the Capacity administrator for their own trial capacity. Hundreds of customers can use each trial capacity. But, Microsoft sets a limit on the number of trial capacities that can be created on a single tenant. To help others in your organization try out Fabric, share your trial capacity. There are several ways to share.  

### Share by enabling Contributor permissions

Enabling the **Contributor permissions** setting allows other users to assign their workspaces to your trial capacity. If you're the Capacity or Fabric administrator, enable this setting from the Admin portal.

1. From the top right section of the Fabric menubar, select the cog icon to open **Settings**.
1. Select **Admin portal** > **Trial**. **Enabled for the entire organization** is set by default.

Enabling **Contributor permissions** means that any user with an Admin role in a workspace can assign that workspace to the trial capacity and access Fabric features. Apply these permissions to the entire organization or apply them to only specific users or groups.

### Share by assigning workspaces

If you're the Capacity administrator, assign the trial capacity to multiple workspaces. Anyone with access to one of those workspaces is now also participating in the Fabric capacity trial.

1. Open **Workspaces** and select the name of a Premium workspace.
1. Select **Workspace settings**, then **License info**.
1. Select **Edit** in the **License configuration** section.
1. Select the **Trial** license mode.

    :::image type="content" source="media/fabric-trial/migrate-trial.png" lightbox="media/fabric-trial/migrate-trial.png" alt-text="Screenshot of the trial workspace settings.":::

1. To apply your changes, select the **Select license** button.

For more information, see [Use Workspace settings](workspaces.md#license-mode).  

## Increase trial capacity

If you're the Capacity administrator or Tenant administrator, you might be eligible to increase the trial capacity by following these steps:

1. From the upper right corner of Fabric, select the gear icon, then select **Admin portal**.
1. Select **Capacity settings**, and then choose the **Trial** tab.
1. Your current trial size is displayed here. Select the **Change size** button to increase from 4 capacity units to 64 capacity units.
1. Select **Apply**. You see a success message and receive a notification.

You can also downgrade from 64 capacity units to 4 capacity units using these same steps.

> [!NOTE]
> Changing the trial capacity doesn't change the length of the trial. The number of remaining days doesn't reset or become extended.

## End a Fabric trial

End a Fabric capacity trail by [canceling](#cancel-the-fabric-trial), [letting it expire](#let-the-trial-expire), or [purchasing the full Fabric experience](#purchase-the-full-fabric-experience).

For more information, see [Canceling, expiring, and closing](../enterprise/fabric-close-end-cancel.md).

### Cancel the Fabric trial

Capacity admins and Fabric admins can cancel a trial capacity. The user who starts a trial automatically becomes the Capacity administrator. The Fabric administrator has full access to all Fabric management tasks. All Fabric items (non-Power BI items) in those workspaces become unusable and are eventually deleted. Only the Capacity or Fabric administrator can cancel the Fabric capacity trial.

One reason to cancel a trial capacity is when the Capacity administrator of a trial capacity leaves the company. Because Microsoft limits the number of trial capacities available per tenant, you might want to remove the unmanaged trial to make room to sign up for a new trial.

If you don't move the workspaces and their contents to a new capacity that supports Fabric:

- All licenses return to their original versions. You no longer have the equivalent of a PPU license. The license mode of any workspaces assigned to that trial capacity changes to Power BI Pro. 
- All Fabric items in the workspaces become unusable and are eventually deleted. Your Power BI items are unaffected and still available when the workspace license mode returns to Power BI Pro.  
- You can't create workspaces that support Fabric capabilities.
- You can't share Fabric items, such as machine learning models, warehouses, and notebooks, and collaborate on them with other Fabric users.
- You can't create any other analytics solutions using these Fabric items.

>[!NOTE]
> Only capacity and Fabric admins can cancel the trial of a Fabric capacity. Individual users don't have this ability. 

- **Cancel a trial using your Account manager**: As a Capacity admin, you can cancel your free Fabric trial capacity from your Account manager. Canceling the trial this way ends the trial for yourself and anyone else you invited to the trial.
  - Open your Account manager and select **Cancel trial**.

  :::image type="content" source="media/fabric-trial/cancel-trial.png" lightbox="media/fabric-trial/cancel-trial.png" alt-text="Screenshot of the Cancel trial button in Account manager.":::

- **Cancel the Fabric trial using the Admin portal**: As a Capacity or Fabric administrator, you can use the Admin portal to cancel a trial of a Fabric capacity:

  1. Select **Settings** > **Admin portal** > **Capacity settings**. 
  1. Then choose the **Trials** tab. 
  1. Select the cog icon for the trial capacity that you want to delete.

  :::image type="content" source="media/fabric-trial/fabric-delete-trial.png" lightbox="media/fabric-trial/fabric-delete-trial.png" alt-text="Screenshot of the Trial tab in the Admin portal.":::

<a id="the-trial-expires"></a>

### Let the trial expire

A standard Fabric capacity trial lasts 60 days. If you don't upgrade to a paid Fabric capacity before the end of the trial period, non-Power BI Fabric items are removed according to the [retention policy upon removal](../admin/portal-workspaces.md#workspace-states). You have seven days after the expiration date to save your non-Power BI Fabric items by assigning the workspaces to capacity that supports Fabric.

To retain your Fabric items, before your trial ends, [purchase Fabric](https://aka.ms/fabricibiza).

### Purchase the full Fabric experience

If you want to retain your data and continue to use Microsoft Fabric, you can [purchase a capacity](../enterprise/buy-subscription.md) and migrate your workspaces to that capacity. You can also migrate your workspaces to a capacity that you already own that supports Fabric items.

## Frequently asked questions

Here are some things to consider and answers to frequently asked questions about the Fabric trial.

#### What if I don't already have an assigned Power BI PPU?

If you don't already have an assigned Power BI [Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq) license, you receive a Power BI [Individual Trial](/power-bi/fundamentals/service-self-service-signup-purchase-for-power-bi?tabs=trial#start-a-trial) when initiating a Fabric trial capacity. This individual trial enables you to perform the actions and use the features that a PPU license enables. Your Account manager still displays the nontrial licenses assigned to you. But in order to make full use of Fabric, your Fabric trial includes the Power BI Individual trial.

#### Why can't I start a trial?

If you don't see the **Start trial** button in your Account manager:

- Your Fabric administrator might disable access, and you can't start a Fabric trial. To request access, [contact your Fabric administrator](#look-up-the-trial-capacity-administrator). You can also start a trial using your own tenant. For more information, see [Sign up for Power BI with a new Microsoft 365 account](/power-bi/enterprise/service-admin-signing-up-for-power-bi-with-a-new-office-365-trial).
- You're an existing Power BI trial user, and you don't see **Start trial** in your Account manager. You can start a Fabric trial by attempting to [create a Fabric item](#other-ways-to-start-a-microsoft-fabric-trial). When you attempt to create a Fabric item, you receive a prompt to start a Fabric trial. If you don't see this prompt, it's possible your Fabric administrator deactivated this action.

If you don't have a work or school account but want to sign up for a free trial:

- See [Sign up for Power BI with a new Microsoft 365 account](/power-bi/enterprise/service-admin-signing-up-for-power-bi-with-a-new-office-365-trial).

If you do see the **Start trial** button in your Account manager but can't start a trial:

- You might not be able to start a trial if your tenant exhausted its limit of trial capacities. If that is the case, you have the following options:
  - Request another trial capacity user to share their trial capacity workspace with you. [Give users access to workspaces](../fundamentals/give-access-workspaces.md).
  - [Purchase a Fabric capacity from Azure](https://aka.ms/fabricibiza) by performing a search for *Microsoft Fabric*.
- To increase tenant trial capacity limits, [reach out to your Fabric administrator](#look-up-the-trial-capacity-administrator) to create a Microsoft support ticket.

<a id="look-up-the-trial-capacity-administrator"></a>

#### How do I look up the trial Capacity administrator?

To request access to a trial capacity or to check whether your organization has the Fabric tenant setting enabled, you can contact your Capacity administrator. Ask your Fabric administrator to use the Admin portal to look up your Capacity administrator. 

If you're the Capacity or Fabric administrator, from the upper right corner of Fabric, select the gear icon. Select **Admin portal**. For a Fabric trial, select **Capacity settings** and then choose the **Trial** tab. 

:::image type="content" source="media/fabric-trial/fabric-admin.png" lightbox="media/fabric-trial/fabric-admin.png" alt-text="Screenshot of Admin center showing the Capacity settings screen.":::

#### How do I look up the number of days remaining in my trial?

If you're the Capacity or Fabric administrator, from the upper right corner of Fabric, select the gear icon. Select **Admin portal**. For a Fabric trial, select **Capacity settings** and then choose the **Trial** tab. The **DAYS LEFT** column tracks the remaining days for each trial.

:::image type="content" source="media/fabric-trial/fabric-admin-days-left.png" lightbox="media/fabric-trial/fabric-admin-days-left.png" alt-text="Screenshot of Admin center showing the Capacity settings screen and days left for each trial.":::

#### Why can't I assign a workspace to the trial capacity in my workspace settings?

This bug occurs when the Fabric administrator turns off trials after you start a trial. To add your workspace to the trial capacity, open the Admin portal by selecting it from the gear icon in the top menu bar. Then, select **Trial > Capacity settings** and choose the name of the capacity. If you don't see your workspace assigned, add it here.

:::image type="content" source="media/fabric-trial/capacity-wk-assignment.png" lightbox="media/fabric-trial/capacity-wk-assignment.png" alt-text="Screenshot of the Capacities page in the Admin portal.":::

#### What is the region for my Fabric trial capacity?

If you start the trial using the Account manager and didn't change the default region selection, your trial capacity is located in the home region for your tenant. See [Find your Fabric home region](../admin/find-fabric-home-region.md) for information about how to find your home region, where your data is stored.

> [!NOTE]
> In most cases, the default trial Capacity region matches your home region. However, in some cases, Fabric trials created in Central US were listed as being created in East US by default.

#### What effect does region have on my Fabric trial?

Not all regions are available for the Fabric trial. Start by [looking up your home region](../admin/find-fabric-home-region.md) and then check to [see if your region is supported for the Fabric trial](../admin/region-availability.md). If your home region doesn't have Fabric enabled, don't use the Account manager to start a trial. To start a trial in a region that isn't your home region, follow the steps in [Other ways to start a Fabric trial](#other-ways-to-start-a-microsoft-fabric-trial). If you already started a trial from Account manager, cancel that trial and follow the steps in [Other ways to start a Fabric trial](#other-ways-to-start-a-microsoft-fabric-trial) instead.

#### Can I move my tenant to another region?

You can't move your organization's tenant between regions by yourself. If you need to change your organization's default data location from the current region to another region, you must contact support to manage the migration for you. For more information, see [Move between regions](/power-bi/support/service-admin-region-move).

#### How can I see the Fabric trial capacity availability by Azure region?

To learn more about regional availability for Fabric trials, see [Fabric trial capacities are available in all regions.](../admin/region-availability.md)

#### How is the Fabric trial different from an individual trial of Power BI paid?

A per-user trial of Power BI paid allows access to the Fabric landing page. Once you sign up for the Fabric trial, you can use the trial capacity for storing Fabric workspaces and items and for running Fabric workloads. All rules guiding [Power BI licenses](/power-bi/fundamentals/service-features-license-type) and what you can do in the Power BI workload remain the same. The key difference is that a Fabric capacity is required to access non-Power BI workloads and items.

#### Does the Fabric trial capacity support autoscale?

The Fabric trial capacity doesn't support autoscale. If you need more compute capacity, you can purchase a Fabric capacity in Azure.

#### Is a Fabric trial different from a Proof of Concept (POC)?

The Fabric trial is different from a POC. A POC is standard enterprise vetting that requires financial investment and months' worth of work customizing the platform and using fed data. The Fabric trial is free for users and doesn't require customization. Users can sign up for a free trial and start running product workloads immediately, within the confines of available capacity units.

You don't need an Azure subscription to start a Fabric trial. If you have an existing Azure subscription, you can purchase a (paid) Fabric capacity.

#### How can trial Capacity administrators migrate existing workspaces into a trial capacity?

Trial Capacity administrators can migrate existing workspaces into a trial capacity using workspace settings and choosing **Trial** as the license mode. To learn how to migrate workspaces, see [create workspaces](create-workspaces.md).

:::image type="content" source="media/fabric-trial/migrate-trial.png" lightbox="media/fabric-trial/migrate-trial.png" alt-text="Screenshot of the trial workspace settings.":::

## Related content

- Learn about [licenses](../enterprise/licenses.md)
- Review Fabric [terminology](fabric-terminology.md)
