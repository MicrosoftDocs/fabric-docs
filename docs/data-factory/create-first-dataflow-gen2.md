---
title: Create your first Microsoft Fabric dataflow
description: Steps for creating dataflows and transforming data.
ms.reviewer: jeluitwi
ms.topic: quickstart
ms.date: 06/26/2025
ms.search.form: DataflowGen2 Tutorials
ms.custom: dataflows, sfi-image-nochange
ai-usage: ai-assisted
---

# Quickstart: Create your first dataflow to get and transform data

Dataflows are a self-service, cloud-based, data preparation technology. In this article, you create your first dataflow, get data for your dataflow, then transform the data and publish the dataflow.

## Prerequisites

The following prerequisites are required before you start:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../fundamentals/create-workspaces.md).

## Create a dataflow

In this section, you're creating your first dataflow.

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace." lightbox="media/create-first-dataflow-gen2/navigate-to-workspace.png":::

1. Select **+New item**, and then select **Dataflow Gen2**.

   :::image type="content" source="media/create-first-dataflow-gen2/select-dataflow-gen2.png" alt-text="Screenshot with the Dataflow Gen2 selection emphasized.":::

## Get data

Let's get some data! In this example, you're getting data from an OData service. Use the following steps to get data in your dataflow.

1. In the dataflow editor, select **Get data** and then select **More**.

   :::image type="content" source="media/create-first-dataflow-gen2/select-more.png" alt-text="Screenshot with the Get Data option selected and More emphasized in the drop-down box.":::

1. In **Choose data source**, select **View more**.

   :::image type="content" source="media/create-first-dataflow-gen2/view-more.png" alt-text="Screenshot of Get data source with View more emphasized." lightbox="media/create-first-dataflow-gen2/view-more.png":::

1. In **New source**, select **Other** > **OData** as the data source.

   :::image type="content" source="media/create-first-dataflow-gen2/select-odata-source.png" alt-text="Screenshot of Get data source with the Other category and the OData connector emphasized." lightbox="media/create-first-dataflow-gen2/select-odata-source.png":::

1. Enter the URL `https://services.odata.org/v4/northwind/northwind.svc/`, and then select **Next**.

   :::image type="content" source="media/create-first-dataflow-gen2/enter-odata-url.png" alt-text="Screenshot of the OData data source where you enter the data URL.":::

1. Select the **Orders** and **Customers** tables, and then select **Create**.

   :::image type="content" source="media/create-first-dataflow-gen2/select-order-customers.png" alt-text="Screenshot of the Power Query navigator with the Customers and Orders tables emphasized." lightbox="media/create-first-dataflow-gen2/select-order-customers.png":::

You can learn more about the get data experience and functionality in the [get data overview](/power-query/get-data-experience).

## Apply transformations and publish

You loaded your data into your first dataflow. Congratulations! Now it's time to apply a couple of transformations to bring this data into the shape we need.

You transform the data in the Power Query editor. You can find a detailed overview of the Power Query editor at [The Power Query user interface](/power-query/power-query-ui), but this section takes you through the basic steps:

1. Make sure the [Data Profiling tools](/power-query/data-profiling-tools) are turned on. Go to **Home** > **Options** > **Global Options**, then select all the options under **Column profile**.

   :::image type="content" source="media/create-first-dataflow-gen2/global-options.png" alt-text="Screenshot of Global options with the Column profile selections emphasized.":::

   Also make sure you enable the [diagram view](/power-query/diagram-view) using the Layout configurations under the **View** tab in the Power Query editor ribbon, or by selecting the diagram view icon on the lower right side of the Power Query window.

   :::image type="content" source="media/create-first-dataflow-gen2/diagram-view.png" alt-text="Screenshot of the overall look of Power Query diagram view." lightbox="media/create-first-dataflow-gen2/diagram-view.png":::

1. Within the Orders table, calculate the total number of orders per customer: Select the **CustomerID** column in the data preview and then select **Group By** under the **Transform** tab in the ribbon.

   :::image type="content" source="media/create-first-dataflow-gen2/calculate-orders.png" alt-text="Screenshot showing the Orders table selected, and Group by emphasized in the Transform tab." lightbox="media/create-first-dataflow-gen2/calculate-orders.png":::

