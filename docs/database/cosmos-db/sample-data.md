---
title: Sample Data Set Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Explore the sample data set and schema that is available for use in to the Cosmos DB database workload within Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/14/2025
ai-usage: ai-generated
appliesto:
- ✅ Cosmos DB in Fabric
---

# Sample data set in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Microsoft Fabric's Cosmos DB database workload comes with a built-in sample data set designed to help you explore, learn, and experiment. This data set represents a collection of products, each with various properties that reflect real-world e-commerce scenarios.

## Data set structure and schema

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
> For more information about the ISO 8601 format, see [international date and time standard](https://en.wikipedia.org/wiki/ISO_8601). For more information about the GUID format, see [universally unique identifiers](https://en.wikipedia.org/wiki/Universally_unique_identifier).

## Example item

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

## How to use the sample data

You can use this data set to practice querying, filtering, and aggregating data in Cosmos DB within Microsoft Fabric. Try searching for products by category, analyzing price trends, or exploring customer feedback.

## JSON schema for the sample data set

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

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Quickstart: Create a Cosmos DB database workload in Microsoft Fabric](quickstart-portal.md)
