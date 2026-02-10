---
title: Set up your Data Warehouse connection
description: This article provides information about how to create a Data Warehouse connection in Microsoft Fabric.
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

You can set up a Data Warehouse connection in the **Get Data** page or in the **Manage connections and gateways** page. Connections established through **Manage connections and gateways** page are currently in preview. The sections below describe how to configure the connection through each option.

- In **Get Data** page:

    1. Go to **Get Data** page and navigate to **OneLake catalog** through the following ways:
    
       - In copy assistant, go to **OneLake catalog** section.
       - In a pipeline, select Browse all under **Connection**, and go to **OneLake catalog** section.
    
    1. Select an existing Data Warehouse to connect to it.

        :::image type="content" source="media/connector-data-warehouse/select-data-warehouse-in-onelake.png" alt-text="Screenshot of selecting Data Warehouse in OneLake section.":::
    
    You can also select a Data Warehouse by choosing **none** in the pipeline **Connection** drop‑down list. When **none** is selected, the **Item** field becomes available, and you can pick the Data Warehouse you need.

- (Preview) In **Manage connections and gateways** page:

    1. On this page, select **+ New**, choose Warehouse as the connection type, and enter a connection name. Then complete the organizational account authentication by selecting **Edit credentials**.
    
        :::image type="content" source="media/connector-data-warehouse/manage-connection-gateways-new-connection.png" alt-text="Screenshot creating new Lakehouse connection in Manage connection gateways.":::
    
    1. After the connection is created, go to the pipeline and select it in the connection drop‑down list. 

        :::image type="content" source="media/connector-data-warehouse/select-data-warehouse-connection.png" alt-text="Screenshot of selecting a Data Warehouse connection in pipelines.":::

    >[!NOTE]
    >If you create the connection through **Manage connections and gateways** page:
    >- To allow multiple users to collaborate in one pipeline, please ensure the connection is shared with them.
    >- If you choose to use an existing Data Warehouse connection within the tenant, ensure it has at least Viewer permission to access the workspace and Data Warehouse. For more information about the permission, see this [article](../data-warehouse/workspace-roles.md).