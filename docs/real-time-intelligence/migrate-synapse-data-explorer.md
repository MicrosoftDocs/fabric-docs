---
title: Migrate from Azure Synapse Data Explorer to Fabric (preview)
description: Learn about migrating from Azure Synapse Data Explorer to Microsoft Fabric, including key considerations and different migration scenarios.
author: shsagir
ms.author: shsagir
ms.reviewer: sharmaanshul
ms.topic: concept-article
ms.date: 10/30/2024
#customer intent: As a data engineer, I want to understand the migration process from Azure Synapse Data Explorer to Fabric Eventhouse so that I can effectively transition my workloads.
---

# Migrate from Azure Synapse Data Explorer to Fabric Eventhouse (preview)

While Azure Synapse provides [Data Explorer](/azure/synapse-analytics/data-explorer/data-explorer-overview), Fabric offers [Eventhouses](eventhouse.md), [KQL databases](create-database.md), and [KQL querysets](create-query-set.md). Eventhouses in Fabric are designed to ingest, store, and analyze real-time data streams. They provide a scalable, high-performance, and cost-effective solution for processing and analyzing real-time data.

This feature allows you to migrate all the data from a single Synapse Data Explorer cluster to an eventhouse in Fabric. The process migrates all databases of the source cluster to the destination eventhouse, and also moves the source cluster's query and ingestion endpoint URI to the eventhouse. Therefore, you can reference the eventhouse by both the source cluster's and the eventhouse endpoints, ensuring that existing ingestion and queries continue to work.

> [!IMPORTANT]
> After the migration, the source cluster is placed in a new state called *Migrated*. In this state, the cluster is suspended and cannot be resumed or restored. As long as the source cluster exists, its endpoints are redirected to the eventhouse. The source cluster's endpoints remain active for up to 90 days following the migration. Once the source cluster is deleted, its endpoints stop redirecting to the eventhouse. We recommend that users update all ingestion and query processes to the new eventhouse endpoints within this period.

The migration process can take a few minutes. During this period, the source cluster continues to serve queries but doesn't process new ingestions. If you're using queued ingestion, the requests are processed after the migration with no data loss. However, streaming ingestion doesn't work during this period.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Key considerations

The feature is in preview and doesn't have a user interface. The migration is performed using the Fabric migration endpoint.

Before you migrate, consider the following key points:

**Migration scope**

- The migration is performed on the entire cluster; single database migration isn't supported.
- The migration is irreversible; once migrated, the source cluster can't be restored.
- The migration process creates a new eventhouse and can't be performed into an existing eventhouse.

**Identity and connections**

- System-assigned managed identities can't be used or migrated.
- Data connections, such as Event Hubs, IoT Hub, and Event Grid, aren't migrated.
- Data export operations, such as mirroring, aren't migrated.

**Compatibility**

- Follower and leader clusters can't be migrated.
- The cluster and the eventhouse must be in the same region, meaning that the target Fabric workspace must have the same capacity region as the source cluster.
- Cross-region migration isn't supported.

## Prerequisites

- The source cluster must be in a running state
- A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
- Users must have Admin permissions on both the source cluster and the target Fabric workspace to initiate the migration process

## Migration process

The migration process involves the following steps:

- **Run assessment checks**: Validate the limitations applicable to your source cluster. This indicates which operations are automatically performed and where manual intervention is needed.
- **Perform the actual migration**: Initiate the migration process using the Fabric migration endpoint. The process creates a new eventhouse and migrate all databases from the source cluster to the eventhouse.

## Related content

- [What is Real-Time Intelligence in Fabric?](overview.md)
- [Create a KQL database](create-database.md)
