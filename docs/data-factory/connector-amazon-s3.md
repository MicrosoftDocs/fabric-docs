---
title: How to create an Amazon S3 connection
description: This article provides information about how to create an Amazon S3 connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to
---

# How to create an Amazon S3 connection

This article outlines the steps to create an Amazon S3 connection.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning)]

## Supported authentication types

The Amazon S3 connector supports the following authentication types for copy activity.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| √| n/a|

>[!Note]
>For the Amazon S3 connection of Dataflow Gen2, go to [Connect to Amazon S3 in dataflows](./connector-amazon-s3-dataflows.md).

## Prerequisites

To get started, you must complete the following prerequisites:

- Create a tenant account with an active subscription. Create an account for free.

- Create a workspace that isn't the default **My Workspace**.

## Create a connection

1. From the page header in the Data Factory service, select **Settings** ![Settings gear icon](./media/connector-common/settings.png) > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::

    The **New connection** pane is then displayed on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Set up the connection

### Step 1: Specify the new connection name, type, data source path

   :::image type="content" source="media/connector-amazon-s3/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

In the **New connection** pane, choose **Cloud**, and then specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **Amazon S3** for your connection type.
- **Data source path**: Enter your account endpoint URL of your Amazon S3 data.

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
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **Amazon S3** for your connection type.|Yes||✓|
|**Data source path**|Enter your account endpoint URL of your Amazon S3.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|

### Authentication

The following table contains properties for the supported authentication type.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Basic**||||✓|
|- Username|The user name to use to access the Amazon S3 endpoint.|Yes |||
|- Password|The password for specified username.|Yes |||

## Next steps

- [How to configure Amazon S3 in a copy activity](connector-amazon-s3-copy-activity.md)
