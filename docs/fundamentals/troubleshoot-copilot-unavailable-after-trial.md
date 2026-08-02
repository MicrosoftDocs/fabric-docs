---
title: Fix Copilot unavailable after a trial expires in Power BI
description: Diagnose and fix Copilot unavailability in Power BI after a Microsoft Fabric trial expires or a workspace loses supported capacity.
author: rrubinstein
ms.author: rrubinstein
ms.reviewer: sngun
ms.service: fabric
ms.topic: troubleshooting-general
ms.date: 07/10/2026
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#customer intent: As a Power BI user, I want to resolve Copilot unavailability after my Fabric trial expires so that I can continue using Copilot features.
---

# Troubleshoot Copilot unavailability after a trial expires

You might see Copilot become unavailable in Power BI when your workspace no longer has the required capacity assigned. This situation can happen after a Microsoft Fabric trial expires, or when you try to use Copilot in a workspace that isn't backed by a supported paid capacity.

This issue often affects you if you expect per-user licenses alone to enable Copilot. Copilot access depends on your workspace or account having a supported capacity, not on a per-user license.

This article helps you confirm whether a capacity change caused the problem and work through the checks needed to restore Copilot access.

## Prerequisites

- Access to the Power BI or Fabric portal.
- A workspace where you want to use Copilot.
- Admin, member, or contributor access to at least one workspace if you're using Copilot in Power BI Desktop.

## Symptoms

You experience one or more of the following symptoms:

- Copilot isn't available in your workspace, and you see a message similar to the following:

  > Copilot isn't available because none of your workspaces have the necessary capacity assigned. Contact your administrator or learn how Copilot access works.

- Copilot features that worked previously stop working after your Fabric trial expires.
- You lose editing or sharing capabilities and revert to Fabric (Free) because your trial or paid license expired or was removed.

## Cause

Copilot access requires a supported capacity. You can lose access when:

- Your Fabric trial expires. Fabric revokes access to the trial capacity and reassigns affected workspaces to Pro. For details, see [When your Fabric trial ends](fabric-trial.md#when-your-fabric-trial-ends).
- Your workspace isn't assigned to a supported capacity. For the list of supported options, see [Step 2](#step-2-verify-that-your-workspace-has-supported-capacity) in the troubleshooting checklist.
- Your Power BI Pro or Premium Per User (PPU) license expires or is removed, which reduces your Power BI capabilities.

## Troubleshooting checklist

Work through these steps to identify why Copilot is unavailable.

### Step 1: Check whether your Fabric trial expired

Notifications appear in the Fabric portal and on the **Capacity settings** page of the Admin portal as a trial nears expiration. To check the current status, go to **Admin portal** > **Capacity settings** > **Trial**.

### Step 2: Verify that your workspace has supported capacity

Confirm that your workspace is assigned to one of these supported capacity options:

- A paid Fabric capacity (F2 or higher).
- A supported Power BI Premium capacity (P1 or higher) with Copilot enabled.
- A [Fabric Copilot capacity](../enterprise/fabric-copilot-capacity.md).

For guidance on assigning a workspace to a Copilot-enabled capacity, see [Enable and configure Copilot in Microsoft Fabric](copilot-enable-fabric.md).

### Step 3: Check whether a Fabric Copilot capacity is assigned to you

If you aren't using a specific workspace capacity, verify with your administrator whether your organization assigned you to a Fabric Copilot capacity. When you're assigned to a Fabric Copilot capacity, you don't need to take other steps to use Copilot. For more information, see [Fabric Copilot capacity](../enterprise/fabric-copilot-capacity.md).

### Step 4: Review your current license state

If you lose editing or sharing capabilities, check whether your Pro or PPU license expired or was removed. If it did, you might have reverted to Fabric (Free). To restore access, see [Solution 3](#solution-3-restore-your-license-or-request-copilot-capacity-assignment).

## Solution

Pick the solution that matches what you found in the checklist.

### Solution 1: Reassign the workspace to a supported capacity

1. Check whether the workspace was previously using a Fabric trial capacity.
1. If the trial expired, reassign the workspace to a supported capacity. For steps, see [Assign workspaces and provision access](copilot-enable-fabric.md#assign-workspaces-and-provision-access).
1. Use one of the supported capacity options listed in [Step 2](#step-2-verify-that-your-workspace-has-supported-capacity).

### Solution 2: Start a new trial or purchase a paid capacity

1. If your tenant already has active trial capacities, assign the workspace to one of them through **Capacity settings**.
1. If trial options aren't available, switch to a paid option such as an Azure pay-as-you-go Fabric capacity, an F SKU, or a Power BI Premium P SKU. For details, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md).
1. If applicable in your tenant, ensure the **Users can create Fabric items** setting is enabled so you can create a trial.

### Solution 3: Restore your license or request Copilot capacity assignment

1. If your Pro or PPU license expired or was removed, restore it or start an active Fabric capacity trial.
1. If you're using Copilot in Power BI Desktop, make sure you have admin, member, or contributor access to at least one supported workspace.
1. If your organization uses Fabric Copilot capacity, ask your administrator to assign you to that capacity.

## Related content

- [Enable and configure Copilot in Microsoft Fabric](copilot-enable-fabric.md)
- [Fabric Copilot capacity](../enterprise/fabric-copilot-capacity.md)
- [Try Microsoft Fabric for free](fabric-trial.md)
- [Copilot for Microsoft Fabric and Power BI: FAQ](copilot-faq-fabric.yml)
- [Enable Copilot for Power BI](/power-bi/create-reports/copilot-enable-power-bi)
- [Copilot in Power BI tutorial: Get started](/power-bi/create-reports/tutorial-copilot-power-bi-get-started)
