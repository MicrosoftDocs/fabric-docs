---
title: Manage shortcut connections
description: How to update the shared cloud connections that are created to enable OneLake shortcuts.
ms.reviewer: trolson
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
ms.date: 04/23/2025
#customer intent: As a data engineer, I want to know which of my shortcut connections are out of date and be able to change or replace them as needed so that our data connections stay current.
---

# Manage connections for shortcuts

Shortcuts in OneLake use shared cloud connections to access the cloud resources where your data is stored. These connections can be managed on a per-shortcut basis, but you can also view and update connections in bulk to keep all of your shortcuts working efficiently.

## View shortcut connections

You can view and manage all existing cloud connections for shortcuts in a single lakehouse.

1. In the [Microsoft Fabric portal](https://app.fabric.microsoft.com), navigate to your lakehouse.

1. Select **Settings**.

   :::image type="content" source="./media/manage-shortcut-connections/lakehouse-settings.png" alt-text="Screenshot that shows the settings icon in a lakehouse.":::

1. Select **Shortcut connections**.

   :::image type="content" source="./media/manage-shortcut-connections/shortcut-connections.png" alt-text="Screenshot that shows the shortcut connections options in the lakehouse settings menu.":::

1. On the **Manage OneLake shortcut connections** page, you can view all connections. The **Action required** section highlights any broken connections that need attention. You can also see how many shortcuts share each connection.

## Replace shortcut connections

There are many reasons that you might have to replace a cloud connection. Maybe the connection is broken, maybe the user that created that connection left your organization and you can't access the connection anymore, or maybe you want to switch to a different connection that uses a different authentication method. 

1. On the **Manage OneLake shortcut connections** page, select **Replace** for the connection that you want to update.

   :::image type="content" source="./media/manage-shortcut-connections/replace-connection.png" alt-text="Screenshot that shows the replace option for a shortcut connection.":::

1. Select either **Existing connection** or **Create new connection**.

1. Provide the new connection information.

   * For an existing connection, use the drop-down menu to select the connection, then select **Save**.
   * For a new connection, provide the connection settings and credentials, then select **Save**.

Once the new cloud connection is established, all of the shortcuts that used the old connection are updated to use the new connection.
