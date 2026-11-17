---
title: "Use Microsoft Fabric HorizonDB in AI applications"
description: Design AI applications with Fabric HorizonDB relational data, released vector and text extensions, and bounded Fabric integrations.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: solution-overview
ai-usage: ai-assisted
---
# Use Microsoft Fabric HorizonDB in AI applications

Fabric HorizonDB can store operational application data alongside released vector and text-search data. Applications can combine PostgreSQL transactions, relational filters, similarity search, and Microsoft Fabric analytical results without treating every AI result as permanent operational state.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

The preview can include `vector`, `pg_diskann`, `pg_textsearch`, and `azure_ai`. Inspect `pg_extension` to verify what's installed. Extension presence doesn't by itself guarantee an AI model, provider, endpoint, region, quota, or billing option. Confirm the applicable AI integration contract before sending data to any model.

Evaluate with synthetic, nonsensitive data in a dedicated test workspace. Only the database creator can connect to PostgreSQL in the current preview; don't design a multiuser or managed-identity deployment around this exercise.

## Choose an AI data pattern

| Pattern | Use when | Fabric HorizonDB role |
|---|---|---|
| Retrieval-augmented generation | Responses need approved operational or domain context | Store source text, metadata, embeddings, and access attributes |
| Semantic or hybrid search | Users search by meaning and structured filters | Combine vector or text search with PostgreSQL predicates |
| Operational scoring | An application repeatedly reads compact model results | Store validated scores loaded through a Copy job |
| Live analytical enrichment | A selective request needs current supported Fabric data | Read it through `pg_fabric_fdw` foreign tables |

## Store embeddings with operational metadata

The exact vector type, index syntax, operators, functions, dimensions, and limits depend on the released extension versions. Use the extension documentation exposed for your Fabric HorizonDB release.

A general table design separates model provenance from application state:

```sql
CREATE SCHEMA IF NOT EXISTS ai_app;

CREATE TABLE IF NOT EXISTS ai_app.knowledge_chunks (
    chunk_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    source_id text NOT NULL,
    source_version text NOT NULL,
    chunk_index integer NOT NULL
        CHECK (chunk_index >= 0),
    chunk_text text NOT NULL,
    embedding_model text NOT NULL,
    embedding_created_at timestamptz NOT NULL,
    access_group text NOT NULL,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    UNIQUE (source_id, source_version, chunk_index)
);
```

Add the released vector column and index only after confirming dimension, distance metric, and `pg_diskann` syntax for the service version. Don't publish generic upstream extension syntax as a Fabric HorizonDB guarantee.

## Build a retrieval-augmented generation flow

1. Identify approved source content and its data classification.
1. Split content into chunks that preserve useful context.
1. Generate embeddings with an approved model outside or through an explicitly released Fabric HorizonDB AI integration.
1. Store the source version, model identifier, generation time, and access attributes with each embedding.
1. At query time, generate the question embedding with the same compatible model.
1. Retrieve a small candidate set with the released vector search syntax.
1. Apply relational authorization and business filters before returning context.
1. Send only approved context to the model.
1. Record citations or source identifiers so that users can verify the answer.

Vector similarity isn't authorization. Treat application filters and generated content as separate concerns from the preview's creator-only connection model.

## Combine search methods

Hybrid retrieval commonly uses:

- PostgreSQL predicates for tenant, product, date, status, and authorization.
- `pg_textsearch` or PostgreSQL full-text features for exact terms.
- `vector` similarity for semantic relevance.
- `pg_diskann` indexing for released approximate nearest-neighbor scenarios.

Test result quality with representative questions and filters. Evaluate recall, latency, false positives, access control, and behavior when no relevant result exists.

## Operationalize Fabric AI results

Use one of these paths:

- Query a small, current supported Fabric result through read-only [`pg_fabric_fdw`](query-fabric-data.md).
- Load reusable scores, recommendations, or classifications into staging with a [Copy job](load-fabric-data-copy-job.md), validate them, and publish with an idempotent upsert.

Store model name, model version, calculated timestamp, source batch, and confidence or quality metadata where applicable. Define expiration behavior so that an old score isn't treated as current indefinitely.

## Security and governance

- Use Microsoft Entra authentication as the database creator. Don't create login roles to bypass the preview restriction.
- Don't put API keys or model credentials in tables, SQL text, or extension settings.
- Confirm data-sending consent, network boundaries, regional eligibility, quota, and cost before enabling model calls.
- Keep prompt and response logs free of secrets and unnecessary personal data.
- Treat generated output as untrusted until the application validates it.
- Define behavior for model timeouts, unavailable inference, and unsafe output.

## Extension availability

Only the supported set available in your database establishes an extension dependency. Components visible in `pg_available_extensions` aren't automatically customer-activatable. Check [PostgreSQL extensions in Fabric HorizonDB](extensions.md) before designing a dependency.

## Related content

- [Connect a PostgreSQL application](tutorial-connect-application.md).
- [Use Fabric HorizonDB for reverse ETL](use-case-reverse-etl.md).
- [Use Fabric HorizonDB as an operational data store](use-case-operational-data-store.md).
