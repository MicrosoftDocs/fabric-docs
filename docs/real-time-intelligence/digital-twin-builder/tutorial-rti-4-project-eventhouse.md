---
title: 'Digital twin builder (preview) in Real-Time Intelligence tutorial part 4: Project data to Eventhouse'
description: Generate an Eventhouse projection from digital twin builder (preview) ontology using Fabric notebooks.
author: baanders
ms.author: baanders
ms.date: 12/12/2025
ms.topic: tutorial
---

# Digital twin builder (preview) in Real-Time Intelligence tutorial part 4: Project data to Eventhouse

In this step of the tutorial, project your digital twin builder (preview) ontology into Eventhouse using [Fabric notebooks](../../data-engineering/how-to-use-notebook.md). This step makes it possible to run KQL queries on your digital twin builder data for further analysis in Real-Time Intelligence.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

First, create shortcuts to bring your digital twin builder data from the lakehouse where it's stored into your *Tutorial* KQL database in Eventhouse. Then, you run a notebook code sample that generates a script to project organized views of your digital twin builder data in Eventhouse. The script creates user-defined functions in Eventhouse, one for each combination of entity type and property type in your digital twin builder ontology. Later, you can use these functions in KQL queries to access your organized digital twin builder ontology data from Eventhouse.

## Prepare KQL database in Eventhouse

Start by preparing your eventhouse and KQL database to access digital twin builder (preview) data. 

Data from digital twin builder mappings is stored in a new lakehouse, with a name that looks like your digital twin builder item name followed by *dtdm*. For this tutorial, it's called *TutorialDTBdtdm*. The lakehouse is located in the root folder of your workspace. 

In this section, you add tables from your digital twin builder data lakehouse as external tables in the KQL database. Later, you run sample notebook code to set up an Eventhouse projection that runs on and organizes this data.

1. Go to the *Tutorial* KQL database that you created earlier in [Tutorial part 2: Get and process streaming data](tutorial-rti-2-get-streaming-data.md).
1. From the menu ribbon, select **New** > **OneLake shortcut**.

    :::image type="content" source="media/tutorial-rti/kql-onelake-shortcut.png" alt-text="Screenshot of creating the shortcut.":::

1. Under **Internal sources**, select **Microsoft OneLake**. Then, choose *TutorialDTBdtdm*.
1. Expand the list of **Tables** and begin selecting all tables. There's a limit to the number of tables that you can add to a shortcut at once, so stop after you select 10 tables and see the warning message. Make a note of where you stopped.

    :::image type="content" source="media/tutorial-rti/kql-onelake-shortcut-2.png" alt-text="Screenshot of selecting the tables.":::

1. Select **Next** and **Create** to create the shortcuts.
1. Repeat the shortcut creation steps twice more, so that all tables are added as shortcuts.
1. When you're finished, you see all the external digital twin builder data tables under **Shortcuts** in the KQL database.

    :::image type="content" source="media/tutorial-rti/kql-shortcuts.png" alt-text="Screenshot of the shortcuts available in the KQL database.":::

## Prepare notebook and install dependencies

Next, prepare a notebook to run the sample Eventhouse projection code on the digital twin builder data in the KQL database. In this step, you import the sample notebook and link it to your digital twin builder data, then upload and install the required Python package.

### Import the notebook

First, import the sample Fabric notebook. It contains code to generate the Eventhouse projection.

