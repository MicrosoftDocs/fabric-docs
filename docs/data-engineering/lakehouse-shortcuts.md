---
title: Referencing data to a Lakehouse using shortcuts
description: Learn how to set up shortcuts in your Fabric lakehouse, which allows you to reference data from other locations without copying it.
ms.reviewer: tvilutis
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 05/23/2023
ms.search.form: Lakehouse shortcuts
#customer intent: As a data engineer, I want to create and manage shortcuts in a Fabric lakehouse to reference data from various sources without copying it.
---

# Create shortcuts in lakehouse

Shortcuts in a lakehouse allow users to reference data without copying it. It unifies data from different lakehouses, [Eventhouses](../real-time-intelligence/eventhouse.md), workspaces, or external storage, such as ADLS Gen2 or AWS S3. You can quickly make large amounts of data available in your lakehouse locally without the latency of copying data from the source.

## Create a shortcut to files or tables

To create a shortcut, open lakehouse **Explorer**. Select the **...** symbol next to the **Tables** or **Files** section and select **New shortcut**. Creating a shortcut to a Delta formatted table in the **Tables** section of lakehouse explorer automatically registers it as a table enabling data access through Spark, SQL analytics endpoint, and default semantic model. Spark can access shortcuts in the **Files** section for data science projects or for transformation into structured data. 

:::image type="content" source="media\lakehouse-shortcuts\create-lakehouse-schortcut.png" alt-text="Screenshot showing how to create a shortcut for a table or file from the lakehouse explorer." lightbox="media\lakehouse-shortcuts\create-lakehouse-schortcut.png":::

After a shortcut is created, you can differentiate a regular file or table from the shortcut from its properties. The properties have a **Shortcut Type** parameter that indicates the item is a shortcut.

## Access Control for shortcuts

Shortcuts to Microsoft Fabric internal sources will use the calling user identity. External shortcuts will use connectivity details, including security details specified when the shortcut is created.

## Related content

- [Learn more about shortcuts](../onelake/onelake-shortcuts.md)
- [Eventhouse OneLake Availability](../real-time-intelligence/event-house-onelake-availability.md)
