---
title: Accelerate data prep with Data Wrangler
description: Learn how to use Data Wrangler, a notebook-based tool for exploring data and generating code to transform it.
author: orbey
ms.author: erenorbey
ms.reviewer: franksolomon
ms.topic: how-to
ms.custom: ignite-2023
ms.date: 11/15/2023

ms.search.form: Data Wrangler
---

# How to accelerate data prep with Data Wrangler in Microsoft Fabric

Data Wrangler is a notebook-based tool that provides users with an immersive interface for exploratory data analysis. The feature combines a grid-like data display with dynamic summary statistics, built-in visualizations, and a library of common data-cleaning operations. Each operation can be applied in a matter of clicks, updating the data display in real time and generating code in pandas or PySpark that can be saved back to the notebook as a reusable function. This article focuses on exploring and transforming pandas DataFrames. Instructions for using Data Wrangler on Spark DataFrames can be found [here](data-wrangler-spark.md).

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

## Limitations

- Data Wrangler currently supports pandas code generation in general availability and [Spark code generation](data-wrangler-spark.md) in public preview.
- Custom code operations are currently supported only for pandas DataFrames.
- Data Wrangler's display works best on large monitors, although different portions of the interface can be minimized or hidden to accommodate smaller screens.

## Launching Data Wrangler

You can launch Data Wrangler directly from a [!INCLUDE [product-name](../includes/product-name.md)] notebook to explore and transform any pandas or Spark DataFrame. For an overview of using Data Wrangler with Spark DataFrames, please see [this companion article](data-wrangler-spark.md). The code snippet below shows how to read sample data into a pandas DataFrame:

```Python
import pandas as pd

# Read a CSV into a Pandas DataFrame
df = pd.read_csv("https://raw.githubusercontent.com/plotly/datasets/master/titanic.csv")
display(df)
```

Under the notebook ribbon "Data" tab, use the Data Wrangler dropdown prompt to browse active DataFrames available for editing. Select the one you wish to open in Data Wrangler.

> [!TIP]
> Data Wrangler cannot be opened while the notebook kernel is busy. An executing cell must finish its execution before Data Wrangler can be launched.

:::image type="content" source="media/data-wrangler/launch-data-wrangler.png" alt-text="Screenshot showing a Fabric notebook with the Data Wrangler dropdown prompt." lightbox="media/data-wrangler/launch-data-wrangler.png":::

## Choosing custom samples

Data Wrangler allows you to open a custom sample of any active DataFrame by selecting "Choose custom sample" from the dropdown. Doing so launches a pop-up with options to specify the size of the desired sample (number of rows) and the sampling method (first records, last records, or a random set).

:::image type="content" source="media/data-wrangler/launch-custom-sample.png" alt-text="Screenshot showing the Data Wrangler dropdown prompt with the custom sample option outlined." lightbox="media/data-wrangler/launch-custom-sample.png":::

:::image type="content" source="media/data-wrangler/choose-sample.png" alt-text="Screenshot showing the Data Wrangler custom sample prompt." lightbox="media/data-wrangler/choose-sample.png":::

## Viewing summary statistics

When Data Wrangler loads, it displays a descriptive overview of the chosen DataFrame in the Summary panel. This overview includes information about the DataFrame's dimensions, missing values, and more. Selecting any column in the Data Wrangler grid prompts the Summary panel to update and display descriptive statistics about that specific column. Quick insights about every column are also available in its header.

> [!TIP]
> Column-specific statistics and visuals (both in the Summary panel and in the column headers) depend on the column datatype. For instance, a binned histogram of a numeric column will appear in the column header only if the column is cast as a numeric type. Use the Operations panel to recast column types for the most accurate display.

:::image type="content" source="media/data-wrangler/view-summary-panel.png" alt-text="Screenshot showing the Data Wrangler display grid and Summary panel." lightbox="media/data-wrangler/view-summary-panel.png":::

## Browsing data-cleaning operations

A searchable list of data-cleaning steps can be found in the Operations panel. (A smaller selection of the same operations is available in the menu of each column header.) From the Operations panel, selecting a data-cleaning step prompts you to provide a target column or columns, along with any necessary parameters to complete the step. For example, the prompt for scaling a column numerically requires a new range of values. 

:::image type="content" source="media/data-wrangler/browse-operations.png" alt-text="Screenshot showing the Data Wrangler Operations panel." lightbox="media/data-wrangler/browse-operations.png":::

## Previewing and applying operations

The results of a selected operation will be previewed automatically in the Data Wrangler display grid, and the corresponding code will automatically appear in the panel below the grid. To commit the previewed code, select "Apply" in either place. To get rid of the previewed code and try a new operation, select "Discard."

:::image type="content" source="media/data-wrangler/preview-operation.png" alt-text="Screenshot showing a Data Wrangler operation in progress." lightbox="media/data-wrangler/preview-operation.png":::

Once an operation is applied, the Data Wrangler display grid and summary statistics update to reflect the results. The code appears in the running list of committed operations, located in the Cleaning steps panel.

:::image type="content" source="media/data-wrangler/operation-applied.png" alt-text="Screenshot showing an applied Data Wrangler operation." lightbox="media/data-wrangler/operation-applied.png":::

> [!TIP]
> You can always undo the most recently applied step with the trash icon beside it, which appears if you hover your cursor over that step in the Cleaning steps panel.

:::image type="content" source="media/data-wrangler/undo-operation.png" alt-text="Screenshot showing a Data Wrangler operation that can be undone." lightbox="media/data-wrangler/undo-operation.png":::

The following table summarizes the operations that Data Wrangler currently supports:

| **Operation** | **Description** |
|---|---|
| **Sort** | Sort a column in ascending or descending order |
| **Filter** | Filter rows based on one or more conditions |
| **One-hot encode** | Create new columns for each unique value in an existing column, indicating the presence or absence of those values per row |
| **One-hot encode with delimiter** | Split and one-hot encode categorical data using a delimiter |
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

## Saving and exporting code

The toolbar above the Data Wrangler display grid provides options to save the generated code. You can copy the code to the clipboard or export it to the notebook as a function. Exporting the code closes Data Wrangler and adds the new function to a code cell in the notebook. You can also download the cleaned DataFrame as a csv file.

> [!TIP]
> The code generated by Data Wrangler won't be applied until you manually run the new cell, and it will not overwrite your original DataFrame.

:::image type="content" source="media/data-wrangler/export-code.png" alt-text="Screenshot showing the options to export code in Data Wrangler." lightbox="media/data-wrangler/export-code.png":::

:::image type="content" source="media/data-wrangler/run-generated-code.png" alt-text="Screenshot showing the code generated by Data Wrangler back in the notebook." lightbox="media/data-wrangler/run-generated-code.png":::

## Related content

- To try out Data Wrangler on Spark DataFrames, see [this companion article](data-wrangler-spark.md).
- To try out Data Wrangler in VS Code, see [Data Wrangler in VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler).
