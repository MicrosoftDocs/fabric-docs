---
title: Add Eventhouse destination to a derived stream
description: The include file has the common content for configuring a Solace PubSub+ connector for Fabric event streams and Real-Time hub. 
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: include
ms.custom:
ms.date: 03/14/2025
---

This section shows you how to set up direct data ingestion into an eventhouse from a derived stream destination. This feature builds on the existing integration between Eventstream and Eventhouse, unlocking new real-time analytics scenarios with improved flexibility and performance. 

Previously, only default streams supported direct ingestion into an eventhouse. With this update, the following capabilities are now available: 

- Configure Eventhouse destination with direct ingestion mode directly from a derived stream. 
- Use the "Get Data" wizard to set up the Eventhouse destination table.

### Steps

1. From Eventstream, create a derived stream destination. Select **Eventhouse** destination after derived stream.  

    :::image type="content" source="./media/add-eventhouse-destination-to-derived-stream/select-eventhouse-destination.png" alt-text="Screenshot showing the Eventhouse destination." lightbox="./media/add-eventhouse-destination-to-derived-stream/select-eventhouse-destination.png":::
1. Configure Eventhouse destination and select **Direct Ingestion** option under **Data Ingestion** mode and add destination details. To learn more about Eventhouse destination, see [Add an Eventhouse destination to an eventstream](add-destination-kql-database.md). After adding the destination configuration, select **Publish**.  

    :::image type="content" source="./media/add-eventhouse-destination-to-derived-stream/configure-eventhouse.png" alt-text="Screenshot showing the configuration of the eventhouse destination." lightbox="./media/add-eventhouse-destination-to-derived-stream/configure-eventhouse.png":::
1. In **Live view**, select **Configure** in the Eventhouse destination node. You see the Get data wizard where you can define the destination table schema. Select an existing table of the KQL database, or select **New table** to create a new one to route and ingest the data. 

    :::image type="content" source="./media/add-eventhouse-destination-to-derived-stream/live-view-configure.png" alt-text="Screenshot showing the configuration of the eventhouse destination in the live view." lightbox="./media/add-eventhouse-destination-to-derived-stream/live-view-configure.png":::

    To learn more about the options available in Get-Data wizard are see [Add an Eventhouse destination to an eventstream](add-destination-kql-database.md).

    :::image type="content" source="./media/add-eventhouse-destination-to-derived-stream/get-data-wizard.png" alt-text="Screenshot showing the Get data wizard." lightbox="./media/add-eventhouse-destination-to-derived-stream/get-data-wizard.png":::
1. Select **Finish** to complete the setup. It can take a few minutes before the data is available to query in Eventhouse.  

     :::image type="content" source="./media/add-eventhouse-destination-to-derived-stream/finish-configuration.png" alt-text="Screenshot showing the finished configuration of the Get data wizard." lightbox="./media/add-eventhouse-destination-to-derived-stream/finish-configuration.png":::

      :::image type="content" source="./media/add-eventhouse-destination-to-derived-stream/sample-data.png" alt-text="Screenshot showing the sample data." lightbox="./media/add-eventhouse-destination-to-derived-stream/sample-data.png":::