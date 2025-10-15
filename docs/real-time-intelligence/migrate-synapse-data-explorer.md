---
title: Migrate from Azure Synapse Data Explorer to Fabric (preview)
description: Learn about migrating from Azure Synapse Data Explorer to Microsoft Fabric, including key considerations and different migration scenarios.
author: spelluru
ms.author: spelluru
ms.reviewer: sharmaanshul
ms.topic: how-to
ms.date: 03/26/2025
#customer intent: As a data engineer, I want to understand the migration process from Azure Synapse Data Explorer to Fabric Eventhouse so that I can effectively transition my workloads.
---


# Migrate from Azure Synapse Data Explorer to Fabric Eventhouse (preview)

> [!IMPORTANT]
> Azure Synapse Analytics Data Explorer (Preview) will be retired on October 7, 2025. After this date, workloads running on Synapse Data Explorer will be deleted, and the associated application data will be lost. We highly recommend [migrating to Eventhouse](/fabric/real-time-intelligence/migrate-synapse-data-explorer) in Microsoft Fabric.

The Microsoft Cloud Accelerate Factory (CAF) program accepts customer nominations from the Microsoft account team, to help customers migrate to Fabric. CAF provides hands-on keyboard resources at no-cost to the customer. Hands-On keyboard resources are assigned for 6-8 weeks with an agreed scope. Customers can also use [this form](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR0PMD-G9mq1Kry22u32eGOtUQ1pWQVIyUU9USDBXSjUwQ1E0NEJCMExORC4u) to request help directly from Microsoft.

While Azure Synapse provides [Data Explorer](/azure/synapse-analytics/data-explorer/data-explorer-overview), Fabric offers [Eventhouses](eventhouse.md), [KQL databases](create-database.md), and [KQL querysets](create-query-set.md). Eventhouses in Fabric are designed to ingest, store, and analyze real-time data streams. They provide a scalable, high-performance, and cost-effective solution for processing and analyzing real-time data.

This feature allows you to migrate all the data from a single Synapse Data Explorer cluster to an eventhouse in Fabric. The process migrates all databases of the source cluster to the destination eventhouse, and also moves the source cluster's query and ingestion endpoint URI to the eventhouse. Therefore, you can reference the eventhouse by both the source cluster's and the eventhouse endpoints, ensuring that existing ingestion and queries continue to work.

> [!IMPORTANT]
> After the migration, the source cluster is placed in a new state called *Migrated*. In this state, the cluster is suspended and can't be resumed or restored. As long as the source cluster exists, its endpoints are redirected to the eventhouse. The source cluster's endpoints remain active for up to 90 days following the migration. Once the source cluster is deleted, its endpoints stop redirecting to the eventhouse. We recommend that users update all queries and ingestion processes to the new eventhouse endpoints within this period.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- The source cluster must be in a running state and resource locks are removed.
- A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
- You must have a [Microsoft Entra token](/rest/api/fabric/articles/get-started/fabric-api-quickstart)
- You must have at least the **Owner** role on the source cluster
- You must have at least the **Admin** role on the target Fabric workspace

## Key considerations

Before you migrate, consider the following key points:

- The migration process creates a new eventhouse.
- The migration is performed on the entire cluster, including all its databases.
- The migration process is irreversible.
- You must manually add users from other tenants who previously had access to the cluster to the new eventhouse.
- The cluster and the eventhouse must be in the same tenant and region.
- The migration process can take a few hours to complete, depending on the size of the cluster. For information on tracking the status, see [Monitor migration progress](migrate-api-to-eventhouse.md#monitor-migration-progress).

## Which features can be migrated?

| Feature | Can be migrated? | Notes |
|--|--|--|
| Purge | :x: | Not supported in Eventhouse. |
| Cluster-level policies | :x: | |
| System-assigned managed identities | :x: | Not supported in Eventhouse. |
| Cluster Azure RBAC roles | :heavy_check_mark: |  |
| Data connections, such as Event Hubs, IoT Hub, Event Grid | :x: | Not all data connections available in Synapse Data Explorer are supported in Eventhouse. You must remove them before migration and re-create supported data connections in the new eventhouse. |
| Data export operations | :x: | Data export operations, such as `.export` commands and continous export, aren't migrated automatically. You must manaully add them in the new eventhouse.|
| Follower and leader clusters | :x: | You must manually remove them before migration. |
| Database pretty names | :x: | You must manually add them in the new eventhouse. |
| Customer-managed keys | :x: | You must manually remove them before migration. |
| Virtual network injected clusters | :x: | You must manually disable it before migration. |
| Private Endpoint enabled clusters | :x: | You must manually disable it before migration. |
| Managed Private Endpoint enabled clusters | :x: | You must manually disable it before migration. |
| Firewall rules | :x: | Not supported in Eventhouse. |
| Python in sandbox | :heavy_check_mark: | Python is automatically enabled in the new eventhouse. |

## Migration steps

The migration process can take a few hours to complete, depending on the size of the cluster. During this period, the source cluster continues to serve queries but doesn't process new ingestions. If you're using queued ingestion, the requests are processed after the migration with no data loss. However, streaming ingestion doesn't work during this period.

The migration process is performed using Fabric REST API endpoints. The recommended steps for performing the migration are as follows:

1. **Validate**: Use the [Validate migration to Eventhouse](migrate-api-validate-synapse-data-explorer.md) endpoint to check whether the Azure Synapse Analytics Data Explorer cluster can be migrated to an eventhouse.
1. **Migrate**: Use the [Migrate to Eventhouse](migrate-api-to-eventhouse.md) with the `migrationSourceClusterUrl` payload to create an eventhouse with the migration source cluster URL. The process runs asynchronously to create a new eventhouse and migrate all databases from the source cluster to the eventhouse.
1. **Monitor**: Use the [Monitor migration progress](migrate-api-to-eventhouse.md#monitor-migration-progress) to track the progress of your migration.
1. **Verify**: Verify the migration by checking the [eventhouse state](manage-monitor-eventhouse.md#view-system-overview) is **Running**, and that the migrated databases appear in the [KQL database list](manage-monitor-eventhouse.md#view-databases-overview).

    > [!IMPORTANT]
    > Make sure to update queries and ingestion processes to point to new [Eventhouse endpoints](access-database-copy-uri.md#copy-uri) within 90 days of migration. After 90 days, the source cluster is deleted and its endpoints stop redirecting to the eventhouse and it will not be recoverable.

The API endpoints can be called directly or in an automated PowerShell script. A sample PowerShell script is available in the [Microsoft Fabric GitHub repository](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/MigrateFromAzureToEventhouse.ps1). To run the script, in addition to the [prerequisites](#prerequisites), you must have the Az PowerShell module with at least version '2.64.0', which you can install by running 'Install-Module az' in PowerShell.

## Related content

- [What is Real-Time Intelligence in Fabric?](overview.md)
- [Create a KQL database](create-database.md)
