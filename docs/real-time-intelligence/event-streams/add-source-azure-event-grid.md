---
title: Connect an Event Grid Namespace Source to an Eventstream
description: Learn how to add Azure Event Grid namespace to a Microsoft Fabric eventstream for real-time event and MQTT data ingestion.
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:12/03/2025
  - ai-gen-description
ms.date: 09/08/2025
ai-usage: ai-assisted
#customer intent: As a user who's planning IoT data monitoring, I want to connect an Azure Event Grid namespace to a Microsoft Fabric eventstream so that I can process MQTT messages and standard events for real-time analytics.
---

# Add an Event Grid namespace to an eventstream for real-time event and MQTT data ingestion

In today's connected world, organizations rely on streaming event data and Internet of Things (IoT) data for real-time analytics, monitoring, and decision-making. With the new capability to add an Azure Event Grid namespace as a source to an eventstream, you can seamlessly bring both standard events and Message Queuing Telemetry Transport (MQTT) messages into Microsoft Fabric.

This integration enables scenarios like industrial IoT monitoring, connected vehicle data, and enterprise system integration without complex custom pipelines. By bridging Event Grid and Fabric eventstreams, you gain a powerful, scalable foundation to process millions of events per second and unlock insights instantly across your data estate.

This connector ingests both CloudEvents from namespace topics and MQTT telemetry directly from Azure Event Grid into Fabric Eventstream.

This article shows you how to add an Event Grid namespace source to an eventstream.

## Prerequisites

- Create or have an Event Grid namespace with [managed identity](/azure/event-grid/event-grid-namespace-managed-identity) enabled.

- A workspace that's not **My workspace**, operating in a Fabric capacity or trial license mode, is required.

- If you have Member (or higher) permissions, no extra setup is needed. If you don't have Member permissions, ask a colleague with Member access to assign Contributor access to the Event Grid service principal before you add the source:

  1. In the workspace, open the [Manage access](../../fundamentals/give-access-workspaces.md) pane.
  1. Select **Add people or groups**.
  1. Enter the Event Grid namespace name and choose the matching service principal.
  1. Assign the Contributor role and select **Add**.

- Enable [MQTT](/azure/event-grid/mqtt-publish-and-subscribe-portal) and [routing](/azure/event-grid/mqtt-routing) on the Event Grid namespace, if you want to receive MQTT data.

- [Create an eventstream](create-manage-an-eventstream.md) if you don't have one.

## Configure portal settings

To ensure that the managed identity of the Event Grid namespace has the required permissions, configure settings in the admin portal:

1. In the upper-right corner, select **Settings** (gear icon).

1. In the **Governance and insights** section, select **Admin portal**.

    :::image type="content" source="./media/add-source-azure-event-grid/admin-portal-link.png" alt-text="Screenshot of the link for the admin portal in Power BI settings." lightbox="./media/add-source-azure-event-grid/admin-portal-link.png":::

1. On the **Tenant settings** page, go to the **Developer settings** section.

1. To grant the service principal access to Fabric APIs for creating workspaces, connections, or deployment pipelines:

   1. Expand the **Service principals can use Fabric APIs** option.
   1. Set the toggle to **Enabled**.
   1. Under **Apply to**, select **The entire organization**.
   1. Select **Apply**.

   :::image type="content" source="./media/add-source-azure-event-grid/developer-settings.png" alt-text="Screenshot that shows developer settings." lightbox="./media/add-source-azure-event-grid/developer-settings.png":::

   To access all other APIs (enabled by default for new tenants):

   1. Expand the **Allow service principals to create and use profiles** option.
   1. Set the toggle to **Enabled**.
   1. Under **Apply to**, select **The entire organization**.
   1. Select **Apply**.

## Start the wizard for selecting a data source

[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for **Azure Event Grid Namespace**. On the **Azure Event Grid Namespace** tile, select **Connect**.

:::image type="content" source="./media/add-source-azure-event-grid/select-azure-event-grid.png" alt-text="Screenshot that shows the selection of an Azure Event Grid namespace as the source type in the wizard for getting events." lightbox="./media/add-source-azure-event-grid/select-azure-event-grid.png":::

## Configure the Event Grid connector

[!INCLUDE [azure-event-grid-source-connector](./includes/azure-event-grid-source-connector.md)]

## View an updated eventstream

1. On the **Review + connect** page, select **Add**.

1. Confirm that the Event Grid source is added to your eventstream on the canvas in the **Edit** mode. To implement this newly added Event Grid namespace, select **Publish** on the ribbon.

    :::image type="content" source="./media/add-source-azure-event-grid/publish.png" alt-text="Screenshot that shows the editor with Publish button selected." lightbox="./media/add-source-azure-event-grid/publish.png":::

1. The Event Grid namespace is available for visualization in the **Live** view. Select the **Event Grid Namespace** tile in the diagram to show details about the source.

## Related content

- To learn how to add other sources to an eventstream, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).
