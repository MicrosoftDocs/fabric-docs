---
title: Service principal support in Data Factory 
description: Learn about how to use the service principal authentication type to access your data sources.
author: ptyx507x
ms.author: miescobar
ms.reviewer: dougklo
ms.topic: conceptual
ms.date: 1/16/2024
---

# Service principal support in Data Factory

Azure service principal (SPN) is a security identity that's application based and can be assigned permissions to access your data sources. Service principals are used to safely connect to data, without a user identity. To learn more about service principals, go to [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals).

Within Microsoft Fabric, service principal authentication is supported in datasets, dataflows (both Dataflow Gen1 and Dataflow Gen2), and datamarts.  

## Supported data sources

Currently, the SPN authentication type only supports the following data sources:  

* Azure Data Lake Storage
* Azure Data Lake Storage Gen2
* Azure Blob Storage
* Azure Synapse Analytics
* Azure SQL Database
* Dataverse
* SharePoint online
* Web

> [!NOTE]
> Service principal isn't supported on the on-premises data gateway and virtual network data gateway.  
>
> Service principal authentication isn't supported for a SQL data source with Direct Query in datasets.

## How to use service principals to connect to your data in Dataflow Gen2

In this example, you can use service principal to connect to Azure Data Lake Storage Gen2 through Dataflow Gen2.  

### Prerequisite

1. Create a service principal [using Azure](/entra/identity-platform/howto-create-service-principal-portal).

2. Grant permission for the application to have read access to the data source. For example, if you're using a data lake, make sure the application has [storage blob data reader](/azure/role-based-access-control/built-in-roles#storage-blob-data-reader) access.

### Connect to your data using service principal in Dataflow Gen2

1. Navigate to [Fabric](https://app.fabric.microsoft.com/).

2. Create a new Dataflow Gen2 or edit an existing one where you would like to add the data source.  

3. Select the data source to authenticate using SPN. In this example, you're connecting to an Azure Data Lake Storage Gen2 account.  

4. Fill in the data source **URL** and select **Create new connection**.

5. Change **Authentication kind** to **Service principal**.

   :::image type="content" source="media/service-principals/set-authentication-kind.png" alt-text="Screenshot of the Connect to data source window with the authentication kind set to Service principal." lightbox="media/service-principals/set-authentication-kind.png":::

6. Fill in the **Tenant ID** in the connection settings. You can find the tenant ID in Azure where the SPN was created.

   :::image type="content" source="media/service-principals/azure-tenant-id.png" alt-text="Screenshot emphasizing where to find the tenant ID in Azure." lightbox="media/service-principals/azure-tenant-id.png":::

7. Fill in the **Service principal client ID** in the connection settings. You can find the client ID in Azure where the SPN was created.

   :::image type="content" source="media/service-principals/azure-client-id.png" alt-text="Screenshot emphasizing where to find the client ID in Azure." lightbox="media/service-principals/azure-client-id.png":::

8. Fill in the **Service principal key** in the connection settings. You can find the service principal key in Azure where the SPN was created.

   :::image type="content" source="media/service-principals/service-principal-key.png" alt-text="Screenshot emphasizing where to find the service principal key in Azure." lightbox="media/service-principals/service-principal-key.png":::

9. Finally, select **Next** in the connection settings to authenticate to the data source.
