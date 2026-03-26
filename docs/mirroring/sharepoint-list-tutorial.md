---
title: "Tutorial: Set Up SharePoint List Mirroring in Microsoft Fabric (Preview)"
description: Learn how to mirror your SharePoint List in Microsoft Fabric for near real-time data replication.
ms.reviewer: sbahadur
ms.date: 03/02/2026
ms.topic: tutorial
---

# Tutorial: Set up SharePoint List mirroring in Microsoft Fabric (Preview)

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

[Mirroring in Fabric](overview.md) provides an easy experience to avoid complex ETL (Extract Transform Load) and integrate your existing Sharepoint List data with the rest of your data in Microsoft Fabric. You can continuously replicate your existing SharePoint data directly into Fabric's OneLake.

This article provides steps to create a mirrored Sharepoint List database in Microsoft Fabric.

## Prerequisites

- A tenant account with an active Microsoft Fabric subscription. [You can try Fabric with a free trial](../../fundamentals/fabric-trial.md).
- A Fabric [workspace](../../fundamentals/create-workspaces.md).

## Create a mirrored database

In this section, we'll provide a brief overview of how to create a new mirrored database to use with your mirrored SharePoint List data source.

1. Open your Fabric workspace and check that it has a Trial or Premium Fabric capacity

1. Select **New** > **Mirrored SharePoint Online List (preview)**
    :::image type="content" source="media/sharepoint-list-tutorial/select-sharepoint-online-list.png" alt-text="Screenshot of Fabric workspace showing New item menu with Mirrored SharePoint Online List option highlighted." lightbox="media/sharepoint-list-tutorial/select-sharepoint-online-list.png":::

1. Select **SharePoint Online list**

    :::image type="content" source="media/sharepoint-list-tutorial/select-new-sharepoint-online-list.png" alt-text="Screenshot of database connection dialog with SharePoint Online list option highlighted and OneLake catalog entries shown." lightbox="media/sharepoint-list-tutorial/select-new-sharepoint-online-list.png":::

1. In the connection dialog, enter your database details:

    :::image type="content" source="media/sharepoint-list-tutorial/new-sharepoint-source.png" alt-text="Screenshot of SharePoint Online list connection setup dialog with site URL, credentials, and privacy level options.":::

## Monitor Fabric mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication. For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).

## Related content

[Learn more about Sharepoint List mirroring](sharepoint-list.md)