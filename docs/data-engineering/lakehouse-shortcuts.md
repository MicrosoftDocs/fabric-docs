---
title: Referencing data to a Lakehouse using shortcuts
description: Learn how to reference data from other sources into a lakehouse using shortcuts.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Lakehouse shortcuts
---

# What are shortcuts in lakehouse?

Shortcuts in a lakehouse allow users to reference data without copying it. It unifies data from different lakehouses, workspaces, or external storage, such as ADLS Gen2 or AWS S3. You can quickly make large amounts of data available in your lakehouse locally without the latency of copying data from the source.

## Setting up a shortcut

To create a shortcut, open Lakehouse Explorer and select where to place the shortcut under Tables or Files. Creating a shortcut to Delta formatted table under Tables in Lakehouse Explorer will automatically register it as a table, enabling data access through Spark, SQL endpoint, and default semantic model. Spark can access shortcuts in Files for data science projects or for transformation into structured data.

## Access Control for shortcuts

Shortcuts to Microsoft Fabric internal sources will use the calling user identity. External shortcuts will use connectivity details, including security details specified when the shortcut is created.

## Related content

- [Learn more about shortcuts](../onelake/onelake-shortcuts.md)
