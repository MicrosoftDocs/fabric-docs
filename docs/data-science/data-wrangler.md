---
title: Accelerate data prep with Data Wrangler
description: Learn how to use Data Wrangler, a notebook-based tool for exploring data and generating code to transform it.
author: orbey
ms.author: erenorbey
ms.reviewer: franksolomon
ms.topic: how-to
ms.date: 03/27/2023

ms.search.form: Data Wrangler
---

# How to accelerate data prep with Data Wrangler in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

Data Wrangler, a notebook-based tool, provides users with an immersive experience to conduct exploratory data analysis. The feature combines a grid-like data display with dynamic summary statistics, built-in visualizations, and a library of common data-cleaning operations. Each operation can be applied in a matter of clicks, updating the data display in real time and generating code that can be saved back to the notebook as a reusable function.

## Prerequisites

* To use Data Wrangler, you must have at least one active Pandas DataFrame defined in your [!INCLUDE [product-name](../includes/product-name.md)] notebook.

## Limitations

* Data Wrangler does not yet support Spark DataFrames.
* Data Wrangler's display works better on larger screens, although different portions of the interface can be minimized or hidden to accommodate smaller screens.

## Launch Data Wrangler

Users can launch Data Wrangler directly from a [!INCLUDE [product-name](../includes/product-name.md)] notebook to explore and transform any Pandas DataFrame. This code snippet shows how to read some sample data into a Pandas DataFrame:

```Python
# Import the Pandas library

import pandas as pd

# Read a CSV into a Pandas DataFrame from e.g. a public blob store
df = pd.read_csv("<URL_HERE>")

# You can use the following sample CSV: https://synapseaisolutionsa.blob.core.windows.net/public/Credit_Card_Fraud_Detection/creditcard.csv
```

Under the notebook ribbon “Data” tab, use the Data Wrangler dropdown prompt to browse all the active Pandas DataFrames available for editing. Select the one you wish to open in Data Wrangler.

> [!TIP]
> Data Wrangler cannot be opened while the notebook kernel is busy. An executing cell must finish its execution before Data Wrangler can be launched.

:::image type="content" source="media/data-wrangler/launch-data-wrangler.png" alt-text="Screenshot showing a Fabric notebook with the Data Wrangler dropdown prompt." lightbox="media/data-wrangler/launch-data-wrangler.png":::

## Viewing summary statistics

When Data Wrangler launches, it generates a descriptive overview of the displayed DataFrame in the Summary panel. This overview includes information about the DataFrame's dimensions, missing values, and more. Selecting any column in the Data Wrangler grid prompts the Summary panel to update and display descriptive statistics about that specific column. Quick insights about every column are also available in its header.

> [!TIP]
> Column-specific statistics and visuals (in both the Summary panel and in the column headers) depend on the column datatype. For instance, a binned histogram of a numeric column will appear in the column header only if the column is cast as a numeric type. Use the Operations panel to recast column types for the most accurate display.

:::image type="content" source="media/data-wrangler/view-summary-panel.png" alt-text="Screenshot showing the Data Wrangler display grid and Summary panel." lightbox="media/data-wrangler/view-summary-panel.png":::

## Browsing and applying operations

A searchable list of data-cleaning steps can be found in the Operations panel. (You can also access a smaller selection of the same operations in the contextual menu of each column.) From the Operations panel, selecting a data-cleaning step prompts you to select a target column or columns, along with any necessary parameters to complete the step. For example, the prompt for scaling a column numerically requires a new range of values. Within several seconds, the results of the operation will be previewed automatically in the Data Wrangler display grid, and the corresponding code will automatically appear in the panel below the grid. To commit the previewed code, select “Apply” in either place. To get rid of the previewed code and try a new operation, select “Discard.”

Once an operation is applied, the Data Wrangler display grid and summary statistics update to reflect the results. The previewed code appears in the running list of committed operations, located in the Cleaning Steps panel.

> [!TIP]
> You can always undo the most recently applied step with the trash icon beside it, which appears if you hover your cursor over that step in the Cleaning Steps panel.

:::image type="content" source="media/data-wrangler/apply-operation.png" alt-text="Screenshot showing a Data Wrangler operation in progress." lightbox="media/data-wrangler/apply-operaton.png":::

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

The toolbar above the Data Wrangler display grid provides options to save the code that the tool generates. You can copy the code to the clipboard or export it to the notebook as a function. Exporting the code closes Data Wrangler and adds the new function to a code cell in the notebook. You can also download the cleaned DataFrame, reflected in the updated Data Wrangler display grid, as a csv file.

## Next steps

- To try out Data Wrangler in VS Code, see [Data Wrangler in VS Code](https://aznb.azurewebsites.net/docs/vscode-data-wrangler/).