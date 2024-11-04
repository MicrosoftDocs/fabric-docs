---
title: GraphQL Monitoring Dashboard and Logging (Preview) 
description: Learn about GraphQL Monitoring dashboard and Logging and how it is being used, which enable developers to monitor API activities and troubleshoot errors and inefficiencies. 
author: HHPHTTP
ms.author: hhosseinpour
ms.topic: how-to 
ms.date: 11/01/2024

---

# GraphQL Monitoring Dashboard and Logging (Preview)

> [!NOTE]
> Monitoring Dashboard and Logging feature for Fabric API for GraphQL is in **preview**.

After an API for GraphQL is deployed in Fabric, you may want to understand how the API is being used by clients as well as troubleshooting errors in case there are any problems with the API. Fabric GraphQL Monitoring Dashboard (Preview) allows you to visualize, monitor, and troubleshoot your GraphQL API request activity in Fabric. This document guides you through the steps to enable monitoring capability and effectively use the dashboard various components.  

## Prerequisites

* Before you start using monitoring and logging capabilities, you must have an API for GraphQL in Fabric. For more information, see [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md).

## Enabling Workspace Monitoring

In this section, we walk you through the steps needed to enable Monitoring in your Workspace.

> [!NOTE]
> Workspace activity monitoring is disabled by default to avoid incurring charges against your capacity.

1. As the first step, you need to ensure that the Platform Monitoring capability is enabled for your Workspace, allowing the creation of a read-only Kusto Database that will collect logs from different workloads. This can be enabled by going to your Workspace Settings:

    :::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-workspace.png"" alt-text="Screenshot on selecting the workspace settings.":::

1. From the Workspace Setting window, you need to select Monitoring from the left menu and then add a monitoring Eventhouse. This action would enable a Kusto Database to store data collected in logs. Please keep in mind that the data retention is **limited to 30 days**.

    :::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-workspacesetting-eventhouse.png"" alt-text="Screenshot of adding Eventhouse and enabling monitoring for the workspace.":::

1. As the next step, you need to enable Monitoring and/or Logging experience in each GraphQL API in your tenant. Select the GraphQL API(s) for which you would need to enable Metrics and/or Logging options, and then select on Settings:

    :::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-graphqlsettings.png"" alt-text="Screenshot of selecting APIfor GraphQL settings.":::

1. From the API Settings window, select the Monitoring option on the list on the left:

> [!NOTE]
> If Monitoring has not been already enabled from the Workspace settings, you will see a note guiding you to go to the Workspace settings and enable monitoring for your Workspace.

:::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-enablemonitoring.png"" alt-text="Screenshot of selecting Monitoring from the API for GraphQL settings.":::

Once you successfully enable the Monitoring option for your Workspace, you will see the options to enable Metrics (API Dashboard) only, Logging (API Requests) only, or both. Since the Metrics and Logs are saved to separate tables in Kusto, it allows you to enable each feature separately depending on your requirements. By default, both options are set to OFF:  

:::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-enable-metricslogging.png"" alt-text="Screenshot of Metrics and Logging Toggles from the Monitoring setting of API for GraphQL.":::

> [!NOTE]
> Metrics and Logging data is separately sent to the Kusto Database that is enabled for the Workspace Monitoring which will incur additional costs.  

## API Request Activity

Once the steps above are taken, **API request activity** option in the top ribbon from the GraphQL API UI becomes active, and you can access monitoring details by clicking on the **API request activity** tab in the top ribbon.  

:::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apirequestactivity.png"" alt-text="Screenshot of API request activity tab from the top ribbon.":::

The **API request activity** consists of two primary views: 

1. **API Dashboard (for Metrics)**: This page provides all the counters and graphs from a specific time range that you have specified.
1. **API Requests (for Logging)**: This page provides a list of API requests that took place in a specific time range that you have specified.

In the following sections, we will describe the functionality of each option.  

## Metrics (API Dashboard)

The API Dashboard provides an overview of API activity for you with various metrics and visuals. To access, from the **API request activity** page, select **API dashboard** tab. You are now able to view at a glance the following parameters for a specific time range: 

- Overall GraphQL API Health index that includes: 
  - API Request/sec 
  - Success rate 
  - Health Status 
- Number of API requests 
- Latency in bar chart 
- Number of requests in bar chart illustrating number of success and error 

By hovering over the graph, you can see the detailed information for a specific data point in a tooltip.

:::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apidashboard-mainview.png"" alt-text="Screenshot of API dashbaord.":::

**Metrics Key Features:**
- **Time Range Selection**: You can select different time ranges for the data displayed in the monitoring graphs. Please note that this feature has **30 days retention limit**. 


:::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apidashbaord-timerange.png"" alt-text="Screenshot of API dashbaord showing the time range option.":::

- **Counter**:
    - **Total Number of API Requests**: You can view the total number of API requests in the selected time range. 
:::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apidashbaord-apirequests.png"" alt-text="Screenshot of API dashbaord showing the number of API request.":::

- **Visuals**:
    - Overall GraphQL API Health index based on success rate per API: 
        1.  Green: 75 -100% of requests are successful (Healthy)
        2. Yellow: 50 - 74% of requests are successful (Needs Attention)
        3. Red: Bellow 50% successful requests (Unhealthy) 

    :::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apidashbaord-healthindex.png"" alt-text="Screenshot of API dashbaord showing the health index.":::

    - Latency line chart: By hovering your mouse over graphs, you would be able to see the latency and date for each data point.

    :::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apidashbaord-latencylinechart.png"" alt-text="Screenshot of API dashbaord showing the latency bar chart.":::

    - Number of requests bar chart, differentiating between success requests and errors: By hovering over graphs, you would be able to see the date and number of success and errors for each data point. 

    :::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apidashbaord-requestbarchart.png"" alt-text="Screenshot of API dashbaord showing number requests bar chart.":::

When you see abnormal behavior on the dashboard that requires your attention, you can further investigate by looking into logs to identify potential issues and find out which requests failed and/or have higher latency and start looking into log details to troubleshoot. To access logging details, select the **API Requests** tab from the **API request activity** page.

## Logging (API Requests)

The API Requests page provides detailed information about all the API requests that happened in a specific time frame.  To access, select the **API Requests** tab from the **API request activity** page. 

:::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apirequest-logs.png"" alt-text="Screenshot of API Request page showing the list of requests.":::

You are able to resize columns and sort the columns (ascending/descending) from the report table. 

**Logging Key Features**:

- Time Range Selection: You can select different time ranges for the data displayed in the requests list (Hour/Day/Week/Month). Please note there is 30 days retention limit. 

:::image type="content" source="media\graphql-monitoring-logging\graphql-monitoring-apirequest-timerange.png"" alt-text="Screenshot of API Request page showing time range for the list of requests.":::

- View a list of recent API requests as well as past requests listed with Request ID. 
- View the type of the operation (Query or Mutation). 
- View the transport protocol used by the request (HTTP). 
- View the time of request. 
- Sort the list of requests by ascending/descending time. 
- View duration of request. 
- Sort the list of requests by ascending/descending duration. 
- View response size. 
- View the Status (Success or Failure). 
- View the details of the request, including specific response/warning/error messages. 
- Filter and search for specific strings or sentences.  

## Related content

* [What is Microsoft Fabric API for GraphQL](api-graphql-overview.md)
* [Create an API for GraphQL in Fabric](get-started-api-graphql.md)
* [Fabric API for GraphQL Editor](api-graphql-editor.md)
* [Fabric API for GraphQL Schema View and Explorer](graphql-schema-view.md)
