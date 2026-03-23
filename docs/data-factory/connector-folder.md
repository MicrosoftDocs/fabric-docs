---
title: Set up your Folder connection
description: This article provides information about how to create a Folder connection in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 03/20/2026
ai-usage: ai-assisted
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Folder connection

This article outlines the steps to create a folder connection.


## Supported authentication types

The Folder connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Windows| √| √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Folder using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Connect to a folder](#connect-to-a-folder).

### Capabilities

[!INCLUDE [folder-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/folder/folder-capabilities-supported.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to a folder

[!INCLUDE [folder-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/folder/folder-connect-to-power-query-online.md)]

## Set up your connection in Manage connections and gateways

The following table contains a summary of the properties needed for a Folder connection:

| Name | Description | Required |
| --- | --- | --- |
| **Gateway cluster name** | Select the on-premises data gateway cluster that you use to connect to the custom data source. | Yes |
| **Connection name** | A name for your connection. | Yes |
| **Connection type** | Select **Folder**. | Yes |
| **Full path** | The root path of the folder that you want to copy. Use the escape character "" for special characters in the string. For example，
| **Authentication method** | Go to [Authentication](#authentication). | Yes |
| **Privacy level** | The privacy level that you want to apply. Allowed values are None, Organizational, Private, and Public. | No |

For specific instructions to set up your connection in Manage connections and gateways, follow these steps:

1. From the page header in Data Integration service, select **Settings** :::image type="icon" source="./media/connector-common/settings.png"::: > **Manage connections and gateways**.

   :::image type="content" source="./media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

1. Select **New** at the top of the ribbon to add a new data source.

   :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the new page." lightbox="./media/connector-common/add-new-connection.png":::

   The **New connection** pane shows up on the left side of the page.

   :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

1. In the **New connection** pane, choose **On-premises**, and specify the following fields:

   :::image type="content" source="media/connector-folder/connection-details.png" alt-text="Screenshot showing how to set up a new Folder connection.":::

   - **Gateway cluster name**: Select the on-premises data gateway cluster that you use to connect to the custom data source.
   - **Connection name**: Specify a name for your connection.
   - **Connection type**: Select **Folder** for your connection type.
   - **Full path**: Specify the root path of the folder. For example, `C:\myfolder`.

1. Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The Folder connector supports the following authentication types:

   - [Windows](#windows-authentication)

1. Under **Privacy Level**, select the privacy level that you want to apply.

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

## Authentication

This section lists the instructions for each authentication type supported by the Folder connector:

- [Windows](#windows-authentication)

### Windows authentication

Fill in the required properties. You need to specify the Windows username and Windows password when using this authentication.

:::image type="content" source="media/connector-folder/windows-authentication.png" alt-text="Screenshot showing the Windows authentication method for Folder.":::

- **Windows username**: Specify the user name to use with Windows authentication. The format is `domain\<alias>`.
- **Windows password**: Specify the password for the user account.

## Related content

- [For more information about this connector, see the Folder connector documentation.](/power-query/connectors/folder)
- [Configure Folder in a copy activity](connector-folder-copy-activity.md)
