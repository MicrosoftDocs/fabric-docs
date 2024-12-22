---
title: Create alerts in Power BI and use them in Fabric Activator
description: Learn how to get data from Power BI for use in Activator, integrate it into your workflows, and take advantage of powerful data analysis capabilities.
author: mihart
ms.author: mihart
ms.topic: how-to
ms.custom: FY25Q1-Linter, ignite-2024
ms.date: 11/10/2024
ms.search.form: Data Activator PBI Onramp
#customer intent: As a Power BI user I want to learn how to get data from Power BI alerts into Activator where I can continue refining the alert.
---

# Create an alert in Power BI and fine tune in Fabric Activator

You can [create an alert](/power-bi/) in Power BI, on dashboards and reports. When your alert is ready, you have the option to open it in Fabric Activator. Power BI alerts monitor a change to a value and either send a notification in email or Teams. After you create a Power BI alert, you can save it in an existing or new Activator. When you open that alert in Activator, you have almost endless possibilities for fine tuning and expanding the capabilities of that alert. 

> [!NOTE]
> In Activator, an "alert" is referred to as a "rule."

 ## Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from Power BI

You can get data for use in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from many sources. This article describes how to access Power BI report and dashboard alerts and refine those alerts in Activator.

Use [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] to fine tune your rule and set complex conditions that are more granular than is possible in Power BI. Another reason to use [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is if you want to trigger a Power Automate flow when your rule is activated. Refer to [Create rules](activator-create-activators.md) for information on how to create and edit rules in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)].

## Prerequisites

Before you begin:

* You need edit permissions to a Power BI report that is published online to a workspace.

## Create an alert for a Power BI report visual

Start by creating an alert for a dashboard tile or a report visual. This example uses a report visual. 

1. Open your Power BI report in [editing view](/power-bi/create-reports/service-interact-with-a-report-in-editing-view).
2. Choose a visual on the report to monitor, in the upper right corner of the visual select the ellipses (...) > **Add alert**.
You can also select the bell icon in the visual.

    The following image shows an example of how to set an alert from a visual that displays daily sales by store:

    :::image type="content" source="media/activator-get-data-power-bi/activator-power-bi-alert.png" alt-text="Screenshot of sales by store in Power BI report.":::

3. Enter the condition to monitor. For example, select **Sales** as the measure and set a rule to notify you via email when the value drops less than $1,000. 

    Power BI uses the filters in place at the time that you create your alert. Changing the filters on your visual after creating your alert has no effect on the alert logic. Select **Show applied filters** or the filter icon ![Small screenshot of the filter icon which has three horizontal lines.](media/activator-get-data-power-bi/activator.png) to see the filters on your visual.

4. When you're ready to save your alert, select **Apply.** Selecting **Apply** saves the alert condition in the active report and in an [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] item. 

    After you create your alert, [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] monitors the data in the visual once per hour. You receive an alert within one hour of your alert condition becoming true. 

    :::image type="content" source="media/activator-get-data/data-activator-get-data-02.png" alt-text="Screenshot of the Set alert window showing the alert conditions.":::

1. Optionally, change the default Activator location where the alert is saved. Select the ellipses (...) to the right of the Activator name at the bottom of the **Alerts** pane. Then select **Create a new Activator item** and give it a descriptive name. 

    :::image type="content" source="media/activator-get-data-power-bi/activator-change-location.png" alt-text="Screenshot of create an alert window showing daily sales rule.":::

1. To open the alert in Activator, select the ellipses (...) to the right of your new alert name and choose **Open in Activator**. You may have to close and reopen the **Alerts** pane for the link to work properly. Activator opens with your alert highlighted and the **Definition** pane open on the right side.

## Limitations and considerations

* If your visual has multiple series, then [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] applies the alert rule to each series. In the example shown here, the visual shows sales per store, so the alert rule applies per store.
* If your visual has a time axis, then [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] uses the time axis in the alert logic. In the example shown here, the visual has a daily time axis, so [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] monitors sales per day. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] checks each point on the time axis once. If the visual updates the value for a particular point in time after [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] checks it, then [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] ignores the updated value.
* You can create alerts on tables and matrix visuals. [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] applies the alert condition to each row in the table, or to each cell in the matrix. If your table or matrix has a column containing timestamps, then [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] interprets that column as a time axis.
* [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] uses the filters in place at the time that you create your alert. Changing the filters on your visual after creating your alert has no effect on the alert logic. Select **Show applied filters** to see the filters on your visual.

## Related content

* [What is [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]?](activator-introduction.md)
* [Use Custom Actions to trigger Power Automate Flows](activator-trigger-power-automate-flows.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)
