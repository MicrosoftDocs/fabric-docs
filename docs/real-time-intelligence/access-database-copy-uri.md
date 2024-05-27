---
title: Access an existing KQL database
description: Learn how to access an existing KQL database and optionally copy the query URI and the ingestion URI run queries or get data in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/21/2024
ms.search.form: product-kusto
---
# Access an existing KQL database

In this article, you learn how to access an existing KQL database and optionally copy the **Query URI** and the **Ingestion URI** to run queries, store management commands, or to get data.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Access a KQL database

To access your existing KQL databases:

1. Select the **Workspaces** icon on the side navigation on the left. Then choose a workspace.

    :::image type="content" source="media/create-database/access-existing-database-1.png" alt-text="Screenshot of the left menu of UI that shows the dropdown menu of the icon titled workspaces. The workspaces icon is highlighted.":::

1. Select **Filter** on the right side of the ribbon > **KQL Database**.

    :::image type="content" source="media/database-editor/access-existing-database-2.png" alt-text="Screenshot of workspace window that shows the dropdown menu of the Filter option. The entry titled KQL Database is selected."  lightbox="media/database-editor/access-existing-database-2.png":::

1. Select the desired database.

## Copy URI

The main page of your KQL database shows an overview of the contents in your database.

:::image type="content" source="media/set-up-connectors/copy-uri.png" alt-text="Screenshot of the database details card showing the database details. The options titled Query URI and Ingestion URI are highlighted.":::

The following table lists the two types of URIs that you can copy from the **Database details** card in your KQL database.

|URI type |Usage |
|---|---|
|Query URI |URI that can be used to run queries or to store management commands.|
|Ingestion URI |URI that can be used to get data.|

1. Access an [existing KQL database](#access-an-existing-kql-database).
1. Copy the desired URI type from the **Database details** card in the database dashboard.

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
