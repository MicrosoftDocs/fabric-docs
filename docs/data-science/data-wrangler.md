---
title: Accelerate data prep with Data Wrangler
description: Learn how to use the Data Wrangler tool.
author: nelgson
ms.author: negust
ms.reviewer: franksolomon
ms.topic: how-to
ms.date: 03/27/2023

ms.search.form: Data Wrangler
---

# How-to accelerate data prep with Data Wrangler

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Data Wrangler, a notebook-based tool, provides users with an immersive experience to conduct exploratory data analysis. The feature combines a grid-like data display with dynamic summary statistics and a set of common data-cleansing operations, all available with a few selected icons. Each operation generates code that can be saved back to the notebook as a reusable script.

## Launching Data Wrangler

Users can launch the Data Wrangler experience from a [!INCLUDE [product-name](../includes/product-name.md)] notebook in two ways. This code snippet shows how to read data into a Pandas DataFrame, as required by both techniques:

```Python
# Import the Pandas library

import pandas as pd

# Read a CSV into a Pandas DataFrame from e.g. a public blob store
df = pd.read_csv("<URL_HERE>")

# You can use the following sample CSV: https://synapseaisolutionsa.blob.core.windows.net/public/Credit_Card_Fraud_Detection/creditcard.csv
```

### Option 1: From the notebook ribbon

Under the notebook ribbon “Data” tab, use the Data Wrangler dropdown prompt to browse all the active Pandas DataFrames available for editing. Select the one you wish to open in Data Wrangler.

### Option 2: From the code cell

Print a Pandas DataFrame at the bottom of any cell. A prompt to open that DataFrame in Data Wrangler should appear above the output after the cell executes.

> [!NOTE]
> At this time, Data Wrangler supports only Pandas DataFrames. Support for Spark DataFrames is forthcoming.

> [!TIP]
> Data Wrangler cannot be opened while the notebook kernel is busy. An executing cell must finish its execution before Data Wrangler can be launched.

## Viewing summary statistics

When Data Wrangler launches, it generates a descriptive overview of the displayed DataFrame in the left-hand Summary panel. This overview includes information about the table dimensions and missing values. Selection of any Data Wrangler grid column then prompts the Summary panel to update and display descriptive statistics about that specific column. In turn, that selection automatically generates quick insights about every column in its header.

> [!TIP]
> Column-specific statistics and visuals (in both the Summary panel and the column headers) depend on the column datatype. For instance, a binned histogram of a numeric column will only appear in its header if the column is cast as a numeric type. Use the Operations panel to recast column types for the most accurate display.

## Browsing and applying operations

A searchable list of data-cleaning steps can be found in the left-hand Operations panel. (You can also access a smaller selection of the same operations in the contextual menu of each column.) From the Operations panel, selection of a data-cleaning step prompts you to select a target column, and any necessary parameters for the data-cleaning step. For example, the prompt could involve a new range of values to scale a column. The operation results automatically preview in the Data Wrangler display grid, and the corresponding code automatically previews in the history panel below the grid. To commit the previewed code, select “Apply” in either place. To get rid of the previewed code and try a new operation, select “Discard.”

Once an operation is applied, the Data Wrangler display grid and summary statistics update to reflect the results. The previewed code appears in the running list of committed operations, located in the left-hand Cleaning Steps panel.

> [!TIP]
> You can always undo the most recently applied step with the trash icon, seen next to that step in the Cleaning Steps panel.

The following table summarizes the operations that Data Wrangler currently supports:

| **Operation** | **Description** |
|---|---|
| **Sort** | Sort column(s) in ascending or descending order |
| **Filter** | Filter rows based on one or more conditions |
| **One-hot encode** | Create a column for each unique value indicating its presence |
| **One-hot encode with delimiter** | Split and one-hot encode categorical data using a delimiter |
| **Change column type** | Change the data type of a column |
| **Drop column** | Delete one or more columns |
| **Select column** | Choose one or more columns to keep, and delete the rest |
| **Rename column** | Rename one or more columns |
| **Drop missing values** | Remove rows with missing values |
| **Drop duplicate rows** | Drop all rows that have duplicate values in one or more columns |
| **Fill missing values** | Replace cells with missing values with a new value |
| **Find and replace** | Replace cells with an exact matching pattern |
| **Group by column and aggregate** | Group by columns and aggregate results |
| **Strip whitespace** | Remove whitespace from the beginning and end of text |
| **Split text** | Split a column into several columns based on a user defined delimiter |
| **Convert text to lowercase** | Convert text to lowercase |
| **Convert text to uppercase** | Convert text to UPPERCASE |
| **Scale min/max values** | Scale a numerical column between a minimum and maximum value |
| **Flash Fill** | Automatically create a new column based on examples and the derivation of existing column(s) |

## Saving and exporting code

The toolbar above the Data Wrangler display grid provides options to save the code that the tool generates. You can copy the code to the clipboard, or export it to the notebook as a new function. Export of the code closes Data Wrangler and add the new function to a code cell in the notebook. You can also download the cleaned DataFrame, reflected in the updated Data Wrangler display grid, as a csv.

## Next steps

- To try out Data Wrangler in VS Code, see [Data Wrangler in VS Code](https://aznb.azurewebsites.net/docs/vscode-data-wrangler/).