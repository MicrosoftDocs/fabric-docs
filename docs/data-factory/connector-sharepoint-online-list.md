---
title: Set up your SharePoint Online List connection
description: This article provides information about how to create a SharePoint Online List connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your SharePoint Online List connection

This article outlines the steps to create a SharePoint Online List connection.

## Supported authentication types

The SharePoint Online List connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √|
|Service Principal| √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a SharePoint Online List. The following links provide the specific Power Query connector information you need to connect to a SharePoint Online List in Dataflow Gen2:

- To get started using the SharePoint Online list connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
- To determine the URL to use to access your SharePoint Online list, go to [Determine the site URL](/power-query/connectors/sharepoint-online-list#determine-the-site-url).
- To connect to the Azure Blobs connector from Power Query, go to [Connect to a SharePoint Online list from Power Query Online](/power-query/connectors/sharepoint-online-list#connect-to-a-sharepoint-online-list-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

To create a connection in a data pipeline:

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
- **Service principal ID**: The Application (client) ID of the application registered in Microsoft Entra ID. Refer to [Prerequisites](connector-sharepoint-online-list-copy-activity.md#prerequisites) for more details, including the permission settings.
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
|- Service Principal ID|The Application (client) ID of the application registered in Microsoft Entra ID. Refer to [Prerequisites](connector-sharepoint-online-list-copy-activity.md#prerequisites) for more details including the permission settings.|Yes |||
|- Service Principal key|The application's key.|Yes |||

## Related content

- [Configure SharePoint Online List in a copy activity](connector-sharepoint-online-list-copy-activity.md)
