---
title: Set up your Azure Data Lake Storage Gen2 connection
description: This article provides information about how to set up an Azure Data Lake Storage Gen2 connection
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 09/16/2024
ms.custom:
- template-how-to
- connectors
- sfi-image-nochange
---

# Set up your Azure Data Lake Storage Gen2 connection

This article outlines the steps to create an Azure Date Lake Storage Gen2 connection.

## Supported authentication types

The Azure Date Lake Storage Gen2 connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| √| √|
|Organizational account| √| √|
|Service Principal|√||
|Shared Access Signature (SAS)| √| √|
|Workspace Identity| √||

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure Data Lake Storage Gen2. The following links provide the specific Power Query connector information you need to connect to Azure Data Lake Storage Gen2 in Dataflow Gen2:

- To get started using the Azure Data Lake Storage Gen2 connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Azure Data Lake Storage Gen2 prerequisites](/power-query/connectors/data-lake-storage#prerequisites) before connecting to the Azure Data Lake Storage Gen2 connector.
- To connect to the Azure Data Lake Storage Gen2 connector from Power Query, go to [Connect to Azure Data Lake Storage Gen2 from Power Query Online](/power-query/connectors/data-lake-storage#connect-to-azure-data-lake-storage-gen2-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

To create a connection in a data pipeline:

1. From the page header in Data Integration service, select **Settings** :::image type="icon" source="./media/connector-common/settings.png"::: > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the new page." lightbox="./media/connector-common/add-new-connection.png":::

    The **New connection** pane shows up on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the New connection pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Set up your connection in any Fabric item

1. In any Fabric item, select the **Azure Data Lake Storage Gen2** option in the **Get Data** selection, and then select **Connect**.

    :::image type="content" source="./media/connector-common/new-connection-pane-any-fabric-item.png" alt-text="Screenshot showing the Connect to data source page of a Fabric item for Azure Data Lake Storage Gen2 of a Fabric item, with the URL entered.":::

1. In **Connect to data source**, enter the URL to your Azure Data Lake Storage Gen2 account. Refer to [Limitations](/power-query/connectors/data-lake-storage#limitations) to determine the URL to use.

1. Select whether you want to use the file system view or the Common Data Model folder view.

1. If needed, select the on-premises data gateway in **Data gateway** (only supported in Dataflows, Dataflows Gen2, Datamarts, and Semantic Models). 

1. Select **Sign in** to sign into the Azure Data Lake Storage Gen2 account. You'll be redirected to your organization's sign-in page. Follow the prompts to sign in to the account.

1. After you've successfully signed in, select **Next**.

## Set up connections for trusted workspace access

1. Configure a workspace identity in the workspace where the connection will be used. For more information, see [Workspace identity](../security/workspace-identity.md).

1. Grant the workspace identity, organizational account, or service principal access to the storage account. For more information, see [Create a OneLake shortcut to storage account with trusted workspace access](../security/security-trusted-workspace-access.md#create-a-onelake-shortcut-to-storage-account-with-trusted-workspace-access)

1. Configure a resource instance rule. For more information, see [Resource instance rule](../security/security-trusted-workspace-access.md#configure-trusted-workspace-access-in-adls-gen2).

1. Follow steps from [Set up your connection](#set-up-your-connection) to create the connection.

### Considerations and limitations

* Workspace identity, Organizational Account, and Service Principal are the only supported authentication types.
* Connections for trusted workspace access only work in OneLake shortcuts and data pipelines.
* Connections for trusted workspace access can't be created from the **Manage Gateways and connections** experience.
* Existing connections that work for trusted workspace access can't be modified in the **Manage Gateways and connections** experience.
* Connections to firewall-enabled Storage accounts will have the status *Offline* in Manage connections and gateways.
* Checking the status of a connection with workspace identity as the authentication method is not supported.

## Set up your connection

### Step 1: Specify the new connection name, type, server and full path

   :::image type="content" source="media/connector-azure-data-lake-storage-gen2/connection-details.png" alt-text="Screenshot showing how to set a new connection.":::

In the **New connection** pane, choose **Cloud**, and specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select a type for your connection.
- **Server**: Enter your Azure Data Lake Storage Gen2 server name. For example, `https://contosoadlscdm.dfs.core.windows.net`. Specify your Azure Data Lake Storage Gen2 server name. Go to your Azure Data Lake Storage Gen2 account interface, browse to the **Endpoints** section, and get your Azure Data Lake Storage Gen2.
- **Full path**: Enter the full path to your Azure Data Lake Storage Gen2 container name.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The Azure Data Lake Storage Gen2 connector supports the following authentication types:

- [Key](connector-azure-data-lake-storage-gen2.md#key-authentication)
- [OAuth2](connector-azure-data-lake-storage-gen2.md#oauth2-authentication)
- [Shared Access Signature](connector-azure-data-lake-storage-gen2.md#shared-access-signature-authentication)
- [Service Principal](connector-azure-data-lake-storage-gen2.md#service-principal-authentication)
- [Workspace Identity](connector-azure-data-lake-storage-gen2.md#workspace-identity-authentication)

:::image type="content" source="media/connector-azure-data-lake-storage-gen2/authentication-method.png" alt-text="Screenshot showing the authentication method for Azure Data Lake Storage Gen2.":::

#### Key authentication

**Account key**: Specify your Azure Data Lake Storage Gen2 account key. Go to your Azure Data Lake Storage Gen2 account interface, browse to the **Access key** section, and get your account key.

   :::image type="content" source="media/connector-azure-data-lake-storage-gen2/key-authentication.png" alt-text="Screenshot showing that key authentication method for Azure Data Lake Storage Gen2.":::

#### OAuth2 authentication

:::image type="content" source="media/connector-azure-data-lake-storage-gen2/oauth2-authentication.png" alt-text="Screenshot showing that OAuth2 authentication method for Azure Data Lake Storage Gen2.":::

Open **Edit credentials**. The sign-in interface opens. Enter your account and password to sign in to your account. After signing in, you'll come back to the **New connection** page.

#### Shared access signature authentication

:::image type="content" source="media/connector-azure-data-lake-storage-gen2/sas-authentication.png" alt-text="Screenshot showing that shared access signature authentication method for Azure Data Lake Storage Gen2.":::

**SAS token**: Specify the shared access signature token for your Azure Data Lake Storage Gen2 container.  

If you don’t have a SAS token, switch to **Shared access signature** in your Azure Data Lake Storage Gen2 account interface. Under **Allowed resource types**, select **Container**, and then select **Generate SAS and connection string**. You can get your SAS token from the generated content that appears.
The shared access signature is a URI that encompasses in its query parameters all the information necessary for authenticated access to a storage resource. To access storage resources with the shared access signature, the client only needs to pass in the shared access signature to the appropriate constructor or method.
For more information about shared access signatures, go to [Shared access signatures: Understand the shared access signature model](/azure/storage/common/storage-sas-overview).

#### Service principal authentication

:::image type="content" source="media/connector-azure-data-lake-storage-gen2/service-principal.png" alt-text="Screenshot showing that service principal authentication method for Azure Data Lake Storage Gen2.":::

- **Tenant Id**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering over the upper-right corner of the Azure portal.
- **Service principal ID**: Specify the application (client) ID.
- **Service principal key**: Specify your application's key.

To use service principal authentication, follow these steps:

1. Register an application entity in Microsoft Entra ID by following [Register your application with a Microsoft Entra tenant](/azure/storage/common/storage-auth-aad-app?tabs=dotnet#register-your-application-with-an-azure-ad-tenant). Make note of these values, which you use to define the connection:
   - Tenant ID
   - Application ID
   - Application key

2. Grant the service principal proper permission. For examples of how permission works in Azure Data Lake Storage Gen2, go to [Access control lists on files and directories](/azure/storage/blobs/data-lake-storage-access-control#access-control-lists-on-files-and-directories).

   - **As source**, in Storage Explorer, grant at least **Execute** permission for all upstream folders and the file system, along with **Read** permission for the files to copy. Alternatively, in Access control (IAM), grant at least the **Storage Blob Data Reader** role.
   - **As destination**, in Storage Explorer, grant at least **Execute** permission for all upstream folders and the file system, along with **Write** permission for the destination folder. Alternatively, in Access control (IAM), grant at least the **Storage Blob Data Contributor** role.

    > [!NOTE]
    > If you use a UI to author and the service principal isn't set with the "Storage Blob Data Reader/Contributor" role in IAM, when doing a test connection or browsing/navigating folders, choose **Test connection to file path** or **Browse from specified path**, and then specify a path with **Read + Execute** permission to continue.

#### Workspace identity authentication

**Workspace identity**: Select workspace identity from the authentication method dropdown. A Fabric workspace identity is an automatically managed service principal that can be associated with a Fabric workspace. Fabric workspaces with a workspace identity can securely read or write to Azure Data Lake Storage Gen2 accounts through OneLake shortcuts and data pipelines. When selecting this option in the connector, make sure that the workspace has a workspace identity and that the identity has the ability to read or write to the intended Azure Data Lake Storage Gen2 account. For more information, see [Workspace identity](../security/workspace-identity.md)

> [!NOTE]
> Connections with workspace identity will have the status *Offline* in Manage connections and gateways. Checking the status of a connection with workspace identity isn't supported.

### Step 3: Specify the privacy level you want to apply

In the **General** tab, select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to General.

:::image type="content" source="media/connector-azure-data-lake-storage-gen2/privacy-level.png" alt-text="Screenshot showing that Privacy Level of data lake gen2.":::

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-azure-data-lake-storage-gen2/connection.png" alt-text="Screenshot showing connection page." lightbox="./media/connector-azure-data-lake-storage-gen2/connection.png":::

## Table summary

The connector properties in the following table are supported in pipeline copy.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓|
|**Connection type**|Select a type for your connection.|Yes||✓|
|**Server**|Enter the name of Azure Data Lake Storage Gen2 server, for example, `https://contosoadlscdm.dfs.core.windows.net`.|Yes||✓|
|**Full path**|Enter the full path of your Azure Data Lake Storage Gen2 container name.|Yes||✓|
|**Authentication**|Go to [Authentication](#authentication). |Yes|Go to [Authentication](#authentication).|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are Organizational, Privacy, and Public.|Yes||✓|

### Authentication

The properties in the following table are the supported authentication types.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Key**||||✓|
|- Account key|The Azure Data Lake Storage Gen2 account key. |Yes |||
|**Shared Access Signature (SAS)**||||✓|
|- SAS token|Specify the shared access signature token for your Azure Data Lake Storage Gen2 container.|Yes |||
|**Service Principal**||||✓|
|- Tenant ID|The tenant information (domain name or tenant ID).|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||
|**Workspace identity**||||✓|

## Related content

- [Configure Azure Data Lake Storage Gen2 in a copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md)
- [Trusted workspace access](../security/security-trusted-workspace-access.md)
- [Workspace identity](../security/workspace-identity.md)
