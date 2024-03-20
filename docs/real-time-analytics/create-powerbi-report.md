---
title:  Visualize data in a Power BI report
description: Learn how to visualize data from a KQL queryset in a Power BI report.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 09/10/2023
---

# Visualize data in a Power BI report

In this article, you learn how to build a Power BI report using a KQL Queryset. The output of your query is used as the semantic model of your report.

To use multiple tables to build your Power BI report, see [Use data from a KQL database in Power BI Desktop](power-bi-data-connector.md).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Create a report

There are three possible ways to create a report:

1. **Option 1:** Browse to a KQL queryset.
1. **Option 2:** Open the **Explore your data** window from a KQL database.
    1. Write and select the query you want to build into a Power BI report. The output of this query is used as the semantic model for building the report.
    1. On the ribbon, select **Build Power BI report**.

        :::image type="content" source="media/create-powerbi-report/build-report.png" alt-text="Screenshot of query editor showing an example query. The Build Power BI report option on the ribbon is highlighted." lightbox="media/create-powerbi-report/build-report.png":::
1. Create a report from an entire table. Browse to a KQL database.
    1. Select the **More menu** [**...**] of the table you want to use for the report.
    2. Select **Build Power BI report**.

    :::image type="content" source="media/create-powerbi-report/build-report-from-table.png" alt-text="Screenshot of building a Power BI report from a table. The table menu is open with Build Power BI report selected.":::

>[!NOTE]
> When you build a report, a semantic model is created and saved in your workspace. You can create multiple reports from a single semantic model.
>
> If you delete the semantic model, your reports will also be removed.

### Report preview

You can add visualizations in the report's preview. In the **Data** pane, expand **Kusto Query Result** to see a summary of your query. For more information, see [Power BI visualizations](/power-bi/visuals/power-bi-report-visualizations).

When you're satisfied with the visualizations, select **File** on the ribbon, and then **Save this report** to name and save your report in a workspace.

:::image type="content" source="media/create-powerbi-report/report-preview.png" alt-text="Screenshot of Power BI report preview window showing a preview of the semantic model visualization. The Save button is highlighted." lightbox="media/create-powerbi-report/report-preview.png":::

### Report details

1. In **Name your file in Power BI**, give your file a name.
1. Select the workspace in which to save this report. The report can be a different workspace than the one you started in.

    :::image type="content" source="media/create-powerbi-report/report-details.png" alt-text="Screenshot of report details showing the report's name and the workspace it's saved in. The button titled Continue is highlighted." lightbox="media/create-powerbi-report/report-details.png":::

1. Select the sensitivity label to apply to the report. For more information, see [sensitivity labels](/power-bi/enterprise/service-security-apply-data-sensitivity-labels).
1. Select **Continue**.

### Manage report

To view and edit your report, select **Open the file in Power BI to view, edit, and get a shareable link**.

:::image type="content" source="media/create-powerbi-report/open-report.png" alt-text="Screenshot of report preview showing that the report has been saved. The link to open the report in Power BI is highlighted." lightbox="media/create-powerbi-report/open-report.png":::

## Next step

> [!div class="nextstepaction"]
> [Visualizations in Power BI reports](/power-bi/visuals/power-bi-report-visualizations)
