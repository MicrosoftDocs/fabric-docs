---
title: Fabric Trial
description: Understand how the Fabric Trial works
author: mihart
ms.author: mihirwagle
ms.topic: concept
ms.date: 05/05/2023
---

# The Microsoft Fabric capacity (Preview) trial

The Microsoft Fabric capacity (Preview) trial enables customers to test drive a Fabric capacity. This includes the resources to create and host Fabric items. The trial lasts until Fabric capacity General Availability (GA), unless cancelled. After GA, the Fabric capacity trial will convert to the GA version and be extended for 60 days.

## Requirements
There are three steps to get up and running with your Fabric capacity (Preview) trial: 
- [confirm that you have a Power BI license](#power-bi-license)
- [sign up for the Fabric capacity (Preview) trial](#sign-up-for-the-fabric-capacity-trial)
- [create a workspace and assign it to the Fabric capacity](workspaces.md)

### Power BI license

**For public preview**, the Fabric capacity (Preview) trial requires a Power BI license. Once you have a Power BI license, you'll be able to sign up for the Fabric capacity (Preview) trial. 

- If you already have a Power BI *free* license, you'll be able to use all of the Fabric product experiences. While working in the Power BI experience, all the capabilities of the Power BI free license remain unchanged. 
- If you already have a Power BI *paid* license, you'll be able to use all of the Fabric product experiences. While working in the Power BI experience, all the capabilities of the Power BI paid licenses remain unchanged. This includes the ability to author Power BI content such as dashboards and reports and to share Power BI content with others.
- If you don't already have a Power BI license, for public preview you'll need to start a **trial of the Power BI per user paid license**. If you need a Power BI license, [sign up for a free Power BI per user trial](/power-bi/fundamentals/service-sef-service-signup-for-power-bi.md#use-self-service-sign-up-to-start-an-individual-trial-of-the-Power-BI-paid-version). Once you have that trial license, return to this article.

### Fabric capacity (Preview) trial

Now that you have a Power BI license, you are ready to [sign up for a Fabric capacity (Preview) trial](#sign-up-for-the-fabric-capacity-trial).  

### Fabric workspace

You won't be able to access your capacity until you put something into it. To begin using your Fabric capacity, add at least one workspace. Create a workspace, assign it to your Fabric capacity, and then all the items in that workspace will be saved and executed in that capacity. 

To learn more about workspaces, see [Workspaces](workspaces.md).

## What is a Fabric capacity?

 A Microsoft Fabric capacity resides on a tenant. Each capacity that sits under a specific tenant is a distinct pool of resources allocated to Microsoft Fabric. The size of the capacity determines the amount of computation power reserved for users of that capacity. The amount of compute resources is based on the [SKU](enterprise/licenses.md#microsoft-fabric-compnents).

With a Fabric capacity trial, you get full access to all of the Fabric experiences and features. Create Microsoft Fabric items and collaborate with others in the same Fabric trial capacity. With a Fabric capacity trial, you'll be able to:

- Create workspaces (folders) for projects that support Fabric capabilities.
- Share Fabric items, such as datasets, warehouses, and notebooks, and collaborate on them with other Fabric users.
- Create analytics solutions using these Fabric items.

## Capacity units

When you start a Fabric capacity (Preview) trial, Microsoft provisions one 64 capacity unit (CU) trial capacity. This allows users of your trial capacity to consume 64x60 CU seconds every minute. Every time the Fabric trial capacity is used, it consumes CUs. The Fabric platform aggregates consumption from all workloads and applies it to your reserved capacity.
Not all functions have the same consumption rate. For example, running a Data Warehouse might consume more capacity units than authoring a Power BI report. When the capacity consumption exceeds its size, we slow down the experience similar to slowing down CPU performance.


Next, to author
Fabric items, I need a Power BI Pro / Power BI PPU license for Power BI
Items and a Fabric (Preview) Trial capacity. For a detailed overview of
Fabric licensing, please read [this]{.underline}.

## Sign up for the Fabric capacity trial
There are two ways to sign up for the Fabric capacity trial. The first option is to sign up from https://microsoft.com/microsoft-fabric.

<!-- insert image from Marketing -->

The second option, to sign up from  https://app.fabric.microsoft.com, is described below. 

### Sign up for a Fabric license
Before you can get a trial license, use a work or school account to sign up for Power BI. 

<link to PBI article>

### Start a Fabric capacity trial
Before you begin creating items, activate your Fabric capacity trial. 

    :::image type="content" source="media/fabric-trial/fabric-home-page.png" alt-text="Microsoft Fabric Home Page":::

1. Open the Account manager by selecting the picture icon from the upper right corner.  Choose **Start trial**.

    :::image type="content" source="media/fabric-trial/me-control.png" alt-text="Microsoft Fabric Me Control.":::

1. If prompted, agree to the terms and then select **Start trial**. 
 
    :::image type="content" source="media/fabric-trial/start-trial-click.png" alt-text="Microsoft Fabric Start Trial click":::

1. Once your trial capacity is ready, you receive a confirmation message. Select **Got it** to begin working in Fabric. 

    :::image type="content" source="media/fabric-trial/start-trial-success.png" alt-text="Microsoft Fabric Start Trial Success.":::

1. Re-open your Account manager. Notice that you now have a heading for **Trial status**. Your Account manager keeps track of the number of days remaining in your trial. 

    :::image type="content" source="media/fabric-trial/trial-status-me-control.png" alt-text="Microsoft Fabric Trial Status":::


## What is a Fabric trial "capacity"?  



7.  **How will I know how many capacity units are used?**

You are the capacity owner for your trial capacity. As your own capacity
administrator for your Fabric capacity trial, you will have access to a detailed and transparent report for how capacity units are consumed via the [Capacity Metrics app](xxx).

8.  **Who is eligible for the Microsoft Fabric (Preview) Trial?**

The Fabric capacity (Preview) Trial is available to anyone who already has a Power BI license for tenants where trials are enabled by the Power BI admin. <add if run out of trial capacities, ask Mihir if we should mention a #>

9.  **Why am I unable to start a trial?**

You may not be eligible for the Fabric capacity trial on your Microsoft
tenant if your Power BI admin has disabled access. However, you may still sign up using a different Azure Active
Directory account.<your own private onmicrosoft.com>

You may also not have access to a trial capacity if your tenant has exhausted its limit of trial capacities. You have the following options if this happens:

a)  Purchase a Fabric capacity from Azure -- <https://portal.azure.com/>

b)  Request another trial capacity user to share their trial capacity
    with you.

c)  Reach out to your <which> admin to create a CSS request to increase     tenant capacity limits.

6.  **Does the Fabric capacity trial include OneLake storage?**

The Fabric capacity trial includes OneLake storage up to 1 TB.

**Existing Synapse users**

10. **How is the Fabric capacity trial different from a Proof of Concept (POC)?**

<ask Mihir what he means by this section> A Proof of Concept (POC) is standard enterprise vetting that requires
financial investment and months' worth of work customizing the platform
and using fed data. The Fabric capacity trial is free for users through
public preview and does not require customization. Users can sign up for
a free trial and start running workload items immediately, within the
confines of available capacity units.

11. **Do I need an Azure subscription to use a Fabric capacity trial?**

You don't need an Azure subscription to use a Fabric capacity trial.
If you have an existing Azure Free subscription or a paid subscription,
you can procure a Fabric (Preview) capacity.

**Existing Power BI users**

12. **What if I already have an active individual trial of Power BI paid?**

If you are currently enrolled in the individual trial of Power BI paid, we will automatically extend the trial end date to match the end of a Fabric capacity trial. For example, if you have 3 days remaining in a Power BI trial and
start a Fabric capacity trial, we will extend your trial by 57 days, so that they both end in 60 days.

13. **What if I created a Pro / Premium Per User Workspace -- can I migrate that workspace to a Fabric capacity trial?**

Yes, you can migrate existing workspaces into a Fabric (Preview) Trial capacity using workspace settings.

\<SCREENSHOT OF WORKSPACE SETTINGS\>

14. **How is the Fabric capacity trial different from an individual trial of Power BI paid?**

Both enable access to the Fabric <portal/landing page> and give you a Fabric capacity that you can use for storing and running Fabric workloads/items/compute resouces. <all rules guiding PBI licenses and what you can do in PBI remain the same. link to license chart.> The key difference is the Fabric capacity trial capacity, which is required to access non-Power BI workloads and items.

**Admins <which???> / trial management**

15. **As a Power BI admin, how do I enable and disable trials?  <link to article on enabling/disabling trials https://learn.microsoft.com/en-us/power-bi/admin/service-admin-portal-help-support?toc=%2Fpower-bi%2Fadmin%2FTOC.json&bc=%2Fpower-bi%2Fadmin%2Fbreadcrumb%2Ftoc.json#allow-users-to-try-power-bi-paid-features>

> \<REWRITE\> - USE SCREENSHOTS FROM ADMIN PORTAL <which portal???\>
16. **As a <which???> admin, how do I see trial capacity metrics in the Capacity Metrics app?**

Each trial user is the capacity admin for their own capacity and we currently do not support multiple capacity administrators per trial capacity. Therefore, <which???> admins will not be able to view metrics for individual capacities. We do have plans to support this in an upcoming admin monitoring feature.

**Within Trial**???

17. **What am I able to do with a trial capacity?**

    

18. **How many workspaces am I able to create?**

There is no limit on the number of workspaces or items you can create
within your capacity. The only constraint is the availability of capacity units and the rate at which you consume them.

19. **Is there a limit to the number of users I can invite to my workspace(s)?**

There is no limit on the number of users you can invite to your workspace(s) and share your content with. However, the license requirement for sharing Power BI items requires a Power BI Pro or PPU license.

20. **How many days do I have left in my trial?**

You may view the number of days remaining in your trial in the navigation toolbar. Please note, during public preview your trial will be automatically renewed until GA. <in chunks of 60?>

21. **Can I extend my trial?**

During public preview, users do not need to proactively renew their trial. We will automatically renew your trial for you indefinitely [until General Availability].

22. **Will trial capacities work if private Links are enabled?**

During public preview, you will not be able to create Fabric items in
the trial [if]{.underline} you/your tenant has private links enabled
[and]{.underline} public access is disabled. This is a known issue for
public preview.

23. **Does my trial capacity support autoscale?**

No, the trial capacity does not support Autoscale. If you need more compute capacity, we recommend you purchase a Fabric capacity in Azure.

**Cancel / Post-Trial**

24. **How do I upgrade to a paid Fabric capacity?**

25. **What happens when I upgrade my capacity?**

26. **How do I cancel my trial?**

You may cancel your trial from the Account manager.

27. **What happens if I cancel my trial?**

Before you cancel your free Fabric capacity trial, you need to know that the trial capacity, with all its workspaces and their contents, will be deleted. In addition, you will no longer be able to:

-   Create workspaces that support Fabric capabilities.

-   Discover and interact with other users' Fabric items, such as     databases, machine learning models and warehouses.

-   Share Fabric items, such as machine learning models, warehouses, and     notebooks, and collaborate on them with other Fabric users.

-   Create analytics solutions using these Fabric items.

    Additionally, if you cancel your trial, you will not be able to
    start another trial.

28. **How do I migrate or archive my data and items?**

29. **I have a valid trial capacity but I can't assign a workspace to the trial capacity in workspace settings?**

This is a known bug when the Power BI administrator turns off trials after
you start a trial. You can go to the capacity settings page and look at
workspaces assigned to your capacity. You can add your workspace to the trial capacity in this location.

<ask Mihir???>

\<SCREENSHOT\>