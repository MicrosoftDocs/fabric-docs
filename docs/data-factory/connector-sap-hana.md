---
title: Set up your SAP HANA database connection
description: This article provides information about how to create an SAP HANA database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/19/2026
ai-usage: ai-assisted
ms.custom:
  - template-how-to
  - connectors
---

# Set up your SAP HANA database connection

This article outlines the steps to create an SAP HANA database connection.


## Supported authentication types

The SAP HANA database connector supports the following authentication types for copy and Dataflow Gen2.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| √ | √ |
|Windows | √ | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to SAP HANA database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for SAP HANA database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to an SAP HANA database](#connect-to-an-sap-hana-database).

### Capabilities

[!INCLUDE [sap-hana-database-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [sap-hana-database-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to an SAP HANA database

[!INCLUDE [sap-hana-database-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [sap-hana-database-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-limitations.md)]


## Set up your connection in Manage connections and gateways

The following table contains a summary of the properties needed for an SAP HANA connection:

| Name | Description | Required |
| --- | --- | --- |
| **Gateway cluster name** | Select the on-premises data gateway cluster that you use to connect to the SAP HANA server. | Yes |
| **Connection name** | A name for your connection. | Yes |
| **Connection type** | Select **SAP HANA**. | Yes |
| **Server** | The host name or IP address of the SAP HANA server. | Yes |
| **Authentication method** | Go to [Authentication](#authentication). | Yes |
| **Validate server certificate** | Specifies whether to validate the SAP HANA server certificate. | No |
| **SSL crypto provider** | The SSL crypto provider that you want to use. Allowed values are **mscrypto**, **sapcrypto**, and **commoncrypto**. | Yes |
| **Single sign-on** | Configure SSO options for Kerberos or SAML based on your query mode. | No |
| **Privacy level** | The privacy level that you want to apply. Allowed values are None, Organizational, Private, and Public. | Yes |

For specific instructions to set up your connection in Manage connections and gateways, follow these steps:

1. From the page header in Data Factory, select **Settings** :::image type="icon" source="./media/connector-common/settings.png"::: > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open Manage connections and gateways.":::

1. Select **New** at the top of the ribbon to add a new connection.

   :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the New page." lightbox="./media/connector-common/add-new-connection.png":::

   The **New connection** pane appears on the left side of the page.

   :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

1. In the **New connection** pane, choose **On-premises**, and specify the following fields:

   :::image type="content" source="./media/connector-sap-hana/connection-details.png" alt-text="Screenshot showing how to set up a new SAP HANA connection.":::

   - **Gateway cluster name**: Select the on-premises data gateway cluster that you use to connect to the SAP HANA server.
   - **Connection name**: Specify a name for your connection.
   - **Connection type**: Select **SAP HANA**.
   - **Server**: Specify the host name or IP address of the SAP HANA server. For example, `saphana-db.contoso.net`.

1. Under **Authentication method**, select your authentication type from the drop-down list and complete the related configuration. The SAP HANA connector supports the following authentication types:

   - [Basic](#basic-authentication)
   - [Windows](#windows-authentication)

   :::image type="content" source="./media/connector-sap-hana/authentication-method.png" alt-text="Screenshot showing the authentication method for SAP HANA.":::

1. Optionally, in **SSL**, choose **Validate server certificate**, and select your **SSL crypto provider**. The supported providers are **mscrypto**, **sapcrypto**, and **commoncrypto**.
1. Optionally, in **Single sign-on**, select one or more SSO options based on your scenario:

   - **Use SSO via Kerberos for DirectQuery queries**: This option will only be applied for DirectQuery queries. Import will use the Username and Password specified in the data source details. For more information, see this [article](/power-bi/connect-data/service-gateway-sso-kerberos).
   - **Use SSO via Kerberos for DirectQuery and Import queries**: For Import, it will use the Dataset owner's windows credentials. For more information, see this [article](/power-bi/connect-data/service-gateway-sso-kerberos).
   - **Use SSO via SAML for DirectQuery queries**

1. In **General**, set the privacy level that you want to apply. Allowed values are None, Organizational, Private, and Public. For more information, see [privacy levels in the Power Query documentation](/power-query/privacy-levels).

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

## Authentication

This section lists the instructions for each authentication type supported by the SAP HANA connector:

- [Basic](#basic-authentication)
- [Windows](#windows-authentication)

### Basic authentication

:::image type="content" source="./media/connector-sap-hana/basic-authentication.png" alt-text="Screenshot showing the Basic authentication method for SAP HANA.":::

- **Username**: Specify the user name to connect to the SAP HANA server.
- **Password**: Specify the password for the user account.

### Windows authentication

:::image type="content" source="./media/connector-sap-hana/windows-authentication.png" alt-text="Screenshot showing the Windows authentication method for SAP HANA.":::

- **Username**: Specify user name when using Windows authentication. For example: `user@domain.com`
- **Password**: Specify the password for the user account.

## Related content

- [For more information about this connector, see the SAP HANA database connector documentation.](/power-query/connectors/sap-hana/overview)
- [Configure SAP HANA in a copy activity](connector-sap-hana-copy-activity.md)
