---
title: Set up your Snowflake database connection
description: This article provides information about how to create a Snowflake database connection in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 11/04/2025
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

## Authentication

The Snowflake connector supports multiple authentication types. This section describes how to configure Key-pair authentication.

- [Key-pair](connector-snowflake.md#key-pair-authentication)

### Key-pair authentication

:::image type="content" source="media/connector-snowflake/key-pair-authentication.png" alt-text="Screenshot showing that Key-pair authentication method for Snowflake.":::

To use Key-pair authentication, you need to configure and create a Key-pair authentication user in Snowflake by referring to [Key-pair Authentication & Key-pair Rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth).

- **Username**: Specify the login name for the Snowflake user.
- **Private key**: Upload the private key file used for Key-pair authentication. After you upload the private key file, the service automatically detects whether it is encrypted or unencrypted, and displays or hides the Private Key Passphrase accordingly.

  - **Private Key Passphrase (Optional)**: Specify the passphrase used for decrypting the private key, if it's encrypted.

## Related content

- [Configure Snowflake in a copy activity](connector-snowflake-copy-activity.md)
