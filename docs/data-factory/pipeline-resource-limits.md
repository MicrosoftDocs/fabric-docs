---
title: Data Factory data pipeline resource limits
description: Identifies resource limits for Data Factory in Microsoft Fabric pipeline features.
author: ssabat
ms.author: susabat
ms.topic: troubleshooting
ms.date: 11/15/2023
ms.custom:
  - ignite-2023
---

# Data pipeline resource limits

The following table describes the resource limitations for pipelines in Data Factory in Microsoft Fabric.

| Pipeline Resource | Default limit | Maximum limit |
|---|---|---|
| Total number of entities, such as pipelines, activities, triggers within a workspace | 5,000 | 5,000 |
| Concurrent pipeline runs per data factory that's shared among all pipelines in workspace  | 10,000 | 10,000 |
| External activities  like stored procedure, Web, Web Hook, and others | 3,000 | 3,000 |
| Pipeline activities execute on integration runtime, including Lookup, GetMetadata, and Delete | 1,000 | 1,000 |
| Concurrent authoring operations, including test connection, browse folder list and table list, preview data, and so on | 200 | 200 |
| Maximum activities per pipeline, which includes inner activities for containers | 40 | 40 |
| Maximum parameters per pipeline | 50 | 50 |
| ForEach items | 100,000 | 100,000 |
| ForEach parallelism | 20 | 50 |
| Lookup Activity item count | 5000 | 5000 |
| Maximum queued runs per pipeline | 100 | 100 |
| Characters per expression | 8,192 | 8,192 |
| Maximum timeout for pipeline activity runs | 24 hours | 24 hours |
| Bytes per object for pipeline objects | 200 KB | 200 KB |
| Bytes per payload for each activity run | 896 KB | 896 KB |
| Data Integration Units per copy activity run | Auto | 256 |
| Write API calls | 1,200/h | 1,200/h |
| Read API calls | 12,500/h | 12,500/h |
| Maximum time of data flow debug session | 8 hrs | 8 hrs |
| Meta Data Entity Size limit in a factory | 2 GB | 2 GB |

For information about limitations for data pipelines, go to [Pipeline limitations](pipeline-limitations.md).
