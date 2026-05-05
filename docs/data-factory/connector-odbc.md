---
title: Set up your ODBC connection
description: This article provides information about how to create an ODBC data source connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your ODBC connection

This article outlines the steps to create an ODBC connection.

## Supported authentication types

The ODBC connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √ | √ |
|Basic (Username/Password)| √ | √ |
|Windows| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to ODBC using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for ODBC](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to an ODBC data source](#connect-to-an-odbc-data-source).

### Capabilities

[!INCLUDE [odbc-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/odbc/odbc-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [odbc-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/odbc/odbc-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to an ODBC data source

[!INCLUDE [odbc-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/odbc/odbc-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [odbc-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/odbc/odbc-limitations-and-considerations-include.md)]

## Set up your connection in Manage connections and gateways

The following table contains a summary of the properties needed for ODBC connection:

| Name | Description | Required |
| --- | --- | --- |
| **Gateway cluster name** | The on-premises data gateway to use for the connection. | Yes |
| **Connection name** | A name for your connection. | Yes |
| **Connection type** | Select **ODBC** for your connection type. | Yes |
| **Connection string** | The connection string for the ODBC connection. <br>Example: `Driver={ODBC Driver 13 for SQL Server};server=test.corp.contoso.com;database=TestDB;` | Yes |
| **Authentication method** | Go to [Authentication](#authentication). | Yes |
| **Privacy Level** | The privacy level that you want to apply. Allowed values are None, Private, Organizational, and Public. | Yes |

For specific instructions to set up your connection in Manage connections and gateways, follow these steps:

1. From the page header in Data Integration service, select **Settings** :::image type="icon" source="./media/connector-common/settings.png"::: > **Manage connections and gateways**

   :::image type="content" source="./media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open Manage connections and gateways.":::

1. Select **New** at the top of the ribbon to add a new data source.

   :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

1. In the **New connection** pane, choose **On-premises**, and specify the following fields:

   - **Gateway cluster name**: Select the gateway cluster name from the drop-down list.
   - **Connection name**: A name for your connection.
   - **Connection type**: Select **ODBC** for your connection type.
   - **Connection string**: Specify the connection string for the ODBC connection. Example: `Driver={ODBC Driver 13 for SQL Server};server=test.corp.contoso.com;database=TestDB;`.

   :::image type="content" source="./media/connector-odbc/connection-details.png" alt-text="Screenshot showing the connection setup for ODBC.":::

1. Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The ODBC connector supports the following authentication types:

   - [Anonymous](#anonymous-authentication)
   - [Basic](#basic-authentication)
   - [Windows](#windows-authentication)

1. Optionally, set the privacy level that you want to apply. Allowed values are **None**, **Private**, **Organizational**, and **Public**.

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

## Authentication

This section lists the instructions for each authentication type supported by the ODBC connector.

### Anonymous authentication

:::image type="content" source="./media/connector-odbc/anonymous-authentication.png" alt-text="Screenshot showing the Anonymous authentication method for ODBC.":::

Select the **Anonymous** authentication method from the drop-down list.

### Basic authentication

:::image type="content" source="./media/connector-odbc/basic-authentication.png" alt-text="Screenshot showing the Basic authentication method for ODBC.":::

- **Username**: Specify user name if you are using Basic authentication.
- **Password**: Specify password for the user account you specified for username. 

### Windows authentication

:::image type="content" source="./media/connector-odbc/windows-authentication.png" alt-text="Screenshot showing the Windows authentication method for ODBC.":::

Select the **Windows** authentication method from the drop-down list.

- **Username**: Specify user name when using Windows authentication. For example, `domain\username`.
- **Password**: Specify password for the user account.

## Related content

- [For more information about this connector, see the ODBC connector documentation.](/power-query/connectors/odbc)
- [Configure ODBC in a copy activity](connector-odbc-copy-activity.md)
