---
title: Module 2 - Transform data with a dataflow in Data Factory
description: This module covers creating a dataflow, as part of an end-to-end data integration tutorial to complete a full data integration scenario with Data Factory in Microsoft Fabric within an hour.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Module 2: Transform data with a dataflow in Data Factory

This module takes about 25 minutes to create a dataflow, apply transformations, and move the raw data from the Bronze table into a Gold Lakehouse table. 

With the raw data loaded into your Bronze Lakehouse table from the last module, you can now prepare that data and enrich it by combining it with another table that contains discounts for each vendor and their trips during a particular day. This final Gold Lakehouse table is loaded and ready for consumption.

The high-level steps in the dataflow are as follows:

- Get raw data from the Lakehouse table created by the Copy activity in [Module 1: Create a pipeline with Data Factory](tutorial-end-to-end-pipeline.md).
- Transform the data imported from the Lakehouse table.
- Connect to a CSV file containing discounts data.
- Transform the discounts data.
- Combine trips and discounts data.
- Load the output query into the Gold Lakehouse table.

## Get data from a Lakehouse table

1. From the sidebar, select **Create**, and then **Dataflow Gen2** to create a new dataflow gen2.
   :::image type="content" source="media/tutorial-end-to-end-dataflow/create-new-dataflow-inline.png" alt-text="Screenshot showing the Fabric Create page with the Dataflow Gen2 button highlighted." lightbox="media/tutorial-end-to-end-dataflow/create-new-dataflow.png":::

1. From the new dataflow menu, select **Get data**, and then **More...**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/get-data-button.png" alt-text="Screenshot showing the Dataflow menu with Get data button highlighted and the More... option highlighted from its menu.":::

1. Search for and select the **Lakehouse** connector.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/choose-lakehouse-data-source.png" alt-text="Screenshot showing the selection of the Lakehouse data source from the Choose data source menu.":::

1. The **Connect to data source** dialog appears, and a new connection is automatically created for you based on the currently signed in user. Select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/lakehouse-settings-inline.png" alt-text="Screenshot showing the configuration of the data source settings for your new Lakehouse with your current signed in user, and the Next button selected." lightbox="media/tutorial-end-to-end-dataflow/lakehouse-settings.png":::

1. The **Choose data** dialog is displayed. Use the navigation pane to find the Lakehouse you created for the destination in the prior module, and select the **Tutorial_Lakehouse** data table.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/browse-and-choose-tutorial-lakehouse-table-inline.png" alt-text="Screenshot showing the Lakehouse browser with the workspace, lakehouse, and table created with the Copy activity in module 1." lightbox="media/tutorial-end-to-end-dataflow/browse-and-choose-tutorial-lakehouse-table.png":::

1. _(Optional)_ Once your canvas is populated with the data, you can set **column profile** information, as this is useful for data profiling. You can apply the right transformation and target the right data values based on it.

   To do this, select **Options** from the ribbon pane, then select the first three options under **Column profile**, and then select **OK**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/column-profile-options.png" alt-text="Screenshot showing the column options selection for your data.":::

## Transform the data imported from the Lakehouse

1. Select the data type icon in the column header of the second column, **IpepPickupDatetime**, to display a dropdown menu and select the data type from the menu to convert the column from the **Date/Time** to **Date** type.
   :::image type="content" source="media/tutorial-end-to-end-dataflow/select-date-type.png" alt-text="Screenshot showing the selection of the Date data type for the IpepPickupDatetime column.":::

1. _(Optional)_ On the **Home** tab of the ribbon, select the **Choose columns** option from the **Manage columns** group.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/choose-columns-button.png" alt-text="Screenshot showing the Choose columns button on the Home tab of the dataflow editor.":::

1. _(Optional)_ On the **Choose columns** dialog, deselect some columns listed here, then select **OK**.

   - lpepDropoffDatetime
   - puLocationId
   - doLocationId
   - pickupLatitude
   - dropoffLongitude
   - rateCodeID

   :::image type="content" source="media/tutorial-end-to-end-dataflow/choose-columns-dialog.png" alt-text="Screenshot showing the Choose columns dialog with the identified columns deselected.":::

