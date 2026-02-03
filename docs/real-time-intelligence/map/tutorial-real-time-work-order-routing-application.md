---
title: Build a real-time work order routing app with Microsoft Fabric Maps
description: Learn how to create a map in Real-Time Intelligence based on customer orders that creates an optimized route.
ms.reviewer: smunk
author: FarazGIS
ms.author: fsiddiqui
ms.topic: tutorial
ms.custom:
ms.date: 01/30/2026

#customer intent: I want to learn how to create a real-time work order routing app with Microsoft Fabric Maps.
---

# Tutorial: Build a real-time work order routing app with Microsoft Fabric Maps (preview)

Microsoft Fabric Maps provides geospatial visualization and analysis to deliver actionable insights from real-time and historical spatial data.

In this tutorial, an electric utility field dispatcher uses Microsoft Fabric Maps to create and manage repair work orders when outages or asset faults are reported. The scenario focuses on locating affected customers, visualizing active work orders in real time, and dispatching crews efficiently for service restoration.

This tutorial demonstrates how customer locations are mapped, live work orders appear on the map, and an optimal route is calculated using the Azure Maps [Route Directions](/rest/api/maps/route/post-route-directions) API. The tutorial concludes with an optimized route shown on the map.

Fabric Maps runs within [Fabric Real‑Time Intelligence](/fabric/real-time-intelligence/overview), ingesting streaming telemetry using Eventstream and Eventhouse for real‑time monitoring. Work order completions and operational outcomes are stored in OneLake, where they can be used for route optimization and analytics that are displayed on the map.

> [!IMPORTANT]
> Fabric Maps is in [preview](../../fundamentals/preview.md).

In this tutorial, you will:

> [!div class="checklist"]
>
> * Create a lakehouse and upload sample work order data.
> * Set up an eventstream to write work order data to an eventhouse.
> * Create a KQL queryset to extract customer coordinates from the imported work order data.
> * Create a map and add the queryset as a map layer.
> * Compute an optimal route using the Azure Maps [Route Directions API](/rest/api/maps/route/post-route-directions).
> * Add the optimized route to the map as a layer.
> * Configure map and layer settings.

## Prerequisites

Before starting this tutorial, it's helpful to review the [Real-Time Intelligence tutorials](/fabric/real-time-intelligence/tutorial-introduction) to become familiar with the core concepts and workflows.

