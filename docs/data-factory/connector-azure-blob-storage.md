---
title: How to create an Azure Blob Storage connection
description: This article provides information about how to create an Azure Blob Storage connection.
author: lrtoyou1223
ms.author: lle
ms.topic: how-to
ms.date: 1/27/2023
ms.custom: template-how-to
---

# How to create Azure Blob Storage connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

[Azure Blob storage](/azure/storage/blobs/storage-blobs-introduction) is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data. This article outlines the steps to create an Azure Blob Storage connection.

## Supported authentication types

The Azure Blob Storage connector supports the following authentication types for copy and dataflow gen2 respectively.  

|Authentication type |Copy |Dataflow gen2 |
|:---|:---|:---|
|Anonymous | √| √|
|Key| √| √|
|OAuth2| √||
|Shared Access Signature (SAS)| √| √|
|Service Principal|√||
|Organizational account||√|

>[!Note]
>For the Azure Blob Storage connection of gen2 dataflows, go to this article.

## Prerequisites

To get started, you must have following prerequisites:

* A tenant account with an active subscription. Create an account for free.

* A workspace is created and that isn't the default **My Workspace**.

## Go to Manage gateways to create a new connection

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon.](./media/connector-common/settings.png) > **Manage connections and gateways.**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page." lightbox="./media/connector-common/add-new-connection.png":::

    The **New connection** pane will show up on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Set up your connection

### Step 1: Specify the connection name, connection type, account, and domain

:::image type="content" source="./media/connector-azure-blob-storage/configure-azure-blob-storage-connection-common.png" alt-text="Screenshot showing new connection page.":::

In the **New connection** pane, choose **Cloud**, and specify the following field:

* **Connection name**: Specify a name for your connection.
* **Connection type**: Select **Azure Blob Storage**.
* **Account**: Enter your Azure Blob Storage account name.
* **Domain**: Enter the domain of Azure Blob Storage: `blob.core.windows.net`.

### Step 2: Select and set your authentication

Under **Authentication** method, select your authentication from the drop-down list and complete the related configuration. The Azure Blob Storage connector supports the following authentication types:

* [Anonymous](#anonymous-authentication)
* [Key](#key-authentication)
* [OAuth2](#oauth2-authentication)
* [Shared Access Signature (SAS)](#shared-access-signature-sas-authentication)
* [Service Principal](#service-principal-authentication)

:::image type="content" source="./media/connector-azure-blob-storage/authentication-method.png" alt-text="Screenshot showing selecting authentication method page.":::

#### Anonymous authentication

Select **Anonymous** under **Authentication method**.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-anonymous.png" alt-text="Screenshot showing Anonymous authentication.":::

#### Key authentication

Specify the account key of your Azure Blob Storage. Go to your Azure Blob Storage account interface, browse to the **Access key** section, and get your account key.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-key.png" alt-text="Screenshot showing Key authentication method.":::

#### OAuth2 authentication

Open **Edit credentials**. You'll see the sign in interface. Enter your account and password to sign in your account. After signing in, go back to the **New connection** page.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-oauth2.png" alt-text="Screenshot showing OAuth2 authentication method.":::

#### Shared Access Signature (SAS) authentication

Specify the shared access signature token (SAS token) to the Storage resources, such as a blob or container.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-shared-access-signature.png" alt-text="Screenshot showing shared access signature authentication method page.":::

If you don’t have a SAS token, switch to **Shared access signature** in your Azure Blob Storage account interface. Under **Allowed resource types**, select **Service**. Then select **Generate SAS and connection string**. You can get your SAS token from the **SAS token** that's displayed.

The shared access signature is a URI that encompasses in its query parameters all the information necessary for authenticated access to a storage resource. To access storage resources with the shared access signature, the client only needs to pass in the shared access signature to the appropriate constructor or method.

For more information about shared access signatures, go to [Shared access signatures: Understand the shared access signature model](/azure/storage/common/storage-sas-overview).

#### Service principal authentication

:::image type="content" source="./media/connector-azure-blob-storage/authentication-service-principal.png" alt-text="Screenshot showing Service Principal authentication method page.":::

* **Tenant Id**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering over the upper-right corner of the Azure portal.
* **Service principal ID**: Specify the application's client ID.
* **Service principal key**: Specify your application's key.

To use service principal authentication, follow these steps:

1. Register an application entity in Azure Active Directory (Azure AD) by following [Register your application with an Azure AD tenant](/azure/storage/common/storage-auth-aad-app?tabs=dotnet#register-your-application-with-an-azure-ad-tenant). Make note of these values, which you use to define the linked service:

   * Tenant ID
   * Application ID
   * Application key

2. Grant the service principal proper permission in Azure Blob Storage. For more information on the roles, go to [Use the Azure portal to assign an Azure role for access to blob and queue data](/azure/storage/blobs/assign-azure-role-data-access?tabs=portal).

   * **As source**, in **Access control (IAM)**, grant at least the **Storage Blob Data Reader** role.
   * **As sink**, in **Access control (IAM)**, grant at least the **Storage Blob Data Contributor** role.

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors.

:::image type="content" source="./media/connector-azure-blob-storage/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following connector properties in the table are supported in data pipeline copy and dataflow gen2.

|Name|Description|Required|Property|Copy/<br/>Dataflow gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes| |✓/✓|
|**Connection type**|Select a type for your connection. Select **Azure Blob Storage**.|Yes| |✓/✓|
|**Account**|Azure Blob Storage account name.|Yes||✓/✓|
|**Domain**|The domain of Azure Blob Storage: `blob.core.windows.net`.|Yes| |✓/✓|
|**Authentication**|Go to [Authentication](#authentication). |Yes||Go to [Authentication](#authentication).|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**.|Yes||✓/✓|

### Authentication

The following properties in the table are the supported authentication types.

|Name |Description |Required |Property |Copy/<br/>Dataflow gen2 |
|-----|-----|-----|-----|-----|
|**Anonymous**||||✓/✓|
|**Key**||||✓/✓|
|- Account key|The account key of the Azure Blob Storage.|Yes |||
|**OAuth2**||||✓/-|
|**Shared Access Signature (SAS)**||||✓/✓|
|- SAS token|The shared access signature token to the Storage resources, such as a blob or container.|Yes |||
|**Service Principal**||||✓/-|
|- Tenant ID|The tenant information (domain name or tenant ID).|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||
|**Organizational account**||||-/✓|

## Next steps

[Copy data in Azure Blob Storage](connector-azure-blob-storage-copy-activity.md)
