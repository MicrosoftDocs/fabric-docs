---
title: Set up your Azure Blob Storage connection
description: This article provides information about how to create an Azure Blob Storage connection.
ms.reviewer: lle
ms.topic: how-to
ms.date: 12/26/2025
ms.custom:
- template-how-to
- connectors
- sfi-image-nochange
---

# Set up your Azure Blob Storage connection

[Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction) is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data. This article outlines the steps to create an Azure Blob Storage connection for pipelines and Dataflow Gen2.

## Supported authentication types

The Azure Blob Storage connector supports the following authentication types for copy and Dataflow Gen2 respectively.

| Authentication type | Copy | Dataflow Gen2 |
| --- | :---: | :---: |
| [Anonymous](#anonymous-authentication) | √ | √ |
| [Account key](#account-key-authentication) | √ | √ |
| [Shared Access Signature (SAS)](#shared-access-signature-sas-authentication) | √ | √ |
| [Organizational account](#organizational-account-authentication) | √ | √ |
| [Service principal](#service-principal-authentication) | √ | √ |

## Set up your connection for Dataflow Gen2

You can connect Dataflow Gen2 to Azure Blobs using Power Query connectors. Follow these steps to create your connection:

1. [Get data in Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. Check [known issues and limitations](/power-query/connectors/azure-blob-storage#limitations) to make sure your scenario is supported.
1. [Connect to Azure Blob Storage from Power Query Online](/power-query/connectors/azure-blob-storage#connect-to-azure-blob-storage-from-power-query-online).

## Set up your connection for a pipeline

The following table contains a summary of the properties needed for a pipeline connection:

| Name | Description | Required | Property | Copy |
| --- | --- | :---: | --- | :---: |
| **Account name or URL** | Azure Blob Storage account name or endpoint. | Yes |  | ✓ |
| **Connection** | Select **Create new connection**. | Yes |  | ✓ |
| **Connection name** | A name for your connection. | Yes |  | ✓ |
| **Authentication kind** | Go to [Authentication](#authentication-instructions). | Yes |  | Go to [Authentication](#authentication-instructions).|

For specific instructions to set up your connection in a pipeline, follow these steps:

1. Browse to the **New connection page** for the data factory pipeline to configure the connection details and create the connection.

   :::image type="content" source="./media/connector-azure-blob-storage/new-connection-page.png" alt-text="Screenshot showing the new connection page." lightbox="./media/connector-azure-blob-storage/new-connection-page.png":::

   You have two ways to browse to this page:

   * In copy assistant, browse to this page after selecting the connector.
   * In pipeline, browse to this page after selecting + New in Connection section and selecting the connector.

1. In the **New connection** pane, specify the following fields:

   * **Account name or URL**: Specify your Azure Blob Storage account name or URL. Browse to the **Endpoints** section in your storage account and the blob service endpoint is the account URL.
   * **Connection**: Select **Create new connection**.
   * **Connection name**: Specify a name for your connection.

   :::image type="content" source="./media/connector-azure-blob-storage/configure-azure-blob-storage-connection-common.png" alt-text="Screenshot showing the common connection setup for Azure Blob Storage.":::

1. Under **Authentication kind**, select your authentication kind from the drop-down list and complete the related configuration. The Azure Blob Storage connector supports the following authentication types:

   * [Anonymous](#anonymous-authentication)
   * [Account key](#account-key-authentication)
   * [Shared Access Signature (SAS)](#shared-access-signature-sas-authentication)
   * [Organizational account](#organizational-account-authentication)
   * [Service principal](#service-principal-authentication)

   :::image type="content" source="./media/connector-azure-blob-storage/authentication-kind.png" alt-text="Screenshot showing selecting authentication kind page.":::

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

## Authentication instructions

This section lists the instructions for each authentication type supported by the Azure Blob Storage connector:

* [Anonymous](#anonymous-authentication)
* [Account key](#account-key-authentication)
* [Shared Access Signature (SAS)](#shared-access-signature-sas-authentication)
* [Organizational account](#organizational-account-authentication)
* [Service principal](#service-principal-authentication)

### Anonymous authentication

Select **Anonymous** under **Authentication** kind.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-anonymous.png" alt-text="Screenshot showing Anonymous authentication.":::

### Account key authentication

Specify the account key of your Azure Blob Storage. Go to your Azure Blob Storage account interface, browse to the **Access key** section, and get your account key.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-account-key.png" alt-text="Screenshot showing account key authentication.":::

### Shared Access Signature (SAS) authentication

Specify the shared access signature token (SAS token) to the storage resources, such as a blob or container.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-shared-access-signature.png" alt-text="Screenshot showing shared access signature authentication page.":::

If you don’t have a SAS token, switch to **Shared access signature** in your Azure Blob Storage account interface. Under **Allowed resource types**, select **Service**. Then select **Generate SAS and connection string**. You can get your SAS token from the **SAS token** that's displayed.

The shared access signature is a URI that encompasses in its query parameters all the information necessary for authenticated access to a storage resource. To access storage resources with the shared access signature, the client only needs to pass in the shared access signature to the appropriate constructor or method.

For more information about shared access signatures, go to [Shared access signatures: Understand the shared access signature model](/azure/storage/common/storage-sas-overview).

#### Organizational account authentication

Select **Sign in**, which displays the sign in interface. Enter your account and password to sign in your organizational account. After signing in, go back to the **New connection** page.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-organizational-account.png" alt-text="Screenshot showing organizational account authentication.":::

Grant the organizational account proper permission in Azure Blob Storage. For more information on the roles, go to [Assign an Azure role for access to blob data](/azure/storage/blobs/assign-azure-role-data-access).

   * **As source**, in **Access control (IAM)**, grant at least the **Storage Blob Data Reader** role.
   * **As destination**, in **Access control (IAM)**, grant at least the **Storage Blob Data Contributor** role.

#### Service principal authentication

You need to specify the tenant ID, service principal client ID, and service principal key when using this authentication.

:::image type="content" source="./media/connector-azure-blob-storage/authentication-service-principal.png" alt-text="Screenshot showing Service principal authentication.":::

* **Tenant ID**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering over the upper-right corner of the Azure portal.
* **Service principal client ID**: Specify the application's client ID.
* **Service principal Key**: Specify your application's key.

To use service principal authentication, follow these steps:

1. Register an application entity in Microsoft Entra ID by following [Authorize access to blobs using Microsoft Entra ID](/azure/storage/blobs/authorize-access-azure-active-directory#register-your-application-with-an-azure-ad-tenant). Make note of these values, which you use to define the connection:

   * Tenant ID
   * Application ID
   * Application key

1. Grant the service principal proper permission in Azure Blob Storage. For more information on the roles, go to [Assign an Azure role for access to blob data](/azure/storage/blobs/assign-azure-role-data-access).

   * **As source**, in **Access control (IAM)**, grant at least the **Storage Blob Data Reader** role.
   * **As destination**, in **Access control (IAM)**, grant at least the **Storage Blob Data Contributor** role.

## Related content

[Configure Azure Blob Storage for pipeline copy activity](connector-azure-blob-storage-copy-activity.md)
