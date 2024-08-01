---
title: How to create a Microsoft 365 connection
description: This article provides information about how to do create Microsoft 365 connection in [!INCLUDE [product-name](../includes/product-name.md)].
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# How to create a Microsoft 365 connection

This article outlines the steps to create a Microsoft 365 connection.

## Supported authentication types

This Microsoft 365 connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Service principal| √| n/a|

## Set up your connection in Dataflow Gen2

The Microsoft 365 connector isn't currently supported in Dataflow Gen2.

## Set up your connection in a data pipeline

To create a connection in a data pipeline:

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon](./media/connector-common/settings.png) > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway":::

2. Select **New** at the top of the ribbon to add a new data source.

   :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page." lightbox="./media/connector-common/add-new-connection.png":::

   The **New connection** pane is displayed on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Setup connection

### Step 1: Specify the new connection name, type

   :::image type="content" source="media/connector-microsoft-365/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

In the **New connection** pane, choose **Cloud**, and then specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **Microsoft 365** for your connection type.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. This Microsoft 365 connector supports the following authentication types.

[Service Principal](#service-principal-authentication)

:::image type="content" source="media/connector-microsoft-365/authentication-method.png" alt-text="Screenshot showing that authentication method of Microsoft 365":::

#### Service Principal authentication

:::image type="content" source="media/connector-microsoft-365/service-pricipal-authentication.png" alt-text="Screenshot showing that Service Principal authentication method of Microsoft 365":::

- **Tenant Id**: Your service principal tenant ID. Specify the tenant information under which your Microsoft Entra web application resides.
- **Service principal ID**: Specify the application's client ID.
- **Service principal key**: Specify the application's key.

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-microsoft-365/connection.png" alt-text="Screenshot showing connection page." lightbox="./media/connector-microsoft-365/connection.png":::

## Table summary

The connector properties in the following table are supported in pipeline copy:

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **Microsoft-365** for your connection type.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|

### Authentication

The following table contains the supported authentication type properties.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Service Principal**||||✓|
|- Tenant ID|Your service principal tenant ID. Specify the tenant information under which your Microsoft Entra web application resides.|Yes |||
|- Service Principal ID|Specify the application's client ID.|Yes |||
|- Service Principal key|Specify the application's key.|Yes |||

## Related content

- [How to configure Microsoft 365 in a copy activity](connector-microsoft-365-copy-activity.md)
