---
title: Create and manage an eventstream in Microsoft Fabric
description: This article describes how to create and manage an Eventstream item with Microsoft Fabric event streams feature.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Create and manage an eventstream in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

Event streams feature in Microsoft Fabric is a centralized event data place that allows you to capture, transform, and route real-time event data to various destinations in desired format. It integrates your eventstreams seamlessly with Azure Event Hubs, KQL database, and Lakehouse.

## Prerequisites

To get started, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions.

## Create an eventstream 

Eventstream item can be created in **Workspace** or the **Real-time Analytics experience Homepage** or **Create hub**. Here are the steps to create an Eventstream item. 

1. Change your Fabric experience to **Real-time Analytics** and select **Eventstream** to create a new eventstream in  workspace or homepage or create hub.

   In **Real-time Analytics** homepage, select **Eventstream** tile:

   :::image type="content" source="./media/create-manage-an-eventstream/eventstream-creation-homepage.png" alt-text="Screenshot showing the eventstream creation in homepage." lightbox="./media/create-manage-an-eventstream/eventstream-creation-homepage.png" :::

   In **Workspace**, select **New** and then **Eventstream**:

   :::image type="content" source="./media/create-manage-an-eventstream/eventstream-creation-workspace.png" alt-text="Screenshot showing the eventstream creation in workspace." lightbox="./media/create-manage-an-eventstream/eventstream-creation-workspace.png" :::

   In **Create hub**, select **Eventstream** tile: 

   :::image type="content" source="./media/create-manage-an-eventstream/eventstream-creation-create-hub.png" alt-text="Screenshot showing the eventstream creation in create hub." lightbox="./media/create-manage-an-eventstream/eventstream-creation-create-hub.png" :::

2. Enter a name for the new eventstream and select **Create**.

   :::image type="content" source="./media/create-manage-an-eventstream/eventstream-creation-naming.png" alt-text="Screenshot showing the eventstream naming." lightbox="./media/create-manage-an-eventstream/eventstream-creation-naming.png" :::

3. Wait for a few seconds to create a new eventstream in your workspace. Once it’s done, you're directed to the main editor in which you can add sources and destinations to your eventstream.

   :::image type="content" source="./media/create-manage-an-eventstream/eventstream-creation-completed.png" alt-text="Screenshot showing the eventstream creation completed." lightbox="./media/create-manage-an-eventstream/eventstream-creation-completed.png" :::

## Manage an eventstream 

After you create an Eventstream item, you can edit and manage your eventstream in your workspace.

- **Delete**: Delete the eventstream from your workspace. 
- **Settings**: Change the eventstream name, edit the sensitivity, and set the endorsement to Certified or Promoted Power BI content. 
- **Add to Favorites**: Add the eventstream to the Home > Favorites tab. 
- **View lineage**: Gives you an overview of where all the data comes from and goes to. 
- **View details**: View detailed information about your eventstream.  

:::image type="content" source="./media/create-manage-an-eventstream/eventstream-management.png" alt-text="Screenshot showing the eventstream management." lightbox="./media/create-manage-an-eventstream/eventstream-management.png" :::


## Next steps

- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)