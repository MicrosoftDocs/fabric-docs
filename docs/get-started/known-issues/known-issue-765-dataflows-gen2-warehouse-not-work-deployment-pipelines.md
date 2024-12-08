---
title: Known issue - Dataflows Gen2 staging warehouse doesn't work in deployment pipelines
description: A known issue is posted where Dataflows Gen2 staging warehouse doesn't work in deployment pipelines.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/02/2024
ms.custom: known-issue-765
---

# Known issue - Dataflows Gen2 staging warehouse doesn't work in deployment pipelines

You can use Git integration for your Dataflow Gen2 dataflows. When you begin to commit the workspace to the Git repo, you see the dataflow's staging warehouse, named **DataflowsStagingWarehouse**, available to commit. While you can select the staging warehouse to be exported, the integration doesn't work properly. If using a deployment pipeline, you can't deploy **DataflowsStagingWarehouse** to the next stage.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

You see the **DataflowsStagingWarehouse** visible in Git integration and can't deploy **DataflowsStagingWarehouse** to the next stage using a deployment pipeline.

## Solutions and workarounds

To deploy your files to the next stage in a deployment pipeline, manually ignore **DataflowsStagingWarehouse** from the Git integration.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