1. You perform a count of rows as the aggregation within **Group By**. You can learn more about **Group By** capabilities in [Grouping or summarizing rows](/power-query/group-by).

   :::image type="content" source="media/create-first-dataflow-gen2/group-by-row-count.png" alt-text="Screenshot of Group by, with the Count rows operation selected.":::

1. After grouping data in the Orders table, we'll obtain a two-column table with **CustomerID** and **Count** as the columns.

   :::image type="content" source="media/create-first-dataflow-gen2/customerid-count-rows.png" alt-text="Screenshot of the two column table." lightbox="media/create-first-dataflow-gen2/customerid-count-rows.png":::

1. Next, you want to combine data from the Customers table with the Count of Orders per customer: Select the Customers query in the Diagram View and use the "⋮" menu to access the **Merge queries as new** transformation.

   :::image type="content" source="media/create-first-dataflow-gen2/combine-customers-orders.png" alt-text="Screenshot of the dataflow editor, with the vertical ellipsis of the Customers table and Merge queries as new emphasized." lightbox="media/create-first-dataflow-gen2/combine-customers-orders.png":::

1. Configure the [Merge operation](/power-query/merge-queries-overview) by selecting **CustomerID** as the matching column in both tables. Then select **Ok**.

   :::image type="complex" source="media/create-first-dataflow-gen2/merge-customers.png" alt-text="Screenshot of the Merge window.":::
   Screenshot of the Merge window, with the Left table for merge set to the Customers table and the Right table for merge set to the Orders table. The CustomerID column is selected for both the Customers and Orders tables. Also, the Join Kind is set to Left outer. All other selections are set to their default value.
:::image-end:::

1. Now there's a new query with all columns from the Customers table and one column with nested data from the Orders table.

   :::image type="content" source="media/create-first-dataflow-gen2/new-merge-query.png" alt-text="Screenshot of the dataflow editor with the new Merge query added to the right of the Customers and Orders tables." lightbox="media/create-first-dataflow-gen2/new-merge-query.png":::

1. Let's focus on just a few columns from the Customers table. To do this, turn on schema view by selecting the schema view button in the bottom-right corner of the dataflow editor.

    :::image type="content" source="media/create-first-dataflow-gen2/enable-schema-view.png" alt-text="Screenshot of the dataflow editor with the schema view button emphasized in the bottom-right corner." lightbox="media/create-first-dataflow-gen2/enable-schema-view.png":::

1. In schema view, you'll see all the columns in your table. Select **CustomerID**, **CompanyName**, and **Orders (2)**. Then, go to the **Schema tools** tab, select **Remove columns**, and choose **Remove other columns**. This keeps only the columns you want.

   :::image type="content" source="media/create-first-dataflow-gen2/remove-columns-result.png" alt-text="Screenshot of the schema view showing all of the available column names, with the CustomerID, CompanyName, and Orders (2) columns emphasized." lightbox="media/create-first-dataflow-gen2/remove-columns-result.png":::

   :::image type="content" source="media/create-first-dataflow-gen2/remove-other-columns.png" alt-text="Screenshot of the schema tools menu with Remove other columns emphasized.":::

1. The **Orders (2)** column holds extra details from the merge step. To see and use this data, select the **Show data view** button in the bottom-right corner, next to **Show schema view**. Then, in the **Orders (2)** column header, select the **Expand Column** icon and pick the **Count** column. This adds the order count for each customer to your table.

    :::image type="complex" source="media/create-first-dataflow-gen2/select-count-column.png" alt-text="Screenshot for using data view." lightbox="media/create-first-dataflow-gen2/select-count-column.png":::
    Screenshot of the dataflow editor with the Show data view button in the bottom-right corner, the expand column icon in the Orders (2) column, and the Count column selected in the expand column window.
    :::image-end:::

1. Now let's rank your customers by how many orders they've made. Select the **Count** column, then go to the **Add Column** tab and select **[Rank column](/power-query/rank-column)**. This adds a new column showing each customer's rank based on their order count.

    :::image type="content" source="media/create-first-dataflow-gen2/select-rank-column.png" alt-text="Screenshot of the dataflow editor with the Count column selected." lightbox="media/create-first-dataflow-gen2/select-rank-column.png":::

1. Keep the default settings in **Rank Column**. Then select **OK** to apply this transformation.

    :::image type="content" source="media/create-first-dataflow-gen2/default-rank-column.png" alt-text="Screenshot of the Rank window with all default settings displayed.":::

