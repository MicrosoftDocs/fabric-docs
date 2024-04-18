---
title: Real-Time Intelligence tutorial part 2- Get data in the Real-Time data hub
description: Learn how to get data in the Real-Time data hub in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 04/18/2024
ms.search.form: Get started
---
# Real-Time Intelligence tutorial part 2: Get data in the Real-Time data hub

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:  [Tutorial part 1: Create resources](tutorial-1-resources.md).

## Get events

1. From the navigation bar, select **Real-Time data hub**.
1. Select **+ Get events**.
1. The **Get events** pane opens. Select **Sample data**.
1. In **Eventstream name**, enter *Tutorial-event*. 
1. From the available samples, select **Bike location data**.
1. In **Source name**, enter *Tutorial*.
1. Select **Add**. TODO: CONFIRM. 

1. When the event stream is created, select **Open Eventstream**.

## Configure the event stream

1. In the Eventstream authoring area, select *** New destination** > **KQL Database**.
1. Under **Data ingestion mode**, select **Direct ingestion**.
1. In the **KQL Database** pane, fill out the fields as follows:

    |Field  | Suggested value  |
    |---------|---------|
    | **Destination name**     |  *Tutorial-destination* |
    | **Workspace**     |   The workspace in which you [created an event house](tutorial-1-resources.md#create-an-event-house).      |
    | **KQL Database**     | *Tutorial* |

1. Select **Add and configure.**

    A data ingestion pane opens with the **Destination** tab selected.

## Configure data loading to the KQL database

1. Select **+ New table**,  and enter *bikes* as the table name.
1. Under **Configure the data source**, review the default values. The **Data connection name** is made from the database name and the eventstream name.

1. Select **Next** to inspect the data.

1. Select **Finish**

     In the **Data preparation** window, all steps are marked with green check marks when the data connection is successfully created. The data from Eventstream begins streaming automatically into your table.

> [!NOTE]
> You may need to refresh the page to view your table after the Eventstream connection has been established.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create and manage an eventstream](event-streams/create-manage-an-eventstream.md)
* [Add a sample data as a source](event-streams/add-source-sample-data.md#add-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-destination-kql-database.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 3: Get historical data](tutorial-3-get-historical-data.md)
