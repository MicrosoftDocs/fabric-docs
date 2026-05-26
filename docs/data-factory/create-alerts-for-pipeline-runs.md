---
title: Create alerts for pipeline runs
description: Explanation of how to generate alerts for pipeline runs
ms.reviewer: makromer
ms.topic: concept-article
ms.custom: pipelines
ms.date: 03/31/2026
---

# Concept: Create alerts for pipeline runs

Operationalizing your Fabric Data Factory pipelines means more than scheduling or setting trigger events to invoke your pipelines. A well-run operationalized data integration project includes proactive monitoring and alerting upon pipeline events, mainly succeed and failed. This allows you to actively monitor the health of your pipelines both at the activity level and the pipeline level.

> [!VIDEO https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/video-embed-one-stream.html?id=3410e513-faef-4b15-8a46-7487a8086f85]

## Activity level alerts

Let's start at the pipeline activity level. To create alerts at the activity level, you'll add either an Outlook (to send email) or a Teams (to send a Teams message) activity after the activity that you wish to actively monitor.

:::image type="content" source="media/create-alerts/pipeline-outlook.png" alt-text="Screenshot showing an activity pipeline run with an alert.":::

## Pipeline level alerts

Perhaps you'd rather actively monitor the entirety of your pipeline (create, delete, update) or the status of the pipeline run (succeed, fail). That's very easy in Fabric as well. 

### Configure failure notifications for scheduled pipeline runs
You can configure email notifications to be sent when a [scheduled pipeline run](pipeline-runs.md#scheduled-pipeline-runs) fails.

To configure failure notifications, open the pipeline, select **Schedule** in the top banner of the **Home** tab, and add users or groups under **Failure notifications**.

To configure failure notifications, open the pipeline, go to the **Home** tab, select **Schedule**, and then add users or groups under **Failure notifications**.

:::image type="content" source="media/pipeline-runs/schedule-failure-notifications.png" alt-text="Screenshot that shows failure notification settings for scheduled pipeline runs." lightbox="media/pipeline-runs/schedule-failure-notifications.png":::

### Advanced alerting scenarios 
For more advanced alerting scenarios—such as monitoring pipeline creation, deletion, updates, or tracking both succeed and failed statuses—you can use [Data Activator](../real-time-intelligence/data-activator/activator-introduction.md). Activator lets you define rules that react to pipeline job events and trigger actions like email or Microsoft Teams notifications. You can follow these steps below:

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

### Alert using an operations agent (Preview)

An operations agent uses AI to continuously monitor pipeline execution data in the workspace monitoring Eventhouse and send alerts to Microsoft Teams or email when it detects anomalies such as long-running jobs. Unlike rule-based Activator alerts, the agent interprets natural-language instructions (a *playbook*), so you can describe alert conditions in plain English rather than writing KQL queries.

The following example configures an operations agent that alerts in Teams whenever a pipeline run exceeds 60 minutes.

#### Example scenario

Your workspace has data pipelines that load data on a recurring schedule. You want to be alerted in Teams whenever a pipeline run takes longer than 60 minutes — without manually checking the Monitoring Hub.

#### Steps overview

1. **Enable workspace monitoring** — provisions the Eventhouse that collects pipeline run data into the `ItemJobEventLogs` table. Requires workspace admin permissions. See [Enable workspace monitoring](/fabric/fundamentals/enable-workspace-monitoring).
1. **Create an operations agent** — in the Fabric portal, create a new Operations agent under Real-Time Intelligence. See [Create and configure operations agents](/fabric/real-time-intelligence/operations-agent).
1. **Configure the agent** — set the business goals, instructions (playbook below), and select the workspace monitoring Eventhouse as the data source.
1. **Save and start** — save the agent to generate its playbook, review the rules, then select **Start**.
1. **Install the Teams app** — search for **Fabric Operations Agent** in the Teams app store. The agent sends alerts to you in Teams when it detects a long-running pipeline.

For detailed configuration steps including actions (email, Power Automate), see [Create and configure operations agents](/fabric/real-time-intelligence/operations-agent).

#### ItemJobEventLogs schema reference

The agent queries the `ItemJobEventLogs` table in the monitoring Eventhouse. The columns used in this playbook are:

| Column | Type | Description |
|--------|------|-------------|
| `Timestamp` | datetime | UTC timestamp when the log entry was generated |
| `ItemKind` | string | Type of item (for example, `Data Pipeline`) |
| `ItemName` | string | Name of the pipeline |
| `JobStatus` | string | Status: Not started, In progress, Completed, Failed |
| `DurationMs` | long | Job duration in milliseconds |
| `JobStartTime` | datetime | Actual job start time |
| `JobEndTime` | datetime | Actual job end time |
| `JobInvokeType` | string | Trigger type: on-demand or scheduled |
| `JobInstanceId` | string | Unique ID of the job instance |
| `WorkspaceName` | string | Name of the workspace containing the item |

For the full schema, see [Item job event logs](/fabric/fundamentals/item-job-event-logs).

#### Playbook: Long-running pipeline alerts

Copy the following into the **Business goals** and **Instructions** fields when configuring your agent.

##### Business goals

```text
Monitor all pipelines in this workspace and alert when any pipeline run takes longer than 60 minutes, so the team can investigate potential bottlenecks or hung jobs.
```

##### Instructions

```text
Please monitor all Pipelines in this workspace for long-running executions.

You can refer to the ItemJobEventLogs table in the Monitoring KQL database:
- The ItemKind column identifies the item type. Filter for "Data Pipeline".
- The DurationMs column shows the job duration in milliseconds.
- The JobStatus column indicates the job status (Completed, Failed, etc.).
- The ItemName column contains the pipeline name.
- The JobStartTime and JobEndTime columns show when the run started and completed.

Long-Running Pipeline Alerts:
If any completed pipeline run has a DurationMs value greater than 3,600,000 (60 minutes), 
send an alert with the following information:

1. Pipeline name (ItemName)
2. Run duration in minutes (DurationMs / 60000, rounded to 1 decimal)
3. Start time and end time of the run (JobStartTime, JobEndTime)
4. How much the run exceeded the 60-minute threshold (e.g., "exceeded by 12.5 minutes")

Format the alert as:
"Long-running pipeline detected: Pipeline [ItemName] completed in [duration] minutes, 
exceeding the 60-minute threshold by [excess] minutes. 
Started at [JobStartTime], ended at [JobEndTime]. 
Please investigate potential bottlenecks or hung activities."

Additional Context When Available:
- If the pipeline has at least 7 days of historical run data, also include how the 
  current duration compares to the 7-day average 
  (e.g., "This run was 2.3x the 7-day average of 28 minutes").
- If the pipeline run failed (JobStatus = "Failed"), include the JobInstanceId so the 
  user can look up error details in the Monitoring Hub.
```

> [!TIP]
> Adjust the threshold to match your workload. Change `3,600,000` (60 minutes) to `300,000` (5 minutes) for shorter pipelines, or `7,200,000` (120 minutes) for longer ones.

#### Verify the setup

1. Run a pipeline you expect to exceed the threshold (or temporarily lower it).
2. Check Teams for a message from the **Fabric Operations Agent** app.

:::image type="content" source="media/create-alerts/operations-agent-teams.png" alt-text="Screenshot showing an operations agent alert in Microsoft Teams.":::

## Related content

- [How to monitor pipeline runs in Fabric Monitor Hub](monitor-pipeline-runs.md)
- [Tutorial: Create pipeline alerts in Activator](../real-time-intelligence/data-activator/activator-tutorial.md)