1. Select the **storeAndFwdFlag** column's filter and sort dropdown menu. (If you see a warning **List may be incomplete**, select **Load more** to see all the data.)

   :::image type="content" source="media/tutorial-end-to-end-dataflow/filter-sort-values-dialog.png" alt-text="Screenshot showing the filter and sort dialog for the column.":::

1. Select 'Y' to show only rows where a discount was applied, and then select **OK**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/filter-values.png" alt-text="Screenshot showing the values filter with only 'Y' selected.":::

1. Select the **IpepPickupDatetime** column sort and filter dropdown menu, then select **Date filters**, and choose the **Between...** filter provided for Date and Date/Time types.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/date-filters-inline.png" alt-text="Screenshot showing the selection of the Date filters option in the column sort and format dropdown." lightbox="media/tutorial-end-to-end-dataflow/date-filters.png":::

1. In the **Filter rows** dialog, select dates between January 1, 2015, and January 31, 2015, then select **OK**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/filter-dates-between.png" alt-text="Screenshot showing the selection of the dates in January 2015.":::

## Connect to a CSV file containing discount data

Now, with the data from the trips in place, we want to load the data that contains the respective discounts for each day and VendorID, and prepare the data before combining it with the trips data.

1. From the **Home** tab in the dataflow editor menu, select the **Get data** option, and then choose **Text/CSV**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/get-text-csv-data.png" alt-text="Screenshot showing the selection of the Get data menu from the Home tab, with Text/CSV highlighted.":::

1. On the **Connect to data source** dialog, provide the following details:

   - **File path or URL** - `https://raw.githubusercontent.com/ekote/azure-architect/master/Generated-NYC-Taxi-Green-Discounts.csv`
   - **Authentication kind** - Anonymous
   
   Then select **Next**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/text-csv-settings-inline.png" alt-text="Screenshot showing the Text/CSV settings for the connection." lightbox="media/tutorial-end-to-end-dataflow/text-csv-settings.png":::

1. On the **Preview file data** dialog, select **Create**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/preview-file-data-inline.png" alt-text="Screenshot showing the Preview file data dialog with the Create button highlighted." lightbox="media/tutorial-end-to-end-dataflow/preview-file-data.png":::

## Transform the discount data

1. Reviewing the data, we see the headers appear to be in the first row. Promote them to headers by selecting the table's context menu at the top left of the preview grid area to select **Use first row as headers**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/use-first-row-as-headers.png" alt-text="Screenshot showing the selection of the Use first row as headers option from the table context menu.":::

   > [!NOTE]
   > After promoting the headers, you can see a new step added to the **Applied steps** pane at the top of the dataflow editor to the data types of your columns.

1. Right-click the **VendorID** column, and from the context menu displayed, select the option **Unpivot other columns**. This allows you to transform columns into attribute-value pairs, where columns become rows.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/unpivot-other-columns.png" alt-text="Screenshot showing the context menu for the VendorID column with the Unpivot other columns selection highlighted.":::

1. With the table unpivoted, rename the **Attribute** and **Value** columns by double-clicking them and changing **Attribute** to **Date** and **Value** to **Discount**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/rename-unpivoted-columns.png" alt-text="Screenshot showing the table columns after renaming Attribute to Date and Value to Discount.":::

1. Change the data type of the Date column by selecting the data type menu to the left of the column name and choosing **Date**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/set-date-data-type.png" alt-text="Screenshot showing the selection of the Date data type for the Date column.":::

1. Select the **Discount** column and then select the **Transform** tab on the menu. Select **Number column**, and then select **Standard** numeric transformations from the submenu, and choose **Divide**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/divide-column-values-inline.png" alt-text="Screenshot showing the selection of the Divide option to transform data in the Discount column." lightbox="media/tutorial-end-to-end-dataflow/divide-column-values.png":::

