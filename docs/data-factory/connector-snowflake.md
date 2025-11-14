---
title: Set up your Snowflake database connection
description: This article provides information about how to create a Snowflake database connection in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 11/13/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Snowflake database connection

This article outlines the steps to create a Snowflake database connection.

## Supported authentication types

The Snowflake database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Snowflake| √ | √ |
|Microsoft Account| √ | √ |
|Key-pair | √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a Snowflake database. The following links provide the specific Power Query connector information you need to connect to Snowflake database in Dataflow Gen2:

- To get started using the Snowflake database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To connect to the Snowflake database connector from Power Query, go to [Connect to a Snowflake database from Power Query Online](/power-query/connectors/snowflake#connect-to-a-snowflake-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection for a pipeline

The following table contains a summary of the properties needed for a pipeline connection:

| Name | Description | Required | Property | Copy |
| --- | --- | :---: | --- | :---: |
| **Server** | The host name of the Snowflake account. | Yes |  | ✓ |
| **Warehouse** | The default virtual warehouse used for the session after connecting. | Yes |  | ✓ |
| **Connection** | Select **Create new connection**. | Yes |  | ✓ |
| **Connection name** | A name for your connection. | Yes |  | ✓ |
| **Data gateway** | An existing data gateway if your Snowflake instance isn't publicly accessible. | Yes |  | ✓ |
| **Authentication kind** | Go to [Authentication](#authentication). | Yes |  | Go to [Authentication](#authentication).|
| **Privacy Level** | The privacy level that you want to apply. Allowed values are None, Organizational, Privacy, and Public. | Yes |  | ✓ |

For specific instructions to set up your connection in a pipeline, follow these steps:

1. Browse to the **New connection page** for the data factory pipeline to configure the connection details and create the connection.

   :::image type="content" source="./media/connector-snowflake/new-connection-page.png" alt-text="Screenshot showing the new connection page." lightbox="./media/connector-snowflake/new-connection-page.png":::

   You have two ways to browse to this page:

   * In copy assistant, browse to this page after selecting the connector.
   * In pipeline, browse to this page after selecting + New in Connection section and selecting the connector.

1. In the **New connection** pane, specify the following fields:

   * **Server**: Specify the host name of the Snowflake account. For example, `contoso.snowflakecomputing.com`.
   * **Warehouse**: Specify the default virtual warehouse used for the session after connecting. For example, `CONTOSO_WH`.
   * **Connection**: Select **Create new connection**.
   * **Connection name**: Specify a name for your connection.

1. Under **Data gateway**, select an existing data gateway if your Snowflake instance isn't publicly accessible.

1. Under **Authentication kind**, select your authentication kind from the drop-down list and complete the related configuration. The Snowflake connector supports the following authentication types:

   * [Snowflake](#snowflake-authentication)
   * [Microsoft Account](#microsoft-account-authentication)
   * [Key-pair](#key-pair-authentication)

   :::image type="content" source="./media/connector-snowflake/authentication-kind.png" alt-text="Screenshot showing selecting authentication kind page.":::

1. Optionally, set the privacy level that you want to apply. Allowed values are None, Organizational, Privacy, and Public. For more information, see [privacy levels in the Power Query documentation](/power-query/privacy-levels).

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

## Authentication
This section lists the instructions for each authentication type supported by the Snowflake connector:

- [Snowflake](#snowflake-authentication)
- [Microsoft Account](#microsoft-account-authentication)
- [Key-pair](#key-pair-authentication)

### Snowflake authentication

:::image type="content" source="media/connector-snowflake/snowflake-authentication.png" alt-text="Screenshot showing that Snowflake method for Snowflake.":::

- **Username**: Specify the login name for the Snowflake user.
- **Password**: Specify the password for the Snowflake user.

### Microsoft Account authentication

:::image type="content" source="media/connector-snowflake/microsoft-account-authentication.png" alt-text="Screenshot showing that Microsoft Account method for Snowflake.":::

Select **Sign in**, which displays the sign in interface. Enter your account and password to sign in your organizational account. After signing in, go back to the New connection page.

### Key-pair authentication

:::image type="content" source="media/connector-snowflake/key-pair-authentication.png" alt-text="Screenshot showing that Key-pair authentication method for Snowflake.":::

To use Key-pair authentication, you need to configure and create a Key-pair authentication user in Snowflake by referring to [Key-pair Authentication & Key-pair Rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth).

- **Username**: Specify the login name for the Snowflake user.
- **Private key**: Upload the private key file used for Key-pair authentication. After you upload the private key file, the service automatically detects whether it is encrypted or unencrypted, and displays or hides the Passphrase accordingly.

- **Passphrase**: Specify the passphrase used to decrypt the private key. This is required only if the private key file is encrypted.

    :::image type="content" source="media/connector-snowflake/key-pair-authentication-passphrase.png" alt-text="Screenshot showing the passphrase option.":::

## Related content

- [Configure Snowflake in a copy activity](connector-snowflake-copy-activity.md)
