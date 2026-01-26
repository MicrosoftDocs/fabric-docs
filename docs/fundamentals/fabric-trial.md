---
title: Fabric trial capacity
description: Understand how the Fabric trial capacity works. This includes starting a trial, ending a trial, and sharing a trial.
author: SnehaGunda
ms.author: sngun
ms.reviewer: alpowers, mibruhje
ms.topic: concept-article
ms.custom: fabric-cat
ms.collection: ce-skilling-ai-copilot
ms.date: 01/09/2026
ms.update-cycle: 180-days
ai-usage: ai-assisted
---

# Try Microsoft Fabric for free

The Microsoft Fabric trial capacity gives you **free access for 60 days** to explore almost everything Fabric has to offer—across data engineering, data science, real-time analytics, business intelligence, and more. Whether you're new to Fabric or coming from the product to learn more, this trial is your gateway to understanding how Fabric brings all your data and analytics tools together in one place.

> **Quick start**: [Set up your Fabric trial capacity](#start-the-fabric-capacity-trial) | [Start using your Fabric trial capacity](#start-using-your-trial)

## What's included—and what's not

Your trial is configured as either an F4 [capacity](../enterprise/licenses.md#capacity) (4 capacity units) or an F64 capacity (64 capacity units) and is complemented with a Power BI Individual Trial if you don't already have a Power BI Premium Per User license. 

> [!TIP]
> If your trial currently has 4 capacity units, you might be eligible to increase the capacity to 64 capacity units. For more information, see [Increase trial capacity](#increase-trial-capacity).

With your trial capacity, you can:

- Use all Fabric workloads, including **Data Factory**, **Synapse Data Engineering**, **Real-Time Analytics**, and **Power BI**.
- Create **semantic models**, **pipelines**, **notebooks**, **reports**, and more.
- Collaborate in **workspaces** and monitor usage with the **Microsoft Fabric Capacity Metrics app**.
- Store up to **1 TB of data** in OneLake.

However, some features aren't available:

- Copilot and Trusted Workspace Access aren't supported.
- AI Experiences such as Data agent, AI functions and AI services aren't supported.
- Private Link is disabled.

Learn more about which [Microsoft Fabric features are supported in a trial capacity](../enterprise/fabric-features.md).

> [!NOTE]
> The [Fabric Analyst in a Day (FAIAD)](https://aka.ms/LearnFAIAD) workshop is a free, hands-on training designed for analysts working with Power BI and Microsoft Fabric. You can get hands-on experience on how to analyze data and build reports, using Fabric. It covers key concepts like working with lakehouses, creating reports, and analyzing data in the Fabric environment.

## When your Fabric trial ends

Your Microsoft Fabric trial capacity lasts for 60 days, unless you cancel it earlier. As the trial nears its end, you’ll see notifications in the Fabric portal and in the **Capacity settings** page of the Admin portal, helping you track how much time remains.

Once the trial expires:

- Access to the trial capacity is revoked.
- Any workspaces assigned to the trial capacity will be reassigned to Pro and non Power BI Fabric items will no longer be accessible unless the workspace is reassigned to a paid F or P capacity.
- Non Power BI Fabric items (like notebooks and pipelines) remain in your tenant, but they become inactive until reassigned to a valid capacity.
- All content remains stored in OneLake for 7 days and can be reactivated by assigning the workspace to a paid Fabric F or Power BI Premium P capacity.

Read more about [ending your trial](#end-a-fabric-trial).

> [!TIP]
> To check your trial status or trial expiration date, go to **Admin portal > Capacity settings > Trial**.

If you’re ready to continue using Fabric, visit the [Purchase Fabric page](../enterprise/buy-subscription.md) to explore your options.

To learn more about limitations and get answers to frequently asked questions about the Fabric trial, see [the FAQ](#frequently-asked-questions).

<a id="start-the-fabric-capacity-trial"></a>

## Set up your Fabric trial capacity

You can start a trial capacity several different ways. The first two methods make you the Capacity administrator of the trial capacity.  

- [**Method 1**](#method-1): Start a new trial capacity from the Account manager.
- [**Method 2**](#method-2): Trigger a new trial capacity by trying to use a Fabric feature.
- [**Method 3**](#other-ways-to-start-a-microsoft-fabric-trial): Join an existing trial capacity.

<a id="method-1"></a>

### Method 1: Start a new trial capacity from the Account manager

You can sign up for a trial capacity. You manage who else can use your trial by giving coworkers permission to create workspaces in your trial capacity. Every user in the tenant has contributor permissions by default unless you explicitly manage who has access. Assigning workspaces to the trial capacity automatically adds coworkers (with roles in those workspaces) to the trial capacity. To start your Fabric trial capacity and become the Capacity administrator of that trial, follow these steps:

1. To open your Account manager, select the tiny photo from the upper-right corner of the [Fabric homepage](https://app.fabric.microsoft.com/home?pbi_source=learn-get-started-fabric-trial).

    :::image type="content" source="media/fabric-trial/fabric-home-page.png" lightbox="media/fabric-trial/fabric-home-page.png" alt-text="Screenshot of the Microsoft Fabric homepage with the Account manager outlined in red.":::

1. In the Account manager, select **Start trial**. If you don't see **Start trial**, **Free trial**, or a **Trial status**, trials might be disabled for your tenant.

    > [!NOTE]
    > If the Account manager already displays **Trial status**, you might already have a **Power BI trial** or a **Fabric (Free) trial** in progress. To test this out, attempt to use a Fabric feature. For more information, see [Start using Fabric](#other-ways-to-start-a-microsoft-fabric-trial).

    :::image type="content" source="media/fabric-trial/me-control.png" lightbox="media/fabric-trial/me-control.png" alt-text="Screenshot of the Microsoft Fabric Account manager.":::

1. If prompted, agree to the terms and then select **Start trial**.
1. Within the **Activate your 60-day free Fabric trial** capacity prompt, please review the drop down selection of available **Trial capacity regions**. You can either accept the default home region or update it to a new region location that best suits your needs. Once you make your selection, agree to the terms and conditions, then select **Activate**.

   > [!IMPORTANT]
   > When planning your region deployment for Fabric capacities, it's important to make the appropriate selection from the outset. If you decide to move a workspace containing Fabric items to a different region after your trial is created, you need to delete all existing Fabric items before proceeding. For detailed instructions, see [Moving your data around](../admin/portal-workspaces.md#moving-data-around).
   >
   > To ensure the best performance and resource management, we recommend deploying your capacity in a region where your existing resources are already located. This approach minimizes network latency, reduces ingress and egress charges, and enhances overall reliability.

1. Once your trial capacity is ready, you receive a confirmation message. Select **Fabric Home Page** to begin a guided walkthrough of Fabric. You're now the Capacity administrator for that trial capacity. To learn how to share your trial capacity using workspaces, see [Share trial capacities](#share-trial-capacities).

Congratulations. You now have a Fabric trial capacity and a complementary Power BI individual trial (if you didn't already have a Power BI *paid* license). To share your capacity, see [Share trial capacities.](#share-trial-capacities).

<a id="method-2"></a>

### Method 2: Trigger a Fabric trial by trying to use a Fabric feature

If your organization enabled Fabric and Power BI trials, attempting to use a Fabric feature launches a Fabric trial capacity. If your Fabric administrator enabled Microsoft Fabric for the tenant but you still don't have access to a Fabric-enabled capacity, follow these steps:

1. Try to create a Fabric item in a workspace that you own (such as **My Workspace**) that doesn't currently support Fabric items (that is, not a Fabric, Premium, or Trial workspace).
1. Follow the prompt to start a Fabric trial capacity.

Once you agree, your trial starts and the workspace is reassigned to a trial capacity. You're the Capacity administrator and can add additional workspaces to the trial capacity by changing their type to Trial in workspace settings.

<a id="other-ways-to-start-a-microsoft-fabric-trial"></a>

### Method 3: Join an existing trial

You can join a trial started by a coworker by adding your workspace to their existing trial capacity. This action only is possible if the trial capacity administrator gives you or the entire organization **Contributor permissions** to the trial capacity.

For more information, see [Sharing trial capacities](#share-trial-capacities).

## Start using your trial

To start using your Fabric capacity trial, create a new workspace. Assign that workspace to your trial capacity [using the *Trial* license mode](workspaces.md#license-mode), and then all the items in that workspace are saved and executed in that trial capacity. Invite colleagues to those workspaces so they can share the trial experience with you. If you, as the Capacity administrator, enable **Contributor permissions**, then others can also assign their workspaces to your trial capacity. For more information about sharing, see [Share trial capacities](#share-trial-capacities).

- **Existing Power BI users**: If you're an existing Power BI user, jump to [Start the Fabric trial](#start-the-fabric-capacity-trial). 
- **New Power BI users**: The Fabric trial requires a per-user license. Navigate to [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com/?pbi_source=learn-get-started-fabric-trial) to sign up for a Fabric (Free) license. Once you have the free license, you can [begin participating in the Fabric capacity trial](#start-the-fabric-capacity-trial).  
  - You might already have a license and not realize it. For example, some versions of Microsoft 365 include a Power BI Pro license. Open Fabric [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com) and select your Account manager to see if you already have a license, and which license it is. Read on to see how to open your Account manager.

## Get the status of your trial

To see the status of your trial, open your Account manager again and look for the **Trial status**. Your Account manager keeps track of the number of days remaining in your trial. You can also see the countdown in the Fabric menu bar or go to **Admin portal > Capacity settings > Trial**.

:::image type="content" source="media/fabric-trial/trial-status-me-control.png" lightbox="media/fabric-trial/trial-status-me-control.png" alt-text="Screenshot of the Microsoft Fabric trial status.":::

## Share trial capacities

The person who starts the Fabric trial capacity becomes the Capacity administrator for that trial capacity. Other users on the same tenant can also start a Fabric trial capacity and become the Capacity administrator for their own trial capacity. Hundreds of users can use each trial capacity. But, Microsoft sets a limit on the number of trial capacities that can be created on a single tenant. To help others in your organization try out Fabric, share your trial capacity. There are several ways to share.   

### Share by enabling contributor permissions

To share and collaborate during a trial, you need to make sure the right tenant settings are enabled. Trial enablement is no longer controlled by a single toggle in the Admin portal. Instead, it’s managed through **Tenant settings** and **Help and support settings**, with optional capacity assignment.

1. In the **Admin portal**, go to **Tenant settings.**
1. Expand **Users can create Fabric items**, and turn it on. Optionally, scope this setting to specific security groups.
1. Under **Help and support settings**, enable **Users can try Microsoft Fabric paid features**. This allows users to start a trial.
1. (Optional) Assign trial capacity in **Capacity settings** if you want to control where trial workspaces are created.

> [!NOTE]
> The previous option **Enabled for the entire organization** in the **Trial** section is no longer available. Trial enablement is now managed through tenant settings.

### Share by assigning workspaces

If you're the Capacity administrator, assign the trial capacity to multiple workspaces. Anyone with access to one of those workspaces can now use the Fabric capacity trial.

1. Open **Workspaces** and select the name of a workspace.
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
1. Select **Apply**. If you're eligible to change the size, you see a success message and receive a notification.

You can also downgrade from 64 capacity units to 4 capacity units using these same steps.

> [!NOTE]
> Eligibility to increase trial capacity may vary. If you do not see the option, please contact your Microsoft sales representative or contact [Azure sales team](https://azure.microsoft.com/contact/?msockid=02d2195e72356be10cc60cb5738d6afb) for assistance. Changing the trial capacity doesn't change the length of the trial. The number of remaining days doesn't reset or become extended.

<a id="end-a-fabric-trial"></a>
## End a Fabric trial capacity

End a Fabric capacity trail by [canceling](#cancel-the-fabric-trial), [letting it expire](#let-the-trial-expire), or [purchasing the full Fabric experience](#purchase-the-full-fabric-experience).

For more information, see [Canceling, expiring, and closing](../enterprise/fabric-close-end-cancel.md).

### Cancel the Fabric trial

Capacity admins and Fabric admins can cancel a trial capacity. The user who starts a trial automatically becomes the Capacity administrator for that trial capacity. The Fabric administrator has full access to all Fabric management tasks. All Fabric items (non-Power BI items) in those workspaces become unusable and may be deleted after 7 days. Only the Capacity or Fabric administrator can cancel the Fabric trial capacity.

One reason to cancel a trial capacity is when the Capacity administrator of a trial capacity leaves the company. Because Microsoft limits the number of trial capacities available per tenant, you might want to remove the unmanaged trial capacity to make room for other users to sign up for a new trial capacity.

If you don't move the workspaces and their contents to a new capacity that supports Fabric:

- The license mode of any workspaces assigned to that trial capacity changes to Pro. 
- All non Power BI Fabric items in the workspaces become unusable and may be deleted after seven days. Your Power BI items are unaffected and still available when the workspace license mode returns to Pro.    
- You can't create workspaces that support Fabric capabilities.
- You can't share Fabric items, such as machine learning models, warehouses, and notebooks, and collaborate on them with other Fabric users.
- You can't create any other analytics solutions using these Fabric items.

>[!NOTE]
> Only capacity and Fabric admins can cancel a Fabric trial capacity. 

- **Cancel a trial using your Account manager**: As a trial capacity admin, you can cancel your free Fabric trial capacity from your Account manager. Canceling the trial this way ends the trial capacity for yourself and anyone else you invited to the trial.
  - Open your Account manager and select **Cancel trial**.

  :::image type="content" source="media/fabric-trial/cancel-trial.png" lightbox="media/fabric-trial/cancel-trial.png" alt-text="Screenshot of the Cancel trial button in Account manager.":::

- **Cancel the Fabric trial capacity using the Admin portal**: As a Capacity or Fabric administrator, you can use the Admin portal to cancel a Fabric trial capacity:

  1. Select **Settings** > **Admin portal** > **Capacity settings**.
  1. Then choose the **Trials** tab.
  1. Select the cog icon for the trial capacity that you want to delete.

  :::image type="content" source="media/fabric-trial/fabric-delete-trial.png" lightbox="media/fabric-trial/fabric-delete-trial.png" alt-text="Screenshot of the Trial tab in the Admin portal.":::

<a id="the-trial-expires"></a>

### Let the trial expire

A standard Fabric trial capacity lasts 60 days. If you don't reassign workspaces to a paid Fabric capacity before the end of the trial period, non-Power BI Fabric items are removed according to the [retention policy upon removal](../admin/portal-workspaces.md#workspace-states). You have seven days after the expiration date to save your non-Power BI Fabric items by assigning the workspaces to an F or P capacity that supports Fabric.

To retain your Fabric items, before your trial ends, [purchase Fabric](https://aka.ms/fabricibiza).

### Purchase the full Fabric experience

If you want to retain your data and continue to use Microsoft Fabric, you can [purchase a capacity](../enterprise/buy-subscription.md) and migrate your workspaces to that capacity. You can also migrate your workspaces to a capacity that you already own that supports Fabric items.

## Frequently asked questions

Here are some things to consider and answers to frequently asked questions about the Fabric trial.

#### What if I don't already have an assigned Power BI PPU?

If you don't already have an assigned Power BI [Premium Per User (PPU)](/power-bi/enterprise/service-premium-per-user-faq) license, you receive a Power BI [Individual Trial](/power-bi/fundamentals/service-self-service-signup-purchase-for-power-bi?tabs=trial#start-a-trial) when initiating a Fabric trial capacity. This individual trial enables you to perform the actions and use the features that a PPU license enables. Your Account manager still displays the nontrial licenses assigned to you. But in order to make full use of Fabric, your Fabric trial capacity comes with a complementary Power BI Individual trial.

#### Why can't I start a trial?

If you don't see the **Start trial** button in your Account manager:

- Your Fabric administrator might have disabled access, and you can't start a Fabric trial capacity. To request access, [contact your Fabric administrator](#look-up-the-trial-capacity-administrator). 
- You're an existing Power BI individual trial user, and you don't see **Start trial** in your Account manager. You can start a Fabric trial by attempting to [create a Fabric item](#other-ways-to-start-a-microsoft-fabric-trial). When you attempt to create a Fabric item, you receive a prompt to start a Fabric trial. If you don't see this prompt, it's possible your Fabric administrator deactivated this action.

If you do see the **Start trial** button in your Account manager but can't start a trial:

- You might not be able to start a trial capacity if your tenant exhausted its limit of trial capacities. If that's the case, you have the following options:
  - Request another trial capacity user to share their trial capacity workspace with you. [Give users access to workspaces](../fundamentals/give-access-workspaces.md).
  - [Purchase a Fabric capacity from Azure](https://aka.ms/fabricibiza) by performing a search for *Microsoft Fabric*.

<a id="look-up-the-trial-capacity-administrator"></a>

#### How do I look up the trial Capacity administrator?

To request access to a trial capacity or to check whether your organization has the Fabric tenant setting enabled, you can contact your Capacity administrator. Ask your Fabric administrator to use the Admin portal to look up your Capacity administrator. You can find your Fabric administrator as the service administrator in the Workspace Settings of your workspace.

If you're the Capacity or Fabric administrator, from the upper right corner of Fabric, select the gear icon. Select **Admin portal**. For a Fabric trial, select **Capacity settings** and then choose the **Trial** tab.

:::image type="content" source="media/fabric-trial/fabric-admin.png" lightbox="media/fabric-trial/fabric-admin.png" alt-text="Screenshot of Admin center showing the Capacity settings screen.":::

#### How do I know if my tenant has reached its trial capacity limit?

Microsoft limits the number of trial capacities available per tenant. If your tenant has exhausted its trial capacity limit, you'll encounter one of these scenarios:

- When attempting to start a new trial from the Account manager, the **Start trial** option might not be available or you may receive an error message indicating the trial limit has been reached.
- If you try to trigger a trial by creating a Fabric item, the trial activation prompt won't appear.

To resolve this issue:

- Contact your Fabric administrator to check existing trial capacities in **Admin portal > Capacity settings > Trial**. If there are inactive or unmanaged trial capacities (for example, from users who left the organization), consider canceling them to free up capacity for new trials.
- Request access to an existing trial capacity from a Capacity administrator who can share their trial by assigning workspaces or enabling contributor permissions.
- Consider [purchasing a Fabric capacity](../enterprise/buy-subscription.md) if trial limits prevent your organization from testing Fabric features.

#### How do I look up the number of days remaining in my trial?

From the upper right corner of Fabric, select the gear icon. Select **Admin portal**. For a Fabric trial, select **Capacity settings** and then choose the **Trial** tab. The **Days left** column tracks the remaining days for each trial.

:::image type="content" source="media/fabric-trial/fabric-admin-days-left.png" lightbox="media/fabric-trial/fabric-admin-days-left.png" alt-text="Screenshot of Admin center showing the Capacity settings screen and days left for each trial.":::

#### Why can't I assign a workspace to the trial capacity in my workspace settings?

This can occur when the Fabric administrator turns off trials after you start a trial. To add your workspace to the trial capacity, open the Admin portal by selecting it from the gear icon in the top menu bar. Then, select **Trial > Capacity settings** and choose the name of the capacity. If you don't see your workspace assigned, add it here.

:::image type="content" source="media/fabric-trial/capacity-wk-assignment.png" lightbox="media/fabric-trial/capacity-wk-assignment.png" alt-text="Screenshot of the Capacities page in the Admin portal.":::

#### What is the region for my Fabric trial capacity?

If you start the trial using the Account manager and didn't change the default region selection, your trial capacity is usually located in the home region for your tenant. See [Find your Fabric home region](../admin/find-fabric-home-region.md) for information about how to find your home region, where your data is stored.

> [!NOTE]
> In most cases, the default trial Capacity region matches your home region. However, in some cases, Fabric trials are created by default in a similar but different region (for example, East US instead of Central US).

#### How do I select a different region for my Fabric trial capacity? 

The easiest way to select a non-default region for your Fabric trial capacity is at the point of [initiating the trial from the Account Manager](#method-1). The list of available regions for selection will be available during this step.  

#### What effect does region have on my Fabric trial capacity?

Not all regions are available for the Fabric trial capacity. Start by [looking up your home region](../admin/find-fabric-home-region.md) and then check to [see if your region is supported for the Fabric trial](../admin/region-availability.md). If your home region doesn't have Fabric enabled, don't use the Account manager to start a trial. To start a trial in a region that isn't your home region, follow the steps in [Other ways to start a Fabric trial](#other-ways-to-start-a-microsoft-fabric-trial). If you already started a trial from Account manager, cancel that trial and follow the steps in [Other ways to start a Fabric trial](#other-ways-to-start-a-microsoft-fabric-trial) instead.

#### Can I move my tenant to another region?

You can't move your organization's tenant between regions by yourself. If you need to change your organization's default data location from the current region to another region, you must contact support to manage the migration for you. For more information, see [Move between regions](/power-bi/support/service-admin-region-move).

#### How can I see the Fabric trial capacity availability by Azure region?

To learn more about regional availability for Fabric trials, see [Fabric trial capacities are available in all regions.](../admin/region-availability.md)

#### How is the Fabric trial capacity different from a Power BI individual trial?

A Power BI individual trial provides use rights equivalent to a Power BI Premium Per User license. A Fabric trial capacity is for storing Fabric items and running Fabric workloads. All rules guiding [Power BI licenses](/power-bi/fundamentals/service-features-license-type) and what you can do in the Power BI workload remain the same with a Fabric trial capacity, which is why having a complementary Power BI individual trial is useful. The key difference is that a Fabric capacity is required to use non-Power BI workloads and items.

#### Does the Fabric trial capacity support autoscale?

The Fabric trial capacity doesn't support autoscale. If you need more compute capacity, you can purchase a Fabric capacity in Azure.

#### How can trial Capacity administrators migrate existing workspaces into a trial capacity?

Trial Capacity administrators can migrate existing workspaces into a trial capacity using workspace settings and choosing **Trial** as the license mode. To learn how to migrate workspaces, see [create workspaces](create-workspaces.md).

:::image type="content" source="media/fabric-trial/migrate-trial.png" lightbox="media/fabric-trial/migrate-trial.png" alt-text="Screenshot of the trial workspace settings.":::

#### How many SQL databases can I create in a Fabric trial capacity?

Currently, you can create up to three SQL databases in a Fabric trial capacity.

## Related content

- Learn about [licenses](../enterprise/licenses.md)
- Review Fabric [terminology](fabric-terminology.md)
