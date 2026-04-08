---
title: Add Business Events Destination to Eventstream
description: Business Events destination in Fabric eventstreams enables real-time notifications and automated workflows. This article provides step-by-step instructions. 
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 04/08/2026
ms.topic: how-to
---

# Add a Business Events destination to an eventstream 

Business Events in Microsoft Fabric empowers organizations to define, explore, and consume events from business applications. By using this feature, you can develop event-driven applications that deliver real-time notifications, trigger alerts, and automate downstream workflows. This article shows you how to add a Business Events destination to an eventstream in Microsoft Fabric.

## Prerequisites 

- Access to a workspace in the Microsoft Fabric capacity license mode or the Trial license mode with Contributor or higher permissions. 

- If you plan to use an existing Business event type, access to the workspace where the Event schema set with the Business event type is located, with Viewer or higher permissions. 

## Add business events as a destination 

Add business events as a destination to your event stream by following these steps: 

1.  Open your event stream and switch to **Edit** mode. Select **Add destination** on the ribbon, and select **Business events** from the dropdown list. 

    :::image type="content" source="media/add-destination-business-events/add-destination-business-events-ribbon-dropdown.png" alt-text="Screenshot of the Add destination dropdown menu with Business events highlighted, and the eventstream canvas showing Bicycles source connected to a businessEvents destination." lightbox="media/add-destination-business-events/add-destination-business-events-ribbon-dropdown.png":::

    You can also select **Transform events or add destination** tile on the canvas and select **Business Events** from the dropdown list. 

    :::image type="content" source="media/add-destination-business-events/transform-events-tile-business-events-selection.png" alt-text="Screenshot of the Transform events or add destination dropdown with Business events highlighted in the destination list." lightbox="media/add-destination-business-events/transform-events-tile-business-events-selection.png":::

1.  Enter a **Destination name** for the Business Events destination.  

1.  For the Business events type, choose one of the following options:  

    1.  Select an existing Business events type: 

        :::image type="content" source="media/add-destination-business-events/select-business-event-type-dropdown.png" alt-text="Screenshot of Business Events destination configuration with the Business event type Select button highlighted." lightbox="media/add-destination-business-events/select-business-event-type-dropdown.png":::

        After selecting a specific business event, review the Event Schema selection, and then select **Choose** to continue: 

        :::image type="content" source="media/add-destination-business-events/select-business-event-schema-review.png" alt-text="Screenshot of the Select a business event dialog with a business event row highlighted and the Event Schema panel displaying field types on the right." lightbox="media/add-destination-business-events/select-business-event-schema-review.png":::

    1.  Create a new Business Events topic and event type directly: 

        :::image type="content" source="media/add-destination-business-events/business-events-create-new-event-type.png" alt-text="Screenshot of the Business Events configuration panel with the Create new link highlighted under Business event type." lightbox="media/add-destination-business-events/business-events-create-new-event-type.png":::

        Select a workspace to host the Event schema set with the business event type, select an existing Event schema set or create a new one, and then specify the name and description of the event schema. Define the schema by adding fields or uploading a schema, review the configuration, and confirm your selections: 

        :::image type="content" source="media/add-destination-business-events/define-business-event-schema-fields.png" alt-text="Screenshot of the Define your business event schema page showing fields for name, description, compatibility, and a schema table with string, int, long, float, and double field types." lightbox="media/add-destination-business-events/define-business-event-schema-fields.png":::

1.  Select input data format. Currently, only JSON is supported. 

1.  Save the destination configuration. 

    :::image type="content" source="media/add-destination-business-events/business-events-destination-schema-json-format.png" alt-text="Screenshot of the Business Events destination configuration with schema, JSON input data format, and Save button." lightbox="media/add-destination-business-events/business-events-destination-schema-json-format.png":::

1.  If the event stream schema doesn't match the selected Business Event schema, you need to configure schema mapping before publishing: 

    1.  Select **Add** on your business events node or select **Insert a mapper** in the **Authoring errors** pane. 

        :::image type="content" source="media/add-destination-business-events/eventstream-business-events-schema-mismatch-mapper.png" alt-text="Screenshot of the eventstream editor showing a schema mismatch error with the Add button on the BusinessEvents node and Insert a mapper link in the Authoring errors pane highlighted." lightbox="media/add-destination-business-events/eventstream-business-events-schema-mismatch-mapper.png":::

    1.  In the **Map schema** dialog, map each source field to the corresponding destination field. Ensure that the data types are compatible between the source and destination fields. For example, you can map the BikepointID field, which is of type String, to a String field in the destination schema.  

        To apply advanced field transformations, add a **Manage field** operator. This operator can use built-in functions when no suitable source field is available to map to the destination field in the mapper wizard.  

        :::image type="content" source="media/add-destination-business-events/map-schema-source-field-name-dropdown.png" alt-text="Screenshot of the Map schema dialog with the source field name drop-down list expanded, showing available fields like BikepointID, Street, Neighbourhood, Latitude, and Longitude." lightbox="media/add-destination-business-events/map-schema-source-field-name-dropdown.png":::

1.  If the input event schema produced by your event stream already matches the selected Business Event schema, no schema mapping is required. You can proceed to the next step.  

1.  After selecting **Finish**, a **Mapper** node appears on the canvas, indicating that schema mapping is defined. 

    :::image type="content" source="media/add-destination-business-events/mapper-node-canvas-schema-mapping.png" alt-text="Screenshot of the eventstream canvas showing Bicycles source, businessEvents node, Mapper node with field mappings, and BusinessEvents destination." lightbox="media/add-destination-business-events/mapper-node-canvas-schema-mapping.png":::

    > [!NOTE]
    > To update the mapping, select the edit button on the **Mapper** node. Once selected, it opens the right pane to allow you to update each defined field.

1.  To implement the newly added business events destination, select **Publish**. 

    :::image type="content" source="media/add-destination-business-events/completed-eventstream-publish-button-highlighted.png" alt-text="Screenshot of the completed eventstream showing Bicycles source, businessEvents, Mapper node with field mappings, and BusinessEvents destination, with Publish button highlighted." lightbox="media/add-destination-business-events/completed-eventstream-publish-button-highlighted.png":::


1. After you complete these steps, the Business Events destination is available for visualization in Live view. 

:::image type="content" source="media/add-destination-business-events/published-eventstream-business-events-destination.png" alt-text="Screenshot of the eventstream in Live view with Bicycles source connected through a mapper to an active Business Events destination, with Details pane below." lightbox="media/add-destination-business-events/published-eventstream-business-events-destination.png":::

 
## Limitations 

- You can't create the Business Events destination through the REST API. 

- The Business Events destination doesn't support CI/CD features, including Git Integration and Deployment Pipeline. Attempting to export or import an Eventstream item with this destination to a Git repository might result in errors. 

- You can't add the Business Events destination directly after an SQL Code (custom code) node.