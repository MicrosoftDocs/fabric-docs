---
title: Known issue - Notebook and SJD job statuses are in progress in monitor hub
description: A known issue is posted where notebook and SJD job statuses are in progress in monitor hub.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/27/2025
ms.custom: known-issue-1004
---

# Known issue - Notebook and SJD job statuses are in progress in monitor hub

You can trigger a notebook or Spark job definition (SJD) job's execution using the Fabric public API with a service principal token. You can use the monitor hub to track the status of the job. In this known issue, the job status is **In-progress** even after the execution of the job completes.

**Status:** Fixed: May 27, 2025

**Product Experience:** Data Engineering

## Symptoms

In the monitor hub, you see a stuck job status of **In-progress** for a notebook or SJD job that was submitted by a service principal.

## Solutions and workarounds

As a temporary workaround, use the **Recent-Run** job history inside the notebook or SJD to query the correct job status.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
