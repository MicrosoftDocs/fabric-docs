---
title: "Data Security in Microsoft Fabric Mirrored Databases From Google BigQuery"
description: Learn about data security in mirrored databases from Google BigQuery in Microsoft Fabric.
author: misaacs
ms.author: misaacs
ms.reviewer: whhender
ms.date: 09/09/2025
ms.topic: how-to
---

# Secure data Microsoft Fabric mirrored databases from Google BigQuery

This guide helps you establish data security in your mirrored BigQuery in Microsoft Fabric.

> [!IMPORTANT]
> We support Mirroring for Google BigQuery with On-Premises Data Gateways (OPDG). OPDG 3000.286.6 or greater is supported. VNET is also supported.

## Security considerations

[!INCLUDE [google-bigquery-permissions](includes/google-bigquery-permissions.md)]

## Data protection features

You can secure column filters and predicate-based row filters on tables to roles and users in Microsoft Fabric:

- [Row-level security in Fabric data warehousing](../data-warehouse/row-level-security.md)
- [Column-level security in Fabric data warehousing](../data-warehouse/column-level-security.md)

You can also mask sensitive data from nonadmins using dynamic data masking:

- [Dynamic data masking in Fabric data warehousing](../data-warehouse/dynamic-data-masking.md)

## Related content

- [Google BigQuery mirroring overview](google-bigquery.md)
- [Tutorial to set up mirroring for Google BigQuery](google-bigquery-tutorial.md)
