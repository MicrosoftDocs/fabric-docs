---
title: Create and add data to an API for GraphQL
description: Learn how to create an API for GraphQL in Fabric, and then how to add data to the API and build your schema.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: how-to
ms.custom:
ms.search.form: Get started with GraphQL API
ms.date: 10/03/2024
---

# Create an API for GraphQL in Fabric and add data

Get started with the Fabric API for GraphQL by creating an API, then linking a data source to expose the data you chose through the API. Fabric builds the GraphQL schema automatically based on your data, and applications are ready to connect in minutes.

## Prerequisites

- Enable the "Users can create Fabric items" [admin tenant setting](/fabric/admin/about-tenant-settings).

## Creating an API for GraphQL

To create an API for GraphQL:

1. Select **New item** from any workspace. In the panel that opens, under **Develop data**, select **API for GraphQL**.

   :::image type="content" source="media/get-started-api-graphql/workspace-new-api-graphql.png" alt-text="Screenshot of the workspace toolbar, showing where to select the New option." lightbox="media/get-started-api-graphql/workspace-new-api-graphql.png":::

1. Enter a **Name** for your item and select **Create**.

   :::image type="content" source="media/get-started-api-graphql/api-graphql-name.png" alt-text="Screenshot of the New API for GraphQL dialog box, showing where to enter the Name and select Create.":::

You now have a fully functional API to access your data in Fabric.

## Connect to a data source and build your schema

At this point, the API is ready but it's not exposing any data. APIs for GraphQL are defined in a schema organized in terms of types and fields, in a strongly typed system. Fabric automatically generates the necessary GraphQL schema based on the data you choose to expose to GraphQL clients.

1. In your new API, choose a data source to expose by choosing **Select data source**.

   :::image type="content" source="media/get-started-api-graphql/add-data.png" alt-text="Screenshot of the Select data source option.":::

2. Next select the connectivity option for your API:

   :::image type="content" source="media/get-started-api-graphql/get-data-connectivity.png" alt-text="Screenshot of the Choose connectivity option.":::

   Here you can define how API clients can access the API to execute GraphQL requests based on two distinct options: 
   * **Single sign-on (SSO)**: use client credentials to connect to data sources, which means the authenticated API user must have access to the underlying data source. For example, if you're exposing Lakehouse data to your API clients, the authenticated user needs to have access to both the API and the Lakehouse. More specifically, *Execute* permissions to the GraphQL API (*Run Queries and Mutations* option when adding direct access permissions) and read or write permissions required in the data source of choice, accordingly. Alternatively, the user can be added as workspace member with a *contributor role* where both the API and data source items are located, which will give the required access to both items from a single location. For more information, see [Give users access to workspaces](../fundamentals/give-access-workspaces.md).
   * **Saved credentials**: use saved credentials to connect to data sources, which means the authenticated API user doesn't require direct access to the data source. A saved credential is shared to access the data between the API and underlying tables in the data source. For example, if you're exposing Lakehouse data to your API clients the authenticated user just need to have direct access to the API (*Run Queries and Mutations* option when adding direct access permissions) and not the Lakehouse. A saved credential is used to connect the API to the data source and is shared by all authenticated API users. This option is required if you're exposing an Azure data source such as an Azure SQL database via GraphQL. After selecting OK, you'll be prompted to create a new saved credential after choosing a data source in the next step if there isn't a saved credential for it already in place.

   Once selected these options are enforced for all data sources subsequently added to the API. It's not possible to mix single-sign on and saved credentials in the same API. You can use User Principal Names (UPNs) or Service Principal Names (SPNs) to connect to your API, leveraging either SSO or saved credentials depending on your security requirements.
   
   > [!NOTE]
   >API for GraphQL requires client applications to use Microsoft Entra ID for authentication. Your client application must be registered and configured adequately to execute API calls against Fabric. The app registered in Microsoft Entra ID requires *GraphQLApi.Execute.All* API permissions for the Power BI service. You can find an end-to-end tutorial with instructions and sample code for both user principals and service principals at [Connect Applications](connect-apps-api-graphql.md).

3. The OneLake data hub appears; choose the data source you want to connect to. For the following example, we choose a AdventureWorks SQL analytics endpoint linked to a mirrored database. Select **Filter** to see only specific types of Fabric data sources, or search by a specific keyword. When you're ready, select **Connect**.

   :::image type="content" source="media/get-started-api-graphql/data-hub-choose-connect.png" alt-text="Screenshot of the OneLake data hub, showing available data source options for a workspace." lightbox="media/get-started-api-graphql/data-hub-choose-connect.png":::

4. The **Get data** screen appears, where you can choose which objects you want exposed in your GraphQL schema.

   :::image type="content" source="media/get-started-api-graphql/get-data-choose-data.png" alt-text="Screenshot of the Get data screen showing the Choose data list." lightbox="media/get-started-api-graphql/get-data-choose-data.png":::

5. Select the checkboxes next to the individual tables, views, or stored procedures you want to expose in the API. To select all the objects in a folder, select the checkbox with the data source name at the top.

   :::image type="content" source="media/get-started-api-graphql/get-data-selected.png" alt-text="Screenshot of the Choose data list with a folder selected, which automatically selects all items inside that folder." lightbox="media/get-started-api-graphql/get-data-selected.png":::

6. Select **Load** to start the GraphQL schema generation process.

7. The schema is generated and you can start prototyping GraphQL queries  (read, list) or mutations (create, update, delete) to interact with your data.

   :::image type="content" source="media/get-started-api-graphql/api-editor.png" alt-text="Screenshot of the Schema explorer screen." lightbox="media/get-started-api-graphql/api-editor.png":::

Your API for GraphQL is now ready to accept connections and requests. You can use the API editor to test and prototype GraphQL queries and the Schema explorer to verify the data types and fields exposed in the API.

## Permissions summary

The table below summarizes the different supported permutations and minimum required permissions for clients accessing the GraphQL API:

|API Caller        | Data source connectivity | Required GraphQL API permissions|Required Data Source permissions|Entra app scope|
|------------------|--------------------------|---------------------------------|-------------------------------|-----------------|
|User Principal (UPN)|Single sign-on (SSO)| *Run Queries and Mutations* at the API level|Appropriate Read/Write permissions granted to the UPN at the data source|*GraphQLApi.Execute.All*|
|Service Principal (SPN)|Single sign-on (SSO)| *Run Queries and Mutations* at the API level|Appropriate Read/Write permissions granted to the SPN at the data source|Not Applicable|
|User Principal (UPN)|Saved credentials| *Run Queries and Mutations* at the API level|Appropriate Read/Write permissions granted to the saved credential (connection) at the data source|*GraphQLApi.Execute.All*|
|Service Principal (SPN)|Saved credentials| *Run Queries and Mutations* at the API level|Appropriate Read/Write permissions granted to the SPN at the data source|Not Applicable|


## Related content

- [Fabric API for GraphQL editor](api-graphql-editor.md)
- [Fabric API for GraphQL schema view and Schema explorer](graphql-schema-view.md)
