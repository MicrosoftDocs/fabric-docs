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

# Create an API for GraphQL in Fabric and add data

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

Get started with the Fabric API for GraphQL by creating an API, then linking a data source to expose the data you chose through the API. Fabric builds the GraphQL schema automatically based on your data, and applications are ready to connect in minutes.

## Prerequisite

- Premium capacity in Fabric

## Creating an API for GraphQL

To create an API for GraphQL:

1. In the Fabric portal, select Data Development from the workload switcher at the bottom of the navigation bar. The **Data Development** option looks like this:

   :::image type="content" source="media/get-started-api-graphql/switcher-data-app-dev.png" alt-text="Screenshot of the Data Development option in the workload switcher.":::

1. Select **API for GraphQL (Preview)**.

   :::image type="content" source="media/get-started-api-graphql/api-graphql-workspace-button.png" alt-text="Screenshot of the API tile, which you select to create a new API item.":::

   Alternatively, select **New** > **API for GraphQL (Preview)** from any workspace in Data Development.

   :::image type="content" source="media/get-started-api-graphql/workspace-new-api-graphql.png" alt-text="Screenshot of the workspace toolbar, showing where to select the New option.":::

1. Enter a **Name** for your item and select **Create**.

   :::image type="content" source="media/get-started-api-graphql/api-graphql-name.png" alt-text="Screenshot of the New API for GraphQL dialog box, showing where to enter the Name and select Create.":::

You now have a fully functional API to access your data in Fabric.

## Connect to a data source and build your schema

At this point, the API is ready but it's not exposing any data. APIs for GraphQL are defined in a schema organized in terms of types and fields, in a strongly typed system. Fabric automatically generates the necessary GraphQL schema based on the data you choose to expose to GraphQL clients.

1. In your new API, choose a data source to expose by choosing **Select data source**.

   :::image type="content" source="media/get-started-api-graphql/add-data.png" alt-text="Screenshot of the Select data source option.":::

1. The OneLake data hub appears; choose the data source you want to connect to. For the following example, we choose a AdventureWorks SQL analytics endpoint linked to a mirrored database. Select **Filter** to see only specific types of Fabric data sources, or search by a specific keyword. When you're ready, select **Connect**.

   :::image type="content" source="media/get-started-api-graphql/data-hub-choose-connect.png" alt-text="Screenshot of the OneLake data hub, showing available data source options for a workspace." lightbox="media/get-started-api-graphql/data-hub-choose-connect.png":::

1. The **Get data** screen appears, where you can choose which objects you want exposed in your GraphQL schema.

   :::image type="content" source="media/get-started-api-graphql/get-data-choose-data.png" alt-text="Screenshot of the Get data screen showing the Choose data list." lightbox="media/get-started-api-graphql/get-data-choose-data.png":::

1. Select the checkboxes next to the individual tables or stored procedures you want to expose in the API. To select all the objects in a folder, select the checkbox with the data source name at the top.

   :::image type="content" source="media/get-started-api-graphql/get-data-selected.png" alt-text="Screenshot of the Choose data list with a folder selected, which automatically selects all items inside that folder." lightbox="media/get-started-api-graphql/get-data-selected.png":::

1. Select **Load** to start the GraphQL schema generation process.

1. The schema is generated and you can start prototyping GraphQL queries  (read, list) or mutations (create, update, delete) to interact with your data.

   :::image type="content" source="media/get-started-api-graphql/api-editor.png" alt-text="Screenshot of the Schema explorer screen." lightbox="media/get-started-api-graphql/api-editor.png":::

Your API for GraphQL is now ready to accept connections and requests. You can use the API editor to test and prototype GraphQL queries and the Schema explorer to verify the data types and fields exposed in the API.

## Related content

- [Fabric API for GraphQL editor](api-graphql-editor.md)
- [Fabric API for GraphQL schema view and Schema explorer](graphql-schema-view.md)
