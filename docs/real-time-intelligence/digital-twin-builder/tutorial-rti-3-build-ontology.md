---
title: 'Digital twin builder (preview) in Real-Time Intelligence tutorial part 3: Build the ontology'
description: Build an ontology in digital twin builder (preview) by creating entity types, mapping data, and creating relationship types.
author: baanders
ms.author: baanders
ms.date: 12/12/2025
ms.topic: tutorial
---

# Digital twin builder (preview) in Real-Time Intelligence tutorial part 3: Build the ontology

In this part of the tutorial, you build a digital twin ontology that models the bus and bus stop data. You create a digital twin builder (preview) item, and define entity types for the buses and stops. Then, you map the data from the *TutorialLH* lakehouse to the entity instances, and define relationship types between the entity types to further contextualize the data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

<!--## Create new digital twin builder item in Fabric (title in include)-->
[!INCLUDE [Create digital twin builder](../includes/create-digital-twin-builder.md)]

In the semantic canvas, you can add entity types and relationship types to define an ontology.

## About entity types and relationship types

In digital twin builder (preview), an *entity type* is a category that defines a concept within a domain-specific ontology. The entity type definition serves as a blueprint for individual entity instances of that entity type, and specifies common characteristics shared across all instances within that category. Here you define two entity types for the sample scenario: Bus and Stop.

After you create an entity type, you can map data to it to hydrate the entity instances with data from various source systems. You can add both time series and non-time series properties to an entity type. When mapping both types of property to an entity type, you must map at least one non-time series property before you can map time series properties. Then, link the non-time series and time series data together by matching a non-time series property from the entity type with a column from the time series data. The values in the time series column must **exactly** match data that's mapped to the property on the entity type.

After your entity types are defined and mapped, you can create *relationship types* between them to define how they're related to each other. In this tutorial, a Bus *goesTo* a Stop.

## Add Bus entity type

First, create a new entity type for the bus.
1. In the semantic canvas of digital twin builder (preview), select **Add entity**.

    :::image type="content" source="media/tutorial-rti/add-entity.png" alt-text="Screenshot of Add entity button.":::

1. Leave the *Generic* system type selected, and enter *Bus* for the entity type name. Select **Add entity**.
1. The *Bus* entity type is created and becomes visible on the canvas.

    :::image type="content" source="media/tutorial-rti/bus-entity.png" alt-text="Screenshot of Bus entity type.":::

### Map non-timeseries bus data

Next, map some non-timeseries data to the Bus entity type. These fields are static properties that identify a bus and its visit to a certain stop.
1. In the **Entity configuration** pane, switch to the **Mappings** tab and select **Add data**.

    :::image type="content" source="media/tutorial-rti/add-data.png" alt-text="Screenshot of adding a data mapping.":::

1. Open **Select lakehouse table** to select a data source for your mapping. Select your tutorial workspace, the *TutorialLH* lakehouse, and the *bus_data_processed* table.
      
    :::image type="content" source="media/tutorial-rti/bus-data-source.png" alt-text="Screenshot of the bus data source.":::

    Optionally, wait for the data preview to load. Select **Choose data source** to confirm.
1. For the **Property type**, leave the default selection of **Non-timeseries properties**. 
1. Under **Unique Id**, select the edit icon (shaped like a pencil) to choose a unique ID out of one or more columns from your source data. Digital twin builder uses this field to uniquely identify each row of ingested data.

    Select *TripId* as the unique ID column and select **Ok**.

    :::image type="content" source="media/tutorial-rti/bus-unique-id.png" alt-text="Screenshot of the bus unique ID.":::

