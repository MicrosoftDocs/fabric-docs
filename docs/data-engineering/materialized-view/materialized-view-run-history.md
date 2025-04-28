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

A history of the past 25 runs of Materialized lake view along with lineage and run metadata is made available from the dropdown to the user to enable monitoring and troubleshooting.

:::image type="content" source="./media/materialized-view-run-history/view-past-runs.png" alt-text="Screenshot showing a view of the past runs." border="true" lightbox="./media/materialized-view-run-history/view-past-runs.png":::

Clicking on **View more past runs**, shows the user the last 25 runs for Materialized lake views or the runs in the last seven days whichever comes first.

:::image type="content" source="./media/materialized-view-run-history/view-all-past-runs.png" alt-text="Screenshot showing a view of the past twenty five runs." border="true" lightbox="./media/materialized-view-run-history/view-all-past-runs.png":::

## Following are the possible states for a run in lineage view:

* **Completed**- When all the nodes have been executed successfully, the run status will be shown as **Completed** state.

  :::image type="content" source="./media/materialized-view-run-history/completed-runs.png" alt-text="Screenshot showing a view of a completed run." border="true" lightbox="./media/materialized-view-run-history/completed-runs.png":::


* **Failed**- When any one of the nodes fails, the run status will be shown as **Failed** state. When the node is in Failed state, the child node is shown in a Skipped state.

  :::image type="content" source="./media/materialized-view-run-history/failed-runs.png" alt-text="Screenshot showing a view of a failed run." border="true" lightbox="./media/materialized-view-run-history/failed-runs.png":::

* **Skipped**- When the previous run is still ongoing, the current schedule is skipped that run state will be shown as **Skipped**.

  :::image type="content" source="./media/materialized-view-run-history/skipped-runs.png" alt-text="Screenshot showing a view of a skipped run." border="true" lightbox="./media/materialized-view-run-history/skipped-runs.png":::

* **In Progress**- When the run has started and has not reached a terminal state, the run state will be shown as **In Progress**.

* **Canceled**- When the run has been manually canceled by the user from monitoring hub, the run state will be shown as **Canceled**.

## Next step

* [Microsoft Fabric materialized views tutorial](./tutorial.md)

