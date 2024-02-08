---
title: Troubleshoot the delimited text format connector
description: Learn how to troubleshoot issues with the delimited text format connector in Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 12/19/2023
---

# Troubleshoot the delimited text format connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the delimited text format connector in Data Factory in Microsoft Fabric.

## Error code: DelimitedTextBadDataDetected

- **Message**: `Bad data is found at line %rowIndex; in source %fileName;.`

- **Cause**: Invalid delimited text data.

- **Recommendation**: Ignore the bad data by setting **Fault tolerance** to **Skip incompatible rows** in the copy activity.

## Error code: DelimitedTextColumnNameNotAllowNull

- **Message**: `The name of column index %index; is empty. Make sure column name is properly specified in the header row.`

- **Cause**: When 'firstRowAsHeader' is set in the activity, the first row is used as the column name. This error means that the first row contains an empty value (for example, 'ColumnA, ColumnB').

- **Recommendation**:  Check the first row, and fix the value if it is empty.

## Error code: DelimitedTextMoreColumnsThanDefined

- **Message**: `Error found when processing '%function;' source '%name;' with row number %rowCount;: found more columns than expected column count: %expectedColumnCount;.`

- **Causes and recommendations**: Different causes may lead to this error. Check below list for possible cause analysis and related recommendation.

  | Cause analysis                                               | Recommendation                                               |
  | :----------------------------------------------------------- | :----------------------------------------------------------- |
  | The problematic row's column count is larger than the first row's column count. It might be caused by a data issue or incorrect column delimiter or quote char settings. | Get the row count from the error message, check the row's column, and fix the data. |
  | If the expected column count is "1" in an error message, you might have specified wrong compression or format settings, which caused the files to be parsed incorrectly. | Check the format settings to make sure they match your source files. |
  | If your source is a folder, the files under the specified folder might have a different schema. | Make sure that the files in the specified folder have an identical schema. |

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
