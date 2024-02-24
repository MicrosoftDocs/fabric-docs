---
title: Known issue - Type mismatch when writing decimals and dates to lakehouse using a dataflow
description: A known issue is posted where there's a type mismatch when writing decimals and dates to lakehouse using a dataflow.
author: mihart
ms.author: mihart
ms.topic: troubleshooting 
ms.date: 02/16/2024
ms.custom: known-issue-591
---

# Known issue - Type mismatch when writing decimals and dates to lakehouse using a dataflow

You can create a Dataflow Gen2 dataflow that writes data to a lakehouse as an output destination. If the source data has a **Decimal** or **Date** data type, you might see a different data type appear in the lakehouse after running the dataflow. For example, when the data type is **Date**, the resulting data type is sometimes converted to **Datetime**, and when the data type is **Decimal**, the resulting data type is sometime converted to **Float**.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

You see an unexpected data type in the lakehouse after running a dataflow.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
