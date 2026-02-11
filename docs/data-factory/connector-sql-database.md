---
title: Set up your SQL database connection (Preview)
description: This article provides information about how to create an SQL database connection in Microsoft Fabric.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 12/09/2024
ms.custom:
  - template-how-to
  - connectors
---

# Set up your SQL database connection (Preview)

This article outlines the steps to create an SQL database connection.

## Supported authentication types

The SQL database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection in a pipeline

To create an SQL database connection in a pipeline, select an existing SQL database under **OneLake** section. 

:::image type="content" source="media/connector-sql-database/select-sql-database-in-onelake.png" lightbox="media/connector-sql-database/select-sql-database-in-onelake.png" alt-text="Screenshot of selecting SQL database in OneLake section.":::

You have two ways to browse to this page:

- In copy assistant, browse to this page after selecting **OneLake**.
- In a pipeline, browse to this page after selecting **More** at the bottom of the connection list.

     :::image type="content" source="media/connector-sql-database/more.png" lightbox="media/connector-sql-database/more.png" alt-text="Screenshot of selecting more.":::

You can select an existing SQL database connection by repeating the above step.

If you have multiple Fabric SQL database connections in **Manage Connections and Gateways**, it navigates to **Connect to data source** pane. You can select an existing connection or create a new connection from the drop-down list.

:::image type="content" source="media/connector-sql-database/connect-to-data-source.png" lightbox="media/connector-sql-database/connect-to-data-source.png" alt-text="Screenshot of the pane to connect to data source.":::

## Related content

- [Configure in a pipeline copy activity](connector-sql-database-copy-activity.md)
