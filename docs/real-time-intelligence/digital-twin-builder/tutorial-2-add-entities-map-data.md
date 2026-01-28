---
title: 'Digital twin builder (preview) tutorial part 2: Add entity types and map data'
description: Define entity types in digital twin builder (preview) and map data to entity instances. Part 2 of the digital twin builder (preview) tutorial.
author: baanders
ms.author: baanders
ms.date: 05/01/2025
ms.topic: tutorial
---

# Digital twin builder (preview) tutorial part 2: Add entity types and map data

An entity type is a category that defines a concept within an ontology, like *Equipment* or *Process*. It serves as a blueprint for individual entity instances of that type, and specifies common characteristics shared across all entity instances within that category.

In this tutorial step, create the following tutorial entity types: *Distiller*, *Condenser*, *Reboiler*, *Process*, *Technician*, and *MaintenanceRequest*. Then, map data to them from your source tables in OneLake. 

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Add the Distiller entity type

In this section, you define the first entity type in the sample ontology, *Distiller*.

1. In the semantic canvas of digital twin builder (preview), select **Add entity**.

    :::image type="content" source="media/tutorial/add-entity.png" alt-text="Screenshot of Add entity button.":::
1. Select the *Equipment* system type. System types are built-in entity types that you can select when defining an entity type, to automatically associate it with a set of relevant properties that are common to objects of this type.

    Enter *Distiller* for the entity type name and select **Add entity**.

    :::image type="content" source="media/tutorial/distiller-entity-type.png" alt-text="Screenshot of selecting the Equipment entity type for the distiller.":::
1. After a few minutes, the *Distiller* entity type is now visible on the canvas.

    :::image type="content" source="media/tutorial/distiller-entity.png" alt-text="Screenshot of the distiller entity type in the canvas.":::

## Map data to the Distiller

Next, map some data to your *Distiller* entity type. 

The mapping feature in digital twin builder (preview) is the first step to creating an ontology with semantically rich entity types. During mapping, you hydrate your entity instances with data from various source systems. 

You can add both time series and non-time series properties to an entity type. When mapping both types of property to an entity type, you must map at least one non-time series property before you can map time series properties. Then, link the non-time series and time series data together by matching a non-time series property from the entity type with a column from the time series data. The values in the time series column must **exactly** match data that's mapped to the entity type property.

### Map non-timeseries properties

Start by mapping the asset metadata.

1. Select your entity type on the canvas or in the entity type list pane to open the **Entity configuration** pane. 
1. In the pane, go to the **Mappings** tab. Select **Add data** to create a new mapping.

    :::image type="content" source="media/tutorial/add-data.png" alt-text="Screenshot of adding a mapping.":::
1. Open **Select lakehouse table** to select a data source for your mapping. From your tutorial workspace, select the *GettingStartedRawData* lakehouse and the *assetdata* table.
      
    :::image type="content" source="media/tutorial/select-data-source-distillers.png" alt-text="Screenshot of the distiller data source.":::

    Optionally, wait for the data preview to load. Select **Choose data source** to confirm.

1. Next to your **Source table** choice, select **No filter applied** to add a filter to your source table mapping. Select the column *Name*, the operation *Contains*, and the value *distiller* (case-sensitive). Then select **Apply**.

    :::image type="content" source="media/tutorial/distiller-filter.png" alt-text="Screenshot of applying a filter to the distiller data.":::

    The button text now shows **Filter applied**.
1. Next, select the **Property type** of the data you're mapping. This first mapping deals with asset metadata for the *Distiller* entity type, so choose **Non-timeseries properties**. 

    :::image type="content" source="media/tutorial/property-type.png" alt-text="Screenshot of selecting the property type.":::
1. Under **Unique Id**, select the edit icon (shaped like a pencil) to choose a unique ID for your data. The unique ID is created out of one or more columns from your source data, and is used by digital twin builder to uniquely identify each row of ingested data. Choose **ID** as the unique ID for this data, and select **Ok** to save and close the modal.

    :::image type="content" source="media/tutorial/unique-id.png" alt-text="Screenshot of the unique ID options.":::