1. Under **Mapped properties**, select the edit icon to choose which properties from your source data to map to the bus entity type.

    The **Map properties** page lets you select a column from your source data on the left side, and map it to a new property on your entity type on the right side. By default, selecting a column name from the source data on the left side fills in the right side automatically with a matching name for the entity type property, but you can enter a new name for the property on the right side if you want the entity type property to be named something different than what it's called in the source data.

    The page loads with a *DisplayName* property for the entity type, which is unmapped to any column in the source data. Leave the *DisplayName* property unmapped as it is, and select **Add entity property** to add new properties to the mapping.

    :::image type="content" source="media/tutorial-rti/bus-map-properties-non-time-1.png" alt-text="Screenshot of the unmapped display name and adding an entity type property.":::

    Map the following entity type properties:
    - Select **TripId** from the dropdown menu in the left column. **Edit the box across from it in the right column so that its property name is _TripId_static_**. This action creates a property on the bus entity type named *TripId_static*, which gets its value from the **TripId** property in the source data.

        >[!IMPORTANT]
        > Make sure to edit the property name as described, to avoid conflicts later while mapping time series data to the *TripId* property.

    - Select **StopCode** from the dropdown menu in the left column. Edit the box across from it in the right column so that its property name is *StopCode_static*. This action creates a property on the bus entity type named *StopCode_static*, which gets its value from the **StopCode** property in the source data.
   
    Check the box to acknowledge that properties can't be renamed or removed, and select **Apply**.

    :::image type="content" source="media/tutorial-rti/bus-map-properties-non-time-2.png" alt-text="Screenshot of the mapped non-timeseries bus properties.":::

1. **Save** the mapping.

    :::image type="content" source="media/tutorial-rti/bus-save-non-time.png" alt-text="Screenshot of saving the bus non-time series mapping.":::

1. Switch to the **Scheduling** tab and select **Run** to apply the mapping.

    :::image type="content" source="media/tutorial-rti/bus-run-now.png" alt-text="Screenshot of running the bus mapping.":::

    The page confirms that the flow is queued. 

1. Check the status of your mapping job in the **Manage operations** tab. Wait for the status to say **Completed** before proceeding to the next section (the operation might take several minutes to begin running from the queue, and several more minutes to complete once it starts, so you might need to refresh the content a few times).

    :::image type="content" source="media/tutorial-rti/manage-operations-bus.png" alt-text="Screenshot of the Manage operations button from the bus entity type.":::

    :::image type="content" source="media/tutorial-rti/manage-operations-tab-bus.png" alt-text="Screenshot of the Manage operations tab with the bus entity type mapping.":::

### Map time series bus data

Next, map some time series data to the Bus entity type. These properties are streamed into the data source from the Eventstream sample data, and they contain information about the bus's location and movements.

1. Select **Home** to return to the semantic canvas, and reselect the **Bus** entity type. In the **Entity configuration** pane, reopen the **Mappings** tab. Select **Add data** to add a new mapping.

    :::image type="content" source="media/tutorial-rti/bus-add-data-time.png" alt-text="Screenshot of adding a new bus mapping.":::

1. Open **Select lakehouse table** to select a data source for your mapping. Again, select your tutorial workspace, the *TutorialLH* lakehouse, and the *bus_data_processed* table. Select **Choose data source**.
1. This time, switch the **Property type** to **Timeseries properties**.
1. Under **Mapped Properties**, select the edit icon.

    The page loads with a *Timestamp* property for the entity type, which is unmapped to any column in the source data. *Timestamp* requires a mapping, so select **ActualTime** from the corresponding dropdown menu on the left side. Then, select **Add entity property** to add new properties to the mapping.

    Map the following properties. When you select these property names from the source columns on the left side, leave the default matching names that populate on the right side.
    - **ScheduleTime**
    - **BusLine**
    - **StationNumber**
    - **StopCode**
    - **BusState**
    - **TimeToNextStation**
    - **TripId**

    :::image type="content" source="media/tutorial-rti/bus-map-properties-time.png" alt-text="Screenshot of the mapped time series bus properties.":::

1. Check the box to acknowledge that properties can't be renamed or removed, and select **Apply**.
1. Next, link your time series data to this entity type. This process requires you to select an entity type property and a matching column from your time series data table. The column selected from the time series data must **exactly** match data that is mapped to the selected property on your entity type. This process ensures correct contextualization of your entity instance and time series data. 

    Under **Link with entity property**, select the edit icon. 

    For **Choose entity property,** select *TripId_Static* from the dropdown menu. For **Select column from timeseries data...**, select *TripId*. Select **Apply**.

1. Make sure **Incremental mapping** is enabled and **Save** the mapping. Confirm when prompted.

    :::image type="content" source="media/tutorial-rti/bus-save-time.png" alt-text="Screenshot of saving the bus time series mapping.":::

1. Switch to the **Scheduling** tab and select **Run** under the new time series mapping to apply it.

