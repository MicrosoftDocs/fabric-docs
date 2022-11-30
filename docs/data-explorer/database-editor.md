---
title:
description:
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.prod: analytics
ms.technology: data-explorer
ms.topic: how-to
ms.date: 11/30/2022

Customer intent: I want to learn how to create a database and get data into a table.
---

# Create a database

This article shows you how to create a database in Real-Time Analytics so that you can use data in other Trident apps.
## Prerequisites

* Power BI Premium subscription. For more information on Power BI Premium subscriptions, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A workspace. For more information on how to create a workspace, see [How to create a workspace in Power BI](/power-bi/collaborate-share/service-create-the-new-workspaces).
* A data source.

## Create database

:::image type="content" source="media/database-editor/create-database.png" alt-text="create database":::

Enter database name - TODO what names are allowed?
You can use alphanumeric characters and underscores. Spaces, special characters, and hyphens aren't supported.

## Database dashboard

Create a guided tour of what exists, what it means (in a table)


## How to access an existing database

TODO: Add introduction sentence(s)
TODO: Add ordered list of procedure steps

## Create a table and get data

General information about this step/stage

### Destination tab 

Define the table where the data is going

### Source tab

Defining the data source
Mention different source data options
Only show container or Azure/A3 blob - do this on different tabs

add link for how to find SAS URI

File format type: 

Show on CSV or JSON, mention other formats and things they need to know about it

### Schema tab

Note: we can optionally ingest the data or not.
CSV and JSON.
 TODO: make a list of documents we need to copy. 

### Summary tab

## Quick query

When to do it? verify that your data is there. CAn't share, can't export, can't save. For those actions, use the KQL queryset.

## Manage

### Retention policy

### Continuous export

??? Get info

### Data connections

## Next steps
TODO: Add your next step link(s)

<!--
Remove all the comments in this template before you sign-off or merge to the main branch.
-->