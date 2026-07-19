---
title: Real-Time Dashboard permissions
description: Learn how to share Real-Time Dashboards without granting access to the underlying data source.
ms.reviewer: mbar
ms.topic: how-to
ms.subservice: rti-dashboard
ms.date: 06/09/2026
author: spelluru
ms.author: spelluru
ai-usage: ai-assisted
---
# Real-time dashboard permissions

Real-Time Dashboards help you visualize and analyze data from various sources. For more information, see [Create a Real-Time Dashboard](dashboard-real-time-create.md).

In this article, you learn how to control dashboard permissions and data source access when you share a real-time dashboard with other users.

Two types of permissions exist:

* **Fabric permissions**: These permissions control the ability to view or edit a real-time dashboard when you share it.
* **Data source permissions**: These permissions control access to the underlying data used by a real-time dashboard.

:::image type="content" source="media/dashboard-permissions/permission-diagram.png" alt-text="Diagram showing the different levels of permissions.":::

## Prerequisites

* A real-time dashboard with at least one data source and one tile.

## Share real-time dashboards

When you [share](../fundamentals/share-items.md) a real-time dashboard, you can specify whether the user can view, edit, or reshare it. These permissions apply to the real-time dashboard itself, not the underlying data. To control access to the underlying data, follow the steps in [Set up data source permissions](#set-up-data-source-permissions).

## Grant access to the data source

You can grant separate permissions to your real-time dashboard and to the underlying data source. You can share a real-time dashboard with a user and allow them to view the tiles and visuals of the real-time dashboard without giving them access to the raw data source.

Set up permissions for the underlying [data source](dashboard-real-time-create.md#add-data-source) by defining the identity that the dashboard uses for accessing data from each data source.

There are two identity options.

* Pass-through identity:

   The real-time dashboard user's identity is used when authenticating to the underlying data source. If the user uses pass-through identity, they can view the data in the tiles only if they already have access to the underlying data source. This option is the default.

* Dashboard editor’s identity:

   This option lets the user use the dashboard editor’s identity, and therefore the editor’s permissions, to access the underlying data source. The editor defines a cloud connection that the dashboard uses to connect to the relevant data source. Only editors can define cloud connections and permissions for a specific real-time dashboard. If there's more than one editor, each editor who modifies the real-time dashboard must set up their own cloud connections.

   If a data source is configured to use dashboard editor’s identity but a valid connection doesn't exist, the user can view the real-time dashboard but can see data only if they have access to it themselves.

## Set up data source permissions

Open a real-time dashboard for which you have edit rights.

### Set up the cloud connection

The cloud connection uses the dashboard editor’s identity to give other users access to the underlying data source.

1. Select **Settings** > **Manage connections and gateways**.

   This action opens the **Manage connections and gateways** page.

   :::image type="content" source="media/dashboard-permissions/settings.png" alt-text="Screenshot showing how to navigate to the Manage connections and gateways view pane.":::

1. In the top ribbon on the **Manage connections** page, select **+ New**.
1. Complete the **New connection** form:

   :::image type="content" source="media/dashboard-permissions/new-connection.png" alt-text="Screenshot showing how to complete the new connection form.":::

   1. Select **Cloud connection** and enter a name for your connection.
   1. Under **Connection type**, select **Azure Data Explorer (Kusto)**.
   1. Under **Cluster**, paste the cluster URI for the cluster you want to connect to. You can get the cluster URI from the eventhouse details on the **System overview** page, or from the [KQL database details](access-database-copy-uri.md#copy-uri) pane.
   1. Under **Authentication method**, select **OAuth 2.0**. Then select **Edit credentials** and complete the verification steps. A pop-up window opens where you verify the user that the real-time dashboard uses to access the database.

   1. Select **Create**, and then **Close**.

You should now see the new cloud connection in the list.

> [!NOTE]
> If you don't use the cloud connection for 90 days, it expires. To reconnect it, go back to the connection on the **Manage connections and gateways** page, select **Edit credentials**, and verify the user again.

> [!NOTE]
> You need a separate connection for each [data source](dashboard-real-time-create.md#add-data-source).

### Set up the data source permissions

After you add the cloud connections, set up permissions for the data sources.

1. Open your real-time dashboard.
1. In the top-right corner, select **Editing**.

   :::image type="content" source="media/dashboard-permissions/viewing-editing-mode.png" alt-text="Screenshot showing the Editing toggle.":::

1. Select **Add data source** on the top toolbar. If the data source already exists, select the pencil icon next to the relevant data source to edit it.

1. Select **Connect**. The **Data source** box appears.
1. To use the dashboard editor’s identity, select **Dashboard editor’s identity**. Then select the connection you want to use from the dropdown menu and select **Apply**. The data source now uses the cloud connection, and people you share the real-time dashboard with can access the data.

    :::image type="content" source="media/dashboard-permissions/edit-data-source.png" alt-text="Screenshot showing the Edit data source box where the applicable identity can be selected.":::

Your data source permissions are now set up. You can share your real-time dashboard with these settings in place.

> [!NOTE]
> If you don't set up cloud connections or permissions for your data source, the default is **Pass-through identity**.

## Permission scenarios

The following table summarizes the various permission scenarios.

| Fabric-level permissions  | Data source permissions |   What can the user see and do? |
| -------- |-------- |-------- |
| Shared with Edit rights | Dashboard editor’s identity using a cloud connection | User can view the data in the tiles and edit the real-time dashboard, for example, by adding new tiles and running new queries. When the user switches to **Edit mode**, a pop-up appears with these options: **Continue editing**, which removes the existing cloud connection and uses the user's own identity and permissions; **Replace data connections**, which lets the user set up their own cloud connections in the **Data sources** pane; or **Back to View mode**, which keeps access through the existing cloud connection. |
| Shared with Edit rights | Pass-through identity | User can only see the data in the tiles if they have their own permissions. They can edit, add new tiles, and run queries, but the tiles show error messages. |
| Shared with View rights only | Dashboard editor’s identity using a cloud connection | User can view the data in the tiles, but they can't edit the real-time dashboard. |
| Shared with View rights only | Pass-through identity | User can view the real-time dashboard but can only see data if they themselves have permissions to the data source. |

## Revoke permissions

To revoke a user’s access permissions, use one of the following methods:

* Remove their access from the real-time dashboard.
* Remove the cloud connection.

  Select **Settings** > **Manage connections and gateways**. Select the **Options** menu alongside the name of the connection you want to remove, and select **Remove**.

  :::image type="content" source="media/dashboard-permissions/remove-connection.png" alt-text="Screenshot showing how to remove a connection.":::

* Remove the user from the cloud connection.

   Select **Settings** > **Manage connections and gateways**. Select the **Options** menu alongside the name of the connection you want to change, and select **Manage users**. Delete the user from the connection by selecting the trashcan icon next to their name in the **Manage users** box.
  
* Edit the data source access permissions.

  In your real-time dashboard, open the **Data source** box by selecting **Add data source** from the top toolbar. Select the **Edit** pencil icon next to the data source you want to edit. Change **Data source access permissions** to **Pass-through identity**. The user now uses their own identity to access the data source.

## Related content

* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [Share items in Microsoft Fabric](../fundamentals/share-items.md)
