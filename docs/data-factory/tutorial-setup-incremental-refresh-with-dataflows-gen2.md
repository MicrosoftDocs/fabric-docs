---
title: Incremental refresh with Dataflows Gen2
description: This module takes 15 minutes, incrementally load data into a lakehouse using Dataflows gen2.
ms.reviewer: jburchel
ms.author: jeluitwi
author: luitwieler
ms.topic: tutorial 
ms.custom: 
ms.date: 07/13/2023
---


# Module 4 - Incremental refresh with Dataflows Gen2

This module takes 15 minutes, incrementally load data into a lakehouse using Dataflows gen2.

The high-level steps in module 4 are as follows:

- Create a dataflow to load data from a odata source into a lakehouse
- Add a query to the dataflow to filter the data based on the output destination
- (optional) re-load data using notebooks and pipelines

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Prerequisites

A Microsoft Fabric enabled workspace. If you don't already have one, refer to the article [Create a workspace](../get-started/create-workspaces.md).

## Create a dataflow to load data from a odata source into a lakehouse

In this section, you will create a dataflow to load data from a odata source into a lakehouse.

1. Create a new lakehouse in your workspace.
1. Create a new dataflow gen2 in your workspace.
1. Add a new source to the dataflow. Select the odata source and enter the following url: `https://services.odata.org/V4/Northwind/Northwind.svc`
1. Select the Orders table and click next.
1. Select the following columns to keep: `OrderID`, `CustomerID`, `EmployeeID`, `OrderDate`, `RequiredDate`, `ShippedDate`, `ShipVia`, `Freight`, `ShipName`, `ShipAddress`, `ShipCity`, `ShipRegion`, `ShipPostalCode`, `ShipCountry`.
1. Change datatype of `OrderDate`, `RequiredDate`, `ShippedDate` to `datetime`.
1. Setup Output destination to your lakehouse use the following settings:
    - Output destination: `Lakehouse`
    - Lakehouse: Select the lakehouse you created in step 1.
    - New table name: `Orders`
    - Update method: `Replace`
1. Click next and publish the dataflow.

## Add a query to the dataflow to filter the data based on the output destination

This section will add a query to the dataflow to filter the data based on the output destination.

1. Reopen the dataflow you created in the previous section.
1. Create a new query named `IncrementalOrderID` and get data from the Orders table in the lakehouse you created in the previous section.
1. Disable load of this query.
1. In the data preview, right click on the `OrderID` column and select `Drill Down`.
1. From the ribbon, select `List Tools` -> `Statistics` -> `Maximum`.

You now have a query that returns the maximum OrderID in the lakehouse. This query will be used to filter the data from the odata source.

1. Go back to the Orders query and add a new step to filter the data. Use the following settings:
    - Column: `OrderID`
    - Operation: `Greater than`
    - Value: parameter `IncrementalOrderID`
1. Update the output destination to use the following settings:
    - Update method: `Append`
1. Publish the dataflow.

## (optional) re-load data using notebooks and pipelines

Optionally, you can re-load specific data using notebooks and pipelines.

1. Create a new notebook in your workspace.
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
1. Add a new notebook activity to the pipeline and select the notebook you created in the previous step.
1. Add a new dataflow activity to the pipeline and select the dataflow you created in the previous section.
1. link the notebook activity to the dataflow activity with a success trigger.
1. Save and run the pipeline.

