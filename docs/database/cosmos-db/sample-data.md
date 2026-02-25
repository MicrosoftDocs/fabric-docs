---
title: Sample Data Sets Cosmos DB Database
description: Explore the sample data sets and schemas that are available for use in to the Cosmos DB database workload within Microsoft Fabric.
ms.reviewer: mjbrown
ms.topic: concept-article
ms.date: 11/03/2025
ai-usage: ai-generated
---

# Sample data sets in Cosmos DB in Microsoft Fabric

Microsoft Fabric's Cosmos DB database workload provides built-in sample data sets to help you explore, learn, and experiment with NoSQL database patterns. This data set represents an e-commerce scenario with products and customer reviews, demonstrating how different entity types coexist in the same container.

Two sample data sets are available:

- **Standard sample data**: Core e-commerce data with products and reviews
- **Vector sample data**: Enhanced version that includes 1536-dimensional vector embeddings generated using OpenAI's *text-embedding-ada-002* model for semantic search scenarios.

## Data set overview

Both sample data sets contain the same e-commerce data with two document types.

- **Product documents** (`docType: "product"`) - Individual products with name, description, inventory, current price, and an embedded array of the price history for that product.
- **Review documents** (`docType: "review"`) - Customer reviews and ratings linked to products via `productId`

The vector sample data set is based on the standard sample data set. Product documents in the vector data set include an additional `vectors` property containing 1536-dimensional embeddings for semantic search capabilities.

> [!NOTE]
> You can find both datasets as well as an additional dataset with vectors generated using the OpenAI *text-embedding-3-large* model with 512 dimensions in the [Sample Datasets folder of the Cosmos DB in Fabric - Samples Repository](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/datasets/datasets-readme.md)

## Document schemas

### Product document schema

Product documents contain detailed information about individual items in the e-commerce catalog:

| Property | Type | Description |
| --- | --- | --- |
| **`id`** | `string` | Unique identifier for the product in GUID format |
| **`docType`** | `string` | Document type identifier, always `"product"` |
| **`productId`** | `string` | Product identifier, same as `id` for product documents |
| **`name`** | `string` | Product display name |
| **`description`** | `string` | Detailed product description |
| **`categoryName`** | `string` | Product category (e.g., "Computers, Laptops", "Media", "Accessories") |
| **`inventory`** | `number` | Number of items currently in stock |
| **`firstAvailable`** | `string` | Date when product became available (ISO 8601 format) |
| **`currentPrice`** | `number` | Current selling price |
| **`priceHistory`** | `array` | Array of price change objects with `date` and `price` fields |
| **`priceHistory[].date`** | `string` | Date and time of the price change in ISO 8601 format |
| **`priceHistory[].price`** | `number` | Price at the specified date |
| **`vectors`** | `array` | *Vector sample data only* - 1536-dimensional vector embedding |

### Review document schema

Review documents contain customer feedback and ratings for products:

| Property | Type | Description |
| --- | --- | --- |
| **`id`** | `string` | Unique identifier for the review in GUID format |
| **`docType`** | `string` | Document type identifier, always `"review"` |
| **`productId`** | `string` | References the `id` of the product being reviewed |
| **`categoryName`** | `string` | Product category (inherited from the reviewed product) |
| **`customerName`** | `string` | Name of the customer who wrote the review |
| **`reviewDate`** | `string` | Date when the review was submitted (ISO 8601 format) |
| **`stars`** | `number` | Rating given by the customer (1-5 scale) |
| **`reviewText`** | `string` | Written review content from the customer |

> [!NOTE]
> Cosmos DB automatically generates system properties (`_rid`, `_self`, `_etag`, `_attachments`, `_ts`) for all documents.

