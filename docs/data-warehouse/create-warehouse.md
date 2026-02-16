---
title: Create a Warehouse
description: Learn how to create a Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: prlangad
ms.date: 09/18/2025
ms.topic: how-to
ms.search.form: Create a warehouse # This article's title should not change. If so, contact engineering.
---
# Create a Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article describes how to get started with [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric using the [!INCLUDE [product-name](../includes/product-name.md)] portal, including discovering creation and consumption of the warehouse. You learn how to create your warehouse from scratch and sample along with other helpful information to get you acquainted and proficient with warehouse capabilities offered through the [!INCLUDE [product-name](../includes/product-name.md)] portal.

> [!TIP]
> You can proceed with either a [new blank Warehouse](#how-to-create-a-blank-warehouse) or [a new Warehouse with sample data](#how-to-create-a-warehouse-sample) to continue this series of Get Started steps.

<a id="how-to-create-a-warehouse"></a>

<a id="how-to-create-a-blank-warehouse"></a>

## Create a warehouse

You can start creating your warehouse from the workspace. Select **+ New Item** and look for the **Warehouse** or **Sample warehouse** card under the **Store data** section. 

An empty warehouse is created for you to start creating objects in the warehouse. You can use either [sample data](/azure/open-datasets/dataset-catalog) to get a jump start or load your own test data if you prefer.

:::image type="content" source="media/create-warehouse/warehouse-home-hub.png" alt-text="Screenshot showing the Sample warehouse and Warehouse cards in the New Item menu." lightbox="media/create-warehouse/warehouse-home-hub.png":::

Another option available to create your warehouse is through the **Create** button in the navigation pane. Look for the **Warehouse** or **Sample warehouse** cards under **Data Warehouse**.

Once initialized, you can load data into your warehouse. For more information about getting data into a warehouse, see [Ingest data into the Warehouse](ingest-data.md).

Your warehouse data is located in the region of your Fabric workspace. The region of your workspace based on the license capacity, which is displayed in **Workspace settings**, in the **Workspace type** page. 

<a id="how-to-create-a-warehouse-sample"></a>

## Create a warehouse with sample data

In this section, we walk you through creating a sample [!INCLUDE [fabric-dw](includes/fabric-dw.md)] from scratch.

1. Select the **Warehouse sample** card.
    - In your workspace, select **+ New Item** and look for the **Warehouse** or **Sample warehouse** card under the **Store data** section. 
    - Or, select **Create** in the navigation pane. Look for the **Warehouse** or **Sample warehouse** cards under **Data Warehouse**.

   :::image type="content" source="media/create-warehouse/home-hub-warehouse-sample.png" alt-text="Screenshot showing the Warehouse and Sample warehouse cards." lightbox="media/create-warehouse/home-hub-warehouse-sample.png":::

1. Provide the name for your sample warehouse and select **Create**.

1. The create action creates a new [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and start loading sample data into it. The data loading takes few minutes to complete.

1. On completion of loading sample data, the warehouse opens with data loaded into tables and views to query.

   :::image type="content" source="media/create-warehouse/warehouse-with-sample-table-view.png" alt-text="Screenshot showing the Warehouse loaded with sample data." lightbox="media/create-warehouse/warehouse-with-sample-table-view.png":::

If you have an existing warehouse created that's empty, the following steps show how to load sample data.

1. Once you have created your warehouse, you can load sample data into warehouse from **Use sample database** card on the home page of the warehouse.

1. The data loading takes few minutes to complete.

1. On completion of loading sample data, the warehouse displays data loaded into tables and views to query.

1. The following sample T-SQL scripts can be used on the sample data in your new warehouse.

    > [!NOTE]
    > It's important to note that much of the functionality described in this section is also available to users via a TDS end-point connection and tools such as [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true) (for users who prefer to use T-SQL for most their data processing needs). For more information, see [Connectivity](connectivity.md) or [Query the SQL analytics endpoint or Warehouse](query-warehouse.md).

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
