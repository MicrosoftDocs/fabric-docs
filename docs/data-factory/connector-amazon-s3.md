---
title: Set up your Amazon S3 connection
description: This article provides information about how to create an Amazon S3 connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 11/04/2026
ms.custom:
- template-how-to
- connectors
- sfi-image-nochange
ai-usage: ai-assisted
---

# Set up your Amazon S3 connection

This article outlines the steps to create an Amazon S3 connection for Dataflow Gen2 and pipelines in Microsoft Fabric. Amazon S3 source and destination support in Dataflow Gen2 is in preview.

## Supported authentication types

The Amazon S3 connector supports the following authentication types for copy and Dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Access Key| √| √|

## Set up your connection for Dataflow Gen2 (preview)

Use Amazon S3 to read files into a dataflow or write prepared query results to a bucket. The account used by the connection needs permission to access the target bucket and read or write the relevant objects.

The following source connection walkthrough uses **Access Key** authentication and sets **Data gateway** to **(none)**.

### Read data from Amazon S3

1. Open your Dataflow Gen2 in the Power Query editor.
1. On **Home**, select **Get data**, and then select **Amazon S3**.
1. In **Connect to data source**, enter the bucket URL in **Url**, for example, `https://mybucket.s3.us-east-2.amazonaws.com`. Use the URL for your own bucket and region.
1. Select an existing **Connection**, or select **Create new connection** and enter a **Connection name**.
1. For a new connection, select **Access Key** under **Authentication kind**. Enter the **Access Key Id** and **Secret Access Key**. The **RoleARN** field is for service principal authentication; leave it empty for this Access Key walkthrough.
1. Set the **Privacy Level** appropriate for the data. For guidance, see [Power Query privacy levels](/power-query/privacy-levels).
1. Select **Next**, choose the files to read, and continue to Power Query to prepare your data.

:::image type="content" source="media/connector-amazon-s3/source-connection.png" alt-text="Screenshot of the Amazon S3 source connection dialog in Dataflow Gen2, showing the bucket URL, Access Key authentication, and empty credential fields." lightbox="media/connector-amazon-s3/source-connection.png":::

Keep access keys in the connection's credential fields. Don't put credentials in query text or include them in screenshots.

### Use Amazon S3 as a data destination

> [!IMPORTANT]
> To use Amazon S3 as a Dataflow Gen2 data destination through an on-premises data gateway, you need the November 2026 gateway release (version **3000.342.0**) or later. For update instructions, see [Update an on-premises data gateway](/data-integration/gateway/service-gateway-update).

Configure the destination on the query whose results you want to export:

1. Select the prepared query in the Power Query editor, and then select **Add data destination** > **Amazon S3**.
1. Select or create an Amazon S3 connection with write access to the target bucket.
1. Choose a subfolder in the target bucket and configure the file name and file format offered by the destination. For the current root-folder limitation, see [Known issue: writing to the bucket root](#known-issue-writing-to-the-bucket-root).
1. Review the destination settings, and then finish the setup.
1. Select **Save & run**. After the refresh completes, check the generated file in the target bucket.

Amazon S3 is a file-based destination, not a database table destination. For file settings, see [Set up file-based destinations](dataflow-gen2-data-destinations-and-managed-settings.md#set-up-file-based-destinations). For run status and errors, see [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md).

### Known issue: writing to the bucket root

During the Dataflow Gen2 destination preview, writing directly to the bucket root fails when the Amazon S3 connection uses a root bucket URL.

To work around this issue, select a subfolder in the bucket as the destination instead of the root folder.

## Set up your connection in a pipeline

The following table contains a summary of the properties needed for a pipeline connection:

|Name|Description|Required|Property|Copy|
|:---|:---|:---:|:---|:---:|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **Amazon S3** for your connection type.|Yes||✓|
|**Data source path**|Enter your account endpoint URL of your Amazon S3.|Yes||✓|
|**Authentication**|Access Key |Yes||Access Key|

For specific instructions to set up your connection in a pipeline, follow these steps:

1. Browse to the **New connection page** for the Data Factory pipeline to configure the connection details and create the connection.

   :::image type="content" source="./media/connector-amazon-s3/new-connection-page.png" alt-text="Screenshot showing the new connection page." lightbox="./media/connector-amazon-s3/new-connection-page.png":::

   You have two ways to browse to this page:

   - In copy assistant, browse to this page after selecting the connector.
   - In pipeline, browse to this page after selecting + New in Connection section and selecting the connector.

1. Specify the new connection name, type, data source path

   :::image type="content" source="media/connector-amazon-s3/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

1. In the **New connection** pane, specify the following field:

   - **Url**: Specify the account endpoint URL of your Amazon S3 data.

1. Under **Authentication kind**, select your authentication kind from the drop-down list and complete the related configuration. The Amazon S3 connector supports the following authentication types:

   - Access Key

   :::image type="content" source="media/connector-amazon-s3/authentication-kind.png" alt-text="Screenshot showing the authentication kind for Amazon S3.":::

   - **Access Key Id**: Specify the ID of the secret access key.
   - **Secret Access Key**: Specify the secret access key itself.

   :::image type="content" source="media/connector-amazon-s3/access-key-authentication.png" alt-text="Screenshot showing the access key authentication kind for Amazon S3.":::

1. Optionally, set the privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, and **Public**. For more information, see [privacy levels in the Power Query documentation](/power-query/privacy-levels).

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

   :::image type="content" source="./media/connector-amazon-s3/connection.png" alt-text="Screenshot showing connection page."lightbox="./media/connector-amazon-s3/connection.png":::

## Related content

- [Amazon S3 connector overview](connector-amazon-s3-overview.md)
- [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md)
- [Configure in a pipeline copy activity](connector-amazon-s3-copy-activity.md)
