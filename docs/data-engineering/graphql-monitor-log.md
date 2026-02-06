---
title: GraphQL monitoring dashboard and logging (preview) 
description: Learn about how GraphQL Monitoring and Logging enables developers to monitor API activities and troubleshoot errors and inefficiencies. 
author: eric-urban
ms.author: eur
ms.reviewer: edlima
ms.topic: how-to
ms.custom: freshness-kr
ms.date: 01/21/2026
---

# GraphQL monitoring dashboard and logging (preview)

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Gain complete visibility into your production GraphQL APIs with Microsoft Fabric's integrated monitoring and logging capabilities. Track real-time performance metrics, analyze query patterns, troubleshoot errors, and understand how clients interact with your APIs—all from within the Fabric workspace.

**Key monitoring capabilities:**
- **Real-time dashboard**: Visualize API performance, response times, and error rates with interactive charts
- **Detailed request logging**: Capture complete request/response data, query complexity, and execution details  
- **Performance analytics**: Identify slow queries, optimize bottlenecks, and track usage trends over time
- **Error tracking**: Monitor failures, investigate root causes, and improve API reliability

This easy-to-understand monitoring dashboard empowers you to make data-driven decisions about your API performance and usage patterns. Whether you're troubleshooting issues, optimizing application performance, or ensuring a smooth user experience, the monitoring tools provide invaluable insights. You can quickly identify and address problems while gaining a deeper understanding of how your APIs are being utilized.

> [!NOTE]
> The monitoring feature incurs extra charges against your capacity.

## Who uses monitoring and logging

GraphQL monitoring and logging are essential for:
- **Fabric workspace admins** monitoring API health, performance, and capacity consumption in real-time
- **Fabric capacity administrators** tracking usage patterns and optimizing capacity allocation for GraphQL workloads
- **Data governance teams** auditing data access, detecting anomalies, and ensuring compliance with data policies
- **Data engineers** analyzing query patterns and optimizing Fabric lakehouse and warehouse access
- **Platform teams** understanding Fabric API adoption and making data-driven decisions about API investments

Use monitoring and logging when you need visibility into production GraphQL API behavior, performance metrics, and usage analytics.

## Prerequisites

* You need to enable workspace monitoring and add an eventhouse for monitoring. For more information about how to enable it, see [Workspace Monitoring Overview](../fundamentals/workspace-monitoring-overview.md). Workspace monitoring is disabled by default.
    > [!NOTE]
    > If you just enabled workspace monitoring, you might need to refresh the page before proceeding with GraphQL monitoring setup.
* You must have a deployed API for GraphQL in Fabric. For more information about how to deploy, see [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md).

## Enabling GraphQL API monitoring

