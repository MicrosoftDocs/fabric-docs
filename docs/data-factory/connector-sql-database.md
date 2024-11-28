---
title: Set up your SQL database connection
description: This article provides information about how to create an SQL database connection in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/25/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your SQL database connection

This article outlines the steps to create an SQL database connection.

## Supported authentication types

The SQL database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection in a data pipeline

To create an SQL database connection in a data pipeline, select an existing SQL database under **OneLake** section. 

:::image type="content" source="media/connector-sql-database/select-sql-database-in-onelake.png" alt-text="Screenshot of selecting sql database in onelake section.":::

You have two ways to browse to this page:

- In copy assistant, browse to this page after selecting **OneLake**.
- In a data pipeline, browse to this page after selecting **More** at the bottom of the connection list.

     :::image type="content" source="media/connector-sql-database/more.png" alt-text="Screenshot of selecting more.":::

You can select an existing SQL database connection by repeating the above step.

## Related content

- [Configure in a data pipeline copy activity](connector-sql-database-copy-activity.md)
