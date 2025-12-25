---
title: "Data Warehouse Tutorial: Ingest Data into a Warehouse"
description: "In this tutorial, learn how to ingest data from Microsoft Azure Storage into a Warehouse to create tables."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 12/18/2025
ms.topic: tutorial
ms.custom: sfi-image-nochange
---

# Tutorial: Ingest data into a Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this tutorial, learn how to ingest sample data into a Warehouse using a **Copy job**.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)

## Ingest data

In this task, learn how to ingest data into the warehouse to create tables.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. In the workspace landing pane, select **+ New Item** to display the full list of available item types.

1. From the list, in the **Get data** section, select the **Copy job** item type.

1. In the **New copy job** window, in the **Name** box, enter `Load Customer Data`.

1. Select **Create**. Provisioning is complete when the **Copy job** page opens.

1. On the first page of the **Copy job** window, you can pick from various data sources, or select from one of the provided samples to get started. For this tutorial, select **Sample data** from the menu bar on this page. For this tutorial, we use the **NYC Taxi - Green** sample. Select this option to navigate to the next page

   :::image type="content" source="media/tutorial-ingest-data/sample-data-page.png" alt-text="Screenshot of the Sample data tab and the NYC Taxi - Green sample data selected.":::

   The data preview of the sample data loads. 

1. In the **Choose data** page, you can preview the selected dataset. After you review the data, select **Next**.

1. The **Choose data destination** page allows you to configure the type of item. In the **OneLake catalog**, select your `Wide World Importers` warehouse created in the previous tutorial step, and select **Next**.

1. The **Choose copy job mode** page allows you to configure how you want the data to be copied: a full copy, or incremental copies that perform only subsequent copies when the source data changes. For this example, pick **Full copy** and select **Next**. 

1. The last step to configure the destination is to provide a name to the destination table and configure the column mappings. You can load the data to a new table or to an existing one, provide a schema and table names, change column names, remove columns, or change their mappings. 

   For this example, change the schema to `dbo` and the table to `NYC_taxi`.

   :::image type="content" source="media/tutorial-ingest-data/copy-job-map-to-destination.png" alt-text="Screenshot of the Map to destination page of the Copy job window. The destination is dbo.NYC_taxi." lightbox="media/tutorial-ingest-data/copy-job-map-to-destination.png":::

   Select **Next**.

1. On the **Review + save** page, review the **Source** and **Destination**. 

   Keep the **Start data transfer immediately** checkbox checked, this will start the copy job as soon as it's ready to run.

   Select **Save + Run**.

1. The Copy job will be created and the Fabric portal will open the new **Load Customer Data** object design canvas when ready.

   :::image type="content" source="media/tutorial-ingest-data/copy-job-running.png" alt-text="Screenshot from the Fabric portal showing the new Load Customer Data Copy job design canvas, and the Running notification.":::

1. Use the **Results** tab to monitor the execution of the Copy job. 

1. When complete, the **Copy job** will deliver a **Succeeded** notification and status. You'll now see your new `NYC_taxi` table in your warehouse.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create tables with T-SQL in a warehouse](tutorial-create-tables.md)
