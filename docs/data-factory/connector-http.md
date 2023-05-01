---
title: How to create an HTTP connection
description: This article provides information about how to create an HTTP connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to
---

# How to create an HTTP connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article outlines the steps to create an HTTP connection.

## Supported authentication types

The HTTP connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √| √|
|Basic| √| √|
|Organizational account| | √|
|Windows| | √|

## Prerequisites

To get started, you must have completed the following prerequisites:

- A tenant account with an active subscription. Create an account for free.

- A workspace is created and that isn't the default **My Workspace**.

## Go to manage gateways to create a connection

1. From the page header in the Data Factory service, select **Settings** ![Settings gear icon](./media/connector-common/settings.png) > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page." lightbox="./media/connector-common/add-new-connection.png":::

    The **New connection** pane opens on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Setup connection

### Step 1: Specify the new connection name, type, and URL

   :::image type="content" source="media/connector-http/connection-details.png" alt-text="Screenshot showing how to set a new connection":::

In the **New connection** pane, choose **Cloud**, and then specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select Web for your connection type.
- **URL**: The base URL to the web server.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. This HTTP connector supports the following authentication types:

- [Basic](#basic-authentication)

:::image type="content" source="media/connector-http/authentication-method.png" alt-text="Screenshot showing that authentication method of HTTP.":::

#### Basic authentication

- **Username**: The user name to use to access the HTTP endpoint.
- **Password**: The password for specified username.

:::image type="content" source="media/connector-http/authentication-basic.png" alt-text="Screenshot showing the basic authentication method.":::

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-http/connection.png" alt-text="Screenshot showing connection page." lightbox="./media/connector-http/connection.png":::

## Table summary

The following connector properties in the table are supported in pipeline copy:

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **Web** for your connection type.|Yes||✓|
|**URL**|The base URL to the HTTP server.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes|See Authentication|Go to  [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓|

### Authentication

The following properties in the table are the supported authentication types.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Basic**||||✓|
|- Username|The user name to use to access the HTTP endpoint.|Yes |||
|- Password|The password for specified username.|Yes |||

## Next steps

- [How to configure HTTP in copy activity](connector-http-copy-activity.md)
- [Connect to HTTP data in dataflows](connector-http-dataflows.md)