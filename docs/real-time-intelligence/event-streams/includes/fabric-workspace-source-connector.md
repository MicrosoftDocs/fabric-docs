---
title: Fabric Workspace Item events connector for Fabric event streams
description: This include files has the common content for configuring Fabric Workspace Item events connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu
ms.topic: include
ms.custom:
ms.date: 03/18/2025
---

1. On the **Connect** screen, first select  **Event type(s)** of interest that you want to capture in the eventstream. By default, all supported events are captured.

    :::image type="content" source="./media/fabric-workspace-source-connector/select-event-types.png" alt-text="Screenshot that shows the Connect page for Fabric Workspace item events.":::
1. In the next step, select the right **Event source**. You can choose between streaming all workspace item events in a tenant by selecting the source option as **Across this tenant** or restrict to specific workspace by choosing **By workspace** option. To select a **workspace** for which you want to stream workspace item events, you must be a workspace admin, member, or contributor of that workspace. To receive workspace item events across the tenant, you need to be a Fabric tenant admin

   :::image type="content" border="true" source="media/fabric-workspace-source-connector/connect.png" alt-text="A screenshot of the Connect screen.":::
1. In the **Stream details** pane to the right, select the **Pencil** button to change the **Source name**. This step is optional. 

    :::image type="content" source="./media/fabric-workspace-source-connector/edit-source-name.png" alt-text="Screenshot that shows the Pencil button for the Source name." lightbox="./media/fabric-workspace-source-connector/edit-source-name.png":::   
1. Select **Next** after choosing the right Event source.

    :::image type="content" source="./media/fabric-workspace-source-connector/next-button.png" alt-text="Screenshot that shows the Next button." lightbox="./media/fabric-workspace-source-connector/next-button.png":::   
1. On the **Review + create** screen, review settings, and select **Add** to complete the configuration for Fabric workspace item events.

    :::image type="content" source="./media/fabric-workspace-source-connector/review-connect.png" alt-text="Screenshot that shows the Review + connect page." lightbox="./media/fabric-workspace-source-connector/review-connect.png":::   
