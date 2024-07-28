---
title: How to create a REST connection
description: This article provides information about how to do create a REST connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# How to create REST connection

This article outlines the steps to create REST connection.

## Supported authentication types

This REST connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 (Web API) |
|:---|:---|:---|
|Anonymous| √| √|
|Basic| | √|
|Organizational account| | √|
|Windows| | √|

## Set up your connection in Dataflow Gen2

The Microsoft 365 connector isn't currently supported in Dataflow Gen2. To connect to REST data in Dataflow Gen2, use the [Web API](/power-query/connectors/web/web) connector.

## Set up your connection in a data pipeline

To create a connection in a data pipeline:

1. From the page header in Data Factory service, select **Settings** ![Settings gear icon](./media/connector-common/settings.png) > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open the manage gateway resource.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::

    The **New connection** pane appears on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane.":::

## Setup connection

### Step 1: Specify the new connection name, type, and URL

   :::image type="content" source="media/connector-rest/connection-details.png" alt-text="Screenshot showing how to set a new connection.":::

In the **New connection** pane, choose **Cloud**, and then specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **Web** for your connection type.
- **URL**: The base URL to the web server.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The REST connector supports the following authentication types:

- [Anonymous](#anonymous-authentication)

:::image type="content" source="media/connector-rest/authentication-method.png" alt-text="Screenshot showing the authentication methods of REST.":::

#### Anonymous authentication

Select **Anonymous** under **Authentication method**.

:::image type="content" source="./media/connector-rest/authentication-anonymous.png" alt-text="Screenshot showing Anonymous authentication.":::

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-rest/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following table contains connector properties that are supported in pipeline copy.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **Web** for your connection type.|Yes||✓|
|**URL**|The base URL to the REST server.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||See [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓|

### Authentication

The following the following table contains the properties for supported authentication types.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Anonymous**||||✓|

## Related content

- [How to configure REST in copy activity](connector-rest-copy-activity.md)
