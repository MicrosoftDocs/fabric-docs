---
title: Connectors
description: Learn how to access an existing KQL database and copy the ingestion or query URI to set up connectors in Real-Time Analytics.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 09/07/2023
ms.search.form: product-kusto
---
# Connectors

[!INCLUDE [preview-note](../includes/preview-note.md)]

Data ingestion is the process used to load data from one or more sources into Real-Time Analytics. Once ingested, the data becomes available for query. Real-Time Analytics provides several connectors for data ingestion.

In this article, you learn how to access an existing KQL database and copy the **Query URI** and the **ingestion URI** to get data using connectors in Real-Time Analytics.

For the list of supported connectors in Real-Time Analytics, see #TODO.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)

## Access an existing KQL database

To access your existing KQL databases:

1. Select the **Workspaces** icon on the side navigation on the left. Then choose a workspace.

    :::image type="content" source="media/create-database/access-existing-database-1.png" alt-text="Screenshot of the left menu of UI that shows the dropdown menu of the icon titled workspaces. The workspaces icon is highlighted.":::

1. Select **Filter** on the right side of the ribbon > **KQL Database**.

    :::image type="content" source="media/database-editor/access-existing-database-2.png" alt-text="Screenshot of workspace pane that shows the dropdown menu of the workspace ribbon option titled Filter. The dropdown entry titled KQL Database is selected. Both the Filter option and KQL Database are highlighted."  lightbox="media/database-editor/access-existing-database-2.png":::

1. Select the desired database.

## Copy URI

The main page of your KQL database shows an overview of the contents in your database. From the **Database details** card, you can copy URIs to use when your get data using a connector in Real-Time Analytics.

:::image type="content" source="media/set-up-connectors/copy-uri.png" alt-text="Screenshot of the database details card showing the database details. The options titled Query URI and Ingestion URI are highlighted.":::

The following table lists the two types of URIs that you can copy from your KQL database.

|URI type |Usage |
|---|---|
|Query URI |URI that can be used for sending/ running queries.|
|Ingestion URI |URI that can be used for programmatic ingestion.|

1. Copy the desired URI type from the **database details card** in the database dashboard and paste it somewhere, like a notepad, to use in a later step.

## See also

* [Query data in a KQL queryset](kusto-query-set.md)
