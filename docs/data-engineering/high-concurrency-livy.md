---
title: High concurrency support in the Fabric Livy API Overview
description: Learn about High Concurrency support for the Microsoft Fabric Livy API.
ms.reviewer: avinandac
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.search.form: Learn about High Concurrency with the Livy API for Data Engineering
ms.date: 02/26/2026
---
# High concurrency support in the Fabric Livy API

High concurrency (HC) support in the Fabric Livy API enables scalable, parallel Spark execution for automation‑first workloads. It allows clients to run multiple Spark statements concurrently while Fabric manages Spark session reuse, isolation, monitoring, and billing.

Existing Livy session and batch workloads continue to work without modification.


## Why high concurrency is needed

Traditional Livy usage is optimized for sequential or low‑concurrency execution. As automation scenarios grow, customers need:
- Parallel Spark execution
- Predictable resource usage
- Isolation between concurrent workloads
- A managed concurrency model that integrates with Fabric security, monitoring, and billing

Without HC support, customers must manually create and manage multiple Livy sessions client‑side, increasing complexity and reducing observability.

## High concurrency execution model
The HC execution model works as follows:

1. A client **acquires** an HC session.
2. The system creates or reuses an underlying Livy session and creates a Spark REPL.
3. The client **executes Spark statements** within the HC session.
4. Multiple HC sessions can execute statements concurrently.
5. The client can **retrieve**, **cancel**, or **delete** HC sessions independently.

Each HC session:
- Maps to a Spark REPL
- Can execute Spark statements independently
- Is isolated from failures or cancellations in other HC sessions

Multiple HC sessions can execute concurrently, even when backed by the same underlying Livy session.


### Session reuse and `sessionTag`

When acquiring an HC session, clients can optionally provide a `sessionTag`.

The `sessionTag` enables **server‑side session packing**:

- If an active Livy session associated with the `sessionTag` exists and has available capacity, a new Spark REPL is created within that session.
- If no suitable session exists, a new underlying Livy session is created.

Important characteristics:
- HC session acquisition is **not idempotent**
- Multiple acquire requests with the same `sessionTag` return **different HC session IDs**
- These HC sessions may still be backed by the same underlying Livy session

## Related content
* [Getting started with High Concurrency with Livy Endpoint](get-started-hc-livy.md).
* [Submit session jobs using the Livy API](get-started-api-livy-session.md)
* [Submit Spark batch jobs using the Livy API](get-started-api-livy-batch.md)
* [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
* [Apache Spark monitoring overview](spark-monitoring-overview.md)
* [Apache Spark application detail](spark-detail-monitoring.md)

