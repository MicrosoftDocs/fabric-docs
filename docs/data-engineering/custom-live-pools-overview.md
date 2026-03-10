---
title: Custom Live Pools for Fabric Data Engineering overview
description: Learn about Custom Live Pools in Microsoft Fabric, which provide fast, predictable Spark session startup for enterprise analytics workloads.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/09/2026
ai-usage: ai-assisted
---

# Custom Live Pools in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Custom Live Pools are pre-warmed Spark clusters that provide near-instant session startup for notebook-based workloads in Microsoft Fabric. Instead of waiting for cluster provisioning on every run, Custom Live Pools keep a set of hydrated clusters ready during a configured schedule window, enabling approximately 5-second session start times for your interactive and scheduled notebooks.

## Why use Custom Live Pools

Standard Spark sessions in Fabric require cluster provisioning each time a session starts. For teams that run frequent notebooks—whether interactive, scheduled, or pipeline-triggered—this provisioning time can slow iteration cycles and increase overall job latency.

Custom Live Pools address this by:

- **Hydrating clusters ahead of time** based on a user-defined schedule, so compute is ready when workloads arrive.
- **Allowing precise control** over the number of clusters kept warm and the Environment used for library configuration.
- **Delivering consistent startup performance** (~5 seconds) for all supported notebook session types during the scheduled window.

Custom Live Pools complement the existing starter pool and custom Spark pool options in Fabric:

| Compute option | Startup time | Schedule-based | Custom libraries | Supported workloads |
|--|--|--|--|--|
| Starter pools | ~1 min | No | No | Notebooks, SJD |
| Custom Spark pools | ~1 min | No | Via Environment | Notebooks, SJD |
| **Custom Live Pools** | **~5 seconds** | **Yes** | **Via Environment** | **Notebooks only** |

## Key concepts

### Hydration and warm-up

When a Custom Live Pool is configured and published, Fabric begins hydrating the clusters ahead of the scheduled window. Hydration means clusters are fully provisioned, configured with the attached Environment, and held warm until a session request arrives.

The ~5-second startup experience is available **only after the pool is fully hydrated**. During initial setup or immediately after a configuration change, sessions may experience longer startup times while hydration completes.

### Schedules

Every Custom Live Pool requires a schedule that defines when the pool is active. Clusters are kept warm only during the scheduled window. When the schedule expires or a cluster is idle beyond the configured threshold, it is deallocated and billing stops.

Pools are active **only during scheduled windows**. Plan your schedules to cover your expected workload windows to ensure hydrated compute is available.

### Environment attachment

Custom Live Pools are associated with a Fabric **Environment** artifact. The Environment controls which libraries are pre-installed on hydrated clusters. Library changes require updating and **re-publishing** the Environment. Existing hydrated clusters are not automatically refreshed with new libraries until the next scheduled hydration or a manual refresh.

### Cluster capacity

The pool capacity is defined by the maximum number of clusters you configure. Fabric does not automatically grow or shrink the pool beyond this configured value. Job admittance and scheduling behavior are determined by the configured capacity.

## Supported workloads

Custom Live Pools support the following notebook-based Spark session types:

- **Interactive notebooks** run from the Fabric UI
- **Scheduled notebook runs** configured in the notebook scheduler
- **Notebook runs triggered by pipelines**

> [!NOTE]
> Spark Job Definitions (batch jobs) are not supported in the current release of Custom Live Pools.

## Capacity and licensing

Custom Live Pools require a paid Microsoft Fabric capacity SKU. Fabric Trial capacities are not supported.

For information on available capacity SKUs, see [Microsoft Fabric concepts and licenses](/fabric/enterprise/licenses).

## Access control

Workspace role assignments control access to Custom Live Pool configuration and status:

| Role | Permissions |
|--|--|
| Viewer | Read-only access to pool status and configuration |
| Admin | Full configuration, save, and publish permissions |

B2B guest users must be assigned an explicit workspace role to interact with Custom Live Pools.

## Limitations

The following constraints apply to Custom Live Pools in the current release:

- The ~5-second startup experience requires the pool to be **fully hydrated**. Initial setup and post-configuration-change windows may have longer startup times.
- Library changes require **re-publishing** the attached Environment. Hydrated clusters are not automatically refreshed.
- Only **notebook-based Spark sessions** are supported. Spark Job Definitions are not supported.
- **Fabric Trial capacities** are not supported.
- Every pool **must have a schedule**. Pools without a schedule cannot be published.
- Custom Live Pools **cannot be managed via Environment public APIs or CI/CD pipelines**. Configuration must be performed through the Fabric UI.

## Related content

- [Configure Custom Live Pools in Microsoft Fabric](configure-custom-live-pools.md)
- [Configure starter pools in Microsoft Fabric](configure-starter-pools.md)
- [Create custom Spark pools in Microsoft Fabric](create-custom-spark-pools.md)
- [Create and use an environment in Microsoft Fabric](create-and-use-environment.md)
