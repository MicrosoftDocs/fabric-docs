---
title: Set up your Lakehouse connection
description: This article details how to use the Data Factory Lakehouse connector in Microsoft Fabric to create a data lake connection.
ms.topic: how-to
ms.date: 01/27/2026
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

You can set up a Lakehouse connection in the **Get Data** page or in the **Manage connections and gateways** page. Connections established through **Manage connections and gateways** page are currently in preview. The sections below describe how to configure the connection through each option.

- In **Get Data** page:

    1. Go to **Get Data** page and navigate to **OneLake catalog** through the following ways:
    
       - In copy assistant, go to **OneLake catalog** section.
       - In a pipeline, select Browse all under **Connection**, and go to **OneLake catalog** section.
    
    1. Select an existing Lakehouse to connect to it.
    
        :::image type="content" source="media/connector-lakehouse/select-lakehouse-in-onelake.png" alt-text="Screenshot of selecting Lakehouse in OneLake section.":::
    
    You can also select a Lakehouse by choosing **none** in the pipeline **Connection** drop‑down list. When **none** is selected, the **Item** field becomes available, and you can pick the Lakehouse you need.
    
- (Preview) In **Manage connections and gateways** page:

    1. On this page, select **+ New**, choose Lakehouse as the connection type, and enter a connection name. Then complete the organizational account authentication by selecting **Edit credentials**.
    
        :::image type="content" source="media/connector-lakehouse/manage-connection-gateways-new-connection.png" alt-text="Screenshot creating new Lakehouse connection in Manage connection gateways.":::
    
    1. After the connection is created, go to the pipeline and select it in the connection drop‑down list.

        :::image type="content" source="media/connector-lakehouse/select-lakehouse-connection.png" alt-text="Screenshot of selecting a Lakehouse connection in pipelines.":::

    >[!NOTE]
    >If you create the connection through **Manage connections and gateways** page:
    >- To allow multiple users to collaborate in one pipeline, please ensure the connection is shared with them.
    >- If you choose to use an existing Lakehouse connection within the tenant, ensure it has at least Viewer permission to access the workspace and Lakehouse. For more information about the permission, see this [article](../data-engineering/workspace-roles-lakehouse.md).
    
## Related content

* [Configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md)
