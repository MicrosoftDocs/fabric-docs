---
title: Include file for the Edit column heading in Real-Time Intelligence
description: Include file for the Edit column heading in the Get data hub in Real-Time Intelligence.
author: spelluru
ms.author: spelluru
ms.topic: include
ms.custom: 
ms.date: 03/02/2025
---
### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

* If you're ingesting tabular formats in an *existing table*, you can select **Advanced** > **Keep table schema**. Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. When this option is checked, mapping is done by-order, and the table schema remains the same. If this option is unchecked, new columns are created for incoming data, regardless of data structure.

    :::image type="content" source="../media/get-data-process-event-advanced-options/advanced-csv.png" alt-text="Screenshot of advanced options.":::

* Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. To use the first row as column names, select **First row is column header**.

    :::image type="content" source="../media/get-data-process-event-advanced-options/first-row-header.png" alt-text="Screenshot of the First row is column header switch.":::
