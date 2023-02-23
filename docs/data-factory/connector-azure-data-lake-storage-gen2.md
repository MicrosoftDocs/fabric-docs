---
title: How to create an Azure Data Lake Storage Gen2 connection
description: This article provides information about how to do create an Azure Data Lake Storage Gen2 connection in [!INCLUDE [product-name](../includes/product-name.md)].
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 12/26/2022
ms.custom: template-how-to
---

# How to create an Azure Data Lake Storage Gen2 connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines the steps to create an Azure Date Lake Storage Gen2 connection.

## Supported authentication types

The Azure Date Lake Storage Gen2 connector supports the following authentication types for copy and dataflow Gen2 respectively.  

|Authentication type |Copy  |Dataflow Gen2 |
|:---|:---|:---|
|Key| √| |
|OAuth2| √||
|Shared Access Signature (SAS)| √| |
|Service Principal|√||

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](https://github.com/microsoft/trident-docs-private-preview/blob/main/docs/placeholder-update-later.md).  

- A workspace is created that isn't the default My Workspace.

## Go to Manage gateways to create connection

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon](./media/connector-common/settings.png) > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source. 

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the new page." lightbox="./media/connector-common/add-new-connection.png":::
    
    The **New connection** pane will show up on the left side of the page.
       
    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Set up your connection

### Step 1: Specify the new connection name, type, server and full path

   :::image type="content" source="media/connectors-adlsgen2/connection-details.png" alt-text="Screenshot showing how to set a new connection.":::

In the **New connection** pane, choose **Cloud**, and specify the following fields:

* **Connection name**: Specify a name for your connection.
* **Connection type**: Select a type for your connection.
* **Server**: Enter your Azure Data Lake Storage Gen2 server name. For example, `https://contosoadlscdm.dfs.core.windows.net`. Specify your Azure Data Lake Storage Gen2 server name. Go to your Azure Data Lake Storage Gen2 account interface, browse to the **Endpoints** section, and get your Azure Data Lake Storage Gen2.
* **Full path**: Enter the full path to your Azure Data Lake Storage Gen2 container name.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The Azure Data Lake Storage Gen2 connector supports the following authentication types  

