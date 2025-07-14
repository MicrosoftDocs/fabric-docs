---
title: Known issue - Snowflake connector index outside the bounds error
description: A known issue is posted where the snowflake connector is throwing an index outside the bounds error.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/27/2025
ms.custom: known-issue-1183
---

# Known issue - Snowflake connector index outside the bounds error

In some scenarios, you might receive an index outside the bounds error when using the new Snowflake connector (Implementation="2.0").

**Status:** Open

**Product Experience:** Power BI

## Symptoms

If you're using a time data type field in your result, you might receive this error. The error is similar to: `Index was outside the bounds of the array when using Implementation="2.0"`.

## Solutions and workarounds

To use the connector, remove the `Implementation="2.0"` parameter value from your M query.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
