---
title: Sample Data Set Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Explore the sample data sets and schemas that are available for use in to the Cosmos DB database workload within Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 10/22/2025
ai-usage: ai-generated
appliesto:
- ✅ Cosmos DB in Fabric
---

# Sample data sets in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Microsoft Fabric's Cosmos DB database workload comes with built-in sample data sets designed to help you explore, learn, and experiment. These data sets represent various entity types with properties that reflect real-world data.

## Core sample data set

This data set is a collection of products, each with various properties that reflect real-world e-commerce scenarios.

### Data set structure and schema

Each item in the sample data set represents a product and includes the following properties:

| | Type | Description |
| --- | --- | --- |
| **`id`** | `string` | A unique identifier for the product in globally unique identifier (GUID) format |
| **`name`** | `string` | The product's name |
| **`price`** | `number` | The current price of the product |
| **`category`** | `string` | The product category, such as `Electronics`, `Media`, `Accessory`, `Peripheral`, or `Other` |
| **`description`** | `string` | A brief description of the product |
| **`stock`** | `number` | The number of items in stock |
| **`countryOfOrigin`** | `string` | The region where the product was made |
| **`firstAvailable`** | `string` | The date and time the product was first available  in ISO 8601 format |
| **`priceHistory`** | `array` | An array of previous prices for the product (array of numbers) |
| **`customerRatings`** | `array` | An array of customer rating objects |
| **`customerRatings[].username`** | `string` | Username of the customer who gave the rating |
| **`customerRatings[].stars`** | `number` | Numeric rating value |
| **`customerRatings[].date`** | `string` | The date and time the rating was given in ISO 8601 format |
| **`customerRatings[].verifiedUser`** | `boolean` | Boolean indicating if the user is verified |
| **`rareProperty`** | `boolean` | (*Optional*) Indicates if the product has a rare attribute |

> [!NOTE]
> Cosmos DB automatically manages all standard system properties (`_rid`, `_self`, `_etag`, `_attachments`, `_ts`) for all documents.

