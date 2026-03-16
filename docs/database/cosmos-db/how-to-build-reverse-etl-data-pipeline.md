---
title: Data pipelines with Reverse ETL for Cosmos DB in Microsoft Fabric
description: How to build a medallion data pipeline with Cosmos DB in Microsoft Fabric, then write gold-layer insights back to Cosmos DB.
ai-usage: ai-assisted
ms.reviewer: mjbrown
ms.topic: how-to
ms.date: 03/16/2026
---

# Data pipelines with Reverse ETL for Cosmos DB in Microsoft Fabric

You can use Cosmos DB in Microsoft Fabric to build a medallion architecture data pipeline with Reverse ETL that writes insights back to Cosmos DB for low-latency operational serving. This article provides step-by-step instructions to build this architecture while also demonstrating how the same database can be used to store pipeline metadata such as data quality checks, dataset profiles by using User data functions.

A Cosmos DB database in Microsoft Fabric maintains a mirrored copy of the operational data in OneLake. This mirrored copy of data can be accessed from a lakehouse shortcut, which provides the Bronze layer of the pipeline. The Silver and Gold layers are implemented in Fabric notebooks that read from the lakehouse shortcut, perform transformations with Spark, and write outputs to new lakehouse tables. The Gold to operational serving layer uses the Azure Cosmos DB Spark connector to write insights back to Cosmos DB.

The pipeline is orchestrated with a Fabric data pipeline that runs the notebooks in sequence and then calls a User data function to log a summary of the pipeline run back to Cosmos DB.

This architecture demonstrates two complementary patterns:

- **Reverse ETL**: Write Gold-layer insights back to Cosmos DB so operational applications can serve them with low-latency reads.
- **Pipeline metadata logging**: Record data quality checks, dataset profiles, and transform lineage in Cosmos DB by invoking User data functions during pipeline execution.

> [!TIP]
> For a complete sample of this architecture, find the sample assets and instructions in the [Azure Cosmos DB samples repository on GitHub](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/data-pipelines/README.md§).

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

> [!TIP]
> When naming your database, avoid using spaces or special characters, to ensure that the notebooks and code samples work without modification.

- A Fabric workspace that you can use to create a lakehouse, notebooks, a pipeline, and a User data functions item.

