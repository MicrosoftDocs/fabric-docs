---
title: Run history of Microsoft Fabric materialized lake views
description: Learn how to check run history of Fabric materialized lake views
ms.topic: how-to
author: apurbasroy
ms.author: apsinhar
ms.reviewer: nijelsf
ms.date: 05/29/2025
---

# Run history of materialized lake views

A history of the past 25 runs of Materialized lake views along with lineage and run metadata is made available from the dropdown to the user to enable monitoring and troubleshooting.

:::image type="content" source="./media/materialized-lake-view-run-history/view-past-runs.png" alt-text="Screenshot showing a view of the past runs." border="true" lightbox="./media/materialized-lake-view-run-history/view-past-runs.png":::

You can click on **View more past runs** to see the last 25 runs for Materialized lake views or the runs in the last seven days whichever comes first.

:::image type="content" source="./media/materialized-lake-view-run-history/view-all-past-runs.png" alt-text="Screenshot showing a view of the past 25 runs." border="true" lightbox="./media/materialized-lake-view-run-history/view-all-past-runs.png":::

## Following are the possible states for a run in lineage view:

* **Completed**- When all the nodes have executed successfully, the run status is shown as **Completed** state.

  :::image type="content" source="./media/materialized-lake-view-run-history/completed-runs.png" alt-text="Screenshot showing a view of a completed run." border="true" lightbox="./media/materialized-lake-view-run-history/completed-runs.png":::


* **Failed**- When any one of the nodes fails, the run status is shown as **Failed** state. When the node is in Failed state, the child node is shown in a Skipped state.

  :::image type="content" source="./media/materialized-lake-view-run-history/failed-runs.png" alt-text="Screenshot showing a view of a failed run." border="true" lightbox="./media/materialized-lake-view-run-history/failed-runs.png":::

* **Skipped**- When the previous run is still ongoing, the current schedule is skipped that run state is shown as **Skipped**.

  :::image type="content" source="./media/materialized-lake-view-run-history/skipped-runs.png" alt-text="Screenshot showing a view of a skipped run." border="true" lightbox="./media/materialized-lake-view-run-history/skipped-runs.png":::

* **In Progress**- When the run has started and hasn't reached a terminal state, the run state is shown as **In Progress**.

* **Canceled**- When the run is manually canceled by the user from monitoring hub, the run state is shown as **Canceled**.

## Next step

* [Microsoft Fabric materialized lake views tutorial](./tutorial.md)

