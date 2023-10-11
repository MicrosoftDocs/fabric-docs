---
title: How to create a SharePoint Online List connection
description: This article provides information about how to create a SharePoint Online List connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 08/31/2023
ms.custom: template-how-to, build-2023
---

# How to create a SharePoint Online List connection

This article outlines the steps to create SharePoint Online List connection.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported authentication types

The SharePoint Online List connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Service Principal| √| |
|Organizational account| | √|

>[!Note]
>For information about a SharePoint Online list connection in Dataflow Gen2, go to [Connect to a SharePoint Online list in dataflows](connector-sharepoint-online-list-dataflows.md).

## Prerequisites

The following prerequisites are required before you start:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).

- A Microsoft Fabric enabled Workspace. [Create a workspace](../get-started/create-workspaces.md).

## Go to manage gateways to create connection

1. From the page header in Data Factory service, select **Settings** ![Settings gear icon](./media/connector-common/settings.png) > **Manage connections and gateways**.

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page." lightbox="./media/connector-common/add-new-connection.png":::

    The **New connection** pane appears on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Setup connection

### Step 1: Specify the new connection name, type, and URL

   :::image type="content" source="media/connector-sharepoint-online-list/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

In the **New connection** pane, choose **Cloud**, and specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **SharePoint** for your connection type.
- **URL**: The SharePoint Online site URL, for example `https://contoso.sharepoint.com/sites/siteName`.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The SharePoint Online List connector supports the following authentication types.

- [Service Principal](#service-principal-authentication)

:::image type="content" source="media/connector-sharepoint-online-list/authentication-method.png" alt-text="Screenshot showing that authentication method of SharePoint Online List.":::


#### Service Principal authentication

Select **Service Principal** under **Authentication method**, and fill in the required properties.

:::image type="content" source="media/connector-sharepoint-online-list/authentication-service-principal.png" alt-text="Screenshot showing that service principal authentication method.":::

- **Tenant Id**: The tenant ID under which your application resides.
- **Service principal ID**: The Application (client) ID of the application registered in Azure Active Directory. Refer to [Prerequisites](connector-sharepoint-online-list-copy-activity.md#prerequisites) for more details, including the permission settings.
- **Service principal key**: The application's key.

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-sharepoint-online-list/connection.png" alt-text="Screenshot showing connection page." lightbox="./media/connector-sharepoint-online-list/connection.png":::

## Table summary

The following table contains the connector properties supported in a pipeline copy.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select **SharePoint** for your connection type. If no connection exists, then create a new connection by selecting **New**.|Yes||✓|
|**URL**|The SharePoint Online site URL, for example `https://contoso.sharepoint.com/sites/siteName`.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓|

### Authentication

The following table contains the supported authentication type properties.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Service Principal**||||✓|
|- Tenant ID|The tenant ID under which your application resides.|Yes |||
|- Service Principal ID|The Application (client) ID of the application registered in Azure Active Directory. Refer to [Prerequisites](connector-sharepoint-online-list-copy-activity.md#prerequisites) for more details including the permission settings.|Yes |||
|- Service Principal key|The application's key.|Yes |||

## Next steps

- [How to configure SharePoint Online List in a copy activity](connector-sharepoint-online-list-copy-activity.md)
- [Connect to a SharePoint Online list in dataflows](connector-sharepoint-online-list-dataflows.md)