1. Under **Mapped properties**, select the edit icon to map properties from your source table.

    The **Map properties** pane lets you select a column from your source data on the left side, and map it to a new property on your entity type on the right side. By default, selecting a column name from the source data on the left side fills in the right side automatically with a matching name for the entity type property, but you can enter a new name for the property on the right side if you want the entity type property to be named something different than its name in the source data.

    Define the following property mappings:
    1. Where **DisplayName** is automatically provided on the right side as a property to map, select **Name** as the source column on the left side.
    1. Leave **Manufacturer** and **SerialNumber** unmapped.
    1. Select **+ Add entity property** to add a new property. Select **ID** as the source column on the left side, and edit the property on the right side to be *DistillerId*.
    1. Add a new entity type property. Select **SiteId** as the source column on the left side, and leave the *SiteId* that fills automatically as the property to map on the right side.
    1. Add a new entity type property. Select **NumberOfTrays** as the source column on the left side, and leave the *NumberOfTrays* that fills automatically as the property to map on the right side.

        :::image type="content" source="media/tutorial/map-properties.png" alt-text="Screenshot of the mapped properties.":::
1. Check the box to acknowledge that once these properties are applied, they can't be renamed or removed from the entity type.
1. Select **Apply** to save your properties. Then select **Save** to save your mapping.

    :::image type="content" source="media/tutorial/save-mapping.png" alt-text="Screenshot of the mapping and Save button.":::
1. Go to the **Scheduling** tab to run your mapping job. Under the name of your mapping job, select **Run**.

    :::image type="content" source="media/tutorial/run-now.png" alt-text="Screenshot of the Run button.":::

1. Check the status of your mapping job in the **Manage operations** tab. Wait for the status to say **Completed** before proceeding to the next section (you might need to refresh the content a few times).

    :::image type="content" source="media/tutorial/manage-operations-distiller.png" alt-text="Screenshot of the Manage operations button from the distiller entity type.":::

    :::image type="content" source="media/tutorial/manage-operations-tab-distiller.png" alt-text="Screenshot of the Manage operations tab with the distiller entity type mapping.":::

When the mapping is done running, entity instances are created and hydrated with the non-time series data.

### Map time series properties

Next, map some time series data. For the *Distiller* entity type, there are four time series properties coming from the time series data table that need to be added. After they are added, you link the time series data to the entity instances that you mapped in the previous step, by specifying a link property that exactly matches values across the time series and non-time series data.

1. Select **Home** to return to the semantic canvas, and reselect the **Distiller** entity type. In the **Entity configuration** pane, reopen the **Mappings** tab.
1. Select **Add data** to create a new mapping for the time series data.
1. Open **Select lakehouse table** to select a data source for your mapping. From your tutorial workspace, select the *GettingStartedRawData* lakehouse and the *timeseries* table.

    :::image type="content" source="media/tutorial/select-data-source-timeseries.png" alt-text="Screenshot of the time series data source.":::

    Optionally, wait for the data preview to load. Select **Choose data source** to confirm.
