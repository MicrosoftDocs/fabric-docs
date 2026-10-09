---
title: Activity Retries in Microsoft Fabric Data Factory
description: Learn about activity retries.
ms.reviewer: n0elleli
ms.topic: overview
ms.date: 08/14/2026
ms.custom: pipelines 
ms.search.form: Pipeline Activity Retry Overview 
ai-usage: ai-assisted
--- 

# Activity retries in Microsoft Fabric Data Factory

Most [pipeline activities](activity-overview.md) in Data Factory support automated retries. When an activity fails due to a transient error (a throttled API, a brief service outage, or a flapping dependency), you can configure it to automatically retry a set number of times before marking the activity as failed. 

You can also control [how long the activity waits between attempts](#retry-intervals), and set retry number and wait individually for each activity, to tune retry behavior precisely across your workflow.

## Configure retry settings in an activity

To set up retry behavior for an activity:

1. Select the activity on the pipeline canvas.
1. In the **General** tab of the properties pane, select the **Enable retries** checkbox to turn on retry functionality.

   :::image type="content" source="media/activity-retries/enable-retry-settings.png" alt-text="Screenshot showing the retry settings in the General tab of an activity's properties pane, including Enable retries highlighted, Retry count, Retry conditions, and Retry interval.":::
   
1. Set the **Retry** field to the number of retry attempts. Enter a value between 1 and 1000. Default value is 1.
1. Under **Retry interval type**, select **Fixed** or **Increasing Delay** to control how the wait time between attempts is calculated. Then set the interval fields for your chosen type. See [Retry intervals](#retry-intervals) for details.

   :::image type="content" source="media/activity-retries/fixed-interval-type.png" alt-text="Screenshot showing the retry interval setting set to the fixed interval type in the General tab of an activity's properties pane.":::

   :::image type="content" source="media/activity-retries/increasing-delay-interval-type.png" alt-text="Screenshot showing the retry interval setting set to the increasing delay interval type in the General tab of an activity's properties pane.":::
   
1. Optionally, configure **Retry conditions (preview)** to control when retries occur based on specific error criteria.

   :::image type="content" source="media/activity-retries/retry-conditions.png" alt-text="Screenshot showing the retry conditions settings in the General tab of an activity's properties pane.":::

## Retry intervals

The retry interval controls how long an activity waits between attempts. Use Fixed for brief, predictable failures. Use Increasing Delay for longer outages. It implements exponential back-off, where the wait time grows with each attempt, giving upstream services progressively more time to recover.

The **Retry interval type** setting controls which approach to use.

| Type | Behavior |
|------|----------|
| [**Fixed** (default)](#fixed) | Waits the same number of seconds between every attempt. |
| [**Increasing Delay**](#increasing-delay) | Uses exponential back-off: each retry waits a random interval from a range that grows exponentially, up to a configurable maximum. |

### Fixed

When you select **Fixed**, the activity waits the same number of seconds between every retry attempt. Use this type when failures are brief and predictable.

Set **Retry interval (sec)** to the number of seconds to wait. The default is 30 seconds.

:::image type="content" source="media/activity-retries/fixed-interval-type.png" alt-text="Screenshot showing the retry interval setting set to the fixed interval type in the General tab of an activity's properties pane.":::

### Increasing delay

When you select **Increasing Delay**, the wait time grows exponentially between attempts, a pattern known as *exponential back-off*. This pattern gives upstream services progressively more time to recover, reduces repeated load on struggling systems, and lets pipelines self-recover from longer outages without manual intervention.


The retry engine selects a random interval from an exponentially growing range before each attempt:

| Retry | Minimum of range | Maximum of range |
|-------|-----------------|-----------------|
| 1 | max(0, *min interval*) | min(*interval*, *max interval*) |
| 2 | max(*interval*, *min interval*) | min(2 × *interval*, *max interval*) |
| 3 | max(2 × *interval*, *min interval*) | min(4 × *interval*, *max interval*) |
| 4 | max(4 × *interval*, *min interval*) | min(8 × *interval*, *max interval*) |
| … | … | … |

The range doubles with each attempt until the upper bound reaches **Max retry interval**, after which all remaining retries wait at that maximum. The random selection within each range reduces the chance that concurrent pipeline retries collide on the same upstream system at the same moment.

Two fields are available when Increasing Delay is selected:

| Field | Description | Default |
|-------|-------------|---------|
| **Retry interval (sec)** | The starting interval. Defines the base of the back-off range. | 30 seconds |
| **Max retry interval (sec)** | The upper bound on the wait interval. Retries never wait longer than this value. | 3600 seconds |

:::image type="content" source="media/activity-retries/increasing-delay-interval-type.png" alt-text="Screenshot showing the retry interval setting set to the increasing delay interval type in the General tab of an activity's properties pane.":::

> [!NOTE]
> Retry interval fields don't support dynamic expressions. Values must be static integers.

## Configure retry conditions (preview)

By default, an activity retries on any failure. Use **Retry conditions** to specify which errors trigger a retry. This approach helps you avoid wasting retries on errors that don't resolve, such as authentication failures.


To add a retry condition:

1. In the **Retry conditions (preview)** section, select the **+** button to add a new condition row.
1. Choose a **Field** to evaluate:
   - **Error message**: The text content of the error message.
   - **Failure type**: The category of failure, such as User error or System error.
   - **Error code**: The specific error code returned, such as 429 for rate limiting.
1. Select an **Operator** to define the match type, such as **Contains**.
1. Enter a **Value** to match against.
1. Use the **And/Or** column to combine multiple conditions. Select **And** to require all conditions to match, or **Or** to retry when any condition matches.

For example, to retry only on rate limiting errors, add a condition with **Field** set to `Error code`, **Operator** set to `Contains`, and **Value** set to `429`.

> [!IMPORTANT]
> The retry interval runs *before* the condition is evaluated. For example, if you set a 1-hour retry interval and the retry condition isn't met, the pipeline still waits the full hour before proceeding to the next activity or ending the pipeline run.

> [!TIP]
> When you don't specify retry conditions, the activity retries on all failures. Add conditions to be more selective about which errors trigger retries.


### Known retry limitations

- **Activity support**: Conditional retries are supported for specific activity types, including Copy data, Notebook, Dataflow, and Stored procedure activities.
- **Error properties**: Retry conditions can match on error code, error message, and failure type. Not all connector-specific error fields are available for matching.

## Related content

- [Activity overview](activity-overview.md)
- [Create your first pipeline](create-first-pipeline-with-sample-data.md) 
