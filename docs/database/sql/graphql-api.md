---
title: "Create GraphQL API in your SQL database"
description: Learn how to create GraphQL API in your SQL database in the Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, sukkaur
ms.date: 10/07/2024
ms.topic: how-to
ms.search.form: Develop and run queries in SQL editor
---
# Create GraphQL API from your SQL database in the Fabric portal

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Start building GraphQL APIs directly from within the Fabric SQL query editor. Fabric builds the GraphQL schema automatically based on your data, and applications are ready to connect in minutes.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database](create.md) or use an existing SQL database.

## Create an API for GraphQL

To create an API for GraphQL:

1. Open the database where you want to create a GraphQL API.
1. Select **New**, and select GraphQL API.

   :::image type="content" source="media/graphql-api/new-graphql-api.png" alt-text="Screenshot from the Fabric portal showing the New button for database.":::

1. Enter a **Name** for your item and select **Create**.

At this point, the API is ready but it's not exposing any data. APIs for GraphQL are defined in a schema organized in terms of types and fields, in a strongly typed system. Fabric automatically generates the necessary GraphQL schema based on the data you choose to expose to GraphQL clients.

1. Select **Get data**. The **Choose data** screen allows you to search and choose the objects you want exposed in your GraphQL schema.
1. Select the checkboxes next to the individual tables or stored procedures you want to expose in the API. To select all the objects in a folder, select the checkbox with the data source name at the top.

   :::image type="content" source="media/graphql-api/choose-data.png" alt-text="Screenshot from the Fabric portal showing the Choose data screen.":::

1. Select **Load** to start the GraphQL schema generation process.
1. The schema is generated, and you can start prototyping GraphQL queries (read, list) or mutations (create, update, delete) to interact with your data. The following image shows the **Schema explorer** with an API call template.

   :::image type="content" source="media/graphql-api/schema-explorer-api.png" alt-text="Screenshot from the Fabric portal showing the Schema explorer screen.":::

Your API for GraphQL is now ready to accept connections and requests. You can use the API editor to test and prototype GraphQL queries and the Schema explorer to verify the data types and fields exposed in the API.

## Next step

> [!div class="nextstepaction"]
> [Create reports on your SQL database](create-reports.md)

## Related content

- [Fabric API for GraphQL editor](/fabric/data-engineering/api-graphql-editor)
- [Fabric API for GraphQL schema view and Schema explorer](/fabric/data-engineering/graphql-schema-view)