## Add Stop entity type

Next, create a second entity type to represent a bus stop.
1. In the semantic canvas, select **Add entity**.
1. Leave the *Generic* system type selected, and enter *Stop* for the entity type name. Select **Add entity**.
1. After a few minutes, the *Stop* entity type is now visible on the canvas.

    :::image type="content" source="media/tutorial-rti/stop-entity.png" alt-text="Screenshot of Stop entity type.":::

### Map non-timeseries stop data

Next, map some non-timeseries data to the Stop entity type. The stop data doesn't contain any time series data, only static data about the bus stops and their locations. Later, when you link the Stop and Bus entity types together, this data is used to enrich the bus fact data with dimensional data.

1. In the **Entity configuration** pane, open the **Mappings** tab and select **Add data**.
1. Open **Select lakehouse table** to select a data source for your mapping. Select your tutorial workspace, the *TutorialLH* lakehouse, and the *stops_data* table.

    Select **Choose data source**.
1. For the **Property type**, leave the default selection of **Non-timeseries properties**. 
1. For the **Unique Id**, select *Stop_Code*.
1. For **Mapped properties**, map **Stop_Name** from the source data to the *DisplayName* property on the right side.

    Then, use the **Add entity property** button to add the following new properties to the mapping. When you select these property names from the source columns on the left side, leave the default matching names that populate on the right side.
    - **Stop_Code**
    - **Road_Name**
    - **Borough**
    - **Borough_ID**
    - **Suggested_Locality**
    - **Locality_ID**
    - **Latitude**
    - **Longitude**
    
    Check the box to acknowledge that properties can't be renamed or removed, and select **Apply**.

    :::image type="content" source="media/tutorial-rti/stop-map-properties-non-time.png" alt-text="Screenshot of the mapped non-timeseries stop properties.":::

1. **Save** the mapping.

    :::image type="content" source="media/tutorial-rti/stop-save-non-time.png" alt-text="Screenshot of saving the stop mapping.":::

1. Switch to the **Scheduling** tab and select **Run** to apply the mapping.

## Define relationship type

Next, create a relationship type to represent that a Bus *goesTo* a Stop.

1. In the semantic canvas, highlight the **Bus** entity type and select **Add relationship**.

    :::image type="content" source="media/tutorial-rti/add-relationship.png" alt-text="Screenshot of adding a relationship type.":::

1. In the **Relationship configuration** pane, enter the following information:
    - **First entity**: Bus
        - **Property to join**: StopCode_static
    - **Second entity**: Stop
        - **Property to join**: Stop_Code
    - **Relationship name**: Enter *goesTo*
    - **Select relationship type**: Many Stop per Bus (1:N)
    
    Select **Create**.

    :::image type="content" source="media/tutorial-rti/relationship-create.png" alt-text="Screenshot of the relationship type configuration." lightbox="media/tutorial-rti/relationship-create.png":::

1. In the **Scheduling** section that appears, select **Run** to apply the relationship type.

Now your Bus and Stop entity types are visible in the canvas with a relationship type between them. Together, these elements form the ontology for the tutorial scenario.

:::image type="content" source="media/tutorial-rti/ontology.png" alt-text="Screenshot of the ontology." lightbox="media/tutorial-rti/ontology-crop.png":::

## Verify mapping completion

As a final step, confirm that all your data mappings ran successfully. Each mapping might take several minutes to run.

1. From the menu ribbon, select **Manage operations**.

    :::image type="content" source="media/tutorial-rti/manage-operations.png" alt-text="Screenshot of selecting Manage operations.":::

1. View the details of the mapping operations, and confirm that they all completed successfully.

    :::image type="content" source="media/tutorial-rti/manage-operations-2.png" alt-text="Screenshot of four completed operations.":::

1. If any of the operations failed, check the box next to its name and select **Run** to rerun it.

>[!TIP]
> For further troubleshooting of failed mapping operations, see [Troubleshooting digital twin builder (preview)](resources-troubleshooting.md#troubleshoot-operation-failures).

Wait for all mappings to complete before you move on to the next part of the tutorial. In the next part, you project the ontology that you mapped to an eventhouse, to support further data analysis and visualization.

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 4: Project data to Eventhouse](tutorial-rti-4-project-eventhouse.md)