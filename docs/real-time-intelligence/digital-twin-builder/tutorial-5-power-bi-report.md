---
title: 'Digital twin builder (preview) tutorial part 5: Create a Power BI report'
description: Build Power BI visuals with the data from digital twin builder (preview) tutorial. Part 5 of the digital twin builder (preview) tutorial.
author: baanders
ms.author: baanders
ms.date: 05/01/2025
ms.topic: tutorial
---

# Digital twin builder (preview) tutorial part 5: Create a Power BI report with digital twin builder data

In this step of the tutorial, create a Power BI report using the [Power BI desktop app](/power-bi/fundamentals/desktop-what-is-desktop) to visualize features of your digital twin builder (preview) ontology.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

You can create Power BI reports and dashboards with your digital twin builder ontology data by accessing the SQL endpoint of the lakehouse associated with your digital twin builder (preview) item. The SQL endpoint contains the [domain layer](../digital-twin-builder/concept-modeling.md) of data, which exposes a set of views that directly reflect the logical structure and relationship types defined in the domain ontology. You can use that domain layer as a data source for Power BI, which allows you to select entity types and entity type properties for use in reports.

In this tutorial step, import digital twin builder domain layer data from the SQL endpoint to a new report in Power BI Desktop. Then, create a report with two pages: one with time series data visuals for the *Condenser* entity instances, and one that showcases relationship instances between *MaintenanceRequest* entity instances and their associated *Distiller* and *Technician* entity instances.

## Create Power BI report and import data

In this section, access your digital twin builder (preview) data through the domain layer in SQL, and import it into a new Power BI report.

1. In Fabric, open the SQL analytics endpoint for the lakehouse associated with your digital twin builder item. The SQL endpoint has the same name as your digital twin builder item with a *dtdm* extension, so for this tutorial it's called *TutorialDTBdtdm*.

    :::image type="content" source="media/tutorial/sql-endpoint.png" alt-text="Screenshot of selecting the SQL endpoint.":::
1. In the SQL endpoint explorer, select the settings icon (shaped like a gear) from the left side of the ribbon across the top, and open the **SQL endpoint** tab.

    Copy the **SQL connection string** and the name of the SQL endpoint, *TutorialDTBdtdm*. You need these values to connect to the SQL endpoint in Power BI Desktop.

    :::image type="content" source="media/tutorial/sql-copy.png" alt-text="Screenshot of copying the SQL values.":::

1. Open the Power BI Desktop app on your machine, and sign in with your Microsoft Entra ID. Make sure to select **Microsoft account** for the credential type.

    :::image type="content" source="media/tutorial/power-bi-sign-in.png" alt-text="Screenshot of signing into Power BI with your Microsoft account.":::

    >[!NOTE]
    >Troubleshooting: If you can't sign in or receive a permission error, try clearing out any prior data source permissions. To clear your permissions, open the **File** menu and select **Options and settings**, then select **Data source settings**. From the data source settings, you can clear any prior permissions. Then, retry signing in with your Microsoft Entra ID.
    >
    >:::image type="content" source="media/tutorial/power-bi-data-source-settings.png" alt-text="Screenshot showing the data source settings in Power BI.":::

1. Once you're signed into Power BI Desktop, select the **SQL Server** data source to start configuring the connection.

    :::image type="content" source="media/tutorial/power-bi-data-source.png" alt-text="Screenshot of selecting the SQL Server data source.":::

1. In the **Server** field, paste the SQL connection string. In the **Database** field, paste the SQL endpoint name. Select **Import** and then **OK**.

    :::image type="content" source="media/tutorial/power-bi-connect.png" alt-text="Screenshot of entering the SQL values in Power BI Desktop." lightbox="media/tutorial/power-bi-connect.png":::

1. In the **Navigator** pane that opens, select these tables: **dom.Condenser_property**, **dom.Condenser_timeseries**, **dom.Distiller_property**, **dom.MaintenanceRequest_property**, **dom.relationships**, and **dom.Technician_property**. Then select **Load**. This action creates connections to your lakehouse SQL endpoint.

    :::image type="content" source="media/tutorial/power-bi-navigator.png" alt-text="Screenshot of selecting the properties in the Navigator." lightbox="media/tutorial/power-bi-navigator-crop.png":::

1. Back in the main Power BI Desktop view, you see the **Data** pane populate with all the tables you imported.

    :::image type="content" source="media/tutorial/power-bi-data-loaded.png" alt-text="Screenshot showing the tables in the data section." lightbox="media/tutorial/power-bi-data-loaded.png":::

Use the **Save** icon in the top left to save your progress so far as a *.pbix* file on your machine.

## Prepare data with unique ID columns

