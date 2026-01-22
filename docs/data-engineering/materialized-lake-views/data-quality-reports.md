---
title: "Power BI Reports for Data Quality"
description: Learn about data quality reports and alerts in materialized lake views within lakehouse in Microsoft Fabric
author: eric-urban
ms.author: eur
ms.reviewer: sngun
ms.topic: how-to
ms.date: 09/12/2025
# customer-intent: As a data engineer, I want to view data quality metrics in Power BI reports and set up alerts on them so that I can monitor data quality trends and receive notifications for significant changes.
---
 
# Power BI reports for data quality

Materialized lake views (MLVs) provide the option to view your data quality metrics at a snapshot through embedded data quality Power BI reports. The data quality report seamlessly integrates with the existing data model in MLV and presents a visual representation of your data quality metrics to help you uncover data trends and identify outliers in your data.

## Create and access the report

To create or access the report, navigate to your Managed materialized lake views page and select the **Data quality report**.

:::image type="content" source="./media/data-quality-reports/data-quality-report-button.png" alt-text="Screenshot showing data quality report button placement." border="true" lightbox="./media/data-quality-reports/data-quality-report-button.png":::

It opens the *embedded report page*. If a report is already created, you can see it here. If you're accessing the data quality report for the first time in your lakehouse, select **Generate report** and wait for the report to be created.

:::image type="content" source="./media/data-quality-reports/generate-report.png" alt-text="Screenshot showing the generate report button." border="true" lightbox="./media/data-quality-reports/generate-report.png":::

:::image type="content" source="./media/data-quality-reports/report-loading.png" alt-text="Screenshot showing loading of report." border="true" lightbox="./media/data-quality-reports/report-loading.png":::

A semantic model and a Power BI report are created in the background and stored in your workspace. Once ready, the Power BI report is displayed on the same page as an embedded report and will present the summary of the data quality trends in two sections the *Overview* and *MLV Detail* pages.

## Interpret the data in the report

The report has two pages:

* Overview
* MLV Detail

### Overview page

The overview page shows the data trends for the last one week, displays visuals for the MLVs and constraints that cause the most violations and drops.

A violation indicates a row being unable to meet the condition specified in a constraint for one or more of its columns. Regardless of the number of columns in a row that violated different constraints, the row would be dropped only once. Hence the *number of drops is always <= the number of violations* for an MLV.

:::image type="content" source="./media/data-quality-reports/overview_page.png" alt-text="Screenshot showing the overview page." border="true" lightbox="./media/data-quality-reports/overview_page.png":::

From the *Overview* page, the visual titled *Data Quality Violations - Top MLVs by Day for the Last Week* displays the state of data quality on each specific day over the past week.

It allows you to track trends, analyze past performance, and understand how the data has evolved in terms of violations. All other visuals on this page present aggregated live data, reflecting the current status of data quality. This combination of views provides you with a well-rounded understanding of both the present data quality and how it has evolved over time.

### MLV Detail page

The MLV Detail page allows you to look at the data quality metrics at a deeper granularity instead of looking at only aggregates. You can filter for a particular MLV and also look at data from beyond the last one week by adjusting the SchemaName, MLVName, and RelativeDate in the Power BI filters.

:::image type="content" source="./media/data-quality-reports/materialized-lake-views-detail-page.png" alt-text="Screenshot showing the MLV detail page." border="true" lightbox="./media/data-quality-reports/materialized-lake-views-detail-page.png":::

On the MLV Detail page, all charts display historical data, enabling you to drill down into daily metrics across several weeks for deeper trend analysis and insights.

## Navigate to the Power BI report in the workspace

To use all the other default features offered in a standard Power BI report, you can navigate to the original report in the workspace by selecting the **Customize report** option on the right-hand corner of the top navigation bar.

:::image type="content" source="./media/data-quality-reports/customize-report.png" alt-text="Screenshot showing the redirection to workspace report." border="true" lightbox="./media/data-quality-reports/customize-report.png":::

## Share the report

You can share the report using the default share option available in Power BI. Along with sharing the report, you also need to provide access to the corresponding Lakehouse so that the receiver can access the data on the visuals within the report. Atleast Read or ReadData permission on the SQL analytics endpoint is needed to perform this operation.

## Current limitations

The report is created using the Direct Query model so there's a fixed limit of 1 million rows that can be returned in any single query to the underlying source. Premium capacities let you exceed the one million-row limit. To overcome this limitation, purchase a premium capacity or delete and recreate the report and semantic model.

## Set up alerts in data quality report

You can set up alerts on the data quality report in the Fabric MLV using the **Data Activator** item. Use the following steps to set up alerts on your data quality report:

1. From the data quality report, select **Set Alert** on the top ribbon.

1. Select a measure of your choice to set up an alert on the selected chart. In the default data quality report, you can set alerts for events such as:

   * Total violations (last one week)
   * Total rows dropped across all MLVs in the Lakehouse (last one week)
   * Total rows written across all MLVs in the Lakehouse (last one week)
   * Total rows dropped from top five constraints contributing to the most number of violations (last one week)
   * Total violations from top 5 MLVs contributing to the most number of violations (last one week)

1. Select a trigger for the alert, such as value or percent change, or a specific condition (for example, >, <, =). It could also be when the measure becomes a value (such as greater than, greater than or equal to, less than, less than or equal to, equal to, not equal to, within range, outside of range). Choose the preferred alert communication method, such as Teams or Outlook email.

1. Select the **Apply** to apply the rule for the alerts.

## Known issues
1. The presence of special characters or spaces in the workspace or lakehouse names results in data quality report failures.

## Related articles

* [Materialized lake views overview](./overview-materialized-lake-view.md)
* [Monitor materialized lake views](./monitor-materialized-lake-views.md)
