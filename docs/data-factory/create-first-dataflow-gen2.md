---
title: Create your first Microsoft Fabric dataflow
description: Steps for creating dataflows and transforming data.
ms.reviewer: DougKlopfenstein
ms.author: jeluitwi
author: luitwieler
ms.topic: quickstart
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: DataflowGen2 Tutorials
---

# Quickstart: Create your first dataflow to get and transform data

Dataflows are a self-service, cloud-based, data preparation technology. In this article, you create your first dataflow, get data for your dataflow, then transform the data and publish the dataflow.

## Prerequisites

The following prerequisites are required before you start:

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. [Create a free account](https://azure.microsoft.com/free/).
- Make sure you have a [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../get-started/create-workspaces.md).

## Create a dataflow

In this section, you're creating your first dataflow.

1. Switch to the **Data factory** experience.

   :::image type="content" source="media/create-first-dataflow-gen2/select-data-factory.png" alt-text="Screenshot with the data factory experience emphasized.":::

2. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace." lightbox="media/create-first-dataflow-gen2/navigate-to-workspace.png":::

3. Select **New**, and then select **Dataflow Gen2**.

   :::image type="content" source="media/create-first-dataflow-gen2/select-dataflow-gen2.png" alt-text="Screenshot with the Dataflow Gen2 selection emphasized.":::

## Get data

Let's get some data! In this example, you're getting data from an OData service. Use the following steps to get data in your dataflow.

1. In the dataflow editor, select **Get data** and then select **More**.

   :::image type="content" source="media/create-first-dataflow-gen2/select-more.png" alt-text="Screenshot with the Get Data option selected and More emphasized in the drop-down box.":::

2. In **Choose data source**, select **View more**.

   :::image type="content" source="media/create-first-dataflow-gen2/view-more.png" alt-text="Screenshot of Get data source with View more emphasized." lightbox="media/create-first-dataflow-gen2/view-more.png":::

3. In **New source**, select **Other** > **OData** as the data source.

   :::image type="content" source="media/create-first-dataflow-gen2/select-odata-source.png" alt-text="Screenshot of Get data source with the Other category and the OData connector emphasized." lightbox="media/create-first-dataflow-gen2/select-odata-source.png":::

4. Enter the URL `https://services.odata.org/v4/northwind/northwind.svc/`, and then select **Next**.

   :::image type="content" source="media/create-first-dataflow-gen2/enter-odata-url.png" alt-text="Screenshot of the OData data source where you enter the data URL.":::

5. Select the **Orders** and **Customers** tables, and then select **Create**.

   :::image type="content" source="media/create-first-dataflow-gen2/select-order-customers.png" alt-text="Screenshot of the Power Query navigator with the Customers and Orders tables emphasized." lightbox="media/create-first-dataflow-gen2/select-order-customers.png":::

You can learn more about the get data experience and functionality at [Getting data overview](/power-query/get-data-experience).

## Apply transformations and publish

You have now loaded your data into your first dataflow, congratulations! Now it's time to apply a couple of transformations in order to bring this data into the desired shape.

You're going to be doing this task from the Power Query editor. You can find a detailed overview of the Power Query editor at [The Power Query user interface](/power-query/power-query-ui).

Follow these steps to apply transformations and publish:

1. Ensure that the [Data Profiling tools](/power-query/data-profiling-tools) are enabled by navigating to **Home** > **Options** > **Global Options**.

   :::image type="content" source="media/create-first-dataflow-gen2/global-options.png" alt-text="Screenshot of Global options with the Column profile selections emphasized.":::

   Also make sure you've enabled the [diagram view](/power-query/diagram-view) using the options under the **View** tab in the Power Query editor ribbon, or by selecting the diagram view icon on the lower right side of the Power Query window.

   :::image type="content" source="media/create-first-dataflow-gen2/diagram-view.png" alt-text="Screenshot of the overall look of Power Query diagram view." lightbox="media/create-first-dataflow-gen2/diagram-view.png":::

2. Within the Orders table, you calculate the total number of orders per customer. To achieve this goal, select the **CustomerID** column in the data preview and then select **Group By** under the **Transform** tab in the ribbon.

   :::image type="content" source="media/create-first-dataflow-gen2/calculate-orders.png" alt-text="Screenshot showing the Orders table selected, and Group by emphasized in the Transform tab." lightbox="media/create-first-dataflow-gen2/calculate-orders.png":::

3. You perform a count of rows as the aggregation within **Group By**. You can learn more about **Group By** capabilities at [Grouping or summarizing rows](/power-query/group-by).

   :::image type="content" source="media/create-first-dataflow-gen2/group-by-row-count.png" alt-text="Screenshot of Group by, with the Count rows operation selected.":::

4. After grouping data in the Orders table, we'll obtain a two-column table with **CustomerID** and **Count** as the columns.

   :::image type="content" source="media/create-first-dataflow-gen2/customerid-count-rows.png" alt-text="Screenshot of the two column table." lightbox="media/create-first-dataflow-gen2/customerid-count-rows.png":::

5. Next, you want to combine data from the Customers table with the Count of Orders per customer. To combine data, select the Customers query in the Diagram View and use the "⋮" menu to access the **Merge queries as new** transformation.

   :::image type="content" source="media/create-first-dataflow-gen2/combine-customers-orders.png" alt-text="Screenshot of the dataflow editor, with the vertical ellipsis of the Customers table and Merge queries as new emphasized." lightbox="media/create-first-dataflow-gen2/combine-customers-orders.png":::

6. Configure the [Merge operation](/power-query/merge-queries-overview) as shown in the following screenshot by selecting **CustomerID** as the matching column in both tables. Then select **Ok**.

   :::image type="complex" source="media/create-first-dataflow-gen2/merge-customers.png" alt-text="Screenshot of the Merge window.":::
   Screenshot of the Merge window, with the Left table for merge set to the Customers table and the Right table for merge set to the Orders table. The CustomerID column is selected for both the Customers and Orders tables. Also, the Join Kind is set to Left outer. All other selections are set to their default value.
:::image-end:::

7. Upon performing the **Merge queries as new** operation, you obtain a new query with all columns from the Customers table and one column with nested data from the Orders table.

   :::image type="content" source="media/create-first-dataflow-gen2/new-merge-query.png" alt-text="Screenshot of the dataflows editor with the new Merge query added to the right of the Customers and Orders tables." lightbox="media/create-first-dataflow-gen2/new-merge-query.png":::

8. In this example, you're only interested in a subset of columns in the Customers table. You select those columns by using the schema view. Enable the schema view within the toggle button on the bottom-right corner of the dataflows editor.

    :::image type="content" source="media/create-first-dataflow-gen2/enable-schema-view.png" alt-text="Screenshot of the dataflows editor with the schema view button emphasized in the bottom-right corner." lightbox="media/create-first-dataflow-gen2/enable-schema-view.png":::

9. The schema view provides a focused view into a table’s schema information, including column names and data types. Schema view has a set of schema tools available through a contextual ribbon tab. In this scenario, you select the **CustomerID**, **CompanyName**, and **Orders (2)** columns, then select the **Remove columns** button, and then select **Remove other columns** in the **Schema tools** tab.

   :::image type="content" source="media/create-first-dataflow-gen2/remove-columns-result.png" alt-text="Screenshot of the schema view showing all of the available column names, with the CustomerID, CompanyName, and Orders (2) columns emphasized." lightbox="media/create-first-dataflow-gen2/remove-columns-result.png":::

   :::image type="content" source="media/create-first-dataflow-gen2/remove-other-columns.png" alt-text="Screenshot of the schema tools menu with Remove other columns emphasized.":::

10. The **Orders (2)** column contains nested information resulting from the merge operation you performed a few steps ago. Now, switch back to the data view by selecting the **Show data view** button next to the **Show schema view** button in the bottom-right corner of the UI. Then use the **Expand Column** transformation in the **Orders (2)** column header to select the **Count** column.

    :::image type="complex" source="media/create-first-dataflow-gen2/select-count-column.png" alt-text="Screenshot for using data view." lightbox="media/create-first-dataflow-gen2/select-count-column.png":::
    Screenshot of the dataflows editor with the Show data view button in the bottom-right corner, the expand column icon in the Orders (2) column, and the Count column selected in the expand column window.
    :::image-end:::

11. As the final operation, you want to rank your customers based on their number of orders. Select the **Count** column and then select the **[Rank column](/power-query/rank-column)** button under the **Add Column** tab in the ribbon.

    :::image type="content" source="media/create-first-dataflow-gen2/select-rank-column.png" alt-text="Screenshot of the dataflows editor with the Count column selected." lightbox="media/create-first-dataflow-gen2/select-rank-column.png":::

12. Keep the default settings in **Rank Column**. Then select **OK** to apply this transformation.

    :::image type="content" source="media/create-first-dataflow-gen2/default-rank-column.png" alt-text="Screenshot of the Rank window with all default settings displayed.":::

13. Now rename the resulting query as **Ranked Customers** using the **Query settings** pane on the right side of the screen.

    :::image type="content" source="media/create-first-dataflow-gen2/rename-query.png" alt-text="Screenshot of the dataflows editor with the Ranked Customers name emphasized under the query settings properties." lightbox="media/create-first-dataflow-gen2/rename-query.png":::

14. You've finished transforming and combining your data. So, you now configure its output destination settings. Select **Choose data destination** at the bottom of the **Query settings** pane.

    :::image type="content" source="media/create-first-dataflow-gen2/choose-data-destination.png" alt-text="Screenshot of the dataflows editor with the location of the Data destination selection emphasized." lightbox="media/create-first-dataflow-gen2/choose-data-destination.png":::

15. For this step, you can configure an output to your lakehouse if you have one available, or skip this step if you don't. Within this experience, you're able to configure the destination lakehouse and table for your query results, in addition to the update method (Append or Replace).

    :::image type="content" source="media/create-first-dataflow-gen2/configure-output.png" alt-text="Screenshot of the Connect to data destination window with lakehouse selected." lightbox="media/create-first-dataflow-gen2/configure-output.png":::

    :::image type="content" source="media/create-first-dataflow-gen2/choose-destination-settings.png" alt-text="Screenshot of the Choose destination settings window." lightbox="media/create-first-dataflow-gen2/choose-destination-settings.png":::

16. Your dataflow is now ready to be published. Review the queries in the diagram view, and then select **Publish**.

    :::image type="content" source="media/create-first-dataflow-gen2/publish-dataflow.png" alt-text="Screenshot of the dataflows editor with the Publish button on the lower-right side emphasized." lightbox="media/create-first-dataflow-gen2/publish-dataflow.png":::

    You're now returned to the workspace. A spinner icon next to your dataflow name indicates publishing is in progress. Once the publishing completes, your dataflow is ready to refresh!

    > [!IMPORTANT]
    > When the first Dataflow Gen2 is created in a workspace, Lakehouse and Warehouse items are provisioned along with their related SQL analytics endpoint and semantic models. These items are shared by all dataflows in the workspace and are required for Dataflow Gen2 to operate, shouldn't be deleted, and aren't intended to be used directly by users. The items are an implementation detail of Dataflow Gen2. The items aren't visible in the workspace, but might be accessible in other experiences such as the Notebook, SQL analytics endpoint, Lakehouse, and Warehouse experiences. You can recognize the items by their prefix in the name. The prefix of the items is `DataflowsStaging'.

17. In your workspace, select the **Schedule Refresh** icon.

    :::image type="content" source="media/create-first-dataflow-gen2/schedule-refresh.png" alt-text="Screenshot of the workspace with the schedule refresh icon emphasized.":::

18. Turn on the scheduled refresh, select **Add another time**, and configure the refresh as shown in the following screenshot.

    :::image type="complex" source="media/create-first-dataflow-gen2/add-another-time.png" alt-text="Screenshot showing how to select another time.":::
    Screenshot of the scheduled refresh options, with scheduled refresh turned on, the refresh frequency set to Daily, the Time zone set to coordinated universal time, and the Time set to 4:00 AM. The on button, the Add another time selection, the dataflow owner, and the apply button are all emphasized.
    :::image-end:::

## Clean up resources

If you're not going to continue to use this dataflow, delete the dataflow using the following steps:

1. Navigate to your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

   :::image type="content" source="media/create-first-dataflow-gen2/navigate-to-workspace.png" alt-text="Screenshot of the workspaces window where you navigate to your workspace.":::

2. Select the vertical ellipsis next to the name of your dataflow and then select **Delete**.

   :::image type="content" source="media/create-first-dataflow-gen2/select-delete.png" alt-text="Screenshot with the three vertical dots and the delete option in the drop-down menu emphasized.":::

3. Select **Delete** to confirm the deletion of your dataflow.

   :::image type="content" source="media/create-first-dataflow-gen2/confirm-delete.png" alt-text="Screenshot of the Delete dataflow window, with the Delete button emphasized.":::

## Related content

The dataflow in this sample shows you how to load and transform data in Dataflow Gen2.  You learned how to:

> [!div class="checklist"]
> - Create a Dataflow Gen2.
> - Transform data.
> - Configure destination settings for transformed data.
> - Run and schedule your data pipeline.

Advance to the next article to learn how to create your first data pipeline.

> [!div class="nextstepaction"]
> [Quickstart: Create your first data pipeline to copy data](create-first-pipeline-with-sample-data.md).
