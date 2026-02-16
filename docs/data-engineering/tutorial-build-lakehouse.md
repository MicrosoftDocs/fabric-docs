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
ms.date: 02/14/2026
# Customer Intent: As a data engineer, I want to use lakehouses to transform data and build reports using Power BI and Fabric.
---

# Lakehouse tutorial: Create a lakehouse, ingest sample data, and build a report

In this tutorial, you build a lakehouse, ingest sample data into the Delta table, apply transformation where required, and then create reports.

> [!TIP]
> This tutorial is part of a series. After you complete this tutorial, continue to [Ingest data into the lakehouse](tutorial-lakehouse-data-ingestion.md) to build a complete enterprise lakehouse using Data Factory pipelines, Spark notebooks, and advanced reporting techniques.

Here's a checklist of the steps you complete in this tutorial:

> [!div class="checklist"]
> * [Create a lakehouse in Microsoft Fabric](#create-a-lakehouse)
> * [Download and ingest sample customer data](#ingest-sample-data)
> * [Transform and load data into the lakehouse](#transform-and-load-data-into-the-lakehouse)
> * [Add tables to the semantic model](#add-tables-to-the-semantic-model)
> * [Build a report](#build-a-report)

If you don't have Microsoft Fabric, sign up for a free [trial capacity](../fundamentals/fabric-trial.md).

## Prerequisites

* Before you create a lakehouse, you must [create a Fabric workspace](tutorial-lakehouse-get-started.md).
* Before you ingest a CSV file, you must have OneDrive configured. If you don't have OneDrive configured, sign up for the Microsoft 365 free trial: [Free Trial - Try Microsoft 365 for a month](https://www.microsoft.com/microsoft-365/try). For setup instructions, see [Set up OneDrive](https://support.microsoft.com/en-us/office/setup-onedrive-for-microsoft-365-for-business-937e3ac8-b396-4a70-a561-6eaa479a4720).

### Why do I need OneDrive for this tutorial?

You need OneDrive for this tutorial because the data ingestion process relies on OneDrive as the underlying storage mechanism for file uploads. When you upload a CSV file to Fabric, it's temporarily stored in your OneDrive account before being ingested into the lakehouse. This integration ensures secure and seamless file transfer within the Microsoft 365 ecosystem.

The ingestion step doesn't work if you don't have OneDrive configured, because Fabric can't access the uploaded file. If you already have the data available in your lakehouse or another supported location, OneDrive isn't required.

> [!NOTE]
> If you already have data in your lakehouse, you can use that data instead of the sample CSV file. To check if data is already associated with your lakehouse, use the Lakehouse Explorer or the SQL analytics endpoint to browse tables, files, and folders. For more information about how to check, see [Lakehouse overview](lakehouse-overview.md) and [Query lakehouse tables with SQL analytics endpoint](../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md).

## Create a lakehouse

In this section, you create a lakehouse in Fabric.

1. In [Fabric](https://app.fabric.microsoft.com), select **Workspaces** from the navigation bar.

1. To open your workspace, enter its name in the search box located at the top and select it from the search results.

1. From the workspace, select **New item**, enter **Lakehouse** in the search box, then select **Lakehouse**.

1. In the **New lakehouse** dialog box, enter **wwilakehouse** in the **Name** field.

   :::image type="content" source="media\tutorial-build-lakehouse\new-lakehouse-name.png" alt-text="Screenshot of the New lakehouse dialog box." lightbox="media\tutorial-build-lakehouse\new-lakehouse-name.png":::

1. Select **Create** to create and open the new lakehouse.

## Ingest sample data

In this section, you ingest sample customer data into the lakehouse.

> [!NOTE]
> If you don't have OneDrive configured, sign up for the Microsoft 365 free trial: [Free Trial - Try Microsoft 365 for a month](https://www.microsoft.com/microsoft-365/try).

1. Download the *dimension_customer.csv* file from the [Fabric samples repo](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/dimension_customer.csv).

1. Select your Lakehouse and go to the **Home** tab.

1. Select **Get data** > **New Dataflow Gen2** to create a new dataflow. You use this dataflow to ingest the sample data into the lakehouse. Alternatively, under **Get data in your lakehouse**, you can select the **New Dataflow Gen2** tile.

   :::image type="content" source="media\tutorial-build-lakehouse\load-data-lakehouse-option.png" alt-text="Screenshot showing where to select New Dataflow Gen2 option to load data into your lakehouse." lightbox="media\tutorial-build-lakehouse\load-data-lakehouse-option.png":::

1. In the **New Dataflow Gen2** pane, enter **Customer Dimension Data** in the **Name** field and select **Next**.

   :::image type="content" source="media\tutorial-build-lakehouse\create-dataflow-name.png" alt-text="Screenshot of the New Dataflow Gen2 pane, showing where to enter the dataflow name." lightbox="media\tutorial-build-lakehouse\create-dataflow-name.png":::

1. On the dataflow **Home** tab, select the **Import from a Text/CSV file** tile.

1. On the **Connect to data source** screen, select the **Upload file** radio button. 
1. Browse or drag and drop the *dimension_customer.csv* file that you downloaded in step 1. After the file is uploaded, select **Next**.

   :::image type="content" source="media\tutorial-build-lakehouse\connection-settings-upload.png" alt-text="Screenshot showing where to select the file to upload." lightbox="media\tutorial-build-lakehouse\connection-settings-upload.png":::

1. On the **Preview file data** page you can preview the data. Then select **Create** to proceed and return back to the dataflow canvas.

## Transform and load data into the lakehouse

In this section, you transform the data based on your business requirements and load it into the lakehouse.

1. In the **Query settings** pane, make sure the **Name** field is set to **dimension_customer**. This name is used as the table name in the lakehouse, so it must be lowercase and must not contain spaces.

   :::image type="content" source="media\tutorial-build-lakehouse\query-settings-add-destination.png" alt-text="Screenshot of the query settings pane, showing where to enter the name and select the data destination." lightbox="media\tutorial-build-lakehouse\query-settings-add-destination.png":::

1. Because you created the dataflow from the lakehouse, the data destination is automatically set to your lakehouse. You can verify this by checking the **Data destination** in the query settings pane.

   > [!TIP]
   > If you create a dataflow from the workspace instead of from a lakehouse, you need to manually add a data destination. For more information, see [Dataflow Gen2 default destination](../data-factory/default-destination.md) and [Data destinations and managed settings](../data-factory/dataflow-gen2-data-destinations-and-managed-settings.md).

1. From the dataflow canvas, you can easily transform the data based on your business requirements. For simplicity, we aren't making any changes in this tutorial. To proceed, select **Save and Run** in the tool bar.

   :::image type="content" source="media\tutorial-build-lakehouse\query-settings-publish.png" alt-text="Screenshot of the Query setting pane that contains the Publish button." lightbox="media\tutorial-build-lakehouse\query-settings-publish.png":::

   Wait for the dataflow to finish running. While it's in progress, you see a spinning status indicator.

   :::image type="content" source="media\tutorial-build-lakehouse\dataflow-running.png" alt-text="Screenshot showing the dataflow running status." lightbox="media\tutorial-build-lakehouse\dataflow-running.png":::

1. After the dataflow run completes successfully, select your lakehouse in the top menu bar to open it.

1. In the lakehouse explorer, find the **dbo** schema under **Tables**, select the **...** (ellipsis) menu next to it, and then select **Refresh**. This runs the dataflow and loads the data from the source file into the lakehouse table.

   :::image type="content" source="media\tutorial-build-lakehouse\dataflow-refresh-now.png" alt-text="Screenshot of the lakehouse explorer, showing where to select the Refresh option." lightbox="media\tutorial-build-lakehouse\dataflow-refresh-now.png":::

1. Once the refresh is complete, expand the **dbo** schema to view the **dimension_customer** Delta table. Select the table to preview its data. 

1. You can use the SQL analytics endpoint of the lakehouse to query the data with SQL statements. Select **SQL analytics endpoint** from the dropdown menu at the top right of the screen.

   :::image type="content" source="media\tutorial-build-lakehouse\lakehouse-delta-table.png" alt-text="Screenshot of the Delta table, showing where to select SQL analytics endpoint." lightbox="media\tutorial-build-lakehouse\lakehouse-delta-table.png":::

1. Select the **dimension_customer** table to preview its data. To write SQL statements, select **New SQL Query** from the menu or select the **New SQL Query** tile.

   :::image type="content" source="media\tutorial-build-lakehouse\warehouse-mode-new-sql.png" alt-text="Screenshot of the SQL analytics endpoint screen, showing where to select New SQL query." lightbox="media\tutorial-build-lakehouse\warehouse-mode-new-sql.png":::

1. Enter the following sample query that aggregates the row count based on the *BuyingGroup* column of the *dimension_customer* table. 

   ```sql
   SELECT BuyingGroup, Count(*) AS Total
   FROM dimension_customer
   GROUP BY BuyingGroup
   ```

    > [!NOTE]
    > SQL query files are saved automatically for future reference, and you can rename or delete these files based on your need.

1. To run the script, select the **Run** icon at the top of the script file. 

   :::image type="content" source="media\tutorial-build-lakehouse\warehouse-mode-sql-run-result.png" alt-text="Screenshot showing the Run icon and the query results." lightbox="media\tutorial-build-lakehouse\warehouse-mode-sql-run-result.png":::


## Add tables to the semantic model

In this section, you add the tables to the semantic model so that you can use them to create reports.

1. Open your lakehouse and switch to the **SQL analytics endpoint** view.

1. Select **New semantic model**.

1. In the **New semantic model** pane, enter a name for the semantic model, assign a workspace, and select the tables that you want to add. In this case, select the **dimension_customer** table.

   :::image type="content" source="media\tutorial-build-lakehouse\select-semantic-model-tables.png" alt-text="Screenshot where you can select the tables to add to the semantic model." lightbox="media\tutorial-build-lakehouse\select-semantic-model-tables.png":::

1. Select **Confirm** to create the semantic model. 

   > [!WARNING]
   > If you receive an error message stating "We couldn't add or remove tables" due to your organization's Fabric compute capacity exceeding its limits, wait a few minutes and try again. For more information, see [Fabric capacity documentation](../enterprise/scale-capacity.md).

1. The semantic model is created in Direct Lake storage mode, which means it reads data directly from the Delta tables in OneLake for fast query performance without needing to import the data. After creation, you can edit the semantic model to add relationships, measures, and more.

   > [!TIP]
   > To learn more about Direct Lake and its benefits, see [Direct Lake overview](../fundamentals/direct-lake-overview.md).

## Build a report

In this section, you build a report from the semantic model you created.

1. In your workspace, find the semantic model you created, select the **...** (ellipsis) menu, and then select **Auto-create report**.

   :::image type="content" source="media\tutorial-build-lakehouse\dataset-details-create-report.png" alt-text="Screenshot of the semantic model in the workspace overview page, showing where to create a report." lightbox="media\tutorial-build-lakehouse\dataset-details-create-report.png":::

1. The table is a dimension and there are no measures in it. Power BI creates a measure for the row count, aggregates it across different columns, and creates different charts as shown in the following screenshot.

   :::image type="content" source="media\tutorial-build-lakehouse\quick-summary-report.png" alt-text="Screenshot of a Quick summary page displaying four different bar charts." lightbox="media\tutorial-build-lakehouse\quick-summary-report.png":::

1. You can save this report for the future by selecting **Save** from the top ribbon. You can make more changes to this report to meet your requirements by including or excluding other tables or columns.

## Next step

> [!div class="nextstepaction"]
> [Ingest data into the lakehouse](tutorial-lakehouse-data-ingestion.md)