> [!NOTE]
> For more information about the ISO 8601 format, see [international date and time standard](https://en.wikipedia.org/wiki/ISO_8601). For more information about the GUID format, see [universally unique identifiers](https://en.wikipedia.org/wiki/Universally_unique_identifier).

## Example documents

The following examples show the structure of documents in both sample data sets.

### Standard product document example

```json
{
  "id": "ae449848-3f15-4147-8eee-fe76cfcc6bb4",
  "docType": "product",
  "productId": "ae449848-3f15-4147-8eee-fe76cfcc6bb4",
  "name": "EchoSphere Pro ANC-X900 Premium Headphones",
  "description": "EchoSphere Pro ANC-X900 Premium Headphones deliver immersive sound with advanced 40mm drivers and Adaptive Hybrid Active Noise Cancellation. Bluetooth 5.3 ensures seamless connectivity.",
  "categoryName": "Accessories, Premium Headphones",
  "inventory": 772,
  "firstAvailable": "2024-01-01T00:00:00",
  "currentPrice": 454.87,
  "priceHistory": [
    {
      "date": "2024-01-01T00:00:00",
      "price": 349.0
    },
    {
      "date": "2024-08-01T00:00:00",
      "price": 363.0
    },
    {
      "date": "2025-04-01T00:00:00",
      "price": 408.14
    },
    {
      "date": "2025-08-01T00:00:00",
      "price": 454.87
    }
  ]
}
```

### Vectorized product document example

```json
{
    "id": "ae449848-3f15-4147-8eee-fe76cfcc6bb4",
    "docType": "product",
    "productId": "ae449848-3f15-4147-8eee-fe76cfcc6bb4",
    "name": "EchoSphere Pro ANC-X900 Premium Headphones",
    "description": "EchoSphere Pro ANC-X900 Premium Headphones deliver immersive sound with advanced 40mm drivers and Adaptive Hybrid Active Noise Cancellation. Bluetooth 5.3 ensures seamless connectivity.",
    "categoryName": "Accessories, Premium Headphones",
    "inventory": 772,
    "firstAvailable": "2024-01-01T00:00:00",
    "currentPrice": 454.87,
    "priceHistory": [
      {
        "date": "2024-01-01T00:00:00",
        "price": 349.0
      },
      {
        "date": "2025-08-01T00:00:00",
        "price": 454.87
      }
    ],
    "vectors": [
      -0.02783808670938015,
      0.011827611364424229,
      -0.04711977392435074,
      // ... (1536 dimensions total)
      0.04251981899142265
    ]
}
```

### Review document example

Review documents are identical in both sample data sets:

```json
{
  "id": "fa799013-1746-4a7f-bd0f-2a95b2b76481",
  "docType": "review",
  "productId": "e847e069-d0f9-4fec-b42a-d37cd5b2f536",
  "categoryName": "Accessories, Premium Headphones",
  "customerName": "Emily Rodriguez",
  "reviewDate": "2025-03-02T00:00:00",
  "stars": 5,
  "reviewText": "Excellent sound quality! Premium build! This EchoSphere Pro ANC-X900 exceeded hopes."
}
```

## How to use the sample data

Both sample data sets help you practice querying, filtering, and aggregating data in Cosmos DB. The mixed document types provide realistic scenarios for various use cases.

### Standard sample data scenarios

- **Joining related data**: Link reviews to products using `productId`
- **Category analysis**: Query products and reviews by `categoryName`
- **Review analysis**: Examine customer feedback patterns and ratings

#### Common query patterns

**Get all products in a category:**

```nosql
SELECT *
FROM c
WHERE 
  c.docType = "product" AND 
  c.categoryName = "Computers, Laptops"
```

**Get reviews for a specific product:**

```nosql
SELECT *
FROM c
WHERE 
  c.docType = "review" AND 
  c.productId = "77be013f-4036-4311-9b5a-dab0c3d022be"
```

### Vector sample data scenarios

- **Semantic similarity search**: Find products with similar features using vector embeddings
- **Content-based recommendations**: Generate product suggestions based on description similarity
- **Hybrid queries**: Combine traditional filters with vector similarity for enhanced results

## JSON schemas

The following JSON schemas describe the structure of documents in both sample data sets. Use these schemas to validate or generate similar data for your own Cosmos DB workloads.

### Standard product document schema

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "docType": { "type": "string" },
    "productId": { "type": "string" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "categoryName": { "type": "string" },
    "inventory": { "type": "number" },
    "firstAvailable": { "type": "string" },
    "currentPrice": { "type": "number" },
    "priceHistory": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "date": { "type": "string" },
          "price": { "type": "number" }
        },
        "required": ["date", "price"]
      }
    }
  },
  "required": [
    "id", "docType", "productId", "name", "description", "categoryName", "inventory", "firstAvailable", "currentPrice", "priceHistory"
  ]
}
```

### Vector-enabled product document schema

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "docType": { "type": "string" },
    "productId": { "type": "string" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "categoryName": { "type": "string" },
    "inventory": { "type": "number" },
    "firstAvailable": { "type": "string" },
    "currentPrice": { "type": "number" },
    "priceHistory": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "date": { "type": "string" },
          "price": { "type": "number" }
        },
        "required": ["date", "price"]
      }
    },
    "vectors": {
      "type": "array",
      "items": { "type": "number" },
      "minItems": 1536,
      "maxItems": 1536
    }
  },
  "required": [
    "id", "docType", "productId", "name", "description", "categoryName", "inventory", "firstAvailable", "currentPrice", "priceHistory", "vectors"
  ]
}
```

### Review document schema

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "docType": { "type": "string", "const": "review" },
    "productId": { "type": "string" },
    "categoryName": { "type": "string" },
    "customerName": { "type": "string" },
    "reviewDate": { "type": "string" },
    "stars": { "type": "number" },
    "reviewText": { "type": "string" }
  },
  "required": [
    "id", "docType", "productId", "categoryName", "customerName", 
    "reviewDate", "stars"
  ]
}
```

## Related content

- [Review the Cosmos DB in Microsoft Fabric Samples Repository](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/readme.md)
- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Quickstart: Create a Cosmos DB database workload in Microsoft Fabric](quickstart-portal.md)

