---
title: Configure Time To Live in Cosmos DB Database
titleSuffix: Microsoft Fabric
description: Configure a time-to-live (TTL) value that automatically purges items from a Cosmos DB in Microsoft Fabric database during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/29/2025
ai-usage: ai-assisted
zone_pivot_groups: dev-lang-core
appliesto:
- ✅ Cosmos DB in Fabric
---

# Configure time to live (TTL) in Cosmos DB in Microsoft Fabric

The time-to-live (TTL) feature in Cosmos DB helps you manage your data's lifecycle by automatically deleting items after a specified period. In this guide, you modify the TTL value at the container and item level using the Fabric portal or an Azure SDK.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

[!INCLUDE[Prerequisites - Development languages core](includes/prerequisite-dev-lang-core.md)]

## Set at container level using the Fabric portal

First, use the Fabric portal to set the container-level TTL.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. Select and expand your existing container. Then, select **Settings**.

1. In the **Settings** section, select the redundant **Settings** tab.

1. Locate the **Time to Live** setting.

    :::image type="content" source="media/how-to-configure-time-to-live/settings.png" lightbox="media/how-to-configure-time-to-live/settings-full.png" alt-text="Screenshot of the 'Settings' section for a container within a database in the Fabric portal.":::

1. Update the setting to a new value. For example, you can set the value to **On (no default)** to set the default time-to-live at the container level to `-1` (*infinity*) where TTL is enabled but items don't expire by default.

1. Select **Save** to persist your changes.

    > [!TIP]
    > For more information on various time-to-live (TTL) configuration values, see [time-to-live](time-to-live.md#example-ttl-configurations).

## Set at item level

Next, update an item to set the TTL value at the item-level. Items within Cosmos DB are represented as JSON documents. The `ttl` property of each document is used to set the time-to-live of each specific item. The `ttl` property can either be set or not set and the corresponding value influences the behavior of TTL expiration.

```json
[
  {
    "name": "Heatker Women's Jacket",
    "category": "apparel"
  },
  {
    "name": "Vencon Kid's Coat",
    "category": "apparel",
    "ttl": -1
  },
  {
    "name": "Pila Swimsuit",
    "category": "apparel",
    "ttl": 3600
  }
]
```

## Set at container level using the Azure SDK

Now, use the Azure SDK to set the TTL at the container level to apply to all items.

:::zone pivot="dev-lang-python"

```python
database = client.get_database_client("<database-name>")

container = database.get_container_client("<container-name>")

# Set the container-level TTL to 7 days
database.replace_container(container, partition_key=PartitionKey(path='/<partition-key-path>'), default_ttl=60 * 60 * 24 * 7)
```

:::zone-end

:::zone pivot="dev-lang-typescript"

```typescript
const container: Container = client.database('<database-name>').container('<container-name>');

const { resource: containerProperties } = await container.read();

if (!containerProperties) {
    return;
}

// Set the container-level TTL to 7 days
containerProperties.defaultTtl = 60 * 60 * 24 * 7;

await container.replace(containerProperties);
```

:::zone-end

:::zone pivot="dev-lang-csharp"

```csharp
Container container = client
    .GetDatabase("<database-name>")
    .GetContainer("<container-name>");

ContainerProperties properties = await container.ReadContainerAsync();

// Set the container-level TTL to 7 days
properties.DefaultTimeToLive = 60 * 60 * 24 * 7;

await container.ReplaceContainerAsync(properties);
```

:::zone-end

## Set at item level using the Azure SDK

Finally, use the Azure SDK again to set item-level TTL values to override the container-level value.

:::zone pivot="dev-lang-python"

```python
container = client.get_database_client("<database-name>").get_container_client("<container-name>")

# Set the item-level TTL to 1 day
item = {
    "id": "ffffffff-5555-6666-7777-aaaaaaaaaaaa",
    "name": "Pila Swimsuit",
    "category": "apparel",
    "ttl": 60 * 60 * 24
}

container.upsert_item(item)
```

:::zone-end

:::zone pivot="dev-lang-typescript"

```typescript
const container: Container = client.database('<database-name>').container('<container-name>');

// Set the item-level TTL to 1 day
let item = {
    id: 'ffffffff-5555-6666-7777-aaaaaaaaaaaa',
    name: 'Pila Swimsuit',
    category: 'apparel',
    ttl: 60 * 60 * 24
};

await container.items.upsert(item);
```

:::zone-end

:::zone pivot="dev-lang-csharp"

```csharp
Container container = client
    .GetDatabase("<database-name>")
    .GetContainer("<container-name>");

// Set the item-level TTL to 1 day
var item = new {
    id = "ffffffff-5555-6666-7777-aaaaaaaaaaaa",
    name = "Pila Swimsuit",
    category = "apparel",
    ttl = 60 * 60 * 24
};

await container.UpsertItemAsync(item);
```

:::zone-end

## Related content

- [Review time-to-live (TTL) in Cosmos DB in Microsoft Fabric](time-to-live.md)
- [Configure a Cosmos DB database container in Microsoft Fabric](how-to-configure-container.md)
