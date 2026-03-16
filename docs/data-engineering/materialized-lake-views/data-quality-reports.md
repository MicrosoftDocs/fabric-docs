---
title: "Data quality report for materialized lake views"
description: Learn how to create, use, and share the data quality report for materialized lake views in a lakehouse in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/01/2026
ai-usage: ai-assisted
# customer-intent: As a data engineer, I want to use the data quality report in materialized lake views to monitor data quality trends and configure alerts.
---
 
# Data quality report for materialized lake views

Materialized lake views (MLVs) include a built-in **Data quality report**. Use this report to track trends, identify outliers, and monitor quality changes over time.

You access the report directly in Fabric. If needed, you can later open the underlying Power BI report for customization.

## Create and access the report

To create the materialized lake views data quality report for your lakehouse in Microsoft Fabric:

1. In your workspace, open the lakehouse.

1. Select **Manage materialized lake views (preview)**.

1. On the Manage materialized lake views page, select **Data quality report**.

    :::image type="content" source="./media/data-quality-reports/data-quality-report-button.png" alt-text="Screenshot showing data quality report button placement." border="true" lightbox="./media/data-quality-reports/data-quality-report-button.png":::

1. On the embedded **Data quality report** page, select **Generate report**.

    :::image type="content" source="./media/data-quality-reports/generate-report.png" alt-text="Screenshot showing the generate report button." border="true" lightbox="./media/data-quality-reports/generate-report.png":::

    > [!NOTE]
    > Special characters or spaces in workspace or lakehouse names can cause report generation failures.

1. Wait for report creation to complete.

   Fabric creates a semantic model and report artifact in the background and stores both in your workspace. When creation completes, the embedded report appears with two views: **Overview** and **MLV Detail**.

If the report already exists, it opens directly and you don't need to select **Generate report**.

## Interpret the data in the report

The materialized lake views data quality report has two pages:

- **Overview**
- **MLV Detail**

### Overview page

The **Overview** page of the materialized lake views data quality report shows the last week of trends and highlights the MLVs and constraints with the most violations and drops.

A violation means a row doesn't meet a constraint condition for one or more columns. MLV drops each row only once, even when the row violates multiple constraints. So for an MLV, the number of drops is always less than or equal to the number of violations.

In the following screenshot, the dashboard tile **Data Quality Violations - Top MLVs by Day for the Last Week** on the **Overview** page shows daily data quality state for the past week.

:::image type="content" source="./media/data-quality-reports/overview_page.png" alt-text="Screenshot showing the overview page." border="true" lightbox="./media/data-quality-reports/overview_page.png":::

Use the data quality violations tile to track trends and compare recent performance. Other visuals on the page show aggregated live data for current quality status.

### MLV detail page

The **MLV Detail** page of the data quality report shows data quality metrics at deeper granularity than aggregate views. You can filter for a specific materialized lake view and extend beyond one week by adjusting `SchemaName`, `MLVName`, and `RelativeDate` in report filters.

:::image type="content" source="./media/data-quality-reports/materialized-lake-views-detail-page.png" alt-text="Screenshot showing the MLV detail page." border="true" lightbox="./media/data-quality-reports/materialized-lake-views-detail-page.png":::

All charts on **MLV Detail** display historical data, so you can drill down into daily metrics across multiple weeks.

## Customize in Power BI (optional)

If you need full Power BI authoring features, you can customize the materialized lake views data quality report. Open the workspace report by selecting **Customize report** in the upper-right corner of the top navigation bar.

:::image type="content" source="./media/data-quality-reports/customize-report.png" alt-text="Screenshot showing the redirection to workspace report." border="true" lightbox="./media/data-quality-reports/customize-report.png":::

## Share the report

You can share the materialized lake views data quality report by using the standard Power BI **Share** option. Also grant access to the corresponding lakehouse so recipients can view data in report visuals. Recipients need at least `Read` or `ReadData` permission on the SQL analytics endpoint.

## Current limitations

The materialized lake views data quality report uses DirectQuery, which limits each query to 1 million returned rows from the underlying source. Premium capacities can exceed this limit. To address row-limit issues, use premium capacity or delete and recreate the report and semantic model.

## Set up alerts in data quality report

You can set up alerts on the materialized lake views data quality report by using **Data Activator**.

1. From the data quality report, select **Set Alert** on the top ribbon.

1. Select a measure for the alert on the selected chart. In the default report, you can create alerts for events such as:

   - Total violations (last one week)
   - Total rows dropped across all MLVs in the lakehouse (last one week)
   - Total rows written across all MLVs in the lakehouse (last one week)
   - Total rows dropped from top five constraints contributing to the most violations (last one week)
   - Total violations from top five MLVs contributing to the most violations (last one week)

1. Select a trigger type, such as value change, percent change, or a specific condition (for example, `>`, `<`, `=`). You can also use conditions such as greater than, greater than or equal to, less than, less than or equal to, equal to, not equal to, within range, or outside of range. Then choose the alert channel, such as Teams or Outlook email.

1. Select **Apply**.

## Related content

- [Materialized lake views overview](./overview-materialized-lake-view.md)
- [Monitor materialized lake views](./monitor-materialized-lake-views.md)

