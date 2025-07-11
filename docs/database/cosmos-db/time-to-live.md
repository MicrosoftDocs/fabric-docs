---
title: Time To Live in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Automatically purge items after a specified amount of time using the time-to-live (TTL) feature of Cosmos DB in Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/14/2025
ai-usage: ai-generated
appliesto:
- ✅ Cosmos DB in Fabric
---

# Time to live (TTL) in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

The time-to-live (TTL) feature in Cosmos DB helps you manage your data's lifecycle by automatically deleting items after a specified period. TTL is especially useful for scenarios where data is only relevant for a limited time, such as session data, metrics, or logs. By enabling TTL, you can keep your database lean, reduce storage costs, and ensure that only current, relevant data is retained.

## How TTL works

When TTL is enabled on a container or an individual item, Cosmos DB tracks the age of each item. Once an item's age exceeds its TTL value, the system automatically marks it for deletion and purges it. TTL can be set at the container level (applies to all items) and/or overridden at the item level for more granular control.

- **Container-level TTL**: All items in the container inherit the default TTL unless an item-level TTL is specified.

- **Item-level TTL**: You can set a specific TTL for individual items, overriding the container's default.

- **Disabling TTL**: Setting TTL to -1 disables automatic deletion for the container or item.

TTL values are specified in seconds. The countdown starts from the item's last modified time (or creation time if not updated). When the TTL expires, the item is eligible for automatic deletion during the next background purge cycle.

## Benefits of using TTL

- **Automated data cleanup**: No need for manual deletion scripts or scheduled jobs.

- **Cost savings**: Reduce storage costs by removing stale or irrelevant data.

- **Improved performance**: Keep your database efficient by retaining only active data.

## Configuring TTL

The TTL value is interpreted as a delta, in seconds, from the time that an item was last modified. The following rules apply when setting a TTL value.

Time to live (TTL) can be set at both the container and item level, giving you flexibility to manage data expiration just the way you want.

This setup lets you mix and match expiration policies to fit your data retention needs, whether you want everything to expire, nothing to expire, or a little of both.

Here's how configuring the TTL at the container and item levels works:

- Container-level TTL

  - If you don't set a TTL (or set it to `null`), items in the container don't expire automatically.
  
  - If you set the container TTL to `-1`, it's like saying "keep everything forever." Items don't expire by default. Mathematically, this setting is equivalent to setting the expiration to *infinity*.
  
  - If you set the container TTL to a positive *nonzero* number `n`, every item in the container will expire `n` seconds after its last modification, update. If the item was never modified, the expiration is based on the creation time.
  
- Item-level TTL

  - Item-level TTL only comes into play if the TTL property is set at the container level and is **NOT** set to `null`.
  
  - If you set a TTL on an item, it overrides the container's default. For example, if the container TTL is **1 hour**, but an item's TTL is set to **10 minutes**, that item will expire after **10 minutes**.
  
  - If an item's TTL is set to `-1`, it doesn't expire even if the container has a TTL.
  
  - If the container TTL isn't set, any TTL set on items is ignored.
  
  - If the container TTL is `-1`, but an item's TTL is a positive number, that item will expire after its own TTL, while other items in the container remain indefinitely.

> [!TIP]
> In various software development kits (SDKs), the container-level value is often identified as the `DefaultTimeToLive` property of the container. In the item itself, the item-level value is set using the `ttl` property.

## Example TTL configurations

This table illustrates example scenarios with different TTL values assigned at the container or item level.

| Scenario | Container TTL | Item TTL | Comments |
| --- | --- | --- |
| TTL is disabled | `<null>` | | This configuration is the **default** behavior where items never expire |
| TTL is disabled | `<null>` | `-1` | Items never expire |
| TTL is disabled | `<null>` | `3600` | Items never expire |
| TTL is enabled | `-1` | | TTL is enabled but items never expire |
| TTL is enabled | `-1` | `-1` | TTL is enabled but items never expire |
| TTL is enabled | `-1` | `3600` | TTL is enabled and specific items expire after 1 hour |
| All items expire after seven days | `604800` | | Every item is deleted seven days after creation or last update |
| Some items never expire while others expire after seven days | `604800` | `-1` | Items with TTL -1 are never deleted while others expire after seven days |
| Items expire after 1 hour | `3600` | | All items are deleted 1 hour after creation or last update |
| Specific item expires after 30 minutes while others expire after 1 hour | `3600` | `1800` | Most items expire after 1 hour, but specific items expire after 30 minutes |

> [!NOTE]
> Setting TTL to null on an item isn't supported. The item TTL value must be a nonzero positive integer less than or equal to `2147483647`. Alternatively, you can set the TTL to `-1`, which means the individual items don't expire. To use the default TTL on an item, ensure the `ttl` property isn't present.

## Next step

> [!div class="nextstepaction"]
> [Configure time-to-live (TTL) for a container in Cosmos DB in Microsoft Fabric](how-to-configure-time-to-live.md)

