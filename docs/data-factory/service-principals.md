---
title: Service principal support in Data Factory
description: Learn about how to use the service principal authentication type to access your data sources.
ms.reviewer: makromer
ms.topic: concept-article
ms.date: 07/28/2025
ms.custom: configuration, sfi-image-nochange
ai-usage: ai-assisted
---

# Service principal support in Data Factory

Azure service principal (SPN) is a security identity that's based on applications. Service principals help you connect to data safely, without using a user identity. To learn more about service principals in general, go to [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals).

In Microsoft Fabric, service principal authentication works with datasets, dataflows (both Dataflow Gen1 and Dataflow Gen2), and datamarts. You can also use SPNs to authenticate your on-premises and virtual network data gateway connections. This example article shows you how to use service principal to connect to Azure Data Lake Storage Gen2 through Dataflow Gen2.  

## Supported data sources

The SPN authentication type currently supports these data sources:

* Azure Data Lake Storage
* Azure Data Lake Storage Gen2
* Azure Blob Storage
* Azure Synapse Analytics
* Azure SQL Database
* Dataverse
* SharePoint online
* Web

> [!NOTE]
>
> Service principal authentication isn't supported for SQL data sources that use Direct Query in datasets.

## Prerequisites

1. Create a service principal [using Azure](/entra/identity-platform/howto-create-service-principal-portal).

1. Give the application permission to read data from your data source. For example, if you're using a data lake, make sure the application has [storage blob data reader](/azure/role-based-access-control/built-in-roles#storage-blob-data-reader) access.

## Connect to your data using service principal in Dataflow Gen2

1. Go to [Fabric](https://app.fabric.microsoft.com/?pbi_source=learn-data-factory-service-principals).

1. Create a new Dataflow Gen2 or edit an existing one where you'd like to add the data source.

1. Select the data source to authenticate using SPN. In this example, you're connecting to an Azure Data Lake Storage Gen2 account.

1. Fill in the data source **URL** and select **Create new connection**.

1. Change **Authentication kind** to **Service principal**.

   :::image type="content" source="media/service-principals/set-authentication-kind.png" alt-text="Screenshot of the Connect to data source window with the authentication kind set to Service principal." lightbox="media/service-principals/set-authentication-kind.png":::

1. Fill in the **Tenant ID** in the connection settings. You can find the tenant ID in Azure where the SPN was created.

   :::image type="content" source="media/service-principals/azure-tenant-id.png" alt-text="Screenshot emphasizing where to find the tenant ID in Azure." lightbox="media/service-principals/azure-tenant-id.png":::

1. Fill in the **Service principal client ID** in the connection settings. You can find the client ID in Azure where the SPN was created.

   :::image type="content" source="media/service-principals/azure-client-id.png" alt-text="Screenshot emphasizing where to find the client ID in Azure." lightbox="media/service-principals/azure-client-id.png":::

1. Fill in the **Service principal key** in the connection settings. You can find the service principal key in Azure where the SPN was created.

   :::image type="content" source="media/service-principals/service-principal-key.png" alt-text="Screenshot emphasizing where to find the service principal key in Azure." lightbox="media/service-principals/service-principal-key.png":::

1. Select **Next** in the connection settings to authenticate to the data source.
