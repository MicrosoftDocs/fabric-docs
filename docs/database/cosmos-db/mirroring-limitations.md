---
title: Mirroring Limitations in Cosmos DB
description: Learn how data is mirrored from Cosmos DB in Microsoft Fabric to OneLake. Discover limitations and benefits.
ms.topic: limits-and-quotas
ms.date: 10/23/2025
ai-usage: ai-generated
---

# Mirroring limitations in Cosmos DB database in Microsoft Fabric

This article details the current limitations for mirroring for Cosmos DB databases in Microsoft Fabric. The limitation and quota details on this page are subject to change in the future.

## Availability limitations

- [!INCLUDE [fabric-mirroreddb-supported-regions](../../mirroring/includes/fabric-mirroreddb-supported-regions.md)]

## Security limitations

- Fabric workspace permissions automatically grant access to mirrored Cosmos DB data. Users with workspace access inherit corresponding permissions to query and view mirrored data.

- Setting Fabric [item permissions](../../security/permission-model.md#item-permissions) is currently not supported for Cosmos DB databases.

[!INCLUDE[Cosmos DB Mirroring Limitations](../../mirroring/cosmos-db/includes/mirroring-limitations.md)]

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
- [Review limitations of Cosmos DB in Microsoft Fabric](limitations.md)
