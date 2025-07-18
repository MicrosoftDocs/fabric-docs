---
title: SQL Database Tutorial - Create and Share Visualizations
description: In this sixth tutorial step, learn how to create and share visualizations.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: bwoody
ms.date: 02/20/2025
ms.update-cycle: 180-days
ms.topic: tutorial
ms.collection:
  - ce-skilling-ai-copilot
---

# Create and share visualizations

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, learn how to use multiple tools to analyze data stored in your SQL database in Fabric or the SQL analytics endpoint.

## Prerequisites

- Complete all the previous steps in this tutorial.

## Find the connection strings to the SQL database

1. To get your server and database name, open your SQL database in Fabric portal view and select the Settings button in the icon bar.

   > [!NOTE]
   > The SQL database in Fabric and its SQL analytics endpoint have different connection strings. For this tutorial step, connect to the SQL database. You'll use the SQL analytics endpoint in the next tutorial step.

   :::image type="content" source="media/tutorial-create-visualizations/settings-button.png" alt-text="Screenshot shows the Settings button in the toolbar.":::

1. Select **Connection Strings** and you'll see a long string that starts with **Data Source...** From there, select the text between the characters **tcp:** through the characters **,1433**. Ensure that you select the entire set of characters there and nothing more for the server name.

1. For the database name, select all the characters between the characters **Initial Catalog=** and **;MultipleActiveResultSets**.

You can now use these SQL strings in your connection area for tools such as Power BI or SQL Server Management Studio. For [Visual Studio Code with the mssql extension](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), you can paste the entire connection string in the first text box where you make a database connection, so you don't have to select only the server and database names.

## Power BI visualization creation

As you work with the SQL analytics endpoint, it creates a Data model of the assets. This is an abstracted view of your data and how it's displayed and the relationship between entities. Some of the defaults the system takes might not be as you desire, so you'll now change one portion of the data model for this SQL analytics endpoint to have a specific outcome.

1. In your SQL analytics endpoint view, select the **Model layouts** button in the ribbon.

    :::image type="content" source="media/tutorial-create-visualizations/model-layouts-button.png" alt-text="Screenshot from the Fabric portal of the SQL database explorer and menu. The Model layouts button is highlighted.":::

1. From the resulting view, zoom in and scroll over until you see the `vTotalProductsByVendorLocation` object. Select it.

    :::image type="content" source="media/tutorial-create-visualizations/model-layouts-diagram.png" alt-text="Screenshot of the model layouts diagram." lightbox="media/tutorial-create-visualizations/model-layouts-diagram.png":::

1. In the properties, select the **Location** field, and expand the **Advanced** properties selection. You might need to scroll to find it. Set the value of **Summarize by** to **None**. This ensures that when the field is used, it's a discrete number, not a mathematical summarization of that number.

### Create a report

Inside the SQL analytics endpoint view, you have a menu option for **Reporting**. You'll now create a report based on the [views you created in the SQL analytics endpoint in a previous tutorial step](tutorial-use-analytics-endpoint.md#query-data-with-the-sql-analytics-endpoint).

1. Select the **Reporting** button in the menu bar and then the **New report** button in the ribbon.

    :::image type="content" source="media/tutorial-create-visualizations/reporting-tab-new-report-button.png" alt-text="Screenshot from the Fabric portal of the Reporting tab, New report button." lightbox="media/tutorial-create-visualizations/reporting-tab-new-report-button.png":::

1. From the **New report with all available data** that appears, select the **Continue** button.

    :::image type="content" source="media/tutorial-create-visualizations/new-report-with-all-available-data.png" alt-text="Screenshot of the New report with all available data window.":::

   The Power BI canvas appears, and you're presented with the option to use the Copilot to create your report. Feel free to explore what Copilot can come up with. For the rest of this tutorial, we'll create a new report with objects from earlier steps.

    :::image type="content" source="media/tutorial-create-visualizations/create-a-report-with-copilot.png" alt-text="Screenshot shows the Create a report with copilot option." lightbox="media/tutorial-create-visualizations/create-a-report-with-copilot.png":::

1. Expand the `vTotalProductsByVendor` data object. Select each of the fields you see there. The report takes a moment to gather the results to a text view. You can size this text box if desired.

    :::image type="content" source="media/tutorial-create-visualizations/power-bi-vtotalproductsbyvendor.png" alt-text="Screenshot shows a Power BI table loading with data from vTotalProductsByVendor." lightbox="media/tutorial-create-visualizations/power-bi-vtotalproductsbyvendor.png":::

1. Select in a blank area of the report canvas, and then select **Location** in the **Data** fields area.
1. Select a value in the box you just created – notice how the first selection of values follows the selection you make in the second box. Select that same value again to clear the selection.

    :::image type="content" source="media/tutorial-create-visualizations/power-bi-vtotalproductsbyvendor-filter-applied.png" alt-text="Screenshot shows a Power BI table loading with data from vTotalProductsByVendor, filtered by a specific Location with key value 4." lightbox="media/tutorial-create-visualizations/power-bi-vtotalproductsbyvendor-filter-applied.png":::

1. Select in a blank area of the reporting canvas, and then select the **Supplier** field.
1. Once again, you can select the name of a supplier and the first selection shows the results of just that supplier.

## Save the Power BI item for sharing

You can save and share your report with other people in your organization.

1. Select the **Save** button in the icon box and name the report **suppliers_by_location_report**, and ensure you select the correct Workspace for this tutorial.
1. Select the **Share** button in the icon bar to share the report with people in your organization who have access to the proper data elements.

    :::image type="content" source="media/tutorial-create-visualizations/powerbi-send-link.png" alt-text="Screenshot shows the Power BI send link dialogue." lightbox="media/tutorial-create-visualizations/powerbi-send-link.png":::

## Next step

> [!div class="nextstepaction"]
> [Perform data analysis using Microsoft Fabric Notebooks](tutorial-perform-data-analysis.md)
