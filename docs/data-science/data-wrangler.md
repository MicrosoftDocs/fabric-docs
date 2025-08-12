---
title: Accelerate data prep with Data Wrangler
description: Learn how to use Data Wrangler, a notebook-based tool for exploring data and generating code to transform it.
ms.author: scottpolly
author: s-polly
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 08/12/2025

ms.search.form: Data Wrangler
---

# How to accelerate data prep with Data Wrangler in Microsoft Fabric

Data Wrangler is a notebook-based tool that provides an immersive interface for exploratory data analysis. It combines a grid-like data display with dynamic summary statistics, built-in visualizations, and a library of common data-cleaning operations. You can apply each operation with just a few steps, update the data display in real time, and generate code in pandas or PySpark that you can save back to the notebook as a reusable function. This article focuses on exploring and transforming pandas DataFrames. For more information about using Data Wrangler with Spark DataFrames, see [this resource](data-wrangler-spark.md).

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

## Limitations

- Custom code operations are currently supported only for pandas DataFrames.
- The Data Wrangler display works best on large monitors. However, you can minimize or hide different portions of the interface to accommodate smaller screens.

## Launching Data Wrangler

Launch Data Wrangler directly from a [!INCLUDE [product-name](../includes/product-name.md)] notebook to explore and transform any pandas or Spark DataFrame. For more information about using Data Wrangler with Spark DataFrames, see [this companion article](data-wrangler-spark.md). This code snippet shows how to read sample data into a pandas DataFrame:

```Python
import pandas as pd

# Read a CSV into a Pandas DataFrame
df = pd.read_csv("https://raw.githubusercontent.com/plotly/datasets/master/titanic.csv")
display(df)
```

In the notebook ribbon "Home" tab, use the Data Wrangler dropdown to browse the active DataFrames available for editing. Select the one you want to open in Data Wrangler.

> [!TIP]
> Data Wrangler can't be opened while the notebook kernel is busy. An executing cell must finish before Data Wrangler can launch, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/launch-data-wrangler.png" alt-text="Screenshot showing a Fabric notebook with the Data Wrangler dropdown prompt." lightbox="media/data-wrangler/launch-data-wrangler.png":::

## Choosing custom samples

To open a custom sample of any active DataFrame with Data Wrangler, select "Choose custom sample" from the dropdown, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/launch-custom-sample.png" alt-text="Screenshot showing the Data Wrangler dropdown prompt with the sample option outlined." lightbox="media/data-wrangler/launch-custom-sample.png":::

This action opens a dialog with options to specify the size of the desired sample (number of rows) and the sampling method (first records, last records, or a random set). The first 5,000 rows of the DataFrame serve as the default sample size, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/choose-sample.png" alt-text="Screenshot showing the Data Wrangler custom sample prompt." lightbox="media/data-wrangler/choose-sample.png":::

## Viewing summary statistics

When Data Wrangler loads, it displays a descriptive overview of the chosen DataFrame in the "Summary" panel. This overview includes information about the DataFrame dimensions, missing values, and more. When you select any column in the Data Wrangler grid, the "Summary" panel updates to display descriptive statistics about that specific column. Quick insights about every column are also available in its header.

> [!TIP]
> Column-specific statistics and visuals (both in the "Summary" panel and in the column headers) depend on the column data type. For instance, a binned histogram of a numeric column appears in the column header only if the column is cast as a numeric type, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/view-summary-panel.png" alt-text="Screenshot showing the Data Wrangler display grid and Summary panel." lightbox="media/data-wrangler/view-summary-panel.png":::

## Browsing data-cleaning operations

A searchable list of data-cleaning operations is available in the "Operations" panel. When you select a data-cleaning operation from the "Operations" panel, you're prompted to provide a target column or columns, along with any necessary parameters to complete the operation. For example, the prompt to numerically scale a column requires a new range of values, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/browse-operations.png" alt-text="Screenshot showing the Data Wrangler Operations panel." lightbox="media/data-wrangler/browse-operations.png":::

> [!TIP]
> You can apply a smaller selection of operations from the menu of each column header, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/apply-operation-shortcut.png" alt-text="Screenshot showing a Data Wrangler operation that can be applied from the column header menu." lightbox="media/data-wrangler/apply-operation-shortcut.png":::

