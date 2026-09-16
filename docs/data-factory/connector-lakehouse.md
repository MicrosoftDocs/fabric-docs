---
title: Set up your lakehouse connection
description: This article details how to use the Data Factory lakehouse connector in Microsoft Fabric to create a data lake connection.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your lakehouse connection

You can connect to a lakehouse data lake in dataflow Gen2 and a pipeline by using the lakehouse connector provided by Data Factory.

## Supported authentication types

The lakehouse connector supports the following authentication types for copy and dataflow Gen2.

| Authentication type | Copy | Dataflow Gen2 |
| --- | :---: | :---: |
| Organizational account | √ | √ |

## Set up your connection for Dataflow Gen2
You can connect dataflow Gen2 in Fabric to a lakehouse by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete lakehouse prerequisites](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to a lakehouse](#connect-to-a-lakehouse).

### Capabilities

[!INCLUDE [lakehouse-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/lakehouse/lakehouse-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [lakehouse-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/lakehouse/lakehouse-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to a lakehouse

[!INCLUDE [lakehouse-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/lakehouse/lakehouse-connect-to-power-query-online.md)]

### Using relative references

Inside the navigator, you find a special node named **!(Current Workspace)**. This node displays the available Fabric lakehouses in the same workspace where the dataflow Gen2 is located.

![Screenshot of the navigator showing the !(Current Workspace) node for the Fabric lakehouse connector](media/connector-lakehouse/lakehouse-relative-reference-current-workspace.png)

When using any items within this node, the M script emitted uses workspace or lakehouse identifiers and instead uses relative references such as the ```"."``` handler to denote the current workspace and the name of the lakehouse as in the example M code.

```M code
let
  Source = Lakehouse.Contents([HierarchicalNavigation = null]),
  #"Navigation 1" = Source{[workspaceId = "."]}[Data],
  #"Navigation 2" = #"Navigation 1"{[lakehouseName = "My Lakehouse"]}[Data],
  #"Navigation 3" = #"Navigation 2"{[Id = "Date", ItemKind = "Table"]}[Data]
in
  #"Navigation 3"
```

## Set up your connection in a pipeline

You can set up a lakehouse connection in the **Get Data** page or in the **Manage connections and gateways** page. Connections established through **Manage connections and gateways** page are currently in preview. The sections below describe how to configure the connection through each option.

- In **Get Data** page:

    1. Go to **Get Data** page and navigate to **OneLake catalog** through the following ways:
    
       - In copy assistant, go to **OneLake catalog** section.
       - In a pipeline, select Browse all under **Connection**, and go to **OneLake catalog** section.
    
    1. Select an existing lakehouse to connect to it.
    
        :::image type="content" source="media/connector-lakehouse/select-lakehouse-in-onelake.png" alt-text="Screenshot of selecting a lakehouse in the OneLake catalog.":::
    
    You can also select a lakehouse by choosing **none** in the pipeline **Connection** drop-down list. When **none** is selected, the **Item** field becomes available, and you can pick the lakehouse you need.
    
- (Preview) In **Manage connections and gateways** page:

    1. On this page, select **+ New**, choose **Lakehouse** as the connection type, and enter a connection name. Then complete the organizational account authentication by selecting **Edit credentials**.
    
        :::image type="content" source="media/connector-lakehouse/manage-connection-gateways-new-connection.png" alt-text="Screenshot of creating a new lakehouse connection in Manage connections and gateways.":::
    
    1. After the connection is created, go to the pipeline and select it in the connection drop‑down list.

        :::image type="content" source="media/connector-lakehouse/select-lakehouse-connection.png" alt-text="Screenshot of selecting a lakehouse connection in a pipeline.":::

    >[!NOTE]
    >If you create the connection through **Manage connections and gateways** page:
    >- To allow multiple users to collaborate in one pipeline, please ensure the connection is shared with them.
    >- If you choose to use an existing lakehouse connection within the tenant, ensure it has at least Viewer permission to access the workspace and lakehouse. For more information about the permission, see this [article](../data-engineering/workspace-roles-lakehouse.md).
    

## Related content

- [For more information about this connector, see the lakehouse connector documentation.](/power-query/connectors/lakehouse)
- [Configure lakehouse in a copy activity](connector-lakehouse-copy-activity.md)
