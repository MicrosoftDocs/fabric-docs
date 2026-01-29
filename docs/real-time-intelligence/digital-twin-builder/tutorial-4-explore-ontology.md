---
title: 'Digital twin builder (preview) tutorial part 4: Explore your ontology'
description: Search and explore the ontology from digital twin builder (preview) tutorial. Part 4 of the digital twin builder (preview) tutorial.
author: baanders
ms.author: baanders
ms.date: 07/01/2025
ms.topic: tutorial
---

# Digital twin builder (preview) tutorial part 4: Explore your ontology

Now that you have an ontology with entity types and relationship types, explore its data in this tutorial step.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Access the Explore mode

Select **Explore entity instances** from the menu ribbon to switch to the **Explore** mode. The view for this mode contains a search bar in the top right corner for entity type and keyword searches, and an **Advanced query** experience.

:::image type="content" source="media/tutorial/explore-selector.png" alt-text="Screenshot showing the view selector.":::

First, filter the assets by entity type.
1. Choose *Distiller* from the dropdown menu.
1. Observe that the result set contains all 10 instances of the *Distiller* entity type.

    :::image type="content" source="media/tutorial/search-1.png" alt-text="Screenshot showing first search result.":::

Next, search on display ID, which is a concatenation of the source columns that you chose during mapping.
1. With *Distiller* still selected from the dropdown menu, enter *D101* into the search bar.
1. Observe that the result set contains one entity instance with that name (*distiller D101*).

    :::image type="content" source="media/tutorial/search-2.png" alt-text="Screenshot showing second search result.":::

Next, try an advanced query, which lets you filter on multiple entity type properties.
1. Select the **Advanced query** button.
1. Select the *Condenser* entity type from the dropdown menu.
1. Add a filter for a cooling medium that's water-based. Under **Filters**, select *Cooling medium* as the property, leave *is* as the operator, and enter *Water* as the value.
1. Add another filter for the installation date. Select **Add filter**, which adds a new filter row automatically linked to the previous filter with the *and* operator. Select *InstallationDate* as the property, *starts with* as the operator, and *6/2/2018* as the value.
1. Select **Apply** to run your query.
1. Observe that the result only shows one condenser, which matches your filter criteria.

    :::image type="content" source="media/tutorial/advanced-query.png" alt-text="Screenshot showing advanced query result.":::

Keep this view open for the next step.

## View entity instance details and time series data

You can select an entity instance to view its details and any associated time series. As a result of your mappings so far in this tutorial, these entity types contain modeled properties and data values. 

First, view the details of an entity instance.
1. Select the condenser result card from your most recent query to open the **Details** view.
1. Observe that this view shows entity instance properties, like the site ID and cooling medium.

    :::image type="content" source="media/tutorial/condenser-details.png" alt-text="Screenshot showing the condenser details." lightbox="media/tutorial/condenser-details.png":::
1. Keep this view open for the next step.

View related time series charts.
1. Using the tabs on the top left corner of the page, switch from **Details** to **Charts**.
1. In the date range filters in the top right corner of the Charts tab, change the **Start date time** to *01/01/2025 12:00 AM* and the **End date time** to *01/12/2025 12:00 AM*.
1. Check the box next to the **Pressure** time series name to view its data in a time series chart.

    :::image type="content" source="media/tutorial/time-series-chart.png" alt-text="Screenshot showing the time series chart.":::

    >[!TIP]
    >If you don't see any time series data, rerun the *Condenser* time series mapping. You can check its status in the **Manage operations** page, accessible from the semantic canvas ribbon.
1. Select the **Pressure** and **Temperature** time series names together and visualize multiple data sets on the chart at the same time.
1. Experiment with changing the date range and toggling between different aggregation functions like average, min, and max.

## Deactivate entity type

Sometimes an entity type is misconfigured or no longer needed. In that case, entity types can be *deactivated*. Deactivating an entity type removes the entity type and its mapping configurations from the semantic canvas. It also removes entity instances and time series from the explorer. 

