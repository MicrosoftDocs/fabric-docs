---
title: Get data for Data Activator from Power BI
description: Learn how to get data from Power BI for use in Data Activator, integrate it into your workflows, and take advantage of powerful data analysis capabilities.
author: mihart
ms.author: mihart
ms.topic: how-to
ms.custom: FY25Q1-Linter
ms.date: 09/15/2024
ms.search.form: Data Activator PBI Onramp
#customer intent: As a Power BI user I want to learn how to get data for Data Activator in Power BI.
---

 # Get data for Data Activator from Power BI

You can get data for use in Data Activator from many sources. This article describes how to set alerts from data in Power BI reports.

> [!IMPORTANT]
> Data Activator is currently in preview.

You can use Data Activator to set alerts when conditions are met in data in a Power BI report. For example, if you have a report displaying daily sales per store, you can set an alert that will notify you if daily sales for any store fall beneath a threshold you set. You can send notifications to yourself or to others in your organization. This section explains how to define and create alerts.

## Prerequisites

Before you begin:

* You need a Power BI report that is published online to a workspace.
* The report must contain live data.

## Create a Data Activator trigger for a Power BI report visual

Open a report and select a visual to monitor. You'll create a Data Activator trigger that sets conditions for sending a notification. The notification can be sent in email or in Microsoft Teams.

1. Open your Power BI report.
2. Choose a visual on the report for Data Activator to monitor.
3. Select the ellipsis (…) at the top-right of the visual, and choose **Set alert**. You can also select the bell icon in the visual, or use the **Set alert** button in the Power BI menu bar.

The following image shows an example of how to set an alert from a visual that displays daily sales by store:

:::image type="content" source="media/data-activator-get-data/data-activator-get-data-01.png" alt-text="Screenshot of sales by store in Power BI report.":::

4. Enter the condition to monitor. For example, select **Sales** as the measure and set a rule to notify you via email when the value drops below $1,000. Note that:
    * If your visual has multiple series, then Data Activator will apply the alert rule to each series. In the example shown here, the visual shows sales per store, so the alert rule applies per store.
    * If your visual has a time axis, then Data Activator will use the time axis in the alert logic. In the example shown here, the visual has a daily time axis, so Data Activator will monitor sales per day. Data Activator will check each point on the time axis once. If the visual updates the value for a particular point in time after Data Activator has checked it, then Data Activator will ignore the updated value.
    * You can create alerts on tables and matrix visuals. Data Activator will apply the alert condition to each row in the table, or to each cell in the matrix. If your table or matrix has a column containing timestamps, then Data Activator will interpret that column as a time axis.
    * Data Activator will use the filters in place at the time that you create your alert. Changing the filters on your visual after creating your alert will have no effect on the alert logic. Select **Show applied filters** to see the filters on your visual.
  
5. When you are ready to save your alert, select **Create.** This will save the alert condition in a Data Activator item. Optionally, you can select **Show save options** to specify the location of the Data Activator item. After you create your alert, Data Activator will monitor the data in the visual once per hour. This means that you will receive an alert within one hour of your alert condition becoming true.

    :::image type="content" source="media/data-activator-get-data/data-activator-get-data-02.png" alt-text="Screenshot of create an alert window showing daily sales rule.":::

### Optional: edit your trigger in Data Activator

When your trigger is ready, Power BI notifies you and gives you the option to open your trigger in Data Activator for further editing.

:::image type="content" source="media/data-activator-get-data/data-activator-get-data-03.png" alt-text="Screenshot of rule successfully created.":::

Use Data Activator to fine tune your trigger and set complex conditions that are more granular than is possible in Power BI. Another reason to use Data Activator is if you want to trigger a Power Automate flow when your trigger is activated. Refer to [Create triggers in design mode](data-activator-create-triggers-design-mode.md) for information on how to edit triggers in Data Activator.

## Related content

* [What is Data Activator?](data-activator-introduction.md)
* [Use Custom Actions to trigger Power Automate Flows](data-activator-trigger-power-automate-flows.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
