---
title: Access an existing KQL database
description: Learn how to access an existing KQL database and optionally copy the query URI and the ingestion URI run queries or get data in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 02/25/2025
ms.search.form: product-kusto
---

# Access an existing KQL database

This article explains how to access an existing KQL database and optionally copy the **Query URI** and the **Ingestion URI** to run queries, store management commands, or get data. It also explains how to share a KQL database link with authorized users.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Access a KQL database

To access your existing KQL database:

1. In the left navigation, select the **Workspaces** icon. Then choose a workspace.

    :::image type="content" source="media/create-database/access-existing-database-1.png" alt-text="Screenshot of the left menu of UI that shows the dropdown menu of the icon titled workspaces. The workspaces icon is highlighted.":::

1. In the ribbon, select **Filter** > **KQL Database**.

    :::image type="content" source="media/database-editor/access-existing-database-2.png" alt-text="Screenshot of workspace window that shows the dropdown menu of the Filter option. The entry titled KQL Database is highlighted."  lightbox="media/database-editor/access-existing-database-2.png":::

1. Select the desired database from the list in the main view pane. The main page of the KQL database opens.

## Copy URI

The main page of your KQL database shows an overview of the contents in your database.

:::image type="content" source="media/set-up-connectors/copy-uri.png" alt-text="Screenshot of the database details card showing the database details. The options titled Query URI and Ingestion URI are highlighted.":::

You can copy two types of URIs from the **Database details** card in your KQL database.

|URI type |Usage |
|---|---|
|Query URI |URI that can be used to run queries or management commands.|
|Ingestion URI |URI that can be used as a target for data ingestion.|

## Share a KQL database link

To share your KQL database, follow these steps:

1. Select **Share** to create a link to the database.
1. Manage the link permissions to ensure only authorized users can access it.
1. Send the link to the authorized users.

> [!NOTE]
> The shared link provides access to a single database. There is no bulk sharing option for multiple databases, and an Eventhouse can't be shared.

:::image type="content" source="media/create-database/database-share.png" alt-text="Screenshot that shows the Share button on the top right of the screen.":::

For more details, see [Share items](/fabric/fundamentals/share-items).

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
* [Share items in Microsoft Fabric](/fabric/fundamentals/share-items)
