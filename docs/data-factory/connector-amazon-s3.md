---
title: Set up your connection
description: This article provides information about how to create an Amazon S3 connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 09/18/2023
ms.custom: template-how-to, build-2023
---

# Set up your connection connection

This article outlines the steps to create an Amazon S3 connection.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported authentication types

The Amazon S3 connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| √| n/a|

## Prerequisites

The following prerequisites are required before you start:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).

- A Microsoft Fabric enabled Workspace. [Create a workspace](../get-started/create-workspaces.md).

## Set up your connection in Dataflow Gen2

The Amazon S3 connector isn't currently supported in Dataflow Gen2.

## Set up your connection in a data pipeline

Browse to the **New connection page** for the data factory pipeline to configure the connection details and create the connection.

:::image type="content" source="./media/connector-amazon-s3/new-connection-page.png" alt-text="Screenshot showing the new connection page.":::

You have two ways to browse to this page:

- In copy assistant, browse to this page after selecting the connector.
- In pipeline, browse to this page after selecting + New in Connection section and selecting the connector.

### Step 1: Specify the new connection name, type, data source path

   :::image type="content" source="media/connector-amazon-s3/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

In the **New connection** pane, specify the following field:

- **Url**: Specify the account endpoint URL of you Amazon S3 data.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication method from the drop-down list and complete the related configuration. The Amazon S3 connector supports the following authentication types:

- [Basic](#basic-authentication)

:::image type="content" source="media/connector-amazon-s3/authentication-method.png" alt-text="Screenshot showing the authentication method for Amazon S3.":::

#### Basic authentication

- **Username**: The user name to use to access the Amazon S3 endpoint.
- **Password**: The password for the specified username.

:::image type="content" source="media/connector-amazon-s3/basic-authentication.png" alt-text="Screenshot showing the basic authentication method for Amazon S3.":::

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, under **Privacy level**, select the privacy level that you want apply. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If the credentials aren't correct, the creation fails with errors.

:::image type="content" source="./media/connector-amazon-s3/connection.png" alt-text="Screenshot showing connection page."lightbox="./media/connector-amazon-s3/connection.png":::

## Table summary

The following table contains connector properties that are supported in pipeline copy.

|Name|Description|Required|Property|Copy|
|:---|:---|:---:|:---|:---:|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **Amazon S3** for your connection type.|Yes||✓|
|**Data source path**|Enter your account endpoint URL of your Amazon S3.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|

### Authentication

The following table contains properties for the supported authentication type.

|Name|Description|Required|Property|Copy|
|:---|:---|:---:|:---|:---:|
|**Basic**||||✓|
|- Username|The user name to use to access the Amazon S3 endpoint.|Yes |||
|- Password|The password for specified username.|Yes |||

## Next steps

- [How to configure Amazon S3 in a copy activity](connector-amazon-s3-copy-activity.md)
