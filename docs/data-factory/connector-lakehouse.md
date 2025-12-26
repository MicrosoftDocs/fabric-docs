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

1. Go to Get Data page and navigate to OneLake catalog through the following ways:

   - In copy assistant, go to **OneLake catalog** section.
   - In a pipeline, browse to all connection page through the connection drop-down list and go to **OneLake catalog** section.

1. Select an existing Lakehouse.

    :::image type="content" source="media/connector-lakehouse/select-lakehouse-in-onelake.png" lightbox="media/connector-sql-database/select-sql-database-in-onelake.png" alt-text="Screenshot of selecting Lakehouse in OneLake section.":::

1. In **Connect to data source** pane, select an existing connection within your tenant or create a new one.

    :::image type="content" source="media/connector-lakehouse/connect-to-data-source.png" alt-text="Screenshot of the pane to connect to data source.":::

1. Select **Connect** to connect to your Lakehouse.

> [!NOTE]
> - To allow multiple users to collaborate in one pipeline, please ensure the connection is shared with them.
> - If you choose to use an existing Lakehouse connection within the tenant, ensure it has at least Viewer permission to access the workspace and Lakehouse. For more information about the permission, see this [article](../data-engineering/workspace-roles-lakehouse.md).

## Related content

* [Configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md)