Now that you have workspace monitoring enabled [per the prerequisites](#prerequisites), you need to separately enable monitoring for your specific GraphQL API. GraphQL monitoring is turned off by default and must be enabled for each API individually. Here's how to enable it:

1. To enable the **metrics** and/or **logging** experience for each API for GraphQL in your tenant, open your GraphQL API and then select the **Settings** icon:

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-graphql-settings.png" alt-text="Screenshot of selecting API for GraphQL settings." lightbox="media\graphql-monitor-log\graphql-monitor-graphql-settings.png":::

1. From the API settings window, select the **Monitoring (preview)** page from the left menu. If [workspace monitoring](../fundamentals/workspace-monitoring-overview.md) isn't already enabled, you see a note guiding you to go to the workspace settings to enable it.

1. After you enable monitoring for the workspace, you see the options to enable **Metrics** (View aggregated API activity in a dashboard), **Logging** (View logs with detailed information for each API request), or both.    

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-enable-metrics-log.png" alt-text="Screenshot of Metrics and Logging Toggles from the Monitoring setting of API for GraphQL." lightbox="media\graphql-monitor-log\graphql-monitor-enable-metrics-log.png":::

    > [!NOTE]
    > The metrics and logs are saved to separate tables in the same Kusto database, and you can enable each feature separately depending on your requirement. 

1. Enable the desired options by toggling the switches one at a time to the **On** position.

> [!NOTE]
> Metrics and logging incur extra costs. Access API requests details from [API request activity page](#api-request-activity). 

## API request activity

Once monitoring is enabled, select the **API request activity** button from the top ribbon to access monitoring details.

:::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-request-activity.png" alt-text="Screenshot of API request activity tab from the top ribbon." lightbox="media\graphql-monitor-log\graphql-monitor-api-request-activity.png":::

In the **API request activity** page, you can select one of the following tabs to view specific monitoring data:

1. **API dashboard (for Metrics)**: This page displays all counters and charts for the specified time range.
1. **API requests (for Logging)**: This page lists API requests within the specified time range.

In the following sections, we describe the functionality of each option.  

## Metrics (API dashboard)

The API dashboard provides a comprehensive overview of your GraphQL API performance through interactive charts and metrics. To access the dashboard, select the **API dashboard** tab from the **API request activity** page.

The dashboard displays key performance indicators across customizable time ranges, with all data retained for 30 days. Hover over any chart to see detailed information for specific data points.

:::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-main-view.png" alt-text="Screenshot of API dashboard." lightbox="media\graphql-monitor-log\graphql-monitor-api-dashboard-main-view.png":::

### Health indicators

* **API Health Status**: Visual indicator showing overall API health based on success rate
  * Green: 75-100% successful requests (Healthy)
  * Yellow: 50-74% successful requests (Needs Attention)  
  * Red: Below 50% successful requests (Unhealthy)

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-health-index.png" alt-text="Screenshot of API dashboard showing the health index." lightbox="media\graphql-monitor-log\graphql-monitor-api-dashboard-health-index.png":::

* **Success Rate**: Percentage of successful requests versus total requests in the selected time range

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-success-rate.png" alt-text="Screenshot of API dashboard showing the success rate." lightbox="media\graphql-monitor-log\graphql-monitor-api-dashboard-success-rate.png":::

### Volume metrics

* **API Requests per Second**: Real-time view of request volume over time

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-api-per-sec.png" alt-text="Screenshot of API dashboard showing the number of API requests per second." lightbox="media\graphql-monitor-log\graphql-monitor-api-dashboard-api-per-sec.png":::

* **Total API Requests**: Aggregate count of all requests in the selected time range

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-api-requests.png" alt-text="Screenshot of API dashboard showing the number of API requests." lightbox="media\graphql-monitor-log\graphql-monitor-api-dashboard-api-requests.png":::

* **Request Status Bar Chart**: Visual breakdown showing successful requests versus errors over time

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-request-bar-chart.png" alt-text="Screenshot of API dashboard showing number requests bar chart." lightbox="media\graphql-monitor-log\graphql-monitor-api-dashboard-request-bar-chart.png":::

### Performance metrics

* **Latency Line Chart**: Response time trends showing performance over time

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-latency-line-chart.png" alt-text="Screenshot of API dashboard showing the latency line chart." lightbox="media\graphql-monitor-log\graphql-monitor-api-dashboard-latency-line-chart.png":::

### Customization options

* **Time Range Selection**: Choose from different time windows (hour, day, week, month) to analyze your data. Data retention is limited to 30 days.

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-dashboard-time-range.png" alt-text="Screenshot of API dashboard showing the time range option." lightbox="media\graphql-monitor-log\graphql-monitor-api-dashboard-time-range.png":::

### From overview to details

The **API dashboard** page provides an excellent high-level view of your API's health and performance trends. When you spot issues like declining success rates, increased latency, or unusual request patterns, the **API requests** page [in the next section](#logging-api-requests) gives you the detailed logs needed for investigation.

While the dashboard shows you *what* is happening with your API, the logging page shows you *exactly which requests* are causing problems, complete with error messages, response details, and execution times for individual queries.

## Logging (API requests)

The API requests page captures comprehensive details about every GraphQL operation, enabling deep investigation and troubleshooting. Access this detailed view by selecting the **API requests** tab from the **API request activity** page.

This request-level logging complements the dashboard's overview metrics by providing the granular data needed to diagnose specific issues, optimize slow queries, and understand client behavior patterns.

:::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-request-logs.png" alt-text="Screenshot of API request page showing the list of requests." lightbox="media\graphql-monitor-log\graphql-monitor-api-request-logs.png":::

### Request information

Each logged request includes:

* **Request ID**: Unique identifier for tracking specific operations
* **Operation Type**: Query or Mutation classification
* **Transport Protocol**: HTTP method used for the request
* **Timestamp**: Exact time when the request was received
* **Duration**: Complete execution time from request to response
* **Response Size**: Data payload size returned to the client
* **Status**: Success or failure indicator with detailed error information

### Data exploration tools

* **Time Range Filtering**: Select from hour, day, week, or month views (30-day retention limit)

    :::image type="content" source="media\graphql-monitor-log\graphql-monitor-api-request-time-range.png" alt-text="Screenshot of API request page showing time range for the list of requests." lightbox="media\graphql-monitor-log\graphql-monitor-api-request-time-range.png":::

* **Advanced Sorting**: Sort by timestamp or duration in ascending/descending order
* **Search and Filtering**: Find specific requests using text search across all request details
* **Column Management**: Resize and reorder columns to customize the table view
* **Detailed Inspection**: Click any request to view complete request/response data, including error messages and warnings

### Troubleshooting workflows

Use the logging page to:
* **Identify failing queries**: Filter by status to find errors and investigate root causes
* **Analyze performance bottlenecks**: Sort by duration to find the slowest-executing operations  
* **Track usage patterns**: Review operation types and timing to understand client behavior
* **Debug specific issues**: Search for particular error messages or request IDs reported by users

## Related content

* [Microsoft Fabric API for GraphQL](api-graphql-overview.md)
* [Workspace Monitoring Overview](..\fundamentals\workspace-monitoring-overview.md)
* [API for GraphQL in Fabric](get-started-api-graphql.md)
* [Fabric API for GraphQL Editor](api-graphql-editor.md)
* [Fabric API for GraphQL Schema View and Explorer](graphql-schema-view.md)
