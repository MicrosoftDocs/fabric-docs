---
title: Set up your Snowflake database connection
description: This article provides information about how to create a Snowflake database connection in Microsoft Fabric.
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

You can connect Dataflow Gen2 in Microsoft Fabric to Snowflake using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. Check [Snowflake limitations and known issues](/power-query/connectors/snowflake#limitations-and-known-issues) to make sure your scenario is supported.
1. [Connect to a Snowflake database (from Power Query Online)](/power-query/connectors/snowflake#connect-to-a-snowflake-database-from-power-query-online).

## Set up your connection in Manage connections and gateways

The following table contains a summary of the properties needed for Snowflake connection:

| Name | Description | Required |
| --- | --- | --- |
| **Connection name** | A name for your connection. | Yes |
| **Connection type** | Select a type for your connection. | Yes |
| **Server** | The host name of the Snowflake account. | Yes |
| **Warehouse** | The default virtual warehouse used for the session after connecting. | Yes |
| **Authentication kind** | Go to [Authentication](#authentication). | Yes |
| **Privacy Level** | The privacy level that you want to apply. Allowed values are None, Organizational, Privacy, and Public. | Yes |
| **Specify a text value to use as Role name** | Enter a text value to use as Role name. | No |
| **Connection timeout in seconds** | The time to wait (in seconds) while trying to establish a connection before terminating the attempt and generating an error. | No |
| **Command timeout in seconds** | The time to wait (in seconds) while trying to execute a command before terminating the attempt and generating an error. | No |
| **Implementation** | The implementation modes for test connection. | No |

For specific instructions to set up your connection in Manage connections and gateways, follow these steps:

1. From the page header in Data Integration service, select **Settings** :::image type="icon" source="./media/connector-common/settings.png"::: > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

1. Select **New** at the top of the ribbon to add a new data source.

   :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the new page." lightbox="./media/connector-common/add-new-connection.png":::

   The **New connection** pane shows up on the left side of the page.

   :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

1. In the **New connection** pane, choose **Cloud**, and specify the following fields:

   :::image type="content" source="media/connector-snowflake/connection-details.png" alt-text="Screenshot showing how to set a new connection.":::

   - **Connection name**: Specify a name for your connection.
   - **Connection type**: Select a type for your connection.
   - **Server**: Specify the host name of the Snowflake account. For example, `contoso.snowflakecomputing.com`.
   - **Warehouse**: Specify the default virtual warehouse used for the session after connecting. For example, `CONTOSO_WH`.

1. Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The Snowflake connector supports the following authentication types:

   - [Snowflake](#snowflake-authentication)
   - [Microsoft Account](#microsoft-account-authentication)
   - [Key-pair](#key-pair-authentication)

   :::image type="content" source="./media/connector-snowflake/authentication-method.png" alt-text="Screenshot showing the authentication method for Snowflake.":::

1. Optionally, set the privacy level that you want to apply. Allowed values are None, Organizational, Privacy, and Public. For more information, see [privacy levels in the Power Query documentation](/power-query/privacy-levels).

1. Advanced Options are used for test connection only. Items that use this connection must specify these options in queries.

   :::image type="content" source="./media/connector-snowflake/advanced-options.png" alt-text="Screenshot showing the advanced options for Snowflake.":::

    - **Specify a text value to use as Role name**: Enter a text value to use as Role name.
    - **Connection timeout in seconds**: Specify the time to wait (in seconds) while trying to establish a connection before terminating the attempt and generating an error.
    - **Command timeout in seconds**: Specify the time to wait (in seconds) while trying to execute a command before terminating the attempt and generating an error.
    - **Implementation**: Specify your implementation modes for test connection.

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

Select **Edit credentials**, which displays the sign in interface. Enter your account and password to sign in your organizational account. After signing in, go back to the New connection page.

### Key-pair authentication

:::image type="content" source="media/connector-snowflake/key-pair-authentication.png" alt-text="Screenshot showing that Key-pair authentication method for Snowflake.":::

To use Key-pair authentication, you need to configure and create a Key-pair authentication user in Snowflake by referring to [Key-pair Authentication & Key-pair Rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth).

- **Username**: Specify the login name for the Snowflake user.
- **Private key**: Upload the private key file used for Key-pair authentication. After you upload the private key file, the service automatically detects whether it is encrypted or unencrypted, and displays or hides the Passphrase accordingly.

- **Passphrase**: Specify the passphrase used to decrypt the private key. This is required only if the private key file is encrypted.

    :::image type="content" source="media/connector-snowflake/key-pair-authentication-passphrase.png" alt-text="Screenshot showing the passphrase option.":::

## Related content

- [Configure Snowflake in a copy activity](connector-snowflake-copy-activity.md)
