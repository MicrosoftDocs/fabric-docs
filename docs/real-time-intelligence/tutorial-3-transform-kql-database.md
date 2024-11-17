---
title: Real-Time Intelligence tutorial part 3- Transform data in a KQL Database
description: Learn how to use an update policy to transform data in a KQL Database in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to transform data in a KQL database in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 3: Transform data in a KQL database

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub](tutorial-2-get-real-time-events.md).

In this part of the tutorial, you learn how to use an update policy to transform data in a KQL Database in Real-Time Intelligence. 

## Create target table

In this step, you create target table with same schema as the source table. The target table will be used to host the data that is transformed with the update policy.

1. Browse to the KQL database you created in a previous step, named *Tutorial*.
1. In the object tree, under the KQL database name, select the query workspace called **Tutorial_queryset**.
1. Copy/paste the following command to create a new table called **BikesDataTransformed** based on the existing table **TutorialTable**.
    
    ```kusto
    .create table BikesDataTransformed based-on TutorialTable
    ```

1. Run the command to create the table.
    You should now see another table under the **Tables** node in the object tree called **BikesDataTransformed**.

## Create function with transformation logic

In this step, you create a stored function that holds the transformation logic to be used in the update policy. The function parses the BikepointID column to remove the prefix "BikePoints_".

1. From the menu ribbon, select **Database**.
1. Select **+New** > **Function**.

1. Edit the function so that it matches the following code, or copy/paste the following command into the query editor.

    ```kusto
    .create-or-alter function ParseBikePointID()
    {
        TutorialTable
        | parse BikepointID with * "BikePoints_" BikepointID
    }
    ```

1. Run the command to create the function.
    You should now see the function **ParseBikePointID** under the **Functions** node in the object tree.

## Apply update policy

In this step, you apply an update policy to the target table to transform the data. The update policy uses the stored function ParseBikePointID() to parse the BikepointID column.

1. From the menu ribbon, select **Database**.
1. Select **+New** > **Table update policy**.

1. Edit the policy so that it matches the following code, or copy/paste the following command into the query editor.

    ~~~kusto
    .alter table BikesDataTransformed policy update
    ```[{
        "IsEnabled": true,
        "Source": "TutorialTable",
        "Query": "ParseBikePointID()",
        "IsTransactional": false,
        "PropagateIngestionProperties": false
    }]```
    ~~~

1. Run the command to create the update policy.  

## Verify transformation

In this step, you verify that the transformation was successful by querying the source and target tables.

1. Copy/paste the following query into the query editor to view the first 10 records in the source table. Run the query.

    ```kusto
    TutorialTable
    | take 10
    ``` 

1. Copy/paste the following query into the query editor to view the first 10 records in the target table. Run the query.

    ```kusto
    BikesDataTransformed
    | take 10
    ```

Notice that the BikepointID column in the target table no longer contains the prefix "BikePoints_".

## Related content

For more information about tasks performed in this tutorial, see:

* [Update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true)
* [Stored functions](/kusto/query/schema-entities/stored-functions?view=microsoft-fabric&preserve-view=true)
* [.create function command](/kusto/management/create-function?view=microsoft-fabric&preserve-view=true)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 4: Query streaming data in a KQL queryset](tutorial-4-query-data.md)
