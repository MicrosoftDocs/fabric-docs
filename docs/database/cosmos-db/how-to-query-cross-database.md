---
title: Query Cross-Database Data in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Learn how to query data across multiple Cosmos DB databases in Microsoft Fabric during the preview, including setup and best practices.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/14/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Query cross-database data in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

The mirrored SQL analytics endpoint makes it possible to create queries across two distinct Cosmos DB in Microsoft Fabric containers or databases. In this guide, you create a query that spans two Cosmos DB in Fabric databases.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

- At least one other SQL analytics endpoint for a second Cosmos DB in Fabric database item.

## Open the SQL analytics endpoint for the first database

Start by accessing the SQL analytics endpoint for the first Cosmos DB in Fabric database.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your first Cosmos DB database.

    > [!IMPORTANT]
    > For this guide, the first Cosmos DB database has the [sample data set](sample-data.md) already loaded. The remaining query examples in this guide assume that you're using the same data set for this database.

1. In the menu bar, select the **Cosmos DB** list and then select **SQL Endpoint**.

    :::image type="content" source="media/how-to-query-cross-database/endpoint-selection.png" lightbox="media/how-to-query-cross-database/endpoint-selection-full.png" alt-text="Screenshot of the endpoint selection option in the menu bar for a database in Cosmos DB in Fabric.":::

1. In the analytics endpoint page, select **New SQL Query** in the menu bar.

1. Open a new query editor and then run a test query. Ensure that you see the expected data.

    ```tsql
    SELECT TOP 5
      countryOfOrigin AS geography,
      COUNT(*) AS itemCount
    FROM
      [<first-database-name>].[SampleData]
    GROUP BY
      countryOfOrigin
    ORDER BY
      COUNT(*) DESC
    ```

    This query results in:

    | `geography` | `itemCount` |
    | --- | --- |
    | `Nigeria` | `21` |
    | `Egypt` | `20` |
    | `France` | `18` |
    | `Japan` | `18` |
    | `Argentina` | `17` |

    > [!NOTE]
    > This query also uses data found in the sample data set in a container named `SampleData`. For more information, see [sample data set](sample-data.md).

## Connect to the second database endpoint

Now, connect to the mirrored SQL analytics endpoint for a second Cosmos DB in Fabric database.

1. While still in the analytics endpoint page, select **+ Warehouses** from the menu bar.

1. Add another SQL analytics endpoint item for the second Fabric item you want to query.

1. Open another new query editor and then run a test query. Again, ensure that you see the expected data.

    ```tsql
    SELECT 
      *
    FROM
      [<second-database-endpoint>].[<second-database-name>].[<second-database-container-name>]
    ```

    > [!NOTE]
    > This example uses an arbitrary data set stored in the Cosmos DB in Fabric container. This data set contains region locales that correspond with the regions specified in the first query. A subset of this data set is available here:
    >
    > | `name` | `code` |
    > | --- | --- |
    > | `Nigeria` | `en-ng` |
    > | `Egypt` | `ar-eg` |
    > | `France` | `fr-fr` |
    > | `Japan` | `ja-jp` |
    > | `Argentina` | `es-ar` |
    >

## Run a cross-database query

Finally, run a query that combines data from both databases.

1. While still within the SQL analytics endpoint, open a third query editor.
 
1. Run a query that combines data from both endpoints.

    ```tsql
    SELECT TOP 5
      regionCodes.code AS regionCode,
      COUNT(*) AS itemCount
    FROM
      [<first-database-endpoint>].[<first-database-name>].[SampleData] sampleData
    INNER JOIN
      [<second-database-endpoint>].[<second-database-name>].[<second-database-container-name>] regionCodes
    ON
      sampleData.countryOfOrigin = regionCodes.name
    GROUP BY
      sampleData.countryOfOrigin, regionCodes.code
    ORDER BY
      itemCount DESC
    ```

    This query results in:
    
    | `regionCode` | `itemCount` |
    | --- | --- |
    | `en-ng` | `21` |
    | `ar-eg` | `20` |
    | `fr-fr` | `18` |
    | `ja-jp` | `18` |
    | `es-ar` | `17` |

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Connect using Microsoft Entra ID to Cosmos DB in Microsoft Fabric](how-to-authenticate.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
