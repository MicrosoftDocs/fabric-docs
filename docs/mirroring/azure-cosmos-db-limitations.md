---
title: "Limits and Quotas in Microsoft Fabric Mirrored Databases From Azure Cosmos DB (Preview)"
description: This article includes a list of limitations and quotas for Microsoft Fabric mirrored databases from Azure Cosmos DB.
author: seesharprun
ms.author: sidandrews
ms.reviewer: anithaa, whhender
ms.date: 10/22/2025
ms.topic: limits-and-quotas
ms.custom:
  - references_regions
---

# Limitations in Microsoft Fabric mirrored databases from Azure Cosmos DB (Preview)

This article details the current limitations for Azure Cosmos DB accounts mirrored into Microsoft Fabric. The limitation and quota details on this page are subject to change in the future.

> [!IMPORTANT]
> Mirroring for Azure Cosmos DB is currently in [preview](../fundamentals/preview.md). Production workloads aren't supported during preview. Currently, only Azure Cosmos DB for NoSQL accounts are supported.

## Availability limitations

- Mirroring is supported in a specific set of regions for Fabric and APIs for Azure Cosmos DB.

- Mirroring is only available for these Azure Cosmos DB account types listed here.

  | | Available |
  | --- | --- |
  | **API for NoSQL** | Yes |
  | **API for MongoDB (RU-based)** | No |
  | **API for MongoDB (vCore-based)** | No |
  | **API for Apache Gremlin** | No |
  | **API for Table** | No |
  | **API for Apache Cassandra (RU-based)** | No |
  | **Managed Instance for Apache Cassandra** | No |

- [!INCLUDE [fabric-mirroreddb-supported-regions](../mirroring/includes/fabric-mirroreddb-supported-regions.md)]

## Account and database limitations

- You can enable mirroring only if the Azure Cosmos DB account is configured with either 7-day or 30-day continuous backup.

- All current limitations of the continuous backup feature in Azure Cosmos DB also apply to Fabric mirroring.

  - These limitations include, but aren't limited to; the inability to disable continuous backup once enabled and lack of support for multi-region write accounts. For more information, see [Azure Cosmos DB continuous backup limitations](/azure/cosmos-db/continuous-backup-restore-introduction#current-limitations).

  - You can enable both the analytical store and continuous backup features on the same Azure Cosmos DB account.

- You can't disable the analytical store feature on Azure Cosmos DB accounts with continuous backup enabled.

- You can't enable continuous backup on an Azure Cosmos DB account that previously disabled the analytical store feature for a container.

## Security limitations

- Azure Cosmos DB read-write account keys and Microsoft Entra ID authentication with role-based access control are the only supported mechanisms to connect to the source account. Read-only account keys and managed identities aren't supported.

  - For Microsoft Entra ID authentication, the following role-based access control permissions are required:

    - `Microsoft.DocumentDB/databaseAccounts/readMetadata`

    - `Microsoft.DocumentDB/databaseAccounts/readAnalytics`  

  - For more information, see [data plane role-based access control documentation](/azure/cosmos-db/nosql/how-to-grant-data-plane-access).

- You must update the connection credentials for Fabric mirroring if the account keys are rotated. If you don't update the keys, mirroring fails. To resolve this failure, stop replication, update the credentials with the newly rotated keys, and then restart replication.

- Fabric users with access to the workspace automatically inherit access to the mirror database. However, you can granularly control workspace and tenant level access to manage access for users in your organization.

- You can directly share the mirrored database in Fabric.

- The source Azure Cosmos DB account must enable **public network access** for **all networks**.

- Private endpoints aren't supported for Azure Cosmos DB accounts.

- Network isolation using techniques and features like IP addresses or service endpoints aren't supported for Azure Cosmos DB accounts.

- Data in OneLake doesn't support private endpoints, customer managed keys, or double encryption.

## Permissions limitations

- If you only have viewer permissions in Fabric, you can't preview or query data in the SQL analytics endpoint.

- If you intend to use the data explorer, the Azure Cosmos DB data explorer doesn't use the same permissions as Fabric. Requests to view and query data using the data explorer are routed to Azure instead of Fabric.

## Data explorer limitations

- Fabric Data Explorer queries are read-only. You can view existing containers, view items, and query items.

- You can't create or delete containers using the data explorer in Fabric.

- You can't insert, modify, or delete items using the data explorer in Fabric.

- You can avoid sharing the source database by only sharing the SQL analytics endpoint with other users for analytics.

- You can't turn off the data explorer in a mirrored database.

## Replication limitations

- Mirroring doesn't support containers that contain items with property names containing either whitespaces or wild-card characters. This limitation causes mirroring for the specific container to fail. Other containers within the same databases can still successfully mirror. If property names are updated to remove these invalid characters, you must configure a new mirror to the same database and container and you can't use the old mirror.

- Fabric OneLake mirrors from the geographically closest Azure region to Fabric's capacity region in scenarios where an Azure Cosmos DB account has multiple read regions. In disaster recovery scenarios, mirroring automatically scans and picks up new read regions as your read regions could potentially fail over and change.

- Delete operations in the source container are immediately reflected in Fabric OneLake using mirroring. Soft-delete operations using time-to-live (TTL) values isn't supported.

- Mirroring doesn't support custom partitioning.

- Fabric has existing limitations with T-SQL. For more information, see [T-SQL limitations](../data-warehouse/tsql-surface-area.md#limitations).

[!INCLUDE[Cosmos DB Mirroring Limitations](includes/cosmos-db-mirroring-limitations.md)]

## Related content

- [Mirroring Azure Cosmos DB (Preview)](../mirroring/azure-cosmos-db.md)
- [FAQ: Microsoft Fabric mirrored databases from Azure Cosmos DB](../mirroring/azure-cosmos-db-faq.yml)
- [Troubleshooting: Microsoft Fabric mirrored databases from Azure Cosmos DB](../mirroring/azure-cosmos-db-troubleshooting.yml)