Next, prepare the data for visualization by creating a unique ID column for each data table. 

Remember that digital twin builder (preview) creates a unique ID for each entity instance by using both the *EntityInstanceId1* and *EntityInstanceId2* values together. In this section, you simulate this behavior in the Power BI report by creating a combined `UID` column in each table that concatenates the two values, making the data easier to work with later.

1. Using the view icons on the left side of the screen, select the **Table view**. Open the *dom Condenser_property* table.

    :::image type="content" source="media/tutorial/power-bi-id-1.png" alt-text="Screenshot of the table view of the property table." lightbox="media/tutorial/power-bi-id-1.png":::

1. Select **New column**, and enter the following column formula: 

    `UID = CONCATENATE('dom Condenser_property'[EntityInstanceId1], 'dom Condenser_property'[EntityInstanceId2])`

    Save your formula with the check mark. This action adds your new column to the table.

    :::image type="content" source="media/tutorial/power-bi-id-2.png" alt-text="Screenshot of the table view with the new column." lightbox="media/tutorial/power-bi-id-2.png":::

1. Create similar new columns for the remaining tables, using these formulas.

    | Table | New column formula(s) |
    | --- | --- |
    | *dom Condenser_timeseries* | `UID = CONCATENATE('dom Condenser_timeseries'[EntityInstanceId1], 'dom Condenser_timeseries'[EntityInstanceId2])` |
    | *dom Distiller_property* | `UID = CONCATENATE('dom Distiller_property'[EntityInstanceId1], 'dom Distiller_property'[EntityInstanceId2])` |
    | *dom MaintenanceRequest_property* | `UID = CONCATENATE('dom MaintenanceRequest_property'[EntityInstanceId1], 'dom MaintenanceRequest_property'[EntityInstanceId2])` |
    | *dom relationships* <br>(two new columns) | `SourceUID = CONCATENATE('dom relationships'[FirstEntityInstanceId1],'dom relationships'[FirstEntityInstanceId2])` <br><br> `TargetUID = CONCATENATE('dom relationships'[SecondEntityInstanceId1],'dom relationships'[SecondEntityInstanceId2])`|
    | *dom Technician_property* | `UID = CONCATENATE('dom Technician_property'[EntityInstanceId1], 'dom Technician_property'[EntityInstanceId2])` |

1. Save the report and return to the **Report view**.

    :::image type="content" source="media/tutorial/power-bi-id-3.png" alt-text="Screenshot of the report view.":::

## Create page 1: Condenser time series data

The report defaults to **Page 1** in the tabs across the bottom. In this section, you fill Page 1 with visuals for the *Condenser* time series data.

### Create relationships

First, relate the *Condenser* property and time series tables together so that they're properly linked in visualizations.

1. From the top ribbon, select **Modeling**, followed by **Manage relationships** and **New relationship**.

    :::image type="content" source="media/tutorial/power-bi-new-relationship.png" alt-text="Screenshot of the New relationship button in Power BI.":::

1. In the **From table**, select *dom Condenser_property* and select the `UID` column that you created. In the **To table**, select *dom Condenser_timeseries* and also select the `UID` column.

    For **Cardinality**, keep the selections for _One to many (1:*)_ and a *Single* direction. Check the box for **Make this relationship active** and select **Save**.

    :::image type="content" source="media/tutorial/power-bi-new-relationship-condensers.png" alt-text="Screenshot of relating the Condenser property and Condenser time series tables in Power BI.":::

1. Select **Close** to close the **Manage relationships** modal.

1. Save your report.

### Add visual for name filter

Next, add visuals to the report. The first visual is a filter based on the condenser's name. 
1. From the **Visualizations** pane, select **Build visual**. Choose the **Slicer** icon from the visualization menu.

    :::image type="content" source="media/tutorial/power-bi-visual-slicer.png" alt-text="Screenshot showing the Slicer visual.":::

1. In the **Data** pane, select *dom Condenser_property* > **DisplayName**. 
1. Change the slicer style to a dropdown menu by switching the **Visualizations** pane to the **Format visual** tab, expanding **Slicer settings > Options**, and selecting *Dropdown*.

    Resize and reposition the visual as needed so that it looks the way you want.

    :::image type="content" source="media/tutorial/power-bi-visual-slicer-name.png" alt-text="Screenshot showing the display name slicer visual." lightbox="media/tutorial/power-bi-visual-slicer-name.png":::
1. Select any blank spot in the report canvas to deselect the slicer before moving on to the next visual.

### Add visual for time filter

