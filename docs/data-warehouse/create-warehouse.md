---
title: Create a Warehouse
description: Learn how to create a Warehouse in Microsoft Fabric.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 03/18/2024
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.search.form: Create a warehouse # This article's title should not change. If so, contact engineering.
---
# Create a Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article describes how to get started with [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric using the [!INCLUDE [product-name](../includes/product-name.md)] portal, including discovering creation and consumption of the warehouse. You learn how to create your warehouse from scratch and sample along with other helpful information to get you acquainted and proficient with warehouse capabilities offered through the [!INCLUDE [product-name](../includes/product-name.md)] portal.

> [!TIP]
> You can proceed with either a [new blank Warehouse](#how-to-create-a-blank-warehouse) or [a new Warehouse with sample data](#how-to-create-a-warehouse-with-sample-data) to continue this series of Get Started steps.

<a id="how-to-create-a-warehouse"></a>

## How to create a blank warehouse

In this section, we walk you through three distinct experiences available for creating a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] from scratch in the [!INCLUDE [product-name](../includes/product-name.md)] portal: using [the Home hub](#create-a-warehouse-using-the-home-hub), [the Create hub](#create-a-warehouse-using-the-create-hub), or [the workspace list view](#create-a-warehouse-from-the-workspace-list-view).

#### Create a warehouse using the Home hub

The first hub in the navigation pane is the **Home** hub. You can start creating your warehouse from the **Home** hub by selecting the **Warehouse** card under the **New** section. An empty warehouse is created for you to start creating objects in the warehouse. You can use either [sample data](/azure/open-datasets/dataset-catalog) to get a jump start or load your own test data if you prefer.

:::image type="content" source="media/create-warehouse/warehouse-home-hub.png" alt-text="Screenshot showing the Warehouse card in the Home hub.":::

#### Create a warehouse using the Create hub

Another option available to create your warehouse is through the **Create** hub, which is the second hub in the navigation pane.

You can create your warehouse from the **Create** hub by selecting the **Warehouse** card under the **Data Warehousing** section. When you select the card, an empty warehouse is created for you to start creating objects in the warehouse or use a sample to get started as previously mentioned.

:::image type="content" source="media/create-warehouse/warehouse-create-hub.png" alt-text="Screenshot showing where to select the Warehouse card in the Create hub.":::

#### Create a warehouse from the workspace list view

To create a warehouse, navigate to your workspace, select **+ New** and then select **Warehouse** to create a warehouse.

:::image type="content" source="media/create-warehouse/warehouse-workspace-list.png" alt-text="Screenshot showing where to select New and Warehouse in the workspace list view.":::

#### Ready for data

Once initialized, you can load data into your warehouse. For more information about getting data into a warehouse, see [Ingesting data](ingest-data.md).

:::image type="content" source="media/create-warehouse/warehouse-home.png" alt-text="Screenshot of an automatically created warehouse." lightbox="media/create-warehouse/warehouse-home.png":::

<a id="how-to-create-a-warehouse-sample"></a>

## How to create a warehouse with sample data

In this section, we walk you through creating a sample [!INCLUDE [fabric-dw](includes/fabric-dw.md)] from scratch.

1. The first hub in the navigation pane is the **Home** hub. You can start creating your warehouse sample from the **Home** hub by selecting the **Warehouse sample** card under the **New** section.

   :::image type="content" source="media/create-warehouse/home-hub-warehouse-sample.png" alt-text="Screenshot showing the Warehouse sample card in the Home hub.":::

1. Provide the name for your sample warehouse and select **Create**.

   :::image type="content" source="media/create-warehouse/home-hub-provide-sample-name.png" alt-text="Screenshot showing the Warehouse creation experience in the Home hub.":::

1. The create action creates a new [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and start loading sample data into it. The data loading takes few minutes to complete.

   :::image type="content" source="media/create-warehouse/loading-sample-data.png" alt-text="Screenshot showing the loading sample data into Warehouse." lightbox="media/create-warehouse/loading-sample-data.png":::

1. On completion of loading sample data, the warehouse opens with data loaded into tables and views to query.

   :::image type="content" source="media/create-warehouse/warehouse-with-sample-table-view.png" alt-text="Screenshot showing the Warehouse loaded with sample data." lightbox="media/create-warehouse/warehouse-with-sample-table-view.png":::

Now, you're ready to load sample data.

1. Once you have created your warehouse, you can load sample data into warehouse from **Use sample database** card.

   :::image type="content" source="media/create-warehouse/use-sample-database.png" alt-text="Screenshot showing where to select the Warehouse sample card in the Home hub." lightbox="media/create-warehouse/use-sample-database.png":::

1. The data loading takes few minutes to complete.

   :::image type="content" source="media/create-warehouse-sample/loading-sample-data.png" alt-text="Screenshot showing the loading sample data into warehouse." lightbox="media/create-warehouse-sample/loading-sample-data.png":::

1. On completion of loading sample data, the warehouse displays data loaded into tables and views to query.

   :::image type="content" source="media/create-warehouse-sample/warehouse-with-sample-table-view.png" alt-text="Screenshot showing the warehouse loaded with sample data." lightbox="media/create-warehouse-sample/warehouse-with-sample-table-view.png":::

1. The following sample T-SQL scripts can be used on the sample data in your new warehouse.

    > [!NOTE]
    > It is important to note that much of the functionality described in this section is also available to users via a TDS end-point connection and tools such as [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [Azure Data Studio](/sql/azure-data-studio/download-azure-data-studio) (for users who prefer to use T-SQL for the majority of their data processing needs). For more information, see [Connectivity](connectivity.md) or [Query a warehouse](query-warehouse.md).

    ```sql
    
    /*************************************************
    Get number of trips performed by each medallion
    **************************************************/
    
    SELECT 
        M.MedallionID
        ,M.MedallionCode
        ,COUNT(T.TripDistanceMiles) AS TotalTripCount
    FROM   
        dbo.Trip AS T
    JOIN   
        dbo.Medallion AS M
    ON 
        T.MedallionID=M.MedallionID
    GROUP BY 
        M.MedallionID
        ,M.MedallionCode
    
    /****************************************************
    How many passengers are being picked up on each trip?
    *****************************************************/
    SELECT
        PassengerCount,
        COUNT(*) AS CountOfTrips
    FROM 
        dbo.Trip
    WHERE 
        PassengerCount > 0
    GROUP BY 
        PassengerCount
    ORDER BY 
        PassengerCount
    
    /*********************************************************************************
    What is the distribution of trips by hour on working days (non-holiday weekdays)?
    *********************************************************************************/
    SELECT
        ti.HourlyBucket,
        COUNT(*) AS CountOfTrips
    FROM dbo.Trip AS tr
    INNER JOIN dbo.Date AS d
        ON tr.DateID = d.DateID
    INNER JOIN dbo.Time AS ti
        ON tr.PickupTimeID = ti.TimeID
    WHERE
        d.IsWeekday = 1
        AND d.IsHolidayUSA = 0
    GROUP BY
        ti.HourlyBucket
    ORDER BY
        ti.HourlyBucket
    ```

> [!TIP]
> You can proceed with either a blank Warehouse or a sample Warehouse to continue this series of Get Started steps.

## Next step

> [!div class="nextstepaction"]
> [Create tables in the Warehouse in Microsoft Fabric](create-table.md)
