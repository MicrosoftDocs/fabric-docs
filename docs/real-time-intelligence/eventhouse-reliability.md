---
title: Reliability in Eventhouse
description: Learn about production deployment recommendations for reliability, resiliency, and disaster recovery in Microsoft Fabric Eventhouse.
ms.reviewer: sharmaanshul
ms.topic: concept-article
ms.subservice: rti-eventhouse
ms.date: 05/13/2026
ai-usage: ai-assisted
---

# Reliability in Eventhouse

Reliability is a shared responsibility. Microsoft provides platform capabilities that support resiliency and recovery. You're responsible for understanding how those capabilities apply to your workloads and selecting the patterns and configurations needed to meet your business objectives and uptime goals.

## Reliability architecture overview

Eventhouse follows a platform-managed reliability model focused on service availability, data integrity, and predictable recovery behavior. Reliability is achieved through platform monitoring, automated recovery workflows, and zonal isolation in supported regions.

During some incidents, read access might remain available while write operations are temporarily limited to protect data integrity.

## Design for reliability

### Design for transient fault handling

Applications that interact with Eventhouse should be prepared to handle temporary operation failures, connectivity interruptions, and service throttling by retrying requests that fail due to transient conditions.

### Design for Availability Zone resiliency

Availability Zones help reduce the impact of localized infrastructure failures within a region. Capacity might be temporarily reduced during a zone outage and ingestion or query requests might need to be retried.

### Design for region-wide failures

Eventhouse resources are deployed into a single Azure region. If that region becomes unavailable, the eventhouse and its data in that region are unavailable.

Implement a customer-managed multi-region resiliency approach:

1. Deploy separate eventhouse instances in multiple regions.
1. Replicate data into both regions (for example, by double-ingesting from an upstream source).
1. Prepare application traffic failover procedures (for example, connection string or DNS switch).
1. Define operational runbooks for region failover and failback.

### Design for backup and recovery

Eventhouse doesn't provide a native backup and restore capability for KQL databases, and doesn't currently provide a native point-in-time restore or incremental rollback capability comparable to Azure SQL PITR.

For backup and recovery scenarios, supported approaches include:

- Continuous export to external storage.
- Scheduled or manual export to cloud storage.
- Ingesting raw data from an upstream source (for example, a data lake) that can be backed up separately.

Backups should complement a broader resiliency architecture rather than be relied upon as the sole recovery mechanism. In practice, customers address data corruption or recovery scenarios by rehydrating from upstream sources or by maintaining customer-managed replicas.

We recommend explicitly designing ingestion pipelines so replay and rebuild are operationally straightforward and testable as part of disaster recovery (DR) drills.

## Resilience to transient faults

Transient faults are short, intermittent failures that can occur in distributed cloud environments. Applications should retry affected requests.

## Resilience to Availability Zone failures

Availability Zones are physically separate datacenter locations within an Azure region. In supported regions, Eventhouse can benefit from zonal isolation to reduce the impact of localized failures.

## Resilience to region-wide failures

To minimize the business impact of a region outage, deploy separate eventhouse instances in multiple regions and coordinate data replication, traffic routing, and failover between regions.

If two regions are deployed in the same tenant, all tenant metadata remains anchored to the home region, creating a dependency risk during home region outages. Operations dependent on metadata (artifact permissions, network security) are disrupted even if capacities in secondary regions are online. In this case, you must wait for Microsoft to recover the home region's metadata services before full operations can resume, as capacities in other regions become effectively unusable without metadata access.

To avoid this dependency, deploy the two regions in a separate Entra tenant homed in your secondary region of choice. To protect from regional infrastructure outages with RTO ~ 0, deploy a secondary stack.

## Backup and restore

For most solutions, don't rely exclusively on backups. Use backups to complement multi-region resiliency. Options include:

- Continuous export to external storage.
- Scheduled or manual export to cloud storage.
- Ingest raw data from an upstream source that can be backed up separately.

## Disaster recovery model for KQL databases

KQL data isn't stored in OneLake by default and therefore isn't included in Fabric's capacity-level disaster recovery capabilities.

The supported pattern is a multi-region setup (active/passive or active/active), with independent eventhouse instances per region and customer-managed ingestion and configuration replication. Git-based deployment, Fabric APIs, and automation are commonly used to keep secondary environments lightweight, cost-controlled, and ready for failover.

## OneLake availability and RPO considerations

When OneLake availability is enabled for KQL, data is asynchronously written and optimized before becoming available. This can introduce delays in worst-case recovery scenarios.

We recommend viewing OneLake availability as a recovery and investigation aid rather than a hot-standby DR mechanism. For tighter recovery point objective (RPO) requirements, parallel ingestion into a secondary KQL environment provides more deterministic recovery characteristics.

## Artifact identity (GUIDs) during recovery

Recreating Fabric artifacts results in new identifiers, and there's currently no automatic GUID preservation or remapping.

Customers with embedded or external dependencies typically mitigate this using indirection layers, configuration-driven references, and scripted repointing as part of their DR runbooks. This approach allows recovery to be predictable and repeatable when artifacts are recreated.

## Direct Lake semantic models during failover

Direct Lake behavior during regional outages depends on the availability of the underlying data sources. In some cases, manual repointing or redeployment is required.

We recommend planning for this explicitly with scripted validation and recovery steps so intervention is fast and operationally safe when needed.

## What's covered by default

- **Power BI artifacts** benefit from built-in geo-redundancy and remain accessible in read-only mode during regional disruptions.
- **Real-Time Intelligence/KQL services** include Availability Zone resiliency, and Fabric supports cost-optimized secondary capacities that can remain mostly idle until needed.

## Resilience to service maintenance

Eventhouse regularly applies service updates and performs routine maintenance. Applications should retry failed requests during maintenance.

## Service-level agreement (SLA)

For information about the SLA for Microsoft Fabric, see [Service Level Agreements for Online Services](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services).

## Related content

- [Eventhouse overview](eventhouse.md)
- [Create an eventhouse](create-eventhouse.md)
- [Data availability in OneLake](one-logical-copy.md)
