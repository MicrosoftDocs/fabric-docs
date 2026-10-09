---
title: 'Quickstart Create a Cosmos DB Database'
description: Get started quickly with Cosmos DB in Microsoft Fabric by creating a new instance in the Microsoft Fabric portal.
ms.topic: quickstart
ms.date: 07/29/2025
ms.search.form: Databases Get Started,Get Started with Cosmos DB
---

# Quickstart: Create a Cosmos DB database in Microsoft Fabric

In this quickstart, you create a Cosmos DB database using the Microsoft Fabric portal. Once you create the database, you seed the database with a sample container and data set. Then you finish up by querying the sample data set with a sample NoSQL query.

## Prerequisites

[!INCLUDE[Prerequisites - Fabric capacity](includes/prerequisite-fabric-capacity.md)]

## Create the database

First, go to the Fabric portal and create a new Cosmos DB database within your workspace.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your target workspace where you want the database to reside.

1. Select the **Create** option.

    :::image type="content" source="media/quickstart-portal/create-option-full.png" lightbox="media/quickstart-portal/create-option-full.png" alt-text="Screenshot of the option to 'Create' a new resource in the Fabric portal.":::

1. If the option to create a **Cosmos DB database** isn't initially available, select **See all**.

1. Within the **Databases** category, select **Cosmos DB database**.

    :::image type="content" source="media/quickstart-portal/cosmos-db-database-option.png" lightbox="media/quickstart-portal/cosmos-db-database-option-full.png" alt-text="Screenshot of the option to specifically create a Cosmos DB database in the Fabric portal.":::

1. Give the database a unique name and then select **Create**.

    :::image type="content" source="media/quickstart-portal/database-name-dialog.png" lightbox="media/quickstart-portal/database-name-dialog-full.png" alt-text="Screenshot of the dialog to name a new Cosmos DB database in the Fabric portal.":::

1. Wait for the database creation operation to finish before proceeding to the next step\[s\].

## Load sample data

Next, load a sample data set into the database using the tools in the Fabric portal.

1. Start in the Cosmos DB database within the Fabric portal.

1. Select **Sample data** on the **Build your database** page.

    :::image type="content" source="media/quickstart-portal/load-sample-data-option.png" lightbox="media/quickstart-portal/load-sample-data-option-full.png" alt-text="Screenshot of the option to load sample data into the database using the Fabric portal.":::

1. A dialog appears informing you that the import operation could take a few minutes. Select **Start** to begin importing the sample data set.

    :::image type="content" source="media/quickstart-portal/sample-data-confirmation-dialog.png" lightbox="media/quickstart-portal/sample-data-confirmation-dialog-full.png" alt-text="Screenshot of the dialog to confirm that the sample data loading operation could take a few minutes in the Fabric portal.":::

1. Wait for the loading operation to finish.

    :::image type="content" source="media/quickstart-portal/sample-data-loading-dialog.png" lightbox="media/quickstart-portal/sample-data-loading-dialog-full.png" alt-text="Screenshot of the dialog to indicate that sample data is loading to the database in the Fabric portal.":::

1. Once the import operation concludes, select **Close**.

    :::image type="content" source="media/quickstart-portal/sample-data-success-dialog.png" lightbox="media/quickstart-portal/sample-data-success-dialog-full.png" alt-text="Screenshot of the dialog to indicate that the sample data loading operation succeeded in the Fabric portal.":::

## Perform a query

Finally, perform a NoSQL query to test the sample data in the **SampleData** container that was created.

1. Stay within the Cosmos DB database within the Fabric portal.

1. Select the newly created **SampleData** container. Then, select **New SQL Query**.

    :::image type="content" source="media/quickstart-portal/new-container-query-option.png" lightbox="media/quickstart-portal/new-container-query-option-full.png" alt-text="Screenshot of the option to create a 'New SQL Query' for a container within the Fabric portal.":::

1. In the query editor, use this baseline query to retrieve the top 10 most expensive products from the sample data and reshaping the results into simplified JSON output.

    ```nosql
    SELECT TOP 10 VALUE {
        "product": CONCAT(item.name, " - ", item.categoryName),
        "currentPrice": item.currentPrice
    }
    FROM items AS item
    WHERE item.docType = "product"
    ORDER BY item.currentPrice DESC
    ```

1. Observe the results of the query in the query editor.

    ```json
    [
      {
        "product": "QuantumPro X9 Elite Workstation - Computers, Workstations",
        "currentPrice": 8890.61
      },
      {
        "product": "ProCore X3 Elite Workstation - Computers, Workstations",
        "currentPrice": 8486.6
      },
      // Omitted for brevity
    ]
    ```    

    :::image type="content" source="media/quickstart-portal/query-results.png" lightbox="media/quickstart-portal/query-results-full.png" alt-text="Screenshot of the query editor and result sections for a container in the Fabric portal.":::

## Next step

> [!div class="nextstepaction"]
> [Query mirrored Cosmos DB in Microsoft Fabric data using the SQL Analytics Endpoint](tutorial-mirroring.md)