Next, add a filter for time. 
1. From the **Visualizations** pane, return to the **Build visual** tab and choose another **Slicer** visualization. 
1. In the **Data** pane, select *dom Condenser_timeseries* > **Timestamp**.

    Resize and reposition the visual as needed.

    :::image type="content" source="media/tutorial/power-bi-visual-slicer-timestamp.png" alt-text="Screenshot showing the timestamp slicer visual." lightbox="media/tutorial/power-bi-visual-slicer-timestamp.png":::
1. Select any blank spot in the report canvas to deselect the slicer before moving on to the next visual.

### Add visual for time series chart

Finally, add a time series visualization. 
1. From the **Visualizations** pane's **Build visual** tab, choose a **Line chart** visual.

1. For the **X-axis**, drag over *dom Condenser_timeseries* > **Timestamp**. 

1. For the **Y-axis**, drag over *dom Condenser_timeseries* > **Pressure**. Use the down arrow next to the field to change *Sum of Pressure* to *Average of Pressure*.

    Resize and reposition the visual so that it looks the way you want.

    :::image type="content" source="media/tutorial/power-bi-visual-timeseries.png" alt-text="Screenshot showing the time series visual." lightbox="media/tutorial/power-bi-visual-timeseries.png":::
1. Save your report.

Now, you have a basic report with which you can interact and explore time series data for the *Condenser* entity instances. You can verify it works by selecting a condenser from the dropdown menu, and changing the date and time values. Experiment with different selections in the **DisplayName** and **Timestamp** slicers and observe how the time series visual changes.

## Create page 2: Maintenance requests, related to distiller and technician data

In this section, you add a page to the report for visuals illustrating *MaintenanceRequest* entity instances and their relationships.

Recall from part three of the tutorial, [Define semantic relationship types between entity types](tutorial-3-define-relationships.md), that *MaintenanceRequest* entity types are related to *Distiller* and *Technician* entity types. A *Distiller has MaintenanceRequest* and a *Technician performs MaintenanceRequest*.

:::image type="content" source="media/tutorial/maintenance-request-relationships.png" alt-text="Screenshot showing the relationship types for the Maintenance Request entity type." lightbox="media/tutorial/maintenance-request-relationships-crop.png":::

The visuals on Page 2 reflect instances of these relationship types.

Select **+** at the bottom of the report to create the new page. 

:::image type="content" source="media/tutorial/power-bi-new-page.png" alt-text="Screenshot showing the New page button.":::

### Create relationships

First, indicate how the *relationships* table connects to the *Distiller*, *Technician*, and *MaintenanceRequest* property tables, so that they're properly linked in visualizations.

