---
title: Known issue - Copy activity from Oracle to lakehouse fails for Number data type
description: A known issue is posted where the copy activity from Oracle to lakehouse fails for Number data type.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/20/2024
ms.custom: known-issue-757
---

# Known issue - Copy activity from Oracle to lakehouse fails for Number data type

The copy activity from Oracle to a lakehouse fails when one of the columns from Oracle has a **Number** data type. In Oracle, scale can be greater than precision for decimal/numeric types. Parquet files in Lakehouse require the scale be less than or equal to precision, so the copy activity fails.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When trying to copy data from Oracle to a lakehouse, you receive an error similar to: `ParquetInvalidDecimalPrecisionScale. Invalid Decimal Precision or Scale. Precision: 38 Scale:127`.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
