---
title: Lakehouse tutorial - build your first lakehouse
description: As part of the tutorial, build a lakehouse, ingest data for a table, transform data as needed, and use the data to create reports.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.date: 4/28/2023
---

# Lakehouse tutorial: Build your first Lakehouse in Microsoft Fabric

In this module, you quickly build a lakehouse, ingest data for a table, apply transformation whenever required, and then use the ingested data in the lakehouse delta table to create reports.

## Create a lakehouse

1. In the [Power BI service](https://powerbi.com/), select **Workspaces** in the left-hand menu.

1. Search for your workspace by typing in the search textbox at the top and select your workspace to open it.

1. From the workload switcher located at the bottom left of the screen, select **Data Engineering**. The Data Engineering screen appears.

   :::image type="content" source="media\tutorial-build-lakehouse\workload-switch-data-engineering.png" alt-text="Screeenshot showing where to select the workload switcher and Data Engineering." lightbox="media\tutorial-build-lakehouse\workload-switch-data-engineering.png":::

1. In the **Data Engineering** screen, select **Lakehouse** to create a lakehouse. The New lakehouse dialog box appears.

1. Enter **wwilakehouse** in the **Name** box.

   :::image type="content" source="media\tutorial-build-lakehouse\new-lakehouse-name.png" alt-text="Screenshot of the New lakehouse dialog box." lightbox="media\tutorial-build-lakehouse\new-lakehouse-name.png":::

1. Select **Create**. The new lakehouse is created and opens.

## Ingest data

1. Download the *dimension_customer.csv* file from the parent data folder [(placeholder link)](../placeholder.md).

1. In the Lakehouse view, you see options to load data into lakehouse. Select **New Dataflow Gen2**.

   :::image type="content" source="media\tutorial-build-lakehouse\load-data-lakehouse-option.png" alt-text="Screenshot showing where to select New Dataflow Gen2 option to load data into your lakehouse." lightbox="media\tutorial-build-lakehouse\load-data-lakehouse-option.png":::

1. On the new dataflow page, select **Import from a Text/CSV file**.

1. In the **Connect to data source** wizard, select **Upload file** radio button and then drag and drop the data file that you downloaded in step 1 of this module. Once the file is uploaded, select **Next**. The **Preview file data** page opens.

   :::image type="content" source="media\tutorial-build-lakehouse\connection-settings-upload.png" alt-text="Screenshot showing where to select Upload file and where to drag the previously downloaded file." lightbox="media\tutorial-build-lakehouse\connection-settings-upload.png":::

1. On the **Preview file data** page, select **Create** to proceed and return back to the dataflow canvas.

1. In the **Name** property of the query settings pane, enter **dimension_customer**. From the ribbon, select **Add data destination** and select **Lakehouse**.

   :::image type="content" source="media\tutorial-build-lakehouse\query-settings-add-destination.png" alt-text="Screenshot of the query settings pane, showing where to enter the name and select the data destination." lightbox="media\tutorial-build-lakehouse\query-settings-add-destination.png":::

1. If necessary, on the **Connect to data destination** screen, sign into your account. Select **Next**.

1. Navigate to the **wwilakehouse** in your workspace.

1. If the **dimension_customer** table doesn't exist, select the **New table** setting and enter the Table name of **dimension_customer**. If the table already exists, select the **Existing table** setting and select **dimension_customer** from the table list in the object explorer. Select **Next**.

   > [!NOTE]
   > Fabric adds a space and number at the end of the table name by default. Table names must be lower case and must not contain spaces. Please name it appropriately and remove any space from the table name.

1. On the **Choose destination settings**, select **Replace** as **Update method** and select **Save Settings**. You return to the dataflow canvas.

1. From the dataflow canvas, you can easily transform the data based on your business requirements using this intuitive graphical user interface. For this module, we aren't making any changes here. To proceed, select **Publish** at bottom right of the screen.

   :::image type="content" source="media\tutorial-build-lakehouse\query-settings-publish.png" alt-text="Screenshot of the Query setting pane that contains the Publish button." lightbox="media\tutorial-build-lakehouse\query-settings-publish.png":::

1. A spinning circle next to the dataflow’s name indicates publishing is in progress in the artifact view. When publishing is complete, select the ellipsis and select **Properties** to rename the dataflow. For this tutorial, change the name to **Load Lakehouse Table** and select **Save**.

1. Next to the name of the data flow in the artifact view, there's a (**Refresh now**) icon that refreshes the dataflow. Select it to kick off execution of dataflow and to move the data from the source file to lakehouse table. While it’s in progress, you see a spinning circle under **Refreshed** column in the artifact view.

   :::image type="content" source="media\tutorial-build-lakehouse\dataflow-refresh-now.png" alt-text="Screenshot showing where to find the Refresh now icon." lightbox="media\tutorial-build-lakehouse\dataflow-refresh-now.png":::

1. Once the dataflow’s refresh is complete, you can go to the lakehouse and see the **dimension_customer** delta table has been created. You can select it to preview its data. You can also use the SQL endpoint of the lakehouse to query the data with SQL statements in warehouse mode. Select **SQL endpoint** under **Lake mode** at the top right of the screen.

   :::image type="content" source="media\tutorial-build-lakehouse\lakehouse-delta-table.png" alt-text="Screenshot of the delta table, showing where to select SQL endpoint." lightbox="media\tutorial-build-lakehouse\lakehouse-delta-table.png":::

1. In warehouse mode, select the **dimension_customer** table to preview its data or select **New SQL query** to write your SQL statements.

   :::image type="content" source="media\tutorial-build-lakehouse\warehouse-mode-new-sql.png" alt-text="Screenshot of the warehouse mode screen, showing where to select New SQL query." lightbox="media\tutorial-build-lakehouse\warehouse-mode-new-sql.png":::

1. The following sample query aggregates the row count based on the **buyinggroup** column of the **dimension_customer** table and its output. SQL query files are saved automatically for future reference, and you can rename or delete these files based on your need.

   To run the script, select the **Run** icon at the top of the script file.

   ```sql
   SELECT BuyingGroup, Count(*) AS Total
   FROM dimension_customer
   GROUP BY BuyingGroup
   ```

## Build a report

1. In the artifact view of the workspace, select the **wwilakehouse** default dataset, which gets created automatically with the same name of the lakehouse when you create a lakehouse.

   :::image type="content" source="media\tutorial-build-lakehouse\workspace-default-dataset.png" alt-text="Screenshot showing the default dataset that was created when the new lakehouse was created." lightbox="media\tutorial-build-lakehouse\workspace-default-dataset.png":::

1. From the dataset screen, you can view all the tables. You have options to create reports either from scratch, paginated report or let Power BI do magic for you by automatically creating a report based on your data. For this module, select **Auto-create** under **Create a report**. In the next module, we create a report from scratch.

   :::image type="content" source="media\tutorial-build-lakehouse\dataset-details-create-report.png" alt-text="Screenshot of the Dataset details page, showing where to select Create a report." lightbox="media\tutorial-build-lakehouse\dataset-details-create-report.png":::

1. Since the table is a dimension and there are no measures in it, Power BI creates a measure for the row count and aggregates it across different columns, and creates different charts as shown in the following image.

   You can save this report for the future by selecting **Save** in the top ribbon. You can make more changes to this report to meet your requirement by including or excluding other tables or columns.

   :::image type="content" source="media\tutorial-build-lakehouse\quick-summary-report.png" alt-text="Screenshot of a Quick summary page displaying four different bar charts." lightbox="media\tutorial-build-lakehouse\quick-summary-report.png":::

## Next steps

- Lakehouse tutorial: Ingest data in Microsoft Fabric
