---
title: Workspace identity support in Data Factory
description: Learn how to use workspace identity authentication to access your data sources in Data Factory.
ms.reviewer: jianleishen
ms.topic: concept-article
ms.date: 05/09/2026
ms.custom: configuration, sfi-image-nochange
ai-usage: ai-assisted
---

# Workspace identity support in Data Factory

A Fabric workspace identity is an automatically managed service principal that can be associated with a Fabric workspace. Fabric workspaces with a workspace identity can securely read or write to firewall-enabled Azure Data Lake Storage Gen2 accounts through OneLake shortcuts and pipelines. For more information, see [Workspace identity](../security/workspace-identity.md).

In Microsoft Fabric, workspace identity authentication works with OneLake shortcuts, pipelines, semantic models, and Dataflows Gen2 (CI/CD). This example article shows you how to use workspace identity to connect to Azure Data Lake Storage Gen2 in Fabric Data Factory.

## Supported data sources

The workspace identity authentication type currently supports these data sources:

- [Access database](connector-access-database-overview.md)
- [Azure Analysis Services](connector-azure-analysis-services-overview.md)
- [Azure Blob Storage](connector-azure-blob-storage-overview.md)
- [Azure Cosmos DB for NoSQL](connector-azure-cosmosdb-for-nosql-overview.md)
- [Azure Data Explorer](connector-azure-data-explorer-overview.md)
- [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-overview.md)
- [Azure SQL Database](connector-azure-sql-database-overview.md)
- [Azure Synapse Analytics](connector-azure-synapse-analytics-overview.md)
- [Azure Table Storage](connector-azure-table-storage-overview.md)
- [Dataverse](connector-dataverse-overview.md)
- Dynamics 365
- [Dynamics AX](connector-dynamics-ax-overview.md)
- [Dynamics CRM](connector-dynamics-crm-overview.md)
- [SharePoint folder](connector-sharepoint-folder-overview.md)
- [SharePoint Online List](connector-sharepoint-online-list-overview.md)
- [SharePoint Online File](connector-sharepoint-online-file-overview.md)
- [SQL Server database](connector-sql-server-database-overview.md)
- [Web](connector-web-overview.md)

## Prerequisites

- You must be a workspace admin to be able to [create and manage a workspace identity](../security/workspace-identity.md#create-and-manage-a-workspace-identity). The workspace you're creating the identity for can't be **My Workspace**.

- [Grant the identity permissions](../security/workspace-identity-authenticate.md#step-2-grant-the-identity-permissions-on-the-storage-account) to access your data source.

## Connect to your data using workspace identity

1. Go to [Fabric](https://app.fabric.microsoft.com/?pbi_source=learn-data-factory-workspace-identity).

1. Create a new Data Factory item (such as Dataflow Gen2, pipeline, or copy job), or edit an existing one where you want to add a data source or destination.

1. Select the source or destination connection that you want to authenticate by using workspace identity. In this example, you connect to an Azure Data Lake Storage Gen2 account.

1. Enter the connection details, and then select **Create new connection**.

1. Change **Authentication kind** to **Workspace identity**.

   :::image type="content" source="media/workspace-identity/set-authentication-kind.png" alt-text="Screenshot of the Connect to data source window with the authentication kind set to Workspace identity." lightbox="media/workspace-identity/set-authentication-kind.png":::

1. Select **Next** in the connection settings to authenticate to the data source or destination.
