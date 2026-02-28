---
title: Business event detail page in Fabric Real-Time hub
description: This article shows how to view details of a specific business event in Fabric Real-Time hub.
ms.reviewer: majia
ms.topic: how-to
ms.date: 12/11/2025
---

# Business event detail page in Fabric Real-Time hub

Business Events in Microsoft Fabric are customer-initiated, business-critical notifications that trigger downstream processes in real time. They empower organizations to monitor processes and respond quickly to shifts in operations, customer interactions, or market conditions. This article shows how to view details of a specific business event in Fabric Real-Time hub. To learn more about business events, see [Business events overview](business-events-overview.md).

To explore more details about a business event, select the business event from the list. This opens the business event details page, where you can see in-depth information about the business event, such as the event schema, recent events, and consumers created for this business event.

### Publishers tab

Publishers tab shows the publishers that are sending events for this business event. 

- Events published by the publisher: You can select a publisher to see the events published by this publisher. This helps you understand what kind of events are being published for this business event and analyze the event data.
- Publishing failures: You can also see if there are any publishing failures for this publisher. If there are failures, you can select the failure to see more details about the failure, such as the error message and the time of the failure. This helps you troubleshoot any issues with event publishing.
- Publisher details: By selecting the publisher, you can also see more details about the publisher, such as the publisher configuration and the schema of the events it publishes.

### Consumers tab

Consumers tab shows the consumers that are consuming events for this business event.

- Events delivered to the consumer: You can select a consumer to see the events delivered to this consumer. This helps you understand what kind of events are being consumed and analyze the event data.
- Delivery failures: You can also see if there are any delivery failures for this consumer. If there are failures, you can select the failure to see more details about the failure, such as the error message and the time of the failure. This helps you troubleshoot any issues with event delivery.
- Consumer details: By selecting the consumer, you can also see more details about the consumer, such as the consumer configuration and the schema of the events it consumes.

### Data preview tab

Data preview tab allows you to see a sample of the event data for this business event. This helps you understand the structure of the event data and analyze the data. You can also use the data preview to validate if the event data is correct and troubleshoot any issues with the event data.

- Publishers filter: You can select a publisher to see the event data published by this publisher. This helps you understand the data being published for this business event.
- Consumers filter: You can select a consumer to see the event data delivered to this consumer. This helps you understand the data being consumed for this business event.
- Show or hide metadata: You can choose to show or hide the metadata of the event data. Metadata provides additional information about the event data, such as the time of the event and the source of the event. This helps you analyze the event data in more depth.

### Event schema pane

Event schema pane shows the schema of the events for this business event. The schema defines the structure of the event data, including the fields and their data types. Understanding the event schema is important for analyzing the event data and creating consumers for the business event. You can also use the event schema to validate if the event data is correct and troubleshoot any issues with the event data.

- Settings button: You can select the settings button to see more details about the event schema, such as the schema version and the history of schema changes. This helps you understand the evolution of the event schema and troubleshoot any issues with schema changes.
- Hide or show schema pane: You can choose to hide or show the event schema pane. This allows you to focus on the event data when analyzing the data, or to focus on the event schema when understanding the structure of the event data.
- Show metadata in schema: You can choose to show or hide the metadata fields in the event schema. Metadata fields provide additional information about the event data, such as the time of the event and the source of the event. This helps you analyze the event data in more depth.

### Actions on the details page

#### Set alert for the business event

You can create an alert on the business event to monitor the event and get notified when the event occurs. To create an alert for the business event, select **Set alert** at the top of the details page. For step-by-step guidance on setting alerts, see [Set alerts on business events in Real-Time hub](set-alerts-business-events.md).

#### Create Notebook consumer for the business event

You can create a Notebook consumer for a business event to analyze the event data in a Notebook. To create a Notebook consumer for the business event, select **Create Notebook consumer** at the top of the details page. For step-by-step guidance on creating a Notebook consumer, see [Publish business events using Notebook and react using Activator](tutorial-business-events-notebook-user-data-function-activator.md).

#### Create User Data Function consumer for the business event

You can create a User Data Function consumer for a business event to trigger an action when the event occurs. To create a User Data Function consumer for the business event, select **Create User Data Function consumer** at the top of the details page. For step-by-step guidance on creating a User Data Function consumer, see [Publish business events using User Data Function and react using Activator](tutorial-business-events-user-data-function-activation-email.md).

#### Publish business event using eventstream

You can create an eventstream to publish events for a business event. This allows you to stream the event data in real time and integrate with other systems. To create an eventstream for the business event, select **Create Event Stream** at the top of the details page. For step-by-step guidance on creating an eventstream, see [Publish business events using Eventstream and react using Activator](tutorial-business-events-event-stream-user-data-function-activator.md).