1. On the **Divide** dialog, enter the value 100.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/divide-dialog.png" alt-text="Screenshot showing the Divide dialog with the value 100 entered and the OK button highlighted.":::

## Combine trips and discounts data

The next step is to combine both tables into a single table that has the discount that should be applied to the trip, and the adjusted total. 

1. First, toggle the **Diagram view** button so you can see both of your queries.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/toggle-diagram-view-inline.png" alt-text="Screenshot showing the Diagram view toggle button with both queries created in this tutorial displayed." lightbox="media/tutorial-end-to-end-dataflow/toggle-diagram-view.png":::

1. Select the **nyc_taxi** query, and on the **Home** tab, Select the **Combine** menu and choose **Merge queries**, then **Merge queries as new**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/merge-queries-as-new-inline.png" alt-text="Screenshot showing the Merge queries as new selection for the nyc_taxi query." lightbox="media/tutorial-end-to-end-dataflow/merge-queries-as-new.png":::

1. On the **Merge** dialog, select **Generated-NYC-Taxi-Green-Discounts** from the **Right table for merge** drop down, and then select the "light bulb" icon on the top right of the dialog to see the suggested mapping of columns between the two tables.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/merge-dialog-inline.png" alt-text="Screenshot showing the configuration of the Merge dialog with suggested column mappings displayed." lightbox="media/tutorial-end-to-end-dataflow/merge-dialog.png":::

   Choose each of the two suggested column mappings, one at a time, mapping the VendorID and date columns from both tables. When both mappings are added, the matched column headers are highlighted in each table.

1. A message is shown asking you to allow combining data from multiple data sources to view the results. Select **OK** on the **Merge** dialog.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/allow-combining-data.png" alt-text="Screenshot showing the request to approve combining data from multiple data sources, with the OK button highlighted.":::

1. In the table area, you'll initially see a warning that "The evaluation was canceled because combining data from multiple sources may reveal data from one source to another. Select continue if the possibility of revealing data is okay."  Select **Continue** to display the combined data.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/combine-data-from-multiple-data-sources-warning.png" alt-text="Screenshot showing the warning about combining data from multiple data sources with the Continue button highlighted.":::

1. Notice how a new query was created in Diagram view showing the relationship of the new Merge query with the two queries you previously created. Looking at the table pane of the editor, scroll to the right of the Merge query column list to see a new column with table values is present. This is the "Generated NYC Taxi-Green-Discounts" column, and its type is **[Table]**. In the column header there's an icon with two arrows going in opposite directions, allowing you to select columns from the table. Deselect all of the columns except **Discount**, and then select **OK**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/merge-query-column-selections-inline.png" lightbox="media/tutorial-end-to-end-dataflow/merge-query-column-selections.png" alt-text="Screenshot showing the merged query with the column selection menu displayed for the newly generated column Generated-NYC-Taxi-Green-Discounts.":::

1. With the discount value now at the row level, we can create a new column to calculate the total amount after discount. To do so, select the **Add column** tab at the top of the editor, and choose **Custom column** from the **General** group.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/add-custom-column.png" alt-text="Screenshot showing the Add custom column button highlighted on the General section of the Add column tab.":::

1. On the **Custom column** dialog, you can use the [Power Query formula language (also known as M)](/powerquery-m) to define how your new column should be calculated. Enter _TotalAfterDiscount_ for the **New column name**, select **Currency** for the **Data type**, and provide the following M expression for the **Custom column formula**:

   _if \[totalAmount\] > 0 then \[totalAmount\] * ( 1 -\[Discount\] ) else \[totalAmount\]_

   Then select **OK**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/custom-column-configuration.png" alt-text="Screenshot showing the Custom column configuration screen with the New column name, Data type and Custom column formula highlighted.":::

1. Select the newly create **TotalAfterDiscount** column and then select the **Transform** tab at the top of the editor window. On the **Number column** group, select the **Rounding** drop down and then choose **Round...**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/round-column-inline.png" alt-text="Screenshot showing the Round... option on the Transform tab of the editor window." lightbox="media/tutorial-end-to-end-dataflow/round-column.png":::

