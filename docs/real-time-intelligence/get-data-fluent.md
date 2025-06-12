---
title: Get data from Fluent Bit
description: Learn how to get data from Fluent Bit in a KQL database in Real-Time Intelligence.
ms.reviewer: akshayd
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 12/01/2024
---
# Get data with Fluent Bit

[!INCLUDE [fluent-bit](~/../kusto-repo/data-explorer/includes/cross-repo/fluent-bit.md)]

For a complete list of data connectors, see [Data connectors overview](data-connectors/data-connectors.md).

## Prerequisites

* [Fluent Bit](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit).
* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with ingestion permissions.
* A [KQL queryset](create-query-set.md), which will be referred to later as your query environment. <a id=ingestion-uri></a>
* Your database ingestion URI to use as the *TargetURI* value. For more information, see [Copy URI](access-database-copy-uri.md#copy-uri).

[!INCLUDE [fluent-bit-2](~/../kusto-repo/data-explorer/includes/cross-repo/fluent-bit-2.md)]

<!--[!INCLUDE [fluent-bit-3](~/../kusto-repo/data-explorer/includes/cross-repo/fluent-bit-3.md)]-->

## Related content

* [Query data in a KQL queryset](kusto-query-set.md)