## Previewing and applying operations

The Data Wrangler display grid automatically previews the results of a selected operation, and the corresponding code automatically appears in the panel below the grid. To commit the previewed code, select "Apply" in either location. To delete the previewed code and try a new operation, select "Discard" as shown in this screenshot:

:::image type="content" source="media/data-wrangler/preview-operation.png" alt-text="Screenshot showing a Data Wrangler operation in progress." lightbox="media/data-wrangler/preview-operation.png":::

Once an operation is applied, the Data Wrangler display grid and summary statistics update to reflect the results. The code appears in the running list of committed operations in the "Cleaning steps" panel, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/operation-applied.png" alt-text="Screenshot showing an applied Data Wrangler operation." lightbox="media/data-wrangler/operation-applied.png":::

> [!TIP]
> You can always undo the most recently applied step. In the "Cleaning steps" panel, a trash can icon appears when you hover your cursor over the most recently applied step, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/undo-operation.png" alt-text="Screenshot showing a Data Wrangler operation that can be undone." lightbox="media/data-wrangler/undo-operation.png":::

This table summarizes the operations that Data Wrangler currently supports:

| **Operation** | **Description** |
|---|---|
| **Sort** | Sort a column in ascending or descending order |
| **Filter** | Filter rows based on one or more conditions |
| **One-hot encode** | Create new columns for each unique value in an existing column, indicating the presence or absence of those values per row |
| **Multi-label binarizer** | Split data using a separator and create new columns for each category, marking 1 if a row has that category and 0 if it doesn't |
| **Change column type** | Change the data type of a column |
| **Drop column** | Delete one or more columns |
| **Select column** | Choose one or more columns to keep, and delete the rest |
| **Rename column** | Rename a column |
| **Drop missing values** | Remove rows with missing values |
| **Drop duplicate rows** | Drop all rows that have duplicate values in one or more columns |
| **Fill missing values** | Replace cells with missing values with a new value |
| **Find and replace** | Replace cells with an exact matching pattern |
| **Group by column and aggregate** | Group by column values and aggregate results |
| **Strip whitespace** | Remove whitespace from the beginning and end of text |
| **Split text** | Split a column into several columns based on a user-defined delimiter |
| **Convert text to lowercase** | Convert text to lowercase |
| **Convert text to uppercase** | Convert text to UPPERCASE |
| **Scale min/max values** | Scale a numerical column between a minimum and maximum value |
| **Flash Fill** | Automatically create a new column based on examples derived from an existing column |

## Modify your display

At any time, you can customize the interface using the "Views" tab in the toolbar above the Data Wrangler display grid. This option can hide or show different panes based on your preferences and screen size, as shown in this screenshot:

:::image type="content" source="media/data-wrangler/customize-view.png" alt-text="Screenshot showing the Data Wrangler menu for customizing the display view." lightbox="media/data-wrangler/customize-view.png":::

## Saving and exporting code

The toolbar above the Data Wrangler display grid provides options to save the generated code. You can copy the code to the clipboard or export it to the notebook as a function. Exporting the code closes Data Wrangler and adds the new function to a code cell in the notebook. You can also download the cleaned DataFrame as a CSV file.

> [!TIP]
> Data Wrangler generates code that is applied only when you manually run the new cell, and it won't overwrite your original DataFrame, as shown in this screenshot:
> 
> :::image type="content" source="media/data-wrangler/export-code.png" alt-text="Screenshot showing the options to export code in Data Wrangler." lightbox="media/data-wrangler/export-code.png":::
> 
> You can then run that exported code, as shown in this screenshot:
> 
> :::image type="content" source="media/data-wrangler/run-generated-code.png" alt-text="Screenshot showing the code generated by Data Wrangler back in the notebook." lightbox="media/data-wrangler/run-generated-code.png":::

## Related content

- To try out Data Wrangler with Spark DataFrames, see [this companion article](data-wrangler-spark.md)
- For a live-action demo of Data Wrangler in Fabric, watch [this video from our friends at Guy in a Cube](https://www.youtube.com/watch?v=Ge0VWZMa50I)
- To try out Data Wrangler in Visual Studio Code, go to [Data Wrangler in VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler)
- Did we miss a feature you need? Let us know! Suggest it in the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/)
