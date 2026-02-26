---
title: Customize indexing policies in Cosmos DB Database
description: Create a custom indexing policy for a container within a database in Cosmos DB in Microsoft Fabric.
ms.reviewer: mjbrown
ms.topic: how-to
ms.date: 10/30/2025
ai-usage: ai-assisted
zone_pivot_groups: dev-lang-core
---

# Customize indexing policies in Cosmos DB in Microsoft Fabric

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

    :::image type="content" source="media/how-to-customize-indexing-policy/editor.png" lightbox="media/how-to-customize-indexing-policy/editor-full.png" alt-text="Screenshot of the 'Indexing Policy' section for a container within a database in the Fabric portal.":::

1. In the editor, update the setting to a new value. For example, consider this sample document structure that contains both business data and system metadata:

    ```json
    {
      "id": "product-123",
      "_etag": "abc123def456",
      "name": "Wireless Headphones",
      "category": "Electronics",
      "price": 99.99,
      "metadata": {
        "createdBy": "system",
        "lastModified": "2025-10-30T10:30:00Z",
        "version": 1.2,
        "tags": ["internal", "generated"],
        "audit": {
          "importSource": "legacy-system",
          "reviewStatus": "pending"
        }
      }
    }
    ```

1. You can create an indexing policy that indexes all properties except for metadata fields that are typically not used in queries:

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
          "path": "/_etag/?"
        },
        {
          "path": "/metadata/*"
        }
      ]
    }
    ```

    > [!NOTE]
    > The `/_etag/?` path uses `?` to exclude only the `_etag` property itself, while `/metadata/*` uses `*` to exclude the entire `metadata` object and all its child properties.

    With this indexing policy applied to the sample document:
    - **Indexed properties**: `id`, `name`, `category`, `price` (and all other properties except those excluded)
    - **Excluded from indexing**:
      - `_etag` property (single value)
      - Entire `metadata` object including `createdBy`, `lastModified`, `version`, `tags`, and the nested `audit` object with its properties

    This approach optimizes storage and performance by excluding system metadata that's typically not used in user queries while keeping all business data searchable.

## Set using the Azure SDK

Finally, use the Azure SDK to set the indexing policy for a container.

:::zone pivot="dev-lang-python"

```python
database = client.get_database_client("<database-name>")

container = database.get_container_client("<container-name>")

# Create policy that indexes all paths except metadata fields
indexing_policy = {
  "indexingMode": "consistent",
  "automatic": True,
  "includedPaths": [
    {
      "path": "/*"
    }
  ],
  "excludedPaths": [
    {
      "path": "/_etag/?"
    },
    {
      "path": "/metadata/*"
    }
  ]
}

# Apply the indexing policy to the container
await database.replace_container(container, partition_key=PartitionKey(path='/<partition-key-path>'), indexing_policy=indexing_policy)
```

:::zone-end

:::zone pivot="dev-lang-typescript"

```typescript
const container: Container = client.database('<database-name>').container('<container-name>');

const { resource: containerProperties } = await container.read();

// Create policy that indexes all paths except metadata fields
containerProperties['indexingPolicy'] = {
  indexingMode: 'consistent',
  automatic: true,
  includedPaths: [
    {
      path: '/*'
    }
  ],
  excludedPaths: [
    {
      path: '/_etag/?'
    },
    {
      path: '/metadata/*'
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

// Create policy that indexes all paths except metadata fields
IndexingPolicy indexingPolicy = new()
{
    IndexingMode = IndexingMode.Consistent,
    Automatic = true
};
indexingPolicy.IncludedPaths.Add(
    new IncludedPath { Path = "/*" }
);
indexingPolicy.ExcludedPaths.Add(
    new ExcludedPath{ Path = "/_etag/?" }
);
indexingPolicy.ExcludedPaths.Add(
    new ExcludedPath{ Path = "/metadata/*" }
);
properties.IndexingPolicy = indexingPolicy;

await container.ReplaceContainerAsync(properties);
```

:::zone-end

## Related content

- [Review indexing policies in Cosmos DB in Microsoft Fabric](indexing-policies.md)
- [Explore sample indexing policies in Cosmos DB in Microsoft Fabric](sample-indexing-policies.md)
- [Configure a Cosmos DB database container in Microsoft Fabric](how-to-configure-container.md)

