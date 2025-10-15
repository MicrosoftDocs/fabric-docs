---
title: Configure high concurrency mode for notebooks in pipelines
description: Discover how to set up and execute high concurrency mode to share sessions across multiple notebooks within pipelines, optimizing Data Engineering and Data Science tasks in Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
- fabcon-2024
- sfi-image-nochange
ms.date: 09/18/2024
---

# Configure high concurrency mode for Fabric notebooks in pipelines

When you execute a notebook step within a pipeline, an Apache Spark session is started and is used to run the queries submitted from the notebook. When you enable high concurrency mode for pipelines, your notebooks will be automatically packed into the existing spark sessions.

This gives you session sharing capability across all the notebooks within a single user boundary. The system automatically packs all the notebooks in an existing high concurrency session.

:::image type="content" source="media/high-concurrency-for-notebooks-in-pipelines/high-concurrency-session-for-pipelines-working.gif" alt-text="Animation showing high concurrency session for notebooks." lightbox="media/high-concurrency-for-notebooks-in-pipelines/high-concurrency-session-for-pipelines-working.gif":::

> [!NOTE]
> Session sharing with high concurrency mode is always within a single user boundary.
> To share a single spark session, the notebooks must have matching spark configurations, they should be part of the same workspace, and share the same default lakehouse and libraries.

## Session sharing conditions

For notebooks to share a single Spark session, they must:

* Be run by the same user.
* Have the same default lakehouse. Notebooks without a default lakehouse can share sessions with other notebooks that don't have a default lakehouse.
* Have the same Spark compute configurations.
* Have the same library packages. You can have different inline library installations as part of notebook cells and still share the session with notebooks having different library dependencies.

## Configure high concurrency mode

Fabric workspace admins can enable the high concurrency mode for pipelines using the workspace settings. Use the following steps to configure the high concurrency feature:

1. Select the **Workspace settings** option in your Fabric workspace.

2. Navigate to the **Data Engineering/Science** section > **Spark settings** > **High concurrency**.

3. In the **High concurrency** section, enable the **For pipeline running multiple notebooks** setting.

   :::image type="content" source="media/high-concurrency-for-notebooks-in-pipelines/workspace-settings-high-concurrency-pipelines.png" alt-text="Screenshot showing the high concurrency section in workspace settings." lightbox="media/high-concurrency-for-notebooks-in-pipelines/workspace-settings-high-concurrency-pipelines.png":::

4. Enabling the high concurrency option allows all the notebook sessions triggered by pipelines as a high concurrency session.

5. The system automatically packs the incoming notebook sessions to active high concurrency sessions. If there are no active high concurrency sessions, a new high concurrency session is created and the concurrent notebooks submitted are packed into the new session.

## Use session tag in notebook to group shared sessions

1. Navigate to your workspace, select the **New item** button, and create a new **Pipeline**.

2. Navigate to the **Activities** tab in the menu ribbon and add a **Notebook** activity.

3. From **Advanced settings**, specify any string value for the **session tag** property.

4. After the session tag is added, the notebook sharing uses this tag as matching criteria bundling all notebooks with the same session tag.

   :::image type="content" source="media/high-concurrency-for-notebooks-in-pipelines/session-tag-high-concurrency-pipelines.png" alt-text="Screenshot showing the option to start a new high concurrency session in Notebook Menu." lightbox="media/high-concurrency-for-notebooks-in-pipelines/session-tag-high-concurrency-pipelines.png":::

> [!NOTE]
> To optimize performance, a single high-concurrency session can share resources across a maximum of 5 notebooks identified by the same session tag. When more than 5 notebooks are submitted with the same tag, the system will automatically create a new high-concurrency session to host the subsequent notebook steps. This allows for efficient scaling and load balancing by distributing the workload across multiple sessions.

## Monitor and debug notebooks triggered by pipelines

Monitoring and debugging can be challenging when multiple notebooks are running within a shared session. In high concurrency mode, log separation is provided, enabling you to trace logs from Spark events for each individual notebook.

1. When the session is in progress or in completed state, you can view the session status by navigating to the **Run** menu and selecting the **All Runs** option.

1. This opens the run history of the notebook with the list of current active and historic spark sessions.

   :::image type="content" source="media/high-concurrency-mode-for-notebooks/view-all-runs-in-high-concurrency-mode.png" alt-text="Screenshot showing the all runs page for a notebook in a high concurrency session." lightbox="media/high-concurrency-mode-for-notebooks/view-all-runs-in-high-concurrency-mode.png":::
  
1. By selecting a session, you can access the monitoring detail view, which displays a list of all Spark jobs executed within that session.

1. For high concurrency session, you can identify the jobs and its associated logs from different notebooks using the **Related notebook** tab, which shows the **notebook** from which that job was run.

   :::image type="content" source="media/high-concurrency-mode-for-notebooks/view-related-notebooks-in-high-concurrency-mode.png" alt-text="Screenshot showing the all related notebooks for high concurrency session in the monitoring detail view." lightbox="media/high-concurrency-mode-for-notebooks/view-related-notebooks-in-high-concurrency-mode.png":::

## Related content

* To learn more about high concurrency mode in Microsoft Fabric, see [High concurrency mode in Apache Spark for Fabric](high-concurrency-overview.md).
* To get started with high concurrency mode for notebooks, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).
