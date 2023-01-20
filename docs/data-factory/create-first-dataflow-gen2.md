---
title: Create your first Dataflow​ Gen2 
description: Steps for creating dataflows and transforming data.
ms.reviewer: DougKlopfenstein
ms.author: ​jeluitwi
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

In this section we will be creating our dataflow.

1. Switch to the **Data factory** or **Power BI** workload.

   ![User interface for selecting Data factory.](media/create-first-dataflow-gen2/select-data-factory-03.png)

2. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace

   ![User interface for navigating to workspace.](media/create-first-dataflow-gen2/navigate-to-workspace-04.png)

3. Click on **+ New** and select Dataflow Gen2 (Preview)

   ![User interface for selecting Dataflow Gen2.](media/create-first-dataflow-gen2/select-dataflow-gen2-05.png)

## Get data

Let's get some data! We will be getting data from an OData service, follow steps below to get data in your dataflow.

1. In the Dataflow editor, click on **Get data** and select **More**

   ![User interface for selecting More.](media/create-first-dataflow-gen2/select-more-06.png)

2. Select **OData** as data source

   ![User interface for selecting data source.](media/create-first-dataflow-gen2/select-odata-source-07.png)

3. Enter the URL: [https://services.odata.org/v2/northwind/northwind.svc/](https://services.odata.org/v2/northwind/northwind.svc/) and click **Next**

   ![User interface for entering data URL.](media/create-first-dataflow-gen2/enter-odata-url-08.png)

4. Select the **Orders** and **Customers** tables and click **Create**

   ![User interface for final create step.](media/create-first-dataflow-gen2/select-order-customers-09.png)

You can learn more about the Get Data experience and functionality at [Getting data overview - Power Query | Microsoft Docs](https://docs.microsoft.com/en-us/power-query/get-data-experience)

## Apply transformations and publish

You have now loaded your data into your first dataflow, congratulations! Now it is time to apply a couple of transformations in order to bring this data into the desired shape.

We will be doing this task from the Power Query Editor. You can find a detailed overview of the Power Query Editor at [The Power Query user interface - Power Query | Microsoft Docs](https://docs.microsoft.com/en-us/power-query/power-query-ui)

Follow these steps to continue this tutorial:

1. Make sure you have enabled the [Diagram View](https://docs.microsoft.com/en-us/power-query/diagram-view) using the options under the View tab in the ribbon and [Data Profiling tools](https://docs.microsoft.com/en-us/power-query/data-profiling-tools) by navigating to Home->Options->Global Options

   ![User interface of Global options.](media/create-first-dataflow-gen2/global-options-10.png)

   ![User interface of diagram view.](media/create-first-dataflow-gen2/diagram-view-11.png)

2. Within the Orders table, we would like to calculate the total number of orders per customer. To achieve this, select the CustomerID column in the data preview and click **Group By** under the Transform tab in the ribbon.

   ![User interface for selecting Group By.](media/create-first-dataflow-gen2/calculate-orders-12.png)

3. We will perform a Count of rows as the aggregation within Group By. You can learn more about Group By capabilities at [Grouping or summarizing rows - Power Query | Microsoft Docs](https://docs.microsoft.com/en-us/power-query/group-by)

   ![User interface for Count rows.](media/create-first-dataflow-gen2/group-by-row-count-13.png)

4. After grouping data in the Orders table, we will obtain a two-column table with CustomerID and Count as the columns.

   ![User interface for row count chart.](media/create-first-dataflow-gen2/customerid-count-rows-14.png)

5. Next, we want to combine data from the Customers table with the Count of Orders per customer. To do this, select the Customers query in the Diagram View and use the “...” menu to access the **Merge queries as new** transformation.

   ![User interface for selecting Merge queries as new.](media/create-first-dataflow-gen2/combine-customers-orders-15.png)

6. Configure the [Merge operation](https://docs.microsoft.com/en-us/power-query/merge-queries-overview) as shown in the screenshot below by selecting "CustomerID" as the matching column in both tables and click **Ok**

   ![User interface for the Merge screen.](media/create-first-dataflow-gen2/merge-customers-16.png)

7. Upon performing the **Merge as new** operation, we will obtain a new query with all columns from the Customers table and one column with nested data from the Orders table.

   ![User interface for query results.](media/create-first-dataflow-gen2/new-merge-query-17.png)

8. We are only interested in a subset of columns within the Customers table and will select those by leveraging the Schema View. Let’s enable the Schema View within the toggle button on the bottom-right corner of the Dataflows Editor.

    ![User interface for enabling Schema view.](media/create-first-dataflow-gen2/enable-schema-view-18.png)

9. The Schema View provides a focused view into a table’s schema information, including column names and data types. The Schema View provides a set of Schema Tools available via a contextual ribbon tab. In this scenario we will **select the columns** **CustomerID**, **CompanyName and Orders (2)**, then click the **Remove other columns** button in the Schema Tools tab.

   ![User interface for selecting Remove other columns.](media/create-first-dataflow-gen2/remove-other-columns-19.png)

   ![User interface for Remove column result.](media/create-first-dataflow-gen2/remove-columns-result-20.png)

10. The Orders (2) column contains nested information resulting from the Merge operation we performed a few steps ago. We will now **switch back to the Data view** (by using the view toggle button next to the Schema view in the bottom-right corner of the UI) and use the **Expand Column** transformation in the Orders (2) column header to select the Count column.

    ![User interface for using data view.](media/create-first-dataflow-gen2/select-count-column-21.png)

11. As the final operation, we want to rank our customers based on their number of orders. We will select the Count column and click the [Rank Column](https://docs.microsoft.com/en-us/power-query/rank-column) button under the Add Column tab in the ribbon.

    ![User interface for ranking customers.](media/create-first-dataflow-gen2/select-rank-column-22.png)

12. We will keep the default settings in the Rank Column dialog and click Ok to apply this transformation.

    ![User interface for the Rank Column dialog.](media/create-first-dataflow-gen2/default-rank-column-23.png)

13. We will then rename the resulting query as “Ranked Customers” using the Query settings pane on the right side of the screen.

    ![User interface for Query settings.](media/create-first-dataflow-gen2/rename-query-24.png)

14. We have finished transforming and combining our data, and we will now configure its output destination settings. Let’s click the Choose data destination button at the bottom of the Query settings pane.

    ![User interface for selecting Choose data destination.](media/create-first-dataflow-gen2/choose-data-destination-25.png)

15. At the moment, Azure SQL Database is available as an output destination. We will be expanding the list of available destinations over the next few months. For this step, you can configure an output to your Azure SQL Database if you have one available or skip this step if you don’t. Within this experience, you’re able to configure the destination server, database, and table for your query results, as well as the update method (Append or Replace).

    ![User interface for configuring output.](media/create-first-dataflow-gen2/configure-output-26.png)

    ![User interface for Choose destination settings.](media/create-first-dataflow-gen2/choose-destination-settings-27.png)

16. Your dataflow is now ready to be published, review the queries in the Diagram View and click **Publish**

    ![User interface for publishing a dataflow.](media/create-first-dataflow-gen2/publish-dataflow-28.png)

17. In your workspace click on the **Schedule Refresh** icon.

    ![User interface for selecting Schedule Refresh.](media/create-first-dataflow-gen2/schedule-refresh-29.png)

18. Turn on the Scheduled Refresh, click **"Add another time"** and configure the refresh as shown below.

    ![User interface for selecting Add another time.](media/create-first-dataflow-gen2/add-another-time-30.png)

## Clean up resources

If you're not going to continue to use this dataflow, delete the dataflow with the following steps:

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace

   ![User interface for navigating to a workspace.](media/create-first-dataflow-gen2/navigate-to-workspace-2-31.png)

2. Click on the 3 dots next to the name of your dataflow and click **Delete**

   ![User interface for selecting Delete.](media/create-first-dataflow-gen2/select-delete-32.png)

3. Confirm the deletion of your dataflow

   ![User interface for confirming dataflow deletion.](media/create-first-dataflow-gen2/confirm-delete-33.png)

## Next steps

Advance to the next article to learn how to create your first pipeline: Quickstart: Create your first pipeline to copy data (Preview)
