---
title: How to create Google Cloud Storage connection
description: This article provides information about how to do create a Google Cloud Storage connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to
---

# How to create Google Cloud Storage connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article outlines the steps to create Google Cloud Storage connection.

## Supported authentication types

This Google Cloud Storage connector supports the following authentication types for copy activity.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| √| n/a|

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. Create an account for free.

- A workspace is created and isn't the default **My Workspace**.

## Go to manage gateways to create connection

1. From the page header in the Data Factory service, select **Settings** ![Settings gear icon](./media/connector-common/settings.png) > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open the manage gateway resource.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::

    The **New connection** pane now appears on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane.":::

## Setup connection

### Step 1: Specify the new connection name, type, and URL

   :::image type="content" source="media/connector-google-cloud/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

In the **New connection** pane, choose **Cloud**, and specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **Google Cloud Storage** for your connection type.
- **Url**: Specify the custom GCS endpoint as `https://storage.googleapis.com`.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. This Google Cloud Storage connector supports the following authentication types.

- [Basic](#basic-authentication)

:::image type="content" source="media/connector-google-cloud/authentication-method.png" alt-text="Screenshot showing that authentication method of Google Cloud Storage.":::

#### Basic authentication

- **Username**: ID of the secret access key. To find the access key and secret, go to [Prerequisites](connector-google-cloud-storage-copy-activity.md#prerequisites).
- **Password**: The secret access key itself.

:::image type="content" source="media/connector-google-cloud/authentication-basic.png" alt-text="Screenshot showing that basic authentication method.":::

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-google-cloud/connection.png" alt-text="Screenshot showing connection page." lightbox="./media/connector-google-cloud/connection.png":::

## Table summary

The following table contains connector properties that are supported in pipeline copy.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select a type for your connection. Select **Google Cloud Storage**.|Yes||✓|
|**Url**|The base Url to the Google Cloud Storage service.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|

### Authentication

The following properties in the table are the supported authentication types.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Basic**||||✓|
|- Username|ID of the secret access key. To find the access key and secret, go to [Prerequisites](connector-google-cloud-storage-copy-activity.md#prerequisites).|Yes |||
|- Password|The secret access key itself.|Yes |||

## Next steps

- [How to configure Google Cloud Storage in copy activity](connector-google-cloud-storage-copy-activity.md)
