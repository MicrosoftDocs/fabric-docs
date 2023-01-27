---
title: Create your first Dataflow​ Gen2 
description: Steps for creating dataflows and transforming data.
ms.reviewer: DougKlopfenstein
ms.author: jeluitwi
author: luitwieler
ms.topic: quickstart 
ms.date: 01/27/2023
---

# Quickstart: Create your first Dataflows Gen2 to get and transform data (Preview)

## Prerequisites

To get started, you must complete the following prerequisites:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. Create an account for free.
- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a Project Trident enabled Workspace.pdf (sharepoint.com)](https://microsofteur.sharepoint.com/teams/TridentPrivatePreview/Shared%20Documents/Documentation/Private%20Preview%20Documentation/Enabling%20Trident/Create%20a%20Project%20Trident%20enabled%20Workspace.pdf).

## Create a dataflow

In this section, we'll be creating our dataflow.

1. Switch to the **Data factory** or **Power BI** workload.

   :::image type="content" source="media/create-first-dataflow-gen2/select-data-factory-03.png" alt-text="User interface for selecting Data factory.":::

2. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace-04.png" alt-text="User interface for navigating to workspace.":::

3. Click on **+ New** and select Dataflow Gen2 (Preview)

   :::image type="content" source="media/create-first-dataflow-gen2/select-dataflow-gen2-05.png" alt-text="User interface for selecting Dataflow Gen2.":::

## Get data

Let's get some data! We'll be getting data from an OData service, follow these steps to get data in your dataflow.

1. In the Dataflow editor, click on **Get data** and select **More**

   :::image type="content" source="media/create-first-dataflow-gen2/select-more-06.png" alt-text="User interface for selecting More.":::

2. Select **OData** as data source

   :::image type="content" source="media/create-first-dataflow-gen2/select-odata-source-07.png" alt-text="User interface for selecting data source.":::

3. Enter the URL: [https://services.odata.org/v2/northwind/northwind.svc/](https://services.odata.org/v2/northwind/northwind.svc/) and click **Next**

   :::image type="content" source="media/create-first-dataflow-gen2/enter-odata-url-08.png" alt-text="User interface for entering data URL.":::

4. Select the **Orders** and **Customers** tables and click **Create**

   :::image type="content" source="media/create-first-dataflow-gen2/select-order-customers-09.png" alt-text="User interface for final create step.":::

You can learn more about the Get Data experience and functionality at [Getting data overview - Power Query | Microsoft Docs](/power-query/get-data-experience)

## Apply transformations and publish

You've now loaded your data into your first dataflow, congratulations! Now it's time to apply a couple of transformations in order to bring this data into the desired shape.

We'll be doing this task from the Power Query Editor. You can find a detailed overview of the Power Query Editor at [The Power Query user interface - Power Query | Microsoft Docs](/power-query/power-query-ui)

Follow these steps to continue this tutorial:

1. Make sure you've enabled the [Diagram View](/power-query/diagram-view) using the options under the View tab in the ribbon and [Data Profiling tools](/power-query/data-profiling-tools) by navigating to Home->Options->Global Options

   :::image type="content" source="media/create-first-dataflow-gen2/global-options-10.png" alt-text="User interface of Global options.":::

   :::image type="content" source="media/create-first-dataflow-gen2/diagram-view-11.png" alt-text="User interface of diagram view.":::

2. Within the Orders table, we would like to calculate the total number of orders per customer. To achieve this goal, select the CustomerID column in the data preview and click **Group By** under the Transform tab in the ribbon.

   :::image type="content" source="media/create-first-dataflow-gen2/calculate-orders-12.png" alt-text="User interface for selecting Group By.":::

3. We'll perform a Count of rows as the aggregation within Group By. You can learn more about Group By capabilities at [Grouping or summarizing rows - Power Query | Microsoft Docs](/power-query/group-by)

   :::image type="content" source="media/create-first-dataflow-gen2/group-by-row-count-13.png" alt-text="User interface for Count rows.":::

4. After grouping data in the Orders table, we'll obtain a two-column table with CustomerID and Count as the columns.

   :::image type="content" source="media/create-first-dataflow-gen2/customerid-count-rows-14.png" alt-text="User interface for row count chart.":::

5. Next, we want to combine data from the Customers table with the Count of Orders per customer. To do combine data, select the Customers query in the Diagram View and use the “...” menu to access the **Merge queries as new** transformation.

   :::image type="content" source="media/create-first-dataflow-gen2/combine-customers-orders-15.png" alt-text="User interface for selecting Merge queries as new.":::

6. Configure the [Merge operation](/power-query/merge-queries-overview) as shown in the following screenshot by selecting "CustomerID" as the matching column in both tables and click **Ok**

   :::image type="content" source="media/create-first-dataflow-gen2/merge-customers-16.png" alt-text="User interface for the Merge screen.":::

7. Upon performing the **Merge as new** operation, we'll obtain a new query with all columns from the Customers table and one column with nested data from the Orders table.

   :::image type="content" source="media/create-first-dataflow-gen2/new-merge-query-17.png" alt-text="User interface for query results.":::

8. We're only interested in a subset of columns within the Customers table and will select those columns by using the Schema View. Let’s enable the Schema View within the toggle button on the bottom-right corner of the Dataflows Editor.

    :::image type="content" source="media/create-first-dataflow-gen2/enable-schema-view-18.png" alt-text="User interface for enabling Schema view.":::

9. The Schema View provides a focused view into a table’s schema information, including column names and data types. The Schema View provides a set of Schema Tools available via a contextual ribbon tab. In this scenario we'll **select the columns** **CustomerID**, **CompanyName and Orders (2)**, then click the **Remove other columns** button in the Schema Tools tab.

   :::image type="content" source="media/create-first-dataflow-gen2/remove-other-columns-19.png" alt-text="User interface for selecting Remove other columns.":::

   :::image type="content" source="media/create-first-dataflow-gen2/remove-columns-result-20.png" alt-text="User interface for Remove column result.":::

10. The Orders (2) column contains nested information resulting from the Merge operation we performed a few steps ago. We'll now **switch back to the Data view** (by using the view toggle button next to the Schema view in the bottom-right corner of the UI) and use the **Expand Column** transformation in the Orders (2) column header to select the Count column.

    :::image type="content" source="media/create-first-dataflow-gen2/select-count-column-21.png" alt-text="User interface for using data view.":::

11. As the final operation, we want to rank our customers based on their number of orders. We'll select the Count column and click the [Rank Column](/power-query/rank-column) button under the Add Column tab in the ribbon.

    :::image type="content" source="media/create-first-dataflow-gen2/select-rank-column-22.png" alt-text="User interface for ranking customers.":::

12. We'll keep the default settings in the Rank Column dialog and click Ok to apply this transformation.

    :::image type="content" source="media/create-first-dataflow-gen2/default-rank-column-23.png" alt-text="User interface for the Rank Column dialog.":::

13. We'll then rename the resulting query as “Ranked Customers” using the Query settings pane on the right side of the screen.

    :::image type="content" source="media/create-first-dataflow-gen2/rename-query-24.png" alt-text="User interface for Query settings.":::

14. We have finished transforming and combining our data, and we'll now configure its output destination settings. Let’s click the Choose data destination button at the bottom of the Query settings pane.

    :::image type="content" source="media/create-first-dataflow-gen2/choose-data-destination-25.png" alt-text="User interface for selecting Choose data destination.":::

15. At the moment, Azure SQL Database is available as an output destination. We'll be expanding the list of available destinations over the next few months. For this step, you can configure an output to your Azure SQL Database if you've one available or skip this step if you don’t. Within this experience, you’re able to configure the destination server, database, and table for your query results, as well as the update method (Append or Replace).

    :::image type="content" source="media/create-first-dataflow-gen2/configure-output-26.png" alt-text="User interface for configuring output.":::

    :::image type="content" source="media/create-first-dataflow-gen2/choose-destination-settings-27.png" alt-text="User interface for Choose destination settings.":::

16. Your dataflow is now ready to be published, review the queries in the Diagram View and click **Publish**

    :::image type="content" source="media/create-first-dataflow-gen2/publish-dataflow-28.png" alt-text="User interface for publishing a dataflow.":::

17. In your workspace click on the **Schedule Refresh** icon.

    :::image type="content" source="media/create-first-dataflow-gen2/schedule-refresh-29.png" alt-text="User interface for selecting Schedule Refresh.":::

18. Turn on the Scheduled Refresh, click **"Add another time"** and configure the refresh as shown in the following screenshot.

    :::image type="content" source="media/create-first-dataflow-gen2/add-another-time-30.png" alt-text="User interface for selecting Add another time.":::

## Clean up resources

If you're not going to continue to use this dataflow, delete the dataflow with the following steps:

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace-2-31.png" alt-text="User interface for navigating to a workspace.":::

2. Click on the 3 dots next to the name of your dataflow and click **Delete**

   :::image type="content" source="media/create-first-dataflow-gen2/select-delete-32.png" alt-text="User interface for selecting Delete.":::

3. Confirm the deletion of your dataflow

   :::image type="content" source="media/create-first-dataflow-gen2/confirm-delete-33.png" alt-text="User interface for confirming dataflow deletion.":::

## Next steps

Advance to the next article to learn how to create your first pipeline: [Quickstart: Create your first pipeline to copy data (Preview)](create-first-pipeline.md).
