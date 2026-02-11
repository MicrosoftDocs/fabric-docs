---
title: Set up your Azure Databricks connection
description: This article provides information about how to create an Azure Databricks connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 10/31/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Azure Databricks connection

This article outlines the steps to create an Azure Databricks connection for pipelines and Dataflow Gen2 in Microsoft Fabric.

## Supported authentication types

The Azure Databricks connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Username/Password| n/a | √ |
|Personal Access Token| √ | √ |
|Microsoft Entra ID| n/a | √ |

## Set up your connection for Dataflow Gen2

You can connect Dataflow Gen2 to Azure Databricks in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
1. [Connect to Databricks data](/power-query/connectors/databricks-azure#connect-to-databricks-data-from-power-query-online).

### Learn more about this connector

- [Supported capabilities](/power-query/connectors/databricks-azure#capabilities-supported)
- [Limitations](/power-query/connectors/databricks-azure#limitations)

## Set up your connection for a pipeline

The following table contains a summary of the properties needed for a pipeline connection:

| Name | Description | Required | Property | Copy |
| --- | --- | :---: | --- | :---: |
| **Server Hostname** | The hostname for your Azure Databricks instance. For example: *example.azuredatabricks.net* | Yes |  | ✓ |
| **HTTP Path** | The http path for your data. For example: */sql/1.0/warehouses/abcdef1234567890* | Yes |  | ✓ |
| **Connection name** | A name for your connection. | Yes |  | ✓ |
| **Data gateway** | An existing data gateway if your Azure Databricks instance isn't publicly accessible. | No |  | ✓ |
| **Authentication kind** | Personal access token. | Yes |  | Personal Access token. |
| **Personal access token** | Your personal access token for Azure Databricks | Yes |  | ✓ |
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, and **Public**.|Yes||✓|
|**This connection can be used with on-premises data gateways and VNet data gateways**|This setting is required if a gateway is needed to access your Azure Databricks instance.|No*||✓|

For specific instructions to set up your connection in a pipeline, follow these steps:

1. Browse to the **New connection page** for the data factory pipeline to configure the connection details and create the connection.

   :::image type="content" source="./media/connector-azure-databricks/new-connection.png" alt-text="Screenshot showing the new connection page." lightbox="./media/connector-azure-databricks/new-connection.png":::

   You have two ways to browse to this page:

   * In copy assistant, browse to this page after selecting the connector.
   * In pipeline, browse to this page after selecting + New in Connection section and selecting the connector.

1. In the **New connection** pane, specify the following fields:

    * **Server Hostname** : The hostname for your Azure Databricks instance. For example: *example.azuredatabricks.net*
    * **HTTP Path** : The http path for your data. For example: */sql/1.0/warehouses/abcdef1234567890*
    * **Connection**: Select **Create new connection**.
    * **Connection name**: Specify a name for your connection.

1. Under **Data gateway**, select an existing data gateway if your Azure Databricks instance isn't publicly accessible.

1. For **Authentication kind**, a personal access token is the available authentication kind for copy activity. Specify your personal access token in the related configuration. For more information, see [Personal access token authentication](/azure/databricks/dev-tools/auth/pat).

1. Optionally, set the privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, and **Public**. For more information, see [privacy levels in the Power Query documentation](/power-query/privacy-levels).

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

## Related content

- [Configure Azure Databricks in a copy activity](connector-azure-databricks-copy-activity.md)