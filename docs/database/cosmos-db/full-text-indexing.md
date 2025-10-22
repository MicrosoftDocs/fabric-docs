---
title: Full Text Indexing And Search in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Query data using "best matching 25" scoring in Cosmos DB in Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/16/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Full text indexing and search in Cosmos DB in Microsoft Fabric (preview)

Cosmos DB in Microsoft Fabric offers a powerful Full Text Search feature as generally available. This feature is designed to enhance the native search capabilities of your apps without needing an external search service for basic full text search.

## What is full text search?

Cosmos DB in Fabric offers full text indexing and search, designed to enhance your search and retrieval workloads. This feature includes advanced text processing techniques such as stemming, stop word removal, and tokenization, enabling efficient and effective text searches through a specialized text index. Full text search also includes *full text scoring* with a function that evaluates the relevance of documents to a given search query. BM25, or Best Matching 25, considers factors like term frequency, inverse document frequency, and document length to score and rank documents. This helps ensure that the most relevant documents appear at the top of the search results, improving the accuracy and usefulness of text searches.

Full Text Search is ideal for various scenarios, including:

- **E-commerce**: Quickly find products based on descriptions, reviews, and other text attributes.

- **Content management**: Efficiently search through articles, blogs, and documents.

- **Customer support**: Retrieve relevant support tickets, FAQs, and knowledge base articles.

- **User content**: Analyze and search through user-generated content such as posts and comments.

- **RAG for chatbots**: Enhance chatbot responses by retrieving relevant information from large text corpora, improving the accuracy and relevance of answers.

- **Multi-Agent AI apps**: Enable multiple AI agents to collaboratively search and analyze vast amounts of text data, providing comprehensive and nuanced insights.

## How to use full text search

1. Configure a container with a full text policy and full text index.

1. Insert your data with text properties.

1. Run queries against the data using full text search system functions.

### Configure container policies and indexes for hybrid search

To use full text search capabilities, you should first define two policies:

- A container-level full text policy that defines what paths contain text for the new full text query system functions.

- A full text index added to the indexing policy that enables efficient search.

You can run full text search queries without these policies, but they don't use the full text index and could consume more request units (RUs). Without this policy, full text searches can also take longer to execute. Defining full text container and index policies is recommended.

### Full text policy

For every text property you'd like to configure for full text search, you must declare both the `path` of the property with text and the `language` of the text. A simple full text policy can be:

```json
{
  "defaultLanguage": "en-US",
  "fullTextPaths": [
    {
      "path": "/text",
      "language": "en-US"
    }
  ]
}
```

Defining multiple text paths is easily done by adding another element to the `fullTextPolicy` array:

```json
{
  "defaultLanguage": "en-US",
  "fullTextPaths": [
    {
      "path": "/text1",
      "language": "en-US"
    },
    {
      "path": "/text2",
      "language": "en-US"
    }
  ]
}
```

> [!IMPORTANT]
> Wild card characters (`*`, `[]`) aren't currently supported in the full text policy or full text index.

