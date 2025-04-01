---
title: Known issue - Pipeline deployment fails when parent contains deactivated activity
description: A known issue is posted where a pipeline deployment fails when parent contains deactivated activity.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 08/23/2024
ms.custom: known-issue-816
---

# Known issue - Pipeline deployment fails when parent contains deactivated activity

When creating pipelines, you can have a parent pipeline that contains an **Invoke pipeline** activity that was deactivated. When you try to deploy the pipeline to a new workspace, the deployment fails.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When you try to deploy a pipeline that has a deactivated **Invoke pipeline** activity, you get an error similar to: `Something went wrong. Deployment couldn't be completed.` or `Git_InvalidResponseFromWorkload`.

## Solutions and workarounds

To work around the issue, mark the **Invoke pipeline** activity as **Activated**. You can then redeploy the pipeline.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
