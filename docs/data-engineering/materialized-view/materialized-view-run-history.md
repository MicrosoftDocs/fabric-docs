---
title: Run history of Microsoft Fabric materialized lake views
description: Learn how to check run history of Fabric materialized lake views
ms.topic: how-to
author: rkottackal
ms.author: rkottackal
ms.reviewer: nijelsf
ms.date: 04/28/2025
---

# Run history of materialized lake views

A history of the past 25 runs is available to the users along with their the run status and the corresponding details from Activity Panel and Details Panel. This view helps the user to understand the run history of their materialized lake views status and node details with details for monitoring and troubleshooting.

:::image type="content" source="./media/materialized-view-run-history/view-past-runs.png" alt-text="Screenshot showing a view of the past runs." border="true" lightbox="./media/materialized-view-run-history/view-past-runs.png":::

If the user clicks on **View more past runs**, they're able to see the last 25 runs for Materialized lake views or the runs in the last seven days whichever comes first.

:::image type="content" source="./media/materialized-view-run-history/view-all-past-runs.png" alt-text="Screenshot showing a view of the past twenty five runs." border="true" lightbox="./media/materialized-view-run-history/view-all-past-runs.png":::

## Following are the possible states of a run in lineage view:

* **Completed**- When all the nodes have been executed successfully, the run status is in **Completed** state.

* **Failed**- When any one of the nodes fails, the run status is in **Failed** state. When the node is in Failed state, the child node is shown in a Skipped state.

* **Skipped**- When the previous run is still ongoing, the current schedule is skipped that run is in **Skipped** state.

* **In Progress**- When the run has started and has not reached a terminal state, the run is in **In Progress** state.

* **Canceled**- When the run has been manually canceled by the user from monitoring hub, the run is in **Canceled** state.

## Completed Materialized lake view

In this case, all the nodes are successful and in Completed state.

:::image type="content" source="./media/materialized-view-run-history/completed-runs.png" alt-text="Screenshot showing a view of a completed run." border="true" lightbox="./media/materialized-view-run-history/completed-runs.png":::

## Failed Materialized lake view

In this case, one or more nodes are unsuccessful and are in Failed state. The node where the parent node is failed is in Skipped state.

:::image type="content" source="./media/materialized-view-run-history/failed-runs.png" alt-text="Screenshot showing a view of a failed run." border="true" lightbox="./media/materialized-view-run-history/failed-runs.png":::

## Skipped Materialized lake view

In this case, the run is in skipped status since the previous schedule is still running.

:::image type="content" source="./media/materialized-view-run-history/skipped-runs.png" alt-text="Screenshot showing a view of a skipped run." border="true" lightbox="./media/materialized-view-run-history/skipped-runs.png":::



## Next step

* [Microsoft Fabric materialized views tutorial](./tutorial.md)

