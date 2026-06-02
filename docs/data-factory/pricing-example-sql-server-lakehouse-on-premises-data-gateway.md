---
title: Pricing Example for a Copy Job with an On-premises Data Gateway
description: A pricing example for copying data from SQL Server to Fabric Lakehouse with the On-premises Data Gateway.
ms.reviewer: lle
ms.date: 01/29/2026
ms.topic: concept-article
---

# Pricing example: Copy data from on-premises SQL Server to Fabric Lakehouse using the On-premises Data Gateway

In this scenario, we copy data from an on-premises SQL Server database to a Lakehouse table in Microsoft Fabric by using a [copy job](what-is-copy-job.md) with the On-premises Data Gateway (OPDG).

This scenario is a common hybrid integration pattern where you keep operational databases on-premises and use Fabric for analytics and reporting.

The on-premises data gateway itself doesn't incur extra charges. All billing is based on Fabric capacity consumption by the Data Factory workload.

>[!NOTE]
>The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. The estimates demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric.
>
>Since Fabric capacities are priced uniquely across regions, refer to [the Microsoft Fabric pricing page](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore Fabric capacity pricing regionally.

## Configuration

This scenario uses the following resources:

- An on-premises SQL Server database containing **500 GB** of data.
- An On-premises Data Gateway installed on the customer network and registered to the Fabric tenant.
- A Copy job configured with:
  - **Source**: On-premises SQL Server via OPDG
  - **Sink**: Fabric Lakehouse table
  - **Copy mode**: Full copy for the first run, followed by incremental loads.

## Cost estimation using the Fabric Metrics App

The Copy job consumes the **Data Movement** meter for the full copy and the **Data Movement – Incremental copy** meter for incremental copy, just like cloud-based sources. The gateway only affects data connectivity and doesn't affect pricing meters.

### Full copy

In this example, the copy job uses:

- Intelligent throughput optimization: **128**
- Data movement duration: **~9 minutes**

For a copy job, each unit of intelligent throughput optimization consumes **1.5 CU hours per hour** for a full copy.

**Utilized CU hours:**

128 × 1.5 × (9 / 60) = 28.8 CU hours

At **$0.18 per CU hour**:

Total cost = 28.8 × $0.18 = $5.18


### Incremental copy (initial full load and subsequent runs)

In this example, the Copy job starts with an initial full load lasting 9 minutes, followed by daily incremental runs that each take 1 minute：

- Intelligent throughput optimization for initial ful load: **128**
- Intelligent throughput optimization for subsequent runs: **4**

For a copy job, each unit of intelligent throughput optimization consumes **3 CU hours per hour** for incremental copy.

**Utilized CU hours:**

128 × 3 × (9 / 60) + 4 × 3 × 1 / 60 = 57.8 CU hours


At **$0.18 per CU hour**:

Total cost = 57.8 × $0.18 = $10.4


## Key takeaways for on-premises scenarios

- The **On-premises Data Gateway itself is free**; there's no per-node or per-VM charge for a gateway installed on the customer's machines and network.
- Gateway placement and sizing affect **performance and throughput**, but not the billing model.
- **Fabric capacity consumption** of the Data Factory workload drives all costs.
- Pricing meters are **identical to cloud-based sources** (Data Movement and Data Movement – Incremental copy).
