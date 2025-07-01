---
title: Real-Time Intelligence tutorial part 3- Transform data in a KQL Database
description: Learn how to use an update policy to transform data in a KQL Database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to transform data in a KQL database in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 3: Transform data in a KQL database

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub](tutorial-2-get-real-time-events.md).

In this part of the tutorial, you learn how to use an update policy to transform data in a KQL Database in Real-Time Intelligence. Update policies are automation mechanisms triggered when new data is written to a table. They eliminate the need for special orchestration by running a query to transform the ingested data and save the result to a destination table. Multiple update policies can be defined on a single table, allowing for different transformations and saving data to multiple tables simultaneously. The target tables can have a different schema, retention policy, and other policies from the source table.

## Move raw data table to a bronze folder

In this step, you move the raw data table into a Bronze folder to organize the data in the KQL database.

1. Browse to the KQL database you created in a previous step, named *Tutorial*.
1. In the object tree, under the KQL database name, select the query workspace called **Tutorial_queryset**.
1. Copy/paste the following command to alter table to move table into a Bronze folder.

    ```kusto
    .alter table RawData (BikepointID:string,Street:string,Neighbourhood:string,Latitude:dynamic,Longitude:dynamic,No_Bikes:long,No_Empty_Docks:long,Timestamp:datetime) with (folder="Bronze")
    ```

## Create target table

In this step, you create a target table that will be used to store the data that is transformed with the update policy.

1. Copy/paste the following command to create a new table called **TransformedData** with a specified schema.

    ```kusto
    .create table TransformedData (BikepointID: int, Street: string, Neighbourhood: string, Latitude: dynamic, Longitude: dynamic, No_Bikes: long, No_Empty_Docks: long, Timestamp: datetime, BikesToBeFilled: long, Action: string) with (folder="Silver")
    ```

1. Run the command to create the table.
    You should now see another table under the **Tables** node in the object tree called **TransformedData**.

## Create function with transformation logic

In this step, you create a stored function that holds the transformation logic to be used in the update policy. The function parses the *BikepointID* column and adds two new calculated columns.

1. From the menu ribbon, select **Database**.
1. Select **+New** > **Function**.

1. Edit the function so that it matches the following code, or copy/paste the following command into the query editor.

    ```kusto
    .create-or-alter function TransformRawData() {
    RawData
    | parse BikepointID with * "BikePoints_" BikepointID:int
    | extend BikesToBeFilled = No_Empty_Docks - No_Bikes
    | extend Action = iff(BikesToBeFilled > 0, tostring(BikesToBeFilled), "NA")
     }
    ```

1. Run the command to create the function.
    You should now see the function **TransformRawData** under the **Functions** node in the object tree.

## Apply update policy

In this step, you apply an update policy to the target table to transform the data. The update policy uses the stored function *TransformRawData()* to parse the *BikepointID* column and adds two new calculated columns.

1. From the menu ribbon, select **Database**.
1. Select **+ New** > **Table update policy**.
1. Edit the policy so that it matches the following code, or copy/paste the following command into the query editor.

    ~~~kusto
    .alter table TransformedData policy update
    ```[{
        "IsEnabled": true,
        "Source": "RawData",
        "Query": "TransformRawData()",
        "IsTransactional": false,
        "PropagateIngestionProperties": false
    }]```
    ~~~

1. Run the command to create the update policy.  

## Verify transformation

In this step, you verify that the transformation was successful by comparing the output from the source and target tables.

> [!NOTE]
> It might take few seconds to see data in the transformed table.

1. Copy/paste the following query into the query editor to view 10 arbitrary records in the source table. Run the query.

    ```kusto
    RawData
    | take 10
    ```

1. Copy/paste the following query into the query editor to view 10 arbitrary records in the target table. Run the query.

    ```kusto
    TransformedData
    | take 10
    ```

Notice that the BikepointID column in the target table no longer contains the prefix "BikePoints_".

## Related content

For more information about tasks performed in this tutorial, see:

* [Update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true)
* [Parse operator](/kusto/query/parse-operator?view=microsoft-fabric&preserve-view=true)
* [Stored functions](/kusto/query/schema-entities/stored-functions?view=microsoft-fabric&preserve-view=true)
* [.create function command](/kusto/management/create-function?view=microsoft-fabric&preserve-view=true)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 4: Query streaming data using KQL](tutorial-4-query-data.md)
