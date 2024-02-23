---
title: Configure SharePoint Online List in a copy activity
description: This article explains how to copy data using SharePoint Online List.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure SharePoint Online List in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from SharePoint Online List.

## Prerequisites

1. The SharePoint List Online connector uses service principal authentication to connect to SharePoint. Follow these steps to set it up:

1. Register an application with the Microsoft identity platform. To learn how, go to [Quickstart: Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app). Make note of these values, which you use to define the connection:

   - Application ID
   - Application key
   - Tenant ID

1. Use the following steps to grant SharePoint Online site permission to your registered application. To grant permission, you need a site admin role.

   1. Open a SharePoint Online site link, for example `https://[your_site_url]/_layouts/15/appinv.aspx` (replace the site URL).
   2. Search the application ID you registered, fill the empty fields, and then select **Create**.

      - App Domain: `contoso.com`
      - Redirect URL: `https://www.contoso.com`
      - Permission Request XML:

        ```xml
        <AppPermissionRequests AllowAppOnlyPolicy="true">
            <AppPermissionRequest Scope="http://sharepoint/content/sitecollection/web" Right="Read"/>
        </AppPermissionRequests>
        ```

      :::image type="content" source="./media/connector-sharepoint-online-list/request-xml.png" alt-text="Screenshot showing request XML.":::

      > [!NOTE]
      > In the context of configuring the SharePoint connector, the **App Domain** and **Redirect URL** refer to the SharePoint app that you've registered in Microsoft Entra ID to allow access to your SharePoint data. The **App Domain** is the domain where your SharePoint site is hosted. For example, if your SharePoint site is located at `https://contoso.sharepoint.com`, then the **App Domain** would be `contoso.sharepoint.com`. The **Redirect URL** is the URL that the SharePoint app redirects to after the user has authenticated and granted permissions to the app. This URL should be a page on your SharePoint site that the app has permission to access. For example, you could use the URL of a page that displays a list of files in a library, or a page that displays the contents of a document.

   3. Select **Trust It** for this app.

## Supported configuration

For the configuration of each tab under a copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for SharePoint Online List under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-sharepoint-online-list/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-sharepoint-online-list/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select a SharePoint Online List connection from the connection list. If no connection exists, then create a new HTTP connection by selecting **New**.
- **Use query**: Choose either **List name** or **Query** as your use query. The configuration of each setting is:

  - **List name**: The name of the SharePoint Online list.

    :::image type="content" source="./media/connector-sharepoint-online-list/list-name.png" alt-text="Screenshot showing list name." lightbox="./media/connector-sharepoint-online-list/list-name.png":::

  - **Query**: The OData query to filter the data in SharePoint Online list. For example, `"$top=1"`.

    :::image type="content" source="./media/connector-sharepoint-online-list/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-sharepoint-online-list/query.png":::

Under **Advanced**, you can specify the following fields:

- **Request timeout**: The wait time to get a response from SharePoint Online. Default value is 5 minutes (00:05:00).
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

  :::image type="content" source="./media/connector-sharepoint-online-list/additional-columns.png" alt-text="Screenshot showing additional columns." lightbox="./media/connector-sharepoint-online-list/additional-columns.png":::

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following table contains more information about a copy activity in SharePoint Online List.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Use query** |You can choose **List name** or **Query** as your use query.|-**List name** <br>-**Query**|No |type|
|**List name** |The name of the SharePoint Online list.|\<your connection> |Yes|listName|
|**Request timeout** |The wait time to get a response from SharePoint Online. Default value is 5 minutes (00:05:00).| timespan |No |requestTimeout|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.| • Name<br>• Value|No |additionalColumns:<br>• name<br>• value |

## Related content

- [Set up your SharePoint Online List connection](connector-sharepoint-online-list.md)
