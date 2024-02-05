---
title: An overview of refresh history and monitoring for dataflows.
description: An overview of refresh history and monitoring for dataflows features.
author: luitwieler
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.author: jeluitwi
---

# View refresh history and monitor your dataflows

Monitoring your dataflow refreshes is key in ensuring that your dataflows are running as expected. Refresh history and monitoring hub allows you to evaluate in detail what happened during the refresh of your dataflow. This article provides you with an overview of the features that are available in the refresh history and monitoring hub. We also provide you with some guidance on how to use these features.

## Refresh history

Refresh history is available using the drop-down menu in your workspace. You can access it by selecting the **Refresh History** button.

:::image type="content" source="./media/dataflows-gen2-monitor/open-refresh-history.png" alt-text="Screenshot of the dataflow dropdown box with Refresh history emphasized." lightbox="./media/dataflows-gen2-monitor/open-refresh-history.png":::

When you open your dataflow refresh history, you first notice a list of all your data refreshes. This first screen provides you with information about:

- Start time
- Status
- Duration
- Type

:::image type="content" source="./media/dataflows-gen2-monitor/refresh-history.png" alt-text="Screenshot of the refresh history screen." lightbox="./media/dataflows-gen2-monitor/refresh-history.png":::

You can take some actions right away from this page like start a new refresh, schedule a refresh, or edit the dataflow.

### Download a CSV file of the refresh

Some times you might need to get a CSV file of your refresh. To get this file, take the following steps:

1. Open the refresh history of the dataflow.
1. Select the run you want to get a CSV file from.
1. Download the CSV.

   :::image type="content" source="./media/dataflows-gen2-monitor/download-csv.png" alt-text="Screenshot emphasizing the particular refresh you want to download, and the download as CSV selection." lightbox="./media/dataflows-gen2-monitor/download-csv.png":::

### Reviewing your dataflow refresh from the UI

Once you've determined which dataflow you want to investigate, you can drill down into one of the refreshes by selecting the **Start time** field. This screen provides you with more information about the refresh that was performed. This includes general information about the refresh and a list of tables and activities.

:::image type="content" source="./media/dataflows-gen2-monitor/refresh-details.png" alt-text="Screenshot showing an overview of the refresh history." lightbox="./media/dataflows-gen2-monitor/refresh-details.png":::

In short, this overview provides you:

- Status of the dataflow
- Type of refresh
- Start and End time
- Duration
- Request ID
- Session ID
- Dataflow ID

The **Tables** section reflects all the entities you've enabled load for in your dataflow. Meaning that those tables shown here are being loaded into the staging area of your dataflow. These tables are the entities you can access using the Power Query Dataflow connector in Power BI, Excel, or dataflows. You can select any of the listed table names to view the details of this specific table. Once you select the name, you arrive at the following **Details** screen:

:::image type="content" source="./media/dataflows-gen2-monitor/table-details.png" alt-text="Screenshot of the Details screen, showing the details of the specific table." lightbox="./media/dataflows-gen2-monitor/table-details.png":::

The **Activities** section reflects all the actions that have taken place during the refresh, for example loading data to your output destination. This table also allows you to dive deeper into the details of the specific activity. By selecting the name of the activity, you arrive at the following **Details** screen:

:::image type="content" source="./media/dataflows-gen2-monitor/activity-details.png" alt-text="Screenshot of the Details screen, showing the details of the specific activity." lightbox="./media/dataflows-gen2-monitor/activity-details.png":::

This screen gives you more clarity in what happened during the activity. For example, for output destinations the activity screen provides you with the:

- Status of the Activity
- Start and End time
- Duration
- Activity statistics:
  - Output destinations:
    - Endpoints contacted
    - Volume processed by the connector

To investigate what happened, you can drill down into an activity or table. The following screen provides you with general information about the refresh and errors. If you're drilling into an activity, you are presented with how much data got processed and sent to your output destination.

## Monitoring hub

The monitoring hub is available using the side menu. You can access it by selecting the **Monitoring hub** button.

:::image type="content" source="./media/dataflows-gen2-monitor/open-monitoring-hub.png" alt-text="Screenshot of the monitoring hub button.":::

The monitoring hub provides you with a dashboard that gives you an overview of the status of your dataflows.

:::image type="content" source="./media/dataflows-gen2-monitor/monitor-hub.png" alt-text="Screenshot of the monitoring hub dashboard." lightbox="./media/dataflows-gen2-monitor/monitor-hub.png":::

This dashboard provides you with the following information:

- Status of your dataflows
- Start time of the refresh
- Refresh duration
- Submitter of the refresh
- Workspace name
- Fabric capacity used for the refresh of your dataflow
- Average refresh duration
- Number of refreshes per day
- Type of refresh

## Related content

- [Compare differences between Dataflow Gen1 and Gen2 in Data Factory](dataflows-gen2-overview.md)
- [Dataflows save as draft](dataflows-gen2-save-draft.md)
