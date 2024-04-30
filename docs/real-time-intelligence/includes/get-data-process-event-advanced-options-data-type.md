---
title: Include file for the Edit column heading in Real-Time Analytics
description: Include file for the Edit column heading in the Get data hub in Real-Time Analytics.
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.custom: build-2023
ms.date: 04/21/2024
---
### Advanced options based on data type

**Tabular (CSV, TSV, PSV)**:

Tabular data doesn't necessarily include the column names that are used to map source data to the existing columns. To use the first row as column names, turn on  **First row is column header**.

:::image type="content" source="../media/get-data-process-event-advanced-options/first-row-header.png" alt-text="Screenshot of the First row is column header switch.":::

**JSON**:

To determine column division of JSON data, select **Advanced** > **Nested levels**, from 1 to 100.

:::image type="content" source="../media/get-data-process-event-advanced-options/advanced-menu.png" alt-text="Screenshot of nested levels JSON options.":::
