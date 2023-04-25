---
title: Lakehouse tutorial - build your first lakehouse
description: As part of the tutorial, build a lakehouse, ingest data for a table, transform data as needed, and use the data to create reports.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: tutorial
ms.date: 04/28/23
---

# Lakehouse tutorial: Build your first Lakehouse in Microsoft Fabric

The intent of this module is to quickly build a lakehouse, ingest data for a table, apply transformation whenever required, and then use the ingested data in the lakehouse delta table to create reports.

## Create a lakehouse

1. In the [Power BI service](https://powerbi.com/) select **Workspaces** in the left-hand menu.

1. Search for your workspace by typing in the search textbox at the top and click on your workspace to open it.

   IMAGE

1. From the workload switcher located at the bottom left of the screen, select **Data engineering**.

   IMAGE

1. In the **Data Engineering** section, select **Lakehouse** to create a lakehouse.

   IMAGE

1. Enter **wwilakehouse** in the **Name** box.

   IMAGE

1. Click **Create**. The new lakehouse is created and opens.

## Ingest data

1. Download the *dimension_customer.csv* file from the parent data folder [(placeholder link)](../placeholder.md).

1. In the lakehouse view, you will see options to load data into lakehouse. Click on **New Dataflow Gen2**.

   IMAGE

1. On the new dataflow page, click on **Import from a Text/CSV file**.

   IMAGE

1. On the **Connect to data source** wizard, click on **Upload file** radio button and then drag and drop the data file that you downloaded in step 1 of this module. Once the file is uploaded, click **Next**. The **Preview file data** page opens.

   IMAGE

1. On the **Preview file data** page, select **Create** to proceed and return back to the dataflow canvas.

   IMAGE

1. In the **Name** property of the query settings pane, enter **dimension_customer**. From the ribbon, select **Add data destination** and select **Lakehouse**.

   IMAGE

1. If necessary, on the **Connect to data destination** screen, sign into your account. Select **Next**.

1. Navigate to the **wwilakehouse** in your workspace.

1. If the **dimension_customer** table does not exist, select the **New table** setting and enter the Table name of **dimension_customer**. If the table already exists, select the **Existing table** setting and select **dimension_customer** from the table list in the object explorer. Select **Next**.

   > [!NOTE]
   > Fabric adds a space and number at the end of the table name by default. Table names must be lower case and must not contain spaces. Please name it appropriately and remove any space from the table name.

   IMAGE

1. On the **Choose destination settings**, select **Replace** as **Update** **method** and click on **Save Settings**.

   IMAGE

1. This will return you to the canvas of the dataflow. You can easily and quickly transform the data based on your business requirements using this nice and intuitive graphical user interface. For the purpose of this module, we will not make any changes here. To proceed, click on **Publish** at bottom right of the screen.

   IMAGE

1. A spinning circle next to the dataflow’s name will indicate publishing is in progress on the artifact view. When this is completed, click on the ellipsis and select **Properties** to rename the dataflow. For the purpose of this module, Change the name to **Load Lakehouse Table** and select **Save**.

1. Next to the name of the data flow in the artifact view, there is an icon (**Refresh now**) to refresh the dataflow. Click on it to kick off execution of dataflow and to move the data from the source file to lakehouse table. While it’s in progress, you will see a spinning circle under **Refreshed** column in the artifact view.

   IMAGE

1. Once the dataflow’s refresh is completed, you can go to the lakehouse, and you will notice **dimension_customer** delta table has been created. When you click on it, you should be able to preview its data. Further, you can use the SQL endpoint of the lakehouse to query the data with SQL statements in warehouse mode. Click on **SQL endpoint** under **Lake mode** on top right of the screen.

   IMAGE

1. In the warehouse mode, you can click on **dimension_customer** table to preview its data and/or click on **New SQL query** to write your SQL statements.

   IMAGE

1. Here is a sample query to aggregate the row count based on buyinggroup column of the **dimension_customer** table and its output. SQL query files are saved automatically for future references, and you can rename or delete these files appropriately based on your need.

   To run the script, click on the **Run** icon at the top of the script file.

   ```sql
   SELECT BuyingGroup, Count(*) AS Total
   FROM dimension_customer
   GROUP BY BuyingGroup
   ```

## Build a report

1. In the artifact view of the workspace, click on **wwilakehouse** default dataset, which gets created automatically with the same name of the lakehouse when you create a lakehouse.

   IMAGE

1. On the dataset screen, you can view all the tables. You will have options to create reports either from scratch, paginated report or let Power BI do magic for you by automatically creating a report based on your data. For the purpose of this module, click on **Auto-create** under **Create a report**. In the next module, we will create a report from scratch.

   IMAGE

1. Since the table is a dimension and there are no measures in it, Power BI smartly creates a measure for the row count and aggregates it across different columns and creates different charts as below.

   You can save this report for the future by clicking on **Save** button at the top ribbon. You can further make changes to this report to meet your requirement by including or excluding additional tables or columns.

   IMAGE

## Next steps

- Lakehouse tutorial: Ingest data in Microsoft Fabric
