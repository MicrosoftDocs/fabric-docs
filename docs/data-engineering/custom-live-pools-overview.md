---
title: Custom live pools for Fabric Data Engineering overview
description: Learn about custom live pools in Microsoft Fabric, which provide fast, predictable Spark session startup for enterprise analytics workloads.
ms.reviewer: saravi
ms.topic: concept-article
ms.date: 03/18/2026
ai-usage: ai-assisted
---

# Custom live pools in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Custom live pools are pre-warmed Spark clusters that provide near-instant session startup for notebook-based workloads in Microsoft Fabric. Instead of waiting for cluster provisioning on every run, custom live pools keep clusters warm during a configured schedule window, enabling 5-second session start times for your interactive and scheduled notebooks.

## Why use custom live pools

Standard Spark sessions in Fabric require cluster provisioning each time a session starts. For teams that run frequent notebooks—whether interactive, scheduled, or pipeline-triggered—this provisioning time can slow iteration cycles and increase overall job latency.

Custom live pools address this by:

- **Hydrating clusters ahead of time** based on a user-defined schedule, so compute is ready when workloads arrive.
- **Allowing precise control** over the number of clusters kept warm and the environment used for library configuration.
- **Delivering consistent startup performance** (~5 seconds) for all supported notebook session types during the scheduled window.

Custom live pools complement the existing starter pool and custom Spark pool options in Fabric:

| Compute option | Startup time | Schedule-based | Custom libraries | Supported workloads |
|--|--|--|--|--|
| Starter pools | 5 to 10 seconds (without any libraries) | No | No | Notebooks, SJD |
| Custom Spark pools | ~1 min | No | Via environment | Notebooks, SJD |
| **Custom live pools** | **~5 seconds to 10 seconds** (after hydration is complete) | **Yes** | **Via environment** | **Notebooks only (interactive and scheduled)** |

## Key concepts

The following concepts explain how custom live pools work, including how clusters are prepared, when they're available, and how capacity and library configuration are managed.

### Hydration and warm-up

When you create and publish a custom live pool, Fabric begins hydrating clusters ahead of the scheduled window. Hydration means clusters are fully provisioned, configured with the attached environment, and held warm until a session request arrives.

The ~5-second startup time is available only after the pool is fully hydrated. During initial setup or immediately after a configuration change, sessions might experience longer startup times while hydration completes. For troubleshooting, see [Hydration takes longer than expected](custom-live-pools-configure.md#hydration-takes-longer-than-expected).

### Schedules

Every custom live pool requires a schedule that defines when the pool is active. Clusters are kept warm only during the scheduled window, and billing occurs only while clusters are allocated. When the schedule expires or a cluster is idle beyond the configured threshold, Fabric deallocates it and billing stops.

Plan your schedules to cover your expected workload windows so that warm compute is available when your team needs it. For configuration steps and best practices, see [Configure a live pool](custom-live-pools-configure.md#configure-a-live-pool).

### Environment attachment

Each custom live pool is attached to a Fabric environment. The environment controls which libraries are preinstalled on hydrated clusters. To update libraries, you must modify and re-publish the environment. Existing hydrated clusters aren't refreshed with the new libraries until the next scheduled hydration or a manual refresh. For configuration steps, see [Configure a live pool](custom-live-pools-configure.md#configure-a-live-pool).

#### Library publish modes

The library publishing mode in the attached environment determines how libraries are delivered to hydrated clusters:

- **Full mode**: Libraries are resolved and baked into the hydrated cluster image during environment publishing. When a session starts, the Full mode snapshot is already present on the cluster, enabling approximately 5-second session starts. Use Full mode when you need a stable, reproducible library set with the fastest possible session startup.
- **Quick mode**: Libraries aren't preinstalled on hydrated clusters. Instead, they install when the notebook session starts. Hydrated clusters still provide fast compute allocation, but library installation at session start adds time. Use Quick mode for rapid iteration during development when library stability is less critical.

> [!NOTE]
> The notebook Resources folder and inline library installations (such as `%pip install` in a code cell) are manual, per-session approaches. They're independent of the environment publishing mode and don't affect what libraries are preinstalled on hydrated clusters.

### Cluster capacity

Each pool has a maximum cluster count that you set during configuration. Fabric doesn't automatically scale the pool beyond this value. When all hydrated clusters are in use, additional jobs fall back to on-demand provisioning, which takes about 3 to 5 minutes or longer depending on library package dependencies. For sizing guidance, see [Cluster sizing](custom-live-pools-configure.md#cluster-sizing).

## Supported workloads

Custom live pools support the following notebook-based Spark session types:

- **Interactive notebooks** run from the Fabric portal
- **Scheduled notebook runs** configured in the notebook scheduler
- **Notebook runs triggered by pipelines**

> [!NOTE]
> Spark Job Definitions (batch jobs) aren't supported in the current release of custom live pools.

## Capacity and licensing

Custom live pools require a paid Microsoft Fabric capacity SKU. Fabric Trial capacities aren't currently supported.

For information on available capacity SKUs, see [Microsoft Fabric concepts and licenses](/fabric/enterprise/licenses).

## Access control

Workspace role assignments control access to custom live pool configuration and status:

| Role | Permissions |
|--|--|
| Viewer or Member | Read-only access to pool status and configuration |
| Admin | Full configuration, save, and publish permissions |

B2B guest users must be assigned an explicit workspace role to interact with custom live pools.

## Limitations

The following constraints apply to custom live pools in the current release:

- Sessions start in ~5 seconds only after the pool is fully hydrated. During initial setup or after you change the configuration, startup times might be longer.
- Library changes require re-publishing the attached environment. Hydrated clusters aren't automatically refreshed.
- When the attached environment uses Quick mode for some libraries, those libraries aren't preinstalled on hydrated clusters and must install at session start. For the fastest session startup with custom live pools, use Full mode for your library dependencies.
- Only notebook-based Spark sessions are supported. Spark job definitions aren't supported.
- Fabric trial capacities aren't supported.
- Every pool must have a schedule. Pools without a schedule can't be published.
- Custom live pools can't be managed via environment public APIs or CI/CD pipelines. Configuration must be performed through the Fabric portal.

## Related content

- [Configure custom live pools](custom-live-pools-configure.md)
- [Manage libraries in Fabric environments](environment-manage-library.md)
- [Configure starter pools](configure-starter-pools.md)
- [Create custom Spark pools](create-custom-spark-pools.md)
- [Create and use an environment](create-and-use-environment.md)
