---
title: Configure container in Cosmos DB Database
description: Learn how to configure containers in your Cosmos DB database in Microsoft Fabric, including steps like managing time-to-live (TTL) and indexing policy.
ms.reviewer: mjbrown
ms.topic: how-to
ms.date: 10/30/2025
---

# Configure a container in Cosmos DB in Microsoft Fabric

While many features are automatically enabled and built-in to Cosmos DB in Microsoft Fabric, there are still a few places where you can customize the behavior of your container through configuration. In this guide, you walk through the steps to configure the most common customizable settings for a container in your Cosmos DB in Fabric database.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

## Update settings

To modify a Cosmos DB container, open the **Settings** section for a container in the Fabric portal. Settings which can be customized time-to-live (TTL), geospatial configuration, and indexing policy.

> [!NOTE]
> The vector and full-text container policy, partition keys are immutable and cannot be changed after container creation. Container throughput cannot be changed in the Fabric portal but can be modified using the Cosmos DB SDK. See [Change Throughput](#change-throughput) for details.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. Select and expand your existing container. Then, select **Settings**.

1. In the **Settings** section, select the redundant **Settings** tab.

## Time-to-live and geospatial configuration

1. To configure the **Time to Live** and **Geospatial Configuration** values, change the values below.

    :::image type="content" source="media/how-to-configure-container/settings.png" lightbox="media/how-to-configure-container/settings-full.png" alt-text="Screenshot of the 'Settings' section for a container within a database in the Fabric portal.":::

1. Select **Save** to persist your changes.

    > [!Note]
    > Time-to-live (TTL) on a container will also apply to any data mirrored to OneLake. For more information on time-to-live (TTL) configuration, see [time-to-live](time-to-live.md). For more information on geospatial configuration, see [geospatial data](/cosmos-db/query/geospatial).

## Indexing policy

The **Indexing Policy** section will customize the indexing for your container. Indexing customizes how Cosmos DB converts items into a tree representation internally. Customizing the indexing policy can tune the performance of the queries for your container or improve write performance of your data.

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

## Change Throughput

The throughput of your containers can be done using the Cosmos DB SDK. This can be easily done using a Notebook in Fabric. Below is a simplified sample. For a complete sample notebook see, [Management Operations for Cosmos DB in Fabric](https://github.com/AzureCosmosDB/cosmos-fabric-samples/tree/main/management). This provides a complete sample notebook you can import into your workspace to use.

```python
# Get the current throughput on the created container and increase it by 1000 RU/s

throughput_properties = await CONTAINER.get_throughput()
autoscale_throughput = throughput_properties.auto_scale_max_throughput

print(print(f"Autoscale throughput: {autoscale_throughput}"))

new_throughput = autoscale_throughput + 1000

await CONTAINER.replace_throughput(ThroughputProperties(auto_scale_max_throughput=new_throughput))

# Verify the updated throughput
updated_throughput_properties = await CONTAINER.get_throughput()
print(f"Verified updated autoscale throughput: {updated_throughput_properties.auto_scale_max_throughput}")
```

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Connect using Microsoft Entra ID to Cosmos DB in Microsoft Fabric](how-to-authenticate.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)

