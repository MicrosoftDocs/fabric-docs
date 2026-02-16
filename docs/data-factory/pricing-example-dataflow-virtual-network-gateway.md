---
title: Pricing example for Dataflow Gen2 with a Virtual Network Gateway
description: A pricing example for Dataflow Gen2 using a virtual network gateway.
ms.reviewer: lle
ms.date: 01/29/2026
ms.topic: concept-article
---

# Pricing example: Dataflow Gen2 using a Virtual Network Data Gateway

In this scenario, we use Dataflow Gen2 to ingest and transform data from an Azure SQL Database deployed in a private virtual network into a Lakehouse table in Microsoft Fabric by using the **Virtual Network (VNET) Data Gateway**.

This pattern is useful to apply Power Query transformations while ensuring that all data access stays within private network boundaries.

The total cost includes two parts:

- **Dataflow Gen2 compute cost**, based on the engines used (Standard Compute in this example)
- **Virtual Network Data Gateway uptime cost**, based on how long the gateway is online

Total cost per run:

**Total = Dataflow Gen2 charge + Virtual Network Data Gateway charge**

>[!NOTE]
>The prices used in the following example are hypothetical and don’t intend to imply exact actual pricing. The estimates demonstrate how you can estimate, plan, and manage cost for Data Factory projects in Microsoft Fabric.
>
>Since Fabric capacities are priced uniquely across regions, refer to [the Microsoft Fabric pricing page](https://azure.microsoft.com/pricing/details/microsoft-fabric/) to explore Fabric capacity pricing regionally.

## Configuration

This scenario uses the following resources:

- **Source**: Azure SQL Database with Private Endpoint in customer virtual network
- **Connectivity**: Virtual Network Data Gateway
- **Gateway members (nodes)**: 2
- **Dataflow type**: Dataflow Gen2 (CI/CD)
- **Transformations**: filtering, joins, calculated columns
- **Staging**: Disabled (Standard Compute only)
- **Destination**: Fabric Lakehouse table
- **Refresh frequency**: Once per day
- **Gateway Time to Live (TTL)**: 30 minutes after refresh completes

## Cost components

This scenario includes two independent cost components:

- **Dataflow Gen2 Standard Compute cost** (Mashup Engine)
- **Virtual Network Data Gateway uptime cost** (job duration + TTL)

Both costs are billed to the Fabric or Power BI Premium capacity.

## Dataflow Gen2 Standard Compute cost

Because staging is disabled, Dataflow Gen2 uses **Standard Compute** on the Mashup Engine.

This example uses **CI/CD pricing**, which applies tiered rates per query:

- First **10 minutes (600 seconds)**: **12 CU per second**
- Beyond 10 minutes: **1.5 CU per second**

### Query execution details

In this example, the Dataflow contains **two queries**:

| **Query**  | **Duration (seconds)**  |
|------------|-------------------------|
| Query 1    | 420 seconds             |
| Query 2    | 780 seconds             |

### CU calculation per query

**Query 1 (420 seconds, under 10 minutes)**

420 × 12 = 5,040 CU seconds

**Query 2 (780 seconds)**

First 600 seconds:

600 × 12 = 7,200 CU seconds

Remaining 180 seconds:

180 × 1.5 = 270 CU seconds

Total for Query 2:

7,200 + 270 = 7,470 CU seconds

### Total Dataflow Gen2 compute consumption

5,040 + 7,470 = 12,510 CU seconds

Convert to CU hours:

12,510 / 3,600 ≈ 3.48 CU hours

Dataflow compute cost:

3.48 × $0.18 ≈ $0.63 per run

## Virtual network Data Gateway uptime cost

- CU consumption rate: **4 CU per gateway member**
- Number of members: **2**
- Gateway uptime = **Dataflow execution time + TTL**

Formula:

CU seconds = 4 × (gateway members) × (uptime in seconds)

### Gateway uptime per run

In this example, we use the following values:

- Total Dataflow execution duration: **20 minutes (1,200 seconds)**
- TTL after run: **30 minutes (1,800 seconds)**

Gateway uptime calculation:

1,200 + 1,800 = 3,000 seconds

CU seconds consumed by gateway:

4 × 2 × 3,000 = 24,000 CU seconds

Convert to CU hours:

24,000 / 3,600 = 6.67 CU hours

Gateway cost per run:

6.67 × $0.18 = $1.20 per run

## Total cost estimate

**Per refresh run**

| **Component**                   | **Cost**    |
|---------------------------------|-------------|
| Dataflow Gen2 Standard Compute  | $0.63      |
| Virtual network Data Gateway uptime        | $1.20      |
| **Total per run**               | **$1.83**  |

**Monthly estimate (30 daily runs)**

| **Component**          | **Monthly cost**  |
|------------------------|-------------------|
| Dataflow Gen2 compute  | $18.90           |
| Virtual network Gateway uptime    | $36              |
| **Total per month**    | **$54.9**        |

## Key takeaways

- Dataflow Gen2 charges are based on query execution time and engine usage.
- Virtual network Data Gateway charges are based on gateway uptime, which includes:
  - Dataflow execution duration
  - Plus configured TTL after job completion
- Gateway cost is independent of data volume or activity and continues as long as the gateway is running.
