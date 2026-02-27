---
title: Materialized Lake Views Operational Run Details
description: Learn how to use the activity panel and details panel to understand materialized lake views operational run details in Microsoft Fabric.
ms.topic: how-to
ms.reviewer: apsinhar
ms.date: 02/27/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to understand the operational run details of materialized lake views in Microsoft Fabric so that I can monitor and manage their execution.
---

# Understand materialized lake views operational run details

Operational run details show the key metrics and status for a materialized lake view (MLV) run in a lakehouse.

## Activity panel

The activity panel in the materialized lake views lineage view appears below the lineage graph. It shows:

- MLVs included in the current run.
- Status for each MLV.
- Start time for each MLV run.
- Duration for each MLV run.
- A search box for MLVs.

:::image type="content" source="./media/operational-run-details/activity-panel.png" alt-text="Screenshot showing activity panel in a lineage view." border="true" lightbox="./media/operational-run-details/activity-panel.png":::

To view lineage for a specific MLV, select that MLV in the activity panel or in the lineage graph.

:::image type="content" source="./media/operational-run-details/activity-panel-node.png" alt-text="Screenshot showing end to end flow of a node, on clicking a node name in activity panel in a lineage view." border="true" lightbox="./media/operational-run-details/activity-panel-node.png":::

## Details panel

The details panel in the materialized lake views lineage view appears on the right side of the lineage graph. It shows information for the selected MLV in the current run:

- Name
- Type
- Start time
- Completion time
- Duration
- Status
- Detailed logs and a link to Monitoring hub for debugging

:::image type="content" source="./media/operational-run-details/end-to-end.png" alt-text="Screenshot showing details panel in a lineage view." border="true" lightbox="./media/operational-run-details/end-to-end.png":::

Select **More Details** to open Monitoring hub for job-level monitoring.

## Related content

- [Microsoft Fabric materialized lake views overview](overview-materialized-lake-view.md)
- [Microsoft Fabric materialized views tutorial](./tutorial.md)