---
title: Run History of Microsoft Fabric Materialized Lake Views
description: Learn how to check run history of Fabric materialized lake views
ms.topic: how-to
author: eric-urban
ms.author: eur
ms.reviewer: apsinhar
ms.date: 06/10/2025
# customer intent: As a data engineer, I want to check the run history of materialized lake views in Microsoft Fabric so that I can monitor and troubleshoot the runs.
---

# Run history of materialized lake views

You can access the last 25 runs of a materialized lake view (MLV), including lineage and run metadata. It's available from the dropdown for monitoring and troubleshooting.

:::image type="content" source="./media/materialized-lake-view-run-history/view-past-runs.png" alt-text="Screenshot showing a view of the past runs." border="true" lightbox="./media/materialized-lake-view-run-history/view-past-runs.png":::

You can click on **View more past runs** to see the last 25 runs for MLVs or the runs in the last seven days, whichever comes first. The environment associated with any given run is shown in the run details panel. Environment details are displayed only if you have access to the environment and the environment exists.

:::image type="content" source="./media/materialized-lake-view-run-history/view-all-past-runs.png" alt-text="Screenshot showing a view of the past 25 runs." border="true" lightbox="./media/materialized-lake-view-run-history/view-all-past-runs.png":::

## Following are the possible states for a run in lineage view

* **Completed**- When all the nodes have executed successfully, the run status is shown as **Completed** state.

* **Failed**- When any one of the nodes fails, the run status is shown as **Failed** state. When the node is in Failed state, the child node is shown in a Skipped state.

* **Skipped**- When the previous run is still ongoing, the current schedule is skipped that run state is shown as **Skipped**.

* **In Progress**- When the run has started and hasn't reached a terminal state, the run state is shown as **In Progress**.

* **Canceled**- When the run is manually canceled by the user from monitoring hub, the run state is shown as **Canceled**.

## Related articles

* [Microsoft Fabric materialized lake views tutorial](./tutorial.md)
* [Manage Fabric materialized lake views lineage](./view-lineage.md)
