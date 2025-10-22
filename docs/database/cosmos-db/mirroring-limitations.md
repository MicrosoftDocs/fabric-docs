---
title: Mirroring Limitations in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Learn how data is mirrored from Cosmos DB in Microsoft Fabric to OneLake. Discover limitations and benefits during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: limits-and-quotas
ms.date: 10/22/2025
ai-usage: ai-generated
appliesto:
- ✅ Cosmos DB in Fabric
---

# Mirroring limitations in Cosmos DB database in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

This article details the current limitations for mirroring for Cosmos DB databases in Microsoft Fabric. The limitation and quota details on this page are subject to change in the future.

## Availability limitations

- [!INCLUDE [fabric-mirroreddb-supported-regions](../../mirroring/includes/fabric-mirroreddb-supported-regions.md)]

## Account and database limitations

- Container throughput limitations from Cosmos DB in Fabric apply to mirrored containers:

  - Maximum autoscale throughput of 10,000 RU/s per container

  - Default allocation of 5,000 RU/s for containers created through the Fabric portal

  - Container throughput can't be modified after creation

## Security limitations

- Authentication to the source Cosmos DB iin Fabric database is limited to:
  
  - Microsoft Entra ID authentication with appropriate role-based access control permissions

- Fabric workspace permissions automatically grant access to mirrored Cosmos DB data. Users with workspace access inherit corresponding permissions to query and view mirrored data.

- Setting Fabric [item permissions](../../security/permission-model.md#item-permissions) is currently not supported for Cosmos DB databases.

## Data explorer limitations

- The Fabric data explorer for Cosmos DB provides read-only access to mirrored data. You can view containers, browse items, and execute queries, but can't create, modify, or delete containers or items.

- Users with only viewer permissions in the Fabric workspace can't preview or query data through the SQL analytics endpoint, but may still access the data explorer depending on their Azure Cosmos DB account permissions.

[!INCLUDE[Cosmos DB Mirroring Limitations](../../mirroring/cosmos-db/includes/mirroring-limitations.md)]

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently asked questions about Cosmos DB in Microsoft Fabric](faq.yml)
- [Review limitations of Cosmos DB in Microsoft Fabric](limitations.md)
