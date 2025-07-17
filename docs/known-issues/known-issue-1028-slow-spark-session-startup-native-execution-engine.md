---
title: Known issue - Slow Spark session startup caused by Native Execution Engine
description: A known issue is posted where the Spark session startup is intermittently slow caused by the Native Execution Engine.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/16/2025
ms.custom: known-issue-1028
---

# Known issue - Slow Spark session startup caused by Native Execution Engine

Your Spark session startup is intermittently slow when Native Execution Engine is enabled. You might also receive an error during Spark session startup.

**Status:** Fixed: July 16, 2025

**Product Experience:** Data Engineering

## Symptoms

You run a notebook, Spark job, or other session that requires a Spark session, and Native Execution Engine is enabled. The Spark session startup is intermittently slow. Alternatively, you might receive an error. The error message is similar to: `Spark_Ambiguous_Executor_MaxExecutorFailures. The Code_Verifier does not match the code_challenge supplied in the authorization request`

## Solutions and workarounds

Retry starting the session to get a faster Spark session startup.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
