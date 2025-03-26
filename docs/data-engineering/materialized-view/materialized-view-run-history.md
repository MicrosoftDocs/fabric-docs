---
title: Run history of Microsoft Fabric materialized views
description: Learn how to check run history of Fabric materialized views
ms.topic: how-to
author: apurbasroy
ms.author: apsinhar
ms.reviewer: nijelsf
ms.date: 03/26/2025
---

# Run history of materialized views

A history of the past 25 runs is available to the users along with their DAG run views and the corresponding 
details from Activity Panel and Details Panel. This view helps the user to understand the run history of their materialized
views status and node details with details for monitoring and troubleshooting.

**Image1**

If the user clicks on **View more past runs**, they are able to see the last 25 runs for the DAG or the runs in the last 
seven days whichever comes first.

**Image2**

### Completed Materialized view DAG UI

In this case, all the nodes are successful and in Completed state.

**Image3**

### Failed Materialized view DAG UI

In this case, one or more nodes are unsuccessful and are in Failed state. The node where the parent node is failed is in
Skipped state.

**Image4**

### Skipped Materialized view DAG UI

In this case, the run is in skipped status since the previous schedule is still running.

**Image5**


## Next steps
