---
title: Known issue - Spark session doesn't start when managed virtual network's capacity moved
description: A known issue is posted where the Spark session doesn't start when managed virtual network's capacity moved.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/16/2024
ms.custom: known-issue-721
---

# Known issue - Spark session doesn't start when managed virtual network's capacity moved

You might receive an error when trying to start a Spark session or run a Spark job about the Livy session failing. This issue happens when the workspace for the managed virtual network moved across capacities.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

When you try to run a Spark job, the Spark job fails and you receive an error. The error is similar to: `Microsoft.Analytics.SynapseNotebookService.Infrastructure.Exceptions.ClientExceptions.LivySessionException: Livy session has failed. Error code: SparkCoreError/Other. SessionInfo.State from SparkCore is Error: Error while trying to establish a connection through the managed network.`.

## Solutions and workarounds

We're fixing the issue in batches. This article will be updated when the fix is released to all regions.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
