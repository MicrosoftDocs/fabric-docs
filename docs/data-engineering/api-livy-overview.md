---
title: Livy API overview
description: Learn about the Microsoft Fabric Livy API for submitting jobs to Spark
ms.reviewer: avinandac
ms.topic: overview
ms.search.form: Livy API Overview for Data Engineering
ms.date: 11/05/2025
---

# What is the Livy API for Data Engineering? 

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric Livy API lets users submit and execute Spark code within Spark compute associated with a Fabric Lakehouse, eliminating the need to create any Notebook or Spark Job Definition artifacts. This integration with the Lakehouse ensures straightforward access to data stored on OneLake.

## Features

The Fabric Livy API allows submitting jobs in two different modes:

- Session Jobs
  - A Livy session job entails establishing a Spark session that remains active throughout the interaction with the Livy API. Livy Sessions are useful for interactive workloads.
  - A Spark session starts when a job is submitted and lasts until the user ends it or the system terminates it after 20 minutes of inactivity. Throughout the session, multiple jobs can run, sharing state and cached data between runs.
- Batch Jobs
  - A Livy batch job entails submitting a Spark application for a single job execution. In contrast to a Livy session job, a batch job doesn't sustain an ongoing Spark session.
  - With Livy batch jobs, each job initiates a new Spark session that ends when the job finishes. This approach works well for tasks that don't rely on previous computations or require maintaining state between jobs.

## High concurrency support

The Fabric Livy API supports high concurrency execution for scenarios that require running multiple Spark statements in parallel through a single API surface.

High concurrency support is designed for automation‑first workloads such as:
- Services that submit Spark statements programmatically
- Orchestrators and pipelines triggering parallel Spark execution
- JDBC/ODBC drivers and ISV applications

With high concurrency support, clients can acquire multiple independent execution contexts and execute Spark statements concurrently, while the system manages underlying Spark session reuse, capacity, and isolation.

> **Note**  
> High concurrency support is additive and does not change existing Livy API contracts. Existing Livy session and batch workloads continue to work without modification.

Learn more on [High concurrency support in the Fabric Livy API](high-concurrency-livy.md).



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
