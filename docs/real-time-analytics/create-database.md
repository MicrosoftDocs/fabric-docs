---
title: Create a KQL Database in Real-time Analytics
description: Learn how to create a KQL Database.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 04/27/2023
ms.search.form: product-kusto
---

# Create a database

In Real-time Analytics, you interact with your data in the context of databases. A single workspace can hold multiple databases, and each database can hold multiple tables.

In this article, you learn you how to create a new database. Once your database has data, you can proceed to query your data using Kusto Query Language in a KQL Queryset.

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md)

## Create a new database

1. Select **New** > **KQL Database**.

    :::image type="content" source="media/database-editor/create-database.png" alt-text="Screenshot of Real-time Analytics workspace that shows the dropdown menu of the ribbon button titled New. Both the New tab and the entry titled KQL Database are highlighted.":::

1. Enter your database name, then select **Create**.

    > [!NOTE]
    > The database name can contain alphanumeric characters, underscores, periods, and hyphens. Special characters aren't supported.

    :::image type="content" source="media/create-database/new-database.png" alt-text="Screenshot of the New KQL Database window showing the database name. The Create button is highlighted.":::

The KQL Database has now been created within the context of the selected workspace.

## Database details

The main page of your database shows an overview of the contents in your database. The following table lists the information you'll see.

:::image type="content" source="media/create-database/database-dashboard.png" alt-text="Screenshot of database dashboard showing the database details cards."  lightbox="media/create-database/database-dashboard.png":::

|Card | Item| Description|
|---|---|---|
|**Database details**|
| | Created by | User name of person who created the database.|
| | Region | Shows the region of the data and services.|
| | Created on | Date of database creation.|
| | Last ingestion | Date on which data was ingested last into the database.|
| | Query URI | URI that can be used for sending/ running queries.|
| | Ingestion URI | URI that can be used for programmatic ingestion.|
| | OneLake folder | OneLake folder path that can be used for creating shortcuts. You can also activate and deactivate data copy to OneLake.|
| **Size**|
| | Compressed| Total size of compressed data.|
| | Original size | Total size of uncompressed data.|
| | Compression ratio | Compression ratio of the data.|
|**Top tables**|  
| | Name | Lists the names of tables in your database. You can select a table to see more information.|
| | Size | Database size in megabytes. The tables are listed in a descending order according to the data size.|
|**Most active users**|
| | Name | User name of most active users in the database.|
| | Queries run last month | The number of queries run per user in the last month.|
|**Recently updated functions**
| | |  Lists the function name and the time it was last updated.|
|**Recently used Querysets**|
| | | Lists the recently used query set and the time it was last accessed.|
|**Recently created data connections**
| | | Lists the data connection and the time it was created.|

## Access an existing database

To access your existing databases:

1. Select the **Workspaces** icon on the side navigation on the left. Then choose a workspace.

    :::image type="content" source="media/create-database/access-existing-database-1.png" alt-text="Screenshot of the left menu of UI that shows the dropdown menu of the icon titled workspaces. The workspaces icon is highlighted.":::

1. Select **Filter** on the right side of the ribbon > **KQL Database**.

    :::image type="content" source="media/database-editor/access-existing-database-2.png" alt-text="Screenshot of workspace pane that shows the dropdown menu of the workspace ribbon option titled Filter. The dropdown entry titled KQL Database is selected. Both the Filter option and KQL Database are highlighted.":::

1. Select the desired database.

## Next steps

* [Get data from a blob](get-data-blob.md)
* [Get data from Azure Event Hubs](get-data-event-hub.md)
* [Query data in the KQL Queryset](kusto-query-set.md)