Enact that scenario now by removing the *Reboiler* entity type from your ontology.

1. Select **Home** in the top left corner to return to the semantic canvas. Select the **Reboiler** entity type to view it in the canvas.

    :::image type="content" source="media/tutorial/home-reboiler.png" alt-text="Screenshot showing the Reboiler entity type back in the Home tab.":::
1. Before you can deactivate an entity, you must delete its relationship types. Select the *isPartOf* relationship type in the semantic canvas to bring up the **Relationship configuration** pane, and select **Delete relationship**.

    :::image type="content" source="media/tutorial/delete-relationship.png" alt-text="Screenshot showing how to delete a relationship type.":::
1. After deleting the relationship type, you can deactivate the entity type. Hover over the **Reboiler** entity type and select the ellipses next to it. Select **Deactivate entity** from the menu, and confirm when prompted.

    :::image type="content" source="media/tutorial/deactivate-entity.png" alt-text="Screenshot showing how to deactivate an entity type.":::
1. The entity type disappears from the **Entities** list and is no longer visible in the semantic canvas.

    :::image type="content" source="media/tutorial/confirm-deactivate.png" alt-text="Screenshot showing that the Reboiler entity type is gone.":::

1. Switch to the **Explore** mode. Observe that you can no longer filter to the *Reboiler* entity type or search for them by name.

## View underlying data

The ontology data for a digital twin builder (preview) item is stored in a Fabric lakehouse associated with the digital twin builder item. In that lakehouse, you can view your ontology data through the *domain layer*, which is a set of views that directly reflect the logical structure and relationship types defined in the domain ontology. For more information about digital twin builder data storage, see [Modeling data in digital twin builder (preview) - Storage and access](concept-modeling.md#storage-and-access).

Follow these steps to view your domain data.

1. Go to your Fabric workspace and identify the SQL endpoint of the lakehouse associated with your digital twin builder item. The SQL endpoint has the same name as your digital twin builder item with a *dtdm* extension, so in this case it's called *TutorialDTBdtdm*.

    :::image type="content" source="media/tutorial/sql-endpoint.png" alt-text="Screenshot of selecting the SQL endpoint.":::

1. Select the SQL endpoint to go to the explorer page.

    In the navigation pane under **Schemas**, the **dbo** entry represents the base layer and the **dom** entry represents the domain layer. You need to use the *dom* layer to simplify creating Power BI reports, so expand **dom**.
    
    Underneath **dom**, open the **Views** section. Observe that each entity type in your digital twin builder is reflected as two views: *entityname_property* and *entityname_timeseries*. The **relationships** view captures all relationship instances.
    
    Within the rows of each entity type view, there are values for `EntityInstanceId1` and `EntityInstanceId2`. Together, these values form the unique ID of each entity instance.

    :::image type="content" source="media/tutorial/sql-dom.png" alt-text="Screenshot showing the dom view of the SQL data." lightbox="media/tutorial/sql-dom.png":::

1. Explore the views using the UI (or SQL queries) to check that the sample data is mapped correctly. Verify the following items: 
    1. Your mapped properties exist inside the views for their associated entity types, and have data mapped to them (except for fields that were left unmapped).
    1. Entity instances have no null values for the `EntityInstanceId1` and `EntityInstanceId2` columns.
    1. The *relationship* view contains relationship instance data, and there are no null values. Notice that each row references a relationship instance between a source entity instance (identified by the combination of `FirstEntityInstanceId1` and `FirstEntityInstanceId2`) and a target entity instance (identified by the combination of `SecondEntityInstanceId1` and `SecondEntityInstanceId2`).
    1. There's no view for *Reboiler_property* or *Reboiler_timeseries*, since you deactivated the *Reboiler* entity type.

Now that you've explored the structure of the digital twin builder data, you're ready to use that data in a Power BI report. 

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 5: Create a Power BI report with digital twin builder (preview) data](tutorial-5-power-bi-report.md)