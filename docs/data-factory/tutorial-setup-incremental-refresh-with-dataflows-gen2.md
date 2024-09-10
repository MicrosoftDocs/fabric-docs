---
title: Pattern to incrementally amass data with Dataflow Gen2
description: This tutorial takes 15 minutes, and describes how to incrementally amass data into a lakehouse using Dataflow Gen2.
ms.reviewer: jburchel
ms.author: jeluitwi
author: luitwieler
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Pattern to incrementally amass data with Dataflow Gen2

> [!IMPORTANT]
> This is a pattern to incrementally amass data with Dataflow Gen2. This isn't the same as incremental refresh. Incremental refresh is a feature that's currently in development. This feature is one of the top voted ideas on our ideas website. You can vote for this feature [on the Fabric Ideas site](https://ideas.fabric.microsoft.com/ideas/idea/?ideaid=4814b098-efff-ed11-a81c-6045bdb98602).

This tutorial takes 15 minutes, and describes how to incrementally amass data into a lakehouse using Dataflow Gen2.

Incrementally amassing data in a data destination requires a technique to load only new or updated data into your data destination. This technique can be done by using a query to filter the data based on the data destination. This tutorial shows how to create a dataflow to load data from an OData source into a lakehouse and how to add a query to the dataflow to filter the data based on the data destination.

The high-level steps in this tutorial are as follows:

- Create a dataflow to load data from an OData source into a lakehouse.
- Add a query to the dataflow to filter the data based on the data destination.
- (Optional) reload data using notebooks and pipelines.

## Prerequisites

You must have a Microsoft Fabric enabled workspace. If you don't already have one, refer to [Create a workspace](../get-started/create-workspaces.md). Also, the tutorial assumes you are using the diagram view in Dataflow Gen2. To check if you are using the diagram view, in the top ribbon go to **View** and make sure **Diagram view** is selected.

## Create a dataflow to load data from an OData source into a lakehouse

In this section, you create a dataflow to load data from an OData source into a lakehouse.

1. Create a new lakehouse in your workspace.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/new-lakehouse.png" alt-text="Screenshot showing the create lakehouse dialog.":::

1. Create a new Dataflow Gen2 in your workspace.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/new-dataflow-gen2.png" alt-text="Screenshot showing the create dataflow dropdown.":::

1. Add a new source to the dataflow. Select the OData source and enter the following URL: `https://services.OData.org/V4/Northwind/Northwind.svc`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/get-data.png" alt-text="Screenshot showing the get data dialog.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/odata-connector.png" alt-text="Screenshot showing the OData connector.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/odata-settings.png" alt-text="Screenshot showing the OData settings.":::

1. Select the Orders table and select **Next**.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/select-orders-table-inline.png" alt-text="Screenshot showing the select orders table dialog." lightbox="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/select-orders-table.png" :::

1. Select the following columns to keep:
    - `OrderID`
    - `CustomerID`
    - `EmployeeID`
    - `OrderDate`
    - `RequiredDate`
    - `ShippedDate`
    - `ShipVia`
    - `Freight`
    - `ShipName`
    - `ShipAddress`
    - `ShipCity`
    - `ShipRegion`
    - `ShipPostalCode`
    - `ShipCountry`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/choose-columns-function.png" alt-text="Screenshot showing the choose columns function.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/choose-columns-orders-table.png" alt-text="Screenshot showing the choose columns orders table.":::

1. Change datatype of `OrderDate`, `RequiredDate`, and `ShippedDate` to `datetime`.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/change-datatype.png" alt-text="Screenshot showing the change datatype function.":::

1. Set up the data destination to your lakehouse using the following settings:
    - Data destination: `Lakehouse`
    - Lakehouse: Select the lakehouse you created in step 1.
    - New table name: `Orders`
    - Update method: `Replace`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-ribbon.png" alt-text="Screenshot showing the data destination lakehouse ribbon.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-orders-table.png" alt-text="Screenshot showing the data destination lakehouse order table.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-settings-replace-inline.png" alt-text="Screenshot showing the data destination lakehouse settings replace." lightbox="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-settings-replace.png":::

1. select **Next** and publish the dataflow.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/publish-dataflow.png" alt-text="Screenshot showing the publish dataflow dialog.":::

You have now created a dataflow to load data from an OData source into a lakehouse. This dataflow is used in the next section to add a query to the dataflow to filter the data based on the data destination. After that, you can use the dataflow to reload data using notebooks and pipelines.

## Add a query to the dataflow to filter the data based on the data destination

This section adds a query to the dataflow to filter the data based on the data in the destination lakehouse. The query gets the maximum `OrderID` in the lakehouse at the beginning of the dataflow refresh and uses the maximum OrderId to only get the orders with a higher OrderId from to source to append to your data destination. This assumes that orders are added to the source in ascending order of `OrderID`. If this isn't the case, you can use a different column to filter the data. For example, you can use the `OrderDate` column to filter the data.

>[!NOTE]
> OData filters are applied within Fabric after the data is received from the data source, however, for database sources like SQL Server, the filter is applied in the query submitted to the back end data source, and only filtered rows are returned to the service.

1. After the dataflow refreshes, reopen the dataflow you created in the previous section.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/open-dataflow.png" alt-text="Screenshot showing the open dataflow dialog.":::

1. Create a new query named `IncrementalOrderID` and get data from the Orders table in the lakehouse you created in the previous section.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/get-data.png" alt-text="Screenshot showing the get data dialog.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/lakehouse-connector.png" alt-text="Screenshot showing the lakehouse connector.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/get-orders-table-lakehouse.png" alt-text="Screenshot showing the get orders table lakehouse.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/rename-query-function.png" alt-text="Screenshot showing the rename query function.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/renamed-query-name.png" alt-text="Screenshot showing the renamed query.":::

1. Disable staging of this query.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/disable-staging.png" alt-text="Screenshot showing the disable staging function.":::

1. In the data preview, right-click on the `OrderID` column and select **Drill down**.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/drill-down.png" alt-text="Screenshot showing the drill down function.":::

1. From the ribbon, select **List Tools** -> **Statistics** -> **Maximum**.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/statistics-maximum-orderid.png" alt-text="Screenshot showing the statistics maximum orderid function.":::

You now have a query that returns the maximum OrderID in the lakehouse. This query is used to filter the data from the OData source. The next section adds a query to the dataflow to filter the data from the OData source based on the maximum OrderID in the lakehouse.

1. Go back to the Orders query and add a new step to filter the data. Use the following settings:
    - Column: `OrderID`
    - Operation: `Greater than`
    - Value: parameter `IncrementalOrderID`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/orderid-greater-than-filter.png" alt-text="Screenshot showing the orderid greater than filter function.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/filter-settings.png" alt-text="Screenshot showing the filter settings.":::

1. Allow combining the data from the OData source and the lakehouse by confirming the following dialog:

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/combine-datasources-confirmation.png" alt-text="Screenshot showing the allow combining data dialog.":::

1. Update the data destination to use the following settings:
    - Update method: `Append`

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/edit-output-settings.png" alt-text="Screenshot showing the edit output settings function.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/existing-orders-table.png" alt-text="Screenshot showing the existing orders table.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/output-destination-lakehouse-settings-append.png" alt-text="Screenshot showing the data destination lakehouse settings append.":::

1. Publish the dataflow.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/publish-dataflow.png" alt-text="Screenshot showing the publish dataflow dialog.":::

Your dataflow now contains a query that filters the data from the OData source based on the maximum OrderID in the lakehouse. This means that only new or updated data is loaded into the lakehouse. The next section uses the dataflow to reload data using notebooks and pipelines.

## (Optional) reload data using notebooks and pipelines

Optionally, you can reload specific data using notebooks and pipelines. With custom python code in the notebook, you remove the old data from the lakehouse. By then creating a pipeline in which you first run the notebook and sequentially run the dataflow, you reload the data from the OData source into the lakehouse.
Notebooks support multiple languages, but this tutorial uses PySpark. Pyspark is a Python API for Spark and is used in this tutorial to run Spark SQL queries.

1. Create a new notebook in your workspace.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/new-notebook.png" alt-text="Screenshot showing the new notebook dialog.":::

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

1. Run the notebook to verify that the data is removed from the lakehouse.
1. Create a new pipeline in your workspace.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/new-pipeline.png" alt-text="Screenshot showing the new pipeline dialog.":::

1. Add a new notebook activity to the pipeline and select the notebook you created in the previous step.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/add-notebook-activity.png" alt-text="Screenshot showing the add notebook activity dialog.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/select-notebook.png" alt-text="Screenshot showing the select notebook dialog.":::

1. Add a new dataflow activity to the pipeline and select the dataflow you created in the previous section.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/add-dataflow-activity.png" alt-text="Screenshot showing the add dataflow activity dialog.":::

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/select-dataflow.png" alt-text="Screenshot showing the select dataflow dialog.":::

1. Link the notebook activity to the dataflow activity with a success trigger.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/connect-activities.png" alt-text="Screenshot showing the connect activities dialog.":::

1. Save and run the pipeline.

    :::image type="content" source="media/tutorial-setup-incremental-refresh-with-dataflows-gen2/run-pipeline.png" alt-text="Screenshot showing the run pipeline dialog.":::

You now have a pipeline that removes old data from the lakehouse and reloads the data from the OData source into the lakehouse. With this setup, you can reload the data from the OData source into the lakehouse on a regular basis.
