---
title: Create a semantic model connection in plan (preview)
description: Learn how to create and share a cloud connection of a semantic model in plan (preview).
ms.date: 04/04/2026
ms.topic: how-to
---

# Create and share a cloud connection for a semantic model

This article explains how to connect to a semantic model from a plan (preview) item.

To connect a plan to a semantic model, a workspace admin or member must create a **shareable cloud connection**. Other users can use this connection to access the semantic model. The following steps describe how to create and share the connection.

## Prerequisites

Before you can create the semantic model connection, make sure you have the following prerequisite in place:

* Data in a [Power BI semantic model](../../data-warehouse/semantic-models.md)

## Create a semantic model connection

This connection is used to connect to your semantic models when you create a plan. The following steps must be completed by a workspace admin or member who has access to the semantic model.

1. In your Fabric toolbar, select the **Settings** icon. Select **Manage connections and gateways > New**.

    :::image type="content" source="media/planning-how-to-create-semantic-connection/manage-connection-gateways.png" alt-text="Screenshot of opening the manage connection gateways settings.":::

1. Select **Cloud** as the **New connection**.
1. Enter a **Connection name**.
1. For **Connection type**, select *Power BI Semantic Model*.
1. Set the **Authentication method** to *OAuth2.0*.
1. Select **Edit credentials**, then sign in with your Microsoft account.
1. Select **Create**.

:::image type="content" source="media/planning-how-to-create-semantic-connection/new-semantic-connection.png" alt-text="Screenshot of new semantic model connection.":::

## Share the semantic model connection

1. Next to the name of the semantic model connection in your Fabric workspace, select **...** and **Manage users**.

    :::image type="content" source="media/planning-how-to-create-semantic-connection/manage-users.png" alt-text="Screenshot of opening the manage user connection.":::

1. Search the **name or email** of the users to share the semantic model connection.
1. Set the access permission to either *User*, *User with resharing*, or *Owner*.
1. Select **Share** to share the connection.

    :::image type="content" source="media/planning-how-to-create-semantic-connection/manage-users-settings.png" alt-text="Screenshot of manage users settings.":::

1. The semantic connection created is shared and can be accessed by other users.

Other users can now use this shared connection to connect to the semantic model.

## Connect to a Direct Lake semantic model

If you want to connect to a Direct Lake semantic model, follow the steps below. These steps can be performed by admin or member users.

1. Next to the name of the semantic model in your Fabric workspace, select **... > Settings > Gateway & Cloud Connections**.

    :::image type="content" source="media/planning-how-to-create-semantic-connection/semantic-settings.png" alt-text="Screenshot of opening semantic model settings for direct lake.":::

1. By default, the connection is set to **Single Sign On**. You can create and use a new connection.
1. Select **Create a connection** from the connection list.

    :::image type="content" source="media/planning-how-to-create-semantic-connection/connection.png" alt-text="Screenshot the manage connection gateways settings.":::

1. Enter the new **connection name**, and select *OAuth 2.0* as the **authentication method.**
1. Select **Create**.

    :::image type="content" source="media/planning-how-to-create-semantic-connection/new-connection.png" alt-text="Screenshot of creating a new direct lake connection.":::

1. Select the newly created Direct Lake semantic model connection from the list. Select **Apply.**

    :::image type="content" source="media/planning-how-to-create-semantic-connection/apply-connection.png" alt-text="Screenshot of applying the created connection.":::

## Next steps

Now that your semantic model connection is created, you can create a Planning sheet that uses this connection: [Create a Planning sheet](planning-how-to-get-started.md).