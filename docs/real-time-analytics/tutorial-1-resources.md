---
title: "Synapse Real-Time Analytics tutorial part 1: Create resources"
description: Part 1 of the Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Real-Time Analytics tutorial part 1: Create resources

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Introduction to the Real-Time Analytics tutorial](tutorial-introduction.md)

## Create a KQL database

1. Browse to the workspace in which you want to create your database.
1. On the bottom left experience switcher, select **Real-Time Analytics**.
    
    :::image type="icon" source="media/realtime-analytics-tutorial/product-icon.png" border="false":::

1.  In the upper left corner, select **+ New \> KQL Database** 
1.  Enter *NycTaxiDB* as the database name.
1.  Select **Create**.
    
    
    ![](media/realtime-analytics-tutorial/image9.png)

    When provisioning is complete, the KQL database details page will be shown.

## Enable copy to OneLake

1.  In the **Database details** card, Select the **pencil** icon.

    :::image type="content" source="media/realtime-analytics-tutorial/onelake-folder-active.png" alt-text="Screenshot of database details page with pencil icon highlighted.":::

1. Toggle the button to **Active** and select **Done**.

    :::image type="content" source="media/realtime-analytics-tutorial/enable-copy-one-lake.png" alt-text="Screenshot of enabling data copy to OneLake.":::

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 2: Get data with Event streams](tutorial-2-event-streams.md)