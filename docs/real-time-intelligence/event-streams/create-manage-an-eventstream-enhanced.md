---
title: Create an eventstream in Microsoft Fabric (preview)
description: This article describes how to create an eventstream item with Microsoft Fabric event streams enhanced capabilities.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 05/21/2024
ms.search.form: Event Streams Overview
---

# Create an eventstream in Microsoft Fabric with enhanced capabilities (preview)
This article describes how to create a Fabric eventstream with enhanced capabilities that are in preview.

## Prerequisites
Before you start, you must complete the following prerequisite:

- Get access to a **premium workspace** with **Contributor** or above permissions.

## Create an eventstream

You can create an eventstream on the **Workspace** page, the **Real-Time Analytics experience Homepage**, or the **Create hub** page. Here are the steps:

1. Change your Fabric experience to **Real-Time Analytics**.
1. Follow one of these steps to start creating an eventstreams:

   - On the **Real-Time Analytics** homepage, select the **Eventstream** tile:

       :::image type="content" source="./media/create-manage-an-eventstream/eventstream-creation-homepage.png" alt-text="Screenshot showing the eventstream tile on the homepage.":::

   - On the **Workspace** page, select **New** and then **Eventstream**:

       :::image type="content" source="./media/create-manage-an-eventstream/eventstream-creation-workspace.png" alt-text="Screenshot showing where to find the eventstream option in the New menu on the Workspace page." :::

   - On the **Create hub** page, select the **Eventstream** tile:

       :::image type="content" source="./media/create-manage-an-eventstream-enhanced/create-event-stream-dialog-box.png" alt-text="Screenshot showing the New eventstream dialog box." lightbox="./media/create-manage-an-eventstream-enhanced/create-event-stream-dialog-box.png" :::
1. Enter a **name** for the new eventstream and select **Enhanced Capabilities (preview)** checkbox, and then select **Create**. 

   :::image type="content" source="./media/create-manage-an-eventstream/eventstream-creation-naming.png" alt-text="Screenshot showing where to enter the eventstream name on the New Eventstream screen." :::

1. Creation of the new eventstream in your workspace can take a few seconds. After the eventstream is created, you're directed to the main editor where you can start with adding sources to the eventstream. 

   :::image type="content" source="./media/create-manage-an-eventstream-enhanced/editor.png" alt-text="Screenshot showing the editor." lightbox="./media/create-manage-an-eventstream-enhanced/editor.png" :::

## Next step
- [Add sources to the eventstream](./add-manage-eventstream-sources-enhanced.md)
- [Add destinations to the eventstream](./add-manage-eventstream-destinations-enhanced.md)

