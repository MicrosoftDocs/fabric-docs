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

In Microsoft Fabric, workspace identity authentication works with OneLake shortcuts, pipelines, semantic models, and Dataflows Gen2 (CI/CD). This example article shows you how to use workspace identity to connect to Azure Data Lake Storage Gen2 through a pipeline.

## Supported data sources

The workspace identity authentication type currently supports these data sources:

- Azure Blob Storage
- Azure Cosmos DB for NoSQL
- Azure Data Explorer
- Azure Data Lake Storage Gen2
- Azure Table Storage
- Azure SQL Database
- Azure Synapse Analytics
- Dataverse
- Dynamics 365
- Dynamics AX
- Dynamics CRM
- SharePoint Online List

## Prerequisites

1. You must be a workspace admin to be able to [create and manage a workspace identity](../security/workspace-identity#create-and-manage-a-workspace-identity). The workspace you're creating the identity for can't be **My Workspace**.

1. [Grant the identity permissions](../security/workspace-identity-authenticate#step-2-grant-the-identity-permissions-on-the-storage-account) to access your data source.

## Connect to your data using workspace identity in a pipeline

1. Go to [Fabric](https://app.fabric.microsoft.com/?pbi_source=learn-data-factory-workspace-identity).

1. Create a new pipeline or edit an existing one where you want to add the data source.

1. Select the data source to authenticate using workspace identity. In this example, you're connecting to an Azure Data Lake Storage Gen2 account.

1. Fill in the data source **URL**, and then select **Create new connection**.

1. Change **Authentication kind** to **Workspace identity**.

   :::image type="content" source="media/workspace-identity/set-authentication-kind.png" alt-text="Screenshot of the Connect to data source window with the authentication kind set to Workspace identity." lightbox="media/workspace-identity/set-authentication-kind.png":::

1. Select **Next** in the connection settings to authenticate to the data source.
