---
title: Explore business events in Fabric Real-Time hub
description: This article shows how to explore business events in Fabric Real-Time hub.
ms.reviewer: majia
ms.topic: how-to
ms.date: 12/11/2025
---

# Explore business events in Fabric Real-Time hub

Business Events in Microsoft Fabric are customer-initiated, business-critical notifications that trigger downstream processes in real time. They empower organizations to monitor processes and respond quickly to shifts in operations, customer interactions, or market conditions. This article shows how to explore business events in Fabric Real-Time hub. To learn more about business events, see [Business events overview](business-events-overview.md).

This article covers two pages in Real-Time hub where you can explore business events: the business events list page and the business event details page. The list page shows all your business events, and the details page provides in-depth information about a specific business event. 

## Business events list

To explore your business events, select **Business events** under the **Subscribe to** category in Real-Time hub. This opens the business events list page, where you can see all your business events and filter them to find the specific ones you want to explore. You can also select a business event to see more details about it.

### Information displayed in the list

- Name of the business event.
- Schema set the business event is associated with, which indicates the category of the business event.
- Item owner and item creator of the business event. Item owner is the person who is responsible for maintaining the business event, while item creator is the person who creates the business event. They can be the same person or different people.
- Workspace where the business event is created.

### Filters for the list

- Item owner and item creator filters show the business events that are relevant to you. You can select one or multiple filters to find your business events.
- Schema set filter helps you find business events associated with a specific schema set. When you select a schema set, only the business events associated with the schemas in that schema set will be shown in the list.
- Workspace filter is helpful when you have business events across multiple workspaces. You can select one or multiple workspaces to find your business events.

Apart from filters, the search bar allows you to search business events by name. You can enter the full name or part of the name to find your business events.

### Actions on the list page

#### Create new business event

You can create a new business event by selecting the **+ New business event** button at the top of the list page. This opens the Create business event page, where you can define your new business event. For step-by-step guidance on creating a business event, see [Create business events](business-events/create-business-events.md).

#### Add an alert for the business event

You can create an alert on a business event to monitor the event and get notified when the event occurs. To create an alert for the selected event, select **Add consumer** -> **Set alert** on the ribbon. For step-by-step guidance on setting alerts, see [Set alerts on business events in Real-Time hub](set-alerts-business-events.md).

#### Add a Notebook consumer for the business event

You can create a Notebook consumer for a business event to analyze the event data in a Notebook. To create a Notebook consumer for the selected event, select **Add consumer** -> **Create Notebook consumer** on the ribbon. For step-by-step guidance on creating a Notebook consumer, see [Publish business events using Notebook and react using Activator](business-events/tutorial-business-events-notebook-user-data-function-activator.md).

#### Add a User Data Function consumer for the business event

You can create a User Data Function consumer for a business event to trigger an action when the event occurs. To create a User Data Function consumer for the selected event, select **Add consumer** -> **Create User Data Function consumer** on the ribbon. For step-by-step guidance on creating a User Data Function consumer, see [Publish business events using User Data Function and react using Activator](business-events/tutorial-business-events-user-data-function-activation-email.md).

