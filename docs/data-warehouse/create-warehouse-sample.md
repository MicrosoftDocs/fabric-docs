---
title: Create a Warehouse sample
description: Learn how to create a sample Warehouse in Microsoft Fabric.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 02/21/2024
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.search.form: Create a warehouse
---
# Create a sample Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article describes how to get started with sample [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using the [!INCLUDE [product-name](../includes/product-name.md)] portal, including creation and consumption of the warehouse.

## How to create a new warehouse with sample data

In this section, we walk you through the experience of creating a new [!INCLUDE [fabric-dw](includes/fabric-dw.md)] with sample data.

### Create a warehouse sample using the Home hub

1. The first hub in the navigation pane is the **Home** hub. You can start creating your warehouse sample from the **Home** hub by selecting the **Warehouse sample** card under the **New** section.

   :::image type="content" source="media/create-warehouse-sample/home-hub-warehouse-sample.png" alt-text="Screenshot showing the Warehouse sample card in the Home hub.":::

1. Provide the name for your sample warehouse and select **Create**.

   :::image type="content" source="media/create-warehouse-sample/home-hub-provide-sample-name.png" alt-text="Screenshot showing the Warehouse creation experience in the Home hub.":::

1. The create action creates a new [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and start loading sample data into it. The data loading takes few seconds to complete.

   :::image type="content" source="media/create-warehouse-sample/loading-sample-data.png" alt-text="Screenshot showing the loading sample data into Warehouse." lightbox="media/create-warehouse-sample/loading-sample-data.png":::

1. On completion of loading sample data, the warehouse opens with data loaded into tables and views to query.

   :::image type="content" source="media/create-warehouse-sample/warehouse-with-sample-table-view.png" alt-text="Screenshot showing the Warehouse loaded with sample data." lightbox="media/create-warehouse-sample/warehouse-with-sample-table-view.png":::

### Load sample data into existing warehouse

1. Once you have created your warehouse, you can load sample data into warehouse from **Use sample database** card.

   :::image type="content" source="media/create-warehouse-sample/use-sample-database.png" alt-text="Screenshot showing where to select the Warehouse card in the Create hub." lightbox="media/create-warehouse-sample/use-sample-database.png":::

1. The data loading takes few seconds to complete.

   :::image type="content" source="media/create-warehouse-sample/loading-sample-data.png" alt-text="Screenshot showing the loading sample data into warehouse." lightbox="media/create-warehouse-sample/loading-sample-data.png":::

1. On completion of loading sample data, the warehouse displays data loaded into tables and views to query.

   :::image type="content" source="media/create-warehouse-sample/warehouse-with-sample-table-view.png" alt-text="Screenshot showing the warehouse loaded with sample data." lightbox="media/create-warehouse-sample/warehouse-with-sample-table-view.png":::

### Sample scripts

Your new warehouse is ready to accept T-SQL queries. The following sample T-SQL scripts can be used on the sample data in your new warehouse.

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

## Related content

- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
- [Warehouse settings and context menus](settings-context-menus.md)
