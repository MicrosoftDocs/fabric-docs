---
title: Configure data source access for a Real-Time Dashboard 
description: Learn how to configure Real-Time Dashboards without granting access to the underlying data source.
ms.reviewer: mbar
ms.topic: how-to
ms.subservice: rti-dashboard
ms.date: 08/24/2026
author: spelluru
ms.author: spelluru
ai-usage: ai-assisted
---
# Configure data source access for a Real-Time Dashboard 

You can configure a Real-Time Dashboard data source to use the dashboard editor's identity. This setup lets users view dashboard data without direct access to the underlying data source. 

In this article, you learn how to create a cloud connection, apply it to a dashboard data source, validate access, and revoke access when needed.

## Prerequisites

- A [Real-Time Dashboard](dashboard-real-time-create.md) with at least one data source and one tile.
- Edit permissions on the Real-Time Dashboard. 
- Access to the underlying data source. 
- Permission to create and manage cloud connections. 

## Create a cloud connection

Create the cloud connection that the dashboard uses to access the data source with the dashboard editor's identity. 

1. Open Fabric **Settings** > **Manage connections and gateways**.

      :::image type="content" source="media/dashboard-permissions/settings.png" alt-text="Screenshot showing the Manage connections and gateways settings option.":::


1. On the **Manage connections** page, select **+ New**. 

1. Select **Cloud connection** and enter a connection name. 

      :::image type="content" source="media/dashboard-permissions/new-connection.png" alt-text="Screenshot showing the New connection side pane.":::

1. Under **Connection type**, select **Azure Data Explorer (Kusto)**. 

1. Under **Cluster**, paste the cluster URI for the cluster that contains the data source. The cluster URI is in the format `https://<clustername>.<region>.kusto.windows.net` and can be found in the database details side pane.

    :::image type="content" source="media/dashboard-permissions/database-details-pane.png" alt-text="Screenshot showing the cluster URI in the database details side pane.":::

1. Under **Authentication method**, select **OAuth 2.0**. 

1. Select **Edit credentials** and complete the verification steps. 

1. Select **Create**, and then select **Close**.

> [!NOTE]
> Create a separate connection for each data source that requires dashboard editor identity.

## Configure the data source to use dashboard editor's identity

1. Open the Real-Time Dashboard. 

1. In the upper-right corner, select **Editing**. 

    :::image type="content" source="media/dashboard-permissions/editing-mode.png" alt-text="Screenshot showing the dashboard in editing mode.":::

1. In the **Data sources** side pane, select the settings icon next to the data source name you want.

    :::image type="content" source="media/dashboard-permissions/data-source-pane.png" alt-text="Screenshot showing the Data source side pane with the settings icon highlighted.":::

1. In the **Data source settings** pane, select **Dashboard editor's identity**, and select the cloud connection that you created. 

    :::image type="content" source="media/dashboard-permissions/data-source-settings.png" alt-text="Screenshot showing the Data source settings pane with Dashboard editor's identity selected.":::

1. Select **Apply**. 

> [!NOTE]
> If you don't configure a cloud connection or data source access permissions, the default identity model is pass-through identity.

## Next steps

* [Share Real-Time Dashboards](dashboard-real-time-create.md#share-the-dashboard)
* [Create a Real-Time Dashboard](dashboard-real-time-create.md)
