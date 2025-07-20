---
title: Known issue - Py4JJavaError when saving delta table on Fabric 1.3
description: A known issue is posted where there's a Py4JJavaError when saving delta table on Fabric 1.3.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/22/2025
ms.custom: known-issue-1144
---

# Known issue - Py4JJavaError when saving delta table on Fabric 1.3

Py4JJavaError When Saving Delta Table on Spark 3.5 (Fabric 1.3) Due to Unescaped Control Characters

When you save data to a Delta table in Spark, an error can occur if the data includes control characters with Unicode code points between 20 and 32. In this scenario, a Spark job writes records that contain special control characters (for example, ASCII code 20, “\u0014”) to a Delta table. During the write operation, Spark attempts to serialize data in JSON format for the Delta table transaction log. Unescaped control characters cause the JSON serializer to fail, triggering the JsonParseException. This issue is specific to Fabric 1.3. The issue isn't observed on Fabric 1.1 or 1.2.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

You see a Py4JJavaError and the following JsonParseException (or a similar variant): 
`com.fasterxml.jackson.core.JsonParseException: Illegal unquoted character ((CTRL-CHAR, code 20)): has to be escaped using backslash to be included in string value…`.

## Solutions and workarounds

Before you save a table with the special characters, set the following Spark configuration to avoid collecting statistics from Arrow, which can prevent this issue with unescaped control characters: `spark.conf.set("spark.microsoft.delta.stats.collect.fromArrow", "false")`. This setting ensures Spark doesn't attempt to collect statistics that include these problematic characters and avoids the control character parsing error.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
