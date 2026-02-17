---
title: User data functions with Cosmos DB Database in Fabric
description: How to build user data functions for Cosmos DB in Microsoft Fabric.
ms.reviewer: mjbrown
ms.topic: how-to
ms.date: 10/31/2025
---

# How to create user data functions for Cosmos DB in Microsoft Fabric

Fabric User data functions provides a platform to host your custom logic and reference from different types of Fabric items and data sources. You can use this service to write your business logic, internal algorithms, and libraries. You can also integrate it into your Fabric architectures to customize the behavior of your solutions.

In this guide, we will create a new User Data Functions item and write a new function in it. Each User Data Functions item contains code that defines one or many functions that you can run individually.

> [!TIP]
> For complete samples of User Data Functions with Cosmos DB in Fabric, see [Fabric User Data Functions for Cosmos DB on GitHub](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/user-data-functions/README.md). These samples are also available within User Data Functions portal in Fabric.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

- An identity with the **Read** permission for the database in Fabric

- For more information on Fabric permissions, see [access controls](authorization.md#access-controls).

- Capture the name of the new Cosmos DB database you created. You use this value in later step\[s\].

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-container.md)]

- You will use the SampleData container in later step\[s\].

## Retrieve Cosmos DB endpoint

After saving the Cosmos database and container name, get the endpoint for the Cosmos DB database in Fabric. This endpoint is required to connect the user data function to Cosmos DB.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. Select the **Settings** option in the menu bar for the database.

    :::image type="content" source="media/how-to-authenticate/settings-option.png" lightbox="media/how-to-authenticate/settings-option-full.png" alt-text="Screenshot of the 'Settings' menu bar option for a database in the Fabric portal.":::

1. In the settings dialog, navigate to the **Connection** section. Then, copy the value of the **Endpoint for Cosmos DB NoSQL database** field. You use this value in later step\[s\].

    :::image type="content" source="media/how-to-authenticate/settings-connection-endpoint.png" lightbox="media/how-to-authenticate/settings-connection-endpoint-full.png" alt-text="Screenshot of the 'Connection' section of the 'Settings' dialog for a database in the Fabric portal.":::

## Create a new Fabric User Data Functions item

1. Select your workspace, and select on **+ New item**.
1. Select Item type as **All items**. Search for and select **User data functions**.

## Create a new user data functions item

1. In your workspace, select **+ New item**.

1. In the pane that opens, search for `user data functions`, then select the tile.

   :::image type="content" source="/fabric/data-engineering/media/user-data-functions-create-in-portal/select-user-data-functions.png" alt-text="Screenshot showing user data functions tile in the new item pane." lightbox="/fabric/data-engineering/media/user-data-functions-create-in-portal/select-user-data-functions.png":::

1. Provide a **Name** for the user data functions item.

1. Select **New function** to create a `hello_fabric` Python function template. The Functions explorer shows all the functions that are published and ready to be invoked.

   :::image type="content" source="/fabric/data-engineering/media/user-data-functions-create-in-portal/new-functions-to-create-template.png" alt-text="Screenshot showing how to create a new function using a template." lightbox="/fabric/data-engineering/media/user-data-functions-create-in-portal/new-functions-to-create-template.png":::

1. Once the `hello_fabric` function is published, you can run it from the list of functions in the Functions explorer.

   :::image type="content" source="/fabric/data-engineering/media/user-data-functions-create-in-portal/hello-fabric-template-1.png" alt-text="Screenshot showing the code for hello-fabric function." lightbox="/fabric/data-engineering/media/user-data-functions-create-in-portal/hello-fabric-template-1.png":::

### Add a new function for Cosmos DB

Next we will create a new function. In this example we will modify the `hello_fabric` function and rename it `query_products`. Follow the steps to add this sample function:

1. Make sure you are in **Develop mode**. Select **Library management** to add the libraries that your function requires.

   :::image type="content" source="/fabric/data-engineering/media/user-data-functions-manage-libraries/select-library-management.png" alt-text="Screenshot showing how to manage libraries." lightbox="/fabric/data-engineering/media/user-data-functions-manage-libraries/select-library-management.png":::

   >[!NOTE]
   > `fabric_user_data_functions` library is added by default and can't be removed. This library is required for the functionality of User data functions. You need to update the version of this library for any future releases of this SDK.

1. Select **azure-cosmos** library and select the latest version. Once the library is added, it's automatically saved in your User Data Functions item. Then close the Library management dialog.

   :::image type="content" source="./media/how-to-user-data-functions/add-cosmos-library.png" alt-text="Screenshot showing how to add azure-cosmos library." lightbox="./media/how-to-user-data-functions/add-cosmos-library.png":::

1. Select the code below then insert it into the body of your new function.

    ```python
    import fabric.functions as fn
    udf = fn.UserDataFunctions()

    import logging
    from typing import Any
    from fabric.functions.cosmosdb import get_cosmos_client
    from azure.cosmos import exceptions

    @udf.generic_connection(argName="cosmosDb", audienceType="CosmosDB")
    @udf.function()
    def query_products(cosmosDb: fn.FabricItem, categoryName: str) -> list[dict[str, Any]]:

        COSMOS_DB_URI = "{my-cosmos-artifact-uri}"
        DB_NAME = "{my-cosmos-artifact-name}" 
        CONTAINER_NAME = "SampleData"

        try:
            cosmosClient = get_cosmos_client(cosmosDb, COSMOS_DB_URI)
            database = cosmosClient.get_database_client(DB_NAME)
            container = database.get_container_client(CONTAINER_NAME)

            # Use parameterized query
            query = """
                SELECT
                    c.categoryName,
                    c.name, 
                    c.description,
                    c.currentPrice,
                    c.inventory,
                    c.priceHistory
                FROM c 
                WHERE 
                    c.categoryName = @categoryName AND
                    c.docType = @docType
                ORDER BY
                    c.price DESC
            """

            parameters = [
                {"name": "@categoryName", "value": categoryName},
                {"name": "@docType", "value": 'product'}
            ]

            # Execute the query
            products = [p for p in container.query_items(
                query=query,
                enable_cross_partition_query=False,
                parameters=parameters
            )]

            return products
        
        except exceptions.CosmosHttpResponseError as e:
            logging.error(f"Cosmos DB query failed: {e}")
            raise
        except exceptions as e:
            logging.error(f"Unexpected error in query_products: {e}")
            raise
    ```

1. Once the code is inserted into the editor, update the COSMOS_DB_URI and the DB_NAME with the values you captured earlier.

    :::image type="content" source="./media/how-to-user-data-functions/update-endpoint-and-database.png" alt-text="Screenshot showing how to update the endpoint and database name." lightbox="./media/how-to-user-data-functions/update-endpoint-and-database.png":::

1. Now you can test it by using the [Test capability](/fabric/data-engineering/user-data-functions/test-user-data-functions) in Develop mode.

1. In the catetoryName parameter type `Computers, Laptops`

    :::image type="content" source="./media/how-to-user-data-functions/test-user-data-function.png" alt-text="Screenshot showing how to test the user data function." lightbox="./media/how-to-user-data-functions/test-user-data-function.png":::

1. Press Test and view the results in the output.

1. When you are ready, you can select **Publish** to save your changes and update your functions. Publishing may take a few minutes.

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Manage authorization in Cosmos DB in Microsoft Fabric](authorization.md)

