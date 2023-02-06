---
title: How to create Azure Data Lake Storage Gen2 connection
description: This article provides information about how to do create Azure Data Lake Storage Gen2 connection in Trident.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 12/26/2022
ms.custom: template-how-to
---

# How to create Azure Data Lake Storage Gen2 connection

This article outlines the steps to create Azure Date Lake Storage Gen2 connection.

## Supported authentication types

This Azure Date Lake Storage Gen2 connector supports the following authentication types for copy and dataflow Gen2 respectively.  

|Authentication type |Copy  |Dataflow Gen2 |
|:---|:---|:---|
|Key| √| √|
|OAuth2| √||
|Shared Access Signature (SAS)| √| √|
|Service Principal|√||

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

## Setup your connection

### Step 1: Specify the new connection name, type, server and full path.  

   :::image type="content" source="media/connectors-adlsgen2/connection-details.png" alt-text="Screenshot showing how to set new connection":::

   **Server**: Specify the server of your Azure Data Lake Storage Gen2. Go to your Azure Data Lake Storage Gen2 account interface, browse to **Endpoints** section and get your Data Lake Storage Gen2.

In the **New connection** pane, choose **Cloud**, and specify the following field:

**Connection name**: Specify a name for your connection.<br>
**Connection type**: Select a type for your connection.<br>
**Server**: Enter the server of Azure Data Lake Storage Gen2: `https://contosoadlscdm.dfs.core.windows.net`.<br>
**Full path**: Enter the full path of Azure Data Lake Storage Gen2: Your container name.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. This Azure Data Lake Storage connector supports the following authentication types.  

[Key](connector-azure-data-lake-storage-gen2.md#key-authentication)<br>
[OAuth2](connector-azure-data-lake-storage-gen2.md#oauth2-authentication)<br>
[Shared Access Signature](connector-azure-data-lake-storage-gen2.md#shared-access-signature-authentication)<br>
[Service Principal](connector-azure-data-lake-storage-gen2.md#service-principal-authentication)

:::image type="content" source="media/connectors-adlsgen2/authentication-method.png" alt-text="Screenshot showing that authentication method of data lake gen2":::

#### Key authentication

* **Account key**: Specify the account key of your Azure Data Lake Storage Gen2. Go to your Azure Data Lake Storage Gen2 account interface, browse to **Access key** section and get your account key.

    :::image type="content" source="media/connectors-adlsgen2/key-authentication.png" alt-text="Screenshot showing that key authentication method of data lake gen2":::

#### OAuth2 authentication

:::image type="content" source="media/connectors-adlsgen2/oauth2-authentication.png" alt-text="Screenshot showing that OAuth2 authentication method of data lake gen2":::

Open **Edit credentials**. You will see log in interface. Enter your account and password to log in your account. After logged in, you will come back to the **New connection** page.

#### Shared Access Signature authentication

:::image type="content" source="media/connectors-adlsgen2/sas-authentication.png" alt-text="Screenshot showing that Shared Access Signature authentication method of data lake gen2":::

* **SAS token**: Specify the shared access signature token for your Azure Data Lake Storage Gen2 container.  

If you don’t have a SAS token, switch to **Shared access signature** in your Azure Data Lake Gen2 Storage account interface. Under **Allowed resource types**, select **Container**, and then select **Generate SAS and connection string**. You can get your SAS token in the content shown up.
The shared access signature is a URI that encompasses in its query parameters all the information necessary for authenticated access to a storage resource. To access storage resources with the shared access signature, the client only needs to pass in the shared access signature to the appropriate constructor or method.
For more information about shared access signatures, see [Shared access signatures: Understand the shared access signature model](/azure/storage/common/storage-sas-overview).

#### Service Principal authentication

:::image type="content" source="media/connectors-adlsgen2/service-principal.png" alt-text="Screenshot showing that Service Principal authentication method of data lake gen2":::

* **Tenant Id**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering over the upper-right corner of the Azure portal.
* **Service principal ID**: Specify the application (client) ID.
* **Service principal key**: Specify your application's key.

To use service principal authentication, follow these steps:

1.	Register an application entity in Azure Active Directory (Azure AD) by following [Register your application with an Azure AD tenant](/azure/storage/common/storage-auth-aad-app?tabs=dotnet#register-your-application-with-an-azure-ad-tenant). Make note of these values, which you use to define the linked service:
      - Tenant ID
      - Application ID
      - Application key

1. Grant the service principal proper permission. See examples on how permission works in Data Lake Storage Gen2 from [Access control lists on files and directories](/azure/storage/blobs/data-lake-storage-access-control#access-control-lists-on-files-and-directories)
      - **As source**, in Storage Explorer, grant at least **Execute** permission for ALL upstream folders and the file system, along with **Read** permission for the files to copy. Alternatively, in Access control (IAM), grant at least the **Storage Blob Data Reader** role.
      - **As sink**, in Storage Explorer, grant at least **Execute** permission for ALL upstream folders and the file system, along with **Write** permission for the sink folder. Alternatively, in Access control (IAM), grant at least the **Storage Blob Data Contributor** role.
    
    > [!NOTE]
    > If you use UI to author and the service principal is not set with "Storage Blob Data Reader/Contributor" role in IAM, when doing test connection or browsing/navigating folders, choose "Test connection to file path" or "Browse from specified path", and specify a path with **Read + Execute** permission to continue.


### Step 3: Specify the privacy level that you want to apply.

In the **General** tab, under select the privacy level that you want apply in **Privacy level** drop-down list. Three privacy levels are supported. For more information, see General.

:::image type="content" source="media/connectors-adlsgen2/privacy-level.png" alt-text="Screenshot showing that Privacy Level of data lake gen2":::

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors.

:::image type="content" source="./media/connectors-adlsgen2/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following connector properties in the table are supported in pipeline copy and Dataflow gen2:

|Name|Description|Required|Property|Copy/Dataflow gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓/✓|
|**Connection type**|Select a type for your connection.|Yes||✓/✓|
|**Server**|Enter the server of Azure Data Lake Storage Gen2: `https://contosoadlscdm.dfs.core.windows.net`.|Yes||✓/✓|
|**Full path**|Enter the full path of Azure Data Lake Storage Gen2: Your container name.
|Yes||✓/✓|
|**Authentication**|See Authentication |Yes|See [Authentication](#authentication)|See Authentication|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are Organizational, Privacy, Public|Yes||✓/✓|

### Authentication

The following properties in the table are the supported authentication type.

|Name|Description|Required|Property|Copy/Dataflow gen2|
|:---|:---|:---|:---|:---|
|**Key**||||✓/✓|
|- Account key|The account key of the Azure Data Lake Gen2 Storage|Yes |||
|**Shared Access Signature (SAS)**||||✓/✓|
|- SAS token|Specify the shared access signature token for your Azure Data Lake Storage Gen2 container.|Yes |||
|**Service Principal**||||✓/✓|
|- Tenant ID|The tenant information (domain name or tenant ID)|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||

## Next steps

- [How to create Azure Data Lake Gen2 Storage connection](connector-azure-data-lake-storage-gen2.md)