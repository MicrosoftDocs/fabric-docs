---
title: Create and Share Cloud Connection of Semantic Model in Fabric Plan
description: Learn how to create and share a cloud connection of a semantic model in Fabric Plan.
ms.date: 04/04/2026
ms.topic: how-to
---

# Create and share a cloud connection for a semantic model
This article explains how to connect to a semantic model in Plan for **non-admin users**.

To connect a Plan to a semantic model, a workspace admin must create a **shareable cloud connection** for the semantic model. Other users can use this to connect to the Semantic Model. The following steps will show how to create and share the connection.

## Objective

To connect to a semantic model from within a Plan artifact when the user is not an admin of the workspace hosting the semantic model

## Create a semantic model connection

These steps need to be completed by an Admin of the workspace that hosts the Semantic Model.
1. Go to **Settings > Manage connections and gateways > New.**

:::image type="content" source="media/planning-sheet-create-share-semantic-connection/manage-connection-gateways.png" alt-text="Screenshot of opening the manage connection gateways settings.":::

1. Select **Cloud** as the **new connection**.
1. Enter a **Connection name**.
1. For **Connection type**, select *Power BI Semantic Model*.
1. Set the **Authentication method** to *OAuth2.0*.
1. Select **Edit credentials**, then sign in with your Microsoft account.

:::image type="content" source="media/planning-sheet-create-share-semantic-connection/new-semantic-connection.png" alt-text="Screenshot of new semantic model connection.":::

1. Select **Create** to create the connection.

>[!NOTE]
>This connection is used to connect to your semantic models when you create a plan.

## Share the semantic model connection
1. Select on the created Semantic Model Connection and select **Manage users.**

:::image type="content" source="media/planning-sheet-create-share-semantic-connection/manage-user.png" alt-text="Screenshot of opening the manage user connection.":::

1. Search the **name or email ID** of the users to share the semantic model connection.
1. Set the **access permission** as User, User with resharing, or Owner.
1. Select **Share** to share the connection.

:::image type="content" source="media/planning-sheet-create-share-semantic-connection/manage-users-settings.png" alt-text="Screenshot of manage users settings.":::

1. The semantic connection created is shared, which can be accessed by the shared non-admin users.

>[!NOTE]
>Non-Admin users can use this shared connection to connect to the semantic model.

## Connect to a Direct Lake semantic model

Connection steps required for the Direct Lake Semantic Model are listed below for users who wish to connect to direct lake semantic model.

1. Go to **Semantic Model Settings**→ **Gateway & Cloud Connections**

:::image type="content" source="media/planning-sheet-create-share-semantic-connection/dl-semantic-settings.png" alt-text="Screenshot of opening semantic model settings for direct lake.":::

1. By default, the connection is set to **Single Sign On.** You can create and use a new connection.
1. Select **Create a connection** from the connection list

:::image type="content" source="media/planning-sheet-create-share-semantic-connection/dl-connection.png" alt-text="Screenshot the manage connection gateways settings.":::

1. Enter the new **connection name, and** *OAuth 2.0* as the **authentication method.**
1. Select **create**.

:::image type="content" source="media/planning-sheet-create-share-semantic-connection/dl-sql-connection.png" alt-text="Screenshot of creating a direct lake sql connection.":::

1. Select the newly created direct lake semantic model connection from the list and **apply.**

:::image type="content" source="media/planning-sheet-create-share-semantic-connection/dl-apply-connection.png" alt-text="Screenshot of applying the created connection.":::





   
