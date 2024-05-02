---
title: Include file for the Edit column heading in Real-Time Analytics
description: Include file for the Edit column heading in the Get data hub in Real-Time Analytics
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.custom: build-2023
ms.date: 04/21/2024
---
### Process event before ingestion in Eventstream

The **Process event before ingestion in Eventstream** option enables you to process the data before it's ingested into the destination table. With this option, the get data process seamlessly continues in Eventstream, with the destination table and data source details automatically populated.

To process event before ingestion in Eventstream:

1. On the **Configure** tab, select **Process event before ingestion in Eventstream**.

1. In the **Process events in Eventstream** dialog box, select **Continue in Eventstream**.

    > [!IMPORTANT]
    > Selecting **Continue in Eventstream** ends the get data process in Real-Time Intelligence and continues in Eventstream with the destination table and data source details automatically populated.

    :::image type="content" source="../media/get-data-process-event-preingestion/configure-tab-process-event-in-eventstream.png" alt-text="Screenshot of the Process events in Eventstream dialog box." lightbox="../media/get-data-process-event-preingestion/configure-tab-process-event-in-eventstream.png":::

1. In Eventstream, select the **KQL Database** destination node, and in the **KQL Database** pane, verify that **Event processing before ingestion** is selected and that the destination details are correct.

    :::image type="content" source="../media/get-data-process-event-preingestion/process-event-in-eventstream.png" alt-text="Screenshot of the Process events in Eventstream page." lightbox="../media/get-data-process-event-preingestion/process-event-in-eventstream.png":::

1. Select **Open event processor** to configure the data processing and then select **Save**. For more information, see [Process event data with event processor editor](../event-streams/process-events-using-event-processor-editor.md).
1. Back in the **KQL Database** pane, select **Add** to complete the **KQL Database** destination node setup.
1. Verify data is ingested into the destination table.

> [!NOTE]
> The process event before ingestion in Eventstream process is complete and the remaining steps in this article aren't required.