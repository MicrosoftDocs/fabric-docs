---
title: Known issue - Monitoring hub displays incorrect queued duration
description: A known issue is posted where Monitoring hub displays incorrect queued duration.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/15/2025
ms.custom: known-issue-837
---

# Known issue - Monitoring hub displays incorrect queued duration

Spark Jobs get queued when the capacity usage reaches its [maximum compute limit on Spark](/fabric/data-engineering/job-queueing-for-fabric-spark). Once the limit is reached, jobs are added to the queue. The jobs are then processed when the cores become available in the capacity. This queueing capability is enabled for all background jobs on Spark, including Spark notebooks triggered from the job scheduler, pipelines, and spark job definitions. The time duration that the job is waiting in the queue isn't correctly represented in the Monitoring hub as queued duration.

**Status:** Fixed: April 15, 2025

**Product Experience:** Data Engineering

## Symptoms

The total duration of the job shown in the Monitoring hub currently includes only the job execution time. The total duration doesn't correctly reflect the duration in which the job waited in the queue.

## Solutions and workarounds

When the job is in queue, the status is shown as **Not Started** in the monitoring view. Once the job starts execution, the status updates to **In Progress** in the monitoring view. Use the job status indicator to know when the job is queued and when its execution is in progress.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
