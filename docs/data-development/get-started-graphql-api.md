---
title: Create and add data to GraphQL API
description: Learn how to create a GraphQL API in Fabric, and then how to add data to the API and build your schema.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: how-to
ms.search.form: Get started with GraphQL API
ms.date: 04/05/2024
---

# Create and add data to GraphQL API in Microsoft Fabric

> [!NOTE]
> Microsoft Fabric GraphQL API is in preview.

Get started with the GraphQL API by creating an API in Fabric, and then adding data to it and building your schema.

## Prerequisite

- Premium capacity in Fabric

## Creating a GraphQL API in Microsoft Fabric

Creating a GraphQL API in Fabric is a straightforward process.

1. Navigate to the Data Development experience in the Fabric portal with the selector at the bottom of the navigation bar. The **Data Development** option looks like this:

   :::image type="content" source="media/get-started-graphql-api/navigation-pane-selector-data-app-dev.png" alt-text="Screenshot of the Data Development option in the Fabric selector.":::

1. Select **GraphQL API (Preview)**.

   :::image type="content" source="media/get-started-graphql-api/graphql-api-workspace-button.png" alt-text="Screenshot of the GraphQL API tile, which you select to create a new GraphQL API item.":::

   Alternatively, select **New** > **GraphQL API (Preview)** from any workspace in the Data Development experience.

   :::image type="content" source="media/get-started-graphql-api/workspace-new-graphql-api.png" alt-text="Screenshot of the workspace toolbar, showing where to select the New option.":::

1. Enter a **Name** for your item and select **Create**.

   :::image type="content" source="media/get-started-graphql-api/graphql-api-name.png" alt-text="Screenshot of the New GraphQL API dialog box, showing where to enter the Name and select Create.":::

## Connect to a data source and build your schema

1. In your new GraphQL API, choose a data source to expose by choosing **Select data source**.

   :::image type="content" source="media/get-started-graphql-api/add-data.png" alt-text="Screenshot of the Add data to GraphQL API option.":::

1. The OneLake data hub appears; choose the data source you want to connect to. For the following example, we chose the AdventureWorks SQL database.

   :::image type="content" source="media/get-started-graphql-api/data-hub-choose-connect.png" alt-text="Screenshot of the OneLake data hub, showing available data source options for a workspace." lightbox="media/get-started-graphql-api/data-hub-choose-connect.png":::

1. Select **Connect**.

1. The **Get data** screen appears, where you can choose which objects you want exposed in your GraphQL schema.

   :::image type="content" source="media/get-started-graphql-api/get-data-choose-data.png" alt-text="Screenshot of the Get data screen showing the Choose data list." lightbox="media/get-started-graphql-api/get-data-choose-data.png":::

1. Select the checkboxes next to the individual objects you want, or choose the higher-level checkbox to select all the objects in that folder, and then select **Load**.

   :::image type="content" source="media/get-started-graphql-api/get-data-selected.png" alt-text="Screenshot of the Choose data list with a folder selected, which automatically selects all items inside that folder." lightbox="media/get-started-graphql-api/get-data-selected.png":::

1. Your GraphQL API builds your schema, and the Schema explorer screen appears. (For more information, see Schema view.)

   :::image type="content" source="media/get-started-graphql-api/schema-view.png" alt-text="Screenshot of the Schema explorer screen." lightbox="media/get-started-graphql-api/schema-view.png":::

Your GraphQL API is now ready to accept connections and requests.

## Multiple data source support

In GraphQL API, you are able to expose many data sources through a single API item. This feature allows you to issue a single query that will retrieve data across multiple data sources.

The following example shows a query that spans across both the "AdventureWorks" and the "testsqldb2" data sources:

:::image type="content" source="media/get-started-graphql-api/multi-data-source-query.png" alt-text="" lightbox="media/get-started-graphql-api/multi-data-source-query.pn":::

This functionality can enhance the performance of your applications by reducing the amount of round trips between your application and the GraphQL API.

## Related content

- Fabric GraphQL API editor