For more information and examples of settings a full text policy, see [full text indexing policy samples](sample-indexing-policies.md#full-text-indexing-policy).

#### Multi-language support

Multi-language support allows you to index and search text in languages beyond English. It applies language-specific tokenization, stemming, and stopword removal for more accurate search results.

> [!NOTE]
> Multi-language support is in early preview. Performance and quality of search might be different than full text search in English. For example, stopword removal is only available for English (en-us) at this time. The functionality is subject to change through the evolution of the preview.

For more information about limitations related to multi-language support, see [limitations](limitations.md#full-text-indexing).

### Full text index

Any full text search operations should make use of a *full text index*. A full text index can easily be defined in any Cosmos DB in Fabric index policy per the example here:

```json
{
  "indexingMode": "consistent",
  "automatic": true,
  "includedPaths": [
    {
      "path": "/*"
    }
  ],
  "excludedPaths": [
    {
      "path": "/\"_etag\"/?"
    },
  ],
  "fullTextIndexes": [
    {
      "path": "/text"
    }
  ]
}
```

As with the full text policies, full text indexes can be defined on multiple paths:

```json
{
  "indexingMode": "consistent",
  "automatic": true,
  "includedPaths": [
    {
      "path": "/*"
    }
  ],
  "excludedPaths": [
    {
      "path": "/\"_etag\"/?"
    },
  ],
  "fullTextIndexes": [
    {
      "path": "/text"
    },
    {
      "path": "/text2"
    }
  ]
}
```

### Full text search queries

Full text search and scoring operations are performed using the following system functions in the Cosmos DB in Fabric query language:

- [`FULLTEXTCONTAINS`](/nosql/query/fulltextcontains): Returns `true` if a given string is contained in the specified property of a document. This function is useful in a `WHERE` clause when you want to ensure specific key words are included in the documents returned by your query.

- [`FULLTEXTCONTAINSALL`](/nosql/query/fulltextcontainsall): Returns `true` if *all* of the given strings are contained in the specified property of a document. This function is useful in a `WHERE` clause when you want to ensure that multiple key words are included in the documents returned by your query.

- [`FULLTEXTCONTAINSANY`](/nosql/query/fulltextcontainsany): Returns `true` if *any* of the given strings are contained in the specified property of a document. This function is useful in a `WHERE` clause when you want to ensure that at least one of the key words is included in the documents returned by your query.

- [`FULLTEXTSCORE`](/nosql/query/fulltextscore): Use this function in an `ORDER BY RANK` clause to return documents ordered by their full text score, placing the most relevant (highest scoring) documents at the top and the least relevant (lowest scoring) at the bottom.

Here are a few examples of each function in use.

#### `FULLTEXTCONTAINS`

In this example, we want to obtain the first 10 results where the phrase "red bicycle" is contained in the property `c.text`.

```nosql
SELECT TOP 10
  *
FROM
  container c
WHERE
  FULLTEXTCONTAINS(c.text, "red bicycle")
```

#### `FULLTEXTCONTAINSALL`

In this example, we want to obtain first 10 results where the keywords "red" and "bicycle" are contained in the property `c.text`, but not necessarily together.

```nosql
SELECT TOP 10 *
FROM c
WHERE FULLTEXTCONTAINSALL(c.text, "red", "bicycle")
```

#### `FULLTEXTCONTAINSANY`

In this example, we want to obtain the first 10 results where the keywords "red" and either "bicycle" or "skateboard"  are contained in the property `c.text`.

```nosql
SELECT TOP 10
  *
FROM
  container c
WHERE
  FULLTEXTCONTAINS(c.text, "red") AND 
  FULLTEXTCONTAINSANY(c.text, "bicycle", "skateboard")
```

#### `FULLTEXTSCORE`

In this example, we want to obtain the first 10 results where "mountain" and "bicycle" are included, and sorted by order of relevance. That is, documents that have these terms more often should appear higher in the list.

```nosql
SELECT TOP 10
  *
FROM
  container c
ORDER BY RANK
  FULLTEXTSCORE(c.text, "bicycle", "mountain")
```

> [!IMPORTANT]
> `FULLTEXTSCORE` can only be used in the `ORDER BY RANK` clause and not projected in the `SELECT` statement or in a `WHERE` clause.

#### Fuzzy Search

Fuzzy search can improve resilience to typos and text variations. You can specify an allowable "distance" (number of edits) between the search term and document text, allowing near matches to be considered a hit. The maximum distance that can be specified is 2 (two edits).

> [!NOTE]
> Fuzzy search is in early preview. Performance, quality, and functionality are subject to change through the evolution of the preview.

```nosql
SELECT TOP 10
  *
FROM
  container c
WHERE
  FULLTEXTCONTAINS(c.text, {"term": "red", "distance":1}, {"term": "bicycle", "distance":2})
```

## Related content

- [Learn about indexing policies in Cosmos DB in Fabric](indexing-policies.md)
- [Index vector data in Cosmos DB in Fabric](index-vector-data.md)
- [Use hybrid-search in Cosmos DB in Fabric](hybrid-search.md)
- [Review sample indexing policies](sample-indexing-policies.md)
