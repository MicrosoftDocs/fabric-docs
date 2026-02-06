---
title: Connect Azure Search Index
description: Connect Data Agents to your Azure Search Index in Azure AI Foundry.
ms.author: jburchel
author: jonburchel
ms.reviewer: midesa
reviewer: midesa
ms.topic: how-to
ms.date: 12/9/2025
---

# Connect Data Agents to your Azure Search Index in Azure AI Foundry

Data Agent creators can now connect their agents directly to Azure AI Search indexes built in Azure AI Foundry, unlocking powerful unstructured data scenarios. Using the resource URL, you can securely connect to your index—Data Agents fully respect the permissions of your Azure AI resources. In Azure AI Foundry, you can craft rich AI Search indexes with custom enrichments, preprocessing logic, and tailored schemas for PDFs, text files, and more. Once connected, Data Agents can reason over that unstructured content and even join insights from your index with your structured data sources, giving you a unified, intelligent view across all your data.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

## Set up your Azure AI Search resource

To connect your Data Agent to an Azure AI Search index, first ensure your search resource is properly configured.

1. **Create an Azure AI Search index.**  
   Use the [Azure AI Search quickstart](/azure/search/search-get-started-portal?pivots=import-data-new) to create an index. You can start with sample data or use your own.

2. **Enable role-based access control.**  
   Turn on role-based authentication for your search service and index. This permission allows the Data Agent to securely access your resource using the identity of the asking user.

    :::image type="content" source="media/byo-ai-search-index/enable-entra-access-search.png" alt-text="Screenshot of enabling role based access control." lightbox="media/byo-ai-search-index/enable-entra-access-search.png":::

3. **Assign the required roles.**  
   Confirm that your user or service principal has the following roles on the Azure AI Search resource:
   - `Search Index Data Contributor`  
   - `Search Index Data Reader`  

    These permissions ensure the Data Agent can read your index and retrieve relevant content.

4. **Retrieve the resource URL.**  
   Copy the resource URL for your Azure AI Search service. You need this value when adding the connection in your Data Agent configuration.

    :::image type="content" source="media/byo-ai-search-index/get-resource-url.png" alt-text="Screenshot of the Azure AI Search resource URL." lightbox="media/byo-ai-search-index/get-resource-url.png":::

> [!TIP]  
> The Data Agent can include citations so you can see which documents were used to generate a response. Citations appear in the user experience only if at least one of the following fields is present (case-sensitive): `url`, `sourceUrl`, `filePath`, `path`, or `folderPath`.  
>
> To ensure citations display correctly in the Data Agent, you may want to include one of these fields in your index schema.

## Connect index to data agent

1. Go to the **Data** tab and select **Add AI Search Index**.

   :::image type="content" source="media/byo-ai-search-index/connect-ai-search-data-tab.png" alt-text="Screenshot of the Data tab in the Data Agent." lightbox="media/byo-ai-search-index/connect-ai-search-data-tab.png":::

2. Provide your **resource URL** when prompted.

   :::image type="content" source="media/byo-ai-search-index/connect-ai-search-resource-url.png" alt-text="Screenshot of the Data Agent resource URL input." lightbox="media/byo-ai-search-index/connect-ai-search-resource-url.png":::

3. Ask a question such as **"Tell me more about the Uptown Chic hotel"** to query your index.

    :::image type="content" source="media/byo-ai-search-index/agent-response-ai-search.png" alt-text="Screenshot of the Data Agent response." lightbox="media/byo-ai-search-index/agent-response-ai-search.png":::

4. View the **documents used** to generate the answer through the reasoning steps.

> [!NOTE]  
> When a user asks a question, the Data Agent sends the user's identity to the Azure AI Search index. This permission ensures that access controls and permissions defined on the index are respected.

## Configure the index in your Data Agent

You can configure how your Data Agent uses your AI Search index. You can provide context about the source, give instructions on which fields to reference, and adjust parameters that control how much context is returned.

### Context

Use this field to describe your AI Search index. Include details about what the index contains, key fields, and how it should be used. This helps the agent correctly route questions to the appropriate index.

:::image type="content" source="media/byo-ai-search-index/ai-search-context.png" alt-text="Screenshot of the Data Agent context." lightbox="media/byo-ai-search-index/ai-search-context.png":::

### Configuration

Use these settings to control how your Data Agent queries and interprets results from your AI Search index:

| Setting                | Description |
|------------------------|-------------|
| **Display Name**       | The name displayed for this index within the Data Agent. |
| **Search Type**        | Choose from the available search options supported by your index (for example: full-text, hybrid, or semantic search). |
| **Number of Documents**| Select how many documents the agent should retrieve per query. The recommended range is **3–20**. Higher values may return more context but can increase processing time. |

:::image type="content" source="media/byo-ai-search-index/ai-search-configuration.png" alt-text="Screenshot of the Data Agent configuration." lightbox="media/byo-ai-search-index/ai-search-configuration.png":::

### Agent Instructions

Use the agent instructions to guide how the agent processes and composes the final answer. The search step retrieves the relevant document chunks, but the instructions tell the agent how to interpret that information, review it, and structure the response.

:::image type="content" source="media/byo-ai-search-index/agent-instructions.png" alt-text="Screenshot of the Data Agent instructions." lightbox="media/byo-ai-search-index/agent-instructions.png":::

## Next steps

- [Data agent configurations](../data-science/data-agent-configurations.md)
