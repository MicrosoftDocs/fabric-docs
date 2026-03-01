---
title: Explore Business Events in Fabric Real-Time Hub
description: Explore how to navigate and filter business events in Microsoft Fabric Real-Time hub. Learn to access event details, apply filters, and take actions efficiently.
#customer intent: As a Fabric user, I want to explore the business events list so that I can view and filter events relevant to my operations.
ms.reviewer: majia
ms.topic: how-to
ms.date: 02/28/2026
---

# Explore business events in Fabric Real-Time hub

This article covers the business events list page in Real-Time hub. The list page shows all your business events in a list, lets you filter them, and provides quick access to their details.

> [!NOTE]
> Business events in Microsoft Fabric are customer-initiated, business-critical notifications that trigger downstream processes in real time. They empower organizations to monitor processes and respond quickly to shifts in operations, customer interactions, or market conditions. This article shows how to explore business events in Fabric Real-Time hub. To learn more about business events, see [Business events overview](business-events-overview.md).


## Business events list

To explore your business events, select **Business events** under the **Subscribe to** category in Real-Time hub. You see the business events list page, where you can see all your business events and filter them to find the specific ones you want to explore. You can also select a business event to see more details about it.

:::image type="content" source="./media/business-events-page/business-events-list-view.png" alt-text="Screenshot of business events list page." lightbox="./media/business-events-page/business-events-list-view.png":::

### Information displayed in the list

The list view shows the following information about each business event:

- **Name** of the business event.

- **Schema set** the business event is associated with, which indicates the category of the business event.

- **Item owner** of the business event. The item owner is the person who created the business event.

- **Workspace** is the Fabric workspace where the business event is created.

    :::image type="content" source="./media/business-events-page/list-columns.png" alt-text="Screenshot of columns in the business events list page." lightbox="./media/business-events-page/list-columns.png":::
    

### Filters for the list

Use filters to find the business events you're interested in. The list displays the filters at the top. Select a value for each filter to narrow down the list of business events. The available filters include:

- **Item owner** filter shows the business events that are relevant to you. 

- **Schema set** filter helps you find business events associated with a specific schema set. When you select a schema set, the list shows only the business events associated with the schemas in that schema set.

- **Workspace** filter is helpful when you have business events across multiple workspaces. Select a Fabric workspace to find your business events in that workspace.

    :::image type="content" source="./media/business-events-page/filter-parameters.png" alt-text="Screenshot of filters for the list in the business events list page." lightbox="./media/business-events-page/filter-parameters.png":::    

Apart from filters, the search bar allows you to search business events by name. Enter the full name or part of the name to find your business events.

:::image type="content" source="./media/business-events-page/search-bar.png" alt-text="Screenshot of search bar in the business events list page." lightbox="./media/business-events-page/search-bar.png":::    

### Actions on the ribbon

The business events list page enables the following actions:

#### Create new business event

Create a new business event by selecting the **+ New business event** button at the top of the list page. You can create a business event by using a new schema or by using an existing schema. For step-by-step guidance on creating a business event, see [Create business events](create-business-events.md).

:::image type="content" source="./media/business-events-page/new-business-event-button.png" alt-text="Screenshot of new business event button in the business events list page." lightbox="./media/business-events-page/new-business-event-button.png":::  

#### Add a consumer for the business event

- **Add an alert for the business event**: You can create an alert on a business event to monitor the event and get notified when the event occurs. To create an alert for the selected event, select **Add consumer** -> **Set alert** on the ribbon. For step-by-step guidance on setting alerts, see [Set alerts on business events in Real-Time hub](set-alerts-business-events.md).

- **Add a Notebook consumer for the business event**: You can create a Notebook consumer for a business event to analyze the event data in a notebook. To create a Notebook consumer for the selected event, select **Add consumer** -> **Create Notebook consumer** on the ribbon. For step-by-step guidance on creating a Notebook consumer, see [Publish business events using Notebook and react using Activator](tutorial-business-events-notebook-user-data-function-activator.md).

- **Add a User Data Function consumer for the business event**: You can create a User Data Function consumer for a business event to trigger an action when the event occurs. To create a User Data Function consumer for the selected event, select **Add consumer** -> **Create User Data Function consumer** on the ribbon. For step-by-step guidance on creating a User Data Function consumer, see [Publish business events using User Data Function and react using Activator](tutorial-business-events-user-data-function-activation-email.md).

:::image type="content" source="./media/business-events-page/add-consumer-button.png" alt-text="Screenshot of add consumer button in the business events list page." lightbox="./media/business-events-page/add-consumer-button.png":::

#### Publish from Eventstream

Select **Publish from Eventstream** to publish a business event from an eventstream. Select an eventstream to publish a business event with the schema associated with that eventstream. For step-by-step guidance on publishing from eventstream, see [Publish business events using Eventstream and react using Activator](tutorial-business-events-event-stream-user-data-function-activator.md).

:::image type="content" source="./media/business-events-page/publish-from-event-stream.png" alt-text="Screenshot of publish from eventstream button in the business events list page." lightbox="./media/business-events-page/publish-from-event-stream.png":::

## Actions in context menu

Hover the mouse over a business event row and select the three dots (**...**) at the end to see the context menu for that business event. The context menu provides quick access to the following actions:

- **Set alert**: Create an alert for the business event to monitor the event and get notified when the event occurs. For step-by-step guidance on setting alerts, see [Set alerts on business events in Real-Time hub](set-alerts-business-events.md).

- **Manage event schema**: View and manage the event schema for the business event. You see the structure of the event data and make changes to the schema if needed. For step-by-step guidance on managing event schema, see [Manage event schema](../../real-time-intelligence/schema-sets/create-manage-event-schemas.md).

- **Delete**: Delete the business event. This action is irreversible, so make sure you want to delete the business event before selecting this option. For more information on deleting a business event, see [Delete a business event](create-business-events.md#delete-a-business-event).

    :::image type="content" source="./media/business-events-page/context-menu-actions.png" alt-text="Screenshot of context menu for a business event in the business events list page." lightbox="./media/business-events-page/context-menu-actions.png":::

## View business event details

To view details of a business event, select the business event from the list. You see the details page for the business event, where you can see more information about the business event, including its schema, associated consumers, and activity history. For more information on the business event details page, see [Business event details](business-event-details.md).