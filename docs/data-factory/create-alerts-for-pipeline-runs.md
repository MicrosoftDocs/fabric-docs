---
title: Create alerts for pipeline runs
description: Explanation of how to generate alerts for pipeline runs
ms.reviewer: whhender
ms.author: makromer
ms.topic: conceptual
ms.custom: pipelines
ms.date: 07/24/2025
author: kromerm
---

# Concept: Create alerts for pipeline runs

Operationalizing your Fabric Data Factory pipelines means more than scheduling or setting trigger events to invoke your pipelines. A well-run operationalized data integration project includes proactive monitoring and alerting upon pipeline events, mainly succeed and failed. This allows you to actively monitor the health of your pipelines both at the activity level and the pipeline level.

> [!VIDEO (https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/video-embed-one-stream.html?id=3410e513-faef-4b15-8a46-7487a8086f85)]

## Activity level alerts

Let's start at the pipeline activity level. To create alerts at the activity level, you'll add either an Outlook (to send email) or a Teams (to send a Teams message) activity after the activity that you wish to actively monitor.

:::image type="content" source="media/create-alerts/pipeline-outlook.png" alt-text="Screenshot showing an activity pipeline run with an alert.":::

## Pipeline level alerts

Perhaps you'd rather actively monitor the entirety of your pipeline (create, delete, update) or the status of the pipeline run (succeed, fail). That's very easy in Fabric as well. You can follow these steps below:

1. Go to your Fabric Workspace and create a new Activator item

:::image type="content" source="media/create-alerts/data-activator-tile.png" alt-text="Screenshot showing an activator item.":::

1. Once the Activator item is ready, choose the Get Data tile

:::image type="content" source="media/create-alerts/data-activator-get-data.png" alt-text="Screenshot showing an activator get data tile."::: 

1. Pipelines are invoked from schedules and triggers as job events. So you'll pick job events next.

:::image type="content" source="media/create-alerts/data-activator-job-events.png" alt-text="Screenshot showing an activator job event.":::

1. Now you can pick which pipeline you wish to actively monitor and which event you are interested in

:::image type="content" source="media/create-alerts/data-activator-pipeline.png" alt-text="Screenshot showing an activator pipeline selected.":::

1. Next step is to select the action you'd like to take such as sending an email or Teams notification upon pipeline events

:::image type="content" source="media/create-alerts/data-activator-rule.png" alt-text="Screenshot showing an activator job rule.":::

1. Final step is to configure your notification and that's it! You're done!

:::image type="content" source="media/create-alerts/data-activator-email.png" alt-text="Screenshot showing an activator email setting.":::


## Related content

- [How to monitor data pipeline runs in Fabric Monitor Hub](monitor-pipeline-runs.md)
- [Tutorial: Create pipeline alerts in Activator](../real-time-intelligence/data-activator/activator-tutorial.md)
