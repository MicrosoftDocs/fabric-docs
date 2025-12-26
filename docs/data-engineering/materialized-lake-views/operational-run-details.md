---
title: Materialized Lake Views Operational Run Details
description: Learn how to understand materialized lake views operational run details
ms.topic: how-to
author: eric-urban
ms.author: eur
ms.reviewer: apsinhar
ms.date: 06/06/2025
# customer intent: As a data engineer, I want to understand the operational run details of materialized lake views in Microsoft Fabric so that I can monitor and manage their execution.
---

# Understand materialized lake views operational run details

Operational run details encompass the various parameters and metrics tracked during the execution of a materialized lake view (MLV) run in a lakehouse.

## Activity panel

The activity panel is a section below the lineage view, where user can get the information of the following:

* MLVs which are a part of the ongoing run
* Status of the MLVs
* Start time of the MLVs' execution
* Duration of the MLVs' execution
* Search bar for the MLVs

:::image type="content" source="./media/operational-run-details/activity-panel.png" alt-text="Screenshot showing activity panel in a lineage view." border="true" lightbox="./media/operational-run-details/activity-panel.png":::

To view the lineage of MLVs within the lakehouse, you can click on a particular MLV on the activity panel or in the lineage.

:::image type="content" source="./media/operational-run-details/activity-panel-node.png" alt-text="Screenshot showing end to end flow of a node, on clicking a node name in activity panel in a lineage view." border="true" lightbox="./media/operational-run-details/activity-panel-node.png":::

## Details panel

The materialized lake view details panel on the right side of the lineage view displays the individual MLV information of the ongoing run. It contains the following:

* Name
* Type
* Start Time
* Completion Time
* Duration
* Status
* Detailed logs with link to monitor hub for debugging

:::image type="content" source="./media/operational-run-details/end-to-end.png" alt-text="Screenshot showing details panel in a lineage view." border="true" lightbox="./media/operational-run-details/end-to-end.png":::

On clicking the **More Details** link, the user is navigated to the monitor hub page for job level monitoring.

## Related articles

* [Microsoft Fabric materialized lake views overview](overview-materialized-lake-view.md)
* [Microsoft Fabric materialized views tutorial](./tutorial.md)