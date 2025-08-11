---
title: Real-Time Dashboard permissions
description: Learn how to share Real-Time Dashboards without giving access to the underlying data source.
ms.reviewer: yaschust
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 05/15/2025
---
# Real-Time Dashboard permissions

Real-Time Dashboards are powerful tools for visualizing and analyzing data from various sources. For more information on Real-Time Dashboards, see [Create a Real-Time Dashboard](dashboard-real-time-create.md).

In this article, you learn how to grant permissions and control access to data sources when sharing your real-time dashboards with other users.

There are two types of permissions:

* **Fabric permissions**: These permissions control the ability to view or edit a real-time dashboard when it's shared.
* **Data source permissions**: These permissions control access to the underlying data used by a real-time dashboard.

:::image type="content" source="media/dashboard-permissions/permission-diagram.png" alt-text="Diagram showing the different levels of permissions.":::

## Prerequisites

* A real-time dashboard with at least one data source and one tile.

## Sharing Real-Time Dashboards

When you [share](../fundamentals/share-items.md) a real-time dashboard, you can specify if the user can view, edit, or share. These permissions are for the real-time dashboard itself and not the underlying data. Access to the underlying data can be controlled by following the steps in [Set up data source permissions](#set-up-data-source-permissions).

## Grant access to the data source

You can grant separate permissions to your real-time dashboard and to the underlying data source. You can share a real-time dashboard with a user and allow them to view the tiles and visuals of the real-time dashboard without giving them access to the raw data source.

Set up permissions for the underlying [data source](dashboard-real-time-create.md#add-data-source) by defining the identity that the dashboard uses for accessing data from each data source.

There are two identity options.

* Pass-through identity:

   The real-time dashboard user's identity is used when authenticating to access the underlying data source. If the user is using pass-through identity, they'll only be able to view the data in the tiles if they have access to the underlying data source. This is the default setting.

* Dashboard editor’s identity:

   This option allows the user to use the Dashboard editor’s identity, and therefore their permissions, to access the underlying data source. The editor defines a cloud connection that the dashboard uses to connect to the relevant data source. Only editors can define cloud connections and permissions for a specific real-time dashboard. If there's more than one editor, each editor that modifies the real-time dashboard needs to set up their own cloud connections.

   If a data source is configured to use Dashboard editor’s identity but a valid connection doesn't exist, the user is able to view the real-time dashboard but will only see data if they themselves have access to it.

## Set up data source permissions

Navigate to a real-time dashboard for which you have edit rights.

### Set up the cloud connection

The cloud connection uses the real-time dashboard owner's identity to give access to the underlying data source to other users.

1. In Settings, select **Manage connections and gateways**

   This takes you to your Manage Connections and Gateways page in Power BI.

   :::image type="content" source="media/dashboard-permissions/settings.png" alt-text="Screenshot showing how to navigate to the Manage connections and gateways view pane.":::

1. In the top ribbon on the **Manage connections** page, select **+ New**.
1. Complete the New connection form:

   :::image type="content" source="media/dashboard-permissions/new-connection.png" alt-text="Screenshot showing how to complete the new connection form.":::

   1. Select **Cloud connection** and give your connection a name.
   1. Under **Connection type**, enter Azure Data Explorer (Kusto).
   1. Under **Cluster**, paste the Cluster URI for the cluster you want to connect to. You can get your Cluster URI from the Eventhouse details in your Eventhouse System Overview page, or in your [KQL database details](access-database-copy-uri.md#copy-uri) pane.
   1. Under **Authentication method**, select **OAuth 2.0**. Complete the verification steps by selecting **Edit credentials**. This opens a popup window where you verify the user that the real-time dashboard will use to access the database.

   1. Select **Create**, then **Close**.

You should now see the new cloud connection added to the list displayed in the viewing pane.

> [!NOTE]
> If the cloud connection is not used for 90 days, it will expire and a new gateway connection will need to be set up. To do this, you need to go back to the connection in the **Manage connections and Gateways** page, select **Edit credentials** and verify the user again.

> [!NOTE]
> You need a separate connection for each [data source](dashboard-real-time-create.md#add-data-source).

### Set up the data source permissions

Once the cloud connections are added, you can set up the permissions for the data sources.

1. Browse to Real-Time Intelligence in the navigation bar, and open your real-time dashboard.
1. In the top menu select **Viewing** and toggle to **Editing mode**.

   :::image type="content" source="media/dashboard-permissions/viewing-editing-mode.png" alt-text="Screenshot showing the toggle to Edit mode.":::

1. Select **New data source** in the top toolbar. If your data source already exists, it appears listed below the **Add+** button. Select the **Edit** pencil icon next to the relevant data source to edit it.

1. Select **Connect**. The **Data source** box appears.
1. To change the access permissions to use the Dashboard editor’s identity, select **Dashboard editor’s identity** and select the connection you want to use from the dropdown menu. Select **Apply**. The data source now has a cloud connection associated with it and the users that you share this real-time dashboard with are able to access the data.

    :::image type="content" source="media/dashboard-permissions/edit-data-source.png" alt-text="Screenshot showing the Edit data source box where the applicable identity can be selected.":::

Your data source permissions are now set up. You can share your real-time dashboard with these settings in place.

> [!NOTE]
> If you do not set up any cloud connections or permissions for your data source, the default will use Pass-through identity.

## Permissions scenarios

The following table summarizes the various permissions scenarios.

| Fabric-level permissions  | Data source permissions |   What can the user see and do? |
| -------- |-------- |-------- |
| Shared with Edit rights | Dashboard editor’s identity using a cloud connection | User can view the data in the tiles and edit the real-time dashboard, for example add new tiles and run new queries. However, when the user toggles to **Edit mode**, a pop-up message appears. The pop-up box gives the user the option to: <br> <ul> <li>**Continue editing**: the user can edit, but the cloud connection to the Dashboard editor’s identity is lost and they use their own identity and permissions.</li> <li>**Replace data connections**: the user is required to set up their own cloud connections to access the data. You're directed straight to the Data sources pane where this can be done. </li> <li>**Back to View mode**: stay in View mode with access to the data through the existing cloud connection.</li> </ul> |
| Shared with Edit rights | Pass-through identity | User can only see the data in the tiles if they have their own permissions. They can edit, add new tiles and run queries, but the tiles show error messages. |
| Shared with View rights only | Dashboard editor’s identity using a cloud connection | User can view the data in the tiles, but they can't edit the real-time dashboard. |
| Shared with View rights only | Pass-through identity | User can view the real-time dashboard but can only see data if they themselves have permissions to the data source. |

## How to revoke permissions

There are a few ways to revoke a user’s access permissions.

* Remove their access from the real-time dashboard.
* Remove the cloud connection.

  Select **Settings** > **Manage connections and gateways**. Select the **Options** menu alongside the name of the connection you want to remove, and select **Remove**.

  :::image type="content" source="media/dashboard-permissions/remove-connection.png" alt-text="Screenshot showing how to remove a connection.":::

* Remove the user from the cloud connection.

   Select **Settings** > **Manage connections and gateways**. Select the **Options** menu alongside the name of the connection you want to change, and select **Manage users**. Delete the user from the connection by selecting the trashcan icon next to their name in the **Manage users** box.
  
* Edit the Data source access permissions.

  In your real-time dashboard, open the **Data source** box by selecting **New data source** from the top toolbar. Select the **edit** pencil icon next to the data source you want to edit. Change the **Data source access permissions** to **Pass-through identity**. The user now uses his own identity to access the data source.

## Related content

* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
* [Share items in Microsoft Fabric](../fundamentals/share-items.md)
