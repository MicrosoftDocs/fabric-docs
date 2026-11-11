---
title: Manage co-publishers for a Fabric data agent in Microsoft Copilot
description: Learn how to register Fabric data agent co-creators as co-publishers so they can republish the data agent or delete it from both Fabric and Microsoft Copilot.
author: amjafari
ms.author: amjafari
ms.reviewer: amjafari
ms.topic: how-to
ms.date: 10/26/2026
ms.custom: fabric-data-agent, microsoft-365-copilot
ai-usage: ai-assisted
---

# Manage co-publishers for a Fabric data agent in Microsoft Copilot

When you publish a Fabric data agent to Microsoft Copilot, you register it with the Microsoft Copilot agent platform, and you're registered as the sole owner.

Your data agent co-creators can still edit the data agent in Fabric, but if they try to republish it to Microsoft Copilot, the operation fails because Microsoft Copilot doesn't recognize them as owners. Microsoft Copilot allows only the registered owners to republish the same data agent.

The same is true for deletion. If a co-creator deletes the data agent, or the workspace that contains it, Fabric deletes the data agent, but it stays in Microsoft Copilot.

This article shows you how to register others as co-owners on the Microsoft Copilot agent platform so that any data agent co-creator in Fabric can also republish the same data agent to Microsoft Copilot, or delete it from both Fabric and Microsoft Copilot.

## Prerequisites

- You're the creator of a Fabric data agent.
- You have permission to share the workspace that contains the data agent.
- You have permission to publish the data agent to Microsoft Copilot.

## How ownership works across Fabric and Microsoft Copilot

When it comes to publishing a Fabric data agent to Microsoft Copilot, you have two separate sets of owners:

- **Fabric ownership** determines who can edit the data agent in Fabric and publish it to Microsoft Copilot **for the first time**. You grant this access through workspace roles or by sharing the data agent. The person that publishes the data agent for the first time to Microsoft Copilot becomes its sole owner in Microsoft Copilot.
- **Microsoft Copilot ownership** determines who is registered with the Microsoft Copilot agent platform as an owner of the data agent. After the data agent has been published to Microsoft Copilot for the first time, only these registered owners and co-owners can republish the data agent to Microsoft Copilot or delete it from both Fabric and Microsoft Copilot.

The Fabric ownership and Microsoft Copilot ownership lists are independent. Granting someone edit access to a data agent in Fabric doesn't allow them to republish it to Microsoft Copilot or remove it from Microsoft Copilot. To allow them to do either, you must also register them as co-owners on the Microsoft Copilot agent platform in the data agent settings.

## Step 1: Add Fabric co-creators

Before you publish the data agent, give each collaborator co-creator access in Fabric. Use one of these methods:

- **Grant workspace access.** Add the user to the workspace that contains the data agent with a role that allows editing, such as **Contributor** or **Member**.
- **Share the data agent directly.** Share the data agent with the user and grant **Edit and view details** permission. For more information about the different permissions for a Fabric data agent, see [Fabric data agent sharing and permission management](./data-agent-sharing.md).

Repeat this step for every person who needs to edit or republish the data agent.

## Step 2: Publish the data agent to Microsoft Copilot

After you validate the performance of the data agent and are ready for users to access it in Microsoft Copilot, publish the data agent to Microsoft Copilot:

1. Select **Publish**.
1. Turn on the toggle to publish to Microsoft Copilot.
1. Select **Publish** to confirm.

The Microsoft Copilot agent platform registers the data agent and records you as its sole owner.

## Step 3: Add Fabric co-creators as Microsoft Copilot co-publishers

Right after you publish the data agent to Microsoft Copilot, add your Fabric co-creators as co-publishers:

1. In the data agent, open the **Settings** pane.
1. Select the **Publishing** pane.
1. Navigate to the **Microsoft Copilot co-publishers** section and add each Fabric co-creator from [Step 1](#step-1-add-fabric-co-creators).

The users you add appear under **Co-publishers**. Each co-publisher you add becomes a co-owner of the agent in Microsoft Copilot. The agent registration changes from a single owner to shared ownership, and any co-publisher in the list can republish the agent to Microsoft Copilot or delete it from both Fabric and Microsoft Copilot.

:::image type="content" source="./media/data-agent-enable-co-publishers/microsoft-copilot-co-publishers.png" alt-text="Screenshot of the Publishing pane where you add Microsoft Copilot co-publishers to your Fabric data agent." lightbox="./media/data-agent-enable-co-publishers/microsoft-copilot-co-publishers.png":::

> [!IMPORTANT]
> Add co-publishers immediately after publishing the data agent to Microsoft Copilot. If the co-creator of the data agent tries to republish the data agent to Microsoft Copilot before you add them as a co-publisher, the publish operation fails because the Microsoft Copilot agent platform doesn't recognize them as co-owners of the data agent. If they delete the data agent or its workspace before you add them, the data agent stays in Microsoft Copilot.

> [!NOTE]
> Microsoft Copilot co-publishers are managed separately from Fabric workspace and data agent permissions. Adding or removing a co-publisher doesn't affect a user's data agent access, and changing data agent access doesn't affect Microsoft Copilot ownership.

## Delete a published data agent or its workspace

When a registered owner or co-owner deletes a published data agent, or the workspace that contains it, the data agent is deleted from both Fabric and Microsoft Copilot.

When a co-creator who isn't a registered owner or co-owner does the same:

- Fabric deletes the data agent and doesn't show a warning.
- The data agent stays in Microsoft Copilot. Users can still see it, but it fails when they use it because it no longer exists in Fabric.

Before anyone deletes a published data agent or its workspace, ensure they're registered as an owner or co-owner. If they aren't, add them as a co-publisher first, as described in [Step 3](#step-3-add-fabric-co-creators-as-microsoft-copilot-co-publishers).

## Related content

- [Create a Fabric data agent](./how-to-create-data-agent.md)
- [Share a Fabric data agent](./data-agent-sharing.md)
- [Publish a Fabric data agent to Microsoft Copilot](./data-agent-microsoft-365-copilot.md)
