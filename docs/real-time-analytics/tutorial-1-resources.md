---
title: Real-Time Analytics tutorial part 1- Create resources
description: Learn how to create a KQL database and enable data availability in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 02/04/2024
ms.search.form: Get started
---
# Real-Time Analytics tutorial part 1: Create resources

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Introduction to the Real-Time Analytics tutorial](tutorial-introduction.md).

## Create a KQL database

1. Browse to the workspace in which you want to create your database.
1. On the bottom left experience switcher, select **Real-Time Analytics**. :::image type="icon" source="media/realtime-analytics-tutorial/product-icon.png" border="false":::

1. In the upper left corner, select **+ New > KQL Database**.
1. Enter *NycTaxiDB* as the database name.
1. Select **Create**.

    :::image type="content" source="media/realtime-analytics-tutorial/new-database.png" alt-text="Screenshot of creating new KQL database in Real-Time Analytics in Microsoft Fabric.":::

    When provisioning is complete, the KQL database details page is shown.

## Turn on OneLake availability

1. In the **Database details** card, select the **pencil** icon.

    :::image type="content" source="media/realtime-analytics-tutorial/onelake-availability.png" alt-text="Screenshot of database details page with pencil icon highlighted." lightbox="media/realtime-analytics-tutorial/onelake-availability.png":::

1. Toggle the button to **Active** and select **Done**.

    :::image type="content" source="media/realtime-analytics-tutorial/enable-copy-one-lake.png" alt-text="Screenshot of enabling data copy to OneLake in Real-Time Analytics in Microsoft Fabric." :::

## Related content

For more information about tasks performed in this tutorial, see:

* [Create a database](create-database.md)
* [Turn on OneLake availability](one-logical-copy.md#turn-on-onelake-availability)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 2: Get data with Eventstream](tutorial-2-event-streams.md)