1. On the **Round dialog**, enter 2 for the number of decimal places and then select **OK**.
   
   :::image type="content" source="media/tutorial-end-to-end-dataflow/round-dialog.png" alt-text="Screenshot showing the Round dialog with 2 for the number of decimal places and the OK button highlighted.":::

1. Change the data type of the IpepPickupDatetime from Date to Date/Time.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/change-data-type.png" alt-text="Screenshot showing the selection of the Date/Time data type for the IpepPickupDatetime column.":::

1. Finally, expand the **Query settings** pane from the right side of the editor if it isn't already expanded, and rename the query from **Merge** to **Output**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/rename-query-inline.png" lightbox="media/create-first-dataflow-gen2/rename-query.png" alt-text="Screenshot showing the renaming of the query from Merge to Output.":::

## Load the output query to a table in the Lakehouse

With the output query now fully prepared and with data ready to output, we can define the output destination for the query.

1. Select the **Output** merge query created previously. Then select the **Home** tab in the editor, and **Add data destination** from the **Query** grouping, to select a **Lakehouse** destination.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/add-data-destination.png" alt-text="Screenshot showing the Add data destination button with Lakehouse highlighted.":::

1. On the **Connect to data destination** dialog, your connection should already be selected. Select **Next** to continue.

1. On the **Choose destination target** dialog, browse to the Lakehouse where you wish to load the data and name the new table _nyc_taxi_with_discounts_, then select **Next** again.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/choose-destination-target-dialog.png" alt-text="Screenshot showing the Choose destination target dialog with Table name nyc_taxi_with_discounts.":::

1. On the **Choose destination settings** dialog, leave the default **Replace** update method, double check that your columns are mapped correctly, and select **Save settings**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/choose-destination-settings-dialog.png" alt-text="Screenshot showing the Choose destination settings dialog with the Save settings button highlighted.":::

1. Back in the main editor window, confirm that you see your output destination on the **Query settings** pane for the **Output** table, and then select **Publish**.

    > [!IMPORTANT]
    > When the first Dataflow Gen2 is created in a workspace, Lakehouse and Warehouse items are provisioned along with their related SQL analytics endpoint and semantic models. These items are shared by all dataflows in the workspace and are required for Dataflow Gen2 to operate, shouldn't be deleted, and aren't intended to be used directly by users. The items are an implementation detail of Dataflow Gen2. The items aren't visible in the workspace, but might be accessible in other experiences such as the Notebook, SQL-endpoint, Lakehouse, and Warehouse experiences. You can recognize the items by their prefix in the name. The prefix of the items is `DataflowsStaging'.

1. _(Optional)_ On the workspace page, you can rename your dataflow by selecting the ellipsis to the right of the dataflow name that appears after you select the row, and choosing **Properties**.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/rename-dataflow.png" alt-text="Screenshot showing the Properties option selected on the menu for a dataflow where it can be renamed.":::

1. Select the refresh icon for the dataflow after selecting its row, and when complete, you should see your new Lakehouse table created as configured in the **Data destination** settings.

   :::image type="content" source="media/tutorial-end-to-end-dataflow/refresh-dataflow.png" alt-text="Screenshot showing the selection of the refresh button to refresh the dataflow.":::

1. Check your Lakehouse to view the new table loaded there.

## Related content

In this second module to our end-to-end tutorial for your first data integration using Data Factory in Microsoft Fabric, you learned how to:

> [!div class="checklist"]
> - Create a new Dataflow Gen2.
> - Import and transform sample data.
> - Import and transform text/CSV data.
> - Merge data from both data sources into a new query.
> - Transform data and generate new columns in a query.
> - Configure an output destination source for a query.
> - Rename and refresh your new dataflow.

Continue to the next section now to integrate your data pipeline.

> [!div class="nextstepaction"]
> [Module 3: Automate and send notifications with Data Factory](tutorial-end-to-end-integration.md) 
