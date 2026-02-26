---
title: Set up your Amazon S3 connection
description: This article provides information about how to create an Amazon S3 connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 10/31/2025
ms.custom:
- template-how-to
- connectors
- sfi-image-nochange
---

# Set up your Amazon S3 connection

This article outlines the steps to create an Amazon S3 connection for pipelines in Microsoft Fabric.

## Supported authentication types

The Amazon S3 connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Access Key| √| n/a|

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

- [Configure in a pipeline copy activity](connector-amazon-s3-copy-activity.md)
