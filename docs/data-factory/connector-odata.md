---
title: Set up your OData connection
description: This article provides information about how to create an OData connection from a data pipeline in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your OData connection

This article outlines the steps to create an OData connection.

## Supported authentication types

This OData connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √ | √ |
|Basic| √ | √ |
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to OData. The following links provide the specific Power Query connector information you need to connect to OData in Dataflow Gen2:

- To get started using the OData connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
- To load data from the OData connector from Power Query, go to [Load data from an OData Feed in Power Query Online](/power-query/connectors/odata-feed#load-data-from-an-odata-feed-in-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

To create a connection in a data pipeline:

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

## Related content

- [Configure OData in a copy activity](connector-odata-copy-activity.md)
