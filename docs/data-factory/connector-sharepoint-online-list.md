---
title: Set up your SharePoint Online List connection
description: This article provides information about how to create a SharePoint Online List connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 02/10/2026
ms.custom:
- template-how-to
- connectors
- sfi-image-nochange
---

# Set up your SharePoint connection

This article outlines the steps to create a SharePoint connection.

## Supported authentication types

The SharePoint connector supports the following authentication types for copy and Dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √|
|Service Principal| n/a | √ |
|Workspace identity| √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a SharePoint Online List. The following links provide the specific Power Query connector information you need to connect to a SharePoint Online List in Dataflow Gen2:

- To get started using the SharePoint Online list connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
- To determine the URL to use to access your SharePoint Online list, go to [Determine the site URL](/power-query/connectors/sharepoint-online-list#determine-the-site-url).
- To connect to the SharePoint Online list connector from Power Query, go to [Connect to a SharePoint Online list from Power Query Online](/power-query/connectors/sharepoint-online-list#connect-to-a-sharepoint-online-list-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in Manage connections and gateways

The following table contains a summary of the properties needed for a SharePoint connection:

| Name | Description | Required |
| --- | --- | --- |
| **SharePoint site URL** | The SharePoint Online site URL, for example `https://contoso.sharepoint.com/sites/siteName`. | Yes |
| **Connection name** | A name for your connection. | Yes |
| **Connection type** | Select **SharePoint** for your connection. | Yes |
| **Authentication kind** | Go to [Authentication](#authentication). | Yes |
| **Privacy Level** | The privacy level that you want to apply. Allowed values are **Organizational**, **Private**, **Public**. | Yes |

For specific instructions to set up your connection in Manage connections and gateways, follow these steps:

1. From the page header in Data Integration service, select **Settings** :::image type="icon" source="./media/connector-common/settings.png"::: > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

1. Select **New** at the top of the ribbon to add a new data source.

   :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the new page." lightbox="./media/connector-common/add-new-connection.png":::

   The **New connection** pane shows up on the left side of the page.

   :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

1. In the **New connection** pane, choose **Cloud**, and specify the following fields:

   :::image type="content" source="media/connector-sharepoint-online-list/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

   - **Connection name**: Specify a name for your connection.
   - **Connection type**: Select **SharePoint** for your connection type.
   - **SharePoint site URL**: The SharePoint Online site URL, for example `https://contoso.sharepoint.com/sites/siteName`.

1. Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The SharePoint connector supports the following authentication types:

   - [Organizational account](#organizational-account-authentication)
   - [Service Principal](#service-principal-authentication)
   - [Workspace identity](#workspace-identity-authentication)

   :::image type="content" source="media/connector-sharepoint-online-list/authentication-method.png" alt-text="Screenshot showing that authentication method of SharePoint Online List.":::

1. Under **Privacy Level**, select the privacy level that you want to apply.

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

## Authentication 

This section lists the instructions for each authentication type supported by the SharePoint connector:

- [Organizational account](#organizational-account-authentication)
- [Service Principal](#service-principal-authentication)
- [Workspace identity](#workspace-identity-authentication)

### Organizational account authentication

Select **Edit credentials**, which displays the sign in interface. Enter your account and password to sign in your organizational account. After signing in, go back to the **New connection** page.

:::image type="content" source="media/connector-sharepoint-online-list/organizational-account.png" alt-text="Screenshot showing that organizational account authentication method.":::

### Service Principal authentication

Fill in the required properties. You need to specify the tenant ID, service principal client ID, and service principal key when using this authentication.

:::image type="content" source="media/connector-sharepoint-online-list/authentication-service-principal.png" alt-text="Screenshot showing that service principal authentication method.":::

- **Tenant ID**: The tenant ID under which your application resides.
- **Service principal ID**: The Application (client) ID of the application registered in Microsoft Entra ID.
- **Service principal key**: The application's key.


>[!Note]
> - For permission settings related to SharePoint Online List in the pipeline, refer to [Prerequisites](connector-sharepoint-online-list-copy-activity.md#prerequisites).
> - For permission settings related to SharePoint Online File in the pipeline, refer to [Prerequisites](connector-sharepoint-online-file-copy-activity.md#prerequisites).

### Workspace identity authentication

Use the workspace’s managed identity for authentication. For more information, see [Workspace identity](../security/workspace-identity.md).

## Related content

- [Configure SharePoint Online List in a copy activity](connector-sharepoint-online-list-copy-activity.md)
- [Configure SharePoint Online File in a copy activity](connector-sharepoint-online-file-copy-activity.md)