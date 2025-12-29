---
title: Set up your Data Warehouse connection
description: This article provides information about how to create a Data Warehouse connection in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 12/29/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Data Warehouse connection

This article outlines the steps to create a Data Warehouse connection.

## Supported authentication types

The Data Warehouse connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 to a Data Warehouse in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
1. [Set up Warehouse prerequisites](/power-query/connectors/warehouse#prerequisites).
1. [Connect to a Warehouse (from Power Query online)](/power-query/connectors/warehouse#connect-to-a-warehouse-from-power-query-online).

### More information

- [Warehouse connector capabilities](/power-query/connectors/warehouse#capabilities)

## Set up your connection in a pipeline

1. Go to Get Data page and navigate to OneLake catalog through the following ways:

   - In copy assistant, go to **OneLake catalog** section.
   - In a pipeline, browse to all connection page through the connection drop-down list and go to **OneLake catalog** section.

1. Select an existing Data Warehouse.

    :::image type="content" source="media/connector-data-warehouse/select-data-warehouse-in-onelake.png" alt-text="Screenshot of selecting Data Warehouse in OneLake section.":::

1. In **Connect to data source** pane, select an existing connection within your tenant or create a new one.

    :::image type="content" source="media/connector-data-warehouse/connect-to-data-source.png" alt-text="Screenshot of the pane to connect to data source.":::

1. Select **Connect** to connect to your Data Warehouse.

> [!NOTE]
> - To allow multiple users to collaborate in one pipeline, please ensure the connection is shared with them.
> - If you choose to use an existing Data Warehouse connection within the tenant, ensure it has at least Viewer permission to access the workspace and Data Warehouse. For more information about the permission, see this [article](../data-warehouse/workspace-roles.md).