* If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* An [Azure Maps account](/azure/azure-maps/quick-demo-map-app#create-an-azure-maps-account)
* An Azure Maps [subscription key](/azure/azure-maps/quick-demo-map-app#get-the-subscription-key-for-your-account).

* A [Fabric account](https://www.microsoft.com/microsoft-fabric/getting-started). For more information on Microsoft Fabric, see [What is Microsoft Fabric?](/fabric/fundamentals/microsoft-fabric-overview).
* Permission to create Eventstream, Eventhouse (KQL database), Lakehouse, Notebooks, and map item. For more information, see [About tenant settings](/fabric/admin/about-tenant-settings)
* A [workspace](../../fundamentals/workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity). For more information on creating a workspace, see [Create a workspace](../../fundamentals/create-workspaces.md)
* A basic understanding of [Fabric Lakehouse](/fabric/data-engineering/lakehouse-overview), a data repository for storing, managing, and analyzing structured and unstructured data in a single location. For information on creating a lakehouse, see [Create a lakehouse in Microsoft Fabric](/fabric/data-engineering/create-lakehouse).
* A basic understanding of [Fabric Eventhouse](/fabric/real-time-intelligence/eventhouse), used to ingest, process, and analyze data in near real-time. For information on creating an eventhouse, see [Create an eventhouse](/fabric/real-time-intelligence/create-eventhouse).
* A Basic understanding of the [Kusto Query Language](/kusto/query/?view=microsoft-fabric).
* A Basic understanding of [How to use Microsoft Fabric notebooks](/fabric/data-engineering/how-to-use-notebook).

## Create a lakehouse and upload the sample work order data

To simulate a real-time streaming source, the notebook in the following steps uses sample data uploaded to a lakehouse. In production, this data would be streamed rather than static.

### Create the work order data file

The work order data file contains sample work order records used in this tutorial to simulate a real‑time streaming source. After creating the file, you'll import it into a lakehouse in the next step.

Copy and paste the following content into a text file, then save it as *WorkorderLocations.csv*. You'll use this file in the next step.

```
WorkorderID,Latitude,Longitude
100,48.22610712,16.32977412
101,48.23519063,16.37364699
102,48.19785896,16.38669028
103,48.18125837,16.37068261
107,48.15151126222885,16.417665902348066
108,48.20290349765506,16.324921217672966
104,48.23400591,16.4563533
105,48.18145603,16.40506946
106,48.16366378,16.36001083
```

### Create a lakehouse and import the work order data file

Create a new lakehouse for incoming work order data and import the previously created work order location file.

1. From your workspace, select **New item**, and enter *lakehouse* in the search box and select it to create a new lakehouse.
1. Enter a name *WorkorderLocationsLakehouse* and select **Create**.
1. In the new lakehouse, select **Upload files** and upload the *WorkorderLocations.csv* file created in the previous step.
1. In the new lakehouse, select the **Explorer** pane on the left side of the screen.
1. In the **Files** section of the **Explorer**, select *WorkorderLocations.csv* to view the file you uploaded.
1. In the **View settings**, select **First row as header**.
1. (Optional) In the view drop-down list, select **Table view**.

:::image type="content" source="media/tutorials/real-time-work-order-routing-application/work-order-location-file-preview.png" lightbox="media/tutorials/real-time-work-order-routing-application/work-order-location-file-preview.png" alt-text="Screenshot of the WorkorderLocations.csv file after importing it into a lakehouse.":::

## Create an eventstream and write data to an eventhouse

In this section, you design an eventstream flow using a custom endpoint and send data using a notebook to simulate real‑time streaming.

Microsoft Fabric Eventstream is a real-time data streaming service that enables users to ingest, process, and route event data within the Microsoft Fabric ecosystem. It provides a no-code experience for building event-driven workflows, allowing seamless integration of real-time data from various sources and routing it to multiple destinations. For more information on supported data sources or how to connect to a custom endpoint, see the [Overview of Microsoft Fabric eventstreams](/fabric/real-time-intelligence/event-streams/overview).

By ingesting eventstream data into an eventhouse, you make streaming events available for processing with Kusto Query Language (KQL). This allows you to query, transform, and analyze the data as it arrives. For more information, see [Eventhouse overview](/fabric/real-time-intelligence/eventhouse).

### Create an eventstream and eventhouse

1. From your workspace, select **New item**, and enter *eventstream* in the search box.
1. Select **Eventstream**.
1. In the **New Eventstream** dialog, enter a **Name**: "WorkordersEventstream", then select **Create**.
1. In the **Design a flow to ingest, transform, and route streaming events** screen, select **Use custom endpoint**
  
    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/use-custom-endpoint.png" alt-text="Screenshot of the Design a flow to ingest, transform, and route streaming events screen in Fabric, showing the option to Use custom endpoint.":::

1. In the custom endpoint **Add source** dialog, select **Add**.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/custom-endpoint-add-source.png" alt-text="A screenshot of the Add source dialog for Custom endpoint in Microsoft Fabric showing a breadcrumb navigation with Custom endpoint arrow WorkordersEventstream at the top. The dialog contains a Source name field with red asterisk marked as required containing the text CustomEndpoint-Source. A teal Add button is highlighted in the bottom right corner of the dialog indicating that should be selected with no further action required.":::

    The eventstream is now created. Next, add an Eventhouse as the destination.

1. In the **WorkordersEventstream** node of the eventstream designer select **Eventhouse** from the **Transform events or add destination** drop-down list.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/event-stream-add-destination.png" lightbox="media/tutorials/real-time-work-order-routing-application/event-stream-add-destination.png" alt-text="A screenshot of the Microsoft Fabric eventstream designer showing a flow diagram with CustomEndpoint-Source connected to WorkordersEventstream node. A dropdown menu is expanded from the Transform events or add destination tile on the right side, displaying the Destinations section at the bottom showing several options including Eventhouse, which is highlighted with a red rectangle indicating that it should be selected.":::

1. The **Eventhouse destination configuration** pane appears on the right side of the screen. Fill out the details requested as follows, then select **Save**:
    1. **Data ingestion mode**: Set to **Event processing before ingestion**.
    1. **Destination name**: Set to **WorkordersEventhouse**.
    1. **Workspace**: A dropdown showing the name of your workspace.
    1. **Eventhouse**: Select **Create new** and create an eventhouse named **WorkordersEventhouse**.
    1. **KQL Database**: Select **WorkordersEventhouse**.
    1. **KQL Destination table**: Select the **Create new** link and create a new table named **WorkordersEventhouse**.
    1. **Input data format**: Select **Json**.
    1. **Activate ingestion after adding the data source**: check the checkbox.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/add-destination-eventhouse.png" alt-text="A screenshot showing the Eventhouse destination configuration pane showing Data ingestion mode with Event processing before ingestion selected, Destination name set to WorkordersEventhouse, Workspace dropdown showing My workspace, Eventhouse dropdown showing WorkordersEventhouse with Create new link, KQL database dropdown showing WorkordersEventhouse, KQL Destination table dropdown showing New WorkordersEventhouse with Create new link, Activate ingestion after adding the data source checkbox checked, and a green Save button at the bottom.":::

1. Once the eventhouse is added as a destination, select **Publish** to publish your new eventstream.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/publish-event-stream.png" lightbox="media/tutorials/real-time-work-order-routing-application/publish-event-stream.png" alt-text="A screenshot showing the Eventstream designer showing a flow with CustomEndpoint-Workorders source connected to a Workorders-stream node, which connects to WorkordersEventhouse destination. The Publish button is highlighted in the top right corner of the toolbar. An Edit mode banner indicates changes go live once published.":::

### Get required SAS key authentication keys

You need the *Event hub name* and *Connection string-primary key* values from the **SAS Key authentication** section in your notebook code.

1. Select the custom endpoint source tile you just added.
1. In the **Details** pane, select **SAS Key Authentication**.
1. Copy the following two values and save them for use in your notebook code:
    * **Event hub name**: Used for the **EVENT_HUB_NAME** variable.
    * **Connection string-primary key**: Used for the **CONNECTION_STR** variable.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/key-selected.png" lightbox="media/tutorials/real-time-work-order-routing-application/key-selected.png" alt-text="A screenshot showing the Eventstream designer with the SAS Key Authentication option selected in the details pane highlighting the Event hub name and Connection string-primary key fields that are used in the notebook code of a later step in this tutorial.":::

## Simulate real‑time ingestion using a notebook

In this section, you create a notebook connected to the lakehouse you created earlier, then use the provided code to read the CSV data and send events to the eventstream. This simulates real‑time data ingestion; for demos, you can run the notebook manually or schedule it to run periodically.

### Create a notebook in your Fabric workspace

Create a notebook with code to import the work order location file from your lakehouse into the eventstream you created in the previous section. This simulates a real-time streaming source, which in a production environment would be streamed rather than static.

1. From your workspace, select **New item**, and enter *notebook* in the search box.
1. Select **Notebook**.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/new-notebook.png" alt-text="A screenshot of the Microsoft Fabric New item dialog with a search box containing the text notebook. The search results display a Notebook tile with a document icon, showing the description Create a notebook to explore data and build machine learning models. The Notebook option is highlighted indicating it can be selected to create a new notebook item.":::

1. In the **New Notebook** dialog, enter *WorkorderLocations* in the **Name** field, then select **Create**.
1. To connect your notebook to the lakehouse, select **From OneLake catalog** from the **Add data items** dropdown list.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/connect-notebook-lakehouse.png" alt-text="A screenshot of the Microsoft Fabric Explorer pane showing the Data items tab selected with a No data sources added message and an empty folder icon. Below the message is an Add data items dropdown button expanded to reveal three menu options: From OneLake catalog with a database icon, From Real-Time hub with a lightning bolt icon, and New lakehouse with a plus sign. The From OneLake catalog option is highlighted with a dark border indicating selection.":::

1. Select **WorkorderLocationsLakehouse** from the **OneLake catalog** and select the **Connect** button. This is the lakehouse you created [previously](#create-a-lakehouse-and-import-the-work-order-data-file).

1. After creating the notebook and connecting it to your lakehouse, paste the following code into the first cell and run it to install the **Azure Event Hub** SDK:

    ```python
    # Install Azure Event Hub SDK (only needed once per environment)
    %pip install azure-eventhub
    ```

1. Select **+ Code** to create a new cell in the notebook.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/add-code-cell.png" alt-text="A screenshot of the Microsoft Fabric notebook interface showing a code cell with two lines of Python code. Line 1 contains a comment reading Install Azure Event Hub SDK only needed once per environment. Line 2 shows the pip install command percent pip install azure-eventhub. Below the code cell, a tooltip displays Add code cell pointing to a plus Code button highlighted with a red rectangle. A plus Markdown button appears to the right. The upper right corner shows PySpark Python as the selected kernel.":::

1. Select the new cell and enter the following code into it:

    ```python
    from azure.eventhub import EventHubProducerClient, EventData
    import pandas as pd
    import json
    import time
    
    # Replace with your actual connection string and Event Hub name
    CONNECTION_STR = "" # Connection string-primary key
    EVENT_HUB_NAME = "" # Event hub name
    producer = EventHubProducerClient.from_connection_string(conn_str=CONNECTION_STR, eventhub_name=EVENT_HUB_NAME)
    
    df = spark.read.csv("Files/WorkorderLocations.csv", header=True, inferSchema=True)
    pdf = df.toPandas()
    total_records = len(pdf)
    
    for index, row in pdf.iterrows():
        # Convert row to dictionary
        row_dict = row.to_dict()
    
        # Truncate coordinates to 5 decimal digits
        if 'lat' in row_dict:
            row_dict['Latitude'] = round(float(row_dict['Latitude']), 5)
        if 'lon' in row_dict:
            row_dict['Longitude'] = round(float(row_dict['Longitude']), 5)
    
        # Serialize to JSON
        payload = json.dumps(row_dict)
    
        # Send to Event Hub
        event_data = EventData(payload)
        with producer:
            producer.send_batch([event_data])
    
        # Wait 100ms
        time.sleep(0.1)
    ```

1. Add the values for the variables **CONNECTION_STR** and **EVENT_HUB_NAME** obtained in the previous section titled [Get required SAS key authentication keys](#get-required-sas-key-authentication-keys).
1. Run the notebook code. This creates the *Workorders* table in the KQL database in the *WorkordersEventhouse* eventhouse.

:::image type="content" source="media/tutorials/real-time-work-order-routing-application/work-order-table.png" lightbox="media/tutorials/real-time-work-order-routing-application/work-order-table.png" alt-text="A screenshot of the Microsoft Fabric Eventhouse interface displaying the Workorders table with a Data preview tab selected. The left navigation panel shows the KQL databases tree with WorkordersEventhouse expanded, containing Tables with the Workorders table selected.":::

## Create a KQL queryset and add it as a map layer

In this section, you create a KQL queryset that retrieves current work order location data from the *Workorders* table in your eventhouse, then uses that queryset as a data source for a Fabric Maps map. The queryset enables the map to display active work orders as a layer, providing a visual view of jobs that need to be planned and assigned to field crews.

### Create a KQL queryset

From your eventhouse (KQL database):

1. Select **WorkordersEventhouse_queryset** from within the KQL database.
1. Select **+** from the queries menu bar to create a new query.
1. When the new query is created, it's automatically named *WorkordersEventhouse*, select the pencil icon to edit the name, and rename it to **WorkordersQuery**.
1. Paste the following KQL query into the editor.

    ```
    Workorders
    | project Latitude, Longitude, WorkorderID 
    ```

1. Select the *pencil edit icon* in the tab titled **Tab** and rename it to **WorkordersQuery**.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/new-kql-queryset.png" alt-text="A screenshot of the Microsoft Fabric KQL queryset interface showing the WorkordersEventhouse database selected in the left Explorer pane under KQL databases with WorkordersEventhouse_queryset expanded to reveal the Workorders table. The main query editor displays a new tab highlighted with a red rectangle containing a query. A second red rectangle highlights the WorkordersEventhouse_queryset item in the left navigation panel. The query window shows two lines of KQL code with Workorders on line 1 and project Latitude comma Longitude comma WorkorderID on line 2.":::

1. Select **Run** to verify that the query returns the work order data with location fields.

This queryset functions as a reusable data source for a Fabric Maps map data layer, which is demonstrated in the next section.

## Create a map and add the queryset as a layer

In this section, you create a Fabric Maps map and use the previously created KQL queryset as a data layer. The map is configured with a refresh interval so that streaming work order data updates automatically, providing a near real‑time spatial view of active work orders. You then rename the layer and adjust its settings to control how the data is displayed on the map. This live geospatial context helps dispatchers monitor field activity, assess demand across service areas, and make more informed routing and assignment decisions.

### Create a new map

1. From your workspace, select **New item**.
1. In the **New item** panel, enter **map** into the search field, and select **Map (preview)**.
1. In the **New Map** dialog, enter **WorkordersMap** in the **Name** field and select **Create**.

### Add eventhouse to map

1. In the **Explorer** pane, select **Eventhouse** then the **Add data items** button.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/add-eventhouse-map.png" alt-text="A screenshot showing the Microsoft Fabric Maps interface with the Explorer pane on the left with Lakehouse and Eventhouse tabs. The Eventhouse tab is selected and highlighted with a red box. Below it, the Add data items button is also highlighted with a red box. The main area displays the default world map in the map area.":::

1. From the **OneLake** catalog, select the eventhouse **WorkordersEventhouse** that you created previously, then select **Connect**.

> [!TIP]
> If you get an error such as *The KQL database has a protected label that restricts access. Please contact your database owner for assistance.* Check the sensitivity label on your KQL database, as it can be restricting access. For more information, see [Apply sensitivity labels to Fabric items](/fabric/fundamentals/apply-sensitivity-labels).

### Show queryset on map

1. In the **Explorer** pane in your new map, select the eventhouse **WorkordersEventhouse** that you added in the previous step.
1. Navigate to the KQL query *WorkordersQuery*, and select the ellipse (**...**) to show the popup menu.
1. Select **Show on map** from the popup menu.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/show-on-map.png" alt-text="A screenshot of the Microsoft Fabric Maps Explorer panel displaying a hierarchical tree structure with KQL database section expanded. The tree shows WorkordersEventhouse containing Workorders-Event table and WorkordersQuery queryset. An ellipsis menu is open next to WorkordersQuery revealing options including Show on map highlighted with a red rectangle border.":::

1. The **View Eventhouse data on map** dialog appears with **Preview data** selected. No changes are required. Ensure it's correct, then select **Next**

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/preview-data.png" alt-text="A screenshot of the View Eventhouse data on map dialog in Microsoft Fabric showing three steps on the left: Preview data with a green checkmark, Set geometry, and data refresh interval, and Review and add to map. The main panel displays Visualize spatial data over time on a map with a dropdown to Select a KQL query to visualize set to WorkordersQuery. Below is a Query result preview table with columns for Latitude, Longitude, and WorkorderID showing nine work order records with coordinates in the Vienna Austria area. Back and Next buttons appear at the bottom right.":::

1. In the **Set geometry and data refresh interval** step, set the fields as follows, then select **Next**:
    * **Data layer Name**: WorkordersQuery
    * **Geometry column location**: Latitude and longitude data locate on separate columns
    * **Latitude column**: Latitude
    * **Longitude column**: Longitude
    * **Data refresh interval**: 5 minutes

        :::image type="content" source="media/tutorials/real-time-work-order-routing-application/set-geometry.png" alt-text="A screenshot of the Microsoft Fabric dialog titled View Eventhouse data on map showing the Set geometry and data refresh interval configuration step. A left sidebar displays three workflow steps with checkmarks indicating Preview data is completed and Set geometry and data refresh interval is currently active. The main panel contains a Data layer section with a Name field containing WorkordersQuery, followed by a Geometry data column section with three dropdowns: Geometry column location set to Latitude and longitude data located on separate columns, Latitude column set to Latitude, and Longitude column set to Longitude. Below is a Data refresh section with a Data refresh interval dropdown set to 5 minutes. Back and Next buttons appear at the bottom right corner.":::

1. In the **Review and add to map** step, review settings and select **Add to map**.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/review-add-to-map.png" alt-text="A screenshot of the Microsoft Fabric View Eventhouse data on map dialog displaying the Review and add to map step. The left sidebar shows three workflow steps with green checkmarks next to Preview data and Set geometry and data refresh interval, and a blue dot indicating Review and add to map is currently active. The main panel displays the heading View Eventhouse data on map with subtitle Visualize spatial data over time on a map. The Data source section shows KQL database set to WorkordersEventhouse, KQL queryset set to WorkordersEventhouse_queryset, and Queryset tab set to WorkordersQuery. The Data layer section shows Name field with a red asterisk set to WorkordersQuery. The Geometry data column section displays Geometry column location with red asterisk set to Latitude and longitude data located on separate columns, Latitude column with red asterisk set to Latitude, and Longitude column with red asterisk set to Longitude. The Data refresh section shows Data refresh interval with red asterisk set to 5 minutes. Back and Add to map buttons appear at the bottom right corner.":::

The queryset results are now displayed in the updated map.

:::image type="content" source="media/tutorials/real-time-work-order-routing-application/work-order-query-string-layer.png" lightbox="media/tutorials/real-time-work-order-routing-application/work-order-query-string-layer.png" alt-text="A screenshot showing Microsoft Fabric Maps interface displaying a map of Vienna, Austria with red circular markers indicating work order locations. The Explorer pane on the left shows Lakehouse and Eventhouse tabs with the Eventhouse tab selected, revealing a KQL database tree containing WorkordersEventhouse and WorkordersQuery entries. The Data layers panel in the upper left of the map shows WorkordersQuery layer with a visibility toggle and options menu.":::

## Generate an optimized multi‑stop route with the Azure Maps Route Directions API

In this section, you create a new notebook that retrieves work order coordinates from the KQL database and calls the [Azure Maps Route Directions REST API](/rest/api/maps/route/post-route-directions). You enable the service's multi‑stop optimization capability to determine the most efficient order for visiting each location and return the route geometry in that optimized sequence. This output is used later to visualize a recommended technician route on the map.

To complete this section, you need an Azure account with an Azure Maps account and subscription key. If you don't have an Azure account, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin. For more information on creating an Azure Maps account, see [Create an Azure Maps account](/azure/azure-maps/quick-demo-map-app#create-an-azure-maps-account). For more information on getting an Azure Maps subscription key, see [Get the subscription key for your account](/azure/azure-maps/quick-demo-map-app#get-the-subscription-key-for-your-account) in the Azure Maps quickstart.

### Create a notebook in your Fabric workspace that retrieves the optimal route

1. From within your workspace, open the eventhouse **WorkordersEventhouse** you created previously.
1. In the left navigation panel under **KQL databases**, select **WorkordersEventhouse**.
1. The top menu bar should now display an option for **Notebook**. Select it to create a new notebook.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/create-new-notebook.png"  lightbox="media/tutorials/real-time-work-order-routing-application/create-new-notebook.png" alt-text="A screenshot of the Microsoft Fabric Eventhouse interface showing the WorkordersEventhouse database selected in the left navigation panel under KQL databases. The top menu bar displays several options including Notebook, which is highlighted with a red box indicating that is the item to select. The main panel shows the Data Activity Tracker with ingestion and query statistics.":::

1. In the new notebook, save the values for the **kustoQuery**, **kustoUri**, and **database** variables. You use these values in the new notebook code you create in step 6.
1. Connect your notebook to **WorkorderLocationsLakehouse** by selecting **From OneLake catalog** from the **Add data items** dropdown list.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/new-notebook-vars.png" lightbox="media/tutorials/real-time-work-order-routing-application/new-notebook-vars.png" alt-text="A screenshot of a Microsoft Fabric notebook interface showing a code cell with PySpark Python code. The left panel displays No data sources added with an Add data items button highlighted by a red box. The main code area shows an example query for reading data from Kusto with variables kustoQuery set to Workorders, kustoUri containing a Fabric Microsoft URL, and database set to WorkordersEventhouse, all highlighted with red boxes to indicate values that need to be copied and used in the notebook code provided in this tutorial.":::

1. Once your new notebook is created and connected to your lakehouse, enter the following code into the second cell of your notebook, replacing the default code, then add the variable values saved in the previous step:

    ```python
    import os, json, requests
    from pyspark.sql import types as T
    from pyspark.sql.functions import col
    
    # ---- Configuration ----
    AZMAPS_SUBSCRIPTION_KEY = os.environ.get(
        'AZMAPS_SUBSCRIPTION_KEY',
        '<Your Azure Maps subscription key>'
    )
    API_VERSION = '2025-01-01'
    BASE_URL    = 'https://atlas.microsoft.com'
    
    kustoQuery = "['Workorders']" # Your Kusto query name
    kustoUri = "" # Your Kusto URI
    database = "WorkordersEventhouse" # Your KQL database name
    
    # The access credentials.
    accessToken = mssparkutils.credentials.getToken(kustoUri)
    kustoDf  = spark.read\
        .format("com.microsoft.kusto.spark.synapse.datasource")\
        .option("accessToken", accessToken)\
        .option("kustoCluster", kustoUri)\
        .option("kustoDatabase", database)\
        .option("kustoQuery", kustoQuery).load()
    
    # Write transformed response to a new file so the raw output is preserved
    OUTPUT_GEOJSON_PATH_TRANSFORMED = (
        'Files/OptimizedRoute.geojson' # GeoJSON output file 
    )
    
    # ---- Read Stores from KQL database table ----
    stores_df  = spark.read\
        .format("com.microsoft.kusto.spark.synapse.datasource")\
        .option("accessToken", accessToken)\
        .option("kustoCluster", kustoUri)\
        .option("kustoDatabase", database)\
        .option("kustoQuery", kustoQuery).load()\
        .select(
                    col("WorkorderID").alias("workorder_id"),
                    col("Latitude").alias("lat"),
                    col("Longitude").alias("lon")
                )
    
    # Ordered waypoints: origin first, then the rest by workorder_id
    # (API will re-order when optimizeWaypointOrder=True)
    stores_pd = stores_df.orderBy('workorder_id').toPandas()
    waypoints_lonlat = [[float(r['lon']), float(r['lat'])] for _, r in stores_pd.iterrows()]
    
    # ---- Build Directions request body (GeoJSON) ----
    features = []
    for idx, (lon, lat) in enumerate(waypoints_lonlat):
        features.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
            "properties": {"pointIndex": idx, "pointType": "waypoint"}
        })
    
    dir_body = {
        "type": "FeatureCollection",
        "features": features,
        "optimizeRoute": "fastestWithTraffic",
        "routeOutputOptions": ["routePath"],  # ensures route path geometry in response
        "travelMode": "truck",
        "optimizeWaypointOrder": True
    }
    
    # ---- Call Azure Maps Directions (POST) ----
    url     = f"{BASE_URL}/route/directions"
    params  = {"api-version": API_VERSION}
    headers = {
        "Accept": "application/geo+json",
        "Content-Type": "application/geo+json",
        "subscription-key": AZMAPS_SUBSCRIPTION_KEY
    }
    
    resp = requests.post(url, params=params, data=json.dumps(dir_body), headers=headers)
    resp.raise_for_status()
    resp_json = resp.json()  # exact payload as returned by the API
    
    # ---- Transform: move order.optimizedIndex -> properties.optimizedIndex for all Waypoint features to add as a data label in the map----
    for feat in resp_json.get("features", []):
        props = feat.get("properties") or {}
        if props.get("type") == "Waypoint":
            order = props.get("order") or {}
            opt_idx = order.pop("optimizedIndex", None)
            if opt_idx is not None:
                props["optimizedIndex"] = opt_idx + 1
            # reassign possibly-updated order (still contains inputIndex if present)
            props["order"] = order
            feat["properties"] = props
    
    # ---- Write transformed GeoJSON ----
    from notebookutils import mssparkutils
    mssparkutils.fs.put(OUTPUT_GEOJSON_PATH_TRANSFORMED, json.dumps(resp_json), True)
    
    print(f"Transformed Directions GeoJSON (waypoints carry properties.optimizedIndex) written to {OUTPUT_GEOJSON_PATH_TRANSFORMED}")
    ```

1. Enter Your Azure Maps subscription key in the notebook code for the **AZMAPS_SUBSCRIPTION_KEY** variable by replacing "*\<Your Azure Maps subscription key\>*" with Your Azure Maps subscription key.

    > [!IMPORTANT]
    > This example hardcodes the Azure Maps subscription key for simplicity. **Do *not* hardcode secrets in production environments**. Store and manage secrets securely by using Azure Key Vault and reference them at runtime. For more information, see [Best practices for protecting secrets](/azure/security/fundamentals/secrets-best-practices).

1. Select the **Save as** button in the menu and save the notebook as **OptimizeRoute**.
1. Run the notebook to create the **OptimizedRoute.geojson** file in the **Files** directory of your lakehouse.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/optimized-route-file.png" lightbox="media/tutorials/real-time-work-order-routing-application/optimized-route-file.png" alt-text="A screenshot of the Microsoft Fabric interface showing a notebook code cell on the right side with Python code that retrieves route data and writes a GeoJSON file. The Explorer pane on the left displays OneLake with WorkorderLocation expanded showing Tables and Files folders. The Files folder contains WorkorderLocations.csv and  OptimizedRoute.geojson highlighted with a red box indicating the newly created output file. The center Files panel shows both files with OptimizedRoute.geojson also highlighted. The notebook output at the bottom displays a success message stating Transformed Directions GeoJSON waypoints carry properties.":::

#### Add lakehouse to map

1. In the **Explorer** pane of your map **WorkordersMap**, select **Lakehouse** then the **Add data items** button.
1. From the **OneLake catalog**, select the lakehouse **WorkorderLocationsLakehouse** that you created previously, then select **Connect**.

#### Show the optimized route on the map

1. In the **Explorer** pane in your new map, select the lakehouse **WorkorderLocationsLakehouse** that you added in the previous step.
1. Navigate to **OptimizedRoute.geojson** in the **Files** directory of your lakehouse and select the ellipse (**...**) to show the popup menu.
1. Select **Show on map** from the popup menu.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/show-optimized-route-on-map.png" lightbox="media/tutorials/real-time-work-order-routing-application/show-optimized-route-on-map.png" alt-text="A screenshot of the Microsoft Fabric Maps Explorer panel showing the Lakehouse tab selected with WorkorderLocationsLakehouse expanded. The Files folder contains OptimizedRoute.geojson and WorkorderLocations.csv files. A context menu is open next to OptimizedRoute.geojson displaying options including Show on map highlighted with a red rectangle. The Data layers panel shows WorkordersQuery as an existing layer with a visibility toggle.":::

1. In the **Data layers** panel, toggle visibility *off* for the **WorkordersQuery** layer.

Once completed, the new map layer appears in your Fabric Maps map.

:::image type="content" source="media/tutorials/real-time-work-order-routing-application/optimized-route-no-styles.png" alt-text="A screenshot of the Microsoft Fabric Maps displaying a street map of Vienna Austria with an optimized route shown as blue lines connecting nine numbered waypoints. The Explorer pane on the left shows the Lakehouse tab expanded with WorkorderLocationsLakehouse containing a Files folder with OptimizedRoute.geojson and WorkorderLocations.csv files. The Data layers panel displays two layers: WorkordersQuery with visibility toggled off and OptimizedRoute showing the connected route path with numbered stops from 1 to 9 indicating the optimized visit sequence.":::

### Map layer settings

Fabric Maps provides a range of layer settings that let you control how data is presented on the map. In this section, you customize the layer created from the route optimization process by renaming the layer, adjusting the symbol style, and configuring labels based on field values. These settings help improve readability and make it easier to interpret work order data at a glance.

#### Rename the layer

1. In the **Data layers** panel, open the **OptimizedRoute** options menu by selecting the ellipse (**...**).
1. Once in the options menu, select **Rename**.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/rename-layer.png" alt-text="A screenshot of the Microsoft Fabric Maps Data layers panel showing two layers WorkordersQuery and OptimizedRoute. The OptimizedRoute layer has its options menu expanded with a red rectangle highlighting the Rename option. Other menu options visible include Zoom to fit, Duplicate, and Delete. The panel appears over a street map background showing the Vienna Austria area.":::

#### Remove labels at the map level

When you toggle Labels on or off at the map level, it affects basemap text labels. These labels come from the underlying map style and include:

* City and town names
* Country and region names
* Road and highway names
* Water feature names (rivers, lakes, oceans)
* Other administrative or geographic place names

When **Labels** aren't shown, the basemap appears "cleaner" and more minimal, with no place-name text rendered on the basemap.

To turn off basemap labels:

1. Open your map in Fabric Maps.
1. Select **Map settings** from the menu bar.
1. Locate the **Labels** checkbox, and unchecked it.

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/map-settings-labels.png" lightbox="media/tutorials/real-time-work-order-routing-application/map-settings-labels.png" alt-text="A screenshot showing the Microsoft Fabric Maps interface displaying a street map of Vienna Austria with purple route lines connecting multiple waypoints. The left side shows the Explorer pane with Data layers panel listing WorkordersQuery and Optimized Route layers. The top toolbar highlights the Map settings button highlighted with a red rectangle. The right side displays the Basemap settings panel with the Labels checkbox unchecked and highlighted with a red rectangle.":::

For more information on Map settings in Fabric Maps, see [Change Map settings](customize-map.md#change-map-settings)

#### Add data labels to the layer

Data labels are data‑driven annotations that come from one or more fields in the layer's dataset. They're tied directly to layer level map features, such as the points on the map that represent work order locations. For more information of Fabric Maps data labels, see [Data label settings](customize-map.md#data-label-settings).

1. Select **Optimized Route** in the **Data layers** panel. The **Optimized Route** settings panel appears in the right side of the screen.
1. In the **Optimized Route** settings panel, select **> Data label settings**.
1. Select the **Enable data labels** toggle to turn on data labels. This shows more data label settings.
1. Change the following data label settings:
    * **Data labels**: optimizedIndex
    * **Text color**: white
    * **Text size** slider set to 20
    * **Text stroke color**: Black
    * **Text stroke width** slider set to 2

    :::image type="content" source="media/tutorials/real-time-work-order-routing-application/data-label-settings.png" lightbox="media/tutorials/real-time-work-order-routing-application/data-label-settings.png" alt-text="A screenshot of Microsoft Fabric Maps showing the Data labels settings panel expanded on the right side with Enable data labels toggled On, Data labels dropdown set to optimizedIndex, Text color showing a white color picker, Text size slider set to 20, Text stroke color showing black, and Text stroke width slider set to 2. The main map area displays a street map of Vienna Austria with purple route lines connecting numbered waypoints labeled 1 through 9 indicating the optimized visit order. The Data layers panel on the left shows WorkordersQuery with visibility hidden and Optimized Route as the active layer.":::

## Summary

This tutorial demonstrated how to build an end-to-end, real-time work order routing scenario using Microsoft Fabric Real-Time Intelligence and Fabric Maps. Streaming work order data is ingested, transformed, and queried using KQL, then visualized on a map to create a dynamic, continuously updating view of work order locations. By integrating routing logic and optimal path calculations, the solution shows how real-time geospatial analytics can help dispatchers and field operations teams make faster, better-informed decisions.

This pattern can be extended to other location-based scenarios such as fleet tracking, asset monitoring, and incident response. By combining event-driven data, KQL-based analytics, and map-based visualization, Microsoft Fabric enables a transition from raw streaming data to actionable geographic insights in near real time.

## Next steps

For more information on Fabric Maps topics covered in this tutorial:

> [!div class="nextstepaction"]
> [Create a map](create-map.md)

> [!div class="nextstepaction"]
> [Change Map settings](customize-map.md#change-map-settings)

> [!div class="nextstepaction"]
> [Data label settings](customize-map.md#data-label-settings)
