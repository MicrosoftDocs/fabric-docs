---
title: Known issue - Copy activity from Oracle to lakehouse fails for Number data type
description: A known issue is posted where the copy activity from Oracle to lakehouse fails for Number data type.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/04/2024
ms.custom: known-issue-757
---

# Known issue - Copy activity from Oracle to lakehouse fails for Number data type

The copy activity from Oracle to a lakehouse fails when one of the columns from Oracle has a **Number** data type. In Oracle, scale can be greater than precision for decimal/numeric types. Parquet files in Lakehouse require the scale be less than or equal to precision, so the copy activity fails.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When trying to copy data from Oracle to a lakehouse, you receive an error similar to: `ParquetInvalidDecimalPrecisionScale. Invalid Decimal Precision or Scale. Precision: 38 Scale:127`.

## Solutions and workarounds

You can work around this issue by using a query to explicitly cast the column to `NUMBER(p,s)` or other types like `BINARY_DOUBLE`. When using `NUMBER(p,s)`, ensure `p >= s` and `s >= 0`. Meanwhile, the range defined by `NUMBER(p,s)` should cover the range of the values stored in the column. If not, you receive an error similar to `ORA-01438: value larger than specified precision allowed for this column`. Here's a sample query: `SELECT CAST(ColA AS BINARY_DOUBLE) AS ColB FROM TableA`

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
