---
title: Fabric (preview) trial
description: Understand how the Fabric (preview) trial works
author: mihart
ms.author: mihirwagle
ms.topic: concept
ms.date: 05/08/2023
---

# Microsoft Fabric (Preview) trial

The Microsoft Fabric (Preview) trial includes access to the Fabric product experiences and the resources to create and host Fabric items. The Fabric trial lasts until Fabric General Availability (GA), unless canceled. After GA, the Fabric (Preview) trial converts to the GA version and is extended for 60 days.

This document helps you understand and start a Fabric (Preview) trial. 

## Existing Power BI users
If you're an existing Power BI user, you can skip to [Start the Fabric (Preview) trial](#start-the-fabric-preview-trial). 

## Users who are new to Power BI
**For public preview**, the Fabric (Preview) trial requires a Power BI license. Navigate to https://app.fabric.microsoft.com to sign up for a Power BI *free* license. Once you have a Power BI license, you can start the Fabric (Preview) trial. 

## Start the Fabric (Preview) trial

Follow these steps to start your Fabric (Preview) trial. 

1. Open the [Fabric homepage](xxx) (http://xxx) and select the Account manager.  

    :::image type="content" source="media/fabric-trial/fabric-home-page.png" alt-text="Screenshot of the Microsoft Fabric homepage with the Account manager outlined in red.":::

1. In the Account manager, select **Start trial**.

    :::image type="content" source="media/fabric-trial/me-control.png" alt-text="Screenshot of the Microsoft Fabric Account manager.":::

1. If prompted, agree to the terms and then select **Start trial**. 

    :::image type="content" source="media/fabric-trial/start-trial-click.png" alt-text="Screenshot of the Microsoft Fabric Start trial icon.":::

1. Once your trial capacity is ready, you receive a confirmation message. Select **Got it** to begin working in Fabric. 

    :::image type="content" source="media/fabric-trial/start-trial-success.png" alt-text="Screenshot of the Microsoft Fabric Start trial success message.":::

1. Open your Account manager again. Notice that you now have a heading for **Trial status**. Your Account manager keeps track of the number of days remaining in your trial. You also see the countdown in your Fabric menu bar when you work in a product experience.

    :::image type="content" source="media/fabric-trial/trial-status-me-control.png" alt-text="Screenshot of the Microsoft Fabric (Preview) trial status.":::

Congratulations! You now have a Fabric (Preview) trial that includes a Power BI individual trial (if you didn't already have a Power BI *paid* license) and a Fabric (Preview) trial capacity.

## Other ways to start a Microsoft Fabric (Preview) trial
If your Power BI administrator has [enabled the preview of Microsoft Fabric for the tenant](../admin/admin-fabric-switch.md#enable-for-the-entire-organization), you have another option for enabling a Fabric (Preview) trial. When you try to create a Fabric item in a workspace that you own (such as **My Workspace**) and that workspace doesn't support Fabric items, you're prompted to start a Fabric (Preview) trial. If you agree, your Fabric (Preview) trial will start and your workspace is upgraded to a trial capacity workspace.

## What is a trial capacity?

 A trial capacity is a distinct pool of resources allocated to Microsoft Fabric. The size of the capacity determines the amount of computation power reserved for users of that capacity. The amount of compute resources is based on the [SKU](../enterprise/licenses.md#microsoft-fabric-components).

With a Fabric (Preview) trial, you get full access to all of the Fabric experiences and features. You also get OneLake storage up to 1 TB. Create Fabric items and collaborate with others in the same Fabric trial capacity. With a Fabric (Preview) trial, you can:

- create workspaces (folders) for projects that support Fabric capabilities.
- share Fabric items, such as datasets, warehouses, and notebooks, and collaborate on them with other Fabric users.
- create analytics solutions using these Fabric items.

You don't have access to your capacity until you put something into it. To begin using your Fabric (Preview) trial, add at least one workspace. Create a workspace, assign it to your trial capacity using the "Trial" license mode, and then all the items in that workspace will be saved and executed in that capacity. 

To learn more about workspaces and license mode settings, see [Workspaces](workspaces.md).

## Capacity units

When you start a Fabric (Preview) trial, Microsoft provisions one 64 capacity unit (CU) trial capacity. These CUs allow users of your trial capacity to consume 64x60 CU seconds every minute. Every time the Fabric trial capacity is used, it consumes CUs. The Fabric platform aggregates consumption from all workloads and applies it to your reserved capacity.
Not all functions have the same consumption rate. For example, running a Data Warehouse might consume more capacity units than authoring a Power BI report. When the capacity consumption exceeds its size, Microsoft slows down the experience similar to slowing down CPU performance.

There's no limit on the number of workspaces or items you can create within your capacity. The only constraint is the availability of capacity units and the rate at which you consume them.

You're the capacity owner for your trial capacity. As your own capacity administrator for your Fabric trial capacity, you have access to a detailed and transparent report for how capacity units are consumed via the [Capacity Metrics app]. For more information about administering your trials, see [Administer a Fabric trial capacity](#administer-user-access-to-a-fabric-preview-trial).


## End a Fabric (Preview) trial

You may cancel your trial from the Account manager. When you cancel your free Fabric (Preview) trial, the trial capacity, with all of its workspaces and their contents, are deleted. In addition, you can no longer:

-   create workspaces that support Fabric capabilities.

-   share Fabric items, such as machine learning models, warehouses, and notebooks, and collaborate on them with other Fabric users.

-   create analytics solutions using these Fabric items.

Additionally, if you cancel your trial, you may not be able to start another trial.

## Administer user access to a Fabric (Preview) trial

Power BI administrators enable and disable trials. For more information on administering trials, see [Help and support tenant settings](/power-bi/admin/service-admin-portal-help-support#allow-users-to-try-power-bi-paid-features)

 :::image type="content" source="media/fabric-trial/tenant-trial-settings.png" alt-text="Screenshot of the Microsoft Fabric trial settings.":::

Each trial user is the capacity admin for their trial capacity. Microsoft currently doesn't support multiple capacity administrators per trial capacity. Therefore, Power BI administrators can't view metrics for individual capacities. We do have plans to support this capability in an upcoming admin monitoring feature.

## Considerations and limitations

**I am unable to start a trial**

If you don't see the **Start trial** button in your Account manager:

- Your Power BI administrator may have disabled access, and you can't start a Fabric (Preview) trial. Contact your Power BI administrator to request access.  You can also start a trial using your own tenant. For more information, see [Sign up for Power BI with a new Microsoft 365 account](/power-bi/enterprise/service-admin-signing-up-for-power-bi-with-a-new-office-365-trial).

- If you're an existing Power BI trial user, your Power BI administrator may have turned off the Fabric (Preview) feature. You can start a Fabric (Preview) trial by attempting to [create a Fabric item](#other-ways-to-start-a-microsoft-fabric-preview-trial). This action initiates a prompt to start a Fabric trial.

If you do see the **Start trial** button in your Account manager:

- you might not be able to start a trial if your tenant has exhausted its limit of trial capacities. 

You have the following options if you can't start a trial:

- [Purchase a Fabric capacity from Azure](https://portal.azure.com/)

- Request another trial capacity user to share their trial capacity with you.

- Reach out to your Power BI administrator to create a CSS request to increase tenant trial capacity limits.

**In Workplace settings, I can't assign a workspace to the trial capacity**

This known bug occurs when the Power BI administrator turns off trials after you start a trial. To add your workspace to the trial capacity, open the **Capacity settings** page and double-check that the workspace isn't assigned to your capacity. If you don't see it in the list, add it.  

**How is the Fabric (Preview) trial different from an individual trial of Power BI paid?**

A per-user trial of Power BI paid allows access to the Fabric landing page. Once you sign up for the Fabric (Preview) trial, you can use the trial capacity for storing Fabric workspaces and items and for running Fabric workloads. All rules guiding [Power BI licenses](/power-bi/fundamentals/service-features-license-type.md) and what you can do in the Power BI experience remain the same. The key difference is that a Fabric capacity is required to access non-Power BI experiences and items.

**Private links and private access**

During the Fabric preview, you can't create Fabric items in the trial capacity **if** you or your tenant have private links enabled **and** public access is disabled. This limitation is a known bug for Fabric preview.

**Autoscale**

The Fabric (Preview) trial capacity doesn't support autoscale. If you need more compute capacity, you can purchase a Fabric capacity in Azure.

**For existing Synapse users**

- The Fabric (Preview) trial is different from a Proof of Concept (POC). A Proof of Concept (POC) is standard enterprise vetting that requires financial investment and months' worth of work customizing the platform and using fed data. The Fabric (Preview) trial is free for users through public preview and doesn't require customization. Users can sign up for a free trial and start running product experiences immediately, within the confines of available capacity units.

- You don't need an Azure subscription to use a Fabric (Preview) trial. If you have an existing Azure Free or paid subscription, you can procure a Fabric (Preview) capacity.

**For existing Power BI users**

You can migrate your existing workspaces into a trial capacity using workspace settings and choosing "Trial" as the license mode. To learn how migrate workspaces, see [create workspaces](create-workspaces.md).

:::image type="content" source="media/fabric-trial/migrate_to_trial.png" alt-text="Screenshot of the trial workspace settings.":::