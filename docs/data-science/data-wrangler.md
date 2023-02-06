---
title: Accelerate data prep with Data Wrangler
description: Learn how to use the Data Wrangler tool.
ms.reviewer: mopeakande
ms.author: negust
author: nelgson
ms.topic: how-to
ms.date: 02/10/2023
---

# How-to accelerate data prep with Data Wrangler

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Data Wrangler is a notebook-based tool that provides users with an immersive experience for conducting exploratory data analysis. The feature combines a grid-like data display with dynamic summary statistics and a set of common data-cleansing operations that can be applied in a matter of clicks. Each operation generates code that can be saved back to the notebook as a reusable script.

## Launching Data Wrangler

There are currently two ways to launch the Data Wrangler experience from a [!INCLUDE [product-name](../includes/product-name.md)] notebook. Both require reading data into a Pandas DataFrame, which can be done using the following code snippet:

```Python
# Import the Pandas library

import pandas as pd

# Read a CSV into a Pandas DataFrame from e.g. a public blob store
df = pd.read_csv("<URL_HERE>")

# You can use the following sample CSV: https://synapseaisolutionsa.blob.core.windows.net/public/Credit_Card_Fraud_Detection/creditcard.csv
```

### Option 1: From the notebook ribbon

Under the “Data” tab in the notebook ribbon, use the Data Wrangler dropdown prompt to browse all the active Pandas DataFrames available for editing. Click on the one you wish to open in Data Wrangler.

### Option 2: From the code cell

Print a Pandas DataFrame at the bottom of any cell. A prompt to open that DataFrame in Data Wrangler should appear above the output upon cell execution.

> [!NOTE]
> Data Wrangler currently supports only Pandas DataFrames. Support for Spark DataFrames is forthcoming.

> [!TIP]
> Data Wrangler cannot be opened while the notebook kernel is busy. If another cell is executing, that cell must finish before Data Wrangler can be launched.

## Viewing summary statistics

Upon the launch of Data Wrangler, a descriptive overview of the displayed DataFrame will be generated in the left-hand Summary panel, including information about the table’s dimensions and missing values. Selecting any column in Data Wrangler’s grid will prompt the Summary panel to update and display descriptive statistics about that column in particular. Quick insights about every column are automatically generated in its header.

> [!TIP]
> Column-specific statistics and visuals (in both the Summary panel and the column headers) depend on the column datatype. For instance, a binned histogram of a numeric column will not appear in its header if the column is not cast as a numeric type. Use the Operations panel to recast column types for the most accurate display.

## Browsing and applying operations

A searchable list of data-cleaning steps can be found in the left-hand Operations panel. (A smaller selection of the same operations can also be accessed in each column’s contextual menu.) Selecting a data-cleaning step to be applied from the Operations panel will prompt you to select a target column and any necessary parameters for the data-cleaning step (for example, a new range of values if you're scaling a column). The results of that operation will be automatically previewed in Data Wrangler’s display grid, and the corresponding code will be automatically previewed in the history panel below the grid. To commit the previewed code, click “Apply” in either place. To get rid of it and try a new operation, click “Discard.”

Once an operation is applied, Data Wrangler’s display grid and summary statistics will update to reflect the results. The previewed code will be added to a running list of committed operations in the left-hand Cleaning Steps panel.

> [!TIP]
> The most recently applied step can always be undone using the trash icon displayed beside it in the Cleaning Steps panel.

The operations currently supported by Data Wrangler are summarized in the following table.

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
| **Drop duplicate rows** | Drops all rows that have duplicate values in one or more columns |
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

The toolbar above Data Wrangler’s display grid provides options to save the code generated by the tool. The code can be copied to the clipboard or exported back to the notebook as a new function. Exporting the code will close Data Wrangler and add the new function to a code cell in the notebook. The cleaned DataFrame—reflected in the updated Data Wrangler display grid—can also be downloaded as a csv.

## Next steps

- To try out Data Wrangler in VS Code, see [Data Wrangler in VS Code](https://aznb.azurewebsites.net/docs/vscode-data-wrangler/).