* [Key](connector-azure-data-lake-storage-gen2.md#key-authentication)
* [OAuth2](connector-azure-data-lake-storage-gen2.md#oauth2-authentication)
* [Shared Access Signature](connector-azure-data-lake-storage-gen2.md#shared-access-signature-authentication)
* [Service Principal](connector-azure-data-lake-storage-gen2.md#service-principal-authentication)

:::image type="content" source="media/connectors-adlsgen2/authentication-method.png" alt-text="Screenshot showing the authentication method for Azure Data Lake Storage Gen2.":::

#### Key authentication

* **Account key**: Specify your Azure Data Lake Storage Gen2 account key. Go to your Azure Data Lake Storage Gen2 account interface, browse to the **Access key** section, and get your account key.

    :::image type="content" source="media/connectors-adlsgen2/key-authentication.png" alt-text="Screenshot showing that key authentication method for Azure Data Lake Storage Gen2.":::

#### OAuth2 authentication

:::image type="content" source="media/connectors-adlsgen2/oauth2-authentication.png" alt-text="Screenshot showing that OAuth2 authentication method for Azure Data Lake Storage Gen2.":::

Open **Edit credentials**. The sign-in interface opens. Enter your account and password to sign in to your account. After signing in, you'll come back to the **New connection** page.

#### Shared access signature authentication

:::image type="content" source="media/connectors-adlsgen2/sas-authentication.png" alt-text="Screenshot showing that shared access signature authentication method for Azure Data Lake Storage Gen2.":::

* **SAS token**: Specify the shared access signature token for your Azure Data Lake Storage Gen2 container.  

If you don’t have a SAS token, switch to **Shared access signature** in your Azure Data Lake Storage Gen2 account interface. Under **Allowed resource types**, select **Container**, and then select **Generate SAS and connection string**. You can get your SAS token from the generated content that appears.
The shared access signature is a URI that encompasses in its query parameters all the information necessary for authenticated access to a storage resource. To access storage resources with the shared access signature, the client only needs to pass in the shared access signature to the appropriate constructor or method.
For more information about shared access signatures, go to [Shared access signatures: Understand the shared access signature model](/azure/storage/common/storage-sas-overview).

#### Service principal authentication

:::image type="content" source="media/connectors-adlsgen2/service-principal.png" alt-text="Screenshot showing that service principal authentication method for Azure Data Lake Storage Gen2.":::

* **Tenant Id**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering over the upper-right corner of the Azure portal.
* **Service principal ID**: Specify the application (client) ID.
* **Service principal key**: Specify your application's key.

To use service principal authentication, follow these steps:

1. Register an application entity in Azure Active Directory (Azure AD) by following [Register your application with an Azure AD tenant](/azure/storage/common/storage-auth-aad-app?tabs=dotnet#register-your-application-with-an-azure-ad-tenant). Make note of these values, which you use to define the linked service:
   * Tenant ID
   * Application ID
   * Application key

2. Grant the service principal proper permission. For examples of how permission works in Azure Data Lake Storage Gen2, go to [Access control lists on files and directories](/azure/storage/blobs/data-lake-storage-access-control#access-control-lists-on-files-and-directories).

   * **As source**, in Storage Explorer, grant at least **Execute** permission for all upstream folders and the file system, along with **Read** permission for the files to copy. Alternatively, in Access control (IAM), grant at least the **Storage Blob Data Reader** role.
   * **As sink**, in Storage Explorer, grant at least **Execute** permission for all upstream folders and the file system, along with **Write** permission for the sink folder. Alternatively, in Access control (IAM), grant at least the **Storage Blob Data Contributor** role.
    
    > [!NOTE]
    > If you use a UI to author and the service principal isn't set with the "Storage Blob Data Reader/Contributor" role in IAM, when doing a test connection or browsing/navigating folders, choose **Test connection to file path** or **Browse from specified path**, and then specify a path with **Read + Execute** permission to continue.


### Step 3: Specify the privacy level you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to General.

:::image type="content" source="media/connectors-adlsgen2/privacy-level.png" alt-text="Screenshot showing that Privacy Level of data lake gen2":::

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors.

:::image type="content" source="./media/connectors-adlsgen2/connection.png" alt-text="Screenshot showing connection page." lightbox="./media/connectors-adlsgen2/connection.png":::

## Table summary

The connector properties in the following table are supported in pipeline copy and dataflow gen2.

|Name|Description|Required|Property|Copy/Dataflow gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓/|
|**Connection type**|Select a type for your connection.|Yes||✓/|
|**Server**|Enter the name of Azure Data Lake Storage Gen2 server, for example, `https://contosoadlscdm.dfs.core.windows.net`.|Yes||✓/|
|**Full path**|Enter the full path of your Azure Data Lake Storage Gen2 container name.
|Yes||✓/|
|**Authentication**|Go to [Authentication](#authentication). |Yes|Go to [Authentication](#authentication).|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are Organizational, Privacy, and Public.|Yes||✓/|

### Authentication

The properties in the following table are the supported authentication types.

|Name|Description|Required|Property|Copy/Dataflow gen2|
|:---|:---|:---|:---|:---|
|**Key**||||✓/|
|- Account key|The Azure Data Lake Storage Gen2 account key. |Yes |||
|**Shared Access Signature (SAS)**||||✓/|
|- SAS token|Specify the shared access signature token for your Azure Data Lake Storage Gen2 container.|Yes |||
|**Service Principal**||||✓/|
|- Tenant ID|The tenant information (domain name or tenant ID).|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||

## Next steps

- [How to create Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md)