- A Cosmos DB container that contains sample data. For instructions, see [load the sample data container](quickstart-portal.md#load-sample-data).

- The sample assets for this scenario saved on your local machine so you can upload them into Fabric. Download the files from the [Data Pipelines sample folder](https://github.com/AzureCosmosDB/cosmos-fabric-samples/tree/main/data-pipelines):

    > [!TIP]
    > If your browser opens a file instead of downloading it, right-click the link and select **Save link as**.

    | File | Purpose |
    | --- | --- |
    | [`01_metastore_functions.py`](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/data-pipelines/01_metastore_functions.py?raw=1) | Defines User data functions that log data quality, profiles, lineage, and pipeline summaries to Cosmos DB. |
    | [`02_bronze_to_silver.ipynb`](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/data-pipelines/02_bronze_to_silver.ipynb?raw=1) | Splits Bronze data into typed Silver tables such as products, reviews, and price history. |
    | [`03_silver_to_gold.ipynb`](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/data-pipelines/03_silver_to_gold.ipynb?raw=1) | Builds Gold-layer dimensions, facts, and aggregated insights from the Silver tables. |
    | [`04_gold_to_cosmos.ipynb`](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/data-pipelines/04_gold_to_cosmos.ipynb?raw=1) | Writes product insights and category KPIs back to Cosmos DB by using the Spark connector. |

## Retrieve Cosmos DB endpoint

[!INCLUDE[Retrieve Cosmos DB endpoint](includes/retrieve-cosmos-db-endpoint.md)]

## Create the source and metadata containers

Prepare the containers used by the pipeline.

1. If the built-in sample data isn't loaded, load it into the database. For instructions, see [load the sample data container](quickstart-portal.md#load-sample-data).

1. Select **+ New container** on the left sidebar pane to create a new container.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/new-container-option.png" lightbox="media/how-to-build-reverse-etl-data-pipeline/new-container-option.png" alt-text="Screenshot of the 'New container' option in the left sidebar pane of the Cosmos DB database view in the Fabric portal.":::

1. Set the **Container id** to `pipeline-metadata` and the **Partition key** to `/datasetId`. Select **Ok** to create the container.

## Create a lakehouse shortcut for the Bronze layer

Use a lakehouse shortcut so the pipeline can read mirrored Cosmos DB data directly from OneLake.

1. In your Fabric workspace, select **+ New item**.

1. In the New Lakehouse dialog, enter `ProductCatalog_LH` as the name, and select **Create**.

1. Right slick on the **Tables** node in the lakehouse Explorer, and select **New schema**.

1. In the New schema dialog, enter `bronze` as the name, and select **Create**.

1. Right click on the new `bronze` schema, and select **New table shortcut**.

1. In the shortcut dialog, select **Microsoft OneLake** as the source.

1. In the next step of the dialog, select the Cosmos DB database as the data source type, and select **Next**.

1. In the New shortcut dialog, select the `SampleData` table from the left sidebar and select **Next**.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/new-shortcut-select-table.png" lightbox="media/how-to-build-reverse-etl-data-pipeline/new-shortcut-select-table.png" alt-text="Screenshot of the step in the new table shortcut dialog where you select the source table for the shortcut.":::

1. Select **Create** to create the lakehouse shortcut.

1. Confirm that the new shortcut appears under the `bronze` schema in the lakehouse Explorer, and that you can see the sample data by selecting the `SampleData` table shortcut.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/shortcut-in-explorer.png" lightbox="media/how-to-build-reverse-etl-data-pipeline/shortcut-in-explorer.png" alt-text="Screenshot of the lakehouse Explorer showing the new table shortcut under the bronze schema.":::

## Create and publish User data functions

Create a User data functions item to store pipeline metadata in Cosmos DB.

1. In your workspace, select **+ New item**.

1. Search for `user data functions`, and then select the tile.

    :::image type="content" source="/fabric/data-engineering/media/user-data-functions-create-in-portal/select-user-data-functions.png" alt-text="Screenshot showing the User data functions tile in the new item pane." lightbox="/fabric/data-engineering/media/user-data-functions-create-in-portal/select-user-data-functions.png":::

1. Name the item `PipelineMetadata`, and select **Create**.

1. On the editor page, select **New function** to create a starter template.

    :::image type="content" source="/fabric/data-engineering/media/user-data-functions-create-in-portal/new-functions-to-create-template.png" alt-text="Screenshot showing how to create a new function from a template." lightbox="/fabric/data-engineering/media/user-data-functions-create-in-portal/new-functions-to-create-template.png":::

1. Replace the template code with the contents of `01_metastore_functions.py` you downloaded earlier.

1. Verify the four functions in the Functions explorer pane on the left:

    - `log_data_quality`
    - `log_dataset_profile`
    - `log_transform_lineage`
    - `summarize_pipeline_run`

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/functions-explorer.png" lightbox="media/how-to-build-reverse-etl-data-pipeline/functions-explorer.png" alt-text="Screenshot of the Functions explorer pane in the User data functions editor showing the four functions defined in the code.":::

1. Update the placeholder values for the `COSMOS_DB_URI` and `DB_NAME` variables in the functions code with the Cosmos DB endpoint URI and database name from earlier steps.

[!INCLUDE[Add Azure Cosmos DB UDF](includes/add-azure-cosmos-udf.md)]

## Import the notebooks and attach the lakehouse

Next, import the sample notebooks and attach each one to the lakehouse before configuring the reverse ETL endpoint. Notebooks must be linked to a lakehouse before you can run them.

1. In your Fabric workspace, select **Import** > **Notebook** > **From this computer**.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/import-notebook.png" alt-text="Screenshot showing how to import a notebook from your computer." lightbox="media/how-to-build-reverse-etl-data-pipeline/import-notebook.png":::

1. Select **Upload**, on the pane that opens and select the notebooks you downloaded earlier:

    - `02_bronze_to_silver.ipynb`
    - `03_silver_to_gold.ipynb`
    - `04_gold_to_cosmos.ipynb`

> [!TIP]
> To upload multiple notebooks at once, hold down the Ctrl key (Cmd key on Mac) while selecting the files.

1. Open the `02_bronze_to_silver` notebook from the workspace items and on the left explorer pane.

1. Select **Add data items** > **From OneLake catalog**.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/add-data-items.png" alt-text="Screenshot showing how to add data items from the OneLake catalog to a notebook." lightbox="media/how-to-build-reverse-etl-data-pipeline/add-data-items.png":::

1. Select the `ProductCatalog_LH` lakehouse you created earlier, and select **Add** to attach the lakehouse to the notebook.

1. Repeat these steps for the other two notebooks, and attach the `ProductCatalog_LH` lakehouse to each one.

1. After attaching the lakehouse to all three notebooks, open `04_gold_to_cosmos.ipynb`and scroll down to the **Spark Session Configuration** section.

1. Update the `COSMOS_ENDPOINT` variable with the Cosmos DB endpoint URI from earlier steps.

1. Update the `COSMOS_DATABASE` variable with the name of your Cosmos DB database from earlier steps.

1. Review each of the three notebooks to understand the transformations being performed at each stage of the medallion architecture, and how the final notebook writes data back to Cosmos DB with the Spark connector. Each notebook includes a markdown cell with detailed explanations of the code and transformations being performed.

## Build the data pipeline

Create a Fabric data pipeline that runs the notebooks in sequence and then calls a User data function to summarize the pipeline run.

1. In your workspace, select **+ New item**.

1. Search for **Pipeline** and select the tile.

1. Name the pipeline `CosmosDB_ETL_Pipeline`, and select **Create**.

1. On the pipeline home page, select the **Activities** tab, and then select the **Notebook** activity three times to add three notebook activities to the pipeline canvas.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/notebook-activities.png" alt-text="Screenshot of the pipeline editor with three notebook activities added to the canvas.":::

1. Select the first notebook activity and select the **Settings** tab. Set the **Notebook** field to the `02_bronze_to_silver` notebook you imported earlier.

1. Expand the **Base parameters** section and select **+ New** to add a new parameter.

1. Set the parameter Name to `run_id`, Type `String`, and the Value to `@pipeline().RunId` to pass the pipeline run identifier to the notebook.

1. Add another parameter by selecting **+ New** again, and set the Name to `pipeline_name`, Type `String`, and Value to `@pipeline().Pipeline` to pass the pipeline name to the notebook.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/notebook-activity-settings.png" alt-text="Screenshot of the Settings tab for a notebook activity where the run_id base parameter is configured." lightbox="media/how-to-build-reverse-etl-data-pipeline/notebook-activity-settings.png":::

1. Repeat these steps for the other two notebook activities, setting the Notebook field to `03_silver_to_gold` and `04_gold_to_cosmos` respectively, and adding the same `run_id` and `pipeline_name` base parameters to each one.

1. Connect each activity by using the **On success** output so the notebooks run sequentially.

1. Select the **All activities** ellipsis menu in the **Activities** tab, and search and select **Functions** to add a Functions activity to the pipeline.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/add-functions-activity.png" alt-text="Screenshot showing how to add a Functions activity to the pipeline." lightbox="media/how-to-build-reverse-etl-data-pipeline/add-functions-activity.png":::

1. Drag the Functions activity to the right of the three notebook activities, and connect the last notebook activity (`04_gold_to_cosmos`) to the Functions activity with the **On success** output.

1. Select the Functions activity, open the **Settings** tab, and set the following properties:

    - **Type**: Fabric user data functions
    - **Connection**: Select or create a connection for User data functions.
    - **Workspace**: Select the current workspace
    - **User data functions**: Select the `PipelineMetadata` item from the dropdown
    - **Function**: Select the `summarize_pipeline_run` function from the dropdown

1. In the **Parameters** section, find the required `run_id` parameter and set its value to `@pipeline().RunId`.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/functions-activity-settings.png" alt-text="Screenshot of the Settings tab for the Functions activity with the summarize_pipeline_run function configured and the run_id parameter set." lightbox="media/how-to-build-reverse-etl-data-pipeline/functions-activity-settings.png":::

> [!TIP]
> You can select each of the pipeline activities and in the **General** tab set the **Name** property to a more descriptive name such as `bronze_to_silver`, `silver_to_gold`, `gold_to_cosmos`, and `summarize_run` for each activity respectively.

Your final pipeline should have the three notebook activities connected in sequence, followed by the Functions activity, all connected with the **On success** output.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/final-pipeline.png" alt-text="Screenshot of the final pipeline with three notebook activities connected in sequence followed by a Functions activity." lightbox="media/how-to-build-reverse-etl-data-pipeline/final-pipeline.png":::

## Run the pipeline and validate the results

Run the pipeline and verify that the reverse ETL outputs and metadata documents were written to Cosmos DB.

1. Select **Run** from the top menu bar and select **Run**.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/run-pipeline.png" alt-text="Screenshot showing how to run the pipeline." lightbox="media/how-to-build-reverse-etl-data-pipeline/run-pipeline.png":::

1. Select **Save and run** in the confirmation dialog that appears.

1. Select the **Output** tab to monitor the pipeline run.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/pipeline-output.png" alt-text="Screenshot of the Output tab where you can monitor the pipeline run." lightbox="media/how-to-build-reverse-etl-data-pipeline/pipeline-output.png":::

> [!TIP]
> The pipeline run could take several minutes to complete, and after 5 minutes the output tab may stop automatically refreshing. If the automatic refresh stops, you can manually refresh the output by selecting the refresh icon next to the **Pipeline run ID** in the Output tab.

1. Confirm all pipeline activities run successfully. If any fail, review the error message, fix the issue, and rerun the pipeline. The final output should show all four activities as **Succeeded**.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/succeeded-activities.png" alt-text="Screenshot of the pipeline output showing all activities with a status of Succeeded." lightbox="media/how-to-build-reverse-etl-data-pipeline/succeeded-activities.png":::

## Review the pipeline outputs in the Lakehouse and Cosmos DB

Finally, review the outputs of the pipeline in the Lakehouse and Cosmos DB to confirm the layers of the medallion architecture were created and that insights were written back to Cosmos DB.

1. In your workspace, open the `ProductCatalog_LH` lakehouse.

1. Right click on the **Tables** node in the Explorer pane, and select **Refresh**.

1. Confirm that there are new schemas named `silver` and `gold` and that they contain new tables created by the pipeline.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/lakehouse-tables.png" alt-text="Screenshot of the lakehouse Explorer showing the new silver and gold schemas and tables created by the pipeline." lightbox="media/how-to-build-reverse-etl-data-pipeline/lakehouse-tables.png":::

1. In your workspace, open the Cosmos DB database item.

1. Select the **Refresh** button in the top menu bar to refresh the container list.

    :::image type="content" source="media/how-to-build-reverse-etl-data-pipeline/refresh-containers.png" alt-text="Screenshot showing how to refresh the container list in the Cosmos DB database view." lightbox="media/how-to-build-reverse-etl-data-pipeline/refresh-containers.png":::

1. Verify that the following new containers are present and were created by the pipeline: `category-dashboard` and `product-insights`.

1. Select **Items** in the **category-dashboard** container to view the documents created by Reverse ETL from the Gold layer.

1. Repeat this step for the `product-insights` container to view those documents as well.

> [!TIP]
> The data written back to Cosmos DB by the pipeline can now be used to serve low-latency insights to operational applications or agents.

1. Select the `pipeline-metadata` container and then select **Items** to view the metadata documents created by the User data function during pipeline execution.

> [!TIP]
> The metadata logged to Cosmos DB can be used for monitoring beyond what the built-in pipeline monitoring in Fabric provides.

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Access mirrored Cosmos DB data from Lakehouse in Microsoft Fabric](how-to-access-data-lakehouse.md)
- [User data functions with Cosmos DB Database in Fabric](how-to-user-data-functions.md)
- [Work with Cosmos DB in Microsoft Fabric using the Cosmos DB Spark Connector](how-to-use-spark-notebooks.md)
- [Use the Functions activity to run Fabric user data functions or Azure Functions](../../data-factory/functions-activity.md)
