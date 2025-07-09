---
title: Create Power BI alerts and refine them in Fabric Activator  
description: Discover how to create Power BI alerts, refine them in Fabric Activator, and enhance your workflows with advanced data analysis capabilities.
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.custom: FY25Q1-Linter
ms.date: 05/06/2025
ms.search.form: Data Activator PBI Onramp
ai-usage: ai-assisted
#customer intent: As a Power BI user I want to learn how to get data from Power BI alerts into Activator where I can continue refining the alert.
---

# Create an alert in Power BI and fine tune in Fabric Activator

You can create alerts in Power BI on dashboards and reports to monitor changes in data values and receive notifications via email or Teams. Once your alert is ready, you can open it in Fabric Activator to refine it further with advanced capabilities like:

- Setting more granular conditions
- Integrating with Power Automate workflows  
- Expanding alert capabilities to meet specific business needs

> [!NOTE]
> In Activator, an **alert** is referred to as a **rule**.

 ## Get data for Activator from Power BI

You can get data for use in Activator from many sources. This article describes how to access Power BI report and dashboard alerts and refine those alerts in Activator:

- Fine tune your rule
- Set complex conditions that are more granular than Power BI allows
- Trigger Power Automate flows when your rule is activated

For detailed steps on creating and editing rules, see [Create rules](activator-create-activators.md).

## Prerequisites

Before you begin, ensure you have the following prerequisites: 

* **Workspace access:** A [Microsoft Fabric workspace](../../get-started/create-workspaces.md) with [enabled capacity](../../enterprise/licenses.md#capacity)
* **Report permissions:** Edit access to a Power BI report published to your workspace

## Create an alert for a Power BI report visual

Start by creating an alert for a dashboard tile or a report visual. This example uses a report visual. 

1. Open your Power BI report in [editing view](/power-bi/create-reports/service-interact-with-a-report-in-editing-view).
2. Choose a visual on the report to monitor, in the upper right corner of the visual select the ellipses (...) > **Add alert**.
You can also select the bell icon in the visual.

    The following image shows an example of how to set an alert from a visual that displays daily sales by store:

    :::image type="content" source="media/activator-get-data-power-bi/activator-power-bi-alert.png" alt-text="Screenshot of sales by store in Power BI report.":::

3. Enter the condition to monitor. For example, select **Sales** as the measure and set a rule to notify you via email when the value drops less than $1,000. 

    > [!NOTE]
    > Power BI uses the filters in place at the time that you create your alert. Changing the filters on your visual after creating your alert has no effect on the alert logic. Select **Show applied filters** or the filter icon ![Small screenshot of the filter icon which has three horizontal lines.](media/activator-get-data-power-bi/activator.png) to see the filters on your visual.

4. When you're ready to save your alert, select **Apply.** Selecting **Apply** saves the alert condition in the active report and in an Activator item. 

    After you create your alert, Activator monitors the data in the visual once per hour. You receive an alert within one hour of your alert condition becoming true. 

    :::image type="content" source="media/activator-get-data/data-activator-get-data-02.png" alt-text="Screenshot of the Set alert window showing the alert conditions.":::

1. Optionally, change the default Activator location where the alert is saved. Select the ellipses (...) to the right of the Activator name at the bottom of the **Alerts** pane. Then select **Create a new Activator item** and give it a descriptive name. 

    :::image type="content" source="media/activator-get-data-power-bi/activator-change-location.png" alt-text="Screenshot of create an alert window showing daily sales rule.":::

1. To open the alert in Activator, select the ellipses (...) to the right of your new alert name and choose **Open in Activator**. You might need to close and reopen the **Alerts** pane for the link to work properly. Activator opens with your alert highlighted and the **Definition** pane open on the right side.

## Limitations and considerations

* If your visual has multiple series, then Activator applies the alert rule to each series. In the example shown here, the visual shows sales per store, so the alert rule applies per store.
* If your visual has a time axis, then Activator uses the time axis in the alert logic. In the example shown here, the visual has a daily time axis, so Activator monitors sales per day. Activator checks each point on the time axis once. If the visual updates the value for a particular point in time after Activator checks it, then Activator ignores the updated value.
* You can create alerts on tables and matrix visuals. Activator applies the alert condition to each row in the table, or to each cell in the matrix. If your table or matrix has a column containing timestamps, then Activator interprets that column as a time axis.
* Activator uses the filters in place at the time that you create your alert. Changing the filters on your visual after creating your alert has no effect on the alert logic. Select **Show applied filters** to see the filters on your visual.

## Related content

* [What is Activator?](activator-introduction.md)
* [Activator tutorial using sample data](activator-tutorial.md)
* [Use Custom Actions to trigger Power Automate Flows](activator-trigger-power-automate-flows.md)

