---
title: Include file for the Edit column heading in Real-Time Analytics
description: Include file for the Edit column heading in the Get data hub in Real-Time Analytics
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.custom: build-2023
ms.date: 04/21/2024
---
### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Advanced** > **Keep table schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.
* To use the first row as column names, select  **Advanced** > **First row is column header**.

    :::image type="content" source="../media/get-data-process-event-advanced-options/advanced-csv.png" alt-text="Screenshot of advanced CSV options.":::

**JSON**:

* To determine column division of JSON data, select **Advanced** > **Nested levels**, from 1 to 100.
* If you select **Advanced** > **Skip JSON lines with errors**, the data is ingested in JSON format. If you leave this check box unselected, the data is ingested in multijson format.

    :::image type="content" source="../media/get-data-process-event-advanced-options/advanced-json.png" alt-text="Screenshot of advanced JSON options.":::
