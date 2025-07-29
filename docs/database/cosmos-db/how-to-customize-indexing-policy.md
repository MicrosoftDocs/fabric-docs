---
title: Customize indexing policies in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Create a custom indexing policy for a container within a database in Cosmos DB in Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/29/2025
ai-usage: ai-assisted
zone_pivot_groups: dev-lang-core
appliesto:
- ✅ Cosmos DB in Fabric
---

# Customize indexing policies in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Indexing in Cosmos DB is designed to deliver fast and flexible query performance, no matter how your data evolves. In this guide, you modify the indexing policy for a container using the Fabric portal or an Azure SDK.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

[!INCLUDE[Prerequisites - Development languages core](includes/prerequisite-dev-lang-core.md)]

## Set using the Fabric portal

First, use the Fabric portal to set the indexing policy for a container

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. Select and expand your existing container. Then, select **Settings**.

1. In the **Settings** section, select the **Indexing Policy** tab.

    :::image source="media/how-to-customize-indexing-policy/editor.png" lightbox="media/how-to-customize-indexing-policy/editor-full.png" alt-text="Screenshot of the 'Indexing Policy' section for a container within a database in the Fabric portal.":::

1. In the editor, update the setting to a new value. For example, you can set the indexing policy to only index the `name` and `category` properties for items in the container using this policy.

    ```json
    {
      "indexingMode": "consistent",
      "automatic": true,
      "includedPaths": [
        {
          "path": "/name/?"
        },
        {
          "path": "/category/?"
        }
      ],
      "excludedPaths": [
        {
          "path": "/*"
        }
      ]
    }
    ```

## Set using the Azure SDK

Finally, use the Azure SDK to set the indexing policy for a container.

:::zone pivot="dev-lang-python"

```python
database = client.get_database_client("<database-name>")

container = database.get_container_client("<container-name>")

# Create policy that only indexes specific paths
indexing_policy = {
  "indexingMode": "consistent",
  "automatic": True,
  "includedPaths": [
    {
      "path": "/name/?"
    },
    {
      "path": "/category/?"
    }
  ],
  "excludedPaths": [
    {
      "path": "/*"
    }
  ]
}

# Create policy that only indexes specific paths
database.replace_container(container, partition_key=PartitionKey(path='/<partition-key-path>'), indexing_policy=indexing_policy)
```

:::zone-end

:::zone pivot="dev-lang-typescript"

```typescript
const container: Container = client.database('<database-name>').container('<container-name>');

const { resource: containerProperties } = await container.read();

// Create policy that only indexes specific paths
containerProperties['indexingPolicy'] = {
  indexingMode: 'consistent',
  automatic: true,
  includedPaths: [
    {
      path: '/name/?'
    },
    {
      path: '/category/?'
    }
  ],
  excludedPaths: [
    {
      path: '/*'
    }
  ]
}

await container.replace(containerProperties);
```

:::zone-end

:::zone pivot="dev-lang-csharp"

```csharp
Container container = client
    .GetDatabase("<database-name>")
    .GetContainer("<container-name>");

ContainerProperties properties = await container.ReadContainerAsync();

// Create policy that only indexes specific paths
IndexingPolicy indexingPolicy = new()
{
    IndexingMode = IndexingMode.Consistent,
    Automatic = true
};
indexingPolicy.ExcludedPaths.Add(
    new ExcludedPath{ Path = "/*" }
);
indexingPolicy.IncludedPaths.Add(
    new IncludedPath { Path = "/name/?"  }
);
indexingPolicy.IncludedPaths.Add(
    new IncludedPath { Path = "/category/?" }
);
properties.IndexingPolicy = indexingPolicy;

await container.ReplaceContainerAsync(properties);
```

:::zone-end

## Related content

- [Review indexing policies in Cosmos DB in Microsoft Fabric](indexing-policies.md)
- [Explore sample indexing policies in Cosmos DB in Microsoft Fabric](sample-indexing-policies.md)
- [Configure a Cosmos DB database container in Microsoft Fabric](how-to-configure-container.md)
