---
title: How to Use Azure Data Factory item (Mount) in Microsoft Fabric
description: The Azure Data Factory item in Microsoft Fabric allows you to bring in your ADF items to Fabric instantly.
ms.reviewer: ssrinivasara
ms.topic: how-to
ms.custom: pipelines
ms.date: 07/01/2025
ai-usage: ai-assisted
---

# What’s Azure Data Factory Item?

Azure Data Factory Item (Mount) lets you effortlessly bring your existing Azure Data Factory into a Fabric workspace. It’s like opening a live view of your ADF pipelines right inside Fabric—without having to migrate or rebuild anything. It’s a low-risk way to start using Fabric while keeping your ADF setup just the way it is.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- Permissions: You’ll need contributor access to the ADF and member/admin rights in the Fabric workspace.
- Same Tenant: Your ADF and Fabric workspace must be in the same Azure AD tenant.
- Same Region (Recommended): For best performance, keep your Fabric workspace in the same region as your ADF.

## What’s new?
You can now manage, view, and edit those pipelines directly from the Fabric portal. It’s the same ADF that is now accessible inside your Fabric workspace.

## What stays the same
Your pipelines, dataflows, triggers, integration runtimes, and schedules all keep running in ADF. No long migration times and nothing gets altered.

## Authoring pipelines
You can edit pipelines in Fabric’s Data Factory UI—it looks and feels like the ADF portal.
Prefer your Git-based workflow? No problem. Fabric will show the published version of your pipelines, but your Git setup stays intact.

## Running pipelines
Pipelines still run on ADF’s infrastructure. That means:
- Same integration runtimes (including Self-Hosted IRs).
- Same compute and billing (you’re charged by Azure for ADF, not Fabric capacities).
- No need to set up a Fabric gateway for existing pipelines.

## Monitoring & admin
- You can trigger and debug pipelines as well as perform basic monitoring in Fabric. For full monitoring (like viewing past runs or setting alerts), head back to the ADF portal.
- Some features like global parameters aren’t visible in Fabric.

## Why use Azure Data Factory Item?
- It’s a great way to explore Fabric without disrupting your current ADF setup.
- You get a unified workspace—view dashboards, run pipelines, and manage data all in one place.
- It supports gradual migration and modernization. You can keep your ADF pipelines running while starting to build new things in Fabric.

## How to mount your Azure Data Factory: 
There are two entry points, one from ADF and one within Fabric workspace.
### 1. Mount from Fabric workspace
1.  Go to your Fabric workspace.
1.	Create New Item > Azure Data Factory.
   
:::image type="content" source="media/migrate-planning-azure-data-factory/azure-data-factory-item.png" alt-text="Screenshot showing the Azure Data Factory Item in Fabric.":::

2.	Pick your ADF instance from the list.
   
:::image type="content" source="media/migrate-planning-azure-data-factory/choose-factory-to-mount.png" alt-text="Screenshot showing the Azure Data Factory dropdown selection in Fabric.":::

3.	Select OK.  
That’s it! Within no time, you’ll see your ADF pipelines inside Fabric.

:::image type="content" source="media/migrate-planning-azure-data-factory/view-mounted-azure-data-factory.png" alt-text="Screenshot showing the Azure Data Factory mounted successfully in Fabric.":::

5.  Select the "View Azure Data Factory" to view, edit, validate and trigger your pipeline from Fabric. 
Not sure yet? You can safely unmount your factory from Fabric at any time. Just select Unmount.

:::image type="content" source="media/migrate-planning-azure-data-factory/unmount-from-fabric.png" alt-text="Screenshot showing unmount Azure Data Factory Item in Fabric.":::

### 2. Mount from ADF UX
You can now mount your Azure Data Factory to Fabric from ADF UX.

1.	Go to your Data factory in Azure portal that you wish to mount.
2.	From Manage tab select ADF in Microsoft Fabric.
3.	Select Mount in Fabric.
4.	Choose a Fabric workspace where you would like to mount the factory to.
5.	Select Mount.

:::image type="content" source="media/migrate-planning-azure-data-factory/mount-from-azure-data-factory.png" alt-text="Screenshot showing mounting experience from ADF.":::

:::image type="content" source="media/migrate-planning-azure-data-factory/view-azure-data-factory-artifacts.png" alt-text="Screenshot showing pipeline items ADF.":::

And just like that you will start to see your ADF in the Fabric workspace you chose!

## Need to reverse it?
No problem—just select Unmount to undo the change instantly.
:::image type="content" source="media/migrate-planning-azure-data-factory/unmount-from-azure-data-factory-user-interface.png" alt-text="Screenshot showing unmount Azure Data Factory Item in ADF.":::

## Related content

[Migration considerations from ADF to Data Factory in Fabric](migrate-planning-azure-data-factory.md)
