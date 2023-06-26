---
title: How to create a REST connection
description: This article provides information about how to do create a REST connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 06/14/2023
ms.custom: template-how-to, build-2023
---

# How to create REST connection

This article outlines the steps to create REST connection.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported authentication types

This REST connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 (Web API) |
|:---|:---|:---|
|Anonymous| √| √|
|Basic| √| √|
|Service principal|√||
|Organizational account| | √|
|Windows| | √|

>[!Note]
>For information about a REST connection in Dataflow Gen2, go to [Connect to REST APIs in dataflows](connector-rest-dataflows.md).

## Prerequisites

The following prerequisites are required before you start:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).

- A Microsoft Fabric enabled Workspace. [Create a workspace](../get-started/create-workspaces.md).

## Go to Manage gateways to create connection

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
- [Basic](#basic-authentication)
- [Service Principal](#service-principal-authentication)

:::image type="content" source="media/connector-rest/authentication-method.png" alt-text="Screenshot showing the authentication methods of REST.":::

#### Anonymous authentication

Select **Anonymous** under **Authentication method**.

:::image type="content" source="./media/connector-rest/authentication-anonymous.png" alt-text="Screenshot showing Anonymous authentication.":::

#### Basic authentication

- **Username**: The user name to use to access the REST endpoint.
- **Password**: The password for the specified username.

:::image type="content" source="media/connector-rest/authentication-basic.png" alt-text="Screenshot showing that basic authentication method.":::

#### Service Principal authentication

:::image type="content" source="./media/connector-rest/authentication-service-principal.png" alt-text="Screenshot showing service principal authentication method page.":::

- **Tenant Id**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering the mouse in the top-right corner of the Azure portal.
- **Service principal ID**: Specify the application's client ID.
- **Service principal key**: Specify the application's key.

To use service principal authentication, follow these steps:

Register an application entity in Azure Active Directory (Azure AD) by following [Register your application with an Azure AD tenant](/azure/storage/common/storage-auth-aad-app?tabs=dotnet#register-your-application-with-an-azure-ad-tenant). Make note of these values, which you use to define the connection:

   - Tenant ID
   - Application ID
   - Application key

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
|**Basic**||||✓|
|- Username|The user name to use to access the REST endpoint.|Yes |||
|- Password|The password for the specified username.|Yes |||
|**Service Principal**||||✓|
|- Tenant ID|The tenant information (domain name or tenant ID).|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||

## Next steps

- [How to configure REST in copy activity](connector-rest-copy-activity.md)
