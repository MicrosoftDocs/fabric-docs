---
title: Billing for Extended Capabilities in Mirroring
description: Learn about billing timelines, pricing model, metering, and what is billed for extended capabilities in Mirroring for Microsoft Fabric.
ms.date: 03/11/2026
ms.topic: overview
ai-usage: ai-assisted
ms.reviewer: sbahadur
---

# Billing for extended capabilities in mirroring

Extended capabilities in mirroring for Microsoft Fabric are optional and billed based on usage. Core mirroring compute remains free.

[!INCLUDE [Extended capabilities billing start note](includes/extended-capabilities-billing-start-note.md)]

## Capacity requirement

- A running Fabric capacity is required for initial mirroring setup.

## Extended capabilities pricing model

| **Aspect** | **Delta change data feed (extended capability)** | **Views (extended capability)** |
|---|---|---|
| Consumption meter | Data movement - incremental replication | Data movement - incremental replication |
| Fabric Capacity Unit (CU) consumption rate | 3 CU-hours | 3 CU-hours |
| Runtime model | Continuous, iteration-based | Continuous, incremental view processing |
| Granularity | Per-second billing granularity | Per-capability reporting per mirrored database item |
| Empty runs | Not charged (initially) | Not applicable (views reflect source-defined projections) |
| Reporting granularity | Per mirrored database item | Per mirrored database item |

Extended capabilities are billed by actual replication work, using the same pricing approach as [Incremental Copy in Copy Job](/fabric/data-factory/pricing-copy-job). Charges map to Fabric Capacity Units (CUs), and billing is based on usage.

Currently:

- Billing is based on actual replication work performed.
- Core mirroring compute remains free.
- Extended capabilities are billed as one unified charge per mirror.

## Pricing details

Extended capabilities use the DataMovementIncrementalCopy meter and follow the same pricing principles as [Incremental Copy in Copy Job](/fabric/data-factory/pricing-copy-job).

| What you're billed for | What you're not billed for |
|---|---|
| Incremental replication work when changes occur.<br>Compute used to process inserts, updates, and deletes.<br>Iterations that fail due to user errors. | Core mirroring compute.<br>Storage for mirrored data.<br>Idle time with no changes.<br>Empty iterations.<br>Iterations that fail due to system errors. |

## Billing scope and metering

- Extended capabilities are optional, and core mirroring works without them.
- DCDF is applied at the mirror level, so billing covers the full mirror replication workload, including tables and views (if present).
- DCDF and mirroring views enabled together result in one unified charge for the mirror workload, not double charging.
- Delta change data feed reuses the DataMovementIncrementalCopy meter rather than a separate DCDF-specific meter, and the operation name appears as Mirror Replication Premium using DataMovementIncrementalCopy.

## How usage is measured

- Billing is based on actual replication work duration and throughput resources consumed, not idle or always-on time.
- Billing uses per-second granularity, with no forced rounding to one-minute increments.
- If replication work runs in parallel, each active child job contributes to billable usage.

## Related content

[Extended capabilities in mirroring](extended-capabilities.md)
