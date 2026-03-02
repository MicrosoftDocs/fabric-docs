---
title: Getting started with High Concurrency with Livy Endpoint
description: Learn about acquiring High Concurrency Spark Session for the Microsoft Fabric Livy API
ms.reviewer: avinandac
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.search.form: Get started with High Concurrency with the Livy API for Data Engineering
ms.date: 02/26/2026
---
# Overview

High-concurrency (HC) sessions let multiple interactive REPLs share a single Livy Spark session to improve resource utilization for multi-tenant interactive workloads (for example many small notebook or query executions against a Lakehouse). The Fabric Livy API exposes HC session lifecycle and REPL-level statement execution endpoints so consumers can create, manage, and execute statements in HC REPLs.


## Key concepts
Here's a breakdown of the key parameters:
- **HC ID**: Fabric identifier for a REPL-level high-concurrency session (system-generated GUID returned by the API).
- **Livy session ID**: underlying Spark/Livy session that can host multiple REPLs.
- **REPL ID**: identifier of the REPL inside a Livy session (maps to an HC ID).
- **SessionTag (optional)**: hint used to pack REPLs into existing Livy sessions when possible.
- **Limits**: TJS currently restricts REPLs per Livy session (example: 5). Rapid concurrent creates using the same SessionTag can create multiple Livy sessions.

### Session reuse and `sessionTag`

When acquiring an HC session, clients can optionally provide a `sessionTag`.

The `sessionTag` enables **server‑side session packing**:

- If an active Livy session associated with the `sessionTag` exists and has available capacity, a new Spark REPL is created within that session.
- If no suitable session exists, a new underlying Livy session is created.

Important characteristics:
- HC session acquisition is **not idempotent**
- Multiple acquire requests with the same `sessionTag` return **different HC session IDs**
- These HC sessions may still be backed by the same underlying Livy session

### Endpoint summary
- Acquire HC session: 
```text
POST /v1/workspaces/{workspaceId}/artifactType/{artifactType}/artifacts/{artifactId}/livyApi/versions/{apiVersion}/highConcurrencySessions/
```

- Get HC session: 
```text 
GET /v1/.../highConcurrencySessions/{highConcurrencySessionId}
```

- Delete HC session: 
``` text 
DELETE /v1/.../highConcurrencySessions/{highConcurrencySessionId}
```
- List statements in REPL: 

```text 
GET /v1/.../sessions/{sessionId}/repls/{replId}/statements
```

- Execute statement in REPL: 
```text
POST /v1/.../sessions/{sessionId}/repls/{replId}/statements 
```

- Get / Cancel specific statement: 
```text
GET and DELETE /.../repls/{replId}/statements/{statementId}
```

## Getting started with High Concurrency with Livy Endpoint

### Acquire High Concurrency Spark Session

If an active Livy session already exists for the SessionTag and has available REPL slots, the service will create a REPL inside that session. Otherwise, a new Livy session is requested and a REPL created inside it.

#### Request payload (HighConcurrencySessionRequest)

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

Notes:
- `artifactName` (Lakehouse) is used to surface HC jobs in Monitoring Hub as HC_<LakehouseName>_<LIVY_SESSION_ID>.
- `sessionTag` is a hint for packing; it is not a strict lock — rapid concurrent POSTs with same `sessionTag` may create multiple Livy sessions.
- The API is non-idempotent by default in this contract (multiple POSTs can yield distinct HC IDs / REPLs).

#### Response payload (HighConcurrencySessionResponse)

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

Responses: 200, 400, 401, 404, 409, 500

### Acquire HC session — curl example

```bash
curl -X POST "https://<fabric-host>/v1/workspaces/{workspaceId}/artifactType/{artifactType}/artifacts/{artifactId}/livyApi/versions/{apiVersion}/highConcurrencySessions" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "artifactName": "my-lakehouse",
    "sessionTag": "team-analytics-loop",
    "name": "my-hc-job",
    "file": "s3://bucket/my_script.py",
    "numExecutors": 2,
    "conf": { "spark.some.config": "value" }
  }'
```

Sample response:

```json
{
  "id": "198cfe00-5fcb-4d53-bd6f-0b7d7a59a9b3",
  "state": "NotStarted",
  "workspaceId": "a0125232-9446-49ed-8a76-7b2ee2a706b5",
  "artifactId": "e67fbef8-1cf7-4c17-ad20-6caad1533684",
  "createdAt": "0001-01-01T00:00:00",
  "sessionTag": "team-analytics-loop"
}
```


## Monitoring experience and UX considerations

HC jobs surface in Monitoring Hub as `HC_<LakehouseName>_<LivySessionId>` to maintain consistency with other job types. This allows top-level visibility but limits REPL-level cancellation from the UI.


## Best practices

- Use `sessionTag` to pack related jobs into shared Livy sessions when acceptable.
- Poll the HC session GET endpoint to determine when the `state` is `Idle` and both `sessionId` and `replId` are populated.

## Related content
* [High concurrency support in the Fabric Livy API](high-concurrency-livy.md).
* [Submit session jobs using the Livy API](get-started-api-livy-session.md)
* [Submit Spark batch jobs using the Livy API](get-started-api-livy-batch.md)
* [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
* [Apache Spark monitoring overview](spark-monitoring-overview.md)
* [Apache Spark application detail](spark-detail-monitoring.md)


