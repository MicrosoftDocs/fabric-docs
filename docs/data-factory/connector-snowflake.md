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

## Key-pair authentication

:::image type="content" source="media/connector-snowflake/key-pair-authentication.png" alt-text="Screenshot showing that Key-pair authentication method for Snowflake.":::

To use Key-pair authentication, you need to configure and create a Key-pair authentication user in Snowflake by referring to [Key-pair Authentication & Key-pair Rotation](https://docs.snowflake.com/en/user-guide/key-pair-auth).

- **Username**: Specify the login name for the Snowflake user.
- **Private key**: Specify the the private key used for the Key-pair authentication. <br> To ensure the private key is valid when sent to Microsoft Fabric, and considering that the Private key file includes newline characters (\n), it's essential to correctly format the Private key content in its string literal form. This process involves adding \n explicitly to each newline.

  > [!NOTE]
  > For Dataflow Gen2, we recommend generating a new RSA private key using the PKCS#8 standard in PEM format (.p8 file).

## Related content

- [Configure Snowflake in a copy activity](connector-snowflake-copy-activity.md)
