---
title: Create and add data to an API for GraphQL
description: Learn how to create an API for GraphQL in Fabric, and then how to add data to the API and build your schema.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: how-to
ms.search.form: Get started with GraphQL API
ms.date: 05/02/2024
---

# Create an API for GraphQL and add data

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

Get started with the Fabric API for GraphQL by creating an API, then linking a data source to expose the data you chose through the API. Fabric builds the GraphQL schema automatically based on your data, and applications are ready to connect in minutes.

## Prerequisite

- Premium capacity in Fabric

## Creating an API GraphQL API in Microsoft Fabric

Creating a GraphQL API in Fabric is a straightforward process after which you're presented with a fully functional API to access your data in Fabric.

1. Navigate to the Data Development experience in the Fabric portal with the selector at the bottom of the navigation bar. The **Data Development** option looks like this:

   :::image type="content" source="media/get-started-api-graphql/navigation-pane-selector-data-app-dev.png" alt-text="Screenshot of the Data Development option in the Fabric selector.":::

1. Select **API for GraphQL (Preview)**.

   :::image type="content" source="media/get-started-api-graphql/graphql-api-workspace-button.png" alt-text="Screenshot of the GraphQL API tile, which you select to create a new GraphQL API item.":::

   Alternatively, select **New** > **GraphQL API (Preview)** from any workspace in the Data Development experience.

   :::image type="content" source="media/get-started-api-graphql/workspace-new-api-graphql.png" alt-text="Screenshot of the workspace toolbar, showing where to select the New option.":::

1. Enter a **Name** for your item and select **Create**.

   :::image type="content" source="media/get-started-api-graphql/api-graphql-name.png" alt-text="Screenshot of the New GraphQL API dialog box, showing where to enter the Name and select Create.":::

## Connect to a data source and build your schema

At this point the GraphQL API is ready however it's not exposing any data. GraphQL APIs are defined in a schema organized in terms of types and fields, in a strongly typed system. Fabric automatically generates the necessary GraphQL schema based on the data you chose to expose to GraphQL clients.

1. In your new GraphQL API, choose a data source to expose by choosing **Select data source**.

   :::image type="content" source="media/get-started-api-graphql/add-data.png" alt-text="Screenshot of the Add data to GraphQL API option.":::

2. The OneLake data hub appears; choose the data source you want to connect to. For the following example, we chose a AdventureWorks SQL analytics endpoint linked to a mirrored database. Click on the **Filter** button to see only specific types of Fabric data sources or search by a specific keyword. When ready select **Connect** to proceed.

   :::image type="content" source="media/get-started-api-graphql/data-hub-choose-connect.png" alt-text="Screenshot of the OneLake data hub, showing available data source options for a workspace." lightbox="media/get-started-graphql-api/data-hub-choose-connect.png":::

3. The **Get data** screen appears, where you can choose which objects you want exposed in your GraphQL schema.

   :::image type="content" source="media/get-started-api-graphql/get-data-choose-data.png" alt-text="Screenshot of the Get data screen showing the Choose data list." lightbox="media/get-started-graphql-api/get-data-choose-data.png":::

4. Select the checkboxes next to the individual tables or stored procedures you want to expose in the API, or choose the checkbox with the data source name at the top to select all the objects in that folder. Click on the **Load** button to start the GraphQL schema generation process.

   :::image type="content" source="media/get-started-api-graphql/get-data-selected.png" alt-text="Screenshot of the Choose data list with a folder selected, which automatically selects all items inside that folder." lightbox="media/get-started-graphql-api/get-data-selected.png":::

5. The schema is generated and you can start prototyping GraphQL queries  (read, list) or mutations (create, update, delete) to interact with your data.

   :::image type="content" source="media/get-started-api-graphql/api-editor.png" alt-text="Screenshot of the Schema explorer screen." lightbox="media/get-started-graphql-api/api-editor.png":::

Your GraphQL API is now ready to accept connections and requests. You can use the GraphQL API editor to test and prototype GraphQL queries and the schema explorer to verify the data types and fields exposed in the API.

## Related content

- [Fabric API for GraphQL editor](api-graphql-editor.md)
- [Fabric API for GraphQL schema view and Schema explorer](graphql-schema-view.md)
