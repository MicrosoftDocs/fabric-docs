---
title: High concurrency support in the Fabric Livy API
description: Learn about high concurrency support for the Microsoft Fabric Livy API.
ms.reviewer: avinandac
ms.topic: how-to
ms.search.form: Learn about high concurrency with the Livy API for Data Engineering
ms.date: 04/10/2026
ai-usage: ai-assisted
---
# High concurrency support in the Fabric Livy API

High concurrency (HC) in the Fabric Livy API enables scalable, parallel Spark execution for automation-first workloads. Client applications can run multiple Spark statements concurrently while Fabric manages session reuse, isolation, monitoring, and billing.

Existing Livy session and batch workloads continue to work without modification.

## When to use high concurrency

Standard Livy usage is optimized for sequential or low-concurrency execution. As automation scenarios grow, you need:

- Parallel Spark execution.
- Predictable resource usage.
- Isolation between concurrent workloads.
- A managed concurrency model that integrates with Fabric security, monitoring, and billing.

Without HC support, you must manually create and manage multiple Livy sessions on the client side. This increases complexity and reduces observability.

## High concurrency execution model

The HC execution model works as follows:

1. A client **acquires** an HC session.
1. The system creates or reuses an underlying Livy session and creates a Spark REPL (Read-Eval-Print Loop).
1. The client **executes Spark statements** within the HC session.
1. Multiple HC sessions can execute statements concurrently.
1. The client can **retrieve**, **cancel**, or **delete** HC sessions independently.

Each HC session:

- Maps to a Spark REPL.
- Can execute Spark statements independently.
- Is isolated from failures or cancellations in other HC sessions.

### Session reuse and `sessionTag`

When you acquire an HC session, you can optionally provide a `sessionTag`.

The `sessionTag` enables **server-side session packing**:

- If an active Livy session for the `sessionTag` exists and has available capacity, the service creates a new Spark REPL within that session.
- If no suitable session exists, the service creates a new underlying Livy session.

Note the following important characteristics:

- HC session acquisition is **not idempotent**.
- Multiple acquire requests with the same `sessionTag` return **different HC session IDs**.
- The same underlying Livy session might still back multiple HC sessions.

## Key concepts

The following list describes the key parameters:

- **HC ID**: Fabric identifier for a REPL-level high concurrency session. The API returns a system-generated GUID.
- **Livy session ID**: The underlying Spark/Livy session that can host multiple REPLs.
- **REPL ID**: The identifier of the REPL inside a Livy session. Each REPL ID maps to an HC ID.
- **`sessionTag` (optional)**: A hint used to pack REPLs into existing Livy sessions when possible.
- **Limits**: The service currently supports up to five REPLs per Livy session. Rapid concurrent calls to the HC session acquisition API might create multiple Livy sessions.

### Acquire a high concurrency Spark session

If an active Livy session already exists for the `sessionTag` and has available REPL slots, the service creates a REPL inside that session. Otherwise, the service creates a new Livy session with a REPL inside it.

#### Request payload (HighConcurrencySessionRequest)

The request body for acquiring a high concurrency session includes the following parameters:
```json
{
  "artifactName": "string",
  "sessionTag": "string",
  "tags": { "key": "value" },
  "name": "string",
  "file": "string",
  "className": "string",
  "args": ["string"],
  "jars": ["string"],
  "files": ["string"],
  "pyFiles": ["string"],
  "archives": ["string"],
  "conf": { "spark.some.config": "value" },
  "driverMemory": "string",
  "driverCores": 1,
  "executorMemory": "string",
  "executorCores": 1,
  "numExecutors": 2
}
```

Note the following about the request parameters:

- The `artifactName` (Lakehouse) is used to surface HC jobs in the monitoring hub as `HC_<LakehouseName>_<LIVY_SESSION_ID>`.
- The `sessionTag` is a hint for packing. It isn't a strict lock. Rapid concurrent POST requests with the same `sessionTag` might create multiple Livy sessions.
- The API is nonidempotent by default. Multiple POST requests can yield distinct HC IDs and REPLs.

#### Response payload (HighConcurrencySessionResponse)

The response body includes the following fields:

```json
{
  "id": "string",
  "state": "string",
  "fabricSessionStateInfo": { "state": "string", "errorMessage": null },
  "sessionId": "string | null",
  "workspaceId": "string",
  "artifactId": "string | null",
  "creatorId": "string",
  "createdAt": "ISO 8601",
  "replId": "string | null",
  "sessionTag": "string | null"
}
```

Possible HTTP response codes: 200, 400, 401, 404, 409, 500.

For the full OpenAPI specification, see the [Livy API swagger definition](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/Livy-API-swagger/swagger.yaml) in the Fabric samples repository.

## Monitoring

HC jobs appear in the monitoring hub with the name `HC_<LakehouseName>_<LivySessionId>` to maintain consistency with other job types. This naming format provides top-level visibility but limits REPL-level cancellation from the Fabric portal.

## Best practices

Consider the following best practices when using high concurrency sessions:
- Use `sessionTag` to pack related jobs into shared Livy sessions when acceptable.
- Poll the HC session GET endpoint to determine when the `state` is `Idle` and both `sessionId` and `replId` are populated.

## Related content

- [Get started with high concurrency with the Livy endpoint](get-started-high-concurrency-livy.md)
- [Submit session jobs using the Livy API](get-started-api-livy-session.md)
- [Submit Spark batch jobs using the Livy API](get-started-api-livy-batch.md)
- [Apache Spark monitoring overview](spark-monitoring-overview.md)
- [Apache Spark application detail](spark-detail-monitoring.md)
