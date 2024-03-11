---
title: Preprocess data with a stored procedure before loading into Lakehouse
description: This tutorial shows you how to preprocess data with a stored procedure and then load the data into a Lakehouse with a pipeline with Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Pipeline Tutorials
---

# Preprocess data with a stored procedure before loading into Lakehouse

In this tutorial, we show you how to use a pipeline Script activity to run a stored procedure to create a table and preprocess the data in a Synapse Data Warehouse. After that, we load the preprocessed table into Lakehouse.

## Prerequisites

- A Microsoft Fabric enabled workspace. If you don't already have one, refer to the article [Create a workspace](../get-started/create-workspaces.md).
- Prepare a stored procedure in your Azure Synapse Data Warehouse. Create the following stored procedure in advance:
  
  ```sql
  CREATE PROCEDURE spM_add_names
  AS
  --Create initial table
  IF EXISTS (SELECT * FROM sys.objects
  WHERE object_id = OBJECT_ID(N'[dbo].[names]') AND TYPE IN (N'U'))
  BEGIN
  DROP TABLE names
  END;

  CREATE TABLE names
  (id INT,fullname VARCHAR(50));

  --Populate data
  INSERT INTO names VALUES (1,'John Smith');
  INSERT INTO names VALUES (2,'James Dean');

  --Alter table for new columns
  ALTER TABLE names
  ADD first_name VARCHAR(50) NULL;

  ALTER TABLE names
  ADD last_name VARCHAR(50) NULL;

  --Update table
  UPDATE names
  SET first_name = SUBSTRING(fullname, 1, CHARINDEX(' ', fullname)-1);

  UPDATE names
  SET last_name = SUBSTRING(fullname, CHARINDEX(' ', fullname)+1, LEN(fullname)-CHARINDEX(' ', fullname));

  --View Result
  SELECT * FROM names;
  ```

  :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/sql-results.png" alt-text="Screenshot showing the results of running the stored procedure to generate a sample table.":::

## Create a pipeline Script activity to run the stored procedure

In this section, we use a Script activity to run the stored procedure created in the prerequisites.

1. Choose Script activity and then select **New** to connect to your Azure Synapse Data Warehouse.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/create-new-script-activity.png" alt-text="Screenshot showing the pipeline interface to create a new script activity and connect to your Azure Synapse Data Warehouse.":::

1. Select Azure Synapse Analytics and then **Continue**.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/select-azure-synapse-analytics.png"  lightbox="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/select-azure-synapse-analytics.png" alt-text="Screenshot showing the New connection dialog with Azure Synapse Analytics selected.":::

1. Provide your **Server**, **Database**, and **Username** and **Password** fields for **Basic authentication**, and enter SynapseConnection for the **Connection name**. Then select **Create** to create the new connection.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/create-new-connection.png" lightbox="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/create-new-connection.png" alt-text="Screenshot showing the create new connection dialog.":::

1. Input **EXEC spM_add_names** to run the stored procedure. It creates a new table dbo.name and preprocess the data with a simple transformation to change the **fullname** field into two fields, **first_name** and **last_name**.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/execute-stored-procedure.png" alt-text="Screenshot showing the settings tab of the Script activity configured to execute the spM_add_names stored procedure.":::

## Use a pipeline activity to load preprocessed table data into Lakehouse

1. Select **Copy data** and then select **Use copy assistant**.

   :::image type="content" source="media/copy-data-activity/use-copy-assistant.png" alt-text="Screenshot showing the Use copy assistant button under Copy data.":::

1. Select **Azure Synapse Analytics** for the data source, and then select **Next**.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/select-copy-assistant-data-source.png" lightbox="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/select-copy-assistant-data-source.png" alt-text="Screenshot showing the Copy assistant data source selection page with Azure Synapse Analytics selected.":::

1. Choose the existing connection **SynapseConnection** that you created previously.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/choose-existing-connection-in-copy-assistant.png" lightbox="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/choose-existing-connection-in-copy-assistant.png" alt-text="Screenshot showing the selection of the previously created SynapseConnection in the Choose data source page of the Copy assistant.":::

1. Choose the table **dbo.names** that was created and preprocessed by the stored procedure. Then select **Next**.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/select-table.png" lightbox="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/select-table.png" alt-text="Screenshot showing the selection of the dbo.names table created and preprocessed by the stored procedure in the previous steps.":::

1. Select **Lakehouse** under the **Workspace** tab as the destination, and then select **Next** again.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/select-lakehouse-destination.png" alt-text="Screenshot showing the selection of Lakehouse for the copy destination in the Copy assistant.":::

1. Choose an existing or create a new Lakehouse, then select **Next**.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/choose-lakehouse-destination.png" alt-text="Screenshot showing the selection of a Lakehouse destination in the Copy assistant.":::

1. Input a destination table name for the data to be copied into for the Lakehouse destination and select **Next**.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/input-destination-table-name.png" alt-text="Screenshot showing the destination table name to be used in the Lakehouse destination.":::

1. Review the summary on the final page of the Copy assistant and then select **OK**.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/review-summary.png" alt-text="Screenshot showing the summary page of the Copy assistant with details of the configured connections.":::

1. After you select **OK**, the new Copy activity will be added onto the pipeline canvas.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/pipeline-canvas-with-copy-activity-added.png" alt-text="Screenshot showing the pipeline canvas with the Copy activity added.":::

## Execute the two pipeline activities to load the data

1. Connect the Script and Copy data activities by **On success** from the Script activity.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/connect-pipeline-activities.png" alt-text="Screenshot showing the connection of the two activities on success of the Script activity.":::

1. Select **Run** and then **Save and run** to run the two activities in the pipeline.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/run-pipeline.png" alt-text="Screenshot showing the pipeline Run button.":::

   :::image type="content" source="media/create-first-pipeline-with-sample-data/save-and-run.png" alt-text="Screenshot showing the Save and run button for the pipeline.":::

1. After the pipeline successfully runs, you can view the details for more information.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/view-pipeline-run-details-button.png" alt-text="Screenshot showing the view pipeline run details button.":::

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/run-details.png" alt-text="Screenshot showing the run details for the pipeline.":::

1. Switch to the workspace and select the Lakehouse to check the results.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/workspace-with-lakehouse.png" alt-text="Screenshot showing the workspace with the Lakehouse destination highlighted.":::

1. Select the table SynapseNamesTable to view the dat loaded into Lakehouse.

   :::image type="content" source="media/tutorial-pre-process-data-with-stored-procedure-load-into-lakehouse/view-lakehouse-table.png" alt-text="Screenshot showing the results in the SynapseNamesTable in Lakehouse.":::

## Related content

This sample shows you how to preprocess data with a stored procedure before loading the results into Lakehouse.  You learned how to:

> [!div class="checklist"]
> - Create a data pipeline with a Script activity to run a stored procedure.
> - Use a pipeline activity to load the preprocessed table data into Lakehouse.
> - Execute the pipeline activities to load the data.

Next, advance to learn more about monitoring your pipeline runs.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
