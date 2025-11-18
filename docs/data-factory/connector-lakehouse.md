---
title: Set up your Lakehouse connection
description: This article details how to use the Data Factory Lakehouse connector in Microsoft Fabric to create a data lake connection.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 11/17/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Lakehouse connection

You can connect to a Lakehouse data lake in Dataflow Gen2 and a pipeline using the Lakehouse connector provided by Data Factory in Microsoft Fabric.

## Supported authentication types

The Lakehouse connector supports the following authentication types for copy and Dataflow Gen2 respectively.

| Authentication type | Copy | Dataflow Gen2 |
| --- | :---: | :---: |
| Organizational account | √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a Lakehouse. The following links provide the specific Power Query connector information you need to connect to a Lakehouse in Dataflow Gen2:

* To get started using the Lakehouse connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
* Be sure to install or set up any [Lakehouse prerequisites](/power-query/connectors/lakehouse#prerequisites) before connecting to the Lakehouse connector.
* To connect to the Lakehouse connector from Power Query, go to [Connect to a Lakehouse from Power Query Online](/power-query/connectors/lakehouse#connect-to-a-lakehouse-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a pipeline

To create a Lakehouse connection in a pipeline, select an existing Lakehouse under **OneLake** section.

:::image type="content" source="media/connector-lakehouse/select-lakehouse-in-onelake.png" lightbox="media/connector-sql-database/select-sql-database-in-onelake.png" alt-text="Screenshot of selecting SQL database in OneLake section.":::

You have two ways to browse to this page:

- In copy assistant, browse to this page after selecting **OneLake**.
- In a pipeline, browse to all connection page through the connection drop-down list and go to **OneLake** section.

If you have multiple Lakehouse connections in **Manage Connections and Gateways**, it navigates to **Connect to data source** pane. You can select an existing connection or create a new connection from the drop-down list.

  :::image type="content" source="media/connector-lakehouse/connect-to-data-source.png" lightbox="media/connector-lakehouse/connect-to-data-source.png" alt-text="Screenshot of the pane to connect to data source.":::


> [!NOTE]
> To allow others to use the Lakehouse connection in your pipeline, you need to share your Lakehouse connection with them.

> [!NOTE]
> When you use an existing Lakehouse connection, ensure that the credentials used in the connection have sufficient permissions to access your workspace with the Lakehouse. Otherwise, you are recommended to create a new Lakehouse connection.

## Related content

* [Configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md)
