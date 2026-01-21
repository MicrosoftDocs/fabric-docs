---
title: Workspace outbound access protection for mirrored Databases
description: Learn how to configure Workspace Outbound Access Protection (OAP) to secure your mirrored Database resources in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure data connections from mirrored databases to only approved destinations.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.date: 12/01/2025
ms.topic: how-to
---

# Workspace outbound access protection for mirrored databases (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from mirrored databases in your workspace to external data sources. When this feature is enabled, [mirrored database items](#supported-mirrored-database-item-types) are restricted from making outbound connections unless access is explicitly granted through approved data connection rules. 

## Understanding outbound access protection with mirrored databases

When outbound access protection is enabled, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to grant access only to approved destinations by configuring data connection rules.

Mirrored databases adhere to data connection rules for mirroring. Only sources explicitly permitted by these rules can be mirrored; all other mirroring connections are blocked. For example, if a data connection rule allows access only to `contoso.database.windows.net`, mirroring is restricted to the SQL Server at that address, and connections to any other sources are denied.

:::image type="content" source="media/workspace-outbound-access-protection-mirrored-databases/mirrored-database-data-connection-rule.png" alt-text="Screenshot showing the data connection rule for a mirrored database connection when outbound access protection is enabled." lightbox="media/workspace-outbound-access-protection-mirrored-databases/mirrored-database-data-connection-rule.png":::

## Configuring outbound access protection for mirrored databases

To configure outbound access protection for mirrored databases, follow the steps in [Set up workspace outbound access protection](workspace-outbound-access-protection-set-up.md). After enabling outbound access protection, you can configure data connection rules to allow outbound access to your database sources.

## Supported mirrored database item types

Outbound access protection applies to the following Microsoft Fabric mirrored database sources:

- Azure SQL Database
- Snowflake
- Open mirroring database
- Azure Cosmos DB
- Azure SQL Managed Instance
- Azure Database for PostgreSQL
- SQL Server
- Oracle
- Google Big Query

> [!NOTE]
> Mirrored databases follow data connection rules for mirroring. Only allowed sources can be mirrored. Connections to other sources for mirroring are blocked.

## Considerations and limitations

* Outbound access protection is enforced at the workspace level. All mirrored databases in the workspace must have data connection rules configured to connect to external sources.
* Mirrored databases follow data connection rules for mirroring. Only allowed sources can be mirrored.

## Related content

- [Set up workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
- [What is Mirroring in Fabric?](../database/mirrored-database/overview.md)