> [!NOTE]
> For more information about the ISO 8601 format, see [international date and time standard](https://en.wikipedia.org/wiki/ISO_8601). For more information about the GUID format, see [universally unique identifiers](https://en.wikipedia.org/wiki/Universally_unique_identifier).

### Example item

Here's an example of a product from the sample data set:

```json
{
  "id": "dddddddd-3333-4444-5555-eeeeeeeeeeee",
  "name": "Awesome Stand Micro (Red)",
  "price": 1073.12,
  "category": "Accessory",
  "description": "This Awesome Stand Micro (Red) is rated 4.6 out of 5 by 3.\n\nRated 3 out of 5 by Thomas Margrand (tmargand) from A great deal So this is a very nice buy, but the price is a little high, so I will not be buying again. Good price for it, but I still don't know if all i love about it is the high",
  "stock": 11,
  "countryOfOrigin": "France",
  "firstAvailable": "2020-05-04 16:01:42",
  "priceHistory": [
    1143.82,
    1098.56
  ],
  "customerRatings": [
    {
      "username": "cthomas",
      "stars": 1,
      "date": "2021-09-25 11:29:23",
      "verifiedUser": true
    },
    {
      "username": "tmargand",
      "stars": 3,
      "date": "2022-05-13 21:56:20",
      "verifiedUser": true
    }
  ]
}
```

### How to use the sample data

You can use this data set to practice querying, filtering, and aggregating data in Cosmos DB within Microsoft Fabric. Try searching for products by category, analyzing price trends, or exploring customer feedback.

### JSON schema for the sample data set

If you want to use this sample data set in your own environment, here's a JSON schema that describes the structure of each product item:

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "price": { "type": "number" },
    "category": { "type": "string" },
    "description": { "type": "string" },
    "stock": { "type": "number" },
    "countryOfOrigin": { "type": "string" },
    "firstAvailable": { "type": "string" },
    "priceHistory": {
      "type": "array",
      "items": { "type": "number" }
    },
    "customerRatings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "username": { "type": "string" },
          "stars": { "type": "number" },
          "date": { "type": "string" },
          "verifiedUser": { "type": "boolean" }
        },
        "required": ["username", "stars", "date", "verifiedUser"]
      }
    },
    "rareProperty": { "type": "boolean" }
  },
  "required": [
    "id", "name", "price", "category", "description", "stock", "countryOfOrigin", "firstAvailable", "priceHistory", "customerRatings"
  ]
}
```

This schema can help you validate or generate similar data for your own Cosmos DB workloads.

## Vector sample data set

This data set contains vector embeddings and AI-ready sample data. It supports testing artificial intelligence and agent-based workloads. You can use it for semantic search, similarity matching, and machine learning scenarios.

### Data set structure and schema

The vector sample data set contains two primary document types that demonstrate different use cases for AI and vector search:

#### Product documents

Product documents contain detailed product information along with vector embeddings for semantic search capabilities:

| | Type | Description |
| --- | --- | --- |
| **`id`** | `string` | A unique identifier for the product in globally unique identifier (GUID) format |
| **`productId`** | `string` | Product identifier (could match `id` for product documents) |
| **`category`** | `string` | The product category, such as `Electronics`, `Media`, `Accessory`, `Peripheral`, or `Other` |
| **`docType`** | `string` | Document type identifier set to `product` for product documents |
| **`name`** | `string` | The product's name |
| **`description`** | `string` | A detailed description of the product |
| **`countryOfOrigin`** | `string` | The region where the product was manufactured |
| **`rareItem`** | `boolean` | Indicates if the product is a rare or special item |
| **`firstAvailable`** | `string` | The date and time the product was first available in ISO 8601 format |
| **`price`** | `number` | The current price of the product |
| **`stock`** | `number` | The number of items in stock |
| **`priceHistory`** | `array` | An array of price history objects containing `priceDate` and `newPrice` |
| **`priceHistory[].priceDate`** | `string` | The date and time of the price change in ISO 8601 format |
| **`priceHistory[].newPrice`** | `number` | The price at the specified date |
| **`descriptionVector`** | `array` | A 512-dimensional vector embedding representing the product description for semantic search |

#### Customer rating documents

Customer rating documents contain individual product reviews and ratings:

| | Type | Description |
| --- | --- | --- |
| **`id`** | `string` | A unique identifier for the rating in globally unique identifier (GUID) format |
| **`productId`** | `string` | The identifier of the product being rated |
| **`category`** | `string` | The category of the product being rated |
| **`docType`** | `string` | Document type identifier set to `customerRating` for rating documents |
| **`userName`** | `string` | Username of the customer who provided the rating |
| **`reviewDate`** | `string` | The date and time the review was submitted in ISO 8601 format |
| **`stars`** | `number` | Numeric rating value (typically 1-5) |
| **`verifiedUser`** | `boolean` | Boolean indicating if the user is verified |

> [!NOTE]
> Cosmos DB automatically manages all standard system properties (`_rid`, `_self`, `_etag`, `_attachments`, `_ts`) for all documents.

### Example items

Here are examples of both document types from the vector sample data set:

#### Product document example

Here's an example of a product document from the vector sample data set:

```json
{
    "id": "71abb6ae-6745-47cc-9834-c85855c43ff0",
    "productId": "71abb6ae-6745-47cc-9834-c85855c43ff0",
    "category": "Electronics",
    "docType": "product",
    "name": "Awesome Computer Super (Black)",
    "description": "This Awesome Computer Super (Black) is a cool computer you should buy in stores. If you are already using one then this would be a good computer for you. I recommend that you save an extra $35 and purchase a cheap computer",
    "countryOfOrigin": "India",
    "rareItem": true,
    "firstAvailable": "2019-02-06T18:00:31",
    "price": 344.89,
    "stock": 95,
    "priceHistory": [
        {
            "priceDate": "2019-02-06T18:00:31",
            "newPrice": 316.4
        },
        {
            "priceDate": "2025-09-08T18:00:31",
            "newPrice": 344.89
        }
    ],
    "descriptionVector": [
        -0.04926479607820511,
        0.0013136870693415403,
        -0.02283181995153427,
        // ... (512 dimensions total)
        -0.046570055186748505
    ]
}
```

#### Customer rating document example

Here's an example of a customer rating document from the vector sample data set:

```json
{
    "id": "63d50bd1-b3a5-4b25-ac3f-2bd979a5d731",
    "productId": "fdd09a81-1a6b-48b8-9c04-f35a44c3479a",
    "category": "Media",
    "docType": "customerRating",
    "userName": "eallen",
    "reviewDate": "2021-07-09T02:18:13",
    "stars": 1,
    "verifiedUser": true
}
```

### How to use the sample data

You can use this vector-enabled data set to practice advanced AI and machine learning scenarios in Cosmos DB in Fabric. This data set is ideal for experimenting with:

- **Semantic search**: Use the `descriptionVector` field to find products with similar descriptions using vector similarity queries
- **Hybrid search**: Combine traditional filtering (by category, price range) with semantic search for enhanced discovery
- **Recommendation systems**: Build recommendation engines based on product similarity using vector embeddings
- **Customer analytics**: Analyze customer ratings and sentiment across products
- **AI agent scenarios**: Use the rich product and rating data to build intelligent shopping assistants or chatbots

The vector embeddings enable you to perform similarity searches to find products with related descriptions, even when they don't share exact keywords.

### JSON schema for the vector sample data set

If you want to use this sample data set in your own environment, here are JSON schemas for both document types:

#### Product document schema

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "productId": { "type": "string" },
    "category": { "type": "string" },
    "docType": { "type": "string", "enum": ["product"] },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "countryOfOrigin": { "type": "string" },
    "rareItem": { "type": "boolean" },
    "firstAvailable": { "type": "string" },
    "price": { "type": "number" },
    "stock": { "type": "number" },
    "priceHistory": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "priceDate": { "type": "string" },
          "newPrice": { "type": "number" }
        },
        "required": ["priceDate", "newPrice"]
      }
    },
    "descriptionVector": {
      "type": "array",
      "items": { "type": "number" },
      "minItems": 512,
      "maxItems": 512
    }
  },
  "required": [
    "id", "productId", "category", "docType", "name", "description", 
    "countryOfOrigin", "rareItem", "firstAvailable", "price", "stock", 
    "priceHistory", "descriptionVector"
  ]
}
```

#### Customer rating document schema

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "productId": { "type": "string" },
    "category": { "type": "string" },
    "docType": { "type": "string", "enum": ["customerRating"] },
    "userName": { "type": "string" },
    "reviewDate": { "type": "string" },
    "stars": { "type": "number" },
    "verifiedUser": { "type": "boolean" }
  },
  "required": [
    "id", "productId", "category", "docType", "userName", 
    "reviewDate", "stars", "verifiedUser"
  ]
}
```

These schemas help validate or generate similar vector-enabled data for your own AI and machine learning workloads in Cosmos DB.

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Quickstart: Create a Cosmos DB database workload in Microsoft Fabric](quickstart-portal.md)
