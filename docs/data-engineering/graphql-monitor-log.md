---
title: GraphQL monitoring dashboard and logging (preview) 
description: Learn about GraphQL Monitoring dashboard and Logging and how it's being used, which enable developers to monitor API activities and troubleshoot errors and inefficiencies. 
author: eric-urban
ms.author: eur
ms.reviewer: hhosseinpour
ms.topic: how-to 
ms.date: 11/19/2024

---

# GraphQL monitoring dashboard and logging (preview)

> [!NOTE]
> Monitoring Dashboard and Logging feature for Fabric API for GraphQL is in **preview**.

After deploying an API for GraphQL in Fabric, you may want to understand how the API is being used by clients and troubleshoot errors in case there are any problems with the API. Use the Fabric GraphQL monitoring dashboard to visualize, monitor, and troubleshoot your GraphQL API request activity. This feature is currently in preview. This article explains how to enable monitoring and use the dashboard's components effectively.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

* Enabled **workspace monitoring**. For more information, see [**Workspace Monitoring Overview**](..\get-started\workspace-monitoring-overview.md) and follow the steps to **enable workspace monitoring**.
* Before you start using the monitoring and logging capabilities, you must have an API for GraphQL in Fabric. For more information, see [**Create an API for GraphQL in Fabric and add data**](get-started-api-graphql.md).

> [!NOTE]
>
> * Monitoring feature incurs [**additional charges**](https://blog.fabric.microsoft.com/blog/15036/preview) against your capacity.
> * Workspace monitoring is disabled by default.
> * Data retention for activity monitoring is limited to **30 days**.

## Enabling GraphQL API monitoring

In this section, we walk you through the steps needed to enable monitoring for your API for GraphQL.  By default, this feature is turned off.  

1. To enable **metrics** and/or **logging** experience for each API for GraphQL in your tenant, open your GraphQL API and then select on **Settings** icon:

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-graphql-settings.png" alt-text="Screenshot of selecting API for GraphQL settings.":::

1. From the API settings window, select the **Monitoring (preview)** option from the left-hand menu. If [**workspace monitoring**](..\get-started\workspace-monitoring-overview.md) hasn't been already enabled, you'll see a note guiding you to go to the **workspace settings** to enable it.

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-enable-monitor.png" alt-text="Screenshot of selecting Monitoring from the API for GraphQL settings.":::

1. After you enable monitoring for the workspace, you'll see the options to enable **Metrics** only (API dashboard), **Logging** only (API requests), or both. The metrics and logs are saved to separate tables in Kusto, and you can enable each feature separately depending on your requirement. By default, both options are turned off:  

   :::image type="content" source="media\graphql-monitor-log\graphql-monitor-enable-metrics-log.png" alt-text="Screenshot of Metrics and Logging Toggles from the Monitoring setting of API for GraphQL.":::

> [!NOTE]
> Metrics and logging data is separately sent to the Kusto database associated with the workspace and it incurs additional costs. For further information about the cost and consumption usage, see the [**Workspace Monitoring Announcement**](https://blog.fabric.microsoft.com/blog/15036/preview).

## API request activity

Once monitoring is enabled, the **API request activity** option in the top ribbon from the GraphQL API becomes active. Select it to access monitoring details.

:::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-request-activity.png" alt-text="Screenshot of API request activity tab from the top ribbon.":::

The **API request activity** consists of two primary views:

1. **API dashboard (for Metrics)**: This page displays all counters and graphs for the specified time range.
1. **API requests (for Logging)**: This page lists API requests within the specified time range.

In the following sections, we describe the functionality of each option.  

## Metrics (API dashboard)

The API dashboard provides an overview of API activity for you with various metrics and visuals. To access, from the **API request activity** page, select **API dashboard** tab. You're now able to view at a glance the following parameters for a specific time range:

* Overall GraphQL API Health index that includes:
  * API request/sec
  * Success rate
  * Health Status

* Number of API requests
* Latency
* Number of requests in bar chart illustrating number of successes and errors

By hovering over the graph, you can see the detailed information for a specific data point in a tooltip.

:::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-main-view.png" alt-text="Screenshot of API dashboard.":::

**Metrics Key Features:**

* **Time Range Selection**: You can select different time ranges for the data displayed in the monitoring graphs. Note that due to **workspace monitoring** limits, the data retention is only available for **30 days**.

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-time-range.png" alt-text="Screenshot of API dashboard showing the time range option.":::

* **API Request/sec**: You can view the number of API requests made each second in the selected time range.  

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-api-per-sec.png" alt-text="Screenshot of API dashboard showing the number of API requests per second.":::

* **Success rate**: You can view the success rate which is the number of successful requests over the total number of requests in the selected time range.

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-success-rate.png" alt-text="Screenshot of API dashboard showing the success rate.":::

* Overall GraphQL API Health index based on success rate per API:
  * Green: 75 -100% of requests are successful (Healthy)
  * Yellow: 50 - 74% of requests are successful (Needs Attention)
  * Red: Bellow 50% successful requests (Unhealthy)

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-health-index.png" alt-text="Screenshot of API dashboard showing the health index.":::

* **Total Number of API requests**: You can view the total number of API requests in the selected time range.
:::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-api-requests.png" alt-text="Screenshot of API dashboard showing the number of API requests.":::

* **Latency** line chart: By hovering your mouse over graphs, you would be able to see the latency and date for each data point.

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-latency-line-chart.png" alt-text="Screenshot of API dashboard showing the latency bar chart.":::

* **Number of requests** bar chart, differentiating between success requests and errors: By hovering over graphs, you would be able to see the date and number of successes and errors for each data point.

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-request-bar-chart.png" alt-text="Screenshot of API dashboard showing number requests bar chart.":::

When you see abnormal behavior on the dashboard that requires your attention, you can further investigate by looking into logs to identify potential issues and find out which requests failed and have higher latency and start looking into log details to troubleshoot. To access logging details, select the **API requests** tab from the **API request activity** page.

## Logging (API requests)

The API requests page provides detailed information about all the API requests that happened in a specific time frame. To access, select the **API requests** tab from the **API request activity** page.

:::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-request-logs.png" alt-text="Screenshot of API request page showing the list of requests.":::

**Logging Key Features**:

* Time Range Selection: You can select different time ranges for the data displayed in the requests list (Hour/Day/Week/Month). Note there's **30 days retention limit.**

:::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-request-time-range.png" alt-text="Screenshot of API request page showing time range for the list of requests.":::

* View a list of recent API requests and past requests listed with Request ID.
* View the type of the operation (Query or Mutation).
* View the transport protocol used by the request (HTTP).
* View the time of request.
* Sort the list of requests by ascending/descending time.
* View duration of request.
* Sort the list of requests by ascending/descending duration.
* View response size.
* View the Status (Success or Failure).
* View the details of the request, including specific response/warning/error messages.
* Filter and search for specific strings or sentences.
* Resize columns and sort the columns (ascending/descending) from the report table.

## Related content

* [Microsoft Fabric API for GraphQL](api-graphql-overview.md)
* [Workspace Monitoring Announcement](https://blog.fabric.microsoft.com/en-us/blog/15036/preview)
* [Workspace Monitoring Overview](..\get-started\workspace-monitoring-overview.md)
* [API for GraphQL in Fabric](get-started-api-graphql.md)
* [Fabric API for GraphQL Editor](api-graphql-editor.md)
* [Fabric API for GraphQL Schema View and Explorer](graphql-schema-view.md)
