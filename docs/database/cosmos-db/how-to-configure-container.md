---
title: Configure container in Cosmos DB Database
titleSuffix: Microsoft Fabric
description: Learn how to configure containers in your Cosmos DB database in Microsoft Fabric during the preview, including steps like managing time-to-live (TTL) and indexing policy.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/14/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Configure a container in Cosmos DB in Microsoft Fabric

While many features are automatically enabled and built-in to Cosmos DB in Microsoft Fabric, there are still a few places where you can customize the behavior of your container through configuration. In this guide, you walk through the steps to configure the most common customizable settings for a container in your Cosmos DB in Fabric database.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

> [!NOTE]
> Databases do not support offer replacement for containers, meaning you cannot change a container's throughput after it has been created.

## Update settings

First, use the **Settings** section for a container to customize and observe the most common options including, but not limited to time-to-live (TTL), geospatial configuration, and partitioning.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. Select and expand your existing container. Then, select **Settings**.

1. In the **Settings** section, select the redundant **Settings** tab.

1. Now, observe the value for the **Partition key** option.

1. Next, optionally configure the **Time to Live** and **Geospatial Configuration** values.

    :::image type="content" source="media/how-to-configure-container/settings.png" lightbox="media/how-to-configure-container/settings-full.png" alt-text="Screenshot of the 'Settings' section for a container within a database in the Fabric portal.":::

1. Select **Save** to persist your changes.

    > [!TIP]
    > For more information on time-to-live (TTL) configuration, see [time-to-live](time-to-live.md). For more information on geospatial configuration, see [geospatial data](/nosql/query/geospatial).

## Rework indexing policy

Now, use the **Indexing Policy** section to customize how indexing works for your container. Indexing customizes how Cosmos DB converts items into a tree representation internally. Customizing the indexing policy can tune the performance of your container to better align with your profile of your data workload.


1. Still in the **Settings** section, select the **Indexing Policy** tab.

1. Update the editor with a new JSON indexing policy:

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
        }
      ]
    }
    ```

    :::image type="content" source="media/how-to-configure-container/indexing-policy.png" lightbox="media/how-to-configure-container/indexing-policy-full.png" alt-text="Screenshot of the 'Indexing Policy' section for a container within a database in the Fabric portal.":::

    > [!NOTE]
    > By default, Cosmos DB in Fabric automatically indexes every property for all items in your container. The policy illustrated in this example is the default policy for a new container.

1. Select **Save** to persist your changes.

    > [!TIP]
    > For more information on indexing, see [indexing policies](indexing-policies.md).

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Connect using Microsoft Entra ID to Cosmos DB in Microsoft Fabric](how-to-authenticate.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
