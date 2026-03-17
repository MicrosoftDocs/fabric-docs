---
title: Translytical Task Flows with Cosmos DB in Microsoft Fabric
description: How to build translytical task flows with Cosmos DB in Microsoft Fabric.
ai-usage: ai-assisted
ms.reviewer: mjbrown
ms.topic: how-to
ms.date: 03/16/2026
author: Jcardif
ms.author: jndemenge
---

# How to build translytical task flows with Cosmos DB in Microsoft Fabric

Translytical task flows combine operational and analytical workloads by connecting Cosmos DB in Microsoft Fabric, User Data Functions, and Power BI. You can build interactive reports that read data from Cosmos DB and write updates back in real time through User Data Functions.

> [!NOTE]
> Translytical task flows are currently in public preview.

A translytical task flow uses three components:

| Component | Purpose | Technology |
| --- | --- | --- |
| **Operational data store** | Real-time access to operational data for analytics | Cosmos DB in Fabric |
| **Data logic layer** | Execute business logic such as writing data back to the data store | User Data Functions |
| **Visualization layer** | Display data and provide interactive controls | Power BI |

> [!TIP]
> For a complete sample of a translytical task flow with Cosmos DB in Fabric, see [Translytical task flow sample on GitHub](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/translytical-taskflows/README.md).

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

