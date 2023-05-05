---
title: Data warehouse tutorial - ingest data
description: In this third tutorial step, learn how to ingest data into the warehouse you created in the last step.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.date: 5/9/2023
---

# Tutorial: Ingest data into a data warehouse

Now that you have created a data warehouse, you can ingest data into that warehouse.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Ingest data

1. From the **Build a warehouse** landing page appears, select **Data Warehouse Tutorial** in the left-hand navigation menu to return to the workspace artifact view.

   IMAGE

1. In the upper left corner, select **New** > **Show all** to display a full list of available items.

   IMAGE

1. In the **Data Factory** section, select **Data pipeline**.

   IMAGE

1. On the **New** **pipeline** dialog, enter **Load Customer Data** as the name.

   IMAGE

1. Select **Create**.

1. Select **Add pipeline activity** from the **Start building your data pipeline** landing page.

   IMAGE

1. Select **Copy data** from the **Move &** **transform** section.

   IMAGE

1. If necessary, select the newly created Copy data activity from the design canvas and follow the next steps to configure it.

1. On the **General** page, enter **CD Load dimension_customer** as the **Name**.

   IMAGE

1. On the **Source** page, select **External** for the **Data store type**.

1. Next to the **Connection** box, select **New** to create a new connection.

   IMAGE

1. On the **New connection** page, select **Azure Blob Storage** from the list of connection options.

   IMAGE

1. Select **Continue**.

1. On the **Connection settings** page, configure the settings as follows:

   1. Enter [**https://azuresynapsestorage.blob.core.windows.net/sampledata**](https://azuresynapsestorage.blob.core.windows.net/sampledata/WideWorldImportersDW/parquet/full/dimension_city/*.parquet) in the **Account name or URL**.

   1. In the **Connection credentials** section, select **Create** **new connection** in the dropdown for the **Connection**.

   1. Enter **Wide World Importers Public Sample** for the **Connection name**.

   1. Set the **Authentication kind** to **Anonymous**.

   IMAGE

1. Select **Create**.

1. Change the remaining settings on the **Source** page of the copy activity as follows:

   1. **File path - Container:** sampledata

   1. **File path - Directory:** WideWorldImportersDW/tables

   1. **File path - File name:** `dimension_customer.parquet`

   1. **File format:** Parquet

1. Select **Preview data** next to the **File path** setting to ensure there are no errors.

   IMAGE

1. On the **Destination** page, select **Workspace** for the **Data store type**.

1. Select **Data Warehouse** for the **Workspace data store type**.

1. In the **Data Warehouse** drop down, select **WideWorldImporters** from the list.

1. Next to the **Table** configuration setting, check the box under the dropdown list labeled **Edit**. The dropdown changes to two text boxes.

1. In the first box next to the **Table** setting, enter **dbo**.

1. In the second box next to the **Table** setting, enter `dimension_customer`.

   IMAGE

1. Expand the **Advanced** section.

1. For the **Table option**, select **Auto create table**.

   IMAGE

1. From the ribbon, select **Run**.

1. Select **Save and run** from the dialog box. The pipeline to load the `dimension_customer` table with start.

1. Monitor the copy activity’s progress on the **Output** page and wait for it to complete.

   IMAGE

## Next steps

- [Tutorial: Build a report](tutorial-data-warehouse-build-report.md)
