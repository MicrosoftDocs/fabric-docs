---
title: Create a Semantic Model Connection in a Plan (Preview)
description: Learn how to create and share a cloud connection of a semantic model in a plan (preview).
ms.date: 04/30/2026
ms.topic: how-to
---

# Create and share a cloud connection for a semantic model

This article explains how to connect to a semantic model from a plan item. This step is required to work with your semantic model data in a planning sheet.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

To connect a plan to a semantic model, a workspace admin or member must create a shareable cloud connection. Other users can use this connection to access the semantic model. The following steps describe how to create and share the connection.

## Prerequisites

Before you can create the semantic model connection, make sure that you have:

* Data in a [Power BI semantic model](../../data-warehouse/semantic-models.md).

## Create a semantic model connection

Use this connection to connect to your semantic models when you create a plan. A workplace admin or member who has access to the semantic model must complete the following steps.

1. In your Microsoft Fabric toolbar, select the **Settings** icon. Select **Manage connections and gateways** > **New**.

    :::image type="content" source="media/planning-how-to-create-semantic-model-connection/manage-connection-gateways.png" alt-text="Screenshot of opening the manage connection gateways settings.":::

1. For the new connection, select **Cloud**.

1. Enter a connection name.

1. For **Connection type**, select **Power BI Semantic Model**.

1. For **Authentication method**, select **OAuth2.0**.

1. Select **Edit credentials**, and then sign in with your Microsoft account.

1. Select **Create**.

:::image type="content" source="media/planning-how-to-create-semantic-model-connection/new-semantic-connection.png" alt-text="Screenshot of new semantic model connection.":::

## Share the semantic model connection

1. Next to the name of the semantic model connection in your Fabric workspace, select **...**, and then select **Manage users**.

    :::image type="content" source="media/planning-how-to-create-semantic-model-connection/manage-users.png" alt-text="Screenshot of opening the manage user connection.":::

1. Search for the name or email of the users to share the semantic model connection.

1. Set the access permission to one of the following options: **User**, **User with resharing**, or **Owner**.

1. Select **Share** to share the connection.

    :::image type="content" source="media/planning-how-to-create-semantic-model-connection/manage-users-settings.png" alt-text="Screenshot of manage users settings.":::

Other users can now use this shared connection to connect to the semantic model.

## Connection types supported in a planning sheet

Planning supports the following connection types.

| Connection type | Support status             | Requirements                                                                           |
|-----------------|----------------------------|----------------------------------------------------------------------------------------|
| Import mode     | Supported fully            | None.                                                                                  |
| Direct Lake     | Supported with limitations | Gateway must use fixed credentials. Single sign-on (SSO) isn't supported at this time. |
| DirectQuery     | Supported with limitations | Gateway must use fixed credentials. SSO isn't supported at this time.                  |

## Connect to a Direct Lake semantic model

If you want to connect to a Direct Lake semantic model, follow these steps. An *Admin* or *Member* user can perform these steps.

1. Next to the name of the semantic model in your Fabric workspace, select **...** > **Settings** > **Gateway and cloud connections**.

    :::image type="content" source="media/planning-how-to-create-semantic-model-connection/semantic-settings.png" alt-text="Screenshot of opening semantic model settings for Direct Lake.":::

1. By default, the connection is set to SSO. You can create and use a new connection.

1. From the connection list, select **Create a connection**.

    :::image type="content" source="media/planning-how-to-create-semantic-model-connection/connection.png" alt-text="Screenshot of the manage connection gateways settings.":::

1. Enter the new connection name. For **Authentication method**, select **OAuth 2.0**.

1. Select **Create**.

    :::image type="content" source="media/planning-how-to-create-semantic-model-connection/new-connection.png" alt-text="Screenshot of creating a new Direct Lake connection.":::

1. Select the newly created Direct Lake semantic model connection from the list, and then select **Apply**.

    :::image type="content" source="media/planning-how-to-create-semantic-model-connection/apply-connection.png" alt-text="Screenshot of applying the created connection.":::

## Related content

* Now that you created your semantic model connection, you can create a planning sheet that uses this connection. See [Create a planning sheet](planning-how-to-get-started.md).
* [Prerequisites for plan (preview)](overview-prerequisites.md)
* [Troubleshoot semantic model connections in plan (preview)](planning-troubleshoot-semantic-model.md)
