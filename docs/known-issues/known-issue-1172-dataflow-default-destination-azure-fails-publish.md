---
title: Known issue - Dataflow Gen2 with a default destination to Azure SQL fails to publish
description: A known issue is posted where a Dataflow Gen2 with a default destination to Azure SQL fails to publish.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/25/2025
ms.custom: known-issue-1172
---

# Known issue - Dataflow Gen2 with a default destination to Azure SQL fails to publish

A Dataflow Gen2 dataflow set with a default destination to Azure SQL without a schema set fails to publish. The publish fails with an unknown error.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

Your dataflow fails with the following error message: `There was a problem refreshing the dataflow. Error code: 101246.`

## Solutions and workarounds

To work around the issue, remove the default destination and add a standard destination instead.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
