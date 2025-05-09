---
title: Known issue - Spark job fails with out of memory error when using timestamp type
description: A known issue is posted where Spark job fails with out of memory error when using timestamp type.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/09/2025
ms.custom: known-issue-1132
---

# Known issue - Spark job fails with out of memory error when using timestamp type

You have a Spark job that is enabled with the native execution engine. If the job writes data that contains a column with a timestamp value, you might receive an out of memory exception.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

Your job errors with an out of memory exception.

## Solutions and workarounds

To mitigate this issue, you can set these spark configurations at the environment or at the session level:

- `spark.conf.set("spark.sql.parquet.datetimeRebaseModeInWrite","CORRECTED")`. Be aware this configuration could result in an invalid timestamp in case if the data has a legacy timestamp.
- `spark.sql.parquet.datetimeRebaseModeInWrite`. Uses EXCEPTION by default.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
