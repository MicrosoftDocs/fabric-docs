---
title: Connect digital twin builder (preview) data to Real-Time Dashboard
description: Learn how to prepare your digital twin builder (preview) data to be accessible from a Real-Time Dashboard.
author: baanders
ms.author: baanders
ms.date: 05/02/2025
ms.topic: how-to
---

# Connect digital twin builder (preview) data to Real-Time Dashboards

This article guides you through the steps to visualize your digital twin builder data (preview) using a [Real-Time Dashboard](../dashboard-real-time-create.md).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

The process includes the following steps:
1. Create an eventhouse and child **KQL database** to be the data source for your KQL queries and dashboard. Use **OneLake shortcuts** to make your digital twin builder data available in the KQL database.
1. Create Eventhouse **functions** to project organized views of your digital twin builder entity types and properties. These functions make it easier to write KQL queries using digital twin builder data.
1. **Query** your data to get the insights that you need.
1. Pin queries to a **dashboard** and continue adding visuals as needed.

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* A [digital twin builder (preview) item](tutorial-1-set-up-resources.md#create-new-digital-twin-builder-item-in-fabric) with data [mapped](model-manage-mappings.md) to it from a lakehouse.

## Shortcut digital twin builder (preview) data into a KQL database 

When you map data in your digital twin builder (preview) item, the mapping data is stored in a new lakehouse, with a name that looks like your digital twin builder item name followed by *dtdm*. The lakehouse is located in the root folder of your workspace.

:::image type="content" source="media/concept-modeling/fabric-lakehouse-item.png" alt-text="Screenshot of the digital twin builder data lakehouse in Fabric workspace.":::

In order for the data to be accessible to KQL queries and a Real-Time Dashboard, it needs to be in a KQL database in Eventhouse.

So, in this section, you create a new Eventhouse and child KQL database. Then, you add the digital twin builder data tables to the database using [OneLake shortcuts](../onelake-shortcuts.md?tab=onelake-shortcut&tabs=onelake-shortcut). This process makes the digital twin builder data available to query in Eventhouse.

1. Create a new eventhouse in your workspace (for detailed instructions, see [Create an eventhouse](../create-eventhouse.md#create-an-eventhouse)). The eventhouse is automatically created with a child KQL database with the same name.
1. Add shortcuts for all tables in your digital twin builder data lakehouse by following the steps in [Create OneLake shortcuts in a KQL database](../onelake-shortcuts.md?tabs=onelake-shortcut#create-shortcut). 
    * When selecting the data source, look for the lakehouse with a name that matches your digital twin builder item name followed by *dtdm*.
    * When selecting which tables to map, select them all. You can only add 10 tables at a time, so repeat the shortcut creation process until you have shortcuts for all the tables.

        :::image type="content" source="media/explore-connect-dashboard/select-shortcut-tables.png" alt-text="Screenshot of selecting tables from the digital twin builder data lakehouse." lightbox="media/explore-connect-dashboard/select-shortcut-tables.png":::

    >[!TIP]
    >Query performance can be improved by making sure the **Accelerate** option is toggled to *On* while creating the shortcuts. For more information, see [Accelerate queries over OneLake shortcuts](../query-acceleration.md).
1. When you're done, you see all the external digital twin builder data tables under **Shortcuts** in your KQL database.

    :::image type="content" source="media/explore-connect-dashboard/view-shortcuts.png" alt-text="Screenshot of the shortcuts visible from a KQL database." lightbox="media/explore-connect-dashboard/view-shortcuts.png":::

## Create Eventhouse functions

Now that your digital twin builder (preview) data is available in your KQL database, you can create functions to make it easier to query the data. Digital twin builder stores its data across many tables, so these functions organize the data and make it easier to access it when you're writing KQL queries.

We provide a [Fabric notebook](../../data-engineering/how-to-use-notebook.md) with a sample script that creates the functions for you. The script creates one function for each entity type and property type combination in your digital twin builder ontology (like *Bus_property()* and *Bus_timeseries()*).

### Set up sample notebook

Follow these steps to prepare a new notebook with the sample script.

1. Download these sample artifacts from the sample folder in GitHub: [digital-twin-builder](https://aka.ms/dtb-samples):
    * The sample notebook, *DTB_Generate_Eventhouse_Projection.ipynb*
    * The required Python package, *dtb_samples-0.1-py3-none-any.whl*
1. Import the notebook into your Fabric workspace. For detailed instructions, see [Create and use notebooks - Import existing notebooks](../../data-engineering/how-to-use-notebook.md#import-existing-notebooks).
1. Add your digital twin builder data lakehouse as the default data source for the notebook. For detailed instructions, see [Create and use notebooks - Connect lakehouses and notebooks](../../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

    :::image type="content" source="media/explore-connect-dashboard/notebook-data-source.png" alt-text="Screenshot of the lakehouse data source in the notebook.":::

1. Upload *dtb_samples-0.1-py3-none-any.whl* to the files of your lakehouse data source, by selecting **...** next to the lakehouse name and choosing **Upload** > **Upload files**.

    :::image type="content" source="media/explore-connect-dashboard/upload-files.png" alt-text="Screenshot of uploading a file to the lakehouse.":::

    The uploaded file becomes visible in your lakehouse **Files**.

    :::image type="content" source="media/explore-connect-dashboard/upload-files-2.png" alt-text="Screenshot of the file in the lakehouse.":::

1. In the notebook, the second code block contains placeholders for the names of your digital twin builder item and your KQL database. Fill in these placeholder values.

    :::image type="content" source="media/explore-connect-dashboard/notebook-placeholders.png" alt-text="Screenshot of the filled-in placeholders.":::

Now the notebook is set up and ready to run.

### Execute the notebook

Execute the notebook code blocks in order. 

The notebook completes the following operations:
1. Installs the Python package
1. Creates variables for your resource names
1. Creates a script that generates the projection functions, using these substeps:
    1. Connects to your workspace and your digital twin builder ontology
    1. Sets up a Spark reader to pull data from the digital twin builder database
    1. Generates a script that pushes your digital twin builder data into Eventhouse
    1. Automatically creates several functions based on your digital twin builder's configuration, to make this data readily accessible in Eventhouse for use in KQL queries
1. Sends your script to the Fabric REST API and executes it against your KQL database

When the notebook finishes, go to your KQL database and check the new functions. They correspond to your entity types and their mappings.

:::image type="content" source="media/explore-connect-dashboard/kql-functions.png" alt-text="Screenshot of the functions in the KQL database.":::

## Query using KQL

Now you can use the functions in KQL queries to access your digital twin builder (preview) data.

When you call the functions by name in a KQL query, you can see the data projections they produce. The columns correspond to mapped properties in your entity types.

:::image type="content" source="media/explore-connect-dashboard/run-function.png" alt-text="Screenshot of running a function." lightbox="media/explore-connect-dashboard/run-function.png":::

For information about querying data with KQL querysets, see [Query data in a KQL queryset](../kusto-query-set.md?tabs=kql-database).

For examples of KQL queries that access digital twin builder data, see section five of the digital twin builder in Real-Time Intelligence tutorial: [Query and visualize data](tutorial-rti-5-query-and-visualize.md#query-the-data-using-kql).

## Visualize queries in a Real-Time Dashboard 

Now that your digital twin builder (preview) data can be explored with KQL queries, it can also be visualized in a Real-Time Dashboard.

You can pin KQL queries directly from your KQL queryset to a new or existing dashboard. For more information, see [Create a Real-Time Dashboard - Add tile from a queryset](../dashboard-real-time-create.md#add-tile-from-a-queryset).

You can also create a new dashboard from scratch, and use the functions you created in this article to write queries for your tiles in the dashboard. If you create a new dashboard, make sure to add your KQL database as a data source for your dashboard. For more information, see [Create a Real-Time Dashboard](../dashboard-real-time-create.md).

Once your dashboard is set up, consider the following actions:

* Set up [refresh intervals](../dashboard-real-time-create.md#enable-auto-refresh) for real-time updates
* [Create alerts](../data-activator/activator-get-data-real-time-dashboard.md) based on specific conditions
* [Share your dashboard](../dashboard-real-time-create.md#share-the-dashboard) with team members
* Explore more advanced [KQL queries](/kusto/query/) to derive insights from your digital twin builder (preview) data

For an example of a Real-Time Dashboard using queries with digital twin builder data, see section five of the digital twin builder in Real-Time Intelligence tutorial: [Query and visualize data](tutorial-rti-5-query-and-visualize.md#visualize-the-data-in-a-real-time-dashboard).

## Related content

* [Create OneLake shortcuts in a KQL database](../onelake-shortcuts.md?tab=onelake-shortcut&tabs=onelake-shortcut)
* [Query data in a KQL queryset](../kusto-query-set.md?tabs=kql-database)
* [Create a Real-Time Dashboard](../dashboard-real-time-create.md)