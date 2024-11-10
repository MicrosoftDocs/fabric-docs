---
title: "Data warehouse tutorial: Ingest data into a Warehouse in Microsoft Fabric"
description: "In this tutorial, you will ingest data from Azure Blob storage into the warehouse to create tables."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 11/10/2024
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
---

# Tutorial: Ingest data into a Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this tutorial, you will ingest data from Azure Blob storage into the warehouse to create tables.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a Microsoft Fabric workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse in Microsoft Fabric](tutorial-create-warehouse.md)

## Ingest data

In this task, you will ingest data into the warehouse to create tables.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. In the workspace landing pane, select **+ New Item** to display the full list of available item types.

1. From the list, in the **Get data** section, select the **Data pipeline** item type.

   :::image type="content" source="media/tutorial-ingest-data/select-data-pipeline-item-type.png" alt-text="Screenshot of the New item panel, highlighting the Data pipeline item type." border="false":::

1. In the **New pipeline** window, in the **Name** box, enter `Load Customer Data`.

   :::image type="content" source="media/tutorial-ingest-data/create-new-pipeline.png" alt-text="Screenshot of the New pipeline dialog, highlighting the entered name." border="false":::

1. To provision the pipeline, select **Create**.

    _Provisioning is complete when the **Build a data pipeline** landing page appears._

1. On the data pipeline landing page, select **Pipeline activity**.

   :::image type="content" source="media/tutorial-ingest-data/select-pipeline-activity.png" alt-text="Screenshot of the Build a data pipeline landing page, highlighting the Pipeline activity option." lightbox="media/tutorial-ingest-data/select-pipeline-activity.png" border="false":::

1. In the menu, from inside the **Move and transform** section, select **Copy data**.

   :::image type="content" source="media/tutorial-ingest-data/select-copy-data.png" alt-text="Screenshot of the Move and transform section, showing where to select Copy data." border="false":::

1. On the pipeline design canvas, select the **Copy data** activity.

   :::image type="content" source="media/tutorial-ingest-data/copy-data-activity.png" alt-text="Screenshot of the Copy data located on the design canvas." border="false":::

1. To set up the activity, on the **General** page, in the **Name** box, replace the default text with `CD Load dimension_customer`.

   :::image type="content" source="media/tutorial-ingest-data/general-tab-name.png" alt-text="Screenshot of the General tab, showing where to enter the copy activity name." border="false":::

1. On the **Source** page, in the **Connection** dropdown, select **More** in order to reveal all of the data sources you can choose from, including data sources in OneLake data hub.

1. Select **New** to create a new data source.

   :::image type="content" source="media/tutorial-ingest-data/create-new-data-source.png" alt-text="Screenshot of the Get data window, highlighting the New option." border="false":::

1. Search for, and then select, **Azure Blobs**.

1. On the **Connect data source** page, complete the following settings:

   1. In the **Account name or URL** box, enter `https://fabrictutorialdata.blob.core.windows.net/sampledata/`.

   1. Notice that the **Connection name** box is automatically populated, but for clarity, replace the text with `Wide World Importers Public Sample`.

   1. In the **Authentication kind** dropdown, select **Anonymous**.

   :::image type="content" source="media/tutorial-ingest-data/new-connection-settings.png" alt-text="Screenshot of the Connect to data source window showing all settings done." border="false":::

1. Select **Connect**.

1. On the **Source** page, to access the Parquet files in the data source, complete the following settings:

   1. In the **File path** boxes, enter:

       1. **File path - Container:** `sampledata`

       1. **File path - Directory:** `WideWorldImportersDW/tables`

       1. **File path - File name:** `dimension_customer.parquet`

   1. In the **File format** dropdown, select **Parquet**.

1. To preview the data and test that there are no errors, select **Preview data** (next to the **File path** boxes).

   :::image type="content" source="media/tutorial-ingest-data/source-page-settings.png" alt-text="Screenshot of the Source page, highlighting the changes made in the previous steps, and the Preview data function." lightbox="media/tutorial-ingest-data/source-page-settings.png" border="false":::

1. On the **Destination** page, in the **Connection** dropdown, select the `Wide World Importers` warehouse.

1. For **Table option**, select the **Auto create table** option.

1. In the first **Table** box, enter `dbo`.

1. In the second box, enter `dimension_customer`.

   :::image type="content" source="media/tutorial-ingest-data/destination-page-settings.png" alt-text="Screenshot of the Destination page, highlighting where the changes made in the previous steps." lightbox="media/tutorial-ingest-data/destination-page-settings.png" border="false":::

1. On the ribbon, select **Run**.

1. In the **Save and run?** dialog, select **Save and run** to have the pipeline load the `dimension_customer` table.

   :::image type="content" source="media/tutorial-ingest-data/save-run-dialog.png" alt-text="Screenshot of the Save and run dialog, highlighting the Save and run button." border="false":::

1. To monitor the progress of the copy activity, review the pipeline run activities in the **Output** page (wait for it to complete with a **Succeeded** status).

   :::image type="content" source="media/tutorial-ingest-data/monitor-output-page.png" alt-text="Screenshot of the Output page, highlighting the Succeeded status." lightbox="media/tutorial-ingest-data/monitor-output-page.png" border="false":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create tables with T-SQL in a Warehouse in Microsoft Fabric](tutorial-create-tables.md)
