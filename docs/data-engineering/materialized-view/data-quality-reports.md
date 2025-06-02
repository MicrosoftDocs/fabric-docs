---
title: "Power BI reports for data quality"
description: Learn about data quality reports and alerts in materialized lake views within lakehouse in Microsoft Fabric
author: anuj1905 
ms.author: anujsharda, rkottackal
ms.reviewer: nijelsf
ms.topic: conceptual
ms.date: 06/02/2025
---

 
# Power BI reports for data quality

Materialized lake views (MLV) provides the option to view your data quality metrics at a snapshot through embedded data quality Power BI reports. The data quality report seamlessly integrates with the existing data model in MLV and presents a visual representation of your data quality metrics to help you uncover data trends and identify outliers in your data.


## Create and access the report 

To create or access the report, navigate to the Managed materialized lake views page and click on the "Data quality report" button.

:::image type="content" source="./media/data-quality-reports/dqr-button.png" alt-text="Screenshot showing data quality report button placement." border="true" lightbox="./media/data-quality-reports/dqr-button.png":::

This opens the embedded report page. If a report is already created, the user is able to see it here. If this is the first time data quality report is being accessed in this lakehouse, click on "Generate report" and wait for the report to be created.

:::image type="content" source="./media/data-quality-reports/generate-report.png" alt-text="Screenshot showing the generate report button." border="true" lightbox="./media/data-quality-reports/generate-report.png":::

:::image type="content" source="./media/data-quality-reports/report-loading.png" alt-text="Screenshot showing loading of report." border="true" lightbox="./media/data-quality-reports/report-loading.png":::

A semantic model and a Power BI report are created for the user in the background and stored in their workspace.
Once ready, the Power BI report will be displayed on the same page as an embedded report and will present the summary of the data quality trends in two sections (pages on the Power BI report) – Overview and MLV Detail. 

 
## Interpret the data in the report

The report has two pages:
1. Overview
1. MLV Detail

### Overview page
The overview page shows the data trends from the last one week, displaying visuals for the MLVs and constraints that cause the most violations and drops.

A violation indicates a row being unable to meet the condition specified in a constraint for one or more of its columns.
Regardless of the number of columns in a row that violated different constraints, the row would be dropped only once.
Hence the number of drops is always <= the number of violations for an MLV.

:::image type="content" source="./media/data-quality-reports/overview_page.png" alt-text="Screenshot showing the overview page." border="true" lightbox="./media/data-quality-reports/overview_page.png":::

### MLV Detail page
The MLV Detail page allows the user to look at the data quality metrics at a deeper granularity instead of looking at only aggregates.
The user can filter for a particular MLV and also look at data from beyond the last one week by adjusting the SchemaName, MLVName, and RelativeDate in the Power BI filters.

:::image type="content" source="./media/data-quality-reports/mlv-detail-page.png" alt-text="Screenshot showing the MLV detail page." border="true" lightbox="./media/data-quality-reports/mlv-detail-page.png":::

On the Overview page, the visual titled “Data Quality Violations - Top MLVs by Day for the Last Week” displays the state of data quality on each specific day over the past week.
This allows users to track trends, analyze past performance, and understand how the data has evolved in terms of violations. All other visuals on this page present aggregated live data, reflecting the current status of data quality.
This combination of views provides users with a well-rounded understanding of both the present data quality and how it has evolved over time.
On the MLV Detail page, all charts display historical data, enabling users to drill down into daily metrics across several weeks for deeper trend analysis and insights.

 
## Navigate to the Power BI report in the workspace 

To use all the other default features offered in a standard Power BI report, the user can navigate to the original report in the workspace by clicking the "Customize report" button on the right-hand corner of the top navigation bar.

:::image type="content" source="./media/data-quality-reports/customize-report.png" alt-text="Screenshot showing the redirection to workspace report." border="true" lightbox="./media/data-quality-reports/customize-report.png":::


## Share the report

You can share the report using the default share option available in Power BI. Along with sharing the report, you also need to provide access to the corresponding Lakehouse (minimum: Read/ReadData permission on SQL analytics endpoint) so that the receiver can access the data on the visuals within the report.


## Known Limitation

The report is created using the Direct Query model and hence there is a fixed limit of 1 million rows that can be returned in any single query to the underlying source. Premium capacities let you exceed the one million-row limit. To overcome this limitation, please purchase a premium capacity or delete and recreate the report and semantic model.


## Set up alerts in data quality report 

You can set up alerts on the data quality report in Fabric Materialized lake views using Data Activator service. Follow the steps below to set up alerts on your data quality report.  

1. Click on "Set Alert" button on the top ribbon of the data quality report. 

1. Select a measure of your choice to set up an alert on the chart of your choice.
   In the default data quality report, you can set alerts for events such as those listed below:
   * Total violations (last one week)
   * Total rows dropped across all MLVs in the Lakehouse (last one week)
   * Total rows written across all MLVs in the Lakehouse (last one week)
   * Total rows dropped from top 5 constraints contributing to the most number of violations (last one week)
   * Total violations from top 5 MLVs contributing to the most number of violations (last one week) 

1. Select the trigger upon which you want the alert to be triggered. 

   These triggers could be when the measure changes by a value or percent (such as changes by, increases by, decreases by). It could also be when the measure becomes a value (such as greater than, greater than or equal to, less than, less than or equal to, equal to, not equal to, within range, outside of range).
   * Choose the preferred alert communication method, such as Teams or Outlook email. 

1. Click the "Apply" button to apply the rule for the alerts. 
