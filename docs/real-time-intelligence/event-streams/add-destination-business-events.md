---
title: Add Business Events Destination to Eventstream
description: Business events destination in Fabric eventstreams enables real-time notifications and automated workflows. This article provides step-by-step instructions. 
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 04/08/2026
ms.topic: how-to
---

# Add a business events destination to a Fabric eventstream 

Business events in Microsoft Fabric empower organizations to define, explore, and consume events from business applications. By using this feature, you can develop event-driven applications that deliver real-time notifications, trigger alerts, and automate downstream workflows. This article shows you how to add a business events destination to an eventstream in Microsoft Fabric.

## Prerequisites 

- Access to a workspace in the Microsoft Fabric capacity license mode or the Trial license mode with Contributor or higher permissions. 

- If you plan to use an existing business event type, access to the workspace where the event schema set with the business event type is located, with viewer or higher permissions. 

## Add business events as a destination 

Add a business events destination to your eventstream by following these steps: 

1. Open your eventstream and switch to **Edit** mode. Select **Add destination** on the ribbon, and select **Business events** from the dropdown list. 

    :::image type="content" source="media/add-destination-business-events/add-destination-business-events-ribbon-dropdown.png" alt-text="Screenshot of the Add destination dropdown menu with Business events highlighted, and the eventstream canvas showing Bicycles source connected to a businessEvents destination." lightbox="media/add-destination-business-events/add-destination-business-events-ribbon-dropdown.png":::

    You can also select **Transform events or add destination** tile on the canvas and select **Business events** from the dropdown list. 

    :::image type="content" source="media/add-destination-business-events/transform-events-tile-business-events-selection.png" alt-text="Screenshot of the Transform events or add destination dropdown with Business events highlighted in the destination list." lightbox="media/add-destination-business-events/transform-events-tile-business-events-selection.png":::

1.  Enter a **Destination name** for the **Business events** destination.  

1.  For the business events type, choose one of the following options:  

    - Select an existing business events type: 

        :::image type="content" source="media/add-destination-business-events/select-business-event-type-dropdown.png" alt-text="Screenshot of Business events destination configuration with the Business event type Select button highlighted." lightbox="media/add-destination-business-events/select-business-event-type-dropdown.png":::

        After selecting a specific business event, review the event schema selection, and then select **Choose** to continue: 

        :::image type="content" source="media/add-destination-business-events/select-business-event-schema-review.png" alt-text="Screenshot of the Select a business event dialog with a business event row highlighted and the Event Schema panel displaying field types." lightbox="media/add-destination-business-events/select-business-event-schema-review.png":::

    - Create a new business events topic and event schema: 

        :::image type="content" source="media/add-destination-business-events/business-events-create-new-event-type.png" alt-text="Screenshot of the Business events configuration panel with the Create new link highlighted under Business event type." lightbox="media/add-destination-business-events/business-events-create-new-event-type.png":::

        1. On the **Define business page**, follow these steps:
            1. Specify the **name** and **description** of the event schema. 
            1. Select **Add row** to add fields to the event schema. For each field, specify data type, name, and description. Repeat this step until you added all the necessary fields to your event schema.
            1. In the right pane, select a **workspace** to host the event schema set with the business event type.
            1. Select an existing **event schema set** or create a new one.
            1. Specify a name for the schema set if you're creating a new one.
            1. Select **Next** to continue.
        
                :::image type="content" source="media/add-destination-business-events/define-business-event-schema-fields.png" alt-text="Screenshot of the Define your business event schema page showing fields." lightbox="media/add-destination-business-events/define-business-event-schema-fields.png":::
        1. On the **Review and create** page, review the business event schema details you provided. If you need to make any changes, select **Back** to return to the previous page and update the information. If everything looks correct, select **Create** to create the business event schema and continue with the destination configuration. 

1.  Select **input data format**. Currently, only **JSON** is supported. 

1.  **Save** the destination configuration. 

    :::image type="content" source="media/add-destination-business-events/business-events-destination-schema-json-format.png" alt-text="Screenshot of the Business events destination configuration with schema, JSON input data format, and Save button." lightbox="media/add-destination-business-events/business-events-destination-schema-json-format.png":::

1.  If the eventstream schema doesn't match the selected business event schema, you need to configure schema mapping before publishing the eventstream. If the input event schema produced by your eventstream already matches the selected business event schema, no schema mapping is required. You can proceed to the next step.

    1.  Select **Add** on your business events tile or select **Insert a mapper** in the **Authoring errors** pane. 

        :::image type="content" source="media/add-destination-business-events/business-events-schema-mismatch-mapper.png" alt-text="Screenshot of the eventstream editor showing a schema mismatch error with the Add button on the Business events node and Insert a mapper link in the Authoring errors pane highlighted." lightbox="media/add-destination-business-events/business-events-schema-mismatch-mapper.png":::

    1.  In the **Map schema** dialog, map each source field to the corresponding destination field. Ensure that the data types are compatible between the source and destination fields. For example, you can map the BikepointID field, which is of type String, to a String field in the destination schema.  

        To apply advanced field transformations, add a **Manage field** operator. This operator can use built-in functions when no suitable source field is available to map to the destination field in the mapper wizard.  

        :::image type="content" source="media/add-destination-business-events/map-schema-source-field-name-dropdown.png" alt-text="Screenshot of the Map schema dialog with the source field name drop-down list expanded, showing available fields like BikepointID, Street, Neighborhood, Latitude, and Longitude." lightbox="media/add-destination-business-events/map-schema-source-field-name-dropdown.png":::

        > [!NOTE]
        > You can add a **Manage field** operator to apply advanced field transformations such as built-in functions, when no suitable source field is available to map to the destination field in the mapper wizard

1.  After selecting **Finish**, a **Mapper** node appears on the canvas, indicating that schema mapping is defined. 

    :::image type="content" source="media/add-destination-business-events/mapper-node-canvas-schema-mapping.png" alt-text="Screenshot of the eventstream canvas showing Bicycles source, businessEvents node, Mapper node with field mappings, and Business events destination." lightbox="media/add-destination-business-events/mapper-node-canvas-schema-mapping.png":::

    > [!NOTE]
    > To update the mapping, select the edit button on the **Mapper** node. Once selected, it opens the right pane to allow you to update each defined field.

1.  To implement the newly added business events destination, select **Publish**. 

    :::image type="content" source="media/add-destination-business-events/completed-publish-button-highlighted.png" alt-text="Screenshot of the completed eventstream showing Bicycles source, businessEvents, Mapper node with field mappings, and Business events destination, with Publish button highlighted." lightbox="media/add-destination-business-events/completed-publish-button-highlighted.png":::


1. After you complete these steps, the Business events destination is available for visualization in Live view. 

:::image type="content" source="media/add-destination-business-events/published-business-events-destination.png" alt-text="Screenshot of the eventstream in Live view." lightbox="media/add-destination-business-events/published-business-events-destination.png":::

 
## Limitations 

- You can't create the Business events destination through the REST API. 

- The Business events destination doesn't support CI/CD features, including Git Integration and Deployment Pipeline. Attempting to export or import an Eventstream item with this destination to a Git repository might result in errors. 

- You can't add the Business events destination directly after a SQL Code (custom code) node.