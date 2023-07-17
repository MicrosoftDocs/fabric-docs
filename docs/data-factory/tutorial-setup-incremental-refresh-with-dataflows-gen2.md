---
title: Incremental refresh with Dataflow Gen2
description: This module takes 15 minutes, incrementally load data into a lakehouse using Dataflow Gen2.
ms.reviewer: jburchel
ms.author: jeluitwi
author: luitwieler
ms.topic: tutorial 
ms.date: 07/14/2023
---


# Module 4 - Incremental refresh with Dataflow Gen2

This module takes 15 minutes, incrementally load data into a lakehouse using Dataflow Gen2.

The high-level steps in module 4 are as follows:

- Create a dataflow to load data from an odata source into a lakehouse
- Add a query to the dataflow to filter the data based on the output destination
- (optional) reload data using notebooks and pipelines

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Prerequisites

A Microsoft Fabric enabled workspace. If you don't already have one, refer to the article [Create a workspace](../get-started/create-workspaces.md).

## Create a dataflow to load data from an odata source into a lakehouse

In this section, you create a dataflow to load data from an odata source into a lakehouse.

1. Create a new lakehouse in your workspace.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/new-lakehouse.png" alt-text="Screenshot showing the create lakehouse dialog":::

1. Create a new dataflow gen2 in your workspace.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/new-dataflow-gen2.png" alt-text="Screenshot showing the create dataflow dropdown":::

1. Add a new source to the dataflow. Select the odata source and enter the following url: `https://services.odata.org/V4/Northwind/Northwind.svc`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/get-data.png" alt-text="Screenshot showing the get data dialog":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/odata-connector.png" alt-text="Screenshot showing the odata connector":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/odata-settings.png" alt-text="Screenshot showing the odata settings":::

1. Select the Orders table and select next.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/select-orders-table.png" alt-text="Screenshot showing the select orders table dialog":::

1. Select the following columns to keep: `OrderID`, `CustomerID`, `EmployeeID`, `OrderDate`, `RequiredDate`, `ShippedDate`, `ShipVia`, `Freight`, `ShipName`, `ShipAddress`, `ShipCity`, `ShipRegion`, `ShipPostalCode`, `ShipCountry`.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/choose-columns-function.png" alt-text="Screenshot showing the choose columns function":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/choose-columns-orders-table.png" alt-text="Screenshot showing the choose columns orders table":::

1. Change datatype of `OrderDate`, `RequiredDate`, `ShippedDate` to `datetime`.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/change-datatype.png" alt-text="Screenshot showing the change datatype function":::

1. Set up Output destination to your lakehouse using the following settings:
    - Output destination: `Lakehouse`
    - Lakehouse: Select the lakehouse you created in step 1.
    - New table name: `Orders`
    - Update method: `Replace`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-ribbon.png" alt-text="Screenshot showing the output destination lakehouse ribbon":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-orders-table.png" alt-text="Screenshot showing the output destination lakehouse order table":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-settings-replace.png" alt-text="Screenshot showing the output destination lakehouse settings replace":::

1. Select next and publish the dataflow.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/publish-dataflow.png" alt-text="Screenshot showing the publish dataflow dialog":::

## Add a query to the dataflow to filter the data based on the output destination

This section adds a query to the dataflow to filter the data based on the output destination.

1. After the Dataflow refreshed, reopen the dataflow you created in the previous section.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/open-dataflow.png" alt-text="Screenshot showing the open dataflow dialog":::

1. Create a new query named `IncrementalOrderID` and get data from the Orders table in the lakehouse you created in the previous section.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/get-data.png" alt-text="Screenshot showing the get data dialog":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/lakehouse-connector.png" alt-text="Screenshot showing the lakehouse connector":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/get-orders-table-lakehouse.png" alt-text="Screenshot showing the get orders table lakehouse":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/rename-query-function.png" alt-text="Screenshot showing the rename query function":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/renamed-query-name.png" alt-text="Screenshot showing the renamed query":::

1. Disable staging of this query.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/disable-staging.png" alt-text="Screenshot showing the disable staging function":::

1. In the data preview, right select on the `OrderID` column and select `Drill Down`.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/drill-down.png" alt-text="Screenshot showing the drill down function":::

1. From the ribbon, select `List Tools` -> `Statistics` -> `Maximum`.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/statistics-maximum-orderid.png" alt-text="Screenshot showing the statistics maximum orderid function":::

You now have a query that returns the maximum OrderID in the lakehouse. This query is used to filter the data from the odata source.

1. Go back to the Orders query and add a new step to filter the data. Use the following settings:
    - Column: `OrderID`
    - Operation: `Greater than`
    - Value: parameter `IncrementalOrderID`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/orderid-greater-than-filter.png" alt-text="Screenshot showing the orderid grater than filter function":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/filter-settings.png" alt-text="Screenshot showing the filter settings":::

1. Update the output destination to use the following settings:
    - Update method: `Append`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/edit-output-settings.png" alt-text="Screenshot showing the edit output settings function":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/existing-orders-table.png" alt-text="Screenshot showing the existing orders table":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-settings-append.png" alt-text="Screenshot showing the output destination lakehouse settings append":::

1. Publish the dataflow.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/publish-dataflow.png" alt-text="Screenshot showing the publish dataflow dialog":::

## (optional) reload data using notebooks and pipelines

Optionally, you can reload specific data using notebooks and pipelines.

1. Create a new notebook in your workspace.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/new-notebook.png" alt-text="Screenshot showing the new notebook dialog":::

1. Add the following PySpark code to your notebook:

    ```python
    ### Variables
    LakehouseName = "YOURLAKEHOUSE"
    TableName = "Orders"
    ColName = "OrderID"
    NumberOfOrdersToRemove = "10"
    
    
    ### Remove Old Orders
    Reload = spark.sql("SELECT Max({0})-{1} as ReLoadValue FROM {2}.{3}".format(ColName,NumberOfOrdersToRemove,LakehouseName,TableName)).collect()
    Reload = Reload[0].ReLoadValue
    spark.sql("Delete from {0}.{1} where {2} > {3}".format(LakehouseName, TableName, ColName, Reload))
    ```

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/add-code-notebook.png" alt-text="Screenshot showing the add notebook code":::

1. Run the notebook to verify that the data is removed from the lakehouse.
1. Create a new pipeline in your workspace.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/new-pipeline.png" alt-text="Screenshot showing the new pipeline dialog":::

1. Add a new notebook activity to the pipeline and select the notebook you created in the previous step.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/add-notebook-activity.png" alt-text="Screenshot showing the add notebook activity dialog":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/select-notebook.png" alt-text="Screenshot showing the select notebook dialog":::

1. Add a new dataflow activity to the pipeline and select the dataflow you created in the previous section.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/add-dataflow-activity.png" alt-text="Screenshot showing the add dataflow activity dialog":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/select-dataflow.png" alt-text="Screenshot showing the select dataflow dialog":::

1. link the notebook activity to the dataflow activity with a success trigger.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/connect-activities.png" alt-text="Screenshot showing the connect activities dialog":::

1. Save and run the pipeline.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/run-pipeline.png" alt-text="Screenshot showing the run pipeline dialog":::
