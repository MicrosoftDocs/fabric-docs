---
title: Create and manage streaming virtual network data gateway
description: Learn how to create and manage a streaming virtual network data gateway.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom: sfi-image-nochange, sfi-ropc-nochange
ms.date: 01/27/2026
ms.search.form: Eventstream connector private network support
---

# Create and manage a streaming virtual network data gateway

A Streaming virtual network data gateway provides an abstraction of the Azure virtual network and its subnet resources within Fabric. It allows Eventstream’s streaming connector service to use the Azure virtual network and subnet resource, injecting the connector into this Azure virtual network. As a result, Eventstream’s streaming connector can access streaming sources within a private network to collect real-time data for Fabric.

## Create a streaming virtual network data gateway

Before you create a streaming virtual network data gateway, you must complete the following prerequisites:

- Register the `Microsoft.MessagingConnectors` resource provider in your Azure subscription. For detailed steps, see [Register the connector resource provider](./streaming-connector-private-network-support-guide.md#prerequisite-1-register-the-connector-resource-provider). 
- Create an Azure virtual network with a subnet and delegate a subnet to `Microsoft.MessagingConnectors`. For detailed steps, see [Set up an Azure virtual network](./streaming-connector-private-network-support-guide.md#prerequisite-2-set-up-an-azure-virtual-network).

After completing these prerequisites, you can create a streaming virtual network data gateway. 

When adding sources to your eventstream in Fabric, select a source, that is, Azure Service Bus and the Get events wizard is opened. Select **Set up** to open the **Manage connections and gateways** page and you can create your **Streaming virtual network gateways**.

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/wizard.png" alt-text="Screenshot of showing the service bus wizard." lightbox="media/streaming-connector-virtual-network-on-premises-support/wizard.png":::

1. Navigate to **Streaming virtual network data gateways**, then select **New**. 
1. Select the **Azure subscription** where you created the virtual network in the previous steps, along with the **Resource group**, **Virtual network**, and **Subnet**. 
1. Specify a **name** and select **Save** to complete the creation.

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/create-data-gateway.png" alt-text="Screenshot of showing how to create streaming virtual network data gateway." lightbox="media/streaming-connector-virtual-network-on-premises-support/create-data-gateway.png":::

After a Streaming virtual network data gateway is created, it's available in Fabric: **Manage Connections and Gateways > Streaming virtual network data gateways** tab where you can manage it. In this page, it lists all the streaming virtual network data gateways that you have the permission to access. In each item row, it shows the corresponding Azure virtual network resource details.

:::image type="content" source="media/create-manage-streaming-virtual-network-data-gateways/manage.png" alt-text="Screenshot of showing where to manage to stream virtual network data gateways." lightbox="media/create-manage-streaming-virtual-network-data-gateways/manage.png":::

## Manage admin and users

You can manage admins for a streaming virtual network data gateway in Fabric under **Manage Connections and Gateways**, similar to how you manage other data gateway. To add or remove admins, select a streaming virtual network data gateway, and then select Manage users.

You can also share the streaming virtual network data gateway with other users in your organization, so they can see and use it without creating a new one. When sharing, you can assign one of the following roles: **Connection Creator**, **Connection Creator with resharing**, or **Admin**.

:::image type="content" source="media/create-manage-streaming-virtual-network-data-gateways/manage-users.png" alt-text="Screenshot of showing how to manage to stream virtual network data gateways users." lightbox="media/create-manage-streaming-virtual-network-data-gateways/manage-users.png":::

## Update name and description

You can update the name and description of a streaming virtual network data gateway. Select the gateway, and then select **Settings**. In the Settings pane, you can edit the **Name** and **Description**, and then select **Save** to apply the changes.

:::image type="content" source="media/create-manage-streaming-virtual-network-data-gateways/update.png" alt-text="Screenshot of showing how to update streaming virtual network data gateways." lightbox="media/create-manage-streaming-virtual-network-data-gateways/update.png":::

## Delete streaming virtual network gateway

You can delete a streaming virtual network data gateway. Select the **More actions** menu for the gateway, and then select **Remove**.

> [!NOTE]  
> If a Streaming virtual network data gateway is deleted, any connections that reference this data gateway are also deleted.

:::image type="content" source="media/create-manage-streaming-virtual-network-data-gateways/delete.png" alt-text="Screenshot of showing how to delete streaming virtual network data gateways." lightbox="media/create-manage-streaming-virtual-network-data-gateways/delete.png":::

## Next step

- [Eventstream streaming connector private network support overview](./streaming-connector-private-network-support-overview.md)
- [Eventstream streaming connector private network support guide](./streaming-connector-private-network-support-guide.md)
