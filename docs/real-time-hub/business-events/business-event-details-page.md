---
title: Business Event Details in Fabric Real-Time Hub
description: Learn how to view detailed information about a specific business event in Fabric Real-Time hub, including event schema, recent events, and consumers.
#customer intent: As a Real-Time hub user, I want to view the details of a specific business event so that I can analyze its schema, recent events, and associated consumers.
ms.reviewer: majia
ms.topic: how-to
ms.date: 03/01/2026
---

# Business event detail page in Fabric Real-Time hub

To explore more details about a business event, follow these steps to navigate to the business event details page in Real-Time hub. The details page provides in-depth information about the business event, such as the event schema, recent events, and consumers created for this business event.

1. Select **Business events** under the **Subscribe to** category in Real-Time hub. You see the business events list page, where you can see all your business events. 

1. Select a business event to see the details page for that business event.

    :::image type="content" source="./media/business-event-details-page/select-business-event.png" alt-text="Screenshot of selecting a business event from the list in Real-Time hub." lightbox="./media/business-event-details-page/select-business-event.png":::

1. You see the business event details page.

    :::image type="content" source="./media/business-event-details-page/business-event-details-page.png" alt-text="Screenshot of the business event details page." lightbox="./media/business-event-details-page/business-event-details-page.png":::

> [!IMPORTANT]
> This feature is in [preview](../../fundamentals/preview.md).

> [!NOTE]
> If you're not familiar with business events, see [Business events overview](business-events-overview.md) to learn what business events are and how they can benefit your organization.

## Publishers tab

Publishers tab shows the publishers that send events for this business event. 

- Events published by the publisher: Select a publisher to see the events that the publisher sends. This information helps you understand what kind of events are being published for this business event and helps you analyze the event data.
- Publishing failures: You can also see if there are any publishing failures for this publisher. If there are failures, select the failure to see more details about the failure, such as the error message and the time of the failure. This information helps you troubleshoot any problems with event publishing.
- Publisher details: By selecting the publisher, you can also see more details about the publisher, such as the publisher configuration and the schema of the events it publishes.

    :::image type="content" source="./media/business-event-details-page/publishers-tab.png" alt-text="Screenshot of the Publishers tab showing event publishers on the business event details page." lightbox="./media/business-event-details-page/publishers-tab.png":::

## Consumers tab

The Consumers tab shows the consumers that are consuming events for this business event.

- Events delivered to the consumer: Select a consumer to see the events delivered to this consumer. This information helps you understand what kind of events are being consumed and lets you analyze the event data.
- Delivery failures: You can also see if there are any delivery failures for this consumer. If there are failures, select the failure to see more details about the failure, such as the error message and the time of the failure. This information helps you troubleshoot any problems with event delivery.
- Consumer details: By selecting the consumer, you can see more details about the consumer, such as the consumer configuration and the schema of the events it consumes.

    :::image type="content" source="./media/business-event-details-page/consumers-tab.png" alt-text="Screenshot of the Consumers tab showing event consumers on the business event details page." lightbox="./media/business-event-details-page/consumers-tab.png":::

## Data preview tab

The Data preview tab allows you to see a sample of the event data for this business event. This sample helps you understand the structure of the event data and analyze the data. You can also use the data preview to validate if the event data is correct and troubleshoot any problems with the event data.

- Publishers filter: Select a publisher to see the event data published by this publisher. This information helps you understand the data being published for this business event.
- Consumers filter: Select a consumer to see the event data delivered to this consumer. This information helps you understand the data being consumed for this business event.
- Show or hide metadata: Choose to show or hide the metadata of the event data. Metadata provides additional information about the event data, such as the time of the event and the source of the event. This information helps you analyze the event data in more depth.

## Event schema pane

The Event schema pane shows the schema of the events for this business event. The schema defines the structure of the event data, including the fields and their data types. Understanding the event schema is important for analyzing the event data and creating consumers for the business event. You can also use the event schema to validate if the event data is correct and troubleshoot any problems with the event data.

