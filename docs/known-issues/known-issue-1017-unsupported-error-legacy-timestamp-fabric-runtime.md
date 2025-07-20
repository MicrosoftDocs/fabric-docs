---
title: Known issue - Unsupported error for legacy timestamp in Fabric Runtime 1.3
description: A known issue is posted where there's an unsupported error for legacy timestamp in Fabric Runtime 1.3.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/16/2025
ms.custom: known-issue-1017
---

# Known issue - Unsupported error for legacy timestamp in Fabric Runtime 1.3

When using the native execution engine in Fabric Runtime 1.3, you might encounter an error if your data contains legacy timestamps. This issue arises due to compatibility challenges introduced when Spark 3.0 transitioned to the Java 8 date/time API, which uses the Proleptic Gregorian calendar (SQL ISO standard). Earlier Spark versions utilized a hybrid Julian-Gregorian calendar, resulting in potential discrepancies when processing timestamp data created by different Spark versions.

**Status:** Fixed: July 16, 2025

**Product Experience:** Data Engineering

## Symptoms

When using legacy timestamp support in native execution engine for Fabric Runtime 1.3, you receive an error. The error message is similar to: `Error Source: USER. Error Code: UNSUPPORTED. Reason: Reading legacy timestamp is not supported.`

## Solutions and workarounds

For more information about the feature that addresses this known issue, see the [blog post on legacy timestamp support](https://blog.fabric.microsoft.com/blog/legacy-timestamp-support-in-native-execution-engine-for-fabric-runtime-1-3). To activate the feature, add the following to your Spark session: `SET spark.gluten.legacy.timestamp.rebase.enabled = true`. Dates that are post-1970 are unaffected, ensuring consistency without extra steps.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