1. Download *DTB_Generate_Eventhouse_Projection.ipynb* from the sample folder in GitHub: [digital-twin-builder](https://aka.ms/dtb-samples).
1. Go to your workspace. From the menu ribbon, select **Import** > **Notebook** > **From this computer**.

    :::image type="content" source="media/tutorial-rti/import-notebook.png" alt-text="Screenshot of importing the notebook.":::

    Upload the notebook file.
1. The notebook is imported into your workspace. Select it from the workspace items to open it.
1. From the **Explorer** pane of the notebook, select **Add data items** > **Existing data sources**.

    :::image type="content" source="media/tutorial-rti/notebook-add-data-items.png" alt-text="Screenshot of adding data items to the notebook.":::

1. Select the *TutorialDTBdtdm* lakehouse and select **Connect**.

1. In the **Explorer** pane, select **...** next to the lakehouse name, and select **Set as default lakehouse**.
    :::image type="content" source="media/tutorial-rti/notebook-default-lakehouse.png" alt-text="Screenshot of making the lakehouse the default lakehouse.":::

    Optionally, remove the other lakehouse that was added by default to simplify the view.

### Upload and install the Python package 

Next, install the Python package that the notebook needs to work with digital twin builder data. In this section, you upload the package to your lakehouse and install it in the notebook.

1. Download *dtb_samples-0.1-py3-none-any.whl* from the sample folder in GitHub: [digital-twin-builder](https://aka.ms/dtb-samples).
1. In the **Explorer** pane of your open notebook, expand *TutorialDTBdtdm*. Select **...** next to **Files**, and select **Upload** > **Upload files**.

    :::image type="content" source="media/tutorial-rti/notebook-upload-files.png" alt-text="Screenshot of uploading a file to the lakehouse through the notebook view.":::

1. Upload the *.whl* file.
1. Close the **Upload files** pane and observe the new file in the **Files** pane for the lakehouse.

    :::image type="content" source="media/tutorial-rti/notebook-files.png" alt-text="Screenshot of the uploaded file in the lakehouse.":::

1. In the notebook, install the package by running the first code block.

    :::image type="content" source="media/tutorial-rti/notebook-run-1.png" alt-text="Screenshot of running the first code block.":::

1. When the package is installed, the notebook confirms the successful run status with a checkmark underneath the code. This might take about one minute.

## Run Eventhouse projection code

Next, run the rest of the notebook code to generate the Eventhouse projection script. This script creates user-defined functions in Eventhouse that correspond to your digital twin builder entity types and their properties.

1. In the second code block, there are variables for `dtb_item_name` and `kql_db_name`. Fill their values with *TutorialDTB* and *Tutorial* (case-sensitive). Run the code block. The notebook confirms the successful run status with a checkmark underneath the code.

    :::image type="content" source="media/tutorial-rti/notebook-run-2.png" alt-text="Screenshot of running the second code block.":::

1. Scroll down to the next code block and run it. This third code block completes the following operations:
    1. Connects to your **workspace** and your **digital twin builder ontology**
    1. Sets up a **Spark reader** to pull data from the digital twin builder database
    1. **Generates a script** that pushes your digital twin builder data into Eventhouse
    1. Automatically creates several **functions** based on your digital twin builder's configuration, to make this data readily accessible in Eventhouse for use in KQL queries
1. The notebook confirms the successful run status with a checkmark underneath the code, and a list of functions that were added (one for each combination of entity type and property type).

    :::image type="content" source="media/tutorial-rti/notebook-run-3.png" alt-text="Screenshot of running the third code block.":::

    >[!TIP]
    > If you see a *ModuleNotFoundError*, rerun the first code block with the package installation. Then, rerun this code block.

1. Run the last code block. This code runs a Python snippet that sends your script to the Fabric REST API and executes it against your KQL database. The notebook confirms the successful run status with a checkmark underneath the code, and confirmation that it successfully created the Eventhouse domain projection functions.

    :::image type="content" source="media/tutorial-rti/notebook-run-4.png" alt-text="Screenshot of running the fourth code block.":::

Now the projection functions are created in Eventhouse, one for each property type on each digital twin builder entity type. 

## Verify projection functions

Verify that the functions were created successfully in your KQL database.

1. Go to your *Tutorial* KQL database and **refresh** the view.
1. Expand **Functions** in the Explorer pane to see a list of functions created by the notebook (the *extractBusData* function is also there from when you created it in [Tutorial part 2: Get and process streaming data](tutorial-rti-2-get-streaming-data.md)).

    :::image type="content" source="media/tutorial-rti/kql-functions.png" alt-text="Screenshot of the functions in the KQL database.":::

1. Select **Tutorial_queryset** from the Explorer pane to open the query window. Use the **+** above the query pane to create a new query, and enter `.show functions`. This displays a list of functions in the queryset, which you can expand to see their details.

    :::image type="content" source="media/tutorial-rti/kql-show-functions.png" alt-text="Screenshot of the functions in the KQL queryset results." lightbox="media/tutorial-rti/kql-show-functions.png":::

1. Run the functions to see the data projections they produce. Recognize that the properties correspond to the fields that you mapped to the digital twin builder ontology in [Tutorial part 3: Build the ontology](tutorial-rti-3-build-ontology.md).

    :::image type="content" source="media/tutorial-rti/kql-bus-property.png" alt-text="Screenshot of the Bus_property function results." lightbox="media/tutorial-rti/kql-bus-property.png":::

1. Optionally, save the query tab as *Explore functions* so you can identify it later.

Now you can write other KQL queries using these user-defined functions to access data from your digital twin builder (preview) ontology. In the next tutorial step, use these functions to write KQL queries that extract insights from your data, and display the results in a Real-Time Dashboard.

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 5: Query and visualize data](tutorial-rti-5-query-and-visualize.md)