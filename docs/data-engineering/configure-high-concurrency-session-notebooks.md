---
title: Configure high concurrency mode for notebooks
description: Learn how to configure and run high concurrency mode to reuse session across multiple notebooks for Data Engineering and Data Science workloads in Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 07/03/2025
---

# Configure high concurrency mode for Fabric notebooks

When you run a notebook in Microsoft Fabric, an Apache Spark session is started and is used to run the queries submitted as part of the notebook cell executions. With high concurrency mode enabled, there's no need to start new spark sessions every time to run a notebook.

If you already have a high concurrency session running, you could attach notebooks to the high concurrency session getting a spark session instantly to run the queries and achieve a greater session utilization rate.

:::image type="content" source="media\high-concurrency-mode-for-notebooks\high-concurrency-session-working.gif" alt-text="Animation showing high concurrency session for notebooks." lightbox="media\high-concurrency-mode-for-notebooks\high-concurrency-session-working.gif":::

> [!NOTE]
> The high concurrency mode-based session sharing is always within a single user boundary.
> The notebooks need to have matching spark configurations, should be part of the same workspace, share the same default lakehouse and libraries to share a single spark session.

## Session sharing conditions

For notebooks to share a single Spark session, they must:

* Be run by the same user.
* Have the same default lakehouse. Notebooks without a default lakehouse can share sessions with other notebooks that don't have a default lakehouse.
* Have the same Spark compute configurations.
* Have the same library packages. You can have different inline library installations as part of notebook cells and still share the session with notebooks having different library dependencies.

## Configure high concurrency mode

By default, all the Fabric workspaces are enabled with high concurrency mode. Use the following steps to configure the high concurrency feature:

1. Click on **Workspace settings** option in your Fabric workspace.

1. Navigate to the **Data Engineering/Science** section > **Spark settings** > **High concurrency**.

1. In the **High concurrency** section, enable the **For notebooks** setting. You can choose to **enable** or **disable** the setting from this pane.

   :::image type="content" source="media\high-concurrency-mode-for-notebooks\workspace-settings-high-concurrency-section-selected.png" alt-text="Screenshot showing the high concurrency section in workspace settings." lightbox="media\high-concurrency-mode-for-notebooks\workspace-settings-high-concurrency-section-selected.png":::

1. Enabling the high concurrency option allows users to start a high concurrency session in their notebooks or attach to existing high concurrency session.

1. Disabling the high concurrency mode hides the section to configure the time period of inactivity and also hides the option to start a new high concurrency session from the notebook menu.

   :::image type="content" source="media\high-concurrency-mode-for-notebooks\workspace-setting-disable-high-concurrency-mode.png" alt-text="Screenshot showing the high concurrency option disabled in workspace settings." lightbox="media\high-concurrency-mode-for-notebooks\workspace-setting-disable-high-concurrency-mode.png":::

## Run notebooks in high concurrency session

1. Open the Fabric workspace.

1. Create a notebook or open an existing notebook.

1. Navigate to the **Run** tab in the menu ribbon and select the **session type** dropdown that has **Standard** selected as the default option.

   :::image type="content" source="media\high-concurrency-mode-for-notebooks\start-high-concurrency-session.png" alt-text="Screenshot showing the high concurrency option in the Notebook menu." lightbox="media\high-concurrency-mode-for-notebooks\start-high-concurrency-session.png":::

1. Select **New high concurrency session**.

1. Once the high concurrency session has started, you could now add upto 5 notebooks in the high concurrency session.

   :::image type="content" source="media\high-concurrency-mode-for-notebooks\start-new-high-concurrency-session-from-sessions.png" alt-text="Screenshot showing the option to start a new high concurrency session in the Notebook menu." lightbox="media\high-concurrency-mode-for-notebooks\start-new-high-concurrency-session-from-sessions.png":::

1. Create a new notebook and by navigating to the **Run** menu as mentioned in the above steps, in the drop-down menu you will now see the newly created high concurrency session listed.

1. Selecting the existing high concurrency session attaches the second notebook to the session.

   :::image type="content" source="media\high-concurrency-mode-for-notebooks\attach-session.png" alt-text="Screenshot showing the option to attach to an existing high concurrency session in the Notebook menu." lightbox="media\high-concurrency-mode-for-notebooks\attach-session.png":::

1. Once the notebook has been attached, you can start executing the notebook steps instantly.

1. The high concurrency session status also shows the number of notebooks attached to a given session at any point in time.

1. At any point in time if you feel the notebook attached to a high concurrency session requires more dedicated compute, you can choose to switch the notebook to a standard session by selecting the option to detach the notebook from the high concurrency in the Run menu tab.

    :::image type="content" source="media\high-concurrency-mode-for-notebooks\detach-to-standard-session.png" alt-text="Screenshot showing the option to detach from a high concurrency session in the Notebook menu." lightbox="media\high-concurrency-mode-for-notebooks\detach-to-standard-session.png":::

1. You can view the session status, type, and ID in the **status bar**. Select the **Session ID** to explore the jobs executed in this high concurrency session and to view logs of the spark session on the monitoring detail page.

   :::image type="content" source="media\high-concurrency-mode-for-notebooks\monitoring-front-door.png" alt-text="Screenshot showing the session details of a high concurrency session in the Notebook menu." lightbox="media\high-concurrency-mode-for-notebooks\monitoring-front-door.png":::

You can also configure high concurrency mode for notebooks in pipelines and use [session tags to group shared sessions](configure-high-concurrency-session-notebooks-in-pipelines.md#use-session-tag-in-notebook-to-group-shared-sessions).

## Monitoring and debugging notebooks running in high concurrency session

Monitoring and debugging are often a non-trivial task when you are running multiple notebooks in a shared session. For high concurrency mode in Fabric, separation of logs is offered which would allow users to trace the logs emitted by spark events from different notebooks.

1. When the session is in progress or in completed state, you can view the session status by navigating to the **Run** menu and selecting the **All Runs** option

1. This would open up the run history of the notebook showing the list of current active and historic spark sessions

   :::image type="content" source="media\high-concurrency-mode-for-notebooks\view-all-runs-in-high-concurrency-mode.png" alt-text="Screenshot showing the all runs page for a notebook in a high concurrency session." lightbox="media\high-concurrency-mode-for-notebooks\view-all-runs-in-high-concurrency-mode.png":::
  
1. Users by selecting a session, can access the monitoring detail view, which shows the list of all the spark jobs that have been run in the session.

1. In the case of high concurrency session, users could identify the jobs and its associated logs from different notebooks using the **Related notebook** tab, which shows the notebook from which that job has been run.

   :::image type="content" source="media\high-concurrency-mode-for-notebooks\view-related-notebooks-in-high-concurrency-mode.png" alt-text="Screenshot showing the all related notebooks for high concurrency session in the monitoring detail view." lightbox="media\high-concurrency-mode-for-notebooks\view-related-notebooks-in-high-concurrency-mode.png":::

## Related content

In this document, you get a basic understanding of a session sharing through high concurrency mode in notebooks. Advance to the next articles to learn how to create and get started with your own Data Engineering experiences using Lakehouse and Notebooks:

* To get started with Lakehouse, see [Create a lakehouse in Microsoft Fabric](create-lakehouse.md).
* To get started with notebooks, see [How to use a Microsoft Fabric notebooks](how-to-use-notebook.md).
