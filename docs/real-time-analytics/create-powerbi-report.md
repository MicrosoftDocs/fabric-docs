---
title: Create Power BI report from KQL queryset
description: Learn how to visualize KQL queryset data in a Power BI report
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 01/23/2023
---

# Visualize data in a Power BI report

There are multiple ways you can build a Power BI report to visualize your data. In this article, you'll learn how to build a report using a KQL queryset.

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A workspace.
* A database. For more information, see [Create a database](create-database.md).
* A KQL Query set. For more information, see [Query data in the KQL queryset](kusto-query-set.md).

## Create a report

1. Open an existing KQL queryset from your workspace or create a new one.
    You can switch the associated database in the drop-down menu on the database pane.

    :::image type="content" source="media/create-powerbi-report/select-database.png" alt-text="Screenshot of database pane in a KQL queryset":::

1. Write and select the query you want to build into a Power BI report. Then, select **Build Power BI report** on the ribbon.

    :::image type="content" source="media/create-powerbi-report/build-report.png" alt-text="Screenshot of query editor showing an example query. The Build Power BI report option on the ribbon is highlighted.":::

    >[!NOTE]
    > When you build a report, a dataset is created and saved in your workspace. You can create multiple reports from a single dataset.
    >
    > If you delete the dataset, your reports will also be removed.

### Report preview

In the report's preview, you'll see a summary of your query, and query results visualized in tiles on your canvas. You can manipulate the visualizations in the **Your data** pane on the right.

When you're satisfied with the visualizations, select **Save** to name and save your report in a workspace.

:::image type="content" source="media/create-powerbi-report/report-preview.png" alt-text="Screenshot of Power BI report preview window showing a preview of the dataset visualization. The Save button is highlighted.":::

### Report details

1. Name your report.
1. Save your report to a workspace. It can be a different workspace than the one you started in.

    :::image type="content" source="media/create-powerbi-report/report-details.png" alt-text="Screenshot of report details showing the report's name and the workspace it will be saved in. The button titled Continue is highlighted.":::

1. Select **Continue** to save your report.

You've now created your report.

### Manage report

To view and edit your report, select **Open the file in Power BI to view, edit, and get a shareable link**.

:::image type="content" source="media/create-powerbi-report/open-report.png" alt-text="Screenshort of report preview showing that the report has been saved. The link to open the report in Power BI is highlighted.":::

## Next steps

<!-- TODO- Power BI doc that discusses the report. -->
