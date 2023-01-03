---
title: Kusto connector for Power BI
description: Learn how to visualize data using the Kusto connector for Power BI in Trident. 
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.prod: analytics
ms.technology: data-explorer
ms.topic: how-to
ms.date: 12/28/2022

---

# Visualize data in a report

There are multiple ways you can build a Power BI report to visualize your data. In this article you'll learn how to build a report using a KQL queryset.

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A workspace.
* A database. To create a database, see <!--[TODO- Create a database and get data](/trident/data-explorer/database-editor). -->
* A KQL Query set. To create a KQL queryset, see <!-- [TODO - Query data in the KQL queryset](/trident/data-explorer/kusto-query-set). -->

## Create a report

1. Open a an existing KQL queryset from your workspace or create a new one.
    you can switch the associated database in the drop-down menu on the database pane.

    :::image type="content" source="media/kusto-for-powerbi/select-database.png" alt-text="Screenshot of database pane in a KQL queryset":::

1. Write and select the query you want to build into a Power BI report. Then, select **Build Power BI report** on the ribbon.

    :::image type="content" source="media/kusto-for-powerbi/build-report.png" alt-text="Screenshot of query editor showing an example query. The Build Power BI report option on the ribbon is highlighted.":::

    >[!NOTE]
    > When you build a report, a dataset is created and saved in your workspace. You can create multiple reports from a single dataset.
    > If you delete the dataset, your reports will also be removed.

### Power BI (preview)

In the report's preview, you'll see a summary of your query, and query results visualized in frames. you can edit the selected data on the data pane on the right.

:::image type="content" source="media/kusto-for-powerbi/report-preview.png" alt-text="Screenshot of Power BI report preview window showing a preview of the dataset visualization. The Save button is highlighted.":::

Visualizations pane - Where you can change visualizations, customize colors or axes, apply filters, drag fields, and more.

Fields pane - Where query elements and filters can be dragged onto the Report view or dragged to the Filters area of the Visualizations pane.

Once you've created your report, your dataset will be visualized and arranged in tiles within a canvas.

Show data table- See the data you added to this report as a table at the bottom of the canvas. if you've added multiple tables, you'll have to view them one at a time.

### Report details

1. Name your report.
1. Save your report in a workspace. It can be a different workspace than the one you started out in.

    :::image type="content" source="media/kusto-for-powerbi/report-details.png" alt-text="Screenshot of report details showing the report's name and the workspace it will be saved in. The button titled Continue is highlighted.":::

1. Select **Continue** to see save your report.

## Next steps

<!-- TODO- Power BI doc that discusses the report. -->
