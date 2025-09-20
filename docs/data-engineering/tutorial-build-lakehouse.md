---
title: Lakehouse tutorial - Create your first lakehouse
description: Learn how to create a lakehouse, ingest data into a table, transform it, and use the data to create reports.
ms.reviewer: arali
ms.author: eur
author: eric-urban
ms.topic: tutorial
ms.custom:
- FY25Q1-Linter
- sfi-image-nochange
ms.date: 09/21/2025
# Customer Intent: As a data engineer, I want to use lakehouses to transform data and build reports using Power BI and Fabric.
---

# Lakehouse tutorial: Create a lakehouse, ingest sample data, and build a report

In this tutorial, you build a lakehouse, ingest sample data into the Delta table, apply transformation where required, and then create reports. Here's a checklist of the steps you'll complete:

> [!div class="checklist"]
> * [Create a lakehouse in Microsoft Fabric](#create-a-lakehouse)
> * [Download and ingest sample customer data](#ingest-sample-data)
> * [Transform and load data into the lakehouse](#transform-and-load-data-into-the-lakehouse)
> * [Add tables to the semantic model](#add-tables-to-the-semantic-model)
> * [Build a report](#build-a-report)

If you don’t have Microsoft Fabric, sign up for a free [trial capacity](../fundamentals/fabric-trial.md).

## Prerequisites

* Before you create a lakehouse, you must [create a Fabric workspace](tutorial-lakehouse-get-started.md).
* Before you ingest a CSV file, you must have OneDrive configured. If you don't have OneDrive configured, sign up for the Microsoft 365 free trial: [Free Trial - Try Microsoft 365 for a month](https://www.microsoft.com/microsoft-365/try).

### Why do I need OneDrive for this tutorial?

You need OneDrive for this tutorial because the data ingestion process uses the "Upload file" option in Fabric, which relies on OneDrive as the underlying storage mechanism for file uploads. When you upload a CSV file to Fabric, it is temporarily stored in your OneDrive account before being ingested into the lakehouse. This integration ensures secure and seamless file transfer within the Microsoft 365 ecosystem.

If you do not have OneDrive configured, Fabric cannot access the uploaded file, so the ingestion step will not work. If you already have the data available in your lakehouse or another supported location, OneDrive is not required.

> [!NOTE]
> If you already have data in your lakehouse, you can use that instead of the sample CSV file. To check if data is already associated with your lakehouse, use the Lakehouse Explorer or the SQL analytics endpoint to browse tables, files, and folders. For more details, see [Lakehouse overview](lakehouse-overview.md) and [Query lakehouse tables with SQL analytics endpoint](../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md).

## Create a lakehouse

In this section, you create a lakehouse in Fabric.

1. In [Fabric](https://app.fabric.microsoft.com), select **Workspaces** from the navigation bar.

1. To open your workspace, enter its name in the search box located at the top and select it from the search results.

1. From the workspace, select **New item**, then select **Lakehouse**.

1. In the **New lakehouse** dialog box, enter **wwilakehouse** in the **Name** field.

   :::image type="content" source="media\tutorial-build-lakehouse\new-lakehouse-name.png" alt-text="Screenshot of the New lakehouse dialog box.":::

1. Select **Create** to create and open the new lakehouse.

## Ingest sample data

In this section, you ingest sample customer data into the lakehouse.

> [!NOTE]
> If you don't have OneDrive configured, sign up for the Microsoft 365 free trial: [Free Trial - Try Microsoft 365 for a month](https://www.microsoft.com/microsoft-365/try).

1. Download the *dimension_customer.csv* file from the [Fabric samples repo](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/dimension_customer.csv).

1. In the **Home** tab, under **Get data in your lakehouse**, you see options to load data into the lakehouse. Select **New Dataflow Gen2**.

   :::image type="content" source="media\tutorial-build-lakehouse\load-data-lakehouse-option.png" alt-text="Screenshot showing where to select New Dataflow Gen2 option to load data into your lakehouse." lightbox="media\tutorial-build-lakehouse\load-data-lakehouse-option.png":::

1. On the new dataflow screen, select **Import from a Text/CSV file**.

1. On the **Connect to data source** screen, select the **Upload file** radio button. Drag and drop the *dimension_customer.csv* file that you downloaded in step 1. After the file is uploaded, select **Next**.

   :::image type="content" source="media\tutorial-build-lakehouse\connection-settings-upload.png" alt-text="Screenshot showing where to select Upload file and where to drag the previously downloaded file.":::

1. From the **Preview file data** page, preview the data and select **Create** to proceed and return back to the dataflow canvas.

## Transform and load data into the lakehouse

In this section, you transform the data based on your business requirements and load it into the lakehouse.

1. In the **Query settings** pane, update the **Name** field to **dimension_customer**.

   > [!NOTE]
   > Fabric adds a space and number at the end of the table name by default. Table names must be lower case and must not contain spaces. Please rename it appropriately and remove any spaces from the table name.

   :::image type="content" source="media\tutorial-build-lakehouse\query-settings-add-destination.png" alt-text="Screenshot of the query settings pane, showing where to enter the name and select the data destination." lightbox="media\tutorial-build-lakehouse\query-settings-add-destination.png":::

1. In this tutorial, you associated the customer data with a lakehouse. If you create a dataflow from the lakehouse, the uploaded data is automatically linked to the default lakehouse. If you're creating the dataflow separately, you can optionally associate it with a lakehouse by following these steps:

   1. From the menu items, select **Add data destination** and select **Lakehouse**. From the **Connect to data destination** screen, sign into your account if necessary and select **Next**.

   1. Navigate to the **wwilakehouse** in your workspace.

   1. If the **dimension_customer** table doesn't exist, select the **New table** setting and enter the table name **dimension_customer**. If the table already exists, select the **Existing table** setting and choose **dimension_customer** from the list of tables in the object explorer. Select **Next**.

      :::image type="content" source="media\tutorial-build-lakehouse\choose-destination-table.png" alt-text="Screenshot showing how to choose the destination table.":::

   1. On the **Choose destination settings** pane, select **Replace** as **Update method**. Select **Save settings** to return to the dataflow canvas.

1. From the dataflow canvas, you can easily transform the data based on your business requirements. For simplicity, we aren't making any changes in this tutorial. To proceed, select **Publish** at the bottom right of the screen.

   :::image type="content" source="media\tutorial-build-lakehouse\query-settings-publish.png" alt-text="Screenshot of the Query setting pane that contains the Publish button.":::

1. A spinning circle next to the dataflow's name indicates publishing is in progress in the item view. When publishing is complete, select the **...** and select **Properties**. Rename the dataflow to **Load Lakehouse Table** and select **Save**.

1. Select the **Refresh now** option next to the data flow name to refresh the dataflow. This option runs the data flow and moves data from the source file to lakehouse table. While it's in progress, you see a spinning circle under **Refreshed** column in the item view.

   :::image type="content" source="media\tutorial-build-lakehouse\dataflow-refresh-now.png" alt-text="Screenshot showing where to find the Refresh now icon.":::

1. Once the dataflow is refreshed, select your new lakehouse in the navigation bar to view the **dimension_customer** Delta table.

   :::image type="content" source="media\tutorial-build-lakehouse\open-lakehouse.png" alt-text="Screenshot of navigation panel from which the lakehouse is opened.":::

1. Select the table to preview its data. You can also use the SQL analytics endpoint of the lakehouse to query the data with SQL statements. Select **SQL analytics endpoint** from the **Lakehouse** dropdown menu at the top right of the screen.

   :::image type="content" source="media\tutorial-build-lakehouse\lakehouse-delta-table.png" alt-text="Screenshot of the Delta table, showing where to select SQL analytics endpoint." lightbox="media\tutorial-build-lakehouse\lakehouse-delta-table.png":::

1. Select the **dimension_customer** table to preview its data or select **New SQL query** to write your SQL statements.

   :::image type="content" source="media\tutorial-build-lakehouse\warehouse-mode-new-sql.png" alt-text="Screenshot of the SQL analytics endpoint screen, showing where to select New SQL query.":::

1. The following sample query aggregates the row count based on the *BuyingGroup* column of the *dimension_customer* table. SQL query files are saved automatically for future reference, and you can rename or delete these files based on your need.

   To run the script, select the **Run** icon at the top of the script file.

   ```sql
   SELECT BuyingGroup, Count(*) AS Total
   FROM dimension_customer
   GROUP BY BuyingGroup
   ```

## Add tables to the semantic model

In this section, you add the tables to the semantic model so that you can use them to create reports.

1. Previously all the lakehouse tables and views were automatically added to the semantic model. With recent updates, for new lakehouses, you must manually add your tables to the semantic model. Open your lakehouse and switch to the **SQL analytics endpoint** view. From the **Reporting** tab, select **Manage default semantic model** and select the tables that you want to add to the semantic model. In this case, select the **dimension_customer** table.

   :::image type="content" source="media\tutorial-build-lakehouse\select-semantic-model-tables.png" alt-text="Screenshot where you can select the tables to add to the semantic model.":::

1. To ensure that the tables in the semantic model are always in sync, switch to the **SQL analytics endpoint** view and open the lakehouse **settings** pane. Select **Default Power BI semantic model** and turn on **Sync the default Power BI semantic model**. For more information, see [Default Power BI semantic models](../data-warehouse/semantic-models.md#sync-the-default-power-bi-semantic-model).

   :::image type="content" source="media\tutorial-build-lakehouse\enable-semantic-model-sync.png" alt-text="Screenshot showing how to turn on data sync to the default semantic model.":::

1. After the table is added, Fabric creates a semantic model with the same name as the lakehouse.

   :::image type="content" source="media\tutorial-build-lakehouse\workspace-default-dataset.png" alt-text="Screenshot showing the default semantic model that was created when the new lakehouse was created.":::

## Build a report

In this section, you'll build a report from the ingested data.

1. From the semantic model pane, you can view all the tables. You have options to create reports either from scratch, paginated reports, or let Power BI automatically create a report based on your data. For this tutorial, under **Explore this data**, select **Auto-create a report**. In the next tutorial, we create a report from scratch.

   :::image type="content" source="media\tutorial-build-lakehouse\dataset-details-create-report.png" alt-text="Screenshot of the semantic model details page, showing where to select Create a report." lightbox="media\tutorial-build-lakehouse\dataset-details-create-report.png":::

1. Because the table is a dimension and there are no measures in it, Power BI creates a measure for the row count and aggregates it across different columns, and creates different charts as shown in the following image. You can save this report for the future by selecting **Save** from the top ribbon. You can make more changes to this report to meet your requirements by including or excluding other tables or columns.

   :::image type="content" source="media\tutorial-build-lakehouse\quick-summary-report.png" alt-text="Screenshot of a Quick summary page displaying four different bar charts." lightbox="media\tutorial-build-lakehouse\quick-summary-report.png":::

## Next step

> [!div class="nextstepaction"]
> [Ingest data into the lakehouse](tutorial-lakehouse-data-ingestion.md)
