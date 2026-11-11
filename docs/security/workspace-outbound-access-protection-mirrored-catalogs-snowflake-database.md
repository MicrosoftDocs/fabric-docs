---
title: Workspace outbound access protection for mirrored catalogs and Snowflake database
description: Learn how to configure workspace outbound access protection (OAP) for mirrored catalog and Snowflake database items in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for mirrored catalog and Snowflake database items so that I can allow only approved connections.
author: msmimart
ms.author: mimart
ms.reviewer: mahi
ms.date: 11/10/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Workspace outbound access protection for mirrored catalogs and Snowflake database

Workspace outbound access protection helps safeguard your data by controlling outbound connections from items in your workspace to external data sources. This article explains how outbound access protection applies to mirrored catalog items and Snowflake database items, and how to allow the connections these items need.

> [!NOTE]
> Workspace outbound access protection support for mirrored catalog and Snowflake database items is in preview.

## Supported item types

Outbound access protection applies to the following items:

- **Mirrored catalogs**, including:
  - [Mirrored AWS Glue catalog](../mirroring/catalog-mirroring/aws-glue.md).
  - [Mirrored Azure Monitor](../mirroring/catalog-mirroring/azure-monitor.md).
  - [Mirrored Dremio catalog](../mirroring/catalog-mirroring/dremio.md).
  - [Mirrored Google Lakehouse runtime catalog](../mirroring/catalog-mirroring/google-lakehouse-runtime.md).
- **[Snowflake database](../onelake/snowflake/create-snowflake-database-item.md)**.

> [!NOTE]
> This article doesn't cover mirrored Azure Databricks catalogs or mirrored databases from Snowflake. These are separate item types. For mirrored databases from Snowflake, see [Workspace outbound access protection for mirrored databases](workspace-outbound-access-protection-mirrored-databases.md).

## How outbound access protection works with these items

When outbound access protection is enabled for a workspace, all outbound connections from the workspace are blocked by default. Mirrored catalog and Snowflake database items connect to their external source through a cloud connection. To let these items connect, a workspace admin creates data connection rules that allow the item's connection type.

For mirrored catalogs, you only need a rule for the connection to the catalog itself. You don't need a separate data connection rule for the storage that holds the underlying table data, such as Amazon S3 or Google Cloud Storage.

## Allow connections for these items

1. Enable outbound access protection for the workspace. For more information, see [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md).
1. Create data connection rules for the connection types your items use, as described in the following sections, and select **Save**. For detailed steps, see [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md).

The options available depend on the item:

| Item | Allow the connection type | Block the connection type and allow specific endpoints | Block the connection type |
|---|---|---|---|
| Mirrored catalogs | Supported | Not supported | Supported |
| Snowflake database | Supported | Supported | Supported |

### Mirrored catalogs

Each mirrored catalog provider uses its own connection type. You can allow or block each connection type as a whole.

- To let a mirrored catalog item connect to its source, add a cloud connection rule for that provider's connection type and set it to **Allowed**.
- To block a provider, leave its connection type blocked.

### Snowflake database

Snowflake database items use the **Snowflake** connection type, which supports endpoint exceptions:

- **Allow all Snowflake connections:** Add a cloud connection rule for Snowflake and set it to **Allowed**.
- **Allow only specific Snowflake accounts:** Add a cloud connection rule for Snowflake, add your Snowflake account endpoint as an exception, and leave the connection type set to **Blocked**. Connections to that endpoint succeed, and all other Snowflake connections are blocked.
- **Block all Snowflake connections:** Leave the Snowflake connection type blocked, with no exceptions.

> [!IMPORTANT]
> Endpoint exceptions take effect only when the Snowflake connection type is blocked. If the Snowflake connection type is set to **Allowed**, connections to any Snowflake endpoint are allowed, regardless of the exceptions you add.

## Considerations and limitations

Outbound access protection doesn't change the network requirements of the source. For mirrored catalogs, Fabric must still reach the source catalog and its storage over the public internet. For Snowflake database, connectivity between Snowflake and OneLake occurs over the public network.

For limitations that apply across workloads, see [Workspace outbound access protection overview - Considerations and limitations](workspace-outbound-access-protection-overview.md#considerations-and-limitations).

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md).
- [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md).
- [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md).
- [What is Mirroring in Fabric?](../mirroring/overview.md).
