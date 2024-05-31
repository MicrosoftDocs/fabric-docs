---
title: Include file for the Edit column heading in Real-Time Intelligence
description: Include file for the Edit column heading in the Get data hub in Real-Time Intelligence
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.custom: build-2023
ms.date: 06/26/2023
---
### Edit columns

> [!NOTE]
>
> * For tabular formats (CSV, TSV, PSV), you can't map a column twice. To map to an existing column, first delete the new column.
> * You can't change an existing column type. If you try to map to a column having a different format, you may end up with empty columns.

The changes you can make in a table depend on the following parameters:

* **Table** type is new or existing
* **Mapping** type is new or existing

|Table type | Mapping type | Available adjustments|
|---|---|---|
| New table | New mapping |Rename column, change data type, change data source, [mapping transformation](#mapping-transformations), add column, delete column |
| Existing table | New mapping | Add column (on which you can then change data type, rename, and update) |
| Existing table | Existing mapping | none|
