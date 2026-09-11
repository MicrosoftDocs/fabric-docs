---
title: Enable co-publishers for a Fabric data agent in Microsoft 365 Copilot
description: Learn how to register Fabric data agent co-creators as co-publisher on the Microsoft 365 agent store so they can publish the data agent to Microsoft 365 Copilot.
author: amjafari
ms.author: amjafari
ms.reviewer: amjafari
ms.topic: how-to
ms.date: 07/22/2026
ms.custom: fabric-data-agent, microsoft-365-copilot
---

# Enable co-publishers for a Fabric data agent in Microsoft 365 Copilot

When you publish a Fabric data agent to Microsoft 365 Copilot, you register it with the Microsoft 365 agent platform, and you're registered as the sole owner.

Your data agent co-creators can still edit the data agent in Fabric, but if they try to republish it to Microsoft 365 Copilot, the operation fails because Microsoft 365 Copilot doesn't recognize them as owners. Microsoft 365 Copilot allows only the registered owners to re-publish the same data agent.

This article shows you how to register others as co-owners on the Microsoft 365 agent platform so that any data agent co-creator in Fabric can also republish the same data agent to Microsoft 365 Copilot.

## Prerequisites

- You're the creator of a Fabric data agent.
- You have permission to share the workspace that contains the data agent.
- You have permission to publish the data agent to Microsoft 365 Copilot.

## How ownership works across Fabric and Microsoft 365

When it comes to publishing a Fabric data agent to Microsoft 365 Copilot, you have two separate sets of owners:

- **Fabric ownership** determines who can edit the data agent in Fabric and publish it to Microsoft 365 Copilot **for the first time**. You grant this access through workspace roles or by sharing the data agent. The person to publish the data agent for the first time to Microsoft 365 Copilot becomes its sole owner in Microsoft 365.
- **Microsoft 365 ownership** determines who are registered with the Microsoft 365 agent platform as the owners of the data agent. After the data agent has been published to the Microsoft 365 Copilot for the first time, only these registered owners and co-owners can republish the data agent to Microsoft 365 Copilot.

The Fabric ownership and Microsoft 365 ownership lists are independent. Granting someone edit access to a data agent in Fabric doesn't allow them to republish it to Microsoft 365 Copilot. To allow them to republish the data agent, you must also register them as co-owners on the Microsoft 365 agent platform in the data agent settings.

## Step 1: Add Fabric co-creators

Before you publish the data agent, give each collaborator co-creator access in Fabric. Use one of these methods:

- **Grant workspace access.** Add the user to the workspace that contains the data agent with a role that allows editing, such as **Contributor** or **Member**.
- **Share the data agent directly.** Share the data agent with the user and grant **Edit** permission. For more information about the different permissions for a Fabric data agent, see [Fabric data agent sharing and permission management](./data-agent-sharing.md).

Repeat this step for every person who needs to edit or republish the data agent.

## Step 2: Publish the data agent to Microsoft 365 Copilot

After you validate the performance of the data agent and are ready for users to access it in Microsoft 365 Copilot, publish the data agent to Microsoft 365 Copilot:

1. Select **Publish**.
1. Turn on the **Publish to Microsoft 365 Copilot** toggle.

The Microsoft 365 agent platform registers the data agent and records you as its sole owner.

## Step 3: Add Fabric co-creators as Microsoft 365 co-publishers

Right after you publish the data agent to Microsoft 365 Copilot, add your Fabric co-creators as co-publishers:

1. In the data agent, open the **Settings** pane.
1. Select the **Publishing** pane.
1. Navigate to the **Microsoft 365 Copilot co-publishers** section and add each Fabric co-creator from [Step 1](#step-1-add-fabric-co-creators).
1. The users you add appear under **Co-publishers** and are recorded as data agent owners on the Microsoft 365 agent platform.

Each co-publisher you add becomes a co-owner of the agent in Microsoft 365. The agent registration changes from a single owner to shared ownership, and any co-publisher in the list can republish the agent to Microsoft 365 Copilot.

:::image type="content" source="./media/data-agent-enable-co-publishers/microsoft-365-copilot-co-publishers.png" alt-text="The Publishing pane where you add Microsoft 365 co-publishers to your Fabric data agent." lightbox="./media/data-agent-enable-co-publishers/microsoft-365-copilot-co-publishers.png":::

> [!IMPORTANT]
> Add co-publishers immediately after publishing the data agent to Microsoft 365 Copilot. If the co-creator of the data agent tries to republish the data agent to Microsoft 365 Copilot before you add them as a co-publisher, the publish operation fails because the Microsoft 365 agent platform doesn't recognize them as co-owners of the data agent.

> [!NOTE]
> Microsoft 365 co-publishers are managed separately from Fabric workspace and data agent permissions. Adding or removing a co-publisher doesn't affect a user's data agent access, and changing data agent access doesn't affect Microsoft 365 ownership.

## Related content

- [Create a Fabric data agent](./how-to-create-data-agent.md)
- [Share a Fabric data agent](./data-agent-sharing.md)
- [Publish a Fabric data agent to Microsoft 365 Copilot](./data-agent-microsoft-365-copilot.md)
