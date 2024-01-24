---
title: Known issue - Lakehouse doesn't recognize table names with special characters
description: A known issue is posted where the Lakehouse explorer doesn't recognize table names with special characters
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 11/23/2023
ms.custom: known-issue-563
---

# Known issue - Lakehouse doesn't recognize table names with special characters

The Lakehouse explorer doesn't correctly identify Data Warehouse tables names containing spaces and special characters, such as non-Latin characters.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

In the Lakehouse Explorer user interface, you see tables whose names contains spaces and special characters in the "Unidentified tables" section.

## Solutions and workarounds

To correctly see the table, you can use the SQL Analytics Endpoint on the Lakehouse. You can also query the tables using Spark notebooks. When using a Spark notebook, you must use the backtick notation and directly reference the table in disk in Spark commands.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
