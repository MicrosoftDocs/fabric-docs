---
title: Run History of Microsoft Fabric Materialized Lake Views
description: Learn how to check the run history of materialized lake views in Microsoft Fabric, including run states and troubleshooting.
ms.topic: how-to
ms.reviewer: apsinhar
ms.date: 03/01/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to check the run history of materialized lake views in Microsoft Fabric so that I can monitor and troubleshoot the runs.
---

# Run history of materialized lake views

Run history helps you monitor and troubleshoot materialized lake view (MLV) refreshes. You can access recent runs and review lineage metadata.

## View recent runs

In the materialized lake views lineage view, you can view up to the last 25 runs from the run history dropdown.

:::image type="content" source="./media/materialized-lake-view-run-history/view-past-runs.png" alt-text="Screenshot showing a view of the past runs." border="true" lightbox="./media/materialized-lake-view-run-history/view-past-runs.png":::

Select **View more past runs** to see either:

- The last 25 runs, or
- Runs from the last seven days,

whichever limit is reached first.

The run details panel shows the environment associated with each run. Environment details appear only when the environment exists and you have access to it.

:::image type="content" source="./media/materialized-lake-view-run-history/view-all-past-runs.png" alt-text="Screenshot showing a view of the past 25 runs." border="true" lightbox="./media/materialized-lake-view-run-history/view-all-past-runs.png":::

## Run states in lineage view

Materialized lake view runs in the lineage view can have the following states:

- **Completed**: All nodes finish successfully.
- **Failed**: One or more nodes fail. Fabric marks dependent child nodes as **Skipped**.
- **Skipped**: The scheduler skips the run because a previous run is still in progress.
- **In progress**: The run has started and hasn't reached a terminal state.
- **Canceled**: You manually cancel the run from Monitoring hub.

## Related content

- [Microsoft Fabric materialized lake views tutorial](./tutorial.md)
- [Manage Fabric materialized lake views lineage](./view-lineage.md)
