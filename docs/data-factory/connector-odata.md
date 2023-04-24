---
title: How to create an OData connection
description: This article provides information about how to create an OData connection from a data pipeline in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to
---

# How to create an OData connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article outlines the steps to create an OData connection in a data pipeline.

## Supported authentication types

This OData connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √| √|
|Basic| √| √|
|Organizational account| | √|

>[!Note]
>For information about the OData connection in Dataflow Gen2, go to [OData in dataflows](./connector-odata-dataflows.md).

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../placeholder.md).

- A workspace is created that isn't the default **My Workspace**.

## Go to manage gateways to create connection

1. From the page header in the Data Factory service, select **Settings** ![Settings gear icon.](./media/connector-common/settings.png) > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open the manage gateway resource.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the ' new' page.":::

    The **New connection** pane shows up on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Setup connection

### Step 1: Specify the new connection name, type, and URL

   :::image type="content" source="media/connector-odata/connection-details.png" alt-text="Screenshot showing how to set a new connection.":::

In the **New connection** pane, choose **Cloud**, and specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **OData** for your connection type.
- **URL**: Enter the root URL of the **OData** service.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. This OData connector supports the following authentication types:

- [Anonymous](#anonymous-authentication)
- [Basic](#basic-authentication)

:::image type="content" source="media/connector-odata/authentication-method.png" alt-text="Screenshot showing the authentication methods for OData.":::

#### Anonymous authentication

Under **Authentication method**, select **Anonymous**.

:::image type="content" source="./media/connector-odata/authentication-anonymous.png" alt-text="Screenshot showing the anonymous authentication method.":::

#### Basic authentication

- **Username**: The user name to use to access the OData endpoint.
- **Password**: The password for the specified username.

:::image type="content" source="media/connector-odata/authentication-basic.png" alt-text="Screenshot showing that basic authentication method.":::

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-odata/connection.png" alt-text="Screenshot showing connection page." lightbox="./media/connector-odata/connection.png":::

## Table summary

The connector properties in the following table are supported in pipeline copy:

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **OData** for your connection type.|Yes||✓|
|**URL**|The base URL to the OData server.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓|

### Authentication

The properties in the following table are the supported authentication type.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Anonymous**||||✓|
|**Basic**||||✓|
|- Username|The user name to use to access the OData endpoint.|Yes |||
|- Password|The password for the specified username.|Yes |||

## Next steps

- [How to configure OData in copy activity](connector-odata-copy-activity.md)
- [Connect to OData in dataflows](connector-odata-dataflows.md)