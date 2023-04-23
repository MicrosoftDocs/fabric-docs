---
title: Event streams destination
description: This article describes the event routing destination types that Microsoft Fabric event streams feature supports.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: concept
ms.date: 04/23/2023
ms.search.form: product-kusto
---

# Event streams destination

With the eventstream destinations, you can route their real-time events to a custom app, KQL database, or lakehouse in Microsoft Fabric without writing a single line of code. 

:::image type="content" source="./media/event-streams-destination/eventstream-destinations.png" alt-text="Screenshot showing the overview of the event streams destination types." lightbox="./media/event-streams-destination/eventstream-destinations.png" :::

The following destinations are currently available.

## Custom application

With this destination, you can easily route your real-time events to a custom application. With this option, a consumer group is created, allowing custom applications to connect to your eventstream and consume the event data in real-time. It's useful for applications outside of Microsoft Fabric that need to consume the event data to respond to events as they occur. 

- **Destination name** – Meaningful destination name that appears in your eventstream.

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-custom-app.png" alt-text="Screenshot showing the custom app destination type." lightbox="./media/event-streams-destination/eventstream-destinations-custom-app.png" :::

## KQL Database 

This destination provides a direct ingestion of your real-time event data into a KQL database, allowing for seamless querying of the data once it has been successfully loaded. With the data in the KQL database, you can then perform more queries and analysis to gain deeper insights into your event data. 

- **Destination name** – Meaningful destination name that appears in your eventstream. 
- **Workspace** – The workspace name where your KQL Database is located. 
- **KQL Database** – The KQL Database where you want to route the event data.

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database.png" alt-text="Screenshot showing the kql database destination type." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database.png" :::

**Ingest data wizard** will be popping up after clicking "Create and configure":
:::image type="content" source="./media/event-streams-destination/eventstream-destinations-kql-database-ingestion-wizard.png" alt-text="Screenshot showing the ingestion wizard in kql database destination type." lightbox="./media/event-streams-destination/eventstream-destinations-kql-database-ingestion-wizard.png" :::

- **Destination** – With the step, you can either create a new table or choose an existing one from your KQL database to route and ingest your real-time data. 
- **Source** – It helps you to verify the source of your real-time data for creating a data connection to ingest the data. 
- **Schema** - It enables you to confirm or change the data format and verify the schema of incoming real-time data. By performing this step, you can ensure that the data is properly formatted and adheres to the expected schema, which helps prevent data loss or inaccuracies during ingestion.
- **Summary** – It shows the status of the table creating with the schema and connection establishing of your eventstream and KQL database. 

Upon completion of the wizard, real-time event data begin ingesting into the selected KQL table.

## Lakehouse

This destination provides you with the ability to transform your real-time events prior to ingestion into your lakehouse. Real-time events are converted into Delta Lake format and then stored in the designated lakehouse tables. It helps with your data warehousing scenario. 

- **Name** - Meaningful destination name that appears in your eventstream. 
- **Workspace** - The workspace name where your lakehouse is located. 
- **Lakehouse** – The lakehouse where transformed data needs to be routed for data analysis/warehousing. 
- **Delta table** – Destination table within the lakehouse. 
- **Data format** – The format of real-time events that is sent to your lakehouse. 
- **Open event processor** – It's where event transformation is defined. 

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse.png" alt-text="Screenshot showing the lakehouse destination type." lightbox="./media/event-streams-destination/eventstream-destinations-lakehouse.png" :::

The **Event processor editor** will be popping up after clicking **Open event processor**:

:::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse-event-processor-overview.png" alt-text="Screenshot showing the event processor in lakehouse destination type." lightbox="./media/event-streams-destination/eventstream-destinations-lakehouse-event-processor-overview.png" :::

- **Schema columns** – It shows all the columns in the event data in the selected node in the right panel. You can modify any column by removing/renaming or changing its data type when the eventstream node is selected.
- **Operations** - To add a transformation operation to your real-time event data, select the transformation under Operations. The respective transformation is created on the event data. For example, in the example, ‘Filter’ is applied.  

  :::image type="content" source="./media/event-streams-destination/eventstream-destinations-lakehouse-event-processor-operator.png" alt-text="Screenshot showing the event processor operator in lakehouse destination type." lightbox="./media/event-streams-destination/eventstream-destinations-lakehouse-event-processor-operator.png" :::

- **Data preview** – It shows a live preview of data coming in the selected node in the bottom pane. You can pause/resume the preview. You can also see the details of a specific record, a cell in the table, by selecting it and then selecting Show/Hide details.  


To learn more about the event processor editor, see [Event processor editor](./event-processor-editor.md).

Upon completion of the event processor wizard, real-time event data begin ingesting into the selected Delta table.

## Next steps

- [Event processor editor](./event-processor-editor.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Event streams source](./event-streams-source.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)