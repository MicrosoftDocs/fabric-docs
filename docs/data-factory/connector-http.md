---
title: Set up your HTTP connection
description: This article provides information about how to create an HTTP connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your HTTP connection

This article outlines the steps to create HTTP connection.

## Supported authentication types

The HTTP connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √ | n/a |
|Basic| √ | n/a |

## Set up your connection in Dataflow Gen2

The HTTP connector isn't currently supported in Dataflow Gen2.

## Set up your connection in a data pipeline

To create a connection in a data pipeline:

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
|**Connection name**|A name for your connection.|Yes||✓/|
|**Connection type**|Select **Web** for your connection type.|Yes||✓/|
|**URL**|The base URL to the HTTP server.|Yes||✓/|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to  [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓/|

### Authentication

The following properties in the table are the supported authentication types.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Basic**||||✓|
|- Username|The user name to use to access the HTTP endpoint.|Yes |||
|- Password|The password for specified username.|Yes |||

## Related content

- [Configure HTTP in a copy activity](connector-http-copy-activity.md)
