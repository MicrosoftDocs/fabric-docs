---
title: Debug Pipelines in Microsoft Fabric
description: Learn how to debug pipelines in Microsoft Fabric Data Factory by deactivating activities, isolating logic, and validating behavior step by step.
author: whhender
ms.author: whhender
ms.reviewer: ssindhub
ms.date: 12/16/2025
ms.topic: how-to
ai-usage: ai-assisted
---

# Debug pipelines in Microsoft Fabric 

This article shows you how to debug pipelines in Fabric. You can save and run pipelines incrementally, using the Active and Inactive activity states to isolate logic while you troubleshoot issues. Learn more about [deactivating activities](/fabric/data-factory/deactivate-activity).

Unlike Azure Data Factory, Microsoft Fabric Data Factory doesn't have a separate Debug mode. Debugging is straightforward: you disable specific activities and run the pipeline to validate behavior step by step. This approach gives you full control over which parts of your pipeline execute during testing.

## Prerequisites

Before you start, make sure you have:

- Access to a Fabric workspace with Contributor or higher permissions
- A pipeline created in Fabric Data Factory
- Connections configured for your data sources

## Pipeline debugging in Fabric

In Microsoft Fabric Data Factory, you debug pipelines by saving and running them—there's no separate authoring-time debug execution. You can deactivate (disable) individual activities, and inactive activities behave like commented-out code. When you run the pipeline, the execution process skips these inactive activities.

Inactive activities are helpful when you need to test specific parts of your pipeline without running everything. You can isolate a failing activity to identify the problem, validate parameter values and expressions before full execution, or build complex pipelines incrementally by testing each section as you go.

> [!VIDEO https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/video-embed-one-stream.html?id=8807930f-1b4e-4343-9968-a1709afd0964]

### Common use cases for inactive activities

- Testing part of a pipeline without running downstream steps
- Isolating a failing activity to troubleshoot issues
- Validating parameter values and expressions
- Building complex pipelines incrementally

## Deactivate an activity

The pipeline skips inactive activities and doesn't execute any downstream dependencies that rely on them. This lets you test specific parts of your pipeline in isolation.

[!INCLUDE [deactivate-activities](includes/deactivate-activities.md)]

After you run the pipeline, go to the Monitor hub to review the results. You can check both pipeline-level and activity-level execution details. Inactive activities show a status of **Skipped** in the monitoring view, so you can easily see which activities didn't run.

## Use an iterative debugging workflow

Here's a recommended approach for debugging complex pipelines:

1. Deactivate downstream activities that you don't want to test yet.
1. Run the pipeline and validate the results of the active activities.
1. If the results are correct, reactivate the next set of activities.
1. Repeat this process incrementally until the full pipeline runs successfully.

This workflow helps you identify exactly where issues occur and fix them systematically, rather than troubleshooting the entire pipeline at once.

## Important considerations

Keep these points in mind when you debug pipelines:

- The execution process ignores inactive activities completely.
- The system records all pipeline runs, including those with inactive activities.
- You must save the pipeline for activity state changes to take effect.
- Remember to reactivate all required activities before you schedule the pipeline for production use.
