---
title: Upload, transform, and query data on OneLake using file explorer, Spark, and SQL endpoint
description: Learn how to load data with OneLake file explorer, use a Fabric notebook to transform the data and then query with SQL
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.date: 05/23/2023
---

# Upload, transform, and query data on OneLake using file explorer, Spark, and SQL endpoint

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Overview

In this guide, you will:

- Upload data to OneLake using OneLake file explorer.

- Use a Fabric notebook to read data on OneLake and write back as a delta table.

- Analyze and transform data on OneLake using a Fabric notebook.

- Access the one copy of data on OneLake through both Spark and SQL.

## Prerequisites

- Download and install [OneLake file explorer](onlake-file-explorer.md).
- A workspace with a lakehouse item
- Any sample csv files

## Steps

1. In OneLake file explorer, navigate to your lakehouse and under the /Files directory, create a subdirectory named dimension_city.
1. Copy your sample csv files to the OneLake directory /Files/dimension_city using OneLake file explorer.
1. Open your lakehouse in the Fabric portal and view your files.
1. Select **Open notebook**, then **New notebook** to create a notebook.
1. Using the Fabric Notebook, convert the CSV files to delta format. The following code snippet reads data from user created directory /Files/dimension_city and convert it to a delta table dim_city.
1. View your new table under the /Tables directory.
1. Query your table with the Fabric notebook.
1. Modify the delta table by adding a new column named newColumn with data type integer.  Set the value of 9 for all of the records for this newly added column.
1. Any delta table on OneLake can also be accessed via a SQL Endpoint. This SQL endpoint references the same physical copy of delta table on OneLake and offers T-SQL experience. Select SQL Endpoint lakehouse1 and then select dim_city table listed in the Explorer pane.
 
## Summary

In this quickstart guide, you used OneLake File explorer to copy external datasets to OneLake. The datasets were then transformed to delta table and analyzed using lakehouse and T-SQL experiences.