- Install [Power BI Desktop](https://powerbi.microsoft.com/desktop/) with the [required preview features enabled](/power-bi/create-reports/translytical-task-flow-overview).

- Note the name of the Cosmos DB database you created. You use this value in later steps.

- A Cosmos DB container that contains sample data. For instructions, see [load the sample data container](./quickstart-portal.md#load-sample-data).

## Retrieve Cosmos DB endpoint

[!INCLUDE[Retrieve Cosmos DB endpoint](includes/retrieve-cosmos-db-endpoint.md)]

## Create and publish a User Data Function

Create a User Data Function that updates the current price of a product in the Cosmos DB database.

1. In your workspace, select **+ New Item**.

1. Search for `user data functions` and select the tile.

   :::image type="content" source="/fabric/data-engineering/media/user-data-functions-create-in-portal/select-user-data-functions.png" alt-text="Screenshot showing user data functions tile in the new item pane." lightbox="/fabric/data-engineering/media/user-data-functions-create-in-portal/select-user-data-functions.png":::

1. Provide `update_price_writeback` as the **Name** for your User Data Function.

1. On the User Data Function editor page, select **New function** to create a `hello_fabric` user data function template.

   :::image type="content" source="/fabric/data-engineering/media/user-data-functions-create-in-portal/new-functions-to-create-template.png" alt-text="Screenshot showing how to create a new function using a template." lightbox="/fabric/data-engineering/media/user-data-functions-create-in-portal/new-functions-to-create-template.png":::

1. Copy the code below and paste it into the editor, replacing the default template code:

    ```python
    import fabric.functions as fn
    udf = fn.UserDataFunctions()

    import logging
    from datetime import datetime
    from typing import Any
    from azure.cosmos import CosmosClient
    from azure.cosmos import exceptions

    COSMOS_URI = "YOUR_COSMOS_DB_URI_HERE"
    DB_NAME = "YOUR_DATABASE_NAME_HERE"
    CONTAINER_NAME = "SampleData"

    @udf.connection(argName="cosmosClient", audienceType="CosmosDB", cosmos_endpoint=COSMOS_URI)
    @udf.function()
    def update_price(cosmosClient: CosmosClient, categoryName: str, productId: str, newPrice: float) -> list[dict[str, Any]]:

        try:
            database = cosmosClient.get_database_client(DB_NAME)
            container = database.get_container_client(CONTAINER_NAME)

            product = container.read_item(item=productId, partition_key=categoryName)

            product["currentPrice"] = newPrice

            now = datetime.now().replace(microsecond=0)
            current_time_iso = now.isoformat()

            product["priceHistory"].append({
                "date": current_time_iso,
                "price": newPrice
            })

            container.replace_item(item=productId, body=product)

            return product

        except exceptions.CosmosResourceNotFoundError as e:
            logging.error(f"Item not found in Cosmos DB: {e}")
            raise
        except exceptions.CosmosHttpResponseError as e:
            logging.error(f"Cosmos error in update_price: {e}")
            raise
        except Exception as e:
            logging.error(f"Unexpected error in update_price: {e}")
            raise
    ```

1. Replace `YOUR_COSMOS_DB_URI_HERE` with the endpoint URI you copied earlier.

1. Replace `YOUR_DATABASE_NAME_HERE` with the name of your Cosmos DB database.

[!INCLUDE[Add Azure Cosmos DB UDF](includes/add-azure-cosmos-udf.md)]

1. Hover over the function name in the left pane after publishing completes, and select the **Test** icon.

    :::image type="content" source="media/how-to-create-translytical-task-flows/test-user-data-function.png" lightbox="media/how-to-create-translytical-task-flows/test-user-data-function.png" alt-text="Screenshot of the Test icon for the published function.":::

1. Provide sample input values in the test pane:

    - `categoryName`: Computers, Desktops
    - `productId`: 05bca58f-257c-4129-8373-1b0951cb8104
    - `newPrice`: 5000

1. Select **Test** to run the function. Review the output and logs to verify the function runs successfully, then close the test pane.

## Connect to Cosmos DB data in Power BI

Connect to your Cosmos DB database from Power BI Desktop and transform the data for your report.

1. Open Power BI Desktop and create a new report.

1. Select **Get Data** > **More**, search for **Cosmos DB**, and select **Azure Cosmos DB v2**. Select **Connect**.

    :::image type="content" source="media/how-to-create-translytical-task-flows/get-data-cosmos-db.png" lightbox="media/how-to-create-translytical-task-flows/get-data-cosmos-db.png" alt-text="Screenshot of the Get Data dialog with the Azure Cosmos DB v2 connector selected.":::

1. In the connection dialog, provide the Cosmos DB endpoint and for **Data Connectivity mode**, select **DirectQuery**. Select **OK**.

    > [!NOTE]
    > If prompted for authentication, select **Organizational account**, sign in with your Microsoft Fabric credentials, and select **Connect**.

1. In the Navigator pane, expand the Cosmos DB database and select the `SampleData` and `SampleData_PriceHistory[]` tables from the **SampleData** container.

1. Select **Transform Data** to open the Power Query Editor.

    :::image type="content" source="media/how-to-create-translytical-task-flows/load-data-to-power-query.png" lightbox="media/how-to-create-translytical-task-flows/load-data-to-power-query.png" alt-text="Screenshot of the Navigator pane with SampleData tables selected.":::

1. In the Power Query Editor, rename the **SampleData_priceHistory[]** table to **PriceHistory** by right-clicking the table in the left pane and selecting **Rename**.

1. Select the **SampleData** table. On the **Home** tab, select **Choose Columns** and keep only these columns: `categoryName`, `currentPrice`, `docType`, `name`, and `productId`. Select **OK**.

    :::image type="content" source="media/how-to-create-translytical-task-flows/choose-columns.png" lightbox="media/how-to-create-translytical-task-flows/choose-columns.png" alt-text="Screenshot of the Choose Columns dialog with the selected columns.":::

1. Select the **docType** column in the **SampleData** table and filter to only include rows where `docType` equals `product`.

1. Select the **PriceHistory** table and remove the following columns: `SampleData(categoryName)`, `SampleData(id)`, and `categoryName` by right-clicking the column headers and selecting **Remove**.

1. Rename `SampleData_priceHistory[]_date` to `date` and `SampleData_priceHistory[]_price` to `price`.

1. Select **Close and Apply** to load the data into Power BI.

## Create the interactive report

Build report visuals and connect the User data function to enable price updates from the report.

1. Switch to the **Model** view in Power BI Desktop and select **Manage Relationships** from the top menu.

    :::image type="content" source="media/how-to-create-translytical-task-flows/manage-relationships.png" lightbox="media/how-to-create-translytical-task-flows/manage-relationships.png" alt-text="Screenshot of the Manage Relationships option in the Model view.":::

1. Select **New Relationship** and create a relationship between the `productId` field in the `SampleData` table and the `id` field in the `PriceHistory` table. Select **Save** and close the Manage Relationships dialog.

    :::image type="content" source="media/how-to-create-translytical-task-flows/new-relationship.png" lightbox="media/how-to-create-translytical-task-flows/new-relationship.png" alt-text="Screenshot of the New Relationship dialog with the productId and id fields mapped.":::

1. Select the **SampleData** table in the Data pane. On the top menu, select **New measure**.

1. Copy the DAX code below and paste it into the formula bar, then select the checkmark icon to save the measure. This measure formats the current price for display in the report.

    ```dax
    currentPriceDisplay =
    VAR v = SELECTEDVALUE('SampleData'[currentPrice])
    RETURN
    IF(
        HASONEVALUE('SampleData'[categoryName]) &&
        HASONEVALUE('SampleData'[name]),
        IF(
            v >= 100000,
            "$" & FORMAT(v / 1000, "#,0.##") & "K",
            "$" & FORMAT(v, "#,0.##")
        ),
        BLANK()
    )
    ```

1. Switch to **Report** view on the left navigation bar.

1. In the **Visualizations** pane on the right, select the **Slicer** visual and add the `categoryName` field from the `SampleData` table.

    :::image type="content" source="media/how-to-create-translytical-task-flows/category-slicer.png" lightbox="media/how-to-create-translytical-task-flows/category-slicer.png" alt-text="Screenshot of the category name slicer visual on the report canvas.":::

1. In the **Format Visual** tab, under **Slicer Settings**, change the **Style** to **Dropdown**.

    :::image type="content" source="media/how-to-create-translytical-task-flows/slicer-format.png" lightbox="media/how-to-create-translytical-task-flows/slicer-format.png" alt-text="Screenshot of the slicer format settings with Dropdown style selected.":::

1. Add another **Slicer** visual for the `name` field from the `SampleData` table.

1. Add a **Card** visual and drag the `currentPriceDisplay` measure to the **Value** well.

    :::image type="content" source="media/how-to-create-translytical-task-flows/current-price-card.png" lightbox="media/how-to-create-translytical-task-flows/current-price-card.png" alt-text="Screenshot of the card visual showing the current price display measure.":::

1. Toggle off **Label** in the **Format Visual** tab under **Visual** > **Callout**.

1. Toggle on **Title** under **General** and set the title text to `Current Price`.

1. Add a **Line Chart** visual on the report canvas.

1. Drag the `date` field from the **PriceHistory** table to the **X axis** well and the `price` field to the **Y axis** well.

    :::image type="content" source="media/how-to-create-translytical-task-flows/price-history-line-chart.png" lightbox="media/how-to-create-translytical-task-flows/price-history-line-chart.png" alt-text="Screenshot of the line chart visual showing the price history over time.":::

1. Add an **Input Slicer** visual to the report canvas.

    :::image type="content" source="media/how-to-create-translytical-task-flows/input-slicer.png" lightbox="media/how-to-create-translytical-task-flows/input-slicer.png" alt-text="Screenshot of the input slicer visual on the report canvas.":::

1. Select the input slicer and in the **Format Visual** > **General** > **Title** options, set the title to `Enter new price`.

1. From the top navigation bar, select **Insert** > **Buttons**, and in the dropdown, select **Blank** to add a blank button to the report.

    :::image type="content" source="media/how-to-create-translytical-task-flows/insert-button.png" lightbox="media/how-to-create-translytical-task-flows/insert-button.png" alt-text="Screenshot of the Insert menu with the Blank button option.":::

1. Position the button below the input slicer.

1. Select the button and in the **Format button** pane, expand **Action** and turn it **On**.

1. Configure the **Action** section with the following values:

    - **Type**: Data function
    - **Data function**: Select the **fx** button, expand `update_price_writeback`, and select `update_price`. Select **Connect**.

1. Map the function parameters:

    - **categoryName**: Select the **fx** button and select the `categoryName` field from the `SampleData` table.
    - **productId**: Select the **fx** button and select the `productId` field from the `SampleData` table.
    - **newPrice**: Select `Enter New Price` from the dropdown.

    :::image type="content" source="media/how-to-create-translytical-task-flows/map-function-parameters.png" lightbox="media/how-to-create-translytical-task-flows/map-function-parameters.png" alt-text="Screenshot of the Action section with function parameters mapped to report fields.":::

1. In the **Format button** pane, expand **Style**, turn **Text** on, and set the button text to `Submit`.

1. In **Style** > **Apply settings to**, switch the **State** to **Loading**. Expand **Text** and set the value to `Submitting`.

## Publish and run the task flow

1. Save your Power BI report and select **Publish** from the **Home** tab to publish the report to your Fabric workspace.

1. Navigate to your Fabric workspace and open the published report.

    > [!NOTE]
    > On first opening, you might encounter an error: *The data source Extension is missing credentials and cannot be accessed*. To resolve this:
    >
    > 1. Open the semantic model for your report and from the top menu bar, select **Settings**.
    > 1. Expand the **Data source credentials** setting.
    > 1. Select **Edit credentials**.
    > 1. Select **OAuth2** as the **Authentication method**.
    > 1. Select **Sign in** and sign in with your Microsoft Fabric credentials.

1. In the input slicer, enter a new price for the selected product.

1. Select **Submit** to invoke the User Data Function and update the product price in Cosmos DB.

1. After the function completes, the current price card and price history line chart update to reflect the new price. If the visuals don't refresh automatically, select the refresh button in the top menu bar.

    :::image type="content" source="media/how-to-create-translytical-task-flows/final-report.png" lightbox="media/how-to-create-translytical-task-flows/final-report.png" alt-text="Screenshot of the completed translytical task flow report with slicers, price card, line chart, and submit button.":::

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Create Power BI reports using Cosmos DB in Microsoft Fabric](how-to-create-reports.md)
- [User data functions with Cosmos DB in Microsoft Fabric](how-to-user-data-functions.md)
