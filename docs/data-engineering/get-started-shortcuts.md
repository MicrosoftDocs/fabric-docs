---
title: Get started for referencing data
description: Learn how to create shortcuts in lakehouse and use data in your data science projects
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Get Started Lakehouse Shortcuts Data Science
---

# Referencing data in lakehouse for Data Science projects

This quickstart explains how to reference data stored in external ADLS account and use it in your Data science projects. After completing this quickstart, you'll have a shortcut to ADLS storage in your lakehouse and a notebook with Spark code that accesses your external data.

## Prepare data for shortcut

1. In Azure create ADLS Gen2 account
1. Enable hierarchical namespaces

   :::image type="content" source="media\get-started-shortcuts\storage-account.png" alt-text="Screenshot of hierarchical namespaces in storage account." lightbox="media\get-started-shortcuts\storage-account.png":::

1. Create folders for your data
1. Upload data
1. Add your user identity to BlobStorageContributor role
1. Get storage account endpoint

## Create a shortcut

1. Open your lakehouse to get to Lakehouse Explorer
1. Under files create a folder where you reference data
1. Right select (...) and select New Shortcut next to the folder name

   :::image type="content" source="media\get-started-shortcuts\new-shortcut.png" alt-text="Screenshot of new shortcut link." lightbox="media\get-started-shortcuts\new-shortcut.png":::

1. Select External Sources > ADLS Gen2
1. Provide shortcut name, storage account endpoint, end your data folder location in storage account

   :::image type="content" source="media\get-started-shortcuts\shortcut-dialog.png" alt-text="Screenshot of new shortcut dialog." lightbox="media\get-started-shortcuts\shortcut-dialog.png":::

1. Select create

## Access referenced data in Notebook

1. Open existing or create new notebook
1. Pin your lakehouse to the notebook
1. Browse your data in shortcut folder
1. Select a file with structured data and drag it to notebook to get code generated
1. Execute code to get file content
1. Add code for data analysis

## Related content

- [Load to Delta Lake tables](load-to-tables.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
