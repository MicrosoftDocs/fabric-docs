---
title: Livy API overview
description: Learn about the Microsoft Fabric Livy API for submitting jobs to Spark
ms.reviewer: avinandac
ms.topic: overview
ms.search.form: Livy API Overview for Data Engineering
ms.date: 04/10/2026
---

# What is the Livy API for Data Engineering? 

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric Livy API lets users submit and execute Spark code within Spark compute associated with a Fabric Lakehouse, eliminating the need to create any Notebook or Spark Job Definition artifacts. This integration with the Lakehouse ensures straightforward access to data stored on OneLake.

## Features

The Fabric Livy API supports the following job types:

- **Session jobs** — A Livy session job establishes a Spark session that remains active throughout the interaction with the Livy API. Sessions are useful for interactive workloads. A session starts when a job is submitted and lasts until the user ends it or the system terminates it after 20 minutes of inactivity. Multiple jobs can run within a session, sharing state and cached data between runs.
- **Batch jobs** — A Livy batch job submits a Spark application for a single job execution. Unlike a session job, a batch job doesn't sustain an ongoing Spark session. Each job initiates a new Spark session that ends when the job finishes, which works well for tasks that don't rely on previous computations or require maintaining state.
- **High concurrency sessions** — A high concurrency (HC) session enables concurrent Spark execution by allowing clients to acquire multiple independent execution contexts. Each HC session maps to a Spark REPL (Read-Eval-Print Loop) within a shared underlying Livy session, supporting parallel execution, predictable resource usage, and isolation between concurrent requests. For more information, see [High concurrency support in the Fabric Livy API](high-concurrency-livy.md).

> [!NOTE]
> High concurrency support is additive and doesn't change existing Livy API contracts. Existing Livy session and batch workloads continue to work without modification.



## Get started with the Livy API

- Learn how to [Create and run Spark jobs using the Livy API in Fabric](get-started-api-livy.md):
- [Submit Spark session jobs using the Livy API](get-started-api-livy-session.md)
- [Submit Spark batch jobs using the Livy API](get-started-api-livy-batch.md).
- [High concurrency support in the Fabric Livy API](high-concurrency-livy.md).

## Related content

- [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
- [Spark compute for Fabric](spark-compute.md)
- [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
- [Create and run Spark jobs using the Livy API in Fabric](get-started-api-livy.md)
