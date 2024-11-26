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

To create a connection in a data pipeline:

1. Selecting **More** at the bottom of the connection list.

   :::image type="content" source="media/connector-sql-database/more.png" alt-text="Screenshot of selecting more.":::

1. Select an existing SQL database under **OneLake** section. When you choose one, will create and connect to your SQL database connection.
   :::image type="content" source="media/connector-sql-database/select-sql-database-in-onelake.png" alt-text="Screenshot of selecting sql database in onelake section.":::

## Related content

- [Configure in a data pipeline copy activity](connector-sql-database-copy-activity.md)
