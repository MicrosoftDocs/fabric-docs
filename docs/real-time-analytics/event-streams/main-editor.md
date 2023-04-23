---
title: Event streams main editor - Microsoft Fabric
description: Describes the main editor to create and manage event streams in Microsoft Fabric. 
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: concept
ms.date: 04/21/2023
ms.search.form: product-kusto
---

# Main editor for Microsoft Fabric event streams
Microsoft Fabric event streams feature provides a main editor – a canvas that allows you to connect to event data sources and destinations with a few select. Each node in the canvas represents a source, or a destination or the eventstream itself. From there, you can preview the event data, monitor the data insights with metrics, check logs for each of the nodes. 

## Main editor
The following screenshot shows an eventstream with its source and destination configured. 

:::image type="content" source="./media/main-editor/eventstream-main-editor.png" alt-text="Screenshot showing an Eventstream item overview." lightbox="./media/main-editor/eventstream-main-editor.png" :::

- **Ribbon**: It provides the source and destination options for you to choose. 
- **Data navigation pane**: It provides the navigation of the sources and destinations. 
- **Canvas and diagram view**: It provides graphical representation of the whole topology from the sources to the destinations. Each source or destination is visualized as a tile in the canvas. 
- **Configuration and modification panel**: It's the place used to configure or modify a specific source or destination.  
- **Bottom pane for Information**, Data preview, Data Insights, and Runtime logs: For each tile, the data preview  shows you data inside the selected node. This section also summarizes runtime logs where the runtime logs exist in certain source or destination. It also provides metrics for you to monitor the data insights for certain source or destination, like the input events, output events, incoming messages, outgoing messages, etc. 


## Next steps

- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Introduction to Microsoft Fabric event streams](overview.md).