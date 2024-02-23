---
title: Data warehouse tutorial - ingest data into a Warehouse in Microsoft Fabric
description: In this third tutorial step, learn how to ingest data into the warehouse you created in the last step.
author: bradleyschacht
ms.author: scbradl
ms.reviewer: wiassaf
ms.date: 01/22/2024
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
---

# Tutorial: Ingest data into a Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Now that you have created a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], you can ingest data into that warehouse.

## Ingest data

1. From the **Build a warehouse** landing page, select **Data Warehouse Tutorial** in the navigation menu to return to the workspace item list.

   :::image type="content" source="media\tutorial-ingest-data\select-tutorial-menu.png" alt-text="Screenshot of the navigation menu, showing where to select Data Warehouse Tutorial.":::

1. In the upper left corner, select **New** > **More options** to display a full list of available items.

1. In the **Data Factory** section, select **Data pipeline**.

   :::image type="content" source="media\tutorial-ingest-data\select-data-pipeline.png" alt-text="Screenshot of the data pipeline section, showing where to select Data pipeline." lightbox="media\tutorial-ingest-data\select-data-pipeline.png":::

1. On the **New pipeline** dialog, enter `Load Customer Data` as the name.

   :::image type="content" source="media\tutorial-ingest-data\new-pipeline-dialog.png" alt-text="Screenshot of the New pipeline dialog box, showing where to enter the name and select Create.":::

1. Select **Create**.

1. Select **Add pipeline activity** from the **Start building your data pipeline** landing page.

   :::image type="content" source="media\tutorial-ingest-data\start-building-pipeline.png" alt-text="Screenshot of the Start building your pipeline screen, showing where to select Add pipeline activity.":::

1. Select **Copy data** from the **Move &** **transform** section.

   :::image type="content" source="media\tutorial-ingest-data\select-copy-data.png" alt-text="Screenshot of the Move and transform section, showing where to select Copy data.":::

1. If necessary, select the newly created **Copy data** activity from the design canvas and follow the next steps to configure it.

1. On the **General** page, for **Name**, enter `CD Load dimension_customer`.

   :::image type="content" source="media\tutorial-ingest-data\general-tab-name.png" alt-text="Screenshot of the General tab, showing where to enter the copy activity name.":::

1. On the **Source** page, select **External** for the **Data store type**.

1. Next to the **Connection** box, select **New** to create a new connection.

   :::image type="content" source="media\tutorial-ingest-data\source-tab-details.png" alt-text="Screenshot of the Source tab, showing where to select External and New.":::

1. On the **New connection** page, select **Azure Blob Storage** from the list of connection options.

   :::image type="content" source="media\tutorial-ingest-data\azure-blob-storage.png" alt-text="Screenshot of the Azure Blob Storage option.":::

1. Select **Continue**.

1. On the **Connection settings** page, configure the settings as follows:

   1. In the **Account name or URL**, enter `https://azuresynapsestorage.blob.core.windows.net/sampledata/`.

   1. In the **Connection credentials** section, select **Create new connection** in the dropdown for the **Connection**.

   1. For **Connection name**, enter `Wide World Importers Public Sample`.

   1. Set the **Authentication kind** to **Anonymous**.

   :::image type="content" source="media\tutorial-ingest-data\new-connection-settings.png" alt-text="Screenshot of the Connections settings screen with the Account name and Connection credentials fields filled in as directed in the previous steps.":::

1. Select **Create**.

1. Change the remaining settings on the **Source** page of the copy activity as follows, to reach the .parquet files in `https://azuresynapsestorage.blob.core.windows.net/sampledata/WideWorldImportersDW/parquet/full/dimension_customer/*.parquet`:

   1. In the **File path** text boxes, provide:

       1. **Container:** `sampledata`

       1. **File path - Directory:** `WideWorldImportersDW/tables`

       1. **File path - File name:** `dimension_customer.parquet`

   1. In the **File format** drop-down, choose **Parquet**.

1. Select **Preview data** next to the **File path** setting to ensure there are no errors.

   :::image type="content" source="media\tutorial-ingest-data\source-tab-change-details.png" alt-text="Screenshot of the Source tab, showing where to change the file path and format details, and select Preview data." lightbox="media\tutorial-ingest-data\source-tab-change-details.png":::

1. On the **Destination** page, select **Workspace** for the **Data store type**.

1. Select **Data Warehouse** for the **Workspace data store type**.

1. In the **Data Warehouse** drop down, select **WideWorldImporters** from the list.

1. Next to the **Table option** configuration setting, select the **Auto create table** radio button.

1. The dropdown menu next to the **Table** configuration setting will automatically change to two text boxes.

1. In the first box next to the **Table** setting, enter `dbo`.

1. In the second box next to the **Table** setting, enter `dimension_customer`.

   :::image type="content" source="media\tutorial-ingest-data\destination-tab.png" alt-text="Screenshot of the Destination tab, showing where to enter and select the details specified in the previous steps." lightbox="media\tutorial-ingest-data\destination-tab.png":::

1. From the ribbon, select **Run**.

1. Select **Save and run** from the dialog box. The pipeline to load the `dimension_customer` table with start.

1. Monitor the copy activity's progress on the **Output** page and wait for it to complete.

   :::image type="content" source="media\tutorial-ingest-data\monitor-output-page.png" alt-text="Screenshot of the Output page, showing what a successful run looks like." lightbox="media\tutorial-ingest-data\monitor-output-page.png":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create tables in a data warehouse](tutorial-create-tables.md)