1. Now rename the resulting query as **Ranked Customers** using the **Query settings** pane on the right side of the screen.

    :::image type="content" source="media/create-first-dataflow-gen2/rename-query.png" alt-text="Screenshot of the dataflow editor with the Ranked Customers name emphasized under the query settings properties." lightbox="media/create-first-dataflow-gen2/rename-query.png":::

1. You're ready to set where your data goes. In the **Query settings** pane, scroll to the bottom and select **Choose data destination**.

    :::image type="content" source="media/create-first-dataflow-gen2/choose-data-destination.png" alt-text="Screenshot of the dataflow editor with the location of the Data destination selection emphasized." lightbox="media/create-first-dataflow-gen2/choose-data-destination.png":::

1. You can send your results to a lakehouse if you have one, or skip this step if you don't. Here, you can pick which lakehouse and table to use for your data, and choose whether to add new data (Append) or replace what's there (Replace).

    :::image type="content" source="media/create-first-dataflow-gen2/configure-output.png" alt-text="Screenshot of the Connect to data destination window with lakehouse selected." lightbox="media/create-first-dataflow-gen2/configure-output.png":::

    :::image type="content" source="media/create-first-dataflow-gen2/choose-destination-settings.png" alt-text="Screenshot of the Choose destination settings window." lightbox="media/create-first-dataflow-gen2/choose-destination-settings.png":::

1. Your dataflow is now ready to be published. Review the queries in the diagram view, and then select **Publish**.

   :::image type="content" source="media/create-first-dataflow-gen2/publish-dataflow.png" alt-text="Screenshot of the dataflow editor with the Publish button on the lower-right side emphasized." lightbox="media/create-first-dataflow-gen2/publish-dataflow.png":::

   Select **Publish** in the lower-right corner to save your dataflow. You'll go back to your workspace, where a spinner icon next to your dataflow name shows it's publishing. When the spinner disappears, your dataflow's ready to refresh!

   > [!IMPORTANT]
   > The first time you create a Dataflow Gen2 in a workspace, Fabric sets up some background items (Lakehouse and Warehouse) that help your dataflow run. These items are shared by all dataflows in the workspace, and you shouldn't delete them. They're not meant to be used directly and usually aren't visible in your workspace, but you might see them in other places like Notebooks or SQL analytics. Look for names that start with `DataflowStaging` to spot them.

1. In your workspace, select the **Schedule Refresh** icon.

    :::image type="content" source="media/create-first-dataflow-gen2/schedule-refresh.png" alt-text="Screenshot of the workspace with the schedule refresh icon emphasized.":::

1. Turn on the scheduled refresh, select **Add another time**, and configure the refresh as shown in the following screenshot.

    :::image type="complex" source="media/create-first-dataflow-gen2/add-another-time.png" alt-text="Screenshot showing how to select another time.":::
    Screenshot of the scheduled refresh options, with scheduled refresh turned on, the refresh frequency set to Daily, the Time zone set to coordinated universal time, and the Time set to 4:00 AM. The on button, the Add another time selection, the dataflow owner, and the apply button are all emphasized.
    :::image-end:::

## Clean up resources

If you're not going to continue to use this dataflow, delete the dataflow using the following steps:

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace.":::

1. Select the vertical ellipsis next to the name of your dataflow and then select **Delete**.

   :::image type="content" source="media/create-first-dataflow-gen2/select-delete.png" alt-text="Screenshot with the three vertical dots and the delete option in the drop-down menu emphasized.":::

1. Select **Delete** to confirm the deletion of your dataflow.

   :::image type="content" source="media/create-first-dataflow-gen2/confirm-delete.png" alt-text="Screenshot of the Delete dataflow window, with the Delete button emphasized.":::

## Related content

The dataflow in this sample shows you how to load and transform data in Dataflow Gen2. You learned how to:

> [!div class="checklist"]
> - Create a Dataflow Gen2.
> - Transform data.
> - Configure destination settings for transformed data.
> - Run and schedule your pipeline.

Advance to the next article to learn how to create your first pipeline.

> [!div class="nextstepaction"]
> [Quickstart: Create your first pipeline to copy data](create-first-pipeline-with-sample-data.md).
