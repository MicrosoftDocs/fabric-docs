---
title: Pricing Example for a Copy Job with a Virtual Network Data Gateway
description: A pricing example for copying data from Azure SQL Database to Fabric Lakehouse with a virtual network Data Gateway.
ms.reviewer: lle
ms.date: 01/29/2026
ms.topic: concept-article
---

# Pricing example: Copy data from Azure SQL Database to Fabric Lakehouse using a Virtual Network Data Gateway

In this scenario, we copy data from an Azure SQL Database deployed in a private virtual network to a Lakehouse table in Microsoft Fabric by using a Copy job with a Virtual Network Data Gateway.

This pattern is useful to secure your data sources with **Private Endpoints**, and to keep data movement within private network boundaries.

The total cost includes two parts:

- **Copy job compute cost**, based on data movement meters
- **Virtual Network Data Gateway uptime cost**, based on how long the gateway is online

Unlike the On-premises Data Gateway, the **Virtual Network Data Gateway consumes Fabric capacity based on uptime.** The effective gateway uptime is the **Copy job execution time plus the configured Time to Live (TTL)** after job completion.

>[!NOTE]
>The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. The estimates demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric.
>
>Since Fabric capacities are priced uniquely across regions, refer to [the Microsoft Fabric pricing page](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore Fabric capacity pricing regionally.

## Configuration

This example uses the following resources and configuration settings:

- Azure SQL Database with **Private Endpoint** in a customer-managed virtual network.
- **Virtual Network Data Gateway** deployed in the same virtual network with:
  - **Number of gateway members (nodes): 2**
- A Copy job configured with:
  - **Source**: Azure SQL Database via Virtual Network Data Gateway
  - **Sink**: Fabric Lakehouse table
  - **Copy mode**: Full copy for the first run, followed by incremental loads.
- **Gateway Time to Live (TTL): 30 minutes** after job completion.

## Cost components

This scenario includes two cost components:

- **Virtual Network Data Gateway uptime cost** (based on job duration and TTL)
- **Copy job execution cost** (Data Movement meters)

Both costs are billed to the Fabric or Power BI Premium capacity.

## Virtual network data gateway uptime cost

- CU consumption rate per gateway member: **4 CUs**
- Number of gateway members: **2**
- Gateway uptime per run: **Copy job duration plus TTL**

Capacity consumption formula:

CU seconds = 4 × (number of gateway members) × (uptime in seconds)

### Full copy run - gateway uptime

In this example:

- Copy job duration: **8 minutes**
- TTL after job: **30 minutes**

**Gateway uptime calculation:**

8 minutes + 30 minutes = 38 minutes = 2,280 seconds

**CU seconds consumed by gateway calculation:**

4 × 2 × 2,280 = 18,240 CU seconds

**Convert to CU hours calculation:**

18,240 / 3,600 ≈ 5.07 CU hours

**Gateway cost for full copy run:**

5.07 × $0.18 ≈ $0.91

### Incremental copy run - gateway uptime

In this example:

- Copy job duration: **1 minute**
- TTL after job: **30 minutes**

**Gateway uptime calculation:**

1 min + 30 min = 31 minutes = 1,860 seconds

**CU seconds consumed by gateway calculation:**

4 × 2 × 1,860 = 14,880 CU seconds

**Convert to CU hours calculation:**

14,880 / 3,600 ≈ 4.13 CU hours

**Gateway cost per incremental run calculation:**

4.13 × $0.18 ≈ $0.74

## Copy job execution cost

Copy job pricing is independent of gateway uptime and uses Data Factory pricing meters.

### Full copy (initial load)

In this example:

- Data size: **500 GB**
- Intelligent throughput optimization: **128**
- Duration: **8 minutes**

**Used CU hours:**

128 × 1.5 × (8 / 60) = 25.6 CU hours

**CU seconds:**

25.6 × 3600 = 92,160 CU seconds

**Copy job cost:**

25.6 × $0.18 = $4.61

### Incremental copy (daily load)

In this example:

- New data: **5 GB**
- Intelligent throughput optimization: **4**
- Duration: **1 minute**

**Used CU hours:**

4 × 3 × (1 / 60) = 0.2 CU hours

**CU seconds:**

0.2 × 3600 = 720 CU seconds

**Copy job cost per run:**

0.2 × $0.18 = $0.036

## Total cost estimate

**First run (full copy)**

| **Component**              | **Cost**    |
|----------------------------|-------------|
| Virtual network Gateway uptime        | $0.91      |
| Copy job execution         | $4.61      |
| **Total (full copy run)**  | **$5.52**  |

**Ongoing incremental run**

| **Component**                  | **Cost**    |
|--------------------------------|-------------|
| Virtual network Gateway uptime            | $0.74      |
| Copy job execution             | $0.04      |
| **Total per incremental run**  | **$0.78**  |

## Key takeaways

- Virtual network Data Gateway cost comes from **job duration + TTL**, not from 24/7 uptime when TTL is configured.
- Increasing the number of gateway members improves availability but **linearly increases gateway cost**.
- Data movement cost and gateway uptime cost are **separate and additive**.

## Comparison with on-premises data gateway

- **Virtual Network Data Gateway**
  - Charged by Fabric capacity based on uptime (4 CUs per node)
  - No customer-managed VMs required
- **On-premises Data Gateway (OPDG)**
  - No Fabric capacity charge for the gateway
  - Customers must run and pay for **VMs or servers 24/7**, including HA clusters

In both cases, pricing is separate for Data Factory workload execution using standard Fabric pricing meters.