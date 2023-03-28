---
title: An overview of dataflows refresh history
description: An overview of dataflow refresh history features.
author: luitwieler

ms.topic: conceptual
ms.date: 03/28/2023
ms.author: jeluitwi

---

# Dataflows Refresh history and monitoring

Monitoring your dataflow refreshes is key in ensuring that your Dataflows are running as expected. Refresh history and monitoring hub allows you to evaluate in detail what happened during the refresh of your dataflow. This page provides you with an overview of the features that are available in the refresh history and monitoring hub. We also provide you with some guidance on how to use these features.

## Refresh History

Refresh history is available via the drop-down menu in your workspace. You can access it by clicking on the **Refresh History** button.
    ![Open Refresh History](./media/dataflowsgen2-monitoring/open-refreshhistory.png)

When you open the refresh history of your dataflow, you first see a list of all the refreshes of your data. This first screen provides you with information about:

- Start time
- Status
- Duration
- Type

![Open Refresh History](./media/dataflowsgen2-monitoring/refresh-history.png)

You can take some actions right away from this page like start a new refresh, schedule a refresh, or edit the dataflow.

### Download a CSV file of the refresh

Some times you are in need of getting a CSV file of your refresh. To get this, you take the following steps:

1. Open the refresh history of the dataflow
1. Select the run you want to get a CSV file from
1. Download the CSV

    ![Select refresh](./media/dataflowsgen2-monitoring/download-csv.png)

### Reviewing your dataflow refresh from the UI

Once you've determined which one, you want to investigate you can drill down into one of the refreshes by clicking on the **Start time** field. This screen provides you with more information about the refresh that was performed. This includes general information about the refresh and a list of Tables and Activities.

![Refresh Details](./media/dataflowsgen2-monitoring/refresh-details.png)

In short, this overview provides you:

- Status of the dataflow
- Type of refresh
- Start and End time
- Duration
- Request ID
- Session ID
- Dataflow ID

The Tables section reflects all the entities you have enabled load for in your dataflow. Meaning that those tables shown here are being loaded into the staging area of your dataflow. These tables are the entities you can access via the Power Query Dataflow connector in Power BI, Excel or Dataflows. You can select on any of the tables names listed to view the details of this specific table. Once you do that you arrive on this screen:

![Refresh Details Table](./media/dataflowsgen2-monitoring/table-details.png)

The Activities section reflects all the actions that have taken place during the refresh, for example loading data to your output destination. This table also allows you to dive deeper into the details of the specific activity. By clicking on the name of the activity, you arrive on this screen:

![Refresh Details](./media/dataflowsgen2-monitoring/activity-details.png)

This screen gives you more clarity in what happened during the activity. For Output destinations we provide you:

- Status of the Activity
- Start and End time
- Duration
- Activity statistics:
  - Output destinations:
    - Endpoints contacted
    - Volume processed by the connector

To investigate what happened, you can drill down into an activity or table. The following screen provides you with general information about the refresh and errors. If you're drilling into an activity, you are presented with how much data got processed and sent to your output destination.

## Monitor Hub

The monitor hub is available via the side menu in your workspace. You can access it by clicking on the **Monitor** button.

![Open Monitor Hub](./media/dataflowsgen2-monitoring/open-monitoringhub.png)

The monitor hub provides you with a dashboard that gives you an overview of the status of your dataflows.

![Monitor Hub](./media/dataflowsgen2-monitoring/monitor-hub.png)

This dashboard provides you with the following information:

- Status of your dataflows
- Start time of the refresh
- Refresh duration
- Submitter of the refresh
- Workspace name
- Fabric Capacity used for the refresh of your dataflow
- Average refresh duration
- Number of refreshes per day
- Type of refresh
