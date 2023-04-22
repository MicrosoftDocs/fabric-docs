---
title: Create a Power BI report from KQL queryset in Real-time Analytics
description: Learn how to visualize KQL queryset data in a Power BI report
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Visualize data in a Power BI report

In this article, you'll learn how to build a report using a KQL queryset.

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A workspace
* A database. For more information, see [Create a database](create-database.md).
* A KQL queryset. For more information, see [Query data in the KQL queryset](kusto-query-set.md).

## Create a report

1. Open a KQL queryset from your workspace or create a new one.

1. Write and select the query you want to build into a Power BI report. The output of this query will be used as the dataset for building the Power BI report.
1. On the ribbon, select **Build Power BI report**.

    :::image type="content" source="media/create-powerbi-report/build-report.png" alt-text="Screenshot of query editor showing an example query. The Build Power BI report option on the ribbon is highlighted.":::

    >[!NOTE]
    > When you build a report, a dataset is created and saved in your workspace. You can create multiple reports from a single dataset.
    >
    > If you delete the dataset, your reports will also be removed.

### Report preview

In the report's preview, you'll see a summary of your query, and query results visualized in tiles on your canvas. You can manipulate the visualizations in the **Your data** pane on the right. For more information, see [Power BI visualizations](/power-bi/visuals/power-bi-report-visualizations).

When you're satisfied with the visualizations, select **Save** to name and save your report in a workspace.

:::image type="content" source="media/create-powerbi-report/report-preview.png" alt-text="Screenshot of Power BI report preview window showing a preview of the dataset visualization. The Save button is highlighted.":::

### Report details

1. In **Name your file in Power BI**, give your file a name.
1. Select the workspace in which to save this report. The report can be a different workspace than the one you started in.

    :::image type="content" source="media/create-powerbi-report/report-details.png" alt-text="Screenshot of report details showing the report's name and the workspace it will be saved in. The button titled Continue is highlighted.":::

1. Select the sensitivity label to apply to the report. For more information, see [sensitivity labels](/power-bi/enterprise/service-security-apply-data-sensitivity-labels).
1. Select **Continue**.

### Manage report

To view and edit your report, select **Open the file in Power BI to view, edit, and get a shareable link**.

:::image type="content" source="media/create-powerbi-report/open-report.png" alt-text="Screenshort of report preview showing that the report has been saved. The link to open the report in Power BI is highlighted.":::
