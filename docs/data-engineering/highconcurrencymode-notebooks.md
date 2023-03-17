---
title: High Concurrency Mode for Notebooks
description: Learn how to use High Concurrency Mode to reuse session across multiple notebooks.
ms.reviewer: snehagunda
ms.author: santhoshravindran7
author: saravi
ms.topic: concepts
ms.date: 03/16/2023
---

# High Concurrency Mode for Notebooks

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

When you run a notebook in Microsoft Fabric, an Apache Spark session is started and is used to run the queries submitted as part of the notebook cell executions. With High Concurrency Mode enabled, there's no need to start new spark sessions every time to run a notebook. If you already have a High Concurrency session running, you could attach notebooks to the High Concurrency session getting a spark session instantly to run the queries and achieve a greater session utilization rate. 

> [!NOTE]
> The high concurrency mode-based session sharing is always within a single user boundary. 
> The notebooks need to have matching spark configurations, share the same default lakehouse and libraries to share a single spark session. 

## Configure High Concurrency Mode 
By default, all the Fabric workspaces will be enabled with High Concurrency Mode. To configure the High Concurrency feature , 

1.	Click on Workspace Settings Option in your Fabric Workspace
:::image type="content" source="media\high-concurrency-mode-for-notebooks\workspace-settings-nav.png" alt-text="Screenshot showing the navigration to workspace settings." lightbox="media\high-concurrency-mode-for-notebooks\workspace-settings-nav.png":::

2.	Navigate to the Synapse section > Spark Compute > High Concurrency 
3.	In the High Concurrency section you could choose to enable or disable the setting. 
:::image type="content" source="media\high-concurrency-mode-for-notebooks\workspace-settings-high-concurrency-section.png" alt-text="Screenshot showing the high concurrency section in workspace settings." lightbox="media\high-concurrency-mode-for-notebooks\workspace-settings-high-concurrency-section.png":::

4.	Enabling the high concurrency option will allow users to start a High Concurrency session in their Notebooks or attach to existing High Concurrency session. 
5.	You can configure the period of inactivity, which would determine the time period the High Concurrency session should be kept active to allow packing of additional notebooks. 
6. Disabling the high concurrency mode hides the section to configure the time period of inactivity and also hides the option to start a new high concurrecny session from the notebook menu.
:::image type="content" source="media\high-concurrency-mode-for-notebooks\workspace-setting-disable-high-concurrency-mode.png" alt-text="Screenshot showing the high concurrency option disabled in workspace settings." lightbox="media\high-concurrency-mode-for-notebooks\workspace-setting-disable-high-concurrency-mode.png":::

## Run Notebooks in High Concurrency Session
1.	Open the Fabric workspace 
2.	Create a Notebook or open an existing Notebook 
3.	Navigate to the Run tab in the menu ribbon and Click on the session type dropdown which has  “Standard” selected as the default option.
:::image type="content" source="media\high-concurrency-mode-for-notebooks\start-high-concurrency-session.png" alt-text="Screenshot showing the high concurrency option in Notebook Menu." lightbox="media\high-concurrency-mode-for-notebooks\start-high-concurrency-session.png":::

4.	Click on Start New High Concurrency Session 
5.	Once the High Concurrency session has started,  you could now add upto 10 notebooks in the high concurrency session.
:::image type="content" source="media\high-concurrency-mode-for-notebooks\start-new-high-concurrency-session-from-sessions.png" alt-text="Screenshot showing the option to start a new high concurrency session in Notebook Menu." lightbox="media\high-concurrency-mode-for-notebooks\start-new-high-concurrency-session-from-sessions.png":::
6.	Create a new notebook and by navigating to the Run menu tab as mentioned in the above steps, in the drop down menu you will now see the newly created high concurrency session listed. 
7.	Selecting the existing high concurrency session attaches the second notebook to the session.
:::image type="content" source="media\high-concurrency-mode-for-notebooks\attach-session.png" alt-text="Screenshot showing the option to attach to an existing high concurrency session in Notebook Menu." lightbox="media\high-concurrency-mode-for-notebooks\attach-session.png":::

8.	Once the notebook has been attached, you can start executing the notebook steps instantly. 
9.	The High Concurrency session status also shows the number of notebooks attached to a given session at any point in time. 
10. At any point in time if you feel the notebook attached to a High Concurrency session requires more dedicated compute, you can choose to switch the notebook to a standard session at any point in time, by selecting the option to detach to a standard session in the Run menu tab. 
:::image type="content" source="media\high-concurrency-mode-for-notebooks\detach-to-standard-session.png" alt-text="Screenshot showing the option to detach from a high concurrency session in Notebook Menu." lightbox="media\high-concurrency-mode-for-notebooks\detach-to-standard-session.png":::
11. You can view the session status, type and session id by navigating to status bar, and by clicking on the Session ID would allow you to explore the jobs executed in this high concurrency session and view logs of the spark session in the monitoring detail page.
:::image type="content" source="media\high-concurrency-mode-for-notebooks\monitoring-front-door.png" alt-text="Screenshot showing the option to detach from a high concurrency session in Notebook Menu." lightbox="media\high-concurrency-mode-for-notebooks\monitoring-front-door.png":::
