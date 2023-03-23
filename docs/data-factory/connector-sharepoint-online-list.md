---
title: How to create SharePoint Online List connection
description: This article provides information about how to do create SharePoint Online List connection in Trident.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 03/21/2023
ms.custom: template-how-to
---

# How to create SharePoint Online List connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines the steps to create SharePoint Online List connection.

## Supported authentication types

This SharePoint Online List connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √| |
|OAuth2| √| |
|Service Principal| √| |

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](https://github.com/microsoft/trident-docs-private-preview/blob/main/docs/placeholder-update-later.md).

- A workspace is created and isn't the default My Workspace

## Go to Manage gateways to create connection

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHoSURBVDhPfVI9SEJRFH5q9idRghhRBoH5hgz62QyKRAqHhiZraqogMBoKgiyQnLK1IYPWFCopIY20JbSWTNOh1xL0clAqK7A0M/ue91kG0ccZzvnud+4959wjyOfzVBEBJuEI3Nw+pJyzWoTD1uNmmcSgadHQciIAfhKs+1F36G5CRyNNragDE2WfIAU/qVOBJzIKCQT+q/jC1jmcp1RGadyGwUFo3Dw7CLIFCQcuYWUv4mfiONaaPYQtRb/ZHbl9xHU2L4NQNDA6ZfMx6ffcqiuKd9UKKf90ERVikWU3nM7m7IGbHlouwIsodETTwp9TlMke9IRicPSdTcuGTkICSEB7wiibPGUSz6/vhIX65S3rWxqEgUTHhIfPy1AWekCLhYLz370SlPLrR1dwhMiurRaTa/4H+/CKF0RhSW/m49M+01cpFoFNPKcPQzFUDx/lYQZadQP8sT6lOxSz7F4KFTIJmq6tLucuoSjLSFdNlbh73gUjIeEhgEzf0SjAgE2OYA9djwmM61Sl4yLAcDa811C7L+6cc1q+afwlfgd/VOjwF0DiUmII/16N1ukdGBkXyNLVKOMf5lYtif9qb5b6mcTsUBuYRccFKgGJnSUa4Nd6I8fmvWbvU1ytmMzaCXqd0Kl+9oWivgAsYHfccfep7QAAAABJRU5ErkJggg==) > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::
    
    The **New connection** pane will show up on the left side of the page.
       
    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane.":::

## Setup connection

### Step 1: Specify the new connection name, type, and URL.

   :::image type="content" source="media/connector-sharepoint-online-list/connection-details.png" alt-text="Screenshot showing how to set new connection":::

In the **New connection** pane, choose **Cloud**, and specify the following field:

**Connection name**: Specify a name for your connection.<br>
**Connection type**: Select **SharePoint** for your connection type.<br>
**URL**: The SharePoint Online site url, e.g. `https://contoso.sharepoint.com/sites/siteName`.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. This OData connector supports the following authentication types.

[Anonymous](#anonymous-authentication)<br>
[OAuth2](#oauth2-authentication)<br>
[Service Principal](#service-principal-authentication)

:::image type="content" source="media/connector-sharepoint-online-list/authentication-method.png" alt-text="Screenshot showing that authentication method of SharePoint Online List":::

#### Anonymous authentication

Select **Anonymous** under **Authentication method**.

:::image type="content" source="./media/connector-sharepoint-online-list/authentication-anonymous.png" alt-text="Screenshot showing Anonymous authentication.":::

#### OAuth2 authentication

:::image type="content" source="media/connector-sharepoint-online-list/authentication-oauth2.png" alt-text="Screenshot showing that OAuth2 authentication method":::

#### Service Principal authentication

:::image type="content" source="media/connector-sharepoint-online-list/authentication-servical-principal.png" alt-text="Screenshot showing that service principal authentication method":::

* **Tenant Id**: The tenant ID under which your application resides.
* **Service principal ID**: The Application (client) ID of the application registered in Azure Active Directory. Refer to [Prerequisites](/azure/data-factory/connector-sharepoint-online-list?tabs=data-factory#prerequisites) for more details including the permission settings.
* **Service principal key**: The application's key. Mark this field as a **SecureString** to store it securely, or [reference a secret stored in Azure Key Vault](/azure/data-factory/store-credentials-in-key-vault).

The SharePoint List Online connector uses service principal authentication to connect to SharePoint. Follow these steps to set it up:

1. Register an application with the Microsoft Identity platform. To learn how, see [Quickstart: Register an application with the Microsoft identity platform](/azure/active-directory/develop/quickstart-register-app). Make note of these values, which you use to define the linked service:

Application ID
Application key
Tenant ID

2. Grant SharePoint Online site permission to your registered application by following the steps below. To do this, you need a site admin role.

   - Open SharePoint Online site link e.g. https://[your_site_url]/_layouts/15/appinv.aspx (replace the site URL).
   - Search the application ID you registered, fill the empty fields, and click "Create".

         * App Domain: ```contoso.com```
         * Redirect URL: `https://www.contoso.com`
         * Permission Request XML:

      :::image type="content" source="./media/connector-sharepoint-online-list/request-xml.png" alt-text="Screenshot showing request XML.":::

      > [!NOTE]
      > In the context of configuring the SharePoint connector, the "App Domain" and "Redirect URL" refer to the SharePoint app that you have registered in Azure Active Directory (AAD) to allow access to your SharePoint data. The "App Domain" is the domain where your SharePoint site is hosted. For example, if your SharePoint site is located at "https://contoso.sharepoint.com", then the "App Domain" would be "contoso.sharepoint.com". The "Redirect URL" is the URL that the SharePoint app will redirect to after the user has authenticated and granted permissions to the app. This URL should be a page on your SharePoint site that the app has permission to access. For example, you could use the URL of a page that displays a list of files in a library, or a page that displays the contents of a document.
   - Click "Trust It" for this app.

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, under select the privacy level that you want apply in **Privacy level** drop-down list. Three privacy levels are supported. For more information, see privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors.

:::image type="content" source="./media/connector-sharepoint-online-list/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following connector properties in the table are supported in pipeline copy and Dataflow Gen2:

|Name|Description|Required|Property|Copy/Dataflow Gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓/|
|**Connection type**|Select **SharePoint** for your connection type. If no connection exists, then create a new connection by selecting **New**.|Yes||✓/|
|**URL**|The SharePoint Online site url, e.g. `https://contoso.sharepoint.com/sites/siteName`.|Yes||✓/|
|**Authentication**|See [Authentication](#authentication) |Yes||See [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓/|

### Authentication

The following properties in the table are the supported authentication type.

|Name|Description|Required|Property|Copy/Dataflow Gen2|
|:---|:---|:---|:---|:---|
|**Anonymous**||||✓/|
|**OAuth2**||||✓/|
|**Service Principal**||||✓/|
|- Tenant ID|The tenant ID under which your application resides.|Yes |||
|- Service Principal ID|The Application (client) ID of the application registered in Azure Active Directory. Refer to [Prerequisites](/azure/data-factory/connector-sharepoint-online-list?tabs=data-factory#prerequisites) for more details including the permission settings.|Yes |||
|- Service Principal key|The application's key. Mark this field as a **SecureString** to store it securely, or [reference a secret stored in Azure Key Vault](/azure/data-factory/store-credentials-in-key-vault).|Yes |||

## Next steps

- [How to create SharePoint Online List connection](connector-sharepoint-online-list.md)