---
title: Lakehouse tutorial - Create your first lakehouse
description: Learn how to create a lakehouse, ingest data into a table, transform it, and use the data to create reports.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 5/23/2023
---

# Lakehouse tutorial: Create a lakehouse, ingest sample data, and build a report

In this tutorial, you build a lakehouse, ingest sample data into the delta table, apply transformation where required, and then create reports.

## Prerequisites

* [Create a Fabric workspace](tutorial-lakehouse-get-started.md)
* In this article, you follow steps to ingest a CSV file, which requires you to have OneDrive configured. If you don't have OneDrive configured, sign up for the Microsoft 365 free trial: [Free Trial - Try Microsoft 365 for a month](https://www.microsoft.com/microsoft-365/try).

## Create a lakehouse

1. In the [Power BI service](https://powerbi.com/), select **Workspaces** from the left-hand menu.

1. To open your workspace, enter its name in the search textbox located at the top and select it from the search results.

1. From the experience switcher located at the bottom left, select **Data Engineering**.

   :::image type="content" source="media\tutorial-build-lakehouse\workload-switch-data-engineering.png" alt-text="Screenshot showing where to select the experience switcher and Data Engineering.":::

1. In the **Data Engineering** tab, select **Lakehouse** to create a lakehouse.

1. In the **New lakehouse** dialog box, enter **wwilakehouse** in the **Name** field.

   :::image type="content" source="media\tutorial-build-lakehouse\new-lakehouse-name.png" alt-text="Screenshot of the New lakehouse dialog box.":::

1. Select **Create** to create and open the new lakehouse.

## Ingest sample data

> [!NOTE]
> If you don't have OneDrive configured, sign up for the Microsoft 365 free trial: [Free Trial - Try Microsoft 365 for a month](https://www.microsoft.com/microsoft-365/try).

1. Download the *dimension_customer.csv* file from the [Fabric samples repo](https://github.com/microsoft/fabric-samples/blob/689e78676174d4627fc3855165bde9100cb4d19e/docs-samples/data-engineering/dimension_customer.csv).

1. In the **Lakehouse explorer**, you see options to load data into lakehouse. Select **New Dataflow Gen2**.

   :::image type="content" source="media\tutorial-build-lakehouse\load-data-lakehouse-option.png" alt-text="Screenshot showing where to select New Dataflow Gen2 option to load data into your lakehouse.":::

1. On the new dataflow pane, select **Import from a Text/CSV file**.

1. On the **Connect to data source** pane, select the **Upload file** radio button. Drag and drop the *dimension_customer.csv* file that you downloaded in step 1. After the file is uploaded, select **Next**.

   :::image type="content" source="media\tutorial-build-lakehouse\connection-settings-upload.png" alt-text="Screenshot showing where to select Upload file and where to drag the previously downloaded file.":::

1. From the **Preview file data** page, preview the data and select **Create** to proceed and return back to the dataflow canvas.

1. In the **Query settings** pane, update the **Name** field to **dimension_customer**.

   > [!NOTE]
   > Fabric adds a space and number at the end of the table name by default. Table names must be lower case and must not contain spaces. Please rename it appropriately and remove any spaces from the table name.

   :::image type="content" source="media\tutorial-build-lakehouse\query-settings-add-destination.png" alt-text="Screenshot of the query settings pane, showing where to enter the name and select the data destination." lightbox="media\tutorial-build-lakehouse\query-settings-add-destination.png":::

1. In this tutorial, you have already associated the customer data to a lakehouse. In case you have other data items that you want to associate with the lakehouse, from the menu items, select **Add data destination** and select **Lakehouse**. If needed, from the **Connect to data destination** screen, sign into your account. Select **Next**.

1. Navigate to the **wwilakehouse** in your workspace.

1. If the **dimension_customer** table doesn't exist, select the **New table** setting and enter the table name **dimension_customer**. If the table already exists, select the **Existing table** setting and choose **dimension_customer** from the list of tables in the object explorer. Select **Next**.

   :::image type="content" source="media\tutorial-build-lakehouse\choose-destination-table.png" alt-text="Screenshot showing how to choose the destination table.":::

1. On the **Choose destination settings** pane, select **Replace** as **Update method**. Select **Save settings** to return to the dataflow canvas.

1. From the dataflow canvas, you can easily transform the data based on your business requirements. For simplicity, we aren't making any changes in this tutorial. To proceed, select **Publish** at the bottom right of the screen.

   :::image type="content" source="media\tutorial-build-lakehouse\query-settings-publish.png" alt-text="Screenshot of the Query setting pane that contains the Publish button.":::

1. A spinning circle next to the dataflow's name indicates publishing is in progress in the item view. When publishing is complete, select the **...** and select **Properties**. Rename the dataflow to **Load Lakehouse Table** and select **Save**.

1. Select the **Refresh now** option next to data flow name to refresh the dataflow. It runs the dataflow and moves data from the source file to lakehouse table. While it's in progress, you see a spinning circle under **Refreshed** column in the item view.

   :::image type="content" source="media\tutorial-build-lakehouse\dataflow-refresh-now.png" alt-text="Screenshot showing where to find the Refresh now icon.":::

1. Once the dataflow is refreshed, select your new lakehouse in the left navigation panel to view the **dimension_customer** delta table. Select the table to preview its data. You can also use the SQL analytics endpoint of the lakehouse to query the data with SQL statements. Select **SQL analytics endpoint** from the **Lakehouse** drop-down menu at the top right of the screen.

   :::image type="content" source="media\tutorial-build-lakehouse\lakehouse-delta-table.png" alt-text="Screenshot of the delta table, showing where to select SQL analytics endpoint." lightbox="media\tutorial-build-lakehouse\lakehouse-delta-table.png":::

1. Select the **dimension_customer** table to preview its data or select **New SQL query** to write your SQL statements.

   :::image type="content" source="media\tutorial-build-lakehouse\warehouse-mode-new-sql.png" alt-text="Screenshot of the SQL analytics endpoint screen, showing where to select New SQL query.":::

1. The following sample query aggregates the row count based on the *BuyingGroup* column of the *dimension_customer* table. SQL query files are saved automatically for future reference, and you can rename or delete these files based on your need.

   To run the script, select the **Run** icon at the top of the script file.

   ```sql
   SELECT BuyingGroup, Count(*) AS Total
   FROM dimension_customer
   GROUP BY BuyingGroup
   ```

## Build a report

1. In the item view of the workspace, select the **wwilakehouse** default semantic model. This semantic model is automatically created and has the same name as the lakehouse.

   :::image type="content" source="media\tutorial-build-lakehouse\workspace-default-dataset.png" alt-text="Screenshot showing the default semantic model that was created when the new lakehouse was created.":::

1. From the semantic model pane, you can view all the tables. You have options to create reports either from scratch, paginated report, or let Power BI automatically create a report based on your data. For this tutorial, under **Explore this data**, select **Auto-create a report**. In the next tutorial, we create a report from scratch.

   :::image type="content" source="media\tutorial-build-lakehouse\dataset-details-create-report.png" alt-text="Screenshot of the semantic model details page, showing where to select Create a report.":::

1. Since the table is a dimension and there are no measures in it, Power BI creates a measure for the row count and aggregates it across different columns, and creates different charts as shown in the following image. You can save this report for the future by selecting **Save** from the top ribbon. You can make more changes to this report to meet your requirement by including or excluding other tables or columns.

   :::image type="content" source="media\tutorial-build-lakehouse\quick-summary-report.png" alt-text="Screenshot of a Quick summary page displaying four different bar charts." lightbox="media\tutorial-build-lakehouse\quick-summary-report.png":::

## Next step

> [!div class="nextstepaction"]
> [Ingest data into the lakehouse](tutorial-lakehouse-data-ingestion.md)