- Settings button: Select the settings button to see more details about the event schema, such as the schema version and the history of schema changes. This information helps you understand the evolution of the event schema and troubleshoot any problems with schema changes.
- Hide or show schema pane: Choose to hide or show the event schema pane. This choice allows you to focus on the event data when analyzing the data, or to focus on the event schema when understanding the structure of the event data.
- Show metadata in schema: Choose to show or hide the metadata fields in the event schema. Metadata fields provide additional information about the event data, such as the time of the event and the source of the event. This information helps you analyze the event data in more depth.

    :::image type="content" source="./media/business-event-details-page/event-schema-pane.png" alt-text="Screenshot of the Event Schema pane showing the schema structure on the business event details page." lightbox="./media/business-event-details-page/event-schema-pane.png":::

## Add consumer

When you select a business event from the list, you can also take the following actions to add a consumer for the business event:

- Set alert for the business event.
- Create a Notebook consumer for the business event to analyze the event data in a notebook.
- Create a User Data Function consumer for the business event to trigger an action when the event occurs.

    :::image type="content" source="./media/business-event-details-page/add-consumer-button.png" alt-text="Screenshot of the Add Consumer button and options on the business event details page." lightbox="./media/business-event-details-page/add-consumer-button.png":::

### Set alert for the business event

Create an alert on the business event to monitor the event and get notified when the event occurs. To create an alert for the business event, select **Set alert** at the top of the details page. For step-by-step guidance on setting alerts, see [Set alerts on business events in Real-Time hub](set-alerts-business-events.md).

### Create Notebook consumer for the business event

Create a Notebook consumer for a business event to analyze the event data in a Notebook. To create a Notebook consumer for the business event, select **Create Notebook consumer** at the top of the details page. For step-by-step guidance on creating a Notebook consumer, see [Publish business events using Notebook and react using Activator](tutorial-business-events-notebook-user-data-function-activator.md).

### Create User Data Function consumer for the business event

Create a User Data Function consumer for a business event to trigger an action when the event occurs. To create a User Data Function consumer for the business event, select **Create User Data Function consumer** at the top of the details page. For step-by-step guidance on creating a User Data Function consumer, see [Publish business events using User Data Function and react using Activator](tutorial-business-events-user-data-function-activation-email.md).

## Publish business event from an eventstream

Create an eventstream to publish events for a business event. By using this approach, you can stream the event data in real time and integrate with other systems. To create an eventstream for the business event, select **Create Event Stream** at the top of the details page. For step-by-step guidance on creating an eventstream, see [Publish business events using Eventstream and react using Activator](tutorial-business-events-event-stream-user-data-function-activator.md).


:::image type="content" source="./media/business-event-details-page/publish-button.png" alt-text="Screenshot of the Publish button for creating an eventstream on the business event details page." lightbox="./media/business-event-details-page/publish-button.png":::

## Actions on the ribbon

The ribbon at the top of the business event details page provides quick access to common actions you can take on the business event. The available actions include:

- **Edit description**:  Edit the description of the business event to provide more context and information about the business event. This description helps other users understand the purpose and details of the business event.

- **Set alert**: Set an alert for the business event to monitor the event and get notified when the event occurs. This alert helps you stay informed about important events and take timely actions. For step-by-step guidance on setting alerts, see [Set alerts on business events in Real-Time hub](set-alerts-business-events.md).

- **Manage event schema**: View and manage the schema of the events for this business event. This action helps you understand the structure of the event data and troubleshoot any problems with the event schema. For step-by-step guidance on managing event schema, see [Manage event schema](../../real-time-intelligence/schema-sets/create-manage-event-schemas.md).

- **Delete business event**: Delete the business event if it's no longer needed. This action helps you keep your list of business events organized and relevant. For more information on deleting a business event, see [Delete a business event](create-business-events.md#delete-a-business-event).

    :::image type="content" source="./media/business-event-details-page/actions-ribbon.png" alt-text="Screenshot of the Actions ribbon showing available actions on the business event details page." lightbox="./media/business-event-details-page/actions-ribbon.png":::