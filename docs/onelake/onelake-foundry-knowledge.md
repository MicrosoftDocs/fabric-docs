---
title: OneLake for Microsoft Foundry
description: Use OneLake data as a knowledge base for AI agents in Microsoft Foundry
ms.reviewer: mideboer
ms.author: kgremban
author: kgremban
ms.topic: concept-article
ms.custom:
ms.date: 11/17/2025
#customer intent: As a data engineer, I want to make my enterprise data available for AI agents while still maintaining permissions and governance control over it.
---

# Use OneLake files in Microsoft Foundry

Use Microsoft OneLake as a knowledge source for Microsoft Foundry. You can connect directly and securely to OneLake from Foundry, index unstructured and semi structured files stored in OneLake (including files that arrive through shortcuts), and then use that indexed content as a knowledge source inside agents in Foundry.

With this integration, you can ground your agents on the same enterprise data that already lives in OneLake, instead of creating new copies of files in separate AI specific stores. Permissions and governance are enforced through the same OneLake and Fabric controls that you use for analytics workloads.

## Prerequisites

* A lakehouse in Fabric. If you don't have a lakehouse, follow the steps in [Create a lakehouse with OneLake](./create-lakehouse-onelake.md).

  * Files in the **Files** folder of the lakehouse.

* A Foundry project. If you don't have one, follow the steps in [Create a project](/azure/ai-foundry/how-to/create-projects?view=foundry).

* An Azure AI Search service at the Basic tier or higher. If you don't have one, follow the steps in [Create an Azure AI Search service](/azure/search/search-create-service-portal).

  * In this article, you create an assign a managed identity for the search service. To create a managed identity, you must be an Owner or User Access Administrator roles. To assign roles, you must be an Owner, User Access Administrator, Role-based Access Control Administrator, or a member of a custom role with Microsoft.Authorization/roleAssignments/write permissions.

## Configure search service

Give the AI Search resource access to your Fabric workspace. Add the AI Search system identity to the Fabric workspace by following the steps in [OneLake indexer > Grant permissions](azure/search/search-how-to-index-onelake-files#grant-permissions).

## Create a OneLake connection in Foundry

1. Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs). Make sure the **New Foundry** toggle is **On**. These steps refer to [Microsoft Foundry (new)](/azure/ai-foundry/what-is-azure-ai-foundry?view=foundry).

1. Open the project that you want to work in.

1. Select **Build** from the navigation menu.

1. Select **Knowledge** from the left pane.

   :::image type="content" source="./media/onelake-foundry-knowledge/select-knowledge.png" alt-text="Screenshot that shows selecting the Knowledge tab from the Foundry Build menu.":::

1. Select your AI Search resource.

   :::image type="content" source="./media/onelake-foundry/connect-ai-search.png" alt-text="Screenshot that shows connecting your agent to an Azure AI Search resource.":::

1. Select **Create a knowledge base**.

1. Select **Microsoft OneLake** as the knowledge type. Select **Connect**.

1. For **Knowledge sources**, select **Create new** then select **Microsoft OneLake**.

   :::image type="content" source="./media/onelake-foundry-knowledge/knowledge-sources-create-new.png" alt-text="Screenshot that shows creating a new Microsoft OneLake knowledge source.":::

1. Provide your Fabric workspace ID and lakehouse ID.

   You can retrieve both of these IDs from your lakehouse URL: `https://app.powerbi.com/groups/<WORKSPACE_ID>/lakehouses/<LAKEHOUSE_ID>`.

1. Select **Create**.

1. Select **Save knowledge base**. 