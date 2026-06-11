---
title: Use SQL Database in AI Applications
description: Learn how to use SQL database in Fabric to build AI-powered applications with vector search, RAG patterns, and integration with LangChain and Semantic Kernel.
ms.reviewer: pamela, imotiwala, antho, yoleichen
ms.date: 05/29/2026
ms.topic: solution-overview
ai-usage: ai-assisted
---
# Use SQL database in AI applications

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article describes how to use SQL database in Fabric to build AI-powered applications that combine transactional data with large language models (LLMs), vector search, or retrieval-augmented generation (RAG) patterns.

SQL database in Fabric provides the relational foundation for intelligent applications: ACID transactions, low-latency queries, the native **vector** data type and functions, and tight integration with the broader Fabric analytics and AI platform.

## Why SQL database in Fabric for AI applications?

Building intelligent applications requires a database that can store operational data alongside vector embeddings, serve both transactional and similarity queries at low latency, and integrate with AI orchestration frameworks. SQL database in Fabric meets these requirements:

- **Native vector support**: The SQL Database Engine's native [vector data type](/sql/t-sql/data-types/vector-data-type?view=fabric-sqldb&preserve-view=true) and [vector scalar functions](/sql/t-sql/functions/vector-functions-transact-sql?view=fabric-sqldb&preserve-view=true) let you store embeddings and run similarity searches directly in T-SQL, without a separate vector database.
- **RAG-ready architecture**: Combine your structured business data with vector embeddings in the same database, so retrieval queries can join relational context (customer records, order history, product catalogs) with semantic search results in a single query.
- **Framework integration**: Connect with [LangChain](https://github.com/Azure-Samples/azure-sql-langchain) and [Semantic Kernel](https://github.com/microsoft/semantic-kernel) through existing SQL Server connectors to build orchestrated AI workflows.
- **Fabric platform integration**: Access your SQL data from Fabric Notebooks, Data Science workloads, and Copilot experiences without moving data out of the platform.
- **Enterprise governance**: Microsoft Entra ID authentication, workspace-level security, and customer-managed key encryption apply to AI workloads the same as any other operational workload.

> [!TIP]
> For a real-life customer example of using Fabric SQL database to process data and generate vector embeddings, see [Customer story: Eastman unified data and builds an AI-powered future with Microsoft Fabric](https://www.microsoft.com/en/customers/story/25673-eastman-chemical-company-microsoft-fabric).

## Retrieval-augmented generation (RAG)

RAG enhances LLM responses by retrieving relevant data from your database before generating an answer. Instead of relying solely on the model's training data, the application queries your operational data to ground responses in current, domain-specific facts. For a comprehensive overview, see [Retrieval-augmented generation (RAG)](/dotnet/ai/conceptual/rag).

A typical RAG pattern with SQL database in Fabric follows these steps:

1. **Chunk**: Break large data sources (documents, knowledge base articles, product catalogs) into manageable pieces and convert them to plain text.
1. **Embed**: Generate vector embeddings for each chunk by using [Azure OpenAI](/azure/ai-services/openai/concepts/understand-embeddings) or another embedding model.
1. **Store**: Insert the embeddings into a table with a **vector** column alongside the source text and any relational metadata.
1. **Retrieve**: When a user asks a question, embed the query with the same model, then use [VECTOR_DISTANCE](/sql/t-sql/functions/vector-distance-transact-sql?view=fabric-sqldb&preserve-view=true) to find the most similar chunks. Join with relational tables to enrich the context.
1. **Augment**: Combine the retrieved chunks with the user's original question into a prompt that instructs the LLM how to use the context.
1. **Generate**: Send the augmented prompt to an LLM, which produces a response grounded in the retrieved data.

## Hybrid vector search in a transactional database

Because the embeddings and relational data live in the same database, you can filter by relational attributes (date ranges, categories, access permissions) in the same query, improving both relevance and security. You can combine vector searches with traditional SQL filters (`WHERE`) for results filtered on both transactional relationships and vector functions. For example:

```sql
-- Hybrid search: vector similarity filtered by product category
SELECT TOP (5) p.product_name, p.description
, cosine_distance = VECTOR_DISTANCE('cosine', @query_embedding, p.embedding)
FROM dbo.products AS p
WHERE p.category = 'Electronics'
ORDER BY VECTOR_DISTANCE('cosine', @query_embedding, p.embedding);
```

This pattern is useful for product recommendations, knowledge base search, and customer support scenarios where results need to be both semantically relevant and constrained by business rules.

You can also query with the newer [VECTOR_SEARCH](/sql/t-sql/functions/vector-search-transact-sql?view=fabric-sqldb&preserve-view=true) T-SQL syntax, to find approximate nearest-neighbor results. For example:

```sql
DECLARE @qv VECTOR(1536) = AI_GENERATE_EMBEDDINGS(N'Pink Floyd music style' USE MODEL Ada2Embeddings);

SELECT TOP (10) WITH APPROXIMATE
    t.id,
    t.title,
    r.distance
FROM VECTOR_SEARCH(
        TABLE = dbo.wikipedia_articles_embeddings AS t,
        COLUMN = content_vector,
        SIMILAR_TO = @qv,
        METRIC = 'cosine'
    ) AS r
ORDER BY r.distance;
```

## AI agents with the Fabric MCP servers

Fabric offers both an open-source Fabric Local MCP and a Fabric Remote MCP server for AI agents. These servers provide direct authentication and instructions for prepared operations, such as workspace management, item CRUD and definitions, and permission management. 

Both Fabric MCP server options work with any MCP-compatible client, including GitHub Copilot, Cursor, Claude Desktop, and more. For example, the [Fabric MCP Server extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-mcp-server) works with the [Microsoft Fabric extension](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric) and GitHub Copilot Chat extension. By using these extensions, you can access the Fabric MCP tools within GitHub Copilot chat, and use agents to manage Fabric items, such as creating and managing your Fabric SQL database. 

- The Fabric Local MCP server runs locally on your machine, so AI agents get the context they need to generate code and author items without accessing your environment.
- The Fabric Remote MCP server is a cloud-hosted server that lets AI agents perform prepared, authenticated operations in your Fabric environment with no local setup required.

AI tools use the Fabric MCP server to write code with the correct APIs and within the correct RBAC boundaries you already trust.

For example, after a quick setup of the Fabric local MCP server, you can ask infrastructure questions and assign tasks to GitHub Copilot chat in Visual Studio code, in Agent mode. For example:

```prompt
List all SQL databases and mirrored SQL databases in the Fabric workspace "DemoSQLdb".
```

Your agent uses known Fabric API commands to return all Fabric items of those types.

```prompt
Create a new SQL database in Fabric named "ContosoTest" in the Fabric workspace "DemoSQLdb".
```

Your agent uses known Fabric API commands to create the database item for you, with default settings.

## AI agents with SQL MCP Server

The [SQL MCP Server](https://aka.ms/sql/mcp) provides a Model Context Protocol interface that AI agents can use to interact with your database through a governed, tool-based API instead of generating raw SQL. The server:

- Exposes a defined set of tools backed by your configuration.
- Enforces permissions and constraints consistently.
- Lets agents discover available capabilities without schema guessing.

This pattern is useful for building autonomous agents that can query and update operational data as part of multistep workflows.

The SQL MCP Server uses [Data API builder's](/azure/data-api-builder/overview) entity abstraction, RBAC, caching, and telemetry to deliver a production-ready surface that works the same across REST, GraphQL, and MCP. You configure it once, and the engine handles the rest.

The [MSSQL extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql) includes an integrated UI for [Data API builder](https://github.com/Azure/data-api-builder), so you can create REST, GraphQL, and MCP endpoints for your SQL database tables without writing configuration files or leaving Visual Studio Code. You can select which tables to expose, configure CRUD permissions, choose API types, preview the generated configuration, and deploy a local backend powered by Data API builder, all from a visual interface.

## Enrichment with Azure OpenAI

The SQL Database Engine provides built-in T-SQL functions for generating embeddings and chunking text directly in the database, without external code or pipelines.

### Register an embedding model

Use [CREATE EXTERNAL MODEL](/sql/t-sql/statements/create-external-model-transact-sql?view=fabric-sqldb&preserve-view=true) to register an Azure OpenAI embedding endpoint as a database object. This example uses the `text-embedding-ada-002` deployment with Microsoft Entra managed identity authentication. First, create access credentials to Azure OpenAI using a managed identity:

```sql
CREATE DATABASE SCOPED CREDENTIAL [https://my-azure-openai-endpoint.cognitiveservices.azure.com/]
    WITH IDENTITY = 'Managed Identity',
    SECRET = '{"resourceid":"https://cognitiveservices.azure.com"}';
GO
```

Then, create an external model:

```sql
CREATE EXTERNAL MODEL MyEmbeddingModel
WITH (
    LOCATION = 'https://my-openai.cognitiveservices.azure.com/openai/deployments/text-embedding-ada-002/embeddings?api-version=2024-02-01',
    API_FORMAT = 'Azure OpenAI',
    MODEL_TYPE = EMBEDDINGS,
    MODEL = 'text-embedding-ada-002',
    CREDENTIAL = [https://my-azure-openai-endpoint.cognitiveservices.azure.com/]
);
```

For more authentication options, including API keys, see [CREATE EXTERNAL MODEL](/sql/t-sql/statements/create-external-model-transact-sql?view=fabric-sqldb&preserve-view=true).

### Generate embeddings inline

Use [AI_GENERATE_EMBEDDINGS](/sql/t-sql/functions/ai-generate-embeddings-transact-sql?view=fabric-sqldb&preserve-view=true) to generate vector embeddings directly in T-SQL queries, inserts, and updates.

```sql
-- Generate embeddings for existing rows
UPDATE t
SET t.embedding = AI_GENERATE_EMBEDDINGS(t.description USE MODEL MyEmbeddingModel)
FROM dbo.products AS t;
```

### Chunk and embed in a single statement

Combine [AI_GENERATE_CHUNKS](/sql/t-sql/functions/ai-generate-chunks-transact-sql?view=fabric-sqldb&preserve-view=true) with `AI_GENERATE_EMBEDDINGS` to break large text into chunks and embed them in a single T-SQL statement.

```sql
INSERT INTO dbo.document_embeddings (chunked_text, embedding)
SELECT c.chunk,
       AI_GENERATE_EMBEDDINGS(c.chunk USE MODEL MyEmbeddingModel)
FROM dbo.documents AS d
CROSS APPLY AI_GENERATE_CHUNKS(
    SOURCE = d.content,
    CHUNK_TYPE = FIXED,
    CHUNK_SIZE = 100
) AS c;
```

### Direct REST calls with sp_invoke_external_rest_endpoint

For scenarios not covered by `AI_GENERATE_EMBEDDINGS`, such as calling completions or chat endpoints, use [sp_invoke_external_rest_endpoint](/sql/relational-databases/system-stored-procedures/sp-invoke-external-rest-endpoint-transact-sql?view=fabric-sqldb&preserve-view=true) to call any Azure OpenAI REST API directly from T-SQL. For more information, see [Azure OpenAI integration](/sql/sql-server/ai/artificial-intelligence-intelligent-applications?toc=%2Ffabric%2Fdatabase%2Ftoc.json&bc=%2Ffabric%2Fbreadcrumb%2Ftoc.json&view=fabric-sqldb&preserve-view=true#azure-openai).

## Integration with Fabric AI workloads

SQL database in Fabric connects to the broader AI capabilities of the platform:

| **Integration** | **Use** |
|---|---|
| **Fabric Notebooks** | Query SQL database from PySpark or Python notebooks for data preparation, model training, and batch scoring. |
| **Fabric Data Science** | Use SQL data as input for machine learning experiments, then write predictions back to the database for operational consumption. |
| **Copilot in SQL database** | Use natural language to generate, explain, and optimize T-SQL queries directly in the Fabric portal query editor. |
| **API for GraphQL** | Expose AI-enriched data through GraphQL endpoints for application consumption. |
| **Data Pipelines and Dataflow Gen2** | Orchestrate embedding generation and enrichment workflows at scale. |

## Fabric SQL database use case stories

To learn more about the best use cases for Fabric SQL database, see:

- [Use SQL database in reverse ETL](use-case-reverse-etl.md)
- [Use SQL database as an operational data store](use-case-operational-data-store.md)
- [Use SQL database as the source for translytical applications](use-case-translytical-applications.md)

## Related content

- [Intelligent applications and AI](/sql/sql-server/ai/artificial-intelligence-intelligent-applications?toc=/fabric/database/toc.json&bc=/fabric/breadcrumb/toc.json&view=fabric-sqldb&preserve-view=true)
- [Vector search and vector indexes in the SQL Database Engine](/sql/sql-server/ai/vectors?toc=/fabric/database/toc.json&bc=/fabric/breadcrumb/toc.json&view=fabric-sqldb&preserve-view=true)