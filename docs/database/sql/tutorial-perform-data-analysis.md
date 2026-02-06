---
title: SQL database tutorial - Perform Data Analysis using Fabric Notebooks
description: In this seventh tutorial step, learn how to perform Data Analysis using Microsoft Fabric Notebooks.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: bwoody
ms.date: 10/24/2024
ms.topic: tutorial
ms.custom:
---
# Perform data analysis using Fabric Notebooks

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

You can perform analysis on your data using many tools, such as the Power BI report you created in the last step of this tutorial. Another popular tool for analysis is Jupyter Notebooks. Notebooks are a Python-based item that contains cells that hold either code or plain text (as Markdown, a rich text formatting language for plain text). The code that runs is based on the Kernel, or environment, of the Jupyter Notebook. Microsoft Fabric contains [Notebooks](../../data-engineering/author-execute-notebook.md) and multiple environments for the code cells.

In our sample tutorial, your organization has asked that you set up a Notebook for the data in your SQL data. We'll use the SQL analytics endpoint of your SQL database, which contains automatically replicated data from your SQL database.

## Prerequisites

- Complete all the previous steps in this tutorial.

## Data analysis with T-SQL notebooks

1. Navigate to the Workspace you created for this tutorial from the Home of your Microsoft Fabric portal.
1. Select the **New Item** button in the tool bar, and then select **All items** and scroll until you see a **Notebook** item. Select that item to create a new Notebook.
1. In the icon bar, change the environment from **PySpark (Python)** to **T-SQL**.

    :::image type="content" source="media/tutorial-perform-data-analysis/change-kernel-to-t-sql.png" alt-text="Screenshot shows changing the kernel, or environment, of the Notebook to T-SQL." lightbox="media/tutorial-perform-data-analysis/change-kernel-to-t-sql.png":::

1. In each code cell, there is a drop-down list for the code language. In the first cell in the Notebook, change the code language from **PySpark (Python)** to **T-SQL**.

    :::image type="content" source="media/tutorial-perform-data-analysis/change-code-cell-to-t-sql.png" alt-text="Screenshot shows changing the code cell language to T-SQL." lightbox="media/tutorial-perform-data-analysis/change-code-cell-to-t-sql.png":::

1. In the Notebook **Explorer**, select the **Warehouses** item.

    :::image type="content" source="media/tutorial-perform-data-analysis/notebook-explorer.png" alt-text="Screenshot showing the Notebook Explorer.":::

1. Select the **+ Warehouses** button.

    :::image type="content" source="media/tutorial-perform-data-analysis/notebook-explorer-add-warehouses.png" alt-text="Screenshot shows adding a Warehouse to the Data Sources.":::

1. Select the **SQL analytics endpoint** object that is named `supply_chain_analytics_database`, with [the same name of the object you created earlier in this tutorial](tutorial-create-database.md). Select **Confirm**.
1. Expand the database, expand **Schemas**. Expand the `SupplyChain` schema. Expand **Views**, and locate the SQL view named `vProductsBySupplier`. 
1. Select the ellipses next to that view. and select the option that says `SELECT TOP 100`.

    :::image type="content" source="media/tutorial-perform-data-analysis/explorer-view-select-top-100.png" alt-text="Screenshot shows how to drill down to vProductsBySupplier and SELECT TOP 100.":::

1. This creates a cell with T-SQL code that has the statements pre-populated for you. Select the **Run Cell** button for the cell to run the query and return the results.

    :::image type="content" source="media/tutorial-perform-data-analysis/run-cell.png" alt-text="Screenshot shows the results of the SELECT TOP 100 query." lightbox="media/tutorial-perform-data-analysis/run-cell.png":::

1. In the results, you can see not only the data requested, but buttons that allow you to view charts, save the data as another table, download, and more. To the side of the results you can see a new pane with quick inspection of the data elements, showing minimum and maximum values, missing data, and unique counts of the data returned.

1. Hovering between the code cells shows you a menu to add another cell. Select the **+ Markdown** button.

    :::image type="content" source="media/tutorial-perform-data-analysis/add-markdown-cell.png" alt-text="Screenshot from a Notebook showing the interface to a new markdown cell." lightbox="media/tutorial-perform-data-analysis/add-markdown-cell.png":::

1. This places a text-based field where you can add information. Styling for the text is available in the icon bar, or you can select the `</>` button to work with Markdown directly. The result of the formatting show as a preview of the formatted text.

    :::image type="content" source="media/tutorial-perform-data-analysis/markdown-preview.png" alt-text="Screenshot the preview of markdown formatted plain text in a Notebook." lightbox="media/tutorial-perform-data-analysis/markdown-preview.png":::

1. Select the **Save As** icon in the ribbon. Enter the text `products_by_suppliers_notebook`. Ensure you set the location to your tutorial Workspace. Select the **Save** button to save the notebook.

> [!TIP]
> You can also [connect your applications to a SQL database in Fabric with the Microsoft Python Driver](connect-python.md).

## Next step

> [!div class="nextstepaction"]
> [Create an application using DevOps and the GraphQL API](tutorial-create-application.md)
