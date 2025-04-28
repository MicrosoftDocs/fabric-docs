---
title: Materialized lake views operational run details
description: Learn how to understand materialized lake views operational run details
ms.topic: how-to
author: apurbasroy
ms.author: apsinhar
ms.reviewer: nijelsf
ms.date: 04/28/2025
---

# Understand materialized lake views operational run details

Operational run details encompass the various parameters and metrics tracked during the execution of a materialized lake view run in a lakehouse.

## Activity panel

The activity panel is a section below the lineage view, where user can get the information of the following:

*	Materialized lake views which are a part of the ongoing run
*	Status of the materialized lake views
*	Start time of the materialized lake views' execution
*	Duration of the materialized lake views' execution
*	Search bar for the materialized lake views

:::image type="content" source="./media/operational-run-details/activity-panel.png" alt-text="Screenshot showing activity panel in a DAG UI." border="true" lightbox="./media/operational-run-details/activity-panel.png":::


To view the lineage of materialized lake views within the lakehouse, you can click on a particular materialized lake view on the activity panel or in the lineage.

:::image type="content" source="./media/operational-run-details/activity-panel-node.png" alt-text="Screenshot showing end to end flow of a node, on clicking a node name in activity panel in a DAG UI." border="true" lightbox="./media/operational-run-details/activity-panel-node.png":::

## Details panel

The materialized lake view details panel on the right side of the lineage view displays the individual materialized lake view information of the ongoing run. It contains the following:

*	Name
*	Type
*	Start Time
*	Completion Time
*	Duration
*	Status
*	Detailed logs with link to monitor hub for debugging

:::image type="content" source="./media/operational-run-details/end-to-end.png" alt-text="Screenshot showing details panel in a DAG UI." border="true" lightbox="./media/operational-run-details/end-to-end.png":::

On clicking the **More Details** link, the user is navigated to the monitor hub page for job level monitoring.

## Next steps
* [Microsoft Fabric materialized views tutorial](./tutorial.md)

  

