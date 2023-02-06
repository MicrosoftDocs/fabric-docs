---
title: How to create Azure Blob Storage connection
description: This article provides information about how to How to create Azure Blob Storage connection.
author: lrtoyou1223
ms.author: lle
ms.topic: how-to
ms.date: 01/03/2023
ms.custom: template-how-to
---

# How to create Azure Blob Storage connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

[Azure Blob storage](/azure/storage/blobs/storage-blobs-introduction) is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data. This article outlines the steps to create Azure Blob Storage connection. 

## Supported authentication types

This Azure Blob Storage connector supports the following authentication types for copy and dataflow Gen2 respectively.  

|Authentication type |Copy  |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous | √| √|
|Key| √| √|
|OAuth2| √||
|Shared Access Signature (SAS)| √| √|
|Service Principal|√||
|Organizational account||√|

>[!Note]
>For the Azure Blob Storage connection of Dataflow Gen2, see this article.

## Prerequisites

To get started, you must complete the following prerequisites:  

* A tenant account with an active subscription. Create an account for free.  

* A workspace is created and isn’t the default My Workspace.

## Go to Manage gateways to create a new connection

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHoSURBVDhPfVI9SEJRFH5q9idRghhRBoH5hgz62QyKRAqHhiZraqogMBoKgiyQnLK1IYPWFCopIY20JbSWTNOh1xL0clAqK7A0M/ue91kG0ccZzvnud+4959wjyOfzVBEBJuEI3Nw+pJyzWoTD1uNmmcSgadHQciIAfhKs+1F36G5CRyNNragDE2WfIAU/qVOBJzIKCQT+q/jC1jmcp1RGadyGwUFo3Dw7CLIFCQcuYWUv4mfiONaaPYQtRb/ZHbl9xHU2L4NQNDA6ZfMx6ffcqiuKd9UKKf90ERVikWU3nM7m7IGbHlouwIsodETTwp9TlMke9IRicPSdTcuGTkICSEB7wiibPGUSz6/vhIX65S3rWxqEgUTHhIfPy1AWekCLhYLz370SlPLrR1dwhMiurRaTa/4H+/CKF0RhSW/m49M+01cpFoFNPKcPQzFUDx/lYQZadQP8sT6lOxSz7F4KFTIJmq6tLucuoSjLSFdNlbh73gUjIeEhgEzf0SjAgE2OYA9djwmM61Sl4yLAcDa811C7L+6cc1q+afwlfgd/VOjwF0DiUmII/16N1ukdGBkXyNLVKOMf5lYtif9qb5b6mcTsUBuYRccFKgGJnSUa4Nd6I8fmvWbvU1ytmMzaCXqd0Kl+9oWivgAsYHfccfep7QAAAABJRU5ErkJggg==) > **Manage connections and gateways.** 

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source. 

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::
    
    The **New connection** pane will show up on the left side of the page.
       
    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane.":::

## Set up your connection

### Step 1: Specify the connection name, connection type, account and domain

:::image type="content" source="./media/connector-azure-blob-storage/configure-azure-blob-storage-connection-common.png" alt-text="Screenshot showing new connection page.":::

In the **New connection** pane, choose **Cloud**, and specify the following field:
- **Connection name**: Specify a name for your connection. 
- **Connection type**: Select **Azure Blob Storage**.
- **Account**: Enter your Azure Blob Storage account name.
- **Domain**: Enter the domain of Azure Blob Storage: `blob.core.windows.net`.

### Step 2: Select and set your authentication

Under **Authentication** method, select your authentication from the drop-down list and complete the related configuration. This Blob storage connector supports the following authentication types.