The *relationships* table holds information about each relationship instance, including its source entity instance and target entity instance. You can reference these entity instances with the `SourceUID` and `TargetUID` columns that you created [earlier](#prepare-data-with-unique-id-columns). You need to create a Power BI relationship between those columns and the `UID`s in each of the *dom Distiller_property*, *dom Technician_property*, and *dom MaintenanceRequest_property* tables, so that the ontology relationship instances are properly linked to their source and target entity instances.

1. From the top ribbon of Power BI, select **Modeling**, followed by **Manage relationships** and **New relationship**.

    :::image type="content" source="media/tutorial/power-bi-new-relationship.png" alt-text="Screenshot of the New relationship button in Power BI.":::
1. The first Power BI relationship you make indicates that some ontology relationship instances have *Distiller* entity instances as their source. 

    In the **From table**, select *dom relationships*, and select the `SourceUID` column. In the **To table**, select *dom Distiller_property*, and select the `UID` column.

    For **Cardinality**, choose _Many to one (*:1)_. Set the **Cross-filter direction** to *Both*. Check the box for **Make this relationship active** and select **Save**.

    :::image type="content" source="media/tutorial/power-bi-new-relationship-distiller.png" alt-text="Screenshot of relating the relationships and Distiller property tables in Power BI.":::
1. Select **New relationship** again to create another relationship. The next Power BI relationship indicates that some ontology relationship instances have *Technician* entity instances as their source.

    In the **From table**, select *dom relationships*, and select the `SourceUID` column. In the **To table**, select *dom Technician_property*, and select the `UID` column.

    For **Cardinality**, choose _Many to one (*:1)_. Set the **Cross-filter direction** to *Both*. Check the box for **Make this relationship active** and select **Save**.

    :::image type="content" source="media/tutorial/power-bi-new-relationship-technician.png" alt-text="Screenshot of relating the relationships and Technician property tables in Power BI.":::
1. Select **New relationship** again to create another relationship. The next Power BI relationship indicates that some ontology relationship instances have *MaintenanceRequest* entity instances as their target.

    In the **From table**, select *dom relationships*, and select the `TargetUID` column. In the **To table**, select *dom MaintenanceRequest_property*, and select the `UID` column.

    For **Cardinality**, choose _Many to one (*:1)_. Set the **Cross-filter direction** to *Both*. Check the box for **Make this relationship active** and select **Save**.

    :::image type="content" source="media/tutorial/power-bi-new-relationship-maintenance-request.png" alt-text="Screenshot of relating the relationships and Maintenance request property tables in Power BI.":::

1. Select **Close** to close the **Manage relationships** modal.

1. Save your report.

### Add visual for relationships list

Next, add visuals to this page. The first visual on Page 2 lists all the relationship types in the *relationships* table. 
1. From the **Visualizations** pane, choose a **Table** visual.
1. In the **Data** pane, expand *dom relationships* and select **RelationshipName**, **SourceEntityType**, and **TargetEntityType**.

    Resize and reposition the visual as needed.

    :::image type="content" source="media/tutorial/power-bi-visual-relationships-table.png" alt-text="Screenshot showing the relationships table visual." lightbox="media/tutorial/power-bi-visual-relationships-table.png":::
1. Select any blank spot in the report canvas to deselect the table before moving on to the next visual.

### Add distiller filter

Next, add a filter based on the distiller's name.
1. From the **Visualizations** pane, choose a **Slicer** visual.
1. In the **Data** pane, select *dom Distiller_property* > **DisplayName**.

    Resize and reposition the visual as needed.

    :::image type="content" source="media/tutorial/power-bi-visual-relationships-distiller.png" alt-text="Screenshot showing the relationships Distiller slicer." lightbox="media/tutorial/power-bi-visual-relationships-distiller.png":::
1. Select any blank spot in the report canvas to deselect the slicer before moving on to the next visual.

### Add technician filter

Next, add a filter based on the technician's name.
1. From the **Visualizations** pane, choose a **Slicer** visual.
1. In the **Data** pane, select *dom Technician_property* > **DisplayName**.

    Resize and reposition the visual as needed.

    :::image type="content" source="media/tutorial/power-bi-visual-relationships-technician.png" alt-text="Screenshot showing the relationships Technician slicer." lightbox="media/tutorial/power-bi-visual-relationships-technician.png":::
1. Select any blank spot in the report canvas to deselect the slicer before moving on to the next visual.

#### Add technician data

Next, add a table that shows technician contact information, filterable by the technician slicer.
1. From the **Visualizations** pane, choose a **Table** visual.
1. In the **Data** pane, expand *dom Technician_property* and select **DisplayName**, **Email**, and **TechnicianId**.

    Resize and reposition the visual as needed.

    :::image type="content" source="media/tutorial/power-bi-visual-relationships-technician-2.png" alt-text="Screenshot showing the technician data table." lightbox="media/tutorial/power-bi-visual-relationships-technician-2.png":::
1. Select any blank spot in the report canvas to deselect the table before moving on to the next visual.

### Add visual for maintenance requests

Finally, add a table that shows maintenance requests, filterable by the distiller and technician slicers.
1. From the **Visualizations** pane, choose a **Table** visual.
1. In the **Data** pane, expand *dom MaintenanceRequest_property* and select **EquipmentId**, **SiteId**, **Status**, and **TechnicianId**.

    Resize and reposition the visual as needed.

    :::image type="content" source="media/tutorial/power-bi-visual-relationships-maintenance-request.png" alt-text="Screenshot showing the maintenance request table visual." lightbox="media/tutorial/power-bi-visual-relationships-maintenance-request.png":::

Now, you have a second page of the report where you can interact with maintenance request entity instances, based on their relationship instances with distillers and technicians. 

Experiment with selecting different distillers and technicians from the slicers, and observe how the tables update. The slicers allow you to see all the maintenance requests that are associated with a particular distiller, or assigned to a particular technician.

:::image type="content" source="media/tutorial/power-bi-visual-relationships-final-1.png" alt-text="Screenshot showing the report filtered by distiller." lightbox="media/tutorial/power-bi-visual-relationships-final-1.png":::

:::image type="content" source="media/tutorial/power-bi-visual-relationships-final-2.png" alt-text="Screenshot showing the report filtered by technician." lightbox="media/tutorial/power-bi-visual-relationships-final-2.png":::

## Conclusion

Now you have a Power BI report with two pages, each showing a different type of data for Contoso, Ltd. If you want to share your report with others, you can publish the report from Power BI Desktop to your Fabric workspace. Once a report is in your Fabric workspace, it's available to share.

In the tutorial scenario, the fictional Contoso, Ltd. company can use and continue to expand on this report to relate data from multiple sources, and make data-driven decisions across sites.

This Power BI report completes the tutorial of creating a digital twin builder solution for Contoso, Ltd.

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 6: Clean up resources](tutorial-6-clean-up-resources.md)