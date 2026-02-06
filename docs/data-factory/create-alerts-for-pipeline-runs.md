---
title: Create alerts for pipeline runs
description: Explanation of how to generate alerts for pipeline runs
ms.reviewer: makromer
ms.topic: concept-article
ms.custom: pipelines
ms.date: 12/15/2025
---

# Concept: Create alerts for pipeline runs

Operationalizing your Fabric Data Factory pipelines means more than scheduling or setting trigger events to invoke your pipelines. A well-run operationalized data integration project includes proactive monitoring and alerting upon pipeline events, mainly succeed and failed. This allows you to actively monitor the health of your pipelines both at the activity level and the pipeline level.

> [!VIDEO https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/video-embed-one-stream.html?id=3410e513-faef-4b15-8a46-7487a8086f85]

## Activity level alerts

Let's start at the pipeline activity level. To create alerts at the activity level, you'll add either an Outlook (to send email) or a Teams (to send a Teams message) activity after the activity that you wish to actively monitor.

:::image type="content" source="media/create-alerts/pipeline-outlook.png" alt-text="Screenshot showing an activity pipeline run with an alert.":::

## Pipeline level alerts

Perhaps you'd rather actively monitor the entirety of your pipeline (create, delete, update) or the status of the pipeline run (succeed, fail). That's very easy in Fabric as well. You can follow these steps below:

1. Go to your Fabric Workspace and create a new Activator item.

:::image type="content" source="media/create-alerts/data-activator-tile.png" alt-text="Screenshot showing an activator item.":::

2. Once the Activator item is ready, choose the Get Data tile.

:::image type="content" source="media/create-alerts/data-activator-get-data.png" alt-text="Screenshot showing an activator get data tile."::: 

3. Pipelines are invoked from schedules and triggers as job events. So you'll pick job events next.

:::image type="content" source="media/create-alerts/data-activator-job-events.png" alt-text="Screenshot showing an activator job event.":::

4. Now you can pick which pipeline you wish to actively monitor and which event you're interested in.

:::image type="content" source="media/create-alerts/data-activator-pipeline.png" alt-text="Screenshot showing an activator pipeline selected.":::

5. Next step is to select the action you'd like to take such as sending an email or Teams notification upon pipeline events.

:::image type="content" source="media/create-alerts/data-activator-rule.png" alt-text="Screenshot showing an activator job rule.":::

6. Final step is to configure your notification and that's it! You're done!

:::image type="content" source="media/create-alerts/data-activator-email.png" alt-text="Screenshot showing an activator email setting.":::

## Workspace level alerts

Workspace-level alerts let you monitor failures across all pipelines and other job runs in a workspace without maintaining individual alert rules. With workspace monitoring enabled, Fabric automatically writes execution logs into an Eventhouse KQL database. You can create a single alert rule that queries recent failures using a KQL Queryset rather than needing to set up individual pipeline alerts as described previously above.
 
* First, enable workspace monitoring. Confirm that workspace monitoring is enabled. When active, Fabric writes platform-level logs such as ItemJobEventLogs into the workspace’s monitoring Eventhouse.

:::image type="content" source="media/create-alerts/workspace-monitor.png" alt-text="Screenshot showing workspace monitoring settings.":::

* Create an alert for workspace-wide pipeline failures with a KQL Queryset and Activator rule to detect pipeline failures across the workspace. Here is an example query that returns recent failures:
   
```
ItemJobEventLogs
| extend SecondsAgo = datetime_diff('second', now(), ingestion_time())
| where JobType == 'Pipeline' and JobStatus == 'Failed'
| where SecondsAgo <= 540
| order by Timestamp desc
| project Timestamp, ItemName, WorkspaceName, JobStartTime, JobEndTime, JobStatus
```

* Create a KQL Queryset and paste the query above.
* Create a new Activator using a KQL Queryset trigger.
* Configure a notification action such as email or Teams.
* Save and enable the alert.


> [!NOTE]
> Activator must poll more frequently than the KQL query window. If Activator is paused or disabled, expected alerts may be missed. Shorter windows reduce duplicates while longer windows capture more failures.

## Related content

- [How to monitor pipeline runs in Fabric Monitor Hub](monitor-pipeline-runs.md)
- [Tutorial: Create pipeline alerts in Activator](../real-time-intelligence/data-activator/activator-tutorial.md)