- [Anonymous](#anonymous-authentication)
- [Key](#key-authentication)
- [OAuth2](#oauth2-authentication)
- [Shared Access Signature (SAS)](#shared-access-signature-sas-authentication)
- [Service Principal](#service-principal-authentication)

:::image type="content" source="./media/connector-azure-blob-storage/authentication-method.png" alt-text="Screenshot showing selecting authentication method page.":::


#### Anonymous authentication

Select **Anonymous** under **Authentication method**.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-anonymous.png" alt-text="Screenshot showing Anonymous authentication.":::

#### Key authentication

- **Account key**: Specify the account key of your Azure Blob Storage. Go to your Azure Blob Storage account interface, browse to **Access key** section and get your account key. 

:::image type="content" source="./media/connector-azure-blob-storage/authentication-key.png" alt-text="Screenshot showing Key authentication method.":::

#### OAuth2 authentication

Open **Edit credentials**. You will see the sign in interface. Enter your account and password to sign in your account. After signed in, you will come back to the **New connection** page. 

:::image type="content" source="./media/connector-azure-blob-storage/authentication-oauth2.png" alt-text="Screenshot showing OAuth2 authentication method.":::

#### Shared Access Signature (SAS) authentication

- **SAS token**: Specify the shared access signature token to the Storage resources such as blob or container. 

:::image type="content" source="./media/connector-azure-blob-storage/authentication-shared-access-signature.png" alt-text="Screenshot showing shared access signature authentication method page.":::

If you don’t have a SAS token, switch to **Shared access signature** in your Azure Blob Storage account interface. Under **Allowed resource types**, select **Service**, and then select **Generate SAS and connection string**. You can get your SAS token in the content shown up.

The shared access signature is a URI that encompasses in its query parameters all the information necessary for authenticated access to a storage resource. To access storage resources with the shared access signature, the client only needs to pass in the shared access signature to the appropriate constructor or method.

For more information about shared access signatures, see [Shared access signatures: Understand the shared access signature model](/azure/storage/common/storage-sas-overview).

#### Service Principal authentication

:::image type="content" source="./media/connector-azure-blob-storage/authentication-service-principal.png" alt-text="Screenshot showing Service Principal authentication method page.":::

- **Tenant Id**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering over the upper-right corner of the Azure portal.
- **Service principal ID**: Specify the application's client ID.
- **Service principal key**: Specify your application's key.


To use service principal authentication, follow these steps:

1. Register an application entity in Azure Active Directory (Azure AD) by following [Register your application with an Azure AD tenant](/azure/storage/common/storage-auth-aad-app?tabs=dotnet#register-your-application-with-an-azure-ad-tenant). Make note of these values, which you use to define the linked service:

    - Tenant ID
    - Application ID
    - Application key
   

2. Grant the service principal proper permission in Azure Blob Storage. For more information on the roles, see [Use the Azure portal to assign an Azure role for access to blob and queue data](/azure/storage/blobs/assign-azure-role-data-access?tabs=portal).

    - **As source**, in **Access control (IAM)**, grant at least the **Storage Blob Data Reader** role.
    - **As sink**, in **Access control (IAM)**, grant at least the **Storage Blob Data Contributor** role.


### Step 3: Specify the privacy level that you want to apply

In the General tab, under select the privacy level that you want apply in Privacy level drop-down list. Three privacy levels are supported. For more information, see privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors. 

:::image type="content" source="./media/connector-azure-blob-storage/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following connector properties in the table are supported in pipeline copy and Dataflow gen2.

|Name|Description|Required|Property|Copy/Dataflow gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes| |✓/✓|
|**Connection type**|Select a type for your connection. Here select **Azure Blob Storage**.|Yes| |✓/✓|
|**Account**|Azure Blob Storage account name.|Yes||✓/✓|
|**Domain**|The domain of Azure Blob Storage: `blob.core.windows.net`.|Yes| |✓/✓|
|**Authentication**|See [Authentication](#authentication) |Yes||See [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓/✓|

### Authentication

The following properties in the table are the supported authentication type.

|Name |Description |Required |Property |Copy/Dataflow gen2 |
|-----|-----|-----|-----|-----|
|**Anonymous**||||✓/✓|
|**Key**||||✓/✓|
|- Account key|The account key of the Azure Blob Storage.|Yes |||
|**OAuth2**||||✓/-|
|**Shared Access Signature (SAS)**||||✓/✓|
|- SAS token|The shared access signature token to the Storage resources such as blob or container.|Yes |||
|**Service Principal**||||✓/-|
|- Tenant ID|The tenant information (domain name or tenant ID).|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||
|**Organizational account**||||-/✓|

## Next steps

[Copy data in Azure Blob Storage](connector-azure-blob-storage-copy-activity.md)

