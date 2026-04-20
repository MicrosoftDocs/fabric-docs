---
title: Set up your Azure Data Explorer connection
description: This article provides information about how to create an Azure Data Explorer connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Azure Data Explorer connection

This article outlines the steps to create an Azure Data Explorer connection for pipelines and Dataflow Gen2 in Microsoft Fabric.

## Supported authentication types

The Azure Data Explorer connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Workspace identity| √ | √ |
|Organizational account| √ | |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 to Azure Data Explorer in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Azure Data Explorer](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Azure Data Explorer](#connect-to-azure-data-explorer).

### Capabilities

[!INCLUDE [azure-data-explorer-ccapabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-data-explorer/azure-data-explorer-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [azure-data-explorer-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-data-explorer/azure-data-explorer-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Azure Data Explorer

[!INCLUDE [azure-data-explorer-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-data-explorer/azure-data-explorer-connect-to-power-query-online.md)]

## Set up your connection for a pipeline

The following table contains a summary of the properties needed for a pipeline connection:

| Name | Description | Required | Property | Copy |
| --- | --- | :---: | --- | :---: |
| **Cluster** | Your Azure Data Explorer cluster URL. For example: `https://mycluster.kusto.windows.net` | Yes |  | ✓ |
| **Database** | The database in Azure Data Explorer where your data is housed. For example: *MyDatabase* | No |  | ✓ |
| **Connection name** | A name for your connection. | Yes |  | ✓ |
| **Data gateway** | An existing data gateway if your Azure Data Explorer instance isn't publicly accessible. | No |  | ✓ |
| **Authentication kind** | Choose the kind of Authentication you want to use to connect to your Azure Data Explorer cluster. | Yes |  |  |
| **Personal access token** | Your personal access token for Azure Data Explorer | Yes |  | ✓ |
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, and **Public**.|Yes||✓|
|**This connection can be used with on-premises data gateways and VNet data gateways**|This setting is required if a gateway is needed to access your Azure Data Explorer instance.|No*||✓|

For specific instructions to set up your connection in a pipeline, follow these steps:

1. Browse to the **New connection page** for the data factory pipeline to configure the connection details and create the connection.

   :::image type="content" source="./media/connector-azure-data-explorer/new-connection.png" alt-text="Screenshot showing the new connection page." lightbox="./media/connector-azure-data-explorer/new-connection.png":::

   You have two ways to browse to this page:

   * In copy assistant, browse to this page after selecting the connector.
   * In pipeline, browse to this page after selecting + New in Connection section and selecting the connector.

1. In the **New connection** pane, specify the following fields:

    * **Cluster** : Your Azure Data Explorer cluster URL. For example: `https://mycluster.kusto.windows.net`
    * **Database** : Optionally provide the database in Azure Data Explorer where your data is housed. For example: *MyDatabase*
    * **Connection**: Select **Create new connection**.
    * **Connection name**: Specify a name for your connection.

1. Under **Data gateway**, select an existing data gateway if your Azure Data Explorer instance isn't publicly accessible.
1. For **Authentication kind**, select either **Workspace identity** or **Organizational account** and complete the related configuration based on your selection.

1. Optionally, set the privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, and **Public**. For more information, see [privacy levels in the Power Query documentation](/power-query/privacy-levels).
1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.


## Related content

- [For more information about this connector, see the Azure Data Explorer connector documentation.](/power-query/connectors/azure-data-explorer)
- [Configure Azure Data Explorer in a copy activity](connector-azure-data-explorer-copy-activity.md)
