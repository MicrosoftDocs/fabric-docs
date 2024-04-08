---
title: Dataflow Gen2 refresh
description: Explanation of what a dataflow refresh is, including on-demand and scheduled refresh.
author: bensack
ms.author: bensack
ms.service: fabric
ms.topic: concept-article #Required; leave this attribute/value as-is.
ms.date: 2/1/2024
---

# Dataflow refresh

Dataflows enable you to connect to, transform, combine, and load data to storage for downstream consumption. A key element in dataflows is the refresh process, which applies the transformation steps defined during authoring to extract, transform, and load data to the target storage.

:::image type="content" source="media/concept-dataflow-refresh/simple-dataflow.png" alt-text="Screenshot showing a sample dataflow.":::

A dataflow refresh can be triggered in one of two ways, either on-demand or by setting up a refresh schedule. A scheduled refresh is run based on the specific days and times you specify.

## Prerequisites

Here are the prerequisites for refreshing a dataflow:

- [Quickstart: Quickstart: Create your first dataflow to get and transform data](create-first-dataflow-gen2.md)

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

### Refresh cancelation implications to output data

A dataflow refresh can be stopped via cancel refresh feature or if a failure occurred during processing of the dataflow's queries. Different outcomes can be observed depending on the type of destination and when refresh was stopped. Here are the possible outcomes, for the two types of data destination for a query:

- Query is loading data to staging: Data from the last successful refresh is available.
- Query is loading data to a data destination: Data written up to the point of cancelation is available.

Not all queries in a dataflow are processed at the same time, for example, if a dataflow contains many queries or some queries depend on others. If a refresh is canceled before evaluation of a query that loads data to a destination began, there's no change to data in that query's destination.

## Related content

- [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md)