1. Next, select **No filter applied** to add a filter to your source table mapping (make sure you're still editing the new mapping, not the first mapping). Select the column *assetId*, the operation *Contains*, and the value *D* (case-sensitive). Then select **Apply**.

    :::image type="content" source="media/tutorial/distiller-timeseries-filter.png" alt-text="Screenshot of applying a filter to the distiller time series data.":::

    The button text now shows **Filter applied**.
1. For the **Property type**, choose **Timeseries properties**.

    :::image type="content" source="media/tutorial/property-type-timeseries.png" alt-text="Screenshot of the timeseries properties.":::
1. Under **Mapped properties**, select the edit icon.
    1. Where **Timestamp** is automatically provided on the right side as a property to map, select **sourceTimestamp** as the source column on the left side.
    1. Use **+ Add entity property** to add four time series properties from these source columns: **RefluxRatio**, **MainTowerPressure**, **FeedFlowRate**, and **FeedTrayTemperature**. Leave the default matching names that populate on the right side.

         :::image type="content" source="media/tutorial/map-timeseries-properties.png" alt-text="Screenshot of the mapped time series properties.":::
    1. Check the box to acknowledge that once these properties are applied, they can't be renamed or removed from the entity type.
    1. Select **Apply**.

1. Next, link the time series data to the entity instance data. Under **Link with entity property**, select the edit icon. This process requires you to select an entity type property and a matching column from your time series data table. The source column selected from the time series data must **exactly match** data that is mapped to the selected property on the entity type. This process ensures correct contextualization of your entity instance data and time series data. 
    1. For **Choose entity property**, select **DistillerId**. Under **Select column from timeseries data...**, select the **assetId** column from your time series data.

         :::image type="content" source="media/tutorial/define-link.png" alt-text="Screenshot of the link options.":::
    1. Select **Apply** to save and close the modal.

1. Make sure **Incremental mapping** is enabled, then select **Save** to save your mapping job. Confirm when prompted that you want to save the incremental mapping.
1. Go to the **Scheduling** tab to run your mapping job. Locate the new mapping job (it ends in *TimeSeries*) and select **Run**.

Next, add a schedule for the timeseries mapping so that it refreshes the data automatically. Here you create a schedule that runs every five minutes.
1. Go to the **Scheduling** tab. Under the name of your time series run, toggle on the switch for **Schedule flow**. This displays a schedule selector. Expand the dropdown menu and select **Create flow**.

    :::image type="content" source="media/tutorial/create-flow.png" alt-text="Screenshot of creating the flow.":::
1. For the **Flow name**, enter *Every 5 minutes*. Select **Create**.
1. Select the new **Update flow schedule** button to configure scheduled run details.
1. In the **Every 5 minutes** settings, configure these options:
    1. **Scheduled run**: On
    1. **Repeat**: *By the minute*
    1. **Every**: *5* minute(s)
    1. **Start date and time**: Pick today's date and time.
    1. **End date and time**: Pick the time 10 minutes from now.
    1. **Time zone**: Pick your time zone.
    
    :::image type="content" source="media/tutorial/configure-schedule.png" alt-text="Screenshot of the schedule options.":::

    Select **Apply** and close the schedule configuration.

1. You see the schedule reflected in the **Entity configuration** pane.

    :::image type="content" source="media/tutorial/distiller-schedule.png" alt-text="Screenshot of the configured distiller schedule.":::

1. Now all properties of the *Distiller* are mapped. To verify, select the **Properties** tab and confirm that your entity type looks like this in the semantic canvas:

    :::image type="content" source="media/tutorial/distiller-entity-two-mappings.png" alt-text="Screenshot of the distiller entity type showing two mappings.":::

1. Check the status of your time series mapping in the **Manage operations** tab. Wait for the status to say **Completed** before proceeding to the next section (you might need to refresh the content a few times).

    :::image type="content" source="media/tutorial/manage-operations-distiller.png" alt-text="Screenshot of the Manage operations button from the distiller entity type.":::

    :::image type="content" source="media/tutorial/manage-operations-tab-distiller-2.png" alt-text="Screenshot of the Manage operations tab with the distiller time series mapping.":::

    >[!TIP]
    >If you see a status of **Failed** for your mapping job, try rerunning it. If you continue to experience issues, see [Troubleshooting digital twin builder (preview)](resources-troubleshooting.md#troubleshoot-operation-failures) for help.

Now the *Distiller* entity type and its mappings are complete. 

## Add other entity types

Now that the *Distiller* entity type is created, it's time to populate the ontology with the remaining entity types from the source data: *Condenser*, *Reboiler*, *Process*, *Technician*, and *MaintenanceRequest*. The entity type creation steps are similar to the steps for the *Distiller* entity type, but the property specifics differ for each entity type.

### Condenser

To create the *Condenser* entity type:
1. In the semantic canvas, select **Add entity** from the ribbon. Using the *Equipment* system type, create an entity type named *Condenser*.

    :::image type="content" source="media/tutorial/condenser-entity-type.png" alt-text="Screenshot of selecting the Equipment entity type for the condenser.":::

1. In the **Mappings** tab of the new entity type, select **Add data**. There are two mappings for this entity type: one non-timeseries mapping and one timeseries mapping.
1. Create the following mappings. Remember that all source tables are in your tutorial workspace and the *GettingStartedRawData* lakehouse.

    | Source table | Filter (case-sensitive) | Property type | Link/Unique ID | Mapped properties | Save and run notes |
    |---|---|---|---|---|---|
    | *assetdata* | Where *Name Contains condenser* | Non-timeseries properties | **Unique Id:** ID | - Map **Name** as **DisplayName** <br>- Leave **Manufacturer** and **SerialNumber** unmapped <br>- Map **ID** as *CondenserId* <br>- Map **SiteId** as *SiteId* <br>- Map **CoolingMedium** as *CoolingMedium* <br>- Map **InstallationDate** as *InstallationDate* | After the mapping is created and saved, go to the **Scheduling** tab and run it, then verify its completion in the **Manage operations** tab. <br><br>You must run this non-timeseries mapping before creating the following timeseries mapping. |
    | *timeseries* | Where *assetId Contains C* | Timeseries properties | **Link entity property:** CondenserId <br><br>**Link timeseries column:** assetId | - Map **sourceTimestamp** as **Timestamp** (*Required, case-sensitive*) <br>- Map **Pressure** as *Pressure* <br>- Map **Power** as *Power* <br>- Map **InletTemperature** as *Temperature* | Make sure incremental mapping is enabled, then save your mapping. Go to the **Scheduling** tab and run it. |

1. When you're finished mapping the *Condenser*, it should look like this:

    :::image type="content" source="media/tutorial/condenser-entity.png" alt-text="Screenshot of the Condenser entity type.":::

### Reboiler

To create the *Reboiler* entity type:
1. In the semantic canvas, select **Add entity** from the ribbon. Using the *Equipment* system type, create an entity type named *Reboiler*.
1. In the **Mappings** tab of the new entity type, select **Add data**. There are two mappings for this entity type: one non-timeseries mapping and one timeseries mapping.
1. Create the following mappings:

    | Source table | Filter (case-sensitive) | Property type | Link/Unique ID | Mapped properties | Save and run notes |
    |---|---|---|---|---|---|
    | *assetdata* | Where *Name Contains reboiler* | Non-timeseries properties | **Unique Id:** ID | - Map **Name** as **DisplayName** <br>- Leave **Manufacturer** and **SerialNumber** unmapped <br>- Map **ID** as *ReboilerId* <br>- Map **SiteId** as *SiteId* |  After the mapping is created and saved, go to the **Scheduling** tab and run it, then verify its completion in the **Manage operations** tab. <br><br>You must run this non-timeseries mapping before creating the following timeseries mapping. |
    | *timeseries* | Where *assetId Contains R* | Timeseries properties | **Link entity property:** ReboilerId <br><br>**Link timeseries column:** assetId | - Map **sourceTimestamp** as **Timestamp** (*Required, case-sensitive*) <br>- Map **Pressure** as *Pressure* <br>- Map **InletTemperature** as *InletTemperature* <br>- Map **OutletTemperature** as *OutletTemperature* | Make sure incremental mapping is enabled, then save your mapping. Go to the **Scheduling** tab and run it. |

1. When you're finished mapping the *Reboiler*, it should look like this:

    :::image type="content" source="media/tutorial/reboiler-entity.png" alt-text="Screenshot of the Reboiler entity type.":::

### Process

To create the *Process* entity type:
1. In the semantic canvas, select **Add entity** from the ribbon. Using the *Process* system type, create an entity type named *Process*.
1. In the **Mappings** tab of the new entity, select **Add data**. There's one non-timeseries mapping for this entity type.
1. Create the following mapping:

    | Source table | Filter (case-sensitive) | Property type | Link/Unique ID | Mapped properties | Save and run notes |
    |---|---|---|---|---|---|
    | *processdata* | None | Non-timeseries properties | **Unique Id:** processId | - Leave **DisplayName** and **Type** unmapped <br>- Map **siteName** as *siteName* <br>- Map **processId** as *processId* <br>- Map **siteId** as *SiteId* | After the mapping is created and saved, go to the **Scheduling** tab and run it. |

1. When you're finished mapping the *Process*, it should look like this:

    :::image type="content" source="media/tutorial/process-entity.png" alt-text="Screenshot of the Process entity type.":::

### Technician

To create the *Technician* entity type:
1. In the semantic canvas, select **Add entity** from the ribbon. Using the *Generic* system type, create an entity type named *Technician*.
1. In the **Mappings** tab of the new entity, select **Add data**. There's one non-timeseries mapping for this entity type.
1. Create the following mappings:

    | Source table | Filter (case-sensitive) | Property type | Link/Unique ID | Mapped properties | Save and run notes |
    |---|---|---|---|---|---|
    | *technicians* | None | Non-timeseries properties | **Unique Id:** Id | - Map **name** as **DisplayName** <br>- Map **email** as *Email* <br>- Map **Id** as *TechnicianId* | After the mapping is created and saved, go to the **Scheduling** tab and run it. |
1. When you're finished mapping the *Technician*, it should look like this:

    :::image type="content" source="media/tutorial/technician-entity.png" alt-text="Screenshot of the Technician entity type.":::

### MaintenanceRequest

To create the *MaintenanceRequest* entity type:
1. In the semantic canvas, select **Add entity** from the ribbon. Using the *Generic* system type, create an entity type named *MaintenanceRequest*.
2. In the **Mappings** tab of the new entity, select **Add data**. There's one non-timeseries mapping for this entity type.
1. Create the following mappings:

    | Source table | Filter (case-sensitive) | Property type | Link/Unique ID | Mapped properties | Save and run notes |
    |---|---|---|---|---|---|
    | *maintenancerequests* | None | Non-timeseries properties | **Unique Id:** WorkorderId | - Leave the **DisplayName** property unmapped. <br>- Map **EquipmentId** as *EquipmentId* <br>- Map **Site** as *SiteId* <br>- Map **Status** as *Status* <br>- Map **TechnicianId** as *TechnicianId* <br>- Map **WorkorderId** as *WorkOrderId* |  After the mapping is created and saved, go to the **Scheduling** tab and run it. |
1. When you're finished mapping the *MaintenanceRequest*, it should look like this:

    :::image type="content" source="media/tutorial/maintenance-request-entity.png" alt-text="Screenshot of the Maintenance Request entity type.":::

Now all the entity types are created. Your semantic canvas should contain the following six entity types: *Distiller*, *Condenser*, *Reboiler*, *Process*, *Technician*, and *MaintenanceRequest*.

## Check the status of your mappings

Now that all the entity type mappings are added, check the status of the mapping operations to verify that they completed successfully.

Select the **Manage operations** button.

:::image type="content" source="media/tutorial/manage-operations.png" alt-text="Screenshot of the Manage operations button."::: 

The **Manage operations** tab shows a list of your operations alongside their status. You can use this page to know when all your mapping operations are successfully completed.

:::image type="content" source="media/tutorial/manage-operations-tab.png" alt-text="Screenshot of the Manage operations tab."::: 

Wait for all mappings to complete before you move on to the next part of the tutorial.

>[!TIP]
>If you see a status of **Failed** for a mapping job, try rerunning it. If you continue to experience issues, see [Troubleshooting digital twin builder (preview)](resources-troubleshooting.md#troubleshoot-operation-failures) for help.

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 3: Define relationship types](tutorial-3-define-relationships.md)