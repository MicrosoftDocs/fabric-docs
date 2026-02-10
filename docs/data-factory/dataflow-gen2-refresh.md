---
title: Dataflow Gen2 refresh
description: Explanation of what a dataflow refresh is, including on-demand and scheduled refresh.
author: Luitwieler
ms.author: jeluitwi
ms.service: fabric
ms.topic: concept-article #Required; leave this attribute/value as-is.
ms.date: 2/4/2026
ms.custom: dataflows
---

# Dataflow refresh

Dataflows enable you to connect to, transform, combine, and load data to storage for downstream consumption. A key element in dataflows is the refresh process, which applies the transformation steps defined during authoring to extract, transform, and load data to the target storage.

:::image type="content" source="media/concept-dataflow-refresh/simple-dataflow.png" alt-text="Screenshot showing a sample dataflow.":::

A dataflow refresh can be triggered in one of two ways, either on-demand or by setting up a refresh schedule. A scheduled refresh is run based on the specific days and times you specify.

## Prerequisites

Here are the prerequisites for refreshing a dataflow:

- [Quickstart: Quickstart: Create your first dataflow to get and transform data](create-first-dataflow-gen2.md)
- User who triggers the refresh must have member (or higher) access to the workspace, and access to all connections used by the dataflow  

## On-demand refresh

To refresh a dataflow on-demand, select **Refresh** icon found in workspace list or lineage views.

:::image type="content" source="media/concept-dataflow-refresh/refresh-dataflow-now.png" alt-text="Screenshot showing where to select refresh in the workspace list view.":::

There are other ways an on-demand dataflow refresh can be triggered. When a dataflow publish completes successfully, an on-demand refresh is started. On-demand refresh can also be triggered via [a pipeline that contains a dataflow activity](dataflow-activity.md).

## Scheduled refresh

To automatically refresh a dataflow on a schedule, select **Scheduled Refresh** icon found in workspace list view:

:::image type="content" source="media/concept-dataflow-refresh/schedule-dataflow-refresh.png" alt-text="Screenshot showing where to select scheduled refresh in the workspace list view.":::

The refresh section is where you can define the frequency and time slots to refresh a dataflow, up to 48 times per day. The following screenshot shows a daily refresh schedule on a 12 hour interval.

:::image type="content" source="media/concept-dataflow-refresh/configure-dataflow-refresh-schedule.png" alt-text="Screenshot showing example of a 12 hour daily schedule refresh setting.":::

## Cancel refresh

Cancel dataflow refresh is useful when you want to stop a refresh during peak time, if a capacity is nearing its limits, or if refresh is taking longer than expected. Use the refresh cancellation feature to stop refreshing dataflows.

To cancel a dataflow refresh, select **Cancel** icon found in workspace list or lineage views for a dataflow with in-progress refresh.

:::image type="content" source="media/concept-dataflow-refresh/cancel-dataflow-refresh.png" alt-text="Screenshot showing where to configure dataflow refresh schedule in the dataflow settings page.":::

Once a dataflow refresh is canceled, the dataflow's refresh history status is updated to reflect cancelation status:

:::image type="content" source="media/concept-dataflow-refresh/canceled-dataflow-refresh-history.png" alt-text="Screenshot showing the dataflows refresh history view for a canceled dataflow refresh.":::

## Refresh limitations

For dataflow refreshes, a couple of limitations are in place:

1. Each dataflow is allowed up to 300 refreshes per 24-hour rolling window. If this limit is exceeded, an error may appear in the refresh history, and refreshes will resume once usage drops below the threshold. For non-CI/CD Dataflows Gen2, the limit is 150 refreshes per 24-hour rolling window.
2. In addition to the per-dataflow limits, system-level throttling may apply to protect overall service stability. This means that while 300 refreshes spread across 24 hours is acceptable, attempting 300 refreshes within a short burst (e.g., 60 seconds) may trigger throttling and result in rejected requests. These protections are in place to ensure system reliability.
3. If your scheduled dataflow refresh fails consecutively, we pause your dataflow refresh schedule and send the owner of the dataflow an email. The following rules apply in this case:
   - 72 hours (3 days)
     - 100% failure rate over 72 hours
     - Minimum of 6 refreshes (2 refreshes a day)
   - 168 hours (1 week)
     - 100% failure rate over 168 hours
     - Minimum of 5 refreshes (1 refresh a day)
4. A single evaluation of a query has a limit of 8 hours.
5. Total refresh time of a single refresh of a dataflow is limited to a max of 24 hours.
6. Per dataflow you can have a maximum of 50 staged queries, or queries with output destination, or combination of both. 

### Refresh cancelation implications to output data

A dataflow refresh can be stopped via cancel refresh feature or if a failure occurred during processing of the dataflow's queries. Different outcomes can be observed depending on the type of destination and when refresh was stopped. Here are the possible outcomes, for the two types of data destination for a query:

- Query is loading data to staging: Data from the last successful refresh is available.
- Query is loading data to a data destination: Data written up to the point of cancelation is available.

Not all queries in a dataflow are processed at the same time, for example, if a dataflow contains many queries or some queries depend on others. If a refresh is canceled before evaluation of a query that loads data to a destination began, there's no change to data in that query's destination.

## Related content

- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)